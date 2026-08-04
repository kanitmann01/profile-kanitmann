"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface BentoCardLiftProps {
  children: ReactNode;
  className?: string;
}

// Hover-lift for the homepage bento tiles. Must be a client component:
// Next.js RSC forbids invoking framer-motion's motion factory (a client
// function) from a server component like app/page.tsx.
// The lift is gated on prefers-reduced-motion: the global MotionConfig
// (reducedMotion="user") does not cover whileHover gestures, so the hover
// transform is disabled explicitly when the user prefers reduced motion.
export function BentoCardLift({ children, className }: BentoCardLiftProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </m.div>
  );
}
