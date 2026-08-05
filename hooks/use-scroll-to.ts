"use client";

import { useCallback } from "react";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Central anchor-scroll helper (Wave E.5).
 *
 * Routes programmatic scrolls through Lenis whenever smooth scroll is active
 * (a Lenis instance is mounted AND the user has not requested reduced motion).
 * Every other case falls back to native scrolling:
 *
 * - prefers-reduced-motion → instant native jump (no smoothing).
 * - Lenis not mounted (touch-first render, provider unmounted, SSR) → native
 *   `scrollIntoView`, so anchors never break on touch devices.
 *
 * `target` accepts a CSS selector, an element id, an `HTMLElement`, or an
 * absolute scroll position (number). `offset` is only meaningful for
 * element/selector targets (default -80 keeps the target clear of the fixed
 * nav; pass 0 for full-bleed anchoring).
 */
export function useScrollTo() {
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();

  return useCallback(
    (target: string | HTMLElement | number, offset = -80) => {
      const resolve = (t: string | HTMLElement) =>
        typeof t === "string"
          ? (document.getElementById(t) ?? document.querySelector(t))
          : t;

      if (lenis && !prefersReducedMotion) {
        if (typeof target === "number") {
          lenis.scrollTo(target, { offset: 0 });
        } else {
          const el = resolve(target);
          if (el) lenis.scrollTo(el, { offset });
        }
        return;
      }

      // Native fallback — reduced motion or no Lenis (touch / unmounted).
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "auto" });
        return;
      }

      resolve(target)?.scrollIntoView({ behavior: "auto", block: "start" });
    },
    [lenis, prefersReducedMotion]
  );
}
