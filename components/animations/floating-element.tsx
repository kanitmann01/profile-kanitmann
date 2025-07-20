"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FloatingElementProps {
  children: ReactNode
  className?: string
  duration?: number
}

export function FloatingElement({ children, className, duration = 3 }: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-10, 10, -10],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
