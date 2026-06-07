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

## Usage

When triaging issues, apply these exact label strings. The `triage` skill reads this mapping to apply the correct labels.
