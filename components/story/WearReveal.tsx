"use client";

import { useRef } from "react";
import { useProgress } from "@/lib/useProgress";
import { range, ease } from "@/lib/scroll";
import { asset } from "@/lib/site";

export default function WearReveal() {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLParagraphElement>(null);

  useProgress(ref, "pin", (p) => {
    const g = ease(range(p, 0.05, 0.62));
    const narrow = window.innerWidth / window.innerHeight < 0.8;
    // Start as a small card in the middle (like Davaris' video card) and grow to full screen.
    const ix = (narrow ? 14 : 33) * (1 - g);
    const iy = (narrow ? 26 : 24) * (1 - g);
    if (frame.current) frame.current.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${14 * (1 - g) + 0}px)`;
    if (img.current) img.current.style.transform = `scale(${1.25 - 0.25 * g})`;
    const c = range(p, 0.6, 0.78);
    if (copy.current) {
      copy.current.style.opacity = String(c);
      copy.current.style.transform = `translate3d(0, ${(1 - c) * 30}px, 0)`;
    }
    if (label.current) label.current.style.opacity = String(1 - range(p, 0.3, 0.5));
  });

  return (
    <section ref={ref} className="pin wear" aria-labelledby="wear-title">
      <div className="stage">
        <p ref={label} className="wear-label eyebrow mono"><span>04</span> Wear</p>
        <div ref={frame} className="wear-frame">
          <picture>
            <source media="(max-aspect-ratio: 4/5)" srcSet={asset("/assets/img/hero-both-m.webp")} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={img} src={asset("/assets/img/hero-both.webp")} alt="A man in an olive set and a woman in an aubergine set talking at a coffee bar." loading="lazy" />
          </picture>
          <div className="wear-scrim" aria-hidden="true" />
          <div ref={copy} className="wear-copy">
            <p className="eyebrow mono"><span>04</span> Wear</p>
            <h2 id="wear-title" className="display">Then you wear it. All day.</h2>{/* TODO-approve */}
            <p className="lede">One set, from the morning session to dinner. It starts as training kit and stays on all day.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
