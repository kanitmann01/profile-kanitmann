"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ghostButtonClass = cn(
  "font-grotesk text-[10px] font-normal uppercase tracking-normal text-white",
  "border-2 border-white/60 rounded-[5px] px-[6px] py-px",
  "transition-opacity duration-200 hover:opacity-70",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
);

const enterPillClass = cn(
  "font-grotesk text-[14px] font-bold tracking-normal text-black bg-[#343755]",
  "rounded-full px-[18px] py-1 transition-opacity duration-200 hover:opacity-90",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
);

export function VoidGhostNav(): JSX.Element {
  return (
    <m.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-label="Primary"
      className="fixed top-4 right-4 z-50 flex items-center gap-2"
    >
      <Link href="/projects" className={ghostButtonClass}>
        Work
      </Link>
      <span aria-hidden className="text-[#c6c6c6] text-[10px] select-none">
        ·
      </span>
      <Link href="/contact" className={ghostButtonClass}>
        Contact
      </Link>
      <Link href="/" className={enterPillClass}>
        Enter
      </Link>
    </m.nav>
  );
}
