"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <motion.div
      role="progressbar"
      aria-label="Scroll progress"
      className="fixed top-0 left-0 z-50 h-[2px] bg-primary"
      style={{ width }}
    />
  )
}
