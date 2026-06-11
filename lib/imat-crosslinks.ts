import { notes } from "@/data/imat/registry";
import type { Subject } from "@/data/imat/types";

export type ResolvedCrosslink = {
  slug: string;
  title: string;
  subject: Subject;
  topic: string;
  href: string;
};

export function resolveCrosslinks(
  crosslinkSlugs: string[]
): ResolvedCrosslink[] {
  const results: ResolvedCrosslink[] = [];
  for (const slug of crosslinkSlugs) {
    const note = notes.find((n) => n.slug === slug);
    if (!note) continue;
    results.push({
      slug: note.slug,
      title: note.title,
      subject: note.subject,
      topic: note.topic,
      href: `/imat/${note.subject}/${note.topic}/${note.slug}`,
    });
  }
  return results;
}
