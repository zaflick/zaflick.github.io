// Copies every image the live zaflick.com pages reference into public/assets/,
// skipping files that are already here. Run: node scripts/fetch-assets.mjs
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LIVE = "https://zaflick.com";
const PAGES = [
  "/", "/her", "/him", "/looks", "/the-day", "/early-list", "/faq", "/privacy",
  "/tank-top", "/active-legging", "/sports-bra", "/fitted-jacket",
  "/active-tshirt", "/wide-leg-pants", "/athleisure-shorts",
];
const root = join(dirname(new URL(import.meta.url).pathname), "..", "public");

const found = new Set();
for (const p of PAGES) {
  const html = await (await fetch(LIVE + p)).text();
  for (const m of html.matchAll(/(?:src|href|content|srcset)="((?:https:\/\/zaflick\.com)?\/assets\/[^"\s,]+)/g)) {
    found.add(m[1].replace(LIVE, ""));
  }
}

let got = 0;
for (const path of [...found].sort()) {
  const dest = join(root, path);
  if (existsSync(dest)) continue;
  const res = await fetch(LIVE + path);
  if (!res.ok) { console.warn("skip", path, res.status); continue; }
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log("saved", path);
  got++;
}
console.log(`${found.size} referenced, ${got} downloaded`);
