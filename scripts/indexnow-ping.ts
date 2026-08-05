/**
 * IndexNow ping — notifies participating search engines of URL changes.
 *
 * Usage:
 *   npm run indexnow:ping
 *
 * Reads the site key from `public/<hex>.txt` and POSTs every sitemap URL to
 * https://api.indexnow.org/IndexNow. Runs automatically via the `postdeploy`
 * hook after a production deploy; can also be invoked manually. Failures are
 * logged but never fail the deploy (the site is already live at that point).
 *
 * IndexNow is best-effort: submitting URLs it already knows is harmless, and
 * unknown keys are silently ignored server-side.
 */
import { readdirSync } from "fs";
import path from "path";
import { projects } from "../data/projects";
import { articles } from "../data/articles";

const HOST = "kanitmann.com";
const ENDPOINT = "https://api.indexnow.org/IndexNow";

function findKeyFile(): { key: string } {
  const publicDir = path.resolve("public");
  for (const entry of readdirSync(publicDir)) {
    const match = entry.match(/^([a-f0-9]{16,})\.txt$/);
    if (match) return { key: match[1] };
  }
  throw new Error(
    "No IndexNow key file (public/<hex>.txt) found. Generate one, e.g.: node -e \"console.log(require('crypto').randomBytes(16).toString('hex'))\""
  );
}

function urlFor(sitePath: string): string {
  return `https://${HOST}${sitePath}`;
}

async function main(): Promise<void> {
  const { key } = findKeyFile();

  const urlList = [
    urlFor("/"),
    urlFor("/about"),
    urlFor("/projects"),
    urlFor("/articles"),
    urlFor("/contact"),
    ...projects.map((p) => urlFor(`/projects/${p.slug}`)),
    ...articles.map((a) => urlFor(a.canonicalPath)),
  ];

  const body = {
    host: HOST,
    key,
    keyLocation: `https://${HOST}/${key}.txt`,
    urlList,
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });

    if (res.status === 200 || res.status === 202) {
      console.log(
        `IndexNow: submitted ${urlList.length} URLs (HTTP ${res.status})`
      );
    } else {
      console.error(
        `IndexNow: HTTP ${res.status} — ${(await res.text()).slice(0, 300)}`
      );
    }
  } catch (err) {
    console.warn(`IndexNow: ping failed (non-fatal): ${String(err)}`);
  }
}

main();
