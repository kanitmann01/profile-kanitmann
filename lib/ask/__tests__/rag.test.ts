import { describe, it, expect } from "vitest";
import {
  buildContextPrompt,
  cosineSimilarity,
  getCorpusSize,
  topKChunks,
  embeddingsData,
} from "../rag";
import type { AskEmbeddedChunk } from "../types";

describe("embeddings.json (build-time snapshot)", () => {
  it("exists with a non-empty chunk set (Wave E.1 acceptance)", () => {
    expect(getCorpusSize()).toBeGreaterThan(0);
    expect(embeddingsData.model).toBe("@cf/baai/bge-base-en-v1.5");
    expect(embeddingsData.dim).toBe(768);
  });

  it("every chunk has provenance metadata + a full-dimension embedding", () => {
    for (const chunk of embeddingsData.chunks) {
      expect(chunk.slug).toBeTruthy();
      expect(chunk.title).toBeTruthy();
      expect(["project", "article", "experience"]).toContain(chunk.type);
      expect(chunk.url).toMatch(/^https:\/\//);
      expect(chunk.text.length).toBeGreaterThan(0);
      expect(chunk.embedding).toHaveLength(embeddingsData.dim);
    }
  });

  it("chunks are within the ≤200-token budget (characters/4 heuristic)", () => {
    for (const chunk of embeddingsData.chunks) {
      expect(Math.ceil(chunk.text.length / 4)).toBeLessThanOrEqual(200);
    }
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
