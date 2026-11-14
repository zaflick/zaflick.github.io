/**
 * Early-list member state and sign-up, ported from the live zaflick.com app.js (v4).
 * Same localStorage keys (zf_member, zf_source), so people who joined on the current
 * site are still recognised on this one.
 */
import { useSyncExternalStore } from "react";
import { FORMS_ENDPOINT, IS_LIVE, SIGNUP_API, SITE_URL } from "./site";

export type Member = { email: string; number: number | null };
type Source = Record<string, string>;

const read = <T,>(k: string): T | null => {
  try {
    return JSON.parse(localStorage.getItem(k) || "null") as T | null;
  } catch {
    return null;
  }
};
const write = (k: string, v: unknown) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};

/* ---------- campaign / referral source ---------- */

const SOURCE_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"];
let source: Source | null = null;

/** Reads utm_* and ref from the URL (kept for later visits), like the live site. */
export function getSource(): Source {
  if (source) return source;
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(location.search);
  const fresh: Source = {};
  SOURCE_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) fresh[k] = v.slice(0, 80);
  });
  if (Object.keys(fresh).length) {
    write("zf_source", fresh);
    source = fresh;
  } else {
    source = read<Source>("zf_source") || {};
  }
  return source;
}

/* ---------- member store ---------- */

let member: Member | null | undefined;
const listeners = new Set<() => void>();

const getMember = () => {
  if (member === undefined) member = read<Member>("zf_member");
  return member;
};
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  const onStorage = (e: StorageEvent) => {
    if (e.key === "zf_member") {
      member = read<Member>("zf_member");
      fn();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
};

/** The current member (null until someone joins on this device). Null during prerender. */
export function useMember() {
  return useSyncExternalStore(subscribe, getMember, () => null);
}

function setMember(m: Member) {
  member = m;
  write("zf_member", m);
  listeners.forEach((fn) => fn());
}

/* ---------- sign-up ---------- */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Copy a successful sign-up, with its tracking tags and referral code, to the Zaflick-owned
 * "Zaflick forms" sheet ("Early list" tab). Fire-and-forget: it never delays or breaks the sign-up.
 */
function logSignup(email: string, number: number | null, meta: SignupMeta) {
  if (!IS_LIVE || !FORMS_ENDPOINT) return;
  try {
    const body = JSON.stringify({
      kind: "early-list",
      email,
      member_number: number ?? "",
      form: meta.form,
      piece: meta.piece || "",
      ...getSource(),
      page: location.pathname,
    });
    // text/plain keeps it a simple request for Apps Script; keepalive lets it finish if the page changes.
    fetch(FORMS_ENDPOINT, { method: "POST", keepalive: true, headers: { "Content-Type": "text/plain;charset=utf-8" }, body }).catch(() => {});
  } catch {
    /* never block a sign-up on the copy */
  }
}

export type SignupMeta = { form: string; piece?: string };

/**
 * Live: POST {email} to the existing Cloudflare worker (it only accepts the
 * https://zaflick.com origin), then copy the sign-up to the Zaflick forms sheet.
 * Prototype: wait a moment and pretend it worked.
 */
export async function signup(email: string, meta: SignupMeta = { form: "unknown" }): Promise<Member> {
  let number: number | null = null;
  if (IS_LIVE) {
    const res = await fetch(`${SIGNUP_API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const d = (await res.json()) as { ok?: boolean; member_number?: number };
    if (!d?.ok) throw new Error("failed");
    number = d.member_number ?? null;
    logSignup(email, number, meta);
  } else {
    await new Promise((r) => setTimeout(r, 600));
  }
  const m = { email, number };
  setMember(m);
  return m;
}

/** Personal share link: zaflick.com/?ref=Z<number>, as on the live site. */
export const shareUrl = (m: Member | null) => `${SITE_URL}/${m?.number ? `?ref=Z${m.number}` : ""}`;
export const SHARE_TEXT = "Zaflick is making athleisure you can wear all day. The first drop opens to the early list first:";
