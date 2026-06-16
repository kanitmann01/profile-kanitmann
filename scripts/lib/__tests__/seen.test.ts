import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtemp, readFile, rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import path from "path";
import {
  loadSeen,
  saveSeen,
  isNew,
  markSeen,
  markDenied,
  normalizeUrl,
  type SeenBlob,
  type SeenStatus,
  type SeenSource,
} from "../seen";

let dir: string;
let seenPath: string;

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "fable5-seen-"));
  seenPath = path.join(dir, ".fable5-seen.json");
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

const initialBlob = (): SeenBlob => ({ version: 1, entries: {} });

describe("normalizeUrl", () => {
  it("lowercases the host and protocol", () => {
    expect(normalizeUrl("HTTPS://Example.COM/Path")).toBe(
      "https://example.com/Path"
    );
  });

  it("strips a single trailing slash from the path", () => {
    expect(normalizeUrl("https://example.com/foo/")).toBe(
      "https://example.com/foo"
    );
  });

  it("preserves the root path slash (does not over-strip)", () => {
    expect(normalizeUrl("https://example.com/")).toBe("https://example.com/");
  });

  it("strips a leading www. from the host", () => {
    expect(normalizeUrl("https://www.example.com/foo")).toBe(
      "https://example.com/foo"
    );
  });

  it("only strips www. on the first label of the host, not subdomains", () => {
    expect(normalizeUrl("https://www2.example.com/foo")).toBe(
      "https://www2.example.com/foo"
    );
  });

  it("strips utm_* tracking params", () => {
    expect(
      normalizeUrl("https://example.com/foo?utm_source=x&id=42&utm_medium=mail")
    ).toBe("https://example.com/foo?id=42");
  });

  it("strips fbclid and gclid tracking params", () => {
    expect(
      normalizeUrl("https://example.com/foo?fbclid=abc&gclid=xyz&id=1")
    ).toBe("https://example.com/foo?id=1");
  });

  it("preserves non-tracking query params", () => {
    expect(normalizeUrl("https://example.com/foo?id=1&q=hello")).toBe(
      "https://example.com/foo?id=1&q=hello"
    );
  });

  it("sorts remaining query params for deterministic output", () => {
    expect(normalizeUrl("https://example.com/foo?b=2&a=1&c=3")).toBe(
      "https://example.com/foo?a=1&b=2&c=3"
    );
  });

  it("strips the URL fragment", () => {
    expect(normalizeUrl("https://example.com/foo#section")).toBe(
      "https://example.com/foo"
    );
  });

  it("handles URLs with no query string", () => {
    expect(normalizeUrl("https://example.com/foo")).toBe(
      "https://example.com/foo"
    );
  });
});

describe("loadSeen", () => {
  it("returns an empty blob when the file does not exist", async () => {
    const blob = await loadSeen(seenPath);
    expect(blob).toEqual({ version: 1, entries: {} });
  });

  it("returns the parsed blob when the file exists", async () => {
    const existing: SeenBlob = {
      version: 1,
      entries: {
        "https://example.com/a": {
          firstSeen: "2026-06-15T00:00:00.000Z",
          status: "accepted",
          source: "hn",
          issueNumber: 7,
        },
      },
    };
    await writeFile(seenPath, JSON.stringify(existing), "utf8");
    const blob = await loadSeen(seenPath);
    expect(blob).toEqual(existing);
  });
});

describe("saveSeen", () => {
  it("writes a pretty-printed JSON blob to disk", async () => {
    const blob = initialBlob();
    blob.entries["https://example.com/a"] = {
      firstSeen: "2026-06-15T00:00:00.000Z",
      status: "seen",
      source: "reddit",
    };
    await saveSeen(blob, seenPath);
    const content = await readFile(seenPath, "utf8");
    expect(content).toBe(JSON.stringify(blob, null, 2));
  });
});

describe("isNew", () => {
  it("returns true for URLs not in the blob", () => {
    const blob = initialBlob();
    expect(isNew("https://example.com/new", blob)).toBe(true);
  });

  it("returns false for URLs already present with any status", () => {
    const blob: SeenBlob = {
      version: 1,
      entries: {
        "https://example.com/seen": {
          firstSeen: "2026-06-15T00:00:00.000Z",
          status: "seen",
          source: "hn",
        },
        "https://example.com/accepted": {
          firstSeen: "2026-06-15T00:00:00.000Z",
          status: "accepted",
          source: "hn",
          issueNumber: 1,
        },
        "https://example.com/rejected": {
          firstSeen: "2026-06-15T00:00:00.000Z",
          status: "rejected",
          source: "awesome",
        },
      },
    };
    expect(isNew("https://example.com/seen", blob)).toBe(false);
    expect(isNew("https://example.com/accepted", blob)).toBe(false);
    expect(isNew("https://example.com/rejected", blob)).toBe(false);
  });

  it("treats two URLs that normalize to the same key as not new", () => {
    const blob = initialBlob();
    blob.entries[normalizeUrl("https://WWW.example.com/foo/")] = {
      firstSeen: "2026-06-15T00:00:00.000Z",
      status: "seen",
      source: "hn",
    };
    expect(isNew("https://www.example.com/foo", blob)).toBe(false);
  });
});

describe("markSeen", () => {
  it("inserts a new entry with status seen and firstSeen set", () => {
    const blob = initialBlob();
    const result = markSeen("https://example.com/a", "seen", "hn", blob);
    expect(result.entries[normalizeUrl("https://example.com/a")]).toMatchObject(
      {
        status: "seen",
        source: "hn",
      }
    );
    expect(
      result.entries[normalizeUrl("https://example.com/a")].firstSeen
    ).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("captures the optional issueNumber when provided", () => {
    const blob = initialBlob();
    const result = markSeen(
      "https://example.com/a",
      "accepted",
      "hn",
      blob,
      42
    );
    expect(result.entries[normalizeUrl("https://example.com/a")]).toMatchObject(
      {
        status: "accepted",
        source: "hn",
        issueNumber: 42,
      }
    );
  });

  it("is idempotent when called twice with the same status (does not lose metadata)", () => {
    const blob = initialBlob();
    const first = markSeen("https://example.com/a", "accepted", "hn", blob, 7);
    const firstSeen =
      first.entries[normalizeUrl("https://example.com/a")].firstSeen;
    const second = markSeen("https://example.com/a", "accepted", "hn", blob, 7);
    expect(second.entries[normalizeUrl("https://example.com/a")]).toEqual({
      firstSeen,
      status: "accepted",
      source: "hn",
      issueNumber: 7,
    });
  });

  it("preserves the original firstSeen and issueNumber when called again with same status", () => {
    const blob = initialBlob();
    const first = markSeen("https://example.com/a", "seen", "hn", blob, 99);
    const originalFirstSeen =
      first.entries[normalizeUrl("https://example.com/a")].firstSeen;
    const second = markSeen("https://example.com/a", "seen", "hn", blob, 99);
    const entry = second.entries[normalizeUrl("https://example.com/a")];
    expect(entry.firstSeen).toBe(originalFirstSeen);
    expect(entry.issueNumber).toBe(99);
  });

  it("normalizes the URL when storing", () => {
    const blob = initialBlob();
    const result = markSeen(
      "https://WWW.Example.com/foo/?utm_source=x",
      "seen",
      "hn",
      blob
    );
    expect(Object.keys(result.entries)).toContain("https://example.com/foo");
  });

  it("does not mutate the input blob", () => {
    const blob = initialBlob();
    const snapshot = JSON.parse(JSON.stringify(blob));
    markSeen("https://example.com/a", "seen", "hn", blob);
    expect(blob).toEqual(snapshot);
  });
});

describe("markDenied", () => {
  it("is a thin alias for markSeen with status rejected", () => {
    const blob = initialBlob();
    const denied = markDenied("https://example.com/x", "reddit", blob);
    const manual = markSeen(
      "https://example.com/x",
      "rejected",
      "reddit",
      initialBlob()
    );
    expect(denied.entries).toEqual(manual.entries);
  });
});

describe("concurrent saveSeen", () => {
  it("does not corrupt the JSON file when many saveSeen calls run in parallel", async () => {
    await saveSeen(initialBlob(), seenPath);

    const writes = Array.from({ length: 50 }, (_, i) => {
      const blob = initialBlob();
      blob.entries[`https://example.com/${i}`] = {
        firstSeen: "2026-06-15T00:00:00.000Z",
        status: "seen",
        source: "hn",
      };
      return saveSeen(blob, seenPath);
    });

    await Promise.all(writes);

    const content = await readFile(seenPath, "utf8");
    const parsed = JSON.parse(content);
    expect(parsed.version).toBe(1);
    expect(parsed.entries).toBeTypeOf("object");
  });
});

describe("type exports", () => {
  it("exports the SeenStatus union as a value space", () => {
    const statuses: SeenStatus[] = ["seen", "accepted", "rejected"];
    expect(statuses).toHaveLength(3);
  });

  it("exports the SeenSource union as a value space", () => {
    const sources: SeenSource[] = ["hn", "reddit", "awesome", "submit"];
    expect(sources).toHaveLength(4);
  });
});
