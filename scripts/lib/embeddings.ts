/**
 * Wave E.1 — pure embedding/chunking helpers shared by
 * scripts/generate-embeddings.ts and its unit tests.
 *
 * No side effects here (no I/O, no process.exit) so tests can import safely.
 */

export const EMBEDDING_MODEL = "@cf/baai/bge-base-en-v1.5";
export const EMBEDDING_DIM = 768;
export const MAX_TOKENS_PER_CHUNK = 200;

export type EmbeddableChunk = {
  slug: string;
  title: string;
  type: "project" | "article" | "experience";
  url: string;
  text: string;
};

export type EmbeddedChunk = EmbeddableChunk & { embedding: number[] };

/** Rough token estimate (~4 chars per token for English). */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Split a body of text into <=maxTokens chunks, preferring sentence and
 * clause boundaries so chunks stay semantically coherent.
 */
export function chunkText(
  text: string,
  maxTokens: number = MAX_TOKENS_PER_CHUNK
): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (estimateTokens(trimmed) <= maxTokens) return [trimmed];

  // Split on sentence/clause boundaries, keeping the delimiter attached.
  const pieces = trimmed
    .split(/(?<=[.!?])\s+|\n+|(?<=;)\s+|(?<=,)\s+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let current = "";
  for (const piece of pieces) {
    if (current && estimateTokens(current + " " + piece) > maxTokens) {
      chunks.push(current);
      current = piece;
    } else {
      current = current ? `${current} ${piece}` : piece;
    }
    // A single piece that itself exceeds the budget gets hard-split.
    if (estimateTokens(current) > maxTokens) {
      while (estimateTokens(current) > maxTokens) {
        let cut = current.length;
        while (cut > 0 && estimateTokens(current.slice(0, cut)) > maxTokens) {
          cut -= 1;
        }
        chunks.push(current.slice(0, cut).trim());
        current = current.slice(cut).trim();
      }
    }
  }
  if (current) chunks.push(current);
  return chunks.filter((c) => c.length > 0);
}

/** Fold a source record into embeddable chunk records (no embeddings yet). */
export function buildChunks(
  sources: {
    slug: string;
    title: string;
    type: EmbeddableChunk["type"];
    url: string;
    sections: string[];
  }[]
): EmbeddableChunk[] {
  const out: EmbeddableChunk[] = [];
  for (const source of sources) {
    for (const section of source.sections) {
      for (const text of chunkText(section)) {
        out.push({
          slug: source.slug,
          title: source.title,
          type: source.type,
          url: source.url,
          text,
        });
      }
    }
  }
  return out;
}

/** Rounds to 4 decimals — keeps embeddings.json (a Worker-bundled static
 * import) ~70% smaller while preserving ranking accuracy (cosine error from
 * 1e-4 quantization is far below retrieval noise). */
export function quantize(vec: number[]): number[] {
  return vec.map((x) => Number(x.toFixed(4)));
}

/** FNV-1a 32-bit hash — deterministic across platforms/processes. */
export function fnv1a(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** mulberry32 PRNG — deterministic seeded sequence. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministic placeholder embedding (768-dim, L2-normalized) seeded by the
 * chunk text. Used only when Cloudflare credentials are unavailable — real
 * semantic vectors require `npm run generate:embeddings` with
 * CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID set.
 */
export function pseudoEmbedding(
  seed: string,
  dim: number = EMBEDDING_DIM
): number[] {
  const rand = mulberry32(fnv1a(seed));
  const vec = new Array<number>(dim);
  let norm = 0;
  for (let i = 0; i < dim; i++) {
    const u = rand();
    vec[i] = u * 2 - 1;
    norm += vec[i] * vec[i];
  }
  const length = Math.sqrt(norm) || 1;
  for (let i = 0; i < dim; i++) vec[i] /= length;
  return vec;
}
