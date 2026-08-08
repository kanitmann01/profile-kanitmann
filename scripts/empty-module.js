// Empty module stub. Used as the server-side resolution target for browser-only
// packages (e.g. three.js) via next.config.mjs turbopack.resolveAlias, so they
// are NOT pulled into the OpenNext server handler and blow the Cloudflare
// Worker 3 MiB budget. The browser build resolves to the real package via the
// `browser` condition; this stub only stands in on the server, where these
// packages are never executed (the components that import them render null).
module.exports = {};
