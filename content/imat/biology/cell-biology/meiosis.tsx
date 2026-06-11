import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "meiosis",
  subject: "biology",
  topic: "cell-biology",
  title: "Meiosis",
  summary:
    "Meiosis is a two-division cell division that produces four genetically unique haploid gametes from one diploid cell, introducing variation through crossing over and independent assortment.",
  memoryHook:
    "'Meiosis = Making Eggs/baby Organisms In Stages.' Meiosis I separates HOMOLOGOUS pairs (reduction division: 2n → n). Meiosis II separates SISTER chromatids (like mitosis but haploid). PMAT happens TWICE — PMAT I and PMAT II.",
  imatTrap:
    "Crossing over occurs in Prophase I ONLY (not Prophase II). Independent assortment happens at Metaphase I — homologous pairs line up RANDOMLY. In meiosis I, HOMOLOGOUS chromosomes separate (not sister chromatids). Sister chromatids separate in meiosis II. A human cell goes from 46 → 23 chromosomes after meiosis I.",
  whyItMatters:
    "Down syndrome (trisomy 21) results from non-disjunction during meiosis — chromosomes fail to separate properly, producing gametes with an extra chromosome. The risk increases with maternal age. Understanding meiosis is essential for genetics, inheritance patterns, and genetic counselling.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Why Meiosis Matters</h3>
      <p>
        Produces haploid gametes (sperm/egg) for sexual reproduction. Ensures
        the chromosome number is halved so fertilisation restores diploidy.
        Generates genetic variation through two mechanisms.
      </p>

      <h3 className="text-lg font-semibold mt-4">
        Meiosis I — Reduction Division (2n → n)
      </h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Prophase I</strong>: The longest and most complex phase.
          <ul className="list-circle pl-4 mt-1">
            <li>Chromosomes condense; nuclear envelope breaks down</li>
            <li>
              <strong>Homologous chromosomes pair up</strong> to form bivalents
              (tetrads)
            </li>
            <li>
              <strong>Crossing over</strong>: Non-sister chromatids exchange
              segments at points called <strong>chiasmata</strong>. This creates
              new allele combinations (recombinant chromosomes).
            </li>
          </ul>
        </li>
        <li>
          <strong>Metaphase I</strong>:
          <ul className="list-circle pl-4 mt-1">
            <li>Bivalents align at the equator</li>
            <li>
              <strong>Independent assortment</strong>: Each pair orients
              randomly — maternal or paternal homologue can face either pole.
              With 23 pairs, there are 2²³ (≈8.4 million) possible combinations.
            </li>
          </ul>
        </li>
        <li>
          <strong>Anaphase I</strong>: Homologous chromosomes separate to
          opposite poles. Sister chromatids remain joined at centromeres.
        </li>
        <li>
          <strong>Telophase I & Cytokinesis</strong>: Two haploid cells form,
          each with n chromosomes (each still consisting of two sister
          chromatids). In humans, each cell has 23 chromosomes.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">
        Meiosis II — Sister Chromatid Separation (n → n)
      </h3>
      <p>Similar to mitosis but starts with haploid cells.</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Prophase II</strong>: Chromosomes condense; spindle forms. NO
          crossing over in this phase.
        </li>
        <li>
          <strong>Metaphase II</strong>: Chromosomes align at the equator.
          Spindle fibres attach to centromeres.
        </li>
        <li>
          <strong>Anaphase II</strong>: Sister chromatids separate and move to
          opposite poles.
        </li>
        <li>
          <strong>Telophase II & Cytokinesis</strong>: Four genetically unique
          haploid cells result.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">
        Sources of Genetic Variation
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Crossing over</strong> (Prophase I): Creates recombinant
          chromosomes with new allele combinations.
        </li>
        <li>
          <strong>Independent assortment</strong> (Metaphase I): Random
          orientation of bivalents → 2ⁿ possible gamete combinations.
        </li>
        <li>
          <strong>Random fertilisation</strong>: Any sperm can fuse with any egg
          → (2ⁿ)² possible zygote combinations.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "meiosis-q1",
      type: "multiple-choice",
      prompt: "Crossing over occurs during which phase of meiosis?",
      options: ["Prophase I", "Metaphase I", "Prophase II", "Metaphase II"],
      answer: "Prophase I",
      explanation:
        "Crossing over occurs in Prophase I when homologous chromosomes pair up as bivalents. Non-sister chromatids exchange segments at chiasmata. This does NOT occur in Prophase II.",
      difficulty: "recall",
    },
    {
      id: "meiosis-q2",
      type: "multiple-choice",
      prompt:
        "A cell with 2n = 24 chromosomes undergoes meiosis. How many chromosomes are in each resulting gamete?",
      options: ["6", "12", "24", "48"],
      answer: "12",
      explanation:
        "Meiosis is a reduction division — the chromosome number is halved. 2n = 24 → n = 12. Each gamete receives one chromosome from each homologous pair.",
      difficulty: "apply",
    },
    {
      id: "meiosis-q3",
      type: "explain-why",
      prompt:
        "Explain how independent assortment during meiosis contributes to genetic variation.",
      answer:
        "During Metaphase I, homologous pairs (bivalents) align randomly at the equator. The maternal or paternal chromosome of each pair can face either pole independently of other pairs. In humans with 23 pairs, this produces 2²³ (≈8.4 million) different chromosome combinations in gametes, each with a unique mix of maternal and paternal chromosomes.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["mitosis", "cell-cycle", "nucleic-acids"],
  prerequisites: ["mitosis", "cell-cycle"],
};

export default note;
