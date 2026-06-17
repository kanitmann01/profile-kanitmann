import { describe, it, expect } from "vitest";
import { parseIssueBody } from "../lib/parse-issue-body";
import { buildRow } from "../lib/fable5-row-from-issue";
import type { Fable5Site, Fable5Mention, Fable5Tag } from "../../data/fable5";

const ACCEPT_BODY = `### Site URL
https://example.com/accept-build

### Demo URL
https://demo.example.com/accept

### Author X handle
acceptauthor

### One-line description
An accepted Fable 5 build

### Tags
3d, shader

### Type
Demo

### Author credits
- [x] I confirm the author is credited and the link is public

### Anything else?
> Auto-discovered from hn on 2026-06-16 by fable5-bot`;

const X_ONLY_BODY = `### Site URL
https://x.com/user/status/456

### Author X handle
xauthor

### One-line description
Just an X post

### Tags
tooling

### Type
Tutorial

### Author credits
- [x] I confirm the author is credited and the link is public`;

describe("triage-bot wiring", () => {
  it("parseIssueBody + buildRow produces a site row for deployable demos", () => {
    const candidate = parseIssueBody(ACCEPT_BODY);
    expect(candidate.source).toBe("hn");

    const existing: { sites: Fable5Site[]; mentions: Fable5Mention[]; tags: Fable5Tag[] } = {
      sites: [],
      mentions: [],
      tags: ["3d", "shader", "tooling"],
    };

    const result = buildRow(candidate, existing.sites, existing.mentions, existing.tags);
    expect(result.kind).toBe("site");
  });

  it("parseIssueBody + buildRow produces a mention row for X-only URLs", () => {
    const candidate = parseIssueBody(X_ONLY_BODY);
    expect(candidate.demoUrl).toBe("https://x.com/user/status/456");

    const existing: { sites: Fable5Site[]; mentions: Fable5Mention[]; tags: Fable5Tag[] } = {
      sites: [],
      mentions: [],
      tags: ["tooling"],
    };

    const result = buildRow(candidate, existing.sites, existing.mentions, existing.tags);
    expect(result.kind).toBe("mention");
  });
});
