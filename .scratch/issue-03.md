## Parent

#73

## What to build

Implement the spaced repetition engine as a React hook with localStorage persistence. This handles tracking review history and calculating next review dates.

**End-to-end behavior:**

- `useSpacedRepetition()` hook that manages progress state
- localStorage persistence with `NoteProgress` type
- Functions: `getProgress(noteSlug)`, `recordReview(noteSlug, rating)`, `getDueNotes()`, `getWeakNotes()`, `getStreak()`
- Rating system: "forgot" (reset to 1 day), "fuzzy" (2.5x interval), "nailed" (4x interval)
- Calculate `nextReviewDate` based on rating and previous interval
- Track confidence level: weak/ok/strong based on recent reviews
- Calculate study streak (consecutive days with at least one review)

**Key interfaces:**

```ts
type NoteProgress = {
  noteSlug: string;
  lastReviewed: string; // ISO date
  confidence: "weak" | "ok" | "strong";
  nextReviewDate: string; // ISO date
  reviewCount: number;
  interval: number; // days
};

type SpacedRepetitionHook = {
  progress: Map<string, NoteProgress>;
  getProgress: (slug: string) => NoteProgress | undefined;
  recordReview: (slug: string, rating: "forgot" | "fuzzy" | "nailed") => void;
  getDueNotes: () => string[];
  getWeakNotes: () => string[];
  getStreak: () => number;
  getStats: () => {
    reviewed: number;
    weak: number;
    ok: number;
    strong: number;
  };
};
```

## Acceptance criteria

- [ ] `useSpacedRepetition` hook exists
- [ ] Progress persists to localStorage
- [ ] `recordReview` updates progress with correct interval calculation
- [ ] `getDueNotes` returns notes past their nextReviewDate
- [ ] `getWeakNotes` returns notes with "weak" confidence
- [ ] `getStreak` calculates consecutive review days correctly
- [ ] Interval calculations: forgot=1 day, fuzzy=2.5x, nailed=4x
- [ ] Unit tests for all interval calculations
- [ ] Unit tests for streak calculation
- [ ] Tests verify localStorage persistence

## Blocked by

None - can start immediately
