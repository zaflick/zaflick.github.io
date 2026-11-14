import { pageMeta, faqSchema } from "@/lib/seo";
import { qa } from "@/lib/content/faq";
import { BENEFITS, links } from "@/lib/site";
import { Crumbs, Img, FaqList, JsonLd } from "@/components/site/bits";
import SignupForm from "@/components/site/SignupForm";

export const metadata = pageMeta({
  title: "Join the Zaflick early list: first look at the first drop", // TODO-approve
  description:
    "Join the Zaflick early list: see the real samples first, buy 48 hours before the public launch, and free shipping on your launch order.",
  path: "/early-list",
});

// The early-list page on zaflick.com answers these four, with slightly shorter wording for launch.
const QUESTIONS = [
  { ...qa("launch"), a: "We are finalising samples now. People on the early list will hear the date first." },
  qa("price"),
  qa("photos-real"),
  qa("messages"),
];

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Early list", path: "/early-list" }]} />
      <div className="early">
        <div className="early-copy">
          <p className="eyebrow mono">Early list</p>
          <h1 className="display">Join before the first drop</h1>
          <p className="page-lede">The first drop opens to the early list before anyone else.</p>
          <ul className="ticks early-ticks">
            {BENEFITS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="early-form">
            <SignupForm where="early-list" />
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
