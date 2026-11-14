import type { MetadataRoute } from "next";
import { IS_LIVE, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Prototype builds block everything, so a stray deploy can never be indexed.
export default function robots(): MetadataRoute.Robots {
  if (!IS_LIVE) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
