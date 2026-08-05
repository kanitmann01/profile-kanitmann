"use client";

import { m, useScroll, useTransform } from "framer-motion";

export function ReadingProgress() {
  // Wave B: no React re-render per frame — useScroll drives a MotionValue
  // that writes transform: scaleX directly on the compositor.
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <m.div
      className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-gradient-to-r from-primary via-primary/80 to-primary/60"
      style={{ scaleX }}
    />
  );
}
