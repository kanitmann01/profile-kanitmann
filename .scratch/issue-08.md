## Parent

#73

## What to build

Build the topic hub page that shows all atomic notes within a topic with concept map and progress indicators.

**End-to-end behavior:**

- Page at `/imat/[subject]/[topic]` shows the topic overview
- Header: breadcrumb (Subject > Topic), topic title, progress bar (overall mastery)
- Concept Map: visual node graph showing how subtopics relate (uses crosslinks from notes)
- Topic List: all atomic notes with confidence indicators (Strong=green, OK=yellow, Weak=red, —=not started)
- "Start Here" suggestion: if new, suggests first note; if started, suggests next weak area
- Practice button: mixed quiz of all notes in this topic

**Key interfaces:**

- Topic hub loads all notes for the topic from registry
- Concept Map renders nodes for each note, edges for crosslinks
- Confidence indicators pull from useSpacedRepetition hook
- "Start Here" logic: find first unstarted note, or weakest started note

## Acceptance criteria

- [ ] Topic hub renders at `/imat/[subject]/[topic]`
- [ ] Breadcrumb navigation works (Subject > Topic)
- [ ] Progress bar shows overall mastery for topic
- [ ] Concept Map renders visual node graph with crosslinks
- [ ] Topic List shows all notes with confidence indicators
- [ ] "Start Here" suggests appropriate starting note
- [ ] Practice button starts mixed quiz of topic notes
- [ ] Page is mobile-responsive
- [ ] Concept Map is interactive (clickable nodes)

## Blocked by

Slice 1 (Route foundation)
Slice 2 (AtomicNote data model)
