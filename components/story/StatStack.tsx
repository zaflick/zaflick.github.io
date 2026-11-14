import { links } from "@/lib/site";

// Every number and line here is already published on zaflick.com.
const STATS = [
  { k: "Pieces in the first drop, for women and men", v: "7" },
  { k: "People surveyed before designing", v: "~200" },
  { k: "Hours early-list members can buy before the public launch", v: "48" },
  { k: "Shipping on an early-list member's launch order", v: "Free" },
];

export default function StatStack() {
  return (
    <section className="stats" aria-labelledby="stats-title">
      <div className="stats-copy">
        <p className="eyebrow mono">How it is being made</p>
        <h2 id="stats-title" className="display">We asked before designing.</h2>
        <p className="lede-ink">
          We surveyed nearly 200 people and interviewed more than a dozen about what goes wrong with activewear in India.
        </p>
        <p className="lede-ink soft">Fabric chosen for heat and humidity, and sizing graded on Indian body measurements.</p>
        <a className="btn btn-accent" href={links.looks}>See the pieces <span aria-hidden="true">↗</span></a>
      </div>
      <ol className="stats-cards">
        {STATS.map((s, i) => (
          <li key={s.k} className="stat" style={{ ["--i" as string]: i }}>
            <p className="mono stat-k">{s.k}</p>
            <p className="stat-v display">{s.v}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
