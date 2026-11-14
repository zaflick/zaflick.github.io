"use client";

import { useEffect, useRef } from "react";
import { isStill, onFrame } from "@/lib/scroll";

/**
 * One fixed canvas behind the 3D chapters. three.js and the scene load in their own
 * chunk after the page has painted, so the headline and the still image come first.
 */
export default function StoryCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isStill()) return;
    let cancelled = false;
    let cleanup = () => {};

    const boot = async () => {
      const { StoryScene } = await import("./scene");
      const canvas = ref.current;
      if (cancelled || !canvas) return;
      let scene: InstanceType<typeof StoryScene>;
      try {
        scene = new StoryScene(canvas);
      } catch {
        // No usable WebGL: fall back to the still version.
        document.documentElement.dataset.still = "1";
        window.dispatchEvent(new Event("resize"));
        return;
      }
      const offFrame = onFrame((t) => scene.render(t));
      const onResize = () => scene.resize();
      window.addEventListener("resize", onResize);
      document.fonts?.ready.then(() => scene.measureCards());
      cleanup = () => {
        offFrame();
        window.removeEventListener("resize", onResize);
        scene.dispose();
      };
    };

    // The still image already shows the opening frame, so the 3D only has to be
    // ready by the time something moves: first scroll/touch/key, or shortly after load.
    let booted = false;
    const events = ["scroll", "wheel", "pointerdown", "pointermove", "touchstart", "keydown"] as const;
    let timer = 0;
    const start = () => {
      if (booted) return;
      booted = true;
      events.forEach((e) => window.removeEventListener(e, start));
      window.clearTimeout(timer);
      void boot();
    };
    events.forEach((e) => window.addEventListener(e, start, { passive: true }));
    // Desktops get it sooner; phones wait a little longer to keep first load light.
    const arm = () => (timer = window.setTimeout(start, window.innerWidth >= 900 ? 1200 : 3500));
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    // Coming back to the middle of the page (e.g. a #day link) needs the 3D at once.
    if (window.scrollY > 0) start();

    return () => {
      cancelled = true;
      events.forEach((e) => window.removeEventListener(e, start));
      window.removeEventListener("load", arm);
      window.clearTimeout(timer);
      cleanup();
    };
  }, []);

  return <canvas ref={ref} className="webgl" aria-hidden="true" />;
}
