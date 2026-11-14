"use client";

import { useEffect, type RefObject } from "react";
import { onProgress, isStill, type Mode } from "./scroll";

/**
 * Calls cb(progress, inView) as the section scrolls. In the still version the
 * chapter is shown in its finished state instead (cb(1, true) once).
 */
export function useProgress(
  ref: RefObject<HTMLElement | null>,
  mode: Mode,
  cb: (p: number, inView: boolean) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isStill()) {
      cb(1, true);
      return;
    }
    return onProgress(el, mode, cb);
    // cb is defined inline by each chapter and only touches refs, so it is safe to bind once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, mode]);
}
