# Domain migration — kanit.codes → kanitmann.com

Tier 0 hygiene for the freshly-migrated domain (`kanitmann.com`, live
2026-08-03, zero-indexed). All edge rules live in Cloudflare — this doc is the
single source of truth for what is deployed there and what the code covers.

## 1. www → apex (301)

Verified 2026-08-05: `curl -I https://www.kanitmann.com/` returns **HTTP 200**
— Cloudflare serves the worker on both hosts with **no redirect**. Fix at the
edge; do not rely on origin code alone.

Cloudflare redirect rule (Dashboard → Rules → Redirect Rules, or Terraform):

```
name: collapse www -> apex
expression: (http.host eq "www.kanitmann.com")
action: redirect
status_code: 301
url: https://kanitmann.com{http.request.uri.path}
preserve_query_string: true
```

Code fallback: `next.config.mjs` adds a `308` redirect for any request whose
`Host` is `www.kanitmann.com` reaching the worker (belt-and-suspenders for
direct-origin hits; harmless once the edge rule is live).

## 2. kanit.codes → kanitmann.com (301)

Verified 2026-08-05: `kanit.codes` is **parked** (HTTP 405, `Server:
Parking/1.0`) — no redirect is live yet. Apply the same edge rule shape:

```
name: migrate kanit.codes -> kanitmann.com
expression: (http.host eq "kanit.codes")
action: redirect
status_code: 301
url: https://kanitmann.com{http.request.uri.path}
preserve_query_string: true
```

Not testable from this environment (domain controlled by the registrar/parking
host until the CF zone is attached).

## 3. HTTPS + HSTS

- `public/_headers` ships
  `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  on `/*` (see also the `_headers` comment).
- Edge note: the CF zone has "Always Use HTTPS" ON, so every request arrives
  at the worker over TLS. Submit the apex to the HSTS preload list
  (https://hstspreload.org/) once the www rule and HSTS header are confirmed
  live — `preload` is inert until the domain is accepted.

## 4. IndexNow

Pings participating engines after each deploy so the zero-indexed domain gets
discovered fast.

- Script: `scripts/indexnow-ping.ts` — reads the site key from
  `public/<hex>.txt` and POSTs every sitemap URL to
  `https://api.indexnow.org/IndexNow`.
- Key file: `public/f5c904d327a944aaea120057ea5d84e3.txt` (contains the key;
  must stay in sync with the script's key-location URL).
- Automatic: `postdeploy` npm hook runs the ping after `npm run deploy`.
  Failures log a warning and do not fail the deploy.
- Manual invocation:

```
npm run indexnow:ping
```

## 5. Identity

One Person node across the site: `name: "Kanit Mann"`,
`sameAs: ["https://github.com/kanitmann01"]`. No LinkedIn mirror in
structured data — `app/layout.tsx` and `app/page.tsx` Person schemas agree.
