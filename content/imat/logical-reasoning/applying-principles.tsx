"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "ap-qf-1",
    question:
      "Principle: 'One should never lie.' Conclusion: 'So you should have told your friend the truth about the surprise party.' Is the principle being applied correctly?",
    answer:
      "Yes — the principle (never lie) directly applies to the situation (telling truth about a party). The application matches the principle.",
    context: "Direct application",
  },
  {
    id: "ap-qf-2",
    question:
      "Principle: 'Doctors should prioritise patient autonomy.' Situation: A patient refuses a life-saving transfusion. Does the principle support or oppose the patient's choice?",
    answer:
      "The principle SUPPORTS the patient's choice — autonomy means respecting patient decisions even when you disagree.",
    context: "Principle interpretation",
  },
  {
    id: "ap-qf-3",
    question:
      "True or false: In applying a principle, you should focus on whether the new situation has the SAME morally relevant features as the original.",
    answer:
      "True. The key is identifying relevant similarities and ignoring irrelevant differences.",
    context: "Relevant similarities",
  },
];

export const applyingPrinciplesNote: AtomicNote = {
  slug: "applying-principles",
  subject: "logical-reasoning",
  topic: "argument-structure",
  title: "Applying Principles",
  summary:
    "These questions test whether you can apply a general rule or principle to a specific situation. The correct answer is the one that follows logically from the principle without distortion.",
  memoryHook:
    '"Match the Features, Not the Words" — identify the principle\'s key features, then check which situation shares those same features.',
  imatTrap:
    "Do NOT pick an answer because it SOUNDS similar to the principle. Apply the principle's logical structure, not its wording. A situation involving doctors differs from one involving patients even if the principle seems to fit both.",
  whyItMatters:
    "Clinical ethics relies on applying general principles (beneficence, non-maleficence, autonomy) to specific cases. Knowing when a principle applies — and when it does not — is the essence of ethical reasoning.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "medium",
      notes: "Applying principles appears in most IMAT LR sections",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Often paired with ethical scenarios and medical contexts",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "ap-we-1",
      question:
        "Principle: 'A doctor should never disclose patient information to a third party without the patient's explicit consent, unless disclosing prevents imminent serious harm.' Which of the following situations is covered by this principle? (A) A doctor tells a patient's family about a terminal diagnosis because the family asks. (B) A doctor reports a patient's infectious disease to public health authorities, as required by law. (C) A doctor shares CT results with a radiologist for interpretation. Explain each.",
      hints: [
        "What are the key features of the principle? (1) no disclosure without consent, (2) exception for preventing imminent serious harm.",
        "(A): family asked — did the patient consent? Is this 'imminent serious harm'?",
        "(B): reporting to public health — is this about preventing harm to others?",
        "(C): sharing with radiologist — is this disclosure to a 'third party' in the sense the principle means?",
      ],
      solution:
        "(B) is covered by the exception — reporting infectious diseases prevents imminent serious harm to the public. (A) is NOT covered: the family asking does not constitute patient consent, and knowing about a terminal diagnosis is not 'preventing imminent harm.' (C) is the trickiest — sharing with a radiologist is part of the healthcare team, not 'disclosure to a third party' in the ordinary sense, but the principle does not explicitly make this exception. The IMAT wants you to apply the principle as written, not as you think it should work. The principle says 'without explicit consent' — and sharing with a radiologist is typically implied consent.",
    },
    {
      id: "ap-we-2",
      question:
        "Principle: 'Actions that maximise overall happiness are morally right.' A student argues that this principle justifies lying to a patient if the lie makes everyone happier. Is the student's application correct? What if the lie is discovered and causes loss of trust?",
      hints: [
        "The principle is a simple version of utilitarianism: maximise total happiness.",
        "Does the student's application correctly follow the principle's logic?",
        "Now consider: if the lie is discovered, does the calculation change?",
        "What does this reveal about applying principles to real situations?",
      ],
      solution:
        "The student's application is technically correct under the principle as stated — if lying produces more happiness than telling the truth, the principle says lie. However, this reveals a problem with the principle itself (it may justify bad actions). In practice, the student should consider SECOND-ORDER effects: if discovered, the lie reduces happiness more than the truth would have. The IMAT test: apply the principle faithfully, but also recognise that real-world applications often require considering consequences beyond the immediate situation.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — LSAT Logical Reasoning",
      url: "https://www.khanacademy.org/test-prep/lsat",
      type: "video",
      description:
        "LSAT prep lessons including principle application questions",
    },
    {
      title: "Critical Thinking Web — Applying Principles",
      url: "https://philosophy.hku.hk/think/arg/",
      type: "article",
      description: "Exercises on applying general rules to specific cases",
    },
  ],
  highYieldPoints: [
    "Identify the principle's KEY FEATURES before looking at answer choices",
    "Distinguish between the principle's wording and its logical structure",
    "Check: does the new situation share the RELEVANT features of the principle?",
    "Irrelevant similarities are traps — a medical scenario is not automatically covered by a medical principle",
    "Consider exceptions: does the principle have built-in conditions or limits?",
    "Apply the principle as WRITTEN, not as you think it should work",
  ],
  explanation: (
    <div>
      <p>
        <strong>Applying principles</strong> questions give you a general rule
        and ask which situation it covers, or test whether a specific
        application is correct.
      </p>

      <h3>Strategy</h3>
      <p>
        <strong>Step 1:</strong> Extract the principle's key features. What
        conditions trigger it? What exceptions exist?
      </p>
      <p>
        <strong>Step 2:</strong> For each option, check whether the situation
        shares those specific features.
      </p>
      <p>
        <strong>Step 3:</strong> Eliminate options that introduce irrelevant
        differences or missing features.
      </p>

      <h3>Common Traps</h3>
      <p>
        <strong>Matching wording, not logic:</strong> An option uses similar
        words but applies the principle incorrectly.
      </p>
      <p>
        <strong>Irrelevant similarities:</strong> Both involve doctors — but the
        principle is about consent, not about doctors.
      </p>
      <p>
        <strong>Conflating the principle with its justification:</strong> Why
        the principle exists is not the same as what it requires.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 1)}
        title="Quick Check: Direct Application"
      />

      <h3>Worked Example: Identifying Relevant Features</h3>
      <WorkedExampleCard
        example={{
          id: "ap-we-demo",
          question:
            "Principle: 'A person should not undergo significant risk of harm for the benefit of another person, unless the other person is their dependent child.' Which situation does this principle allow? (A) A father donates a kidney to his adult son. (B) A mother donates a kidney to her 5-year-old daughter. (C) A stranger donates a kidney to a patient she has never met.",
          hints: [
            "What are the key features? (1) significant risk of harm, (2) benefit of another, (3) exception for dependent child.",
            "(A): the son is an adult — is a 25-year-old a 'dependent child'?",
            "(B): a 5-year-old is clearly a dependent child — this likely satisfies the exception.",
            "(C): a stranger is not a dependent child — this is prohibited by the principle.",
          ],
          solution:
            "The principle allows (B) — the mother donating to her dependent young daughter fits the exception. (A) is debatable: an adult son may not be a 'dependent child.' (C) is clearly prohibited: a stranger is not a dependent child, so the principle says no. The IMAT tests whether you carefully read 'dependent child' vs just 'child' or 'family member.' An adult child is not necessarily a dependent child.",
        }}
      />

      <QuickFire
        questions={quickFire.slice(1, 3)}
        title="Quick Check: Principle & Features"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Identify the principle's KEY FEATURES before looking at answer choices",
          "Distinguish between wording and logical structure",
          "Check: does the new situation share the RELEVANT features?",
          "Irrelevant similarities are traps",
          "Apply the principle as WRITTEN, not as you think it should work",
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
        "Principle: 'Actions that cause net harm are wrong.' Which situation violates this principle?",
      answer:
        "A medication that causes severe side effects in 30% of patients to benefit 1%",
      explanation:
        "Net harm = more harm than good. The medication harms more patients than it helps, which violates the principle.",
      difficulty: "apply",
      options: [
        "A medication that causes severe side effects in 30% of patients to benefit 1%",
        "A medication that causes mild headaches in 5% of patients to benefit 80%",
        "A vaccine that prevents disease in 95% of recipients",
        "A surgery with a 2% mortality rate that saves 98% of patients",
      ],
    },
    {
      id: "applying-principles-q2",
      type: "multiple-choice",
      prompt:
        "When applying a principle to a new situation, what determines whether the principle applies?",
      answer:
        "Whether the new situation shares the morally relevant features of the principle",
      explanation:
        "Surface similarities do not matter — only the features that the principle identifies as relevant determine whether it applies.",
      difficulty: "recall",
      options: [
        "Whether the situation uses similar words to the principle",
        "Whether the new situation shares the morally relevant features of the principle",
        "Whether the situation involves the same profession",
        "Whether the principle is well-known",
      ],
    },
    {
      id: "applying-principles-q3",
      type: "multiple-choice",
      prompt:
        "Principle: 'A doctor should always obtain informed consent before a procedure.' Which scenario violates this?",
      answer:
        "A surgeon proceeds with an emergency amputation on an unconscious patient when consent cannot be obtained and delay would cause death",
      explanation:
        "This violates the principle as stated — but many medical ethics frameworks include an emergency exception. The IMAT tests whether you apply the principle literally or with reasonable exceptions.",
      difficulty: "analyze",
      options: [
        "A surgeon explains risks and benefits, and the patient signs a consent form",
        "A surgeon proceeds with an emergency amputation on an unconscious patient when consent cannot be obtained and delay would cause death",
        "A doctor discusses treatment options with the patient's family at the patient's request",
        "A nurse confirms a patient's consent before administering medication",
      ],
    },
    {
      id: "applying-principles-q4",
      type: "multiple-choice",
      prompt:
        "Principle: 'First, do no harm.' A doctor prescribes a painkiller that may cause addiction but relieves severe pain. Applying the principle strictly, this action is:",
      answer:
        "Potentially justified if the harm of addiction is less than the harm of untreated pain",
      explanation:
        "The principle requires balancing harms. The doctor must determine whether the harm of addiction risk outweighs the harm of unchecked pain. The principle does not prohibit all possible harm — it requires minimising net harm.",
      difficulty: "analyze",
      options: [
        "Always wrong because it could cause harm",
        "Always right because it relieves pain",
        "Potentially justified if the harm of addiction is less than the harm of untreated pain",
        "Neither — the principle does not apply to prescribing decisions",
      ],
    },
    {
      id: "applying-principles-q5",
      type: "explain-why",
      prompt:
        "Why can the same principle lead different people to different conclusions when applied to the same situation?",
      answer:
        "Principles are general and require interpretation. Different people may (1) identify different features as 'relevant,' (2) weigh conflicting principles differently, (3) disagree about empirical facts (e.g., whether a treatment actually works), or (4) disagree about what counts as 'harm' or 'benefit.' The principle alone does not uniquely determine the answer — it guides reasoning within a framework.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "main-conclusion",
    "premises",
    "assumptions",
    "matching-arguments",
  ],
  prerequisites: ["main-conclusion", "premises"],
};
