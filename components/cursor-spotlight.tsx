"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Exp 11: site-wide cursor spotlight (dark mode only).
 *
 * Promoted from the hero-only mouse-follow glow into a single fixed radial
 * gradient div that trails the cursor across the whole site. Subtle by
 * design: `mix-blend-mode: screen` at `hsl(var(--primary) / 0.06)`, painted
 * below content (negative z-index) so it never washes over text or hurts
 * contrast; `pointer-events: none` so clicks and text selection pass
 * straight through.
 *
 * Renders NOTHING unless ALL of these hold:
 * - prefers-reduced-motion: no-preference (reduced-motion users get no glow;
 *   the cursor itself is untouched)
 * - dark theme (resolvedTheme from next-themes)
 * - pointer: fine (matchMedia) — touch and other coarse pointers stay clean
 *
 * Perf: positioning is transform-only (translate3d, never top/left), updates
 * are coalesced to one rAF per frame, the listener is passive, and the hot
 * path reads clientX/clientY only (no layout reads).
 */

const SPOTLIGHT_SIZE = 600;

export function CursorSpotlight() {
  const { resolvedTheme } = useTheme();
  const reducedMotion = useReducedMotion();

  const glowRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number | null>(null);
  const cursorRef = React.useRef({
    x: -SPOTLIGHT_SIZE,
    y: -SPOTLIGHT_SIZE,
  });

  // All three gates start false so SSR and the first client render emit
  // nothing (no hydration mismatch, no dark-mode flash).
  const [mounted, setMounted] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const [pointerFine, setPointerFine] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  React.useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setPointerFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const visible = mounted && isDark && pointerFine && !reducedMotion;

  React.useEffect(() => {
    if (!visible) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cursorRef.current = { x: event.clientX, y: event.clientY };
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const glow = glowRef.current;
        if (!glow) return;
        const { x, y } = cursorRef.current;
        glow.style.transform = `translate3d(${x - SPOTLIGHT_SIZE / 2}px, ${
          y - SPOTLIGHT_SIZE / 2
        }px, 0)`;
      });
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={glowRef}
      data-testid="cursor-spotlight"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10"
      style={{
        width: SPOTLIGHT_SIZE,
        height: SPOTLIGHT_SIZE,
        background:
          "radial-gradient(circle, hsl(var(--primary) / 0.06), transparent 60%)",
        mixBlendMode: "screen",
        transform: `translate3d(${-SPOTLIGHT_SIZE}px, ${-SPOTLIGHT_SIZE}px, 0)`,
        willChange: "transform",
      }}
    />
  );
}
