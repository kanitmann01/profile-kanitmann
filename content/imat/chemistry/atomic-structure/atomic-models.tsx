"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "am-qf-1",
    question: "Who discovered the electron?",
    answer: "J.J. Thomson (1897)",
    hint: "Cathode ray tubes",
    context: "From the Thomson section above",
  },
  {
    id: "am-qf-2",
    question: "What did Rutherford expect vs what he observed?",
    answer: "Expected all to pass; observed some bouncing back",
    context: "Gold foil experiment",
  },
];

export const atomicModelsNote: AtomicNote = {
  slug: "atomic-models",
  subject: "chemistry",
  topic: "atomic-structure",
  title: "Atomic Models",
  summary:
    "The historical progression from Dalton's solid sphere to the quantum mechanical model — each experiment revealed a deeper layer of atomic structure.",
  memoryHook:
    "Dalton → Thomson (plum pudding, e⁻ discovered) → Rutherford (nucleus, gold foil) → Bohr (orbits/shells) → Quantum (orbitals/probability). 'Dogs Try Running Back Quick'.",
  imatTrap:
    "Bohr's model has electrons in fixed circular orbits — this is WRONG in modern physics. Electrons exist in probability clouds (orbitals), not fixed paths. Bohr only works perfectly for hydrogen. Also: IMAT asks which experiment disproved which model, not just what each model says.",
  whyItMatters:
    "IMAT tests your understanding of how experimental evidence drove each model revision. You must know which experiment disproved which model — especially the gold foil experiment's implications for the plum pudding model.",
  imatPatterns: [
    {
      years: [2022, 2023],
      frequency: "high",
      notes: "Rutherford gold foil — most tested experiment",
    },
    {
      years: [2021, 2024],
      frequency: "medium",
      notes: "Bohr model limitations vs quantum model",
    },
    { years: [2023], frequency: "low", notes: "Dalton -> Thomson progression" },
  ],
  equations: [
    {
      id: "rutherford-scattering",
      latex: "E_k = \\frac{1}{4\\pi\\epsilon_0}\\cdot\\frac{2Ze^2}{r}",
      description:
        "Kinetic energy of α-particle at closest approach in Rutherford scattering",
      variables:
        "Z = nuclear charge, e = elementary charge, r = distance of closest approach",
    },
    {
      id: "rydberg-formula",
      latex:
        "\\frac{1}{\\lambda} = R_H\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
      description:
        "Rydberg formula — predicts wavelengths of spectral lines for hydrogen",
      variables:
        "R_H = Rydberg constant (1.097×10⁷ m⁻¹), n₁ < n₂ = principal quantum numbers",
    },
    {
      id: "bohr-energy",
      latex: "E_n = -\\frac{13.6\\text{ eV}}{n^2}",
      description: "Bohr model energy levels for hydrogen",
      variables: "n = principal quantum number (1, 2, 3…)",
    },
  ],
  workedExamples: [
    {
      id: "am-we-1",
      question:
        "Describe how the gold foil experiment disproved Thomson's plum pudding model and led to Rutherford's nuclear model.",
      hints: [
        "What did Thomson's model predict about the distribution of charge and mass?",
        "In the gold foil experiment, what did most α-particles do? What did a few do?",
        "What does a large-angle deflection imply about the mass distribution inside the atom?",
      ],
      solution:
        "Thomson's model predicted positive charge was spread evenly throughout the atom. If true, α-particles would experience only small cumulative deflections and all pass through. Rutherford observed most passed through (empty space), but ~1 in 8000 bounced back at large angles (>90°), implying a tiny, dense, positively charged nucleus. This replaced the 'pudding' with a nuclear model where mass and positive charge are concentrated at the centre.",
    },
    {
      id: "am-we-2",
      question:
        "Calculate the energy of the n=3 level in hydrogen using Bohr's model.",
      hints: [
        "Recall the formula: E_n = -13.6/n² eV",
        "What is n for the third energy level?",
        "The answer should be negative — what does a negative energy mean?",
      ],
      solution:
        "E₃ = -13.6/3² = -13.6/9 = -1.51 eV. The negative value means the electron is bound to the nucleus — energy must be supplied to remove it (ionisation).",
      equations: ["bohr-energy"],
      imatYear: 2022,
    },
  ],
  externalResources: [
    {
      title: "PhET — Rutherford Scattering Simulation",
      url: "https://phet.colorado.edu/en/simulations/rutherford-scattering",
      type: "simulation",
      description:
        "Interactive gold foil experiment — fire α-particles and see the scattering pattern",
    },
    {
      title: "Khan Academy — Atomic Structure History",
      url: "https://www.khanacademy.org/science/physics/quantum-physics/quantum-numbers-and-orbitals/a/the-quantum-mechanical-model-of-the-atom",
      type: "article",
      description: "Covers all models from Dalton to quantum mechanical",
    },
    {
      title: "Crash Course Chemistry — The History of Atomic Chemistry",
      url: "https://www.youtube.com/watch?v=zSxzs6yS52I",
      type: "video",
      description:
        "Engaging 12-minute summary of the key experiments and discoveries",
    },
  ],
  highYieldPoints: [
    "Dalton: atoms are indivisible solid spheres (DISPROVED by Thomson's electron)",
    "Thomson: plum pudding — positive sphere with embedded e⁻ (DISPROVED by Rutherford's gold foil)",
    "Rutherford: nuclear model — tiny positive nucleus, mostly empty space",
    "Bohr: fixed electron orbits/shells — only works for hydrogen",
    "Quantum mechanical: orbitals (probability clouds), not fixed paths",
    "Heisenberg uncertainty principle: can't know both position and momentum exactly",
    "Rydberg formula predicts hydrogen spectral lines with high accuracy",
  ],
  explanation: (
    <div>
      <h3>Dalton (1803) — The Indivisible Atom</h3>
      <p>
        John Dalton proposed atoms as{" "}
        <strong>indivisible, solid spheres</strong>. Each element consists of
        identical atoms; compounds form in fixed ratios. This model explained
        the law of conservation of mass and the law of definite proportions.
      </p>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Thomson (1897) — Discovery of the Electron</h3>
      <p>
        J.J. Thomson used the <strong>cathode ray tube</strong> experiment to
        discover the electron. Rays (electrons) were deflected by electric and
        magnetic fields, proving they had negative charge and were much smaller
        than atoms. He proposed the{" "}
        <strong>&quot;plum pudding&quot; model</strong>: a positively charged
        sphere with negative electrons embedded inside — like raisins in a
        pudding.
      </p>

      <h3>Rutherford (1911) — The Gold Foil Experiment</h3>
      <p>
        Ernest Rutherford fired alpha particles (⁴He²⁺) at a thin gold foil
        (~100 nm). The results were shocking:
      </p>
      <ul>
        <li>
          <strong>Most</strong> α-particles passed straight through (atom is
          mostly empty space)
        </li>
        <li>
          <strong>Some</strong> were deflected at small angles
        </li>
        <li>
          <strong>~1 in 8000</strong> bounced back at large angles (&gt;90°)
        </li>
      </ul>

      <EquationBlock
        equation={{
          id: "rutherford-scattering",
          latex: "E_k = \\frac{1}{4\\pi\\epsilon_0}\\cdot\\frac{2Ze^2}{r}",
          description: "Kinetic energy of α-particle at closest approach",
        }}
      />

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Bohr (1913) — Electron Shells</h3>
      <p>
        Niels Bohr proposed that electrons orbit the nucleus in{" "}
        <strong>fixed energy levels (shells)</strong>. Electrons can jump
        between levels by absorbing or emitting photons of specific energy,
        explaining atomic emission spectra — why hydrogen produces distinct
        coloured lines, not a continuous rainbow.
      </p>

      <EquationBlock
        equation={{
          id: "bohr-energy",
          latex: "E_n = -\\frac{13.6\\text{ eV}}{n^2}",
          description: "Bohr model — quantised energy levels for hydrogen",
        }}
      />

      <EquationBlock
        equation={{
          id: "rydberg-formula",
          latex:
            "\\frac{1}{\\lambda} = R_H\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
          description: "Rydberg formula — predicts spectral line wavelengths",
        }}
      />

      <h3>Quantum Mechanical Model (Schrödinger, Heisenberg)</h3>
      <p>
        The modern model describes electrons by the{" "}
        <strong>Schrödinger wave equation</strong>, producing{" "}
        <strong>orbitals</strong> — regions of probability where an electron is
        likely to be found, not fixed paths. Each orbital is described by four
        quantum numbers (n, l, mₗ, mₛ). The{" "}
        <strong>Heisenberg uncertainty principle</strong> states you cannot
        simultaneously know both the exact position and momentum of an electron
        — the more precisely you know one, the less you know the other.
      </p>

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "am-we-1",
            question:
              "Describe how the gold foil experiment disproved Thomson's plum pudding model and led to Rutherford's nuclear model.",
            hints: [
              "What did Thomson's model predict about the distribution of charge and mass?",
              "In the gold foil experiment, what did most α-particles do? What did a few do?",
              "What does a large-angle deflection imply about the mass distribution inside the atom?",
            ],
            solution:
              "Thomson's model predicted positive charge was spread evenly throughout the atom. If true, α-particles would experience only small cumulative deflections and all pass through. Rutherford observed most passed through (empty space), but ~1 in 8000 bounced back at large angles (>90°), implying a tiny, dense, positively charged nucleus. This replaced the 'pudding' with a nuclear model where mass and positive charge are concentrated at the centre.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Dalton: solid spheres (indivisible)",
          "Thomson: discovered e⁻ via cathode ray tube",
          "Rutherford: gold foil → nuclear model",
          "Bohr: fixed orbits (only works for H)",
          "Q.M.: orbitals, uncertainty principle",
          "Rydberg: predicts H spectral lines",
          "Most tested: Rutherford gold foil",
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
      id: "am-q1",
      type: "multiple-choice",
      prompt: "Which experiment led to the discovery of the atomic nucleus?",
      answer: "Rutherford's gold foil experiment",
      options: [
        "Cathode ray tube experiment",
        "Rutherford's gold foil experiment",
        "Millikan oil drop experiment",
        "Davisson-Germer experiment",
      ],
      explanation:
        "Rutherford fired α-particles at thin gold foil. The few that bounced back proved a tiny, dense, positive nucleus exists at the atom's centre.",
      difficulty: "recall",
    },
    {
      id: "am-q2",
      type: "multiple-choice",
      prompt:
        "What is the key limitation of the Bohr model compared to the quantum mechanical model?",
      answer:
        "Bohr places electrons in fixed circular orbits, whereas quantum mechanics describes them in probability orbitals.",
      options: [
        "Bohr did not include a nucleus",
        "Bohr places electrons in fixed circular orbits, whereas quantum mechanics describes them in probability orbitals",
        "Bohr could not explain the existence of electrons",
        "Bohr's model only works for molecules, not atoms",
      ],
      explanation:
        "Bohr's fixed orbits work for hydrogen but fail for multi-electron atoms. The quantum model uses orbitals (probability regions) described by quantum numbers.",
      difficulty: "apply",
    },
    {
      id: "am-q3",
      type: "fill-blank",
      prompt:
        "Thomson's discovery of the ______ using cathode ray tubes disproved Dalton's idea that atoms were indivisible.",
      answer: "electron",
      explanation:
        "Thomson's cathode ray experiment (1897) showed that atoms contain smaller, negatively charged particles — electrons — meaning atoms are divisible.",
      difficulty: "recall",
    },
    {
      id: "am-q4",
      type: "multiple-choice",
      prompt: "What does the Heisenberg uncertainty principle state?",
      answer:
        "You cannot simultaneously know both the exact position and momentum of a particle.",
      options: [
        "Energy is quantised",
        "You cannot simultaneously know both the exact position and momentum of a particle",
        "Electrons orbit the nucleus in fixed shells",
        "All matter behaves as waves",
      ],
      explanation:
        "The uncertainty principle: Δx·Δp ≥ h/4π. The more precisely you know an electron's position, the less you know its momentum, and vice versa.",
      difficulty: "apply",
    },
    {
      id: "am-q5",
      type: "multiple-choice",
      prompt: "Which statement about Bohr's model is correct?",
      answer:
        "Electrons can jump between energy levels by absorbing or emitting photons of specific energy.",
      options: [
        "Electrons continuously lose energy as they orbit",
        "Electrons can jump between energy levels by absorbing or emitting photons of specific energy",
        "The model works perfectly for all elements",
        "Electrons are described by probability orbitals",
      ],
      explanation:
        "Bohr's model quantised energy levels: electrons absorb photons to jump to higher levels and emit photons when falling to lower levels. This explained hydrogen's emission spectrum.",
      difficulty: "recall",
    },
    {
      id: "am-q6",
      type: "explain-why",
      prompt:
        "Why could only ~1 in 8000 α-particles bounce back in Rutherford's experiment, and what did this reveal?",
      answer:
        "The atom is mostly empty space with a tiny, dense nucleus. Most α-particles pass through the empty space. Only those hitting the tiny nucleus directly (very rare) bounce back. This revealed that the atom's positive charge and mass are concentrated in a tiny central nucleus.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "electron-configuration",
    "periodic-trends",
    "pure-substances",
    "groups-periods",
  ],
  prerequisites: [],
};
