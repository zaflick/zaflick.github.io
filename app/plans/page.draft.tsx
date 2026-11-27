import { pageMeta } from "@/lib/seo";
import { href } from "@/lib/site";
import { CITIES } from "@/lib/content/plans";
import { Crumbs, PageHead, JoinBand, Todo } from "@/components/site/bits";

// DRAFT page (preview only until approved). All copy TODO-approve.
export const metadata = pageMeta({
  title: "Weekend plans with friends in Hyderabad and Bengaluru | Zaflick",
  description:
    "Weekend plans with friends in Hyderabad and Bengaluru: walks, games, food and days out, and one outfit that works for all of them.",
  path: "/plans",
});

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Weekend plans", path: "/plans" }]} />
      <PageHead
        eyebrow="Weekend plans"
        title="Whatever the plan, you're in. Here are a few."
        lede="Plans with friends in the two cities we're starting in, and what to wear so you never have to go home and change."
      />
      <Todo>Idea: refresh one plan per city every week and share it on Instagram and the WhatsApp channel as &ldquo;This weekend in &hellip;&rdquo;.</Todo>
      <ul className="routes plan-cities">
        {CITIES.map((c) => (
          <li key={c.slug} className="route">
            <p className="mono plan-k">{c.plans.length} plans</p>
            <h2 className="route-h">
              <a href={href(`/plans/${c.slug}`)}>{c.name}</a>
            </h2>
            <p className="soft">{c.lede}</p>
            <a className="text-link" href={href(`/plans/${c.slug}`)}>
              See the {c.name} plans →
            </a>
          </li>
        ))}
      </ul>
      <JoinBand where="plans" title="Your crew's next plan, sorted" />
    </main>
  );
}
