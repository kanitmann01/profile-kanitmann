// scripts/__tests__/extract-fable5-media.test.ts
// Unit tests for the Fable 5 media extraction library

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

import {
  fetchTweetMedia,
  pickMediaEntry,
  buildXEmbedUrl,
  extractTweetIdFromUrl,
} from "../lib/extract-fable5-media";

// Load fixtures
const VIDEO_FIXTURE = JSON.parse(
  readFileSync(
    resolve(__dirname, "fixtures", "tweet-result-video.json"),
    "utf-8"
  )
);

const PHOTO_FIXTURE = JSON.parse(
  readFileSync(
    resolve(__dirname, "fixtures", "tweet-result-photo.json"),
    "utf-8"
  )
);

const NO_MEDIA_FIXTURE = JSON.parse(
  readFileSync(
    resolve(__dirname, "fixtures", "tweet-result-no-media.json"),
    "utf-8"
  )
);

const TOMBSTONE_FIXTURE = JSON.parse(
  readFileSync(
    resolve(__dirname, "fixtures", "tweet-result-tombstone.json"),
    "utf-8"
  )
);

describe("fetchTweetMedia", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches tweet data from syndication endpoint", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(VIDEO_FIXTURE),
    });
    global.fetch = mockFetch as any;

    const result = await fetchTweetMedia("1234567890");
    expect(result).toEqual(VIDEO_FIXTURE);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("syndication.twimg.com"),
      expect.objectContaining({ signal: expect.any(Object) })
    );
  });

  it("returns null on HTTP error", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });
    global.fetch = mockFetch as any;

    const result = await fetchTweetMedia("1234567890");
    expect(result).toBeNull();
  });

  it("returns null on network error", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));
    global.fetch = mockFetch as any;

    const result = await fetchTweetMedia("1234567890");
    expect(result).toBeNull();
  });

  it("includes the token parameter in the URL", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(VIDEO_FIXTURE),
    });
    global.fetch = mockFetch as any;

    await fetchTweetMedia("1234567890");
    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain("&token=a");
  });
});

describe("pickMediaEntry", () => {
  it("picks video poster from video media", () => {
    const result = pickMediaEntry(VIDEO_FIXTURE);
    expect(result).not.toBeNull();
    expect(result?.kind).toBe("video");
    if (result?.kind === "video") {
      expect(result.poster).toContain("pbs.twimg.com");
    }
  });

  it("picks photo URL from photo media", () => {
    const result = pickMediaEntry(PHOTO_FIXTURE);
    expect(result).not.toBeNull();
    expect(result?.kind).toBe("photo");
    if (result?.kind === "photo") {
      expect(result.url).toContain("pbs.twimg.com");
    }
  });

  it("returns null when no media", () => {
    const result = pickMediaEntry(NO_MEDIA_FIXTURE);
    expect(result).toBeNull();
  });

  it("returns null for tombstone (deleted/limited account)", () => {
    const result = pickMediaEntry(TOMBSTONE_FIXTURE);
    expect(result).toBeNull();
  });

  it("returns null for null input", () => {
    expect(pickMediaEntry(null)).toBeNull();
  });

  it("returns null for invalid input", () => {
    expect(pickMediaEntry({})).toBeNull();
    expect(pickMediaEntry("string")).toBeNull();
    expect(pickMediaEntry(123)).toBeNull();
  });
});

describe("buildXEmbedUrl", () => {
  it("builds the correct embed URL", () => {
    expect(buildXEmbedUrl("1234567890")).toBe(
      "https://platform.twitter.com/embed/Tweet.html?id=1234567890"
    );
  });
});

describe("extractTweetIdFromUrl", () => {
  it("extracts status ID from x.com URL", () => {
    expect(extractTweetIdFromUrl("https://x.com/user/status/1234567890")).toBe(
      "1234567890"
    );
  });

  it("extracts status ID from twitter.com URL", () => {
    expect(
      extractTweetIdFromUrl("https://twitter.com/user/status/1234567890")
    ).toBe("1234567890");
  });

  it("returns null for non-X URLs", () => {
    expect(extractTweetIdFromUrl("https://example.com")).toBeNull();
    expect(extractTweetIdFromUrl("https://vercel.app/foo")).toBeNull();
  });

  it("returns null for malformed X URLs", () => {
    expect(extractTweetIdFromUrl("https://x.com/user")).toBeNull();
    expect(extractTweetIdFromUrl("https://x.com/user/status/")).toBeNull();
  });
});
