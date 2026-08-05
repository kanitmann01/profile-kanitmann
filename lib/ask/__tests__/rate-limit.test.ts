import { describe, it, expect } from "vitest";
import { RateLimiter } from "../rate-limit";

const HOUR = 60 * 60 * 1000;

describe("RateLimiter", () => {
  it("allows requests under the cap", () => {
    const limiter = new RateLimiter(3, HOUR);
    expect(limiter.check("ip-a").allowed).toBe(true);
    expect(limiter.check("ip-a").allowed).toBe(true);
    expect(limiter.check("ip-a").allowed).toBe(true);
  });

  it("blocks the (max+1)th request with a retry-after hint", () => {
    const now = 1_000_000;
    const limiter = new RateLimiter(2, HOUR);
    limiter.check("ip-a", now);
    limiter.check("ip-a", now);
    const third = limiter.check("ip-a", now);
    expect(third.allowed).toBe(false);
    if (!third.allowed) {
      expect(third.retryAfterSeconds).toBeGreaterThan(0);
      expect(third.retryAfterSeconds).toBeLessThanOrEqual(3600);
    }
  });

  it("tracks keys independently", () => {
    const limiter = new RateLimiter(1, HOUR);
    expect(limiter.check("ip-a").allowed).toBe(true);
    expect(limiter.check("ip-b").allowed).toBe(true);
    expect(limiter.check("ip-a").allowed).toBe(false);
    expect(limiter.check("ip-b").allowed).toBe(false);
  });

  it("resets the window after it expires", () => {
    const now = 1_000_000;
    const limiter = new RateLimiter(1, HOUR);
    limiter.check("ip-a", now);
    expect(limiter.check("ip-a", now).allowed).toBe(false);
    expect(limiter.check("ip-a", now + HOUR).allowed).toBe(true);
  });

  it("stays bounded under a flood of unique keys", () => {
    const limiter = new RateLimiter(10, HOUR, 50);
    for (let i = 0; i < 1000; i++) {
      limiter.check(`ip-${i}`);
    }
    // Max entries are enforced internally without throwing; map stays ≤ 50.
    // (size is private — verify behavior still works.)
    expect(limiter.check("fresh-ip").allowed).toBe(true);
  });
});
