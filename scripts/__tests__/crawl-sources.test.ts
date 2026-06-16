import { readFileSync } from "fs";
import path from "path";

import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type MockInstance,
} from "vitest";

const { openIssue, isNew, markSeen, loadSeen, saveSeen, log, normalizeUrl } =
  vi.hoisted(() => ({
    openIssue: vi.fn(),
    isNew: vi.fn(),
    markSeen: vi.fn(),
    loadSeen: vi.fn(),
    saveSeen: vi.fn(),
    log: vi.fn(),
    normalizeUrl: (url: string) => url,
  }));

vi.mock("../lib/seen", () => ({
  loadSeen,
  saveSeen,
  isNew,
  markSeen,
  normalizeUrl,
}));

vi.mock("../lib/open-issue", () => ({
  openIssue,
}));

vi.mock("../lib/log", () => ({
  log,
}));

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

import { crawl, type Fable5Candidate } from "../crawl-sources";

const FIXTURES_DIR = path.resolve("scripts/__tests__/fixtures");
const hnFixturePath = path.join(FIXTURES_DIR, "hn-fixture.json");
const redditFixturePath = path.join(FIXTURES_DIR, "reddit-fixture.xml");

const hnFixture = JSON.parse(readFileSync(hnFixturePath, "utf-8"));
const redditXmlFixture = readFileSync(redditFixturePath, "utf-8");

type OpenIssueOptions = { repo: string; candidate: Fable5Candidate };
type OpenIssueCall = MockInstance<
  (opts: OpenIssueOptions) => Promise<{ number: number; url: string }>
>;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function textResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { "content-type": "application/xml" },
  });
}

describe("crawl-sources", () => {
  let openIssueMock: OpenIssueCall;
  let nextIssueNumber = 100;

  beforeEach(() => {
    vi.resetAllMocks();

    loadSeen.mockResolvedValue({ version: 1, entries: {} });
    saveSeen.mockResolvedValue(undefined);
    isNew.mockReturnValue(true);

    openIssueMock = openIssue as unknown as OpenIssueCall;
    openIssueMock.mockImplementation(async () => {
      const number = nextIssueNumber;
      nextIssueNumber += 1;
      return {
        number,
        url: `https://github.com/owner/repo/issues/${number}`,
      };
    });

    fetchMock.mockImplementation(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = typeof input === "string" ? input : input.toString();
        const method = init?.method ?? "GET";
        if (method === "HEAD") {
          return new Response(null, { status: 200 });
        }
        if (url.includes("hn.algolia.com")) {
          return jsonResponse(hnFixture);
        }
        if (url.includes("reddit.com")) {
          return textResponse(redditXmlFixture);
        }
        return new Response(null, { status: 404 });
      }
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.stubGlobal("fetch", fetchMock);
  });

  it("fetches both HN Algolia queries and each of the four Reddit RSS feeds", async () => {
    await crawl();

    const calledUrls = fetchMock.mock.calls.map((c) =>
      typeof c[0] === "string" ? c[0] : c[0].toString()
    );
    const hnCalls = calledUrls.filter((u) => u.includes("hn.algolia.com"));
    const redditCalls = calledUrls.filter(
      (u) => u.includes("reddit.com") && u.includes("search.rss")
    );

    expect(hnCalls.length).toBe(2);
    expect(hnCalls.some((u) => u.includes("claude+fable+5"))).toBe(true);
    expect(hnCalls.some((u) => /claude\+fable(?![\w%])/.test(u))).toBe(true);

    expect(redditCalls.length).toBe(4);
    for (const sub of ["ClaudeAI", "Anthropic", "SideProject", "webdev"]) {
      expect(redditCalls.some((u) => u.includes(`/r/${sub}/`))).toBe(true);
    }
  });

  it("filters HN hits to those with a non-null url and assigns source 'hn'", async () => {
    await crawl();

    const hnCalls = openIssueMock.mock.calls
      .map((c) => c[0].candidate)
      .filter((c) => c.source === "hn");
    const urls = hnCalls.map((c) => c.sourceUrl);

    expect(urls).toContain("https://github.com/example/black-hole-sim");
    expect(urls.every((u) => typeof u === "string" && u.length > 0)).toBe(true);
  });

  it("extracts Reddit external links from <content:encoded> and falls back to the post URL", async () => {
    await crawl();

    const redditCalls = openIssueMock.mock.calls
      .map((c) => c[0].candidate)
      .filter((c) => c.source === "reddit");
    const urls = redditCalls.map((c) => c.sourceUrl);

    expect(urls).toContain("https://github.com/example/black-hole-sim");
    expect(urls).toContain(
      "https://www.reddit.com/r/ClaudeAI/comments/def456/anyone_else/"
    );
    expect(urls).toContain("https://github.com/example/web-os");
  });

  it("treats reddit.com fallback URLs as non-deployable (demoUrl undefined)", async () => {
    await crawl();

    const redditFallback = openIssueMock.mock.calls
      .map((c) => c[0].candidate)
      .filter(
        (c) =>
          c.source === "reddit" &&
          c.sourceUrl ===
            "https://www.reddit.com/r/ClaudeAI/comments/def456/anyone_else/"
      );
    expect(redditFallback.length).toBeGreaterThan(0);
    for (const candidate of redditFallback) {
      expect(candidate.demoUrl).toBeUndefined();
    }
  });

  it("strips /u/ and /r/ prefixes from Reddit author handles", async () => {
    await crawl();
    const redditCalls = openIssueMock.mock.calls
      .map((c) => c[0].candidate)
      .filter((c) => c.source === "reddit");
    const handles = redditCalls.map((c) => c.author);
    expect(handles).toContain("deveshcodes_");
    expect(handles).toContain("curious_dev");
    expect(handles.every((h) => !h.startsWith("/u/"))).toBe(true);
  });

  it("marks HN X-post URLs as non-deployable and sets demoUrl undefined for them", async () => {
    fetchMock.mockImplementation(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = typeof input === "string" ? input : input.toString();
        const method = init?.method ?? "GET";
        if (method === "HEAD") {
          return new Response(null, { status: 200 });
        }
        if (url.includes("hn.algolia.com")) {
          return jsonResponse({
            hits: [
              {
                title: "X post",
                url: "https://x.com/example_user/status/9999999999",
                author: "hn-submitter",
                created_at_i: 1717000000,
              },
              {
                title: "Deployable",
                url: "https://deploy.example.com/build",
                author: "hn-submitter-2",
                created_at_i: 1717000000,
              },
            ],
            nbHits: 2,
          });
        }
        return new Response(null, { status: 404 });
      }
    );

    await crawl();

    const xCall = openIssueMock.mock.calls
      .map((c) => c[0].candidate)
      .find(
        (c) => c.sourceUrl === "https://x.com/example_user/status/9999999999"
      );
    expect(xCall).toBeDefined();
    expect(xCall?.demoUrl).toBeUndefined();

    const deployableCall = openIssueMock.mock.calls
      .map((c) => c[0].candidate)
      .find((c) => c.sourceUrl === "https://deploy.example.com/build");
    expect(deployableCall).toBeDefined();
    expect(deployableCall?.demoUrl).toBe("https://deploy.example.com/build");
  });

  it("skips candidates that are already in data/fable5.ts (case-insensitive)", async () => {
    fetchMock.mockImplementation(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = typeof input === "string" ? input : input.toString();
        const method = init?.method ?? "GET";
        if (url.includes("hn.algolia.com")) {
          return jsonResponse({
            hits: [
              {
                title: "In fable5 already",
                url: "https://X.COM/coldopn/status/2064435234465087638",
                author: "someone",
                created_at_i: 1717000000,
              },
            ],
            nbHits: 1,
          });
        }
        if (method === "HEAD") {
          return new Response(null, { status: 200 });
        }
        return new Response(null, { status: 404 });
      }
    );

    await crawl();

    expect(openIssueMock).not.toHaveBeenCalled();
    const skipLogs = log.mock.calls.filter((c) => c[1] === "skip_in_fable5");
    expect(skipLogs.length).toBe(2);
  });

  it("skips candidates whose URL is unreachable (HEAD fails)", async () => {
    fetchMock.mockImplementation(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = typeof input === "string" ? input : input.toString();
        const method = init?.method ?? "GET";
        if (url.includes("hn.algolia.com")) {
          return jsonResponse({
            hits: [
              {
                title: "Unreachable",
                url: "https://example.invalid/dead",
                author: "ghost",
                created_at_i: 1717000000,
              },
            ],
            nbHits: 1,
          });
        }
        if (method === "HEAD") {
          return new Response(null, { status: 500 });
        }
        return new Response(null, { status: 404 });
      }
    );

    await crawl();

    expect(openIssueMock).not.toHaveBeenCalled();
    const skipLogs = log.mock.calls.filter((c) => c[1] === "skip_unreachable");
    expect(skipLogs.length).toBe(2);
  });

  it("skips candidates whose URL isNew returns false (dedup against seen)", async () => {
    isNew.mockImplementation(
      (url: string) => url !== "https://github.com/example/black-hole-sim"
    );

    await crawl();

    const openedUrls = openIssueMock.mock.calls.map(
      (c) => c[0].candidate.sourceUrl
    );
    expect(openedUrls).not.toContain(
      "https://github.com/example/black-hole-sim"
    );
    expect(openedUrls).toContain(
      "https://www.reddit.com/r/ClaudeAI/comments/def456/anyone_else/"
    );
  });

  it("retries 3x with 1s/4s/16s backoff on 429 then skips the source", async () => {
    let hnAttempt = 0;
    fetchMock.mockImplementation(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = typeof input === "string" ? input : input.toString();
        const method = init?.method ?? "GET";
        if (url.includes("hn.algolia.com")) {
          hnAttempt += 1;
          return new Response(null, { status: 429 });
        }
        if (url.includes("reddit.com")) {
          return textResponse(redditXmlFixture);
        }
        if (method === "HEAD") {
          return new Response(null, { status: 200 });
        }
        return new Response(null, { status: 404 });
      }
    );

    const start = Date.now();
    await crawl();
    const elapsed = Date.now() - start;

    expect(hnAttempt).toBe(8);
    expect(elapsed).toBeGreaterThanOrEqual(1 + 4 + 16 - 1);

    const failedLogs = log.mock.calls.filter(
      (c) => c[0] === "hn" && c[1] === "fetch_failed"
    );
    expect(failedLogs.length).toBe(2);
  }, 60000);

  it("opens one issue per new candidate with the right payload shape", async () => {
    await crawl();

    expect(openIssueMock).toHaveBeenCalled();
    const calls = openIssueMock.mock.calls.map((c) => c[0].candidate);
    for (const candidate of calls) {
      expect(candidate.sourceUrl).toMatch(/^https?:\/\//);
      expect(typeof candidate.author).toBe("string");
      expect(candidate.author.length).toBeGreaterThan(0);
      expect(typeof candidate.oneLiner).toBe("string");
      expect(candidate.source === "hn" || candidate.source === "reddit").toBe(
        true
      );
    }
  });

  it("calls markSeen with the issued number and the candidate's source for each opened candidate", async () => {
    openIssueMock.mockImplementation(async () => ({
      number: 4242,
      url: "https://github.com/owner/repo/issues/4242",
    }));

    await crawl();

    expect(markSeen).toHaveBeenCalled();
    for (const call of markSeen.mock.calls) {
      const [url, status, source, , issueNumber] = call as [
        string,
        string,
        string,
        unknown,
        number,
      ];
      expect(typeof url).toBe("string");
      expect(status).toBe("seen");
      expect(["hn", "reddit"]).toContain(source);
      expect(issueNumber).toBe(4242);
    }
  });

  it("logs per-source stats via log()", async () => {
    await crawl();

    const statsLogs = log.mock.calls.filter(
      (c) => c[0] === "hn" && c[1] === "stats"
    );
    const redditStatsLogs = log.mock.calls.filter(
      (c) => c[0] === "reddit" && c[1] === "stats"
    );

    expect(statsLogs.length).toBe(1);
    expect(redditStatsLogs.length).toBe(1);
  });
});
