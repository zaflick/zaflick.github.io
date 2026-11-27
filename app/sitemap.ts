import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PRODUCTS } from "@/lib/content/products";
import { ARTICLES } from "@/lib/content/journal";
import { CITIES } from "@/lib/content/plans";

export const dynamic = "force-static";

/**
 * lastModified = the date a page's content last really changed, so search engines recrawl
 * what changed (not every page on every deploy). When you change a page's content, update
 * its date in CHANGED. Blog posts use their own `updated` or `date` from journal.ts.
 * Footer-only or styling changes don't count.
 */
const BRAND_UPDATE = "2026-11-21"; // every page was rewritten for the 15 Nov brand update
const CHANGED: Record<string, string> = {
  "/": "2026-11-27", // founders' note
  "/about": "2026-11-27", // founder story
  "/faq": "2026-11-27", // "Who founded Zaflick?"
  "/blog": "2026-11-27", // two new posts, renamed posts
  "/size-guide": "2026-11-27", // link to the renamed sizing post
  "/privacy": "2026-11-27", // Cast your crew, the invite card
  "/cast-your-crew": "2026-11-27",
  "/plans": "2026-11-27",
  ...Object.fromEntries(CITIES.map((c) => [`/plans/${c.slug}`, "2026-11-27"])),
};

// /early-list, /6am-club and /the-day were retired on 21 Nov (redirects in app/not-found.tsx).
// /in (the personal invite page) is left out on purpose: it is noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly", date?: string) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(date || CHANGED[path] || BRAND_UPDATE),
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/her", 0.9, "weekly"),
    page("/him", 0.9, "weekly"),
    page("/looks", 0.8),
    page("/circle", 0.9, "weekly"),
    ...PRODUCTS.map((p) => page(`/${p.slug}`, p.nextDrop ? 0.5 : 0.8)),
    page("/faq", 0.7),
    page("/size-guide", 0.6),
    page("/about", 0.6),
    page("/cast-your-crew", 0.7),
    page("/plans", 0.6),
    ...CITIES.map((c) => page(`/plans/${c.slug}`, 0.6)),
    page("/blog", 0.6, "weekly"),
    ...ARTICLES.map((a) => page(`/blog/${a.slug}`, 0.5, "monthly", a.updated || a.date)),
    page("/founding-testers", 0.5),
    page("/contact", 0.4),
    page("/privacy", 0.2, "yearly"),
  ];
}
