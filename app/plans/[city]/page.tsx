import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { href, links, SITE_URL } from "@/lib/site";
import { CITIES, city as getCity, type Wear } from "@/lib/content/plans";
import { bySlug } from "@/lib/content/products";
import { article } from "@/lib/content/journal";
import { Crumbs, PageHead, JoinBand, JsonLd, AnswerBox } from "@/components/site/bits";

// Approved by Ayushi and live 27 Nov 2026.
export const dynamicParams = false;
export const generateStaticParams = () => CITIES.map((c) => ({ city: c.slug }));

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCity((await params).city)!;
  return pageMeta({ title: `${c.title} | Zaflick`, description: c.description, path: `/plans/${c.slug}` });
}

function Pieces({ slugs }: { slugs: string[] }) {
  return (
    <>
      {slugs.map((s, i) => {
        const p = bySlug(s);
        if (!p) return null;
        return (
          <span key={s}>
            {i ? (i === slugs.length - 1 ? " and " : ", ") : ""}
            <a className="text-link" href={href(`/${p.slug}`)}>
              {i ? p.name.toLowerCase() : p.name}
            </a>
          </span>
        );
      })}
    </>
  );
}

function WearLine({ wear }: { wear: Wear }) {
  return (
    <dl className="plan-wear">
      <div>
        <dt className="mono">Her</dt>
        <dd>
          <Pieces slugs={wear.her} />
        </dd>
      </div>
      <div>
        <dt className="mono">Him</dt>
        <dd>
          <Pieces slugs={wear.him} />
        </dd>
      </div>
    </dl>
  );
}

export default async function Page({ params }: Props) {
  const c = getCity((await params).city)!;
  const post = article(c.post);
  const other = CITIES.find((x) => x.slug !== c.slug)!;
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.title,
    url: `${SITE_URL}/plans/${c.slug}`,
    itemListElement: c.plans.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: `${p.title} (${p.where})` })),
  };
  return (
    <main id="content" className="page">
      <Crumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Weekend plans", path: "/plans" },
          { name: c.name, path: `/plans/${c.slug}` },
        ]}
      />
      <PageHead eyebrow={`Weekend plans · ${c.name}`} title={c.title} lede={c.lede} />
      <div className="narrow-left">
        <AnswerBox q="What to wear for all of them">
          One outfit you can walk, play and sit down to eat in: a top or sports bra, a light fitted jacket, wide-leg pants or a high-waisted
          legging with a phone pocket, and clean sneakers. {c.weather}
        </AnswerBox>
      </div>

      <ol className="plan-list">
        {c.plans.map((p, i) => (
          <li key={p.id} className="plan-card" id={p.id}>
            <p className="mono plan-n">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="plan-h">{p.title}</h2>
            <p className="mono plan-where">{p.where}</p>
            <p>{p.text}</p>
            <WearLine wear={p.wear} />
            <p className="soft plan-tip">{p.tip}</p>
          </li>
        ))}
      </ol>

      <section className="section narrow-left" aria-labelledby="more-h">
        <h2 id="more-h" className="display section-h">Got a crew for these?</h2>
        <p className="soft">
          We&apos;re photographing real friend groups in {c.name} in the first Zaflick samples.{" "}
          <a className="text-link" href={links.crew}>Cast your crew →</a>
        </p>
        {post ? (
          <p className="soft">
            More on the outfit: <a className="text-link" href={href(`/blog/${post.slug}`)}>{post.title}</a>
          </p>
        ) : null}
        <p className="soft">
          In {other.name}? <a className="text-link" href={href(`/plans/${other.slug}`)}>See the {other.name} plans →</a>
        </p>
      </section>

      <JoinBand where={`plans-${c.slug}`} title="Whatever the plan, you're in" />
      <JsonLd data={list} />
    </main>
  );
}
