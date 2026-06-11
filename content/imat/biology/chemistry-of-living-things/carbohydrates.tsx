"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "What is the general formula for a monosaccharide?",
    answer: "(CH₂O)ₙ where n ≥ 3",
    context: "Hydrated carbon",
  },
  {
    id: "qf-2",
    question: "What type of bond links monosaccharides in a disaccharide?",
    answer: "Glycosidic bond (formed by condensation)",
    context: "Removes water",
  },
  {
    id: "qf-3",
    question: "Which polysaccharide stores glucose in animals?",
    answer: "Glycogen",
    context: "Highly branched",
  },
];

export const carbohydratesNote: AtomicNote = {
  slug: "carbohydrates",
  subject: "biology",
  topic: "chemistry-of-living-things",
  title: "Carbohydrates",
  summary:
    "Carbohydrates are sugars and their polymers, with general formula (CH₂O)ₙ. Functions: energy source (glucose), energy storage (starch, glycogen), and structural support (cellulose, chitin). Classified as monosaccharides, disaccharides, oligosaccharides, and polysaccharides.",
  memoryHook:
    "Monosaccharides = single sugar (glucose, fructose). Disaccharides = two sugars (sucrose = glucose + fructose). Polysaccharides = many sugars (starch, glycogen, cellulose).",
  imatTrap:
    "Glucose and fructose are isomers (C₆H₁₂O₆) but fructose is a ketose, glucose is an aldose. NOT all polysaccharides are digestible: cellulose has β-1,4 linkages that humans cannot break (lack cellulase). Starch is α-1,4 (amylose) + α-1,6 (amylopectin) — both digestible. Trap: confusing α and β glycosidic bonds.",
  whyItMatters:
    "Carbohydrate metabolism disorders include diabetes mellitus (impaired glucose uptake), lactose intolerance (lactase deficiency), and glycogen storage diseases. Understanding carbohydrate structure is essential for nutrition science and for diseases like dental caries (bacterial fermentation of sugars).",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Glycosidic bond types: α vs β",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Monosaccharide classification (aldose vs ketose)",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Polysaccharide structure-function relationships",
    },
  ],
  equations: [
    {
      id: "carb-condensation",
      latex:
        "C_6H_{12}O_6 + C_6H_{12}O_6 \\longrightarrow C_{12}H_{22}O_{11} + H_2O",
      description:
        "Condensation reaction forming a disaccharide from two monosaccharides",
    },
    {
      id: "carb-maltose",
      latex:
        "\\text{Glucose} + \\text{Glucose} \\xrightarrow{\\alpha-1,4\\ \\text{bond}} \\text{Maltose} + H_2O",
      description: "Maltose = glucose + glucose (α-1,4 glycosidic bond)",
    },
    {
      id: "carb-sucrose",
      latex:
        "\\text{Glucose} + \\text{Fructose} \\longrightarrow \\text{Sucrose} + H_2O",
      description: "Sucrose = glucose + fructose (α-1,β-2 glycosidic bond)",
    },
    {
      id: "carb-hydrolysis",
      latex:
        "C_{12}H_{22}O_{11} + H_2O \\longrightarrow C_6H_{12}O_6 + C_6H_{12}O_6",
      description: "Hydrolysis of a disaccharide — digestive breakdown",
    },
  ],
  workedExamples: [
    {
      id: "carb-worked-1",
      question:
        "A starch molecule contains 1000 glucose units. How many water molecules are released during its complete synthesis? (Assume only α-1,4 glycosidic bonds with no branching.)",
      hints: [
        "Each glycosidic bond formation releases one water molecule",
        "How many bonds are formed between n monomers?",
        "Linear polymer of n monomers has n−1 bonds",
      ],
      solution:
        "For 1000 glucose units linked linearly, 999 glycosidic bonds are formed. Each bond releases one H₂O molecule. For branched starch (amylopectin, ~4% α-1,6 bonds), additional water molecules are released at branch points. Total = 999 H₂O for the linear chain.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Carbohydrates",
      url: "https://www.khanacademy.org/science/biology/macromolecules/carbohydrates-and-sugars/a/carbohydrates",
      type: "article",
      description: "Comprehensive guide to carbohydrate structure",
    },
    {
      title: "OpenStax Biology 2e — Carbohydrates",
      url: "https://openstax.org/books/biology-2e/pages/3-2-carbohydrates",
      type: "textbook",
      description: "Free textbook chapter with diagrams",
    },
    {
      title: "Biochemistry by Stryer — Carbohydrates",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK22593/",
      type: "textbook",
      description: "Detailed biochemistry textbook on carbohydrate structure",
    },
  ],
  highYieldPoints: [
    "Monosaccharides: glucose, fructose, galactose (C₆H₁₂O₆ isomers)",
    "Disaccharides: maltose (glu+glu), sucrose (glu+fru), lactose (glu+gal)",
    "Polysaccharides: starch (plant storage), glycogen (animal storage), cellulose (plant wall)",
    "Glycosidic bonds: α-1,4 (digestible), β-1,4 (indigestible — cellulose)",
    "Starch = amylose (linear α-1,4) + amylopectin (branched α-1,6)",
    "Condensation = bond formation + H₂O release; Hydrolysis = bond break + H₂O consumed",
    "Cellulose: β-glucose, parallel chains held by H-bonds, very strong",
  ],
  explanation: (
    <div>
      <p>
        <strong>Carbohydrates</strong> are organic compounds with the general
        formula (CH₂O)ₙ. They are the most abundant biomolecules on Earth and
        serve as energy sources, storage polymers, and structural materials.
      </p>

      <h3>Monosaccharides</h3>
      <p>
        The simplest sugars. Classified by:
        <strong>Aldose</strong> (aldehyde group, e.g., glucose) vs{" "}
        <strong>Ketose</strong> (ketone group, e.g., fructose). Also by chain
        length: triose (3C), tetrose (4C), pentose (5C, e.g., ribose), hexose
        (6C, e.g., glucose, fructose, galactose).
      </p>

      <h3>Disaccharides</h3>
      <p>
        Formed by <strong>condensation reactions</strong> between two
        monosaccharides, creating a <strong>glycosidic bond</strong>.
      </p>

      <EquationBlock
        equation={{
          id: "carb-condensation",
          latex:
            "C_6H_{12}O_6 + C_6H_{12}O_6 \\longrightarrow C_{12}H_{22}O_{11} + H_2O",
          description: "Disaccharide formation via condensation",
        }}
      />

      <div className="grid gap-2">
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">Key Disaccharides</h4>
          <ul className="text-sm text-muted-foreground mt-1 space-y-1">
            <li>
              <strong>Maltose</strong> = glucose + glucose (α-1,4 bond) — from
              starch digestion
            </li>
            <li>
              <strong>Sucrose</strong> = glucose + fructose (α-1,β-2 bond) —
              table sugar
            </li>
            <li>
              <strong>Lactose</strong> = galactose + glucose (β-1,4 bond) — milk
              sugar
            </li>
          </ul>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Polysaccharides</h3>
      <p>
        Polymers of hundreds to thousands of monosaccharides. Three critical
        polysaccharides for IMAT:
      </p>

      <h4>Starch (Plant Energy Storage)</h4>
      <p>
        Mixture of <strong>amylose</strong> (linear α-1,4, helical) and{" "}
        <strong>amylopectin</strong> (branched α-1,4 + α-1,6). Stored in
        chloroplasts and amyloplasts. Digestible by humans.
      </p>

      <h4>Glycogen (Animal Energy Storage)</h4>
      <p>
        Highly branched (more α-1,6 bonds than amylopectin). Stored in liver
        (maintains blood glucose) and muscle (local fuel). Rapidly mobilisable.
      </p>

      <h4>Cellulose (Plant Structural)</h4>
      <p>
        Linear polymer of β-glucose with β-1,4 linkages. β-glucose has flipped
        OH orientation → straight chains that H-bond together → strong
        microfibrils. Humans lack cellulase — we cannot digest cellulose
        (dietary fibre).
      </p>

      <EquationBlock
        equation={{
          id: "carb-maltose",
          latex:
            "\\text{Glucose} + \\text{Glucose} \\xrightarrow{\\alpha-1,4\\ \\text{bond}} \\text{Maltose} + H_2O",
          description: "α-1,4 glycosidic bond (digestible)",
        }}
      />

      <h3>Condensation vs Hydrolysis</h3>
      <p>
        <strong>Condensation:</strong> monomers joined with H₂O released
        (requires enzymes, energy in the form of activated sugars).{" "}
        <strong>Hydrolysis:</strong> polymers broken apart with H₂O consumed
        (digestion). These are the two fundamental reactions of carbohydrate
        metabolism.
      </p>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "carb-worked-1",
            question:
              "A starch molecule contains 1000 glucose units. How many water molecules are released during its complete synthesis? (Assume only α-1,4 glycosidic bonds with no branching.)",
            hints: [
              "Each glycosidic bond formation releases one water molecule",
              "How many bonds are formed between n monomers?",
              "Linear polymer of n monomers has n−1 bonds",
            ],
            solution:
              "For 1000 glucose units linked linearly, 999 glycosidic bonds are formed. Each bond releases one H₂O molecule. For branched starch (amylopectin, ~4% α-1,6 bonds), additional water molecules are released at branch points. Total = 999 H₂O for the linear chain.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Monosaccharides: glucose, fructose, galactose",
          "Disaccharides: maltose, sucrose, lactose",
          "Glycosidic bonds: α = digestible, β = indigestible",
          "Starch: α-glucose, plant storage",
          "Glycogen: α-glucose, animal storage (more branched)",
          "Cellulose: β-glucose, structural (H-bonds between chains)",
          "Condensation: +H₂O; Hydrolysis: −H₂O",
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
      id: "carb-q1",
      type: "multiple-choice",
      prompt: "What is the general formula for a monosaccharide?",
      answer: "(CH₂O)ₙ",
      difficulty: "recall",
      options: ["(CH₂O)ₙ", "CₙH₂ₙOₙ", "CₙH₂ₙ₊₂Oₙ", "CₙH₂ₙO₂ₙ"],
    },
    {
      id: "carb-q2",
      type: "multiple-choice",
      prompt: "Which bond links glucose units in starch?",
      answer: "α-1,4 glycosidic bond",
      difficulty: "recall",
      options: [
        "β-1,4 glycosidic bond",
        "α-1,4 glycosidic bond",
        "α-1,6 glycosidic bond",
        "Peptide bond",
      ],
    },
    {
      id: "carb-q3",
      type: "multiple-choice",
      prompt: "Which polysaccharide is used for energy storage in animals?",
      answer: "Glycogen",
      difficulty: "recall",
      options: ["Starch", "Cellulose", "Glycogen", "Chitin"],
    },
    {
      id: "carb-q4",
      type: "multiple-choice",
      prompt: "Why can humans digest starch but not cellulose?",
      answer: "Humans lack enzymes to hydrolyse β-1,4 glycosidic bonds",
      difficulty: "apply",
      options: [
        "Cellulose is too large a molecule",
        "Humans lack enzymes to hydrolyse β-1,4 glycosidic bonds",
        "Cellulose is hydrophobic",
        "Starch dissolves better in water",
      ],
    },
    {
      id: "carb-q5",
      type: "multiple-choice",
      prompt: "Lactose is composed of which two monosaccharides?",
      answer: "Galactose and glucose",
      difficulty: "apply",
      options: [
        "Glucose and glucose",
        "Glucose and fructose",
        "Galactose and glucose",
        "Galactose and fructose",
      ],
      imatYear: 2023,
    },
    {
      id: "carb-q6",
      type: "explain-why",
      prompt: "Explain why cellulose forms strong fibres but starch does not.",
      answer:
        "Cellulose consists of β-glucose units in β-1,4 linkages. Each glucose is rotated 180°, allowing parallel chains to form extensive hydrogen bonds between OH groups, creating strong microfibrils. Starch uses α-glucose in α-1,4 linkages — the helical structure prevents chain alignment, making starch less structurally strong.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["proteins", "lipids", "nucleic-acids"],
  prerequisites: [],
};
