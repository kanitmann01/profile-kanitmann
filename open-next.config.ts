import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No R2 incremental cache (no ISR routes) — add r2IncrementalCache override if that changes.
export default defineCloudflareConfig({});
