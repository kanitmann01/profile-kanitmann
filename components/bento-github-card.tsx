import Image from "next/image";
import Link from "next/link";
import { HeadingLink } from "@/components/heading-link";

const GITHUB_PROFILE = "https://github.com/kanitmann01";
const GITHUB_API = "https://api.github.com/users/kanitmann01";

interface GitHubUser {
  public_repos: number;
  followers: number;
  created_at: string;
}

async function fetchGitHubUser(): Promise<GitHubUser | null> {
  try {
    const res = await fetch(GITHUB_API, {
      headers: { "User-Agent": "profile-kanitmann" },
      next: { revalidate: 21600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as GitHubUser;
  } catch {
    return null;
  }
}

export async function BentoGitHubCard() {
  const user = await fetchGitHubUser();
  const since =
    user && !Number.isNaN(new Date(user.created_at).getTime())
      ? new Date(user.created_at).getFullYear()
      : null;

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <HeadingLink href={GITHUB_PROFILE} chip="github.com/kanitmann01" external>
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
        {user && since !== null ? (
          <div
            className="flex items-center justify-center gap-3 font-mono text-xs text-muted-foreground"
            aria-label={`${user.public_repos} public repos, ${user.followers} followers, GitHub member since ${since}`}
          >
            <span>{user.public_repos} repos</span>
            <span aria-hidden="true">·</span>
            <span>{user.followers} followers</span>
            <span aria-hidden="true">·</span>
            <span>since {since}</span>
          </div>
        ) : null}
        <Link
          href={GITHUB_PROFILE}
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
