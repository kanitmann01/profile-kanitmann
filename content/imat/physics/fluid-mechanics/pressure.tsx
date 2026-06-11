import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "pressure",
  subject: "physics",
  topic: "fluid-mechanics",
  title: "Pressure and Pascal's Principle",
  summary:
    "Pressure is force per unit area (P = F/A). In fluids, pressure increases with depth (P = ρgh). Pascal's principle states that pressure applied to an enclosed fluid is transmitted undiminished — the basis of hydraulic systems.",
  memoryHook:
    "'Pressure = Force / Area.' Think of a bed of nails: many nails spread the force → low pressure per nail → no puncture. One nail = same force, tiny area → huge pressure → puncture. In fluids: 'Deeper = heavier column above = more pressure.'",
  imatTrap:
    "Pressure depends on DEPTH, not shape of container. A narrow tube and a wide lake at the same depth have the same pressure. Also: atmospheric pressure (101,325 Pa ≈ 1 atm) acts on everything — gauge pressure = absolute − atmospheric.",
  whyItMatters:
    "Blood pressure (120/80 mmHg) is a direct application of fluid pressure. Hydraulic brakes, syringes, and IV drips all use Pascal's principle. Understanding pressure is essential for respiratory physiology (pressure gradients drive breathing).",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Definition</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>P = F / A</strong> (Pa = N/m²)
        </li>
        <li>Pressure is scalar — it acts in all directions at a point</li>
        <li>1 atm = 101,325 Pa = 760 mmHg = 1013.25 hPa</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Pressure in Fluids</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Hydrostatic pressure</strong>: P = ρgh (ρ = density, g = 9.8,
          h = depth)
        </li>
        <li>Total pressure at depth h: P = P₀ + ρgh (P₀ = surface pressure)</li>
        <li>Pressure depends only on depth and density, not container shape</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Pascal's Principle</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Pressure applied to an enclosed fluid is transmitted equally to every
          point in the fluid
        </li>
        <li>
          <strong>Hydraulic press</strong>: F₁/A₁ = F₂/A₂ → small force on small
          area creates large force on large area
        </li>
        <li>Mechanical advantage = A₂/A₁</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Gauge vs Absolute Pressure</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Absolute</strong> = atmospheric + gauge
        </li>
        <li>
          <strong>Gauge</strong> = absolute − atmospheric (what a tyre gauge
          reads)
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "pressure-q1",
      type: "fill-blank",
      prompt:
        "A force of 500 N is applied uniformly over an area of 2.5 m². What is the pressure in Pa?",
      answer: "200",
      explanation: "P = F/A = 500/2.5 = 200 Pa.",
      difficulty: "apply",
    },
    {
      id: "pressure-q2",
      type: "multiple-choice",
      prompt:
        "In a hydraulic system, a 10 N force is applied to a piston with area 0.01 m². What force is exerted by a second piston with area 0.5 m²?",
      options: ["50 N", "200 N", "500 N", "5000 N"],
      answer: "500 N",
      explanation:
        "By Pascal's principle: F₁/A₁ = F₂/A₂ → F₂ = F₁ × A₂/A₁ = 10 × 0.5/0.01 = 500 N.",
      difficulty: "apply",
    },
    {
      id: "pressure-q3",
      type: "multiple-choice",
      prompt:
        "Which factor does NOT affect the pressure at a point in a static fluid?",
      options: [
        "Depth below the surface",
        "Density of the fluid",
        "Shape of the container",
        "Acceleration due to gravity",
      ],
      answer: "Shape of the container",
      explanation:
        "P = ρgh depends only on density (ρ), gravity (g), and depth (h). The shape of the container is irrelevant — this is the 'hydrostatic paradox.'",
      difficulty: "recall",
    },
  ],
  crosslinks: ["archimedes", "newton-laws", "gas-laws", "si-units"],
};

export default note;
