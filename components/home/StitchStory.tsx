"use client";

import { useEffect, useRef, useState } from "react";
import { noMotion3D } from "@/components/three/gl-check";

// Ported from the old scroll story. New copy: TODO-approve. Claims follow the brand
// update (sizing "built on Indian measurements", no performance promises).
const STEPS = [
  { n: "01", k: "Cut", h: "Cut from one fabric.", t: "Fabric chosen for heat and humidity, and sizing built on Indian measurements.", from: 0.12, to: 0.43 },
  { n: "02", k: "Stitch", h: "Stitched for any plan.", t: "A pocket that holds your phone and a waistband designed to stay put, from the walk to the café.", from: 0.43, to: 0.85 },
  { n: "03", k: "3D illustration", h: "One outfit. No changing.", t: "The active legging and the active T-shirt, drawn in 3D. Photos of the real samples come after the sample shoot.", from: 0.85, to: 1.01 },
];

const PIECES = [
  { name: "Active legging", colour: "Aubergine" },
  { name: "Active T-shirt", colour: "Olive" },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

/**
 * The clothing animation: fabric is cut into pattern pieces and stitched into the
 * active legging and the active T-shirt as the section scrolls (pinned).
 * three.js loads only when the section gets close. Reduced motion or no hardware
 * WebGL: a short static version with the three steps instead.
 */
export default function StitchStory() {
  const ref = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const steps = useRef<(HTMLDivElement | null)[]>([]);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const labels = useRef<(HTMLElement | null)[]>([]);
  const meter = useRef<HTMLDivElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const section = ref.current;
    const cv = canvas.current;
    if (!section || !cv) return;
    if (noMotion3D()) {
      setStill(true);
      return;
    }

    let cancelled = false;
    let raf = 0;
    let visible = false;
    let scene: { render: (t: number, p: number) => void; resize: () => void; measureCards: () => void; dispose: () => void } | null = null;
    let lastP = -1;

    const progress = () => {
      const r = section.getBoundingClientRect();
      return clamp01(-r.top / Math.max(1, r.height - window.innerHeight));
    };

    const paintDom = (p: number) => {
      steps.current.forEach((el, i) => {
        if (!el) return;
        const s = STEPS[i];
        const v = range(p, s.from, s.from + 0.04) * (1 - range(p, s.to - 0.04, s.to));
        el.style.opacity = String(v);
        el.style.transform = `translate3d(0, ${(1 - v) * 18}px, 0)`;
        el.style.visibility = v > 0.01 ? "visible" : "hidden";
      });
      const l = range(p, 0.85, 0.9);
      labels.current.forEach((el) => el && (el.style.opacity = String(l)));
      if (meter.current) meter.current.style.transform = `scaleX(${p})`;
    };

    const frame = (t: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const p = progress();
      if (p !== lastP) {
        paintDom(p);
        lastP = p;
      }
      scene?.render(t, p);
      raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    const boot = async () => {
      const { StitchScene } = await import("@/components/three/stitch");
      if (cancelled) return;
      try {
        scene = new StitchScene(cv, cards.current.filter(Boolean) as HTMLElement[]);
      } catch {
        setStill(true);
        return;
      }
      document.fonts?.ready.then(() => scene?.measureCards());
      section.classList.add("is-live");
      wake();
    };

    // Start loading three.js once the section is within about a screen and a half.
    let booted = false;
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !booted) {
          booted = true;
          near.disconnect();
          void boot();
        }
      },
      { rootMargin: "150% 0px" },
    );
    near.observe(section);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      wake();
    });
    io.observe(section);

    const onResize = () => {
      scene?.resize();
      lastP = -1;
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", wake);
    paintDom(progress());

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      near.disconnect();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", wake);
      scene?.dispose();
    };
  }, []);

  return (
    <section ref={ref} className={`stitch${still ? " is-still" : ""}`} aria-label="From fabric to finished piece">
      <div className="stitch-stage">
        <canvas ref={canvas} className="stitch-canvas" aria-hidden="true" />
        <div className="stitch-steps">
          {STEPS.map((s, i) => (
            <div key={s.k} className="stitch-step" ref={(el) => { steps.current[i] = el; }}>
              <p className="eyebrow mono"><span>{s.n}</span> {s.k}</p>
              <h2 className="display">{s.h}</h2>
              <p className="stitch-t">{s.t}</p>
            </div>
          ))}
        </div>
        <div className="stitch-pieces" aria-hidden={still}>
          {PIECES.map((c, i) => (
            <figure key={c.name} className="stitch-piece">
              <div className="stitch-card" ref={(el) => { cards.current[i] = el; }} />
              <figcaption ref={(el) => { labels.current[i] = el; }} className="stitch-label">
                <span className="mono">{c.name}</span>
                <span className="soft">{c.colour}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="stitch-meter" aria-hidden="true"><div ref={meter} /></div>
      </div>
    </section>
  );
}
