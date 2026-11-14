// Checks the local build: every URL on the live zaflick.com sitemap plus the new ones
// returns 200, a missing page returns the 404 page, and each page has exactly one <h1>,
// a canonical, a meta description and JSON-LD that parses.
// Run: npm run serve (in another terminal), then node scripts/check-urls.mjs
const BASE = process.env.CHECK_BASE || "http://localhost:4321";
const LIVE_SITEMAP = "https://zaflick.com/sitemap.xml";

const local = await (await fetch(`${BASE}/sitemap.xml`)).text();
const localUrls = [...local.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
let liveUrls = [];
try {
  const live = await (await fetch(LIVE_SITEMAP)).text();
  liveUrls = [...live.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
} catch {
  console.warn("Could not fetch the live sitemap; checking local URLs only.");
}
const missing = liveUrls.filter((u) => !localUrls.includes(u));
let bad = 0;
if (missing.length) {
  bad += missing.length;
  console.log("Live URLs missing from the new sitemap:", missing);
}

for (const u of localUrls) {
  const path = new URL(u).pathname;
  const res = await fetch(BASE + path, { redirect: "manual" });
  const html = await res.text();
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const desc = /<meta name="description" content="[^"]{50,}"/.test(html);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] || "";
  let ld = 0;
  let ldErr = "";
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      JSON.parse(m[1]);
      ld++;
    } catch (e) {
      ldErr = String(e);
    }
  }
  const problems = [];
  if (res.status !== 200) problems.push(`status ${res.status}`);
  if (h1 !== 1) problems.push(`${h1} h1`);
  // "https://zaflick.com" and "https://zaflick.com/" are the same URL.
  if ((canonical || "").replace(/\/$/, "") !== u.replace(/\/$/, "")) problems.push(`canonical ${canonical}`);
  if (!desc) problems.push("no/short description");
  if (title.length > 70) problems.push(`title ${title.length} chars`);
  if (ldErr) problems.push(`bad JSON-LD ${ldErr}`);
  if (problems.length) bad++;
  console.log(`${problems.length ? "✗" : "✓"} ${path.padEnd(48)} ${String(res.status)} ld:${ld} ${problems.join(", ")}`);
}

const nf = await fetch(`${BASE}/this-page-does-not-exist`);
const nfHtml = await nf.text();
const nfOk = nf.status === 404 && nfHtml.includes("This page has run off.");
if (!nfOk) bad++;
console.log(`${nfOk ? "✓" : "✗"} 404 page (status ${nf.status})`);
console.log(`\n${localUrls.length} sitemap URLs, ${liveUrls.length} live URLs, ${bad} problem(s)`);
process.exit(bad ? 1 : 0);
