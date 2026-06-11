"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "premises-qf-1",
    question:
      'How many premises? "Because the study was double-blind and had a large sample size, its results are reliable."',
    answer:
      "2 premises: (1) the study was double-blind, (2) it had a large sample size.",
    hint: "Count the reasons given after 'because'.",
    context: "Premise counting",
  },
  {
    id: "premises-qf-2",
    question:
      'Is "there are 7 billion people on Earth" a premise or background info if the argument is about healthcare funding?',
    answer:
      "Background info — it does not actively support the conclusion about funding. A premise must actively support the conclusion.",
    context: "Premise vs background",
  },
  {
    id: "premises-qf-3",
    question:
      "Apply the Because test to: 'Maria must be a doctor because she works at a hospital and wears a white coat.' What are the premises?",
    answer:
      "Two premises: (1) Maria works at a hospital, (2) Maria wears a white coat. Conclusion: Maria is a doctor.",
    context: "Because test",
  },
];

export const premisesNote: AtomicNote = {
  slug: "premises",
  subject: "logical-reasoning",
  topic: "argument-structure",
  title: "Identifying Premises",
  summary:
    "Premises are the evidence, reasons, or data that support the conclusion. They answer 'Why should I believe the conclusion?' Distinguish them from background information and counter-arguments.",
  memoryHook:
    '"Because Bridge" — premises are what the conclusion rests on. If you can put "because" between a premise and the conclusion and it makes sense, you have identified a premise.',
  imatTrap:
    "Background information and context are NOT premises. A premise must actively support the conclusion. Also: a counter-argument or concession is not a premise for the main conclusion.",
  whyItMatters:
    "Weak premises = weak conclusions. In evidence-based medicine, identifying the premises (clinical data, trial results) behind a diagnosis or treatment recommendation is the foundation of critical appraisal.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Premise identification is a prerequisite for most LR questions",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes:
        "Paired with assumption questions — identifying premises helps find gaps",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "premises-we-1",
      question:
        "The hospital has invested 2 million in new MRI equipment. Since the equipment reduces scan time by 40% and produces higher-resolution images, it will improve diagnostic accuracy. A student claims the 2 million investment is a premise. Is the student correct? Justify your answer.",
      hints: [
        "The word 'since' gives you a clue — what follows it are premises.",
        "Is the 2 million investment a reason for improved diagnostic accuracy, or just context?",
        "Ask: which statements directly support 'it will improve diagnostic accuracy'?",
      ],
      solution:
        "No. The premises are: (1) the equipment reduces scan time by 40%, (2) it produces higher-resolution images. Conclusion: it will improve diagnostic accuracy. The 2 million investment is BACKGROUND — it explains why the hospital bought it, but does not directly support the accuracy claim. This is a common IMAT trap: interesting context that looks like a premise.",
    },
    {
      id: "premises-we-2",
      question:
        "All doctors take the Hippocratic Oath. Maria is a doctor. Therefore, Maria has taken the Hippocratic Oath. Using the Because test, identify both premises. What happens if either premise is false?",
      hints: [
        "Apply the Because test: '[Conclusion] because [premise]'.",
        "Try: 'Maria has taken the Hippocratic Oath because...' what?",
        "There are two premises — can you find both? Consider what happens if Maria is not a doctor.",
      ],
      solution:
        "Premise 1: All doctors take the Hippocratic Oath. Premise 2: Maria is a doctor. The Because test: 'Maria has taken the Hippocratic Oath because she is a doctor AND all doctors take the oath.' If premise 2 is false (Maria is not a doctor), the conclusion does not follow. If premise 1 is false (some doctors do not take the oath), the conclusion also does not follow. Both premises are necessary.",
    },
    {
      id: "premises-we-3",
      question:
        "A newspaper headline says: 'Study of 50,000 patients finds that those who drink coffee live longer. Therefore, coffee increases lifespan.' A sceptic says: 'But coffee drinkers also tend to have higher incomes and better healthcare access.' Is the sceptic identifying premises or assumptions? Explain.",
      hints: [
        "The sceptic is not identifying what was said — they are pointing out what was NOT said.",
        "If the argument assumes coffee drinkers are like non-drinkers in all relevant ways, what type of statement is that?",
        "Distinguish: premises are stated, assumptions are unstated but necessary.",
      ],
      solution:
        "The sceptic is identifying an ASSUMPTION, not a premise. The stated premise is 'coffee drinkers live longer.' But the argument assumes that coffee drinkers and non-drinkers are comparable in other ways (income, healthcare access). If higher income (not coffee) explains longevity, the argument collapses. The sceptic is attacking a hidden assumption, not misidentifying a premise.",
    },
  ],
  externalResources: [
    {
      title: "Critical Thinker Academy — Premise Identification",
      url: "https://criticalthinkeracademy.com/courses/argument-analysis/",
      type: "video",
      description: "Video lectures on premises vs conclusions with exercises",
    },
    {
      title: "Logic in Action",
      url: "https://www.logicinaction.org/",
      type: "textbook",
      description: "Free logic textbook with premise identification exercises",
    },
    {
      title: "LSAT Lab — Premise Questions",
      url: "https://www.lsatlab.com/logical-reasoning/",
      type: "practice",
      description: "Drill premise identification in LSAT-style passages",
    },
  ],
  highYieldPoints: [
    "Premise indicators: because, since, given that, for, as",
    "Background info is NOT a premise — it must actively support the conclusion",
    "Factual premises = verifiable data; value premises = normative claims",
    "Unstated premises = assumptions",
    "The Because test: [Conclusion] because [premise] should read naturally",
    "Counter-arguments and concessions are NOT premises for the main conclusion",
    "A single sentence can contain multiple premises — watch for 'and'",
  ],
  explanation: (
    <div>
      <p>
        <strong>Premises</strong> are the building blocks of an argument — the
        statements that provide evidence or reasons to accept the conclusion.
      </p>

      <h3>How to Identify Premises</h3>
      <p>
        <strong>Premise indicators:</strong> because, since, given that, for,
        as, inasmuch as, due to the fact that, the reason is that.
      </p>
      <p>
        <strong>The 'Why?' test:</strong> Once you have the conclusion, ask 'Why
        does the author believe this?' The answers are the premises.
      </p>

      <h3>Types of Premises</h3>
      <p>
        <strong>Factual premises:</strong> Verifiable data — 'The patient's
        temperature is 39 degrees.'
      </p>
      <p>
        <strong>Value premises:</strong> Normative claims — 'Patient autonomy
        should be respected.'
      </p>
      <p>
        <strong>Assumption premises:</strong> Unstated but necessary.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 1)}
        title="Quick Check: Counting Premises"
      />

      <h3>Worked Example: Premise vs Background</h3>
      <WorkedExampleCard
        example={{
          id: "premises-we-demo",
          question:
            "After 20 years of research, scientists at Cambridge have developed a new drug. Since the drug targets cancer stem cells and has shown a 90% success rate in mice, it represents a breakthrough in cancer treatment. Identify the premises and the background information.",
          hints: [
            "Look for the word 'since' — it signals the premises.",
            "The first sentence gives context but does it directly support the breakthrough claim?",
            "How many premises are there after 'since'?",
          ],
          solution:
            "Premises: (1) the drug targets cancer stem cells, (2) it has shown 90% success in mice. Conclusion: it represents a breakthrough. Background information: 'After 20 years of research, scientists at Cambridge have developed a new drug' — this is interesting context but does not directly support the breakthrough claim.",
        }}
      />

      <QuickFire
        questions={quickFire.slice(1, 3)}
        title="Quick Check: Because Test"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Premise indicators: because, since, given that, for, as",
          "Background info is NOT a premise — it must actively support the conclusion",
          "Factual premises = verifiable data; value premises = normative claims",
          "Unstated premises = assumptions",
          "The Because test: [Conclusion] because [premise] should read naturally",
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
      id: "premises-q1",
      type: "multiple-choice",
      prompt:
        "Since regular exercise reduces stress and improves sleep quality, doctors should recommend exercise to patients with insomnia. How many explicit premises are there?",
      answer: "2",
      explanation:
        "Two premises: (1) exercise reduces stress, (2) exercise improves sleep quality. The conclusion is that doctors should recommend exercise.",
      difficulty: "apply",
      options: ["1", "2", "3", "4"],
    },
    {
      id: "premises-q2",
      type: "multiple-choice",
      prompt: "Which of the following is a premise indicator?",
      answer: "Given that",
      explanation:
        "'Given that' introduces a premise. 'Therefore,' 'thus,' and 'hence' are conclusion indicators.",
      difficulty: "recall",
      options: ["Therefore", "Thus", "Given that", "Hence"],
    },
    {
      id: "premises-q3",
      type: "multiple-choice",
      prompt:
        "The study had 10,000 participants. Since it was randomised and double-blind, its findings are reliable. Which statement is a premise?",
      answer: "It was randomised and double-blind",
      explanation:
        "The word 'since' introduces the premises (randomised + double-blind). The 10,000 participants is background context.",
      difficulty: "analyze",
      options: [
        "10,000 participants",
        "It was randomised and double-blind",
        "Both 10,000 participants and randomised/double-blind",
        "The findings are reliable",
      ],
    },
    {
      id: "premises-q4",
      type: "multiple-choice",
      prompt:
        "In the argument 'All birds have feathers. A penguin is a bird. Therefore, a penguin has feathers,' which statement is the conclusion?",
      answer: "A penguin has feathers",
      explanation:
        "The first two statements are premises (reasons given). The third follows logically and is the conclusion.",
      difficulty: "recall",
      options: [
        "All birds have feathers",
        "A penguin is a bird",
        "A penguin has feathers",
        "Penguins cannot fly",
      ],
    },
    {
      id: "premises-q5",
      type: "explain-why",
      prompt:
        "Why must you identify the conclusion before you can identify the premises?",
      answer:
        "Premises are defined as statements that support the conclusion. Without knowing which claim is being supported, you cannot determine which statements function as evidence. The conclusion-first approach is the only reliable method for mapping an argument.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["main-conclusion", "assumptions", "additional-evidence"],
  prerequisites: ["main-conclusion"],
};
