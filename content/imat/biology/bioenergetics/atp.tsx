import type { AtomicNote } from "@/data/imat/types";

export const atpNote: AtomicNote = {
  slug: "atp",
  subject: "biology",
  topic: "bioenergetics",
  title: "ATP — Structure and Function",
  summary:
    "Adenosine triphosphate (ATP) is the universal energy currency of the cell. Hydrolysis of its high-energy phosphoanhydride bonds releases energy used to drive cellular work.",
  memoryHook:
    '"ATP = Adenosine + 3 Phosphates = A Triple Paycheck" — Break one phosphate → ADP + energy. Break another → AMP + energy. The bonds between phosphates are where the energy lives.',
  imatTrap:
    "ATP does NOT store energy long-term — it's a short-lived intermediary. The energy is in the phosphoanhydride bonds between phosphate groups, NOT in the bonds within the adenine or ribose. ATP → ADP + Pi releases ~30.5 kJ/mol. Don't confuse substrate-level phosphorylation (glycolysis, Krebs) with oxidative phosphorylation (ETC).",
  whyItMatters:
    "A human recycles roughly their body weight in ATP each day. Mitochondrial diseases (e.g., MELAS, Leigh syndrome) impair ATP production, affecting high-energy tissues first — brain, heart, and muscles. Cyanide and carbon monoxide are lethal because they block ATP synthesis.",
  explanation: (
    <div>
      <p>
        <strong>Adenosine triphosphate (ATP)</strong> is a nucleotide consisting
        of adenine (a nitrogenous base), ribose (a 5-carbon sugar), and three
        phosphate groups linked by <strong>phosphoanhydride bonds</strong>.
      </p>
      <h3>Structure</h3>
      <ul>
        <li>
          <strong>Adenine</strong> — purine base
        </li>
        <li>
          <strong>Ribose</strong> — pentose sugar
        </li>
        <li>
          <strong>Three phosphate groups</strong> (α, β, γ) — connected by
          high-energy phosphoanhydride bonds
        </li>
      </ul>
      <h3>ATP Hydrolysis</h3>
      <p>ATP + H₂O → ADP + Pᵢ + energy (ΔG ≈ −30.5 kJ/mol)</p>
      <p>The released energy drives:</p>
      <ul>
        <li>
          <strong>Mechanical work:</strong> muscle contraction, chromosome
          movement
        </li>
        <li>
          <strong>Transport work:</strong> active transport (Na⁺/K⁺ pump)
        </li>
        <li>
          <strong>Chemical work:</strong> biosynthesis (protein, DNA, lipid
          assembly)
        </li>
      </ul>
      <h3>How ATP Is Made</h3>
      <ul>
        <li>
          <strong>Substrate-level phosphorylation:</strong> Direct transfer of a
          phosphate group to ADP (glycolysis steps 7 & 10; Krebs cycle step 5).
        </li>
        <li>
          <strong>Oxidative phosphorylation:</strong> ATP synthase uses the
          proton-motive force from the ETC to phosphorylate ADP (~90% of ATP in
          aerobic respiration).
        </li>
        <li>
          <strong>Photophosphorylation:</strong> In chloroplasts, light-driven
          proton gradients power ATP synthase.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "atp-q1",
      type: "multiple-choice",
      prompt:
        "Which component of ATP is directly responsible for its high energy content?",
      answer: "Phosphoanhydride bonds between phosphate groups",
      explanation:
        "The repulsion between negatively charged phosphate groups makes the phosphoanhydride bonds unstable. Hydrolysis relieves this repulsion, releasing energy.",
      difficulty: "recall",
      options: [
        "The adenine base",
        "The ribose sugar",
        "Phosphoanhydride bonds between phosphate groups",
        "The bond between adenine and ribose",
      ],
    },
    {
      id: "atp-q2",
      type: "true-false",
      prompt: "ATP is a long-term energy storage molecule, similar to fat.",
      answer: "False",
      explanation:
        "ATP is a short-term energy carrier, not a storage molecule. Cells maintain only seconds-worth of ATP. Long-term storage uses molecules like glycogen and triglycerides.",
      difficulty: "recall",
    },
    {
      id: "atp-q3",
      type: "multiple-choice",
      prompt:
        "Approximately how much free energy is released when ATP is hydrolysed to ADP + Pᵢ?",
      answer: "~30.5 kJ/mol",
      explanation:
        "The standard free energy change (ΔG°') for ATP → ADP + Pᵢ is approximately −30.5 kJ/mol under cellular conditions.",
      difficulty: "recall",
      options: ["~7.3 kJ/mol", "~30.5 kJ/mol", "~686 kJ/mol", "~100 kJ/mol"],
    },
  ],
  crosslinks: [
    "glycolysis",
    "krebs-cycle",
    "electron-transport-chain",
    "fermentation",
    "photosynthesis",
  ],
};
