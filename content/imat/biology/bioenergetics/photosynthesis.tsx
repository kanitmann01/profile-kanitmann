import type { AtomicNote } from "@/data/imat/types";

export const photosynthesisNote: AtomicNote = {
  slug: "photosynthesis",
  subject: "biology",
  topic: "bioenergetics",
  title: "Photosynthesis",
  summary:
    "Chloroplast-based process converting light energy + CO₂ + H₂O → glucose + O₂. Light reactions (thylakoid) produce ATP and NADPH; the Calvin cycle (stroma) fixes CO₂ into G3P.",
  memoryHook:
    '"Plants Are Totally Green Machines" — Light reactions: Photosystem II → ETC → Photosystem I → NADPH. Calvin cycle: RuBisCO fixes CO₂ onto RuBP → 3-PGA → G3P.',
  imatTrap:
    "O₂ released in photosynthesis comes from H₂O (split at PSII), NOT from CO₂. The Calvin cycle does NOT directly require light, but it depends on ATP and NADPH from the light reactions, so it stops in the dark. RuBisCO can also fix O₂ instead of CO₂ (photorespiration — wasteful).",
  whyItMatters:
    "Photosynthesis is the foundation of nearly all food chains. RuBisCO is the most abundant enzyme on Earth. Understanding the Calvin cycle is key to crop yield improvement (C₃ vs C₄ vs CAM plants). The herbicide atrazine blocks the ETC in PSII, killing weeds.",
  explanation: (
    <div>
      <p>
        Photosynthesis occurs in the <strong>chloroplast</strong>. It has two
        stages: the <strong>light-dependent reactions</strong> (thylakoid
        membranes) and the <strong>light-independent reactions</strong> (Calvin
        cycle, in the stroma).
      </p>
      <h3>Light-Dependent Reactions (Thylakoid)</h3>
      <ul>
        <li>
          <strong>Photosystem II (PSII):</strong> Light excites P680; H₂O is
          split (photolysis) → O₂ + 2H⁺ + 2e⁻. Electrons pass through an ETC,
          pumping H⁺ into the thylakoid lumen.
        </li>
        <li>
          <strong>Photosystem I (PSI):</strong> Light re-excites P700; electrons
          reduce NADP⁺ → NADPH via ferredoxin-NADP⁺ reductase.
        </li>
        <li>
          <strong>ATP synthase:</strong> H⁺ flows back through ATP synthase
          (chemiosmosis) → ATP (photophosphorylation).
        </li>
        <li>
          Products: <strong>ATP + NADPH + O₂</strong>
        </li>
      </ul>
      <h3>Calvin Cycle (Stroma) — Light-Independent</h3>
      <ul>
        <li>
          <strong>Carbon fixation:</strong> RuBisCO catalyses CO₂ + RuBP (5C) →
          2 × 3-PGA (3C).
        </li>
        <li>
          <strong>Reduction:</strong> 3-PGA is phosphorylated by ATP and reduced
          by NADPH → G3P (glyceraldehyde-3-phosphate).
        </li>
        <li>
          <strong>Regeneration:</strong> Some G3P exits to form glucose; the
          rest regenerates RuBP (requires ATP).
        </li>
        <li>
          To produce <strong>1 G3P</strong> that exits: 3 CO₂ fixed, 9 ATP and 6
          NADPH consumed.
        </li>
      </ul>
      <h3>Overall Equation</h3>
      <p>6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 O₂</p>
    </div>
  ),
  questions: [
    {
      id: "photo-q1",
      type: "multiple-choice",
      prompt: "The oxygen released during photosynthesis originates from:",
      answer: "Water (H₂O)",
      explanation:
        "Photolysis of water at PSII releases O₂. The oxygen in CO₂ ends up in glucose and water, not in O₂ gas.",
      difficulty: "recall",
      options: ["Carbon dioxide (CO₂)", "Water (H₂O)", "Glucose", "RuBP"],
    },
    {
      id: "photo-q2",
      type: "fill-blank",
      prompt: "The enzyme that fixes CO₂ in the Calvin cycle is called ______.",
      answer: "RuBisCO",
      explanation:
        "RuBisCO (ribulose-1,5-bisphosphate carboxylase/oxygenase) is the most abundant protein on Earth and catalyses the first step of the Calvin cycle.",
      difficulty: "recall",
    },
    {
      id: "photo-q3",
      type: "explain-why",
      prompt:
        "Why does the Calvin cycle eventually stop in the dark, even though it doesn't directly use light?",
      answer:
        "The Calvin cycle requires ATP and NADPH produced by the light-dependent reactions. In the dark, these supplies run out, so the cycle cannot continue to reduce 3-PGA to G3P.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["atp", "electron-transport-chain"],
  prerequisites: ["atp"],
};
