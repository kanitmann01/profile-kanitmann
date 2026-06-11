"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "forces-qf-1",
    question:
      "What is the normal force on a 5 kg box on a flat surface? (g = 10 m/s²)",
    answer: "50",
    hint: "N = mg for horizontal surfaces",
    context: "No other vertical forces",
  },
  {
    id: "forces-qf-2",
    question:
      "Which is larger: static friction or kinetic friction for the same surfaces?",
    answer: "static",
    hint: "Think about starting vs maintaining motion",
    context: "μₛ > μₖ always",
  },
  {
    id: "forces-qf-3",
    question: "What is the formula for the restoring force of a spring?",
    answer: "F = -kx",
    hint: "Named after Robert Hooke",
    context: "The negative sign means it opposes displacement",
  },
];

export const forcesNote: AtomicNote = {
  slug: "forces",
  subject: "physics",
  topic: "dynamics",
  title: "Types of Forces",
  summary:
    "The main forces in classical mechanics: gravity (W = mg), normal force (perpendicular to surface), friction (f = μN, opposes motion), tension (along ropes/strings), and spring force (F = −kx, Hooke's law).",
  memoryHook:
    "'Gravity pulls down (W=mg), Normal pushes up (perpendicular), Friction fights motion (f=μN), Tension pulls along the rope, Springs resist deformation (F=−kx).' For friction: 'static ≥ kinetic' — it's harder to start moving than to keep moving.",
  imatTrap:
    "Normal force ≠ weight in general. On an incline: N = mg cos θ (not mg). Friction opposes the direction of motion (or impending motion), not necessarily the applied force. Static friction is variable (0 ≤ fₛ ≤ μₛN); kinetic friction is constant (fₖ = μₖN). Tension in an ideal rope is uniform throughout — don't add tensions at different points.",
  whyItMatters:
    "Understanding forces is essential for biomechanics (joint forces, muscle tension), engineering (structural loads, bridge design), and medicine (blood flow resistance is analogous to friction). IMAT loves inclined-plane problems combining gravity components, normal force, and friction.",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Inclined plane problems with friction",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Hooke's law and spring combinations",
    },
    {
      years: [2022, 2024],
      frequency: "medium",
      notes: "Normal force on inclines",
    },
  ],
  equations: [
    {
      id: "forces-weight",
      latex: "W = mg",
      description: "Weight = mass × gravitational field strength",
      variables: "m = mass (kg), g = 9.8 m/s² (Earth's surface)",
    },
    {
      id: "forces-friction-static",
      latex: "f_s \\leq \\mu_s N",
      description: "Static friction: variable up to a maximum",
      variables: "μₛ = coefficient of static friction, N = normal force (N)",
    },
    {
      id: "forces-friction-kinetic",
      latex: "f_k = \\mu_k N",
      description: "Kinetic friction: constant when sliding",
      variables: "μₖ = coefficient of kinetic friction (μₖ < μₛ)",
    },
    {
      id: "forces-hooke",
      latex: "F = -kx",
      description: "Hooke's law: restoring force of a spring",
      variables:
        "k = spring constant (N/m), x = displacement from equilibrium (m)",
    },
    {
      id: "forces-incline-normal",
      latex: "N = mg \\cos \\theta",
      description: "Normal force on an inclined plane",
      variables: "θ = angle of incline from horizontal",
    },
  ],
  workedExamples: [
    {
      id: "forces-worked-1",
      question:
        "IMAT 2023 Style: A 10 kg box sits on a ramp inclined at 30° with μₖ = 0.2. The box slides down. Calculate (a) the component of weight parallel to the incline, (b) the frictional force, and (c) the net acceleration. Use g = 10 m/s².",
      hints: [
        "Weight parallel to incline = mg sin θ.",
        "Normal force = mg cos θ, then fₖ = μₖN.",
        "Net force = mg sin θ − fₖ, then a = F_net / m.",
      ],
      solution:
        "(a) F_∥ = 10 × 10 × sin 30° = 100 × 0.5 = 50 N down the incline. (b) N = 10 × 10 × cos 30° = 100 × 0.866 = 86.6 N. fₖ = 0.2 × 86.6 = 17.3 N up the incline. (c) F_net = 50 − 17.3 = 32.7 N. a = 32.7 / 10 = 3.27 m/s².",
      imatYear: 2023,
    },
    {
      id: "forces-worked-2",
      question:
        "A 2 kg mass hangs from a spring with k = 500 N/m. By how much does the spring stretch when the mass is at rest? (g = 10 m/s²)",
      hints: [
        "At rest, spring force balances weight: kx = mg.",
        "Solve for x = mg/k.",
        "Plug in the numbers.",
      ],
      solution:
        "At equilibrium: kx = mg → x = mg/k = (2 × 10) / 500 = 20/500 = 0.04 m = 4 cm.",
    },
  ],
  externalResources: [
    {
      title: "PhET Simulation — Forces and Motion",
      url: "https://phet.colorado.edu/en/simulations/forces-and-motion-basics",
      type: "simulation",
      description: "Interactive friction and force exploration",
    },
    {
      title: "Khan Academy — Inclined Planes",
      url: "https://www.khanacademy.org/science/physics/forces-newtons-laws/inclined-planes-friction/v/inclined-plane-force-components",
      type: "video",
      description: "Force decomposition on inclines with friction examples",
    },
    {
      title: "HyperPhysics — Mechanical Friction",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/frict2.html",
      type: "textbook",
      description: "Detailed friction reference with tables of coefficients",
    },
  ],
  highYieldPoints: [
    "W = mg (weight ≠ mass!)",
    "N = mg cos θ on inclines (NOT mg)",
    "Static friction: fₛ ≤ μₛN; Kinetic friction: fₖ = μₖN",
    "μₛ > μₖ for the same surfaces",
    "Tension in ideal rope: uniform throughout, pulls only",
    "Hooke's law: F = −kx (restoring force)",
    "Free-body diagrams are essential for problem-solving",
  ],
  explanation: (
    <div>
      <p>
        Forces are <strong>pushes or pulls</strong> that can change an
        object&apos;s state of motion. In classical mechanics, we deal with
        several fundamental types. The key to IMAT success is drawing proper{" "}
        <strong>free-body diagrams</strong>
        and decomposing forces correctly.
      </p>

      <h3>Gravitational Force (Weight)</h3>
      <p className="mb-3">
        The force Earth exerts on any object with mass. Always acts{" "}
        <strong>vertically downward</strong> toward Earth&apos;s centre.
      </p>
      <EquationBlock
        equation={{
          id: "forces-weight",
          latex: "W = mg",
          description: "Weight depends on g; mass is intrinsic",
          variables: "m = mass (kg), g = 9.8 m/s²",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Normal Force</h3>
      <p className="mb-3">
        A <strong>reactive force</strong> exerted by a surface perpendicular to
        itself. It adjusts to prevent the object from penetrating the surface.
      </p>
      <div className="grid gap-2 mb-4">
        <div className="rounded-lg border bg-card p-3">
          <p className="text-sm">
            <strong>Flat surface</strong>: N = mg
          </p>
          <p className="text-xs text-muted-foreground">
            The surface pushes up exactly enough to support the weight.
          </p>
        </div>
        <EquationBlock
          equation={{
            id: "forces-incline-normal",
            latex: "N = mg \\cos \\theta",
            description:
              "On an incline, only the perpendicular component of weight matters",
          }}
        />
      </div>

      <h3>Friction</h3>
      <p className="mb-3">
        Friction always <strong>opposes relative motion</strong> (or impending
        motion) between surfaces in contact.
      </p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold text-amber-600">
            Static Friction
          </h4>
          <EquationBlock
            equation={{
              id: "forces-friction-static",
              latex: "f_s \\leq \\mu_s N",
              description: "Variable — matches applied force up to limit",
            }}
          />
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
          <h4 className="text-sm font-semibold text-red-600">
            Kinetic Friction
          </h4>
          <EquationBlock
            equation={{
              id: "forces-friction-kinetic",
              latex: "f_k = \\mu_k N",
              description: "Constant once sliding begins",
            }}
          />
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Tension</h3>
      <p className="mb-3">
        The force transmitted through a <strong>rope, string, or cable</strong>{" "}
        when pulled tight. It always <strong>pulls</strong> (never pushes) along
        the rope direction. In ideal ropes (massless, inextensible), tension is
        uniform throughout.
      </p>

      <h3>Spring Force (Hooke&apos;s Law)</h3>
      <p className="mb-3">
        A spring exerts a <strong>restoring force</strong> proportional to how
        far it is stretched or compressed from its natural length.
      </p>
      <EquationBlock
        equation={{
          id: "forces-hooke",
          latex: "F = -kx",
          description: "The negative sign: force opposes the displacement",
          variables: "k = spring constant (N/m), x = displacement (m)",
        }}
      />

      <QuickFire
        questions={recallQuestions.slice(2, 3)}
        title="Check Understanding"
      />

      <h3>Step Solver: Inclined Plane</h3>
      <StepSolver
        problem="A 5 kg box on a 30° incline (μₖ = 0.3). Find acceleration (g = 10 m/s²)."
        steps={[
          {
            label: "Find weight parallel to incline",
            answer: "25",
            hint: "mg sin θ = 5 × 10 × 0.5",
          },
          {
            label: "Find normal force",
            answer: "43.3",
            hint: "N = mg cos θ = 50 × 0.866",
          },
          {
            label: "Find kinetic friction",
            answer: "12.99",
            hint: "fₖ = μₖN = 0.3 × 43.3",
          },
          {
            label: "Calculate net acceleration",
            answer: "2.4",
            hint: "a = (25 − 12.99) / 5",
          },
        ]}
        equation="a = \\frac{mg\\sin\\theta - \\mu_k mg\\cos\\theta}{m}"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "forces-worked-1",
            question:
              "IMAT 2023 Style: 10 kg box on 30° ramp, μₖ = 0.2. Find acceleration.",
            hints: [
              "F_∥ = mg sin θ",
              "N = mg cos θ, then fₖ = μₖN",
              "F_net = F_∥ − fₖ, then a = F_net/m",
            ],
            solution: "F_∥ = 50 N, N = 86.6 N, fₖ = 17.3 N, a = 3.27 m/s².",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "W = mg (downward)",
          "N = mg cos θ on incline",
          "fₛ ≤ μₛN (variable); fₖ = μₖN (constant)",
          "μₛ > μₖ",
          "Tension: uniform, pulls only",
          "Hooke's law: F = −kx",
          "Always draw free-body diagrams!",
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
      id: "forces-q1",
      type: "multiple-choice",
      prompt:
        "A 10 kg box sits on a ramp inclined at 30°. What is the normal force? (g = 9.8 m/s², cos 30° = 0.866)",
      options: ["98 N", "49 N", "84.9 N", "10 N"],
      answer: "84.9 N",
      explanation: "N = mg cos θ = 10 × 9.8 × cos 30° = 98 × 0.866 = 84.9 N.",
      difficulty: "apply",
    },
    {
      id: "forces-q2",
      type: "multiple-choice",
      prompt: "Which type of friction is greater for the same surfaces?",
      options: [
        "Kinetic friction",
        "Static friction (maximum)",
        "They are always equal",
        "Depends on the applied force",
      ],
      answer: "Static friction (maximum)",
      explanation:
        "μₛ > μₖ for the same surfaces, so maximum static friction (μₛN) is always greater than kinetic friction (μₖN).",
      difficulty: "recall",
    },
    {
      id: "forces-q3",
      type: "fill-blank",
      prompt:
        "A spring with k = 200 N/m is stretched 0.05 m from equilibrium. What force does it exert? (Give answer in N, no units)",
      answer: "10",
      explanation:
        "F = kx = 200 × 0.05 = 10 N. The restoring force opposes the stretch direction.",
      difficulty: "apply",
    },
    {
      id: "forces-q4",
      type: "multiple-choice",
      prompt:
        "A 2 kg mass is on a frictionless 30° incline. What is its acceleration? (g = 10 m/s²)",
      options: ["10 m/s²", "5 m/s²", "8.66 m/s²", "2.5 m/s²"],
      answer: "5 m/s²",
      explanation:
        "a = g sin θ = 10 × 0.5 = 5 m/s². On a frictionless incline, acceleration depends only on g and θ, not on mass!",
      difficulty: "apply",
      imatYear: 2022,
    },
    {
      id: "forces-q5",
      type: "true-false",
      prompt:
        "True or False: The tension in an ideal rope is the same at every point along the rope.",
      answer: "True",
      explanation:
        "For an ideal (massless, inextensible) rope, tension is uniform throughout. This is a key assumption in pulley problems.",
      difficulty: "recall",
    },
    {
      id: "forces-q6",
      type: "multiple-choice",
      prompt: "What is the SI unit of the spring constant k in Hooke's law?",
      options: ["N·m", "N/m", "N·s/m", "kg/m"],
      answer: "N/m",
      explanation:
        "F = kx, so k = F/x. Units: N/m. A stiffer spring has a larger k.",
      difficulty: "apply",
    },
  ],
  crosslinks: [
    "newton-laws",
    "projectile-motion",
    "archimedes",
    "coulombs-law",
    "pressure",
  ],
  prerequisites: ["newton-laws"],
};
