/**
 * In-memory sliding-window rate limiter for POST /api/ask.
 *
 * 10 requests / hour / IP. State lives in a module-level Map so it persists
 * across requests inside a single Worker isolate (single-instance tradeoff —
 * documented in docs/agent-setup.md; per-region enforcement is acceptable
 * for a portfolio site). Purely in-memory means no KV round-trip on the hot
 * path and no Durable Object to provision.
 */

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

export class RateLimiter {
  private readonly hits = new Map<string, { count: number; resetAt: number }>();

  constructor(
    private readonly maxHits: number,
    private readonly windowMs: number,
    private readonly maxEntries = 10_000
  ) {}

  check(key: string, now: number = Date.now()): RateLimitResult {
    if (this.hits.size >= this.maxEntries) {
      // Keep the map bounded: drop expired entries first, then the oldest.
      for (const [k, v] of this.hits) {
        if (now >= v.resetAt) this.hits.delete(k);
      }
      if (this.hits.size >= this.maxEntries) {
        const oldest = this.hits.keys().next().value as string | undefined;
        if (oldest !== undefined) this.hits.delete(oldest);
      }
    }

    const existing = this.hits.get(key);
    if (!existing || now >= existing.resetAt) {
      this.hits.set(key, { count: 1, resetAt: now + this.windowMs });
      return { allowed: true };
    }
    if (existing.count >= this.maxHits) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((existing.resetAt - now) / 1000)
        ),
      };
    }
    existing.count += 1;
    return { allowed: true };
  }
}

/** The shared singleton used by the route (also the Worker "global"). */
export const askRateLimiter = new RateLimiter(10, 60 * 60 * 1000);
