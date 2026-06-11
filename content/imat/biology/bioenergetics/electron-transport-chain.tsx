import type { AtomicNote } from "@/data/imat/types";

export const electronTransportChainNote: AtomicNote = {
  slug: "electron-transport-chain",
  subject: "biology",
  topic: "bioenergetics",
  title: "Electron Transport Chain & Oxidative Phosphorylation",
  summary:
    "NADH and FADH₂ donate electrons to a series of membrane-bound complexes, driving proton pumping and ATP synthesis via chemiosmosis. O₂ is the final electron acceptor.",
  memoryHook:
    '"NADH is a Big Fat Hero" — Complex I (NADH dehydrogenase), Complex II (Succinate DH / FADH₂ entry), Complex III (Cytochrome bc₁), Complex IV (Cytochrome c oxidase). ATP synthase = Complex V.',
  imatTrap:
    "FADH₂ enters at Complex II and bypasses Complex I, so it pumps fewer protons → yields ~1.5 ATP vs ~2.5 ATP for NADH. Oxygen is NOT an enzyme — it is the final electron acceptor; without it, the chain backs up and stops. Cyanide blocks Complex IV.",
  whyItMatters:
    "Cyanide poisoning inhibits cytochrome c oxidase (Complex IV), halting ATP production and causing rapid cell death. Metformin (first-line diabetes drug) mildly inhibits Complex I. Uncoupling proteins in brown fat generate heat instead of ATP (non-shivering thermogenesis in infants).",
  explanation: (
    <div>
      <p>
        The electron transport chain (ETC) is located on the{" "}
        <strong>inner mitochondrial membrane</strong> (cristae). It couples
        electron transfer to proton pumping, creating an electrochemical
        gradient that drives ATP synthesis.
      </p>
      <h3>The Four Complexes</h3>
      <ul>
        <li>
          <strong>Complex I (NADH dehydrogenase):</strong> Accepts electrons
          from NADH, pumps 4 H⁺ into the intermembrane space.
        </li>
        <li>
          <strong>Complex II (Succinate dehydrogenase):</strong> Accepts
          electrons from FADH₂ (via succinate → fumarate). Does NOT pump
          protons.
        </li>
        <li>
          <strong>Complex III (Cytochrome bc₁):</strong> Transfers electrons
          from ubiquinol to cytochrome c; pumps 4 H⁺.
        </li>
        <li>
          <strong>Complex IV (Cytochrome c oxidase):</strong> Transfers
          electrons to O₂ (the final acceptor), forming H₂O; pumps 2 H⁺.
        </li>
      </ul>
      <h3>Chemiosmosis (Complex V — ATP Synthase)</h3>
      <p>
        The proton gradient (proton-motive force) drives H⁺ back through ATP
        synthase, which phosphorylates ADP → ATP. Approximately{" "}
        <strong>2.5 ATP per NADH</strong> and <strong>1.5 ATP per FADH₂</strong>
        .
      </p>
      <h3>Total ATP from One Glucose (Theoretical Maximum)</h3>
      <p>
        Glycolysis (2 NADH) + Pyruvate DH (2 NADH) + Krebs (6 NADH + 2 FADH₂ + 2
        ATP) + ETC → ~30–32 ATP total (modern estimate; older texts say 36–38).
      </p>
    </div>
  ),
  questions: [
    {
      id: "etc-q1",
      type: "multiple-choice",
      prompt:
        "What is the final electron acceptor in the electron transport chain?",
      answer: "Oxygen (O₂)",
      explanation:
        "O₂ accepts electrons at Complex IV and is reduced to water. Without O₂, the chain cannot function.",
      difficulty: "recall",
      options: ["NAD⁺", "FAD", "Oxygen (O₂)", "Cytochrome c"],
    },
    {
      id: "etc-q2",
      type: "explain-why",
      prompt:
        "Why does FADH₂ yield fewer ATP than NADH in oxidative phosphorylation?",
      answer:
        "FADH₂ donates electrons at Complex II, bypassing Complex I. Since fewer protons are pumped across the membrane per FADH₂, the proton-motive force generated is smaller, yielding ~1.5 ATP vs ~2.5 ATP for NADH.",
      difficulty: "apply",
    },
    {
      id: "etc-q3",
      type: "multiple-choice",
      prompt: "Cyanide poisoning is lethal primarily because it:",
      answer:
        "Inhibits Complex IV (cytochrome c oxidase), halting ATP production",
      explanation:
        "Cyanide binds to the iron in cytochrome a₃ of Complex IV, blocking electron transfer to O₂. This stops oxidative phosphorylation entirely.",
      difficulty: "apply",
      options: [
        "Destroys the mitochondrial membrane",
        "Inhibits Complex IV (cytochrome c oxidase), halting ATP production",
        "Prevents glycolysis from occurring",
        "Blocks the Krebs cycle at citrate synthase",
      ],
    },
  ],
  crosslinks: ["krebs-cycle", "glycolysis", "atp", "fermentation"],
  prerequisites: ["krebs-cycle", "atp"],
};
