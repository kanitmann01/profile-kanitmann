"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { TactileButton } from "@/components/tactile-button";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
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
  );
}

function openCalendly() {
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({
      url: "https://calendly.com/mannkanit/connect-with-kanit",
    });
  }
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden px-6 md:px-12 lg:px-20"
    >
      <div className="grain-overlay" />
      <div className="hero-gradient-bg absolute inset-0 z-0" />
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, hsl(var(--primary) / 0.12), transparent 60%)`,
        }}
      />

      <div
        className="absolute inset-y-0 right-0 w-[55%] z-[2] overflow-hidden hidden md:block pointer-events-none"
        style={{
          mask: `linear-gradient(to right, transparent 25%, black 60%)`,
          WebkitMask: `linear-gradient(to right, transparent 25%, black 60%)`,
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/profile/kanit-mann.png"
            alt="Kanit Mann"
            fill
            className="object-cover object-left"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-start text-left w-full max-w-5xl">
        <motion.div
          initial={{ y: 100, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ scale: contentScale, opacity: contentOpacity }}
        >
          <h1 className="font-sans text-[clamp(3rem,10vw,7rem)] leading-[1.1] tracking-tight text-foreground">
            <span>Hi, I&apos;m Kanit!</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-6"
        >
          <p className="font-sans text-2xl md:text-4xl text-foreground">
            <span className="text-muted-foreground">I&apos;m a</span>{" "}
            <span className="font-bold">Data &amp; ML Engineer</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="mt-2 flex items-center gap-3 flex-wrap"
        >
          <p className="font-sans text-2xl md:text-4xl">
            <span className="font-bold text-primary">
              MS, University of Arizona.
            </span>
          </p>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-sm font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Seeking full-time roles
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-10"
        >
          <TactileButton size="lg" onClick={openCalendly}>
            Book a call
          </TactileButton>
          <p className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed">
            Check out my projects and reach out
          </p>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
