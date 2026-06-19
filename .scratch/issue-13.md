## Parent

#73

## What to build

Create 9 atomic note content files for the "Cell Biology" topic in Biology.

**End-to-end behavior:**

- Create notes for: Cell Biology (hub), Cell Theory, Cell Membrane Structure, Membrane Transport, Organelles, Cell Cycle, Mitosis, Meiosis, Prokaryotes vs Eukaryotes, Viruses
- Each note follows the AtomicNote type structure
- Content is rewritten for web — clearer explanations, better examples, IMAT-focused
- Each note has 2-3 active recall questions
- Mitosis and Meiosis notes integrate the interactive animation components
- Cell Membrane note integrates the interactive membrane component

**Key interfaces:**

- Each note exports an AtomicNote object
- Content uses React components for explanation (JSX)
- Interactive components are imported where applicable

## Acceptance criteria

- [ ] 9 notes created for Cell Biology topic
- [ ] Each note has complete AtomicNote structure
- [ ] Explanations are clear and IMAT-focused
- [ ] Each note has 2-3 active recall questions
- [ ] Each note has memory hook, IMAT trap, why it matters
- [ ] Mitosis note integrates mitosis interactive component
- [ ] Meiosis note integrates meiosis interactive component
- [ ] Cell Membrane note integrates membrane interactive component
- [ ] Crosslinks connect related notes
- [ ] Content renders correctly on atomic note page

## Blocked by

Slice 5 (Atomic note page)
Slice 9 (Interactive Biology components)
