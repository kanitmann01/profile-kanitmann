import { execFile } from "child_process";

import { promisify } from "util";

type ExecFileResult = { stdout: string; stderr: string };
const execFileAsync = promisify(execFile) as (
  file: string,
  args: readonly string[]
) => Promise<ExecFileResult>;

const REPO = process.env.GITHUB_REPOSITORY ?? "kanitmann01/profile-kanitmann";

const LABELS = [
  { name: "fable5-accept", color: "0E8A16" },
  { name: "fable5-reject", color: "D93F0B" },
  { name: "fable5-accept-force", color: "096329" },
] as const;

type LabelStatus = "created" | "exists" | "failed";

export async function bootstrapLabels(
  repo: string = REPO,
  exec: typeof execFileAsync = execFileAsync
): Promise<{ name: string; status: LabelStatus }[]> {
  const results: { name: string; status: LabelStatus }[] = [];
  for (const { name, color } of LABELS) {
    let status: LabelStatus;
    try {
      const args = ["label", "create", name, "--color", color, "--repo", repo];
      await exec("gh", args);
      status = "created";
    } catch (err) {
      const e = err as { stderr?: string; message?: string };
      const stderr = e.stderr ?? e.message ?? "";
      status = /already exists/i.test(stderr) ? "exists" : "failed";
    }
    results.push({ name, status });
  }
  return results;
}

export const BOOTSTRAP_LABELS = LABELS;

async function main(): Promise<void> {
  const results = await bootstrapLabels();
  for (const { name, status } of results) {
    process.stdout.write(`[bootstrap-labels] ${name}: ${status}\n`);
  }
  const failed = results.find((r) => r.status === "failed");
  if (failed) {
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch((err) => {
    const message = err instanceof Error ? err.message : String(err);
    process.stderr.write(`[bootstrap-labels] failed: ${message}\n`);
    process.exit(1);
  });
}
