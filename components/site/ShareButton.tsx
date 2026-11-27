"use client";

import { useState } from "react";
import { shareUrl, SHARE_TEXT, useMember } from "@/lib/member";
import { track } from "@/lib/track";

/** "Bring a friend": shares the visitor's personal link (zaflick.com/in?ref=Z<number>). */
export default function ShareButton({ className = "btn btn-ink" }: { className?: string }) {
  const member = useMember();
  const [copied, setCopied] = useState(false);

  function onShare() {
    const url = shareUrl(member);
    track("share_click");
    if (navigator.share) {
      navigator.share({ title: "Zaflick", text: SHARE_TEXT, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${SHARE_TEXT} ${url}`).then(() => setCopied(true));
    }
  }

  return (
    <button type="button" className={className} onClick={onShare}>
      {copied ? "Link copied" : "Bring a friend"}
    </button>
  );
}
