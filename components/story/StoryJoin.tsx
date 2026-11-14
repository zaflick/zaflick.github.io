import { asset, BENEFITS } from "@/lib/site";
import SignupForm from "@/components/site/SignupForm";

/** Last chapter of the homepage story: the early-list form over the friends photo. */
export default function StoryJoin() {
  return (
    <section className="join" aria-labelledby="join-title">
      <div className="join-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/assets/img/friends.webp")} alt="Four friends in tonal sets talking around a table on a terrace café." loading="lazy" />
        <div className="join-scrim" aria-hidden="true" />
        <div className="join-copy">
          <h2 id="join-title" className="display">Join before the first drop</h2>
          <ul className="join-list">
            {BENEFITS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <SignupForm where="home" tone="dark" />
        </div>
      </div>
      <p className="join-foot soft">The fabric and stitching scenes on this page are 3D illustrations.</p>
    </section>
  );
}
