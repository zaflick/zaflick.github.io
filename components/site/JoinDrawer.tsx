"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SignupForm from "./SignupForm";
import { lockScroll } from "./Header";
import { BENEFITS } from "@/lib/site";
import { track } from "@/lib/track";

/**
 * The join drawer. Any element with data-join opens it (the attribute value is the piece
 * or look being reserved, or empty). Those elements are real links to /early-list, so
 * everything still works without JavaScript.
 */
export default function JoinDrawer() {
  const [open, setOpen] = useState(false);
  const [piece, setPiece] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const el = (e.target as HTMLElement).closest?.("[data-join]") as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      document.documentElement.classList.remove("menu-open");
      lastFocus.current = el;
      const p = el.getAttribute("data-join") || "";
      setPiece(p);
      setOpen(true);
      track("drawer_open", { piece: p });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("drawer-open", open);
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      // Keep focus inside the drawer while it is open.
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, select, textarea");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className="drawer-wrap" hidden={!open}>
      <div className="scrim" onClick={close} aria-hidden="true" />
      <div ref={panel} id="drawer" className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" data-lenis-prevent>
        <button type="button" className="drawer-close" onClick={close} aria-label="Close">
          Close
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </button>
        <p className="eyebrow mono">Early list</p>
        <h2 id="drawer-title" className="display">Join the early list</h2>
        <p className="drawer-ctx">
          {piece
            ? `You are reserving early access to the ${piece}. We will email you before it opens to anyone else.`
            : "Be first to see the real samples and first to buy."}
        </p>
        {open ? <SignupForm where="drawer" piece={piece} autoFocus /> : null}
        <ul className="drawer-list">
          {BENEFITS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
