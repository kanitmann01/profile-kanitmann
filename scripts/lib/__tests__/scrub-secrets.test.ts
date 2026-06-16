// @vitest-environment node

import { describe, it, expect } from "vitest";
import { scrubSecrets } from "../scrub-secrets";

describe("scrubSecrets", () => {
  it("redacts GitHub personal access token (ghp_)", () => {
    const input = "my token is ghp_abcdefghijklmnopqrstuvwxyz0123456789abcd";
    expect(scrubSecrets(input)).toContain("[REDACTED]");
    expect(scrubSecrets(input)).not.toContain("ghp_");
  });

  it("redacts GitHub PAT (github_pat_)", () => {
    const input = "token=github_pat_abcdefgh_1234567890ABCDEF1234567890";
    expect(scrubSecrets(input)).toContain("[REDACTED]");
    expect(scrubSecrets(input)).not.toContain("github_pat_");
  });

  it("redacts Bearer tokens", () => {
    const input = "Authorization: Bearer abcdefghijklmnopqrstuvwxyz1234567890";
    expect(scrubSecrets(input)).toContain("[REDACTED]");
    expect(scrubSecrets(input)).not.toContain("Bearer abcdef");
  });

  it("redacts AWS access keys", () => {
    const input = "AWS_KEY=AKIAIOSFODNN7EXAMPLE";
    expect(scrubSecrets(input)).toContain("[REDACTED]");
    expect(scrubSecrets(input)).not.toContain("AKIAIOSFODNN7EXAMPLE");
  });

  it("redacts OpenAI API keys", () => {
    const input = "OPENAI_API_KEY=sk-abcdefghijklmnopqrstuvwxyz123456";
    expect(scrubSecrets(input)).toContain("[REDACTED]");
    expect(scrubSecrets(input)).not.toContain("sk-abcdefg");
  });

  it("preserves known-safe patterns (GITHUB_REPOSITORY)", () => {
    const input = "repo: GITHUB_REPOSITORY=owner/repo";
    const result = scrubSecrets(input);
    expect(result).toContain("GITHUB_REPOSITORY");
  });

  it("preserves URLs", () => {
    const input = "https://github.com/kanitmann01/profile-kanitmann";
    expect(scrubSecrets(input)).toBe(input);
  });

  it("handles empty strings", () => {
    expect(scrubSecrets("")).toBe("");
  });
});
