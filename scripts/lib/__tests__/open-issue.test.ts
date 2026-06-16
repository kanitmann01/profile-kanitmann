// @vitest-environment node

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { openIssue, type Fable5Candidate } from "../open-issue";

const mockExecSync = vi.fn();
vi.mock("child_process", () => ({
  execSync: (...args: unknown[]) => mockExecSync(...args),
}));

const baseCandidate: Fable5Candidate = {
  url: "https://example.com/fable5-site",
  authorHandle: "testauthor",
  oneLiner: "A test Fable 5 build",
  tags: ["3d", "shader"],
  type: "Demo",
  source: "hn",
  discoveredAt: "2026-06-16",
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("openIssue", () => {
  it("calls gh with the correct title and labels", async () => {
    mockExecSync.mockReturnValue("https://github.com/kanitmann01/profile-kanitmann/issues/200\n");

    await openIssue(baseCandidate);

    const call = mockExecSync.mock.calls[0][0] as string;
    expect(call).toContain("gh issue create");
    expect(call).toContain('"fable5-submission"');
    expect(call).toContain('"needs-triage"');
    expect(call).toContain("A test Fable 5 build");
    expect(call).toContain("kanitmann01/profile-kanitmann");
  });

  it("includes all form fields in the body", async () => {
    mockExecSync.mockReturnValue("https://github.com/kanitmann01/profile-kanitmann/issues/201\n");

    await openIssue({
      ...baseCandidate,
      demoUrl: "https://demo.example.com",
      yourHandle: "submittedby",
    });

    const call = mockExecSync.mock.calls[0][0] as string;
    expect(call).toContain("Site URL");
    expect(call).toContain("https://example.com/fable5-site");
    expect(call).toContain("Demo URL");
    expect(call).toContain("https://demo.example.com");
    expect(call).toContain("Author X handle");
    expect(call).toContain("testauthor");
    expect(call).toContain("Your X handle");
    expect(call).toContain("submittedby");
    expect(call).toContain("One-line description");
    expect(call).toContain("A test Fable 5 build");
    expect(call).toContain("3d, shader");
    expect(call).toContain("Demo");
    expect(call).toContain("author is credited");
  });

  it("includes the bot footer with source and date", async () => {
    mockExecSync.mockReturnValue("https://github.com/kanitmann01/profile-kanitmann/issues/202\n");

    await openIssue(baseCandidate);

    const call = mockExecSync.mock.calls[0][0] as string;
    expect(call).toContain("Auto-discovered from hn on 2026-06-16 by fable5-bot");
  });

  it("parses the issue number from the output URL", async () => {
    mockExecSync.mockReturnValue("https://github.com/kanitmann01/profile-kanitmann/issues/203\n");

    const result = await openIssue(baseCandidate);
    expect(result.number).toBe(203);
    expect(result.url).toBe(
      "https://github.com/kanitmann01/profile-kanitmann/issues/203"
    );
  });

  it("retries on 429 error", async () => {
    mockExecSync
      .mockImplementationOnce(() => {
        const err = new Error("Rate limited") as Error & { stderr: string };
        err.stderr = "429 - Too Many Requests";
        throw err;
      })
      .mockReturnValue("https://github.com/kanitmann01/profile-kanitmann/issues/204\n");

    const result = await openIssue(baseCandidate);
    expect(result.number).toBe(204);
    expect(mockExecSync).toHaveBeenCalledTimes(2);
  });

  it("retries on 503 error", async () => {
    mockExecSync
      .mockImplementationOnce(() => {
        const err = new Error("Service unavailable") as Error & {
          stderr: string;
        };
        err.stderr = "503 - Service Unavailable";
        throw err;
      })
      .mockReturnValue("https://github.com/kanitmann01/profile-kanitmann/issues/205\n");

    const result = await openIssue(baseCandidate);
    expect(result.number).toBe(205);
    expect(mockExecSync).toHaveBeenCalledTimes(2);
  });

  it("does not retry on 404 error", async () => {
    mockExecSync
      .mockImplementationOnce(() => {
        const err = new Error("Not found") as Error & { stderr: string };
        err.stderr = "404 - Not Found";
        throw err;
      })
      .mockReturnValue("https://github.com/kanitmann01/profile-kanitmann/issues/206\n");

    await expect(openIssue(baseCandidate)).rejects.toThrow();
    expect(mockExecSync).toHaveBeenCalledTimes(1);
  });

  it(
    "gives up after 3 retries on persistent 429",
    async () => {
      mockExecSync.mockImplementation(() => {
        const err = new Error("Rate limited") as Error & { stderr: string };
        err.stderr = "429 - Too Many Requests";
        throw err;
      });

      await expect(openIssue(baseCandidate)).rejects.toThrow();
      expect(mockExecSync).toHaveBeenCalledTimes(4); // initial + 3 retries
    },
    25_000
  );
});
