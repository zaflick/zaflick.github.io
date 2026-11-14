"use client";

import { useEffect, useState } from "react";

/**
 * Topic chips for /blog. The article list is plain server-rendered HTML (so search
 * engines see every post); this only hides cards whose data-topic doesn't match.
 */
export default function BlogTopics({ topics }: { topics: string[] }) {
  const [active, setActive] = useState<string>("All");

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-topic]").forEach((el) => {
      el.hidden = active !== "All" && el.dataset.topic !== active;
    });
  }, [active]);

  return (
    <div className="topics" role="group" aria-label="Filter by topic">
      {["All", ...topics].map((t) => (
        <button key={t} type="button" className="chip" aria-pressed={active === t} onClick={() => setActive(t)}>
          {t}
        </button>
      ))}
    </div>
  );
}
