"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "assumptions-qf-1",
    question:
      "Apply the negation test: 'This drug worked in trials, so it will work in clinical practice.' What is the necessary assumption?",
    answer:
      "Trial conditions are similar enough to clinical practice. Negation: they are NOT similar — the argument collapses.",
    hint: "What must be true for the trial results to apply to real patients?",
    context: "Negation test practice",
  },
  {
    id: "assumptions-qf-2",
    question:
      "True or false: A sufficient assumption guarantees the conclusion. A necessary assumption is one that MUST be true for the argument to work.",
    answer:
      "True. IMAT usually tests NECESSARY assumptions — the minimum required for the argument to hold.",
    context: "Necessary vs sufficient",
  },
  {
    id: "assumptions-qf-3",
    question:
      "Negation test: 'Hospital A has lower mortality than Hospital B, so Hospital A provides better care.' Negate the assumption about patient populations. Does the argument survive?",
    answer:
      "Negation: 'Hospital A treats younger, healthier patients.' Argument collapses — the mortality difference could be due to patient mix, not care quality.",
    context: "Population assumption",
  },
];

export const assumptionsNote: AtomicNote = {
  slug: "assumptions",
  subject: "logical-reasoning",
  topic: "conclusion-types",
  title: "Identifying Assumptions",
  summary:
    "Assumptions are unstated premises necessary for the argument to work. Without them, the conclusion does not follow from the stated premises. The negation test is the key tool.",
  memoryHook:
    '"The Missing Link" — an assumption is the invisible bridge between evidence and conclusion. Remove it, and the argument collapses.',
  imatTrap:
    "Do NOT confuse sufficient assumptions (which guarantee the conclusion) with necessary assumptions (which MUST be true for the argument to work). IMAT usually asks for NECESSARY assumptions — the minimum the author must believe.",
  whyItMatters:
    "Every clinical trial has hidden assumptions: the sample is representative, confounders are controlled, the measurement tool is valid. Identifying these is core to evidence-based medicine.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Necessary assumption questions appear in most IMAT LR sections",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes:
        "Often paired with strengthen/weaken questions on the same passage",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "assumptions-we-1",
      question:
        "Students who eat breakfast score higher on tests. Therefore, eating breakfast causes better academic performance. A student says the assumption is 'students who eat breakfast are more motivated overall.' Is this a necessary assumption? Apply the negation test.",
      hints: [
        "What could explain both breakfast-eating AND higher scores without one causing the other?",
        "Think of confounding variables: sleep quality, socioeconomic status, study habits.",
        "Negate the candidate assumption: 'Students who eat breakfast are NOT more motivated.' Does the argument collapse?",
        "Try a broader candidate: 'No confounding variable explains both.' Negate that and compare.",
      ],
      solution:
        "The student is on the right track but 'more motivated' is too specific. The correct necessary assumption is broader: 'No confounding variable (socioeconomic status, sleep quality, study habits) explains both breakfast-eating AND higher test scores.' Negation: 'Students who eat breakfast differ in other ways from non-breakfast-eaters.' If true, the causal claim collapses — breakfast is correlated, not causal. The IMAT trap is picking a plausible-but-too-specific assumption when the argument needs a broader one.",
    },
    {
      id: "assumptions-we-2",
      question:
        "Hospital A has a lower mortality rate than Hospital B. Therefore, Hospital A provides better care. Apply the negation test to identify the necessary assumption. Then, create an alternative explanation for the mortality difference that would break the argument.",
      hints: [
        "What else could explain the difference in mortality rates besides quality of care?",
        "Think about patient populations — do all hospitals treat the same types of patients?",
        "Consider: case mix, severity of illness, age distribution, socioeconomic factors.",
      ],
      solution:
        "Necessary assumption: The patient populations are comparable (similar case mix, severity, demographics). Negation: 'Hospital A treats younger, healthier patients than Hospital B.' If true, the lower mortality rate could be due to patient differences, not care quality — the argument collapses. Alternative explanations: Hospital A is a specialised cardiac centre (lower expected mortality), Hospital B is a trauma centre (higher expected mortality), or Hospital A has more palliative care referrals that skew statistics.",
    },
    {
      id: "assumptions-we-3",
      question:
        "A pharmaceutical company claims: 'Our new diabetes drug lowered HbA1c by 2% in our study. Therefore, it is more effective than metformin.' Identify the hidden assumption. What if the study enrolled only patients with mild diabetes? Does this affect your analysis?",
      hints: [
        "What comparison is the argument making without explicitly saying so?",
        "Is there a control group mentioned? A comparison to metformin?",
        "What does 'more effective than metformin' require that the premises do not provide?",
        "Consider the study population: do mild-diabetes patients respond differently?",
      ],
      solution:
        "Key hidden assumption: The study's patient population and methods are comparable to metformin trials (apples-to-apples comparison). The argument compares its result (2% reduction) to metformin's known effect without a head-to-head trial. If the study enrolled only mild diabetics who respond better to any treatment, the 2% reduction might be due to patient selection, not drug superiority. This is a classic 'unstated comparison' assumption — the argument compares two things without stating that the comparison is fair.",
    },
  ],
  externalResources: [
    {
      title: "LSAT Lab — Necessary Assumption Questions",
      url: "https://www.lsatlab.com/logical-reasoning/necessary-assumption/",
      type: "practice",
      description:
        "Drill necessary assumption questions with detailed explanations",
    },
    {
      title: "7Sage — Assumption Questions",
      url: "https://7sage.com/lsat-logical-reasoning-lessons/",
      type: "video",
      description:
        "Comprehensive LSAT logical reasoning lessons on assumptions",
    },
    {
      title: "Critical Thinking Web — Hidden Assumptions",
      url: "https://philosophy.hku.hk/think/arg/",
      type: "article",
      description: "Exercises on identifying unstated premises and assumptions",
    },
  ],
  highYieldPoints: [
    "Necessary assumption: negate it and the argument collapses",
    "Negation test: the best tool for assumption questions",
    "Sufficient assumption: guarantees the conclusion (different, harder task — less common in IMAT)",
    "Common assumption types: causation (no confounders), generalisation (sample representative), analogy (relevant similarities), prediction (trends continue)",
    "Assumptions hide in the GAP between premises and conclusion",
    "Watch for unstated comparisons — the argument compares X to Y without establishing comparability",
  ],
  explanation: (
    <div>
      <p>
        An <strong>assumption</strong> is an unstated premise — something the
        author takes for granted but does not say. Every argument has them.
      </p>

      <h3>The Negation Test</h3>
      <p>
        To test if something is a <strong>necessary assumption</strong>, negate
        it. If the negation destroys the argument, it is a necessary assumption.
      </p>
      <p>
        Example: 'This drug worked in trials, so it will work in clinical
        practice.' Assumption: 'Trial conditions are similar to clinical
        practice.' Negation: 'Trial conditions are NOT similar to clinical
        practice.' → Argument collapses.
      </p>

      <h3>Common IMAT Assumption Types</h3>
      <p>
        <strong>Causation from correlation:</strong> Assumes no confounding
        variable explains the relationship.
      </p>
      <p>
        <strong>Generalisation:</strong> Assumes the sample is representative of
        the population.
      </p>
      <p>
        <strong>Analogy:</strong> Assumes two things are similar in relevant
        respects.
      </p>
      <p>
        <strong>Future prediction:</strong> Assumes current trends will
        continue.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 1)}
        title="Quick Check: Negation Test"
      />

      <h3>Worked Example: Applying the Negation Test</h3>
      <WorkedExampleCard
        example={{
          id: "assumptions-we-demo",
          question:
            "A study of 100 patients found that those who took Drug X had 30% fewer heart attacks. The researchers conclude: 'Drug X prevents heart attacks.' A critic says 'but the Drug X group also exercised more.' Is the critic identifying an assumption? Apply the negation test.",
          hints: [
            "What did the researchers assume about the two groups?",
            "Was exercise mentioned in the premises? Is it a confounder?",
            "Negate: 'The Drug X group did NOT exercise more.' Does the argument hold?",
            "Try: 'Both groups exercised equally.' What does this mean for the conclusion?",
          ],
          solution:
            "The critic is identifying a hidden assumption: the groups were comparable in exercise levels. Negation: 'The Drug X group exercised more.' If true, the heart attack reduction could be due to exercise, not Drug X — the argument collapses. The necessary assumption is 'no confounding variable (including exercise) explains the difference.' The original argument assumed what it should have proven: that Drug X (and not something else) caused the benefit.",
        }}
      />

      <QuickFire
        questions={quickFire.slice(1, 3)}
        title="Quick Check: Necessary vs Sufficient & Negation"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Necessary assumption: MUST be true for the argument to work",
          "Negation test: negate the candidate — if argument collapses, it is necessary",
          "Sufficient assumption: GUARANTEES the conclusion (harder, less common in IMAT)",
          "Common assumption types: causation, generalisation, analogy, prediction",
          "Look for the gap between premises and conclusion — that is where assumptions hide",
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
      id: "assumptions-q1",
      type: "multiple-choice",
      prompt:
        "A study finds that students who eat breakfast score higher on tests. The author concludes that eating breakfast causes better performance. What is the key assumption?",
      answer:
        "No other factor explains both breakfast-eating and higher scores",
      explanation:
        "The argument assumes causation from correlation. It must assume no confounding variable explains the relationship.",
      difficulty: "apply",
      options: [
        "All students eat breakfast",
        "No other factor explains both breakfast-eating and higher scores",
        "Test scores are the only measure of performance",
        "Breakfast is the cheapest meal",
      ],
    },
    {
      id: "assumptions-q2",
      type: "multiple-choice",
      prompt:
        "The negation test reveals that a statement is a necessary assumption if:",
      answer: "Negating it destroys the argument",
      explanation:
        "If the negation of a statement makes the argument fall apart, that statement is a necessary assumption.",
      difficulty: "recall",
      options: [
        "Negating it strengthens the argument",
        "Negating it destroys the argument",
        "Negating it has no effect",
        "Negating it creates a new assumption",
      ],
    },
    {
      id: "assumptions-q3",
      type: "multiple-choice",
      prompt:
        "A politician says 'Crime rates dropped after I took office, so my policies reduced crime.' What is the necessary assumption?",
      answer:
        "No other factor (economic conditions, policing changes, demographic shifts) caused the drop",
      explanation:
        "The argument assumes a causal connection. The necessary assumption is that the politician's policies, not other factors, caused the change.",
      difficulty: "apply",
      options: [
        "Crime was a major issue",
        "No other factor caused the crime drop",
        "All crime was eliminated",
        "The previous administration caused crime",
      ],
    },
    {
      id: "assumptions-q4",
      type: "multiple-choice",
      prompt:
        "A survey of 500 university students finds 80% support the new policy. The researcher concludes 'the public supports this policy.' What is the assumption?",
      answer:
        "University students are representative of the general population",
      explanation:
        "The sample (students) may not represent the broader population. This is a generalisation assumption.",
      difficulty: "apply",
      options: [
        "The survey was fair",
        "University students are representative of the general population",
        "500 people is a large sample",
        "The policy is popular among all age groups",
      ],
    },
    {
      id: "assumptions-q5",
      type: "explain-why",
      prompt:
        "How does identifying assumptions help in evaluating medical research?",
      answer:
        "Every clinical trial relies on assumptions: that the sample represents the target population, that confounders are controlled, that measurement tools are valid. Identifying these assumptions lets you assess whether the study's conclusions are justified. Unaddressed assumptions are the most common source of misleading research claims.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "main-conclusion",
    "premises",
    "additional-evidence",
    "reasoning-errors",
  ],
  prerequisites: ["main-conclusion", "premises"],
};
