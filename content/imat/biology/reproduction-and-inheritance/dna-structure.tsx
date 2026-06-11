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
  equations: [
    {
      id: "chargaff-rules",
      latex: "[A] = [T], \\quad [G] = [C], \\quad [A+G] = [T+C]",
      description: "Chargaff's rules: purine content equals pyrimidine content",
      variables:
        "[A] = molar fraction of adenine, [T] = thymine, [G] = guanine, [C] = cytosine",
    },
    {
      id: "h-bonds-base-pair",
      latex:
        "A{=}T \\Rightarrow 2\\ \\text{H-bonds}, \\quad G{\\equiv}C \\Rightarrow 3\\ \\text{H-bonds}",
      description: "Hydrogen bond count per base pair",
    },
    {
      id: "phosphodiester-bond",
      latex:
        "\\text{3'–OH} + \\text{5'–PO}_4 \\xrightarrow{\\text{condensation}} \\text{3'–O–P–O–5'} + H_2O",
      description:
        "Phosphodiester bond formation via condensation reaction between adjacent nucleotides",
    },
    {
      id: "melting-temp-gc",
      latex: "T_m \\propto \\%\\,(G{+}C)",
      description:
        "Melting temperature increases with G-C content due to 3 H-bonds per G≡C vs 2 per A=T",
    },
  ],
  workedExamples: [
    {
      id: "dna-worked-1",
      question:
        "A double-stranded DNA molecule contains 30% adenine. What percentage of the bases are guanine?",
      hints: [
        "Start with Chargaff's rule: [A] = [T].",
        "If A = 30%, then T = ?%. Together they account for what fraction?",
        "The remaining percentage must be split equally between G and C.",
      ],
      solution:
        "By Chargaff's rules, [A] = [T] = 30%, so A + T = 60%. The remaining bases are G + C = 100% − 60% = 40%. Since [G] = [C], guanine = 40% ÷ 2 = 20%.",
    },
    {
      id: "dna-worked-2",
      question:
        "A 100 base-pair DNA segment has 40% G-C content. How many hydrogen bonds hold the two strands together in this segment?",
      hints: [
        "40% G-C content means 40% of the 100 bp are G≡C pairs.",
        "Each G≡C pair contributes 3 H-bonds; each A=T pair contributes 2 H-bonds.",
        "Total H-bonds = (number of G-C pairs × 3) + (number of A-T pairs × 2).",
      ],
      solution:
        "G-C pairs = 40% × 100 = 40 pairs. A-T pairs = 100 − 40 = 60 pairs. Total H-bonds = (40 × 3) + (60 × 2) = 120 + 120 = 240 hydrogen bonds.",
    },
  ],
  imatPatterns: [
    {
      years: [2019, 2020, 2021, 2022, 2023, 2024],
      frequency: "high",
      notes:
        "Base pairing rules (A=T, G≡C) and antiparallel strand orientation tested nearly every year",
    },
    {
      years: [2020, 2022, 2023],
      frequency: "medium",
      notes: "Chargaff's rule calculations and H-bond counting problems",
    },
    {
      years: [2018, 2021],
      frequency: "low",
      notes:
        "Historical contributors: Watson, Crick, Franklin (Photo 51), Wilkins",
    },
  ],
  highYieldPoints: [
    "Strands are antiparallel: one runs 5′→3′, the other 3′→5′",
    "A pairs with T (2 H-bonds), G pairs with C (3 H-bonds)",
    "Purines (A, G) are double-ring; pyrimidines (T, C) are single-ring",
    "Phosphodiester bonds link 3′-OH to 5′-phosphate via condensation",
    "Higher G-C content → higher melting temperature (more H-bonds)",
    "DNA backbone = deoxyribose sugar + phosphate group",
    "One turn of the helix = 10 base pairs, pitch = 3.4 nm",
  ],
  externalResources: [
    {
      title: "Khan Academy — DNA Structure",
      url: "https://www.khanacademy.org/science/biology/dna-as-the-genetic-material/dna-discovery-and-structure/v/dna-structure",
      type: "video",
      description:
        "Visual walkthrough of the double helix, base pairing, and antiparallel strands",
    },
    {
      title: "CrashCourse Biology — DNA Structure and Replication",
      url: "https://www.youtube.com/watch?v=8kK2zwjRV0M",
      type: "video",
      description:
        "Fast-paced overview covering nucleotides, helix geometry, and Chargaff's rules",
    },
    {
      title: "Learn.Genetics — DNA Interactive Module",
      url: "https://learn.genetics.utah.edu/content/molecules/dna/",
      type: "simulation",
      description:
        "University of Utah interactive simulation for exploring base pairing and helix structure",
    },
  ],
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

export const dnaStructureNote = note;

export default note;
