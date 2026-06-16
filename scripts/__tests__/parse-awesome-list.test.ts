// @vitest-environment node

import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { mkdtempSync, writeFileSync, existsSync, unlinkSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

import { parseCases } from "../parse-awesome-list";

const FIXTURE_PATH = resolve(
  __dirname,
  "fixtures",
  "awesome-list-fixture.md"
);

describe("parseCases", () => {
  let fixture: string;

  beforeAll(() => {
    fixture = readFileSync(FIXTURE_PATH, "utf-8");
  });

  it("parses 5 cases from the fixture", () => {
    const { cases, errors } = parseCases(fixture);
    expect(cases.length).toBe(5);
    expect(errors.length).toBe(0);
  });

  it("extracts title from each case", () => {
    const { cases } = parseCases(fixture);
    expect(cases[0].oneLiner).toContain("plan-review");
    expect(cases[1].oneLiner).toContain("screenshot");
  });

  it("extracts authorHandle", () => {
    const { cases } = parseCases(fixture);
    expect(cases[0].authorHandle).toBe("AlicanKiraz0");
    expect(cases[1].authorHandle).toBe("coldopn");
    expect(cases[4].authorHandle).toBe("anthropic");
  });

  it("extracts type from each case", () => {
    const { cases } = parseCases(fixture);
    expect(cases[0].type).toBe("Evaluation");
    expect(cases[1].type).toBe("Demo");
    expect(cases[2].type).toBe("Tutorial");
    expect(cases[4].type).toBe("Integration");
  });

  it("extracts discoveredAt date", () => {
    const { cases } = parseCases(fixture);
    expect(cases[0].discoveredAt).toBe("2026-06-09");
  });

  it("extracts demoUrl from t.co URLs in the body", () => {
    const { cases } = parseCases(fixture);
    // Case 2 has a t.co URL in the body
    expect(cases[1].demoUrl).toMatch(/^https:\/\/t\.co\//);
  });

  it("falls back demoUrl to sourceUrl when no t.co URL exists", () => {
    const { cases } = parseCases(fixture);
    // Case 5 has no t.co URL
    expect(cases[4].demoUrl).toBe(cases[4].url);
  });

  it("sets source to awesome for all cases", () => {
    const { cases } = parseCases(fixture);
    for (const c of cases) {
      expect(c.source).toBe("awesome");
    }
  });

  it("uses tooling as default tags", () => {
    const { cases } = parseCases(fixture);
    for (const c of cases) {
      expect(c.tags).toEqual(["tooling"]);
    }
  });
});
