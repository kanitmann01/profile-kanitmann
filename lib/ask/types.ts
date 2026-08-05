/**
 * Wave E.1 "Ask Kanit" — shared types for the grounded portfolio agent.
 */

export type ChunkType = "project" | "article" | "experience";

/** One retrieved context chunk (as served to the LLM and to the client). */
export type AskChunk = {
  slug: string;
  title: string;
  type: ChunkType;
  url: string;
  text: string;
};

/** A chunk with its embedding, as produced by scripts/generate-embeddings.ts. */
export type AskEmbeddedChunk = AskChunk & { embedding: number[] };

/** Shape of public/data/embeddings.json. */
export type AskEmbeddingsFile = {
  version: number;
  model: string;
  dim: number;
  source: "cloudflare" | "local-fallback";
  generatedAt: string;
  chunkCount: number;
  chunks: AskEmbeddedChunk[];
};

/** The Cloudflare bindings this route needs (a subset of CloudflareEnv). */
export type AskEnv = {
  AI?: Ai | undefined;
  CF_TURNSTILE_SECRET?: string | undefined;
};

/** SSE event payloads streamed to the client. */
export type AskSseEvent =
  | { type: "citations"; citations: AskChunk[] }
  | { type: "delta"; text: string }
  | { type: "done" }
  | { type: "error"; message: string };

export const EMBEDDING_MODEL = "@cf/baai/bge-base-en-v1.5";
export const GENERATION_MODEL = "@cf/meta/llama-4-scout-17b-16b-instruct";
export const GENERATION_MODEL_FALLBACK = "@cf/qwen/qwen1.5-0.5b-chat";

export const SYSTEM_PROMPT =
  "You are Kanit Mann's portfolio assistant. Answer using ONLY the provided context. " +
  "Cite sources as markdown links. If context doesn't answer, say so. Under 150 words.";
