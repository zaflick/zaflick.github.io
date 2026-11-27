import { FounderPhotos, JsonLd, StoryText, Todo } from "@/components/site/bits";
import SignupForm from "@/components/site/SignupForm";
import BringFriend from "@/components/home/BringFriend";
import HeroFabric from "@/components/home/HeroFabric";
import StitchStory from "@/components/home/StitchStory";
import { DROP1 } from "@/lib/content/products";
import { FOUNDERS_NOTE } from "@/lib/content/founders";
import { pageMeta, orgSchema, websiteSchema } from "@/lib/seo";
import { BENEFITS, href, links } from "@/lib/site";

/*
 * Homepage, rebuilt for the 15 Nov 2026 brand update ("Whatever the plan, you're in").
 * Seven sections from Rahul's brief, phone first. Until the sample shoot there are no
 * photos here: the brief rules out AI-generated garments shown as the product. The top
 * section sits on the 3D knit fabric from the old scroll story, and the cut-and-stitch
 * animation (3D, labelled as an illustration) leads into The clothes.
 *   1 Top · 2 The reason · 3 The clothes · 4 Fit and fabric (hidden until wash tests are done)
 *   5 Bring a friend · 6 Who we are (the founders' note, 27 Nov) · 7 How it works
 * All copy on this page: TODO-approve.
 */

export const metadata = pageMeta({
  title: "Whatever the plan, you're in | Zaflick athleisure",
  description:
    "Clothes for good times with friends: one outfit for a walk, a game or a coffee, no changing in between. Five pieces, starting in Hyderabad and Bengaluru.",
  path: "/",
});

const PLANS = ["A walk", "A game", "A coffee", "A day out"];

const REASONS = [
  { k: "On a walk", t: "Out the door in it, with a pocket for your phone." },
  { k: "In a game", t: "Room to move when someone says one more round." },
  { k: "At a café", t: "Still looks put together when you sit down after." },
];

const HOW = [
  { k: "Small batches", t: "Designed in India, made in small batches and sold direct." },
  {
    k: "The Circle first",
    t: "The first drop opens in December, to the Circle before anyone else. Circle members can buy 48 hours early, with free shipping on their launch order.",
  },
  { k: "Delivery", t: "Men's pieces are expected from mid-December and women's pieces from 1 January." },
  { k: "Sessions", t: "We are starting sessions in Hyderabad." },
];

const forWho = (p: (typeof DROP1)[number]) => (p.unisex ? "Unisex" : p.gender === "her" ? "For her" : "For him");

export default function Page() {
  return (
    <main id="content" className="home">
      {/* 1 · Top, over the 3D fabric. The real group photo can join it after the sample shoot. */}
      <section className="home-top" aria-labelledby="home-title">
        <HeroFabric />
        <div className="home-top-copy">
          <p className="eyebrow mono">Zaflick · Hyderabad and Bengaluru</p>
          <h1 id="home-title" className="display">
            Whatever the plan, you&apos;re in.
          </h1>
          <p className="home-lede">Clothes for good times with friends, and for looking good the whole way through.</p>
          <ul className="plan-chips" aria-label="Plans it is made for">
            {PLANS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <a className="btn btn-accent btn-lg" href={links.circle} data-join="">
            Join the Circle <span aria-hidden="true">↗</span>
          </a>
          <p className="home-small">The first drop opens to the Circle first, in December.</p>
        </div>
      </section>

      {/* 2 · The reason */}
      <section className="home-sec" aria-labelledby="reason-h">
        <p className="eyebrow mono">The reason</p>
        <h2 id="reason-h" className="display">Ready for any plan. No changing in between.</h2>
        <p className="home-sub">Jeans can&apos;t do the game. Gym wear looks wrong at the coffee after. One Zaflick outfit does both.</p>
        <ol className="plan-tiles">
          {REASONS.map((r, i) => (
            <li key={r.k} className="reveal" style={{ ["--d" as string]: i }}>
              <p className="plan-k display">{r.k}</p>
              <p className="soft">{r.t}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* The clothing animation: fabric cut and stitched into the legging and the tee (3D, pinned). */}
      <StitchStory />

      {/* 3 · The clothes. Real photos with height and size worn replace this list after the shoot. */}
      <section className="home-sec" aria-labelledby="clothes-h">
        <div className="section-head">
          <div>
            <p className="eyebrow mono">The clothes</p>
            <h2 id="clothes-h" className="display">Five pieces in the first drop</h2>
          </div>
          <p className="home-links">
            <a className="text-link" href={links.her}>For her →</a>
            <a className="text-link" href={links.him}>For him →</a>
          </p>
        </div>
        <ul className="piece-list">
          {DROP1.map((p) => (
            <li key={p.slug}>
              <a href={href(`/${p.slug}`)}>
                <span className="piece-name display">{p.name}</span>
                <span className="mono soft">{forWho(p)}</span>
                <span className="piece-good">{p.goodFor}</span>
                <span className="mono soft">Price with the Circle first</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="home-note soft">Photos of the real samples, on real people, come after the sample shoot.</p>
      </section>

      {/* 4 · Fit and fabric: left out until the sizing and wash tests are done (brief, section 04). */}

      {/* 5 · Bring a friend */}
      <BringFriend />

      {/* 6 · Who we are: the founders' note. The photos are a pair, never captioned one by one (lib/content/founders.ts). */}
      <section className="home-sec home-founders" aria-labelledby="founders-h">
        <div className="home-founders-copy">
          <p className="eyebrow mono">Who we are</p>
          <h2 id="founders-h" className="display">
            {FOUNDERS_NOTE.title}
          </h2>
          <StoryText lines={FOUNDERS_NOTE.text} className="home-sub" />
          <p className="founders-sign mono">{FOUNDERS_NOTE.sign}</p>
          <a className="text-link" href={`${links.about}#founders`}>
            Read the whole story →
          </a>
        </div>
        <FounderPhotos sizes="(max-width: 620px) 45vw, (max-width: 899px) 275px, 22vw" />
      </section>

      {/* 7 · How it works */}
      <section className="home-sec" aria-labelledby="how-h">
        <p className="eyebrow mono">How it works</p>
        <h2 id="how-h" className="display">Small batch, the Circle first</h2>
        <ol className="how-steps">
          {HOW.map((s, i) => (
            <li key={s.k} className="reveal" style={{ ["--d" as string]: i }}>
              <p className="mono how-n">0{i + 1}</p>
              <h3 className="how-k">{s.k}</h3>
              <p className="soft">{s.t}</p>
            </li>
          ))}
        </ol>
        <Todo>Booking amount (how much, and whether it is refundable) and the exchange policy, once decided.</Todo>
      </section>

      <section className="home-join" aria-labelledby="join-h">
        <h2 id="join-h" className="display">Whatever the plan, you&apos;re in.</h2>
        <ul className="ticks">
          {BENEFITS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <SignupForm where="home-end" tone="dark" />
      </section>

      <JsonLd data={[orgSchema(), websiteSchema()]} />
    </main>
  );
}
