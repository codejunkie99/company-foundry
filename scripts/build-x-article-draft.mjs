import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sourcePath = resolve(root, "articles/the-harness-company.md");
const outputPath = resolve(root, "articles/x-draft-payload.json");
const repositoryAssets = "https://raw.githubusercontent.com/codejunkie99/company-foundry/main/assets";

const source = await readFile(sourcePath, "utf8");
const lines = source.split(/\r?\n/);
const titleLine = lines.find((line) => line.startsWith("# "));

if (!titleLine) {
  throw new Error("The article needs one level-one Markdown title.");
}

const title = titleLine.slice(2).trim();

function plainText(line) {
  return line
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1: $2")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .trim();
}

function parseLine(line) {
  const image = line.match(/<img src="\.\.\/assets\/([^"/]+)" alt="([^"]+)"[^>]*\/>/);
  if (image) {
    return {
      text: `Diagram: ${image[2]}\n${repositoryAssets}/${image[1]}`,
      type: "unstyled",
    };
  }

  const match = line.match(/^(#{2,6})\s+(.*)$/);
  if (match) {
    return {
      text: plainText(match[2]),
      type: match[1].length === 2 ? "header-two" : "header-three",
    };
  }

  const listMatch = line.match(/^[-*]\s+(.*)$/);
  if (listMatch) {
    return { text: plainText(listMatch[1]), type: "unordered-list-item" };
  }

  const orderedListMatch = line.match(/^\d+\.\s+(.*)$/);
  if (orderedListMatch) {
    return { text: plainText(orderedListMatch[1]), type: "ordered-list-item" };
  }

  const quoteMatch = line.match(/^>\s?(.*)$/);
  if (quoteMatch) {
    return { text: plainText(quoteMatch[1]), type: "blockquote" };
  }

  return {
    text: plainText(line),
    type: "unstyled",
  };
}

const sourceBlocks = [];
for (const rawLine of lines) {
  if (rawLine.startsWith("# ")) continue;
  if (rawLine.startsWith("```")) {
    continue;
  }

  const { text, type } = parseLine(rawLine);
  if (!text) continue;

  sourceBlocks.push({
    text,
    type,
  });
}

const blocks = [];
let textParts = [];
let textLength = 0;

function appendText(text) {
  const separatorLength = textParts.length ? 2 : 0;
  if (textParts.length && textLength + separatorLength + text.length > 480) {
    blocks.push({ text: textParts.join("\n\n"), type: "unstyled" });
    textParts = [];
    textLength = 0;
  }

  textParts.push(text);
  textLength += separatorLength + text.length;
}

function flushText() {
  if (!textParts.length) return;
  blocks.push({ text: textParts.join("\n\n"), type: "unstyled" });
  textParts = [];
  textLength = 0;
}

for (const block of sourceBlocks) {
  if (block.type === "header-two") {
    flushText();
    blocks.push(block);
    continue;
  }

  if (block.type === "header-three") {
    appendText(block.text.toUpperCase());
    continue;
  }

  if (block.type === "unordered-list-item") {
    appendText(`- ${block.text}`);
    continue;
  }

  if (block.type === "ordered-list-item") {
    appendText(`- ${block.text}`);
    continue;
  }

  if (block.type === "blockquote") {
    appendText(`"${block.text}"`);
    continue;
  }

  appendText(block.text);
}
flushText();

const payload = {
  title,
  content_state: {
    blocks,
    entities: [],
  },
};

await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Wrote ${blocks.length} X Article blocks to ${outputPath}`);
