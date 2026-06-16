import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockedExecFile } = vi.hoisted(() => ({
  mockedExecFile: vi.fn(),
}));

vi.mock("node:child_process", () => ({
  execFile: mockedExecFile,
  default: { execFile: mockedExecFile },
}));

import {
  openIssue,
  buildIssueBody,
  buildIssueTitle,
  FABLE5_LABELS,
  RETRY_BACKOFFS_MS,
  TOTAL_ATTEMPTS,
  FOOTER_PREFIX,
  isRetryable,
  type ExecFileCallback,
} from "../open-issue";
import type { Fable5Candidate } from "../candidate";
import type { Fable5MentionType, Fable5Tag } from "../../../data/fable5";

const REPO = "owner/repo";

const sampleCandidate: Fable5Candidate = {
  id: "hn:https://example.com/foo",
  source: "hn",
  sourceUrl: "https://example.com/foo",
  demoUrl: "https://demo.example.com/foo",
  author: "coldopn",
  oneLiner: "GitHub clone from a single screenshot in 10 minutes.",
  tags: ["webgl", "tooling"],
  type: "Demo",
};

beforeEach(() => {
  mockedExecFile.mockReset();
});

describe("buildIssueTitle", () => {
  it("prefixes [Fable 5] and includes the one-liner", () => {
    expect(buildIssueTitle(sampleCandidate)).toBe(
      "[Fable 5] GitHub clone from a single screenshot in 10 minutes."
    );
  });

  it("truncates very long one-liners with an ellipsis", () => {
    const long = "a".repeat(500);
    const result = buildIssueTitle({ ...sampleCandidate, oneLiner: long });
    expect(result).toMatch(/^\[Fable 5\] a+\.\.\.$/);
    expect(result.length).toBeLessThanOrEqual("[Fable 5] ".length + 200);
  });

  it("trims surrounding whitespace from the one-liner", () => {
    const result = buildIssueTitle({
      ...sampleCandidate,
      oneLiner: "  padded  ",
    });
    expect(result).toBe("[Fable 5] padded");
  });
});

describe("buildIssueBody", () => {
  it("includes the auto-discovered footer with the source and URL", () => {
    const body = buildIssueBody(sampleCandidate);
    expect(body).toContain(`${FOOTER_PREFIX} hn: https://example.com/foo`);
  });

  it("includes the candidate fields in submission form", () => {
    const body = buildIssueBody(sampleCandidate);
    expect(body).toContain("**Site URL:** https://demo.example.com/foo");
    expect(body).toContain("**Author:** @coldopn");
    expect(body).toContain(
      "**One-liner:** GitHub clone from a single screenshot in 10 minutes."
    );
    expect(body).toContain("**Tags:** `webgl`, `tooling`");
    expect(body).toContain("**Type:** Demo");
  });

  it("shows _unknown_ when submitter is missing", () => {
    const body = buildIssueBody(sampleCandidate);
    expect(body).toContain("**Submitter:** _unknown_");
  });

  it("includes the submitter when present", () => {
    const body = buildIssueBody({
      ...sampleCandidate,
      submitter: "kanitmann01",
    });
    expect(body).toContain("**Submitter:** @kanitmann01");
  });

  it("shows _none_ when notes are missing or empty", () => {
    expect(buildIssueBody(sampleCandidate)).toContain("### Notes\n_none_");
    expect(buildIssueBody({ ...sampleCandidate, notes: "   " })).toContain(
      "### Notes\n_none_"
    );
  });

  it("renders the notes section when present", () => {
    const body = buildIssueBody({
      ...sampleCandidate,
      notes: "spotted on hn front page",
    });
    expect(body).toContain("### Notes\nspotted on hn front page");
  });
});

describe("isRetryable", () => {
  it("returns true on HTTP 429", () => {
    expect(isRetryable("gh: rate limit exceeded (HTTP 429)")).toBe(true);
  });

  it("returns true on 5xx", () => {
    expect(isRetryable("gh: Server error (HTTP 502)")).toBe(true);
    expect(isRetryable("gh: Server error (HTTP 503)")).toBe(true);
    expect(isRetryable("gh: Server error (HTTP 500)")).toBe(true);
    expect(isRetryable("gh: Server error (HTTP 504)")).toBe(true);
  });

  it("returns false on 4xx other than 429", () => {
    expect(isRetryable("gh: bad request (HTTP 400)")).toBe(false);
    expect(isRetryable("gh: not found (HTTP 404)")).toBe(false);
    expect(isRetryable("gh: validation failed (HTTP 422)")).toBe(false);
  });

  it("returns false when no HTTP status is present", () => {
    expect(isRetryable("gh: not authenticated")).toBe(false);
  });
});

describe("openIssue", () => {
  const successUrl = "https://github.com/owner/repo/issues/42";

  function setupSuccess(stdout: string = successUrl): void {
    mockedExecFile.mockImplementation(((
      _file: string,
      _args: readonly string[] | undefined,
      _opts: { encoding: "utf8" },
      callback: ExecFileCallback
    ) => {
      callback(null, stdout, "");
      return undefined;
    }) as never);
  }

  function setupRetryThenSuccess(
    failures: number,
    stderr: string,
    stdout: string = successUrl
  ): {
    sleepCalls: number[];
    getExecFileCalls: () => number;
  } {
    const sleepCalls: number[] = [];
    const state = { count: 0 };
    mockedExecFile.mockImplementation(((
      _file: string,
      _args: readonly string[] | undefined,
      _opts: { encoding: "utf8" },
      callback: ExecFileCallback
    ) => {
      state.count++;
      if (state.count <= failures) {
        const err = new Error("gh failed") as Error & { stderr?: string };
        err.stderr = stderr;
        callback(err, "", stderr);
        return undefined;
      }
      callback(null, stdout, "");
      return undefined;
    }) as never);
    return {
      sleepCalls,
      getExecFileCalls: () => state.count,
    };
  }

  it("calls gh issue create with the right args and labels", async () => {
    setupSuccess();
    const result = await openIssue({
      repo: REPO,
      candidate: sampleCandidate,
      sleep: () => Promise.resolve(),
    });

    expect(result).toEqual({ url: successUrl, number: 42 });
    expect(mockedExecFile).toHaveBeenCalledTimes(1);
    const callArgs = mockedExecFile.mock.calls[0] as unknown as [
      string,
      string[],
      { encoding: string },
    ];
    const [file, args, options] = callArgs;
    expect(file).toBe("gh");
    expect(args).toContain("issue");
    expect(args).toContain("create");
    expect(args).toContain("--repo");
    expect(args).toContain(REPO);
    expect(args).toContain("--title");
    expect(args).toContain(
      "[Fable 5] GitHub clone from a single screenshot in 10 minutes."
    );
    expect(args).toContain("--body");
    const bodyIndex = args.indexOf("--body");
    const body = args[bodyIndex + 1];
    expect(body).toContain(
      "> Auto-discovered from hn: https://example.com/foo"
    );
    expect(args).toContain("--label");
    expect(args).toContain("fable5-submission");
    expect(args).toContain("needs-triage");
    expect(options.encoding).toBe("utf8");
  });

  it("uses child_process.execFile (not exec) for safety", async () => {
    setupSuccess();
    const cpModule = await import("node:child_process");
    expect(cpModule.execFile).toBe(mockedExecFile);
    await openIssue({
      repo: REPO,
      candidate: sampleCandidate,
      sleep: () => Promise.resolve(),
    });
    expect(mockedExecFile).toHaveBeenCalled();
  });

  it("retries on HTTP 429 with the documented backoffs and eventually succeeds", async () => {
    const { sleepCalls, getExecFileCalls } = setupRetryThenSuccess(
      2,
      "gh: API rate limit exceeded (HTTP 429)"
    );
    const result = await openIssue({
      repo: REPO,
      candidate: sampleCandidate,
      sleep: (ms) => {
        sleepCalls.push(ms);
        return Promise.resolve();
      },
    });

    expect(result.url).toBe(successUrl);
    expect(getExecFileCalls()).toBe(3);
    expect(sleepCalls).toEqual([1000, 4000]);
  });

  it("retries on HTTP 503 with the documented backoffs and eventually succeeds", async () => {
    const { sleepCalls, getExecFileCalls } = setupRetryThenSuccess(
      1,
      "gh: Server error (HTTP 503)"
    );
    const result = await openIssue({
      repo: REPO,
      candidate: sampleCandidate,
      sleep: (ms) => {
        sleepCalls.push(ms);
        return Promise.resolve();
      },
    });

    expect(result.url).toBe(successUrl);
    expect(getExecFileCalls()).toBe(2);
    expect(sleepCalls).toEqual([1000]);
  });

  it("exhausts all three retries (four attempts total) before giving up", async () => {
    const { sleepCalls, getExecFileCalls } = setupRetryThenSuccess(
      99,
      "gh: API rate limit exceeded (HTTP 429)"
    );
    await expect(
      openIssue({
        repo: REPO,
        candidate: sampleCandidate,
        sleep: (ms) => {
          sleepCalls.push(ms);
          return Promise.resolve();
        },
      })
    ).rejects.toThrow();
    expect(getExecFileCalls()).toBe(TOTAL_ATTEMPTS);
    expect(sleepCalls).toEqual([...RETRY_BACKOFFS_MS]);
  });

  it("does not retry on a non-retryable 4xx error", async () => {
    const { sleepCalls, getExecFileCalls } = setupRetryThenSuccess(
      1,
      "gh: validation failed (HTTP 422)"
    );
    await expect(
      openIssue({
        repo: REPO,
        candidate: sampleCandidate,
        sleep: () => Promise.resolve(),
      })
    ).rejects.toThrow();
    expect(getExecFileCalls()).toBe(1);
    expect(sleepCalls).toEqual([]);
  });

  it("passes the labels fable5-submission and needs-triage to gh", async () => {
    setupSuccess();
    await openIssue({
      repo: REPO,
      candidate: sampleCandidate,
      sleep: () => Promise.resolve(),
    });
    const args = mockedExecFile.mock.calls[0][1] as string[];
    const labelPositions: number[] = [];
    for (let i = 0; i < args.length; i++) {
      if (args[i] === "--label") labelPositions.push(i);
    }
    expect(labelPositions).toHaveLength(FABLE5_LABELS.length);
    const labelValues = labelPositions.map((p) => args[p + 1]);
    expect(labelValues).toEqual(["fable5-submission", "needs-triage"]);
  });

  it("returns 0 as the issue number when the URL has no /issues/N segment", async () => {
    setupSuccess("https://github.com/owner/repo/issues/abc");
    const result = await openIssue({
      repo: REPO,
      candidate: sampleCandidate,
      sleep: () => Promise.resolve(),
    });
    expect(result.number).toBe(0);
  });

  it("uses the exact backoff values [1000, 4000, 16000] between retries", async () => {
    expect(RETRY_BACKOFFS_MS).toEqual([1000, 4000, 16000]);
  });
});

describe("Fable5Candidate + openIssue integration", () => {
  it("works with a candidate that has every field populated", async () => {
    const candidate: Fable5Candidate = {
      id: "reddit:https://reddit.com/r/x/comments/1",
      source: "reddit",
      sourceUrl: "https://reddit.com/r/x/comments/1",
      demoUrl: "https://demo.example.com/full",
      author: "alice",
      submitter: "bob",
      oneLiner: "Full featured submission.",
      tags: ["3d", "shader"] as Fable5Tag[],
      type: "Evaluation" as Fable5MentionType,
      notes: "extra context",
    };

    mockedExecFile.mockImplementation(((
      _file: string,
      args: readonly string[] | undefined,
      _opts: { encoding: "utf8" },
      callback: ExecFileCallback
    ) => {
      const body = (args as string[])[(args as string[]).indexOf("--body") + 1];
      expect(body).toContain("**Submitter:** @bob");
      expect(body).toContain("### Notes\nextra context");
      expect(body).toContain(
        "> Auto-discovered from reddit: https://reddit.com/r/x/comments/1"
      );
      callback(null, "https://github.com/owner/repo/issues/7", "");
      return undefined;
    }) as never);

    const result = await openIssue({
      repo: REPO,
      candidate,
      sleep: () => Promise.resolve(),
    });
    expect(result).toEqual({
      url: "https://github.com/owner/repo/issues/7",
      number: 7,
    });
  });
});
