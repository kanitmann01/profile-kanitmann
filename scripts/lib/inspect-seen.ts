import { loadSeen } from "./seen";

async function main(): Promise<void> {
  const blob = await loadSeen();
  const entries = Object.values(blob.entries);
  const total = entries.length;
  const counts = entries.reduce<Record<string, number>>((acc, e) => {
    acc[e.status] = (acc[e.status] ?? 0) + 1;
    return acc;
  }, {});
  const seen = counts.seen ?? 0;
  const accepted = counts.accepted ?? 0;
  const rejected = counts.rejected ?? 0;
  process.stdout.write(
    `Fable 5 seen: ${total} total (seen=${seen}, accepted=${accepted}, rejected=${rejected})\n`
  );
}

main().catch((err) => {
  process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
