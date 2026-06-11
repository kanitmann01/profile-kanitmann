"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "Which complex of the ETC receives electrons from NADH?",
    answer: "Complex I (NADH dehydrogenase)",
    context: "First entry point for electrons",
  },
  {
    id: "qf-2",
    question: "What is the final electron acceptor in the ETC?",
    answer: "O₂ (molecular oxygen)",
    hint: "Without this, the entire chain backs up",
    context: "Essential for aerobic life",
  },
  {
    id: "qf-3",
    question: "How many ATP can a single NADH produce via the ETC?",
    answer: "~2.5 ATP (or ~3 in older textbooks)",
    context: "Depends on textbook convention",
  },
];

export const electronTransportChainNote: AtomicNote = {
  slug: "electron-transport-chain",
  subject: "biology",
  topic: "bioenergetics",
  title: "Electron Transport Chain & Oxidative Phosphorylation",
  summary:
    "A series of 4 protein complexes (I–IV) embedded in the inner mitochondrial membrane that pass electrons to O₂, pumping protons to drive ATP synthesis via chemiosmosis. Produces ~34 ATP per glucose — the bulk of cellular energy.",
  memoryHook:
    "No PRAMS Could Oxidise → NADH → Complex I → Q → Complex III → Cytochrome c → Complex IV → O₂",
  imatTrap:
    "The ETC does NOT produce ATP directly — it creates the proton gradient that ATP synthase uses. Confusing 'proton pump' with 'ATP production' is the #1 trap. Also: FADH₂ enters at Complex II, so it bypasses Complex I → fewer protons pumped → fewer ATP (~1.5 vs ~2.5). Inhibitors: rotenone (Complex I), antimycin A (Complex III), cyanide (Complex IV).",
  whyItMatters:
    "Defects in ETC complexes cause mitochondrial diseases (e.g., Leber's hereditary optic neuropathy from Complex I mutations). Uncoupling proteins (UCP1 in brown fat) generate heat instead of ATP — crucial for newborn thermoregulation and hibernation. Many poisons (cyanide, CO) kill by blocking Complex IV.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Proton gradient mechanism and ATP synthase",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Difference in ATP yield: NADH vs FADH₂",
    },
    {
      years: [2020, 2022, 2024],
      frequency: "high",
      notes: "Inhibitors — cyanide, rotenone, oligomycin",
    },
  ],
  equations: [
    {
      id: "etc-summary",
      latex:
        "NADH + \\frac{1}{2}O_2 + H^+ + 3\\ ADP + 3\\ P_i \\longrightarrow NAD^+ + H_2O + 3\\ ATP",
      description: "Net yield per NADH completely oxidised via the ETC",
    },
    {
      id: "etc-fadh2",
      latex:
        "FADH_2 + \\frac{1}{2}O_2 + 2\\ ADP + 2\\ P_i \\longrightarrow FAD + H_2O + 2\\ ATP",
      description: "Net yield per FADH₂ — fewer ATP due to Complex II entry",
    },
    {
      id: "etc-chemiosmosis",
      latex: "ADP + P_i \\xrightarrow{\\text{ATP synthase}} ATP + H_2O",
      description: "Chemiosmotic phosphorylation driven by proton gradient",
    },
    {
      id: "etc-complex-iv",
      latex:
        "4\\ Cytochrome\\ c\\ (Fe^{2+}) + O_2 + 4\\ H^+ \\xrightarrow{\\text{Cytochrome c oxidase}} 4\\ Cytochrome\\ c\\ (Fe^{3+}) + 2\\ H_2O",
      description: "Complex IV: the final reduction of O₂ to water",
    },
  ],
  workedExamples: [
    {
      id: "etc-worked-1",
      question:
        "Explain why rotenone (Complex I inhibitor) causes a greater reduction in ATP production than antimycin A (Complex III inhibitor) at low concentrations.",
      hints: [
        "Where do NADH and FADH₂ enter the chain?",
        "What does Complex I inhibition do to NADH oxidation?",
        "Could FADH₂ oxidation continue if Complex I is blocked?",
      ],
      solution:
        "Rotenone blocks Complex I, preventing all NADH-linked electron entry. However, FADH₂ still enters at Complex II (succinate dehydrogenase), which feeds electrons to Q. These electrons can still pass through Complexes III and IV, so some ATP production continues. Antimycin A blocks Complex III, which is downstream of both Complex I and II entry points — it blocks ALL electron flow, regardless of the entry point. ATP production is completely halted with antimycin A.",
      imatYear: 2023,
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Oxidative Phosphorylation",
      url: "https://www.khanacademy.org/science/biology/cellular-respiration-and-fermentation/oxidative-phosphorylation/v/oxidative-phosphorylation-and-chemiosmosis",
      type: "video",
      description: "Animated walkthrough of ETC and ATP synthase",
    },
    {
      title: "Ninja Nerd — ETC (Full Lecture)",
      url: "https://www.youtube.com/watch?v=9H5h0tGqxgk",
      type: "video",
      description:
        "Detailed board lecture covering all complexes and inhibitors",
    },
    {
      title: "OpenStax Biology 2e — Oxidative Phosphorylation",
      url: "https://openstax.org/books/biology-2e/pages/7-4-oxidative-phosphorylation",
      type: "textbook",
      description: "Free text with diagrams of chemiosmosis and ATP synthase",
    },
  ],
  highYieldPoints: [
    "Location: inner mitochondrial membrane — NOT matrix or cytoplasm",
    "ETC complexes I–IV pump protons (H⁺) from matrix → intermembrane space",
    "Proton gradient = electrochemical gradient (pH + voltage) drives ATP synthase",
    "NADH enters at Complex I (~2.5 ATP), FADH₂ at Complex II (~1.5 ATP)",
    "O₂ is the final electron acceptor — reduced to H₂O at Complex IV",
    "Chemiosmosis (Peter Mitchell, Nobel 1978): proton flow through ATP synthase",
    "Common inhibitors: rotenone (I), antimycin A (III), cyanide/CO (IV), oligomycin (ATP synthase)",
  ],
  explanation: (
    <div>
      <p>
        The <strong>electron transport chain (ETC)</strong> is the final stage
        of aerobic respiration. Located in the{" "}
        <strong>inner mitochondrial membrane</strong>, it uses the energy of
        electrons from NADH and FADH₂ to pump protons and generate a gradient
        that drives ATP synthesis.
      </p>

      <h3>The Four Complexes</h3>

      <h4>Complex I — NADH Dehydrogenase</h4>
      <p>
        Accepts electrons from NADH, transferring them to coenzyme Q
        (ubiquinone). Pumps 4 H⁺ per NADH. Inhibited by{" "}
        <strong>rotenone</strong> and
        <strong>piericidin A</strong>.
      </p>

      <h4>Complex II — Succinate Dehydrogenase</h4>
      <p>
        Entry point for FADH₂ from the Krebs cycle. Also part of the Krebs cycle
        (succinate → fumarate). Does NOT pump protons — electrons go directly to
        Q. This is why FADH₂ yields fewer ATP.
      </p>

      <h4>Complex III — Cytochrome bc₁ Complex</h4>
      <p>
        Transfers electrons from reduced Q to cytochrome c. Pumps 4 H⁺ per 2
        electrons. Inhibited by <strong>antimycin A</strong>.
      </p>

      <h4>Complex IV — Cytochrome c Oxidase</h4>
      <p>
        Transfers electrons from cytochrome c to O₂, reducing it to H₂O. Pumps 2
        H⁺. Inhibited by <strong>cyanide (CN⁻)</strong>,
        <strong>carbon monoxide (CO)</strong>, and <strong>azide</strong>.
      </p>

      <EquationBlock
        equation={{
          id: "etc-complex-iv",
          latex:
            "4\\ Cytochrome\\ c\\ (Fe^{2+}) + O_2 + 4\\ H^+ \\xrightarrow{\\text{Cytochrome c oxidase}} 4\\ Cytochrome\\ c\\ (Fe^{3+}) + 2\\ H_2O",
          description: "Complex IV: reduction of O₂ to water",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Chemiosmosis & ATP Synthase</h3>
      <p>
        The proton gradient (high H⁺ in intermembrane space, low H⁺ in matrix)
        creates a <strong>proton motive force</strong>. H⁺ flows back into the
        matrix through <strong>ATP synthase</strong> (Complex V), a rotary
        molecular motor. The flow drives the rotation of the F₁ stalk, which
        catalyses ADP + Pᵢ → ATP.
      </p>

      <EquationBlock
        equation={{
          id: "etc-chemiosmosis",
          latex: "ADP + P_i \\xrightarrow{\\text{ATP synthase}} ATP + H_2O",
          description: "Chemiosmotic ATP production",
        }}
      />

      <h3>NADH vs FADH₂ ATP Yield</h3>
      <p>
        NADH donates electrons at Complex I, pumping ~10 H⁺ total (I, III, IV).
        FADH₂ donates electrons at Complex II, pumping ~6 H⁺ total (III, IV
        only). Since ~4 H⁺ are needed per ATP by ATP synthase:
      </p>
      <div className="my-4 grid grid-cols-2 gap-3 rounded-lg border bg-card p-4">
        <div>
          <h4 className="text-sm font-semibold text-blue-500">NADH</h4>
          <p className="text-lg font-bold">~2.5 ATP</p>
          <p className="text-xs text-muted-foreground">Enters at Complex I</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-orange-500">FADH₂</h4>
          <p className="text-lg font-bold">~1.5 ATP</p>
          <p className="text-xs text-muted-foreground">Enters at Complex II</p>
        </div>
      </div>

      <h3>Inhibitors & Poisons</h3>
      <div className="grid gap-3">
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <h4 className="font-semibold text-sm text-red-600">
            Rotenone (Complex I)
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Blocks NADH entry. FADH₂ entry at Complex II continues, so some ATP
            is still made. Rotenone is a common pesticide.
          </p>
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <h4 className="font-semibold text-sm text-red-600">
            Cyanide / CO (Complex IV)
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Blocks the final transfer of electrons to O₂. The chain backs up
            completely — no ATP from ETC. Rapidly fatal.
          </p>
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <h4 className="font-semibold text-sm text-red-600">
            Oligomycin (ATP Synthase)
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Blocks the proton channel of ATP synthase. The gradient builds up
            but cannot be discharged — no ATP produced. The chain eventually
            stalls because the gradient is too high.
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="font-semibold text-sm text-amber-600">
            DNP (Uncoupler)
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Dinitrophenol is a protonophore that shuttles H⁺ across the
            membrane, bypassing ATP synthase. Electron transport continues (O₂
            consumed) but no ATP is made — energy is released as heat.
            Historically used as a weight-loss drug (dangerous).
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Clinical Corner: Brown Fat & Uncoupling</h3>
      <p>
        <strong>Uncoupling protein 1 (UCP1)</strong> in brown adipose tissue
        creates a proton leak, generating heat instead of ATP. This is essential
        for newborn thermoregulation and hibernating mammals. Impaired ETC
        function is linked to mitochondrial diseases, neurodegeneration
        (Parkinson's), and ageing.
      </p>

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "etc-worked-1",
            question:
              "Explain why rotenone (Complex I inhibitor) causes a greater reduction in ATP production than antimycin A (Complex III inhibitor) at low concentrations.",
            hints: [
              "Where do NADH and FADH₂ enter the chain?",
              "What does Complex I inhibition do to NADH oxidation?",
              "Could FADH₂ oxidation continue if Complex I is blocked?",
            ],
            solution:
              "Rotenone blocks Complex I, preventing all NADH-linked electron entry. However, FADH₂ still enters at Complex II (succinate dehydrogenase), which feeds electrons to Q. These electrons can still pass through Complexes III and IV, so some ATP production continues. Antimycin A blocks Complex III, which is downstream of both Complex I and II entry points — it blocks ALL electron flow, regardless of the entry point. ATP production is completely halted with antimycin A.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Inner mitochondrial membrane (IMM)",
          "4 complexes (I–IV) + ATP synthase (V)",
          "Proton gradient → chemiosmosis → ATP",
          "NADH ~2.5 ATP, FADH₂ ~1.5 ATP",
          "O₂ = final electron acceptor → H₂O",
          "Know inhibitors: rotenone, antimycin A, cyanide, oligomycin",
          "Uncouplers (DNP, UCP1) → heat, no ATP",
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

      <QuickFire questions={recallQuestions.slice(2, 3)} title="Final Check" />
    </div>
  ),
  questions: [
    {
      id: "etc-q1",
      type: "multiple-choice",
      prompt: "Where is the electron transport chain located?",
      answer: "Inner mitochondrial membrane",
      difficulty: "recall",
      options: [
        "Mitochondrial matrix",
        "Inner mitochondrial membrane",
        "Outer mitochondrial membrane",
        "Cytoplasm",
      ],
    },
    {
      id: "etc-q2",
      type: "multiple-choice",
      prompt: "What is the final electron acceptor in the ETC?",
      answer: "O₂",
      difficulty: "recall",
      options: ["NAD⁺", "FAD", "O₂", "H₂O"],
    },
    {
      id: "etc-q3",
      type: "multiple-choice",
      prompt:
        "Approximately how many ATP does one NADH produce via oxidative phosphorylation?",
      answer: "2.5",
      difficulty: "recall",
      options: ["1.5", "2.5", "3.5", "4"],
    },
    {
      id: "etc-q4",
      type: "multiple-choice",
      prompt:
        "Which of the following inhibits Complex IV (cytochrome c oxidase)?",
      answer: "Cyanide",
      difficulty: "apply",
      options: ["Rotenone", "Antimycin A", "Cyanide", "Oligomycin"],
      imatYear: 2022,
    },
    {
      id: "etc-q5",
      type: "multiple-choice",
      prompt: "Why does FADH₂ produce fewer ATP than NADH?",
      answer: "FADH₂ enters at Complex II, bypassing Complex I",
      difficulty: "apply",
      options: [
        "FADH₂ carries fewer electrons",
        "FADH₂ enters at Complex II, bypassing Complex I",
        "FADH₂ is oxidised more slowly",
        "FADH₂ cannot cross the inner membrane",
      ],
    },
    {
      id: "etc-q6",
      type: "explain-why",
      prompt:
        "Explain how DNP (dinitrophenol) causes weight loss but is dangerous.",
      answer:
        "DNP is a protonophore that uncouples the ETC. Protons leak across the inner membrane without going through ATP synthase, so electron transport continues but ATP is not made. The energy is dissipated as heat, increasing metabolic rate and consuming calories. Danger: hyperthermia (uncontrolled heat production), ATP depletion in vital organs, and a narrow therapeutic window.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["krebs-cycle", "glycolysis", "fermentation", "atp"],
  prerequisites: ["krebs-cycle", "atp"],
};
