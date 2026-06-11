import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "uniform-motion",
  subject: "physics",
  topic: "kinematics",
  title: "Uniform Motion and Constant Velocity",
  summary:
    "Uniform motion means constant velocity — no acceleration. The position–time graph is a straight line whose slope equals velocity. This is the simplest kinematic case and the foundation for understanding accelerated motion.",
  memoryHook:
    "'v = d/t' is the only formula you need. If velocity is constant, distance–time graph is a straight line (slope = v), and velocity–time graph is a horizontal line (area under it = distance).",
  imatTrap:
    "Speed ≠ velocity. Speed is scalar (magnitude only); velocity is a vector (magnitude + direction). A car going 60 km/h around a curve has constant speed but changing velocity (because direction changes), so it IS accelerating.",
  whyItMatters:
    "Uniform motion is the basis of GPS calculations, cruise control, and understanding inertial reference frames — which Einstein used to develop special relativity.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Key Equations</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Velocity</strong>: v = Δx / Δt (displacement over time)
        </li>
        <li>
          <strong>Position</strong>: x(t) = x₀ + vt (linear in time)
        </li>
        <li>
          <strong>Acceleration</strong>: a = 0 (by definition of uniform motion)
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Graphical Interpretation</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Position–time graph</strong>: straight line; slope = velocity
        </li>
        <li>
          <strong>Velocity–time graph</strong>: horizontal line at v; area under
          curve = displacement
        </li>
        <li>
          <strong>Acceleration–time graph</strong>: horizontal line at 0
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Relative Velocity</h3>
      <p>
        If two objects move along the same line: v_rel = v₁ − v₂. Same direction
        → subtract; opposite direction → add magnitudes. Example: two cars
        approaching each other at 50 km/h each have relative velocity 100 km/h.
      </p>

      <h3 className="text-lg font-semibold mt-4">Average vs Instantaneous</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Average velocity</strong>: total displacement / total time
        </li>
        <li>
          <strong>Instantaneous velocity</strong>: velocity at a specific moment
          (derivative of position)
        </li>
        <li>For uniform motion, average = instantaneous at all times</li>
      </ul>
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
  ],
  crosslinks: ["projectile-motion", "newton-laws", "si-units"],
};

export default note;
