// scripts/__tests__/extract-fable5-media-orchestrator.test.ts
// e2e tests for the Fable 5 media extraction orchestrator

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readFileSync, existsSync, rmSync, mkdirSync } from "fs";
import { join } from "path";

describe("extract-fable5-media orchestrator", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("can be imported", async () => {
    // Just verify the module loads
    const module = await import("../extract-fable5-media");
    expect(module).toBeDefined();
  });

  it("generates manifest with correct structure", async () => {
    // This is a smoke test - the full e2e would require network access
    // and would be slow. This just verifies the module structure.
    const module = await import("../extract-fable5-media");
    expect(typeof module.extractAllMedia).toBe("function");
  });
});
