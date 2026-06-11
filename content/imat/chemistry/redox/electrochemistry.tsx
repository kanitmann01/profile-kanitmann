import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "electrochemistry",
  subject: "chemistry",
  topic: "redox",
  title: "Electrochemistry",
  summary:
    "The study of chemical reactions caused by or producing electricity — galvanic (voltaic) cells generate current from spontaneous redox reactions; electrolysis uses current to drive non-spontaneous reactions.",
  memoryHook:
    "Galvanic: 'AN OX, CAT RED' — Anode = Oxidation, Cathode = Reduction. 'Electrons flow from ANODE to CATHODE' (like 'A to C' alphabetically). Electrolysis = 'electricity-forced chemistry' (non-spontaneous).",
  imatTrap:
    "In a galvanic cell, the anode is NEGATIVE (source of e⁻) and cathode is POSITIVE. In electrolysis, this is REVERSED — anode is positive, cathode is negative. The reactions (anode = oxidation) stay the same, but the signs flip.",
  whyItMatters:
    "Electrochemistry explains batteries, corrosion, electroplating, and biological electron transport. IMAT tests cell notation, standard potentials, and predicting spontaneity from E° values.",
  explanation: (
    <div>
      <h3>Galvanic (Voltaic) Cells</h3>
      <p>
        Convert chemical energy → electrical energy via a spontaneous redox
        reaction (E° &gt; 0).
      </p>
      <ul>
        <li>
          <strong>Anode (−):</strong> oxidation occurs here. Electrons are
          released.
        </li>
        <li>
          <strong>Cathode (+):</strong> reduction occurs here. Electrons are
          accepted.
        </li>
        <li>
          <strong>Salt bridge:</strong> maintains charge balance by allowing ion
          flow.
        </li>
        <li>
          <strong>Electron flow:</strong> anode → external circuit → cathode.
        </li>
      </ul>
      <p>
        Example: Zn|Zn²⁺ || Cu²⁺|Cu — Zn oxidises (anode), Cu²⁺ reduces
        (cathode). E°cell = E°cathode − E°anode = 0.34 − (−0.76) = +1.10 V.
      </p>
      <h3>Standard Reduction Potentials</h3>
      <p>
        Measured relative to the standard hydrogen electrode (SHE, E° = 0.00 V).
        More positive E° → stronger oxidizing agent → greater tendency to be
        reduced.
      </p>
      <h3>Electrolysis</h3>
      <p>
        Uses electrical energy to drive a <strong>non-spontaneous</strong>{" "}
        reaction (E° &lt; 0).
      </p>
      <ul>
        <li>
          <strong>Anode (+):</strong> oxidation (anions attracted).
        </li>
        <li>
          <strong>Cathode (−):</strong> reduction (cations attracted).
        </li>
        <li>
          Applications: electroplating, extraction of aluminium from Al₂O₃,
          purification of copper.
        </li>
      </ul>
      <h3>Faraday&apos;s Law</h3>
      <p>
        Mass of substance deposited ∝ charge passed: m = (Q × M) / (n × F),
        where Q = It, F = 96,485 C/mol.
      </p>
    </div>
  ),
  questions: [
    {
      id: "electro-q1",
      type: "multiple-choice",
      prompt:
        "In a galvanic cell with Zn and Cu electrodes, which is the cathode?",
      answer: "Copper (Cu) — reduction occurs here (Cu²⁺ + 2e⁻ → Cu).",
      options: [
        "Zinc (Zn) — oxidation occurs here",
        "Copper (Cu) — reduction occurs here (Cu²⁺ + 2e⁻ → Cu)",
        "Both electrodes are cathodes",
        "The salt bridge",
      ],
      explanation:
        "Cu has a more positive standard reduction potential (+0.34 V) than Zn (−0.76 V), so Cu²⁺ is reduced at the cathode. Zn is oxidised at the anode.",
      difficulty: "apply",
    },
    {
      id: "electro-q2",
      type: "true-false",
      prompt: "In electrolysis, the anode is the negative electrode.",
      answer: "False",
      explanation:
        "In electrolysis, the anode is POSITIVE (connected to the positive terminal of the power supply). This is the opposite of a galvanic cell, where the anode is negative.",
      difficulty: "apply",
    },
    {
      id: "electro-q3",
      type: "fill-blank",
      prompt:
        "A spontaneous redox reaction in an electrochemical cell has a ______ (positive/negative) cell potential (E°).",
      answer: "positive",
      explanation:
        "A positive E° indicates a spontaneous reaction (ΔG = −nFE° — when E° is positive, ΔG is negative, meaning spontaneous).",
      difficulty: "recall",
    },
  ],
  crosslinks: ["oxidation-reduction", "concentration", "ionic-bonds"],
  prerequisites: ["oxidation-reduction"],
};

export default note;
