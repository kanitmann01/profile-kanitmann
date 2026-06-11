import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "inheritance-patterns",
  subject: "biology",
  topic: "reproduction-and-inheritance",
  title: "Non-Mendelian Inheritance Patterns",
  summary:
    "Inheritance patterns that deviate from simple Mendelian dominance — including incomplete dominance, codominance, multiple alleles, polygenic inheritance, and sex-linked traits.",
  memoryHook:
    "Incomplete dominance = BLENDING (red + white = pink, 1:2:1 ratio). Codominance = BOTH show up (blood type AB, both A and B antigens). Sex-linked = X chromosome carries the gene; males (XY) are hemizygous and express whatever allele is on their single X — 'males get it from mom'.",
  imatTrap:
    "Incomplete dominance and codominance are NOT the same. In incomplete dominance, the heterozygote has an INTERMEDIATE phenotype (pink flowers). In codominance, BOTH alleles are FULLY expressed (AB blood type — both A and B antigens present). Also, X-linked recessive disorders are more common in MALES because they have only one X.",
  whyItMatters:
    "Haemophilia A (X-linked recessive) was carried by Queen Victoria's descendants through European royal families. ABO blood group incompatibility causes haemolytic disease of the newborn. These patterns directly affect clinical practice.",
  explanation: (
    <div>
      <h3>Incomplete Dominance</h3>
      <p>
        The heterozygote has an <strong>intermediate</strong> phenotype between
        the two homozygotes. Neither allele is fully dominant.
      </p>
      <ul>
        <li>Example: Snapdragons — RR (red) × rr (white) → Rr (pink)</li>
        <li>
          F₂ ratio: 1 red : 2 pink : 1 white (genotypic = phenotypic = 1:2:1)
        </li>
      </ul>
      <h3>Codominance</h3>
      <p>
        Both alleles are <strong>fully expressed</strong> simultaneously in the
        heterozygote.
      </p>
      <ul>
        <li>
          Example: ABO blood group — I<sup>A</sup>I<sup>B</sup> = blood type AB
          (both A and B antigens on red blood cells)
        </li>
        <li>
          Example: MN blood group — L<sup>M</sup>L<sup>N</sup> individuals
          express both M and N glycoproteins
        </li>
      </ul>
      <h3>Multiple Alleles</h3>
      <p>
        More than two alleles exist for a gene in the population (though an
        individual still carries only two).
      </p>
      <ul>
        <li>
          ABO blood types: I<sup>A</sup>, I<sup>B</sup>, and i (three alleles,
          six genotypes, four phenotypes)
        </li>
        <li>
          I<sup>A</sup> and I<sup>B</sup> are codominant; both are dominant over
          i
        </li>
      </ul>
      <h3>Sex-Linked Inheritance (X-linked)</h3>
      <p>
        Genes on the X chromosome show distinctive inheritance patterns because
        males (XY) are <strong>hemizygous</strong> — they have only one copy.
      </p>
      <ul>
        <li>
          X-linked recessive disorders (haemophilia, red-green colour blindness,
          Duchenne muscular dystrophy) are more common in males
        </li>
        <li>
          Affected father → ALL daughters are carriers, NO sons are affected
        </li>
        <li>
          Carrier mother → 50% chance sons are affected, 50% chance daughters
          are carriers
        </li>
      </ul>
      <h3>Polygenic Inheritance</h3>
      <p>
        Multiple genes contribute to a single trait, producing continuous
        variation (bell curve distribution).
      </p>
      <ul>
        <li>Examples: skin colour, height, eye colour</li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "inheritance-q1",
      type: "multiple-choice",
      prompt:
        "A woman with blood type A (heterozygous) marries a man with blood type B (heterozygous). What is the probability their child has blood type O?",
      answer: "25%",
      options: ["0%", "25%", "50%", "75%"],
      explanation:
        "Mother: Iᴬi, Father: Iᴮi. Possible offspring: IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B), ii (O). Probability of type O (ii) = 1/4 = 25%.",
      difficulty: "apply",
    },
    {
      id: "inheritance-q2",
      type: "true-false",
      prompt:
        "In a cross between red-flowered (RR) and white-flowered (rr) snapdragons showing incomplete dominance, the F₂ phenotypic ratio is 3:1.",
      answer: "False",
      explanation:
        "Incomplete dominance produces a 1:2:1 phenotypic ratio (1 red : 2 pink : 1 white), not 3:1. The 3:1 ratio only occurs with complete dominance.",
      difficulty: "apply",
    },
    {
      id: "inheritance-q3",
      type: "explain-why",
      prompt:
        "Why are X-linked recessive disorders more common in males than females?",
      answer:
        "Males are hemizygous (XY) — they have only one X chromosome. A single recessive allele on the X chromosome is sufficient to cause the disorder. Females (XX) need two copies of the recessive allele, which is statistically much less likely.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["mendelian-genetics", "genetic-code", "dna-structure"],
  prerequisites: ["mendelian-genetics"],
};

export default note;
