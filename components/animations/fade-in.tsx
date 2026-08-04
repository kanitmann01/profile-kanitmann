"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  /** Only affects the Motion fallback path; the CSS path animates on viewport entry. */
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

const cssClassByDirection = {
  up: "rv-up",
  down: "rv-down",
  left: "rv-left",
  right: "rv-right",
} as const;

const offsets = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { y: 0, x: 40 },
  right: { y: 0, x: -40 },
} as const;

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
}: FadeInProps) {
  return (
    <ScrollReveal
      cssClass={cssClassByDirection[direction]}
      className={className}
      motionProps={{
        initial: { opacity: 0, ...offsets[direction] },
        whileInView: { opacity: 1, y: 0, x: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: {
          duration: 0.8,
          delay,
          ease: [0.21, 0.47, 0.32, 0.98],
        },
      }}
    >
      {children}
    </ScrollReveal>
  );
}
