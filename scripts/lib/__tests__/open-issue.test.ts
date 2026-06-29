// @vitest-environment node

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { openIssue, type Fable5Candidate } from "../open-issue";

const mockSpawnSync = vi.fn();
vi.mock("child_process", () => ({
  spawnSync: (...args: unknown[]) => mockSpawnSync(...args),
}));

function okSpawn(stdout: string) {
  return {
    stdout,
    stderr: "",
    status: 0,
    error: undefined,
    pid: 0,
    output: [],
  };
}

function errSpawn(stderr: string, status = 1) {
  return { stdout: "", stderr, status, error: undefined, pid: 0, output: [] };
}

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
  function getArgs(callIndex = 0): string[] {
    return mockSpawnSync.mock.calls[callIndex][1] as string[];
  }

  it("calls gh with the correct title and labels", async () => {
    mockSpawnSync.mockReturnValue(
      okSpawn("https://github.com/kanitmann01/profile-kanitmann/issues/200\n")
    );

    await openIssue(baseCandidate);

    const args = getArgs();
    expect(args[0]).toBe("issue");
    expect(args[1]).toBe("create");
    expect(args).toContain("--label");
    expect(args).toContain("fable5-submission");
    expect(args).toContain("needs-triage");
    expect(args[args.indexOf("--title") + 1]).toContain("A test Fable 5 build");
    expect(args).toContain("kanitmann01/profile-kanitmann");
  });

  it("includes all form fields in the body", async () => {
    mockSpawnSync.mockReturnValue(
      okSpawn("https://github.com/kanitmann01/profile-kanitmann/issues/201\n")
    );

    await openIssue({
      ...baseCandidate,
      demoUrl: "https://demo.example.com",
      yourHandle: "submittedby",
    });

    const body = getArgs()[getArgs().indexOf("--body") + 1] as string;
    expect(body).toContain("Site URL");
    expect(body).toContain("https://example.com/fable5-site");
    expect(body).toContain("Demo URL");
    expect(body).toContain("https://demo.example.com");
    expect(body).toContain("Author X handle");
    expect(body).toContain("testauthor");
    expect(body).toContain("Your X handle");
    expect(body).toContain("submittedby");
    expect(body).toContain("One-line description");
    expect(body).toContain("A test Fable 5 build");
    expect(body).toContain("3d, shader");
    expect(body).toContain("Demo");
    expect(body).toContain("author is credited");
  });

  it("includes the bot footer with source and date", async () => {
    mockSpawnSync.mockReturnValue(
      okSpawn("https://github.com/kanitmann01/profile-kanitmann/issues/202\n")
    );

    await openIssue(baseCandidate);

    const body = getArgs()[getArgs().indexOf("--body") + 1] as string;
    expect(body).toContain(
      "Auto-discovered from hn on 2026-06-16 by fable5-bot"
    );
  });

  it("parses the issue number from the output URL", async () => {
    mockSpawnSync.mockReturnValue(
      okSpawn("https://github.com/kanitmann01/profile-kanitmann/issues/203\n")
    );

    const result = await openIssue(baseCandidate);
    expect(result.number).toBe(203);
    expect(result.url).toBe(
      "https://github.com/kanitmann01/profile-kanitmann/issues/203"
    );
  });

  it("retries on 429 error", async () => {
    mockSpawnSync
      .mockImplementationOnce(() => errSpawn("429 - Too Many Requests"))
      .mockReturnValue(
        okSpawn("https://github.com/kanitmann01/profile-kanitmann/issues/204\n")
      );

    const result = await openIssue(baseCandidate);
    expect(result.number).toBe(204);
    expect(mockSpawnSync).toHaveBeenCalledTimes(2);
  });

  it("retries on 503 error", async () => {
    mockSpawnSync
      .mockImplementationOnce(() => errSpawn("503 - Service Unavailable"))
      .mockReturnValue(
        okSpawn("https://github.com/kanitmann01/profile-kanitmann/issues/205\n")
      );

    const result = await openIssue(baseCandidate);
    expect(result.number).toBe(205);
    expect(mockSpawnSync).toHaveBeenCalledTimes(2);
  });

  it("does not retry on 404 error", async () => {
    mockSpawnSync
      .mockImplementationOnce(() => errSpawn("404 - Not Found"))
      .mockReturnValue(
        okSpawn("https://github.com/kanitmann01/profile-kanitmann/issues/206\n")
      );

    await expect(openIssue(baseCandidate)).rejects.toThrow();
    expect(mockSpawnSync).toHaveBeenCalledTimes(1);
  });

  it("gives up after 3 retries on persistent 429", async () => {
    mockSpawnSync.mockImplementation(() => errSpawn("429 - Too Many Requests"));

    await expect(openIssue(baseCandidate)).rejects.toThrow();
    expect(mockSpawnSync).toHaveBeenCalledTimes(4); // initial + 3 retries
  }, 25_000);
});
