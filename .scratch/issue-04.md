## Parent

#73

## What to build

Build the interactive quiz and review UI components. These are the core learning interaction components used on atomic note pages.

**End-to-end behavior:**

- `QuizCard` component: renders a question with appropriate input (multiple choice buttons, fill-blank input, true/false toggle, explain-why textarea)
- Instant feedback: shows correct/incorrect with explanation after answering
- `ReviewSession` component: wraps multiple QuizCards with progress tracking
- `ConfidenceMeter` component: visual indicator showing weak/ok/strong status
- 3-button review UI: "Forgot" / "Fuzzy" / "Nailed it" buttons for spaced repetition rating
- All components are mobile-first with large tap targets

**Key interfaces:**

- QuizCard accepts a Question prop and an onAnswer callback
- ReviewSession accepts an array of Questions and tracks score
- ConfidenceMeter accepts a confidence level and renders a colored indicator
- Review buttons call the spaced repetition hook's recordReview function

## Acceptance criteria

- [ ] QuizCard renders all 4 question types correctly
- [ ] QuizCard shows instant feedback (correct/incorrect + explanation)
- [ ] QuizCard has large tap targets (min 44px) for mobile
- [ ] ReviewSession tracks progress through multiple questions
- [ ] ReviewSession shows score summary at end
- [ ] ConfidenceMeter shows weak (red), ok (yellow), strong (green) states
- [ ] 3-button review UI (Forgot/Fuzzy/Nailed) renders with proper styling
- [ ] Review buttons trigger spaced repetition hook
- [ ] All components have Framer Motion animations for feedback
- [ ] Component tests for all question types
- [ ] Component tests for review button interactions

## Blocked by

Slice 2 (AtomicNote data model)
