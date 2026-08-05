import { describe, it, expect, vi } from "vitest";
import { verifyTurnstile } from "../turnstile";

describe("verifyTurnstile", () => {
  it("skips validation when no secret is configured (dev mode)", async () => {
    const result = await verifyTurnstile(null, undefined);
    expect(result.ok).toBe(true);
  });

  it("rejects a missing token when a secret IS configured", async () => {
    const result = await verifyTurnstile(null, "secret");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(401);
  });

  it("accepts a valid token via siteverify", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    const result = await verifyTurnstile(
      "valid-token",
      "secret",
      "1.2.3.4",
      fetchMock
    );
    expect(result.ok).toBe(true);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("siteverify");
    const body = String(init.body);
    expect(body).toContain("secret=secret");
    expect(body).toContain("response=valid-token");
    expect(body).toContain("remoteip=1.2.3.4");
  });

  it("rejects a token siteverify marks as failed", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: false,
        "error-codes": ["invalid-input-response"],
      }),
    });
    const result = await verifyTurnstile(
      "bad-token",
      "secret",
      undefined,
      fetchMock
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(401);
  });

  it("degrades to 502 when the siteverify call itself fails", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
    const result = await verifyTurnstile(
      "token",
      "secret",
      undefined,
      fetchMock
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(502);
  });
});
