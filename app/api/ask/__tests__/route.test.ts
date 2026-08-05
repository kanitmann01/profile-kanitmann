import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST, GET } from "../route";
import {
  EMBEDDING_MODEL,
  GENERATION_MODEL,
  type AskEnv,
} from "@/lib/ask/types";

/**
 * Route tests run outside any Cloudflare context, so getCloudflareContext is
 * mocked with a mutable fake env. No CF_TURNSTILE_SECRET → Turnstile is
 * skipped (dev mode); a fake `AI` binding exercises the full streaming path.
 */

const mockEnv = vi.hoisted(() => ({
  env: { AI: undefined, CF_TURNSTILE_SECRET: undefined } as unknown as AskEnv,
}));

vi.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: async () => ({ env: mockEnv.env }),
}));

function makeFakeAi() {
  return {
    run: vi.fn(
      async (model: string, inputs: { text?: string[]; stream?: boolean }) => {
        if (model === EMBEDDING_MODEL) {
          return { data: [{ embedding: new Array<number>(768).fill(0.001) }] };
        }
        if (inputs.stream) {
          const encoder = new TextEncoder();
          return new ReadableStream<Uint8Array>({
            start(controller) {
              controller.enqueue(
                encoder.encode(
                  JSON.stringify({ response: "Kanit led the migration of " }) +
                    "\n"
                )
              );
              controller.enqueue(
                encoder.encode(
                  JSON.stringify({
                    response: "2,000+ servers to GCP at Ericsson.",
                  }) + "\n"
                )
              );
              controller.close();
            },
          });
        }
        return { response: "static answer" };
      }
    ),
  };
}

/** Fake ASSETS binding returning a 6-chunk corpus whose embeddings match the
 * fake AI's query embedding ([0.001]*768) so cosineSimilarity is 1 for every
 * chunk — top-5 picks the first 5 deterministically. */
function makeFakeAssets() {
  const chunks = Array.from({ length: 6 }, (_, i) => ({
    slug: `slug-${i}`,
    title: `Chunk ${i}`,
    type: i % 2 === 0 ? "project" : "article",
    url: `https://kanitmann.com/chunk-${i}`,
    text: `chunk text ${i}`,
    embedding: new Array<number>(768).fill(0.001),
  }));
  return {
    fetch: async (input: string) => {
      if (input !== "/data/embeddings.json") {
        return new Response("not found", { status: 404 });
      }
      return new Response(
        JSON.stringify({
          model: EMBEDDING_MODEL,
          dim: 768,
          chunks,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    },
  };
}

async function post(
  body: unknown,
  ip: string,
  token = "test"
): Promise<Response> {
  return POST(
    new Request("http://localhost/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Turnstile-Token": token,
        "CF-Connecting-IP": ip,
      },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );
}

async function readSseEvents(
  response: Response
): Promise<{ event: string; data: Record<string, unknown> }[]> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let all = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    all += decoder.decode(value, { stream: true });
  }
  return all
    .split("\n\n")
    .filter(Boolean)
    .map((block) => {
      const event = block.match(/^event: (\w+)/m)?.[1] ?? "message";
      const data = block.match(/^data: (.+)$/m)?.[1];
      return {
        event,
        data: data ? (JSON.parse(data) as Record<string, unknown>) : {},
      };
    });
}

describe("GET /api/ask", () => {
  it("rejects GET with 405 and a hint", async () => {
    const response = await GET();
    expect(response.status).toBe(405);
    const body = await response.json();
    expect(body.error).toContain("POST");
  });
});

describe("POST /api/ask — request validation", () => {
  it("returns 400 for invalid JSON", async () => {
    const response = await post("{not json", "ip-validate");
    expect(response.status).toBe(400);
  });

  it("returns 400 for a missing message", async () => {
    const response = await post({}, "ip-validate");
    expect(response.status).toBe(400);
  });

  it("returns 400 for a non-string message", async () => {
    const response = await post({ message: 42 }, "ip-validate");
    expect(response.status).toBe(400);
  });

  it("returns 400 for a message over the length cap", async () => {
    const response = await post({ message: "x".repeat(501) }, "ip-validate");
    expect(response.status).toBe(400);
  });
});

describe("POST /api/ask — Turnstile", () => {
  beforeEach(() => {
    mockEnv.env = { AI: undefined, CF_TURNSTILE_SECRET: undefined };
  });

  it("accepts requests in dev mode when no secret is configured", async () => {
    const response = await post({ message: "hi" }, "ip-ts-dev");
    expect(response.status).toBe(200);
  });

  it("returns 401 when a secret IS configured and the token is missing", async () => {
    mockEnv.env = { AI: undefined, CF_TURNSTILE_SECRET: "secret" };
    const response = await post({ message: "hi" }, "ip-ts-missing", "");
    expect(response.status).toBe(401);
  });

  it("returns 401 when siteverify rejects the token", async () => {
    mockEnv.env = { AI: undefined, CF_TURNSTILE_SECRET: "secret" };
    const siteverify = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ success: false }), { status: 200 })
      );
    try {
      const response = await post({ message: "hi" }, "ip-ts-fail", "bad-token");
      expect(response.status).toBe(401);
    } finally {
      siteverify.mockRestore();
    }
  });
});

describe("POST /api/ask — streaming behavior", () => {
  beforeEach(() => {
    mockEnv.env = { AI: undefined, CF_TURNSTILE_SECRET: undefined };
  });

  it("streams a static 'coming soon' stub when no AI binding exists", async () => {
    const response = await post(
      { message: "What did Kanit build at Ericsson?" },
      "ip-stub"
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/event-stream");

    const events = await readSseEvents(response);
    const citations = events.find((e) => e.event === "citations");
    expect(citations?.data.citations).toEqual([]);
    const delta = events.find((e) => e.event === "delta");
    expect(String(delta?.data.text)).toContain("coming soon");
    expect(events.some((e) => e.event === "done")).toBe(true);
  });

  it("streams citations then deltas then done with an AI binding", async () => {
    mockEnv.env = {
      AI: makeFakeAi() as unknown as NonNullable<AskEnv["AI"]>,
      CF_TURNSTILE_SECRET: undefined,
      ASSETS: makeFakeAssets(),
    } as unknown as AskEnv;
    const response = await post(
      { message: "What did Kanit build at Ericsson?" },
      "ip-stream"
    );
    expect(response.status).toBe(200);

    const events = await readSseEvents(response);
    const citationsEvent = events.find((e) => e.event === "citations");
    const citations = citationsEvent?.data.citations as unknown[];
    expect(citations).toHaveLength(5);

    const answer = events
      .filter((e) => e.event === "delta")
      .map((e) => String(e.data.text))
      .join("");
    expect(answer).toContain("2,000+ servers to GCP");
    expect(events[events.length - 1].event).toBe("done");
  });

  it("rate limits the 11th request from the same IP (10/hr)", async () => {
    for (let i = 0; i < 10; i++) {
      const response = await post({ message: `q ${i}` }, "ip-ratelimit");
      expect(response.status).toBe(200);
    }
    const blocked = await post({ message: "q 11" }, "ip-ratelimit");
    expect(blocked.status).toBe(429);
  });
});
