"use client";

import { useState } from "react";
import type { ClassifyError, ClassifyResponse } from "@/lib/netstar/types";

/**
 * NetSTAR live classification demo (Exp 13 flagship).
 *
 * Client island: URL text -> POST /api/classify (edge) -> category +
 * confidence + latency. Graceful fallback when the endpoint is unreachable:
 * the failure is surfaced with a retry path — never a dead button.
 *
 * Accessibility: labelled input, aria-busy while checking, results announced
 * through a polite live region. No motion is used (nothing to gate).
 */

const EXAMPLES = [
  {
    label: "Typosquat brand login",
    url: "http://paypal-account-verify.com/login",
  },
  { label: "Raw-IP login page", url: "http://192.168.1.1/bank/login" },
  { label: "Legit brand root", url: "http://netflix.com" },
];

type Status = "idle" | "loading" | "success" | "error";

export function NetstarClassifierDemo() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ClassifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<string | null>(null);

  async function runClassification(url: string) {
    const trimmed = url.trim();
    if (!trimmed) {
      setValidation(
        "Paste a URL to classify — for example https://example.com/login"
      );
      setStatus("idle");
      return;
    }
    setValidation(null);
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      if (!response.ok) {
        let message = `The classifier endpoint returned ${response.status}.`;
        try {
          const payload = (await response.json()) as ClassifyError;
          if (payload.error) message = payload.error;
        } catch {
          // keep the status-based message
        }
        throw new Error(message);
      }
      const payload = (await response.json()) as ClassifyResponse;
      setResult(payload);
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while classifying the URL."
      );
      setStatus("error");
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runClassification(input);
  }

  const inputId = "netstar-url-input";
  const inputDescribedBy = status === "error" ? `${inputId}-error` : undefined;

  return (
    <div className="border border-border rounded-lg bg-muted/30 p-6 sm:p-8">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor={inputId}
            className="block font-mono text-xs uppercase tracking-wider text-muted-foreground"
          >
            URL to classify
          </label>
          <input
            id={inputId}
            type="text"
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="https://example.com/login"
            aria-invalid={Boolean(validation)}
            aria-describedby={inputDescribedBy}
            maxLength={2048}
            className="w-full border-b border-border bg-transparent py-2 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors font-mono text-sm"
          />
          {validation && (
            <p id={`${inputId}-error`} className="text-sm text-foreground">
              {validation}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={status === "loading"}
            aria-busy={status === "loading"}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-sans hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Checking…" : "Classify URL"}
          </button>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono uppercase tracking-wider text-muted-foreground">
              Try:
            </span>
            {EXAMPLES.map((example) => (
              <button
                key={example.url}
                type="button"
                onClick={() => {
                  setInput(example.url);
                  setValidation(null);
                }}
                className="px-2 py-1 border border-border rounded-sm text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors font-mono"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>
      </form>

      <div
        role="status"
        aria-live="polite"
        className="mt-6 min-h-[6rem]"
        aria-atomic="true"
      >
        {status === "loading" && (
          <p className="text-sm text-muted-foreground">
            Running FastText inference on the edge… (usually a few milliseconds)
          </p>
        )}

        {status === "success" && result && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={
                  result.verdict === "phishing"
                    ? "inline-flex items-center gap-2 px-3 py-1.5 border border-destructive/50 bg-destructive/10 rounded-sm font-mono text-sm uppercase tracking-wider text-foreground"
                    : "inline-flex items-center gap-2 px-3 py-1.5 border border-primary/50 bg-primary/10 rounded-sm font-mono text-sm uppercase tracking-wider text-foreground"
                }
              >
                {result.verdict === "phishing" ? "⚠ Phishing" : "✓ Legitimate"}
              </span>
              <span className="text-sm text-muted-foreground">
                {result.confidence >= 0.9
                  ? "High confidence"
                  : result.confidence >= 0.6
                    ? "Moderate confidence"
                    : "Low confidence — treat as inconclusive"}
              </span>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Confidence
                </dt>
                <dd className="text-foreground font-mono">
                  {(result.confidence * 100).toFixed(1)}%
                  <span className="text-muted-foreground">
                    {" "}
                    (other class: {(result.confidenceOther * 100).toFixed(1)}%)
                  </span>
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Latency
                </dt>
                <dd className="text-foreground font-mono">
                  {result.latencyMs.toFixed(1)} ms
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Model
                </dt>
                <dd className="text-foreground font-mono">
                  {result.model.name} · {result.model.dim}d ·{" "}
                  {result.model.nwords} vocab
                </dd>
              </div>
            </dl>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Live inference from the retrained NetSTAR FastText model — the
              score above is computed on this request, not pulled from a canned
              table. Model evaluation on the held-out set:{" "}
              {(result.model.evalAccuracy * 100).toFixed(1)}% accuracy over{" "}
              {result.model.evalTestSize.toLocaleString()} URLs.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-3">
            <p id={`${inputId}-error`} className="text-sm text-foreground">
              Could not classify: {error}
            </p>
            <p className="text-sm text-muted-foreground">
              The model endpoint is unreachable right now. Your URL stays in
              this browser — nothing was sent anywhere else.
            </p>
            <button
              type="button"
              onClick={() => void runClassification(input)}
              className="px-4 py-2 border border-border rounded-md text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Retry classification
            </button>
          </div>
        )}

        {status === "idle" && (
          <p className="text-sm text-muted-foreground">
            Paste any URL — or pick an example — and hit Classify. The result
            comes from a FastText model retrained on the NetSTAR-labeled corpus
            and served from the edge.
          </p>
        )}
      </div>
    </div>
  );
}
