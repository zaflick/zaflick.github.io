"use client";

import { useMember } from "@/lib/member";
import { links } from "@/lib/site";
import { Todo } from "@/components/site/bits";
import ShareButton from "@/components/site/ShareButton";

/** Section 5: the referral, called "Bring a friend". No ₹ amounts until the founders confirm them. */
export default function BringFriend() {
  const member = useMember();
  return (
    <section className="home-sec" aria-labelledby="friend-h">
      <div className="home-friend">
        <p className="eyebrow mono">Bring a friend</p>
        <h2 id="friend-h" className="display">Good times are better with company. Bring one.</h2>
        <p className="home-sub">
          Everyone who joins the Circle gets their own link. Send it to the friends you make plans with, and they&apos;re in too.
        </p>
        <div className="home-actions">
          {member?.email ? (
            <ShareButton className="btn btn-accent btn-lg" />
          ) : (
            <a className="btn btn-accent btn-lg" href={links.circle} data-join="">
              Join the Circle <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        <Todo>
          The ₹250 wallet credit for both friends, and the ₹250 gift card in the box to give a friend, go here once the founders confirm them.
        </Todo>
      </div>
    </section>
  );
}
