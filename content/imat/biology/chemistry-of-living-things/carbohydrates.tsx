import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "carbohydrates",
  subject: "biology",
  topic: "chemistry-of-living-things",
  title: "Carbohydrates",
  summary:
    "Polyhydroxy aldehydes or ketones that serve as the primary energy source and structural components in living organisms.",
  memoryHook:
    "Carbs = 'Carbon + Water' (CH₂O)n. Think of glucose as biological currency coins — stack them into glycogen (short-term wallet) or starch (long-term bank).",
  imatTrap:
    "Confusing α-1,4-glycosidic bonds (starch/glycogen, digestible) with β-1,4-glycosidic bonds (cellulose, indigestible by humans). The bond type determines function.",
  whyItMatters:
    "Lactose intolerance results from deficient lactase enzyme — inability to hydrolyze the β-glycosidic bond in lactose. Understanding carb chemistry explains dietary diseases.",
  explanation: (
    <div>
      <p>
        <strong>Monosaccharides</strong> are the simplest sugars — glucose,
        fructose, and galactose (all C₆H₁₂O₆ isomers). They cannot be hydrolyzed
        further.
      </p>
      <p>
        <strong>Disaccharides</strong> form via a condensation reaction between
        two monosaccharides, releasing H₂O:
      </p>
      <ul>
        <li>Maltose = glucose + glucose (α-1,4 bond)</li>
        <li>Sucrose = glucose + fructose (α-1,β-2 bond)</li>
        <li>Lactose = glucose + galactose (β-1,4 bond)</li>
      </ul>
      <p>
        <strong>Polysaccharides</strong> are long chains of monosaccharides:
      </p>
      <ul>
        <li>
          <strong>Starch</strong> (plants): amylose (unbranched, α-1,4) +
          amylopectin (branched, α-1,4 and α-1,6)
        </li>
        <li>
          <strong>Glycogen</strong> (animals): like amylopectin but more heavily
          branched (α-1,4 and α-1,6)
        </li>
        <li>
          <strong>Cellulose</strong> (plant cell walls): unbranched β-1,4
          glucose chains — forms rigid microfibrils
        </li>
      </ul>
      <p>
        The key distinction: <strong>α-linkages</strong> create helical,
        digestible structures; <strong>β-linkages</strong> create straight,
        rigid fibres that humans cannot break down (lack cellulase).
      </p>
    </div>
  ),
  questions: [
    {
      id: "carb-q1",
      type: "multiple-choice",
      prompt: "Which polysaccharide contains β-1,4-glycosidic bonds?",
      answer: "Cellulose",
      options: ["Glycogen", "Amylopectin", "Cellulose", "Amylose"],
      explanation:
        "Cellulose is the only common polysaccharide with β-1,4 bonds. Starch and glycogen both use α-linkages.",
      difficulty: "recall",
    },
    {
      id: "carb-q2",
      type: "fill-blank",
      prompt:
        "The bond formed between two monosaccharides during a condensation reaction is called a ______ bond.",
      answer: "glycosidic",
      explanation:
        "A glycosidic bond is a covalent bond formed by a condensation (dehydration synthesis) reaction between two hydroxyl groups on monosaccharides.",
      difficulty: "recall",
    },
    {
      id: "carb-q3",
      type: "true-false",
      prompt:
        "Humans can digest cellulose because we produce the enzyme cellulase.",
      answer: "False",
      explanation:
        "Humans lack cellulase. We cannot hydrolyze β-1,4-glycosidic bonds, which is why cellulose passes through as dietary fibre.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["enzymes", "weak-interactions"],
  prerequisites: [],
};

export default note;
