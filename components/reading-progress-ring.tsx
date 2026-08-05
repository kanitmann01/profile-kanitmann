"use client";

import * as React from "react";
import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SIZE = 44;
const STROKE_WIDTH = 3;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type ReadingProgressRingProps = {
  children: React.ReactNode;
};

/**
 * Per-article reading-progress ring (Wave E.5).
 *
 * Tracks scroll progress through the wrapped content (`["start start", "end
 * end"]` — 0 when the content top hits the viewport top, 1 when its bottom
 * clears the viewport), springs the value, and drives an SVG circle's
 * `strokeDashoffset`.
 *
 * Reduced motion: the ring is hidden entirely and children render untouched
 * (native instant scroll stays fully intact).
 */
export function ReadingProgressRing({ children }: ReadingProgressRingProps) {
  const prefersReducedMotion = useReducedMotion();
  const targetRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const dashOffset = useTransform(progress, [0, 1], [CIRCUMFERENCE, 0]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <div ref={targetRef}>
      {children}
      <m.svg
        role="progressbar"
        aria-label="Reading progress"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="fixed bottom-6 right-6 z-50 -rotate-90"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          className="stroke-border"
        />
        <m.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          className="stroke-primary"
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: dashOffset,
          }}
        />
      </m.svg>
    </div>
  );
}
