import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { getSiteUrl } from "@/lib/site";
import { projects, type Project } from "@/data/projects";
import { articles } from "@/data/articles";
import { experiences } from "@/data/experiences";

/**
 * llms-full.txt — full concatenated markdown profile for LLM agents.
 * Bio + every project's full case-study narrative (extracted from
 * content/projects/*.tsx when available, otherwise the data file) + article
 * summaries + experience bullets. Build-time static (force-static).
 */
export const dynamic = "force-static";

/**
 * Best-effort extraction of visible prose from a static project content file
 * (content/projects/{slug}.tsx). These files are plain JSX with h2/h3/p text
 * and no dynamic data, so stripping tags yields a clean narrative.
 */
function extractTsxNarrative(slug: string): string | null {
  const file = path.resolve("content", "projects", `${slug}.tsx`);
  if (!existsSync(file)) return null;

  const source = readFileSync(file, "utf-8");
  const start = source.indexOf("return (");
  // Files close with `)` then `}` on separate lines, so match the final `}`.
  const end = source.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;

  let inner = source.slice(start + "return (".length, end);

  // Inline JSX string expressions before stripping tags so `{">"} 10k` reads
  // as "> 10k".
  inner = inner
    .replace(/\{">"\}/g, ">")
    .replace(/\{"\s*"\}/g, " ")
    .replace(/\{' '\}/g, " ")
    // JSX tags
    .replace(/<[^>]+>/g, " ")
    // JSX fragment shorthand (<> / </>), which the tag regex misses
    .replace(/<\/?>/g, " ")
    // backtick code spans
    .replace(/`([^`]*)`/g, "$1")
    // remaining JSX expressions (rare in these files)
    .replace(/\{[^}]*\}/g, " ")
    // HTML entities
    .replace(/&rsquo;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .replace(/[\s\)]+$/, "")
    .trim();

  return inner.length > 60 ? inner : null;
}

function caseStudyMarkdown(project: Project): string {
  const parts: string[] = [];
  if (project.caseStudy) {
    const cs = project.caseStudy;
    parts.push(`**Problem:** ${cs.problem}`);
    if (cs.approach.length) {
      parts.push("**Approach:**");
      for (const step of cs.approach) parts.push(`- ${step}`);
    }
    if (cs.outcome.length) {
      parts.push("**Outcome:**");
      for (const metric of cs.outcome) {
        parts.push(`- ${metric.label}: ${metric.value} — ${metric.context}`);
      }
    }
    if (cs.evaluation) parts.push(`**Evaluation:** ${cs.evaluation}`);
    if (cs.retrospective) parts.push(`**Retrospective:** ${cs.retrospective}`);
  }
  return parts.join("\n");
}

function projectNarrativeMarkdown(project: Project): string {
  if (project.caseStudy) {
    return caseStudyMarkdown(project);
  }
  const extracted = extractTsxNarrative(project.slug);
  if (extracted) {
    return `**Case study:** ${extracted}`;
  }
  return project.description;
}

function experienceBullets(): string[] {
  const blocks: string[] = [];
  for (const exp of experiences) {
    if (exp.roles?.length) {
      for (const role of exp.roles) {
        const lines = [
          `### ${role.position} — ${exp.company} (${role.startDate} – ${role.endDate})`,
        ];
        if (role.description) lines.push(role.description);
        for (const a of role.achievements ?? []) lines.push(`- ${a}`);
        blocks.push(lines.join("\n"));
      }
    } else if (exp.position) {
      const lines = [
        `### ${exp.position} — ${exp.company} (${exp.startDate ?? ""} – ${exp.endDate ?? ""})`,
      ];
      if (exp.description) lines.push(exp.description);
      for (const a of exp.achievements ?? []) lines.push(`- ${a}`);
      blocks.push(lines.join("\n"));
    }
  }
  return blocks;
}

export async function GET() {
  const baseUrl = getSiteUrl();

  const parts: string[] = [];

  parts.push("# Kanit Mann — Full Profile");
  parts.push("");
  parts.push(
    "> Full machine-readable profile for agents: bio, complete project narratives, article summaries, and experience bullets."
  );
  parts.push("");

  parts.push("## Bio");
  parts.push("");
  parts.push(
    "Data, ML & AI Engineer with 3+ years of production experience spanning cloud infrastructure, machine learning, and data pipelines — from migrating 2,000 servers at Ericsson to building real-time analytics systems. Master of Science in Data Science, University of Arizona (GPA 3.75)."
  );
  parts.push("");
  parts.push(
    "Started in firmware and full-stack web development before moving into data science, combining an engineering background with a passion for building intelligent solutions from complex algorithms and practical applications. Recently completed the MS in Data Science and is ready to put machine learning and visualization to work on products people actually use."
  );
  parts.push("");

  parts.push("## Projects");
  for (const project of projects) {
    parts.push(`### ${project.title}`);
    parts.push(`Period: ${project.period} · Status: ${project.status ?? "—"}`);
    parts.push(projectNarrativeMarkdown(project));
    parts.push(`More: ${baseUrl}${project.href}`);
    parts.push("");
  }

  parts.push("## Articles");
  for (const article of articles) {
    parts.push(`### ${article.title}`);
    parts.push(article.summary);
    parts.push(`Published: ${article.publishedAt} · Read: ${article.readTime}`);
    parts.push(`More: ${baseUrl}${article.canonicalPath}`);
    parts.push("");
  }

  parts.push("## Experience");
  parts.push(...experienceBullets());
  parts.push("");

  parts.push(
    `More: ${baseUrl}/about · Resume: ${baseUrl}/Kanit%20Mann%20-%20Resume.pdf`
  );

  const body = parts.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
