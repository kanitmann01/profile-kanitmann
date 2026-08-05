"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MagneticButton } from "@/components/magnetic-button";
import { ShaderHero } from "@/components/shader-hero";
import { Button } from "@/components/ui/button";

/**
 * Exp 12 / Wave A+B: the main H1 ("Kanit Mann") is static text — no
 * char-split, no opacity:0/blur(8px) start — so the LCP text paints
 * immediately (<300ms). The only kinetic headline motion is the sub-line
 * entrance below, which MotionConfig reducedMotion="user" (layout.tsx)
 * collapses to the final state for reduced-motion users.
 */
const HEADLINE = "Kanit Mann";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

function ScrollIndicator() {
  return (
    <m.div
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
    </m.div>
  );
}

function openCalendly() {
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({
      url: "https://calendly.com/mannkanit/connect-with-kanit",
    });
  }
}

/** Resume PDF — co-primary CTA in the hero (Wave C recruiter flip). */
const RESUME_URL = "/Kanit%20Mann%20-%20Resume.pdf";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden px-6 md:px-12 lg:px-20"
    >
      <div className="hero-gradient-bg absolute inset-0 z-0" />
      {/* Exp 15: shader accent — z-[1], behind photo (z-[2]) and content
          (z-10), low opacity, never competes with text contrast. */}
      <ShaderHero />

      <div
        className="absolute inset-y-0 right-0 w-[55%] z-[2] overflow-hidden hidden md:block pointer-events-none"
        style={{
          mask: `linear-gradient(to right, transparent 25%, black 60%)`,
          WebkitMask: `linear-gradient(to right, transparent 25%, black 60%)`,
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/profile/kanit-mann.webp"
            alt="Kanit Mann"
            fill
            sizes="(min-width: 768px) 50vw"
            className="object-cover object-left"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-start text-left w-full max-w-5xl">
        <m.div style={{ scale: contentScale, opacity: contentOpacity }}>
          <h1 className="font-sans text-[clamp(3rem,10vw,7rem)] leading-[1.1] tracking-tight text-foreground">
            {HEADLINE}
          </h1>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-6"
        >
          <p className="font-sans text-2xl md:text-4xl text-foreground">
            <span className="text-muted-foreground">I&apos;m a</span>{" "}
            <span className="font-bold">Data, ML &amp; AI</span>{" "}
            <em className="font-serif-italic">Engineer</em>
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="mt-2 flex items-center gap-3 flex-wrap"
        >
          <p className="font-sans text-2xl md:text-4xl">
            <span className="font-bold text-primary-text">
              MS, University of Arizona.
            </span>
          </p>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-sm font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Seeking full-time roles
          </span>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-10"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                Résumé
              </Link>
            </Button>
            <MagneticButton size="lg" onClick={openCalendly}>
              Book a call
            </MagneticButton>
          </div>
          <Link
            href="/projects"
            className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed underline-offset-4 hover:text-foreground hover:underline transition-colors"
          >
            Or browse the work first →
          </Link>
        </m.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
