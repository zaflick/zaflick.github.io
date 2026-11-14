/**
 * Same behaviour as track() in the live zaflick.com app.js (v4): call whichever tags
 * exist. With Tag Manager loaded, the "Site events bridge" defines window.gtag and turns
 * these into zf_<event> dataLayer pushes, so the existing GA4 and Meta tags work unchanged.
 * In prototype mode there is no GTM, so nothing is sent anywhere.
 */
import { getSource } from "./member";

type Fn = (...args: unknown[]) => void;
type W = Window & { gtag?: Fn; fbq?: Fn; clarity?: Fn };

export function track(name: string, data: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  const payload = { ...data, ...getSource() };
  try { w.gtag?.("event", name, payload); } catch {}
  try { w.fbq?.("trackCustom", name, payload); } catch {}
  try { w.clarity?.("event", name); } catch {}
  if (process.env.NODE_ENV !== "production") console.debug("[zf track]", name, payload);
}
