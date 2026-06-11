"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "hc-qf-1",
    question: "What is the general formula for alkanes?",
    answer: "CₙH₂ₙ₊₂",
    context: "Saturated hydrocarbons",
  },
  {
    id: "hc-qf-2",
    question: "Does bromine water decolourise with alkanes?",
    answer: "No — only with alkenes/alkynes",
    context: "Test for unsaturation",
  },
];

export const hydrocarbonsNote: AtomicNote = {
  slug: "hydrocarbons",
  subject: "chemistry",
  topic: "organic-chemistry",
  title: "Hydrocarbons",
  summary:
    "Organic compounds containing only carbon and hydrogen — alkanes (C-C single bonds), alkenes (C=C), and alkynes (C≡C). Naming follows IUPAC rules based on chain length and functional groups.",
  memoryHook:
    "AlkANES = 'single' (all single bonds, CₙH₂ₙ₊₂). AlkENES = 'double' (at least one C=C, CₙH₂ₙ). AlkYNES = 'triple' (at least one C≡C, CₙH₂ₙ₋₂). 'Meth- Eth- Prop- But- Pent- Hex- Hept- Oct- Non- Dec-' = 1-10 carbons.",
  imatTrap:
    "Isomers have the SAME molecular formula but DIFFERENT structural arrangements. Butane (C₄H₁₀) has 2 structural isomers: n-butane and isobutane. Don't confuse structural isomers with stereoisomers. Also, don't forget that alkynes have general formula CₙH₂ₙ₋₂, not CₙH₂ₙ.",
  whyItMatters:
    "Hydrocarbons are the backbone of organic chemistry and fuel science. Understanding nomenclature lets you name any organic molecule. IMAT tests IUPAC naming, isomer identification, and distinguishing alkanes from alkenes using bromine water.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "IUPAC naming of branched alkanes and alkenes",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Structural isomer identification (C₄H₁₀, C₂H₆O)",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Test for unsaturation — bromine water",
    },
  ],
  equations: [
    {
      id: "alkane-combustion",
      latex:
        "C_nH_{2n+2} + \\left(\\frac{3n+1}{2}\\right) O_2 \\longrightarrow nCO_2 + (n+1)H_2O",
      description: "General combustion equation for alkanes",
    },
    {
      id: "alkene-addition-br2",
      latex: "RCH=CHR' + Br_2 \\longrightarrow RCHBrCHBrR'",
      description:
        "Addition of bromine across a C=C double bond — decolourises bromine water",
    },
    {
      id: "ethane-combustion-balanced",
      latex: "C_2H_6 + \\frac{7}{2}O_2 \\longrightarrow 2CO_2 + 3H_2O",
      description: "Complete combustion of ethane",
    },
  ],
  workedExamples: [
    {
      id: "hc-we-1",
      question:
        "Name the following compound using IUPAC rules: CH₃CH(CH₃)CH₂CH₃",
      hints: [
        "Find the longest carbon chain first.",
        "Identify substituents (branches) on the main chain.",
        "Number from the end nearest the first branch.",
        "List substituents alphabetically (ignoring di-, tri- prefixes).",
      ],
      solution:
        "The longest chain has 4 carbons (butane). A methyl (CH₃) group is attached to carbon 2. IUPAC name: 2-methylbutane.",
      imatYear: 2022,
    },
    {
      id: "hc-we-2",
      question:
        "A student has two unlabelled bottles: hexane and hex-1-ene. Describe a simple chemical test to identify which is which.",
      hints: [
        "What structural feature distinguishes an alkane from an alkene?",
        "What colour change would you look for?",
        "What is added across the C=C bond in alkenes?",
      ],
      solution:
        "Add bromine water (orange-brown) to a sample from each bottle. Hex-1-ene (alkene) will decolourise the bromine water instantly because Br₂ adds across the C=C double bond. Hexane (alkane) will not react — the bromine water stays orange-brown. This is the standard test for unsaturation.",
    },
  ],
  externalResources: [
    {
      title: "PhET — Build a Molecule",
      url: "https://phet.colorado.edu/en/simulations/build-a-molecule",
      type: "simulation",
      description: "Build hydrocarbon molecules to see 3D structures",
    },
    {
      title: "Khan Academy — Naming Alkanes, Alkenes & Alkynes",
      url: "https://www.khanacademy.org/science/organic-chemistry/bond-line-structures-alkanes-cycloalkanes/naming-alkanes/v/naming-alkanes-with-alkyl-groups",
      type: "video",
      description: "Step-by-step IUPAC naming tutorials with many examples",
    },
    {
      title: "Chemistry LibreTexts — Hydrocarbons",
      url: "https://chem.libretexts.org/Bookshelves/Organic_Chemistry/Map%3A_Organic_Chemistry_(McMurry)/Chapter_02%3A_Alkanes",
      type: "textbook",
      description:
        "Detailed coverage of hydrocarbon nomenclature and reactions",
    },
  ],
  highYieldPoints: [
    "Alkanes: CₙH₂ₙ₊₂, saturated (only C-C single bonds), relatively unreactive",
    "Alkenes: CₙH₂ₙ, unsaturated (C=C double bond), undergo addition reactions",
    "Alkynes: CₙH₂ₙ₋₂, unsaturated (C≡C triple bond), most reactive",
    "Bromine water test: alkene decolourises Br₂ (orange→colourless); alkane does not",
    "Structural isomers: same molecular formula, different connectivity",
    "IUPAC: longest chain → root name → suffix → number → prefix",
  ],
  explanation: (
    <div>
      <h3>Types of Hydrocarbons</h3>
      <div className="grid gap-3">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">
            Alkanes (CₙH₂ₙ₊₂) — Saturated
          </h4>
          <p className="text-xs text-muted-foreground">
            Only C-C single bonds (σ bonds). Relatively unreactive. Undergo
            combustion and free radical substitution.
          </p>
          <EquationBlock
            equation={{
              id: "ethane-combustion-balanced",
              latex: "C_2H_6 + \\frac{7}{2}O_2 \\longrightarrow 2CO_2 + 3H_2O",
              description: "Complete combustion of ethane",
            }}
          />
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold">
            Alkenes (CₙH₂ₙ) — Unsaturated
          </h4>
          <p className="text-xs text-muted-foreground">
            Contain C=C double bond (1σ + 1π). More reactive — undergo addition
            reactions (hydrogenation, halogenation, hydration).
          </p>

          <EquationBlock
            equation={{
              id: "alkene-addition-br2",
              latex: "RCH=CHR' + Br_2 \\longrightarrow RCHBrCHBrR'",
              description:
                "Bromine adds across C=C — decolourises Br₂ (orange→colourless)",
            }}
          />
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <h4 className="text-sm font-semibold">
            Alkynes (CₙH₂ₙ₋₂) — Unsaturated
          </h4>
          <p className="text-xs text-muted-foreground">
            Contain C≡C triple bond (1σ + 2π). Most reactive of the three. Can
            undergo two sequential addition reactions.
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>IUPAC Nomenclature</h3>
      <div className="rounded-lg border p-4">
        <h4 className="text-sm font-semibold mb-2">Four-Step Process</h4>
        <ol className="text-sm space-y-2">
          <li>
            <strong>1.</strong> Find the longest carbon chain → root name
            (meth-, eth-, prop-, but-…)
          </li>
          <li>
            <strong>2.</strong> Identify functional group suffix: -ane, -ene,
            -yne
          </li>
          <li>
            <strong>3.</strong> Number the chain to give the lowest locant to
            the functional group / first branch
          </li>
          <li>
            <strong>4.</strong> Name and number substituents as prefixes:
            methyl, ethyl, chloro…
          </li>
        </ol>
        <p className="text-xs text-muted-foreground mt-3">
          Example: CH₃CH(CH₃)CH₂CH₃ = <strong>2-methylbutane</strong>
        </p>
      </div>

      <h3>Isomerism</h3>
      <p>
        <strong>Structural (constitutional) isomers</strong> have the same
        molecular formula but different connectivity of atoms.
      </p>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">C₄H₁₀ — Two Isomers</h4>
          <p className="text-xs text-muted-foreground">
            n-butane (CH₃CH₂CH₂CH₃)
            <br />
            isobutane (CH₃CH(CH₃)CH₃)
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">C₂H₆O — Two Isomers</h4>
          <p className="text-xs text-muted-foreground">
            ethanol (CH₃CH₂OH)
            <br />
            dimethyl ether (CH₃OCH₃)
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Reactions of Hydrocarbons</h3>
      <ul>
        <li>
          <strong>Combustion:</strong> All hydrocarbons burn in O₂ → CO₂ + H₂O.
          Complete combustion with sufficient O₂; incomplete combustion (limited
          O₂) produces CO or C (soot).
        </li>
        <li>
          <strong>Addition (alkenes/alkynes):</strong> Br₂ adds across C=C →
          decolourises bromine water (test for unsaturation). H₂ adds across C=C
          (hydrogenation, Ni catalyst, vegetable oils → margarine).
        </li>
        <li>
          <strong>Substitution (alkanes):</strong> Halogenation with UV light
          (free radical mechanism) — e.g. CH₄ + Cl₂ → CH₃Cl + HCl (needs UV
          light).
        </li>
      </ul>

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "hc-we-1",
            question:
              "Name the following compound using IUPAC rules: CH₃CH(CH₃)CH₂CH₃",
            hints: [
              "Find the longest carbon chain first.",
              "Identify substituents (branches) on the main chain.",
              "Number from the end nearest the first branch.",
            ],
            solution:
              "The longest chain has 4 carbons (butane). A methyl (CH₃) group is attached to carbon 2. IUPAC name: 2-methylbutane.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Alkanes: CₙH₂ₙ₊₂, single bonds only",
          "Alkenes: CₙH₂ₙ, C=C double bond",
          "Alkynes: CₙH₂ₙ₋₂, C≡C triple bond",
          "Br₂ water test: alkene = decolourises",
          "IUPAC: long chain → suffix → number",
          "Structural isomers: same formula, different structure",
          "Alkane + UV + halide → substitution",
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
      id: "hc-q1",
      type: "multiple-choice",
      prompt: "What is the IUPAC name of CH₃CH₂CH=CH₂?",
      answer: "But-1-ene",
      options: ["But-1-ene", "But-2-ene", "Propene", "Pent-1-ene"],
      explanation:
        "The longest chain has 4 carbons (but-). There is a C=C double bond at position 1 (number from the end nearest the double bond). Suffix = -ene → but-1-ene.",
      difficulty: "apply",
    },
    {
      id: "hc-q2",
      type: "multiple-choice",
      prompt: "Which reagent can distinguish between an alkane and an alkene?",
      answer:
        "Bromine water (Br₂) — decolourises with alkenes but not alkanes.",
      options: [
        "Hydrochloric acid",
        "Bromine water (Br₂)",
        "Sodium hydroxide",
        "Distilled water",
      ],
      explanation:
        "Alkenes undergo addition with Br₂, decolourising the orange-brown bromine water. Alkanes do not react with bromine water under normal conditions.",
      difficulty: "recall",
    },
    {
      id: "hc-q3",
      type: "fill-blank",
      prompt: "The general formula for alkanes is CₙH______.",
      answer: "2n+2",
      explanation:
        "Alkanes are saturated hydrocarbons with only single bonds. Their general formula is CₙH₂ₙ₊₂.",
      difficulty: "recall",
    },
    {
      id: "hc-q4",
      type: "multiple-choice",
      prompt: "How many structural isomers does C₄H₁₀ have?",
      answer: "2",
      options: ["1", "2", "3", "4"],
      explanation:
        "Butane has 2 structural isomers: n-butane (CH₃CH₂CH₂CH₃) and isobutane (CH₃CH(CH₃)CH₃).",
      difficulty: "apply",
    },
    {
      id: "hc-q5",
      type: "multiple-choice",
      prompt: "What type of reaction is: CH₄ + Cl₂ → CH₃Cl + HCl?",
      answer: "Free radical substitution",
      options: [
        "Addition",
        "Combustion",
        "Free radical substitution",
        "Elimination",
      ],
      explanation:
        "Alkanes undergo free radical substitution with halogens in the presence of UV light. The Cl-Cl bond breaks homolytically, producing Cl• radicals.",
      difficulty: "apply",
    },
    {
      id: "hc-q6",
      type: "explain-why",
      prompt:
        "Explain why ethene (C₂H₄) decolourises bromine water but ethane (C₂H₆) does not.",
      answer:
        "Ethene has a C=C double bond (π bond) which is electron-rich and undergoes electrophilic addition with Br₂. The Br₂ molecule adds across the double bond, breaking the π bond and forming a colourless dibromo compound. Ethane only has C-C and C-H σ bonds, which are not susceptible to addition — no reaction occurs, so the Br₂ colour remains.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["functional-groups", "covalent-bonds", "mole-calculations"],
  prerequisites: ["covalent-bonds"],
};
