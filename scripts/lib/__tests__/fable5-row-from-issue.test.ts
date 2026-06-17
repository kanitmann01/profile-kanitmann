// @vitest-environment node

import { describe, it, expect } from "vitest";
import { buildRow } from "../fable5-row-from-issue";
import type { Fable5Candidate } from "../open-issue";
import type { Fable5Site, Fable5Mention, Fable5Tag } from "../../../data/fable5";

const SITE_CANDIDATE: Fable5Candidate = {
  url: "https://example.com/build",
  demoUrl: "https://demo.example.com",
  authorHandle: "author1",
  oneLiner: "An amazing Fable 5 build",
  tags: ["3d", "shader"],
  type: "Demo",
  source: "hn",
  discoveredAt: "2026-06-16",
};

const MENTION_CANDIDATE: Fable5Candidate = {
  url: "https://x.com/user/status/123",
  authorHandle: "author2",
  oneLiner: "A Fable 5 X post mention",
  tags: ["tooling"],
  type: "Tutorial",
  source: "submit",
  discoveredAt: "2026-06-15",
};

const EXISTING_SITES: Fable5Site[] = [];
const EXISTING_MENTIONS: Fable5Mention[] = [];
const EXISTING_TAGS: Fable5Tag[] = ["3d", "shader", "tooling"];

describe("buildRow", () => {
  it("produces a site row for deployable demos", () => {
    const result = buildRow(SITE_CANDIDATE, EXISTING_SITES, EXISTING_MENTIONS, EXISTING_TAGS);
    expect(result.kind).toBe("site");
    const row = result.row as Fable5Site;
    expect(row.demoUrl).toBe("https://demo.example.com");
    expect(row.author).toBe("@author1");
    expect(row.tags).toEqual(["3d", "shader"]);
    expect(row.featured).toBe(false);
    expect(row.playable).toBe(true);
  });

  it("produces a mention row for X/Twitter URLs", () => {
    const result = buildRow(MENTION_CANDIDATE, EXISTING_SITES, EXISTING_MENTIONS, EXISTING_TAGS);
    expect(result.kind).toBe("mention");
    const row = result.row as Fable5Mention;
    expect(row.title).toBe("A Fable 5 X post mention");
    expect(row.author).toBe("@author2");
    expect(row.type).toBe("Tutorial");
  });

  it("generates unique kebab-case ids", () => {
    const result = buildRow(SITE_CANDIDATE, EXISTING_SITES, EXISTING_MENTIONS, EXISTING_TAGS);
    expect((result.row as Fable5Site).id).toMatch(/^[a-z0-9-]+$/);
  });

  it("dedupes ids", () => {
    const site = EXISTING_SITES as Fable5Site[];
    site.push({
      id: "an-amazing-fable-5-build",
      name: "Existing",
      demoUrl: "https://example.com",
      screenshotUrl: "",
      oneLiner: "Existing",
      author: "@existing",
      sourceUrl: "https://example.com",
      tags: ["tooling"],
      featured: false,
      addedAt: "2026-06-01",
      playable: false,
    });
    const result = buildRow(SITE_CANDIDATE, site, EXISTING_MENTIONS, EXISTING_TAGS);
    expect((result.row as Fable5Site).id).toBe("an-amazing-fable-5-build-2");
  });

  it("includes screenshotUrl placeholder", () => {
    const result = buildRow(SITE_CANDIDATE, EXISTING_SITES, EXISTING_MENTIONS, EXISTING_TAGS);
    expect((result.row as Fable5Site).screenshotUrl).toContain("data:image/svg+xml");
  });
});
