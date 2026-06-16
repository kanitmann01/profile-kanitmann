// @vitest-environment node

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { existsSync, unlinkSync, mkdtempSync, writeFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

import {
  normalizeUrl,
  loadSeen,
  saveSeen,
  isNew,
  markSeen,
  markDenied,
} from "../seen";

let tmpDir: string;
let seenPath: string;

beforeEach(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "seen-test-"));
  seenPath = join(tmpDir, ".fable5-seen.json");
  writeFileSync(
    seenPath,
    JSON.stringify({ version: 1, entries: {} }) + "\n",
    "utf-8"
  );
});

afterEach(() => {
  if (existsSync(seenPath)) {
    unlinkSync(seenPath);
  }
});

describe("normalizeUrl", () => {
  it("lowercases the URL", () => {
    expect(normalizeUrl("HTTPS://EXAMPLE.COM/Path")).toBe(
      "https://example.com/path"
    );
  });

  it("strips trailing slashes", () => {
    expect(normalizeUrl("https://example.com/path/")).toBe(
      "https://example.com/path"
    );
    expect(normalizeUrl("https://example.com/")).toBe("https://example.com");
  });

  it("strips www. prefix", () => {
    expect(normalizeUrl("https://www.example.com/path")).toBe(
      "https://example.com/path"
    );
    expect(normalizeUrl("https://WWW.example.com/Path/")).toBe(
      "https://example.com/path"
    );
  });

  it("strips tracking query params", () => {
    const result = normalizeUrl(
      "https://example.com/path?utm_source=twitter&utm_medium=social&a=1"
    );
    expect(result).not.toContain("utm_source");
    expect(result).not.toContain("utm_medium");
    expect(result).toContain("a=1");
  });

  it("strips fbclid and gclid", () => {
    const result = normalizeUrl(
      "https://example.com/path?fbclid=abc123&gclid=def456"
    );
    expect(result).not.toContain("fbclid");
    expect(result).not.toContain("gclid");
  });

  it("sorts query parameters by key", () => {
    const result = normalizeUrl("https://example.com/path?z=1&a=2&m=3");
    const queryStart = result.indexOf("?");
    const query = result.slice(queryStart);
    expect(query.indexOf("a=2")).toBeLessThan(query.indexOf("m=3"));
    expect(query.indexOf("m=3")).toBeLessThan(query.indexOf("z=1"));
  });

  it("strips hash fragment", () => {
    expect(normalizeUrl("https://example.com/path#section")).toBe(
      "https://example.com/path"
    );
  });

  it("trims whitespace", () => {
    expect(normalizeUrl("  https://example.com/path  ")).toBe(
      "https://example.com/path"
    );
  });

  it("handles invalid URLs gracefully", () => {
    expect(normalizeUrl("not-a-url")).toBe("not-a-url");
  });
});

describe("isNew", () => {
  it("returns true for a URL not in the blob", () => {
    expect(isNew("https://example.com/new-site", seenPath)).toBe(true);
  });

  it("returns false for an accepted URL", () => {
    markSeen("https://example.com/site", "accepted", "test", undefined, seenPath);
    expect(isNew("https://example.com/site", seenPath)).toBe(false);
  });

  it("returns false for a rejected URL", () => {
    markSeen(
      "https://example.com/spam",
      "rejected",
      "test",
      undefined,
      seenPath
    );
    expect(isNew("https://example.com/spam", seenPath)).toBe(false);
  });

  it("is case-insensitive", () => {
    markSeen("https://example.com/SiteA", "accepted", "test", undefined, seenPath);
    expect(isNew("https://example.com/sitea", seenPath)).toBe(false);
  });

  it("normalizes URLs before lookup", () => {
    markSeen(
      "https://example.com/my-site/",
      "pending",
      "crawl",
      undefined,
      seenPath
    );
    expect(isNew("https://www.example.com/my-site", seenPath)).toBe(false);
  });
});

describe("markSeen", () => {
  it("adds a new entry", () => {
    markSeen("https://example.com/site", "accepted", "manual", 42, seenPath);
    const blob = loadSeen(seenPath);
    const key = normalizeUrl("https://example.com/site");
    expect(blob.entries[key]).toBeDefined();
    expect(blob.entries[key].status).toBe("accepted");
    expect(blob.entries[key].source).toBe("manual");
    expect(blob.entries[key].issueNumber).toBe(42);
  });

  it("is idempotent — updates without duplicate entry", () => {
    markSeen("https://example.com/site", "pending", "crawl", undefined, seenPath);
    markSeen("https://example.com/site", "accepted", "triage", 1, seenPath);
    const blob = loadSeen(seenPath);
    const key = normalizeUrl("https://example.com/site");
    expect(Object.keys(blob.entries).length).toBe(1);
    expect(blob.entries[key].status).toBe("accepted");
    expect(blob.entries[key].issueNumber).toBe(1);
  });

  it("preserves firstSeenAt across updates", () => {
    markSeen("https://example.com/site", "pending", "crawl", undefined, seenPath);
    const blob1 = loadSeen(seenPath);
    const key = normalizeUrl("https://example.com/site");
    const firstSeen = blob1.entries[key].firstSeenAt;

    markSeen("https://example.com/site", "accepted", "triage", undefined, seenPath);
    const blob2 = loadSeen(seenPath);
    expect(blob2.entries[key].firstSeenAt).toBe(firstSeen);
  });
});

describe("markDenied", () => {
  it("is an alias for markSeen with rejected status", () => {
    markDenied("https://example.com/spam", "bot", seenPath);
    const blob = loadSeen(seenPath);
    const key = normalizeUrl("https://example.com/spam");
    expect(blob.entries[key].status).toBe("rejected");
  });
});

describe("persistence", () => {
  it("loadSeen returns the initial blob from an empty file", () => {
    const blob = loadSeen(seenPath);
    expect(blob.version).toBe(1);
    expect(blob.entries).toEqual({});
  });

  it("survives a full load-save-load cycle", () => {
    markSeen("https://example.com/a", "accepted", "crawl", undefined, seenPath);
    markSeen("https://example.com/b", "rejected", "bot", undefined, seenPath);
    const blob = loadSeen(seenPath);
    expect(Object.keys(blob.entries).length).toBe(2);
    expect(blob.entries[normalizeUrl("https://example.com/a")].status).toBe(
      "accepted"
    );
    expect(blob.entries[normalizeUrl("https://example.com/b")].status).toBe(
      "rejected"
    );
  });
});
