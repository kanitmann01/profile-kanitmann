import type { AtomicNote } from "@/data/imat/types";

export const mendelianGeneticsNote: AtomicNote = {
  slug: "mendelian-genetics",
  subject: "biology",
  topic: "reproduction-and-inheritance",
  title: "Mendelian Genetics",
  summary:
    "Gregor Mendel's laws of inheritance — segregation and independent assortment — describe how alleles separate and recombine during gamete formation, producing predictable phenotypic ratios.",
  memoryHook:
    "Monohybrid cross (Aa × Aa) → 3:1 phenotypic ratio (dominant:recessive). Dihybrid cross (AaBb × AaBb) → 9:3:3:1. Remember: '3 for one trait, 9-3-3-1 for two'. The FOIL method (First, Outer, Inner, Last) helps list gametes for dihybrid crosses.",
  imatTrap:
    "Mendel's laws assume: (1) complete dominance, (2) genes on DIFFERENT chromosomes (independent assortment), (3) no linkage, (4) no epistasis. If genes are linked, the 9:3:3:1 ratio breaks down. Also, the law of segregation applies to alleles of ONE gene; independent assortment applies to TWO OR MORE genes.",
  whyItMatters:
    "Huntington's disease is autosomal dominant — a single copy of the mutant allele causes the disease. Cystic fibrosis is autosomal recessive — two copies needed. Understanding Mendelian inheritance is essential for genetic counselling and pedigree analysis.",
  explanation: (
    <div>
      <p>
        <strong>Mendelian genetics</strong> describes the patterns of
        inheritance first discovered by Gregor Mendel through pea plant
        experiments (1865).
      </p>
      <h3>Key Terminology</h3>
      <ul>
        <li>
          <strong>Allele:</strong> Alternative form of a gene (e.g., A or a)
        </li>
        <li>
          <strong>Genotype:</strong> The allele combination (AA, Aa, aa)
        </li>
        <li>
          <strong>Phenotype:</strong> The observable trait
        </li>
        <li>
          <strong>Homozygous:</strong> Two identical alleles (AA or aa)
        </li>
        <li>
          <strong>Heterozygous:</strong> Two different alleles (Aa)
        </li>
      </ul>
      <h3>Mendel's Laws</h3>
      <p>
        <strong>Law of Segregation:</strong> During gamete formation, the two
        alleles for each gene separate so that each gamete carries only one
        allele. (Meiosis I — homologous chromosomes separate.)
      </p>
      <p>
        <strong>Law of Independent Assortment:</strong> Alleles of different
        genes assort independently during gamete formation (assuming genes are
        on different chromosomes). (Meiosis I — random orientation of
        bivalents.)
      </p>
      <h3>Monohybrid Cross (Aa × Aa)</h3>
      <ul>
        <li>Genotypic ratio: 1 AA : 2 Aa : 1 aa</li>
        <li>Phenotypic ratio: 3 dominant : 1 recessive</li>
      </ul>
      <h3>Dihybrid Cross (AaBb × AaBb)</h3>
      <ul>
        <li>Phenotypic ratio: 9 (A_B_) : 3 (A_bb) : 3 (aaB_) : 1 (aabb)</li>
        <li>Each gene segregates independently, so probabilities multiply.</li>
      </ul>
      <h3>Test Cross</h3>
      <p>
        Crossing an individual of unknown genotype (showing dominant phenotype)
        with a homozygous recessive (aa) to determine if it is AA or Aa. If any
        offspring show the recessive phenotype, the unknown parent is Aa.
      </p>
    </div>
  ),
  questions: [
    {
      id: "mendelian-q1",
      type: "multiple-choice",
      prompt:
        "In a dihybrid cross AaBb × AaBb, what proportion of offspring are expected to be homozygous recessive for both traits (aabb)?",
      answer: "1/16",
      options: ["1/4", "1/8", "1/16", "1/2"],
      explanation:
        "Probability of aa = 1/4, probability of bb = 1/4. Since the genes assort independently: 1/4 × 1/4 = 1/16.",
      difficulty: "apply",
    },
    {
      id: "mendelian-q2",
      type: "fill-blank",
      prompt:
        "Mendel's Law of ______ states that alleles of different genes assort independently during gamete formation.",
      answer: "independent assortment",
      explanation:
        "The law of independent assortment applies to genes on different chromosomes (or far apart on the same chromosome). It produces the 9:3:3:1 ratio in dihybrid crosses.",
      difficulty: "recall",
    },
    {
      id: "mendelian-q3",
      type: "explain-why",
      prompt:
        "A test cross is performed between an individual with a dominant phenotype but unknown genotype and a homozygous recessive individual. Half the offspring show the recessive phenotype. What is the unknown parent's genotype?",
      answer:
        "The unknown parent is heterozygous (Aa). If it were homozygous dominant (AA), all offspring would show the dominant phenotype. The 1:1 ratio of dominant:recessive offspring confirms Aa.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["inheritance-patterns", "dna-structure", "genetic-code"],
  prerequisites: ["dna-structure"],
};
