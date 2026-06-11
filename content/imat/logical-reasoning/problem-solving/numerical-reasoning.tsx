import type { AtomicNote } from "@/data/imat/types";

const numericalReasoningNote: AtomicNote = {
  slug: "numerical-reasoning",
  subject: "logical-reasoning",
  topic: "problem-solving",
  title: "Numerical Reasoning",
  summary:
    "These questions require solving word problems using arithmetic, ratios, percentages, and basic algebra. Speed and accuracy with mental maths are key advantages.",
  memoryHook:
    '"READ – PLAN – SOLVE – CHECK" — Read what is asked, Plan the calculation, Solve step by step, Check if the answer is reasonable. Skipping the check step causes most errors.',
  imatTrap:
    "Watch for unit conversions (mg to g, mL to L, minutes to hours), percentage traps (a 50% increase followed by a 50% decrease does NOT return to the original value), and irrelevant information designed to distract.",
  whyItMatters:
    "Dosage calculations, dilution problems, and interpreting lab values all require numerical reasoning. A 10-fold error in drug dosage can be fatal — precision matters in medicine.",
  explanation: (
    <div>
      <p>
        Numerical reasoning questions test your ability to work with numbers in
        context —{" "}
        <strong>
          percentages, ratios, rates, proportions, and basic algebra
        </strong>{" "}
        presented as word problems.
      </p>
      <h3>Common Question Types</h3>
      <ul>
        <li>
          <strong>Percentage change:</strong> &quot;A drug&apos;s price
          increased from €40 to €52. What is the percentage increase?&quot; →
          (52-40)/40 × 100 = 30%.
        </li>
        <li>
          <strong>Ratios and proportions:</strong> &quot;The ratio of doctors to
          nurses is 2:5. If there are 35 nurses, how many doctors are
          there?&quot; → 2/5 = x/35 → x = 14.
        </li>
        <li>
          <strong>Rate problems:</strong> &quot;An IV drip delivers 60 mL/hour.
          How long to deliver 240 mL?&quot; → 240/60 = 4 hours.
        </li>
        <li>
          <strong>Unit conversions:</strong> &quot;A patient needs 0.5 g of a
          drug. Tablets contain 250 mg each. How many tablets?&quot; → 0.5 g =
          500 mg → 500/250 = 2 tablets.
        </li>
      </ul>
      <h3>Strategy</h3>
      <ol>
        <li>
          <strong>Identify what is asked:</strong> Underline the question. What
          unit should the answer be in?
        </li>
        <li>
          <strong>Extract relevant numbers:</strong> Cross out irrelevant
          information.
        </li>
        <li>
          <strong>Set up the calculation:</strong> Write the formula or
          proportion before calculating.
        </li>
        <li>
          <strong>Sanity check:</strong> Does the answer make sense? A drug dose
          of 10,000 tablets should raise a red flag.
        </li>
      </ol>
    </div>
  ),
  questions: [
    {
      id: "numerical-reasoning-q1",
      type: "multiple-choice",
      prompt:
        "A drug costs €80 per course. After a 15% price increase, what is the new price?",
      answer: "€92",
      explanation: "15% of €80 = 0.15 × 80 = €12. New price = €80 + €12 = €92.",
      difficulty: "recall",
      options: ["€85", "€92", "€95", "€120"],
    },
    {
      id: "numerical-reasoning-q2",
      type: "multiple-choice",
      prompt:
        "A hospital has a doctor-to-nurse ratio of 1:4. If the hospital employs 120 staff (doctors and nurses only), how many doctors are there?",
      answer: "24",
      explanation:
        "Ratio 1:4 means for every 5 staff, 1 is a doctor. 120/5 = 24 doctors (and 96 nurses).",
      difficulty: "apply",
      options: ["20", "24", "30", "96"],
    },
    {
      id: "numerical-reasoning-q3",
      type: "multiple-choice",
      prompt:
        "A medication increases in price by 20%, then decreases by 20%. Compared to the original price, the final price is:",
      answer: "4% lower",
      explanation:
        "If original price is 100: after +20% it is 120, after -20% of 120 it is 96. This is 4% lower than 100. A percentage increase followed by the same percentage decrease never returns to the original value.",
      difficulty: "analyze",
      options: ["The same", "4% lower", "2% lower", "4% higher"],
    },
  ],
  crosslinks: ["data-interpretation", "reasoning-errors"],
  prerequisites: [],
};

export default numericalReasoningNote;
