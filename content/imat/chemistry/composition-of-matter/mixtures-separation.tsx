import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "mixtures-separation",
  subject: "chemistry",
  topic: "composition-of-matter",
  title: "Mixtures & Separation Techniques",
  summary:
    "Combinations of two or more substances not chemically bonded — homogeneous (solutions) or heterogeneous — separable by physical methods.",
  memoryHook:
    "Homogeneous = 'homogenized milk' (looks uniform); Heterogeneous = 'heterogeneous salad' (you can see the parts). Filter → Distill → Chromatograph → Centrifuge.",
  imatTrap:
    "Air is a homogeneous mixture (solution of gases), NOT a compound. Alloys (e.g. brass) are solid solutions — homogeneous mixtures, not compounds. The components retain their individual properties.",
  whyItMatters:
    "IMAT frequently asks which separation technique to use for a given mixture. Knowing when to filter, distil, or chromatograph is essential for lab-based questions.",
  explanation: (
    <div>
      <p>
        A <strong>mixture</strong> contains two or more substances physically
        combined — no chemical bonding, variable composition, and separable by
        physical means.
      </p>
      <h3>Types of Mixtures</h3>
      <ul>
        <li>
          <strong>Homogeneous</strong> (uniform throughout): solutions like
          saltwater, air, brass. Only one visible phase.
        </li>
        <li>
          <strong>Heterogeneous</strong> (non-uniform): sand + iron filings, oil
          + water. Multiple visible phases.
        </li>
      </ul>
      <h3>Separation Techniques</h3>
      <ul>
        <li>
          <strong>Filtration</strong> — separates insoluble solid from liquid
          (sand from water). Based on particle size.
        </li>
        <li>
          <strong>Distillation</strong> — separates liquids by boiling point.
          Simple distillation for large BP differences; fractional for close BPs
          (e.g. ethanol/water).
        </li>
        <li>
          <strong>Chromatography</strong> — separates dissolved substances by
          differential attraction to stationary vs mobile phase. Rf = distance
          of spot ÷ distance of solvent front.
        </li>
        <li>
          <strong>Centrifugation</strong> — separates by density using rapid
          spinning (blood components).
        </li>
        <li>
          <strong>Evaporation</strong> — removes solvent to recover dissolved
          solid (salt from saltwater).
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "mix-sep-q1",
      type: "multiple-choice",
      prompt:
        "Which technique best separates ethanol (BP 78°C) from water (BP 100°C)?",
      answer: "Fractional distillation",
      options: [
        "Filtration",
        "Fractional distillation",
        "Chromatography",
        "Centrifugation",
      ],
      explanation:
        "Ethanol and water are miscible liquids with different boiling points. Fractional distillation exploits this difference to separate them.",
      difficulty: "apply",
    },
    {
      id: "mix-sep-q2",
      type: "fill-blank",
      prompt:
        "In paper chromatography, Rf = distance travelled by spot ÷ distance travelled by ______.",
      answer: "solvent front",
      explanation:
        "Rf (retention factor) is the ratio of the distance the substance moved to the distance the solvent front moved. It is constant for a given substance under fixed conditions.",
      difficulty: "recall",
    },
    {
      id: "mix-sep-q3",
      type: "true-false",
      prompt: "Air is a compound because it contains nitrogen and oxygen.",
      answer: "False",
      explanation:
        "Air is a homogeneous mixture (solution) of gases. The components are not chemically bonded and can be separated by fractional distillation of liquid air.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["pure-substances", "concentration", "solubility"],
  prerequisites: ["pure-substances"],
};

export default note;
