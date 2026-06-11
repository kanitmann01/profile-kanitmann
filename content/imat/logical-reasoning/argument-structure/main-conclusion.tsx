"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "mc-qf-1",
    question:
      "Argument: 'The traffic was terrible. I missed my flight.' Insert 'therefore' before each sentence. Which becomes the conclusion?",
    answer:
      "The missed flight is the conclusion — it's what the traffic evidence supports.",
    hint: "Which statement could be the final point the author is driving at?",
    context: "Therefore test",
  },
  {
    id: "mc-qf-2",
    question:
      "True or false: 'A conclusion can appear at the beginning of an argument.'",
    answer:
      "True. The conclusion can appear ANYWHERE — beginning, middle, or end. Never assume it's always the last sentence.",
    context: "Conclusion placement",
  },
  {
    id: "mc-qf-3",
    question:
      "'Since the study was double-blind and randomised, its findings are reliable.' The word 'since' tells us what follows is a: (a) conclusion, (b) premise, (c) counter-argument",
    answer:
      "(b) premise. 'Since' is a premise indicator — it introduces evidence, not the main point.",
    context: "Premise vs conclusion",
  },
];

export const mainConclusionNote: AtomicNote = {
  slug: "main-conclusion",
  subject: "logical-reasoning",
  topic: "argument-structure",
  title: "Identifying the Main Conclusion",
  summary:
    "The main conclusion is the central claim the argument is trying to prove. Every other statement supports it. Misidentifying the conclusion causes every subsequent evaluation to fail.",
  memoryHook:
    '"Therefore Test" — insert "therefore" before each sentence. The one that reads naturally as the final takeaway is the conclusion.',
  imatTrap:
    "Do NOT confuse a restated premise with the conclusion. The conclusion is what the evidence points TO, not the evidence itself. Also: 'since' and 'because' introduce PREMISES, never the conclusion.",
  whyItMatters:
    "Every IMAT logical reasoning section tests your ability to find the conclusion first. Clinical reasoning also requires distinguishing evidence from the diagnostic conclusion.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes:
        "Main conclusion identification appears in nearly every IMAT LR section",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes:
        "Often paired with weaken/strengthen questions on the same passage",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "mc-we-1",
      question:
        "Regular exercise improves cardiovascular health. It also reduces stress and improves sleep quality. Employers who invest in workplace fitness programmes see lower absenteeism. Therefore, companies should subsidise gym memberships for employees. Identify the main conclusion. Which statements are premises? How do you know?",
      hints: [
        "Find the word 'therefore' — it signals the conclusion.",
        "Ask: why should companies subsidise gym memberships? The answer is in the earlier statements.",
        "Try the Why test on each statement: does this statement support another, or is it supported by others?",
      ],
      solution:
        "Conclusion: 'companies should subsidise gym memberships for employees.' The three preceding statements are all premises supporting this recommendation. 'Therefore' directly signals it. Alternative method: ask 'Why should companies subsidise? → Because exercise improves health, reduces stress, and lowers absenteeism.'",
    },
    {
      id: "mc-we-2",
      question:
        "Cigarette smoke contains tar and carbon monoxide. Since tar is carcinogenic and carbon monoxide reduces oxygen delivery, smoking causes both cancer and reduced exercise capacity. A student says the conclusion is 'cigarette smoke contains tar and carbon monoxide.' Is the student correct? If not, what is the actual conclusion?",
      hints: [
        "The word 'since' introduces premises, not the conclusion.",
        "Does 'cigarette smoke contains tar' support another claim, or is it the main point?",
        "What is the author ultimately trying to prove?",
      ],
      solution:
        "The student is wrong. 'Cigarette smoke contains tar' is a premise, not the conclusion. The word 'since' introduces it as evidence. The actual conclusion is 'smoking causes both cancer and reduced exercise capacity.' The premises (tar is carcinogenic, CO reduces oxygen delivery) support this claim. Trap: students often pick the first statement as the conclusion.",
    },
    {
      id: "mc-we-3",
      question:
        "Most doctors recommend the flu vaccine. However, some patients refuse it due to fear of side effects. Despite this, vaccination rates above 70% provide herd immunity. Therefore, public health campaigns should focus on addressing vaccine concerns. Which sentence is NOT a premise? What is the conclusion?",
      hints: [
        "Look for the word 'therefore' first — it points to the conclusion.",
        "The phrase 'however' introduces a contrasting point — is that a premise for the conclusion?",
        "'Despite this' connects to what follows — trace the logical flow.",
      ],
      solution:
        "Conclusion: 'public health campaigns should focus on addressing vaccine concerns.' The premises are: (1) most doctors recommend the vaccine, (2) some patients refuse due to fear, (3) 70%+ rates provide herd immunity. The first sentence could be mistaken for the conclusion, but it actually supports the recommendation about public health campaigns — making it a premise.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — LSAT Logical Reasoning",
      url: "https://www.khanacademy.org/test-prep/lsat/lessons-logical-reasoning",
      type: "video",
      description:
        "Free LSAT prep lessons on identifying conclusions — directly applicable to IMAT LR",
    },
    {
      title: "LSAT Lab — Main Point Questions",
      url: "https://www.lsatlab.com/logical-reasoning/main-point/",
      type: "practice",
      description: "Drill main conclusion questions with detailed explanations",
    },
    {
      title: "Critical Thinking Web — Argument Analysis",
      url: "https://philosophy.hku.hk/think/arg/",
      type: "article",
      description:
        "University of Hong Kong: argument structure basics with exercises",
    },
    {
      title: "7Sage — Logical Reasoning (Main Point)",
      url: "https://7sage.com/lsat-logical-reasoning-lessons/",
      type: "video",
      description:
        "LSAT logical reasoning lessons covering main point identification",
    },
  ],
  highYieldPoints: [
    "Find conclusion FIRST — everything else depends on it",
    "Conclusion indicators: therefore, thus, hence, so, consequently",
    "Premise indicators: because, since, given that, for, as",
    "Conclusion can be anywhere — never assume it's the last sentence",
    "A premise supports the conclusion; the conclusion does not support anything else in the argument",
    "The 'Therefore Test': insert 'therefore' before each statement — the one that reads naturally as the endpoint is the conclusion",
    "The 'Why Test': ask 'Why?' after each statement — if the passage answers it, that statement is a premise",
  ],
  explanation: (
    <div>
      <p>
        Every argument has a <strong>conclusion</strong> — the main point the
        author wants you to accept — and <strong>premises</strong> — the reasons
        given to support it. Your first task in any LR question is always: find
        the conclusion.
      </p>

      <h3>The Three Tests</h3>
      <p>
        <strong>Indicator words:</strong> therefore, thus, hence, so,
        consequently, it follows that, we can conclude that, which shows that.
      </p>
      <p>
        <strong>The 'Therefore' test:</strong> Place 'therefore' before each
        statement. The one that works as the logical endpoint is the conclusion.
      </p>
      <p>
        <strong>The 'Why?' test:</strong> For each statement, ask 'Why should I
        believe this?' If the answer is in the passage, the statement is a
        premise. If it answers no further question, it is the conclusion.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 1)}
        title="Quick Check: Therefore Test"
      />

      <h3>Worked Example: The Therefore Test</h3>
      <WorkedExampleCard
        example={{
          id: "mc-we-demo",
          question:
            "University tuition has risen 300% in 20 years. Meanwhile, graduate starting salaries have barely increased. Therefore, many graduates struggle with student debt. Apply the Therefore Test to confirm the conclusion.",
          hints: [
            "Read each sentence with 'therefore' in front.",
            "'Therefore university tuition has risen 300%' — does this make sense as a conclusion or background?",
            "'Therefore many graduates struggle with debt' — this reads naturally as the point being argued.",
          ],
          solution:
            "Apply 'therefore' before each: (1) 'Therefore university tuition has risen 300%.' — No, this is stated as fact. (2) 'Therefore graduate salaries have barely increased.' — Also factual background. (3) 'Therefore many graduates struggle with debt.' — Yes, this is what the author is trying to prove. The conclusion is the third sentence.",
        }}
      />

      <QuickFire
        questions={quickFire.slice(1, 3)}
        title="Quick Check: Indicator Words"
      />

      <h3>High-Yield Strategy</h3>
      <div>
        {[
          "Always find the conclusion FIRST before evaluating anything else",
          "Conclusion indicators: therefore, thus, hence, so, consequently",
          "Premise indicators: because, since, given that, for, as",
          "Conclusion can appear anywhere — beginning, middle, or end",
          "A statement that supports another statement is a premise, not the conclusion",
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
      id: "main-conclusion-q1",
      type: "multiple-choice",
      prompt:
        "All mammals have a neocortex. Humans are mammals. Therefore, humans have a neocortex. What is the main conclusion?",
      answer: "Humans have a neocortex",
      explanation:
        "The word 'therefore' signals the conclusion. The first two statements are premises.",
      difficulty: "recall",
      options: [
        "All mammals have a neocortex",
        "Humans are mammals",
        "Humans have a neocortex",
        "Mammals are humans",
      ],
    },
    {
      id: "main-conclusion-q2",
      type: "multiple-choice",
      prompt: "Which of the following is a conclusion indicator word?",
      answer: "Consequently",
      explanation:
        "'Consequently' signals the conclusion. 'Because,' 'since,' and 'given that' are premise indicators.",
      difficulty: "recall",
      options: ["Because", "Since", "Consequently", "Given that"],
    },
    {
      id: "main-conclusion-q3",
      type: "multiple-choice",
      prompt:
        "The patient has a fever and elevated WBC. Since these indicate infection, we should start antibiotics. What is the conclusion?",
      answer: "We should start antibiotics",
      explanation:
        "The conclusion is the recommendation to start antibiotics. The fever, elevated WBC, and the claim that these indicate infection are premises.",
      difficulty: "apply",
      options: [
        "The patient has a fever",
        "The patient has elevated WBC",
        "Fever and elevated WBC indicate infection",
        "We should start antibiotics",
      ],
    },
    {
      id: "main-conclusion-q4",
      type: "multiple-choice",
      prompt:
        "Since the new drug passed Phase III trials with significant results, and the FDA has fast-tracked its review, it will likely reach the market within 6 months. One student says the conclusion is about the FDA review. Another says it is about reaching the market. Who is correct?",
      answer:
        "The second student — the conclusion is that the drug will reach the market within 6 months",
      explanation:
        "The FDA fast-track review is given as a premise supporting why the drug will reach the market soon. 'Since' introduces both premises (passed trials, fast-tracked review), and the final clause is the conclusion.",
      difficulty: "analyze",
      options: [
        "Both students are partially correct",
        "The first student — the FDA fast-track is the conclusion",
        "The second student — the conclusion is that the drug will reach the market",
        "Neither — there is no conclusion, only premises",
      ],
    },
    {
      id: "main-conclusion-q5",
      type: "multiple-choice",
      prompt:
        "Which statement BEST describes the relationship between premises and the conclusion?",
      answer:
        "Premises support the conclusion; the conclusion does not support another claim in the same argument",
      explanation:
        "By definition, premises provide evidence for the conclusion. If a statement supports another statement, it is a premise, not the conclusion.",
      difficulty: "apply",
      options: [
        "The conclusion supports the premises",
        "Premises support the conclusion; the conclusion does not support another claim in the same argument",
        "They are interchangeable",
        "The conclusion always comes first",
      ],
    },
    {
      id: "main-conclusion-q6",
      type: "explain-why",
      prompt:
        "Why does misidentifying the conclusion cause every subsequent evaluation to fail?",
      answer:
        "All LR questions depend on correctly identifying what the argument is trying to prove. If you misidentify the conclusion, you will also misidentify premises, assumptions, and the effect of new evidence. Everything cascades from the conclusion.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["premises", "drawing-conclusion", "assumptions"],
  prerequisites: [],
};
