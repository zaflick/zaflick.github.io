"use client";

import Lenis from "lenis";

/**
 * One small scroll engine for the whole page.
 *
 * Every chapter registers its section element and a callback. On each animation
 * frame we read the scroll position once, work out each section's progress (0..1)
 * and call the callbacks only when something changed. Callbacks write straight to
 * the DOM (style / CSS variables), so React never re-renders while scrolling.
 *
 * Modes:
 *  - "pin":  progress runs while the section's sticky child is pinned
 *            (section top at viewport top → section bottom at viewport bottom).
 *  - "pass": progress runs from the section entering at the bottom to leaving at the top.
 */

export type Mode = "pin" | "pass";

type Entry = {
  el: HTMLElement;
  mode: Mode;
  cb: (p: number, inView: boolean) => void;
  top: number;
  height: number;
  last: number;
  lastIn: boolean | null;
};

const entries = new Set<Entry>();
const frameHooks = new Set<(t: number) => void>();
let lenis: Lenis | null = null;
let started = false;
let vh = 0;
let dirty = true;

export const isStill = () =>
  typeof document !== "undefined" && document.documentElement.dataset.still === "1";

function measure() {
  vh = window.innerHeight;
  const y = window.scrollY;
  entries.forEach((e) => {
    const r = e.el.getBoundingClientRect();
    e.top = r.top + y;
    e.height = r.height;
  });
  dirty = true;
}

function update() {
  const y = window.scrollY;
  entries.forEach((e) => {
    let p: number;
    if (e.mode === "pin") {
      const span = Math.max(1, e.height - vh);
      p = (y - e.top) / span;
    } else {
      p = (y + vh - e.top) / (e.height + vh);
    }
    p = Math.min(1, Math.max(0, p));
    const inView = e.top < y + vh && e.top + e.height > y;
    if (dirty || Math.abs(p - e.last) > 0.0001 || inView !== e.lastIn) {
      e.last = p;
      e.lastIn = inView;
      e.cb(p, inView);
    }
  });
  dirty = false;
}

function loop(t: number) {
  lenis?.raf(t);
  update();
  frameHooks.forEach((f) => f(t));
  requestAnimationFrame(loop);
}

export function startScroll() {
  if (started) return;
  started = true;
  // A scroll story should start at the top, not wherever the last visit stopped.
  if ("scrollRestoration" in history && !location.hash) {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }
  if (!isStill()) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, smoothWheel: true });
    // Used by the visual checks: jump straight to a scroll position.
    (window as unknown as { __jump?: (y: number) => void }).__jump = (y: number) =>
      lenis?.scrollTo(y, { immediate: true, force: true });
    // In-page anchor links go through Lenis so the smooth scroll isn't fought.
    document.addEventListener("click", (ev) => {
      const a = (ev.target as HTMLElement).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const target = document.querySelector(a.getAttribute("href")!);
      if (target) {
        ev.preventDefault();
        lenis?.scrollTo(target as HTMLElement, { offset: 0 });
      }
    });
  }
  measure();
  window.addEventListener("resize", measure);
  // Fonts and images shift layout after first paint; re-measure when the body resizes.
  new ResizeObserver(measure).observe(document.body);
  requestAnimationFrame(loop);
}

export function onProgress(el: HTMLElement, mode: Mode, cb: (p: number, inView: boolean) => void) {
  const e: Entry = { el, mode, cb, top: 0, height: 0, last: -1, lastIn: null };
  entries.add(e);
  if (started) measure();
  return () => {
    entries.delete(e);
  };
}

/** Runs every animation frame (used by the 3D renderer). */
export function onFrame(f: (t: number) => void) {
  frameHooks.add(f);
  return () => {
    frameHooks.delete(f);
  };
}

/** Stops/starts smooth scrolling while the menu or join drawer is open. */
export function setScrollLocked(locked: boolean) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

export function scrollToEl(el: HTMLElement) {
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView();
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Maps p from [a,b] to [0,1], clamped. */
export const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
