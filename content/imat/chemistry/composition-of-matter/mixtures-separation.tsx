"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "ms-qf-1",
    question: "Is air a compound or a mixture?",
    answer: "Mixture (homogeneous solution of gases)",
    context: "Components are not chemically bonded",
  },
  {
    id: "ms-qf-2",
    question: "What does Rf stand for in chromatography?",
    answer: "Retention factor",
    context: "Rf = distance of spot / distance of solvent front",
  },
];

export const mixturesSeparationNote: AtomicNote = {
  slug: "mixtures-separation",
  subject: "chemistry",
  topic: "composition-of-matter",
  title: "Mixtures & Separation Techniques",
  summary:
    "Combinations of two or more substances not chemically bonded — homogeneous (solutions) or heterogeneous — separable by physical methods.",
  memoryHook:
    "Homogeneous = 'homogenized milk' (looks uniform); Heterogeneous = 'heterogeneous salad' (you can see the parts). 'Filter → Distil → Chromatograph → Centrifuge' — match the technique to the mixture type.",
  imatTrap:
    "Air is a homogeneous mixture (solution of gases), NOT a compound. Alloys (e.g. brass) are solid solutions — homogeneous mixtures, not compounds. Fractional distillation separates liquids with CLOSE boiling points; simple distillation needs LARGE differences.",
  whyItMatters:
    "IMAT frequently asks which separation technique to use for a given mixture. Knowing when to filter, distil, or chromatograph is essential for lab-based questions.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Choosing correct separation technique for a given mixture",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Chromatography — Rf calculation and stationary/mobile phase",
    },
    {
      years: [2021],
      frequency: "medium",
      notes: "Distillation — simple vs fractional",
    },
  ],
  equations: [
    {
      id: "rf-formula",
      latex:
        "R_f = \\frac{\\text{distance travelled by substance}}{\\text{distance travelled by solvent front}}",
      description:
        "Retention factor in chromatography — constant for a given substance under fixed conditions",
    },
    {
      id: "fractional-distillation-column",
      latex:
        "\\text{Liquid mixture} \\xrightarrow{\\Delta} \\text{vapour rises} \\xrightarrow{\\text{condense}} \\text{pure liquid}",
      description:
        "Principle of fractional distillation — repeated condensation and vaporisation separates close-boiling liquids",
    },
  ],
  workedExamples: [
    {
      id: "ms-we-1",
      question:
        "A student has a mixture of sand, salt, and water. Describe a procedure to separate all three components in their pure forms.",
      hints: [
        "Which component is insoluble in water? Start with that.",
        "After removing the insoluble solid, what remains dissolved in water?",
        "How do you recover the dissolved solid from water?",
      ],
      solution:
        "Step 1: Filtration — sand (insoluble) is trapped by filter paper; saltwater passes through as filtrate. Step 2: Evaporation or distillation — heat the saltwater to evaporate water, leaving crystalline salt. If water also needs to be collected, use distillation (condense the steam). This is a classic three-component separation.",
    },
    {
      id: "ms-we-2",
      question:
        "A spot in paper chromatography travels 4.5 cm while the solvent front travels 9.0 cm. Calculate the Rf value. Would this substance be more or less polar than one with Rf = 0.3?",
      hints: [
        "What is the formula for Rf?",
        "A higher Rf means the substance travelled farther — what does that imply about its affinity for the mobile phase?",
        "The mobile phase is usually nonpolar; the stationary phase is polar.",
      ],
      solution:
        "Rf = 4.5/9.0 = 0.5. A substance with Rf = 0.5 travelled farther than one with Rf = 0.3, so it has a higher affinity for the mobile phase (less attraction to the stationary phase). Since the stationary phase is polar, a higher Rf suggests a less polar (more nonpolar) substance.",
      imatYear: 2022,
    },
  ],
  externalResources: [
    {
      title: "PhET — Separation Techniques Simulation",
      url: "https://phet.colorado.edu/en/simulations/states-of-matter",
      type: "simulation",
      description: "Explore how different properties enable separation",
    },
    {
      title: "Khan Academy — Distillation & Chromatography",
      url: "https://www.khanacademy.org/science/chemistry/states-of-matter-and-intermolecular-forces/phase-changes/v/distillation",
      type: "video",
      description:
        "Visual explanation of distillation and chromatography techniques",
    },
    {
      title: "RSC — Separation Techniques Practical Guide",
      url: "https://edu.rsc.org/resources/separation-techniques/",
      type: "article",
      description: "Royal Society of Chemistry guide with practical procedures",
    },
  ],
  highYieldPoints: [
    "Homogeneous: uniform throughout (solutions, alloys, air)",
    "Heterogeneous: non-uniform (sand + water, oil + water)",
    "Filtration: separate insoluble solid from liquid (sand from water)",
    "Distillation: separate by boiling point (simple = large ΔBP, fractional = close BP)",
    "Chromatography: separate by differential affinity to stationary vs mobile phase",
    "Centrifugation: separate by density (blood components)",
    "Evaporation: recover dissolved solid from solution",
  ],
  explanation: (
    <div>
      <p>
        A <strong>mixture</strong> contains two or more substances physically
        combined — no chemical bonding, variable composition, and separable by
        physical means.
      </p>

      <h3>Types of Mixtures</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Homogeneous</h4>
          <p className="text-xs text-muted-foreground">
            Uniform throughout, one visible phase
          </p>
          <p className="text-xs mt-1">
            Examples: saltwater, air, brass (alloy)
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Heterogeneous</h4>
          <p className="text-xs text-muted-foreground">
            Non-uniform, multiple visible phases
          </p>
          <p className="text-xs mt-1">
            Examples: sand + water, oil + water, granite
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Separation Techniques</h3>
      <div className="grid gap-2">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">Filtration</h4>
          <p className="text-xs text-muted-foreground">
            Separates insoluble solid from liquid. Based on particle size. The
            solid is retained by filter paper (residue), the liquid passes
            through (filtrate).
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">Simple Distillation</h4>
          <p className="text-xs text-muted-foreground">
            Separates liquids with very different boiling points (e.g. water
            100°C + salt). The lower-BP liquid vaporises, condenses, and is
            collected.
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold">Fractional Distillation</h4>
          <p className="text-xs text-muted-foreground">
            Separates liquids with close boiling points (e.g. ethanol 78°C +
            water 100°C). A fractionating column allows repeated
            condensation/vaporisation cycles.
          </p>
        </div>
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-3">
          <h4 className="text-sm font-semibold">Chromatography</h4>
          <p className="text-xs text-muted-foreground">
            Separates dissolved substances by differential attraction to
            stationary vs mobile phase. Rf value identifies each substance.
          </p>

          <EquationBlock
            equation={{
              id: "rf-formula",
              latex:
                "R_f = \\frac{\\text{distance travelled by substance}}{\\text{distance travelled by solvent front}}",
              description: "Retention factor calculation",
            }}
          />
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">Centrifugation</h4>
          <p className="text-xs text-muted-foreground">
            Separates by density using rapid spinning. Denser components
            sediment at the bottom. Used for blood (RBCs, plasma).
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">Evaporation</h4>
          <p className="text-xs text-muted-foreground">
            Removes solvent to recover dissolved solid (salt from saltwater).
            Slow process, no solvent recovery.
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "ms-we-1",
            question:
              "A student has a mixture of sand, salt, and water. Describe a procedure to separate all three components in their pure forms.",
            hints: [
              "Which component is insoluble in water? Start with that.",
              "After removing the insoluble solid, what remains dissolved in water?",
              "How do you recover the dissolved solid from water?",
            ],
            solution:
              "Step 1: Filtration — sand (insoluble) is trapped by filter paper; saltwater passes through as filtrate. Step 2: Evaporation or distillation — heat the saltwater to evaporate water, leaving crystalline salt. If water also needs to be collected, use distillation (condense the steam).",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Homogeneous: uniform (solutions, air)",
          "Heterogeneous: non-uniform (oil+water)",
          "Filtration: solids from liquids",
          "Distillation: separate by boiling point",
          "Chromatography: separate by Rf value",
          "Centrifugation: separate by density",
          "Evaporation: recover dissolved solid",
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
    </div>
  ),
  questions: [
    {
      id: "ms-q1",
      type: "multiple-choice",
      prompt:
        "Which technique best separates ethanol (BP 78°C) from water (BP 100°C)?",
      answer: "Fractional distillation",
      options: [
        "Filtration",
        "Fractional distillation",
        "Chromatography",
        "Centrifugation",
      ],
      explanation:
        "Ethanol and water are miscible liquids with different boiling points. Fractional distillation exploits this difference using a fractionating column.",
      difficulty: "apply",
    },
    {
      id: "ms-q2",
      type: "fill-blank",
      prompt:
        "In paper chromatography, Rf = distance travelled by spot ÷ distance travelled by ______.",
      answer: "solvent front",
      explanation:
        "Rf (retention factor) is the ratio of the distance the substance moved to the distance the solvent front moved. It is constant for a given substance under fixed conditions.",
      difficulty: "recall",
    },
    {
      id: "ms-q3",
      type: "true-false",
      prompt: "Air is a compound because it contains nitrogen and oxygen.",
      answer: "False",
      explanation:
        "Air is a homogeneous mixture (solution) of gases. The components are not chemically bonded and can be separated by fractional distillation of liquid air.",
      difficulty: "apply",
    },
    {
      id: "ms-q4",
      type: "multiple-choice",
      prompt: "Which separation technique relies on differences in density?",
      answer: "Centrifugation",
      options: [
        "Filtration",
        "Distillation",
        "Centrifugation",
        "Chromatography",
      ],
      explanation:
        "Centrifugation spins samples at high speed, forcing denser components to sediment at the bottom — separating by density.",
      difficulty: "recall",
    },
    {
      id: "ms-q5",
      type: "multiple-choice",
      prompt:
        "A coloured ink mixture gives three spots on a chromatogram. What does this indicate?",
      answer:
        "The ink contains at least three different components with different affinities for the mobile/stationary phases.",
      options: [
        "The ink is a single pure substance",
        "The ink contains at least three different components with different affinities",
        "The chromatogram failed",
        "The paper was contaminated",
      ],
      explanation:
        "Chromatography separates components based on their differential migration. Each spot represents a different component with a characteristic Rf value.",
      difficulty: "apply",
    },
    {
      id: "ms-q6",
      type: "explain-why",
      prompt:
        "Why is fractional distillation better than simple distillation for separating ethanol from water?",
      answer:
        "Ethanol (BP 78°C) and water (BP 100°C) have boiling points only 22°C apart. In simple distillation, the single condensation step gives impure separation. Fractional distillation has a column that provides multiple condensation-vaporisation cycles, allowing near-complete separation of the two components.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["pure-substances", "concentration", "solubility"],
  prerequisites: ["pure-substances"],
};
