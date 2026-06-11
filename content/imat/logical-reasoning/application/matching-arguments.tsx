import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "ma-qf-1",
    question:
      "Structure: 'All A are B. X is A. Therefore X is B.' Which argument matches? (A) All cats are mammals. Whiskers is a cat. Therefore Whiskers is a mammal. (B) All cats are mammals. Whiskers is a mammal. Therefore Whiskers is a cat.",
    answer:
      "(A) matches. (B) affirms the consequent — different (invalid) structure.",
    hint: "Don't match by topic (cats). Match by the logical skeleton.",
    context: "Abstracting structure",
  },
  {
    id: "ma-qf-2",
    question:
      "'Some doctors are surgeons. All surgeons operate. Therefore some doctors operate.' Does this match 'All A are B. Some B are C. Therefore some A are C'?",
    answer:
      'No — the quantifiers do not match. The original has "Some A are B. All B are C." vs "All A are B. Some B are C."',
    context: "Quantifier mismatch",
  },
  {
    id: "ma-qf-3",
    question:
      "'If a patient has pneumonia, they will have a fever. This patient has a fever. Therefore, this patient has pneumonia.' Is this argument valid or invalid? What is the structure?",
    answer:
      "Invalid. Structure: If P then Q. Q. Therefore P. This is 'affirming the consequent' — a formal fallacy.",
    context: "Formal fallacy identification",
  },
];

export const matchingArgumentsNote: AtomicNote = {
  slug: "matching-arguments",
  subject: "logical-reasoning",
  topic: "application",
  title: "Matching Arguments (Parallel Reasoning)",
  summary:
    "These questions ask you to find an argument with the same logical structure as the given one. Abstract the reasoning pattern and ignore surface content.",
  memoryHook:
    '"Strip the Skin, Keep the Bones" — remove topic content and look at the logical skeleton. Two arguments about medicine may have different structures.',
  imatTrap:
    "Do NOT match by topic — match by STRUCTURE. The quantifiers (all/some/none), direction of reasoning, and whether the argument is valid or invalid must all be identical.",
  whyItMatters:
    "Pattern recognition across domains is core to medical reasoning. A diagnostic pattern in cardiology may mirror one in neurology — recognising structural similarity transfers knowledge.",
  imatPatterns: [
    {
      years: [2022, 2023],
      frequency: "medium",
      notes: "Matching arguments appears regularly but not every year",
    },
    {
      years: [2024],
      frequency: "medium",
      notes: "IMAT 2024 had a parallel reasoning question with medical content",
    },
  ],
  workedExamples: [
    {
      id: "ma-we-1",
      question:
        "All nurses wear scrubs. Maria wears scrubs. Therefore, Maria is a nurse. Which argument has the SAME structure? (A) All cats have fur. Fido has fur. Therefore, Fido is a cat. (B) All cats are mammals. Fido is a cat. Therefore, Fido is a mammal. (C) Some nurses wear scrubs. Maria is a nurse. Therefore, Maria wears scrubs. Explain your reasoning.",
      hints: [
        "Abstract the original using variables. What is the pattern?",
        "Original: All A are B. X is B. Therefore X is A.",
        'This is "affirming the consequent" — INVALID.',
        "The matching argument must have the SAME invalid pattern, not a corrected valid version.",
      ],
      solution:
        '(A) matches. Structure: All A are B. X is B. Therefore X is A. Both commit the fallacy of affirming the consequent — just because all nurses wear scrubs does not mean everyone in scrubs is a nurse. (B) is VALID — All A are B. X is A. Therefore X is B. (modus ponens). (C) uses "some" instead of "all" — quantifier mismatch. The key insight: the original is FLAWED, and the matching argument must have the same flaw.',
    },
    {
      id: "ma-we-2",
      question:
        "If a patient has a heart attack, their troponin levels will be elevated. This patient has elevated troponin. Therefore, this patient had a heart attack. Abstract the structure. Create your OWN matching argument with different medical content that has the same structure and the same flaw.",
      hints: [
        "Abstract: If P then Q. Q. Therefore P.",
        "This is affirming the consequent — invalid because other things can cause elevated troponin.",
        "Your matching argument should use the same IfP→Q, Q, therefore P structure.",
        "Try diseases and symptoms, or drugs and side effects.",
      ],
      solution:
        "Structure: If P→Q, Q, therefore P (affirming the consequent, invalid). Matching example: 'If a patient has the flu, they will have a fever. This patient has a fever. Therefore, this patient has the flu.' Same flaw: many things cause fever besides flu (infection, inflammation, heat stroke). The IMAT loves testing this with medical content because it mirrors real diagnostic reasoning errors.",
    },
    {
      id: "ma-we-3",
      question:
        "Most doctors at this hospital are board-certified. Dr. Lee is a doctor at this hospital. Therefore, Dr. Lee is board-certified. A student says this matches: 'All birds can fly. Penguins are birds. Therefore, penguins can fly.' Is the student correct? If not, why?",
      hints: [
        "Compare the quantifiers in each argument carefully.",
        'The original uses "most" — what does that mean?',
        'The matching argument uses "all" — are these the same?',
        "Consider whether the conclusion necessarily follows in each case.",
      ],
      solution:
        "The student is NOT correct. The original uses 'most doctors' — 'most' does not guarantee anything about Dr. Lee specifically. The conclusion 'Dr. Lee is board-certified' does NOT necessarily follow (it might be true, but it's not guaranteed). The matching argument uses 'all birds' — if all birds can fly and penguins are birds, then penguins MUST be able to fly (but biologically they don't, making the premise false but the logic valid). The quantifiers 'most' and 'all' produce fundamentally different logical structures. Correct match would use 'most' in the first premise.",
    },
  ],
  externalResources: [
    {
      title: "LSAT Lab — Parallel Reasoning Questions",
      url: "https://www.lsatlab.com/logical-reasoning/parallel-reasoning/",
      type: "practice",
      description:
        "Drill parallel reasoning questions with detailed answer explanations",
    },
    {
      title: "7Sage — Parallel Reasoning",
      url: "https://7sage.com/lsat-logical-reasoning/",
      type: "video",
      description:
        "LSAT logic lessons including parallel reasoning identification",
    },
    {
      title: "Critical Thinking Web — Argument Forms",
      url: "https://philosophy.hku.hk/think/arg/",
      type: "article",
      description: "Exercises on identifying and matching argument structures",
    },
  ],
  highYieldPoints: [
    "Strip content — match the logical skeleton only",
    "Quantifiers (all/some/no/most) must match exactly",
    "If the original is flawed, match the FLAW, not a corrected version",
    'Direction matters: "All A are B" is not the same as "Some B are A"',
    "IF-THEN: check which form (valid or invalid) is used",
    "Valid forms: modus ponens (If P→Q, P, ∴ Q), modus tollens (If P→Q, not Q, ∴ not P)",
    "Invalid forms: affirming the consequent (If P→Q, Q, ∴ P), denying the antecedent (If P→Q, not P, ∴ not Q)",
  ],
  explanation: (
    <div>
      <p>
        <strong>Matching arguments</strong> questions present an argument and
        ask you to find another with the <strong>same logical structure</strong>
        . Content differs, but the reasoning pattern must be identical.
      </p>

      <h3>Step-by-Step Strategy</h3>
      <p>
        <strong>Identify structure:</strong> Label premises and conclusion and
        their relationship.
      </p>
      <p>
        <strong>Abstract the pattern:</strong> Replace content with variables
        (A, B, C).
      </p>
      <p>
        <strong>Check quantifiers:</strong> 'All' vs 'some' vs 'no' vs 'most'
        changes everything.
      </p>
      <p>
        <strong>Check validity:</strong> If the original is invalid, the match
        must be invalid with the same error.
      </p>
      <p>
        <strong>Match each answer:</strong> Apply the same abstraction. The one
        with the identical pattern is correct.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 1)}
        title="Quick Check: Abstracting Structure"
      />

      <h3>Worked Example: Identifying Valid vs Invalid Patterns</h3>
      <WorkedExampleCard
        example={{
          id: "ma-we-demo",
          question:
            "Classify each argument's structure and then find which two match: (1) All cardiologists are doctors. Dr. Smith is a cardiologist. Therefore, Dr. Smith is a doctor. (2) If a drug is teratogenic, it causes birth defects. This drug causes birth defects. Therefore, it is teratogenic. (3) All surgeons are doctors. Dr. Jones is a doctor. Therefore, Dr. Jones is a surgeon.",
          hints: [
            "Abstract (1): All A are B. X is A. Therefore X is B. — VALID (modus ponens).",
            "Abstract (2): If P then Q. Q. Therefore P. — INVALID (affirming the consequent).",
            "Abstract (3): All A are B. X is B. Therefore X is A. — INVALID (affirming the consequent).",
            "Which two share the same flaw?",
          ],
          solution:
            '(2) and (3) match — both are invalid (affirming the consequent). (1) is valid (modus ponens). Even though (3) uses "All" and (2) uses "If-Then," they both commit the same logical error: assuming that because the consequent is true, the antecedent must be true. This is exactly the kind of subtle match the IMAT tests.',
        }}
      />

      <QuickFire
        questions={quickFire.slice(1, 3)}
        title="Quick Check: Quantifiers & Fallacies"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Strip content — keep only the logical skeleton",
          "Quantifiers (all, some, no, most) must match exactly",
          "The argument may be flawed — match the FLAW, not a corrected version",
          "IF-THEN structures: check whether it is modus ponens, modus tollens, or a fallacy",
          'Direction matters: "All A are B" is not the same as "Some B are A"',
        ].map((point) => (
          <div
            key={point}
            className="flex items-start gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-2 mb-1"
          >
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">{point}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  questions: [
    {
      id: "matching-arguments-q1",
      type: "multiple-choice",
      prompt:
        'Which has the SAME structure as: "All nurses wear scrubs. Maria wears scrubs. Therefore, Maria is a nurse."',
      answer: '"All cats have fur. Fido has fur. Therefore, Fido is a cat."',
      explanation:
        "Both have the invalid structure: All A are B. X is B. Therefore X is A (affirming the consequent).",
      difficulty: "apply",
      options: [
        '"All cats have four legs. My dog has four legs. Therefore, my dog is a cat."',
        '"All cats have fur. Fido has fur. Therefore, Fido is a cat."',
        '"All cats are animals. Fido is an animal. Therefore, Fido is a cat."',
        '"Some cats are black. Fido is black. Therefore, Fido is a cat."',
      ],
    },
    {
      id: "matching-arguments-q2",
      type: "multiple-choice",
      prompt:
        "What is the FIRST step in solving a parallel reasoning question?",
      answer:
        "Identify and abstract the logical structure of the original argument",
      explanation:
        "You must understand the original argument's logical skeleton before comparing answer choices.",
      difficulty: "recall",
      options: [
        "Read all answer choices quickly",
        "Identify and abstract the logical structure of the original argument",
        "Eliminate choices about different topics",
        "Look for the same conclusion",
      ],
    },
    {
      id: "matching-arguments-q3",
      type: "multiple-choice",
      prompt:
        '"If a drug is effective, it will pass clinical trials. This drug passed clinical trials. Therefore, it is effective." This argument is:',
      answer: "Invalid — affirming the consequent",
      explanation:
        "The structure is If P→Q, Q, therefore P — affirming the consequent. Other factors (placebo, chance) could explain the trial results.",
      difficulty: "analyze",
      options: [
        "Valid — modus ponens",
        "Valid — modus tollens",
        "Invalid — affirming the consequent",
        "Invalid — denying the antecedent",
      ],
    },
  ],
  crosslinks: [
    "main-conclusion",
    "premises",
    "applying-principles",
    "reasoning-errors",
  ],
  prerequisites: ["main-conclusion", "premises"],
};
