"use client";

import { useEffect } from "react";
import { getSource } from "@/lib/member";
import { track } from "@/lib/track";

/**
 * Small page-wide behaviours: remember utm/ref from the landing URL, fade sections in
 * as they enter the screen, send data-track clicks, and the page_view event.
 */
export default function SiteRuntime() {
  useEffect(() => {
    getSource();
    track("page_view");

    let io: IntersectionObserver | null = null;
    const els = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (es) =>
          es.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("is-in");
              io?.unobserve(en.target);
            }
          }),
        { threshold: 0.12 },
      );
      els.forEach((n) => io!.observe(n));
    } else {
      els.forEach((n) => n.classList.add("is-in"));
    }

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.("[data-track]");
      if (el) track(el.getAttribute("data-track") || "click");
    };
    document.addEventListener("click", onClick);
    return () => {
      io?.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
