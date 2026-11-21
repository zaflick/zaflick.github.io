import { pageMeta, faqSchema } from "@/lib/seo";
import { qa } from "@/lib/content/faq";
import { href, links } from "@/lib/site";
import { Crumbs, PageHead, AnswerBox, FaqList, JsonLd, JoinBand } from "@/components/site/bits";

export const metadata = pageMeta({
  title: "Size guide: how to measure for athleisure | Zaflick", // TODO-approve
  description:
    "How Zaflick sizing is built on Indian measurements, how to measure your bust, underbust, waist, hips and inseam, and which measurement matters for each piece.",
  path: "/size-guide",
});

// New copy (TODO-approve). Measuring steps are general guidance, not Zaflick product claims.
const MEASURE = [
  { k: "Bust or chest", t: "Around the fullest part, under the arms, with the tape level across your back." },
  { k: "Underbust", t: "Straight around, just below the bust. The number for sports bras." },
  { k: "Waist", t: "Around the narrowest part, usually just above the belly button." },
  { k: "Hips", t: "Around the fullest part of the hips and seat, with your feet together." },
  { k: "Inseam", t: "From the top of the inner thigh to where you want the hem, standing straight." },
];

const BY_PIECE = [
  { piece: "Active legging", slug: "active-legging", by: "Waist, then hips", note: "If your hip measurement is the larger size, go by the hip." },
  { piece: "Sports bra", slug: "sports-bra", by: "Underbust", note: "The underband does most of the supporting." },
  { piece: "Fitted jacket", slug: "fitted-jacket", by: "Bust and waist", note: "Cut to the natural waist." },
  { piece: "Active T-shirt", slug: "active-tshirt", by: "Chest", note: "A relaxed, boxy fit by design." },
  { piece: "Wide-leg pants", slug: "wide-leg-pants", by: "Hips and inseam", note: "Unisex. The drawcord waist adjusts." },
];

const SIZES = ["XS", "S", "M", "L", "XL"];
const QUESTIONS = [qa("sizes"), qa("size-chart")];

export default function Page() {
  return (
    <main id="content" className="page">
      <Crumbs items={[{ name: "Home", path: "/" }, { name: "Size guide", path: "/size-guide" }]} />
      <PageHead
        eyebrow="Size guide"
        title="Size guide"
        lede="Sizes are still being finalised. Sizing is built on Indian measurements, not on a chart borrowed from another market."
      />
      <div className="narrow-left">
        <AnswerBox q="Is there a size chart yet?">{qa("size-chart").a}</AnswerBox>
      </div>

      <section className="section" aria-labelledby="measure-h">
        <div className="section-head">
          <h2 id="measure-h" className="display">How to measure yourself</h2>
          <p className="soft section-sub">Use a soft tape over thin clothing. Keep it level and snug, not tight.</p>
        </div>
        <ol className="measure">
          {MEASURE.map((m, i) => (
            <li key={m.k} className="reveal">
              <p className="mono measure-n">0{i + 1}</p>
              <h3 className="measure-k">{m.k}</h3>
              <p className="soft">{m.t}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" aria-labelledby="piece-h">
        <div className="section-head">
          <h2 id="piece-h" className="display">Which measurement matters</h2>
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Piece</th>
                <th scope="col">Choose by</th>
                <th scope="col">Good to know</th>
              </tr>
            </thead>
            <tbody>
              {BY_PIECE.map((r) => (
                <tr key={r.slug}>
                  <th scope="row">
                    <a className="text-link" href={href(`/${r.slug}`)}>{r.piece}</a>
                  </th>
                  <td>{r.by}</td>
                  <td className="soft">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="chart-h">
        <div className="section-head">
          <h2 id="chart-h" className="display">The size chart</h2>
          <p className="soft section-sub">Published with the real samples. The Circle sees it first.</p>
        </div>
        <div className="table-wrap">
          <table className="table table-chart">
            <caption className="sr-only">Size chart, measurements in centimetres, coming with the samples</caption>
            <thead>
              <tr>
                <th scope="col">cm</th>
                {SIZES.map((s) => (
                  <th key={s} scope="col">{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {["Bust", "Underbust", "Waist", "Hips"].map((row) => (
                <tr key={row}>
                  <th scope="row">{row}</th>
                  {SIZES.map((s) => (
                    <td key={s} className="soft">—</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section narrow" aria-labelledby="size-faq">
        <h2 id="size-faq" className="display section-h">Sizing questions</h2>
        <FaqList items={QUESTIONS} />
        <p className="more-link">
          Read more: <a className="text-link" href={href("/blog/size-guide-for-indian-bodies")}>How should you choose athleisure sizes for Indian bodies?</a>
        </p>
        <p className="more-link">
          <a className="text-link" href={links.faq}>All questions →</a>
        </p>
      </section>
      <JoinBand where="size-guide" title="Get the size chart first" />
      <JsonLd data={faqSchema(QUESTIONS)} />
    </main>
  );
}
