import type { ArticleMeta } from "@/data/articles";
import type { Project } from "@/data/projects";

export type FilterChip = {
  label: string;
  value: string;
};

/**
 * Case-insensitive substring match across the given fields.
 * An empty (or whitespace-only) query matches everything.
 */
export function matchesQuery(query: string, ...fields: string[]): boolean {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return true;
  return fields.some((field) => field.toLowerCase().includes(q));
}

/**
 * OR semantics: an item matches when it has at least one of the selected
 * values. No selection matches everything.
 */
export function matchesAny(selected: string[], values: string[]): boolean {
  if (selected.length === 0) return true;
  return values.some((value) => selected.includes(value));
}

export function filterProjects(
  items: Project[],
  selectedStacks: string[],
  query: string
): Project[] {
  return items.filter(
    (project) =>
      matchesAny(selectedStacks, project.tags) &&
      matchesQuery(query, project.title, project.description)
  );
}

export function filterArticles(
  items: ArticleMeta[],
  selectedTopics: string[],
  query: string
): ArticleMeta[] {
  return items.filter(
    (article) =>
      matchesAny(selectedTopics, article.tags) &&
      matchesQuery(query, article.title, article.description)
  );
}

/** Dedupe, sort alphabetically, and shape as filter chips. */
export function uniqueChips(values: string[]): FilterChip[] {
  return [...new Set(values)]
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ label: value, value }));
}
