"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import type { ReactNode } from "react";

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right";
  /** Only affects the Motion fallback path; the CSS path animates on viewport entry. */
  delay?: number;
  className?: string;
}

const cssClassByDirection = {
  left: "rv-slide-left",
  right: "rv-slide-right",
} as const;

const offsets = {
  left: { x: -100 },
  right: { x: 100 },
} as const;

export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className,
}: SlideInProps) {
  return (
    <ScrollReveal
      cssClass={cssClassByDirection[direction]}
      className={className}
      motionProps={{
        initial: { opacity: 0, ...offsets[direction] },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-50px" },
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
