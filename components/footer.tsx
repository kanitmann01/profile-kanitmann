"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollTo } from "@/hooks/use-scroll-to";

const socialLinks = [
  { label: "Email", href: "mailto:mannkanit@gmail.com" },
  { label: "GitHub", href: "https://github.com/kanitmann01", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kanitmann",
    external: true,
  },
  { label: "Resume", href: "/Kanit Mann - Resume.pdf", download: true },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  // Wave E.5: Lenis glide to top when smooth scroll is active; native instant
  // jump under reduced motion / touch.
  const scrollToTop = useScrollTo();

  return (
    <footer className="relative border-t-2 border-primary bg-card overflow-hidden">
      <div className="grain-overlay absolute inset-0 pointer-events-none z-0 opacity-[0.03]" />

      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[10rem] md:text-[14rem] leading-none opacity-[0.05] pointer-events-none select-none z-0"
      >
        KANIT
      </span>

      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
          <div className="space-y-2">
            <p className="font-serif text-2xl md:text-3xl text-card-foreground">
              KANIT MANN
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Data, ML &amp; AI Engineer
            </p>
            <p className="font-serif italic text-sm text-accent mt-4">
              Dashboards · Pipelines · Data Products
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-6 gap-y-3"
            aria-label="Social links"
          >
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                {...(link.download ? { download: true } : {})}
                className={cn(
                  "relative font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors min-h-[44px] inline-flex items-center active:scale-95",
                  "hover:text-foreground"
                )}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-px w-full bg-primary scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground text-center">
            &copy; {currentYear} Kanit Mann. All rights reserved. Logo by{" "}
            <Link
              href="https://magnific.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              magnific.com
            </Link>
            .
          </p>
          <button
            type="button"
            onClick={() => scrollToTop(0)}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors min-h-[44px] px-4 hover:text-primary hover:border-primary"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            Top
          </button>
        </div>
      </div>
    </footer>
  );
}
