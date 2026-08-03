import Image from "next/image";
import Link from "next/link";
import { HeadingLink } from "@/components/heading-link";

export function BentoGitHubCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <HeadingLink
        href="https://github.com/kanitmann01"
        chip="github.com/kanitmann01"
        external
      >
        GitHub
      </HeadingLink>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="relative h-10 w-10">
          <Image
            src="/images/tech/github.svg"
            alt="GitHub"
            fill
            className="object-contain dark:brightness-0 dark:invert"
          />
        </div>
        <span className="font-sans text-sm text-foreground">
          Open-source data engineering and ML projects — most with live demos.
        </span>
        <Link
          href="https://github.com/kanitmann01"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-primary-text hover:text-primary transition-colors underline underline-offset-4"
        >
          View Profile →
        </Link>
      </div>
    </div>
  );
}
