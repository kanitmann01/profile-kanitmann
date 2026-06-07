# Issue tracker

This repo uses **GitHub Issues** as its issue tracker.

## How to create issues

Use the `gh` CLI:

```bash
gh issue create --title "Issue title" --body "Issue description"
```

## How to list issues

```bash
gh issue list
```

## How to update issues

```bash
gh issue edit <number> --add-label "label-name"
```

## Notes

- Issues are public on github.com/kanitmann01/profile-kanitmann
- Use descriptive titles and include reproduction steps for bugs
- Link PRs to issues with "Fixes #123" or "Closes #123" in commit messages
