"use client";

import type { AtomicNote } from "@/data/imat/types";
import { CircuitSimulator } from "@/components/imat/interactive/circuit-simulator";

const note: AtomicNote = {
  slug: "ohms-law",
  subject: "physics",
  topic: "electrostatics-electrodynamics",
  title: "Ohm's Law and Electric Circuits",
  summary:
    "Ohm's law (V = IR) relates voltage, current, and resistance. In series circuits, current is the same through all components and resistances add. In parallel circuits, voltage is the same across all branches and reciprocal resistances add.",
  memoryHook:
    "'VIR triangle: V on top, I and R on bottom.' V = IR, I = V/R, R = V/I. 'Series: same I, add R. Parallel: same V, add 1/R.' Power: 'P = VI = I²R = V²/R.' Think of water: V = pressure, I = flow rate, R = pipe narrowness.",
  imatTrap:
    "In series: adding resistors INCREASES total resistance. In parallel: adding resistors DECREASES total resistance. Common error: for parallel, students add resistances instead of their reciprocals. Power is dissipated as heat in resistors (P = I²R).",
  whyItMatters:
    "Understanding circuits is essential for medical device safety (defibrillators, ECG machines), understanding neural circuits (membrane resistance and ion currents), and everyday electrical safety (why short circuits cause fires).",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Ohm's Law</h3>
      <p className="font-mono text-center py-1">V = IR</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>V = voltage / potential difference (Volts, V)</li>
        <li>I = current (Amperes, A) — rate of charge flow</li>
        <li>R = resistance (Ohms, Ω)</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Series Circuits</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Same current flows through all components: I = I₁ = I₂ = I₃</li>
        <li>Resistances add: R_total = R₁ + R₂ + R₃</li>
        <li>Voltage divides: V_total = V₁ + V₂ + V₃</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Parallel Circuits</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Same voltage across all branches: V = V₁ = V₂ = V₃</li>
        <li>Reciprocal resistances add: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃</li>
        <li>Current divides: I_total = I₁ + I₂ + I₃</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Electrical Power</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>P = VI</strong> = I²R = V²/R
        </li>
        <li>Power (Watts) = rate of energy dissipation</li>
        <li>Energy = P × t (Joules)</li>
      </ul>

      <CircuitSimulator />
    </div>
  ),
  questions: [
    {
      id: "ohm-q1",
      type: "fill-blank",
      prompt:
        "A 12 V battery is connected to a 4 Ω resistor. What current flows in A?",
      answer: "3",
      explanation: "I = V/R = 12/4 = 3 A.",
      difficulty: "apply",
    },
    {
      id: "ohm-q2",
      type: "multiple-choice",
      prompt:
        "Three 6 Ω resistors are connected in parallel. What is the equivalent resistance?",
      options: ["18 Ω", "6 Ω", "3 Ω", "2 Ω"],
      answer: "2 Ω",
      explanation:
        "1/R_eq = 1/6 + 1/6 + 1/6 = 3/6 = 1/2 → R_eq = 2 Ω. In parallel, equivalent resistance is always less than the smallest individual resistance.",
      difficulty: "apply",
    },
    {
      id: "ohm-q3",
      type: "multiple-choice",
      prompt:
        "If the resistance in a circuit is doubled while voltage stays constant, what happens to the power dissipated?",
      options: [
        "It doubles",
        "It halves",
        "It quadruples",
        "It stays the same",
      ],
      answer: "It halves",
      explanation:
        "P = V²/R. If R doubles and V is constant, P becomes V²/(2R) = P/2. Power is inversely proportional to resistance at constant voltage.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["coulombs-law", "si-units", "heat-transfer"],
};

export default note;
