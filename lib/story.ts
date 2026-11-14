/**
 * Shared, mutable state that the HTML chapters write and the 3D scene reads.
 * Plain object on purpose: it changes every frame and must not trigger React renders.
 */
export const story = {
  hero: { p: 0, active: false },
  cut: { p: 0, active: false },
  split: { p: 0, active: false },
  /** Card elements the 3D flat-lay lines up with (legging, tee). */
  cards: [null, null] as (HTMLElement | null)[],
  /** Set by the 3D scene once its first frame has been drawn. */
  glReady: false,
};

/** Cut & stitch chapter timing (fractions of that chapter's scroll). */
export const CUT = {
  flatten: [0.0, 0.16] as const,
  outline: [0.16, 0.34] as const,
  lift: [0.34, 0.43] as const,
  glide: [0.43, 0.6] as const,
  stitch: [0.58, 0.83] as const,
  photo: [0.85, 0.9] as const,
};
