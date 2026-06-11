import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "enzymes",
  subject: "biology",
  topic: "chemistry-of-living-things",
  title: "Enzymes",
  summary:
    "Biological catalysts (usually globular proteins) that lower activation energy and accelerate biochemical reactions without being consumed.",
  memoryHook:
    "Enzymes = 'En-action Molecules'. They lower the 'hill' (activation energy) so reactants can roll over faster. Lock-and-key = rigid padlock; Induced fit = a glove that moulds to your hand.",
  imatTrap:
    "Saying enzymes 'provide' activation energy. They do NOT provide energy — they LOWER the activation energy barrier. Also: competitive inhibitors bind the active site; non-competitive inhibitors bind an allosteric site — adding more substrate overcomes competitive but NOT non-competitive inhibition.",
  whyItMatters:
    "Statins competitively inhibit HMG-CoA reductase to lower cholesterol. Understanding enzyme kinetics explains drug design and metabolic disease.",
  explanation: (
    <div>
      <p>
        Enzymes are <strong>biological catalysts</strong> — almost all are
        globular proteins. They speed up reactions by lowering the{" "}
        <strong>activation energy</strong> (Eₐ) without being consumed or
        altering equilibrium.
      </p>
      <p>
        <strong>Active site models:</strong>
      </p>
      <ul>
        <li>
          <strong>Lock-and-key</strong> (Fischer): substrate fits a rigid active
          site precisely — historical model
        </li>
        <li>
          <strong>Induced fit</strong> (Koshland): active site changes shape
          upon substrate binding to achieve optimal fit — current accepted model
        </li>
      </ul>
      <p>
        <strong>Inhibition:</strong>
      </p>
      <ul>
        <li>
          <strong>Competitive</strong>: inhibitor resembles substrate, binds
          active site. Vmax unchanged, Km increased. Overcome by adding more
          substrate.
        </li>
        <li>
          <strong>Non-competitive</strong>: inhibitor binds allosteric site,
          altering enzyme shape. Vmax decreased, Km unchanged. NOT overcome by
          adding substrate.
        </li>
      </ul>
      <p>
        <strong>Factors affecting rate:</strong> temperature (optimum ~37°C in
        humans; too high → denaturation), pH (each enzyme has an optimum),
        substrate concentration (saturates at Vmax), enzyme concentration
        (linear relationship when substrate is excess).
      </p>
    </div>
  ),
  questions: [
    {
      id: "enz-q1",
      type: "multiple-choice",
      prompt: "In non-competitive inhibition, what happens to Vmax and Km?",
      answer: "Vmax decreases, Km unchanged",
      options: [
        "Vmax decreases, Km unchanged",
        "Vmax unchanged, Km increases",
        "Both Vmax and Km decrease",
        "Vmax increases, Km decreases",
      ],
      explanation:
        "Non-competitive inhibitors bind an allosteric site, reducing the number of functional enzymes → lower Vmax. Km is unchanged because substrate affinity of remaining enzymes is unaffected.",
      difficulty: "apply",
    },
    {
      id: "enz-q2",
      type: "true-false",
      prompt:
        "Enzymes lower the activation energy of a reaction by providing energy to the substrate.",
      answer: "False",
      explanation:
        "Enzymes lower activation energy by stabilising the transition state — they do NOT provide energy. The overall ΔG of the reaction is unchanged.",
      difficulty: "apply",
    },
    {
      id: "enz-q3",
      type: "fill-blank",
      prompt:
        "The model in which the active site changes shape upon substrate binding is called the ______ fit model.",
      answer: "induced",
      explanation:
        "The induced fit model (Koshland) proposes that the active site is flexible and moulds around the substrate, unlike the rigid lock-and-key model.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["proteins", "carbohydrates", "weak-interactions"],
  prerequisites: ["proteins"],
};

export default note;
