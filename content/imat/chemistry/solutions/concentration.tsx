import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "concentration",
  subject: "chemistry",
  topic: "solutions",
  title: "Concentration",
  summary:
    "Measures how much solute is dissolved in a given amount of solvent or solution. Key measures: molarity (mol/L), molality (mol/kg), and dilution calculations.",
  memoryHook:
    "Molarity (M) = moles of solute ÷ litres of solution. 'Molarity is moles per litre — M = n/V.' Dilution: M₁V₁ = M₂V₂ (moles stay the same, just add water).",
  imatTrap:
    "Molarity uses volume of SOLUTION (not solvent). Adding solute changes total volume. Also, when diluting, V₁ and V₂ must be in the same units — the formula works with any volume unit as long as they match.",
  whyItMatters:
    "Concentration calculations are essential for titration, IV fluids, drug dosing, and enzyme kinetics (Km). IMAT frequently tests dilution and molarity in combined stoichiometry questions.",
  explanation: (
    <div>
      <h3>Molarity (M)</h3>
      <p>The most common concentration unit in chemistry.</p>
      <p>
        <strong>M = n ÷ V</strong> where n = moles of solute, V = volume of
        solution in litres. Units: mol/L or M.
      </p>
      <p>Example: 0.5 mol NaCl in 250 mL solution → M = 0.5/0.250 = 2.0 M</p>
      <h3>Molality (m)</h3>
      <p>
        <strong>m = n ÷ mass of solvent (kg)</strong>. Unlike molarity, molality
        does not change with temperature (mass is temperature-independent).
      </p>
      <h3>Dilution</h3>
      <p>When you add solvent, moles of solute stay the same:</p>
      <p>
        <strong>M₁V₁ = M₂V₂</strong>
      </p>
      <p>
        Example: Dilute 50 mL of 2 M HCl to 200 mL → M₂ = (2 × 50)/200 = 0.5 M
      </p>
      <h3>Conversions</h3>
      <ul>
        <li>
          From mass concentration (g/L) to molarity: M = (g/L) ÷ molar mass
        </li>
        <li>
          From % by mass: assume 100 g solution, convert mass of solute to moles
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "conc-q1",
      type: "multiple-choice",
      prompt:
        "What is the molarity of a solution containing 4 g of NaOH (M = 40 g/mol) in 500 mL of solution?",
      answer: "0.2 M",
      options: ["0.1 M", "0.2 M", "0.4 M", "2.0 M"],
      explanation:
        "n = 4/40 = 0.1 mol. V = 500 mL = 0.5 L. M = 0.1/0.5 = 0.2 M.",
      difficulty: "apply",
    },
    {
      id: "conc-q2",
      type: "multiple-choice",
      prompt:
        "You dilute 100 mL of 0.5 M H₂SO₄ to 500 mL. What is the new concentration?",
      answer: "0.1 M",
      options: ["0.01 M", "0.1 M", "0.25 M", "0.5 M"],
      explanation: "M₁V₁ = M₂V₂ → (0.5)(100) = M₂(500) → M₂ = 50/500 = 0.1 M.",
      difficulty: "apply",
    },
    {
      id: "conc-q3",
      type: "true-false",
      prompt:
        "Molality changes with temperature because the volume of solvent expands.",
      answer: "False",
      explanation:
        "Molality uses mass of solvent (kg), not volume. Mass is unaffected by temperature, so molality is temperature-independent — unlike molarity.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["mole-calculations", "solubility", "acids-bases-salts"],
  prerequisites: ["mole-calculations"],
};

export default note;
