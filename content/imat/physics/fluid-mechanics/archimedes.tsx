"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "arch-qf-1",
    question: "What does the buoyant force equal?",
    answer: "weight of displaced fluid",
    hint: "Archimedes' principle",
    context: "F_b = ρ_fluid × V_displaced × g",
  },
  {
    id: "arch-qf-2",
    question:
      "If an object is 80% submerged, what fraction of its volume displaces water?",
    answer: "0.8",
    hint: "V_submerged/V_obj = ρ_obj/ρ_fluid",
    context: "Floating condition",
  },
  {
    id: "arch-qf-3",
    question:
      "True or False: A fully submerged object always displaces its own volume of fluid.",
    answer: "true",
    context: "Full submersion → V_displaced = V_object",
  },
];

export const archimedesNote: AtomicNote = {
  slug: "archimedes",
  subject: "physics",
  topic: "fluid-mechanics",
  title: "Archimedes' Principle and Buoyancy",
  summary:
    "Archimedes' principle: the buoyant force on a submerged or floating object equals the weight of the fluid it displaces. This determines whether objects float, sink, or remain neutrally buoyant.",
  memoryHook:
    "'Buoyant force = weight of displaced fluid = ρ_fluid × V_submerged × g.' If object density < fluid density → floats. If object density > fluid density → sinks. Think: 'Steel ships float because they're mostly air — average density is less than water.'",
  imatTrap:
    "The buoyant force depends on the volume of FLUID DISPLACED, not the total volume of the object. A floating object displaces fluid equal to its own WEIGHT (not its volume). A sunken object displaces fluid equal to its own VOLUME. 'Apparent weight loss' in water = buoyant force, not weight reduction.",
  whyItMatters:
    "Buoyancy explains why we feel lighter in water, how hydrometers work, and why ice floats (critical for aquatic ecosystems — ice insulates water below). In medicine, body density measurements via water displacement estimate body fat percentage. Submarines use variable buoyancy to dive and surface.",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Buoyant force calculations and floating fraction",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Apparent weight in fluids",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Density comparison for floating vs sinking",
    },
  ],
  equations: [
    {
      id: "archimedes-principle",
      latex:
        "F_b = \\rho_{\\text{fluid}} \\times V_{\\text{displaced}} \\times g",
      description:
        "Archimedes' principle: buoyant force = weight of displaced fluid",
      variables:
        "ρ_fluid = fluid density (kg/m³), V_displaced = volume displaced (m³), g = 9.8 m/s²",
    },
    {
      id: "archimedes-floating",
      latex:
        "\\frac{V_{\\text{submerged}}}{V_{\\text{object}}} = \\frac{\\rho_{\\text{object}}}{\\rho_{\\text{fluid}}}",
      description: "Floating condition: fraction submerged = density ratio",
      variables: "V_sub = volume below fluid surface, V_obj = total volume",
    },
    {
      id: "archimedes-apparent-weight",
      latex: "W_{\\text{apparent}} = mg - F_b",
      description: "Apparent weight in fluid = true weight − buoyant force",
    },
  ],
  workedExamples: [
    {
      id: "arch-worked-1",
      question:
        "IMAT 2023 Style: A wooden block of density 600 kg/m³ and volume 0.002 m³ is placed in water (ρ = 1000 kg/m³). (a) What fraction of the block is submerged? (b) What is the buoyant force? (g = 10 m/s²)",
      hints: [
        "For a floating object: weight = buoyant force.",
        "Fraction submerged = ρ_object / ρ_fluid.",
        "Buoyant force = weight of the object (since it floats).",
      ],
      solution:
        "(a) V_sub/V_total = 600/1000 = 0.6 = 60% submerged. (b) Since it floats, F_b = weight = ρ_object × V × g = 600 × 0.002 × 10 = 12 N. Or: F_b = ρ_fluid × V_sub × g = 1000 × (0.6×0.002) × 10 = 12 N.",
      imatYear: 2023,
    },
    {
      id: "arch-worked-2",
      question:
        "A 70 kg person has an apparent weight of 10 N in water. What is the buoyant force? What volume of water do they displace? (g = 10 m/s², ρ_water = 1000 kg/m³)",
      hints: [
        "Apparent weight = true weight − buoyant force.",
        "Buoyant force = mg − apparent weight.",
        "Then V_displaced = F_b/(ρ_water × g).",
      ],
      solution:
        "Weight = 70 × 10 = 700 N. F_b = 700 − 10 = 690 N. V_displaced = F_b/(ρg) = 690/(1000 × 10) = 0.069 m³ = 69 L.",
    },
  ],
  externalResources: [
    {
      title: "PhET Simulation — Buoyancy",
      url: "https://phet.colorado.edu/en/simulations/buoyancy",
      type: "simulation",
      description: "Explore buoyancy with different shapes and densities",
    },
    {
      title: "Khan Academy — Archimedes' Principle",
      url: "https://www.khanacademy.org/science/physics/fluids/buoyant-force-and-archimedes-principle/v/archimedes-principle",
      type: "video",
      description: "Clear explanation with worked examples",
    },
    {
      title: "HyperPhysics — Buoyancy",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/pbuoy.html",
      type: "textbook",
      description: "Detailed buoyancy reference with interactive calculators",
    },
  ],
  highYieldPoints: [
    "F_b = ρ_fluid × V_displaced × g",
    "Floating: F_b = W (object displaces its WEIGHT in fluid)",
    "Submerged: V_displaced = V_object (object displaces its VOLUME)",
    "Float condition: ρ_object < ρ_fluid",
    "Fraction submerged = ρ_object/ρ_fluid (for floating objects)",
    "Apparent weight = true weight − buoyant force",
    "Ice (917 kg/m³) in water (1000 kg/m³): ~91.7% submerged",
  ],
  explanation: (
    <div>
      <p>
        <strong>Archimedes' principle</strong> explains why some objects float
        and others sink. The key idea: a fluid exerts an{" "}
        <strong>upward buoyant force</strong> on any object placed in it, equal
        to the weight of the fluid the object displaces.
      </p>

      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 mb-4">
        <p className="text-sm">
          <strong>The Eureka moment:</strong> Legend says Archimedes realised
          this while taking a bath — the water level rose as he got in, and he
          saw that the volume of water displaced equalled the volume of his
          submerged body.
        </p>
      </div>

      <h3>Archimedes' Principle</h3>
      <EquationBlock
        equation={{
          id: "archimedes-principle",
          latex:
            "F_b = \\rho_{\\text{fluid}} \\times V_{\\text{displaced}} \\times g",
          description:
            "Buoyant force depends on the fluid and how much volume is displaced",
          variables:
            "F_b = buoyant force (N), ρ = fluid density (kg/m³), V = displaced volume (m³)",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Floating vs Sinking</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
          <p className="text-sm font-semibold text-green-600">Float</p>
          <p className="text-xs text-muted-foreground">
            F_b &gt; W<br />
            ρ_obj &lt; ρ_fluid
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 text-center">
          <p className="text-sm font-semibold text-blue-600">Neutral</p>
          <p className="text-xs text-muted-foreground">
            F_b = W<br />
            ρ_obj = ρ_fluid
          </p>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center">
          <p className="text-sm font-semibold text-red-600">Sink</p>
          <p className="text-xs text-muted-foreground">
            F_b &lt; W<br />
            ρ_obj &gt; ρ_fluid
          </p>
        </div>
      </div>

      <h3>Floating Condition</h3>
      <p className="mb-3">
        When an object floats, it is in equilibrium: its weight equals the
        buoyant force. This gives us a powerful relationship:
      </p>
      <EquationBlock
        equation={{
          id: "archimedes-floating",
          latex:
            "\\frac{V_{\\text{submerged}}}{V_{\\text{object}}} = \\frac{\\rho_{\\text{object}}}{\\rho_{\\text{fluid}}}",
          description: "The fraction submerged equals the density ratio",
        }}
      />

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Apparent Weight</h3>
      <p className="mb-3">
        Objects feel lighter in water because buoyancy partially supports them.
      </p>
      <EquationBlock
        equation={{
          id: "archimedes-apparent-weight",
          latex: "W_{\\text{apparent}} = mg - F_b",
          description: "True weight − buoyant force = apparent weight",
        }}
      />

      <h3>Step Solver: Buoyant Force</h3>
      <StepSolver
        problem="A 0.01 m³ object (density 500 kg/m³) floats in water (1000 kg/m³). Find V_submerged (g = 10)."
        steps={[
          {
            label: "Apply floating fraction formula",
            answer: "0.5",
            hint: "V_sub/V_total = ρ_obj/ρ_fluid = 500/1000 = 0.5",
          },
          {
            label: "Calculate submerged volume",
            answer: "0.005",
            hint: "V_sub = 0.5 × 0.01 = 0.005 m³",
          },
        ]}
        equation="V_{sub} = V_{obj} \\times \\frac{\\rho_{obj}}{\\rho_{fluid}}"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "arch-worked-1",
            question:
              "IMAT 2023 Style: Wood block ρ = 600 kg/m³ in water. Find fraction submerged.",
            hints: [
              "Use V_sub/V_total = ρ_obj/ρ_fluid.",
              "ρ_water = 1000 kg/m³.",
            ],
            solution: "600/1000 = 0.6 = 60% submerged.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "F_b = ρ_fluid × V_displaced × g",
          "Floating: F_b = W; Submerged: V_dis = V_obj",
          "Fraction submerged = ρ_obj/ρ_fluid",
          "ρ_obj < ρ_fluid → float",
          "ρ_obj > ρ_fluid → sink",
          "Apparent weight = mg − F_b",
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
      id: "archimedes-q1",
      type: "multiple-choice",
      prompt:
        "An object with density 800 kg/m³ is placed in water (density 1000 kg/m³). What fraction of the object is submerged?",
      options: ["20%", "50%", "80%", "100%"],
      answer: "80%",
      explanation:
        "For a floating object: V_sub/V_total = ρ_obj/ρ_fluid = 800/1000 = 0.8 = 80%.",
      difficulty: "apply",
    },
    {
      id: "archimedes-q2",
      type: "fill-blank",
      prompt:
        "A 0.005 m³ block is fully submerged in water (ρ = 1000 kg/m³, g = 9.8 m/s²). What is the buoyant force in N?",
      answer: "49",
      explanation: "F_b = ρ_fluid × V × g = 1000 × 0.005 × 9.8 = 49 N.",
      difficulty: "apply",
    },
    {
      id: "archimedes-q3",
      type: "true-false",
      prompt:
        "True or False: A fully submerged object always displaces a volume of fluid equal to its own volume.",
      answer: "True",
      explanation:
        "A fully submerged object displaces fluid equal to its own total volume. A partially submerged (floating) object displaces fluid whose weight equals the object's weight.",
      difficulty: "recall",
    },
    {
      id: "archimedes-q4",
      type: "multiple-choice",
      prompt:
        "An object weighs 100 N in air and 60 N in water. What is the buoyant force?",
      options: ["100 N", "60 N", "40 N", "160 N"],
      answer: "40 N",
      explanation:
        "Apparent weight = true weight − buoyant force. So F_b = 100 − 60 = 40 N.",
      difficulty: "apply",
      imatYear: 2022,
    },
    {
      id: "archimedes-q5",
      type: "multiple-choice",
      prompt: "A steel ship floats because:",
      options: [
        "Steel is less dense than water",
        "The average density (steel + air) is less than water",
        "Buoyancy doesn't apply to steel",
        "Surface tension holds it up",
      ],
      answer: "The average density (steel + air) is less than water",
      explanation:
        "The ship is hollow — it contains air. The average density of the steel + air is less than water, so it floats. A solid steel block sinks.",
      difficulty: "analyze",
    },
    {
      id: "archimedes-q6",
      type: "fill-blank",
      prompt:
        "What volume of water (in m³) is displaced by a 500 N floating object? (ρ_water = 1000 kg/m³, g = 10 m/s²)",
      answer: "0.05",
      explanation:
        "For a floating object, F_b = weight of object = weight of displaced fluid. So 500 = 1000 × V × 10 → V = 0.05 m³.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["pressure", "forces", "gas-laws", "newton-laws"],
  prerequisites: ["pressure", "forces"],
};
