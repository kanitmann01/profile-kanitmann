"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "di-qf-1",
    question:
      "A graph's y-axis starts at 90 instead of 0. A bar at 100 looks much taller than a bar at 95. Is this misleading?",
    answer:
      "Yes — a truncated y-axis exaggerates differences. Always check the scale before interpreting.",
    context: "Truncated axis",
  },
  {
    id: "di-qf-2",
    question:
      "An article says 'Disease cases doubled from 10 to 20 per 100,000.' Is this alarming?",
    answer:
      "Not necessarily — the absolute increase is tiny (10 per 100,000). The relative change (100%) sounds dramatic, but actual risk increase is small.",
    context: "Relative vs absolute",
  },
  {
    id: "di-qf-3",
    question:
      "A line graph shows ice cream sales and drowning deaths increasing together. What does this correlation suggest?",
    answer:
      "A confounding variable (hot weather) likely causes both. Correlation does not mean causation.",
    context: "Spurious correlation",
  },
];

export const dataInterpretationNote: AtomicNote = {
  slug: "data-interpretation",
  subject: "logical-reasoning",
  topic: "problem-solving",
  title: "Data Interpretation",
  summary:
    "Questions presenting data in charts, graphs, or tables — requiring you to draw conclusions, identify trends, or spot anomalies. Accuracy and careful reading of axes/labels are essential.",
  memoryHook:
    '"LABELS First, Numbers Second" — always read axis labels, units, and legend BEFORE looking at the data. Misreading axes is the #1 error.',
  imatTrap:
    "Correlation in a graph does NOT imply causation. Also: misleading scales (truncated y-axis), cherry-picked time ranges, and confusing absolute numbers with rates.",
  whyItMatters:
    "Doctors interpret lab results, epidemiological data, and clinical trial graphs daily. Misreading a survival plot can lead to incorrect treatment decisions.",
  imatPatterns: [
    {
      years: [2022, 2023],
      frequency: "medium",
      notes:
        "Data interpretation appears in most IMAT problem-solving sections",
    },
    {
      years: [2024],
      frequency: "medium",
      notes: "Bar chart and line graph interpretation are most common",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "di-we-1",
      question:
        "A scatter plot shows a strong positive correlation (r = 0.85) between ice cream sales and drowning deaths. A news report says: 'Ice cream causes drowning — study shows strong link!' The report includes the correlation coefficient to seem scientific. Identify everything wrong with this conclusion and explain what the IMAT wants you to notice.",
      hints: [
        "Does the correlation coefficient prove causation? What does r = 0.85 actually tell us?",
        "Think about what changes in summer besides ice cream sales.",
        "Is there a third variable that could cause both rising ice cream sales and rising drownings?",
        "What fallacy is this? How would you fix the argument to be valid?",
      ],
      solution:
        "Multiple errors: (1) False Cause fallacy — assuming causation from correlation. (2) Ignoring confounders — hot weather causes more swimming (leading to more drownings) AND more ice cream sales. (3) The r = 0.85 only measures the STRENGTH of the linear relationship, not causation. (4) No control for confounding variables. The IMAT wants you to notice that a strong correlation does not imply causation, and that plausible confounding variables (temperature, season, number of swimmers) can explain the relationship. The corrected headline should be: 'Ice cream sales and drowning deaths are correlated, likely due to a common cause (hot weather).'",
    },
    {
      id: "di-we-2",
      question:
        "A bar chart shows Disease X incidence from 2015 to 2020: 10, 11, 12, 13, 14, 15 per 100,000. The y-axis starts at 10. A headline says 'Disease X rates skyrocket 50% in 5 years!' Analyse whether the headline is misleading. Calculate both the relative and absolute change. What would make the headline fair?",
      hints: [
        "Check the y-axis: does it start at 0 or at 10? Truncated axes exaggerate differences.",
        "Calculate absolute change: 15 - 10 = 5 per 100,000 over 5 years. Is that dramatic?",
        "Relative change: (15-10)/10 = 50%. Sounds dramatic — but from a tiny base.",
        "Would the bars look dramatic if the axis started at 0?",
      ],
      solution:
        "The headline is highly misleading. (1) The truncated y-axis (starting at 10 instead of 0) exaggerates the visual difference. (2) Absolute increase: only 5 per 100,000 over 5 years — a modest rise. (3) The '50%' is technically correct but misleading because the base rate is tiny. A fair headline: 'Disease X shows modest increase of 5 per 100,000 over 5 years, from a low baseline.' The IMAT trap: reporters and advocates often use relative changes to make small effects sound large. Always calculate absolute risk change.",
    },
    {
      id: "di-we-3",
      question:
        "A line graph shows two curves: Hospital A mortality rate (declining) and Hospital B mortality rate (stable). The graph caption says 'Hospital A's quality improvement programme works.' But Hospital A started with much higher mortality and is still above Hospital B's rate. What additional information would you need before accepting the conclusion? Take a systematic approach.",
      hints: [
        "Read the title, labels, and caption carefully. What is the conclusion based on?",
        "Compare the starting points — Hospital A was higher to begin with. Is the decline meaningful?",
        "Consider regression to the mean — unusually high rates tend to decrease naturally.",
        "What confounders could explain the different trends? (Patient populations, case mix, etc.)",
      ],
      solution:
        "You need: (1) Case mix/severity adjustment — Hospital A may treat sicker patients. (2) Regression to the mean check — was Hospital A's starting rate an outlier that would naturally decrease? (3) Confounding factors — did anything else change at Hospital A during this period? (4) Statistical significance of the trend — is the decline within normal variation? (5) Comparison to a control — what happened at other hospitals without quality programmes? The IMAT wants systematic critical thinking: do not accept causal claims from simple trend lines without considering alternatives.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Data Interpretation",
      url: "https://www.khanacademy.org/test-prep/lsat",
      type: "video",
      description:
        "LSAT prep lessons on data interpretation and graphical reasoning",
    },
    {
      title: "Statistics How To — Misleading Graphs",
      url: "https://www.statisticshowto.com/misleading-graphs/",
      type: "article",
      description: "How to spot misleading data visualisations",
    },
    {
      title: "LSAT Lab — Data Interpretation Questions",
      url: "https://www.lsatlab.com/logical-reasoning/",
      type: "practice",
      description: "Drill data interpretation in LSAT-style passages",
    },
  ],
  highYieldPoints: [
    "Always read labels, units, and title FIRST before looking at data",
    "Check y-axis for truncation — it can exaggerate differences dramatically",
    "Correlation does not equal causation — always consider confounders",
    "Consider both absolute AND relative changes — relative changes can be misleading",
    "Do not extrapolate beyond the data range shown",
    "Compare rates (per 100,000) not just raw numbers when populations differ",
    "Watch for cherry-picked time ranges that show a desired trend",
  ],
  explanation: (
    <div>
      <p>
        Data interpretation tests your ability to extract meaning from
        <strong> bar charts, line graphs, scatter plots, and tables</strong>.
      </p>

      <h3>Systematic Approach</h3>
      <p>
        <strong>Read the title and labels:</strong> What does it show? What are
        the axes and units?
      </p>
      <p>
        <strong>Check the scale:</strong> Truncated y-axis? Consistent
        intervals?
      </p>
      <p>
        <strong>Identify the trend:</strong> Increasing, decreasing, stable?
        Linear or exponential?
      </p>
      <p>
        <strong>Look for outliers:</strong> Data points that deviate from the
        pattern.
      </p>
      <p>
        <strong>Compare groups:</strong> Do they move together or diverge? Are
        starting points comparable?
      </p>

      <QuickFire questions={quickFire.slice(0, 1)} title="Quick Check: Scale" />

      <h3>Worked Example: Reading Graphs Systematically</h3>
      <WorkedExampleCard
        example={{
          id: "di-we-demo",
          question:
            "A pharmaceutical ad shows a bar chart comparing their drug (90% efficacy) to a competitor (70% efficacy). The y-axis starts at 60. The bars are bright colours with the competitor's bar shaded grey. Analyse what is misleading about this presentation.",
          hints: [
            "The y-axis starts at 60 instead of 0. What does that do to the visual difference?",
            "The actual difference is 90% vs 70% = 20 percentage points. Is that significant?",
            "Colour choice can bias perception — why might the ad use grey for the competitor?",
            "Consider: was this a head-to-head trial? Are the patient populations comparable?",
          ],
          solution:
            "Several potentially misleading elements: (1) Truncated y-axis at 60 makes the 20-point gap look much larger than it is. (2) Colour choice (competitor in grey) subtly biases perception. (3) No information about whether this was a head-to-head trial or a comparison across different studies. (4) No confidence intervals or sample sizes shown. The IMAT tests your ability to look past presentation tricks to the underlying data quality.",
        }}
      />

      <QuickFire
        questions={quickFire.slice(1, 3)}
        title="Quick Check: Relative vs Absolute & Correlation"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Always read labels, units, and title FIRST",
          "Check y-axis for truncation — it can exaggerate differences",
          "Correlation does not equal causation — look for confounding variables",
          "Consider both absolute and relative changes",
          "Do not extrapolate beyond the data range",
          "Compare rates (per 100,000) not just raw numbers",
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
      id: "data-interpretation-q1",
      type: "multiple-choice",
      prompt:
        'A graph shows disease incidence rising from 10 to 20 per 100,000. Headline: "Disease cases double!" Why might this be misleading?',
      answer:
        "Absolute increase is small (10 per 100,000) — relative change sounds dramatic but risk increase is tiny",
      explanation:
        "Doubling from a tiny base sounds alarming but the absolute change may be clinically insignificant.",
      difficulty: "apply",
      options: [
        "The graph must have a truncated y-axis",
        "Absolute increase is small — relative change sounds dramatic but risk is tiny",
        "Disease incidence cannot double",
        "Data must be incorrect",
      ],
    },
    {
      id: "data-interpretation-q2",
      type: "multiple-choice",
      prompt:
        "When reading a graph for the first time, what should you check FIRST?",
      answer: "Axis labels, units, and title",
      explanation:
        "Without understanding axes and units, you cannot correctly interpret any data point.",
      difficulty: "recall",
      options: [
        "The highest data point",
        "Axis labels, units, and title",
        "The colour of the lines",
        "The data source",
      ],
    },
    {
      id: "data-interpretation-q3",
      type: "multiple-choice",
      prompt:
        "A scatter plot shows strong positive correlation between ice cream sales and drowning. What explains this?",
      answer: "A confounding variable (hot weather) causes both",
      explanation:
        "Hot weather increases both swimming (drownings) and ice cream eating. The correlation is spurious.",
      difficulty: "analyze",
      options: [
        "Ice cream impairs swimming ability",
        "A confounding variable (hot weather) causes both",
        "Drowning increases ice cream sales",
        "The graph is misdrawn",
      ],
    },
    {
      id: "data-interpretation-q4",
      type: "multiple-choice",
      prompt:
        "A line graph shows a steady increase in healthcare spending over 10 years. If the x-axis starts at 2015 rather than 2000, what has the graph creator done?",
      answer:
        "Cherry-picked a time range that shows an upward trend, possibly omitting earlier context",
      explanation:
        "Starting the x-axis at a convenient point can create a misleading impression. Always check the full time range.",
      difficulty: "apply",
      options: [
        "Shown the full data honestly",
        "Cherry-picked a time range that shows an upward trend",
        "Used correct methodology",
        "Made a calculation error",
      ],
    },
    {
      id: "data-interpretation-q5",
      type: "explain-why",
      prompt:
        "Why should you always calculate absolute risk change in addition to relative risk change when interpreting medical data?",
      answer:
        "Relative risk change can make tiny effects sound enormous. A drug that reduces risk from 0.1% to 0.05% has a 50% relative reduction but only 0.05% absolute reduction — meaning 2,000 patients must be treated to prevent one event. Absolute numbers give clinical context that relative numbers hide.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["numerical-reasoning", "reasoning-errors", "drawing-conclusion"],
  prerequisites: [],
};
