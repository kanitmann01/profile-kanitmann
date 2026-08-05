import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import {
  EMBEDDING_MODEL,
  GENERATION_MODEL,
  GENERATION_MODEL_FALLBACK,
  SYSTEM_PROMPT,
  type AskChunk,
  type AskEnv,
  type AskSseEvent,
} from "@/lib/ask/types";
import { buildContextPrompt, loadCorpus, topKChunks } from "@/lib/ask/rag";
import { askRateLimiter } from "@/lib/ask/rate-limit";
import { verifyTurnstile } from "@/lib/ask/turnstile";

/**
 * Wave E.1 — POST /api/ask: the grounded portfolio agent ("Ask Kanit").
 *
 * Pipeline: Turnstile-validate (X-Turnstile-Token header) → per-IP rate limit
 * (10/hr, in-memory LRU) → embed the query via the Workers AI binding →
 * brute-force cosine search over the build-time embeddings (bundled into the
 * Worker) → top-5 chunks → grounded generation (llama-4-scout, falling back
 * to a tiny qwen model if the free tier rejects Scout) → SSE stream with a
 * citations event up front.
 *
 * Graceful degradation (hand-off posture — never block the site):
 *  - No `CF_TURNSTILE_SECRET` binding  → Turnstile is skipped (dev mode).
 *  - No `AI` binding / empty embeddings → streams a static "coming soon"
 *    message instead of erroring, so the widget and page always work.
 *  - Model stream failure              → `error` SSE event, client shows it.
 */

const MAX_MESSAGE_LENGTH = 500;
const MIN_MESSAGE_LENGTH = 1;

const STUB_RESPONSE =
  "Ask Kanit is coming soon — this build has no AI runtime configured. " +
  "Wire up the Workers AI + Turnstile bindings per docs/agent-setup.md and " +
  "I'll answer from Kanit's projects, articles, and experience.";

const encoder = new TextEncoder();

function encodeSse(event: AskSseEvent): Uint8Array {
  return encoder.encode(
    `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`
  );
}

function sseResponse(stream: ReadableStream<Uint8Array>): Response {
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

function errorJson(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

function getClientIp(request: Request): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return "unknown";
}

/** Parse + validate the { message } body. Returns error response or the query. */
function parseBody(body: unknown): string | NextResponse {
  const message =
    body && typeof body === "object" && "message" in body
      ? (body as { message?: unknown }).message
      : undefined;
  if (
    typeof message !== "string" ||
    message.trim().length < MIN_MESSAGE_LENGTH
  ) {
    return errorJson(
      `Provide a non-empty "message" string (1–${MAX_MESSAGE_LENGTH} chars).`,
      400
    );
  }
  const query = message.trim();
  if (query.length > MAX_MESSAGE_LENGTH) {
    return errorJson(
      `"message" must be ${MAX_MESSAGE_LENGTH} characters or fewer.`,
      400
    );
  }
  return query;
}

/** Stream text deltas from a Workers AI generation, with model fallback. */
async function* generateStream(
  ai: NonNullable<Ai>,
  messages: { role: string; content: string }[]
): AsyncGenerator<string> {
  let model = GENERATION_MODEL;
  let result: unknown;
  try {
    result = await ai.run(model, { messages, stream: true });
  } catch (error) {
    console.warn(
      `[ask] ${GENERATION_MODEL} failed (${error instanceof Error ? error.message : error}); ` +
        `falling back to ${GENERATION_MODEL_FALLBACK}`
    );
    model = GENERATION_MODEL_FALLBACK;
    result = await ai.run(model, { messages, stream: true });
  }

  const stream = result as ReadableStream<Uint8Array>;
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const emit = (raw: string) => {
    try {
      const parsed = JSON.parse(raw) as { response?: string };
      if (typeof parsed.response === "string" && parsed.response.length > 0) {
        return parsed.response;
      }
    } catch {
      // Partial JSON across chunk boundaries — ignore.
    }
    return null;
  };

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const text = emit(line.trim());
      if (text !== null) yield text;
    }
    // Handle a trailing JSON object that arrived without a newline terminator.
    if (buffer.trim()) {
      const text = emit(buffer.trim());
      if (text !== null) {
        yield text;
        buffer = "";
      }
    }
  }
  if (buffer.trim()) {
    const text = emit(buffer.trim());
    if (text !== null) yield text;
  }
}

/**
 * Build the SSE stream for a grounded answer. Sends citations first, then the
 * model's streamed text (or the static stub when the AI runtime is absent).
 */
function buildAnswerStream(
  env: AskEnv | undefined,
  assetsBinding: { fetch: (input: string) => Promise<Response> } | undefined,
  query: string
): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const push = (event: AskSseEvent) => controller.enqueue(encodeSse(event));

      // Load the embeddings corpus lazily from the static-asset binding.
      // Empty corpus (no binding, missing file, dev mode) → stub response.
      const corpus = await loadCorpus(assetsBinding);
      if (!env?.AI || corpus.length === 0) {
        push({ type: "citations", citations: [] });
        push({ type: "delta", text: STUB_RESPONSE });
        push({ type: "done" });
        controller.close();
        return;
      }

      try {
        const embedResult = await env.AI.run(EMBEDDING_MODEL, {
          text: [query],
        });
        const queryEmbedding = embedResult.data?.[0]?.embedding;
        if (!queryEmbedding) {
          push({ type: "error", message: "Could not embed the query." });
          push({ type: "done" });
          controller.close();
          return;
        }

        const retrieved = topKChunks(queryEmbedding, 5, corpus);
        const citations: AskChunk[] = retrieved.map((r) => r.chunk);
        push({ type: "citations", citations });

        const messages = [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: buildContextPrompt(query, citations),
          },
        ];

        let streamedAnything = false;
        for await (const delta of generateStream(env.AI, messages)) {
          streamedAnything = true;
          push({ type: "delta", text: delta });
        }
        if (!streamedAnything) {
          push({
            type: "delta",
            text: "(No answer generated — the model returned an empty stream.)",
          });
        }
      } catch (error) {
        console.error(
          `[ask] generation failed: ${error instanceof Error ? error.message : error}`
        );
        push({
          type: "error",
          message: "The answer stream failed. Please try again.",
        });
      } finally {
        push({ type: "done" });
        controller.close();
      }
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  // Resolve the Cloudflare context lazily; absence of bindings (tests, dev
  // without wrangler proxy) degrades to the static stub rather than throwing.
  // The ASSETS binding is the static-asset store — embeddings.json is served
  // from there (not bundled into the Worker) to stay under the 3 MiB cap.
  let env: AskEnv | undefined;
  let assetsBinding:
    | { fetch: (input: string) => Promise<Response> }
    | undefined;
  try {
    const ctx = await getCloudflareContext({ async: true });
    env = {
      AI: ctx.env.AI,
      CF_TURNSTILE_SECRET: ctx.env.CF_TURNSTILE_SECRET,
    };
    const assets = (ctx.env as { ASSETS?: unknown }).ASSETS;
    if (assets && typeof (assets as { fetch?: unknown }).fetch === "function") {
      assetsBinding = assets as { fetch: (input: string) => Promise<Response> };
    }
  } catch {
    env = undefined;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorJson("Invalid JSON body.", 400);
  }

  const parsed = parseBody(body);
  if (typeof parsed !== "string") return parsed;

  const ip = getClientIp(request);

  const turnstile = await verifyTurnstile(
    request.headers.get("x-turnstile-token"),
    env?.CF_TURNSTILE_SECRET,
    ip
  );
  if (!turnstile.ok) {
    return errorJson(turnstile.error, turnstile.status);
  }

  const limit = askRateLimiter.check(`ask:${ip}`);
  if (!limit.allowed) {
    return errorJson("Rate limit exceeded. Try again in a bit.", 429);
  }

  return sseResponse(buildAnswerStream(env, assetsBinding, parsed));
}

export function GET(): NextResponse {
  return errorJson(
    'Use POST with JSON { "message": "..." } and an X-Turnstile-Token header.',
    405
  );
}
