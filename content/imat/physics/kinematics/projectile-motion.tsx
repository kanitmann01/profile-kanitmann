"use client";

import type { AtomicNote } from "@/data/imat/types";
import { ProjectileMotion } from "@/components/imat/interactive/projectile-motion";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "proj-qf-1",
    question:
      "At the highest point of projectile motion, what is the vertical velocity?",
    answer: "0",
    hint: "What happens at the turning point?",
    context: "The ball stops rising and starts falling",
  },
  {
    id: "proj-qf-2",
    question:
      "Which launch angle gives maximum range (ignoring air resistance)?",
    answer: "45",
    hint: "Think about sin(2θ)",
    context: "Maximum when 2θ = 90°",
  },
  {
    id: "proj-qf-3",
    question:
      "Is horizontal acceleration zero or g in ideal projectile motion?",
    answer: "zero",
    hint: "Only gravity acts, and it's vertical",
    context: "No horizontal forces (ignoring air resistance)",
  },
];

export const projectileMotionNote: AtomicNote = {
  slug: "projectile-motion",
  subject: "physics",
  topic: "kinematics",
  title: "Projectile Motion",
  summary:
    "Projectile motion is 2D motion under gravity alone. The key insight: horizontal and vertical components are independent. Horizontal velocity is constant (no air resistance); vertical motion has constant acceleration g = 9.8 m/s².",
  memoryHook:
    "Split it: 'Horizontal = cruise control (constant v), Vertical = free fall (a = g).' Range is maximised at 45°. Complementary angles (30°/60°) give the same range but different heights and flight times.",
  imatTrap:
    "At the highest point, velocity is NOT zero — only the vertical component is zero; horizontal velocity persists. Also: time up = time down (for same launch/landing height). Do NOT use v = d/t for projectile motion — use the component equations. Air resistance is ALWAYS ignored in IMAT unless stated.",
  whyItMatters:
    "Projectile motion governs ballistics, sports biomechanics (basketball free throws, long jump), water fountains, and fireworks. Understanding independence of components is foundational for all 2D physics, from electric fields to orbital mechanics. In medicine, projectile motion explains blood droplet trajectories in forensic analysis.",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Range, max height, and time of flight calculations",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Component decomposition and velocity at highest point",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Complementary angles producing same range",
    },
  ],
  equations: [
    {
      id: "proj-horizontal",
      latex: "v_x = v_0 \\cos \\theta \\quad (\\text{constant})",
      description: "Horizontal velocity component (constant throughout flight)",
      variables: "v₀ = initial speed (m/s), θ = launch angle",
    },
    {
      id: "proj-vertical",
      latex: "v_y = v_0 \\sin \\theta - gt",
      description: "Vertical velocity component at time t",
      variables: "g = 9.8 m/s², t = time (s)",
    },
    {
      id: "proj-range",
      latex: "R = \\frac{v_0^2 \\sin(2\\theta)}{g}",
      description: "Horizontal range",
      variables: "R = range (m), maximum when θ = 45°",
    },
    {
      id: "proj-max-height",
      latex: "H = \\frac{v_0^2 \\sin^2 \\theta}{2g}",
      description: "Maximum height reached",
      variables: "H = max height (m), occurs when v_y = 0",
    },
    {
      id: "proj-time-of-flight",
      latex: "T = \\frac{2v_0 \\sin \\theta}{g}",
      description: "Total time of flight (same launch/landing height)",
      variables: "T = time of flight (s)",
    },
  ],
  workedExamples: [
    {
      id: "proj-worked-1",
      question:
        "IMAT 2023 Style: A ball is launched at 20 m/s from ground level at an angle of 30° above horizontal. Calculate (a) the horizontal velocity component, (b) the time of flight, and (c) the range. Use g = 10 m/s², sin 30° = 0.5, cos 30° = 0.866.",
      hints: [
        "For (a): v_x = v₀ cos θ — plug in directly.",
        "For (b): T = 2v₀ sin θ / g. Use sin 30° = 0.5.",
        "For (c): R = v₀² sin(2θ) / g. sin(60°) = 0.866.",
      ],
      solution:
        "(a) v_x = 20 × cos 30° = 20 × 0.866 = 17.3 m/s. (b) T = 2 × 20 × 0.5 / 10 = 2 s. (c) R = vₓ × T = 17.3 × 2 = 34.6 m. Alternatively: R = (20² × sin 60°)/10 = 400 × 0.866/10 = 34.6 m.",
      imatYear: 2023,
    },
    {
      id: "proj-worked-2",
      question:
        "A projectile reaches a maximum height of 5 m. If g = 10 m/s², what was its initial vertical velocity component?",
      hints: [
        "At max height, v_y = 0.",
        "Use v_y² = v₀y² - 2gH.",
        "Set v_y = 0 and solve for v₀y.",
      ],
      solution:
        "Using v_y² = v₀y² - 2gH: 0 = v₀y² - 2(10)(5) → v₀y² = 100 → v₀y = 10 m/s.",
    },
  ],
  externalResources: [
    {
      title: "PhET Simulation — Projectile Motion",
      url: "https://phet.colorado.edu/en/simulations/projectile-motion",
      type: "simulation",
      description:
        "Adjust angle, speed, mass, and air resistance to see trajectories",
    },
    {
      title: "Khan Academy — 2D Projectile Motion",
      url: "https://www.khanacademy.org/science/physics/two-dimensional-motion/two-dimensional-projectile-mot/v/visualizing-vectors-in-2-dimensions",
      type: "video",
      description: "Component decomposition and example problems",
    },
    {
      title: "HyperPhysics — Projectile Motion",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/traj.html",
      type: "textbook",
      description: "Detailed reference with interactive formulae",
    },
  ],
  highYieldPoints: [
    "Horizontal: constant v (a = 0); Vertical: constant a = g downward",
    "At max height: v_y = 0, v_x ≠ 0",
    "Max range at 45°",
    "Complementary angles (θ, 90°−θ) give same range",
    "Time up = time down (same launch/landing height)",
    "Trajectory is a parabola",
    "Air resistance always ignored in IMAT",
  ],
  explanation: (
    <div>
      <p>
        <strong>Projectile motion</strong> is the 2D motion of an object under
        the influence of gravity alone. The defining insight — and the most
        important thing to remember for IMAT — is that{" "}
        <strong>horizontal and vertical components are independent</strong>.
        They share only time.
      </p>

      <h3>Component Decomposition</h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">Horizontal</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Constant velocity: <strong>vₓ = v₀ cos θ</strong>
            <br />
            aₓ = 0 (no horizontal forces)
          </p>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
          <h4 className="text-sm font-semibold text-red-600">Vertical</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Constant acceleration: <strong>vᵧ = v₀ sin θ − gt</strong>
            <br />
            aᵧ = −g = −9.8 m/s²
          </p>
        </div>
      </div>

      <EquationBlock
        equation={{
          id: "proj-horizontal",
          latex: "v_x = v_0 \\cos \\theta \\quad (\\text{constant})",
          description: "Horizontal velocity never changes",
        }}
      />

      <EquationBlock
        equation={{
          id: "proj-vertical",
          latex: "v_y = v_0 \\sin \\theta - gt",
          description: "Vertical velocity changes linearly with time",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Interactive Simulation</h3>
      <p className="text-sm text-muted-foreground mb-3">
        Adjust the angle and speed to see how trajectory, range, and height
        change in real time.
      </p>
      <ProjectileMotion />

      <h3>Key Formulas</h3>
      <EquationBlock
        equation={{
          id: "proj-range",
          latex: "R = \\frac{v_0^2 \\sin(2\\theta)}{g}",
          description: "Range: maximum at θ = 45°",
        }}
      />

      <EquationBlock
        equation={{
          id: "proj-max-height",
          latex: "H = \\frac{v_0^2 \\sin^2 \\theta}{2g}",
          description: "Maximum height",
        }}
      />

      <EquationBlock
        equation={{
          id: "proj-time-of-flight",
          latex: "T = \\frac{2v_0 \\sin \\theta}{g}",
          description: "Total time of flight",
        }}
      />

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Step Solver: Range Calculation</h3>
      <StepSolver
        problem="A ball is launched at 30 m/s at 60°. Find the range (g = 10 m/s², sin 120° = 0.866)."
        steps={[
          {
            label: "Calculate sin(2θ)",
            answer: "0.866",
            hint: "2θ = 120°, sin 120° = sin 60° = 0.866",
          },
          {
            label: "Apply range formula",
            answer: "77.94",
            hint: "R = v₀² × sin(2θ)/g = 900 × 0.866/10",
          },
        ]}
        equation="R = \\frac{v_0^2 \\sin(2\\theta)}{g}"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "proj-worked-1",
            question:
              "IMAT 2023 Style: Ball launched at 20 m/s, 30°. Find range (g = 10 m/s²).",
            hints: [
              "Find v_x = v₀ cos θ",
              "Find T = 2v₀ sin θ / g",
              "R = v_x × T, or use the range formula directly.",
            ],
            solution: "v_x = 17.3 m/s. T = 2 s. R = 34.6 m.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Components are INDEPENDENT — only time links them",
          "At max height: v_y = 0, v_x ≠ 0",
          "Max range at 45°",
          "Complementary angles = same range",
          "Time up = time down",
          "Trajectory = parabola",
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
      id: "projectile-q1",
      type: "multiple-choice",
      prompt:
        "At the highest point of a projectile's trajectory, which statement is correct?",
      options: [
        "Both velocity and acceleration are zero",
        "Velocity is zero but acceleration is g downward",
        "Vertical velocity is zero but horizontal velocity is non-zero",
        "Velocity is purely vertical",
      ],
      answer: "Vertical velocity is zero but horizontal velocity is non-zero",
      explanation:
        "At max height, vᵧ = 0 but vₓ = v₀ cos θ remains. Acceleration is g downward throughout the entire flight.",
      difficulty: "apply",
    },
    {
      id: "projectile-q2",
      type: "fill-blank",
      prompt:
        "A ball is launched at 20 m/s at 30° above horizontal. What is its horizontal velocity component? (cos 30° = 0.866)",
      answer: "17.3",
      explanation:
        "vₓ = v₀ cos θ = 20 × cos 30° = 20 × 0.866 = 17.3 m/s. Horizontal velocity is constant.",
      difficulty: "apply",
    },
    {
      id: "projectile-q3",
      type: "multiple-choice",
      prompt:
        "Which launch angle gives the maximum horizontal range (ignoring air resistance)?",
      options: ["30°", "45°", "60°", "90°"],
      answer: "45°",
      explanation:
        "Range = v₀² sin(2θ)/g. Maximum when sin(2θ) = 1, i.e., 2θ = 90°, so θ = 45°.",
      difficulty: "recall",
    },
    {
      id: "projectile-q4",
      type: "multiple-choice",
      prompt:
        "Two projectiles are launched with the same speed at 30° and 60°. Which statements are correct?",
      options: [
        "Same range, different flight times",
        "Different ranges, same flight time",
        "Same range, same flight time",
        "Different ranges, different flight times",
      ],
      answer: "Same range, different flight times",
      explanation:
        "Complementary angles (30° and 60°) give the same range because sin(60°) = sin(120°). But flight time depends on sin θ, so 60° has longer flight time.",
      difficulty: "analyze",
      imatYear: 2022,
    },
    {
      id: "projectile-q5",
      type: "fill-blank",
      prompt:
        "An object is dropped from rest. How far does it fall in 3 seconds? (g = 10 m/s², ignore air resistance)",
      answer: "45",
      explanation:
        "d = ½gt² = ½ × 10 × 9 = 45 m. This is pure vertical free fall (θ = 90°).",
      difficulty: "apply",
    },
    {
      id: "projectile-q6",
      type: "multiple-choice",
      prompt:
        "What shape is the trajectory of a projectile (ignoring air resistance)?",
      options: ["Circle", "Parabola", "Hyperbola", "Ellipse"],
      answer: "Parabola",
      explanation:
        "The combination of constant horizontal velocity and constant vertical acceleration produces a parabolic path: y = x tan θ − gx²/(2v₀² cos²θ).",
      difficulty: "recall",
    },
  ],
  crosslinks: [
    "uniform-motion",
    "newton-laws",
    "forces",
    "quadratic-functions",
  ],
  prerequisites: ["uniform-motion", "newton-laws"],
};
