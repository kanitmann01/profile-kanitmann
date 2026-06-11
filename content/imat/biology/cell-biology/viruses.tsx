import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "viruses",
  subject: "biology",
  topic: "cell-biology",
  title: "Viruses",
  summary:
    "Viruses are acellular, obligate intracellular parasites consisting of genetic material (DNA or RNA) in a protein capsid. They replicate only inside host cells and are considered non-living outside a host.",
  memoryHook:
    "'Viruses = Very Irregular Replicators, Inside Only Survive Existence.' Think of a virus as a 'hijacker with a blueprint' — it carries instructions (DNA/RNA) in a disguise (capsid) but has no engine (organelles) of its own.",
  imatTrap:
    "Viruses are NOT cells and are NOT considered alive by most definitions — they lack metabolism, cannot reproduce independently, and do not maintain homeostasis. However, they DO evolve and contain genetic material. IMAT may ask 'are viruses alive?' — the answer is 'no, they are acellular particles that require a host cell to replicate.'",
  whyItMatters:
    "HIV targets and destroys helper T-cells (CD4⁺), crippling the immune system and leading to AIDS. SARS-CoV-2 uses spike proteins to bind ACE2 receptors. Understanding viral replication (lytic vs lysogenic) explains why antibiotics don't work on viruses and why antiviral drugs target specific replication steps.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Virus Structure</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Genetic material</strong>: Either DNA or RNA (never both). Can
          be single-stranded or double-stranded, linear or circular.
        </li>
        <li>
          <strong>Capsid</strong>: Protein coat made of repeating subunits
          (capsomeres). Protects the genetic material and determines the virus
          shape (helical, icosahedral, or complex).
        </li>
        <li>
          <strong>Envelope</strong> (some viruses): Lipid bilayer derived from
          the host cell membrane, studded with viral glycoproteins (e.g., HIV's
          gp120, SARS-CoV-2's spike protein). Not all viruses have envelopes —
          non-enveloped ('naked') viruses include adenoviruses and norovirus.
        </li>
        <li>
          <strong>Attachment proteins</strong>: Allow the virus to bind to
          specific receptor molecules on host cells, determining host
          specificity and tissue tropism.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Why Viruses Are Not Alive</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>No cellular structure (acellular)</li>
        <li>
          No metabolism — cannot generate ATP or synthesise proteins
          independently
        </li>
        <li>Cannot reproduce without a host cell</li>
        <li>Do not grow or respond to stimuli in the traditional sense</li>
        <li>Do not maintain homeostasis</li>
      </ul>
      <p>
        However, viruses <strong>do</strong> contain genetic material, evolve
        through natural selection, and reproduce (within a host) — which is why
        they exist in a grey area.
      </p>

      <h3 className="text-lg font-semibold mt-4">Viral Replication</h3>

      <p>
        <strong>Lytic cycle</strong> (virulent phages):
      </p>
      <ol className="list-decimal pl-6 space-y-1">
        <li>Attachment: virus binds to host cell receptor</li>
        <li>Entry: genetic material injected/enters the cell</li>
        <li>
          Synthesis: host machinery forced to produce viral components (nucleic
          acids + capsid proteins)
        </li>
        <li>Assembly: new virus particles assembled</li>
        <li>
          Lysis: host cell bursts, releasing new virions to infect other cells
        </li>
      </ol>

      <p>
        <strong>Lysogenic cycle</strong> (temperate phages):
      </p>
      <ol className="list-decimal pl-6 space-y-1">
        <li>Attachment and entry (same as lytic)</li>
        <li>
          Integration: viral DNA inserts into the host chromosome (becomes a{" "}
          <strong>provirus</strong> or <strong>prophage</strong>)
        </li>
        <li>
          Latency: viral DNA replicates passively with host DNA — no new viruses
          produced, host cell not destroyed
        </li>
        <li>
          Induction: triggered by stress (UV, chemicals), provirus excises and
          enters the lytic cycle
        </li>
      </ol>

      <h3 className="text-lg font-semibold mt-4">Retroviruses (e.g., HIV)</h3>
      <p>
        RNA viruses that use <strong>reverse transcriptase</strong> to convert
        their RNA into DNA, which then integrates into the host genome. This
        makes them particularly difficult to eliminate because the viral DNA
        becomes a permanent part of the host's chromosomes.
      </p>
    </div>
  ),
  questions: [
    {
      id: "viruses-q1",
      type: "multiple-choice",
      prompt:
        "Which of the following best explains why viruses are NOT considered living organisms?",
      options: [
        "They contain genetic material",
        "They can evolve through natural selection",
        "They cannot reproduce independently and lack metabolism",
        "They have a protein capsid",
      ],
      answer: "They cannot reproduce independently and lack metabolism",
      explanation:
        "Viruses lack cellular structure, cannot generate ATP, cannot synthesise proteins, and require a host cell to replicate. These are key criteria for life.",
      difficulty: "recall",
    },
    {
      id: "viruses-q2",
      type: "multiple-choice",
      prompt:
        "In the lysogenic cycle, what happens to the viral DNA after it enters the host cell?",
      options: [
        "It is immediately destroyed by host enzymes",
        "It integrates into the host chromosome and replicates passively",
        "It causes immediate lysis of the host cell",
        "It is converted to protein by reverse transcriptase",
      ],
      answer: "It integrates into the host chromosome and replicates passively",
      explanation:
        "In the lysogenic cycle, viral DNA integrates into the host chromosome as a prophage/provirus. It replicates with the host DNA without killing the cell, until induction triggers the lytic cycle.",
      difficulty: "recall",
    },
    {
      id: "viruses-q3",
      type: "explain-why",
      prompt:
        "Why are retroviruses like HIV particularly difficult to treat with antiviral drugs?",
      answer:
        "Retroviruses use reverse transcriptase to convert their RNA into DNA, which integrates permanently into the host genome as a provirus. This viral DNA is indistinguishable from host DNA, making it nearly impossible to target without harming the host. Additionally, HIV mutates rapidly (error-prone reverse transcriptase), generating drug-resistant strains. The virus also hides in latent reservoirs (resting T-cells) where it is invisible to the immune system.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["cell-theory", "nucleic-acids", "prokaryotes-vs-eukaryotes"],
  prerequisites: ["nucleic-acids", "cell-theory"],
};

export default note;
