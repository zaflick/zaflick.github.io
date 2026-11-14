"use client";

import { useRef } from "react";
import { useProgress } from "@/lib/useProgress";
import { story } from "@/lib/story";
import { asset, links } from "@/lib/site";

// Piece counts match the first drop on zaflick.com: 4 for her, 3 for him.
const COLS = [
  { k: "Her", n: "4 pieces", href: links.her, note: "Tank top, active legging, sports bra, fitted jacket" },
  { k: "Him", n: "3 pieces", href: links.him, note: "Active T-shirt, wide-leg pants, athleisure shorts" },
];

export default function SplitHerHim() {
  const ref = useRef<HTMLElement>(null);
  useProgress(ref, "pass", (p, inView) => {
    story.split.p = p;
    story.split.active = inView;
  });

  return (
    <section ref={ref} className="split" aria-label="Shop by collection">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="poster split-poster" src={asset("/assets/img/story-split.jpg")} alt="" aria-hidden="true" loading="lazy" />
      <div className="split-scrim" aria-hidden="true" />
      <div className="split-cols">
        {COLS.map((c) => (
          <a key={c.k} className="split-col" href={c.href}>
            <span className="split-k display">{c.k}</span>
            <span className="mono split-n">{c.n}</span>
            <span className="split-note">{c.note}</span>
            <span className="split-plus" aria-hidden="true">+</span>
          </a>
        ))}
      </div>
    </section>
  );
}
