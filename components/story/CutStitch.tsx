"use client";

import { useEffect, useRef } from "react";
import { useProgress } from "@/lib/useProgress";
import { range } from "@/lib/scroll";
import { story, CUT } from "@/lib/story";
import { asset } from "@/lib/site";

// Headlines marked TODO-approve are new copy; the lines under them are already on zaflick.com.
const STEPS = [
  { n: "02", k: "Cut", h: "Cut for Indian bodies.", t: "Sizing graded on Indian body measurements.", from: 0.12, to: 0.43 }, // TODO-approve headline
  { n: "03", k: "Stitch", h: "Stitched to stay put.", t: "Support that stays put, a waistband that does not roll.", from: 0.43, to: 0.85 }, // TODO-approve headline
  { n: "", k: "Concept", h: "Then it becomes the piece.", t: "Every image here is a concept. Real samples are shown to the early list before anything goes on sale.", from: 0.85, to: 1.01 }, // TODO-approve headline
];

const CARDS = [
  { img: "/assets/img/p-active-legging-front.webp", name: "Active legging", colour: "Aubergine", alt: "Active legging in aubergine, front view" },
  { img: "/assets/img/p-active-tshirt-front.webp", name: "Active T-shirt", colour: "Olive", alt: "Active T-shirt in olive, front view" },
];

export default function CutStitch() {
  const ref = useRef<HTMLElement>(null);
  const steps = useRef<(HTMLDivElement | null)[]>([]);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const photos = useRef<(HTMLImageElement | null)[]>([]);
  const labels = useRef<(HTMLElement | null)[]>([]);
  const meter = useRef<HTMLDivElement>(null);

  useEffect(() => {
    story.cards = cards.current.slice();
  }, []);

  useProgress(ref, "pin", (p, inView) => {
    story.cut.p = p;
    story.cut.active = inView;
    steps.current.forEach((el, i) => {
      if (!el) return;
      const s = STEPS[i];
      const v = range(p, s.from, s.from + 0.04) * (1 - range(p, s.to - 0.04, s.to));
      el.style.opacity = String(v);
      el.style.transform = `translate3d(0, ${(1 - v) * 18}px, 0)`;
      el.style.visibility = v > 0.01 ? "visible" : "hidden";
    });
    const photo = range(p, ...CUT.photo);
    photos.current.forEach((el) => el && (el.style.opacity = String(photo)));
    labels.current.forEach((el) => el && (el.style.opacity = String(range(p, CUT.photo[0] + 0.03, CUT.photo[1] + 0.03))));
    if (meter.current) meter.current.style.transform = `scaleX(${p})`;
  });

  return (
    <section ref={ref} className="pin cutstitch" aria-label="From fabric to finished piece">
      <div className="stage" data-stage>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div key={s.k} className="step" ref={(el) => { steps.current[i] = el; }}>
              <p className="eyebrow mono">{s.n && <span>{s.n}</span>} {s.k}</p>
              <h2 className="display">{s.h}</h2>
              <p className="step-t">{s.t}</p>
            </div>
          ))}
        </div>
        <div className="garments">
          {CARDS.map((c, i) => (
            <figure key={c.name} className="garment">
              <div className="garment-card" ref={(el) => { cards.current[i] = el; }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img ref={(el) => { photos.current[i] = el; }} src={asset(c.img)} alt={c.alt} width={1000} height={1250} loading="lazy" />
              </div>
              <figcaption ref={(el) => { labels.current[i] = el; }} className="garment-label">
                <span className="mono">{c.name}</span>
                <span className="soft">{c.colour}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="meter" aria-hidden="true"><div ref={meter} /></div>
      </div>
    </section>
  );
}
