import { pageMeta } from "@/lib/seo";
import { LOOKS } from "@/lib/content/looks";
import { Crumbs, PageHead, LookCard, ConceptNote, JoinBand } from "@/components/site/bits";

export const metadata = pageMeta({
  title: "Athleisure looks: matching sets for her and him | Zaflick", // TODO-approve
  description: "The five pieces of the first Zaflick drop are made to be worn as sets: one outfit, whatever the plan. Looks for her and for him.",
  path: "/looks",
});

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Looks", path: "/looks" }]} />
      <PageHead eyebrow="The first drop" title="Looks" lede="The five pieces are made to be worn as sets. One outfit for a walk, a game or a coffee, with no changing in between." />
      <section className="looks" aria-label="Looks">
        {LOOKS.map((l, i) => (
          <LookCard key={l.id} look={l} flip={i % 2 === 1} />
        ))}
        <ConceptNote />
      </section>
      <JoinBand where="looks" />
    </main>
  );
}
