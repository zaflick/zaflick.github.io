import { pageMeta, founderSchema } from "@/lib/seo";
import { links, BRAND } from "@/lib/site";
import { Crumbs, PageHead, Img, JoinBand, FounderPhotos, JsonLd, StoryText, Todo } from "@/components/site/bits";
import { FOUNDERS, FOUNDERS_HEADLINE, FOUNDERS_STORY } from "@/lib/content/founders";

export const metadata = pageMeta({
  title: "About Zaflick: clothes for whatever the plan", // TODO-approve
  description:
    "Zaflick is an Indian athleisure brand for good times with friends: five pieces for women and men, one outfit for a walk, a game or a coffee, starting in Hyderabad and Bengaluru.",
  path: "/about",
  image: "/assets/img/og-about.jpg",
});

// Rewritten for the 15 Nov brand update. All copy: TODO-approve. The survey numbers were already public.
const NUMBERS = [
  { v: "~200", k: "People surveyed before designing" },
  { v: "12+", k: "Interviews about what goes wrong with activewear in India" },
  { v: "5", k: "Pieces in the first drop, for women and men" },
];

const PRINCIPLES = [
  {
    h: "Style first",
    t: "Designed to look right at the café, not only on the court. One outfit for the whole plan, with no changing in between.",
  },
  {
    h: "Built for Indian weather",
    t: "Fabric chosen for heat and humidity, and sizing built on Indian measurements. We are testing the fabric for pilling and shape before anything goes on sale.",
  },
  {
    h: "Small batches, sold direct",
    t: "Made in small batches and sold direct. Every image here is a concept: the Circle sees the real samples first.",
  },
];

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Our story", path: "/about" }]} />
      <PageHead
        eyebrow="About Zaflick"
        title="Dressed for every good time with friends."
        lede="Zaflick is an Indian athleisure brand for the plans you make with friends: a walk, a game, a coffee, a day out. One outfit that is ready for any of them, and looks good the whole way through."
      />
      <div className="banner">
        <Img name="hero-both" alt="A man in an olive set and a woman in an aubergine set talking at a coffee bar." eager sizes="(max-width: 900px) 100vw, 50vw" />
      </div>

      <section className="section split-2" aria-labelledby="why-h">
        <h2 id="why-h" className="display section-h">Why Zaflick</h2>
        <div className="lead-text">
          <p>
            You know when friends make a plan and you think, I&apos;m not dressed for that? We make clothes so that never happens. One outfit takes
            you from a walk to a game to dinner, and you look good the whole way.
          </p>
          <p className="soft">
            Jeans can&apos;t do the game. Gym wear looks wrong at the coffee after. Zaflick does both. Five pieces for women and men, starting in
            Hyderabad and Bengaluru.
          </p>
        </div>
      </section>

      {/* The founders (27 Nov). Photos stay a pair in their own column, apart from the bios: who is in which photo isn't confirmed.
          Guess lines (lib/content/founders.ts) are left out of the live site until Rahul confirms them. */}
      <section className="section founders" id="founders" aria-labelledby="founders-h">
        <div className="section-head">
          <div>
            <p className="eyebrow mono">The founders</p>
            <h2 id="founders-h" className="display">
              {FOUNDERS_HEADLINE}
            </h2>
          </div>
        </div>
        <Todo>Highlighted lines are our guesses: the why, the when and two cheeky lines. They stay off the live site until Rahul confirms them.</Todo>
        <div className="split-2">
          <FounderPhotos sizes="(max-width: 620px) 45vw, (max-width: 999px) 275px, 21vw" />
          <div className="founders-text">
            <div className="lead-text">
              <StoryText lines={FOUNDERS_STORY} />
            </div>
            {FOUNDERS.map((f) => (
              <div key={f.id} id={f.id} className="founder-bio">
                <h3 className="founder-name">{f.name}</h3>
                <StoryText lines={f.bio} className="soft" />
              </div>
            ))}
          </div>
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

      <section className="section narrow" aria-label="Company">
        <p className="soft">
          {BRAND.name} is made by {BRAND.legal}, India. Questions? <a className="text-link" href={links.contact}>Contact us</a>.
        </p>
      </section>
      <JoinBand where="about" />
      <JsonLd data={founderSchema()} />
    </main>
  );
}
