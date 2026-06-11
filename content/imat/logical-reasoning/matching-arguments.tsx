"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "ma-qf-1",
    question:
      "Argument A: 'All cats are mammals. All mammals are vertebrates. Therefore, all cats are vertebrates.' Which has the same structure? (1) 'All doctors are professionals. All professionals have training. Therefore, all doctors have training.' (2) 'Some cats are black. All black things are dark. Therefore, some cats are dark.'",
    answer:
      "(1) has the same structure — both use 'All A are B. All B are C. Therefore all A are C.' Argument (2) uses 'Some A are B.'",
    context: "Syllogism matching",
  },
  {
    id: "ma-qf-2",
    question:
      "Argument: 'If it rains, the ground is wet. It rained. Therefore the ground is wet.' What is the logical structure?",
    answer: "Modus ponens: If P → Q, P, therefore Q.",
    context: "Modus ponens",
  },
  {
    id: "ma-qf-3",
    question:
      "True or false: Two arguments with the same logical structure can have completely different topics.",
    answer:
      "True. Logical structure is about the pattern of reasoning, not the subject matter. 'If P then Q' applies to rain, drugs, ethics, or anything.",
    context: "Structure vs topic",
  },
];

export const matchingArgumentsNote: AtomicNote = {
  slug: "matching-arguments",
  subject: "logical-reasoning",
  topic: "argument-structure",
  title: "Matching Arguments (Parallel Reasoning)",
  summary:
    "These questions ask which argument has the same logical structure as the given one. Ignore the topic entirely — focus only on the pattern of reasoning.",
  memoryHook:
    '"Same Shape, Different Story" — two arguments match if their logical skeleton is identical, even if one is about cats and the other about molecules.',
  imatTrap:
    "Arguments with the SAME topic but DIFFERENT structure are the #1 trap. 'This one is about doctors, and the original is about doctors too, so it must match.' Ignore the topic entirely.",
  whyItMatters:
    "Recognising argument patterns helps you evaluate whether reasoning is valid regardless of content. A flawed pattern is flawed whether applied to medicine or economics.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "medium",
      notes: "Parallel reasoning appears in most IMAT LR sections",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Often uses modus ponens/tollens and syllogism structures",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "ma-we-1",
      question:
        "Original: 'If a patient has appendicitis, they have abdominal pain. This patient has abdominal pain. Therefore, this patient has appendicitis.' Which argument has the SAME logical structure? (A) 'If a test is positive, the patient has the disease. This patient has the disease. Therefore, the test is positive.' (B) 'If a patient has pneumonia, they have a cough. This patient has a cough. Therefore, this patient has pneumonia.' (C) 'If a patient has appendicitis, they have abdominal pain. This patient does NOT have abdominal pain. Therefore, this patient does NOT have appendicitis.'",
      hints: [
        "The original is AFFIRMING THE CONSEQUENT: If P→Q, Q, therefore P. This is INVALID.",
        "Check (A): If P (positive test) → Q (disease). Q (disease). Therefore P (positive test). Same invalid form!",
        "Check (B): If P (pneumonia) → Q (cough). Q (cough). Therefore P (pneumonia). Same structure!",
        "Wait — (A) and (B) seem similar. Look more carefully at (A): 'If a test is positive, the patient has the disease. This patient HAS THE DISEASE. Therefore the test IS POSITIVE.' Yes, Q → P. Same invalid affirming the consequent.",
      ],
      solution:
        "Both (A) and (B) have the same structure (affirming the consequent: If P→Q, Q, therefore P). Wait — let me re-check (A): the conclusion says 'the test is positive' which is P, given Q (disease). So P→Q, Q, therefore P. Yes. But (A) has the roles of P and Q swapped in a confusing way. Actually, (A) says: If test positive (P) then disease (Q). This patient has disease (Q). Therefore test positive (P). That IS affirming the consequent. (B) says: If pneumonia (P) then cough (Q). Cough (Q). Therefore pneumonia (P). Also affirming the consequent. (C) is modus tollens (different structure). The IMAT trap: (A) sounds different because the terms are medical, but the structure is identical to (B). Both match the original. This is a high-difficulty question where two answers seem right — pick based on exact structural match.",
    },
    {
      id: "ma-we-2",
      question:
        "Original: 'All mammals have lungs. Whales are mammals. Therefore, whales have lungs.' Which argument matches? (A) 'All birds have feathers. Penguins are birds. Therefore, penguins have feathers.' (B) 'All mammals have lungs. Some mammals live in water. Therefore, some things with lungs live in water.' (C) 'Most mammals have lungs. Whales are mammals. Therefore, whales probably have lungs.'",
      hints: [
        "The original is a valid syllogism: All A are B. X is A. Therefore X is B.",
        "Check (A): All A (birds) are B (have feathers). X (penguins) is A. Therefore X is B. Same!",
        "Check (B): the middle statement has 'some' not 'all' — different quantifier, different structure.",
        "Check (C): premise uses 'most' not 'all' — this changes the logical certainty from deductive to probabilistic.",
      ],
      solution:
        "Only (A) matches exactly. Both are: All A are B. X is A. Therefore X is B. (B) uses 'some' in the second premise and has a different conclusion pattern. (C) changes 'all' to 'most,' which changes the argument from a deductively valid syllogism to a probabilistic inductive argument. The IMAT trap: (B) looks similar because it also involves mammals, but its structure is different. (C) is tempting because it sounds cautious, but it uses a different quantifier.",
    },
  ],
  externalResources: [
    {
      title: "LSAT Lab — Parallel Reasoning Questions",
      url: "https://www.lsatlab.com/logical-reasoning/parallel/",
      type: "practice",
      description:
        "Drill parallel reasoning questions with detailed explanations",
    },
    {
      title: "Khan Academy — LSAT Logical Reasoning",
      url: "https://www.khanacademy.org/test-prep/lsat",
      type: "video",
      description: "LSAT prep lessons on parallel reasoning",
    },
    {
      title: "Logic in Action — Argument Forms",
      url: "https://www.logicinaction.org/",
      type: "textbook",
      description:
        "Free logic textbook covering valid and invalid argument forms",
    },
  ],
  highYieldPoints: [
    "Ignore the TOPIC — focus only on logical structure",
    "Abstract the form: replace subjects with letters (X, Y, Z) to see the pattern",
    "Watch quantifiers: 'all' vs 'some' vs 'most' change the structure completely",
    "Conditional patterns: modus ponens (P→Q, P, therefore Q), modus tollens (P→Q, not Q, therefore not P)",
    "Invalid forms: affirming the consequent, denying the antecedent — these also have matching structures",
    "Same topic is a trap — the answer is almost never the one about the same subject",
  ],
  explanation: (
    <div>
      <p>
        <strong>Matching arguments (parallel reasoning)</strong> questions
        present an argument and ask which of the options has the same logical
        structure. The subject matter is a distractor — focus purely on the
        reasoning pattern.
      </p>

      <h3>How to Approach</h3>
      <p>
        <strong>Step 1:</strong> Abstract the original argument into symbols or
        a skeleton. Replace specific terms with variables (A, B, C or P, Q).
      </p>
      <p>
        <strong>Step 2:</strong> Do the same for each answer choice.
      </p>
      <p>
        <strong>Step 3:</strong> Find the choice with the identical symbolic
        structure.
      </p>

      <h3>Common Patterns</h3>
      <p>
        <strong>Syllogism:</strong> All A are B. X is A. Therefore X is B.
      </p>
      <p>
        <strong>Modus ponens:</strong> If P then Q. P. Therefore Q.
      </p>
      <p>
        <strong>Modus tollens:</strong> If P then Q. Not Q. Therefore not P.
      </p>
      <p>
        <strong>Invalid forms:</strong> Affirming the consequent, denying the
        antecedent — these also have matching structures.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 1)}
        title="Quick Check: Syllogism Matching"
      />

      <h3>Worked Example: Abstract and Match</h3>
      <WorkedExampleCard
        example={{
          id: "ma-we-demo",
          question:
            "Original: 'All surgeons at this hospital are board-certified. Dr. Lee is a surgeon at this hospital. Therefore, Dr. Lee is board-certified.' Which argument has the same structure? (A) 'All doctors in this clinic speak Italian. Mr. Rossi is a patient at this clinic. Therefore, Mr. Rossi speaks Italian.' (B) 'All board-certified surgeons have completed residency. Dr. Lee is board-certified. Therefore, Dr. Lee has completed residency.' (C) 'All students at this university pay tuition. Maria is a student at this university. Therefore, Maria pays tuition.'",
          hints: [
            "Abstract the original: All members of Group 1 (surgeons at this hospital) have Property A (board-certified). Person X (Dr. Lee) is in Group 1. Therefore Person X has Property A.",
            "(A): Group = 'doctors in this clinic' but conclusion is about a PATIENT (Mr. Rossi), not a doctor. Different structure!",
            "(B): Different — 'All A are B. Someone in B (board-certified). Therefore someone in B (board-certified) has Property C (completed residency).'",
            "(C): All members of Group (students at this university) have Property (pay tuition). Maria is in Group. Therefore Maria has Property. Identical!",
          ],
          solution:
            "(C) matches exactly. Both are: All members of Group X have Property Y. Person Z belongs to Group X. Therefore Person Z has Property Y. (A) is the trap — it looks similar but the conclusion is about a patient, not a doctor. The group membership shifted. (B) has a different structure entirely — the second premise refers to Property A (board-certified), not group membership.",
        }}
      />

      <QuickFire
        questions={quickFire.slice(1, 3)}
        title="Quick Check: Structure vs Topic"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Ignore the TOPIC — focus only on logical structure",
          "Abstract to symbols: replace subjects with letters",
          "Watch quantifiers: 'all' vs 'some' vs 'most' change structure",
          "Conditional patterns: modus ponens, modus tollens",
          "Invalid forms also have matching structures",
          "Same topic is a trap — it is almost never correct",
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
        "Original: 'All mammals are warm-blooded. Dogs are mammals. Therefore, dogs are warm-blooded.' Which has the SAME structure?",
      answer:
        "All metals conduct electricity. Copper is a metal. Therefore, copper conducts electricity.",
      explanation:
        "Both use: All A are B. X is A. Therefore X is B. The topic (mammals vs metals) is irrelevant.",
      difficulty: "recall",
      options: [
        "All mammals are warm-blooded. Some mammals live in water. Therefore, some warm-blooded animals live in water.",
        "All metals conduct electricity. Copper is a metal. Therefore, copper conducts electricity.",
        "Most mammals are warm-blooded. Dogs are mammals. Therefore, dogs are warm-blooded.",
        "All mammals are warm-blooded. Dogs are warm-blooded. Therefore, dogs are mammals.",
      ],
    },
    {
      id: "matching-arguments-q2",
      type: "multiple-choice",
      prompt:
        "Original: 'If the battery is dead, the car will not start. The car will not start. Therefore, the battery is dead.' What is the logical form?",
      answer: "Affirming the consequent (invalid): If P→Q, Q, therefore P",
      explanation:
        "The argument concludes P (dead battery) from Q (car not start). This is affirming the consequent — car could fail for other reasons.",
      difficulty: "apply",
      options: [
        "Modus ponens (valid)",
        "Modus tollens (valid)",
        "Affirming the consequent (invalid)",
        "Denying the antecedent (invalid)",
      ],
    },
    {
      id: "matching-arguments-q3",
      type: "multiple-choice",
      prompt:
        "Original: 'If a drug is approved by the FDA, it is safe. This drug is NOT safe. Therefore, it was NOT approved by the FDA.' Which matches?",
      answer:
        "If a student studies, they pass. This student did NOT pass. Therefore, this student did NOT study.",
      explanation:
        "Both use modus tollens: If P→Q, not Q, therefore not P. A valid deductive form.",
      difficulty: "apply",
      options: [
        "If a student studies, they pass. This student studied. Therefore, this student passed.",
        "If a student studies, they pass. This student did NOT pass. Therefore, this student did NOT study.",
        "If a student studies, they pass. This student passed. Therefore, this student studied.",
        "If a student studies, they pass. This student did NOT study. Therefore, this student will NOT pass.",
      ],
    },
    {
      id: "matching-arguments-q4",
      type: "multiple-choice",
      prompt:
        "Original: 'Some doctors are surgeons. All surgeons have steady hands. Therefore, some doctors have steady hands.' Which argument matches this structure?",
      answer:
        "Some birds are penguins. All penguins cannot fly. Therefore, some birds cannot fly.",
      explanation:
        "Both use: Some A are B. All B are C. Therefore some A are C. The 'some' quantifier in the first premise is essential.",
      difficulty: "analyze",
      options: [
        "All doctors have training. Some trained people are specialists. Therefore, some doctors are specialists.",
        "Some birds are penguins. All penguins cannot fly. Therefore, some birds cannot fly.",
        "Some doctors are surgeons. Some surgeons have steady hands. Therefore, some doctors have steady hands.",
        "All doctors are professionals. All professionals earn income. Therefore, all doctors earn income.",
      ],
    },
    {
      id: "matching-arguments-q5",
      type: "explain-why",
      prompt: "Why must you ignore the topic when matching arguments?",
      answer:
        "Two arguments about very different topics can have identical logical structures (e.g., 'All cats are mammals' and 'All atoms have electrons' both use the form 'All A are B'). Conversely, arguments about the same topic can have different structures. The IMAT traps students who focus on familiar topics instead of logical form.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["drawing-conclusion", "reasoning-errors", "applying-principles"],
  prerequisites: ["main-conclusion", "premises", "drawing-conclusion"],
};
