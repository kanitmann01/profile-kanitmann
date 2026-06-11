"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "What are the three components of an ATP molecule?",
    answer:
      "Adenine (nitrogenous base), ribose (sugar), three phosphate groups",
    context: "Structure of ATP",
  },
  {
    id: "qf-2",
    question:
      "How much energy (approx) is released when ATP is hydrolysed to ADP?",
    answer: "~30.5 kJ/mol under standard conditions",
    context: "Energy currency of the cell",
  },
  {
    id: "qf-3",
    question:
      "What type of phosphorylation occurs in mitochondria via ATP synthase?",
    answer: "Oxidative phosphorylation",
    context: "Driven by proton gradient",
  },
];

export const atpNote: AtomicNote = {
  slug: "atp",
  subject: "biology",
  topic: "bioenergetics",
  title: "ATP — Adenosine Triphosphate",
  summary:
    "The universal energy currency of cells. ATP is a nucleotide composed of adenine, ribose, and three phosphate groups. Hydrolysis of the terminal phosphate bond releases energy (~30.5 kJ/mol) that drives endergonic reactions in metabolism.",
  memoryHook:
    "ATP = Adenine (base) + Triphosphate (3 phosphates) + Ribose (sugar). Think: A-Tri-P = A-T-P",
  imatTrap:
    "ATP hydrolysis releases energy, but the terminal phosphate bonds are NOT 'high-energy' because they're unusually strong — they release energy because the products (ADP + Pᵢ) are more stable (lower energy). Trap: calling them 'high-energy bonds' vs 'high-energy compounds' (phosphoanhydride bonds are easily cleaved, releasing significant energy). Also: ATP yield numbers differ between textbooks — IMAT uses ~36 ATP per glucose (older convention).",
  whyItMatters:
    "Without ATP, no cellular work occurs — no muscle contraction, no nerve signal transmission, no biosynthesis. ATP is constantly recycled: a human turns over ~50 kg of ATP per day. Dysfunctional ATP production underlies mitochondrial diseases, ischaemia (heart attack/stroke damage), and the Warburg effect in cancer.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "ATP structure and hydrolysis",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Distinguishing three phosphorylation types",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Net ATP yield from respiration",
    },
  ],
  equations: [
    {
      id: "atp-hydrolysis",
      latex: "ATP + H_2O \\longrightarrow ADP + P_i + \\text{energy}",
      description: "Hydrolysis: ATP → ADP + inorganic phosphate",
      variables: "ΔG°′ ≈ −30.5 kJ/mol",
    },
    {
      id: "atp-second-hydrolysis",
      latex:
        "ATP + H_2O \\longrightarrow AMP + PP_i \\longrightarrow AMP + 2\\ P_i",
      description:
        "Alternative: ATP → AMP + pyrophosphate (more energy released)",
      variables: "PPᵢ = pyrophosphate, cleaved to 2 Pᵢ",
    },
    {
      id: "atp-synthesis",
      latex: "ADP + P_i + \\text{energy} \\longrightarrow ATP + H_2O",
      description: "ATP synthesis — requires energy input (condensation)",
    },
    {
      id: "atp-turnover",
      latex: "ATP \\rightleftharpoons ADP + P_i + \\text{energy}",
      description: "ATP/ADP cycle — the cell&apos;s rechargeable battery",
    },
  ],
  workedExamples: [
    {
      id: "atp-worked-1",
      question:
        "A cell hydrolyses 10,000 ATP molecules per second during active transport. If each ATP provides ~30.5 kJ/mol, calculate the total energy turnover per second in a cell containing 1 × 10⁻¹² mol of ATP (Avogadro constant: 6.02 × 10²³ mol⁻¹).",
      hints: [
        "How many ATP molecules are in the cell?",
        "How many times must each ATP be recycled per second?",
        "What is the energy of one ATP hydrolysis in joules?",
      ],
      solution:
        "Total ATP = 1 × 10⁻¹² mol × 6.02 × 10²³ = 6.02 × 10¹¹ molecules. Each molecule is recycled: 10,000 / (6.02 × 10¹¹) ≈ 1.66 × 10⁻⁸ times per second, meaning each ATP lasts ~60 ns before being recycled. Energy per ATP = (30,500 J/mol) / (6.02 × 10²³ mol⁻¹) = 5.07 × 10⁻²⁰ J. Total energy per second = 10,000 × 5.07 × 10⁻²⁰ = 5.07 × 10⁻¹⁶ W. This shows why cells need millions of ATP molecules and continuous recycling.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — ATP: The Energy Currency",
      url: "https://www.khanacademy.org/science/biology/energy-and-enzymes/atp-reaction-coupling/a/atp-and-reaction-coupling",
      type: "article",
      description: "ATP structure and its role in metabolism",
    },
    {
      title: "Nature Scitable — How Cells Obtain Energy",
      url: "https://www.nature.com/scitable/topicpage/how-cells-obtain-energy-from-food-14175788/",
      type: "article",
      description:
        "Detailed discussion of ATP, electron carriers, and metabolic pathways",
    },
    {
      title: "OpenStax Biology 2e — ATP",
      url: "https://openstax.org/books/biology-2e/pages/6-4-atp-adenosine-triphosphate",
      type: "textbook",
      description: "Free textbook chapter on ATP structure and function",
    },
  ],
  highYieldPoints: [
    "Structure: adenine (purine) + ribose (pentose) + 3 phosphate groups (α, β, γ)",
    "Hydrolysis of γ-phosphate: ATP → ADP + Pᵢ (ΔG°′ ≈ −30.5 kJ/mol)",
    "Phosphoanhydride bonds: high-energy because products are stabilised (not because bonds are strong)",
    "Three types: substrate-level, oxidative, and photophosphorylation",
    "ATP/ADP ratio regulates metabolic rate (high ATP slows catabolism)",
    "Humans recycle ~50 kg ATP/day — cells maintain only seconds-worth of ATP at any moment",
    "ATP is also a precursor for RNA synthesis and intracellular signalling (cAMP)",
  ],
  explanation: (
    <div>
      <p>
        <strong>ATP (adenosine triphosphate)</strong> is the universal energy
        currency of all living cells. It is a <strong>nucleotide</strong>{" "}
        composed of <strong>adenine</strong> (a purine nitrogenous base),{" "}
        <strong>ribose</strong> (a 5C sugar), and{" "}
        <strong>three phosphate groups</strong>
        (α, β, and γ).
      </p>

      <h3>Structure & Hydrolysis</h3>
      <p>
        The energy stored in ATP is released by <strong>hydrolysis</strong> of
        the terminal phosphoanhydride bond (between the β and γ phosphates).
        This removes one phosphate group, producing ADP + Pᵢ. The reaction is
        exergonic because:
      </p>
      <ul>
        <li>Products (ADP + Pᵢ) have greater resonance stabilisation</li>
        <li>
          Reduced electrostatic repulsion between adjacent negative charges
        </li>
        <li>Increased entropy from the free phosphate group</li>
      </ul>

      <EquationBlock
        equation={{
          id: "atp-hydrolysis",
          latex: "ATP + H_2O \\longrightarrow ADP + P_i + \\text{energy}",
          description: "ATP hydrolysis — releases ~30.5 kJ/mol",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Energy Coupling</h3>
      <p>
        ATP hydrolysis is coupled to <strong>endergonic</strong>{" "}
        (energy-requiring) reactions. The combined reaction has a negative net
        ΔG. This drives:
      </p>
      <ul>
        <li>
          <strong>Mechanical work:</strong> muscle contraction (myosin ATPase)
        </li>
        <li>
          <strong>Transport work:</strong> Na⁺/K⁺ pump, Ca²⁺ ATPase
        </li>
        <li>
          <strong>Chemical work:</strong> biosynthesis of macromolecules
        </li>
      </ul>

      <h3>Three Types of ATP Synthesis</h3>
      <div className="grid gap-3">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="font-semibold text-sm text-blue-600">
            Substrate-Level Phosphorylation
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Direct transfer of phosphate from a phosphorylated intermediate to
            ADP. Occurs in glycolysis (PGK, pyruvate kinase) and the Krebs cycle
            (succinyl-CoA synthetase). Does NOT require membrane.
          </p>
        </div>
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
          <h4 className="font-semibold text-sm text-green-600">
            Oxidative Phosphorylation
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            ATP synthesis driven by the proton gradient established by the ETC.
            Occurs at ATP synthase in the inner mitochondrial membrane. Produces
            ~95% of cellular ATP.
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="font-semibold text-sm text-amber-600">
            Photophosphorylation
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            ATP synthesis in chloroplasts, driven by light energy via the
            photosystem electron transport chain. Occurs in thylakoid membranes.
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>ATP Recycling</h3>
      <p>
        Cells maintain a very small pool of ATP — typically only a few seconds
        worth of supply at any moment. A human body turns over its entire body
        weight (~50 kg) of ATP daily. This is why metabolic pathways must be
        tightly regulated: if ATP production stops, cells exhaust their supply
        within seconds.
      </p>

      <EquationBlock
        equation={{
          id: "atp-turnover",
          latex: "ATP \\rightleftharpoons ADP + P_i + \\text{energy}",
          description: "The ATP/ADP cycle",
        }}
      />

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "atp-worked-1",
            question:
              "A cell hydrolyses 10,000 ATP molecules per second during active transport. If each ATP provides ~30.5 kJ/mol, calculate the total energy turnover per second in a cell containing 1 × 10⁻¹² mol of ATP (Avogadro constant: 6.02 × 10²³ mol⁻¹).",
            hints: [
              "How many ATP molecules are in the cell?",
              "How many times must each ATP be recycled per second?",
              "What is the energy of one ATP hydrolysis in joules?",
            ],
            solution:
              "Total ATP = 1 × 10⁻¹² mol × 6.02 × 10²³ = 6.02 × 10¹¹ molecules. Each molecule is recycled: 10,000 / (6.02 × 10¹¹) ≈ 1.66 × 10⁻⁸ times per second, meaning each ATP lasts ~60 ns before being recycled. Energy per ATP = (30,500 J/mol) / (6.02 × 10²³ mol⁻¹) = 5.07 × 10⁻²⁰ J. Total energy per second = 10,000 × 5.07 × 10⁻²⁰ = 5.07 × 10⁻¹⁶ W.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Adenine + Ribose + 3 Phosphates (nucleotide)",
          "ATP → ADP + Pᵢ: ~30.5 kJ/mol exergonic",
          "Energy coupling: ATP hydrolysis drives endergonic reactions",
          "Substrate-level: direct in glycolysis/Krebs",
          "Oxidative: proton gradient via ETC (major source)",
          "Photo: light-driven in chloroplasts",
          "Body recycles ~50 kg ATP/day",
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

      <QuickFire questions={recallQuestions.slice(2, 3)} title="Final Check" />
    </div>
  ),
  questions: [
    {
      id: "atp-q1",
      type: "multiple-choice",
      prompt: "What are the three components of ATP?",
      answer: "Adenine, ribose, three phosphate groups",
      difficulty: "recall",
      options: [
        "Adenine, deoxyribose, three phosphate groups",
        "Adenine, ribose, three phosphate groups",
        "Guanine, ribose, three phosphate groups",
        "Adenine, ribose, two phosphate groups",
      ],
    },
    {
      id: "atp-q2",
      type: "multiple-choice",
      prompt:
        "How much energy is released by ATP hydrolysis under standard conditions?",
      answer: "~30.5 kJ/mol",
      difficulty: "recall",
      options: ["~7.5 kJ/mol", "~30.5 kJ/mol", "~57 kJ/mol", "~100 kJ/mol"],
    },
    {
      id: "atp-q3",
      type: "multiple-choice",
      prompt: "Which type of ATP synthesis requires a membrane gradient?",
      answer: "Oxidative phosphorylation",
      difficulty: "recall",
      options: [
        "Substrate-level phosphorylation",
        "Oxidative phosphorylation",
        "Both",
        "Neither",
      ],
    },
    {
      id: "atp-q4",
      type: "multiple-choice",
      prompt: "Why is the ATP/ADP cycle important?",
      answer: "ATP is constantly recycled because cells store very little",
      difficulty: "apply",
      options: [
        "ATP is produced once and lasts for days",
        "ATP is constantly recycled because cells store very little",
        "ADP is toxic and must be converted quickly",
        "ATP cannot be synthesised",
      ],
    },
    {
      id: "atp-q5",
      type: "multiple-choice",
      prompt:
        "Approximately how much ATP (~kg) does the human body recycle per day?",
      answer: "~50 kg",
      difficulty: "apply",
      options: ["~5 kg", "~50 kg", "~500 kg", "~2 kg"],
      imatYear: 2022,
    },
    {
      id: "atp-q6",
      type: "explain-why",
      prompt:
        "Explain why ATP phosphoanhydride bonds are described as 'high-energy' despite being relatively weak covalent bonds.",
      answer:
        "They are 'high-energy' because hydrolysis is highly exergonic (ΔG ≈ −30.5 kJ/mol). This is due to: (1) electrostatic repulsion between adjacent negative phosphate groups, (2) greater resonance stabilisation of products, (3) increased entropy from free phosphate. The bonds themselves are not unusually strong — the products are more stable.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "glycolysis",
    "krebs-cycle",
    "electron-transport-chain",
    "fermentation",
    "photosynthesis",
  ],
  prerequisites: [],
};
