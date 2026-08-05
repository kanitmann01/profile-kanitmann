import { getSiteUrl } from "@/lib/site";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";
import { experiences } from "@/data/experiences";

/**
 * llms.txt — machine-readable site index for LLM agents.
 * Follows the llmstxt.org spec: H1, blockquote summary, then sections of
 * `[Link](URL): description` lines. Build-time static (force-static) — served
 * from edge assets, no runtime handler, no Worker billing.
 */
export const dynamic = "force-static";

const RESUME_PATH = "/Kanit%20Mann%20-%20Resume.pdf";

function line(text: string, url: string, note: string): string {
  return `[${text}](${url}): ${note}`;
}

function flattenExperience() {
  const rows: Array<{ company: string; position: string; period: string }> = [];
  for (const exp of experiences) {
    if (exp.roles?.length) {
      for (const role of exp.roles) {
        rows.push({
          company: exp.company,
          position: role.position,
          period: `${role.startDate} – ${role.endDate}`,
        });
      }
    } else if (exp.position) {
      rows.push({
        company: exp.company,
        position: exp.position,
        period: `${exp.startDate ?? ""} – ${exp.endDate ?? ""}`,
      });
    }
  }
  return rows;
}

export async function GET() {
  const baseUrl = getSiteUrl();

  const parts: string[] = [];

  parts.push("# Kanit Mann");
  parts.push("");
  parts.push(
    "> Kanit Mann — Data, ML & AI Engineer. Portfolio of projects, articles, experience, and resume, with a machine-readable JSON snapshot and a /now page. MS in Data Science, University of Arizona."
  );
  parts.push("");

  // About
  parts.push("## About");
  parts.push(
    line(
      "About Kanit Mann",
      `${baseUrl}/about`,
      "Data, ML & AI Engineer with 3+ years of production experience across cloud infrastructure, machine learning, and data pipelines."
    )
  );
  parts.push("");

  // Projects
  parts.push("## Projects");
  for (const project of projects) {
    parts.push(
      line(project.title, `${baseUrl}${project.href}`, project.description)
    );
  }
  parts.push("");

  // Articles
  parts.push("## Articles");
  for (const article of articles) {
    parts.push(
      line(article.title, `${baseUrl}${article.canonicalPath}`, article.summary)
    );
  }
  parts.push("");

  // Experience
  parts.push("## Experience");
  for (const row of flattenExperience()) {
    parts.push(
      line(
        `${row.position} — ${row.company}`,
        `${baseUrl}/about#experience`,
        `${row.period}`
      )
    );
  }
  parts.push("");

  // Resume
  parts.push("## Resume");
  parts.push(
    line(
      "Kanit Mann — Resume (PDF)",
      `${baseUrl}${RESUME_PATH}`,
      "Downloadable resume in PDF format."
    )
  );
  parts.push("");

  // Feeds
  parts.push("## Feeds");
  parts.push(
    line(
      "RSS feed",
      `${baseUrl}/rss.xml`,
      "Articles and insights by Kanit Mann, RSS 2.0."
    )
  );
  parts.push(
    line(
      "Atom feed",
      `${baseUrl}/atom.xml`,
      "Articles and insights by Kanit Mann, Atom."
    )
  );
  parts.push("");

  // JSON endpoints
  parts.push("## JSON");
  parts.push(
    line(
      "Projects JSON",
      `${baseUrl}/data/projects.json`,
      "Full projects array (slugs, titles, descriptions, tags, case-study narratives) as static JSON."
    )
  );
  parts.push(
    line(
      "Articles JSON",
      `${baseUrl}/data/articles.json`,
      "Full articles array (slugs, titles, summaries, canonical paths) as static JSON."
    )
  );
  parts.push("");

  // Now
  parts.push("## Now");
  parts.push(
    line(
      "What I'm up to now",
      `${baseUrl}/now`,
      "Currently building, reading, and available for — with a build timestamp."
    )
  );
  parts.push("");

  // Full profile
  parts.push("## Full profile");
  parts.push(
    line(
      "llms-full.txt",
      `${baseUrl}/llms-full.txt`,
      "Full concatenated markdown profile: bio, complete project narratives, article summaries, and experience bullets."
    )
  );
  parts.push("");

  const body = parts.join("\n");

  if (Buffer.byteLength(body, "utf-8") > 50 * 1024) {
    throw new Error("llms.txt exceeds the 50 KB budget");
  }

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
