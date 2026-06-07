# Domain docs

This repo uses a **single-context** layout.

## Layout

- **CONTEXT.md** — at repo root, contains the project's domain language, conventions, and key concepts
- **docs/adr/** — at repo root, contains Architectural Decision Records

## How skills use these files

- `improve-codebase-architecture` reads CONTEXT.md to understand the domain model
- `diagnose` and `tdd` read CONTEXT.md for domain context when debugging or writing tests
- All skills can read ADRs in docs/adr/ to understand past architectural decisions

## Notes

- CONTEXT.md does not exist yet — create it when you want to document domain language
- docs/adr/ does not exist yet — create it when you want to record architectural decisions
