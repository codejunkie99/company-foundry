import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const payloadPath = resolve(
  root,
  process.env.X_ARTICLE_PAYLOAD ?? "articles/x-draft-payload.json",
);
const accessToken =
  process.env.X_USER_ACCESS_TOKEN ??
  process.env.X_ACCESS_TOKEN ??
  process.env.TWITTER_ACCESS_TOKEN;

if (!accessToken) {
  throw new Error(
    "Set X_USER_ACCESS_TOKEN to an OAuth 2 user access token, then run npm run x:create-draft.",
  );
}

const payload = JSON.parse(await readFile(payloadPath, "utf8"));
const response = await fetch("https://api.x.com/2/articles/draft", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});
const body = await response.text();

if (!response.ok) {
  throw new Error(`X Article draft failed (${response.status}): ${body}`);
}

console.log(body);
