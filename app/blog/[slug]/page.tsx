import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES, article, readMins, type Block } from "@/lib/content/journal";
import { bySlug } from "@/lib/content/products";
import { pageMeta } from "@/lib/seo";
import { SITE_URL, href, BRAND } from "@/lib/site";
import { Crumbs, Img, AnswerBox, ProductCard, JsonLd, JoinBand } from "@/components/site/bits";

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = article((await params).slug);
  if (!a) return {};
  return pageMeta({ title: `${a.short} | Zaflick Blog`, description: a.dek, path: `/blog/${a.slug}`, type: "article" });
}

function BlockView({ b }: { b: Block }) {
  if (typeof b === "string") return <p>{b}</p>;
  if ("list" in b)
    return (
      <ul>
        {b.list.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    );
  return (
    <ol>
      {b.steps.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ol>
  );
}

const fmtDate = (d: string) => new Date(`${d}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function Page({ params }: Props) {
  const a = article((await params).slug);
  if (!a) notFound();
  const others = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  const imgFile = a.img.includes(".") ? a.img : `${a.img}.webp`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.dek,
    image: `${SITE_URL}/assets/img/${imgFile}`,
    datePublished: a.date,
    dateModified: a.date,
    author: { "@type": "Organization", name: BRAND.name, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#org` },
    mainEntityOfPage: `${SITE_URL}/blog/${a.slug}`,
    inLanguage: "en-IN",
  };

  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: a.short, path: `/blog/${a.slug}` }]} />
      <article className="article">
        <header className="article-head">
          <p className="eyebrow mono">
            {a.topic} · <time dateTime={a.date}>{fmtDate(a.date)}</time> · {readMins(a)} min read
            {a.draft ? <span className="draft-tag">Draft · needs approval</span> : null}
          </p>
          <h1 className="display article-h">{a.title}</h1>
          <p className="page-lede">{a.dek}</p>
        </header>
        <div className="article-img">
          <Img name={a.img} alt={a.alt} eager />
        </div>
        <div className="prose">
          <AnswerBox>{a.answer}</AnswerBox>
          {a.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.body.map((b, i) => (
                <BlockView key={i} b={b} />
              ))}
            </section>
          ))}
          {a.cta ? (
            <p>
              <a className="btn btn-ink" href={href(a.cta.href)}>{a.cta.label}</a>
            </p>
          ) : null}
        </div>
      </article>

      <section className="section" aria-labelledby="pieces-h">
        <div className="section-head">
          <h2 id="pieces-h" className="display">The pieces in this story</h2>
        </div>
        <ul className="pgrid pgrid-2">
          {a.related.map((s) => (
            <li key={s}>
              <ProductCard p={bySlug(s)!} />
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="more-h">
        <div className="section-head">
          <h2 id="more-h" className="display">More from the blog</h2>
        </div>
        <ul className="jgrid jgrid-3">
          {others.map((o) => (
            <li key={o.slug}>
              <a className="jcard" href={href(`/blog/${o.slug}`)}>
                <div className="jcard-img">
                  <Img name={o.img} alt="" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
                <p className="mono jcard-meta">{readMins(o)} min read</p>
                <h3 className="jcard-h">{o.title}</h3>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <JoinBand where={`blog-${a.slug}`} />
      <JsonLd data={schema} />
    </main>
  );
}
