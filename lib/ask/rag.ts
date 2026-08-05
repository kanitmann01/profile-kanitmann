/**
 * Wave E.1 retrieval layer: brute-force cosine search over the build-time
 * embeddings baked into the Worker bundle.
 *
 * The embeddings.json snapshot is generated at build time by
 * scripts/generate-embeddings.ts and statically imported here, so it ships
 * inside the Worker bundle ("loaded into Worker global") — no client-side
 * model weights, no per-request corpus embedding, no KV/Vectorize to
 * provision on the hot path.
 */

import embeddingsFile from "@/public/data/embeddings.json";
import type { AskChunk, AskEmbeddedChunk, AskEmbeddingsFile } from "./types";

export const embeddingsData = embeddingsFile as unknown as AskEmbeddingsFile;

export function getCorpusSize(): number {
  return Array.isArray(embeddingsData.chunks)
    ? embeddingsData.chunks.length
    : 0;
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
  chunks: AskEmbeddedChunk[] = embeddingsData.chunks
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
