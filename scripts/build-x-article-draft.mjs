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
let key = 0;

function nextKey() {
  key += 1;
  return key.toString(36).padStart(4, "0");
}

function linkData(text) {
  const urls = [];
  for (const match of text.matchAll(/https?:\/\/[^\s)]+/g)) {
    const url = match[0].replace(/[.,;:!?]+$/, "");
    urls.push({
      from_index: match.index,
      text: url,
      to_index: match.index + url.length,
    });
  }
  return { cashtags: [], hashtags: [], mentions: [], urls };
}

function cleanLine(line) {
  const image = line.match(/<img src="\.\.\/assets\/([^"/]+)" alt="([^"]+)"[^>]*\/>/);
  if (image) {
    return `Diagram: ${image[2]}\n${repositoryAssets}/${image[1]}`;
  }

  return line
    .replace(/^#{2,6}\s+/, "")
    .replace(/^>\s?/, "")
    .replace(/^[-*]\s+/, "- ")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1: $2")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .trim();
}

const blocks = [];
for (const rawLine of lines) {
  if (rawLine.startsWith("# ")) continue;
  if (rawLine.startsWith("```")) {
    continue;
  }

  const text = cleanLine(rawLine);
  if (!text) continue;

  blocks.push({
    text,
    data: linkData(text),
    entity_ranges: [],
    inline_style_ranges: [],
    key: nextKey(),
  });
}

const payload = {
  title,
  content_state: {
    blocks,
    entities: [],
  },
};

await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Wrote ${blocks.length} X Article blocks to ${outputPath}`);
