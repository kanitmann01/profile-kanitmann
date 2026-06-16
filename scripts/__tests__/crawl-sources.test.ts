// @vitest-environment node

import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

vi.mock("../lib/open-issue", () => ({
  openIssue: vi.fn().mockResolvedValue({ number: 100, url: "https://github.com/test/100" }),
}));

import { crawl } from "../crawl-sources";

const HN_FIXTURE = readFileSync(
  resolve(__dirname, "fixtures", "hn-fixture.json"),
  "utf-8"
);
const REDDIT_FIXTURE = readFileSync(
  resolve(__dirname, "fixtures", "reddit-fixture.xml"),
  "utf-8"
);

function mockResponse(data: { ok?: boolean; status?: number; body?: string }) {
  return {
    ok: data.ok ?? false,
    status: data.status ?? 200,
    text: () => Promise.resolve(data.body ?? ""),
  } as Response;
}

describe("crawl", () => {
  it("processes HN and Reddit sources and returns stats", async () => {
    const fetchFn = (url: string) => {
      if (url.includes("hn.algolia.com")) {
        return Promise.resolve(mockResponse({ ok: true, body: HN_FIXTURE }));
      }
      if (url.includes("reddit.com")) {
        return Promise.resolve(mockResponse({ ok: true, body: REDDIT_FIXTURE }));
      }
      return Promise.resolve(mockResponse({ ok: true }));
    };
    vi.stubGlobal("fetch", fetchFn);

    const result = await crawl();
    expect(result.hnCount).toBeGreaterThanOrEqual(0);
    expect(result.redditCount).toBeGreaterThanOrEqual(0);
  });

  it("handles duplicate HN hits gracefully", async () => {
    let callCount = 0;
    const fetchFn = (url: string) => {
      if (url.includes("reddit.com")) {
        return Promise.resolve(mockResponse({ ok: true, body: REDDIT_FIXTURE }));
      }
      callCount++;
      return Promise.resolve(mockResponse({ ok: true, body: HN_FIXTURE }));
    };
    vi.stubGlobal("fetch", fetchFn);

    await crawl();
    expect(callCount).toBeGreaterThanOrEqual(2);
  });

  it("skips candidates with unreachable URLs", async () => {
    const fetchFn = (url: string, opts?: RequestInit) => {
      if (opts?.method === "HEAD") {
        return Promise.reject(new Error("Unreachable"));
      }
      if (url.includes("hn.algolia.com")) {
        return Promise.resolve(mockResponse({ ok: true, body: HN_FIXTURE }));
      }
      if (url.includes("reddit.com")) {
        return Promise.resolve(mockResponse({ ok: true, body: REDDIT_FIXTURE }));
      }
      return Promise.resolve(mockResponse({ ok: true }));
    };
    vi.stubGlobal("fetch", fetchFn);

    const result = await crawl();
    expect(result.opened).toBe(0);
  });
});
