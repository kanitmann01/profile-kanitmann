import type { Fable5Candidate, Fable5Source } from "./open-issue";
import type { Fable5MentionType, Fable5Tag } from "../../data/fable5";

export function parseIssueBody(body: string): Fable5Candidate {
  const lines = body.split("\n").map((l) => l.trim());

  function extract(label: string): string {
    const idx = lines.findIndex((l) => l === `### ${label}`);
    if (idx < 0 || idx >= lines.length - 1) return "";
    const value = lines[idx + 1];
    if (value.startsWith("- [x]") || value.startsWith("- [ ]")) return "";
    return value;
  }

  function extractAfter(label: string): string {
    const idx = lines.findIndex((l) => l === `### ${label}`);
    if (idx < 0 || idx >= lines.length - 1) return "";
    return lines.slice(idx + 1).find((l) => l.length > 0 && !l.startsWith("- [x]") && !l.startsWith("- [ ]")) ?? "";
  }

  const url = extract("Site URL");
  const demoUrl = extract("Demo URL") || url;
  const authorHandle = extract("Author X handle");
  const yourHandle = extract("Your X handle");
  const oneLiner = extract("One-line description");
  const tagsRaw = extract("Tags");
  const typeRaw = extract("Type");
  const anythingElse = extractAfter("Anything else?");

  const tags: Fable5Tag[] = tagsRaw
    .split(/[,\s]+/)
    .map((t) => t.trim().toLowerCase())
    .filter((t): t is Fable5Tag => ["3d","shader","game","tooling","art","agent","webgl","sim","email"].includes(t));

  const type = ["Demo", "Tutorial", "Evaluation", "Integration"].includes(typeRaw)
    ? (typeRaw as Fable5MentionType)
    : "Demo";

  let source: Fable5Source = "submit";
  let discoveredAt = new Date().toISOString().slice(0, 10);

  if (anythingElse) {
    const sourceMatch = anythingElse.match(
      /Auto-discovered from (\w+) on ([\d-]+)/
    );
    if (sourceMatch) {
      source = sourceMatch[1] as Fable5Source;
      discoveredAt = sourceMatch[2];
    }
  }

  return {
    url,
    demoUrl: demoUrl || url,
    authorHandle: authorHandle || "unknown",
    yourHandle: yourHandle || undefined,
    oneLiner,
    tags: tags.length > 0 ? tags : ["tooling"],
    type,
    source,
    discoveredAt,
  };
}
