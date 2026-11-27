import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ImIn from "@/components/site/ImIn";

// DRAFT page (preview only until approved). All copy TODO-approve.
// Invite links are personal, so this page stays out of search and the sitemap.
const meta = pageMeta({
  title: "I'm in. Are you? | Zaflick",
  description: "A friend is in the Zaflick Circle. Join to see the real samples first and buy before the public launch.",
  path: "/in",
});
export const metadata: Metadata = { ...meta, robots: { index: false, follow: true } };

export default function Page() {
  return (
    <main id="content" className="page">
      <ImIn />
    </main>
  );
}
