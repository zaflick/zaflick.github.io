import { pageMeta } from "@/lib/seo";
import { links } from "@/lib/site";
import { Crumbs, PageHead, Img, Todo } from "@/components/site/bits";
import LeadForm from "@/components/site/LeadForm";

// DRAFT page (preview only until approved). All copy TODO-approve.
// Before it goes live: add the "crew" tab to the Apps Script (scripts/zaflick-forms.gs) and deploy a new version.
export const metadata = pageMeta({
  title: "Cast your crew: be in Zaflick's first shoot",
  description:
    "Apply with your friends to be photographed in Zaflick's first samples, doing what you actually do together. Crews of three or four in Hyderabad and Bengaluru.",
  path: "/cast-your-crew",
});

const HOW = [
  { h: "Apply as a crew", t: "One of you fills this in for three or four friends who actually make plans together." },
  { h: "We pick a few crews", t: "A few crews in each city. We call you to plan the day around something you already do." },
  { h: "Your plan, our camera", t: "A walk, a game, chai after. We shoot it as it happens. No poses, no script." },
];

const LOOKING = [
  "Friends who already make plans together, not a group put together for the day",
  "Crews of three or four, any mix of people",
  "In Hyderabad or Bengaluru",
  "No modelling experience, no follower count needed",
];

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Cast your crew", path: "/cast-your-crew" }]} />
      <div className="feature">
        <div className="feature-copy">
          <PageHead
            eyebrow="Cast your crew"
            title="Bring your people. Be in our first shoot."
            lede="When the first Zaflick samples arrive, we're photographing real friend groups in Hyderabad and Bengaluru, doing what they actually do together."
          />
          <ul className="ticks">
            {LOOKING.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
        <div className="feature-img">
          <Img name="friends" alt="Four friends in tonal sets talking around a table on a terrace café." eager sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>

      <section className="section" aria-labelledby="how-h">
        <div className="section-head">
          <h2 id="how-h" className="display">How it works</h2>
        </div>
        <ol className="principles">
          {HOW.map((d, i) => (
            <li key={d.h} className="reveal">
              <p className="mono principles-n">0{i + 1}</p>
              <h3 className="principles-h">{d.h}</h3>
              <p className="soft">{d.t}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section form-section" aria-labelledby="apply-h">
        <div className="form-intro">
          <h2 id="apply-h" className="display section-h">Apply as a crew</h2>
          <p className="soft">
            Everyone in the crew needs to be 18 or over. We only use these details to contact you about the shoot. Not picked this time? Join{" "}
            <a className="text-link" href={links.circle}>the Circle</a> and you&apos;ll still see the samples first.
          </p>
          <Todo>
            Confirm with Rahul: shoot dates (samples arrive end of November), how many crews per city, whether crews keep the outfits, and the
            photo release form each person signs.
          </Todo>
        </div>
        <LeadForm
          kind="crew"
          submit="Send our application"
          done={{ title: "Your crew is in the running.", text: "Thank you. We'll be in touch once the samples are in, either way." }}
          fields={[
            { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
            { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
            { name: "city", label: "City", type: "select", required: true, options: ["Hyderabad", "Bengaluru"] },
            { name: "crew_size", label: "How many of you, including you?", type: "select", required: true, options: ["3", "4"] },
            {
              name: "crew",
              label: "Who's in your crew?",
              type: "textarea",
              required: true,
              placeholder: "First names, and Instagram handles if they're happy to share",
            },
            {
              name: "plan",
              label: "What's your usual plan together?",
              type: "select",
              required: true,
              options: ["Walks", "A game or a sport", "Cafés and food", "Days out", "A mix"],
            },
            { name: "why", label: "Tell us about your crew in a line or two", type: "textarea", required: true },
            { name: "instagram", label: "Your Instagram handle", type: "text", placeholder: "@" },
            { name: "sizes", label: "Sizes in your crew", type: "text", placeholder: "For example: S, M, M, L", hint: "Sizes run XS to XL." },
          ]}
        />
      </section>
    </main>
  );
}
