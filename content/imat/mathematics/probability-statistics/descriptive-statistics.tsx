"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "stat-qf-1",
    question: "Which measure of center is most affected by outliers?",
    answer: "mean",
    hint: "It's the arithmetic average",
    context: "Median is robust to outliers",
  },
  {
    id: "stat-qf-2",
    question: "What is the median of 1, 3, 5, 7, 9?",
    answer: "5",
    hint: "Sort first!",
    context: "Middle value of an odd-sized set",
  },
  {
    id: "stat-qf-3",
    question: "Standard deviation is the square root of:",
    answer: "variance",
    hint: "σ = √σ²",
    context: "Same units as the original data",
  },
];

export const descriptiveStatisticsNote: AtomicNote = {
  slug: "descriptive-statistics",
  subject: "mathematics",
  topic: "probability-statistics",
  title: "Descriptive Statistics",
  summary:
    "Measures of central tendency (mean, median, mode) and spread (range, variance, standard deviation). Understanding when to use each is critical for IMAT data interpretation.",
  memoryHook:
    "'Mean = Sum ÷ Count.' 'Median = Middle value (sort first!).' 'Mode = Most frequent.' 'Standard Deviation = How spread out data is — it's in the SAME units as the data.' Mean is pulled by outliers; median is robust.",
  imatTrap:
    "The mean is sensitive to outliers; the median is robust. For skewed distributions (e.g., income data), the median is a better measure of center. Variance = average of squared deviations — its units are squared, so it's harder to interpret. Standard deviation = √variance — it's in the SAME UNITS as the data. Don't confuse variance with standard deviation. For grouped data, use midpoints × frequencies.",
  whyItMatters:
    "Descriptive statistics appear in IMAT data-interpretation questions and biology lab analysis. Understanding standard deviation is essential for grasping normal distributions, error bars, and significance testing. In medical research, standard deviation and standard error are routinely reported in clinical trials.",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Mean, median, mode calculations from raw data",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Variance and standard deviation calculations",
    },
    {
      years: [2022, 2024],
      frequency: "medium",
      notes: "Choosing appropriate measure (mean vs median for skewed data)",
    },
  ],
  equations: [
    {
      id: "stat-mean",
      latex: "\\bar{x} = \\frac{\\sum x_i}{n}",
      description: "Mean = sum of all values ÷ number of values",
      variables:
        "x̄ = sample mean, Σxᵢ = sum of all observations, n = sample size",
    },
    {
      id: "stat-variance",
      latex: "\\sigma^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n}",
      description:
        "Population variance: average of squared deviations from the mean",
    },
    {
      id: "stat-stddev",
      latex: "\\sigma = \\sqrt{\\sigma^2}",
      description:
        "Standard deviation = square root of variance (same units as data)",
    },
  ],
  workedExamples: [
    {
      id: "stat-worked-1",
      question:
        "IMAT 2023 Style: The heights (cm) of 5 students are: 165, 170, 172, 168, 175. Calculate the mean and the median.",
      hints: [
        "Mean = sum of all heights ÷ 5.",
        "For median, sort the data first then find the middle value.",
        "Sorted: 165, 168, 170, 172, 175. Middle (3rd) = 170.",
      ],
      solution:
        "Mean = (165 + 170 + 172 + 168 + 175) / 5 = 850 / 5 = 170 cm. Sorted: 165, 168, 170, 172, 175. Median = 170 cm. For this symmetric dataset, mean = median.",
      imatYear: 2023,
    },
    {
      id: "stat-worked-2",
      question:
        "A dataset has values: 2, 4, 6, 8, 10. Calculate the variance and standard deviation.",
      hints: [
        "First find the mean: (2+4+6+8+10)/5 = 6.",
        "Find each deviation from the mean: −4, −2, 0, 2, 4.",
        "Square each deviation: 16, 4, 0, 4, 16. Average these = 8.",
        "Standard deviation = √8 ≈ 2.83.",
      ],
      solution:
        "Mean = 6. Deviations: −4, −2, 0, 2, 4. Squared: 16, 4, 0, 4, 16. Variance = (16+4+0+4+16)/5 = 40/5 = 8. Standard deviation = √8 ≈ 2.83.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Descriptive Statistics",
      url: "https://www.khanacademy.org/math/statistics-probability/summarizing-quantitative-data",
      type: "video",
      description:
        "Full series on mean, median, variance, and standard deviation",
    },
    {
      title: "StatTreK — Statistics Tutorials",
      url: "https://stattrek.com/descriptive-statistics/variance.aspx",
      type: "article",
      description:
        "Clear reference with worked examples for all descriptive measures",
    },
    {
      title: "Wolfram Alpha — Descriptive Statistics",
      url: "https://www.wolframalpha.com/input/?i=mean+of+%7B1%2C+2%2C+3%2C+4%2C+5%7D",
      type: "practice",
      description:
        "Quickly check mean, median, variance, and std dev for any dataset",
    },
  ],
  highYieldPoints: [
    "Mean = Σxᵢ/n (arithmetic average — sensitive to outliers)",
    "Median = middle value when sorted (robust to outliers)",
    "Mode = most frequent value (can be multiple or none)",
    "Variance σ² = average of squared deviations from mean",
    "Standard deviation σ = √variance (same units as data)",
    "For skewed data, median > mean (right-skew) or < mean (left-skew)",
    "Range = max − min (quick but crude measure of spread)",
  ],
  explanation: (
    <div>
      <p>
        <strong>Descriptive statistics</strong> summarise and describe the main
        features of a dataset. The IMAT tests your ability to calculate and
        interpret measures of <strong>central tendency</strong> (where the data
        clusters) and <strong>spread</strong> (how much it varies).
      </p>

      <h3>Measures of Central Tendency</h3>
      <div className="grid gap-3 mb-4">
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold text-green-600">Mean (x̄)</h4>
          <EquationBlock
            equation={{
              id: "stat-mean",
              latex: "\\bar{x} = \\frac{\\sum x_i}{n}",
              description: "The 'average' — sum divided by count",
            }}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Sensitive to outliers. Example: "1, 2, 3, 100" has mean = 26.5,
            which doesn&apos;t represent most values well.
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">Median</h4>
          <p className="text-sm text-muted-foreground mt-1">
            The <strong>middle value</strong> when data is sorted. If n is even,
            median = average of two middle values. <strong>Robust</strong> to
            outliers.
          </p>
        </div>
        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
          <h4 className="text-sm font-semibold text-purple-600">Mode</h4>
          <p className="text-sm text-muted-foreground mt-1">
            The <strong>most frequent</strong> value. Useful for categorical
            data. A dataset can be unimodal, bimodal, or have no mode.
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Measures of Spread</h3>
      <div className="grid gap-3 mb-4">
        <EquationBlock
          equation={{
            id: "stat-variance",
            latex: "\\sigma^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n}",
            description: "Variance = average squared deviation from the mean",
          }}
        />
        <EquationBlock
          equation={{
            id: "stat-stddev",
            latex: "\\sigma = \\sqrt{\\sigma^2}",
            description:
              "Standard deviation σ — in SAME units as original data",
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border bg-card p-3">
          <h4 className="text-sm font-semibold mb-1">Range</h4>
          <p className="text-xs text-muted-foreground">Maximum − Minimum</p>
          <p className="text-xs text-muted-foreground mt-1">
            Quick but crude — only uses two values.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="text-sm font-semibold mb-1">Standard Deviation</h4>
          <p className="text-xs text-muted-foreground">
            √(average squared deviation)
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            ~68% of data within 1σ of mean (normal distribution).
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Mean vs Median: Which to Use?</h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold text-green-600">Use Mean</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Symmetric data (bell-curve)
            <br />
            No extreme outliers
            <br />
            Further calculations needed
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold text-amber-600">Use Median</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Skewed data
            <br />
            Outliers present
            <br />
            Income/distribution data
          </p>
        </div>
      </div>

      <h3>Step Solver: Standard Deviation</h3>
      <StepSolver
        problem="Find the standard deviation of: 2, 5, 7, 9, 12."
        steps={[
          {
            label: "Calculate the mean",
            answer: "7",
            hint: "(2+5+7+9+12)/5 = 35/5 = 7",
          },
          {
            label: "Find squared deviations",
            answer: "58",
            hint: "(2−7)²+(5−7)²+(7−7)²+(9−7)²+(12−7)² = 25+4+0+4+25 = 58",
          },
          { label: "Variance = sum/n", answer: "11.6", hint: "58/5 = 11.6" },
          {
            label: "Standard deviation = √variance",
            answer: "3.41",
            hint: "σ = √11.6 ≈ 3.41",
          },
        ]}
        equation="\\sigma = \\sqrt{\\frac{\\sum(x_i - \\bar{x})^2}{n}}"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "stat-worked-1",
            question:
              "IMAT 2023 Style: Heights 165, 170, 172, 168, 175. Find mean and median.",
            hints: ["Mean = sum/5.", "Sort first for median."],
            solution: "Mean = 170 cm. Median = 170 cm.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Mean = Σxᵢ/n (outlier-sensitive)",
          "Median = middle value (outlier-robust)",
          "Mode = most frequent value(s)",
          "Variance σ² = Σ(xᵢ−x̄)²/n",
          "Std dev σ = √variance (same units)",
          "Range = max − min",
          "Use median for skewed data",
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
      id: "stat-q1",
      type: "multiple-choice",
      prompt: "Find the median of: 3, 7, 9, 2, 5.",
      options: ["3", "5", "7", "5.2"],
      answer: "5",
      explanation: "Sorted: 2, 3, 5, 7, 9. The middle value (3rd of 5) is 5.",
      difficulty: "recall",
    },
    {
      id: "stat-q2",
      type: "multiple-choice",
      prompt:
        "A dataset has mean = 50 and standard deviation = 10. What is the variance?",
      options: ["10", "100", "1000", "50"],
      answer: "100",
      explanation: "Variance = standard deviation² = 10² = 100.",
      difficulty: "recall",
    },
    {
      id: "stat-q3",
      type: "multiple-choice",
      prompt:
        "Which measure of central tendency is LEAST affected by extreme outliers?",
      options: ["Mean", "Median", "Mode", "Range"],
      answer: "Median",
      explanation:
        "The median depends only on the middle value(s), not on extreme values. The mean is pulled toward outliers.",
      difficulty: "apply",
    },
    {
      id: "stat-q4",
      type: "multiple-choice",
      prompt: "Scores: 60, 70, 75, 80, 85, 90, 95. The mode is:",
      options: ["75", "60", "No mode", "95"],
      answer: "No mode",
      explanation: "Each value appears exactly once, so there is no mode.",
      difficulty: "recall",
    },
    {
      id: "stat-q5",
      type: "fill-blank",
      prompt: "What is the range of the dataset {12, 7, 23, 5, 16}?",
      answer: "18",
      explanation: "Range = max − min = 23 − 5 = 18.",
      difficulty: "recall",
    },
    {
      id: "stat-q6",
      type: "multiple-choice",
      prompt: "A dataset is right-skewed. Which is typically true?",
      options: [
        "Mean = median",
        "Mean < median",
        "Mean > median",
        "There is no mode",
      ],
      answer: "Mean > median",
      explanation:
        "In right-skewed data, the long tail on the right pulls the mean higher than the median. Example: income data.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["probability-basics", "equations-inequalities"],
};

export default descriptiveStatisticsNote;
