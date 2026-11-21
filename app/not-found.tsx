import type { Metadata } from "next";
import { links } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found | Zaflick",
  robots: { index: false, follow: true },
};

/**
 * GitHub Pages can't redirect on the server, so old or slightly-off links are fixed here,
 * before the page paints: /journal/* moved to /blog/*, the early list became /circle, the
 * 6am Club and The day pages were retired with the 15 Nov brand update, and a trailing
 * slash (/her/) is dropped. Anything else shows the 404 below.
 */
const REDIRECT = `(function(){var p=location.pathname,t=p;
if(/^\\/journal(\\/|$)/.test(t))t=t.replace(/^\\/journal/,"/blog");
if(/^\\/early-list\\/?$/.test(t))t="/circle";
if(/^\\/(6am-club|the-day)\\/?$/.test(t))t="/";
if(t.length>1)t=t.replace(/\\/+$/,"")||"/";
if(t!==p)location.replace(t+location.search+location.hash);})();`;

export default function NotFound() {
  return (
    <main id="content" className="page not-found">
      <script dangerouslySetInnerHTML={{ __html: REDIRECT }} />
      <p className="eyebrow mono">404</p>
      <h1 className="display">This page has run off.</h1>
      <p className="page-lede">The link may be old, or the page may have moved. Try one of these.</p>
      <div className="actions">
        <a className="btn btn-accent" href={links.home}>Home</a>
        <a className="btn btn-ink" href={links.her}>For her</a>
        <a className="btn btn-ink" href={links.him}>For him</a>
        <a className="btn btn-ghost" href={links.circle} data-join="">Join the Circle</a>
      </div>
    </main>
  );
}
