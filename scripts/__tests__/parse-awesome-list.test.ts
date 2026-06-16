import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdtemp, readFile, rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import path from "path";

const { mockedExecFile } = vi.hoisted(() => ({
  mockedExecFile: vi.fn(),
}));

vi.mock("node:child_process", () => ({
  execFile: mockedExecFile,
  default: { execFile: mockedExecFile },
}));

import {
  parseAwesomeListMarkdown,
  buildCandidateFromCase,
  fetchWithRetry,
  syncAwesomeList,
  AWESOME_LIST_URL,
  FETCH_RETRY_BACKOFFS_MS,
  SOURCE,
  type ParsedCase,
} from "../parse-awesome-list";
import type { ExecFileCallback } from "../lib/open-issue";
import type { SeenBlob } from "../lib/seen";

const FIXTURE_PATH = path.resolve(
  "scripts/__tests__/fixtures/awesome-list-fixture.md"
);

const REPO = "owner/repo";
const SUCCESS_URL = (n: number) => `https://github.com/${REPO}/issues/${n}`;

let dir: string;
let seenPath: string;

beforeEach(async () => {
  mockedExecFile.mockReset();
  dir = await mkdtemp(path.join(tmpdir(), "fable5-awesome-"));
  seenPath = path.join(dir, ".fable5-seen.json");
});

async function loadFixture(): Promise<string> {
  const { readFile: read } = await import("fs/promises");
  return read(FIXTURE_PATH, "utf8");
}

function setupGhSuccess(issueNumber: number = 42): void {
  mockedExecFile.mockImplementation(((
    _file: string,
    _args: readonly string[] | undefined,
    _opts: { encoding: "utf8" },
    callback: ExecFileCallback
  ) => {
    callback(null, SUCCESS_URL(issueNumber), "");
    return undefined;
  }) as never);
}

function setupGhFailure(stderr: string): void {
  mockedExecFile.mockImplementation(((
    _file: string,
    _args: readonly string[] | undefined,
    _opts: { encoding: "utf8" },
    callback: ExecFileCallback
  ) => {
    const err = new Error("gh failed") as Error & { stderr?: string };
    err.stderr = stderr;
    callback(err, "", stderr);
    return undefined;
  }) as never);
}

function makeOkResponse(body: string): Response {
  return new Response(body, { status: 200, statusText: "OK" });
}

function makeErrorResponse(status: number, statusText: string): Response {
  return new Response("", { status, statusText });
}

describe("parseAwesomeListMarkdown", () => {
  it("parses 5 representative cases from the fixture", async () => {
    const md = await loadFixture();
    const cases = parseAwesomeListMarkdown(md);
    expect(cases).toHaveLength(5);
  });

  it("extracts caseNumber, title, authorHandle, and sourceUrl from the header", async () => {
    const md = await loadFixture();
    const [first] = parseAwesomeListMarkdown(md);
    expect(first).toMatchObject({
      caseNumber: 1,
      title: "Recreating GitHub from a Screenshot",
      authorHandle: "coldopn",
      sourceUrl: "https://x.com/coldopn/status/2064435234465087638",
    });
  });

  it("extracts the type and date from the trailing Type | Date line", async () => {
    const md = await loadFixture();
    const cases = parseAwesomeListMarkdown(md);
    expect(cases[0].type).toBe("Demo");
    expect(cases[0].date).toBe("2026-06-09");
    expect(cases[1].type).toBe("Tutorial");
    expect(cases[3].type).toBe("Evaluation");
    expect(cases[4].type).toBe("Integration");
    expect(cases[4].date).toBe("2026-06-10");
  });

  it("picks the t.co URL on its own line as the demoUrl when present", async () => {
    const md = await loadFixture();
    const cases = parseAwesomeListMarkdown(md);
    expect(cases[0].demoUrl).toBe("https://t.co/bjMObvlsPX");
    expect(cases[0].demoUrl).not.toBe(cases[0].sourceUrl);
  });

  it("falls back to the sourceUrl when no deployable URL appears on its own line", async () => {
    const md = await loadFixture();
    const cases = parseAwesomeListMarkdown(md);
    expect(cases[1].demoUrl).toBe(cases[1].sourceUrl);
    expect(cases[3].demoUrl).toBe(cases[3].sourceUrl);
  });

  it("captures a non-t.co deployable URL on its own line", async () => {
    const md = await loadFixture();
    const cases = parseAwesomeListMarkdown(md);
    expect(cases[2].demoUrl).toBe(
      "https://kieradev-fable-racing.example.com/demo"
    );
  });

  it("prefers a bare-URL line over a URL embedded in prose", async () => {
    const md = await loadFixture();
    const cases = parseAwesomeListMarkdown(md);
    expect(cases[4].demoUrl).toBe("https://t.co/embeddedShortLink");
    expect(cases[4].body).toContain("https://embedded.example.com/page");
  });

  it("returns an empty array when the markdown has no case headers", () => {
    const cases = parseAwesomeListMarkdown("# Awesome list\n\nNo cases yet.\n");
    expect(cases).toEqual([]);
  });
});

describe("buildCandidateFromCase", () => {
  it("builds an Fable5Candidate with source=awesome and id derived from the sourceUrl", () => {
    const parsed: ParsedCase = {
      caseNumber: 7,
      title: "Some Title",
      authorHandle: "alice",
      sourceUrl: "https://x.com/alice/status/111",
      type: "Demo",
      date: "2026-06-09",
      demoUrl: "https://t.co/abc",
      body: "",
    };
    const c = buildCandidateFromCase(parsed);
    expect(c.source).toBe(SOURCE);
    expect(c.sourceUrl).toBe("https://x.com/alice/status/111");
    expect(c.demoUrl).toBe("https://t.co/abc");
    expect(c.author).toBe("alice");
    expect(c.oneLiner).toBe("Some Title");
    expect(c.type).toBe("Demo");
    expect(c.id).toBe(`awesome:https://x.com/alice/status/111`);
  });
});

describe("fetchWithRetry", () => {
  it("returns the response body on the first success", async () => {
    const fetchFn = vi.fn().mockResolvedValue(makeOkResponse("hello"));
    const result = await fetchWithRetry("https://example.com", {
      fetchFn,
      sleep: () => Promise.resolve(),
    });
    expect(result).toBe("hello");
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it("retries on HTTP 500 with the documented backoffs and eventually succeeds", async () => {
    const fetchFn = vi
      .fn()
      .mockResolvedValueOnce(makeErrorResponse(500, "Server Error"))
      .mockResolvedValueOnce(makeErrorResponse(500, "Server Error"))
      .mockResolvedValueOnce(makeOkResponse("ok"));
    const sleepCalls: number[] = [];
    const result = await fetchWithRetry("https://example.com", {
      fetchFn,
      sleep: (ms) => {
        sleepCalls.push(ms);
        return Promise.resolve();
      },
    });
    expect(result).toBe("ok");
    expect(fetchFn).toHaveBeenCalledTimes(3);
    expect(sleepCalls).toEqual([1000, 4000]);
  });

  it("retries on network errors (fetch throws) and eventually succeeds", async () => {
    const fetchFn = vi
      .fn()
      .mockRejectedValueOnce(new Error("ECONNRESET"))
      .mockResolvedValueOnce(makeOkResponse("ok"));
    const sleepCalls: number[] = [];
    const result = await fetchWithRetry("https://example.com", {
      fetchFn,
      sleep: (ms) => {
        sleepCalls.push(ms);
        return Promise.resolve();
      },
    });
    expect(result).toBe("ok");
    expect(fetchFn).toHaveBeenCalledTimes(2);
    expect(sleepCalls).toEqual([1000]);
  });

  it("exhausts all retries and throws after the final attempt fails", async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error("ECONNRESET"));
    const sleepCalls: number[] = [];
    await expect(
      fetchWithRetry("https://example.com", {
        fetchFn,
        sleep: (ms) => {
          sleepCalls.push(ms);
          return Promise.resolve();
        },
      })
    ).rejects.toThrow("ECONNRESET");
    expect(fetchFn).toHaveBeenCalledTimes(FETCH_RETRY_BACKOFFS_MS.length + 1);
    expect(sleepCalls).toEqual([...FETCH_RETRY_BACKOFFS_MS]);
  });
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe("syncAwesomeList", () => {
  it("fetches, parses, dedupes, and opens an issue for every new candidate", async () => {
    const md = await loadFixture();
    const fetchFn = vi.fn().mockResolvedValue(makeOkResponse(md));
    setupGhSuccess(101);

    const stats = await syncAwesomeList({
      repo: REPO,
      seenPath,
      fetchFn,
      sleep: () => Promise.resolve(),
    });

    expect(fetchFn).toHaveBeenCalledWith(AWESOME_LIST_URL);
    expect(stats.fetched).toBe(5);
    expect(stats.new).toBe(5);
    expect(stats.duplicate).toBe(0);
    expect(stats.opened).toBe(5);
    expect(stats.failed).toBe(0);

    expect(mockedExecFile).toHaveBeenCalledTimes(5);

    const persisted = JSON.parse(await readFile(seenPath, "utf8")) as SeenBlob;
    expect(Object.keys(persisted.entries)).toHaveLength(5);
    for (const key of Object.keys(persisted.entries)) {
      expect(persisted.entries[key].source).toBe(SOURCE);
      expect(persisted.entries[key].status).toBe("seen");
      expect(persisted.entries[key].issueNumber).toBe(101);
    }
  });

  it("skips candidates whose sourceUrl is already in the seen blob", async () => {
    const md = await loadFixture();
    const fetchFn = vi.fn().mockResolvedValue(makeOkResponse(md));
    setupGhSuccess(7);

    const existing: SeenBlob = {
      version: 1,
      entries: {
        "https://x.com/coldopn/status/2064435234465087638": {
          firstSeen: "2026-06-09T00:00:00.000Z",
          status: "seen",
          source: SOURCE,
          issueNumber: 1,
        },
      },
    };
    await writeFile(seenPath, JSON.stringify(existing), "utf8");

    const stats = await syncAwesomeList({
      repo: REPO,
      seenPath,
      fetchFn,
      sleep: () => Promise.resolve(),
    });

    expect(stats.fetched).toBe(5);
    expect(stats.new).toBe(4);
    expect(stats.duplicate).toBe(1);
    expect(stats.opened).toBe(4);
    expect(mockedExecFile).toHaveBeenCalledTimes(4);
  });

  it("counts gh failures in stats.failed but still saves the seen blob", async () => {
    const md = await loadFixture();
    const fetchFn = vi.fn().mockResolvedValue(makeOkResponse(md));
    setupGhFailure("gh: validation failed (HTTP 422)");

    const stats = await syncAwesomeList({
      repo: REPO,
      seenPath,
      fetchFn,
      sleep: () => Promise.resolve(),
    });

    expect(stats.new).toBe(5);
    expect(stats.opened).toBe(0);
    expect(stats.failed).toBe(5);

    const persisted = JSON.parse(await readFile(seenPath, "utf8")) as SeenBlob;
    expect(Object.keys(persisted.entries)).toHaveLength(0);
  });

  it("propagates fetch failures after exhausting retries", async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error("ECONNRESET"));
    const sleepCalls: number[] = [];
    await expect(
      syncAwesomeList({
        repo: REPO,
        seenPath,
        fetchFn,
        sleep: (ms) => {
          sleepCalls.push(ms);
          return Promise.resolve();
        },
      })
    ).rejects.toThrow("ECONNRESET");
    expect(sleepCalls).toEqual([...FETCH_RETRY_BACKOFFS_MS]);
  });
});
