# Issue tracker

This repo uses **GitHub Issues** via the `gh` CLI.
Repo: `github.com/kanitmann01/profile-kanitmann`

## Create

```bash
gh issue create --title "Title" --body "Description"
gh issue create --title "Title" --body "Desc" --label "bug" --label "needs-triage"
gh issue create --title "Title" --body "Desc" --assignee "@me"
```

## List

```bash
gh issue list
gh issue list --state open
gh issue list --state closed
gh issue list --label "bug"
gh issue list --assignee "username"
gh issue list --limit 50
```

## Search

```bash
gh search issues "query" --repo kanitmann01/profile-kanitmann
gh search issues "query" --label "bug" --state open
gh search issues "query" --assignee "username"
```

## View

```bash
gh issue view <number>
gh issue view <number> --comments
gh issue view <number> --web
```

## Update / Edit

```bash
gh issue edit <number> --title "New title"
gh issue edit <number> --body "New body"
```

## Close / Reopen

```bash
gh issue close <number>
gh issue close <number> --reason "not planned"
gh issue reopen <number>
```

## Comment

```bash
gh issue comment <number> --body "Comment text"
```

## Labels

```bash
gh issue edit <number> --add-label "bug"
gh issue edit <number> --add-label "bug" --add-label "needs-triage"
gh issue edit <number> --remove-label "needs-triage"
```

## Assign

```bash
gh issue edit <number> --add-assignee "username"
gh issue edit <number> --add-assignee "@me"
gh issue edit <number> --remove-assignee "username"
```

## Link PRs to issues

Use `Fixes #123`, `Closes #123`, or `Resolves #123` in commit messages or PR bodies.

## Notes

- Issues are public on github.com/kanitmann01/profile-kanitmann
- Use descriptive titles and include reproduction steps for bugs
- See `docs/agents/triage-labels.md` for the canonical label vocabulary
