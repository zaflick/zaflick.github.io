import { pageMeta } from "@/lib/seo";
import { ARTICLES, TOPICS, readMins } from "@/lib/content/journal";
import { href } from "@/lib/site";
import { Crumbs, PageHead, Img, JoinBand } from "@/components/site/bits";
import BlogTopics from "@/components/site/BlogTopics";

export const metadata = pageMeta({
  title: "Athleisure guides for Indian weather | Zaflick blog",
  description:
    "Straight answers about athleisure in India: leggings that stay up, humidity, sizing, phone pockets and one outfit for whatever the plan is.",
  path: "/blog",
  image: "/assets/img/og-blog.jpg",
});

// Newest first; only topics that have posts get a chip.
const POSTS = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
const USED = TOPICS.filter((t) => POSTS.some((a) => a.topic === t));

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <PageHead
        eyebrow="Blog"
        title="The Zaflick blog"
        lede="Straight answers about athleisure in India: fit, fabric, weather and what to wear when."
      />
      <BlogTopics topics={[...USED]} />
      <ul className="jgrid">
        {POSTS.map((a, i) => (
          <li key={a.slug} data-topic={a.topic} className={`reveal${i === 0 ? " jcard-lead" : ""}`}>
            <a className="jcard" href={href(`/blog/${a.slug}`)}>
              <div className="jcard-img">
                <Img name={a.img} alt="" eager={i === 0} sizes="(max-width: 640px) 100vw, 50vw" />
              </div>
              <p className="mono jcard-meta">
                {a.topic} · {readMins(a)} min read
                {a.draft ? <span className="draft-tag">Draft · needs approval</span> : null}
              </p>
              <h2 className="jcard-h">{a.title}</h2>
              <p className="soft jcard-dek">{a.dek}</p>
            </a>
          </li>
        ))}
      </ul>
      <JoinBand where="blog" />
    </main>
  );
}
