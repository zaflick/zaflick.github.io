import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, bySlug, COLLECTIONS } from "@/lib/content/products";
import { pageMeta } from "@/lib/seo";
import { SITE_URL, links } from "@/lib/site";
import { Crumbs, Img, ConceptNote, JsonLd, ProductCard, JoinBand } from "@/components/site/bits";

export const dynamicParams = false;
export const generateStaticParams = () => PRODUCTS.map((p) => ({ product: p.slug }));

/** Keyword titles per piece. TODO-approve. */
const SEO_TITLE: Record<string, string> = {
  "tank-top": "Tank top with built-in support | Zaflick",
  "active-legging": "High-waisted legging with a phone pocket | Zaflick",
  "sports-bra": "Medium-support sports bra | Zaflick",
  "fitted-jacket": "Fitted zip jacket with thumbhole cuffs | Zaflick",
  "active-tshirt": "Men's boxy active T-shirt | Zaflick",
  "wide-leg-pants": "Men's wide-leg athleisure pants | Zaflick",
  "athleisure-shorts": "Men's athleisure shorts with drawcord | Zaflick",
};

type Props = { params: Promise<{ product: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = bySlug((await params).product);
  if (!p) return {};
  return pageMeta({ title: SEO_TITLE[p.slug] || `${p.name} | Zaflick`, description: p.description, path: `/${p.slug}`, image: `/assets/img/og-${p.slug}.jpg` });
}

export default async function Page({ params }: Props) {
  const p = bySlug((await params).product);
  if (!p) notFound();
  const col = COLLECTIONS[p.gender];
  const gallery = [
    { img: `p-${p.slug}-front`, alt: `${p.name}, front view` },
    { img: `p-${p.slug}-back`, alt: `${p.name}, back view` },
    { img: p.model, alt: `${p.name} worn` },
    { img: `p-${p.slug}-detail`, alt: `${p.name}, detail` },
    { img: p.life.img, alt: p.life.alt },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: [`${SITE_URL}/assets/img/og-${p.slug}.jpg`, `${SITE_URL}/assets/img/p-${p.slug}-back.webp`, `${SITE_URL}/assets/img/p-${p.slug}-detail.webp`],
    brand: { "@type": "Brand", name: "Zaflick" },
    color: p.colour,
    audience: { "@type": "PeopleAudience", suggestedGender: p.gender === "her" ? "female" : "male" },
    url: `${SITE_URL}/${p.slug}`,
  };

  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: col.crumb, path: `/${p.gender}` }, { name: p.name, path: `/${p.slug}` }]} />
      <div className="pdp">
        <div className="pdp-gallery" role="list" aria-label={`${p.name} images`}>
          {gallery.map((g, i) => (
            <figure key={g.img} role="listitem" className={`pdp-shot${i === 0 ? " is-main" : ""}`}>
              <Img name={g.img} alt={g.alt} eager={i === 0} sizes="(max-width: 900px) 100vw, 50vw" />
              {i === 0 ? <span className="tag mono">Concept</span> : null}
            </figure>
          ))}
        </div>
        <div className="pdp-info">
          <p className="eyebrow mono">The first drop, for {p.gender}</p>
          <h1 className="display pdp-h">{p.name}</h1>
          <p className="pdp-lede">{p.lede}</p>
          <dl className="pdp-facts">
            <div>
              <dt className="mono">Status</dt>
              <dd>Concept, first drop</dd>
            </div>
            <div>
              <dt className="mono">Shown in</dt>
              <dd>{p.colour}</dd>
            </div>
            <div>
              <dt className="mono">Price</dt>
              <dd>Shared with the early list first</dd>
            </div>
          </dl>
          <a className="btn btn-accent btn-lg pdp-cta" href={links.early} data-join={p.name.toLowerCase()}>
            Reserve on the early list
          </a>
          <ul className="ticks pdp-features">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <ConceptNote />
          <p className="pdp-help">
            <a className="text-link" href={links.size}>Size guide</a>
            <span aria-hidden="true"> · </span>
            <a className="text-link" href={links.faq}>Questions</a>
          </p>
        </div>
      </div>

      <section className="section" aria-labelledby="wear-with">
        <div className="section-head">
          <h2 id="wear-with" className="display">Wear it with</h2>
        </div>
        <ul className="pgrid pgrid-2">
          {p.wearWith.map((s) => (
            <li key={s}>
              <ProductCard p={bySlug(s)!} />
            </li>
          ))}
        </ul>
      </section>
      <JoinBand where={`product-${p.slug}`} />
      <JsonLd data={schema} />
    </main>
  );
}
