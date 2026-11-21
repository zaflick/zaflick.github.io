import { asset, links, BRAND, LEGAL_NOTE, SOCIAL } from "@/lib/site";

const COLS = [
  {
    h: "Shop the drop",
    items: [
      { label: "Her", href: links.her },
      { label: "Him", href: links.him },
      { label: "Looks", href: links.looks },
    ],
  },
  {
    h: "Zaflick",
    items: [
      { label: "Our story", href: links.about },
      { label: "Blog", href: links.blog },
      { label: "Founding Testers", href: links.testers },
    ],
  },
  {
    h: "Help",
    items: [
      { label: "The Circle", href: links.circle },
      { label: "Size guide", href: links.size },
      { label: "FAQ", href: links.faq },
      { label: "Contact", href: links.contact },
      { label: "Privacy", href: links.privacy },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-top">
        <div className="foot-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/assets/zaflick-wordmark.png")} alt="Zaflick" width={520} height={108} />
          <p className="mono">{BRAND.tagline}</p>
          <ul className="foot-social">
            {SOCIAL.map((s) => (
              <li key={s.name}>
                <a href={s.url} rel="noopener" target="_blank">{s.name} <span aria-hidden="true">↗</span></a>
              </li>
            ))}
          </ul>
        </div>
        {COLS.map((c) => (
          <nav key={c.h} aria-label={c.h} className="foot-col">
            <p className="mono foot-h">{c.h}</p>
            <ul>
              {c.items.map((it) => (
                <li key={it.label}>
                  <a href={it.href}>{it.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="foot-legal">
        {LEGAL_NOTE} © 2026 {BRAND.legal}
      </p>
    </footer>
  );
}
