"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { asset, links, BASE } from "@/lib/site";

const MAIN = [
  { label: "Her", href: links.her },
  { label: "Him", href: links.him },
  { label: "Looks", href: links.looks },
  { label: "Blog", href: links.blog },
  { label: "Our story", href: links.about },
];
const MORE = [
  { label: "The Circle", href: links.circle },
  { label: "Founding Testers", href: links.testers },
  { label: "Size guide", href: links.size },
  { label: "FAQ", href: links.faq },
  { label: "Contact", href: links.contact },
];

export const lockScroll = (locked: boolean) => window.dispatchEvent(new CustomEvent("zf:scroll-lock", { detail: locked }));

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = (usePathname() || "/").replace(/\/$/, "") || "/";
  const here = (h: string) => {
    const p = h.slice(BASE.length) || "/";
    return p === path || (p !== "/" && path.startsWith(p + "/")) ? "page" : undefined;
  };

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    lockScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => document.documentElement.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <a className="announce" href={links.circle} data-join="">
        The first drop opens to the Circle first. <span>Join</span>
      </a>
      <header className="bar">
        <button
          className="bar-menu"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span className="bar-lines" aria-hidden="true">
            <i />
            <i />
          </span>
          <span>{open ? "Close" : "Menu"}</span>
        </button>
        <a className="bar-logo" href={links.home} aria-label="Zaflick home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/assets/zaflick-wordmark.png")} alt="Zaflick" width={520} height={108} />
        </a>
        <div className="bar-right">
          <nav className="bar-quick" aria-label="Quick links">
            <a href={links.her} aria-current={here(links.her)}>Her</a>
            <a href={links.him} aria-current={here(links.him)}>Him</a>
            <a href={links.blog} aria-current={here(links.blog)}>Blog</a>
          </nav>
          <a className="btn btn-accent bar-join" href={links.circle} data-join="">
            Join <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>
      <nav id="menu" className="menu" aria-label="Main" hidden={!open}>
        <ul className="menu-main">
          {MAIN.map((l) => (
            <li key={l.label}>
              <a href={l.href} aria-current={here(l.href)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="menu-foot">
          <ul className="menu-more">
            {MORE.map((l) => (
              <li key={l.label}>
                <a href={l.href} aria-current={here(l.href)}>{l.label}</a>
              </li>
            ))}
          </ul>
          <p className="mono">Whatever the plan, you&apos;re in.</p>
        </div>
      </nav>
    </>
  );
}
