import { COLLECTIONS, forGender, type Gender } from "@/lib/content/products";
import { LOOKS } from "@/lib/content/looks";
import { Crumbs, PageHead, ProductGrid, LookCard, ConceptNote, Img, JoinBand } from "./bits";
import { links } from "@/lib/site";

/** /her and /him: intro, banner, the pieces, then that collection's looks. */
export default function Collection({ g }: { g: Gender }) {
  const c = COLLECTIONS[g];
  const other = g === "her" ? { label: "See the pieces for him", href: links.him } : { label: "See the pieces for her", href: links.her };
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: c.crumb, path: `/${g}` }]} />
      <PageHead eyebrow="The first drop" title={c.title} lede={c.lede} />
      <div className="banner">
        <Img name={c.banner.img} alt={c.banner.alt} eager />
      </div>

      <section className="section" aria-labelledby="pieces-h">
        <div className="section-head">
          <h2 id="pieces-h" className="display">{forGender(g).length} pieces</h2>
          <a className="text-link" href={other.href}>{other.label} →</a>
        </div>
        <ProductGrid products={forGender(g)} />
        <ConceptNote />
      </section>

      <section className="section looks" aria-label="Looks">
        {LOOKS.filter((l) => l.gender === g).map((l, i) => (
          <LookCard key={l.id} look={l} flip={i % 2 === 1} />
        ))}
      </section>

      <JoinBand where={g} />
    </main>
  );
}
