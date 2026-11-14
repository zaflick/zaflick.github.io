import { pageMeta } from "@/lib/seo";
import { links } from "@/lib/site";
import { Crumbs, PageHead, Img, Todo } from "@/components/site/bits";
import LeadForm from "@/components/site/LeadForm";

// Whole page is new copy: TODO-approve. "Selected testers wear a sample set" needs confirming.
export const metadata = pageMeta({
  title: "Become a Zaflick Founding Tester",
  description:
    "Apply to be a Zaflick Founding Tester: wear the samples before launch, in real life, and tell us honestly what to change before the first drop.",
  path: "/founding-testers",
});

const DO = [
  { h: "Wear the samples for real", t: "Training, the commute, a full workday. The way you'd actually wear them." },
  { h: "Tell us what to change", t: "A short questionnaire and a quick call. Honest beats polite." },
  { h: "No posting required", t: "Share it if you love it. You don't have to." },
];
const GET = ["A first look at the real samples", "Your feedback shapes the final pieces", "Selected testers wear a sample set"];

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Founding Testers", path: "/founding-testers" }]} />
      <div className="feature">
        <div className="feature-copy">
          <PageHead
            eyebrow="Founding Testers"
            title="Wear it before anyone else. Tell us what to fix."
            lede="We're choosing a small group to wear the samples before launch and tell us, honestly, what to change."
          />
          <ul className="ticks">
            {GET.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
        <div className="feature-img">
          <Img name="day-her-gym" alt="A woman in an aubergine set training with a dumbbell." eager sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>

      <section className="section" aria-labelledby="do-h">
        <div className="section-head">
          <h2 id="do-h" className="display">What testers do</h2>
        </div>
        <ol className="principles">
          {DO.map((d, i) => (
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
          <h2 id="apply-h" className="display section-h">Apply</h2>
          <p className="soft">
            We&apos;re looking for people who train regularly and want kit that lasts the whole day, across sizes and cities. Not chosen this time? You
            stay on the <a className="text-link" href={links.early}>early list</a> and still see the samples first.
          </p>
          <Todo>Confirm: how many testers, whether every tester gets a set, and the timeline (samples arrive end of November).</Todo>
        </div>
        <LeadForm
          kind="founding-tester"
          submit="Send my application"
          done={{ title: "Application received.", text: "Thank you. We'll email you either way once the samples are in." }}
          fields={[
            { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
            { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
            { name: "city", label: "City", type: "text", required: true, autoComplete: "address-level2" },
            { name: "for", label: "Which pieces would you test?", type: "select", required: true, options: ["For her", "For him"] },
            { name: "training", label: "How do you train?", type: "select", required: true, options: ["Gym", "Running", "Yoga or Pilates", "Sport", "Walking", "A mix"] },
            { name: "often", label: "How often?", type: "select", required: true, options: ["1–2 times a week", "3–4 times a week", "5 or more times a week"] },
            { name: "size", label: "Your usual size", type: "select", required: true, options: ["XS", "S", "M", "L", "XL", "XXL", "Not sure"] },
            { name: "instagram", label: "Instagram handle", type: "text", placeholder: "@" },
            { name: "problem", label: "What goes wrong with your activewear now?", type: "textarea", required: true },
          ]}
        />
      </section>
    </main>
  );
}
