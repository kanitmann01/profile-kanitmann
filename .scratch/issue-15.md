## Parent

#73

## What to build

Create 9 atomic note content files for "Reproduction and Inheritance" and "Inheritance and Environment" topics in Biology.

**End-to-end behavior:**

- Reproduction and Inheritance notes: hub, DNA Structure and Replication, The Genetic Code, Mendelian Genetics, Inheritance Patterns
- Inheritance and Environment notes: hub, plus any atomic notes needed
- Each note follows the AtomicNote type structure
- Content is rewritten for web — clearer explanations, better examples, IMAT-focused
- Each note has 2-3 active recall questions
- Mendelian Genetics should have interactive Punnett square
- DNA Structure note should integrate the DNA interactive component

**Key interfaces:**

- Each note exports an AtomicNote object
- Content uses React components for explanation (JSX)
- Interactive DNA component used in DNA Structure note

## Acceptance criteria

- [ ] 9 notes created across both topics
- [ ] Each note has complete AtomicNote structure
- [ ] Explanations are clear and IMAT-focused
- [ ] Each note has 2-3 active recall questions
- [ ] Each note has memory hook, IMAT trap, why it matters
- [ ] DNA Structure note integrates DNA interactive component
- [ ] Mendelian Genetics has Punnett square visualization
- [ ] Crosslinks connect related notes
- [ ] Content renders correctly on atomic note page

## Blocked by

Slice 5 (Atomic note page)
Slice 9 (Interactive Biology components)
