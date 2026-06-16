import { loadSeen } from "./seen";

function main(): void {
  const blob = loadSeen();
  const entries = Object.entries(blob.entries);
  const total = entries.length;

  const accepted = entries.filter(([, e]) => e.status === "accepted").length;
  const rejected = entries.filter(([, e]) => e.status === "rejected").length;
  const pending = entries.filter(([, e]) => e.status === "pending").length;

  process.stdout.write(
    JSON.stringify(
      {
        total,
        accepted,
        rejected,
        pending,
      },
      null,
      2
    ) + "\n"
  );

  if (entries.length > 0) {
    process.stdout.write("\nRecent entries (last 10):\n");
    const sorted = entries
      .sort(
        ([, a], [, b]) =>
          new Date(b.lastUpdatedAt).getTime() -
          new Date(a.lastUpdatedAt).getTime()
      )
      .slice(0, 10);
    for (const [url, entry] of sorted) {
      process.stdout.write(
        `  [${entry.status.padEnd(8)}] ${url} (${entry.source})\n`
      );
    }
  }

  process.exit(0);
}

main();
