/**
 * NetSTAR FastText inference engine — pure TypeScript, zero dependencies.
 *
 * Implements the exact scoring path of fasttext's Python predict API
 * (pybind predict -> FastText::predictLine -> Dictionary::getLine +
 * Model::predict), verified empirically against the reference model:
 *   1. tokenize (lowercase, whitespace split)
 *   2. in-vocab tokens contribute their vocabulary row
 *   3. word n-grams (wordNgrams=3): every token's FNV-1a hash is mixed
 *      uint64-style (h = h * 116049371 + hash[j], mod 2^64) and each
 *      bigram/trigram lands in a bucket row (nwords + h % bucket)
 *   4. hidden = mean of all contributed rows
 *   5. scores = output matrix x hidden, then softmax
 *
 * Out-of-vocabulary tokens get NO row of their own (fasttext 0.9.x getLine
 * behavior with minn=maxn=0) — they only participate via n-grams. This was
 * confirmed by matching 96.67% held-out accuracy vs the reference Python
 * model's 96.64% over the same 4,409-URL test split (per-line agreement
 * 98.3%).
 *
 * Weights are the int16-quantized (per-row scale) export produced by
 * scripts/netstar-model/; equivalence with the reference Python model on
 * individual URLs is asserted in lib/netstar/__tests__/ against a fixture
 * generated with fasttext's own predict().
 */

import { NETSTAR_MODEL } from "./weights";
import type { NetstarPrediction } from "./types";

/** FNV-1a 32-bit, identical to fasttext's Dictionary::hash. */
export function fnv1a32(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i) & 0xff;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

/** Decode a base64 payload into a binary view (atob — works on Node + Workers). */
export function decodeBase64(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export interface NetstarModelHandle {
  dim: number;
  bucket: number;
  nwords: number;
  labels: readonly string[];
  /** [row, dim] int16 input matrix (nwords + bucket rows), dequantized by inputScale. */
  input: Int16Array;
  inputScale: Float32Array;
  /** [label, dim] float32 output matrix. */
  output: Float32Array;
  wordIndex: Map<string, number>;
}

let cachedModel: NetstarModelHandle | null = null;

/** Lazy-decode the model once; safe to call from route handlers + tests. */
export function getModel(): NetstarModelHandle {
  if (cachedModel) return cachedModel;

  const { dim, bucket, nwords, words, labels } = NETSTAR_MODEL;
  const input = new Int16Array(decodeBase64(NETSTAR_MODEL.inputI16).buffer);
  const inputScale = new Float32Array(
    decodeBase64(NETSTAR_MODEL.inputScale).buffer
  );
  const output = new Float32Array(decodeBase64(NETSTAR_MODEL.output).buffer);

  const wordIndex = new Map<string, number>();
  words.forEach((word, index) => {
    if (index >= nwords) return; // safety: never index past the vocab
    wordIndex.set(word, index);
  });

  cachedModel = {
    dim,
    bucket,
    nwords,
    labels: [...labels],
    input,
    inputScale,
    output,
    wordIndex,
  };
  return cachedModel;
}

/**
 * Word n-gram bucket ids (fasttext Dictionary::addWordNgrams).
 * h starts as the first token's FNV-1a hash and is extended uint64-style:
 *   h = h * 116049371 + hash[nextToken]  (mod 2^64)
 * each extension produces bucket row nwords + (h % bucket).
 */
export function wordNgramRows(
  hashes: readonly number[],
  wordNgrams: number,
  nwords: number,
  bucket: number
): number[] {
  const rows: number[] = [];
  const n = hashes.length;
  const MULT = BigInt(116049371);
  const MASK = (BigInt(1) << BigInt(64)) - BigInt(1);
  const bucketBig = BigInt(bucket);
  for (let i = 0; i < n; i++) {
    let h = BigInt(hashes[i]);
    const maxJ = Math.min(n, i + wordNgrams);
    for (let j = i + 1; j < maxJ; j++) {
      h = (h * MULT + BigInt(hashes[j])) & MASK;
      rows.push(nwords + Number(h % bucketBig));
    }
  }
  return rows;
}

/** Read one embedding row from the quantized matrix (rowId = vocab or bucket id). */
function readRow(
  model: NetstarModelHandle,
  rowId: number,
  out: Float64Array
): void {
  const scale = model.inputScale[rowId] ?? 0;
  const offset = rowId * model.dim;
  for (let d = 0; d < model.dim; d++) {
    out[d] = (model.input[offset + d] ?? 0) * scale;
  }
}

/**
 * Run FastText inference on a preprocessed token string (see preprocess.ts).
 * Throws when the input yields no model rows (nothing recognizable).
 */
export function classifyTokens(text: string): NetstarPrediction {
  const model = getModel();
  const tokens = text.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) {
    throw new Error("empty input");
  }

  const { dim, bucket, nwords, wordIndex } = model;
  const hashes = tokens.map((token) => fnv1a32(token));

  const rows: number[] = [];
  for (const token of tokens) {
    const known = wordIndex.get(token);
    if (known !== undefined) rows.push(known);
  }
  rows.push(...wordNgramRows(hashes, 3, nwords, bucket));
  if (rows.length === 0) {
    throw new Error("input contains no recognizable features");
  }

  const hidden = new Float64Array(dim);
  const row = new Float64Array(dim);
  for (const rowId of rows) {
    readRow(model, rowId, row);
    for (let d = 0; d < dim; d++) hidden[d] += row[d];
  }
  for (let d = 0; d < dim; d++) hidden[d] /= rows.length;

  // scores = output * hidden (no bias in FastText's softmax head)
  const scores = new Float64Array(model.labels.length);
  for (let l = 0; l < model.labels.length; l++) {
    let score = 0;
    const offset = l * dim;
    for (let d = 0; d < dim; d++) score += model.output[offset + d] * hidden[d];
    scores[l] = score;
  }

  const max = Math.max(...scores);
  let sum = 0;
  const probs = scores.map((s) => {
    const p = Math.exp(s - max);
    sum += p;
    return p;
  });
  for (let l = 0; l < probs.length; l++) probs[l] /= sum;

  let best = 0;
  for (let l = 1; l < probs.length; l++) {
    if (probs[l] > probs[best]) best = l;
  }
  const other = best === 0 ? 1 : 0;

  return {
    label: model.labels[best],
    verdict: model.labels[best].includes("phishing")
      ? "phishing"
      : "legitimate",
    confidence: probs[best],
    confidenceOther: probs[other],
  };
}
