import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import prettier from "prettier";
import { projects } from "../data/projects";
import { articles } from "../data/articles";
import { experiences } from "../data/experiences";
import { getSiteUrl } from "../lib/site";
import {
  EMBEDDING_MODEL,
  EMBEDDING_DIM,
  buildChunks,
  pseudoEmbedding,
  quantize,
  type EmbeddableChunk,
  type EmbeddedChunk,
} from "./lib/embeddings";

/**
 * Wave E.1 — build-time embedding generation for the grounded portfolio
 * agent ("Ask Kanit").
 *
 * Reads the source-of-truth data modules (data/projects.ts, data/articles.ts,
 * data/experiences.ts), chunks each record into <=200-token pieces carrying
 * provenance metadata (slug, title, type, url), embeds each chunk with the
 * Workers AI `@cf/baai/bge-base-en-v1.5` model, and writes the result to
 * `public/data/embeddings.json`.
 *
 * The runtime `/api/ask` route imports that file (it ships inside the Worker
 * bundle as a build-time artifact) and brute-force cosine-searches it — no
 * client-side model weights, no per-request embedding of the corpus.
 *
 * Graceful degradation: if `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`
 * are missing (or any embed call fails), the script falls back to
 * deterministic hash-derived placeholder vectors (same 768-dim shape, L2
 * normalized) so the file stays non-empty and the whole pipeline remains
 * exercisable offline. It logs a loud warning — regenerate with real
 * credentials to get semantic embeddings. It never crashes the build.
 *
 * Run via `npm run generate:embeddings` (wired into `prebuild`).
 */

const SITE_URL = getSiteUrl();

type ChunkSource = {
  slug: string;
  title: string;
  type: EmbeddableChunk["type"];
  url: string;
  sections: string[];
};

async function embedViaCloudflare(texts: string[]): Promise<number[][] | null> {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!token || !accountId) return null;

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${EMBEDDING_MODEL}`;
  const embeddings: number[][] = [];
  // Batch up to 20 texts per request (Workers AI request limits).
  for (let i = 0; i < texts.length; i += 20) {
    const batch = texts.slice(i, i + 20);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: batch }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(
        `Workers AI embed failed (${res.status}): ${body.slice(0, 300)}`
      );
    }
    const json = (await res.json()) as {
      result?: { data?: { embedding: number[] }[] };
      errors?: { message: string }[];
    };
    if (!json.result?.data?.length) {
      throw new Error(
        `Workers AI embed returned no data: ${
          json.errors?.[0]?.message ?? "unknown error"
        }`
      );
    }
    for (const item of json.result.data) embeddings.push(item.embedding);
  }
  return embeddings;
}

async function generateEmbeddings(): Promise<void> {
  const sources: ChunkSource[] = [];

  for (const project of projects) {
    const sections = [project.description];
    if (project.tags.length) sections.push(`Tags: ${project.tags.join(", ")}`);
    if (project.period) sections.push(`Period: ${project.period}`);
    if (project.caseStudy) {
      if (project.caseStudy.problem)
        sections.push(`Problem: ${project.caseStudy.problem}`);
      for (const step of project.caseStudy.approach)
        sections.push(`Approach: ${step}`);
      for (const metric of project.caseStudy.outcome)
        sections.push(
          `Outcome: ${metric.label} — ${metric.value}. ${metric.context}`
        );
      if (project.caseStudy.evaluation)
        sections.push(`Evaluation: ${project.caseStudy.evaluation}`);
      if (project.caseStudy.retrospective)
        sections.push(`Retrospective: ${project.caseStudy.retrospective}`);
    }
    sources.push({
      slug: project.slug,
      title: project.title,
      type: "project",
      url: `${SITE_URL}${project.href}`,
      sections,
    });
  }

  for (const article of articles) {
    const sections = [
      article.description,
      article.summary,
      article.keywords?.length
        ? `Keywords: ${article.keywords.join(", ")}`
        : "",
    ].filter(Boolean);
    if (article.tags.length) sections.push(`Tags: ${article.tags.join(", ")}`);
    sources.push({
      slug: article.slug,
      title: article.title,
      type: "article",
      url: `${SITE_URL}${article.canonicalPath}`,
      sections,
    });
  }

  for (const experience of experiences) {
    const sections: string[] = [];
    if (experience.description)
      sections.push(`Description: ${experience.description}`);
    if (experience.achievements?.length)
      for (const a of experience.achievements)
        sections.push(`Achievement: ${a}`);
    if (experience.skills.length)
      sections.push(`Skills: ${experience.skills.join(", ")}`);
    for (const role of experience.roles ?? []) {
      if (role.description)
        sections.push(`Role (${role.position}): ${role.description}`);
      if (role.achievements?.length)
        for (const a of role.achievements)
          sections.push(`Achievement (${role.position}): ${a}`);
    }
    sources.push({
      slug: experience.id,
      title: experience.company,
      type: "experience",
      url: `${SITE_URL}/about`,
      sections,
    });
  }

  const chunks = buildChunks(sources);
  const texts = chunks.map((c) => c.text);

  let embeddings: number[][] | null = null;
  let source: "cloudflare" | "local-fallback" = "local-fallback";

  if (!process.env.CLOUDFLARE_API_TOKEN || !process.env.CLOUDFLARE_ACCOUNT_ID) {
    console.warn(
      `[generate-embeddings] CLOUDFLARE_API_TOKEN/CLOUDFLARE_ACCOUNT_ID missing — ` +
        `writing deterministic placeholder embeddings (${texts.length} chunks). ` +
        `Set both env vars and re-run for real semantic vectors via ${EMBEDDING_MODEL}.`
    );
  } else {
    try {
      embeddings = await embedViaCloudflare(texts);
      source = "cloudflare";
    } catch (error) {
      console.warn(
        `[generate-embeddings] Cloudflare embed failed — falling back to ` +
          `placeholder embeddings: ${error instanceof Error ? error.message : error}`
      );
    }
  }

  const embedded: EmbeddedChunk[] = chunks.map((chunk, i) => ({
    ...chunk,
    embedding: quantize(
      embeddings?.[i] ??
        pseudoEmbedding(`${chunk.slug}\u0000${i}\u0000${chunk.text}`)
    ),
  }));

  const payload = {
    version: 1,
    model: EMBEDDING_MODEL,
    dim: EMBEDDING_DIM,
    source,
    generatedAt: new Date().toISOString(),
    chunkCount: embedded.length,
    chunks: embedded,
  };

  const dataDir = path.resolve("public/data");
  mkdirSync(dataDir, { recursive: true });
  const outFile = path.join(dataDir, "embeddings.json");
  const json = JSON.stringify(payload, null, 2) + "\n";
  const formatted = await prettier.format(json, { parser: "json" });
  writeFileSync(outFile, formatted, "utf-8");
  console.log(
    `[generate-embeddings] Wrote ${embedded.length} chunks → ${outFile} (${source})`
  );
}

generateEmbeddings().catch((err) => {
  console.error(err);
  process.exit(1);
});
