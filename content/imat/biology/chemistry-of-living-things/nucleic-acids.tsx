import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "nucleic-acids",
  subject: "biology",
  topic: "chemistry-of-living-things",
  title: "Nucleic Acids",
  summary:
    "Polymers of nucleotides (DNA and RNA) that store and transmit genetic information, with ATP serving as the universal energy currency.",
  memoryHook:
    "DNA = 'Double-stranded Deoxyribose Nucleic Acid'. RNA = 'Ribonucleic Acid, single-stranded'. Base pairs: 'Apples in the Tree, Cars in the Garage' (A-T in DNA, C-G; A-U in RNA, C-G). ATP = 'Adenosine Tri-Phosphate = 3 phosphate 'P's like a fully-charged battery'.",
  imatTrap:
    "Saying DNA and RNA differ only in the sugar. They also differ in bases (T vs U) AND strandedness (double vs single). Also: phosphodiester bonds link nucleotides in the backbone; hydrogen bonds link bases across strands.",
  whyItMatters:
    "mRNA vaccines (e.g., COVID-19) exploit the cell's natural ability to read RNA and produce viral spike proteins — a direct application of nucleic acid biology.",
  explanation: (
    <div>
      <p>
        <strong>Nucleotide</strong> = phosphate group + pentose sugar +
        nitrogenous base.
      </p>
      <p>
        <strong>DNA vs RNA:</strong>
      </p>
      <ul>
        <li>
          <strong>Sugar</strong>: DNA has deoxyribose (lacks –OH at C2′); RNA
          has ribose (has –OH at C2′)
        </li>
        <li>
          <strong>Bases</strong>: DNA uses A, T, C, G; RNA uses A, U, C, G
        </li>
        <li>
          <strong>Structure</strong>: DNA is double-stranded (antiparallel
          double helix); RNA is typically single-stranded
        </li>
      </ul>
      <p>
        <strong>Phosphodiester bonds</strong> link the 3′-OH of one nucleotide
        to the 5′-phosphate of the next, forming the sugar-phosphate backbone.
      </p>
      <p>
        <strong>Base pairing</strong> (Chargaff's rules): A pairs with T (2
        hydrogen bonds) in DNA, or U in RNA; C pairs with G (3 hydrogen bonds).
        More G-C pairs = higher melting temperature.
      </p>
      <p>
        <strong>ATP</strong> (adenosine triphosphate): adenine + ribose + 3
        phosphate groups. Energy is released when the terminal phosphate bond is
        hydrolysed → ADP + Pᵢ. It is the universal energy currency of the cell.
      </p>
    </div>
  ),
  questions: [
    {
      id: "na-q1",
      type: "multiple-choice",
      prompt:
        "How many hydrogen bonds form between cytosine and guanine in DNA?",
      answer: "3",
      options: ["1", "2", "3", "4"],
      explanation:
        "C-G base pairs form 3 hydrogen bonds, while A-T pairs form only 2. This is why GC-rich DNA has a higher melting temperature.",
      difficulty: "recall",
    },
    {
      id: "na-q2",
      type: "fill-blank",
      prompt:
        "The bond that links adjacent nucleotides in the DNA backbone is called a ______ bond.",
      answer: "phosphodiester",
      explanation:
        "Phosphodiester bonds connect the 3′ carbon of one deoxyribose to the 5′ phosphate of the next nucleotide.",
      difficulty: "recall",
    },
    {
      id: "na-q3",
      type: "true-false",
      prompt: "RNA contains the base thymine instead of uracil.",
      answer: "False",
      explanation:
        "RNA contains uracil (U) instead of thymine (T). Thymine is found only in DNA.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["proteins", "weak-interactions"],
  prerequisites: [],
};

export default note;
