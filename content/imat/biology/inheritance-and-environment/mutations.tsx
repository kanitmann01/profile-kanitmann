import type { AtomicNote } from "@/data/imat/types";

export const mutationsNote: AtomicNote = {
  slug: "mutations",
  subject: "biology",
  topic: "inheritance-and-environment",
  title: "Mutations",
  summary:
    "Mutations are heritable changes in DNA sequence. They include point mutations (substitutions, insertions, deletions) and chromosomal mutations (deletions, duplications, inversions, translocations).",
  memoryHook:
    "Point mutations: 'Subs swap one base, Ins/Del shift the frame'. Substitution types: Silent (same amino acid), Missense (different amino acid), Nonsense (stop codon — 'No More Protein'). Frameshift (insertion/deletion not divisible by 3) = every codon after the mutation changes = usually catastrophic.",
  imatTrap:
    "Not all insertions/deletions cause frameshifts — if the number of inserted/deleted bases is divisible by 3, only one or more whole amino acids are added/removed without shifting the reading frame. Also, mutations in somatic cells are NOT inherited by offspring; only germline mutations are heritable.",
  whyItMatters:
    "BRCA1/BRCA2 mutations (germline) increase breast/ovarian cancer risk by 60–80%. Understanding mutation types explains why some genetic diseases are severe (frameshift) while others are mild (silent), and why certain cancers run in families.",
  explanation: (
    <div>
      <h3>Point Mutations (Gene-level)</h3>
      <p>
        Changes to a single nucleotide or a small number of nucleotides within a
        gene.
      </p>
      <h4>Substitutions</h4>
      <ul>
        <li>
          <strong>Silent mutation:</strong> Base change does not alter the amino
          acid (due to codon degeneracy). No effect on protein.
        </li>
        <li>
          <strong>Missense mutation:</strong> Base change results in a different
          amino acid. Effect varies — may be neutral, mild, or severe (e.g.,
          sickle cell: GAG → GTG, glutamate → valine).
        </li>
        <li>
          <strong>Nonsense mutation:</strong> Base change creates a premature
          stop codon. Truncated, usually non-functional protein.
        </li>
      </ul>
      <h4>Insertions and Deletions (Indels)</h4>
      <ul>
        <li>
          <strong>Frameshift:</strong> Insertion or deletion of bases NOT
          divisible by 3 shifts the reading frame — every downstream codon
          changes. Usually produces a non-functional protein or premature stop.
        </li>
        <li>
          <strong>In-frame:</strong> Insertion or deletion divisible by 3 — adds
          or removes amino acids without shifting the frame. Less severe.
        </li>
      </ul>
      <h3>Chromosomal Mutations</h3>
      <ul>
        <li>
          <strong>Deletion:</strong> A segment of chromosome is lost (e.g.,
          Cri-du-chat syndrome — deletion of 5p)
        </li>
        <li>
          <strong>Duplication:</strong> A segment is repeated (e.g.,
          Charcot-Marie-Tooth disease type 1A — PMP22 duplication)
        </li>
        <li>
          <strong>Inversion:</strong> A segment is reversed in orientation
        </li>
        <li>
          <strong>Translocation:</strong> A segment moves to a non-homologous
          chromosome (e.g., Philadelphia chromosome — t(9;22) in CML)
        </li>
      </ul>
      <h3>Mutagens</h3>
      <ul>
        <li>
          <strong>Physical:</strong> UV radiation (thymine dimers), X-rays
          (double-strand breaks)
        </li>
        <li>
          <strong>Chemical:</strong> Base analogues, intercalating agents,
          alkylating agents
        </li>
        <li>
          <strong>Biological:</strong> Transposons (jumping genes), viruses
          (insertional mutagenesis)
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "mutations-q1",
      type: "multiple-choice",
      prompt:
        "A nucleotide substitution changes the codon GAA to GUA. What type of mutation is this?",
      answer: "Missense mutation",
      options: [
        "Silent mutation",
        "Missense mutation",
        "Nonsense mutation",
        "Frameshift mutation",
      ],
      explanation:
        "GAA codes for glutamate; GUA codes for valine. The substitution changes one amino acid to a different one — this is a missense mutation (the specific example is sickle cell anaemia).",
      difficulty: "apply",
    },
    {
      id: "mutations-q2",
      type: "fill-blank",
      prompt:
        "A mutation that creates a premature stop codon is called a ______ mutation.",
      answer: "nonsense",
      explanation:
        "A nonsense mutation converts a coding codon into a stop codon (UAA, UAG, or UGA), resulting in a truncated and usually non-functional protein.",
      difficulty: "recall",
    },
    {
      id: "mutations-q3",
      type: "explain-why",
      prompt:
        "Why is a 3-base insertion usually less damaging than a 2-base insertion?",
      answer:
        "A 3-base insertion adds exactly one amino acid without shifting the reading frame (in-frame insertion). The rest of the protein is normal. A 2-base insertion causes a frameshift, altering every downstream codon and usually producing a completely non-functional protein.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "genetic-code",
    "dna-replication",
    "genetic-engineering",
    "evolution-basics",
  ],
  prerequisites: ["genetic-code", "dna-structure"],
};
