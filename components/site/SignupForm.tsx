"use client";

import { useId, useState } from "react";
import { EMAIL_RE, signup, useMember } from "@/lib/member";
import ShareButton from "./ShareButton";
import { track } from "@/lib/track";
import { IS_LIVE, WHATSAPP, WHATSAPP_TEXT } from "@/lib/site";

type Props = {
  /** Which form this is, sent with the events (drawer, circle, home-end, …). */
  where: string;
  /** Piece or look the visitor is reserving, when opened from one. */
  piece?: string;
  /** "dark" for forms on photos or ink backgrounds. */
  tone?: "light" | "dark";
  /** Autofocus the email field (the drawer). */
  autoFocus?: boolean;
  /** Line under the form; defaults to the live site's reassurance line. */
  small?: string;
};

/** The Circle sign-up form (formerly the early list): same worker, states and events. */
export default function SignupForm({ where, piece = "", tone = "light", autoFocus, small = "A few messages before launch. Leave any time." }: Props) {
  const id = useId();
  const member = useMember();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [note, setNote] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!EMAIL_RE.test(v)) {
      setState("error");
      setNote("That email address does not look right. Check it and try again.");
      document.getElementById(`${id}-email`)?.focus();
      return;
    }
    setState("sending");
    setNote("Adding you to the list…");
    track("signup_submit", { form: where, piece });
    try {
      await signup(v, { form: where, piece });
      track("signup_success", { form: where, piece });
      setState("idle");
      setNote("");
    } catch {
      setState("error");
      setNote("That did not go through. Check your connection and try again.");
    }
  }

  const wa = WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_TEXT)}` : "";

  if (member?.email) {
    return (
      <div className={`signup is-done tone-${tone}`} data-signup={where}>
        <h3 className="signup-done-h">You&apos;re in the Circle.</h3>
        <p>
          {IS_LIVE ? "We have sent a confirmation to " : "Prototype: nothing was sent to "}
          <strong>{member.email}</strong>. You will hear from us before anyone else.
        </p>
        {member.number ? <p className="mono signup-num">Member no. {member.number}</p> : null}
        <ShareButton />
      </div>
    );
  }

  return (
    <div className={`signup tone-${tone}`} data-signup={where}>
      <form className="signup-form" onSubmit={onSubmit} noValidate>
        <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={state === "error" || undefined}
          aria-describedby={`${id}-note`}
          autoFocus={autoFocus}
          required
        />
        <button type="submit" className="btn btn-accent" disabled={state === "sending"}>
          Join the Circle
        </button>
      </form>
      <p id={`${id}-note`} className={`signup-note${state === "error" ? " is-error" : ""}`} aria-live="polite">
        {note}
      </p>
      {wa ? (
        <p className="signup-wa">
          or{" "}
          <a href={wa} target="_blank" rel="noopener" onClick={() => track("wa_click", { form: where })}>
            Join on WhatsApp
          </a>
        </p>
      ) : null}
      <p className="signup-small">{small}</p>
    </div>
  );
}
