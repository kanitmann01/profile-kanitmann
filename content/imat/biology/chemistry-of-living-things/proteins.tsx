import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "proteins",
  subject: "biology",
  topic: "chemistry-of-living-things",
  title: "Proteins",
  summary:
    "Polymers of amino acids linked by peptide bonds, folded into four structural levels to perform virtually every function in living systems.",
  memoryHook:
    "Protein structure = 'Some Puppies Are Tiny' (Secondary, Primary, Tertiary, Quaternary — but remember the ORDER is Primary → Secondary → Tertiary → Quaternary). Amino acids = 'APple' (Amino + acid group on a central Carbon).",
  imatTrap:
    "Confusing denaturation with digestion. Denaturation breaks tertiary/quaternary structure (H-bonds, disulfide) but does NOT break peptide bonds. Digestion (hydrolysis) breaks peptide bonds.",
  whyItMatters:
    "Sickle-cell anaemia results from a single amino acid substitution (glutamic acid → valine) in the β-chain of haemoglobin — demonstrating how primary structure determines 3D shape and function.",
  explanation: (
    <div>
      <p>
        <strong>Amino acids</strong> share a common structure: central carbon
        (α-carbon) bonded to an amino group (–NH₂), a carboxyl group (–COOH), a
        hydrogen atom, and a variable R-group that determines identity and
        properties.
      </p>
      <p>
        <strong>Peptide bonds</strong> form via condensation between the –COOH
        of one amino acid and the –NH₂ of the next, releasing H₂O.
      </p>
      <p>
        <strong>Four levels of structure:</strong>
      </p>
      <ol>
        <li>
          <strong>Primary</strong>: linear sequence of amino acids (covalent
          peptide bonds)
        </li>
        <li>
          <strong>Secondary</strong>: local folding — α-helix and β-pleated
          sheet (stabilised by hydrogen bonds between backbone atoms)
        </li>
        <li>
          <strong>Tertiary</strong>: overall 3D shape (stabilised by H-bonds,
          ionic bonds, disulfide bridges, hydrophobic interactions between
          R-groups)
        </li>
        <li>
          <strong>Quaternary</strong>: assembly of multiple polypeptide subunits
          (e.g., haemoglobin = 4 subunits)
        </li>
      </ol>
      <p>
        <strong>Globular</strong> proteins (enzymes, haemoglobin) are spherical
        and soluble — functional molecules. <strong>Fibrous</strong> proteins
        (collagen, keratin) are elongated and structural.
      </p>
    </div>
  ),
  questions: [
    {
      id: "prot-q1",
      type: "multiple-choice",
      prompt:
        "Which level of protein structure is maintained by hydrogen bonds between the backbone –NH and –C=O groups?",
      answer: "Secondary structure",
      options: [
        "Primary structure",
        "Secondary structure",
        "Tertiary structure",
        "Quaternary structure",
      ],
      explanation:
        "Secondary structure (α-helix and β-sheet) is stabilised by H-bonds between backbone amide and carbonyl groups, NOT between R-groups.",
      difficulty: "recall",
    },
    {
      id: "prot-q2",
      type: "fill-blank",
      prompt:
        "The bond formed between two amino acids during protein synthesis is called a ______ bond.",
      answer: "peptide",
      explanation:
        "A peptide bond is a covalent amide bond formed by condensation between the carboxyl group of one amino acid and the amino group of the next.",
      difficulty: "recall",
    },
    {
      id: "prot-q3",
      type: "true-false",
      prompt:
        "Denaturation of a protein breaks the peptide bonds in its primary structure.",
      answer: "False",
      explanation:
        "Denaturation disrupts secondary, tertiary, and quaternary structure (H-bonds, ionic bonds, disulfide bridges) but leaves the covalent peptide bonds of the primary structure intact.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["nucleic-acids", "enzymes", "weak-interactions"],
  prerequisites: [],
};

export default note;
