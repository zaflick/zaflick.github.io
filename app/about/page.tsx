import { pageMeta } from "@/lib/seo";
import { links, BRAND, IS_LIVE } from "@/lib/site";
import { Crumbs, PageHead, Img, Todo, JoinBand } from "@/components/site/bits";

export const metadata = pageMeta({
  title: "About Zaflick: athleisure designed in India", // TODO-approve
  description:
    "Zaflick is an Indian athleisure brand: seven pieces for women and men, designed from a survey of nearly 200 people to be worn from a morning session to dinner.",
  path: "/about",
  image: "/assets/img/og-about.jpg",
});

// Every fact on this page is already public on zaflick.com. Headings marked TODO-approve are new.
const NUMBERS = [
  { v: "~200", k: "People surveyed before designing" },
  { v: "12+", k: "Interviews about what goes wrong with activewear in India" },
  { v: "7", k: "Pieces in the first drop, for women and men" },
];

const PRINCIPLES = [
  {
    h: "It has to work at 6am too",
    t: "The pieces are built to train in first: support that stays put, a waistband that does not roll, and fabric being tested for see-through and pilling. Everything after that is the point of athleisure.",
  },
  {
    h: "Built for Indian weather and sizes",
    t: "Fabric chosen for heat and humidity, and sizing graded on Indian body measurements.",
  },
  {
    h: "The early list sees it first",
    t: "Every image here is a concept. Real samples are shown to the early list before anything goes on sale.",
  },
];

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Our story", path: "/about" }]} />
      <PageHead
        eyebrow="About Zaflick"
        title="Made for the whole day, not just the workout." /* TODO-approve */
        lede="Zaflick is an Indian athleisure brand. Seven pieces for women and men, designed to be worn from a morning session through the rest of the day, not only at the gym."
      />
      <div className="banner">
        <Img name="hero-both" alt="A man in an olive set and a woman in an aubergine set talking at a coffee bar." eager sizes="(max-width: 900px) 100vw, 50vw" />
      </div>

      <section className="section split-2" aria-labelledby="why-h">
        <h2 id="why-h" className="display section-h">Why Zaflick</h2>
        <div className="lead-text">
          <p>
            Most activewear asks you to choose between looking right and performing. These pieces are designed to do both: fabric chosen for heat
            and humidity, a waistband that stays put, pockets that hold a phone, and cuts you can wear to dinner.
          </p>
          <p className="soft">One set, from the morning session to dinner. It starts as training kit and stays on all day.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="asked-h">
        <div className="section-head">
          <h2 id="asked-h" className="display">We asked before designing</h2>
        </div>
        <ul className="numbers">
          {NUMBERS.map((n) => (
            <li key={n.k} className="reveal">
              <p className="display numbers-v">{n.v}</p>
              <p className="mono numbers-k">{n.k}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="how-h">
        <div className="section-head">
          <h2 id="how-h" className="display">How it is being made</h2>
        </div>
        <ol className="principles">
          {PRINCIPLES.map((p, i) => (
            <li key={p.h} className="reveal">
              <p className="mono principles-n">0{i + 1}</p>
              <h3 className="principles-h">{p.h}</h3>
              <p className="soft">{p.t}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Shown in the prototype only, until the founder story arrives. */}
      {IS_LIVE ? null : (
        <section className="section" aria-labelledby="founders-h">
          <div className="section-head">
            <h2 id="founders-h" className="display">The founders</h2>
          </div>
          <Todo>
            Founder names, roles, photos and the &ldquo;why we started&rdquo; story, from the founders. This section is hidden on the live site until they
            arrive.
          </Todo>
        </section>
      )}

      <section className="section narrow" aria-label="Company">
        <p className="soft">
          {BRAND.name} is made by {BRAND.legal}, India. Questions? <a className="text-link" href={links.contact}>Contact us</a>.
        </p>
      </section>
      <JoinBand where="about" />
    </main>
  );
}
