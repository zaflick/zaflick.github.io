import { pageMeta } from "@/lib/seo";
import { EMAIL, links, WHATSAPP } from "@/lib/site";
import { Crumbs, PageHead } from "@/components/site/bits";
import LeadForm from "@/components/site/LeadForm";

// New copy: TODO-approve. Which inbox handles collabs, partners and press is TODO-confirm.
export const metadata = pageMeta({
  title: "Contact Zaflick: questions, collabs, partners and press",
  description:
    "How to reach Zaflick: message @houseofzaflick on Instagram, or email us about collaborations, partnerships, press or your data.",
  path: "/contact",
});

const ROUTES = [
  { h: "Questions", t: "Launch, sizes, the Circle. Most answers are in the FAQ.", cta: { label: "Read the FAQ", href: links.faq } },
  { h: "Creators and collabs", t: "Send your handle, city and a line about what you make.", cta: { label: EMAIL.marketing, href: `mailto:${EMAIL.marketing}?subject=Collab` } },
  { h: "Studios, run clubs and partners", t: "Tell us about your community and your city.", cta: { label: EMAIL.marketing, href: `mailto:${EMAIL.marketing}?subject=Partnership` } },
  { h: "Press", t: "Your publication and your deadline.", cta: { label: EMAIL.marketing, href: `mailto:${EMAIL.marketing}?subject=Press` } },
  { h: "Your data", t: "Access, correction or deletion.", cta: { label: EMAIL.admin, href: `mailto:${EMAIL.admin}` } },
];

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageHead eyebrow="Contact" title="Talk to us" lede="Message us about anything. We reply to every message.">
        <div className="actions">
          <a className="btn btn-ink" href={links.instagram} rel="noopener" target="_blank">
            Message @houseofzaflick <span aria-hidden="true">↗</span>
          </a>
          {WHATSAPP ? (
            <a className="btn btn-ghost" href={`https://wa.me/${WHATSAPP}`} rel="noopener" target="_blank" data-track="wa_click">
              WhatsApp <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </PageHead>

      <ul className="routes">
        {ROUTES.map((r) => (
          <li key={r.h} className="route reveal">
            <h2 className="route-h">{r.h}</h2>
            <p className="soft">{r.t}</p>
            <a className="text-link" href={r.cta.href}>{r.cta.label}</a>
          </li>
        ))}
      </ul>

      <section className="section form-section" aria-labelledby="msg-h">
        <div className="form-intro">
          <h2 id="msg-h" className="display section-h">Send a message</h2>
          <p className="soft">Or write to us here and we&apos;ll reply by email.</p>
        </div>
        <LeadForm
          kind="contact"
          submit="Send message"
          done={{ title: "Message sent.", text: "Thank you. We'll reply by email." }}
          fields={[
            { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
            { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
            { name: "topic", label: "About", type: "select", required: true, options: ["A question", "Creator or collab", "Studio, run club or partner", "Press", "My data", "Something else"] },
            { name: "message", label: "Message", type: "textarea", required: true },
          ]}
        />
      </section>
    </main>
  );
}
