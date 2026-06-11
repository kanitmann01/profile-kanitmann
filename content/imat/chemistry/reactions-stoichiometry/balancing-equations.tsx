"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "be-qf-1",
    question: "Can you change subscripts when balancing equations?",
    answer: "No — subscripts change the identity of the substance",
    context: "Only coefficients can be changed",
  },
  {
    id: "be-qf-2",
    question: "What does (aq) mean in a chemical equation?",
    answer: "Aqueous — dissolved in water",
    context: "State symbols indicate physical state",
  },
];

export const balancingEquationsNote: AtomicNote = {
  slug: "balancing-equations",
  subject: "chemistry",
  topic: "reactions-stoichiometry",
  title: "Balancing Chemical Equations",
  summary:
    "Chemical equations must obey the law of conservation of mass — the same number of each type of atom on both sides, achieved by adjusting stoichiometric coefficients.",
  memoryHook:
    "'Count, Coefficient, Check' — count atoms on each side, add coefficients to balance, check all atoms match. Never change subscripts (that changes the substance!). Start with the most complex molecule. 'If it's not balancing, try fractions then multiply through.'",
  imatTrap:
    "NEVER change subscripts to balance — H₂O → H₃ is wrong because it changes water into a different substance. Only change coefficients: 2H₂O means 2 molecules of water, not a different compound. Also, don't forget diatomic elements: H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂ exist as pairs.",
  whyItMatters:
    "Balanced equations are the foundation of all stoichiometric calculations. Every mole calculation, yield prediction, and reaction analysis depends on correct balancing. IMAT tests your ability to balance quickly and use coefficients for mole ratios.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Balancing combustion reactions (hydrocarbons in O₂)",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Balancing redox half-equations",
    },
    {
      years: [2024],
      frequency: "medium",
      notes: "Using balanced coefficients to deduce mole ratios",
    },
  ],
  equations: [
    {
      id: "combustion-general",
      latex:
        "C_xH_y + \\left(x + \\frac{y}{4}\\right) O_2 \\longrightarrow xCO_2 + \\frac{y}{2} H_2O",
      description:
        "General combustion formula for hydrocarbons — balance C, then H, then O",
    },
    {
      id: "law-conservation",
      latex: "\\sum \\text{(atoms left)} = \\sum \\text{(atoms right)}",
      description:
        "Law of conservation of mass — atoms are neither created nor destroyed",
    },
  ],
  workedExamples: [
    {
      id: "be-we-1",
      question: "Balance the following equation: C₂H₆ + O₂ → CO₂ + H₂O",
      hints: [
        "Start with carbon: how many C on left? How many on right?",
        "Then hydrogen: how many H on left? How many on right?",
        "Finally oxygen: count O on right and adjust O₂ coefficient accordingly.",
        "If you get a fraction, multiply all coefficients by 2.",
      ],
      solution:
        "C: 2 left → coefficient 2 for CO₂. H: 6 left → coefficient 3 for H₂O. O: now 2×2 + 3×1 = 7 O on right, so O₂ needs 7/2. Multiply all by 2: 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O.",
      imatYear: 2022,
    },
    {
      id: "be-we-2",
      question: "Balance the neutralisation: H₃PO₄ + Ca(OH)₂ → Ca₃(PO₄)₂ + H₂O",
      hints: [
        "Identify the most complex molecule (Ca₃(PO₄)₂) and start there.",
        "How many Ca are in the product? How many PO₄ groups?",
        "Balance Ca and PO₄ first, then H and O last.",
      ],
      solution:
        "Ca₃(PO₄)₂ needs 3 Ca → coefficient 3 for Ca(OH)₂. PO₄ groups: 2 needed → coefficient 2 for H₃PO₄. H: now 2×3 + 3×2 = 12 H on left → coefficient 6 for H₂O. O: check — 2×4 + 3×2 = 14 on left, 2×4 + 6×1 = 14 on right ✓. 2H₃PO₄ + 3Ca(OH)₂ → Ca₃(PO₄)₂ + 6H₂O.",
    },
  ],
  externalResources: [
    {
      title: "PhET — Balancing Chemical Equations",
      url: "https://phet.colorado.edu/en/simulations/balancing-chemical-equations",
      type: "simulation",
      description:
        "Interactive game — drag coefficients to balance equations with instant feedback",
    },
    {
      title: "Khan Academy — Balancing Chemical Equations",
      url: "https://www.khanacademy.org/science/chemistry/chemical-reactions-stoichiome/balancing-chemical-equations/v/balancing-chemical-equations",
      type: "video",
      description: "Step-by-step balancing tutorial with multiple examples",
    },
    {
      title: "BBC Bitesize — Balancing Equations",
      url: "https://www.bbc.co.uk/bitesize/guides/z32hvcw/revision/1",
      type: "article",
      description:
        "GCSE/ALevel guide with worked examples and practice questions",
    },
  ],
  highYieldPoints: [
    "Law of conservation of mass: atoms are conserved, NEVER change subscripts",
    "Order: balance metals → nonmetals → C → H → O (or start with most complex)",
    "Diatomic elements: H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂ (always pairs)",
    "Use fractions if needed, then multiply through by denominator",
    "State symbols: (s) solid, (l) liquid, (g) gas, (aq) aqueous solution",
    "Coefficients represent mole ratios, not just molecule counts",
    "Combustion general formula: CₓHᵧ + (x + y/4)O₂ → xCO₂ + (y/2)H₂O",
  ],
  explanation: (
    <div>
      <p>
        The <strong>law of conservation of mass</strong> states that matter is
        neither created nor destroyed in a chemical reaction. Therefore, every
        chemical equation must have the same number of atoms of each element on
        both sides — achieved by adjusting <strong>coefficients</strong>.
      </p>

      <EquationBlock
        equation={{
          id: "law-conservation",
          latex: "\\sum \\text{(atoms left)} = \\sum \\text{(atoms right)}",
          description: "Law of conservation of mass",
        }}
      />

      <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 mt-3">
        <h4 className="text-sm font-semibold text-red-600">Golden Rule</h4>
        <p className="text-sm text-muted-foreground">
          NEVER change subscripts. H₂O is water forever — changing it to H₂O₂
          makes hydrogen peroxide, a completely different substance. Only adjust
          the coefficients in front of formulae.
        </p>
      </div>

      <h3>Step-by-Step Method</h3>
      <div className="grid gap-2">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">
            Step 1: Write formulae correctly
          </h4>
          <p className="text-xs text-muted-foreground">
            Ensure all chemical formulae are correct (subscripts fixed).
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">
            Step 2: Count atoms on each side
          </h4>
          <p className="text-xs text-muted-foreground">
            Make a tally of each element on reactants and products.
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">
            Step 3: Add coefficients strategically
          </h4>
          <p className="text-xs text-muted-foreground">
            Start with the most complex molecule. Balance metals first, then
            nonmetals, then C, H, O last.
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">Step 4: Check and simplify</h4>
          <p className="text-xs text-muted-foreground">
            Verify all atoms balance. Ensure coefficients are in the simplest
            whole-number ratio.
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Example Walkthrough</h3>
      <div className="rounded-lg border p-4">
        <p className="text-sm font-semibold">Unbalanced: Fe + O₂ → Fe₂O₃</p>
        <ol className="text-sm space-y-2 mt-2">
          <li>
            <strong>1.</strong> Fe: 1 left, 2 right → put 2 before Fe
          </li>
          <li>
            <strong>2.</strong> O: 2 left, 3 right → put 3/2 before O₂
          </li>
          <li>
            <strong>3.</strong> Multiply all by 2 to clear fraction
          </li>
        </ol>
        <p className="text-sm font-bold mt-2">
          Balanced: <span className="text-green-600">4Fe + 3O₂ → 2Fe₂O₃</span>
        </p>
      </div>

      <h3>Types of Reactions</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Combustion</h4>
          <p className="text-xs text-muted-foreground">
            Fuel + O₂ → CO₂ + H₂O (complete combustion)
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Neutralisation</h4>
          <p className="text-xs text-muted-foreground">
            Acid + Base → Salt + Water
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Decomposition</h4>
          <p className="text-xs text-muted-foreground">
            AB → A + B (e.g. 2H₂O → 2H₂ + O₂)
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Displacement</h4>
          <p className="text-xs text-muted-foreground">
            A + BC → AC + B (e.g. Zn + CuSO₄ → ZnSO₄ + Cu)
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
            id: "be-we-1",
            question: "Balance the following equation: C₂H₆ + O₂ → CO₂ + H₂O",
            hints: [
              "Start with carbon: how many C on left? How many on right?",
              "Then hydrogen: how many H on left? How many on right?",
              "Count O on right and adjust O₂ coefficient. Use fractions if needed.",
            ],
            solution:
              "C: 2 left → coefficient 2 for CO₂. H: 6 left → coefficient 3 for H₂O. O: now 2×2 + 3×1 = 7 O on right, so O₂ needs 7/2. Multiply all by 2: 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "NEVER change subscripts",
          "Balance the most complex first",
          "Use fractions, then multiply through",
          "Diatomics: H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂",
          "States: (s), (l), (g), (aq)",
          "Coefficients = mole ratios",
          "Always check atoms balance",
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
      id: "be-q1",
      type: "multiple-choice",
      prompt:
        "What are the correct coefficients to balance: __C₃H₈ + __O₂ → __CO₂ + __H₂O?",
      answer: "1, 5, 3, 4",
      options: ["1, 5, 3, 4", "2, 7, 6, 8", "1, 3, 3, 4", "2, 5, 3, 4"],
      explanation:
        "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. C: 3=3 ✓, H: 8=8 ✓, O: 10=6+4=10 ✓.",
      difficulty: "apply",
    },
    {
      id: "be-q2",
      type: "true-false",
      prompt: "To balance H₂ + O₂ → H₂O, you can change H₂O to H₂O₂.",
      answer: "False",
      explanation:
        "Changing subscripts changes the chemical identity. H₂O₂ is hydrogen peroxide, not water. You must only adjust coefficients: 2H₂ + O₂ → 2H₂O.",
      difficulty: "apply",
    },
    {
      id: "be-q3",
      type: "fill-blank",
      prompt:
        "In the balanced equation: __Al + __HCl → __AlCl₃ + __H₂, the coefficient of HCl is ______.",
      answer: "6",
      explanation: "2Al + 6HCl → 2AlCl₃ + 3H₂. Al: 2=2 ✓, Cl: 6=6 ✓, H: 6=6 ✓.",
      difficulty: "apply",
    },
    {
      id: "be-q4",
      type: "multiple-choice",
      prompt: "Which reaction type is: CaCO₃ → CaO + CO₂?",
      answer: "Decomposition",
      options: [
        "Combustion",
        "Neutralisation",
        "Decomposition",
        "Displacement",
      ],
      explanation:
        "One compound breaks down into two or more simpler substances. CaCO₃ decomposes into CaO and CO₂ upon heating (thermal decomposition).",
      difficulty: "recall",
    },
    {
      id: "be-q5",
      type: "multiple-choice",
      prompt:
        "What is the coefficient of O₂ when C₄H₁₀ undergoes complete combustion?",
      answer: "13/2 (or 6.5)",
      options: ["4", "6", "13/2 (or 6.5)", "10"],
      explanation:
        "C₄H₁₀ + (13/2)O₂ → 4CO₂ + 5H₂O. Using the general formula: x + y/4 = 4 + 10/4 = 4 + 2.5 = 6.5 = 13/2. Multiply through by 2: 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O.",
      difficulty: "analyze",
    },
    {
      id: "be-q6",
      type: "explain-why",
      prompt:
        "Why must chemical equations always be balanced, even in theoretical calculations?",
      answer:
        "The law of conservation of mass requires that atoms are neither created nor destroyed in a chemical reaction. An unbalanced equation would imply atoms magically appear or disappear — violating fundamental physics. Balanced coefficients ensure accurate mole ratios, which are essential for calculating yields, reactant quantities, and energy changes.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["mole-calculations", "acids-bases-salts", "oxidation-reduction"],
  prerequisites: ["pure-substances"],
};
