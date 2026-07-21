import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getSiteUrl } from "@/lib/site";

describe("getSiteUrl", () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    // Restore — never leak env mutations across tests.
    if (original === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = original;
    }
  });

  it("returns NEXT_PUBLIC_SITE_URL when set", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://preview.example.com";
    expect(getSiteUrl()).toBe("https://preview.example.com");
  });

  it("falls back to https://www.kanit.codes when env var is unset", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getSiteUrl()).toBe("https://www.kanit.codes");
  });

  it("returns the env var verbatim without normalizing a trailing slash", () => {
    // Callers compose with new URL(path, origin); the helper must not mutate.
    process.env.NEXT_PUBLIC_SITE_URL = "https://branch-xyz.vercel.app";
    const composed = new URL("/articles/foo", getSiteUrl()).toString();
    expect(composed).toBe("https://branch-xyz.vercel.app/articles/foo");
  });

  it("uses the www form in the fallback, not bare kanit.codes", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    // Locked in by app/__tests__/sitemap.test.ts — canonical form is www.
    expect(getSiteUrl()).not.toBe("https://kanit.codes");
    expect(getSiteUrl()).toMatch(/^https:\/\/www\./);
  });
});
