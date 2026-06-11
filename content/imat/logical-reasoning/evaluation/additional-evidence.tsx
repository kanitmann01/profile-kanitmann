"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "ae-qf-1",
    question:
      "Argument: 'Drug X patients recover faster, so Drug X is effective.' Would 'Drug X is expensive' strengthen or weaken?",
    answer:
      "Neither — cost is irrelevant to effectiveness. Classic trap: information that sounds related but does not affect the logic.",
    context: "Irrelevant info trap",
  },
  {
    id: "ae-qf-2",
    question:
      "Same argument: would 'a controlled trial showed Drug X patients recovered faster than placebo' strengthen it?",
    answer:
      "Yes — a controlled trial eliminates the alternative explanation that patients recovered on their own.",
    context: "Strengthening evidence",
  },
  {
    id: "ae-qf-3",
    question:
      "School introduces tutoring, test scores improve. 'Tutoring caused the improvement.' Would 'the school also reduced class sizes that year' weaken this?",
    answer:
      "Yes — it introduces an alternative explanation for the improvement, undermining the claim that tutoring alone caused the change.",
    context: "Alternative explanation",
  },
];

export const additionalEvidenceNote: AtomicNote = {
  slug: "additional-evidence",
  subject: "logical-reasoning",
  topic: "evaluation",
  title: "Additional Evidence (Strengthen/Weaken)",
  summary:
    "These questions ask what new information would strengthen or weaken an argument. The correct answer directly affects the link between premises and conclusion.",
  memoryHook:
    '"Bridge Builder vs. Bridge Wrecker" — strengthening reinforces the assumption bridge; weakening attacks it. Does it affect the LOGIC or just add background noise?',
  imatTrap:
    "Irrelevant information that SOUNDS impressive is the most common trap. A fact about the topic does not equal evidence that strengthens or weakens the specific argument.",
  whyItMatters:
    "Clinicians constantly evaluate new evidence — a new study, a patient's additional symptom, a novel treatment. Knowing what counts as relevant evidence is critical appraisal.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Strengthen/weaken questions appear in every IMAT LR section",
    },
    {
      years: [2021, 2024],
      frequency: "medium",
      notes:
        "Often paired with assumption identification — find the assumption, then attack it",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "ae-we-1",
      question:
        "City A built more bike lanes, and cycling increased by 30%. Therefore, building bike lanes causes more cycling. Which would MOST weaken? (A) City A also launched a cycling campaign at the same time. (B) Bike lanes are popular with cyclists. (C) City B, without new bike lanes, saw a 25% increase in cycling. Explain each.",
      hints: [
        "What is the key assumption? That bike lanes alone caused the increase.",
        "(A) provides an alternative explanation — the campaign could explain the increase.",
        "(B) is about popularity — does that challenge the causal claim? Popularity does not prove causation.",
        "(C) provides a comparison — if City B also increased without bike lanes, what does that suggest?",
      ],
      solution:
        "Both (A) and (C) weaken. (A) introduces an alternative cause — the cycling campaign could explain the increase. (C) is the strongest weakener — it shows cycling increased almost as much WITHOUT bike lanes, suggesting bike lanes were not the primary cause. (B) does not weaken — popularity of bike lanes does not challenge the causal claim. The IMAT often includes a tempting (B)-type answer that sounds relevant but is actually neutral. (C) is the strongest because it provides a direct comparison that undermines causation.",
    },
    {
      id: "ae-we-2",
      question:
        "Patients who take Drug X recover faster, so Drug X is effective. Which would MOST strengthen? (A) A controlled trial showed Drug X beats placebo. (B) Drug X has been on the market for 10 years. (C) 100,000 patients have taken Drug X. Rank these in order of strengthening power and explain.",
      hints: [
        "What would eliminate the possibility that patients recovered on their own?",
        "(A) compares Drug X to placebo — the gold standard for proving efficacy.",
        "(B) — does market longevity prove effectiveness? Homeopathic remedies have been sold for centuries.",
        "(C) — does a large number of users prove the drug works? Many people take ineffective supplements.",
      ],
      solution:
        "Ranking: (A) strongest, then (C) weak, (B) weakest/irrelevant. (A) strengthens the most — a controlled trial with a placebo group eliminates the alternative explanation that patients recovered naturally. (C) weakly strengthens — a large number of users makes the correlation more reliable, but does not prove causation (many people take ineffective things). (B) is essentially irrelevant; a drug can be sold for 10 years without being effective. The IMAT loves testing this — students pick (B) or (C) because they sound impressive, but only (A) addresses the causal gap.",
    },
    {
      id: "ae-we-3",
      question:
        "A study followed 50,000 people for 10 years and found that those who drank 2+ cups of coffee daily had 20% lower risk of liver disease. Headline: 'Coffee protects against liver disease.' A doctor says: 'But coffee drinkers also tend to have healthier diets and lower alcohol intake.' Does the doctor's statement strengthen, weaken, or neither? What additional evidence would definitively strengthen the claim?",
      hints: [
        "The doctor is identifying a potential confounding variable — healthier diet and lower alcohol could explain the lower liver disease risk.",
        "Does this alternative explanation strengthen or weaken the coffee claim?",
        "To definitively strengthen, what type of study would you need?",
      ],
      solution:
        "The doctor's statement WEAKENS the argument by introducing alternative explanations (diet, alcohol) that could account for the lower liver disease risk. The coffee-liver disease link might be spurious — coffee drinkers are healthier overall. To definitively strengthen, you would need a randomised controlled trial where one group drinks coffee and the control group does not, with all other factors (diet, exercise, alcohol) held constant. Alternatively, a study that statistically controls for these confounders. The IMAT trap: students think the doctor is agreeing (strengthening) when actually the doctor is undermining the causal claim.",
    },
  ],
  externalResources: [
    {
      title: "LSAT Lab — Strengthen/Weaken Questions",
      url: "https://www.lsatlab.com/logical-reasoning/strengthen-weaken/",
      type: "practice",
      description:
        "Drill strengthen and weaken questions with detailed explanations",
    },
    {
      title: "Khan Academy — LSAT Logical Reasoning",
      url: "https://www.khanacademy.org/test-prep/lsat",
      type: "video",
      description: "Free LSAT prep lessons on strengthen/weaken",
    },
    {
      title: "Critical Thinking Web — Evaluating Arguments",
      url: "https://philosophy.hku.hk/think/arg/",
      type: "article",
      description: "Exercises on strengthening and weakening arguments",
    },
  ],
  highYieldPoints: [
    "Identify the key assumption FIRST — it is the target for strengthening or weakening",
    "Strengthen: support the assumption, eliminate alternatives, add confirming evidence",
    "Weaken: attack the assumption, add alternative explanations, show gaps",
    "Irrelevant information is the #1 trap — does it actually affect the logic?",
    "Alternative explanations are the most powerful weakeners",
    "Controlled studies are the most powerful strengtheners",
    "Distinguish: correlation (interesting but weak) vs causation (requires controlled evidence)",
  ],
  explanation: (
    <div>
      <p>
        <strong>Strengthen/Weaken</strong> questions test your ability to
        evaluate arguments by introducing new information. Does it make the
        conclusion more likely (strengthen) or less likely (weaken)?
      </p>

      <h3>Strategy</h3>
      <p>
        <strong>Identify the key assumption</strong> — the link between premises
        and conclusion.
      </p>
      <p>
        <strong>Strengthen:</strong> Support the assumption, add confirming
        evidence, eliminate alternative explanations.
      </p>
      <p>
        <strong>Weaken:</strong> Attack the assumption, introduce alternative
        explanations, show the premises do not guarantee the conclusion.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 1)}
        title="Quick Check: Irrelevant Information"
      />

      <h3>Worked Example: The Controlled Trial Standard</h3>
      <WorkedExampleCard
        example={{
          id: "ae-we-demo",
          question:
            "A hospital introduces a new hand-washing protocol and infection rates drop from 8% to 4%. The hospital director says 'our new protocol halved infections.' What would MOST strengthen this claim? What would MOST weaken it?",
          hints: [
            "The key assumption: the new protocol caused the drop, not something else.",
            "Would a simultaneous staffing increase weaken or strengthen?",
            "What about comparing with another hospital that did not change protocols?",
            "A controlled study would be ideal — what would that look like here?",
          ],
          solution:
            "MOST STRENGTHEN: A controlled study comparing wards with vs without the new protocol, where other factors (staffing, patient mix) are identical. Alternatively, showing that infection rates remained stable in other hospitals during the same period. MOST WEAKEN: The hospital also hired more infection control nurses at the same time (alternative explanation), or seasonal infection rates typically drop during the study period (natural variation). The IMAT trap: students are impressed by 'halved infections' without considering what else changed.",
        }}
      />

      <QuickFire
        questions={quickFire.slice(1, 3)}
        title="Quick Check: Alternative Explanations"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Identify the key assumption FIRST — it is the target for strengthening or weakening",
          "Strengthen: support the assumption, eliminate alternatives, add confirming evidence",
          "Weaken: attack the assumption, add alternative explanations, show gaps",
          "Irrelevant information is the #1 trap — does it actually affect the logic?",
          "Alternative explanations are the most powerful weakeners",
          "Controlled studies are the most powerful strengtheners",
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
      id: "additional-evidence-q1",
      type: "multiple-choice",
      prompt:
        'Argument: "Patients who take Drug X recover faster, so Drug X is effective." Which would MOST strengthen this?',
      answer:
        "A controlled trial showed Drug X patients recovered faster than placebo",
      explanation:
        "A controlled trial eliminates the alternative explanation that patients recovered on their own.",
      difficulty: "apply",
      options: [
        "Drug X is expensive",
        "A controlled trial showed Drug X beats placebo",
        "Some patients prefer Drug X",
        "Drug X has been on the market for 10 years",
      ],
    },
    {
      id: "additional-evidence-q2",
      type: "multiple-choice",
      prompt:
        "The school introduced tutoring, and test scores improved. Therefore, tutoring caused the improvement. Which MOST weakens?",
      answer:
        "The school also reduced class sizes and hired more teachers that year",
      explanation:
        "This introduces alternative explanations for the improvement, undermining the causal claim.",
      difficulty: "apply",
      options: [
        "The tutoring programme was well-attended",
        "Test scores had been declining for years",
        "The school also reduced class sizes and hired more teachers",
        "Students enjoyed the tutoring sessions",
      ],
    },
    {
      id: "additional-evidence-q3",
      type: "multiple-choice",
      prompt:
        '"Many people who take Vitamin C do not get colds" as evidence for "Vitamin C prevents colds." Why is this weak?',
      answer:
        "Lacks a control group — many who do not take Vitamin C also do not get colds",
      explanation:
        "Without comparing rates between users and non-users, we cannot assess effectiveness.",
      difficulty: "analyze",
      options: [
        "Vitamin C cannot prevent colds",
        "Lacks a control group for comparison",
        "The sample is too large",
        "Vitamin C is water-soluble",
      ],
    },
    {
      id: "additional-evidence-q4",
      type: "multiple-choice",
      prompt:
        "Which type of evidence would STRENGTHEN the claim that a new study drug is effective?",
      answer: "A double-blind randomised controlled trial with a placebo group",
      explanation:
        "The RCT with blinding and placebo is the gold standard for eliminating bias and alternative explanations.",
      difficulty: "apply",
      options: [
        "Testimonials from satisfied patients",
        "A double-blind randomised controlled trial with a placebo group",
        "The drug being sold in many countries",
        "The drug being chemically similar to existing treatments",
      ],
    },
    {
      id: "additional-evidence-q5",
      type: "explain-why",
      prompt:
        "Why does introducing an alternative explanation weaken an argument more than showing a flaw in one of its premises?",
      answer:
        "An alternative explanation directly undermines the causal link between the stated cause and effect. A flawed premise weakens the argument but may still leave the conclusion plausible if other premises hold. Alternative explanations destroy the logical bridge entirely by showing that the observed effect could exist without the proposed cause.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["assumptions", "reasoning-errors", "premises"],
  prerequisites: ["main-conclusion", "premises", "assumptions"],
};
