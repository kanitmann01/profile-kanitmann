import { readFileSync, existsSync, writeFileSync } from "fs";

import { loadSeen, saveSeen, markSeen, isNew } from "./lib/seen";
import { parseIssueBody } from "./lib/parse-issue-body";
import { buildRow } from "./lib/fable5-row-from-issue";
import { log } from "./lib/log";
import type { Fable5Site, Fable5Mention, Fable5Tag } from "../data/fable5";

function readEvent(eventPath: string): Record<string, unknown> {
  const raw = readFileSync(eventPath, "utf-8");
  return JSON.parse(raw);
}

function getExistingData(): {
  sites: Fable5Site[];
  mentions: Fable5Mention[];
  tags: Fable5Tag[];
} {
  try {
    const mod = require("../data/fable5");
    return {
      sites: (mod.fable5Sites ?? []) as Fable5Site[],
      mentions: (mod.fable5Mentions ?? []) as Fable5Mention[],
      tags: (mod.FABLE5_TAGS ?? []) as Fable5Tag[],
    };
  } catch {
    return { sites: [], mentions: [], tags: [] };
  }
}

async function runAccept(
  issueNumber: number,
  issueBody: string,
  force: boolean
): Promise<void> {
  const candidate = parseIssueBody(issueBody);

  if (!force) {
    if (!isNew(candidate.url)) {
      log("triage", "skip-already-seen", { url: candidate.url, issue: issueNumber });
      process.exit(0);
    }
  }

  const existing = getExistingData();
  const { kind, row } = buildRow(
    candidate,
    existing.sites,
    existing.mentions,
    existing.tags,
    issueNumber
  );

  markSeen(candidate.url, "accepted", candidate.source, issueNumber);

  log("triage", "accept-complete", {
    issue: issueNumber,
    kind,
    id: row.id,
    url: candidate.url,
    forced: force,
  });
}

async function runReject(issueNumber: number, issueBody: string): Promise<void> {
  const candidate = parseIssueBody(issueBody);

  const existing = getExistingData();
  const alreadyAccepted = [...existing.sites, ...existing.mentions].some(
    (entry) => entry.sourceUrl === candidate.url
  );

  if (alreadyAccepted) {
    log("triage", "reject-skip-accepted", {
      issue: issueNumber,
      url: candidate.url,
      message: "This site is already in the museum.",
    });
    process.exit(0);
  }

  markSeen(candidate.url, "rejected", candidate.source);
  log("triage", "reject-complete", {
    issue: issueNumber,
    url: candidate.url,
  });
}

async function main(): Promise<void> {
  const eventIdx = process.argv.indexOf("--event");
  const eventPath =
    eventIdx >= 0
      ? process.argv[eventIdx + 1]
      : process.env.GITHUB_EVENT_PATH;

  if (!eventPath || !existsSync(eventPath)) {
    log("triage", "error", { message: "No event path provided" });
    process.exit(1);
  }

  const event = readEvent(eventPath);
  const issue = event.issue as Record<string, unknown> | undefined;
  const label = event.label as Record<string, unknown> | undefined;

  if (!issue || !label) {
    log("triage", "error", { message: "Event missing issue or label" });
    process.exit(1);
  }

  const issueNumber = issue.number as number;
  const issueBody = (issue.body as string) ?? "";
  const labelName = (label.name as string) ?? "";

  switch (labelName) {
    case "fable5-accept":
      await runAccept(issueNumber, issueBody, false);
      break;
    case "fable5-accept-force":
      await runAccept(issueNumber, issueBody, true);
      break;
    case "fable5-reject":
      await runReject(issueNumber, issueBody);
      break;
    default:
      log("triage", "skip", { label: labelName });
      break;
  }
}

if (
  process.argv[1] &&
  (process.argv[1].endsWith("triage-bot.ts") || process.argv[1].endsWith("triage-bot.js"))
) {
  main().catch((err) => {
    log("triage", "fatal", { error: String(err) });
    process.exit(1);
  });
}
