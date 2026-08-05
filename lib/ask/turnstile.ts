/**
 * Cloudflare Turnstile server-side validation for POST /api/ask.
 *
 * The client renders a Turnstile widget (when a site key is configured) and
 * sends the token in the `X-Turnstile-Token` header. This module verifies it
 * against the siteverify API with the `CF_TURNSTILE_SECRET` binding.
 *
 * Dev-mode fallback: when `CF_TURNSTILE_SECRET` is not configured, validation
 * is skipped so the flow stays testable locally (e.g. the smoke test sends
 * `X-Turnstile-Token: test`). This matches the "don't block the ticket"
 * posture — real enforcement turns on the moment the secret is set.
 */

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

export async function verifyTurnstile(
  token: string | null,
  secret: string | undefined,
  remoteIp?: string,
  fetchImpl: typeof fetch = fetch
): Promise<TurnstileResult> {
  if (!secret) {
    // Dev mode — binding not configured, accept and move on.
    return { ok: true };
  }
  if (!token) {
    return { ok: false, status: 401, error: "Missing Turnstile token." };
  }

  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  if (remoteIp) form.set("remoteip", remoteIp);

  try {
    const res = await fetchImpl(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });
    if (!res.ok) {
      return {
        ok: false,
        status: 502,
        error: `Turnstile siteverify failed (${res.status}).`,
      };
    }
    const body = (await res.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    if (body.success) return { ok: true };
    return {
      ok: false,
      status: 401,
      error: "Turnstile verification failed.",
    };
  } catch (error) {
    return {
      ok: false,
      status: 502,
      error: `Turnstile siteverify error: ${
        error instanceof Error ? error.message : "unknown"
      }`,
    };
  }
}
