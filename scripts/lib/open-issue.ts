import { spawnSync } from "child_process";

import type { Fable5Tag } from "@/data/fable5";
import type { Fable5MentionType } from "@/data/fable5";

export type Fable5Source = "hn" | "reddit" | "awesome" | "submit";

export type Fable5Candidate = {
  url: string;
  demoUrl?: string;
  authorHandle: string;
  yourHandle?: string;
  oneLiner: string;
  tags: Fable5Tag[];
  type: Fable5MentionType;
  source: Fable5Source;
  discoveredAt: string;
};

export type OpenIssueResult = {
  number: number;
  url: string;
};

const BACKOFFS = [1000, 4000, 16000];

function buildBody(candidate: Fable5Candidate): string {
  const lines: string[] = [];

  lines.push("### Site URL");
  lines.push(candidate.url);
  lines.push("");

  if (candidate.demoUrl) {
    lines.push("### Demo URL");
    lines.push(candidate.demoUrl);
    lines.push("");
  }

  lines.push("### Author X handle");
  lines.push(candidate.authorHandle);
  lines.push("");

  if (candidate.yourHandle) {
    lines.push("### Your X handle");
    lines.push(candidate.yourHandle);
    lines.push("");
  }

  lines.push("### One-line description");
  lines.push(candidate.oneLiner);
  lines.push("");

  lines.push("### Tags");
  lines.push(candidate.tags.join(", "));
  lines.push("");

  lines.push("### Type");
  lines.push(candidate.type);
  lines.push("");

  lines.push("### Author credits");
  lines.push("- [x] I confirm the author is credited and the link is public");
  lines.push("");

  lines.push("### Anything else?");
  lines.push(
    `> Auto-discovered from ${candidate.source} on ${candidate.discoveredAt} by fable5-bot`
  );

  return lines.join("\n");
}

function runGh(args: string[]): string {
  const result = spawnSync("gh", ["issue", "create", ...args], {
    encoding: "utf-8",
    timeout: 30000,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const err = new Error(result.stderr) as Error & { stderr: string };
    err.stderr = result.stderr;
    throw err;
  }
  return result.stdout;
}

export async function openIssue(
  candidate: Fable5Candidate
): Promise<OpenIssueResult> {
  const title = `[Fable 5] ${candidate.oneLiner}`;
  const body = buildBody(candidate);

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= BACKOFFS.length; attempt++) {
    try {
      const output = runGh([
        "--title",
        title,
        "--body",
        body,
        "--label",
        "fable5-submission",
        "--label",
        "needs-triage",
        "--repo",
        "kanitmann01/profile-kanitmann",
      ]);

      // gh issue create outputs the issue URL
      const url = output.trim();
      const match = url.match(/\/(\d+)$/);
      if (!match) {
        throw new Error(`Could not parse issue number from output: ${url}`);
      }

      return { number: parseInt(match[1], 10), url };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      const stderr = (err as { stderr?: string }).stderr ?? "";

      // Retry only on 429 or 5xx
      const isRetryable =
        stderr.includes("429") ||
        stderr.includes("5") ||
        stderr.includes("500") ||
        stderr.includes("502") ||
        stderr.includes("503");

      if (!isRetryable || attempt >= BACKOFFS.length) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, BACKOFFS[attempt]));
    }
  }

  throw lastError ?? new Error("Failed to open issue after all retries");
}
