/**
 * NetSTAR live-demo shared types.
 *
 * The demo classifies a URL string with the FastText model retrained from
 * the NetSTAR-labeled corpus (see scripts/netstar-model/ for reproduction).
 */

/** Human-facing verdict for the demo UI. */
export type NetstarVerdict = "phishing" | "legitimate";

/** Prediction from the FastText inference engine. */
export interface NetstarPrediction {
  /** FastText label, e.g. "__label__phishing". */
  label: string;
  /** Verdict derived from the label. */
  verdict: NetstarVerdict;
  /** Softmax probability of the winning class (0..1). */
  confidence: number;
  /** Probability of the other class, kept for transparency. */
  confidenceOther: number;
}

/** Response contract of POST /api/classify. */
export interface ClassifyResponse {
  verdict: NetstarVerdict;
  label: string;
  confidence: number;
  confidenceOther: number;
  /** End-to-end inference time inside the route, in milliseconds. */
  latencyMs: number;
  /** Model metadata so the demo never hides what it runs. */
  model: {
    name: string;
    format: string;
    dim: number;
    bucket: number;
    nwords: number;
    evalAccuracy: number;
    evalTestSize: number;
  };
}

/** Error response contract of POST /api/classify. */
export interface ClassifyError {
  error: string;
}
