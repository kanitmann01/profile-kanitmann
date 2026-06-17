import { isNew, markSeen } from "./lib/seen";
import {
  openIssue,
  type Fable5Candidate,
  type Fable5Source,
} from "./lib/open-issue";
import { log } from "./lib/log";
import type { Fable5MentionType } from "../data/fable5";

type ParseResult = {
  cases: Fable5Candidate[];
  errors: string[];
};

const DEMO_URL_RE = /https:\/\/t\.co\/\w+/g;

export function parseCases(markdown: string): ParseResult {
  const cases: Fable5Candidate[] = [];
  const errors: string[] = [];

  const sections = markdown.split(/\r?\n---+\r?\n/);

  for (const section of sections) {
    const caseMatch = section.match(
      /### Case (\d+): \[([^\]]+)\]\(([^)]+)\)\s+\(by\s+\[@([^\]]+)\]/
    );
    if (!caseMatch) continue;

    const [, , title, sourceUrl, authorHandle] = caseMatch;

    const typeMatch = section.match(/Type:\s*(\w+)/);
    const dateMatch = section.match(/Date:\s*([\d-]+)/);

    const type = (typeMatch?.[1] ?? "Demo") as Fable5MentionType;
    const discoveredAt = dateMatch?.[1] ?? "unknown";

    const demoUrls = section.match(DEMO_URL_RE);
    const demoUrl = demoUrls?.[0] ?? sourceUrl;

    const bodyLines = section
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l);
    const headerIdx = bodyLines.findIndex((l) => l.startsWith("### Case"));
    const boldLine =
      headerIdx >= 0
        ? bodyLines
            .slice(headerIdx + 1)
            .find((l) => l.startsWith("**") && l.endsWith("**"))
        : null;
    const oneLiner = boldLine?.replace(/\*\*/g, "").trim() ?? "";

    cases.push({
      url: sourceUrl,
      demoUrl,
      authorHandle,
      oneLiner,
      tags: ["tooling"],
      type,
      source: "awesome" as Fable5Source,
      discoveredAt,
    });
  }

  // If no sections matched via ---, try parsing case-by-case
  if (cases.length === 0) {
    const caseBlocks = markdown.split(/(?=\r?\n### Case \d+:)/);
    for (const block of caseBlocks) {
      const caseMatch = block.match(
        /### Case (\d+): \[([^\]]+)\]\(([^)]+)\)\s+\(by\s+\[@([^\]]+)\]/
      );
      if (!caseMatch) continue;

      const [, , title, sourceUrl, authorHandle] = caseMatch;

      const typeMatch = block.match(/Type:\s*(\w+)/);
      const dateMatch = block.match(/Date:\s*([\d-]+)/);

      const type = (typeMatch?.[1] ?? "Demo") as Fable5MentionType;
      const discoveredAt = dateMatch?.[1] ?? "unknown";

      const demoUrls = block.match(DEMO_URL_RE);
      const demoUrl = demoUrls?.[0] ?? sourceUrl;

      const lines = block
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l);
      const headerIdx = lines.findIndex((l) => l.startsWith("### Case"));
      const boldLine =
        headerIdx >= 0
          ? lines
              .slice(headerIdx + 1)
              .find((l) => l.startsWith("**") && l.endsWith("**"))
          : null;
      const oneLiner = boldLine?.replace(/\*\*/g, "").trim() ?? "";

      cases.push({
        url: sourceUrl,
        demoUrl,
        authorHandle,
        oneLiner,
        tags: ["tooling"],
        type,
        source: "awesome" as Fable5Source,
        discoveredAt,
      });
    }
  }

  return { cases, errors };
}

async function processCases(
  candidates: Fable5Candidate[]
): Promise<{ opened: number; skipped: number; failed: number }> {
  let opened = 0;
  let skipped = 0;
  let failed = 0;

  for (const candidate of candidates) {
    if (!isNew(candidate.url)) {
      skipped++;
      continue;
    }

    try {
      await openIssue(candidate);
      markSeen(candidate.url, "pending", "awesome");
      opened++;
    } catch {
      failed++;
    }
  }

  return { opened, skipped, failed };
}

export async function syncAwesomeList(): Promise<void> {
  const response = await fetch(
    "https://raw.githubusercontent.com/Anil-matcha/awesome-claude-fable-5/main/README.md"
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch awesome list: ${response.status} ${response.statusText}`
    );
  }

  const markdown = await response.text();
  const { cases, errors } = parseCases(markdown);

  const fetched = cases.length;
  const { opened, skipped, failed } = await processCases(cases);

  log("awesome", "sync-complete", {
    fetched,
    parsed: fetched,
    new: opened,
    dup: skipped,
    opened,
    failed,
    ...(errors.length > 0 ? { parseErrors: errors.length } : {}),
  });
}

if (
  process.argv[1] &&
  (process.argv[1].endsWith("parse-awesome-list.ts") ||
    process.argv[1].endsWith("parse-awesome-list.js"))
) {
  syncAwesomeList().catch((err) => {
    log("awesome", "sync-fatal", { error: String(err) });
    process.exit(1);
  });
}
