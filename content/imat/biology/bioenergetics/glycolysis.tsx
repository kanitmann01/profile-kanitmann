import type { AtomicNote } from "@/data/imat/types";

export const glycolysisNote: AtomicNote = {
  slug: "glycolysis",
  subject: "biology",
  topic: "bioenergetics",
  title: "Glycolysis",
  summary:
    "A 10-step cytoplasmic pathway that breaks glucose (6C) into 2 pyruvate (3C), yielding a net 2 ATP and 2 NADH.",
  memoryHook:
    '"Good Little Girls In Our Class Learn Pretty New Molecules Fast" — Glucose → G6P → F6P → F1,6BP → DHAP/G3P → 1,3BPG → 3PG → 2PG → PEP → Pyruvate',
  imatTrap:
    "Glycolysis does NOT require oxygen. It occurs in the cytoplasm of ALL cells, prokaryotic and eukaryotic. The investment phase uses 2 ATP; the payoff phase produces 4 ATP — net gain is 2 ATP.",
  whyItMatters:
    "Red blood cells rely exclusively on glycolysis for ATP since they lack mitochondria. Cancer cells favour glycolysis even with O₂ available (Warburg effect), a principle used in PET imaging.",
  explanation: (
    <div>
      <p>
        Glycolysis is the universal first step of cellular respiration,
        occurring in the <strong>cytoplasm</strong>. It converts one molecule of
        glucose (C₆H₁₂O₆) into two molecules of pyruvate (CH₃COCOO⁻).
      </p>
      <h3>Two Phases</h3>
      <ul>
        <li>
          <strong>Investment phase (steps 1–5):</strong> 2 ATP are consumed to
          phosphorylate glucose and split it into two 3-carbon molecules (G3P).
        </li>
        <li>
          <strong>Payoff phase (steps 6–10):</strong> Each G3P is oxidised,
          producing 2 NADH and 4 ATP (substrate-level phosphorylation) per
          glucose.
        </li>
      </ul>
      <h3>Net Yield per Glucose</h3>
      <p>2 Pyruvate + 2 ATP (net) + 2 NADH + 2 H⁺ + 2 H₂O</p>
      <h3>Key Enzymes</h3>
      <ul>
        <li>
          <strong>Hexokinase / Glucokinase</strong> (step 1) — traps glucose
          inside the cell.
        </li>
        <li>
          <strong>Phosphofructokinase-1 (PFK-1)</strong> (step 3) — the major
          rate-limiting, committed step; inhibited by ATP and citrate, activated
          by AMP and F2,6BP.
        </li>
        <li>
          <strong>Pyruvate kinase</strong> (step 10) — generates pyruvate and
          ATP via substrate-level phosphorylation.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "glycolysis-q1",
      type: "multiple-choice",
      prompt:
        "What is the net ATP yield from one molecule of glucose in glycolysis?",
      answer: "2 ATP",
      explanation:
        "4 ATP are produced in the payoff phase, but 2 ATP are consumed in the investment phase, giving a net of 2 ATP.",
      difficulty: "recall",
      options: ["1 ATP", "2 ATP", "4 ATP", "38 ATP"],
    },
    {
      id: "glycolysis-q2",
      type: "multiple-choice",
      prompt: "Where does glycolysis take place in eukaryotic cells?",
      answer: "Cytoplasm (cytosol)",
      explanation:
        "Unlike the Krebs cycle and ETC (mitochondrial), glycolysis occurs entirely in the cytoplasm.",
      difficulty: "recall",
      options: [
        "Mitochondrial matrix",
        "Cytoplasm (cytosol)",
        "Inner mitochondrial membrane",
        "Endoplasmic reticulum",
      ],
    },
    {
      id: "glycolysis-q3",
      type: "explain-why",
      prompt:
        "Why is phosphofructokinase-1 (PFK-1) considered the key regulatory enzyme of glycolysis?",
      answer:
        "PFK-1 catalyses the first committed step (F6P → F1,6BP) and is allosterically regulated — inhibited by high ATP/citrate and activated by AMP/F2,6BP — making it the cell's main metabolic control point for glycolysis.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["atp", "krebs-cycle", "fermentation"],
  prerequisites: ["atp"],
};
