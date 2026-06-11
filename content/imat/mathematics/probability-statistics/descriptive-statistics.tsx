import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "descriptive-statistics",
  subject: "mathematics",
  topic: "probability-statistics",
  title: "Descriptive Statistics",
  summary:
    "Measures of central tendency (mean, median, mode) and measures of spread (range, variance, standard deviation).",
  memoryHook:
    '"Mean = Sum ÷ Count. Median = Middle value (sort first!). Mode = Most frequent. Standard Deviation = how spread out data is from the mean."',
  imatTrap:
    "The mean is sensitive to outliers; the median is robust. For skewed data, median is a better measure of center. Variance = average of squared deviations from the mean. Standard deviation = √variance — it's in the SAME UNITS as the data. Don't confuse variance with standard deviation.",
  whyItMatters:
    "Descriptive statistics appear in IMAT data-interpretation questions and biology lab analysis. Understanding standard deviation is essential for grasping normal distributions, error bars, and significance testing later.",
  explanation: (
    <div>
      <h3>Measures of Central Tendency</h3>
      <ul>
        <li>
          <strong>Mean (x̄):</strong> Sum of all values ÷ number of values. x̄ =
          Σxᵢ / n
        </li>
        <li>
          <strong>Median:</strong> Middle value when data is sorted. If n is
          even, median = average of two middle values.
        </li>
        <li>
          <strong>Mode:</strong> Most frequently occurring value. A dataset can
          have no mode, one mode, or multiple modes.
        </li>
      </ul>
      <h3>Measures of Spread</h3>
      <ul>
        <li>
          <strong>Range:</strong> Maximum − Minimum
        </li>
        <li>
          <strong>Variance (σ²):</strong> Average of squared deviations from the
          mean. σ² = Σ(xᵢ − x̄)² / n
        </li>
        <li>
          <strong>Standard Deviation (σ):</strong> Square root of variance. σ =
          √σ²
        </li>
      </ul>
      <h3>When to Use Which</h3>
      <ul>
        <li>
          <strong>Symmetric data:</strong> Mean and standard deviation.
        </li>
        <li>
          <strong>Skewed data / outliers present:</strong> Median and
          interquartile range.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "stat-q1",
      type: "multiple-choice",
      prompt: "Find the median of: 3, 7, 9, 2, 5.",
      answer: "5",
      explanation: "Sorted: 2, 3, 5, 7, 9. The middle value (3rd of 5) is 5.",
      difficulty: "recall",
      options: ["3", "5", "7", "5.2"],
    },
    {
      id: "stat-q2",
      type: "multiple-choice",
      prompt:
        "A dataset has mean = 50 and standard deviation = 10. What is the variance?",
      answer: "100",
      explanation: "Variance = standard deviation² = 10² = 100.",
      difficulty: "recall",
      options: ["10", "100", "1000", "50"],
    },
    {
      id: "stat-q3",
      type: "multiple-choice",
      prompt:
        "Which measure of central tendency is LEAST affected by extreme outliers?",
      answer: "Median",
      explanation:
        "The median depends only on the middle value(s), not on extreme values. The mean is pulled toward outliers.",
      difficulty: "apply",
      options: ["Mean", "Median", "Mode", "Range"],
    },
  ],
  crosslinks: ["probability-basics", "equations-inequalities"],
};

export default note;
