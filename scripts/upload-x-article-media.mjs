import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const mediaDirectory = resolve(root, "assets/x-media");
const manifestPath = resolve(root, "articles/x-media-manifest.json");
const accessToken = process.env.X_USER_ACCESS_TOKEN;

if (!accessToken) {
  throw new Error("Set X_USER_ACCESS_TOKEN to a user token with media.write.");
}

const files = (await readdir(mediaDirectory))
  .filter((file) => file.endsWith(".png"))
  .sort();

const items = [];
for (const file of files) {
  const media = (await readFile(resolve(mediaDirectory, file))).toString("base64");
  const response = await fetch("https://api.x.com/2/media/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      media,
      media_category: "tweet_image",
      media_type: "image/png",
      shared: false,
    }),
  });
  const body = await response.text();

  if (!response.ok) {
    throw new Error(`X media upload failed for ${file} (${response.status}): ${body}`);
  }

  const result = JSON.parse(body);
  if (!result.data?.id) {
    throw new Error(`X media upload returned no ID for ${file}: ${body}`);
  }

  items.push({
    file,
    media_category: "tweet_image",
    media_id: result.data.id,
  });
  console.log(`uploaded ${file}`);
}

await writeFile(manifestPath, `${JSON.stringify({ items }, null, 2)}\n`);
console.log(`Wrote ${items.length} media IDs to ${manifestPath}`);
