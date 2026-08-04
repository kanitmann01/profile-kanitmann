/**
 * NetSTAR live classification pipeline: URL text -> FastText prediction.
 * Server-side only (route handler); the client island POSTs to /api/classify.
 */

import { NETSTAR_BRANDS } from "./brands";
import { classifyTokens } from "./fasttext";
import { serializeUrlOnly } from "./preprocess";
import { NETSTAR_MODEL } from "./weights";
import type { ClassifyResponse } from "./types";

export const MAX_URL_LENGTH = 2048;

/** Run the full pipeline for one raw URL and time it. */
export function classifyUrl(
  rawUrl: string,
  now: () => number = () => performance.now()
): ClassifyResponse {
  const started = now();
  const tokenText = serializeUrlOnly(rawUrl, NETSTAR_BRANDS);
  const prediction = classifyTokens(tokenText);
  const latencyMs = now() - started;

  return {
    verdict: prediction.verdict,
    label: prediction.label,
    confidence: prediction.confidence,
    confidenceOther: prediction.confidenceOther,
    latencyMs: Math.round(latencyMs * 100) / 100,
    model: {
      name: "NetSTAR FastText (int8)",
      format: NETSTAR_MODEL.format,
      dim: NETSTAR_MODEL.dim,
      bucket: NETSTAR_MODEL.bucket,
      nwords: NETSTAR_MODEL.nwords,
      evalAccuracy: NETSTAR_MODEL.eval.accuracy,
      evalTestSize: NETSTAR_MODEL.eval.n_test,
    },
  };
}

/** Validate the route input; returns an error message or null. */
export function validateUrlInput(raw: unknown): string | null {
  if (typeof raw !== "string") return "URL must be a string.";
  const trimmed = raw.trim();
  if (!trimmed) return "URL is required.";
  if (trimmed.length > MAX_URL_LENGTH) {
    return `URL too long (max ${MAX_URL_LENGTH} characters).`;
  }
  return null;
}
