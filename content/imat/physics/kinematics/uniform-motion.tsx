"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "uniform-qf-1",
    question: "What does a horizontal line on a velocity-time graph mean?",
    answer: "constant velocity",
    hint: "Think about what slope represents",
    context: "No acceleration",
  },
  {
    id: "uniform-qf-2",
    question:
      "If two cars approach each other at 60 km/h and 40 km/h, what is their relative speed?",
    answer: "100",
    hint: "Opposite directions → add the speeds",
    context: "Relative velocity in opposite directions",
  },
  {
    id: "uniform-qf-3",
    question: "What is 72 km/h in m/s?",
    answer: "20",
    hint: "Divide by 3.6",
    context: "Common speed conversion",
  },
];

export const uniformMotionNote: AtomicNote = {
  slug: "uniform-motion",
  subject: "physics",
  topic: "kinematics",
  title: "Uniform Motion and Constant Velocity",
  summary:
    "Uniform motion means constant velocity — no acceleration. The position–time graph is a straight line whose slope equals velocity. This is the simplest kinematic case and the foundation for understanding accelerated motion.",
  memoryHook:
    "'v = d/t' is the only formula you need. If velocity is constant, distance–time graph is a straight line (slope = v), and velocity–time graph is a horizontal line (area under it = distance).",
  imatTrap:
    "Speed ≠ velocity. Speed is scalar (magnitude only); velocity is a vector (magnitude + direction). A car going 60 km/h around a curve has constant speed but changing velocity (because direction changes), so it IS accelerating. Another classic: the area under a v-t graph gives displacement, NOT distance — if velocity goes negative, the area subtracts.",
  whyItMatters:
    "Uniform motion is the basis of GPS calculations (satellites moving at constant velocity), cruise control systems, and understanding inertial reference frames — which Einstein used to develop special relativity. Every IMAT kinematics problem builds on this foundation.",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Interpretation of position-time and velocity-time graphs",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Relative velocity calculations",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Area under v-t graph for displacement",
    },
  ],
  equations: [
    {
      id: "uniform-velocity",
      latex: "v = \\frac{\\Delta x}{\\Delta t} = \\frac{x_f - x_i}{t_f - t_i}",
      description: "Average velocity = displacement ÷ time interval",
      variables: "Δx = displacement (m), Δt = time interval (s)",
    },
    {
      id: "uniform-position",
      latex: "x(t) = x_0 + vt",
      description: "Position as a function of time (constant velocity)",
      variables: "x₀ = initial position (m), v = velocity (m/s), t = time (s)",
    },
    {
      id: "uniform-relative",
      latex: "v_{AB} = v_A - v_B",
      description: "Relative velocity of A with respect to B",
      variables: "v_A, v_B = velocities of A and B in the same reference frame",
    },
    {
      id: "uniform-no-accel",
      latex: "a = 0 \\implies \\Delta v = 0",
      description: "By definition of uniform motion, acceleration is zero",
    },
  ],
  workedExamples: [
    {
      id: "uniform-worked-1",
      question:
        "IMAT 2022 Style: A train travels at constant speed of 30 m/s for 2 minutes. Then it travels at 20 m/s for the next 3 minutes. What is the total distance travelled?",
      hints: [
        "How many seconds are in 2 minutes? In 3 minutes?",
        "Use d = v × t for each segment separately.",
        "Add the two distances together.",
      ],
      solution:
        "Segment 1: t₁ = 2 × 60 = 120 s, d₁ = 30 × 120 = 3600 m. Segment 2: t₂ = 3 × 60 = 180 s, d₂ = 20 × 180 = 3600 m. Total = 3600 + 3600 = 7200 m = 7.2 km.",
      imatYear: 2022,
    },
    {
      id: "uniform-worked-2",
      question:
        "Two cars start from the same point. Car A travels east at 25 m/s. Car B travels west at 15 m/s. What is the distance between them after 10 seconds?",
      hints: [
        "Find how far each car travels using d = v × t.",
        "Since they go in opposite directions, add their distances.",
        "The relative speed is 25 + 15 = 40 m/s.",
      ],
      solution:
        "Car A distance: d_A = 25 × 10 = 250 m east. Car B distance: d_B = 15 × 10 = 150 m west. Total separation = 250 + 150 = 400 m. Alternatively, relative velocity = 25 + 15 = 40 m/s → distance = 40 × 10 = 400 m.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Introduction to Physics",
      url: "https://www.khanacademy.org/science/physics/one-dimensional-motion/displacement-velocity-time/v/position-vs-time-graphs",
      type: "video",
      description: "Position-time graphs and velocity concepts",
    },
    {
      title: "PhET Simulation — Moving Man",
      url: "https://phet.colorado.edu/en/simulations/moving-man",
      type: "simulation",
      description: "Interactive position/velocity/acceleration graphs",
    },
    {
      title: "IMAT Buddy — Kinematics Questions",
      url: "https://www.imatbuddy.com/imat-science-question-banks/",
      type: "practice",
      description: "IMAT-style kinematics practice problems",
    },
  ],
  highYieldPoints: [
    "Uniform motion → constant velocity → a = 0",
    "Slope of x-t graph = velocity",
    "Area under v-t graph = displacement",
    "Relative velocity: same direction subtract, opposite add",
    "Speed (scalar) ≠ velocity (vector)",
    "km/h to m/s: ÷ 3.6",
    "Average vs instantaneous: equal only in uniform motion",
  ],
  explanation: (
    <div>
      <p>
        <strong>Uniform motion</strong> is the simplest type of motion — an
        object moving at <strong>constant velocity</strong> (constant speed in a
        straight line). There is <strong>no acceleration</strong>. This is the
        starting point for all kinematics in classical mechanics.
      </p>

      <h3>The Key Equation</h3>
      <EquationBlock
        equation={{
          id: "uniform-velocity",
          latex: "v = \\frac{\\Delta x}{\\Delta t}",
          description: "Velocity = displacement ÷ time",
          variables: "Δx = displacement (m), Δt = time (s)",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Graphical Interpretation</h3>
      <div className="grid gap-3 mb-4">
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">
            Position–Time (x-t) Graph
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Straight line. <strong>Slope = velocity.</strong> Steeper slope →
            faster. If the line is horizontal, the object is at rest.
          </p>
        </div>
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold text-green-600">
            Velocity–Time (v-t) Graph
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Horizontal line at v.{" "}
            <strong>Area under the line = displacement.</strong>
            For uniform motion, area = v × Δt.
          </p>
        </div>
      </div>

      <EquationBlock
        equation={{
          id: "uniform-position",
          latex: "x(t) = x_0 + vt",
          description: "Position at any time t (starting from x₀)",
          variables: "x₀ = initial position, v = constant velocity",
        }}
      />

      <h3>Relative Velocity</h3>
      <p>
        When two objects move along the same line, their{" "}
        <strong>relative velocity</strong>
        is the rate at which the distance between them changes:
      </p>
      <EquationBlock
        equation={{
          id: "uniform-relative",
          latex: "v_{AB} = v_A - v_B",
          description: "Velocity of A relative to B",
        }}
      />
      <div className="rounded-lg border bg-card p-3 mb-4">
        <p className="text-sm">
          <strong>Same direction</strong>: subtract v_B from v_A
        </p>
        <p className="text-sm">
          <strong>Opposite direction</strong>: effectively add the magnitudes
        </p>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Average vs Instantaneous Velocity</h3>
      <ul className="list-disc pl-6 space-y-1 mb-3">
        <li>
          <strong>Average velocity</strong> = total displacement / total time
        </li>
        <li>
          <strong>Instantaneous velocity</strong> = velocity at a single moment
          (derivative of position)
        </li>
        <li>
          For uniform motion: <strong>average = instantaneous</strong> at all
          times
        </li>
      </ul>

      <h3>Step Solver: Relative Velocity</h3>
      <StepSolver
        problem="A car travels east at 20 m/s. A truck travels west at 15 m/s. How far apart are they after 30 seconds?"
        steps={[
          {
            label: "Find relative speed",
            answer: "35",
            hint: "Opposite directions → add speeds: 20 + 15",
          },
          {
            label: "Apply distance formula",
            answer: "1050",
            hint: "d = v_rel × t = 35 × 30",
          },
        ]}
        equation="d = v_{rel} \\times t"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "uniform-worked-1",
            question:
              "IMAT 2022 Style: A train travels at 30 m/s for 2 min, then 20 m/s for 3 min. Total distance?",
            hints: [
              "Convert minutes to seconds.",
              "Use d = v × t for each segment.",
              "Add the distances.",
            ],
            solution:
              "d₁ = 30 × 120 = 3600 m. d₂ = 20 × 180 = 3600 m. Total = 7200 m = 7.2 km.",
            imatYear: 2022,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Constant velocity → a = 0",
          "x-t slope = velocity",
          "Area under v-t = displacement",
          "Relative: same ← subtract, opposite ← add",
          "Speed (scalar) ≠ velocity (vector)",
          "Average = instantaneous only in uniform motion",
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
      id: "uniform-q1",
      type: "fill-blank",
      prompt:
        "A car travels at a constant speed of 72 km/h. How far does it travel in 15 seconds? (Give answer in metres, no units.)",
      answer: "300",
      explanation: "72 km/h = 20 m/s. Distance = v × t = 20 × 15 = 300 m.",
      difficulty: "apply",
    },
    {
      id: "uniform-q2",
      type: "multiple-choice",
      prompt: "Which of the following describes an object in uniform motion?",
      options: [
        "A car going 40 km/h around a circular track",
        "A ball falling freely from rest",
        "A train moving at 80 km/h on a straight track",
        "A pendulum at its maximum displacement",
      ],
      answer: "A train moving at 80 km/h on a straight track",
      explanation:
        "Uniform motion requires constant velocity (constant speed AND direction). A circular track changes direction, a falling ball accelerates, and a pendulum changes speed.",
      difficulty: "apply",
    },
    {
      id: "uniform-q3",
      type: "multiple-choice",
      prompt:
        "Two trains approach each other on parallel tracks at 60 km/h and 90 km/h. What is their relative velocity?",
      options: ["30 km/h", "60 km/h", "90 km/h", "150 km/h"],
      answer: "150 km/h",
      explanation:
        "When objects move in opposite directions, relative velocity = sum of speeds = 60 + 90 = 150 km/h.",
      difficulty: "apply",
    },
    {
      id: "uniform-q4",
      type: "true-false",
      prompt:
        "True or False: An object moving at constant speed always has zero acceleration.",
      answer: "False",
      explanation:
        "Constant speed does not guarantee constant velocity. If direction changes (e.g., circular motion), there is centripetal acceleration even though speed is constant.",
      difficulty: "analyze",
      imatYear: 2023,
    },
    {
      id: "uniform-q5",
      type: "multiple-choice",
      prompt:
        "The slope of a position-time graph for uniform motion represents:",
      options: ["Acceleration", "Velocity", "Displacement", "Time"],
      answer: "Velocity",
      explanation:
        "On a position-time graph, slope = Δx/Δt = velocity. For uniform motion, this slope is constant.",
      difficulty: "recall",
    },
    {
      id: "uniform-q6",
      type: "fill-blank",
      prompt:
        "A runner completes a 400 m lap in 50 s. What is their average speed in m/s?",
      answer: "8",
      explanation:
        "Average speed = distance / time = 400 / 50 = 8 m/s. Note: if they return to start, displacement = 0, so average velocity = 0.",
      difficulty: "apply",
    },
  ],
  crosslinks: [
    "projectile-motion",
    "newton-laws",
    "si-units",
    "linear-functions",
  ],
  prerequisites: ["si-units"],
};
