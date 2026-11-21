import { pageMeta, faqSchema } from "@/lib/seo";
import { qa } from "@/lib/content/faq";
import { BENEFITS, links } from "@/lib/site";
import { Crumbs, Img, FaqList, JsonLd } from "@/components/site/bits";
import SignupForm from "@/components/site/SignupForm";

export const metadata = pageMeta({
  title: "Join the Zaflick Circle: whatever the plan, you're in", // TODO-approve
  description:
    "Join the Zaflick Circle: see the real samples first, buy 48 hours before the public launch in December, and get free shipping on your launch order.",
  path: "/circle",
});

// The Circle page (formerly /early-list) answers these four.
const QUESTIONS = [
  qa("launch"),
  qa("price"),
  qa("photos-real"),
  qa("messages"),
];

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "The Circle", path: "/circle" }]} />
      <div className="early">
        <div className="early-copy">
          <p className="eyebrow mono">The Circle</p>
          <h1 className="display">Whatever the plan, you&apos;re in.</h1>
          <p className="page-lede">
            The Circle is Zaflick&apos;s list. The first drop opens to the Circle before anyone else, starting in Hyderabad and Bengaluru.
          </p>
          <ul className="ticks early-ticks">
            {BENEFITS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="early-form">
            <SignupForm where="circle" />
          </div>
        </div>
        <div className="early-img">
          <Img name="friends" alt="Four friends in tonal sets talking around a table on a terrace café." eager sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>

      <section className="section narrow" aria-labelledby="early-faq">
        <h2 id="early-faq" className="display section-h">Questions people ask</h2>
        <FaqList items={QUESTIONS} />
        <p className="more-link">
          <a className="text-link" href={links.faq}>See all questions →</a>
        </p>
      </section>
      <JsonLd data={faqSchema(QUESTIONS)} />
    </main>
  );
}
