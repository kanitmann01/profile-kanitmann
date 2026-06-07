# Triage labels

This repo uses the default label vocabulary for the five canonical triage roles.

## Label mapping

| Role | Label string | Purpose |
|---|---|---|
| Needs triage | `needs-triage` | Maintainer needs to evaluate the issue |
| Needs info | `needs-info` | Waiting on reporter for more information |
| Ready for agent | `ready-for-agent` | Fully specified, AFK-ready for an agent to pick up |
| Ready for human | `ready-for-human` | Needs human implementation |
| Won't fix | `wontfix` | Will not be actioned |

## Apply labels with `gh`

```bash
# Add a single label
gh issue edit <number> --add-label "needs-triage"

# Add multiple labels
gh issue edit <number> --add-label "ready-for-agent" --add-label "bug"

# Remove a label
gh issue edit <number> --remove-label "needs-triage"

# Replace all labels (sets exact list)
gh issue edit <number> --label "ready-for-human" --label "enhancement"
```

## Typical triage flow

1. New issue arrives → apply `needs-triage`
2. Review → if missing info, apply `needs-info` (remove `needs-triage`)
3. Fully specified + automatable → apply `ready-for-agent`
4. Fully specified + needs human → apply `ready-for-human`
5. Will not action → apply `wontfix`, then close

## Notes

- Always remove the previous triage label when transitioning states
- The `triage` skill reads this mapping to apply the correct labels
- Labels must match these exact strings for skill compatibility
