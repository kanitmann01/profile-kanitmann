// scripts/open-fable5-pr.ts
// Opens a PR with the extracted media and data changes

import { execSync } from "child_process";
import { existsSync } from "fs";

const MANIFEST_FILE = "data/fable5-fixes.json";
const DIFF_FILE = "data/fable5-fixes.diff";
const IMAGES_DIR = "public/images/fable5";

/**
 * Runs a shell command and returns the output
 */
function runCommand(command: string): string {
  try {
    return execSync(command, { encoding: "utf-8" }).trim();
  } catch (error: any) {
    throw new Error(`Command failed: ${command}\n${error.message}`);
  }
}

/**
 * Creates a new git branch
 */
function createBranch(): void {
  const branchName = "fable5/real-demo-urls-and-screenshots";
  console.log(`Creating branch: ${branchName}`);

  // Check if branch already exists
  try {
    runCommand(`git rev-parse --verify ${branchName}`);
    console.log(`Branch ${branchName} already exists, checking it out`);
    runCommand(`git checkout ${branchName}`);
  } catch {
    // Branch doesn't exist, create it
    runCommand(`git checkout -b ${branchName}`);
  }
}

/**
 * Stages and commits the changes
 */
function commitChanges(): void {
  console.log("Staging changes...");

  // Stage the manifest
  if (existsSync(MANIFEST_FILE)) {
    runCommand(`git add ${MANIFEST_FILE}`);
  }

  // Stage the diff
  if (existsSync(DIFF_FILE)) {
    runCommand(`git add ${DIFF_FILE}`);
  }

  // Stage the images
  if (existsSync(IMAGES_DIR)) {
    runCommand(`git add ${IMAGES_DIR}/`);
  }

  // Stage the orchestrator script
  runCommand(`git add scripts/extract-fable5-media.ts`);

  // Stage the library
  runCommand(`git add scripts/lib/extract-fable5-media.ts`);

  // Stage the PR script
  runCommand(`git add scripts/open-fable5-pr.ts`);

  // Stage the test files
  runCommand(`git add scripts/__tests__/extract-fable5-media.test.ts`);
  runCommand(
    `git add scripts/__tests__/extract-fable5-media-orchestrator.test.ts`
  );

  // Stage the fixtures
  runCommand(`git add scripts/__tests__/fixtures/`);

  // Stage the museum modal updates
  runCommand(`git add components/fable5/museum-modal.tsx`);
  runCommand(`git add components/fable5/__tests__/museum-modal.test.tsx`);

  // Stage package.json
  runCommand(`git add package.json`);

  console.log("Committing changes...");
  const commitMessage = `feat(fable5): real demo URLs and screenshots

- Extract media from X posts for all 15 Fable 5 sites
- Update demoUrl to use X embed URLs
- Add manifest at data/fable5-fixes.json
- Add diff at data/fable5-fixes.diff
- Fix pickMediaEntry to handle video posters from media_url_https
- Fix parser to use dynamic import for unquoted constants
- Add comprehensive test coverage

Closes #129`;

  runCommand(`git commit -m "${commitMessage}"`);
}

/**
 * Pushes the branch to remote
 */
function pushBranch(): void {
  console.log("Pushing branch to remote...");
  runCommand("git push -u origin HEAD");
}

/**
 * Creates the PR using gh CLI
 */
function createPR(): void {
  console.log("Creating PR...");

  const prTitle = "Fable 5 Museum: Real Demo URLs and Real Screenshots";
  const prBody = `## Summary

This PR implements the Fable 5 Museum real demo URLs and screenshots feature.

## Changes

- Extracts media (video posters and photos) from all 15 Fable 5 X posts
- Updates \`demoUrl\` to use X embed URLs (\`https://platform.twitter.com/embed/Tweet.html?id={statusId}\`)
- Downloads media files to \`public/images/fable5/\`
- Generates a manifest at \`data/fable5-fixes.json\`
- Generates a diff at \`data/fable5-fixes.diff\`

## Edge Cases

- **Tombstoned tweets** (account limits): Marked as \`failed\` in manifest
- **Text-only tweets** (no media): Marked as \`missing\` in manifest
- **Network errors**: Marked as \`failed\` in manifest

## Related

- Closes #129
- Implements #130, #131, #132

## Testing

- Unit tests for media extraction library
- e2e tests for the orchestrator script
- All existing tests pass

🤖 Generated with [Claude Code](https://claude.com/claude-code)`;

  runCommand(
    `gh pr create --title "${prTitle}" --body "${prBody}" --base master`
  );
}

/**
 * Main execution function
 */
export async function openFable5PR(): Promise<void> {
  console.log("Starting PR creation process...");

  // Check prerequisites
  if (!existsSync(MANIFEST_FILE)) {
    throw new Error(
      `Manifest file not found: ${MANIFEST_FILE}. Run extract-fable5-media first.`
    );
  }

  // Check git status
  const gitStatus = runCommand("git status --porcelain");
  if (gitStatus) {
    console.log("Warning: There are uncommitted changes:");
    console.log(gitStatus);
  }

  // Create branch
  createBranch();

  // Commit changes
  commitChanges();

  // Push branch
  pushBranch();

  // Create PR
  createPR();

  console.log("\n=== PR Created Successfully ===");
  console.log("Check the PR on GitHub for review.");
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  openFable5PR().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}
