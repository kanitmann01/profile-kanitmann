import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

export const DEFAULT_SEEN_PATH = join(
  process.cwd(),
  "data",
  ".fable5-seen.json"
);

export type SeenStatus = "accepted" | "rejected" | "pending";

export type SeenEntry = {
  status: SeenStatus;
  source: string;
  issueNumber?: number;
  firstSeenAt: string;
  lastUpdatedAt: string;
};

export type SeenBlob = {
  version: 1;
  entries: Record<string, SeenEntry>;
};

export function normalizeUrl(url: string): string {
  let normalized = url.trim().toLowerCase();

  try {
    const parsed = new URL(normalized);
    parsed.hostname = parsed.hostname.replace(/^www\./, "");
    parsed.hash = "";

    const excludedParams = new Set([
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "fbclid",
      "gclid",
    ]);
    const searchParams = new URLSearchParams(parsed.search);
    const keys = [...searchParams.keys()];
    for (const key of keys) {
      if (excludedParams.has(key)) {
        searchParams.delete(key);
      }
    }
    searchParams.sort();
    parsed.search = searchParams.toString();

    normalized = parsed.toString();
  } catch {
    // If URL is invalid, just return cleaned string
  }

  normalized = normalized.replace(/\/+$/, "");

  return normalized;
}

function loadSeenAt(path: string): SeenBlob {
  if (!existsSync(path)) {
    const initial: SeenBlob = { version: 1, entries: {} };
    return initial;
  }
  const raw = readFileSync(path, "utf-8");
  return JSON.parse(raw) as SeenBlob;
}

function saveSeenAt(blob: SeenBlob, path: string): void {
  writeFileSync(path, JSON.stringify(blob, null, 2) + "\n", "utf-8");
}

export function loadSeen(path?: string): SeenBlob {
  return loadSeenAt(path ?? DEFAULT_SEEN_PATH);
}

export function saveSeen(blob: SeenBlob, path?: string): void {
  saveSeenAt(blob, path ?? DEFAULT_SEEN_PATH);
}

export function isNew(url: string, path?: string): boolean {
  const blob = loadSeen(path);
  const key = normalizeUrl(url);
  return !(key in blob.entries);
}

export function markSeen(
  url: string,
  status: SeenStatus,
  source: string,
  issueNumber?: number,
  path?: string
): void {
  const blob = loadSeen(path);
  const key = normalizeUrl(url);
  const now = new Date().toISOString();
  const existing = blob.entries[key];

  if (existing) {
    existing.status = status;
    existing.source = source;
    existing.lastUpdatedAt = now;
    if (issueNumber !== undefined) {
      existing.issueNumber = issueNumber;
    }
  } else {
    blob.entries[key] = {
      status,
      source,
      issueNumber,
      firstSeenAt: now,
      lastUpdatedAt: now,
    };
  }

  saveSeen(blob, path);
}

export function markDenied(url: string, source: string, path?: string): void {
  markSeen(url, "rejected", source, undefined, path);
}
