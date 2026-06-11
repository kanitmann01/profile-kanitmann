"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "mc-qf-1",
    question: "What is the molar mass of O₂?",
    answer: "32 g/mol (16 × 2)",
    context: "Diatomic molecule — remember the ×2!",
  },
  {
    id: "mc-qf-2",
    question: "How many moles are in 18 g of water?",
    answer: "1 mole (18 ÷ 18 = 1)",
    context: "n = m/M",
  },
];

export const moleCalculationsNote: AtomicNote = {
  slug: "mole-calculations",
  subject: "chemistry",
  topic: "reactions-stoichiometry",
  title: "Mole Calculations",
  summary:
    "The mole (6.022 × 10²³) links the microscopic world of atoms to measurable masses. Molar mass, Avogadro's number, percent composition, and empirical formulae are the key tools.",
  memoryHook:
    "1 mole = 6.022 × 10²³ particles (Avogadro's number). Mass = moles × molar mass (n = m/M). 'Moles are like dozens — a dozen eggs = 12, a mole of atoms = 6.022 × 10²³.' For gases at STP: 1 mole = 22.4 L.",
  imatTrap:
    "Molar mass of an element = its relative atomic mass in g/mol (Na = 23 g/mol). For diatomic molecules, M = 2 × A_r (O₂ = 32 g/mol, NOT 16). Always check if the substance is diatomic! Also, molar volume at STP is 22.4 L/mol ONLY at 0°C and 1 atm — not room temperature.",
  whyItMatters:
    "Mole calculations appear in nearly every IMAT chemistry question — from empirical formulae to solution concentrations, gas volumes, and reaction yields. Mastering n = m/M and stoichiometric ratios is essential for scoring in the quantitative sections.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Empirical formula from percent composition data",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Stoichiometric mass-mass calculations from balanced equations",
    },
    {
      years: [2024],
      frequency: "medium",
      notes: "Gas volume calculations using molar volume (22.4 L/mol at STP)",
    },
  ],
  equations: [
    {
      id: "mole-mass",
      latex: "n = \\frac{m}{M}",
      description:
        "Moles = mass ÷ molar mass — the central formula of stoichiometry",
      variables:
        "n = number of moles, m = mass in grams, M = molar mass in g/mol",
    },
    {
      id: "mole-particles",
      latex: "n = \\frac{N}{N_A}",
      description: "Moles = number of particles ÷ Avogadro's constant",
      variables: "N = number of particles, N_A = 6.022 × 10²³ mol⁻¹",
    },
    {
      id: "molar-volume",
      latex:
        "n = \\frac{V}{22.4} \\quad (\\text{at STP: } 0^\\circ\\text{C, 1 atm})",
      description: "Moles = volume in litres ÷ 22.4 L/mol for gases at STP",
    },
    {
      id: "percent-composition",
      latex:
        "\\% \\text{ element} = \\frac{\\text{Ar} \\times \\text{number of atoms}}{M_r} \\times 100",
      description: "Percent composition by mass of an element in a compound",
    },
  ],
  workedExamples: [
    {
      id: "mc-we-1",
      question:
        "A compound is found to contain 40.0% carbon, 6.7% hydrogen, and 53.3% oxygen by mass. Find its empirical formula. If the molecular mass is 180 g/mol, find the molecular formula.",
      hints: [
        "Assume 100 g sample — the percentages become masses in grams.",
        "Divide each mass by the respective atomic mass.",
        "Divide all results by the smallest number to find the ratio.",
        "For the molecular formula, find the factor: M_r(compound) / M_r(empirical).",
      ],
      solution:
        "In 100 g: C = 40.0/12 = 3.33 mol, H = 6.7/1 = 6.7 mol, O = 53.3/16 = 3.33 mol. Ratio C:H:O = 3.33:6.7:3.33 = 1:2:1. Empirical formula: CH₂O. M_r(CH₂O) = 12 + 2 + 16 = 30. Factor = 180/30 = 6. Molecular formula: C₆H₁₂O₆ (glucose).",
      imatYear: 2022,
    },
    {
      id: "mc-we-2",
      question:
        "What mass of CO₂ is produced when 50 g of CaCO₃ is decomposed? CaCO₃ → CaO + CO₂. (Ca = 40, C = 12, O = 16)",
      hints: [
        "Calculate moles of CaCO₃ using n = m/M.",
        "From the balanced equation, what is the mole ratio of CaCO₃ to CO₂?",
        "Convert moles of CO₂ to mass using m = n × M.",
      ],
      solution:
        "M(CaCO₃) = 40 + 12 + 48 = 100 g/mol. n(CaCO₃) = 50/100 = 0.5 mol. Ratio CaCO₃:CO₂ = 1:1, so n(CO₂) = 0.5 mol. M(CO₂) = 12 + 32 = 44 g/mol. m(CO₂) = 0.5 × 44 = 22 g.",
    },
  ],
  externalResources: [
    {
      title: "PhET — Molecule Shapes",
      url: "https://phet.colorado.edu/en/simulations/molecule-shapes",
      type: "simulation",
      description:
        "Build molecules and calculate their molar masses interactively",
    },
    {
      title: "Khan Academy — Mole Calculations",
      url: "https://www.khanacademy.org/science/chemistry/chemical-reactions-stoichiome/stoichiometry-mole/v/the-mole-and-avogadro-s-number",
      type: "video",
      description:
        "Comprehensive introduction to the mole, molar mass, and Avogadro's number",
    },
    {
      title: "ChemGuide — Calculating Empirical & Molecular Formulae",
      url: "https://www.chemguide.co.uk/analysis/empirical.html",
      type: "article",
      description:
        "Step-by-step guide to empirical and molecular formula calculations",
    },
  ],
  highYieldPoints: [
    "n = m/M: moles = mass ÷ molar mass (the master formula)",
    "Diatomic molecules: O₂ = 32 g/mol, N₂ = 28 g/mol, Cl₂ = 71 g/mol (NOT 16, 14, 35.5)",
    "Avogadro's number N_A = 6.022 × 10²³ mol⁻¹",
    "Molar volume: 22.4 L/mol at STP (0°C, 1 atm) — for gases only",
    "Empirical formula = simplest whole-number ratio; molecular = n × empirical",
    "Percent composition: (Ar × count) / M_r × 100%",
    "Always use balanced equation coefficients for stoichiometric ratios",
  ],
  explanation: (
    <div>
      <p>
        The <strong>mole</strong> is the chemist&apos;s counting unit — 6.022 ×
        10²³ particles (Avogadro&apos;s constant, N_A). It bridges the
        microscopic world (atoms and molecules) with the macroscopic world
        (grams and litres).
      </p>

      <h3>The Master Formula: n = m / M</h3>

      <EquationBlock
        equation={{
          id: "mole-mass",
          latex: "n = \\frac{m}{M}",
          description: "Moles = mass ÷ molar mass — the central formula",
        }}
      />

      <div className="grid grid-cols-3 gap-3 mt-3">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold">n</h4>
          <p className="text-xs text-muted-foreground">Moles (mol)</p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold">m</h4>
          <p className="text-xs text-muted-foreground">Mass (g)</p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold">M</h4>
          <p className="text-xs text-muted-foreground">Molar mass (g/mol)</p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Molar Mass Examples</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border p-3">
          <p className="text-sm font-semibold">H₂O</p>
          <p className="text-xs text-muted-foreground">2(1) + 16 = 18 g/mol</p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-semibold">NaCl</p>
          <p className="text-xs text-muted-foreground">
            23 + 35.5 = 58.5 g/mol
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-semibold">CaCO₃</p>
          <p className="text-xs text-muted-foreground">
            40 + 12 + 48 = 100 g/mol
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <p className="text-sm font-semibold">O₂ (⚠ diatomic)</p>
          <p className="text-xs text-muted-foreground">
            2 × 16 = 32 g/mol (NOT 16!)
          </p>
        </div>
      </div>

      <h3>Gas Volumes at STP</h3>
      <p>
        At STP (0°C, 1 atm), one mole of any gas occupies{" "}
        <strong>22.4 L</strong>.
      </p>

      <EquationBlock
        equation={{
          id: "molar-volume",
          latex: "n = \\frac{V}{22.4} \\quad (\\text{at STP})",
          description: "Molar volume at STP",
        }}
      />

      <h3>Percent Composition</h3>

      <EquationBlock
        equation={{
          id: "percent-composition",
          latex:
            "\\% \\text{ element} = \\frac{\\text{Ar} \\times \\text{number of atoms}}{M_r} \\times 100",
          description: "Percent by mass",
        }}
      />

      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
        <p className="text-sm">
          Example: %C in CO₂ = (12/44) × 100 = <strong>27.3%</strong>
        </p>
      </div>

      <h3>Empirical & Molecular Formulae</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Empirical Formula</h4>
          <p className="text-xs text-muted-foreground">
            Simplest whole-number ratio of atoms. e.g. CH₂O
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Molecular Formula</h4>
          <p className="text-xs text-muted-foreground">
            Actual number of atoms (multiple of empirical). e.g. C₆H₁₂O₆
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "mc-we-1",
            question:
              "A compound is found to contain 40.0% C, 6.7% H, and 53.3% O by mass. Find its empirical formula. If molecular mass is 180 g/mol, find the molecular formula.",
            hints: [
              "Assume 100 g sample — percentages become masses in grams.",
              "Divide each mass by the respective atomic mass.",
              "Divide all results by the smallest number to find the ratio.",
            ],
            solution:
              "In 100 g: C = 40.0/12 = 3.33, H = 6.7/1 = 6.7, O = 53.3/16 = 3.33. Ratio = 1:2:1 → CH₂O. M_r = 30. Factor = 180/30 = 6. Molecular formula: C₆H₁₂O₆ (glucose).",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "n = m/M — master formula",
          "N_A = 6.022 × 10²³ mol⁻¹",
          "22.4 L/mol at STP (gases only)",
          "Diatomic: ×2 for molar mass!",
          "Empirical = simplest ratio",
          "% element = (Ar × count)/M_r × 100",
          "Use balanced eq for stoichiometry",
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
    </div>
  ),
  questions: [
    {
      id: "mc-q1",
      type: "multiple-choice",
      prompt: "How many moles are in 36 g of water (H₂O)?",
      answer: "2 moles",
      options: ["1 mole", "2 moles", "3 moles", "0.5 moles"],
      explanation:
        "Molar mass of H₂O = 2(1) + 16 = 18 g/mol. n = m/M = 36/18 = 2 moles.",
      difficulty: "recall",
    },
    {
      id: "mc-q2",
      type: "multiple-choice",
      prompt:
        "What is the empirical formula of a compound with 40% C, 6.7% H, and 53.3% O?",
      answer: "CH₂O",
      options: ["CH₂O", "C₂H₄O₂", "CHO", "C₆H₁₂O₆"],
      explanation:
        "C: 40/12 = 3.33; H: 6.7/1 = 6.7; O: 53.3/16 = 3.33. Ratio = 1:2:1 → CH₂O. C₂H₄O₂ and C₆H₁₂O₆ are molecular formulae with the same empirical formula.",
      difficulty: "apply",
    },
    {
      id: "mc-q3",
      type: "fill-blank",
      prompt:
        "Avogadro's number is ______ (give to 3 significant figures in standard form).",
      answer: "6.02 × 10²³",
      explanation:
        "Avogadro's constant N_A = 6.022 × 10²³ mol⁻¹. One mole of any substance contains this many particles.",
      difficulty: "recall",
    },
    {
      id: "mc-q4",
      type: "multiple-choice",
      prompt: "What volume does 0.5 mol of CO₂ gas occupy at STP?",
      answer: "11.2 L",
      options: ["5.6 L", "11.2 L", "22.4 L", "44.8 L"],
      explanation:
        "At STP, 1 mol of any gas = 22.4 L. So 0.5 mol = 0.5 × 22.4 = 11.2 L.",
      difficulty: "apply",
    },
    {
      id: "mc-q5",
      type: "multiple-choice",
      prompt:
        "What is the percentage of oxygen in H₂SO₄? (Ar: H=1, S=32, O=16)",
      answer: "65.3%",
      options: ["16.3%", "32.7%", "65.3%", "72.0%"],
      explanation:
        "M_r(H₂SO₄) = 2(1) + 32 + 4(16) = 98 g/mol. %O = (4×16/98)×100 = 64/98×100 = 65.3%.",
      difficulty: "apply",
    },
    {
      id: "mc-q6",
      type: "explain-why",
      prompt:
        "Why must you always use a balanced equation before performing stoichiometric calculations?",
      answer:
        "The coefficients in a balanced equation give the mole ratio of reactants and products. Without correct coefficients, the ratio would be wrong — leading to incorrect mass or volume predictions. For example, 2H₂ + O₂ → 2H₂O tells you 2 mol H₂ react with 1 mol O₂. If the equation were unbalanced, you wouldn't know the proportion.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "balancing-equations",
    "concentration",
    "oxidation-reduction",
    "enthalpy",
  ],
  prerequisites: ["balancing-equations", "pure-substances"],
};
