import { execSync } from "child_process";

const LABELS: { name: string; color: string }[] = [
  { name: "fable5-accept", color: "0E8A16" },
  { name: "fable5-reject", color: "D93F0B" },
  { name: "fable5-accept-force", color: "096329" },
];

function createLabel(name: string, color: string): void {
  try {
    execSync(
      `gh label create "${name}" --color "${color}" --repo kanitmann01/profile-kanitmann`,
      { encoding: "utf-8", timeout: 15000 }
    );
  } catch {
    // Label already exists — no-op
  }
}

function main(): void {
  for (const label of LABELS) {
    createLabel(label.name, label.color);
  }
}

main();
