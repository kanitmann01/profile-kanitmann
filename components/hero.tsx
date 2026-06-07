"use client"

import { useRef, useState, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { TactileButton } from "@/components/tactile-button"

function FloatingShape({
  className,
  delay = 0,
  duration = 6,
  yRange = 20,
  xRange = 10,
}: {
  className?: string
  delay?: number
  duration?: number
  yRange?: number
  xRange?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-yRange, yRange, -yRange],
        x: [-xRange, xRange, -xRange],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    />
  )
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      aria-hidden="true"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Scroll
      </span>
      <div className="scroll-indicator-bounce">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-muted-foreground"
        >
          <path
            d="M4 7L10 13L16 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </motion.div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const nameOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setGlowPos({ x, y })
    },
    []
  )

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden px-6 md:px-12 lg:px-20"
    >
      <div className="grain-overlay" />
      <div className="hero-gradient-bg absolute inset-0 z-0" />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, hsl(var(--primary) / 0.12), transparent 60%)`,
        }}
      />

      <FloatingShape
        className="absolute top-[15%] right-[10%] w-32 h-32 rounded-full border border-primary/10"
        delay={0}
        duration={8}
        yRange={25}
        xRange={15}
      />
      <FloatingShape
        className="absolute top-[60%] right-[20%] w-20 h-20 rounded-full bg-accent/8"
        delay={1}
        duration={7}
        yRange={18}
        xRange={12}
      />
      <FloatingShape
        className="absolute top-[30%] right-[30%] w-px h-24 bg-sage/20 origin-bottom"
        delay={0.5}
        duration={9}
        yRange={15}
        xRange={8}
      />
      <FloatingShape
        className="absolute bottom-[25%] right-[8%] w-16 h-16 rotate-45 border border-sage/10"
        delay={2}
        duration={10}
        yRange={20}
        xRange={10}
      />

      <div className="relative z-10 flex flex-col items-start text-left w-full max-w-5xl">
        <motion.div
          initial={{ y: 100, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ scale: nameScale, opacity: nameOpacity }}
        >
          <h1 className="font-serif text-[clamp(4rem,15vw,12rem)] leading-[0.85] tracking-tight text-primary">
            KEN
            <br />
            <span className="text-[0.6em]">(KANIT) MANN</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-8"
        >
          <p className="font-mono text-2xl md:text-3xl tracking-[0.3em] text-foreground uppercase">
            Data &amp; ML Engineer
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="font-mono text-sm text-muted-foreground mt-3"
        >
          Ex-Ericsson · NetSTAR · Seeking Summer 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <TactileButton size="lg" asChild>
            <Link href="/projects">View Projects</Link>
          </TactileButton>
          <TactileButton size="lg" variant="outline" asChild>
            <Link href="/contact">Get In Touch</Link>
          </TactileButton>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
