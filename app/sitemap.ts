import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PRODUCTS } from "@/lib/content/products";
import { ARTICLES } from "@/lib/content/journal";

export const dynamic = "force-static";

// /early-list, /6am-club and /the-day were retired on 21 Nov (redirects in app/not-found.tsx).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-21");
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
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
    page("/blog", 0.6, "weekly"),
    ...ARTICLES.map((a) => page(`/blog/${a.slug}`, 0.5)),
    page("/founding-testers", 0.5),
    page("/contact", 0.4),
    page("/privacy", 0.2, "yearly"),
  ];
}
