import type { AtomicNote } from "@/data/imat/types";

const dataInterpretationNote: AtomicNote = {
  slug: "data-interpretation",
  subject: "logical-reasoning",
  topic: "problem-solving",
  title: "Data Interpretation",
  summary:
    "These questions present data in charts, graphs, or tables and ask you to draw conclusions, identify trends, or spot anomalies. Accuracy and careful reading of axes/labels are essential.",
  memoryHook:
    '"LABELS First, Numbers Second" — always read the axis labels, units, and legend BEFORE looking at the data. Misreading the axes is the #1 cause of errors in data interpretation.',
  imatTrap:
    "Correlation in a graph does NOT imply causation. Also watch for misleading scales (truncated y-axis), cherry-picked time ranges, and confusing absolute numbers with rates/percentages.",
  whyItMatters:
    "Doctors interpret lab results, epidemiological data, and clinical trial graphs daily. Misreading a growth curve or misinterpreting a survival plot can lead to incorrect diagnoses or treatment decisions.",
  explanation: (
    <div>
      <p>
        Data interpretation questions test your ability to extract meaning from
        visual data representations —{" "}
        <strong>
          bar charts, line graphs, pie charts, scatter plots, and tables
        </strong>
        .
      </p>
      <h3>Systematic Approach</h3>
      <ol>
        <li>
          <strong>Read the title and labels:</strong> What does the graph show?
          What are the axes? What are the units?
        </li>
        <li>
          <strong>Check the scale:</strong> Is the y-axis truncated? Are the
          intervals consistent? A truncated axis can exaggerate differences.
        </li>
        <li>
          <strong>Identify the trend:</strong> Is the data increasing,
          decreasing, or stable? Is the relationship linear or exponential?
        </li>
        <li>
          <strong>Look for outliers:</strong> Data points that deviate from the
          pattern may be significant or may be errors.
        </li>
        <li>
          <strong>Compare groups:</strong> If multiple datasets are shown,
          compare their trends — do they move together or diverge?
        </li>
      </ol>
      <h3>Common Traps</h3>
      <ul>
        <li>
          <strong>Misreading units:</strong> Confusing mg/dL with mmol/L, or
          thousands with millions.
        </li>
        <li>
          <strong>Confusing absolute and relative:</strong> &quot;Doubled&quot;
          sounds dramatic when going from 1 to 2 cases, but may be insignificant
          in absolute terms.
        </li>
        <li>
          <strong>Extrapolating beyond data:</strong> Assuming a trend will
          continue without evidence.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "data-interpretation-q1",
      type: "multiple-choice",
      prompt:
        'A graph shows disease incidence rising from 10 to 20 per 100,000 over 10 years. A news headline says "Disease cases double!" Why might this be misleading?',
      answer:
        "The absolute increase is small (10 per 100,000), so while the relative change is 100%, the actual risk increase may be clinically insignificant",
      explanation:
        "Doubling from a very small base can sound alarming but may represent a tiny absolute change. Always consider both relative and absolute changes when interpreting data.",
      difficulty: "apply",
      options: [
        "The graph must have a truncated y-axis",
        "The absolute increase is small (10 per 100,000), so while the relative change is 100%, the actual risk increase may be clinically insignificant",
        "Disease incidence cannot double in 10 years",
        "The data must be incorrectly collected",
      ],
    },
    {
      id: "data-interpretation-q2",
      type: "multiple-choice",
      prompt:
        "When reading a graph for the first time, what should you check FIRST?",
      answer: "Axis labels, units, and title",
      explanation:
        "Without understanding what the axes represent and in what units, you cannot correctly interpret any data point or trend. Labels must come before numbers.",
      difficulty: "recall",
      options: [
        "The highest data point",
        "Axis labels, units, and title",
        "The colour of the lines",
        "The source of the data",
      ],
    },
    {
      id: "data-interpretation-q3",
      type: "explain-why",
      prompt:
        "A scatter plot shows a strong positive correlation between ice cream sales and drowning deaths. Explain why this does NOT mean ice cream causes drowning.",
      answer:
        "This is a classic confounding variable example. Both ice cream sales and drowning deaths increase in summer due to hot weather. The correlation is explained by a third variable (temperature/season), not by a causal relationship between ice cream and drowning.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["numerical-reasoning", "reasoning-errors", "drawing-conclusion"],
  prerequisites: [],
};

export default dataInterpretationNote;
