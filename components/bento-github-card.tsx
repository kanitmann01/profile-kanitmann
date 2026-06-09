import Image from "next/image"
import Link from "next/link"
import { HeadingLink } from "@/components/heading-link"

export function BentoGitHubCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <HeadingLink href="https://github.com/kanitmann01" chip="github.com/kanitmann01" external>
        GitHub
      </HeadingLink>
      <div className="flex flex-col items-center text-center gap-3">
        <div className="relative h-10 w-10">
          <Image
            src="/images/tech/github.svg"
            alt="GitHub"
            fill
            className="object-contain dark:brightness-0 dark:invert"
          />
        </div>
        <span className="font-mono text-sm text-foreground">kanitmann01</span>
        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="flex flex-col items-center">
            <span className="font-sans text-lg font-bold text-foreground">12</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Repos
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans text-lg font-bold text-foreground">8</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Stars
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans text-lg font-bold text-foreground">147</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Contribs
            </span>
          </div>
        </div>
        <Link
          href="https://github.com/kanitmann01"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
        >
          View Profile →
        </Link>
      </div>
    </div>
  )
}
