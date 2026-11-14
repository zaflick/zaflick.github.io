"use client";

import { useEffect } from "react";
import { startScroll, setScrollLocked } from "@/lib/scroll";

/** Homepage only: starts smooth scrolling and the progress engine once every chapter has registered. */
export default function ScrollRoot() {
  useEffect(() => {
    startScroll();
    // The menu and the join drawer pause smooth scrolling while they are open.
    const onLock = (e: Event) => setScrollLocked(Boolean((e as CustomEvent<boolean>).detail));
    window.addEventListener("zf:scroll-lock", onLock);
    return () => window.removeEventListener("zf:scroll-lock", onLock);
  }, []);
  return null;
}
