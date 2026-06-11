import type { AtomicNote } from "@/data/imat/types";
import { DNAStrand } from "@/components/imat/interactive/dna-strand";

const note: AtomicNote = {
  slug: "dna-structure",
  subject: "biology",
  topic: "reproduction-and-inheritance",
  title: "DNA Structure",
  summary:
    "DNA is a double-stranded helical polymer composed of nucleotides linked by phosphodiester bonds, with complementary base pairing (A=T, G≡C) and antiparallel strand orientation (5′→3′ / 3′→5′).",
  memoryHook:
    "DNA is a twisted ladder: the sugar-phosphate backbone forms the rails, base pairs are the rungs. A always marries T (2 hydrogen bonds), G always marries C (3 hydrogen bonds) — 'Apples in the Tree, Cars in the Garage'.",
  imatTrap:
    "DNA strands are ANTIPARALLEL — one runs 5′→3′, the other 3′→5′. Students often draw both strands running the same direction. Also, A pairs with T (not U — that's RNA), and G≡C has 3 H-bonds (stronger), not 2.",
  whyItMatters:
    "Sickle cell anaemia results from a single base substitution (A→T) in the β-globin gene, changing glutamate to valine. Understanding DNA structure explains how one nucleotide change can alter protein function and cause disease.",
  explanation: (
    <div>
      <p>
        <strong>DNA (deoxyribonucleic acid)</strong> is a double-stranded
        polymer of nucleotides arranged in a right-handed double helix
        (Watson-Crick model, 1953).
      </p>
      <h3>Nucleotide Structure</h3>
      <p>
        Each nucleotide consists of three components: a deoxyribose sugar, a
        phosphate group, and one of four nitrogenous bases:
      </p>
      <ul>
        <li>
          <strong>Purines</strong> (double ring): Adenine (A) and Guanine (G)
        </li>
        <li>
          <strong>Pyrimidines</strong> (single ring): Thymine (T) and Cytosine
          (C)
        </li>
      </ul>
      <h3>Base Pairing Rules (Chargaff's Rules)</h3>
      <ul>
        <li>
          <strong>A = T</strong>: 2 hydrogen bonds (purine–pyrimidine)
        </li>
        <li>
          <strong>G ≡ C</strong>: 3 hydrogen bonds (purine–pyrimidine, stronger
          bond)
        </li>
        <li>
          [A] = [T] and [G] = [C], therefore [A+G] = [T+C] (purines =
          pyrimidines)
        </li>
      </ul>
      <h3>Antiparallel Strands</h3>
      <p>
        The two strands run in opposite directions. One strand runs 5′→3′
        (five-prime to three-prime), and the complementary strand runs 3′→5′.
        Phosphodiester bonds link the 3′ carbon of one sugar to the 5′ carbon of
        the next.
      </p>
      <h3>Interactive: Click a base to see its complement</h3>
      <DNAStrand />
    </div>
  ),
  questions: [
    {
      id: "dna-structure-q1",
      type: "multiple-choice",
      prompt:
        "If a DNA sample contains 30% adenine, what percentage of guanine does it contain?",
      answer: "20%",
      options: ["20%", "30%", "40%", "70%"],
      explanation:
        "By Chargaff's rules: A = T = 30%, so G + C = 100% − 60% = 40%. Since G = C, guanine = 20%.",
      difficulty: "apply",
    },
    {
      id: "dna-structure-q2",
      type: "fill-blank",
      prompt:
        "The two strands of DNA run in opposite directions. This arrangement is described as ______.",
      answer: "antiparallel",
      explanation:
        "One strand runs 5′→3′ and the other runs 3′→5′. This antiparallel orientation is essential for DNA replication and the action of DNA polymerase.",
      difficulty: "recall",
    },
    {
      id: "dna-structure-q3",
      type: "true-false",
      prompt:
        "A DNA molecule with a higher G-C content has a higher melting temperature than one with the same length but higher A-T content.",
      answer: "True",
      explanation:
        "G≡C base pairs have 3 hydrogen bonds versus 2 for A=T pairs. More G-C content means more energy is required to separate the strands, raising the melting temperature.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["nucleic-acids", "dna-replication", "genetic-code"],
  prerequisites: ["nucleic-acids", "weak-interactions"],
};

export default note;
