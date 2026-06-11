import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "evolution-basics",
  subject: "biology",
  topic: "inheritance-and-environment",
  title: "Evolution Basics",
  summary:
    "Evolution is change in allele frequencies in a population over generations. Natural selection acts on heritable variation, favouring traits that increase survival and reproductive success, leading to adaptation and speciation.",
  memoryHook:
    "Natural selection = 'VISTA': Variation exists, Inheritance is genetic, Selection pressure acts, Time passes (many generations), Adaptation results. Speciation types: Allopatric = 'Away' (geographic barrier), Sympatric = 'Same place' (reproductive isolation without geographic separation).",
  imatTrap:
    "Natural selection acts on the INDIVIDUAL (differential survival/reproduction), but EVOLUTION occurs at the POPULATION level (change in allele frequencies). Also, evolution does NOT have a goal or direction — it is not 'progress'. Mutations are random; selection is non-random. Lamarck was wrong: acquired characteristics are NOT inherited.",
  whyItMatters:
    "Antibiotic resistance is evolution in real time — bacteria with resistance mutations survive antibiotic treatment and reproduce, spreading resistance genes. Understanding evolution is critical for public health (vaccine development, antimicrobial stewardship) and conservation biology.",
  explanation: (
    <div>
      <h3>Natural Selection</h3>
      <p>
        Charles Darwin and Alfred Russel Wallace proposed that evolution occurs
        through <strong>natural selection</strong>:
      </p>
      <ol>
        <li>
          <strong>Variation:</strong> Individuals in a population differ in
          their traits (due to mutation, recombination, gene flow).
        </li>
        <li>
          <strong>Heritability:</strong> Some of this variation is genetic
          (passed from parent to offspring).
        </li>
        <li>
          <strong>Overproduction:</strong> More offspring are produced than can
          survive (competition for limited resources).
        </li>
        <li>
          <strong>Differential survival/reproduction:</strong> Individuals with
          advantageous traits are more likely to survive and reproduce
          ("survival of the fittest").
        </li>
        <li>
          <strong>Adaptation:</strong> Over generations, advantageous alleles
          increase in frequency → population becomes better suited to its
          environment.
        </li>
      </ol>
      <h3>Evidence for Evolution</h3>
      <ul>
        <li>
          <strong>Fossil record:</strong> Shows gradual change over time;
          transitional forms (e.g., Archaeopteryx — between reptiles and birds)
        </li>
        <li>
          <strong>Homologous structures:</strong> Similar anatomy from common
          ancestry (e.g., human arm, whale flipper, bat wing — same bones,
          different functions)
        </li>
        <li>
          <strong>Analogous structures:</strong> Similar function but different
          origin (convergent evolution) — e.g., bird wing vs insect wing
        </li>
        <li>
          <strong>Vestigial structures:</strong> Remnants of ancestral
          structures with no current function — e.g., human appendix, whale
          pelvic bones
        </li>
        <li>
          <strong>Molecular evidence:</strong> DNA/protein sequence similarity
          correlates with evolutionary relatedness (e.g., human and chimpanzee
          genomes are ~98.8% identical)
        </li>
        <li>
          <strong>Embryology:</strong> Similar embryonic development across
          species (e.g., pharyngeal arches in all vertebrate embryos)
        </li>
      </ul>
      <h3>Speciation</h3>
      <p>
        The formation of new species from a common ancestor. Requires
        <strong>reproductive isolation</strong>.
      </p>
      <ul>
        <li>
          <strong>Allopatric speciation:</strong> Geographic barrier separates
          populations → each evolves independently → reproductive isolation
          develops (e.g., Darwin's finches on the Galápagos)
        </li>
        <li>
          <strong>Sympatric speciation:</strong> New species arises within the
          same geographic area — through polyploidy (common in plants), habitat
          differentiation, or sexual selection
        </li>
      </ul>
      <h3>Types of Selection</h3>
      <ul>
        <li>
          <strong>Stabilising:</strong> Favours intermediate phenotypes, reduces
          variation (e.g., human birth weight)
        </li>
        <li>
          <strong>Directional:</strong> Favours one extreme (e.g., peppered moth
          — dark form favoured in polluted areas)
        </li>
        <li>
          <strong>Disruptive:</strong> Favours both extremes over intermediate
          (can lead to speciation)
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "evolution-q1",
      type: "multiple-choice",
      prompt:
        "Which type of evidence for evolution is demonstrated by the similar bone structure in a human arm, whale flipper, and bat wing?",
      answer: "Homologous structures",
      options: [
        "Analogous structures",
        "Homologous structures",
        "Vestigial structures",
        "Molecular evidence",
      ],
      explanation:
        "Homologous structures share a common anatomical plan inherited from a common ancestor, even though they serve different functions. Analogous structures have similar functions but different origins (convergent evolution).",
      difficulty: "recall",
    },
    {
      id: "evolution-q2",
      type: "fill-blank",
      prompt:
        "Speciation that occurs when a population is separated by a geographic barrier is called ______ speciation.",
      answer: "allopatric",
      explanation:
        "Allopatric speciation ('other country') occurs when a physical barrier (mountain range, river, ocean) divides a population, preventing gene flow. Each subpopulation evolves independently under different selection pressures.",
      difficulty: "recall",
    },
    {
      id: "evolution-q3",
      type: "explain-why",
      prompt:
        "Explain how antibiotic resistance in bacteria is an example of natural selection.",
      answer:
        "Within a bacterial population, random mutations create variation — some bacteria carry alleles conferring resistance. When antibiotics are applied (selection pressure), non-resistant bacteria die while resistant ones survive and reproduce (differential survival). The resistance allele increases in frequency over generations (evolution). Overuse of antibiotics accelerates this process.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "mutations",
    "genetic-code",
    "inheritance-patterns",
    "mendelian-genetics",
  ],
  prerequisites: ["mutations", "mendelian-genetics"],
};

export default note;
