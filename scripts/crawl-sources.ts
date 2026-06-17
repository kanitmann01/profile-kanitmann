import { XMLParser } from "fast-xml-parser";

import { isNew, markSeen } from "./lib/seen";
import {
  openIssue,
  type Fable5Candidate,
  type Fable5Source,
} from "./lib/open-issue";
import { log } from "./lib/log";
import type { Fable5MentionType } from "../data/fable5";

const HN_URL =
  "https://hn.algolia.com/api/v1/search?query=claude+fable+5&tags=story&numericFilters=created_at_i>";
const HN_ALT_URL =
  "https://hn.algolia.com/api/v1/search?query=claude+fable&tags=story&numericFilters=created_at_i>";
const REDDIT_SUBREDDITS = ["ClaudeAI", "Anthropic", "SideProject", "webdev"];
const REDDIT_RSS_TEMPLATE =
  "https://www.reddit.com/r/{subreddit}/search.rss?q=fable+5&restrict_sr=on&sort=new&t=week";

const BACKOFFS = [1000, 4000, 16000];

function getSevenDaysAgoUnix(): number {
  return Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000);
}

async function fetchWithRetry(url: string): Promise<string> {
  for (let attempt = 0; attempt <= BACKOFFS.length; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "fable5-bot/1.0" },
      });
      if (!response.ok) {
        if (
          response.status === 429 ||
          response.status === 500 ||
          response.status === 502 ||
          response.status === 503
        ) {
          if (attempt < BACKOFFS.length) {
            await new Promise((resolve) =>
              setTimeout(resolve, BACKOFFS[attempt])
            );
            continue;
          }
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.text();
    } catch (err) {
      if (attempt >= BACKOFFS.length) throw err;
      await new Promise((resolve) => setTimeout(resolve, BACKOFFS[attempt]));
    }
  }
  throw new Error("Max retries exceeded");
}

async function urlIsReachable(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok || response.status < 500;
  } catch {
    return false;
  }
}

async function fetchHnSource(): Promise<Fable5Candidate[]> {
  const candidates: Fable5Candidate[] = [];
  const since = getSevenDaysAgoUnix();

  const queries = [
    `${HN_URL}${since}`,
    `${HN_ALT_URL}${since}`,
  ];

  const seenUrls = new Set<string>();

  for (const queryUrl of queries) {
    try {
      const body = await fetchWithRetry(queryUrl);
      const data = JSON.parse(body);
      const hits = data.hits ?? [];

      for (const hit of hits) {
        if (!hit.url) continue;

        if (seenUrls.has(hit.url)) continue;
        seenUrls.add(hit.url);

        const reachable = await urlIsReachable(hit.url);
        if (!reachable) {
          log("hn", "skip-unreachable", { url: hit.url, reason: "DNS or fetch error" });
          continue;
        }

        candidates.push({
          url: hit.url,
          demoUrl: hit.url,
          authorHandle: hit.author ?? "unknown",
          oneLiner: hit.title ?? "",
          tags: ["tooling"],
          type: "Demo" as Fable5MentionType,
          source: "hn" as Fable5Source,
          discoveredAt: new Date((hit.created_at_i ?? 0) * 1000)
            .toISOString()
            .slice(0, 10),
        });
      }
    } catch (err) {
      log("hn", "fetch-error", { error: String(err) });
    }
  }

  return candidates;
}

async function fetchRedditSource(): Promise<Fable5Candidate[]> {
  const candidates: Fable5Candidate[] = [];
  const seenUrls = new Set<string>();

  for (const subreddit of REDDIT_SUBREDDITS) {
    const url = REDDIT_RSS_TEMPLATE.replace("{subreddit}", subreddit);

    try {
      const body = await fetchWithRetry(url);
    const parsed = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    }).parse(body);

      const feed = parsed.feed ?? parsed.rss?.channel ?? {};
      const entries: unknown[] =
        feed.entry ?? feed.item ?? feed.entry ?? [];

      for (const entry of entries as Record<string, unknown>[]) {
        const entryAny = entry as Record<string, unknown>;

        const linkRaw = entryAny.link;
        const postUrl =
          typeof linkRaw === "object" && linkRaw
            ? (linkRaw as Record<string, string>)["@_href"] ?? ""
            : (linkRaw as string) ?? "";

        if (!postUrl || seenUrls.has(postUrl)) continue;

        let externalUrl = "";
        const content =
          (entryAny["content:encoded"] as string) ??
          (entryAny.content as string) ??
          (entryAny.summary as string) ??
          (entryAny.description as string) ??
          "";

        if (typeof content === "string") {
          const linkMatch = content.match(
            /href="(https?:\/\/[^"]+)"/
          );
          if (linkMatch) {
            externalUrl = linkMatch[1];
          }
        }

        const finalUrl = externalUrl || postUrl;
        seenUrls.add(finalUrl);

        const reachable = await urlIsReachable(finalUrl);
        if (!reachable) {
          log("reddit", "skip-unreachable", { url: finalUrl, reason: "DNS or fetch error" });
          continue;
        }

        const author =
          ((entryAny.author as { name?: string })?.name as string) ??
          (entryAny["dc:creator"] as string) ??
          `reddit/${subreddit}`;

        const published =
          (entryAny.published as string) ??
          (entryAny["pubDate"] as string) ??
          (entryAny.updated as string) ??
          "";

        candidates.push({
          url: finalUrl,
          demoUrl: finalUrl,
          authorHandle: author,
          oneLiner: (entryAny.title as string) ?? "",
          tags: ["tooling"],
          type: "Demo" as Fable5MentionType,
          source: "reddit" as Fable5Source,
          discoveredAt: published ? published.slice(0, 10) : "unknown",
        });
      }
    } catch (err) {
      log("reddit", "fetch-error", { subreddit, error: String(err) });
    }
  }

  return candidates;
}

export async function crawl(): Promise<{
  hnCount: number;
  redditCount: number;
  opened: number;
  skipped: number;
  failed: number;
}> {
  const [hnCandidates, redditCandidates] = await Promise.all([
    fetchHnSource(),
    fetchRedditSource(),
  ]);

  const allCandidates = [...hnCandidates, ...redditCandidates];
  let opened = 0;
  let skipped = 0;
  let failed = 0;

  for (const candidate of allCandidates) {
    if (!isNew(candidate.url)) {
      skipped++;
      continue;
    }

    try {
      await openIssue(candidate);
      markSeen(candidate.url, "pending", candidate.source);
      opened++;
    } catch {
      failed++;
    }
  }

  log("crawl", "complete", {
    hnFetched: hnCandidates.length,
    redditFetched: redditCandidates.length,
    total: allCandidates.length,
    new: opened,
    dup: skipped,
    opened,
    failed,
  });

  return {
    hnCount: hnCandidates.length,
    redditCount: redditCandidates.length,
    opened,
    skipped,
    failed,
  };
}

if (
  process.argv[1] &&
  (process.argv[1].endsWith("crawl-sources.ts") ||
    process.argv[1].endsWith("crawl-sources.js"))
) {
  crawl().catch((err) => {
    log("crawl", "fatal", { error: String(err) });
    process.exit(1);
  });
}
