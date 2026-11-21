import { asset, links, BRAND, EMAIL, LEGAL_NOTE, SHOW_DRAFTS, SOCIAL, WHATSAPP, WHATSAPP_TEXT } from "@/lib/site";

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
      // Draft pages: listed only in the preview build, where they exist.
      ...(SHOW_DRAFTS
        ? [
            { label: "Cast your crew", href: links.crew },
            { label: "Weekend plans", href: links.plans },
            { label: "I'm in invite", href: links.invite },
          ]
        : []),
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
          {/* Contact on every page (playbook 4.5). WhatsApp appears once the number is set. */}
          <ul className="foot-contact">
            <li>
              <a href={`mailto:${EMAIL.marketing}`}>{EMAIL.marketing}</a>
            </li>
            <li>
              <a href={links.instagram} rel="noopener" target="_blank">DM @houseofzaflick</a>
            </li>
            {WHATSAPP ? (
              <li>
                <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_TEXT)}`} rel="noopener" target="_blank">WhatsApp us</a>
              </li>
            ) : null}
          </ul>
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
