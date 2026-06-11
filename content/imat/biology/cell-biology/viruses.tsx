"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "Are viruses considered living organisms?",
    answer:
      "No — they are acellular, cannot replicate independently, and have no metabolism",
    context: "Borderline life form",
  },
  {
    id: "qf-2",
    question: "What are the two basic components of all virus particles?",
    answer: "Genetic material (DNA or RNA) + protein capsid",
    context: "Minimalist structure",
  },
  {
    id: "qf-3",
    question: "What is the difference between the lytic and lysogenic cycles?",
    answer:
      "Lytic: virus replicates immediately, kills host. Lysogenic: viral DNA integrates into host genome (prophage), replicates passively",
    context: "Bacteriophage life cycles",
  },
];

export const virusesNote: AtomicNote = {
  slug: "viruses",
  subject: "biology",
  topic: "cell-biology",
  title: "Viruses",
  summary:
    "Acellular infectious particles composed of genetic material (DNA or RNA) surrounded by a protein capsid. Viruses are obligate intracellular parasites — they cannot replicate or perform metabolism outside a host cell. They cause diseases ranging from the common cold to COVID-19, HIV, and Ebola.",
  memoryHook:
    "VIRUS = Very Infectious RNA/DNA Unit S. Acellular = not made of cells. Obligate parasite = needs host cell machinery. Lytic = kill the host. Lysogenic = hide in the host genome.",
  imatTrap:
    "Viruses are NOT cells and are NOT alive by most definitions (no metabolism, no replication without host). The trap: because viruses evolve (via natural selection), they are sometimes considered 'alive' — but IMAT expects the standard cellular definition of life. Also: NOT all viruses kill their host (lysogenic cycle, persistent infections). HIV retroviruses integrate into the host genome and can remain latent for years.",
  whyItMatters:
    "Viral diseases are major global health burdens: HIV/AIDS (~38 million infected), influenza (seasonal epidemics), COVID-19 (pandemic), hepatitis B/C (liver cancer), HPV (cervical cancer). Vaccines and antiviral drugs exploit our understanding of viral structure and replication. Retroviruses are also used as gene therapy vectors.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Lytic vs lysogenic cycle — differences",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Virus structure: capsid, envelope, genetic material",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Retroviruses — reverse transcriptase and RNA genome",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "viruses-worked-1",
      question:
        "Explain why antiviral drugs are generally more difficult to develop than antibacterial drugs, using the example of a drug that targets viral DNA polymerase.",
      hints: [
        "Where do viruses get their replication machinery?",
        "How similar is viral DNA polymerase to human DNA polymerase?",
        "What is the risk of a drug that inhibits both?",
      ],
      solution:
        "Antiviral drugs are harder to develop because viruses use host cell machinery for many functions. A viral DNA polymerase (e.g., herpesvirus) differs from human polymerases, allowing selective targeting (acyclovir). However, many viruses (e.g., rhinovirus, coronavirus) use host RNA-dependent RNA polymerases — targeting them risks affecting host polymerases. Additionally, antiviral drugs must enter host cells, and viruses rapidly mutate → drug resistance. Antibiotics targeting bacterial cell wall or 70S ribosomes have no human counterpart, offering greater selectivity.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Viruses",
      url: "https://www.khanacademy.org/science/biology/biology-of-viruses/virus-biology/a/introduction-to-viruses",
      type: "article",
      description:
        "Comprehensive introduction to virus structure and replication",
    },
    {
      title: "Nature Scitable — Viral Replication",
      url: "https://www.nature.com/scitable/topicpage/viral-replication-12305726/",
      type: "article",
      description: "Detailed coverage of lytic and lysogenic cycles",
    },
    {
      title: "OpenStax Biology 2e — Viruses",
      url: "https://openstax.org/books/biology-2e/pages/21-1-viral-evolution-morphology-and-classification",
      type: "textbook",
      description:
        "Free textbook chapter on viral structure and classification",
    },
  ],
  highYieldPoints: [
    "Acellular: no cytoplasm, no organelles, no metabolism — cannot replicate independently",
    "Structure: nucleic acid (DNA or RNA, ss or ds) + capsid (protein coat) ± envelope (lipid bilayer from host)",
    "Lytic cycle: attachment → entry → replication → assembly → release (host cell lysed)",
    "Lysogenic cycle: viral DNA integrates → prophage → replicates with host → can later enter lytic cycle",
    "Retroviruses (HIV): RNA genome → reverse transcriptase → DNA → integrates into host genome (provirus)",
    "Classification: by genetic material (DNA/RNA, ss/ds) and whether they have an envelope",
    "Vaccines: inactivated (killed), live-attenuated, mRNA, subunit; antivirals target specific viral enzymes",
  ],
  explanation: (
    <div>
      <p>
        <strong>Viruses</strong> are the smallest infectious agents, ranging
        from ~20–300 nm. They are <strong>acellular</strong> — not made of cells
        — and are <strong>obligate intracellular parasites</strong> that require
        host cell machinery to replicate.
      </p>

      <h3>Virus Structure</h3>
      <p>
        All viruses have:
        <strong>Genetic material</strong> (DNA or RNA, single-stranded or
        double-stranded, linear or circular) + a <strong>protein capsid</strong>
        (made of capsomeres) that protects the genome. Some viruses have an
        additional <strong>envelope</strong> (lipid bilayer derived from host
        cell membrane, with viral glycoproteins for host attachment).
      </p>

      <h3>Bacteriophages — Lytic vs Lysogenic</h3>
      <p>
        Bacteriophages are viruses that infect bacteria. They can follow two
        different life cycles:
      </p>

      <div className="grid grid-cols-2 gap-3 rounded-lg border bg-card p-4">
        <div>
          <h4 className="text-sm font-semibold text-red-500">Lytic Cycle</h4>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
            <li>Virus hijacks host immediately</li>
            <li>Replicates → assembles new virions</li>
            <li>Host cell lysed (burst open)</li>
            <li>Progeny released to infect others</li>
            <li>Example: T4 phage</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-blue-500">
            Lysogenic Cycle
          </h4>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
            <li>Viral DNA integrates into host genome</li>
            <li>Becomes a prophage</li>
            <li>Replicated passively with host DNA</li>
            <li>Can switch to lytic (induced by stress)</li>
            <li>Example: λ (lambda) phage</li>
          </ul>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Animal Virus Replication</h3>
      <p>
        Animal viruses enter via receptor-mediated endocytosis or membrane
        fusion. DNA viruses typically replicate in the nucleus (using host RNA
        polymerase), while RNA viruses replicate in the cytoplasm (using viral
        RNA-dependent RNA polymerase). <strong>Retroviruses</strong> (HIV) use
        reverse transcriptase to convert RNA → DNA, which integrates into the
        host genome.
      </p>

      <h3>How Are They Different from Cells?</h3>
      <ul>
        <li>No cell membrane, nucleus, or organelles</li>
        <li>No ribosomes (cannot make proteins)</li>
        <li>No metabolism (no ATP production, no biosynthesis)</li>
        <li>Cannot replicate independently (need host)</li>
        <li>Do not respond to stimuli or maintain homeostasis</li>
      </ul>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Notable Human Viruses</h3>
      <div className="grid gap-2">
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-sm">
          <h4 className="font-semibold text-sm">HIV (Retrovirus)</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Infects helper T cells (CD4⁺). Uses reverse transcriptase. Leads to
            AIDS if untreated. HAART therapy targets multiple viral enzymes.
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-sm">
          <h4 className="font-semibold text-sm">
            Influenza (-ssRNA, Enveloped)
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Mutates rapidly (antigenic drift and shift). Causes seasonal
            epidemics. Haemagglutinin and neuraminidase surface proteins.
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm">
          <h4 className="font-semibold text-sm">
            SARS-CoV-2 (+ssRNA, Enveloped)
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Coronavirus with spike protein for ACE2 receptor binding. Causes
            COVID-19. mRNA vaccines encode spike protein.
          </p>
        </div>
      </div>

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "viruses-worked-1",
            question:
              "Explain why antiviral drugs are generally more difficult to develop than antibacterial drugs, using the example of a drug that targets viral DNA polymerase.",
            hints: [
              "Where do viruses get their replication machinery?",
              "How similar is viral DNA polymerase to human DNA polymerase?",
              "What is the risk of a drug that inhibits both?",
            ],
            solution:
              "Antiviral drugs are harder to develop because viruses use host cell machinery. Viral DNA polymerase (herpesvirus) differs from human, allowing selective targeting (acyclovir). However, many viruses use host polymerases — targeting them risks toxicity. Viruses also mutate rapidly, leading to drug resistance.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Acellular: no cells, no metabolism, no replication alone",
          "Structure: DNA/RNA + capsid ± envelope",
          "Lytic: replicate + lyse host cell",
          "Lysogenic: integrate into host genome (prophage)",
          "Retroviruses: RNA → DNA via reverse transcriptase",
          "Antivirals target viral-specific enzymes",
          "Vaccines prevent viral disease (mRNA, inactivated, live)",
        ].map((point) => (
          <div
            key={point}
            className="flex items-start gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-2"
          >
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">{point}</span>
          </div>
        ))}
      </div>

      <QuickFire questions={recallQuestions.slice(2, 3)} title="Final Check" />
    </div>
  ),
  questions: [
    {
      id: "viruses-q1",
      type: "multiple-choice",
      prompt: "All viruses contain:",
      answer: "Nucleic acid (DNA or RNA) + protein capsid",
      difficulty: "recall",
      options: [
        "DNA + RNA + capsid",
        "Nucleic acid (DNA or RNA) + protein capsid",
        "DNA + lipid envelope",
        "RNA + ribosomes",
      ],
    },
    {
      id: "viruses-q2",
      type: "multiple-choice",
      prompt:
        "In the lysogenic cycle, viral DNA integrated into the host genome is called a:",
      answer: "Prophage (provirus in eukaryotes)",
      difficulty: "recall",
      options: ["Capsid", "Prophage", "Virion", "Plasmid"],
    },
    {
      id: "viruses-q3",
      type: "multiple-choice",
      prompt: "Retroviruses use which enzyme to convert RNA into DNA?",
      answer: "Reverse transcriptase",
      difficulty: "recall",
      options: [
        "RNA polymerase",
        "Reverse transcriptase",
        "DNA helicase",
        "RNA replicase",
      ],
    },
    {
      id: "viruses-q4",
      type: "multiple-choice",
      prompt: "Which of the following is NOT true about viruses?",
      answer: "They have their own ribosomes",
      difficulty: "apply",
      options: [
        "They are acellular",
        "They have their own ribosomes",
        "They evolve",
        "They require host cells to replicate",
      ],
    },
    {
      id: "viruses-q5",
      type: "multiple-choice",
      prompt:
        "The host cell is typically destroyed in which viral replication cycle?",
      answer: "Lytic cycle",
      difficulty: "apply",
      options: [
        "Lysogenic cycle",
        "Lytic cycle",
        "Both cycles",
        "Neither cycle",
      ],
      imatYear: 2024,
    },
    {
      id: "viruses-q6",
      type: "explain-why",
      prompt:
        "Explain why influenza requires a new vaccine each year while measles vaccination provides lifelong protection.",
      answer:
        "Influenza virus has an RNA genome and RNA-dependent RNA polymerase, which lacks proofreading — this causes high mutation rates (antigenic drift). The surface proteins haemagglutinin and neuraminidase constantly change, so last year's antibodies may not recognise this year's strain. Measles virus is genetically stable (dsDNA genome that is proofread), so the immune response from vaccination remains effective for life.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "prokaryotes-vs-eukaryotes",
    "cell-theory",
    "dna-replication",
    "genetic-code",
  ],
  prerequisites: ["cell-theory", "prokaryotes-vs-eukaryotes"],
};
