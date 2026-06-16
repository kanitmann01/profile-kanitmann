export function log(
  source: string,
  event: string,
  payload?: Record<string, unknown>
): void {
  const line = JSON.stringify({ source, event, ...payload });
  process.stdout.write(line + "\n");
}
