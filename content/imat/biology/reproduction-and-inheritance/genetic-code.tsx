import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "genetic-code",
  subject: "biology",
  topic: "reproduction-and-inheritance",
  title: "The Genetic Code",
  summary:
    "The genetic code is a set of 64 triplet codons that specify 20 amino acids plus 3 stop signals. It is universal, degenerate (redundant), and non-overlapping.",
  memoryHook:
    "Start = AUG (Met) — 'Always Start With AUGust'. Stop codons: UAA, UAG, UGA — 'U Are Annoying, U Are Gross, U Go Away'. The code is degenerate: 61 codons for 20 amino acids, so most amino acids have multiple codons (wobble position = 3rd base).",
  imatTrap:
    "The genetic code is read in NON-OVERLAPPING triplets from a fixed start codon. A single base insertion or deletion causes a FRAME SHIFT, changing every downstream codon. Also, the code is nearly universal — exceptions exist in mitochondria.",
  whyItMatters:
    "Cystic fibrosis is most commonly caused by a 3-base deletion (ΔF508) removing one phenylalanine — not a frameshift, but a single amino acid loss that misfolds the CFTR chloride channel. Understanding codons explains why some mutations are silent while others are devastating.",
  explanation: (
    <div>
      <p>
        The <strong>genetic code</strong> translates the sequence of nucleotide
        bases in mRNA into the sequence of amino acids in a protein.
      </p>
      <h3>Key Properties</h3>
      <ul>
        <li>
          <strong>Triplet:</strong> Each codon = 3 bases. 4³ = 64 possible
          codons.
        </li>
        <li>
          <strong>Degenerate (redundant):</strong> 61 codons encode 20 amino
          acids — most amino acids are specified by more than one codon (usually
          differing at the 3rd "wobble" position).
        </li>
        <li>
          <strong>Non-overlapping:</strong> Each base is read once, in
          sequential triplets.
        </li>
        <li>
          <strong>Universal:</strong> Nearly the same in all organisms
          (exceptions: some mitochondrial codons).
        </li>
        <li>
          <strong>Unambiguous:</strong> Each codon specifies only ONE amino
          acid.
        </li>
      </ul>
      <h3>Start and Stop Codons</h3>
      <ul>
        <li>
          <strong>AUG</strong> = start codon (codes for methionine in
          eukaryotes, formyl-methionine in prokaryotes)
        </li>
        <li>
          <strong>Stop codons:</strong> UAA, UAG, UGA — do not code for any
          amino acid; signal release factors to terminate translation
        </li>
      </ul>
      <h3>Central Dogma</h3>
      <p>
        <strong>DNA → (transcription) → mRNA → (translation) → Protein</strong>
      </p>
      <ul>
        <li>
          <strong>Transcription</strong> (nucleus): RNA polymerase II reads the
          template strand 3′→5′ and synthesises mRNA 5′→3′. Introns are spliced
          out; 5′ cap and poly-A tail are added.
        </li>
        <li>
          <strong>Translation</strong> (cytoplasm/rough ER): Ribosomes read mRNA
          codons. tRNA molecules carry the corresponding amino acid; the
          anticodon pairs with the codon. Peptide bonds form between amino acids
          at the ribosome.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "genetic-code-q1",
      type: "multiple-choice",
      prompt:
        "A mutation changes the mRNA codon UUU to UUC. What is the effect on the protein?",
      answer: "No effect (silent mutation)",
      options: [
        "No effect (silent mutation)",
        "One amino acid is changed",
        "A premature stop codon is created",
        "A frameshift occurs",
      ],
      explanation:
        "UUU and UUC both code for phenylalanine. Because the genetic code is degenerate, a change at the third position may not alter the amino acid — this is a silent mutation.",
      difficulty: "apply",
    },
    {
      id: "genetic-code-q2",
      type: "fill-blank",
      prompt:
        "The start codon is ______, which codes for the amino acid methionine.",
      answer: "AUG",
      explanation:
        "AUG is the universal start codon, encoding methionine (or formyl-methionine in prokaryotes). It establishes the reading frame for translation.",
      difficulty: "recall",
    },
    {
      id: "genetic-code-q3",
      type: "explain-why",
      prompt:
        "Why is a deletion of 3 base pairs usually less harmful than a deletion of 1 or 2 base pairs?",
      answer:
        "A 3-base deletion removes exactly one codon (one amino acid) without shifting the reading frame. A 1- or 2-base deletion causes a frameshift, altering every downstream codon and usually producing a non-functional protein.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "dna-structure",
    "dna-replication",
    "gene-expression",
    "mutations",
  ],
  prerequisites: ["dna-structure", "nucleic-acids"],
};

export default note;
