import type { AtomicNote } from "@/data/imat/types";

export const geneticEngineeringNote: AtomicNote = {
  slug: "genetic-engineering",
  subject: "biology",
  topic: "inheritance-and-environment",
  title: "Genetic Engineering and Biotechnology",
  summary:
    "Techniques for manipulating DNA include PCR (amplification), gel electrophoresis (separation by size), recombinant DNA technology (cutting and joining DNA from different organisms), and CRISPR-Cas9 (precise genome editing).",
  memoryHook:
    "PCR cycle: 'Denature, Anneal, Extend' (DAE) — 95°C melts DNA, 55°C lets primers bind, 72°C lets Taq polymerase build. Each cycle doubles the DNA. 30 cycles = ~1 billion copies. Gel electrophoresis: 'Small fragments run fast and far' — smaller DNA migrates further toward the positive electrode.",
  imatTrap:
    "PCR uses THERMOCYCLING, not enzymes to separate strands — heat denatures DNA. Taq polymerase is used because it survives high temperatures (from Thermus aquaticus, a thermophilic bacterium). Also, restriction enzymes cut at SPECIFIC palindromic sequences, not randomly. Sticky ends (overhangs) and blunt ends are both possible.",
  whyItMatters:
    "Insulin was the first recombinant drug (1982) — human insulin gene inserted into E. coli. CRISPR is being trialled for sickle cell disease, beta-thalassaemia, and certain cancers. PCR was essential for SARS-CoV-2 detection. Genetic engineering underpins modern medicine.",
  explanation: (
    <div>
      <h3>Polymerase Chain Reaction (PCR)</h3>
      <p>
        A technique to amplify a specific DNA sequence exponentially in vitro.
      </p>
      <ol>
        <li>
          <strong>Denaturation (94–98°C):</strong> Double-stranded DNA melts
          into single strands.
        </li>
        <li>
          <strong>Annealing (50–65°C):</strong> Primers (short synthetic
          oligonucleotides) bind complementary sequences flanking the target.
        </li>
        <li>
          <strong>Extension (72°C):</strong> Taq polymerase synthesises new DNA
          from primers in the 5′→3′ direction.
        </li>
      </ol>
      <p>
        Each cycle doubles the target DNA. After n cycles: 2ⁿ copies. Requires:
        template DNA, primers, Taq polymerase, dNTPs, buffer.
      </p>
      <h3>Gel Electrophoresis</h3>
      <p>
        Separates DNA fragments by size using an electric field. DNA is
        negatively charged (phosphate backbone) → migrates toward the positive
        electrode (anode).
      </p>
      <ul>
        <li>
          <strong>Smaller fragments</strong> move faster and further through the
          gel matrix
        </li>
        <li>
          Compared against a DNA ladder (known fragment sizes) to determine
          sizes
        </li>
        <li>
          Applications: DNA fingerprinting, paternity testing, forensic
          analysis, checking PCR products
        </li>
      </ul>
      <h3>Recombinant DNA Technology</h3>
      <ol>
        <li>
          <strong>Restriction enzymes</strong> (endonucleases) cut DNA at
          specific palindromic recognition sequences, producing sticky or blunt
          ends
        </li>
        <li>
          <strong>Same enzyme</strong> cuts both the gene of interest and the
          vector (plasmid) — compatible ends allow base pairing
        </li>
        <li>
          <strong>DNA ligase</strong> joins the gene and vector by
          phosphodiester bonds → recombinant plasmid
        </li>
        <li>
          <strong>Transformation:</strong> Recombinant plasmid is introduced
          into host bacteria (e.g., E. coli) → bacteria express the gene
        </li>
      </ol>
      <h3>CRISPR-Cas9</h3>
      <p>
        A precise genome-editing tool derived from bacterial immune systems.
      </p>
      <ul>
        <li>
          <strong>Guide RNA (gRNA)</strong> directs the Cas9 nuclease to a
          specific DNA sequence (complementary to the gRNA)
        </li>
        <li>
          <strong>Cas9</strong> cuts both DNA strands at the target site
          (double-strand break)
        </li>
        <li>
          Cell repairs the break via NHEJ (error-prone → gene knockout) or HDR
          (with donor template → precise edit)
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "gen-eng-q1",
      type: "multiple-choice",
      prompt:
        "In gel electrophoresis, which DNA fragment migrates furthest from the well?",
      answer: "200 base pairs",
      options: [
        "5000 base pairs",
        "1500 base pairs",
        "800 base pairs",
        "200 base pairs",
      ],
      explanation:
        "Smaller DNA fragments migrate faster and further through the gel matrix because they experience less resistance. The 200 bp fragment is the smallest and travels furthest.",
      difficulty: "recall",
    },
    {
      id: "gen-eng-q2",
      type: "fill-blank",
      prompt:
        "In PCR, the enzyme ______ polymerase is used because it can withstand the high temperatures of the denaturation step.",
      answer: "Taq",
      explanation:
        "Taq polymerase is isolated from Thermus aquaticus, a thermophilic bacterium found in hot springs. It remains active at the 95°C denaturation temperature, unlike mesophilic polymerases that would be destroyed.",
      difficulty: "recall",
    },
    {
      id: "gen-eng-q3",
      type: "explain-why",
      prompt:
        "Why must the same restriction enzyme be used to cut both the gene of interest and the plasmid vector in recombinant DNA technology?",
      answer:
        "The same restriction enzyme produces identical sticky ends (complementary overhangs) on both the gene and the vector. These complementary ends can base-pair with each other, allowing DNA ligase to join them. Different enzymes may produce incompatible ends that cannot anneal.",
      difficulty: "apply",
    },
  ],
  crosslinks: [
    "dna-replication",
    "genetic-code",
    "mutations",
    "gene-expression",
  ],
  prerequisites: ["dna-structure", "genetic-code"],
};
