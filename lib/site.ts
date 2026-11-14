/**
 * Site-wide settings. Everything that changes between the local prototype and the
 * live site is an environment variable, so going live is a config change, not a rebuild.
 */

/** Base path for GitHub Pages-style previews ("/zaflick-site"); empty locally and on zaflick.com. */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p: string) => `${BASE}${p}`;
/** Internal link. Plain <a> tags (full page loads) on purpose: the homepage runs its own scroll engine. */
export const href = (p: string) => `${BASE}${p}`;

/**
 * "prototype" (default): noindex, no Tag Manager, forms simulate success and send nothing.
 * "live": indexable, GTM on, sign-ups go to the Cloudflare worker.
 */
export const MODE: "prototype" | "live" = process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "prototype";
export const IS_LIVE = MODE === "live";

export const SITE_URL = "https://zaflick.com";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ""; // GTM-5G79GDM9 at go-live
export const SIGNUP_API = "https://zaflick-circle.dunnarahulraja50.workers.dev"; // existing worker, unchanged
/** Apps Script web app on marketing@ for the tester / 6am Club / contact forms (set at go-live). */
export const FORMS_ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT || "";
/** Digits only, e.g. 919876543210. Empty = WhatsApp buttons hidden (same rule as the live site). */
export const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "";
export const WHATSAPP_TEXT = "Hi Zaflick, please add me to the early list.";

export const BRAND = {
  name: "Zaflick",
  legal: "Zaflick Lifestyle Pvt. Ltd.",
  tagline: "move. vibe. style.",
  oneLine: "Athleisure for women and men, designed in India to be worn from morning to dinner.",
};

export const EMAIL = {
  /** Already public on zaflick.com/privacy. */
  admin: "admin@zaflick.com",
  /** TODO-confirm: collabs, partners and press. */
  marketing: "marketing@zaflick.com",
};

/** Public brand profiles. Only confirmed URLs go here; they feed schema sameAs and the footer. */
export const SOCIAL: { name: string; url: string }[] = [
  { name: "Instagram", url: "https://www.instagram.com/houseofzaflick/" },
  { name: "Facebook", url: "https://www.facebook.com/p/Zaflick-61589328118184/" },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/135248227/" },
  { name: "Threads", url: "https://www.threads.com/@houseofzaflick" },
  // Pinterest: add once its profile URL is confirmed (account on marketing@).
];

export const links = {
  home: href("/"),
  her: href("/her"),
  him: href("/him"),
  looks: href("/looks"),
  day: href("/the-day"),
  early: href("/early-list"),
  faq: href("/faq"),
  privacy: href("/privacy"),
  about: href("/about"),
  size: href("/size-guide"),
  blog: href("/blog"),
  club: href("/6am-club"),
  testers: href("/founding-testers"),
  contact: href("/contact"),
  instagram: "https://www.instagram.com/houseofzaflick/",
};

export const CONCEPT_NOTE =
  "This is a concept image. The design is still being finalised and the final piece may differ. People on the early list see the real samples first.";
export const LEGAL_NOTE =
  "Every product image on this site is a conceptual representation, not a photograph of an actual product. Final pieces may differ.";
export const BENEFITS = [
  "See the real samples before anyone else",
  "Buy 48 hours before the public launch",
  "Free shipping on your launch order",
];
