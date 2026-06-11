"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "nr-qf-1",
    question: "A drug costs 80. It increases by 15%. What is the new price?",
    answer: "92. 15% of 80 = 12. 80 + 12 = 92.",
    context: "Percentage increase",
  },
  {
    id: "nr-qf-2",
    question:
      "A price increases by 20%, then decreases by 20%. Is the final price the same as the original?",
    answer:
      "No — 4% lower. 100 → 120 (+20%) → 96 (-20% of 120). A common IMAT trap.",
    context: "Consecutive percentages",
  },
  {
    id: "nr-qf-3",
    question: "An IV drip delivers 60 mL/hour. How long to deliver 240 mL?",
    answer: "4 hours. Time = volume / rate = 240 / 60 = 4 hours.",
    context: "Rate calculation",
  },
];

export const numericalReasoningNote: AtomicNote = {
  slug: "numerical-reasoning",
  subject: "logical-reasoning",
  topic: "problem-solving",
  title: "Numerical Reasoning",
  summary:
    "Word problems using arithmetic, ratios, percentages, and basic algebra. Speed and accuracy with mental maths are key advantages in the IMAT.",
  memoryHook:
    '"READ – PLAN – SOLVE – CHECK" — Read what is asked, Plan the calculation, Solve step by step, Check if the answer is reasonable.',
  imatTrap:
    "Watch for: unit conversions (mg to g, mL to L), percentage traps (50% increase then 50% decrease does not equal original), and irrelevant distracting information.",
  whyItMatters:
    "Dosage calculations, dilution problems, and lab value interpretation all require numerical reasoning. A 10-fold drug error can be fatal.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Percentage change and ratio questions appear every year",
    },
    {
      years: [2021, 2024],
      frequency: "medium",
      notes: "Unit conversion problems (mg/g, mL/L) are common",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "nr-we-1",
      question:
        "A hospital has a doctor-to-nurse ratio of 1:4. If the hospital employs 120 medical staff (doctors and nurses only), how many doctors are there? Create a general formula for ratio problems of this type.",
      hints: [
        "Ratio 1:4 means for every 5 staff, 1 is a doctor.",
        "Divide the total by the sum of ratio parts (1 + 4 = 5).",
        "Then multiply by the doctor's share (1). General formula: (part / total parts) x total.",
      ],
      solution:
        "Total parts = 1 + 4 = 5. Each part = 120 / 5 = 24. Doctors = 1 part = 24. Nurses = 4 parts = 96. Check: 24:96 simplifies to 1:4. General formula: (individual part / sum of all parts) x total. For this type: target group = (group ratio / sum of ratios) x total. Works for any ratio problem on the IMAT.",
    },
    {
      id: "nr-we-2",
      question:
        "A drug's price increases by 20% one year, then decreases by 20% the next year. What is the net percentage change from the original price? What if it decreased by 20% first, then increased by 20%? Is the result different? Generalise the rule.",
      hints: [
        "Pick 100 as a starting number to make it concrete.",
        "After 20% increase: 100 x 1.20 = 120.",
        "After 20% DECREASE: 120 x 0.80 = 96. NOT 100!",
        "Try the reverse: 100 → 80 (decrease) → 96 (increase). Same result! Why?",
      ],
      solution:
        "Net change = -4% regardless of order. Original: 100. Increase then decrease: 100 x 1.20 = 120, 120 x 0.80 = 96. Decrease then increase: 100 x 0.80 = 80, 80 x 1.20 = 96. Same result! Rule: a p% increase followed by a p% decrease (or vice versa) ALWAYS yields a net loss of (p^2 / 100)%. Here: (20^2 / 100)% = 4% loss. This applies to any symmetrical percentage pair (e.g., 10% then -10% = 1% loss, 50% then -50% = 25% loss). The IMAT loves this.",
    },
    {
      id: "nr-we-3",
      question:
        "A medication is supplied as 50 mg/mL. A patient needs 75 mg. How many mL should be administered? The prescription says 75 mg and the stock solution is 50 mg/5 mL. Now how many mL? Calculate both and explain why reading the label carefully matters.",
      hints: [
        "First scenario: concentration = 50 mg per 1 mL. Set up proportion: 50 mg / 1 mL = 75 mg / x mL.",
        "Second scenario: 50 mg per 5 mL means concentration = 10 mg/mL. NOT 50 mg/mL!",
        "Always check: is the concentration given per 1 mL or per multiple mL? This is a classic IMAT drug calculation trap.",
      ],
      solution:
        "Scenario 1: 50 mg per 1 mL. Volume = 75 / 50 = 1.5 mL. Scenario 2: 50 mg per 5 mL = 10 mg/mL. Volume = 75 / 10 = 7.5 mL. The difference is 5-fold! Many students misread '50 mg/5 mL' as '50 mg/mL' and give the wrong answer. IMAT trap: the concentration format (mg per 1 mL vs mg per several mL) changes the answer completely. Always express as a unit ratio: X mg per 1 mL.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Ratios, Rates, Proportions",
      url: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-ratios-rates",
      type: "video",
      description: "Free maths lessons on ratios and percentages",
    },
    {
      title: "Math is Fun — Percentages",
      url: "https://www.mathsisfun.com/percentage.html",
      type: "article",
      description:
        "Clear explanations of percentage calculations with examples",
    },
    {
      title: "LSAT Lab — Numerical Reasoning",
      url: "https://www.lsatlab.com/logical-reasoning/",
      type: "practice",
      description: "LSAT-style numerical reasoning practice",
    },
  ],
  highYieldPoints: [
    "Use the READ-PLAN-SOLVE-CHECK method every time",
    "Convert all units to the same system before calculating",
    "Consecutive % changes do NOT cancel out — apply them sequentially in order",
    "A p% increase then p% decrease always gives a net loss of (p^2 / 100)%",
    "Set up the formula BEFORE plugging in numbers, not after",
    "Sanity check: is the answer reasonable? A drug dose of 500 mL for an injection is probably wrong",
    "Check units: mg per 1 mL vs mg per 5 mL — read concentration carefully",
  ],
  explanation: (
    <div>
      <p>
        Numerical reasoning tests{" "}
        <strong>
          percentages, ratios, rates, proportions, and basic algebra
        </strong>{" "}
        in word problems.
      </p>

      <h3>Common Question Types</h3>
      <p>
        <strong>Percentage change:</strong> (new - original) / original x 100.
      </p>
      <p>
        <strong>Ratios:</strong> Set up a proportion: a / b = x / y.
      </p>
      <p>
        <strong>Rates:</strong> Total / rate = time.
      </p>
      <p>
        <strong>Unit conversions:</strong> Convert everything to the same unit
        first.
      </p>

      <h3>Strategy</h3>
      <p>
        Identify what is asked — underline the question. Extract relevant
        numbers, cross out distractors. Set up the formula before calculating.
        Sanity check: does the answer make sense?
      </p>

      <QuickFire
        questions={quickFire.slice(0, 1)}
        title="Quick Check: Percentage"
      />

      <h3>Worked Example: Percentage Trap</h3>
      <WorkedExampleCard
        example={{
          id: "nr-we-demo",
          question:
            "A population of bacteria doubles every hour. Starting with 100 bacteria, what is the population after 3 hours? A student says 600 because 100 x 2 x 3 = 600. What mistake did the student make?",
          hints: [
            'Does "doubles every hour" mean linear growth (add 100 each hour) or exponential (multiply by 2 each hour)?',
            "Hour 0: 100. Hour 1: 200 (doubled). Hour 2: 400 (doubled again). Hour 3: ?",
            "The student multiplied by 2 AND by 3. Should it be x2 three times or x2 x3?",
          ],
          solution:
            "The student confused additive and exponential growth. Correct: exponential — 100 x 2^3 = 100 x 8 = 800. The student did 100 x 2 x 3 = 600 (linear thinking). This is a common IMAT trap: 'doubles every hour' means x2 each time, not addition. Think: hour 0 = 100, hour 1 = 200, hour 2 = 400, hour 3 = 800.",
        }}
      />

      <QuickFire
        questions={quickFire.slice(1, 3)}
        title="Quick Check: Percentage Trap & Rates"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Use the READ-PLAN-SOLVE-CHECK method every time",
          "Convert all units to the same system before calculating",
          "Consecutive % changes do NOT cancel out — apply them sequentially",
          "Set up the formula before plugging in numbers",
          "Sanity check: is the answer reasonable?",
          "Eliminate obviously wrong answers first",
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
      id: "numerical-reasoning-q1",
      type: "multiple-choice",
      prompt:
        "A drug costs 80 per course. After a 15% price increase, what is the new price?",
      answer: "92",
      explanation: "15% of 80 = 12. 80 + 12 = 92.",
      difficulty: "recall",
      options: ["85", "92", "95", "120"],
    },
    {
      id: "numerical-reasoning-q2",
      type: "multiple-choice",
      prompt:
        "A hospital's doctor-to-nurse ratio is 1:4. If there are 120 staff total, how many doctors?",
      answer: "24",
      explanation:
        "1:4 = 5 parts. 120/5 = 24 doctors. Check: 24 doctors, 96 nurses = 1:4.",
      difficulty: "apply",
      options: ["20", "24", "30", "96"],
    },
    {
      id: "numerical-reasoning-q3",
      type: "multiple-choice",
      prompt:
        "A medication increases by 20%, then decreases by 20%. Compared to the original, the final price is:",
      answer: "4% lower",
      explanation:
        "100 → 120 → 96. 96 is 4% lower than 100. Same % increase then decrease never returns to original.",
      difficulty: "analyze",
      options: ["The same", "4% lower", "2% lower", "4% higher"],
    },
    {
      id: "numerical-reasoning-q4",
      type: "multiple-choice",
      prompt: "An IV drip delivers 60 mL/hour. How long to deliver 240 mL?",
      answer: "4 hours",
      explanation: "Time = volume / rate = 240 mL / 60 mL/h = 4 hours.",
      difficulty: "recall",
      options: ["2 hours", "3 hours", "4 hours", "6 hours"],
    },
    {
      id: "numerical-reasoning-q5",
      type: "multiple-choice",
      prompt:
        "A medication is 50 mg/5 mL. A patient needs 75 mg. How many mL should be administered?",
      answer: "7.5 mL",
      explanation:
        "Concentration = 50 mg / 5 mL = 10 mg/mL. Volume = 75 mg / 10 mg/mL = 7.5 mL.",
      difficulty: "apply",
      options: ["1.5 mL", "5 mL", "7.5 mL", "10 mL"],
    },
    {
      id: "numerical-reasoning-q6",
      type: "explain-why",
      prompt:
        "Why does a 50% increase followed by a 50% decrease not return to the original price?",
      answer:
        "Percentages apply to different bases. After a 50% increase (100 → 150), the 50% decrease applies to 150 (150 x 0.5 = 75), not to the original 100. The net is always a loss of (p^2/100)% = 25% loss in this case. The base changes after each operation.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["data-interpretation", "reasoning-errors"],
  prerequisites: [],
};
