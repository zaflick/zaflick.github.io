import { pageMeta } from "@/lib/seo";
import { ARTICLES, readMins } from "@/lib/content/journal";
import { href } from "@/lib/site";
import { Crumbs, PageHead, Img, JoinBand } from "@/components/site/bits";

export const metadata = pageMeta({
  title: "Journal: athleisure guides for Indian weather and bodies | Zaflick", // TODO-approve
  description:
    "Straight answers about athleisure in India: leggings that stay up, training in humidity, sizing, phone pockets and one set from 6am to dinner.",
  path: "/journal",
});

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Journal", path: "/journal" }]} />
      <PageHead
        eyebrow="Journal"
        title="Journal"
        lede="Straight answers about athleisure in India: fit, fabric, weather and what to wear when." /* TODO-approve */
      />
      <ul className="jgrid">
        {ARTICLES.map((a, i) => (
          <li key={a.slug} className={`reveal${i === 0 ? " jcard-lead" : ""}`}>
            <a className="jcard" href={href(`/journal/${a.slug}`)}>
              <div className="jcard-img">
                <Img name={a.img} alt="" eager={i === 0} />
              </div>
              <p className="mono jcard-meta">{readMins(a)} min read</p>
              <h2 className="jcard-h">{a.title}</h2>
              <p className="soft jcard-dek">{a.dek}</p>
            </a>
          </li>
        ))}
      </ul>
      <JoinBand where="journal" />
    </main>
  );
}
