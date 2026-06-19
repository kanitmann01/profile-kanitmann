## Parent

#73

## What to build

Build the IMAT dashboard page that serves as the strategic command center. This is the entry point for the IMAT section.

**End-to-end behavior:**

- Page at `/imat` shows the full dashboard
- Exam Readiness section: circular progress indicator showing overall preparedness, weighted by exam importance
- Subject Breakdown: 6 horizontal bars showing each subject's progress with exam weight % and weak topic count
- Priority Actions: sorted by (exam weight × weakness × days overdue), shows what to study today with one-tap start buttons
- Study Suggestions: interleaved sessions, new content, weak areas to revisit
- Progress Chart: line chart of reviews per day over last 14 days, streak tracking
- Knowledge Map: interactive node graph showing all notes color-coded by confidence
- Quick Actions: buttons for Random Quiz, Weak Topics, New Content, Study Plan, Resources, Formulas
- Stats bar: reviews this week, streak, % strong

**Key interfaces:**

- Dashboard aggregates data from useSpacedRepetition hook
- Priority calculation: exam weight × weakness × days overdue
- Knowledge Map uses a graph visualization library or custom SVG
- All sections are collapsible/expandable on mobile

## Acceptance criteria

- [ ] Dashboard renders at `/imat`
- [ ] Exam Readiness circular progress shows overall % (weighted by exam importance)
- [ ] Subject Breakdown shows 6 subjects with progress bars and exam weights
- [ ] Priority Actions section shows due notes sorted by priority
- [ ] Study Suggestions shows interleaved session recommendations
- [ ] Progress Chart shows reviews per day over 14 days
- [ ] Knowledge Map renders interactive node graph with color-coded nodes
- [ ] Quick Actions buttons navigate to appropriate sections
- [ ] Stats bar shows reviews this week, streak, % strong
- [ ] Dashboard is mobile-responsive (sections stack vertically)
- [ ] Integration test: dashboard updates when notes are reviewed

## Blocked by

Slice 1 (Route foundation)
Slice 2 (AtomicNote data model)
Slice 3 (Spaced repetition engine)
