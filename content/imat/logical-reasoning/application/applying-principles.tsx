import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "ap-qf-1",
    question:
      "Principle: 'A treatment should only be given if its benefits outweigh its risks.' Should you give a drug with serious side effects for a mild, self-limiting condition?",
    answer:
      "No — risks outweigh benefits for a condition that resolves on its own.",
    hint: "Apply the principle mechanically. Don't think about what you'd do personally.",
    context: "Mechanical application",
  },
  {
    id: "ap-qf-2",
    question:
      "True or false: If a principle conflicts with your personal beliefs, you should still apply the given principle as stated.",
    answer:
      "True. The question tests whether you can apply THE GIVEN rule, not whether you agree with it.",
    context: "Personal beliefs vs principle",
  },
  {
    id: "ap-qf-3",
    question:
      "Principle: 'Do not lie to patients.' A doctor tells a patient 'this injection will feel like a pinch' when it will actually be painful. Does this violate the principle?",
    answer: `Yes — even a small deception is still lying. The principle does not have exceptions for 'minor' lies.`,
    context: "Strict application",
  },
];

export const applyingPrinciplesNote: AtomicNote = {
  slug: "applying-principles",
  subject: "logical-reasoning",
  topic: "application",
  title: "Applying Principles",
  summary:
    "These questions give a general principle and ask you to apply it to a specific case. The correct answer follows directly from the principle, even if it seems counterintuitive.",
  memoryHook:
    '"Rule First, Feelings Later" — accept the principle as given and apply it mechanically. Your personal opinion is irrelevant.',
  imatTrap:
    "Do NOT substitute your own principles for the one given. The question tests application of THE GIVEN rule. Also watch for answer choices that follow a SIMILAR but not identical principle — missing even one condition makes it wrong.",
  whyItMatters:
    "Medical ethics applies established principles (autonomy, beneficence, non-maleficence, justice) to specific cases. A doctor must apply guidelines consistently, even when personal feelings suggest otherwise.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "medium",
      notes: "Principle application often tests medical ethics scenarios",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Paired with matching arguments in the same section",
    },
  ],
  workedExamples: [
    {
      id: "ap-we-1",
      question:
        "Principle: 'A person should not be held responsible for actions they could not control.' Which scenario VIOLATES this principle? (A) A sleepwalker is prosecuted for damage caused while asleep. (B) A sober driver is fined for speeding. (C) A person with Tourette's is punished for involuntary tics in court. Explain each.",
      hints: [
        "Identify the condition: what makes an action uncontrollable?",
        "Check each scenario: could each person control their actions?",
        "A sleepwalker is unconscious — can they control their actions? What about tics?",
        "Note: (B) is the control case — a sober driver CAN control their speed.",
      ],
      solution:
        "(A) and (C) both violate the principle. Sleepwalking and Tourette's tics are involuntary — neither person can control their actions while unconscious or during a tic. (B) does NOT violate it — a sober driver CAN control their speed. Key lesson: violations occur when someone is punished for truly uncontrollable actions. The trap answer would include only (A) and exclude (C) because students forget about other involuntary conditions.",
    },
    {
      id: "ap-we-2",
      question:
        "Principle: 'If a patient is competent AND refuses treatment, their refusal must be respected even if it leads to harm.' A competent patient refuses a life-saving blood transfusion. A nurse says the patient should be treated anyway. A second nurse says the patient's family should decide. Who violates the principle and why?",
      hints: [
        "Check if BOTH conditions of the principle are met: is the patient competent? Do they refuse?",
        "The first nurse wants to treat despite refusal — does this respect the principle?",
        "The second nurse wants the family to decide — does the principle say anything about family input?",
      ],
      solution:
        "Both nurses violate the principle, but in different ways. The first nurse directly violates it by disregarding the patient's refusal. The second nurse also violates it by involving the family — the principle says the competent patient's refusal MUST be respected, not delegated. The principle has two conditions: (1) competent AND (2) refuses. Both are met. The conclusion (refusal must be respected) is absolute — no exceptions for 'best interest' or family involvement.",
    },
    {
      id: "ap-we-3",
      question:
        "Principle: 'A doctor should prescribe the most effective treatment available, regardless of cost.' A patient has condition X. Treatment A is 95% effective and costs 500. Treatment B is 94% effective and costs 50. The patient's insurance only covers B. A student says the doctor should prescribe B because of the cost constraint. Does this violate the principle?",
      hints: [
        "Read the principle carefully: does it mention any exceptions?",
        'The principle says "regardless of cost" — what does that tell you?',
        "Even if the insurance constraint is real, the principle says cost should not be considered.",
      ],
      solution:
        "Yes, prescribing B violates the principle. The principle explicitly says 'regardless of cost.' Treatment A is more effective. The fact that insurance only covers B is irrelevant to the principle as stated. In real medicine, cost constraints matter, but the IMAT tests whether you can apply THE GIVEN rule, not what is practically reasonable. The correct answer under the principle is to prescribe A.",
    },
  ],
  externalResources: [
    {
      title: "LSAT Lab — Principle Questions",
      url: "https://www.lsatlab.com/logical-reasoning/principle/",
      type: "practice",
      description:
        "Drill principle application questions with detailed explanations",
    },
    {
      title: "Khan Academy — LSAT Logical Reasoning",
      url: "https://www.khanacademy.org/test-prep/lsat",
      type: "video",
      description: "Free LSAT prep lessons on principle application",
    },
    {
      title: "Critical Thinking Web — Applying Rules",
      url: "https://philosophy.hku.hk/think/arg/",
      type: "article",
      description: "Exercises on applying general principles to specific cases",
    },
  ],
  highYieldPoints: [
    "Apply THE GIVEN principle, not your own beliefs",
    "Identify all conditions before checking scenarios — every condition must be met",
    "Near-misses with one missing condition are common IMAT traps",
    "Counterintuitive answers can be correct if they follow the principle",
    "Medical ethics principles (autonomy, beneficence, non-maleficence, justice) are common IMAT contexts",
    "If the conclusion feels wrong but follows from the principle, it is still correct",
  ],
  explanation: (
    <div>
      <p>
        <strong>Applying principles</strong> questions present a general rule
        and ask which scenario follows from it (or violates it). This tests
        moving from abstract to concrete reasoning.
      </p>

      <h3>Strategy</h3>
      <p>
        <strong>State the principle clearly:</strong> Rewrite it in your own
        words.
      </p>
      <p>
        <strong>Identify conditions:</strong> What must be true for the
        principle to apply?
      </p>
      <p>
        <strong>Check each answer:</strong> Does the scenario meet ALL
        conditions? Does the consequence follow?
      </p>
      <p>
        <strong>Eliminate near-misses:</strong> Answers meeting some but not all
        conditions are traps.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 1)}
        title="Quick Check: Mechanical Application"
      />

      <h3>Worked Example: Breaking Down Conditions</h3>
      <WorkedExampleCard
        example={{
          id: "ap-we-demo",
          question:
            "Principle: 'If a drug has been proven effective in at least two randomised controlled trials AND approved by the EMA, it should be added to the national formulary.' Drug X has one positive RCT and EMA approval. Drug Y has three positive RCTs but no EMA approval. Which drug should be added?",
          hints: [
            "Break down the principle into conditions: (1) at least 2 RCTs, (2) EMA approval. Both must be met.",
            "Drug X: meets condition 2 but not condition 1.",
            "Drug Y: meets condition 1 but not condition 2.",
            "What happens when BOTH conditions are not fully met?",
          ],
          solution: `Neither drug should be added under this principle. Drug X has only 1 RCT (fails condition 1). Drug Y has no EMA approval (fails condition 2). The principle requires BOTH conditions to be true simultaneously. This is a classic IMAT trap — students pick Drug Y because it 'seems more effective' with 3 RCTs, but without EMA approval, the condition is not met.`,
        }}
      />

      <QuickFire
        questions={quickFire.slice(1, 3)}
        title="Quick Check: Strict Application"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Apply THE GIVEN principle, not your own",
          "Identify all conditions before checking scenarios",
          "Near-misses with one missing condition are traps",
          "Counterintuitive answers can be correct if they follow the principle",
          "Medical ethics principles (autonomy, beneficence, etc.) are common IMAT contexts",
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
      id: "applying-principles-q1",
      type: "multiple-choice",
      prompt:
        "Principle: 'A person should not be held responsible for actions they could not control.' Which scenario VIOLATES this principle?",
      answer: "A sleepwalker is prosecuted for damage caused while asleep",
      explanation:
        "Sleepwalking is involuntary — the person cannot control their actions. Prosecuting them violates the principle.",
      difficulty: "apply",
      options: [
        "A sober driver is fined for speeding",
        "A sleepwalker is prosecuted for damage caused while asleep",
        "A student is praised for studying hard",
        "A company is taxed for its profits",
      ],
    },
    {
      id: "applying-principles-q2",
      type: "multiple-choice",
      prompt:
        "When applying a given principle, what should you do if it conflicts with your personal beliefs?",
      answer:
        "Apply the given principle as stated, regardless of personal beliefs",
      explanation:
        "The question tests your ability to apply THE GIVEN rule. Your personal agreement is irrelevant.",
      difficulty: "recall",
      options: [
        "Reject the principle and use your own",
        "Apply the given principle as stated, regardless of personal beliefs",
        "Choose the answer that matches both",
        "Skip the question",
      ],
    },
    {
      id: "applying-principles-q3",
      type: "multiple-choice",
      prompt:
        "Principle: 'Informed consent requires the patient to understand risks, benefits, and alternatives.' A patient signed a consent form without discussion. Is consent valid?",
      answer: "No — signing a form does not guarantee understanding",
      explanation:
        "The principle requires actual understanding, not just a signature. Without discussion, the conditions are not met.",
      difficulty: "analyze",
      options: [
        "Yes — the form is legally binding",
        "No — signing a form does not guarantee understanding",
        "Yes — the patient chose to sign",
        "No — forms are never valid consent",
      ],
    },
  ],
  crosslinks: ["matching-arguments", "reasoning-errors", "drawing-conclusion"],
  prerequisites: ["main-conclusion", "premises"],
};
