import { pageMeta } from "@/lib/seo";
import { LOOKS } from "@/lib/content/looks";
import { Crumbs, PageHead, LookCard, ConceptNote, JoinBand } from "@/components/site/bits";

export const metadata = pageMeta({
  title: "Athleisure looks: matching sets for her and him | Zaflick", // TODO-approve
  description: "The seven pieces are designed to be worn as sets. Four looks from the first Zaflick drop, for her and for him.",
  path: "/looks",
});

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Looks", path: "/looks" }]} />
      <PageHead eyebrow="The first drop" title="Looks" lede="The seven pieces are designed to be worn as sets. These are the four we had in mind." />
      <section className="looks" aria-label="Four looks">
        {LOOKS.map((l, i) => (
          <LookCard key={l.id} look={l} flip={i % 2 === 1} />
        ))}
        <ConceptNote />
      </section>
      <JoinBand where="looks" />
    </main>
  );
}
