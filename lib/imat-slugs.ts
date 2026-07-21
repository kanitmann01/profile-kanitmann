/**
 * Format a kebab-case slug into Title Case.
 * Shared between the topic page and note page.
 */
export function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
