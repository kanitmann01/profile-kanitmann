import { describe, it, expect } from "vitest";
import {
  buildContextPrompt,
  cosineSimilarity,
  loadCorpus,
  topKChunks,
} from "../rag";
import type { AskEmbeddedChunk } from "../types";

/**
 * Wave E.1 retrieval layer.
 *
 * The build-time snapshot (embeddings.json) is no longer imported into the
 * Worker bundle — it's served as a static asset and loaded lazily via the
 * ASSETS binding. The corpus shape itself is validated at build time by
 * scripts/__tests__/generate-embeddings.test.ts. These tests cover the
 * runtime retrieval primitives: lazy loading, cosine, topK, prompt building.
 */

describe("loadCorpus", () => {
  it("returns an empty array when no assets binding is provided", async () => {
    const corpus = await loadCorpus(undefined);
    expect(corpus).toEqual([]);
  });

  it("returns an empty array when the asset fetch fails", async () => {
    const failing = {
      fetch: async () => new Response("not found", { status: 404 }),
    };
    const corpus = await loadCorpus(failing);
    expect(corpus).toEqual([]);
  });

  it("loads + caches chunks from the asset binding", async () => {
    const chunks: AskEmbeddedChunk[] = [
      {
        slug: "a",
        title: "A",
        type: "project",
        url: "https://example.com/a",
        text: "alpha",
        embedding: [1, 0],
      },
    ];
    let calls = 0;
    const assets = {
      fetch: async () => {
        calls++;
        return new Response(
          JSON.stringify({
            model: "@cf/baai/bge-base-en-v1.5",
            dim: 2,
            chunks,
          }),
          { status: 200 }
        );
      },
    };
    const first = await loadCorpus(assets);
    const second = await loadCorpus(assets);
    expect(first).toEqual(chunks);
    expect(second).toEqual(chunks);
    // Cached on the isolate — only one fetch for two calls.
    expect(calls).toBe(1);
  });
});

describe("cosineSimilarity", () => {
  it("returns 1 for identical vectors and 0 for orthogonal ones", () => {
    expect(cosineSimilarity([1, 0], [1, 0])).toBeCloseTo(1);
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0);
  });

  it("handles zero/empty vectors safely", () => {
    expect(cosineSimilarity([], [])).toBe(0);
    expect(cosineSimilarity([0, 0], [1, 1])).toBe(0);
  });

  it("is scale-invariant", () => {
    expect(cosineSimilarity([1, 2, 3], [2, 4, 6])).toBeCloseTo(1);
  });
});

describe("topKChunks", () => {
  const chunks: AskEmbeddedChunk[] = [
    {
      slug: "a",
      title: "A",
      type: "project",
      url: "https://example.com/a",
      text: "alpha",
      embedding: [1, 0, 0],
    },
    {
      slug: "b",
      title: "B",
      type: "article",
      url: "https://example.com/b",
      text: "beta",
      embedding: [0, 1, 0],
    },
    {
      slug: "c",
      title: "C",
      type: "experience",
      url: "https://example.com/c",
      text: "gamma",
      embedding: [0.9, 0.1, 0],
    },
  ];

  it("returns the k most similar chunks, ranked desc", () => {
    const result = topKChunks([1, 0, 0], 2, chunks);
    expect(result.map((r) => r.chunk.slug)).toEqual(["a", "c"]);
    expect(result[0].score).toBeGreaterThan(result[1].score);
  });

  it("defaults to k=5 and caps at the corpus size", () => {
    const result = topKChunks([0, 1, 0], 5, chunks);
    expect(result).toHaveLength(3);
  });
});

describe("buildContextPrompt", () => {
  it("numbers sources and includes URLs so the model can cite markdown links", () => {
    const prompt = buildContextPrompt("What did Kanit build at Ericsson?", [
      {
        slug: "ericsson",
        title: "Ericsson",
        type: "experience",
        url: "https://kanitmann.com/about",
        text: "Migrated 2,000+ servers to GCP.",
      },
    ]);
    expect(prompt).toContain(
      "[1] Ericsson (experience) — https://kanitmann.com/about"
    );
    expect(prompt).toContain("Migrated 2,000+ servers to GCP.");
    expect(prompt).toContain("Question: What did Kanit build at Ericsson?");
  });
});
