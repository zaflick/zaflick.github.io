"use client";

import { useId, useState } from "react";
import { EMAIL_RE, getSource } from "@/lib/member";
import { track } from "@/lib/track";
import { FORMS_ENDPOINT, IS_LIVE, EMAIL, links } from "@/lib/site";

export type Field =
  | { name: string; label: string; type: "text" | "email"; required?: boolean; autoComplete?: string; placeholder?: string; hint?: string }
  | { name: string; label: string; type: "select"; options: string[]; required?: boolean; hint?: string }
  | { name: string; label: string; type: "textarea"; required?: boolean; placeholder?: string; hint?: string };

type Props = {
  /** Which form (tester, club, contact): sent with the data and the events. */
  kind: string;
  fields: Field[];
  submit: string;
  done: { title: string; text: string };
};

const SUBJECT: Record<string, string> = {
  "founding-tester": "Founding Testers application",
  contact: "Message from zaflick.com",
  crew: "Cast your crew application",
};

/** A prefilled email to marketing@ with the visitor's answers (used until the forms sheet exists). */
function mailtoFor(kind: string, fields: Field[], data: Record<string, string>) {
  const lines = fields.map((f) => `${f.label}: ${(data[f.name] || "").trim() || "-"}`);
  const src = Object.entries(getSource())
    .map(([k, v]) => `${k}=${v}`)
    .join(", ");
  if (src) lines.push("", `Source: ${src}`);
  const subject = encodeURIComponent(SUBJECT[kind] || SUBJECT.contact);
  return `mailto:${EMAIL.marketing}?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * Applications and messages (Founding Testers, contact).
 * Prototype: validates, then shows the thank-you without sending anything.
 * Live: posts JSON to the Apps Script endpoint on marketing@ (NEXT_PUBLIC_FORMS_ENDPOINT).
 * Live without an endpoint: opens a prefilled email to marketing@ instead.
 */
export default function LeadForm({ kind, fields, submit, done }: Props) {
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "done" | "emailed" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    fields.forEach((f) => {
      const v = (data[f.name] || "").trim();
      if (f.required && !v) errs[f.name] = "Please fill this in.";
      else if (f.type === "email" && v && !EMAIL_RE.test(v)) errs[f.name] = "That email address does not look right.";
    });
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = fields.find((f) => errs[f.name]);
      if (first) document.getElementById(`${id}-${first.name}`)?.focus();
      return;
    }
    if (IS_LIVE && !FORMS_ENDPOINT) {
      location.href = mailtoFor(kind, fields, data);
      track("form_submit", { form: kind, via: "email" });
      setState("emailed");
      return;
    }
    setState("sending");
    try {
      if (IS_LIVE && FORMS_ENDPOINT) {
        // text/plain keeps it a "simple" request, which Apps Script web apps accept without CORS preflight.
        const res = await fetch(FORMS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ kind, ...data, ...getSource(), page: location.pathname }),
        });
        if (!res.ok) throw new Error("failed");
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
      track("form_submit", { form: kind });
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "emailed") {
    return (
      <div className="lead-done" role="status">
        <h3 className="display">Almost there</h3>
        <p>Your email app has opened with your message to {EMAIL.marketing}. Press send and we&rsquo;ll reply.</p>
        <p className="soft">
          Nothing opened? Email us at <a className="text-link" href={`mailto:${EMAIL.marketing}`}>{EMAIL.marketing}</a>.
        </p>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="lead-done" role="status">
        <h3 className="display">{done.title}</h3>
        <p>{done.text}</p>
        {!IS_LIVE ? <p className="mono soft">Prototype: nothing was sent.</p> : null}
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      {fields.map((f) => {
        const fid = `${id}-${f.name}`;
        const err = errors[f.name];
        const describedBy = [f.hint ? `${fid}-hint` : "", err ? `${fid}-err` : ""].filter(Boolean).join(" ") || undefined;
        const common = {
          id: fid,
          name: f.name,
          "aria-invalid": err ? true : undefined,
          "aria-describedby": describedBy,
          required: f.required,
        };
        return (
          <div key={f.name} className={`field${f.type === "textarea" ? " field-wide" : ""}`}>
            <label htmlFor={fid}>
              {f.label}
              {f.required ? null : <span className="soft"> (optional)</span>}
            </label>
            {f.type === "select" ? (
              <select {...common} defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea {...common} rows={4} placeholder={f.placeholder} />
            ) : (
              <input {...common} type={f.type} autoComplete={f.autoComplete} placeholder={f.placeholder} />
            )}
            {f.hint ? <p id={`${fid}-hint`} className="field-hint">{f.hint}</p> : null}
            {err ? <p id={`${fid}-err`} className="field-err">{err}</p> : null}
          </div>
        );
      })}
      <div className="field-wide lead-actions">
        <button type="submit" className="btn btn-accent btn-lg" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : submit}
        </button>
        <p className="field-hint" aria-live="polite">
          {state === "error" ? (
            <span className="field-err">
              That did not go through. Try again, or email <a href={`mailto:${EMAIL.marketing}`}>{EMAIL.marketing}</a>.
            </span>
          ) : (
            <>
              We only use this to reply to you. See our <a className="text-link" href={links.privacy}>privacy page</a>.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
