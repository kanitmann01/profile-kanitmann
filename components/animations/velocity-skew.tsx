"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useLenis } from "lenis/react";

/**
 * Wave E.4: velocity skew on section titles.
 *
 * Lenis scroll velocity → motion value → spring ({ stiffness: 200, damping:
 * 30 }) → `skewY`. The spring makes the skew lag just behind the scroll so a
 * fast flick of the wheel throws the title a few degrees and it settles back
 * when the scroll stops — an Awwwards-2026 signature at ~0 KB bundle cost
 * (Lenis + Motion are already installed).
 *
 * Gates:
 *  1. prefers-reduced-motion — no binding at all; renders a plain element.
 *  2. `pointer: fine` only — touch never feeds Lenis velocity here (syncTouch
 *     is false), but the gate makes it explicit that mobile is a no-op.
 *
 * The DOM structure is identical in every gate state (only the MotionValue
 * binding is dropped), so SSR/hydration and the fine→coarse pointer flip can
 * never desync markup.
 */

/** Peak skew applied at full scroll velocity, in degrees. */
export const MAX_SKEW_DEG = 3;

const SKEW_SPRING = { stiffness: 200, damping: 30 } as const;

/** Pure + exported for tests: velocity → clamped skew degrees. */
export function clampSkew(velocity: number): number {
  return Math.max(-MAX_SKEW_DEG, Math.min(MAX_SKEW_DEG, velocity));
}

interface VelocitySkewProps {
  /** Which element to skew. Defaults to the h2 used by section titles. */
  as?: "h2" | "h3" | "div" | "span";
  className?: string;
  children: ReactNode;
}

export function VelocitySkew({
  as: Tag = "h2",
  className,
  children,
}: VelocitySkewProps) {
  const reducedMotion = useReducedMotion();
  const skew = useMotionValue(0);
  const skewSpring = useSpring(skew, SKEW_SPRING);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    setFinePointer(media.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setFinePointer(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const onLenisScroll = useCallback(
    ({ velocity }: { velocity: number }) => {
      skew.set(clampSkew(velocity));
    },
    [skew]
  );

  // Bind only when motion is allowed AND the pointer is fine. Under reduced
  // motion (or on touch) no callback is registered — a strict no-op.
  useLenis(!reducedMotion && finePointer ? onLenisScroll : undefined);

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = m[Tag] as any;
  return (
    <MotionTag className={className} style={{ skewY: skewSpring }}>
      {children}
    </MotionTag>
  );
}
