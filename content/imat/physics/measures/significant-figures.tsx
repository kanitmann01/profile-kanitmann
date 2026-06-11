import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "significant-figures",
  subject: "physics",
  topic: "measures",
  title: "Significant Figures and Precision",
  summary:
    "Significant figures (sig figs) communicate the precision of a measurement. IMAT questions test your ability to count sig figs, apply rules in calculations, and distinguish precision from accuracy.",
  memoryHook:
    "Counting rules: 'Non-zero digits always count; zeros between non-zeros count; leading zeros never count; trailing zeros count only with a decimal point.' 0.00340 → 3 sig figs (leading zeros don't count, trailing zero after decimal does).",
  imatTrap:
    "IMAT distinguishes precision (repeatability / number of sig figs) from accuracy (closeness to true value). A scale reading 9.801 kg repeatedly is precise but not accurate if the true mass is 10.0 kg. In multiplication/division, the answer has as many sig figs as the LEAST precise input.",
  whyItMatters:
    "In clinical research, reporting too many significant figures implies false precision. A drug concentration of 2.5000 mg/L suggests lab-grade accuracy, while 2.5 mg/L honestly reflects measurement uncertainty.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">
        Rules for Counting Sig Figs
      </h3>
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          <strong>Non-zero digits</strong> are always significant: 345 → 3 sig
          figs
        </li>
        <li>
          <strong>Zeros between non-zeros</strong> are significant: 3005 → 4 sig
          figs
        </li>
        <li>
          <strong>Leading zeros</strong> are never significant: 0.0042 → 2 sig
          figs
        </li>
        <li>
          <strong>Trailing zeros with decimal</strong> are significant: 2.300 →
          4 sig figs
        </li>
        <li>
          <strong>Trailing zeros without decimal</strong> are ambiguous: 1200 →
          2 or 4 (use scientific notation: 1.2 × 10³ = 2 sig figs)
        </li>
      </ol>

      <h3 className="text-lg font-semibold mt-4">Rules for Calculations</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Multiplication / Division</strong>: result has the same number
          of sig figs as the input with the fewest sig figs. Example: 2.5 × 3.42
          = 8.6 (2 sig figs, not 8.550)
        </li>
        <li>
          <strong>Addition / Subtraction</strong>: result is rounded to the
          least precise decimal place. Example: 12.1 + 0.035 = 12.1 (one decimal
          place, not 12.135)
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Precision vs Accuracy</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Accuracy</strong>: closeness to the true value
        </li>
        <li>
          <strong>Precision</strong>: closeness of repeated measurements to each
          other (reproducibility)
        </li>
        <li>
          Measurements can be precise but not accurate (systematic error), or
          accurate but not precise (random error)
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "sigfig-q1",
      type: "multiple-choice",
      prompt: "How many significant figures are in 0.005060?",
      options: ["3", "4", "5", "6"],
      answer: "4",
      explanation:
        "Leading zeros (0.00) don't count. The significant digits are 5, 0, 6, 0 → 4 sig figs. The zero between 5 and 6 counts, and the trailing zero after the decimal counts.",
      difficulty: "recall",
    },
    {
      id: "sigfig-q2",
      type: "multiple-choice",
      prompt:
        "A student calculates the density as 2.7034 g/cm³ from measurements with 2 and 5 significant figures. How should the result be reported?",
      options: ["2.7034 g/cm³", "2.70 g/cm³", "2.7 g/cm³", "3 g/cm³"],
      answer: "2.7 g/cm³",
      explanation:
        "In division, the result has as many sig figs as the least precise input (2 sig figs). So 2.7034 rounds to 2.7 g/cm³.",
      difficulty: "apply",
    },
    {
      id: "sigfig-q3",
      type: "true-false",
      prompt:
        "True or False: A set of measurements can be precise but not accurate.",
      answer: "True",
      explanation:
        "Precision refers to reproducibility (closeness of repeated values), while accuracy refers to closeness to the true value. A systematic error (e.g., an uncalibrated scale) produces precise but inaccurate results.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["si-units", "gas-laws", "heat-transfer"],
};

export default note;
