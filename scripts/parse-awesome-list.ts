import path from "path";

import { openIssue, RETRY_BACKOFFS_MS, TOTAL_ATTEMPTS } from "./lib/open-issue";
import { toCandidate, type Fable5Candidate } from "./lib/candidate";
import {
  isNew,
  loadSeen,
  markSeen,
  saveSeen,
  type SeenBlob,
  type SeenSource,
} from "./lib/seen";
import { log } from "./lib/log";
import type { Fable5MentionType, Fable5Tag } from "../data/fable5";

export const AWESOME_LIST_URL =
  "https://raw.githubusercontent.com/Anil-matcha/awesome-claude-fable-5/main/README.md";

export const SOURCE: SeenSource = "awesome";

export const FETCH_RETRY_BACKOFFS_MS = RETRY_BACKOFFS_MS;
export const FETCH_TOTAL_ATTEMPTS = TOTAL_ATTEMPTS;

const REPO = process.env.GITHUB_REPOSITORY ?? "kanitmann01/profile-kanitmann";
const DEFAULT_SEEN_PATH = path.resolve("data/.fable5-seen.json");

export type Fetcher = (url: string) => Promise<Response>;
export type Sleeper = (ms: number) => Promise<void>;

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function defaultFetch(url: string): Promise<Response> {
  return fetch(url);
}

export type ParsedCase = {
  caseNumber: number;
  title: string;
  authorHandle: string;
  sourceUrl: string;
  type: Fable5MentionType;
  date: string;
  demoUrl: string;
  body: string;
};

const CASE_HEADER_RE =
  /^###\s+Case\s+(\d+):\s*\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)\s*\(by\s+\[@([^\]]+)\]\([^)]+\)\)/;

const TYPE_DATE_RE =
  /Type:\s*(Demo|Tutorial|Evaluation|Integration)\s*\|\s*Date:\s*(\d{4}-\d{2}-\d{2})/;

const BARE_URL_RE = /^(https?:\/\/\S+)\s*$/;

function pickDemoUrl(block: string, sourceUrl: string): string {
  const lines = block.split(/\r?\n/);
  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const match = BARE_URL_RE.exec(trimmed);
    if (match && match[1] !== sourceUrl) {
      return match[1];
    }
  }
  return sourceUrl;
}

export function parseAwesomeListMarkdown(markdown: string): ParsedCase[] {
  const lines = markdown.split(/\r?\n/);
  const cases: ParsedCase[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const match = CASE_HEADER_RE.exec(line);
    if (!match) {
      i++;
      continue;
    }
    const caseNumber = Number(match[1]);
    const title = match[2].trim();
    const sourceUrl = match[3].trim();
    const authorHandle = match[4].trim();

    i++;
    const blockLines: string[] = [];
    while (i < lines.length) {
      const next = lines[i];
      if (/^###\s+/.test(next) || /^---\s*$/.test(next)) {
        break;
      }
      blockLines.push(next);
      i++;
    }

    const block = blockLines.join("\n");
    const typeDateMatch = TYPE_DATE_RE.exec(block);
    const type: Fable5MentionType = typeDateMatch
      ? (typeDateMatch[1] as Fable5MentionType)
      : "Demo";
    const date = typeDateMatch ? typeDateMatch[2] : "2026-06-09";
    const demoUrl = pickDemoUrl(block, sourceUrl);

    cases.push({
      caseNumber,
      title,
      authorHandle,
      sourceUrl,
      type,
      date,
      demoUrl,
      body: block,
    });
  }
  return cases;
}

export function buildCandidateFromCase(parsed: ParsedCase): Fable5Candidate {
  return toCandidate({
    source: SOURCE,
    sourceUrl: parsed.sourceUrl,
    demoUrl: parsed.demoUrl,
    author: parsed.authorHandle,
    oneLiner: parsed.title,
    tags: [] as Fable5Tag[],
    type: parsed.type,
  });
}

export async function fetchWithRetry(
  url: string,
  options: {
    fetchFn?: Fetcher;
    sleep?: Sleeper;
  } = {}
): Promise<string> {
  const fetchFn = options.fetchFn ?? defaultFetch;
  const sleep = options.sleep ?? defaultSleep;
  let lastError: unknown;
  for (let attempt = 0; attempt < FETCH_TOTAL_ATTEMPTS; attempt++) {
    try {
      const res = await fetchFn(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      return await res.text();
    } catch (err) {
      lastError = err;
      if (attempt === FETCH_RETRY_BACKOFFS_MS.length) {
        break;
      }
      log(SOURCE, "fetch_retry", {
        url,
        attempt: attempt + 1,
        backoffMs: FETCH_RETRY_BACKOFFS_MS[attempt],
        error: err instanceof Error ? err.message : String(err),
      });
      await sleep(FETCH_RETRY_BACKOFFS_MS[attempt]);
    }
  }
  log(SOURCE, "error", {
    url,
    attempts: FETCH_TOTAL_ATTEMPTS,
    error: lastError instanceof Error ? lastError.message : String(lastError),
  });
  throw lastError;
}

export type SyncStats = {
  fetched: number;
  new: number;
  duplicate: number;
  opened: number;
  failed: number;
};

export type SyncOptions = {
  repo?: string;
  seenPath?: string;
  fetchFn?: Fetcher;
  sleep?: Sleeper;
  loadSeenFn?: typeof loadSeen;
  saveSeenFn?: typeof saveSeen;
  openIssueFn?: typeof openIssue;
};

export async function syncAwesomeList(
  options: SyncOptions = {}
): Promise<SyncStats> {
  const repo = options.repo ?? REPO;
  const seenPath = options.seenPath ?? DEFAULT_SEEN_PATH;
  const fetchFn = options.fetchFn ?? defaultFetch;
  const sleep = options.sleep ?? defaultSleep;
  const loadSeenFn = options.loadSeenFn ?? loadSeen;
  const saveSeenFn = options.saveSeenFn ?? saveSeen;
  const openIssueFn = options.openIssueFn ?? openIssue;

  const stats: SyncStats = {
    fetched: 0,
    new: 0,
    duplicate: 0,
    opened: 0,
    failed: 0,
  };

  log(SOURCE, "fetched", { url: AWESOME_LIST_URL });

  const markdown = await fetchWithRetry(AWESOME_LIST_URL, { fetchFn, sleep });
  const parsed = parseAwesomeListMarkdown(markdown);
  stats.fetched = parsed.length;
  log(SOURCE, "parsed", { count: parsed.length });

  let blob: SeenBlob = await loadSeenFn(seenPath);

  for (const parsedCase of parsed) {
    const candidate = buildCandidateFromCase(parsedCase);
    if (!isNew(candidate.sourceUrl, blob)) {
      stats.duplicate++;
      log(SOURCE, "duplicate", {
        caseNumber: parsedCase.caseNumber,
        sourceUrl: candidate.sourceUrl,
      });
      continue;
    }
    stats.new++;
    log(SOURCE, "new", {
      caseNumber: parsedCase.caseNumber,
      sourceUrl: candidate.sourceUrl,
      author: parsedCase.authorHandle,
    });
    try {
      const result = await openIssueFn({ repo, candidate, sleep });
      stats.opened++;
      blob = markSeen(candidate.sourceUrl, "seen", SOURCE, blob, result.number);
      log(SOURCE, "opened_issue", {
        caseNumber: parsedCase.caseNumber,
        issueNumber: result.number,
        url: result.url,
      });
    } catch (err) {
      stats.failed++;
      const message = err instanceof Error ? err.message : String(err);
      log(SOURCE, "error", {
        caseNumber: parsedCase.caseNumber,
        sourceUrl: candidate.sourceUrl,
        error: message,
      });
    }
  }

  await saveSeenFn(blob, seenPath);
  log(SOURCE, "saved", {
    path: seenPath,
    totalEntries: Object.keys(blob.entries).length,
  });
  log(SOURCE, "synced", stats);

  return stats;
}

async function main(): Promise<void> {
  try {
    const stats = await syncAwesomeList();
    if (stats.failed > 0) {
      process.stderr.write(
        `[parse-awesome-list] ${stats.failed} candidates failed to open issues\n`
      );
      process.exit(1);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    process.stderr.write(`[parse-awesome-list] failed: ${message}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  void main();
}
