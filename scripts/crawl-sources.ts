import { XMLParser } from "fast-xml-parser";

import { log } from "./lib/log";
import { loadSeen, saveSeen, isNew, markSeen, type SeenBlob } from "./lib/seen";
import { openIssue } from "./lib/open-issue";
import { toCandidate, type Fable5Candidate } from "./lib/candidate";
import { fable5Sites, fable5Mentions } from "../data/fable5";

export type { Fable5Candidate };

const REPO = process.env.GITHUB_REPOSITORY ?? "kanitmann01/profile-kanitmann";

const SEVEN_DAYS_SECONDS = 7 * 24 * 60 * 60;
const HN_QUERIES = ["claude fable 5", "claude fable"];
const REDDIT_SUBREDDITS = ["ClaudeAI", "Anthropic", "SideProject", "webdev"];
const BACKOFF_DELAYS_MS = [1000, 4000, 16000];
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);
const REACHABILITY_TIMEOUT_MS = 5000;

type SourceStats = {
  fetched: number;
  inFable5: number;
  unreachable: number;
  seenBefore: number;
  opened: number;
  failed: number;
};

function emptyStats(): SourceStats {
  return {
    fetched: 0,
    inFable5: 0,
    unreachable: 0,
    seenBefore: 0,
    opened: 0,
    failed: 0,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithBackoff(
  url: string,
  init?: RequestInit,
  attempts = 4
): Promise<Response> {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const res = await fetch(url, init);
      if (res.ok) return res;
      if (RETRYABLE_STATUS.has(res.status) && attempt < attempts - 1) {
        log("fetch", "retry", {
          url,
          status: res.status,
          attempt: attempt + 1,
        });
        await sleep(BACKOFF_DELAYS_MS[attempt] ?? 16000);
        continue;
      }
      return res;
    } catch (err) {
      lastError = err;
      if (attempt < attempts - 1) {
        log("fetch", "retry", {
          url,
          error: String(err),
          attempt: attempt + 1,
        });
        await sleep(BACKOFF_DELAYS_MS[attempt] ?? 16000);
        continue;
      }
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error(`fetch failed for ${url}`);
}

function isDeployableUrl(url: string): boolean {
  return (
    !/x\.com\//.test(url) &&
    !/twitter\.com\//.test(url) &&
    !/reddit\.com\//.test(url)
  );
}

function isInFable5Data(url: string): boolean {
  const needle = url.toLowerCase();
  return (
    fable5Sites.some(
      (site) =>
        site.sourceUrl.toLowerCase() === needle ||
        site.demoUrl.toLowerCase() === needle
    ) ||
    fable5Mentions.some((mention) => mention.sourceUrl.toLowerCase() === needle)
  );
}

async function isUrlReachable(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REACHABILITY_TIMEOUT_MS);
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}

function extractHNAuthor(hit: {
  author?: string;
  url?: string | null;
}): string {
  if (hit.url) {
    const m = hit.url.match(/(?:x\.com|twitter\.com)\/([^/]+)/);
    if (m && m[1]) return m[1];
  }
  return hit.author ?? "unknown";
}

function encodeQuery(s: string): string {
  return encodeURIComponent(s).replace(/%20/g, "+");
}

function stripHandlePrefix(s: string): string {
  return s.replace(/^\/(u|r)\//, "").trim();
}

function extractRedditAuthor(entry: Record<string, unknown>): string {
  const author = entry.author as
    | { name?: string; "#text"?: string }
    | undefined;
  const raw = author?.name ?? author?.["#text"] ?? "";
  return stripHandlePrefix(raw) || "unknown";
}

function firstHrefFromHtml(html: string): string | null {
  const match = html.match(/<a[^>]+href=["']([^"']+)["']/i);
  return match && match[1] ? match[1] : null;
}

function extractRedditEntry(entry: Record<string, unknown>): {
  postUrl: string;
  externalUrl: string | null;
  title: string;
  author: string;
} {
  const link = entry.link as { "@_href"?: string } | string | undefined;
  let postUrl = "";
  if (link && typeof link === "object" && typeof link["@_href"] === "string") {
    postUrl = link["@_href"];
  } else if (typeof link === "string") {
    postUrl = link;
  } else if (typeof entry.id === "string") {
    postUrl = entry.id;
  }

  let externalUrl: string | null = null;
  const contentEncoded = entry["content:encoded"];
  const content = entry.content;
  const html =
    typeof contentEncoded === "string"
      ? contentEncoded
      : typeof content === "string"
        ? content
        : contentEncoded &&
            typeof contentEncoded === "object" &&
            "#text" in contentEncoded
          ? String((contentEncoded as { "#text": string })["#text"])
          : null;
  if (html) {
    const href = firstHrefFromHtml(html);
    if (href && !/reddit\.com\//.test(href)) {
      externalUrl = href;
    }
  }

  const title = typeof entry.title === "string" ? entry.title : "";
  const author = extractRedditAuthor(entry);

  return { postUrl, externalUrl, title, author };
}

async function fetchHNCandidates(): Promise<Fable5Candidate[]> {
  const sevenDaysAgoUnix = Math.floor(Date.now() / 1000) - SEVEN_DAYS_SECONDS;
  const candidates: Fable5Candidate[] = [];
  for (const query of HN_QUERIES) {
    const url = `https://hn.algolia.com/api/v1/search?query=${encodeQuery(
      query
    )}&tags=story&numericFilters=created_at_i>${sevenDaysAgoUnix}`;
    try {
      const res = await fetchWithBackoff(url);
      if (!res.ok) {
        log("hn", "fetch_failed", { query, status: res.status });
        continue;
      }
      const data = (await res.json()) as {
        hits?: Array<Record<string, unknown>>;
      };
      const hits = data.hits ?? [];
      for (const hit of hits) {
        const hitUrl = hit.url;
        if (typeof hitUrl !== "string" || hitUrl.length === 0) continue;
        candidates.push(
          toCandidate({
            source: "hn",
            sourceUrl: hitUrl,
            ...(isDeployableUrl(hitUrl) ? { demoUrl: hitUrl } : {}),
            author: extractHNAuthor(
              hit as { author?: string; url?: string | null }
            ),
            oneLiner: typeof hit.title === "string" ? hit.title : "",
            tags: [],
            type: "Demo",
          })
        );
      }
    } catch (err) {
      log("hn", "fetch_failed", { query, error: String(err) });
    }
  }
  return candidates;
}

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  parseAttributeValue: false,
  parseTagValue: false,
  trimValues: true,
});

async function fetchRedditCandidates(): Promise<Fable5Candidate[]> {
  const candidates: Fable5Candidate[] = [];
  for (const subreddit of REDDIT_SUBREDDITS) {
    const url = `https://www.reddit.com/r/${subreddit}/search.rss?q=fable+5&restrict_sr=on&sort=new&t=week`;
    try {
      const res = await fetchWithBackoff(url);
      if (!res.ok) {
        log("reddit", "fetch_failed", { subreddit, status: res.status });
        continue;
      }
      const xml = await res.text();
      const parsed = xmlParser.parse(xml) as { feed?: { entry?: unknown } };
      const entryRaw = parsed.feed?.entry;
      if (!entryRaw) continue;
      const entries = Array.isArray(entryRaw) ? entryRaw : [entryRaw];
      for (const entry of entries) {
        if (!entry || typeof entry !== "object") continue;
        const { postUrl, externalUrl, title, author } = extractRedditEntry(
          entry as Record<string, unknown>
        );
        const sourceUrl = externalUrl ?? postUrl;
        if (!sourceUrl) continue;
        candidates.push(
          toCandidate({
            source: "reddit",
            sourceUrl,
            ...(isDeployableUrl(sourceUrl) ? { demoUrl: sourceUrl } : {}),
            author,
            oneLiner: title,
            tags: [],
            type: "Demo",
          })
        );
      }
    } catch (err) {
      log("reddit", "fetch_failed", { subreddit, error: String(err) });
    }
  }
  return candidates;
}

async function processCandidates(
  candidates: Fable5Candidate[],
  stats: SourceStats,
  initialBlob: SeenBlob
): Promise<SeenBlob> {
  let blob = initialBlob;
  for (const candidate of candidates) {
    stats.fetched += 1;

    if (isInFable5Data(candidate.sourceUrl)) {
      log(candidate.source, "skip_in_fable5", { url: candidate.sourceUrl });
      stats.inFable5 += 1;
      continue;
    }

    const reachable = await isUrlReachable(candidate.sourceUrl);
    if (!reachable) {
      log(candidate.source, "skip_unreachable", { url: candidate.sourceUrl });
      stats.unreachable += 1;
      continue;
    }

    if (!isNew(candidate.sourceUrl, blob)) {
      log(candidate.source, "skip_seen", { url: candidate.sourceUrl });
      stats.seenBefore += 1;
      continue;
    }

    try {
      const result = await openIssue({ repo: REPO, candidate });
      blob = markSeen(
        candidate.sourceUrl,
        "seen",
        candidate.source,
        blob,
        result.number
      );
      log(candidate.source, "issue_opened", {
        url: candidate.sourceUrl,
        issue: result.number,
      });
      stats.opened += 1;
    } catch (err) {
      log(candidate.source, "open_failed", {
        url: candidate.sourceUrl,
        error: String(err),
      });
      stats.failed += 1;
    }
  }
  return blob;
}

export async function crawl(): Promise<void> {
  log("crawl", "started", { timestamp: new Date().toISOString() });

  let blob = await loadSeen();

  const hnStats = emptyStats();
  const redditStats = emptyStats();

  const hnCandidates = await fetchHNCandidates();
  log("hn", "fetched", { count: hnCandidates.length });
  blob = await processCandidates(hnCandidates, hnStats, blob);
  log("hn", "stats", hnStats);

  const redditCandidates = await fetchRedditCandidates();
  log("reddit", "fetched", { count: redditCandidates.length });
  blob = await processCandidates(redditCandidates, redditStats, blob);
  log("reddit", "stats", redditStats);

  await saveSeen(blob);
  log("crawl", "done", { timestamp: new Date().toISOString() });
}

export async function main(): Promise<void> {
  try {
    await crawl();
  } catch (err) {
    log("crawl", "fatal", { error: String(err) });
    process.exitCode = 1;
  }
}

if (process.argv[1] && /crawl-sources\.(ts|js)$/.test(process.argv[1])) {
  void main();
}
