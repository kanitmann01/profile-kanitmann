"use client";

import { m, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      role="progressbar"
      aria-label="Scroll progress"
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-primary origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
