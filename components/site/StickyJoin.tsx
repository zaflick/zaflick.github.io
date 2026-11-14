"use client";

import { useEffect, useState } from "react";
import { useMember } from "@/lib/member";
import { links } from "@/lib/site";

/**
 * Phone-width join bar (as on the live site): shows once you have scrolled, hides while
 * any sign-up form is on screen, and never shows to someone who has already joined.
 */
export default function StickyJoin() {
  const member = useMember();
  const [up, setUp] = useState(false);

  useEffect(() => {
    if (member?.email || !("IntersectionObserver" in window)) return;
    const seen = new Set<Element>();
    const update = () => setUp(seen.size === 0 && window.scrollY > 300);
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((en) => (en.isIntersecting ? seen.add(en.target) : seen.delete(en.target)));
        update();
      },
      { threshold: 0.2 },
    );
    const watch = () => document.querySelectorAll("main [data-signup]").forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.querySelector("main") || document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [member]);

  if (member?.email) return null;
  return (
    <div className={`sticky-join${up ? " is-up" : ""}`} aria-hidden={!up}>
      <p>See the real samples first.</p>
      <a className="btn btn-accent" href={links.early} data-join="" tabIndex={up ? 0 : -1}>
        Join
      </a>
    </div>
  );
}
