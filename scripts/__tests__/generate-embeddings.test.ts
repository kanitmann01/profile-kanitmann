import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { execSync } from "child_process";
import { existsSync, readFileSync, unlinkSync } from "fs";
import path from "path";
import {
  chunkText,
  estimateTokens,
  fnv1a,
  pseudoEmbedding,
  quantize,
  buildChunks,
  EMBEDDING_DIM,
} from "../lib/embeddings";

const OUT_FILE = path.resolve("public/data/embeddings.json");
const SCRIPT_PATH = path.resolve("scripts/generate-embeddings.ts");

describe("generate-embeddings (pure helpers)", () => {
  it("estimates tokens as ~4 chars per token", () => {
    expect(estimateTokens("abcd")).toBe(1);
    expect(estimateTokens("abcdefgh")).toBe(2);
    expect(estimateTokens("")).toBe(0);
  });

  it("keeps short text as a single chunk", () => {
    expect(chunkText("hello world")).toEqual(["hello world"]);
  });

  it("splits long text into <=200-token chunks", () => {
    const long = "The quick brown fox jumps over the lazy dog. ".repeat(80);
    const chunks = chunkText(long);
    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) {
      expect(estimateTokens(chunk)).toBeLessThanOrEqual(200);
    }
    // Chunks re-assemble to the source (minus whitespace normalization).
    expect(chunks.join(" ").replace(/ +/g, " ")).toContain("lazy dog");
  });

  it("buildChunks attaches provenance metadata per chunk", () => {
    const chunks = buildChunks([
      {
        slug: "netstar",
        title: "NetSTAR",
        type: "project",
        url: "https://kanitmann.com/projects/netstar",
        sections: [
          "Alpha text here. " + "Beta sentence with enough words. ".repeat(30),
        ],
      },
    ]);
    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) {
      expect(chunk.slug).toBe("netstar");
      expect(chunk.url).toBe("https://kanitmann.com/projects/netstar");
      expect(chunk.type).toBe("project");
    }
  });

  it("pseudoEmbedding is deterministic, 768-dim and L2-normalized", () => {
    const a = pseudoEmbedding("seed-a");
    const b = pseudoEmbedding("seed-a");
    const c = pseudoEmbedding("seed-b");
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
    expect(a).toHaveLength(EMBEDDING_DIM);
    const norm = Math.sqrt(a.reduce((sum, x) => sum + x * x, 0));
    expect(norm).toBeCloseTo(1, 3);
  });

  it("fnv1a is stable and distinct for different inputs", () => {
    expect(fnv1a("hello")).toBe(fnv1a("hello"));
    expect(fnv1a("hello")).not.toBe(fnv1a("world"));
  });

  it("quantize rounds to 4 decimals", () => {
    expect(quantize([0.123456789, -0.999999])).toEqual([0.1235, -1]);
  });
});

describe("generate-embeddings (end-to-end run)", () => {
  let original: string | null = null;

  beforeAll(() => {
    // Snapshot whatever exists so the run can be reverted afterwards — the
    // rag test statically imports this file, so it must never be left missing.
    if (existsSync(OUT_FILE)) original = readFileSync(OUT_FILE, "utf-8");
  });

  afterAll(() => {
    if (original !== null) {
      require("fs").writeFileSync(OUT_FILE, original, "utf-8");
    } else if (existsSync(OUT_FILE)) {
      unlinkSync(OUT_FILE);
    }
  });

  it("writes a non-empty embeddings.json without credentials (graceful fallback)", () => {
    execSync(`npx tsx ${SCRIPT_PATH}`, { cwd: process.cwd() });
    expect(existsSync(OUT_FILE)).toBe(true);
    const payload = JSON.parse(readFileSync(OUT_FILE, "utf-8"));
    expect(payload.version).toBe(1);
    expect(payload.model).toBe("@cf/baai/bge-base-en-v1.5");
    expect(payload.dim).toBe(EMBEDDING_DIM);
    expect(payload.chunkCount).toBeGreaterThan(0);
    expect(payload.chunks.length).toBe(payload.chunkCount);
    // All chunks meet the ≤200-token budget and carry metadata.
    for (const chunk of payload.chunks) {
      expect(Math.ceil(chunk.text.length / 4)).toBeLessThanOrEqual(200);
      expect(chunk.embedding).toHaveLength(EMBEDDING_DIM);
      expect(chunk.url).toMatch(/^https:\/\//);
    }
  }, 60_000);
});
