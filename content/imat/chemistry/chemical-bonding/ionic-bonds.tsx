"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "ionic-qf-1",
    question: "Does solid NaCl conduct electricity?",
    answer: "No — ions are locked in the lattice",
    context: "Properties of ionic compounds",
  },
  {
    id: "ionic-qf-2",
    question: "Which has higher lattice energy: NaCl or MgO?",
    answer: "MgO (2+/2− charges)",
    context: "Lattice energy depends on charge and radius",
  },
];

export const ionicBondsNote: AtomicNote = {
  slug: "ionic-bonds",
  subject: "chemistry",
  topic: "chemical-bonding",
  title: "Ionic Bonds",
  summary:
    "Electrostatic attraction between oppositely charged ions formed by electron transfer from a metal to a nonmetal.",
  memoryHook:
    "'Ions are like a breakup — one atom gives away electrons (becomes +), the other takes them (becomes −), and the opposite charges keep them stuck together.' Metal → loses e⁻ → cation (+). Nonmetal → gains e⁻ → anion (−).",
  imatTrap:
    "Ionic compounds conduct electricity only when molten or dissolved — NOT as solids (ions are locked in the lattice). Also, not all ionic compounds are soluble — check solubility rules. MgO has a higher lattice energy than NaCl because of 2+/2− charges, despite larger ions.",
  whyItMatters:
    "Ionic bonding explains the properties of salts, electrolytes in biology, and electrochemistry. IMAT tests lattice energy trends, conductivity conditions, and comparing NaCl vs MgO properties.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Lattice energy trends — comparing MgO vs NaCl",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Conductivity conditions (solid vs molten/aqueous)",
    },
    {
      years: [2021],
      frequency: "medium",
      notes: "Electron configuration of common ions",
    },
  ],
  equations: [
    {
      id: "lattice-energy",
      latex: "U \\propto \\frac{q^+ q^-}{r_0}",
      description:
        "Lattice energy is proportional to the product of ion charges divided by the sum of ionic radii",
      variables:
        "q⁺, q⁻ = charges on cation and anion, r₀ = sum of ionic radii (internuclear distance)",
    },
    {
      id: "born-haber",
      latex:
        "\\Delta H_f^\\circ = \\Delta H_{sub} + IE + \\frac{1}{2}BE + EA + U",
      description:
        "Born-Haber cycle — relates lattice energy to other thermochemical quantities",
    },
  ],
  workedExamples: [
    {
      id: "ionic-we-1",
      question:
        "Explain why MgO has a higher melting point than NaCl, even though Mg²⁺ and O²⁻ are larger than Na⁺ and Cl⁻.",
      hints: [
        "What determines the strength of an ionic bond?",
        "Compare the charges: what is the charge on Mg vs Na, and O vs Cl?",
        "How does charge affect lattice energy, and how does lattice energy affect melting point?",
      ],
      solution:
        "Lattice energy depends on q⁺·q⁻ (product of charges). MgO has Mg²⁺ and O²⁻ (product = 4), while NaCl has Na⁺ and Cl⁻ (product = 1). The much larger charge product in MgO means stronger electrostatic attraction, higher lattice energy, and therefore a higher melting point (MgO ≈ 2852°C vs NaCl ≈ 801°C). The charge effect dominates over the size effect.",
    },
  ],
  externalResources: [
    {
      title: "PhET — Sugar & Salt Solutions",
      url: "https://phet.colorado.edu/en/simulations/sugar-and-salt-solutions",
      type: "simulation",
      description:
        "Explore conductivity of ionic vs covalent compounds in solution",
    },
    {
      title: "ChemGuide — Lattice Energy",
      url: "https://www.chemguide.co.uk/atoms/structures/lattice.html",
      type: "article",
      description:
        "Detailed explanation of lattice energy trends and Born-Haber cycles",
    },
    {
      title: "Crash Course Chemistry — Ionic Bonds",
      url: "https://www.youtube.com/watch?v=QqjcCvzWwww",
      type: "video",
      description:
        "Entertaining overview of ionic bonding with real-world examples",
    },
  ],
  highYieldPoints: [
    "Ionic bond = transfer of e⁻ from metal to nonmetal",
    "Electrostatic attraction between oppositely charged ions",
    "Lattice energy ∝ (charge₁ × charge₂) / (radius₁ + radius₂)",
    "MgO has higher lattice energy than NaCl (2+/2− product)",
    "Conducts electricity only when molten or aqueous",
    "High melting/boiling points — brittle solids",
    "Many ionic compounds are soluble in water",
  ],
  explanation: (
    <div>
      <p>
        An <strong>ionic bond</strong> forms when one or more electrons are
        transferred from a metal (low IE) to a nonmetal (high EA), creating
        oppositely charged ions that attract electrostatically.
      </p>

      <h3>Formation Example: NaCl</h3>
      <div className="grid gap-2">
        <div className="rounded-lg border p-3">
          <p className="font-semibold text-sm">Step 1: Ionisation</p>
          <p className="text-sm text-muted-foreground">
            Na → Na⁺ + e⁻ (loses 1 e⁻, achieves Ne electron config)
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="font-semibold text-sm">Step 2: Electron Gain</p>
          <p className="text-sm text-muted-foreground">
            Cl + e⁻ → Cl⁻ (gains 1 e⁻, achieves Ar electron config)
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="font-semibold text-sm">
            Step 3: Electrostatic Attraction
          </p>
          <p className="text-sm text-muted-foreground">
            Na⁺ + Cl⁻ → NaCl (ionic lattice forms)
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Lattice Energy</h3>
      <p>
        The energy released when one mole of an ionic compound forms from its
        gaseous ions. Governed by Coulomb&apos;s law:
      </p>

      <EquationBlock
        equation={{
          id: "lattice-energy",
          latex: "U \\propto \\frac{q^+ q^-}{r_0}",
          description:
            "Lattice energy depends on charge product and ionic radius",
        }}
      />

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">
            Higher charge → Higher lattice energy
          </h4>
          <p className="text-xs text-muted-foreground">
            MgO (2+/2−) &gt; NaCl (1+/1−)
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">
            Smaller ions → Higher lattice energy
          </h4>
          <p className="text-xs text-muted-foreground">
            LiF &gt; KBr (smaller radii)
          </p>
        </div>
      </div>

      <h3>Properties of Ionic Compounds</h3>
      <div className="grid gap-2">
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold">High melting/boiling points</h4>
          <p className="text-xs text-muted-foreground">
            Strong electrostatic forces in the lattice require lots of energy to
            overcome
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold">Brittle</h4>
          <p className="text-xs text-muted-foreground">
            Layers shift → like charges align → repulsion → shatter
          </p>
        </div>
        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
          <h4 className="text-sm font-semibold">
            Conduct electricity when molten or aqueous
          </h4>
          <p className="text-xs text-muted-foreground">
            Ions free to move — NOT as solids (ions locked in lattice)
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">Often soluble in water</h4>
          <p className="text-xs text-muted-foreground">
            Polar water molecules stabilise individual ions through hydration
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
            id: "ionic-we-1",
            question:
              "Explain why MgO has a higher melting point than NaCl, even though Mg²⁺ and O²⁻ are larger than Na⁺ and Cl⁻.",
            hints: [
              "What determines the strength of an ionic bond?",
              "Compare the charges: what is the charge on Mg vs Na, and O vs Cl?",
              "How does charge affect lattice energy, and how does lattice energy affect melting point?",
            ],
            solution:
              "Lattice energy depends on q⁺·q⁻ (product of charges). MgO has Mg²⁺ and O²⁻ (product = 4), while NaCl has Na⁺ and Cl⁻ (product = 1). The much larger charge product in MgO means stronger electrostatic attraction, higher lattice energy, and therefore a higher melting point (MgO ≈ 2852°C vs NaCl ≈ 801°C). The charge effect dominates over the size effect.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Ionic bond: e⁻ transfer, metal → nonmetal",
          "Lattice energy ∝ (q⁺·q⁻) / r₀",
          "Higher charge = higher lattice energy",
          "Conducts only when molten/aqueous",
          "High MP/BP, brittle solids",
          "MgO melts higher than NaCl",
          "Often soluble in water (polar solvent)",
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
      id: "ionic-q1",
      type: "multiple-choice",
      prompt: "Which ionic compound has the highest lattice energy?",
      answer: "MgO",
      options: ["NaCl", "KBr", "MgO", "LiF"],
      explanation:
        "MgO has 2+/2− charges (vs 1+/1− for NaCl, KBr, LiF). Higher charges give MgO the highest lattice energy despite larger ions.",
      difficulty: "apply",
    },
    {
      id: "ionic-q2",
      type: "true-false",
      prompt:
        "Solid sodium chloride conducts electricity because its ions are held in a fixed lattice.",
      answer: "False — solid NaCl does NOT conduct electricity.",
      explanation:
        "In the solid lattice, ions are locked in position and cannot move. NaCl only conducts when molten or dissolved, where ions are free to move and carry charge.",
      difficulty: "apply",
    },
    {
      id: "ionic-q3",
      type: "fill-blank",
      prompt:
        "When magnesium reacts with oxygen, magnesium forms the ion ______ (charge and symbol).",
      answer: "Mg²⁺",
      explanation:
        "Mg (Group 2) loses its 2 valence electrons to achieve a noble gas configuration, forming Mg²⁺.",
      difficulty: "recall",
    },
    {
      id: "ionic-q4",
      type: "multiple-choice",
      prompt: "Why are ionic compounds brittle?",
      answer:
        "When layers shift, like charges align and repel, causing the crystal to shatter.",
      options: [
        "The ions are weakly bonded",
        "When layers shift, like charges align and repel, causing the crystal to shatter",
        "Water molecules break the lattice",
        "Electrons are free to move and destabilise the structure",
      ],
      explanation:
        "In an ionic lattice, layers of alternating charges sit in equilibrium. A small displacement brings like charges into alignment, causing strong repulsion and fracture.",
      difficulty: "apply",
    },
    {
      id: "ionic-q5",
      type: "multiple-choice",
      prompt: "What type of ion does a Group 2 metal typically form?",
      answer: "A 2+ cation (e.g. Mg²⁺, Ca²⁺)",
      options: ["A 2+ cation", "A 2− anion", "A 1+ cation", "A 1− anion"],
      explanation:
        "Group 2 metals lose both valence electrons to achieve noble gas configuration, forming +2 cations.",
      difficulty: "recall",
    },
    {
      id: "ionic-q6",
      type: "explain-why",
      prompt:
        "Explain why LiF has a higher lattice energy than KBr, even though Li⁺ and F⁻ have the same charges as K⁺ and Br⁻.",
      answer:
        "Li⁺ and F⁻ have much smaller ionic radii than K⁺ and Br⁻. Smaller ions → closer internuclear distance → stronger electrostatic attraction per Coulomb's law (U ∝ 1/r₀), even with the same charge product.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "covalent-bonds",
    "electron-configuration",
    "groups-periods",
    "solubility",
  ],
  prerequisites: ["electron-configuration", "groups-periods"],
};
