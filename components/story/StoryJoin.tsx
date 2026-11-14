import { asset } from "@/lib/site";
import SignupForm from "@/components/site/SignupForm";

/** Last chapter of the homepage story: a short closing early-list call over the friends photo. */
export default function StoryJoin() {
  return (
    <section className="join" aria-labelledby="join-title">
      <div className="join-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/assets/img/friends.webp")} alt="Four friends in tonal sets talking around a table on a terrace café." loading="lazy" />
        <div className="join-scrim" aria-hidden="true" />
        <div className="join-copy">
          <h2 id="join-title" className="display">Join before the first drop</h2>
          {/* The benefits are listed once, in the hero; this is the short closing call. */}
          <p className="join-sub">Samples first, 48 hours early access and free shipping on your launch order.</p>
          <SignupForm where="home-end" tone="dark" />
        </div>
      </div>
      <p className="join-foot soft">The fabric and stitching scenes on this page are 3D illustrations.</p>
    </section>
  );
}
