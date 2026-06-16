export type LogEvent =
  | "fetched"
  | "new"
  | "duplicate"
  | "rejected"
  | "error"
  | "saved"
  | "opened_issue"
  | "closed_issue"
  | "synced"
  | (string & {});

export type LogPayload = Record<string, unknown>;

export function log(
  source: string,
  event: LogEvent,
  payload: LogPayload = {}
): void {
  const line = JSON.stringify({ source, event, ...payload });
  process.stdout.write(`${line}\n`);
}
