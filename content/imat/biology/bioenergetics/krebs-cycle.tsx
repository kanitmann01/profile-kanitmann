"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question:
      "Per glucose, how many CO₂ molecules are released in the Krebs cycle?",
    answer: "4 (2 per pyruvate × 2 pyruvate per glucose)",
    hint: "Each pyruvate loses 1 CO₂ before entering and 2 CO₂ during the cycle",
    context: "Decarboxylation steps",
  },
  {
    id: "qf-2",
    question:
      "What is the first product formed when acetyl-CoA enters the Krebs cycle?",
    answer: "Citrate (citric acid)",
    hint: "Oxaloacetate + acetyl-CoA → ?",
    context: "Condensation reaction",
  },
  {
    id: "qf-3",
    question: "How many ATP (GTP) are produced per turn of the Krebs cycle?",
    answer: "1 (as GTP, which converts to ATP)",
    context: "Substrate-level phosphorylation",
  },
];

export const krebsCycleNote: AtomicNote = {
  slug: "krebs-cycle",
  subject: "biology",
  topic: "bioenergetics",
  title: "Krebs Cycle (Citric Acid Cycle)",
  summary:
    "A cyclic series of 8 enzyme-catalysed reactions in the mitochondrial matrix that oxidises acetyl-CoA to CO₂, producing 3 NADH, 1 FADH₂, and 1 GTP per turn. The central hub of cellular metabolism.",
  memoryHook:
    "Can I Keep Selling Sex For Money, Officer? → Citrate → Isocitrate → α-Ketoglutarate → Succinyl-CoA → Succinate → Fumarate → Malate → Oxaloacetate",
  imatTrap:
    "The Krebs cycle does NOT directly consume O₂ — it is an aerobic process only because the NADH/FADH₂ it produces require O₂ in the ETC. Also: each glucose produces 2 pyruvate → 2 acetyl-CoA → 2 turns of the cycle. Trap numbers: per TURN (1 acetyl-CoA) vs per GLUCOSE (2 turns). Per turn: 3 NADH, 1 FADH₂, 1 GTP, 2 CO₂.",
  whyItMatters:
    "The Krebs cycle is amphibolic — it serves both catabolic (energy release) and anabolic (biosynthetic precursor) roles. Intermediates like α-ketoglutarate and oxaloacetate are precursors for amino acids. In fasting, oxaloacetate is diverted to gluconeogenesis, slowing the cycle — this is the basis of ketosis.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Energy yield per turn vs per glucose",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Location and O₂ dependency (indirect)",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Amphibolic role and anaplerotic reactions",
    },
  ],
  equations: [
    {
      id: "krebs-net",
      latex:
        "Acetyl\\text{-}CoA + 3\\ NAD^+ + FAD + GDP + P_i + 2\\ H_2O \\longrightarrow 2\\ CO_2 + 3\\ NADH + FADH_2 + GTP + 2\\ H^+ + CoA",
      description: "Net reaction of one Krebs cycle turn",
    },
    {
      id: "krebs-pdh",
      latex:
        "Pyruvate + CoA + NAD^+ \\xrightarrow{\\text{PDH}} Acetyl\\text{-}CoA + CO_2 + NADH",
      description:
        "Pyruvate dehydrogenase — link reaction (not technically part of the cycle)",
    },
    {
      id: "krebs-citrate-synthase",
      latex:
        "Oxaloacetate + Acetyl\\text{-}CoA + H_2O \\xrightarrow{\\text{Citrate synthase}} Citrate + CoA",
      description:
        "First reaction: condensation of oxaloacetate and acetyl-CoA",
    },
    {
      id: "krebs-substrate-level",
      latex:
        "Succinyl\\text{-}CoA + GDP + P_i \\xrightarrow{\\text{Succinyl-CoA synthetase}} Succinate + GTP + CoA",
      description:
        "Substrate-level phosphorylation — the only GTP (ATP) producing step",
    },
  ],
  workedExamples: [
    {
      id: "krebs-worked-1",
      question:
        "A cell is treated with malonate, a competitive inhibitor of succinate dehydrogenase (succinate → fumarate). Predict which metabolites accumulate and which become depleted.",
      hints: [
        "Succinate dehydrogenase converts succinate to fumarate. Where is this in the cycle order?",
        "What happens upstream of a blocked enzyme in a cycle?",
        "How would downstream products (malate → oxaloacetate) be affected?",
      ],
      solution:
        "Succinate accumulates upstream of the block. Fumarate, malate, and oxaloacetate become depleted because they cannot be regenerated from succinate. Since oxaloacetate is needed to condense with incoming acetyl-CoA, the cycle slows — citrate may also accumulate slightly. NADH and FADH₂ production falls, reducing ATP yield from the ETC. Malonate is a classic experimental tool in bioenergetics research.",
      imatYear: 2022,
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Krebs Cycle",
      url: "https://www.khanacademy.org/science/biology/cellular-respiration-and-fermentation/krebs-cycle/v/krebs-cycle",
      type: "video",
      description: "Walkthrough of all 8 steps with clear graphics",
    },
    {
      title: "Ninja Nerd — Krebs Cycle Lecture",
      url: "https://www.youtube.com/watch?v=juM2RO5mB8c",
      type: "video",
      description: "Detailed board-style lecture with regulation",
    },
    {
      title: "OpenStax Biology 2e — The Citric Acid Cycle",
      url: "https://openstax.org/books/biology-2e/pages/7-3-the-citric-acid-cycle",
      type: "textbook",
      description: "Free textbook chapter with diagrams and questions",
    },
  ],
  highYieldPoints: [
    "Location: mitochondrial matrix — NOT cytoplasm",
    "Per turn: 3 NADH + 1 FADH₂ + 1 GTP + 2 CO₂",
    "Per glucose: ×2 = 6 NADH + 2 FADH₂ + 2 GTP + 4 CO₂",
    "O₂ not directly used — cycle is O₂-dependent via NADH/FADH₂ recycling",
    "Rate-limiting enzymes: isocitrate dehydrogenase and α-ketoglutarate dehydrogenase",
    "Amphibolic: provides precursors for amino acids, nucleotides, haem",
    "Pyruvate dehydrogenase (link reaction) is a massive enzyme complex — 3 enzymes, 5 cofactors",
  ],
  explanation: (
    <div>
      <p>
        The <strong>Krebs cycle</strong> (citric acid cycle / TCA cycle) is the
        cell&apos;s central metabolic hub. It takes place in the{" "}
        <strong>mitochondrial matrix</strong> and completes the oxidation of
        glucose-derived carbon atoms to CO₂. Each turn produces high-energy
        electron carriers and a small amount of GTP.
      </p>

      <h3>Entry: The Link Reaction</h3>
      <p>
        Before entering the cycle, pyruvate is transported into the
        mitochondrial matrix and decarboxylated by{" "}
        <strong>pyruvate dehydrogenase</strong> (PDH). PDH converts pyruvate to
        acetyl-CoA, releasing 1 CO₂ and producing 1 NADH. PDH is a giant
        multi-enzyme complex requiring 5 cofactors: TPP, lipoic acid, CoA, FAD,
        and NAD⁺.
      </p>

      <EquationBlock
        equation={{
          id: "krebs-pdh",
          latex:
            "Pyruvate + CoA + NAD^+ \\xrightarrow{\\text{PDH}} Acetyl\\text{-}CoA + CO_2 + NADH",
          description: "Pyruvate dehydrogenase (link reaction)",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>The 8 Reactions of the Cycle</h3>

      <h4>Step 1: Citrate Formation</h4>
      <p>
        Acetyl-CoA (2C) condenses with oxaloacetate (4C) to form{" "}
        <strong>citrate</strong> (6C), catalysed by{" "}
        <strong>citrate synthase</strong>. This is the entry point and a key
        regulation site.
      </p>

      <EquationBlock
        equation={{
          id: "krebs-citrate-synthase",
          latex:
            "Oxaloacetate + Acetyl\\text{-}CoA + H_2O \\xrightarrow{\\text{Citrate synthase}} Citrate + CoA",
          description: "Citrate synthase — aldol condensation",
        }}
      />

      <h4>Steps 2–3: Isomerisation & First Decarboxylation</h4>
      <p>
        Citrate is isomerised to <strong>isocitrate</strong>, then undergoes the
        first oxidative decarboxylation to <strong>α-ketoglutarate</strong>,
        catalysed by <strong>isocitrate dehydrogenase</strong>. This produces
        the first NADH and releases the first CO₂.
      </p>

      <h4>
        Steps 4–5: Second Decarboxylation & Substrate-Level Phosphorylation
      </h4>
      <p>
        α-Ketoglutarate is decarboxylated to <strong>succinyl-CoA</strong> (4C)
        by <strong>α-ketoglutarate dehydrogenase</strong> (second NADH, second
        CO₂). Then <strong>succinyl-CoA synthetase</strong> converts
        succinyl-CoA to
        <strong>succinate</strong>, producing GTP via substrate-level
        phosphorylation.
      </p>

      <EquationBlock
        equation={{
          id: "krebs-substrate-level",
          latex:
            "Succinyl\\text{-}CoA + GDP + P_i \\xrightarrow{\\text{Succinyl-CoA synthetase}} Succinate + GTP + CoA",
          description: "Substrate-level phosphorylation step",
        }}
      />

      <h4>Steps 6–8: Regeneration of Oxaloacetate</h4>
      <p>
        Succinate is oxidised to <strong>fumarate</strong> (FADH₂ produced,
        catalysed by succinate dehydrogenase — this complex is actually part of
        ETC Complex II). Fumarate is hydrated to <strong>malate</strong>, then
        malate is oxidised to
        <strong>oxaloacetate</strong>, producing a third NADH. Oxaloacetate can
        now accept another acetyl-CoA and begin the next turn.
      </p>

      <h3>Regulation</h3>
      <div className="grid gap-3">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="font-semibold text-sm">
            Pyruvate Dehydrogenase (PDH)
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Inhibited by ATP, NADH, and acetyl-CoA. Activated by pyruvate, ADP,
            and Ca²⁺. PDH kinase (inactivates PDH) is activated by ATP/NADH.
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="font-semibold text-sm">Isocitrate Dehydrogenase</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Rate-limiting step of the cycle. Activated by ADP, inhibited by ATP
            and NADH.
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="font-semibold text-sm">
            α-Ketoglutarate Dehydrogenase
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Similar regulation to PDH. Inhibited by ATP, GTP, NADH,
            succinyl-CoA.
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Energy Yield Summary</h3>
      <div className="my-4 grid grid-cols-2 gap-3 rounded-lg border bg-card p-4">
        <div>
          <h4 className="text-sm font-semibold text-red-500">Per Turn</h4>
          <p className="text-lg font-bold">3 NADH + 1 FADH₂ + 1 GTP</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-green-500">Per Glucose</h4>
          <p className="text-lg font-bold">6 NADH + 2 FADH₂ + 2 GTP</p>
        </div>
        <div className="col-span-2 border-t pt-2">
          <h4 className="text-sm font-semibold">ATP Equivalents</h4>
          <p className="text-lg font-bold">
            ~24 ATP (per glucose) from Krebs alone via ETC
          </p>
        </div>
      </div>

      <h3>Clinical Corner</h3>
      <p>
        Arsenic poisoning targets the lipoic acid cofactor of PDH and
        α-ketoglutarate dehydrogenase, blocking the cycle. Fluoroacetate (found
        in some plants) is converted to fluorocitrate, which inhibits aconitase
        — causing citrate accumulation and cycle arrest. Both cause severe
        energy depletion.
      </p>

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "krebs-worked-1",
            question:
              "A cell is treated with malonate, a competitive inhibitor of succinate dehydrogenase (succinate → fumarate). Predict which metabolites accumulate and which become depleted.",
            hints: [
              "Succinate dehydrogenase converts succinate to fumarate. Where is this in the cycle order?",
              "What happens upstream of a blocked enzyme in a cycle?",
              "How would downstream products (malate → oxaloacetate) be affected?",
            ],
            solution:
              "Succinate accumulates upstream of the block. Fumarate, malate, and oxaloacetate become depleted because they cannot be regenerated from succinate. Since oxaloacetate is needed to condense with incoming acetyl-CoA, the cycle slows — citrate may also accumulate slightly. NADH and FADH₂ production falls, reducing ATP yield from the ETC. Malonate is a classic experimental tool in bioenergetics research.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Location: mitochondrial matrix",
          "8 reactions, cyclic — oxaloacetate regenerated",
          "Per turn: 3 NADH + 1 FADH₂ + 1 GTP + 2 CO₂",
          "Per glucose: 2 turns (6 NADH + 2 FADH₂ + 2 GTP)",
          "O₂ NOT directly used, but cycle stops without ETC",
          "3 regulation points: PDH, IDH, α-KGDH",
          "Amphibolic: both catabolic and anabolic",
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
      id: "krebs-q1",
      type: "multiple-choice",
      prompt: "Where does the Krebs cycle occur in eukaryotic cells?",
      answer: "Mitochondrial matrix",
      difficulty: "recall",
      options: [
        "Cytoplasm",
        "Mitochondrial matrix",
        "Inner mitochondrial membrane",
        "Outer mitochondrial membrane",
      ],
    },
    {
      id: "krebs-q2",
      type: "multiple-choice",
      prompt:
        "Per turn of the Krebs cycle, how many molecules of CO₂ are released?",
      answer: "2",
      difficulty: "recall",
      options: ["1", "2", "3", "4"],
    },
    {
      id: "krebs-q3",
      type: "multiple-choice",
      prompt: "Which enzyme catalyses the first reaction of the Krebs cycle?",
      answer: "Citrate synthase",
      difficulty: "recall",
      options: [
        "Isocitrate dehydrogenase",
        "Citrate synthase",
        "Succinyl-CoA synthetase",
        "Malate dehydrogenase",
      ],
    },
    {
      id: "krebs-q4",
      type: "multiple-choice",
      prompt: "Succinate dehydrogenase is part of which ETC complex?",
      answer: "Complex II",
      difficulty: "apply",
      options: ["Complex I", "Complex II", "Complex III", "Complex IV"],
    },
    {
      id: "krebs-q5",
      type: "multiple-choice",
      prompt:
        "How many FADH₂ molecules are produced per glucose molecule in the Krebs cycle?",
      answer: "2",
      difficulty: "apply",
      options: ["1", "2", "3", "4"],
      imatYear: 2022,
    },
    {
      id: "krebs-q6",
      type: "explain-why",
      prompt: "Why does the Krebs cycle slow down when ATP levels are high?",
      answer:
        "ATP inhibits isocitrate dehydrogenase and α-ketoglutarate dehydrogenase via allosteric regulation. High ATP signals ample energy, so the cycle slows to prevent wasteful oxidation of acetyl-CoA.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["glycolysis", "electron-transport-chain", "atp", "fermentation"],
  prerequisites: ["glycolysis", "atp"],
};
