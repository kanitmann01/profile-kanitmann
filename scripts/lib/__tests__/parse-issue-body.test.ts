// @vitest-environment node

import { describe, it, expect } from "vitest";
import { parseIssueBody } from "../parse-issue-body";

const BOT_BODY = `### Site URL
https://example.com/fable5-build

### Demo URL
https://demo.example.com

### Author X handle
testauthor

### One-line description
A test Fable 5 build

### Tags
3d, shader

### Type
Demo

### Author credits
- [x] I confirm the author is credited and the link is public

### Anything else?
> Auto-discovered from hn on 2026-06-16 by fable5-bot`;

const MINIMAL_BODY = `### Site URL
https://x.com/user/status/123

### Author X handle
someuser

### One-line description
A minimal submission

### Tags
tooling

### Type
Tutorial

### Author credits
- [x] I confirm the author is credited and the link is public`;

describe("parseIssueBody", () => {
  it("extracts all fields from a bot-opened issue body", () => {
    const result = parseIssueBody(BOT_BODY);
    expect(result.url).toBe("https://example.com/fable5-build");
    expect(result.demoUrl).toBe("https://demo.example.com");
    expect(result.authorHandle).toBe("testauthor");
    expect(result.oneLiner).toBe("A test Fable 5 build");
    expect(result.tags).toContain("3d");
    expect(result.tags).toContain("shader");
    expect(result.type).toBe("Demo");
    expect(result.source).toBe("hn");
    expect(result.discoveredAt).toBe("2026-06-16");
  });

  it("falls back demoUrl to Site URL when Demo URL is empty", () => {
    const result = parseIssueBody(MINIMAL_BODY);
    expect(result.demoUrl).toBe("https://x.com/user/status/123");
  });

  it("defaults source to submit for manual issues", () => {
    const result = parseIssueBody(MINIMAL_BODY);
    expect(result.source).toBe("submit");
  });

  it("defaults to Demo type when type is missing", () => {
    const body = MINIMAL_BODY.replace("Tutorial", "");
    const result = parseIssueBody(body);
    expect(result.type).toBe("Demo");
  });

  it("defaults tags to tooling when none provided", () => {
    const body = MINIMAL_BODY.replace("tooling", "");
    const result = parseIssueBody(body);
    expect(result.tags).toEqual(["tooling"]);
  });

  it("ignores the auto-discovered footer in content", () => {
    const result = parseIssueBody(BOT_BODY);
    expect(result.oneLiner).not.toContain("Auto-discovered");
  });
});
