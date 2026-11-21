import type { NextConfig } from "next";

// Static export for GitHub Pages. NEXT_PUBLIC_BASE_PATH is set to "/zaflick-site"
// by the Pages workflow for the preview link, and left empty for local runs.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Draft pages are named page.draft.tsx. They are built in the preview (prototype mode) and left
// out of the live build entirely, so unapproved pages never reach zaflick.com. Approving a page
// = renaming page.draft.tsx to page.tsx.
const live = process.env.NEXT_PUBLIC_SITE_MODE === "live";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: live ? ["tsx", "ts"] : ["draft.tsx", "tsx", "ts"],
  basePath,
  // No trailing slash: export writes her.html, so URLs stay /her like the current site.
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
