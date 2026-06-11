import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "forces",
  subject: "physics",
  topic: "dynamics",
  title: "Types of Forces",
  summary:
    "The main forces in classical mechanics: gravity (W = mg), normal force (perpendicular to surface), friction (f = μN, opposes motion), tension (along ropes/strings), and spring force (F = −kx, Hooke's law).",
  memoryHook:
    "'Gravity pulls down (W=mg), Normal pushes up (perpendicular), Friction fights motion (f=μN), Tension pulls along the rope, Springs resist deformation (F=−kx).' For friction: 'static ≥ kinetic' — it's harder to start moving than to keep moving.",
  imatTrap:
    "Normal force ≠ weight in general. On an incline: N = mg cos θ (not mg). Friction opposes the direction of motion (or impending motion), not necessarily the applied force. Static friction is variable (0 ≤ fₛ ≤ μₛN); kinetic friction is constant (fₖ = μₖN).",
  whyItMatters:
    "Understanding forces is essential for biomechanics (joint forces, muscle tension), engineering (structural loads), and medicine (blood flow resistance is analogous to friction). IMAT loves inclined-plane problems.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">
        Gravitational Force (Weight)
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>W = mg (g ≈ 9.8 m/s² on Earth's surface)</li>
        <li>Always acts vertically downward toward Earth's centre</li>
        <li>Mass (kg) ≠ Weight (N): mass is intrinsic; weight depends on g</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Normal Force</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Perpendicular to the contact surface</li>
        <li>On flat surface: N = mg (if no other vertical forces)</li>
        <li>On incline (angle θ): N = mg cos θ</li>
        <li>It is a reactive force — adjusts to prevent penetration</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Friction</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Static</strong>: fₛ ≤ μₛN (prevents motion starts; variable up
          to max)
        </li>
        <li>
          <strong>Kinetic</strong>: fₖ = μₖN (during motion; constant)
        </li>
        <li>μₛ &gt; μₖ always (harder to start than to maintain)</li>
        <li>Direction: opposes relative motion (or impending motion)</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Tension</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Force transmitted through a string, rope, or cable</li>
        <li>Pulls (never pushes) along the direction of the rope</li>
        <li>
          Ideal rope: massless, inextensible → tension is uniform throughout
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Spring Force (Hooke's Law)</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>F = −kx (restoring force proportional to displacement)</li>
        <li>k = spring constant (N/m); x = displacement from equilibrium</li>
        <li>Negative sign: force opposes displacement</li>
      </ul>
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
      explanation:
        "N = mg cos θ = 10 × 9.8 × cos 30° = 98 × 0.866 = 84.9 N. Normal force on an incline is mg cos θ, not mg.",
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
        "μₛ > μₖ for the same surfaces, so maximum static friction (μₛN) is always greater than kinetic friction (μₖN). This is why it takes more force to start moving an object than to keep it moving.",
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
  ],
  crosslinks: [
    "newton-laws",
    "projectile-motion",
    "archimedes",
    "coulombs-law",
  ],
};

export default note;
