import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "newton-laws",
  subject: "physics",
  topic: "dynamics",
  title: "Newton's Three Laws of Motion",
  summary:
    "Newton's laws connect force to motion: (1) objects maintain their state of motion unless acted upon (inertia), (2) F = ma, and (3) every action has an equal and opposite reaction. These three laws explain virtually all classical mechanics.",
  memoryHook:
    "1st Law: 'Lazy objects stay lazy; moving objects keep moving' (inertia). 2nd Law: 'F = ma — Force equals mass times acceleration.' 3rd Law: 'You push me, I push you back — equally' (action–reaction pairs act on DIFFERENT objects).",
  imatTrap:
    "3rd law pairs always act on DIFFERENT objects. The normal force on a book from a table and gravity on the book are NOT a 3rd-law pair (they act on the same object). The 3rd-law pair of Earth pulling the book down is the book pulling Earth up.",
  whyItMatters:
    "Newton's laws underpin all engineering — from bridge design to rocket propulsion. The 2nd law (F = ma) is the single most important equation in classical mechanics and appears in every IMAT physics section.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">First Law (Inertia)</h3>
      <p>
        An object at rest stays at rest, and an object in motion stays in
        uniform motion, unless acted upon by a net external force. This defines{" "}
        <strong>inertia</strong> — resistance to change in motion. Mass is the
        quantitative measure of inertia.
      </p>

      <h3 className="text-lg font-semibold mt-4">Second Law (F = ma)</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Net force = mass × acceleration: <strong>ΣF = ma</strong>
        </li>
        <li>Acceleration is in the direction of the net force</li>
        <li>
          If ΣF = 0 → a = 0 → object is in equilibrium (at rest or constant
          velocity)
        </li>
        <li>Units: 1 N = 1 kg·m/s²</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">
        Third Law (Action–Reaction)
      </h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          If A exerts force on B, B exerts an equal and opposite force on A
        </li>
        <li>
          <strong>Key</strong>: the two forces act on DIFFERENT objects
        </li>
        <li>
          They are the same type of force (both gravitational, both contact,
          etc.)
        </li>
        <li>They do NOT cancel because they act on different bodies</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Free-Body Diagrams</h3>
      <p>
        To solve any mechanics problem: (1) isolate the object, (2) draw ALL
        forces acting ON it (gravity, normal, friction, tension, applied), (3)
        choose axes, (4) apply ΣF = ma along each axis.
      </p>
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
        "Newton's 3rd-law pairs must act on different objects. Weight (Earth pulls book) and normal force (table pushes book) both act on the book — they are NOT a 3rd-law pair. The 3rd-law pair of Earth's pull on the book is the book's pull on Earth.",
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
        "Constant velocity means a = 0, so by Newton's 2nd law, ΣF = ma = 0. Forces may act on the object, but they must sum to zero (equilibrium).",
      difficulty: "apply",
    },
  ],
  crosslinks: ["forces", "uniform-motion", "projectile-motion", "pressure"],
};

export default note;
