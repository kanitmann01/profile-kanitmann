import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "coulombs-law",
  subject: "physics",
  topic: "electrostatics-electrodynamics",
  title: "Coulomb's Law and Electric Fields",
  summary:
    "Coulomb's law describes the electrostatic force between two point charges: F = kq₁q₂/r². Like charges repel, opposite charges attract. The electric field E = F/q describes the force per unit charge at any point in space.",
  memoryHook:
    "'Coulomb looks like Newton's gravity but with charges: F = kq₁q₂/r².' k = 9 × 10⁹ N·m²/C². 'Like repels, opposites attract' — opposite to gravity which only attracts. Electric field lines go FROM positive TO negative.",
  imatTrap:
    "The force is proportional to 1/r², not 1/r. Doubling the distance quarters the force (not halves it). Also: the force on each charge is EQUAL in magnitude (Newton's 3rd law), even if one charge is much larger. Don't confuse charge (C) with electric field (N/C or V/m).",
  whyItMatters:
    "Electrostatic forces hold atoms and molecules together (ionic bonds), drive nerve impulses (ion movement across membranes), and are fundamental to DNA structure (phosphate backbone charges). Defibrillators use electric fields to reset heart rhythm.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Coulomb's Law</h3>
      <p className="font-mono text-center py-1">F = k|q₁||q₂| / r²</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>k = 8.99 × 10⁹ N·m²/C² (Coulomb's constant)</li>
        <li>q₁, q₂ = charges in Coulombs (C)</li>
        <li>r = distance between charges in metres</li>
        <li>
          Force is attractive for opposite charges, repulsive for like charges
        </li>
        <li>Inverse-square law: double r → force drops to ¼</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Electric Field</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>E = F / q</strong> = force per unit positive test charge (N/C
          or V/m)
        </li>
        <li>Field due to point charge: E = kQ / r²</li>
        <li>Direction: away from positive charges, toward negative charges</li>
        <li>
          Field lines never cross; density of lines indicates field strength
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">
        Key Comparisons with Gravity
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Both are inverse-square laws</li>
        <li>Gravity: always attractive; electric: attractive or repulsive</li>
        <li>
          Electric force is ~10³⁶ times stronger than gravity for two protons
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "coulomb-q1",
      type: "multiple-choice",
      prompt:
        "Two point charges are separated by distance r. If the distance is doubled, the electrostatic force between them:",
      options: ["Is halved", "Is quartered", "Is doubled", "Remains the same"],
      answer: "Is quartered",
      explanation:
        "Coulomb's law is an inverse-square law: F ∝ 1/r². Doubling r → F becomes F/(2²) = F/4.",
      difficulty: "apply",
    },
    {
      id: "coulomb-q2",
      type: "multiple-choice",
      prompt: "In which direction do electric field lines point?",
      options: [
        "From negative to positive charges",
        "From positive to negative charges",
        "Parallel to the force on a negative charge",
        "In circles around the charges",
      ],
      answer: "From positive to negative charges",
      explanation:
        "By convention, electric field lines point in the direction of force on a positive test charge — away from positive charges and toward negative charges.",
      difficulty: "recall",
    },
    {
      id: "coulomb-q3",
      type: "fill-blank",
      prompt:
        "Two charges of +2 C and −3 C are 1 m apart. What is the magnitude of the force between them? (k = 9 × 10⁹ N·m²/C², give answer in scientific notation as '54e9')",
      answer: "54e9",
      explanation:
        "F = k|q₁||q₂|/r² = 9×10⁹ × 2 × 3 / 1² = 54 × 10⁹ = 5.4 × 10¹⁰ N.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["ohms-law", "forces", "si-units"],
};

export default note;
