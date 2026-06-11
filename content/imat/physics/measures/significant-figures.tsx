"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "sigfig-qf-1",
    question: "How many significant figures are in 0.00340?",
    answer: "3",
    hint: "Leading zeros don't count, trailing zero after decimal does",
    context: "Count the non-zero digits and captive zeros",
  },
  {
    id: "sigfig-qf-2",
    question:
      "When multiplying 2.5 × 3.42, how many sig figs should the answer have?",
    answer: "2",
    hint: "The fewest sig figs among the inputs",
    context: "Multiplication/division rule",
  },
  {
    id: "sigfig-qf-3",
    question: "What is the difference between precision and accuracy?",
    answer: "precision is reproducibility, accuracy is trueness",
    context:
      "Think of archery: grouped arrows = precise, near-centre = accurate",
  },
];

export const significantFiguresNote: AtomicNote = {
  slug: "significant-figures",
  subject: "physics",
  topic: "measures",
  title: "Significant Figures and Precision",
  summary:
    "Significant figures (sig figs) communicate the precision of a measurement. IMAT questions test your ability to count sig figs, apply rules in calculations, and distinguish precision from accuracy.",
  memoryHook:
    "Counting rules: 'Non-zero digits always count; zeros between non-zeros count; leading zeros never count; trailing zeros count only with a decimal point.' 0.00340 → 3 sig figs (leading zeros don't count, trailing zero after decimal does).",
  imatTrap:
    "IMAT distinguishes precision (repeatability / number of sig figs) from accuracy (closeness to true value). A scale reading 9.801 kg repeatedly is precise but not accurate if the true mass is 10.0 kg. In multiplication/division, the answer has as many sig figs as the LEAST precise input. In addition/subtraction, round to the fewest decimal places — not sig figs!",
  whyItMatters:
    "In clinical research, reporting too many significant figures implies false precision. A drug concentration of 2.5000 mg/L suggests lab-grade accuracy, while 2.5 mg/L honestly reflects measurement uncertainty. Surgical robotics relies on precise measurements — a 0.1 mm error in a surgical robot arm could mean the difference between a successful procedure and tissue damage.",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Counting sig figs and applying calculation rules",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Precision vs accuracy distinction",
    },
    {
      years: [2023],
      frequency: "low",
      notes: "Rounding with scientific notation",
    },
  ],
  equations: [
    {
      id: "sigfig-precision",
      latex: "\\text{Precision} = \\frac{\\text{smallest division}}{2}",
      description: "Uncertainty is typically half the smallest scale division",
      variables:
        "Smallest division = the finest graduation on your measuring instrument",
    },
    {
      id: "sigfig-percent-error",
      latex:
        "\\%\\ \\text{error} = \\frac{|\\text{measured} - \\text{true}|}{\\text{true}} \\times 100\\%",
      description: "Percent error quantifies accuracy",
    },
  ],
  workedExamples: [
    {
      id: "sigfig-worked-1",
      question:
        "IMAT 2023 Style: A student measures the density of a substance as 2.7034 g/cm³ using a balance reading to 0.1 g (2 sig figs) and a displacement method reading to 0.0001 mL (5 sig figs). How should the density be reported?",
      hints: [
        "How many sig figs does each measurement have?",
        "In division, which sig fig count applies to the result?",
        "The least precise measurement determines the sig figs.",
      ],
      solution:
        "The balance (mass) gives 2 sig figs; the volume measurement gives 5 sig figs. In division, the result has the fewest sig figs of any input → 2 sig figs. So 2.7034 rounds to 2.7 g/cm³, not 2.7034 or 2.70.",
      imatYear: 2023,
    },
    {
      id: "sigfig-worked-2",
      question:
        "Add 12.1 and 0.035. Report the answer with the correct number of significant figures.",
      hints: [
        "For addition/subtraction, look at decimal places, not sig figs.",
        "12.1 has one decimal place; 0.035 has three.",
        "Round the result to the fewest decimal places.",
      ],
      solution:
        "12.1 + 0.035 = 12.135. In addition, we round to the fewest decimal places: 12.1 has 1 decimal place, so answer = 12.1 (not 12.135).",
    },
  ],
  externalResources: [
    {
      title: "Purdue OWL — Significant Figures",
      url: "https://owl.purdue.edu/owl/research_and_citation/using_research/digital_object_identifier.html",
      type: "article",
      description: "Clear rules with examples for all operations",
    },
    {
      title: "Khan Academy — Significant Figures",
      url: "https://www.khanacademy.org/math/arithmetic-home/arith-review-decimals/arithmetic-significant-figures-tutorial/v/significant-figures",
      type: "video",
      description: "Introductory video with step-by-step examples",
    },
    {
      title: "IMAT Buddy — Measurement Questions",
      url: "https://www.imatbuddy.com/imat-science-question-banks/",
      type: "practice",
      description: "IMAT-style significant figure and measurement questions",
    },
  ],
  highYieldPoints: [
    "Non-zero digits always count",
    "Zeros between non-zeros count (3005 → 4 sig figs)",
    "Leading zeros never count (0.0042 → 2 sig figs)",
    "Trailing zeros count only with decimal (2.300 → 4 sig figs)",
    "Multiplication/division: round to fewest sig figs",
    "Addition/subtraction: round to fewest decimal places",
    "Precision = reproducibility; Accuracy = trueness",
    "Scientific notation removes ambiguity: 1.2 × 10³ = 2 sig figs",
  ],
  explanation: (
    <div>
      <p>
        <strong>Significant figures</strong> tell us how precise a measurement
        is. When you see &quot;3.42 g&quot; you know the mass was measured to
        the nearest 0.01 g. When you see &quot;3 g&quot; you know it was only
        measured to the nearest gram. IMAT tests both your ability to{" "}
        <strong>count</strong> sig figs and your understanding of how they
        behave in calculations.
      </p>

      <h3>Rules for Counting Significant Figures</h3>
      <div className="grid gap-2 mb-4">
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">
            Rule 1: Non-zero digits
          </h4>
          <p className="text-sm text-muted-foreground">
            345 → <strong>3</strong> sig figs. Every non-zero digit is
            significant.
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">
            Rule 2: Zeros between non-zeros
          </h4>
          <p className="text-sm text-muted-foreground">
            3005 → <strong>4</strong> sig figs. Captive zeros always count.
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">
            Rule 3: Leading zeros
          </h4>
          <p className="text-sm text-muted-foreground">
            0.0042 → <strong>2</strong> sig figs. Leading zeros are placeholders
            only.
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">
            Rule 4: Trailing zeros with decimal
          </h4>
          <p className="text-sm text-muted-foreground">
            2.300 → <strong>4</strong> sig figs. The decimal tells us these
            zeros were measured.
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold text-amber-600">
            ⚠ Rule 5: Trailing zeros without decimal
          </h4>
          <p className="text-sm text-muted-foreground">
            1200 → <strong>2 or 4?</strong> Ambiguous! Use scientific notation:
            1.2 × 10³ = 2 sig figs.
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Sig Figs in Calculations</h3>
      <p>
        The rules for calculations are <strong>different</strong> for
        multiplication/division versus addition/subtraction — this is a common
        source of IMAT errors.
      </p>

      <h4>Multiplication / Division</h4>
      <p className="mb-2">
        Result has as many sig figs as the input with the{" "}
        <strong>fewest</strong> sig figs.
      </p>
      <div className="rounded-lg border bg-card p-3 mb-3">
        <p className="font-mono text-sm">
          2.5 × 3.42 = 8.55 → <strong>8.6</strong> (2 sig figs)
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          2.5 has 2 sig figs, 3.42 has 3 → answer has 2 sig figs
        </p>
      </div>

      <h4>Addition / Subtraction</h4>
      <p className="mb-2">
        Result is rounded to the <strong>fewest decimal places</strong> (not sig
        figs!).
      </p>
      <div className="rounded-lg border bg-card p-3 mb-4">
        <p className="font-mono text-sm">
          12.1 + 0.035 = 12.135 → <strong>12.1</strong> (one decimal place)
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          12.1 has 1 decimal place, 0.035 has 3 → answer has 1 decimal place
        </p>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Precision vs Accuracy</h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold text-green-600">Accuracy</h4>
          <p className="text-xs text-muted-foreground mt-1">
            How close a measurement is to the <strong>true value</strong>.
            Affected by systematic errors (uncalibrated equipment).
          </p>
        </div>
        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
          <h4 className="text-sm font-semibold text-purple-600">Precision</h4>
          <p className="text-xs text-muted-foreground mt-1">
            How close repeated measurements are to <strong>each other</strong>.
            Affected by random errors (human reaction time).
          </p>
        </div>
      </div>

      <StepSolver
        problem="Report 2.6751 × 3.2 with correct sig figs."
        steps={[
          {
            label: "Count sig figs in each number",
            answer: "4",
            hint: "2.6751 has 5, 3.2 has 2",
          },
          {
            label: "Identify the fewest sig figs",
            answer: "2",
            hint: "3.2 has 2 sig figs — that's the fewest",
          },
          {
            label: "Calculate and round",
            answer: "8.6",
            hint: "2.6751 × 3.2 = 8.56032 → round to 2 sig figs = 8.6",
          },
        ]}
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "sigfig-worked-1",
            question:
              "IMAT 2023 Style: A student measures density as 2.7034 g/cm³ from data with 2 and 5 sig figs. How should the result be reported?",
            hints: [
              "The balance (mass) gives 2 sig figs; the volume gives 5 sig figs.",
              "In division, which sig fig count applies?",
              "Round 2.7034 to 2 sig figs.",
            ],
            solution:
              "2.7034 rounds to 2.7 g/cm³ (2 sig figs). In division/ multiplication, the result has the fewest sig figs of any input.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Non-zero digits: always count",
          "Captive zeros: always count",
          "Leading zeros: never count",
          "Trailing with decimal: count",
          "Trailing without decimal: ambiguous → use scientific notation",
          "×/÷ → fewest sig figs; +/− → fewest decimal places",
          "Precision ≠ Accuracy",
        ].map((point) => (
          <div
            key={point}
            className="flex items-start gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-2"
          >
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">{point}</span>
          </div>
        ))}
      </div>

      <QuickFire questions={recallQuestions.slice(2, 3)} title="Final Check" />
    </div>
  ),
  questions: [
    {
      id: "sigfig-q1",
      type: "multiple-choice",
      prompt: "How many significant figures are in 0.005060?",
      answer: "4",
      explanation:
        "Leading zeros (0.00) don't count. The significant digits are 5, 0, 6, 0 → 4 sig figs.",
      difficulty: "recall",
      options: ["3", "4", "5", "6"],
    },
    {
      id: "sigfig-q2",
      type: "multiple-choice",
      prompt:
        "A student calculates density as 2.7034 g/cm³ from measurements with 2 and 5 significant figures. How should the result be reported?",
      answer: "2.7 g/cm³",
      explanation:
        "In division, the result has as many sig figs as the least precise input (2 sig figs). So 2.7034 rounds to 2.7 g/cm³.",
      difficulty: "apply",
      options: ["2.7034 g/cm³", "2.70 g/cm³", "2.7 g/cm³", "3 g/cm³"],
    },
    {
      id: "sigfig-q3",
      type: "true-false",
      prompt:
        "True or False: A set of measurements can be precise but not accurate.",
      answer: "True",
      explanation:
        "Precision refers to reproducibility, while accuracy refers to closeness to the true value. A systematic error produces precise but inaccurate results.",
      difficulty: "recall",
    },
    {
      id: "sigfig-q4",
      type: "multiple-choice",
      prompt: "Calculate: 3.4 + 0.067. Report with correct sig figs.",
      answer: "3.5",
      explanation:
        "3.4 + 0.067 = 3.467. For addition, round to fewest decimal places: 3.4 has 1 decimal place → 3.5.",
      difficulty: "apply",
      options: ["3.467", "3.5", "3.47", "3.4"],
      imatYear: 2022,
    },
    {
      id: "sigfig-q5",
      type: "multiple-choice",
      prompt:
        "A thermometer reads consistently 37.5°C but the true temperature is 37.0°C. This is an example of:",
      answer: "High precision, low accuracy",
      explanation:
        "The readings are consistent (precise) but offset from the true value (inaccurate). This suggests a systematic calibration error.",
      difficulty: "analyze",
      options: [
        "High precision, high accuracy",
        "High precision, low accuracy",
        "Low precision, high accuracy",
        "Low precision, low accuracy",
      ],
    },
    {
      id: "sigfig-q6",
      type: "multiple-choice",
      prompt:
        "Express 1500 with 2 significant figures using scientific notation.",
      answer: "1.5 × 10³",
      explanation:
        "Writing 1500 is ambiguous — it could be 2, 3, or 4 sig figs. 1.5 × 10³ unambiguously shows 2 sig figs.",
      difficulty: "apply",
      options: ["1500", "1.5 × 10³", "1.50 × 10³", "15 × 10²"],
    },
  ],
  crosslinks: ["si-units", "gas-laws", "heat-transfer", "uniform-motion"],
  prerequisites: ["si-units"],
};
