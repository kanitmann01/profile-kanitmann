import { readFile, writeFile } from "fs/promises";
import path from "path";

export type SeenStatus = "seen" | "accepted" | "rejected";
export type SeenSource = "hn" | "reddit" | "awesome" | "submit";

export type SeenEntry = {
  firstSeen: string;
  status: SeenStatus;
  source: SeenSource;
  issueNumber?: number;
};

export type SeenBlob = {
  version: 1;
  entries: Record<string, SeenEntry>;
};

export const DEFAULT_SEEN_PATH = path.resolve("data/.fable5-seen.json");

const TRACKING_PARAM_KEYS = new Set(["fbclid", "gclid"]);
const TRACKING_PARAM_PREFIXES = ["utm_"];

function isTrackingParam(key: string): boolean {
  if (TRACKING_PARAM_KEYS.has(key)) return true;
  return TRACKING_PARAM_PREFIXES.some((prefix) => key.startsWith(prefix));
}

export function normalizeUrl(url: string): string {
  const parsed = new URL(url);
  const protocol = parsed.protocol.toLowerCase();
  let host = parsed.hostname.toLowerCase();
  if (host.startsWith("www.")) {
    host = host.slice(4);
  }
  const params = Array.from(parsed.searchParams.entries()).filter(
    ([k]) => !isTrackingParam(k)
  );
  params.sort(([a], [b]) => a.localeCompare(b));
  const qs =
    params.length > 0
      ? "?" +
        params
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join("&")
      : "";
  let pathname = parsed.pathname;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  return `${protocol}//${host}${pathname}${qs}`;
}

export async function loadSeen(
  filePath: string = DEFAULT_SEEN_PATH
): Promise<SeenBlob> {
  try {
    const content = await readFile(filePath, "utf8");
    return JSON.parse(content) as SeenBlob;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return { version: 1, entries: {} };
    }
    throw err;
  }
}

let writeQueue: Promise<unknown> = Promise.resolve();

export async function saveSeen(
  blob: SeenBlob,
  filePath: string = DEFAULT_SEEN_PATH
): Promise<void> {
  const json = JSON.stringify(blob, null, 2);
  const next = writeQueue.then(() => writeFile(filePath, json, "utf8"));
  writeQueue = next.catch(() => undefined);
  return next;
}

export function isNew(url: string, blob: SeenBlob): boolean {
  const key = normalizeUrl(url);
  return !(key in blob.entries);
}

export function markSeen(
  url: string,
  status: SeenStatus,
  source: SeenSource,
  blob: SeenBlob,
  issueNumber?: number
): SeenBlob {
  const key = normalizeUrl(url);
  const existing = blob.entries[key];
  if (existing && existing.status === status) {
    return blob;
  }
  const entry: SeenEntry = {
    firstSeen: existing?.firstSeen ?? new Date().toISOString(),
    status,
    source,
  };
  if (issueNumber !== undefined) {
    entry.issueNumber = issueNumber;
  }
  return {
    version: 1,
    entries: {
      ...blob.entries,
      [key]: entry,
    },
  };
}

export function markDenied(
  url: string,
  source: SeenSource,
  blob: SeenBlob
): SeenBlob {
  return markSeen(url, "rejected", source, blob);
}
