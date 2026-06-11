import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "weak-interactions",
  subject: "biology",
  topic: "chemistry-of-living-things",
  title: "Weak Interactions in Biology",
  summary:
    "Non-covalent forces — hydrogen bonds, van der Waals forces, ionic interactions, and the hydrophobic effect — that collectively determine the 3D structure of biomolecules.",
  memoryHook:
    "Weak interactions = 'Hollywood relationships' — individually fleeting, but together they hold everything (protein folding, DNA double helix, membrane formation) in shape. H-bonds are the 'strongest' of the weak — like a firm handshake among weak greetings.",
  imatTrap:
    "Calling hydrogen bonds 'covalent'. They are NOT covalent — they are electrostatic attractions between a δ+ hydrogen (bonded to N, O, or F) and a lone pair on another electronegative atom. Also: individual weak bonds are easily broken, but MANY together create significant stability.",
  whyItMatters:
    "Fever denatures proteins by disrupting the weak interactions (especially H-bonds) that maintain tertiary structure — showing how temperature-sensitive these bonds are. Drug design often targets specific weak interactions at enzyme active sites.",
  explanation: (
    <div>
      <p>
        Biological macromolecules are held in their functional 3D shapes by{" "}
        <strong>non-covalent interactions</strong>. Individually weak, but
        collectively decisive.
      </p>
      <p>
        <strong>Hydrogen bonds</strong>: attraction between a hydrogen atom
        covalently bonded to an electronegative atom (N, O, or F) and another
        electronegative atom with a lone pair. Examples: base pairing in DNA
        (A-T: 2 H-bonds, C-G: 3 H-bonds), secondary structure of proteins
        (α-helix, β-sheet), water cohesion.
      </p>
      <p>
        <strong>Ionic bonds (salt bridges)</strong>: electrostatic attraction
        between oppositely charged R-groups (e.g., –NH₃⁺ and –COO⁻). Important
        in tertiary protein structure and enzyme active sites.
      </p>
      <p>
        <strong>Van der Waals forces</strong>: transient dipole-induced dipole
        attractions between all atoms at very close range. Weak individually but
        significant when many atoms are in close contact (e.g., hydrophobic core
        of a protein).
      </p>
      <p>
        <strong>Hydrophobic effect</strong>: nonpolar molecules aggregate in
        water to minimise disruption of water-water H-bonds. This is NOT an
        attraction between hydrophobic molecules — it is water pushing them
        together. Drives membrane formation and protein folding (nonpolar
        R-groups cluster in the interior).
      </p>
    </div>
  ),
  questions: [
    {
      id: "weak-q1",
      type: "multiple-choice",
      prompt:
        "Which interaction is primarily responsible for the formation of the lipid bilayer?",
      answer: "Hydrophobic effect",
      options: [
        "Hydrogen bonds",
        "Ionic bonds",
        "Hydrophobic effect",
        "Covalent bonds",
      ],
      explanation:
        "The hydrophobic effect drives nonpolar fatty acid tails away from water, causing phospholipids to spontaneously form bilayers — the hydrophilic heads face water, hydrophobic tails face inward.",
      difficulty: "apply",
    },
    {
      id: "weak-q2",
      type: "true-false",
      prompt: "A hydrogen bond is a type of covalent bond.",
      answer: "False",
      explanation:
        "Hydrogen bonds are non-covalent electrostatic attractions between a δ+ hydrogen and a lone pair on an electronegative atom. They are much weaker than covalent bonds.",
      difficulty: "recall",
    },
    {
      id: "weak-q3",
      type: "fill-blank",
      prompt:
        "In DNA, adenine and thymine are held together by ______ hydrogen bonds.",
      answer: "2",
      explanation:
        "A-T base pairs form 2 hydrogen bonds, while C-G base pairs form 3 hydrogen bonds. This is why GC-rich DNA is more thermally stable.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["proteins", "nucleic-acids", "lipids", "carbohydrates"],
  prerequisites: [],
};

export default note;
