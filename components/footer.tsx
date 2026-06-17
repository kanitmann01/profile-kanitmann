"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const FABLE5_CREDIT = {
  label: "awesome-claude-fable-5",
  href: "https://github.com/anil-matcha/awesome-claude-fable-5",
};

const socialLinks = [
  { label: "Email", href: "mailto:kanitmann01@gmail.com" },
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
              Data &amp; ML Engineer
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

        <p className="mt-6 text-xs text-muted-foreground font-mono text-center">
          data sourced from{" "}
          <Link
            href={FABLE5_CREDIT.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            {FABLE5_CREDIT.label}
          </Link>{" "}
          by Anil-matcha · MIT
        </p>

        <div className="mt-12 pt-6 border-t border-border/30">
          <p className="font-mono text-xs text-muted-foreground text-center">
            &copy; {currentYear} Kanit Mann. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
