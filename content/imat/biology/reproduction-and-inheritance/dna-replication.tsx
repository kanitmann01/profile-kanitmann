import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "dna-replication",
  subject: "biology",
  topic: "reproduction-and-inheritance",
  title: "DNA Replication",
  summary:
    "Semi-conservative replication where each daughter DNA molecule contains one original strand and one newly synthesised strand, proceeding 5′→3′ with continuous leading and discontinuous lagging strand synthesis.",
  memoryHook:
    "Replication is like unzipping a jacket: helicase unzips, SSB proteins hold it open, primase lays the track (RNA primer), DNA Pol III builds the new strand, DNA Pol I replaces the primer, and ligase seals the seams. 'He Said, Pray, Polymerise, Polish, Link'.",
  imatTrap:
    "DNA polymerase can ONLY add nucleotides in the 5′→3′ direction and requires an existing primer. This means the lagging strand is synthesised discontinuously as Okazaki fragments. Students forget that RNA primers are later replaced with DNA, not left in place.",
  whyItMatters:
    "Xeroderma pigmentosum results from defective DNA repair enzymes — UV-induced thymine dimers accumulate, causing skin cancer. Understanding replication fidelity explains cancer biology and chemotherapy targets (e.g., drugs that inhibit DNA polymerase in rapidly dividing cells).",
  explanation: (
    <div>
      <p>
        DNA replication is <strong>semi-conservative</strong> (Meselson-Stahl
        experiment, 1958): each daughter molecule retains one parental strand
        and one newly synthesised strand.
      </p>
      <h3>Key Steps</h3>
      <ol>
        <li>
          <strong>Initiation at origin of replication:</strong> Helicase unwinds
          and separates the two strands, forming a replication fork.
          Topoisomerase (DNA gyrase) relieves supercoiling tension ahead of the
          fork.
        </li>
        <li>
          <strong>SSB proteins</strong> bind single-stranded DNA to prevent
          re-annealing.
        </li>
        <li>
          <strong>Primase</strong> synthesises a short RNA primer (≈10 nt)
          complementary to the template, providing a free 3′-OH for DNA
          polymerase.
        </li>
        <li>
          <strong>DNA Polymerase III</strong> adds dNTPs in the 5′→3′ direction,
          reading the template 3′→5′.
        </li>
        <li>
          <strong>DNA Polymerase I</strong> removes RNA primers and replaces
          them with DNA.
        </li>
        <li>
          <strong>DNA Ligase</strong> seals nicks between Okazaki fragments on
          the lagging strand.
        </li>
      </ol>
      <h3>Leading vs Lagging Strand</h3>
      <ul>
        <li>
          <strong>Leading strand:</strong> Synthesised continuously toward the
          replication fork (5′→3′).
        </li>
        <li>
          <strong>Lagging strand:</strong> Synthesised away from the fork as
          short <strong>Okazaki fragments</strong> (1000–2000 nt in prokaryotes,
          100–200 nt in eukaryotes), later joined by ligase.
        </li>
      </ul>
      <h3>Fidelity</h3>
      <p>
        DNA polymerase has 3′→5′ <strong>exonuclease (proofreading)</strong>{" "}
        activity, correcting mismatched bases. Error rate: ~1 in 10⁹ bases.
      </p>
    </div>
  ),
  questions: [
    {
      id: "dna-replication-q1",
      type: "multiple-choice",
      prompt:
        "After one round of replication in ¹⁵N medium, E. coli originally grown in ¹⁴N are transferred to ¹⁵N. What proportion of DNA molecules are hybrid (¹⁴N/¹⁵N)?",
      answer: "100%",
      options: ["0%", "50%", "100%", "25%"],
      explanation:
        "Semi-conservative replication means each daughter molecule has one old (¹⁴N) strand and one new (¹⁵N) strand. After one round, all molecules are hybrid.",
      difficulty: "apply",
    },
    {
      id: "dna-replication-q2",
      type: "fill-blank",
      prompt:
        "Short DNA fragments synthesised on the lagging strand during replication are called ______ fragments.",
      answer: "Okazaki",
      explanation:
        "Because DNA polymerase can only synthesise 5′→3′, the lagging strand is built in short Okazaki fragments that are later joined by DNA ligase.",
      difficulty: "recall",
    },
    {
      id: "dna-replication-q3",
      type: "explain-why",
      prompt: "Why does DNA replication require an RNA primer?",
      answer:
        "DNA polymerase cannot initiate synthesis de novo — it can only extend an existing 3′-OH group. Primase (an RNA polymerase) synthesises a short RNA primer that provides this free 3′-OH, allowing DNA polymerase to begin adding nucleotides.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["dna-structure", "genetic-code", "mutations"],
  prerequisites: ["dna-structure"],
};

export default note;
