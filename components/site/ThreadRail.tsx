"use client";

import { useEffect, useRef } from "react";

/** The site's terracotta thread, down the right edge, drawn as you read the page. */
export default function ThreadRail() {
  const path = useRef<SVGPathElement>(null);
  useEffect(() => {
    let raf = 0;
    const draw = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 1;
      if (path.current) path.current.style.strokeDashoffset = String(1 - p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <svg className="rail" viewBox="0 0 24 1000" preserveAspectRatio="none" aria-hidden="true">
      <path ref={path} pathLength={1} d="M12 0 C 22 80, 2 160, 12 240 S 22 400, 12 480 S 2 640, 12 720 S 22 880, 12 1000" />
    </svg>
  );
}
