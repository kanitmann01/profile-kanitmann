import type { AtomicNote } from "@/data/imat/types";

export const fermentationNote: AtomicNote = {
  slug: "fermentation",
  subject: "biology",
  topic: "bioenergetics",
  title: "Fermentation (Anaerobic Respiration)",
  summary:
    "An anaerobic pathway that regenerates NAD⁺ from NADH, allowing glycolysis to continue. Produces lactic acid (animals) or ethanol + CO₂ (yeast). Net yield: 2 ATP per glucose (from glycolysis only).",
  memoryHook:
    '"No Oxygen? No Problem — But Only 2 ATP!" — Fermentation doesn\'t make extra ATP; it just recycles NAD⁺ so glycolysis can keep running.',
  imatTrap:
    "Fermentation produces NO additional ATP beyond glycolysis. Its sole purpose is to regenerate NAD⁺. Lactic acid fermentation occurs in animal muscle cells AND some bacteria; alcoholic fermentation occurs in yeast and some plants. Don't confuse CO₂ production (alcoholic only) with lactic acid fermentation.",
  whyItMatters:
    "During intense exercise, muscle cells switch to lactic acid fermentation when O₂ supply is insufficient, causing the 'burn'. Lactate is later converted back to pyruvate in the liver (Cori cycle). Yeast alcoholic fermentation is the basis of bread-making (CO₂ rises dough) and brewing (ethanol).",
  explanation: (
    <div>
      <p>
        When oxygen is unavailable, the ETC cannot accept electrons from NADH.
        Without NAD⁺ regeneration, glycolysis would halt. Fermentation solves
        this by transferring electrons from NADH back to pyruvate (or a
        derivative), regenerating NAD⁺.
      </p>
      <h3>Lactic Acid Fermentation (Animals, Some Bacteria)</h3>
      <ul>
        <li>Pyruvate + NADH → Lactate + NAD⁺</li>
        <li>
          Enzyme: <strong>Lactate dehydrogenase (LDH)</strong>
        </li>
        <li>No CO₂ produced</li>
        <li>
          Occurs in: skeletal muscle during strenuous exercise, red blood cells
        </li>
      </ul>
      <h3>Alcoholic Fermentation (Yeast, Some Plants)</h3>
      <ul>
        <li>Pyruvate → Acetaldehyde + CO₂ (pyruvate decarboxylase)</li>
        <li>Acetaldehyde + NADH → Ethanol + NAD⁺ (alcohol dehydrogenase)</li>
        <li>CO₂ is released (this is why bread rises)</li>
      </ul>
      <h3>Energy Yield</h3>
      <p>
        Only <strong>2 ATP per glucose</strong> (from glycolysis). The
        fermentation steps themselves produce zero ATP — they only recycle NAD⁺.
      </p>
    </div>
  ),
  questions: [
    {
      id: "ferm-q1",
      type: "multiple-choice",
      prompt:
        "What is the primary purpose of fermentation in anaerobic conditions?",
      answer: "Regenerate NAD⁺ so glycolysis can continue",
      explanation:
        "Fermentation does not produce additional ATP. It recycles NADH → NAD⁺, which is required for glycolysis to keep running.",
      difficulty: "apply",
      options: [
        "Produce additional ATP beyond glycolysis",
        "Regenerate NAD⁺ so glycolysis can continue",
        "Convert pyruvate into acetyl-CoA",
        "Feed electrons into the electron transport chain",
      ],
    },
    {
      id: "ferm-q2",
      type: "true-false",
      prompt: "Lactic acid fermentation produces CO₂ as a by-product.",
      answer: "False",
      explanation:
        "Lactic acid fermentation converts pyruvate directly to lactate without releasing CO₂. Only alcoholic fermentation releases CO₂.",
      difficulty: "recall",
    },
    {
      id: "ferm-q3",
      type: "explain-why",
      prompt:
        "Why can't human muscle cells sustain lactic acid fermentation indefinitely?",
      answer:
        "Lactate accumulation lowers intracellular pH, denaturing enzymes and causing muscle fatigue/pain. Additionally, at only 2 ATP/glucose, fermentation cannot meet the energy demands of sustained activity. Lactate must be shuttled to the liver for conversion back to glucose (Cori cycle).",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["glycolysis", "electron-transport-chain", "atp"],
  prerequisites: ["glycolysis", "atp"],
};
