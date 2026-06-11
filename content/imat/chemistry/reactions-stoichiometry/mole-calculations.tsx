import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "mole-calculations",
  subject: "chemistry",
  topic: "reactions-stoichiometry",
  title: "Mole Calculations",
  summary:
    "The mole (6.022 × 10²³) links the microscopic world of atoms to measurable masses. Molar mass, Avogadro's number, and percent composition are the key tools.",
  memoryHook:
    "1 mole = 6.022 × 10²³ particles (Avogadro's number). Mass = moles × molar mass (n = m/M). 'Moles are like dozens — a dozen eggs = 12, a mole of atoms = 6.022 × 10²³.'",
  imatTrap:
    "Molar mass of an element = its relative atomic mass in g/mol (Na = 23 g/mol). For diatomic molecules, M = 2 × Ar (O₂ = 32 g/mol, NOT 16). Always check if the substance is diatomic!",
  whyItMatters:
    "Mole calculations appear in nearly every IMAT chemistry question — from empirical formulae to solution concentrations and gas volumes. Mastering n = m/M and stoichiometric ratios is essential.",
  explanation: (
    <div>
      <h3>The Mole Concept</h3>
      <p>
        One <strong>mole</strong> = 6.022 × 10²³ particles (Avogadro&apos;s
        constant, Nₐ). It is the bridge between atomic mass units and grams.
      </p>
      <h3>Key Formulae</h3>
      <ul>
        <li>
          <strong>n = m ÷ M</strong> — moles = mass ÷ molar mass
        </li>
        <li>
          <strong>n = N ÷ Nₐ</strong> — moles = number of particles ÷
          Avogadro&apos;s constant
        </li>
        <li>
          <strong>For gases at STP: n = V ÷ 22.4</strong> — moles = volume (L) ÷
          22.4 L/mol
        </li>
      </ul>
      <h3>Molar Mass</h3>
      <p>Sum of relative atomic masses for all atoms in the formula.</p>
      <ul>
        <li>H₂O = 2(1) + 16 = 18 g/mol</li>
        <li>NaCl = 23 + 35.5 = 58.5 g/mol</li>
        <li>CaCO₃ = 40 + 12 + 3(16) = 100 g/mol</li>
      </ul>
      <h3>Percent Composition</h3>
      <p>% of element = (Ar × number of atoms ÷ Mr of compound) × 100</p>
      <p>e.g. %C in CO₂ = (12 ÷ 44) × 100 = 27.3%</p>
      <h3>Empirical & Molecular Formula</h3>
      <ul>
        <li>
          <strong>Empirical formula:</strong> simplest whole-number ratio of
          atoms.
        </li>
        <li>
          <strong>Molecular formula:</strong> actual number of atoms (may be a
          multiple of empirical).
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "mole-calc-q1",
      type: "multiple-choice",
      prompt: "How many moles are in 36 g of water (H₂O)?",
      answer: "2 moles",
      options: ["1 mole", "2 moles", "3 moles", "0.5 moles"],
      explanation:
        "Molar mass of H₂O = 2(1) + 16 = 18 g/mol. n = m/M = 36/18 = 2 moles.",
      difficulty: "recall",
    },
    {
      id: "mole-calc-q2",
      type: "multiple-choice",
      prompt:
        "What is the empirical formula of a compound with 40% C, 6.7% H, and 53.3% O?",
      answer: "CH₂O",
      options: ["CH₂O", "C₂H₄O₂", "CHO", "C₆H₁₂O₆"],
      explanation:
        "C: 40/12 = 3.33; H: 6.7/1 = 6.7; O: 53.3/16 = 3.33. Ratio = 1:2:1 → CH₂O. Note C₂H₄O₂ and C₆H₁₂O₆ are molecular formulae with the same empirical formula.",
      difficulty: "apply",
    },
    {
      id: "mole-calc-q3",
      type: "fill-blank",
      prompt:
        "Avogadro's number is ______ (give the value to 3 significant figures in standard form).",
      answer: "6.02 × 10²³",
      explanation:
        "Avogadro's constant Nₐ = 6.022 × 10²³ mol⁻¹. One mole of any substance contains this many particles.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["balancing-equations", "concentration", "oxidation-reduction"],
  prerequisites: ["balancing-equations", "pure-substances"],
};

export default note;
