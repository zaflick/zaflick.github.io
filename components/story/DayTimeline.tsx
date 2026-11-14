"use client";

import { useEffect, useRef } from "react";
import { useProgress } from "@/lib/useProgress";
import { range, ease, lerp, isStill } from "@/lib/scroll";
import { asset } from "@/lib/site";

// Times, captions and photos are the ones on zaflick.com/the-day, in time order.
const DAY = [
  { m: 360, t: "6:00 am", title: "A run in the park", img: "day-him-run", alt: "A man in an olive tee and shorts pausing mid-run in a park." },
  { m: 390, t: "6:30 am", title: "Studio session", img: "day-her-gym", alt: "A woman in an aubergine set training with a dumbbell." },
  { m: 400, t: "6:40 am", title: "An early flight", img: "day-him-airport", alt: "A man in an olive set in an airport." },
  { m: 495, t: "8:15 am", title: "The coffee run", img: "hero-her-m", alt: "A woman in an aubergine set leaving a coffee shop." },
  { m: 600, t: "10:00 am", title: "Coffee with a friend", img: "hero-both-m", alt: "A man in an olive set at a coffee bar with a friend." },
  { m: 690, t: "11:30 am", title: "Working from a café", img: "day-her-cafe", alt: "The aubergine set with an open striped shirt at a café table." },
  { m: 1150, t: "7:10 pm", title: "Evening stretch", img: "day-her-yoga", alt: "A woman in a forest green bra and leggings stretching in a studio." },
  { m: 1230, t: "8:30 pm", title: "Dinner nearby", img: "day-him-dinner", alt: "The olive set with a light jacket at dusk." },
];

// Light through the day: dawn peach → daylight bone → dusk → night.
const SKY: [number, [number, number, number]][] = [
  [360, [236, 212, 194]],
  [450, [244, 241, 234]],
  [960, [244, 241, 234]],
  [1100, [228, 182, 152]],
  [1165, [112, 66, 54]],
  [1215, [24, 22, 21]],
];

function sky(min: number) {
  for (let i = 0; i < SKY.length - 1; i++) {
    const [a, ca] = SKY[i];
    const [b, cb] = SKY[i + 1];
    if (min <= b) {
      const t = range(min, a, b);
      return ca.map((v, j) => Math.round(lerp(v, cb[j], t))) as [number, number, number];
    }
  }
  return SKY[SKY.length - 1][1];
}

function fmt(min: number) {
  const h24 = Math.floor(min / 60) % 24;
  const mm = Math.floor(min % 60);
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return { hm: `${h}:${String(mm).padStart(2, "0")}`, ap: h24 < 12 ? "am" : "pm" };
}

export default function DayTimeline() {
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const hm = useRef<HTMLSpanElement>(null);
  const ap = useRef<HTMLSpanElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const thread = useRef<SVGPathElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const geo = useRef({ c0: 0, cN: 0, now: 0 });

  // Measure card centres and draw the thread that runs through them.
  useEffect(() => {
    const measure = () => {
      const tr = track.current;
      if (!tr || isStill()) return;
      const prev = tr.style.transform;
      tr.style.transform = "none";
      const centres = cards.current.map((c) => {
        if (!c) return { x: 0, y: 0 };
        const img = c.querySelector(".day-img") as HTMLElement;
        return { x: c.offsetLeft + c.offsetWidth / 2, y: c.offsetTop + (img?.offsetHeight || c.offsetHeight) * 0.5 };
      });
      tr.style.transform = prev;
      const vw = window.innerWidth;
      geo.current = { c0: centres[0].x, cN: centres[centres.length - 1].x, now: vw < 760 ? vw * 0.5 : vw * 0.42 };
      if (svg.current && thread.current) {
        const w = tr.scrollWidth;
        const h = tr.offsetHeight;
        svg.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
        svg.current.style.width = `${w}px`;
        let d = `M ${-vw} ${centres[0].y}`;
        let prevPt = { x: -vw * 0.2, y: centres[0].y };
        d += ` L ${prevPt.x} ${prevPt.y}`;
        centres.forEach((c, i) => {
          const midX = (prevPt.x + c.x) / 2;
          const sway = (i % 2 ? -1 : 1) * h * 0.22;
          d += ` C ${midX} ${prevPt.y + sway}, ${midX} ${c.y - sway}, ${c.x} ${c.y}`;
          prevPt = c;
        });
        d += ` C ${prevPt.x + 200} ${prevPt.y + h * 0.2}, ${prevPt.x + 400} ${prevPt.y - h * 0.1}, ${w + vw} ${prevPt.y}`;
        thread.current.setAttribute("d", d);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  useProgress(ref, "pin", (p) => {
    if (isStill()) return;
    const pp = range(p, 0.04, 0.94);
    const { c0, cN, now } = geo.current;
    const tx = now - c0 - pp * (cN - c0);
    if (track.current) track.current.style.transform = `translate3d(${tx}px, 0, 0)`;

    // Clock: walk card to card, easing so it lingers on each moment.
    const n = DAY.length - 1;
    const f = pp * n;
    const i = Math.min(n - 1, Math.floor(f));
    const frac = ease(Math.min(1, f - i));
    const min = lerp(DAY[i].m, DAY[i + 1].m, frac);
    const t = fmt(min);
    if (hm.current && hm.current.textContent !== t.hm) hm.current.textContent = t.hm;
    if (ap.current && ap.current.textContent !== t.ap) ap.current.textContent = t.ap;
    if (dot.current) dot.current.style.left = `${range(min, 360, 1230) * 100}%`;

    const [r, g, b] = sky(min);
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const dark = range(0.62 - lum, 0, 0.2);
    if (stage.current) {
      stage.current.style.background = `rgb(${r}, ${g}, ${b})`;
      const fg = [Math.round(lerp(11, 244, dark)), Math.round(lerp(11, 241, dark)), Math.round(lerp(10, 234, dark))];
      stage.current.style.color = `rgb(${fg.join(",")})`;
      stage.current.style.setProperty("--day-soft", dark > 0.5 ? "rgba(244,241,234,.66)" : "rgba(11,11,10,.62)");
    }
    if (thread.current) thread.current.style.strokeDashoffset = String(1 - pp);

    cards.current.forEach((c, j) => {
      if (!c) return;
      const d = Math.abs(f - j);
      c.style.setProperty("--focus", String(1 - Math.min(1, d)));
    });
  });

  return (
    <section ref={ref} id="day" className="pin day" aria-labelledby="day-title">
      <div ref={stage} className="stage day-stage">
        <div className="day-head">
          <div>
            <p className="eyebrow mono"><span>05</span> The day</p>
            <h2 id="day-title" className="display">From a 6am run<br />to dinner.</h2>{/* TODO-approve */}
          </div>
          <div className="clock" aria-hidden="true">
            <span ref={hm} className="clock-hm display">6:00</span>
            <span ref={ap} className="clock-ap mono">am</span>
            <div className="day-scale mono">
              <span>6am</span>
              <span className="day-scale-line"><span ref={dot} className="day-scale-dot" /></span>
              <span>Night</span>
            </div>
          </div>
        </div>
        <div className="day-rail">
          <div ref={track} className="day-track">
            <svg ref={svg} className="day-thread" aria-hidden="true" preserveAspectRatio="none">
              <path ref={thread} pathLength={1} />
            </svg>
            {DAY.map((d, i) => (
              <article key={d.t} className="day-card" ref={(el) => { cards.current[i] = el; }}>
                <div className="day-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(`/assets/img/${d.img}.webp`)} alt={d.alt} width={1000} height={1250} loading="lazy" />
                </div>
                <p className="mono day-time">{d.t}</p>
                <h3 className="day-title">{d.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
