## Problem Statement

I have an Obsidian vault (~80+ markdown notes) covering the IMAT exam syllabus across 6 subjects (Biology, Chemistry, Physics, Mathematics, Logical Reasoning, General Knowledge). The notes are well-structured with topic hubs, atomic notes, active recall questions, memory hooks, and diagrams — but they live in Obsidian and are not accessible as a web-based learning experience.

I need a private, hidden section of my portfolio site (kanit.codes) that transforms these notes into a cognitive-science-driven learning platform. It should be accessible only to people I share the URL with — not linked anywhere on the public site, not in the sitemap, not indexed by search engines.

## Solution

A hidden `/imat` route section on the portfolio site that provides:

- A strategic dashboard showing exam readiness, subject breakdown, and priority actions
- Subject pages with exam-weighted progress tracking
- Topic hub pages with concept maps and confidence indicators
- Atomic note pages with interactive learning components (active recall, spaced repetition, dual coding, Feynman prompts)
- 10 interactive visual components (DNA strand, cell membrane, periodic table, pH scale, etc.)
- localStorage-based progress tracking with a simplified 3-button spaced repetition system

## User Stories

1. As a student, I want to visit `/imat` and see a dashboard showing my overall exam readiness, so I know where I stand
2. As a student, I want to see which notes are due for review today, so I can prioritize my study time
3. As a student, I want to see a subject breakdown with exam weights, so I understand which subjects matter most
4. As a student, I want to see my weakest topics highlighted, so I can focus on gaps
5. As a student, I want suggested interleaved study sessions, so I can mix related topics for better retention
6. As a student, I want to see a study streak counter, so I stay motivated
7. As a student, I want to navigate to a subject page and see all its topics with progress bars, so I can plan my study path
8. As a student, I want to see a concept map on topic hub pages, so I understand how subtopics relate
9. As a student, I want to see confidence indicators (strong/ok/weak) for each note, so I know what needs work
10. As a student, I want to open an atomic note and see a structured learning page, so I can learn efficiently
11. As a student, I want to see a memory hook/mnemonic for each concept, so I can remember it longer
12. As a student, I want to see an IMAT trap callout, so I avoid common exam mistakes
13. As a student, I want to see why a concept matters clinically, so I stay engaged
14. As a student, I want to see interactive diagrams (DNA strand, cell membrane, etc.), so I can learn through manipulation
15. As a student, I want to answer active recall questions after reading, so I test my understanding immediately
16. As a student, I want to rate my confidence (Forgot/Fuzzy/Nailed it) after each note, so the system tracks my spaced repetition schedule
17. As a student, I want to see related notes as crosslinks, so I can navigate to connected concepts
18. As a student, I want the dashboard to work well on mobile, so I can study on my phone
19. As a student, I want interactive components like a pH scale slider or function grapher, so I can see how variables affect outcomes
20. As a student, I want a knowledge map showing all notes color-coded by confidence, so I can see the big picture
21. As a student, I want quick action buttons (random quiz, weak topics, new content), so I can jump into study modes
22. As a student, I want the IMAT section to be hidden from the public site, so only people I share it with can access it
23. As a student, I want progress to persist in localStorage, so I can resume where I left off
24. As a student, I want to start with Biology first (phased rollout), so I can iterate and improve

## Implementation Decisions

- **Route structure**: `/imat` (dashboard), `/imat/[subject]`, `/imat/[subject]/[topic]`, `/imat/[subject]/[topic]/[note]`
- **Hidden from public**: No nav link, no sitemap entry, `<meta name="robots" content="noindex, nofollow">`, no JSON-LD structured data
- **Layout**: Uses existing root layout (nav, footer, theme, fonts)
- **Content storage**: Structured TypeScript files in `content/imat/`, one file per atomic note (not synced from Obsidian)
- **Data model**: Each atomic note exports a structured object with: slug, subject, topic, title, summary, explanation (ReactNode), memoryHook, imatTrap, whyItMatters, diagram, questions[], crosslinks, prerequisites
- **Spaced repetition**: Simplified 3-button system (Forgot = 1 day, Fuzzy = 2.5x interval, Nailed = 4x interval)
- **Progress tracking**: localStorage with NoteProgress type (noteSlug, lastReviewed, confidence, nextReviewDate, reviewCount)
- **UI components**: Hybrid — shadcn/ui for layout (Card, Badge, Button), custom components for learning interactions (QuizCard, ReviewSession, ConfidenceMeter)
- **Interactive components**: 10 total — DNA Strand, Cell Membrane, Mitosis/Meiosis, Enzyme-Substrate, Periodic Table, pH Scale, Molecular Geometry, Projectile Motion, Circuit Simulator, Function Grapher
- **Animations**: Framer Motion (already in stack)
- **Math rendering**: react-katex
- **Diagrams**: Custom SVG for most interactives, Mermaid for process flows
- **Phased rollout**: Phase 1 = Biology (6 topics, ~30 notes), then expand to other subjects

## Testing Decisions

- **Unit tests**: Test the AtomicNote type structure, question validation logic, spaced repetition interval calculations
- **Component tests**: Test QuizCard, ReviewSession, ConfidenceMeter, interactive components (DNA, pH scale, etc.)
- **Integration tests**: Test dashboard data aggregation (due notes, weak areas, progress stats)
- **E2E tests**: Test full flow — open note, answer questions, rate confidence, verify localStorage update
- **Prior art**: Existing tests in `app/__tests__/`, `components/__tests__/`, `hooks/__tests__/` use vitest + @testing-library/react

## Out of Scope

- Backend/authentication (localStorage only, no user accounts)
- Sync across devices (manual export/import could be added later)
- Obsidian vault sync (content is managed in codebase, not synced from Obsidian)
- Non-Biology subjects (Phase 2+)
- Gamification beyond streaks (badges, leaderboards, etc.)
- Social features (sharing progress, study groups)

## Further Notes

- The dashboard should prioritize actions by: exam weight x weakness x days overdue
- Biology is 38% of IMAT (23 questions), Chemistry 25% (15 questions), Physics+Math ~12%, Logic 8%, GK 7%
- The 10 interactive components should be reusable across subjects where applicable
- The knowledge map on the dashboard should be an interactive node graph (all 200 notes across 6 subjects)
- Mobile-first design: all sections stack vertically, large tap targets, touch-friendly progress bars
