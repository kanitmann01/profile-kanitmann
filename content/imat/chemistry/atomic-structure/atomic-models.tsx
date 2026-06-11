import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "atomic-models",
  subject: "chemistry",
  topic: "atomic-structure",
  title: "Atomic Models",
  summary:
    "The historical progression from Dalton's solid sphere to the quantum mechanical model — each experiment revealed a deeper layer of atomic structure.",
  memoryHook:
    "Dalton → Thomson (plum pudding, e⁻ discovered) → Rutherford (nucleus, gold foil) → Bohr (orbits/shells) → Quantum (orbitals/probability). 'Dogs Try Running Back Quick'.",
  imatTrap:
    "Bohr's model has electrons in fixed circular orbits — this is WRONG in modern physics. Electrons exist in probability clouds (orbitals), not fixed paths. Bohr only works perfectly for hydrogen.",
  whyItMatters:
    "IMAT tests your understanding of how experimental evidence drove each model revision. You must know which experiment disproved which model.",
  explanation: (
    <div>
      <h3>Dalton (1803)</h3>
      <p>
        Atoms are indivisible, solid spheres. Each element has unique atoms.
        Compounds form from atoms combining in fixed ratios.
      </p>
      <h3>Thomson (1897) — Cathode Ray Tube</h3>
      <p>
        Discovered the <strong>electron</strong>. Proposed the &quot;plum
        pudding&quot; model — a positively charged sphere with embedded negative
        electrons.
      </p>
      <h3>Rutherford (1911) — Gold Foil Experiment</h3>
      <p>
        Fired α-particles at gold foil. Most passed through, but some deflected
        at large angles → atom is mostly empty space with a tiny, dense,{" "}
        <strong>positive nucleus</strong>.
      </p>
      <h3>Bohr (1913)</h3>
      <p>
        Electrons orbit the nucleus in fixed <strong>energy levels</strong>{" "}
        (shells). Electrons can jump between levels by absorbing/emitting
        photons of specific energy. Explains atomic emission spectra.
      </p>
      <h3>Quantum Mechanical Model (Schrödinger, Heisenberg)</h3>
      <p>
        Electrons exist in <strong>orbitals</strong> — regions of probability,
        not fixed paths. Described by four quantum numbers (n, l, mₗ, mₛ).
        Heisenberg uncertainty principle: cannot know both position and momentum
        simultaneously.
      </p>
    </div>
  ),
  questions: [
    {
      id: "atomic-mod-q1",
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
      id: "atomic-mod-q2",
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
      id: "atomic-mod-q3",
      type: "fill-blank",
      prompt:
        "Thomson's discovery of the ______ using cathode ray tubes disproved Dalton's idea that atoms were indivisible.",
      answer: "electron",
      explanation:
        "Thomson's cathode ray experiment (1897) showed that atoms contain smaller, negatively charged particles — electrons — meaning atoms are divisible.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["electron-configuration", "periodic-trends", "pure-substances"],
  prerequisites: [],
};

export default note;
