import { pageMeta, eventSchema } from "@/lib/seo";
import { Crumbs, PageHead, Img, Todo, JsonLd } from "@/components/site/bits";
import { upcomingMornings } from "@/lib/content/club";
import LeadForm from "@/components/site/LeadForm";

// Whole page is new copy: TODO-approve. The 6am Club format (cities, session types,
// how often) still needs confirming; nothing here promises a date or a city.
export const metadata = pageMeta({
  title: "The 6am Club: early-morning sessions | Zaflick",
  description:
    "The Zaflick 6am Club is for people who train before the day starts. Register your interest and hear first when a session is planned in your city.",
  path: "/6am-club",
});

const STEPS = [
  { h: "Tell us where you are", t: "Your city and what you do at 6am: run, gym, yoga, a walk, anything." },
  { h: "We plan it where people are", t: "Small, early sessions in the cities where enough of you sign up." },
  { h: "You hear first", t: "Members get the date, the place and a spot before it's shared anywhere else." },
];

const fmt = (d: string) => new Date(`${d}T00:00:00+05:30`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata" });

export default function Page() {
  // Filled from lib/content/club.ts; nothing shows until mornings are added there.
  const mornings = upcomingMornings();
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "6am Club", path: "/6am-club" }]} />
      <div className="feature">
        <div className="feature-copy">
          <PageHead
            eyebrow="Community"
            title="The 6am Club"
            lede="For people who train before the day starts, in the kit they'll wear for the rest of it."
          />
          <ol className="steps-list">
            {STEPS.map((s, i) => (
              <li key={s.h}>
                <p className="mono steps-n">0{i + 1}</p>
                <div>
                  <h2 className="steps-h">{s.h}</h2>
                  <p className="soft">{s.t}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="feature-img">
          <Img name="day-him-run" alt="A man in an olive tee and shorts pausing mid-run in a park." eager sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>

      {mornings.length ? (
        <section className="section" aria-labelledby="club-dates">
          <h2 id="club-dates" className="display section-h">Upcoming mornings</h2>
          <ul className="club-dates">
            {mornings.map((m) => (
              <li key={`${m.city}-${m.date}`}>
                <p className="mono">{fmt(m.date)} · {m.start}</p>
                <p className="club-dates-h">{m.activity}, {m.city}</p>
                <p className="soft">{m.venue}</p>
              </li>
            ))}
          </ul>
          <JsonLd data={mornings.map(eventSchema)} />
        </section>
      ) : null}

      <section className="section form-section" aria-labelledby="club-form">
        <div className="form-intro">
          <h2 id="club-form" className="display section-h">Register your interest</h2>
          <p className="soft">It&apos;s free. We&apos;ll only email you about sessions near you.</p>
          <Todo>Confirm the 6am Club format: cities, session types and how often.</Todo>
        </div>
        <LeadForm
          kind="6am-club"
          submit="Count me in"
          done={{ title: "You're on the 6am list.", text: "We'll email you when a session is planned in your city." }}
          fields={[
            { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
            { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
            { name: "city", label: "City", type: "text", required: true, autoComplete: "address-level2" },
            { name: "activity", label: "What do you do at 6am?", type: "select", required: true, options: ["Run", "Gym", "Yoga or Pilates", "Walk", "Cycling", "Something else"] },
          ]}
        />
      </section>
    </main>
  );
}
