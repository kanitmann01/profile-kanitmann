## Parent

#73

## What to build

Define the TypeScript data model for atomic notes and create the content structure. This establishes the schema that all content files will follow.

**End-to-end behavior:**

- Define `AtomicNote` type with all fields: slug, subject, topic, title, summary, explanation (ReactNode), memoryHook, imatTrap, whyItMatters, diagram, questions[], crosslinks, prerequisites
- Define `Question` type with: id, type (multiple-choice/fill-blank/explain-why/true-false), prompt, answer, explanation, difficulty
- Define `Subject` and `Topic` types for navigation
- Create `content/imat/` directory structure
- Create a registry file that exports all notes for lookup

**Key interfaces:**

```ts
type AtomicNote = {
  slug: string;
  subject: Subject;
  topic: string;
  title: string;
  summary: string;
  explanation: ReactNode;
  memoryHook: string;
  imatTrap: string;
  whyItMatters: string;
  diagram?: {
    type: "svg" | "mermaid";
    data: ReactNode | string;
    caption: string;
  };
  questions: Question[];
  crosslinks: string[];
  prerequisites?: string[];
};

type Question = {
  id: string;
  type: "multiple-choice" | "fill-blank" | "explain-why" | "true-false";
  prompt: string;
  answer: string;
  explanation?: string;
  difficulty: "recall" | "apply" | "analyze";
};
```

## Acceptance criteria

- [ ] AtomicNote type defined with all fields
- [ ] Question type defined with all fields
- [ ] Subject enum/type defined (biology, chemistry, physics, mathematics, logical-reasoning, general-knowledge)
- [ ] Topic type defined
- [ ] `content/imat/` directory exists
- [ ] Registry file exports functions to get notes by slug, subject, topic
- [ ] Type tests verify structure correctness

## Blocked by

None - can start immediately
