"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "Where do the light-dependent reactions of photosynthesis occur?",
    answer: "Thylakoid membranes",
    context: "Inside the chloroplast",
  },
  {
    id: "qf-2",
    question: "What are the two products of the light-dependent reactions?",
    answer: "ATP and NADPH",
    hint: "These are used to power the Calvin cycle",
    context: "Energy carriers",
  },
  {
    id: "qf-3",
    question: "What enzyme fixes CO₂ in the Calvin cycle?",
    answer: "RuBisCO (ribulose-1,5-bisphosphate carboxylase/oxygenase)",
    context: "Most abundant protein on Earth",
  },
];

export const photosynthesisNote: AtomicNote = {
  slug: "photosynthesis",
  subject: "biology",
  topic: "bioenergetics",
  title: "Photosynthesis",
  summary:
    "The anabolic process by which plants, algae, and cyanobacteria convert light energy into chemical energy (glucose). Occurs in chloroplasts: light-dependent reactions (thylakoid) produce ATP/NADPH, and the Calvin cycle (stroma) fixes CO₂ into carbohydrates.",
  memoryHook:
    "Light Reactions: Water splits, ATP made, NADPH made (thylakoid). Calvin Cycle: CO₂ fixed, RuBP regenerated, glucose produced (stroma).",
  imatTrap:
    "Photosynthesis is NOT a single reaction but two distinct stages (light-dependent and Calvin cycle). The light reactions produce O₂ FROM WATER, not CO₂. Students often think the O₂ from photosynthesis comes from CO₂ — it actually comes from H₂O (proven by van Niel using isotopic labelling). Also: RuBisCO has oxygenase activity (photorespiration) — it wastes energy when O₂ levels are high.",
  whyItMatters:
    "Photosynthesis produces the O₂ we breathe and is the ultimate source of all food energy. Understanding RuBisCO's inefficiency is key to agricultural engineering — efforts to boost crop yield often target RuBisCO or the photorespiration pathway. Global climate models depend on photosynthetic CO₂ fixation.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "medium",
      notes: "Light-dependent vs Calvin cycle — location and products",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Action/absorption spectra and chlorophyll",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "O₂ comes from H₂O (van Niel experiment)",
    },
  ],
  equations: [
    {
      id: "photosynthesis-overall",
      latex:
        "6\\ CO_2 + 6\\ H_2O + light \\longrightarrow C_6H_{12}O_6 + 6\\ O_2",
      description: "Overall reaction of photosynthesis",
    },
    {
      id: "photosynthesis-light",
      latex:
        "2\\ H_2O + 2\\ NADP^+ + 3\\ ADP + 3\\ P_i \\xrightarrow{light} O_2 + 2\\ NADPH + 2\\ H^+ + 3\\ ATP",
      description: "Net reaction of the light-dependent stage (per 2 H₂O)",
    },
    {
      id: "photosynthesis-calvin",
      latex:
        "3\\ CO_2 + 6\\ NADPH + 9\\ ATP \\longrightarrow G3P + 6\\ NADP^+ + 9\\ ADP + 8\\ P_i",
      description:
        "Calvin cycle net reaction — producing one G3P (3-phosphoglycerate)",
    },
    {
      id: "photosynthesis-rubisco",
      latex: "RuBP + CO_2 \\xrightarrow{\\text{RuBisCO}} 2\\ (3\\text{-PGA})",
      description:
        "Carbon fixation: RuBisCO adds CO₂ to ribulose-1,5-bisphosphate",
    },
  ],
  workedExamples: [
    {
      id: "photosynthesis-worked-1",
      question:
        "An herbicide blocks the electron flow from Photosystem II to the plastoquinone pool. Predict the immediate effect on ATP synthesis, NADPH production, and O₂ evolution.",
      hints: [
        "What is the first step of the light reactions?",
        "What does PSII do with water?",
        "Which photosystem generates NADPH directly?",
      ],
      solution:
        "Blocking electron flow from PSII prevents the entire linear electron transport chain from operating. Water cannot be split (blocking O₂ evolution), the proton gradient cannot be established, and electrons cannot reach PSI for NADPH production. Both ATP and NADPH production stop. Since the Calvin cycle requires both ATP and NADPH, CO₂ fixation would also cease. This illustrates how tightly coupled the light and dark reactions are.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Photosynthesis Overview",
      url: "https://www.khanacademy.org/science/biology/photosynthesis/photosynthesis-overview/v/introduction-to-photosynthesis",
      type: "video",
      description: "Step-by-step walkthrough of both stages",
    },
    {
      title: "Nature Scitable — Photosynthesis",
      url: "https://www.nature.com/scitable/topicpage/photosynthesis-13938294/",
      type: "article",
      description: "Advanced coverage of light reactions and Calvin cycle",
    },
    {
      title: "OpenStax Biology 2e — Photosynthesis",
      url: "https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis",
      type: "textbook",
      description: "Free textbook with diagrams and review questions",
    },
  ],
  highYieldPoints: [
    "Location: thylakoid membranes (light reactions) and stroma (Calvin cycle)",
    "Light reactions: H₂O split → O₂ released + ATP + NADPH produced",
    "Calvin cycle: CO₂ → G3P (3C sugar) using ATP and NADPH from light reactions",
    "RuBisCO: catalyses C fixation but also has oxygenase activity (photorespiration)",
    "Action spectrum: matches chlorophyll absorption (red + blue peaks)",
    "O₂ from photosynthesis comes from H₂O, NOT CO₂ (isotopic labelling by van Niel)",
    "C4 plants (e.g., maize) concentrate CO₂ to reduce photorespiration",
  ],
  explanation: (
    <div>
      <p>
        <strong>Photosynthesis</strong> is the process by which autotrophs
        convert light energy into chemical energy. It takes place in{" "}
        <strong>chloroplasts</strong>
        and consists of two linked stages: the{" "}
        <strong>light-dependent reactions</strong>
        (thylakoid membranes) and the <strong>Calvin cycle</strong> (stroma).
      </p>

      <h3>Overview Equation</h3>
      <EquationBlock
        equation={{
          id: "photosynthesis-overall",
          latex:
            "6\\ CO_2 + 6\\ H_2O + light \\longrightarrow C_6H_{12}O_6 + 6\\ O_2",
          description: "Overall reaction of photosynthesis",
        }}
      />

      <h3>Light-Dependent Reactions (Thylakoid Membranes)</h3>
      <p>
        Light energy is captured by <strong>chlorophyll</strong> and other
        pigments in <strong>photosystems II and I</strong>. The energy excites
        electrons, which pass through an electron transport chain (similar to
        the ETC in mitochondria), pumping H⁺ into the thylakoid lumen. Key
        events:
      </p>
      <ul>
        <li>
          <strong>Photosystem II (PSII):</strong> splits H₂O → O₂ + 2H⁺ + 2e⁻.
          This is the source of atmospheric O₂.
        </li>
        <li>
          <strong>Electron transport chain:</strong> electrons pass from PSII →
          Q → cytochrome b₆f → plastocyanin → PSI. Protons are pumped into the
          lumen.
        </li>
        <li>
          <strong>Photosystem I (PSI):</strong> re-energises electrons and
          passes them to NADP⁺ (via ferredoxin), forming NADPH.
        </li>
        <li>
          <strong>ATP synthase:</strong> H⁺ flows back from lumen to stroma,
          driving ATP synthesis (photophosphorylation).
        </li>
      </ul>

      <EquationBlock
        equation={{
          id: "photosynthesis-light",
          latex:
            "2\\ H_2O + 2\\ NADP^+ + 3\\ ADP + 3\\ P_i \\xrightarrow{light} O_2 + 2\\ NADPH + 2\\ H^+ + 3\\ ATP",
          description: "Light-dependent reactions (per 2 H₂O)",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Calvin Cycle (Stroma)</h3>
      <p>
        The Calvin cycle uses ATP and NADPH from the light reactions to fix CO₂
        into carbohydrate. It has three phases:
      </p>

      <h4>Phase 1: Carbon Fixation</h4>
      <p>
        RuBisCO catalyses the addition of CO₂ to <strong>RuBP</strong> (5C),
        producing two molecules of <strong>3-PGA</strong> (3C).
      </p>

      <EquationBlock
        equation={{
          id: "photosynthesis-rubisco",
          latex:
            "RuBP + CO_2 \\xrightarrow{\\text{RuBisCO}} 2\\ (3\\text{-PGA})",
          description: "Carbon fixation",
        }}
      />

      <h4>Phase 2: Reduction</h4>
      <p>
        3-PGA is phosphorylated by ATP and reduced by NADPH to{" "}
        <strong>glyceraldehyde-3-phosphate (G3P)</strong>. Some G3P exits to
        form glucose and other carbohydrates.
      </p>

      <h4>Phase 3: Regeneration of RuBP</h4>
      <p>
        Most G3P is used to regenerate RuBP using ATP — ensuring the cycle can
        continue. For every 3 CO₂ molecules fixed, 6 G3P are formed: 1 exits, 5
        recycle to regenerate 3 RuBP.
      </p>

      <h3>Photorespiration — RuBisCO&apos;s Fatal Flaw</h3>
      <p>
        RuBisCO can also react with O₂ instead of CO₂ (oxygenase activity),
        producing a toxic compound that must be recycled — wasting ATP and
        NADPH. This is called <strong>photorespiration</strong>. C4 plants
        (e.g., maize, sugarcane) concentrate CO₂ in bundle-sheath cells to
        minimise photorespiration.
      </p>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "photosynthesis-worked-1",
            question:
              "An herbicide blocks the electron flow from Photosystem II to the plastoquinone pool. Predict the immediate effect on ATP synthesis, NADPH production, and O₂ evolution.",
            hints: [
              "What is the first step of the light reactions?",
              "What does PSII do with water?",
              "Which photosystem generates NADPH directly?",
            ],
            solution:
              "Blocking electron flow from PSII prevents the entire linear electron transport chain from operating. Water cannot be split (blocking O₂ evolution), the proton gradient cannot be established, and electrons cannot reach PSI for NADPH production. Both ATP and NADPH production stop. Since the Calvin cycle requires both ATP and NADPH, CO₂ fixation would also cease.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Thylakoid = light reactions; Stroma = Calvin cycle",
          "O₂ from H₂O (via PSII), not from CO₂",
          "Light reactions: ATP + NADPH + O₂",
          "Calvin cycle: CO₂ → G3P (requires ATP + NADPH)",
          "RuBisCO: C fixation + photorespiration (wasteful)",
          "C4 plants minimise photorespiration",
          "Action spectrum = chlorophyll absorption peaks",
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
      id: "photosynthesis-q1",
      type: "multiple-choice",
      prompt: "Where do the light-dependent reactions of photosynthesis occur?",
      answer: "Thylakoid membranes",
      difficulty: "recall",
      options: [
        "Stroma",
        "Thylakoid membranes",
        "Outer chloroplast membrane",
        "Cytoplasm",
      ],
    },
    {
      id: "photosynthesis-q2",
      type: "multiple-choice",
      prompt:
        "What is the source of the oxygen released during photosynthesis?",
      answer: "Water (H₂O)",
      difficulty: "recall",
      options: [
        "Carbon dioxide (CO₂)",
        "Water (H₂O)",
        "Glucose (C₆H₁₂O₆)",
        "ATP",
      ],
    },
    {
      id: "photosynthesis-q3",
      type: "multiple-choice",
      prompt: "Which enzyme fixes CO₂ in the Calvin cycle?",
      answer: "RuBisCO",
      difficulty: "recall",
      options: [
        "RuBisCO",
        "ATP synthase",
        "NADP⁺ reductase",
        "PEP carboxylase",
      ],
    },
    {
      id: "photosynthesis-q4",
      type: "multiple-choice",
      prompt: "What are the direct products of the light-dependent reactions?",
      answer: "ATP, NADPH, O₂",
      difficulty: "apply",
      options: [
        "ATP, NADPH, O₂",
        "ATP, NADH, O₂",
        "Glucose, O₂",
        "ATP, NADPH, CO₂",
      ],
    },
    {
      id: "photosynthesis-q5",
      type: "multiple-choice",
      prompt: "What is photorespiration?",
      answer: "RuBisCO fixing O₂ instead of CO₂, wasting energy",
      difficulty: "apply",
      options: [
        "Excessive light causing leaf burn",
        "RuBisCO fixing O₂ instead of CO₂, wasting energy",
        "The rate of respiration exceeding photosynthesis",
        "CO₂ being released during the light reactions",
      ],
      imatYear: 2023,
    },
    {
      id: "photosynthesis-q6",
      type: "explain-why",
      prompt:
        "Why are C4 plants like maize more efficient in hot, dry climates?",
      answer:
        "C4 plants minimise photorespiration by spatially separating CO₂ fixation and the Calvin cycle. In hot conditions, RuBisCO's oxygenase activity increases, but C4 plants concentrate CO₂ in bundle-sheath cells, suppressing photorespiration and conserving water.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["electron-transport-chain", "atp"],
  prerequisites: ["atp"],
};
