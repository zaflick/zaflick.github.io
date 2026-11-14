import type { Metadata } from "next";
import { links } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found | Zaflick",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="content" className="page not-found">
      <p className="eyebrow mono">404</p>
      <h1 className="display">This page has run off.</h1>
      <p className="page-lede">The link may be old, or the page may have moved. Try one of these.</p>
      <div className="actions">
        <a className="btn btn-accent" href={links.home}>Home</a>
        <a className="btn btn-ink" href={links.her}>For her</a>
        <a className="btn btn-ink" href={links.him}>For him</a>
        <a className="btn btn-ghost" href={links.early} data-join="">Join the early list</a>
      </div>
    </main>
  );
}
