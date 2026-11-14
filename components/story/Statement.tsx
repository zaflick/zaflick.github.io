"use client";

import { useRef } from "react";
import { useProgress } from "@/lib/useProgress";
import { range } from "@/lib/scroll";

// Both sentences are already on zaflick.com (home and The day).
const TEXT = "Seven pieces. One wardrobe for the whole day. It starts as training kit and stays on all day.";

export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const words = useRef<(HTMLSpanElement | null)[]>([]);
  const list = TEXT.split(" ");

  useProgress(ref, "pin", (p) => {
    const n = list.length;
    words.current.forEach((w, i) => {
      if (!w) return;
      const a = 0.05 + (i / n) * 0.75;
      // Faded words stay at 3:1 contrast (large text) so they remain readable.
      w.style.opacity = String(0.46 + 0.54 * range(p, a, a + 0.08));
    });
  });

  return (
    <section ref={ref} className="pin statement">
      <div className="stage">
        <p className="statement-text display">
          <span className="sr-only">{TEXT}</span>
          {list.map((w, i) => (
            <span key={i} aria-hidden="true" ref={(el) => { words.current[i] = el; }}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
