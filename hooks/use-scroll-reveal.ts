"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type ScrollRevealMode = "css" | "motion" | "reduced";

/**
 * Picks the reveal implementation for the current browser:
 *
 * - "css" — supports the CSS Scroll-Driven Animations API
 *   (`animation-timeline: view()`) and prefers motion. Callers render plain
 *   elements with `.rv-*` classes from globals.css; the native scroll
 *   timeline drives the reveal with zero JS animation runtime.
 * - "motion" — unsupported browser (Firefox, as of Aug 2026): Motion
 *   `whileInView` fallback.
 * - "reduced" — prefers-reduced-motion: render the final, fully-visible
 *   state immediately, never a hidden start.
 *
 * Detection runs in useLayoutEffect so server and first client render agree
 * (both report "motion") and the swap to CSS classes happens before paint —
 * no flash of the hidden Motion state on Chrome/Safari.
 */
export function useScrollRevealMode(): ScrollRevealMode {
  const [supported, setSupported] = React.useState(false);

  React.useLayoutEffect(() => {
    const css = typeof window !== "undefined" ? window.CSS : undefined;
    setSupported(
      typeof css?.supports === "function" &&
        css.supports("animation-timeline", "view()")
    );
  }, []);

  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return "reduced";
  }
  return supported ? "css" : "motion";
}
