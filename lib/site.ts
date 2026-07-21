/**
 * The single source of truth for this site's own origin.
 *
 * Reads `NEXT_PUBLIC_SITE_URL` at call time so preview deployments (which set
 * the env var to their preview URL) emit preview URLs in OG tags, canonical
 * links, and JSON-LD schema. Falls back to the canonical prod origin.
 *
 * Canonical form is `https://www.kanit.codes` — locked in by
 * `app/__tests__/sitemap.test.ts`, which forbids the bare form.
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kanit.codes";
}
