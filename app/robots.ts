import type { MetadataRoute } from "next";
import { IS_LIVE, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * AI search and answer crawlers, named so it is explicit that they are welcome
 * (SEO/AEO/GEO playbook, 21 Nov 2026). Everyone else is allowed by the "*" rule.
 */
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

// Prototype builds block everything, so a stray deploy can never be indexed.
export default function robots(): MetadataRoute.Robots {
  if (!IS_LIVE) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [{ userAgent: "*", allow: "/" }, { userAgent: AI_BOTS, allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
