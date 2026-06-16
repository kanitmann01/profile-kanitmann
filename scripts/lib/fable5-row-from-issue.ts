import type { Fable5Candidate } from "./open-issue";
import type { Fable5Site, Fable5Mention, Fable5Tag } from "../../data/fable5";

const PLACEHOLDER_SCREENSHOT =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 630'><rect width='1200' height='630' fill='%23111'/><text x='50%' y='50%' fill='%23888' font-family='monospace' font-size='24' text-anchor='middle' dominant-baseline='middle'>FABLE 5</text></svg>";

function kebabCase(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function makeId(name: string, existingIds: Set<string>): string {
  let id = kebabCase(name);
  if (!id) id = "site";
  let dedup = id;
  let n = 2;
  while (existingIds.has(dedup)) {
    dedup = `${id}-${n}`;
    n++;
  }
  return dedup;
}

function isDeployableDemo(url: string): boolean {
  return !/x\.com|twitter\.com/.test(url);
}

type BuildResult =
  | { kind: "site"; row: Fable5Site }
  | { kind: "mention"; row: Fable5Mention };

export function buildRow(
  candidate: Fable5Candidate,
  existingSites: Fable5Site[],
  existingMentions: Fable5Mention[],
  existingTags: Fable5Tag[],
  issueNumber?: number
): BuildResult {
  const existingIds = new Set([
    ...existingSites.map((s) => s.id),
    ...existingMentions.map((m) => m.id),
  ]);

  if (isDeployableDemo(candidate.demoUrl ?? candidate.url)) {
    const row: Fable5Site = {
      id: makeId(candidate.oneLiner, existingIds),
      name: candidate.oneLiner,
      demoUrl: candidate.demoUrl ?? candidate.url,
      screenshotUrl: PLACEHOLDER_SCREENSHOT,
      oneLiner: candidate.oneLiner,
      author: `@${candidate.authorHandle}`,
      sourceUrl: candidate.url,
      tags: candidate.tags,
      featured: false,
      addedAt: candidate.discoveredAt,
      playable: true,
    };
    return { kind: "site", row };
  }

  const row: Fable5Mention = {
    id: makeId(candidate.oneLiner, existingIds),
    title: candidate.oneLiner,
    author: `@${candidate.authorHandle}`,
    type: candidate.type,
    sourceUrl: candidate.url,
    addedAt: candidate.discoveredAt,
  };

  return { kind: "mention", row };
}
