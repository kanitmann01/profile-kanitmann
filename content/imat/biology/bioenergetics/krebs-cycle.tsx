import type { AtomicNote } from "@/data/imat/types";

export const krebsCycleNote: AtomicNote = {
  slug: "krebs-cycle",
  subject: "biology",
  topic: "bioenergetics",
  title: "Krebs Cycle (Citric Acid Cycle)",
  summary:
    "A mitochondrial matrix cycle that oxidises acetyl-CoA to CO₂, producing 3 NADH, 1 FADH₂, and 1 ATP (GTP) per turn.",
  memoryHook:
    '"Can I Keep Some Super Fresh Malts, Charlie?" — Citrate → Isocitrate → α-Ketoglutarate → Succinyl-CoA → Succinate → Fumarate → Malate → Oxaloacetate',
  imatTrap:
    "Per glucose, the Krebs cycle turns TWICE (2 acetyl-CoA per glucose). Don't forget the 2 CO₂ released per turn — that's 4 CO₂ total from Krebs alone. The cycle itself produces only 1 ATP (via substrate-level phosphorylation); most energy is in NADH and FADH₂.",
  whyItMatters:
    "Thiamine (B₁) deficiency impairs α-ketoglutarate dehydrogenase and pyruvate dehydrogenase, causing beriberi and Wernicke-Korsakoff syndrome. Arsenic poisoning also targets lipoic acid in these enzymes.",
  explanation: (
    <div>
      <p>
        The Krebs cycle (also called the citric acid cycle or TCA cycle) occurs
        in the <strong>mitochondrial matrix</strong>. Before entering the cycle,
        pyruvate from glycolysis undergoes{" "}
        <strong>oxidative decarboxylation</strong> by the pyruvate dehydrogenase
        complex, producing acetyl-CoA + CO₂ + NADH.
      </p>
      <h3>Per Turn (1 Acetyl-CoA)</h3>
      <ul>
        <li>Acetyl-CoA (2C) + Oxaloacetate (4C) → Citrate (6C)</li>
        <li>2 CO₂ released (complete oxidation of the acetyl group)</li>
        <li>3 NADH produced (steps 3, 4, 8)</li>
        <li>1 FADH₂ produced (step 6)</li>
        <li>
          1 ATP (or GTP) produced by substrate-level phosphorylation (step 5)
        </li>
        <li>Oxaloacetate is regenerated (4C) to continue the cycle</li>
      </ul>
      <h3>Per Glucose (2 Turns)</h3>
      <p>6 NADH + 2 FADH₂ + 2 ATP + 4 CO₂</p>
      <h3>Key Regulatory Points</h3>
      <ul>
        <li>
          <strong>Isocitrate dehydrogenase</strong> — activated by ADP,
          inhibited by ATP and NADH.
        </li>
        <li>
          <strong>α-Ketoglutarate dehydrogenase</strong> — requires the same
          co-factors as pyruvate dehydrogenase (TPP, lipoic acid, CoA, FAD,
          NAD⁺).
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "krebs-q1",
      type: "multiple-choice",
      prompt:
        "How many molecules of NADH are produced per turn of the Krebs cycle?",
      answer: "3 NADH",
      explanation:
        "NADH is produced at three steps: isocitrate → α-ketoglutarate, α-ketoglutarate → succinyl-CoA, and malate → oxaloacetate.",
      difficulty: "recall",
      options: ["1 NADH", "2 NADH", "3 NADH", "4 NADH"],
    },
    {
      id: "krebs-q2",
      type: "fill-blank",
      prompt: "The Krebs cycle occurs in the ______ of the mitochondrion.",
      answer: "matrix",
      explanation:
        "The mitochondrial matrix contains all Krebs cycle enzymes. The ETC, by contrast, is on the inner membrane.",
      difficulty: "recall",
    },
    {
      id: "krebs-q3",
      type: "explain-why",
      prompt:
        "Why must the Krebs cycle turn twice for each molecule of glucose metabolised?",
      answer:
        "One glucose yields 2 pyruvate via glycolysis, and each pyruvate is converted to 1 acetyl-CoA. Since each turn of the cycle oxidises 1 acetyl-CoA, two turns are needed per glucose.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["glycolysis", "electron-transport-chain", "atp"],
  prerequisites: ["glycolysis", "atp"],
};
