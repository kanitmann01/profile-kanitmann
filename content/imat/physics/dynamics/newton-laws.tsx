"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "newton-qf-1",
    question:
      "A 5 kg object has a net force of 20 N. What is its acceleration?",
    answer: "4",
    hint: "F = ma",
    context: "Newton's 2nd law",
  },
  {
    id: "newton-qf-2",
    question:
      "Do action-reaction pairs act on the same object or different objects?",
    answer: "different",
    hint: "They would cancel if on the same object",
    context: "Newton's 3rd law",
  },
  {
    id: "newton-qf-3",
    question: "What is needed for an object to have constant velocity?",
    answer: "zero net force",
    hint: "Think about Newton's 1st law",
    context: "Equilibrium condition",
  },
];

export const newtonLawsNote: AtomicNote = {
  slug: "newton-laws",
  subject: "physics",
  topic: "dynamics",
  title: "Newton's Three Laws of Motion",
  summary:
    "Newton's laws connect force to motion: (1) objects maintain their state of motion unless acted upon (inertia), (2) F = ma, and (3) every action has an equal and opposite reaction. These three laws explain virtually all classical mechanics.",
  memoryHook:
    "1st Law: 'Lazy objects stay lazy; moving objects keep moving' (inertia). 2nd Law: 'F = ma — Force equals mass times acceleration.' 3rd Law: 'You push me, I push you back — equally' (action–reaction pairs act on DIFFERENT objects).",
  imatTrap:
    "3rd law pairs always act on DIFFERENT objects. The normal force on a book from a table and gravity on the book are NOT a 3rd-law pair (they act on the same object). The 3rd-law pair of Earth pulling the book down is the book pulling Earth up. Constant velocity does NOT mean no forces act — it means forces are balanced (ΣF = 0).",
  whyItMatters:
    "Newton's laws underpin all engineering — from bridge design to rocket propulsion. The 2nd law (F = ma) is the single most important equation in classical mechanics and appears in every IMAT physics section. In medicine, Newton's laws govern how forces affect the body: whiplash (1st law), bone fractures (2nd law), and walking (3rd law).",
  imatPatterns: [
    {
      years: [2021, 2022, 2023, 2024],
      frequency: "high",
      notes: "F = ma calculations and equilibrium problems",
    },
    {
      years: [2020, 2023],
      frequency: "medium",
      notes: "Identifying correct 3rd law pairs",
    },
    {
      years: [2022, 2024],
      frequency: "medium",
      notes: "Free-body diagram interpretation",
    },
  ],
  equations: [
    {
      id: "newton-second",
      latex: "\\sum \\vec{F} = m\\vec{a}",
      description: "Newton's 2nd Law: net force = mass × acceleration",
      variables:
        "ΣF = vector sum of all forces (N), m = mass (kg), a = acceleration (m/s²)",
    },
    {
      id: "newton-equilibrium",
      latex: "\\sum \\vec{F} = 0 \\iff \\vec{a} = 0",
      description:
        "Equilibrium condition: zero net force → constant velocity or rest",
    },
    {
      id: "newton-weight",
      latex: "F_g = mg",
      description: "Gravitational force (a special case of F = ma)",
      variables: "g = 9.8 m/s² on Earth",
    },
  ],
  workedExamples: [
    {
      id: "newton-worked-1",
      question:
        "IMAT 2022 Style: A 1,200 kg car accelerates from rest to 20 m/s in 10 s. What net force acts on the car? Ignore friction.",
      hints: [
        "First find the acceleration using kinematic equations.",
        "a = Δv / Δt.",
        "Then apply F = ma.",
      ],
      solution:
        "a = (20 − 0) / 10 = 2 m/s². F = ma = 1,200 × 2 = 2,400 N. This is the net force required to produce that acceleration.",
      imatYear: 2022,
    },
    {
      id: "newton-worked-2",
      question:
        "A person pushes a 50 kg crate across a floor with a force of 200 N. The frictional force opposing motion is 80 N. What is the crate's acceleration?",
      hints: [
        "Find the net force (applied − friction).",
        "The net force is in the direction of motion.",
        "Use F_net = ma.",
      ],
      solution:
        "F_net = 200 − 80 = 120 N. a = F_net / m = 120 / 50 = 2.4 m/s².",
    },
  ],
  externalResources: [
    {
      title: "PhET Simulation — Forces and Motion",
      url: "https://phet.colorado.edu/en/simulations/forces-and-motion-basics",
      type: "simulation",
      description: "Apply forces and see Newton's laws in action",
    },
    {
      title: "Khan Academy — Newton's Laws Overview",
      url: "https://www.khanacademy.org/science/physics/forces-newtons-laws",
      type: "video",
      description: "Comprehensive video series on all three laws",
    },
    {
      title: "HyperPhysics — Newton's Laws",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/Newt.html",
      type: "textbook",
      description: "Detailed mechanics reference with interactive examples",
    },
  ],
  highYieldPoints: [
    "1st Law (Inertia): object resists change in motion; mass = measure of inertia",
    "2nd Law: ΣF = ma (the master equation of mechanics)",
    "3rd Law: action-reaction pairs act on DIFFERENT objects",
    "Constant velocity ⇔ equilibrium ⇔ ΣF = 0",
    "1 N = 1 kg·m/s²",
    "Free-body diagrams: isolate object, draw ALL forces, apply ΣF = ma",
    "Weight and normal force are NOT a 3rd-law pair",
  ],
  explanation: (
    <div>
      <p>
        <strong>Newton's three laws</strong> form the foundation of classical
        mechanics. They connect the forces acting on an object to its motion.
        Understanding these laws — and their common misconceptions — is the most
        important thing you can do for the IMAT physics section.
      </p>

      <h3>First Law — The Law of Inertia</h3>
      <p className="mb-3">
        An object at rest stays at rest, and an object in motion stays in
        uniform motion (constant velocity),{" "}
        <strong>unless acted upon by a net external force</strong>.
      </p>
      <div className="rounded-lg border bg-card p-3 mb-4">
        <p className="text-sm">
          <strong>Inertia</strong> is the resistance to change in motion.
          <strong>Mass</strong> is the quantitative measure of inertia. A truck
          has more inertia than a bicycle.
        </p>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Second Law — F = ma</h3>
      <p className="mb-3">
        The <strong>net force</strong> acting on an object equals its mass times
        its acceleration. This is the single most important equation in
        classical mechanics.
      </p>
      <EquationBlock
        equation={{
          id: "newton-second",
          latex: "\\sum \\vec{F} = m\\vec{a}",
          description: "Net force determines acceleration, not velocity!",
        }}
      />
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li>
          Acceleration is in the <strong>direction</strong> of the net force
        </li>
        <li>If ΣF = 0 → a = 0 → equilibrium (rest or constant velocity)</li>
        <li>Units: 1 N = 1 kg·m/s²</li>
      </ul>

      <EquationBlock
        equation={{
          id: "newton-equilibrium",
          latex: "\\sum \\vec{F} = 0 \\iff \\vec{a} = 0",
          description: "Equilibrium: balanced forces → no acceleration",
        }}
      />

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Third Law — Action–Reaction</h3>
      <p className="mb-3">
        If object A exerts a force on object B, then object B exerts an{" "}
        <strong>equal and opposite</strong> force on object A.
      </p>
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 mb-4">
        <h4 className="text-sm font-semibold text-amber-600">
          ⚠ Critical — Three Key Points
        </h4>
        <ol className="text-sm text-muted-foreground list-decimal pl-4 space-y-1 mt-1">
          <li>
            Forces act on <strong>different objects</strong> — they never cancel
          </li>
          <li>
            They are the <strong>same type</strong> of force (both
            gravitational, both contact, etc.)
          </li>
          <li>
            They are <strong>equal in magnitude</strong> and{" "}
            <strong>opposite in direction</strong>
          </li>
        </ol>
      </div>

      <h3>Free-Body Diagrams</h3>
      <p className="mb-3">
        The systematic approach to solve any mechanics problem:
      </p>
      <ol className="list-decimal pl-6 space-y-1 mb-4">
        <li>
          <strong>Isolate</strong> the object of interest
        </li>
        <li>
          Draw <strong>ALL forces</strong> acting ON it (gravity, normal,
          friction, tension, applied)
        </li>
        <li>
          Choose convenient <strong>coordinate axes</strong> (align with
          acceleration direction)
        </li>
        <li>
          Apply <strong>ΣF = ma</strong> along each axis
        </li>
      </ol>

      <h3>Step Solver: Applying F = ma</h3>
      <StepSolver
        problem="A 2 kg block is pulled across a frictionless surface by a 10 N force at 60° above horizontal. Find acceleration."
        steps={[
          {
            label: "Resolve horizontal component",
            answer: "5",
            hint: "F_x = F cos θ = 10 × 0.5 = 5 N",
          },
          {
            label: "Apply F = ma",
            answer: "2.5",
            hint: "a = F_x / m = 5 / 2 = 2.5 m/s²",
          },
        ]}
        equation="F = ma"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "newton-worked-1",
            question:
              "IMAT 2022 Style: 1,200 kg car accelerates 0→20 m/s in 10 s. Net force?",
            hints: ["Find a = Δv/Δt", "Then F = ma"],
            solution: "a = 2 m/s². F = 1,200 × 2 = 2,400 N.",
            imatYear: 2022,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "1st Law: Inertia — object resists change",
          "2nd Law: ΣF = ma — force causes acceleration",
          "3rd Law: Equal/opposite — on DIFFERENT objects",
          "Constant v ⇔ ΣF = 0 (equilibrium)",
          "1 N = 1 kg·m/s²",
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

      <QuickFire questions={recallQuestions.slice(2, 3)} title="Final Check" />
    </div>
  ),
  questions: [
    {
      id: "newton-q1",
      type: "multiple-choice",
      prompt:
        "A book rests on a table. The gravitational force on the book and the normal force from the table are equal and opposite. Are these a Newton's 3rd-law pair?",
      options: [
        "Yes, because they are equal and opposite",
        "No, because they act on the same object",
        "No, because gravity is stronger than the normal force",
        "Yes, because the book is in equilibrium",
      ],
      answer: "No, because they act on the same object",
      explanation:
        "Newton's 3rd-law pairs must act on different objects. Weight (Earth pulls book) and normal force (table pushes book) both act on the book — they are NOT a 3rd-law pair.",
      difficulty: "analyze",
    },
    {
      id: "newton-q2",
      type: "fill-blank",
      prompt:
        "A 5 kg object has a net force of 20 N acting on it. What is its acceleration in m/s²?",
      answer: "4",
      explanation: "F = ma → a = F/m = 20/5 = 4 m/s².",
      difficulty: "apply",
    },
    {
      id: "newton-q3",
      type: "multiple-choice",
      prompt:
        "An object moves at constant velocity. Which statement must be true?",
      options: [
        "No forces act on it",
        "The net force is zero",
        "Only one force acts on it",
        "The net force is in the direction of motion",
      ],
      answer: "The net force is zero",
      explanation:
        "Constant velocity means a = 0, so by Newton's 2nd law, ΣF = ma = 0.",
      difficulty: "apply",
    },
    {
      id: "newton-q4",
      type: "multiple-choice",
      prompt:
        "A rocket in deep space fires its engines. According to Newton's 3rd law, what propels the rocket forward?",
      options: [
        "The rocket pushes on the exhaust gases",
        "The exhaust gases push on the rocket",
        "The rocket pushes on space itself",
        "Gravity pulls the rocket forward",
      ],
      answer: "The exhaust gases push on the rocket",
      explanation:
        "The rocket pushes exhaust gases backward (action). The exhaust gases push the rocket forward with equal force (reaction). This works even in vacuum — no air needed!",
      difficulty: "analyze",
      imatYear: 2021,
    },
    {
      id: "newton-q5",
      type: "fill-blank",
      prompt:
        "What net force in N is needed to accelerate a 3 kg mass at 7 m/s²?",
      answer: "21",
      explanation: "F = ma = 3 × 7 = 21 N.",
      difficulty: "apply",
    },
    {
      id: "newton-q6",
      type: "multiple-choice",
      prompt: "If the net force on an object is doubled, the acceleration:",
      options: ["Is halved", "Is doubled", "Is quadrupled", "Stays the same"],
      answer: "Is doubled",
      explanation:
        "From F = ma, a = F/m. If F doubles and m is constant, a also doubles.",
      difficulty: "apply",
    },
  ],
  crosslinks: [
    "forces",
    "uniform-motion",
    "projectile-motion",
    "pressure",
    "ohms-law",
  ],
  prerequisites: ["forces", "uniform-motion"],
};
