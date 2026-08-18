import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sourcePath = resolve(root, "articles/the-harness-company.md");
const manifestPath = resolve(root, "articles/x-media-manifest.json");
const outputPath = resolve(root, "articles/x-rich-draft-payload.json");

const source = await readFile(sourcePath, "utf8");
const lines = source.split(/\r?\n/);
const titleLine = lines.find((line) => line.startsWith("# "));
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const mediaByFile = new Map(manifest.items.map((item) => [item.file, item]));

if (!titleLine) {
  throw new Error("The article needs one level-one Markdown title.");
}

const blocks = [];
const entities = [];
let textParts = [];
let textLength = 0;
let h2Count = 0;
let codeLines = null;

function textBlock(sourceText, type = "unstyled") {
  const linkedText = sourceText.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    "$1: $2",
  );
  const inline_style_ranges = [];
  let text = "";
  let rest = linkedText;
  let match;

  while ((match = rest.match(/\*\*([^*]+)\*\*/))) {
    text += rest.slice(0, match.index);
    const offset = text.length;
    text += match[1];
    inline_style_ranges.push({ offset, length: match[1].length, style: "bold" });
    rest = rest.slice(match.index + match[0].length);
  }
  text += rest;

  const block = { text: text.trim(), type };
  if (inline_style_ranges.length) block.inline_style_ranges = inline_style_ranges;
  return block;
}

function flushText() {
  const text = textParts.join("\n\n").trim();
  textParts = [];
  textLength = 0;
  if (text) blocks.push(textBlock(text));
}

function appendText(line) {
  const separator = textParts.length ? 2 : 0;
  if (textParts.length && textLength + separator + line.length > 1200) {
    flushText();
  }
  textParts.push(line);
  textLength += separator + line.length;
}

function addEntity(value) {
  const key = String(entities.length);
  entities.push({ key, value });
  return entities.length - 1;
}

function addAtomic(entityIndex, text = " ") {
  blocks.push({
    text,
    type: "atomic",
    entity_ranges: [{ key: entityIndex, offset: 0, length: text.length }],
  });
}

function addDivider() {
  const entityIndex = addEntity({
    type: "divider",
    mutability: "immutable",
    data: {},
  });
  addAtomic(entityIndex);
}

function addImage(line) {
  const match = line.match(/<img src="\.\.\/assets\/([^"/]+)" alt="([^"]+)"[^>]*\/>/);
  if (!match) throw new Error(`Could not parse image block: ${line}`);

  const item = mediaByFile.get(match[1].replace(/\.svg$/, ".png"));
  if (!item) throw new Error(`No uploaded media ID exists for ${match[1]}.`);

  const entityIndex = addEntity({
    type: "image",
    mutability: "immutable",
    data: {
      caption: match[2],
      media_items: [{
        media_category: item.media_category,
        media_id: item.media_id,
      }],
    },
  });
  addAtomic(entityIndex);
}

function addCodeBlock() {
  const markdown = codeLines.join("\n");
  codeLines = null;
  const entityIndex = addEntity({
    type: "markdown",
    mutability: "mutable",
    data: { markdown },
  });
  addAtomic(entityIndex);
}

for (const line of lines) {
  if (line.startsWith("# ")) continue;

  if (line.startsWith("```")) {
    if (codeLines) {
      codeLines.push(line);
      addCodeBlock();
    } else {
      flushText();
      codeLines = [line];
    }
    continue;
  }

  if (codeLines) {
    codeLines.push(line);
    continue;
  }

  if (line.startsWith("## ")) {
    flushText();
    if (h2Count > 0) addDivider();
    blocks.push(textBlock(line.slice(3), "header-two"));
    h2Count += 1;
    continue;
  }

  if (line.startsWith("### ")) {
    flushText();
    blocks.push(textBlock(line.slice(4), "header-three"));
    continue;
  }

  if (line.startsWith("<img ")) {
    flushText();
    addImage(line);
    continue;
  }

  const ordered = line.match(/^\d+\.\s+(.*)$/);
  if (ordered) {
    flushText();
    blocks.push(textBlock(ordered[1], "ordered-list-item"));
    continue;
  }

  const unordered = line.match(/^[-*]\s+(.*)$/);
  if (unordered) {
    flushText();
    blocks.push(textBlock(unordered[1], "unordered-list-item"));
    continue;
  }

  const quote = line.match(/^>\s?(.*)$/);
  if (quote) {
    flushText();
    if (quote[1]) blocks.push(textBlock(quote[1], "blockquote"));
    continue;
  }

  if (line.trim()) appendText(line);
}

if (codeLines) throw new Error("The article has an unclosed code block.");
flushText();

const cover = mediaByFile.get("company-foundry.png");
const payload = {
  title: titleLine.slice(2).trim(),
  content_state: { blocks, entities },
  cover_media: {
    media_category: cover.media_category,
    media_id: cover.media_id,
  },
};

await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Wrote ${blocks.length} rich blocks and ${entities.length} entities to ${outputPath}`);
