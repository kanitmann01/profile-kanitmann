import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "lipids",
  subject: "biology",
  topic: "chemistry-of-living-things",
  title: "Lipids",
  summary:
    "Hydrophobic or amphipathic biomolecules including fats, phospholipids, and steroids — essential for energy storage, membrane structure, and signalling.",
  memoryHook:
    "Lipids = 'Long-chain Inert Pockets of energy'. A triglyceride is a 3-fingered glove (3 fatty acids on a glycerol backbone). Phospholipids are the bouncers of the cell — hydrophilic head greets water, hydrophobic tail hides from it.",
  imatTrap:
    "Saying lipids are 'polymers' — they are NOT true polymers because fatty acids are not repeating monomers linked by identical bonds. Also: saturated fats have NO C=C double bonds; unsaturated fats have one or more.",
  whyItMatters:
    "Atherosclerosis results from saturated fat accumulation in arteries. The cis vs trans configuration of unsaturated fats directly affects cardiovascular health — trans fats behave like saturated fats.",
  explanation: (
    <div>
      <p>
        <strong>Triglycerides</strong>: one glycerol + three fatty acids joined
        by <strong>ester bonds</strong> (condensation reaction). Functions:
        energy storage (9 kcal/g — double that of carbs), insulation,
        cushioning.
      </p>
      <ul>
        <li>
          <strong>Saturated</strong>: no C=C double bonds, straight chains,
          solid at room temp (butter)
        </li>
        <li>
          <strong>Unsaturated</strong>: one or more C=C double bonds (cis
          configuration creates kinks), liquid at room temp (olive oil)
        </li>
      </ul>
      <p>
        <strong>Phospholipids</strong>: glycerol + two fatty acids + phosphate
        group. The phosphate head is hydrophilic; the fatty acid tails are
        hydrophobic. This <strong>amphipathic</strong> nature drives bilayer
        formation in aqueous environments — the foundation of all cell
        membranes.
      </p>
      <p>
        <strong>Steroids</strong>: four fused carbon rings (three 6-carbon, one
        5-carbon). Examples: cholesterol (membrane fluidity), testosterone and
        oestrogen (hormones), vitamin D.
      </p>
    </div>
  ),
  questions: [
    {
      id: "lipid-q1",
      type: "multiple-choice",
      prompt:
        "Which type of bond links fatty acids to glycerol in a triglyceride?",
      answer: "Ester bond",
      options: [
        "Peptide bond",
        "Glycosidic bond",
        "Ester bond",
        "Phosphodiester bond",
      ],
      explanation:
        "Ester bonds form via condensation between the –OH of glycerol and the –COOH of fatty acids.",
      difficulty: "recall",
    },
    {
      id: "lipid-q2",
      type: "true-false",
      prompt: "Phospholipids are amphipathic molecules.",
      answer: "True",
      explanation:
        "Phospholipids have a hydrophilic phosphate head and hydrophobic fatty acid tails, making them amphipathic — this drives bilayer formation.",
      difficulty: "recall",
    },
    {
      id: "lipid-q3",
      type: "fill-blank",
      prompt:
        "Unsaturated fatty acids have one or more ______ double bonds, which create kinks that prevent tight packing.",
      answer: "carbon-carbon (C=C)",
      explanation:
        "The cis C=C double bonds introduce kinks, keeping unsaturated fats liquid at room temperature.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["weak-interactions", "proteins"],
  prerequisites: [],
};

export default note;
