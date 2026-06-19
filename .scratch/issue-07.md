## Parent

#73

## What to build

Build the subject page that shows all topics within a subject with progress tracking.

**End-to-end behavior:**

- Page at `/imat/[subject]` shows the subject overview
- Header: subject name, exam weight (e.g., "Biology - 23 questions, 38% of IMAT")
- Overall progress bar with weak/ok/strong breakdown
- Topic cards: each shows topic name, progress %, note count, weak count
- Focus Areas section: highlights weakest topics with quick-start button
- Mixed quiz button: tests all topics in the subject (interleaved)

**Key interfaces:**

- Subject page loads all topics for the subject from registry
- Aggregates progress data from useSpacedRepetition hook
- Topic cards navigate to topic hub pages
- Mixed quiz starts a ReviewSession with questions from all topics

## Acceptance criteria

- [ ] Subject page renders at `/imat/[subject]`
- [ ] Header shows subject name and exam weight
- [ ] Overall progress bar shows mastery % with weak/ok/strong counts
- [ ] Topic cards show progress %, note count, weak count for each topic
- [ ] Focus Areas highlights weakest topics
- [ ] Mixed quiz button starts interleaved quiz
- [ ] Page is mobile-responsive
- [ ] Integration test: progress updates when notes are reviewed

## Blocked by

Slice 1 (Route foundation)
Slice 2 (AtomicNote data model)
