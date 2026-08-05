/**
 * Wave E.1 retrieval layer: brute-force cosine search over the build-time
 * embeddings served as a STATIC ASSET (public/data/embeddings.json), not
 * bundled into the Worker.
 *
 * Why static-asset loading (revised after the 3 MiB free-tier cap was hit):
 * the embeddings file is ~800 KB. Importing it inline shipped those bytes
 * inside the Worker script and pushed the bundle over the cap. Loading it
 * lazily via `env.ASSETS.fetch("/data/embeddings.json")` at request time
 * keeps the bytes in the free, unlimited static-asset layer and out of the
 * Worker bundle. The file is generated at build time by
 * scripts/generate-embeddings.ts and lives in public/data/.
 *
 * No client-side model weights, no per-request corpus embedding, no
 * KV/Vectorize to provision on the hot path.
 */

import type { AskChunk, AskEmbeddedChunk, AskEmbeddingsFile } from "./types";

let cachedCorpus: AskEmbeddedChunk[] | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 min — the file only changes on deploy

/**
 * Load the embeddings corpus from the static-asset binding. Cached on the
 * Worker global for CACHE_TTL_MS so repeated requests in the same isolate
 * don't re-fetch. Returns an empty array if the asset binding is missing
 * (e.g. local dev without OpenNext) — callers treat that as "no corpus,
 * stream the coming-soon stub".
 */
export async function loadCorpus(
  assetsBinding: { fetch: (input: string) => Promise<Response> } | undefined
): Promise<AskEmbeddedChunk[]> {
  if (!assetsBinding) return [];
  const now = Date.now();
  if (cachedCorpus !== null && now - cachedAt < CACHE_TTL_MS) {
    return cachedCorpus;
  }
  try {
    const response = await assetsBinding.fetch("/data/embeddings.json");
    if (!response.ok) return [];
    const file = (await response.json()) as AskEmbeddingsFile;
    cachedCorpus = Array.isArray(file.chunks) ? file.chunks : [];
    cachedAt = now;
    return cachedCorpus;
  } catch {
    return [];
  }
}

/** Synchronous corpus size hint — only nonzero after a prior loadCorpus(). */
export function getCorpusSize(): number {
  return cachedCorpus?.length ?? 0;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length === 0 || a.length !== b.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export type RetrievedChunk = {
  chunk: AskChunk;
  score: number;
};

/** Brute-force cosine search for the k most relevant chunks. */
export function topKChunks(
  queryEmbedding: number[],
  k = 5,
  chunks: AskEmbeddedChunk[] = cachedCorpus ?? []
): RetrievedChunk[] {
  return chunks
    .map((chunk) => ({
      chunk: {
        slug: chunk.slug,
        title: chunk.title,
        type: chunk.type,
        url: chunk.url,
        text: chunk.text,
      },
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

/**
 * Build the user turn: numbered context blocks with source URLs so the model
 * can cite exact pages as markdown links.
 */
export function buildContextPrompt(query: string, chunks: AskChunk[]): string {
  const context = chunks
    .map((c, i) => `[${i + 1}] ${c.title} (${c.type}) — ${c.url}\n${c.text}`)
    .join("\n\n");
  return `Context:\n${context}\n\nQuestion: ${query}`;
}
