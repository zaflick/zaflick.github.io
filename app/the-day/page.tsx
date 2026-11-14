import { pageMeta } from "@/lib/seo";
import { HER_DAY, HIS_DAY, type Moment } from "@/lib/content/day";
import { Crumbs, PageHead, Img, JoinBand } from "@/components/site/bits";
import { links } from "@/lib/site";

export const metadata = pageMeta({
  title: "One athleisure set from 6am to dinner: The day | Zaflick", // TODO-approve
  description: "One set, from the morning session to dinner. A lookbook of how the first Zaflick drop is worn across a whole day.",
  path: "/the-day",
});

function Day({ id, title, moments, set }: { id: string; title: string; moments: Moment[]; set: { label: string; href: string } }) {
  return (
    <section className="section day-page" aria-labelledby={id}>
      <div className="section-head">
        <h2 id={id} className="display">{title}</h2>
        <a className="text-link" href={set.href}>{set.label} →</a>
      </div>
      <ol className="moments">
        {moments.map((m, i) => (
          <li key={m.t} className="moment reveal" style={{ ["--d" as string]: i }}>
            <div className="moment-img">
              <Img name={m.img} alt={m.alt} />
            </div>
            <p className="mono moment-t">{m.t}</p>
            <h3 className="moment-h">{m.title}</h3>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "The day", path: "/the-day" }]} />
      <PageHead eyebrow="Lookbook" title="The day" lede="One set, from the morning session to dinner. It starts as training kit and stays on all day." />
      <Day id="her-day" title="Her day" moments={HER_DAY} set={{ label: "The pieces for her", href: links.her }} />
      <Day id="his-day" title="His day" moments={HIS_DAY} set={{ label: "The pieces for him", href: links.him }} />
      <p className="concept-note">Every image here is a concept. Real samples are shown to the early list before anything goes on sale.</p>
      <JoinBand where="the-day" img="training-both-2" />
    </main>
  );
}
