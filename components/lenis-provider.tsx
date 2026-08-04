"use client";

import * as React from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Lenis smooth-scroll provider (Exp 07).
 *
 * Wraps the whole app in a native-scroll-based smoothing layer. Because Lenis
 * drives the real window scroll, `position: sticky` (nav, scroll-progress,
 * about sidebar) and framer-motion's `useScroll` keep working unchanged.
 *
 * Reduced motion: Lenis only mounts when the user has NOT requested reduced
 * motion. Under `prefers-reduced-motion: reduce` the provider renders children
 * as-is and scrolling stays fully native (instant, no smoothing). This is the
 * Lenis-recommended conditional-init path and also keeps `useLenis()` callers
 * honest: it returns undefined, so consumers fall back to native jumps.
 *
 * Touch: `syncTouch` stays false (Lenis default) — touch scrolling is never
 * hijacked, Lenis is a subtle wheel/rail enhancement only.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ syncTouch: false }}>
      {children}
    </ReactLenis>
  );
}
