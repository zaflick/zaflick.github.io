/**
 * Small server components shared by the pages: JSON-LD, breadcrumbs, page heads,
 * product and look cards, FAQ lists and the join band.
 */
import { asset, href, links, CONCEPT_NOTE, BENEFITS, IS_LIVE } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/seo";
import { bySlug, type Product } from "@/lib/content/products";
import type { Look } from "@/lib/content/looks";
import type { QA } from "@/lib/content/faq";
import SignupForm from "./SignupForm";
import IMG_WIDTHS from "@/lib/content/img-widths.json";

export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}

export function Crumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <nav className="crumbs mono" aria-label="Breadcrumb">
        <ol>
          {items.map((it, i) => (
            <li key={it.path}>
              {i < items.length - 1 ? <a href={href(it.path)}>{it.name}</a> : <span aria-current="page">{it.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}

export function PageHead({ eyebrow, title, lede, children }: { eyebrow?: string; title: string; lede?: string; children?: React.ReactNode }) {
  return (
    <header className="page-head">
      {eyebrow ? <p className="eyebrow mono">{eyebrow}</p> : null}
      <h1 className="display">{title}</h1>
      {lede ? <p className="page-lede">{lede}</p> : null}
      {children}
    </header>
  );
}

/**
 * Photos. When scripts/make-image-variants.py has made smaller copies (-800, -1200), the
 * browser picks the smallest one that fills the slot, so phones skip the desktop file.
 * Pass `sizes` for images that are narrower than the screen (cards, grids).
 */
export function Img({ name, alt, className, eager, sizes }: { name: string; alt: string; className?: string; eager?: boolean; sizes?: string }) {
  const src = name.includes(".") ? name : `${name}.webp`;
  const v = name.includes(".") ? undefined : (IMG_WIDTHS as Record<string, { w: number; variants: number[] }>)[name];
  const srcSet = v
    ? [...v.variants.map((w) => `${asset(`/assets/img/${name}-${w}.webp`)} ${w}w`), `${asset(`/assets/img/${src}`)} ${v.w}w`].join(", ")
    : undefined;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={asset(`/assets/img/${src}`)}
      srcSet={srcSet}
      sizes={srcSet ? sizes || "100vw" : sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
    />
  );
}

export function ProductCard({ p, eager }: { p: Product; eager?: boolean }) {
  return (
    <a className="pcard" href={href(`/${p.slug}`)}>
      <div className="pcard-img">
        <Img name={`p-${p.slug}-front`} alt={`${p.name}, front view`} eager={eager} sizes="(max-width: 640px) 50vw, 25vw" />
        <Img name={p.model} alt="" className="pcard-alt" sizes="(max-width: 640px) 50vw, 25vw" />
        <span className="tag mono">Concept</span>
      </div>
      <div className="pcard-meta">
        <span className="pcard-name">{p.name}</span>
        <span className="soft">{p.colour}</span>
      </div>
    </a>
  );
}

export function ProductGrid({ products, eagerFirst }: { products: Product[]; eagerFirst?: number }) {
  return (
    <ul className="pgrid">
      {products.map((p, i) => (
        <li key={p.slug} className="reveal" style={{ ["--d" as string]: i }}>
          <ProductCard p={p} eager={eagerFirst !== undefined && i < eagerFirst} />
        </li>
      ))}
    </ul>
  );
}

export function LookCard({ look, flip, headingLevel = 2 }: { look: Look; flip?: boolean; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <article className={`look reveal${flip ? " look-flip" : ""}`} id={look.id}>
      <div className="look-img">
        <Img name={look.img} alt={look.alt} sizes="(max-width: 640px) 100vw, 50vw" />
      </div>
      <div className="look-copy">
        <p className="eyebrow mono">{look.gender === "her" ? "For her" : "For him"} · Look</p>
        <H className="display look-h">{look.name}</H>
        <p className="look-text">{look.text}</p>
        <ul className="look-pieces">
          {look.pieces.map((slug) => {
            const p = bySlug(slug)!;
            return (
              <li key={slug}>
                <a href={href(`/${slug}`)}>
                  <Img name={`p-${slug}-front`} alt="" sizes="(max-width: 640px) 30vw, 12vw" />
                  <span>{p.name}</span>
                  <span className="soft look-view">View</span>
                </a>
              </li>
            );
          })}
        </ul>
        <a className="btn btn-ink" href={links.circle} data-join={look.name.toLowerCase()}>
          Reserve this look
        </a>
      </div>
    </article>
  );
}

export function ConceptNote({ className = "" }: { className?: string }) {
  return <p className={`concept-note ${className}`}>{CONCEPT_NOTE}</p>;
}

export function FaqList({ items, level = 3, open }: { items: QA[]; level?: 2 | 3; open?: boolean }) {
  const H = `h${level}` as "h2" | "h3";
  return (
    <div className="faq-list">
      {items.map((it, i) => (
        <details key={it.id} id={it.id} className="faq-item" open={open && i === 0}>
          <summary>
            <H className="faq-q">
              {it.q}
              {it.draft ? <span className="draft-tag">New · needs approval</span> : null}
            </H>
            <span className="faq-plus" aria-hidden="true" />
          </summary>
          <p className="faq-a">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

/** "Join before the first drop" band with the form inline. */
export function JoinBand({ where, title = "Join before the first drop", img = "friends" }: { where: string; title?: string; img?: string }) {
  return (
    <section className="join-band" aria-labelledby={`join-${where}`}>
      <div className="join-band-img">
        <Img name={img} alt="" sizes="(max-width: 900px) 100vw, 50vw" />
      </div>
      <div className="join-band-copy">
        <p className="eyebrow mono">The Circle</p>
        <h2 id={`join-${where}`} className="display">{title}</h2>
        <ul className="ticks">
          {BENEFITS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <SignupForm where={where} tone="dark" />
      </div>
    </section>
  );
}

/** Visible only in the prototype: marks content still waiting on Zaflick. */
export function Todo({ children }: { children: React.ReactNode }) {
  if (IS_LIVE) return null;
  return (
    <div className="todo-box" role="note">
      <p className="mono">Placeholder</p>
      <div>{children}</div>
    </div>
  );
}

export function AnswerBox({ q, children }: { q?: string; children: React.ReactNode }) {
  return (
    <div className="answer">
      <p className="mono answer-k">{q || "The short answer"}</p>
      <p className="answer-a">{children}</p>
    </div>
  );
}
