"use client";

import { useRef } from "react";
import { useProgress } from "@/lib/useProgress";
import { range } from "@/lib/scroll";
import { story } from "@/lib/story";
import { asset, BENEFITS } from "@/lib/site";
import SignupForm from "@/components/site/SignupForm";

// Fabric captions use lines already published on zaflick.com.
const CAPTIONS = [
  { k: "Fabric", t: "Chosen for heat and humidity." },
  { k: "Testing", t: "Being tested for see-through and pilling." },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const caps = useRef<(HTMLDivElement | null)[]>([]);
  const cue = useRef<HTMLDivElement>(null);

  useProgress(ref, "pin", (p, inView) => {
    story.hero.p = p;
    story.hero.active = inView;
    const out = range(p, 0.06, 0.26);
    const el = copy.current;
    // Keep the sign-up form fully visible while someone is typing in it, even if the
    // phone keyboard nudges the page down a little.
    if (el && !el.contains(document.activeElement)) {
      el.style.opacity = String(1 - out);
      el.style.transform = `translate3d(0, ${-out * 60}px, 0)`;
      el.style.pointerEvents = out > 0.9 ? "none" : "";
    }
    if (cue.current) cue.current.style.opacity = String(1 - range(p, 0, 0.08));
    caps.current.forEach((el, i) => {
      if (!el) return;
      const a = 0.4 + i * 0.25;
      const v = range(p, a, a + 0.07) * (1 - range(p, a + 0.2, a + 0.26));
      el.style.opacity = String(v);
      el.style.transform = `translate3d(0, ${(1 - v) * 24}px, 0)`;
    });
  });

  return (
    <section ref={ref} id="top" className="pin hero" aria-labelledby="hero-title">
      <div className="stage" data-stage>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(min-width: 900px)" srcSet={asset("/assets/img/story-hero-lg.jpg")} />
          <img className="poster hero-poster" src={asset("/assets/img/story-hero.jpg")} alt="" aria-hidden="true" fetchPriority="low" />
        </picture>
        <div className="hero-scrim" aria-hidden="true" />
        <div ref={copy} className="hero-copy">
          <p className="eyebrow mono"><span>01</span> The fabric</p>
          <h1 id="hero-title" className="display">Athleisure you can wear from morning to dinner.</h1>
          <p className="lede">Seven pieces for women and men, designed in India. The first drop opens to the early list first.</p>
          <ul className="hero-ticks">
            {BENEFITS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="hero-form">
            <SignupForm where="home-hero" tone="dark" small="You'll get your member number straight away." />
          </div>
        </div>
        <div className="hero-caps">
          {CAPTIONS.map((c, i) => (
            <div key={c.k} ref={(el) => { caps.current[i] = el; }} className="cap">
              <span className="cap-dot" aria-hidden="true" />
              <p className="mono">{c.k}</p>
              <p className="cap-t">{c.t}</p>
            </div>
          ))}
        </div>
        <div ref={cue} className="cue mono" aria-hidden="true">Scroll <span>↓</span></div>
      </div>
    </section>
  );
}
