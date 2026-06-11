"use client";

import type { AtomicNote } from "@/data/imat/types";
import { PHScale } from "@/components/imat/interactive/ph-scale";

const note: AtomicNote = {
  slug: "acids-bases-salts",
  subject: "chemistry",
  topic: "inorganic-chemistry",
  title: "Acids, Bases & Salts",
  summary:
    "Acids donate H⁺ (or protons), bases accept H⁺ (or produce OH⁻). The pH scale quantifies acidity. Neutralisation of acid + base produces salt + water.",
  memoryHook:
    "Arrhenius: acid → H⁺ in water, base → OH⁻ in water. Brønsted-Lowry: acid = proton donor, base = proton acceptor. 'A Beer Acid Gives Buzz, A Base Accepts'. Strong = fully dissociates; Weak = partially dissociates.",
  imatTrap:
    "A strong acid is NOT the same as a concentrated acid. 'Strong' refers to degree of dissociation (HCl is always 100% dissociated), while 'concentrated' refers to amount per volume. Also, pH 0 is possible — it means [H⁺] = 1 M.",
  whyItMatters:
    "Acid-base chemistry underpins blood buffering (pH 7.4), enzyme function, digestion (HCl in stomach), and drug absorption. IMAT tests pH calculations and strong vs weak distinctions.",
  explanation: (
    <div>
      <h3>Definitions</h3>
      <ul>
        <li>
          <strong>Arrhenius:</strong> Acid produces H⁺ in water; base produces
          OH⁻ in water.
        </li>
        <li>
          <strong>Brønsted-Lowry:</strong> Acid = proton (H⁺) donor; base =
          proton acceptor. More general — works in non-aqueous systems.
        </li>
      </ul>
      <h3>The pH Scale</h3>
      <p>
        pH = −log₁₀[H⁺]. Scale runs 0–14 at 25°C. Use the interactive tool below
        to explore:
      </p>
      <PHScale />
      <ul>
        <li>pH &lt; 7 → acidic ([H⁺] &gt; [OH⁻])</li>
        <li>pH = 7 → neutral ([H⁺] = [OH⁻] = 10⁻⁷ M)</li>
        <li>pH &gt; 7 → basic ([OH⁻] &gt; [H⁺])</li>
      </ul>
      <h3>Strong vs Weak</h3>
      <ul>
        <li>
          <strong>Strong acids</strong> (fully dissociate): HCl, H₂SO₄, HNO₃.
        </li>
        <li>
          <strong>Weak acids</strong> (partially dissociate): CH₃COOH, H₂CO₃.
        </li>
        <li>
          <strong>Strong bases</strong>: NaOH, KOH, Ca(OH)₂.
        </li>
        <li>
          <strong>Weak bases</strong>: NH₃.
        </li>
      </ul>
      <h3>Neutralisation</h3>
      <p>Acid + Base → Salt + Water</p>
      <p>
        e.g. HCl + NaOH → NaCl + H₂O. The H⁺ from acid combines with OH⁻ from
        base to form water.
      </p>
    </div>
  ),
  questions: [
    {
      id: "acid-base-q1",
      type: "multiple-choice",
      prompt:
        "According to Brønsted-Lowry theory, what role does NH₃ play in the reaction NH₃ + H₂O → NH₄⁺ + OH⁻?",
      answer: "Base (proton acceptor)",
      options: [
        "Acid (proton donor)",
        "Base (proton acceptor)",
        "Neither acid nor base",
        "Catalyst",
      ],
      explanation:
        "NH₃ accepts a proton (H⁺) from water, forming NH₄⁺. By Brønsted-Lowry definition, a proton acceptor is a base.",
      difficulty: "apply",
    },
    {
      id: "acid-base-q2",
      type: "fill-blank",
      prompt: "A solution with pH 3 has [H⁺] = ______ M.",
      answer: "10⁻³ (or 0.001)",
      explanation: "pH = −log₁₀[H⁺], so [H⁺] = 10⁻ᵖᴴ = 10⁻³ = 0.001 M.",
      difficulty: "recall",
    },
    {
      id: "acid-base-q3",
      type: "true-false",
      prompt: "A dilute solution of HCl is a weak acid.",
      answer: "False",
      explanation:
        "HCl is always a strong acid — it fully dissociates regardless of concentration. 'Dilute' describes concentration (amount per volume), not acid strength (degree of dissociation).",
      difficulty: "apply",
    },
  ],
  crosslinks: ["oxides", "concentration", "solubility", "balancing-equations"],
  prerequisites: ["pure-substances", "balancing-equations"],
};

export default note;
