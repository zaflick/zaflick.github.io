"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/site";
import { noMotion3D } from "@/components/three/gl-check";

/**
 * The 3D knit fabric behind the homepage's top section.
 * - The still render shows first; three.js loads in its own chunk after the page is up
 *   (first scroll or touch, or shortly after load), then fades in over it.
 * - It only animates while the top section is on screen and the tab is visible.
 * - Reduced motion, no WebGL, or software WebGL (where it would stall the page): the still stays.
 */
export default function HeroFabric() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = wrap.current;
    const cv = canvas.current;
    const section = box?.closest("section");
    if (!box || !cv || !section) return;
    if (noMotion3D()) return;

    let cancelled = false;
    let raf = 0;
    let visible = true;
    let cleanup = () => {};

    const boot = async () => {
      const { FabricScene } = await import("@/components/three/fabric");
      if (cancelled) return;
      let scene: InstanceType<typeof FabricScene>;
      try {
        scene = new FabricScene(cv);
      } catch {
        return; // no usable WebGL: keep the still
      }
      const progress = () => {
        const r = section.getBoundingClientRect();
        return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      };
      let first = true;
      const frame = (t: number) => {
        raf = 0;
        if (!visible || document.hidden) return;
        scene.render(t, progress());
        if (first) {
          first = false;
          box.classList.add("is-live");
        }
        raf = requestAnimationFrame(frame);
      };
      const wake = () => {
        if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        wake();
      });
      io.observe(section);
      const onResize = () => scene.resize();
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", wake);
      wake();
      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", wake);
        scene.dispose();
      };
    };

    // The still already shows the opening frame, so the 3D only has to be ready by the
    // time something moves: first scroll/touch/key, or shortly after load.
    let booted = false;
    let timer = 0;
    const events = ["scroll", "wheel", "pointerdown", "pointermove", "touchstart", "keydown"] as const;
    const start = () => {
      if (booted) return;
      booted = true;
      events.forEach((e) => window.removeEventListener(e, start));
      window.clearTimeout(timer);
      void boot();
    };
    events.forEach((e) => window.addEventListener(e, start, { passive: true }));
    const arm = () => (timer = window.setTimeout(start, window.innerWidth >= 900 ? 1200 : 2500));
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    return () => {
      cancelled = true;
      events.forEach((e) => window.removeEventListener(e, start));
      window.removeEventListener("load", arm);
      window.clearTimeout(timer);
      cleanup();
    };
  }, []);

  return (
    <div ref={wrap} className="home-fabric" aria-hidden="true">
      <picture>
        <source media="(min-width: 900px)" srcSet={asset("/assets/img/story-hero-lg.webp")} type="image/webp" />
        <source srcSet={asset("/assets/img/story-hero-m.webp")} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/assets/img/story-hero.jpg")} alt="" fetchPriority="high" decoding="async" />
      </picture>
      <canvas ref={canvas} />
      <div className="home-fabric-scrim" />
    </div>
  );
}
