import { describe, it, expect } from "vitest";

import {
  fable5Sites,
  featuredFable5Sites,
  fable5Mentions,
  FABLE5_TAGS,
} from "../fable5";
import type { Fable5Site, Fable5Tag } from "../fable5";

describe("fable5Sites", () => {
  it("contains between 15 and 20 sites", () => {
    expect(fable5Sites.length).toBeGreaterThanOrEqual(15);
    expect(fable5Sites.length).toBeLessThanOrEqual(20);
  });

  it("has at least 3 featured sites", () => {
    const featured = fable5Sites.filter((s) => s.featured);
    expect(featured.length).toBeGreaterThanOrEqual(3);
  });

  it("has every required field non-empty on every site", () => {
    const required: (keyof Fable5Site)[] = [
      "id",
      "name",
      "demoUrl",
      "screenshotUrl",
      "oneLiner",
      "author",
      "sourceUrl",
      "addedAt",
    ];

    for (const site of fable5Sites) {
      for (const field of required) {
        const value = site[field];
        expect(typeof value).toBe("string");
        expect((value as string).length).toBeGreaterThan(0);
      }
      expect(Array.isArray(site.tags)).toBe(true);
      expect(site.tags.length).toBeGreaterThan(0);
      expect(typeof site.featured).toBe("boolean");
      expect(typeof site.playable).toBe("boolean");
    }
  });

  it("uses only tags from the FABLE5_TAGS vocabulary", () => {
    const valid: ReadonlySet<Fable5Tag> = new Set(FABLE5_TAGS);
    for (const site of fable5Sites) {
      for (const tag of site.tags) {
        expect(valid.has(tag)).toBe(true);
      }
    }
  });
});

describe("featuredFable5Sites", () => {
  it("is derived from fable5Sites.filter(s => s.featured)", () => {
    expect(featuredFable5Sites).toEqual(fable5Sites.filter((s) => s.featured));
  });
});

describe("fable5Mentions", () => {
  it("contains at least 35 mentions", () => {
    expect(fable5Mentions.length).toBeGreaterThanOrEqual(35);
  });

  it("has every required field non-empty on every mention", () => {
    const required: (keyof (typeof fable5Mentions)[number])[] = [
      "id",
      "title",
      "author",
      "type",
      "sourceUrl",
      "addedAt",
    ];

    for (const mention of fable5Mentions) {
      for (const field of required) {
        const value = mention[field];
        expect(typeof value).toBe("string");
        expect((value as string).length).toBeGreaterThan(0);
      }
    }
  });
});
