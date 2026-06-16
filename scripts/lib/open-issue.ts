import { execFile } from "node:child_process";

import type { Fable5Candidate } from "./candidate";

export type ExecFileCallback = (
  err: Error | null,
  stdout: string,
  stderr: string
) => void;

export type ExecFileFn = (
  file: string,
  args: readonly string[] | undefined,
  options: { encoding: "utf8" },
  callback: ExecFileCallback
) => void;

const defaultExecFile = execFile as unknown as ExecFileFn;

export const FABLE5_LABELS = ["fable5-submission", "needs-triage"] as const;

export const RETRY_BACKOFFS_MS = [1000, 4000, 16000] as const;
export const MAX_RETRIES = RETRY_BACKOFFS_MS.length;
export const TOTAL_ATTEMPTS = MAX_RETRIES + 1;

export const ISSUE_TITLE_PREFIX = "[Fable 5]";
export const ISSUE_TITLE_MAX_LENGTH = 200;
export const FOOTER_PREFIX = "> Auto-discovered from";

export type OpenIssueOptions = {
  repo: string;
  candidate: Fable5Candidate;
  execFileFn?: ExecFileFn;
  sleep?: (ms: number) => Promise<void>;
};

export type OpenIssueResult = {
  url: string;
  number: number;
};

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function buildIssueTitle(candidate: Fable5Candidate): string {
  const oneLiner = candidate.oneLiner.trim();
  if (oneLiner.length <= ISSUE_TITLE_MAX_LENGTH) {
    return `${ISSUE_TITLE_PREFIX} ${oneLiner}`;
  }
  const trimmed = oneLiner.slice(0, ISSUE_TITLE_MAX_LENGTH - 3);
  return `${ISSUE_TITLE_PREFIX} ${trimmed}...`;
}

export function buildIssueBody(candidate: Fable5Candidate): string {
  const tags = candidate.tags.map((t) => `\`${t}\``).join(", ");
  const submitter = candidate.submitter
    ? `@${candidate.submitter}`
    : "_unknown_";
  const notes = candidate.notes?.trim() || "_none_";
  const siteUrl = candidate.demoUrl?.trim() || "_not deployable_";
  const footer = `${FOOTER_PREFIX} ${candidate.source}: ${candidate.sourceUrl}`;
  return [
    `**Site URL:** ${siteUrl}`,
    `**Author:** @${candidate.author}`,
    `**Submitter:** ${submitter}`,
    `**One-liner:** ${candidate.oneLiner}`,
    `**Tags:** ${tags}`,
    `**Type:** ${candidate.type}`,
    "",
    "### Notes",
    notes,
    "",
    footer,
    "",
  ].join("\n");
}

export function isRetryable(stderr: string): boolean {
  const match = /HTTP\s*(\d{3})/i.exec(stderr);
  if (!match) return false;
  const status = Number(match[1]);
  return status === 429 || (status >= 500 && status < 600);
}

function execFilePromise(
  file: string,
  args: readonly string[],
  execFileFn: ExecFileFn
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    execFileFn(file, args, { encoding: "utf8" }, (err, stdout, stderr) => {
      if (err) {
        const augmented = err as Error & { stderr?: string };
        if (!augmented.stderr && stderr) {
          augmented.stderr = stderr;
        }
        reject(augmented);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

function parseIssueNumberFromUrl(url: string): number {
  const match = /\/issues\/(\d+)/.exec(url);
  if (!match) return 0;
  return Number(match[1]);
}

export async function openIssue(
  options: OpenIssueOptions
): Promise<OpenIssueResult> {
  const {
    repo,
    candidate,
    execFileFn = defaultExecFile,
    sleep = defaultSleep,
  } = options;

  const title = buildIssueTitle(candidate);
  const body = buildIssueBody(candidate);
  const args: string[] = [
    "issue",
    "create",
    "--repo",
    repo,
    "--title",
    title,
    "--body",
    body,
  ];
  for (const label of FABLE5_LABELS) {
    args.push("--label", label);
  }

  let lastError: unknown;
  for (let attempt = 0; attempt < TOTAL_ATTEMPTS; attempt++) {
    try {
      const { stdout } = await execFilePromise("gh", args, execFileFn);
      const url = stdout.trim();
      return { url, number: parseIssueNumberFromUrl(url) };
    } catch (err) {
      lastError = err;
      const e = err as { stderr?: string; message?: string };
      const stderr = e.stderr ?? e.message ?? "";
      if (!isRetryable(stderr)) {
        throw err;
      }
      if (attempt === MAX_RETRIES) {
        break;
      }
      await sleep(RETRY_BACKOFFS_MS[attempt]);
    }
  }
  throw lastError;
}
