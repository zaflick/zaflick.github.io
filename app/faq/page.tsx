import { pageMeta, faqSchema } from "@/lib/seo";
import { FAQ, ALL_QA } from "@/lib/content/faq";
import { links } from "@/lib/site";
import { Crumbs, PageHead, FaqList, JsonLd, JoinBand } from "@/components/site/bits";

export const metadata = pageMeta({
  title: "Zaflick FAQ: launch, sizes, fabric, shipping and the early list", // TODO-approve
  description: "Answers about Zaflick: what it is, when the first drop launches, sizing, shipping in India, and how the early list works.",
  path: "/faq",
});

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
      <div className="faq-page">
        <aside className="faq-side">
          <PageHead eyebrow="FAQ" title="Questions people ask" lede="The short version of everything worth knowing." />
          <nav aria-label="FAQ topics" className="faq-toc">
            <ul>
              {FAQ.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`}>{g.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="soft faq-more">
            Still stuck? <a className="text-link" href={links.contact}>Contact us</a> or message{" "}
            <a className="text-link" href={links.instagram} rel="noopener">@houseofzaflick</a>.
          </p>
        </aside>
        <div className="faq-groups">
          {FAQ.map((g) => (
            <section key={g.id} id={g.id} className="faq-group" aria-labelledby={`${g.id}-h`}>
              <h2 id={`${g.id}-h`} className="mono faq-group-h">{g.title}</h2>
              <FaqList items={g.items} />
            </section>
          ))}
        </div>
      </div>
      <JoinBand where="faq" />
      <JsonLd data={faqSchema(ALL_QA)} />
    </main>
  );
}
