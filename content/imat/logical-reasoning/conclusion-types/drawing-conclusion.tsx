"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "dc-qf-1",
    question: "All birds have feathers. Penguins are birds. What MUST be true?",
    answer:
      "Penguins have feathers. Classic syllogism: All A are B. X is A. Therefore X is B.",
    hint: "This is a classic syllogism — apply the rule to the specific case.",
    context: "Syllogism practice",
  },
  {
    id: "dc-qf-2",
    question:
      "If a patient has meningitis, they have a stiff neck. The patient has a stiff neck. Does the patient MUST have meningitis?",
    answer:
      "No — affirming the consequent. The patient could have a stiff neck from other causes (injury, arthritis).",
    context: "Common fallacy",
  },
  {
    id: "dc-qf-3",
    question:
      "Some fruits are red. All red things are colourful. What MUST be true? (A) Some fruits are colourful. (B) All colourful things are fruits.",
    answer:
      "(A). If some fruits are red, and all red things are colourful, then those red fruits are colourful.",
    context: "Quantifier reasoning",
  },
];

export const drawingConclusionNote: AtomicNote = {
  slug: "drawing-conclusion",
  subject: "logical-reasoning",
  topic: "conclusion-types",
  title: "Drawing a Conclusion (Must Be True)",
  summary:
    "These questions ask what MUST be true based on the passage. The correct answer follows necessarily from the given information — it requires no outside knowledge or assumptions.",
  memoryHook:
    '"Must Be True, Not Could Be True" — the answer is what is GUARANTEED by the passage. If you need to add anything, it is wrong.',
  imatTrap:
    "The most dangerous wrong answers are PLAUSIBLE but not necessarily true. Just because something seems likely does not mean it MUST follow. Stick strictly to what the passage guarantees.",
  whyItMatters:
    "Drawing valid conclusions from data is fundamental to clinical reasoning. A positive test does not necessarily mean disease — you must reason within the given information, not beyond it.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Must-be-true questions appear in every IMAT LR section",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Often combined with quantifiers (all, some, none)",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "dc-we-1",
      question:
        "All surgeons at this hospital are board-certified. Some board-certified doctors specialise in paediatric surgery. Dr. Lee works at this hospital as a surgeon. Which of the following MUST be true? (A) Dr. Lee is board-certified. (B) Dr. Lee specialises in paediatric surgery. (C) Dr. Lee works with other surgeons. Explain why each answer is correct or incorrect.",
      hints: [
        "Apply the syllogism: All A (surgeons at this hospital) are B (board-certified). Dr. Lee is A.",
        "So Dr. Lee must be B. But what about paediatric surgery?",
        "The second premise says SOME board-certified doctors specialise in paediatrics — does 'some' include Dr. Lee?",
        "'Some' means at least one — it could be any board-certified doctor, not necessarily Dr. Lee.",
      ],
      solution:
        "Only (A) MUST be true. Dr. Lee is a surgeon at this hospital, and all such surgeons are board-certified. (B) is possible but not necessary — 'some' board-certified doctors specialise in paediatrics, but Dr. Lee might specialise in another field. 'Some' does not guarantee anything about any individual. (C) is also not necessarily true — the passage does not say anything about Dr. Lee working with other surgeons. The IMAT trap is assuming 'some' implies more than it does.",
    },
    {
      id: "dc-we-2",
      question:
        "If a drug is teratogenic, it cannot be prescribed during pregnancy. This drug CAN be prescribed during pregnancy. What must be true about the drug? Identify the valid deductive form being used.",
      hints: [
        "This is modus tollens: If P (teratogenic) then Q (cannot prescribe). Not Q (CAN prescribe). Therefore not P.",
        "The drug is prescribed during pregnancy, so it cannot be teratogenic.",
        "Be precise: what exactly must be true about the drug? Is it 'probably not teratogenic' or 'definitely not teratogenic'?",
      ],
      solution:
        "The drug is NOT teratogenic. Modus tollens: If P→Q, and not Q, then not P. The drug can be prescribed (not Q), so it cannot be teratogenic (not P). This is a VALID deductive inference — if the premises are true, the conclusion necessarily follows. Compare with affirming the consequent (If P→Q, Q, therefore P — INVALID). Modus tollens is one of the most tested valid forms in IMAT LR.",
    },
    {
      id: "dc-we-3",
      question:
        "A medical school admits students who either have top grades OR significant clinical experience (or both). Maria was admitted but does NOT have top grades. What MUST be true? Now, if the requirement changes to 'top grades AND significant experience,' and Maria was admitted but does NOT have top grades, what follows?",
      hints: [
        "First scenario: OR means at least one condition must be met. If grades are missing, what must be present?",
        "Second scenario: AND means both conditions must be met. If one is missing...",
        "The words 'or' and 'and' completely change what MUST be true.",
        "In the OR case: Maria could have both, but we know she must have at least one.",
      ],
      solution:
        "First scenario (OR): Maria MUST have significant clinical experience. Since OR means at least one condition is required, and she does NOT have top grades, she must have experience. Second scenario (AND): If Maria was admitted under AND rules but does NOT have top grades, either the information is contradictory, or the admission was an exception — nothing MUST be true based on the stated rule alone. This shows how changing logical connectors changes what follows necessarily.",
    },
  ],
  externalResources: [
    {
      title: "LSAT Lab — Must Be True Questions",
      url: "https://www.lsatlab.com/logical-reasoning/must-be-true/",
      type: "practice",
      description: "Drill must-be-true questions with detailed explanations",
    },
    {
      title: "Khan Academy — Deductive Reasoning",
      url: "https://www.khanacademy.org/test-prep/lsat",
      type: "video",
      description: "LSAT prep lessons on deductive reasoning patterns",
    },
    {
      title: "Logic in Action — Deductive Forms",
      url: "https://www.logicinaction.org/",
      type: "textbook",
      description:
        "Free logic textbook covering modus ponens, modus tollens, and syllogisms",
    },
  ],
  highYieldPoints: [
    "Modus ponens: If P→Q, P, therefore Q — VALID",
    "Modus tollens: If P→Q, not Q, therefore not P — VALID",
    "Affirming the consequent: If P→Q, Q, therefore P — INVALID",
    "Denying the antecedent: If P→Q, not P, therefore not Q — INVALID",
    "Syllogism: All A are B. X is A. Therefore X is B.",
    "'Some' means AT LEAST ONE — it does not guarantee anything about any specific individual",
    "OR = at least one condition; AND = both conditions",
  ],
  explanation: (
    <div>
      <p>
        <strong>Drawing a conclusion</strong> questions present facts or
        premises and ask what <strong>must logically follow</strong>. This is
        pure deductive reasoning.
      </p>

      <h3>Valid Deductive Patterns</h3>
      <p>
        <strong>Modus ponens:</strong> If P then Q. P. Therefore Q.
      </p>
      <p>
        <strong>Modus tollens:</strong> If P then Q. Not Q. Therefore not P.
      </p>
      <p>
        <strong>Syllogism:</strong> All A are B. All B are C. Therefore all A
        are C.
      </p>

      <h3>Rules</h3>
      <p>
        Stay within the passage — only use stated or necessarily implied
        information.
      </p>
      <p>
        'Some' does not mean 'all.' 'Many' does not mean 'most.' Extreme
        language ('always,' 'never') is usually wrong.
      </p>
      <p>Eliminate 'could be true' — the correct answer is NECESSARILY true.</p>

      <QuickFire
        questions={quickFire.slice(0, 1)}
        title="Quick Check: Syllogism"
      />

      <h3>Worked Example: Modus Tollens in Practice</h3>
      <WorkedExampleCard
        example={{
          id: "dc-we-demo",
          question:
            "If a patient has anaphylaxis, they will have difficulty breathing and low blood pressure. A patient arrives in the ER with normal blood pressure and no breathing difficulty. What MUST be true? Which deductive form is this?",
          hints: [
            "Identify the conditional: If P (anaphylaxis) then Q (difficulty breathing AND low BP).",
            "What do we know? Not Q (no breathing difficulty AND normal BP).",
            "This is modus tollens: not Q, therefore not P.",
            "But what if the patient has one symptom but not the other?",
          ],
          solution:
            "The patient does NOT have anaphylaxis. This is modus tollens: If P→Q, not Q, therefore not P. The premise says anaphylaxis causes BOTH symptoms (difficulty breathing AND low BP). Since neither symptom is present, anaphylaxis is ruled out. Tricky case: if the patient had difficulty breathing but NORMAL blood pressure, we could NOT rule out anaphylaxis — the premise says BOTH must be present, but it does not say these are the only symptoms. The absence of one symptom does not guarantee absence of the condition when dealing with complex presentations.",
        }}
      />

      <QuickFire
        questions={quickFire.slice(1, 3)}
        title="Quick Check: Invalid Reasoning"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Modus ponens: If P→Q, P, therefore Q",
          "Modus tollens: If P→Q, not Q, therefore not P",
          "Syllogism: All A are B. X is A. Therefore X is B.",
          "Avoid affirming the consequent (If P→Q, Q, therefore P — INVALID)",
          "Avoid denying the antecedent (If P→Q, not P, therefore not Q — INVALID)",
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
      id: "drawing-conclusion-q1",
      type: "multiple-choice",
      prompt:
        "If all antibiotics target bacteria, and penicillin is an antibiotic, what MUST be true?",
      answer: "Penicillin targets bacteria",
      explanation:
        "Syllogism: All A (antibiotics) target B (bacteria). Penicillin is A. Therefore penicillin targets B.",
      difficulty: "recall",
      options: [
        "Penicillin targets bacteria",
        "All bacteria are killed by penicillin",
        "Penicillin is the best antibiotic",
        "Bacteria cannot resist penicillin",
      ],
    },
    {
      id: "drawing-conclusion-q2",
      type: "multiple-choice",
      prompt:
        "Some doctors specialise in cardiology. All cardiologists complete a fellowship. What MUST be true?",
      answer: "Some doctors complete a fellowship",
      explanation:
        "Since some doctors are cardiologists, and all cardiologists complete fellowships, those doctors must complete fellowships. But not all doctors.",
      difficulty: "apply",
      options: [
        "All doctors complete a fellowship",
        "Some doctors complete a fellowship",
        "No GP has completed a fellowship",
        "All fellowship graduates are cardiologists",
      ],
    },
    {
      id: "drawing-conclusion-q3",
      type: "multiple-choice",
      prompt:
        "'If it rains, the ground is wet. The ground is wet. Therefore it rained.' Why is this invalid?",
      answer: "The ground could be wet for other reasons (sprinklers, dew)",
      explanation:
        "This is affirming the consequent — an invalid form. The valid form is modus ponens (If P then Q, P, therefore Q).",
      difficulty: "analyze",
      options: [
        "The ground could be wet for other reasons",
        "It did not actually rain",
        "The argument is valid",
        "The conclusion is too vague",
      ],
    },
    {
      id: "drawing-conclusion-q4",
      type: "multiple-choice",
      prompt:
        "All mammals are warm-blooded. Whales are mammals. What conclusion necessarily follows?",
      answer: "Whales are warm-blooded",
      explanation:
        "Standard syllogism: All A are B. X is A. Therefore X is B. Whales inherit the property of all mammals.",
      difficulty: "recall",
      options: [
        "All warm-blooded animals are whales",
        "Whales are warm-blooded",
        "Whales are the only warm-blooded sea animals",
        "All mammals live in water",
      ],
    },
    {
      id: "drawing-conclusion-q5",
      type: "explain-why",
      prompt:
        "Why is affirming the consequent a logical error in medical diagnosis?",
      answer:
        "If disease D causes symptom S (D→S), and a patient has symptom S, concluding D is present is affirming the consequent. Many diseases share symptoms. A patient with fever could have infection, inflammation, or cancer. Symptoms can have multiple causes, so the presence of S does not guarantee D. Good clinicians gather multiple data points before concluding.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "main-conclusion",
    "assumptions",
    "reasoning-errors",
    "matching-arguments",
  ],
  prerequisites: ["main-conclusion", "premises"],
};
