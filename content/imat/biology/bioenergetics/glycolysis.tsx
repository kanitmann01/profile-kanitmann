import type { AtomicNote } from "@/data/imat/types";
import { EnergyDashboard } from "@/components/imat/interactive/energy-dashboard";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { EnzymeSimulator } from "@/components/imat/interactive/enzyme-simulator";
import { PathwayChallenge } from "@/components/imat/interactive/pathway-challenge";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "How many net ATP are produced per glucose in glycolysis?",
    answer: "2",
    hint: "Investment = 2 ATP, Payoff = 4 ATP",
    context: "From the dashboard above",
  },
  {
    id: "qf-2",
    question: "What is the rate-limiting enzyme of glycolysis?",
    answer: "pfk-1",
    hint: "It's the enzyme that catalyses F6P → F1,6BP",
    context: "Phosphofructo...",
  },
  {
    id: "qf-3",
    question: "Does glycolysis require oxygen?",
    answer: "no",
    context: "Think about where it occurs",
  },
];

export const glycolysisNote: AtomicNote = {
  slug: "glycolysis",
  subject: "biology",
  topic: "bioenergetics",
  title: "Glycolysis",
  summary:
    "A 10-step cytoplasmic pathway that breaks one glucose (6C) into two pyruvate (3C), yielding a net 2 ATP and 2 NADH. The universal first step of cellular respiration, independent of oxygen.",
  memoryHook:
    "Good Girls In Our Class Learn Pretty New Molecules Fast → Glucose → G6P → F6P → F1,6BP → G3P → 1,3BPG → 3PG → 2PG → PEP → Pyruvate",
  imatTrap:
    "Glycolysis does NOT require oxygen — it occurs in the cytoplasm of ALL cells. The trap: students confuse 'no O₂ required' with 'only occurs in anaerobic conditions.' Glycolysis is the first step of BOTH aerobic and anaerobic respiration. Another classic: investment = 2 ATP, payoff = 4 ATP → net = 2 ATP.",
  whyItMatters:
    "Red blood cells (no mitochondria) rely exclusively on glycolysis for ATP. Cancer cells upregulate glycolysis even in the presence of oxygen (Warburg effect) — exploited in FDG-PET imaging, where radioactive glucose accumulates in metabolically active tumours.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Net ATP yield and PFK-1 regulation appear almost every year",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Substrate-level phosphorylation in payoff phase",
    },
    {
      years: [2020, 2024],
      frequency: "medium",
      notes: "Warburg effect / clinical applications",
    },
  ],
  equations: [
    {
      id: "glycolysis-net",
      latex:
        "C_6H_{12}O_6 + 2\\ NAD^+ + 2\\ ADP + 2\\ P_i \\longrightarrow 2\\ Pyruvate + 2\\ NADH + 2\\ H^+ + 2\\ ATP + 2\\ H_2O",
      description: "Overall net reaction of glycolysis per glucose molecule",
      variables: "C₆H₁₂O₆ = glucose, Pᵢ = inorganic phosphate",
    },
    {
      id: "glycolysis-investment",
      latex: "ATP \\longrightarrow ADP + P_i \\quad (\\times 2)",
      description:
        "Investment phase: 2 ATP consumed (hexokinase + PFK-1 steps)",
    },
    {
      id: "glycolysis-payoff",
      latex:
        "1,3\\text{-}BPG + ADP \\xrightarrow{\\text{PGK}} 3\\text{-}PG + ATP \\quad (\\times 2)",
      description:
        "Substrate-level phosphorylation: first ATP-generating step (occurs twice per glucose)",
    },
    {
      id: "glycolysis-redox",
      latex:
        "G3P + NAD^+ + P_i \\xrightarrow{\\text{G3P dehydrogenase}} 1,3\\text{-}BPG + NADH + H^+ \\quad (\\times 2)",
      description: "Reduction of NAD⁺ to NADH during the payoff phase",
    },
  ],
  workedExamples: [
    {
      id: "glycolysis-worked-1",
      question:
        "If a cell is treated with an inhibitor that blocks PFK-1, explain what happens to glycolysis and cellular ATP levels.",
      hints: [
        "PFK-1 catalyses the first committed step — what does 'committed' mean?",
        "Consider what accumulates upstream vs. what depletes downstream.",
        "Think about feedback regulation: what normally activates/inhibits PFK-1?",
      ],
      solution:
        "PFK-1 catalyses F6P → F1,6BP, the committed step. Inhibition blocks all downstream flux. F6P and G6P accumulate upstream. ATP production from glycolysis ceases. Under anaerobic conditions (RBCs), this is catastrophic — no ATP is produced. Under aerobic conditions, the cell switches to fatty acid/amino acid oxidation, but glucose-derived ATP is lost.",
    },
    {
      id: "glycolysis-worked-2",
      question:
        "IMAT 2023 Style: A researcher measures ATP levels in erythrocytes incubated with iodoacetate, a G3P dehydrogenase inhibitor. Predict the ATP yield per glucose molecule.",
      hints: [
        "RBCs lack mitochondria — they produce ATP only by glycolysis.",
        "G3P dehydrogenase catalyses G3P → 1,3-BPG (step 6). Where does this fit in the pathway?",
        "All steps after the block are affected. Which ATP-producing steps come after step 6?",
      ],
      solution:
        "G3P dehydrogenase inhibition blocks the conversion of G3P to 1,3-BPG. All steps after (including both substrate-level phosphorylations at PGK and pyruvate kinase) are blocked. The investment phase (steps 1–5, consuming 2 ATP) still occurs, but the payoff phase cannot proceed. Net ATP = -2 ATP (the cell actually loses ATP). This would rapidly deplete erythrocyte ATP reserves.",
      imatYear: 2023,
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Glycolysis Overview",
      url: "https://www.khanacademy.org/science/biology/cellular-respiration-and-fermentation/glycolysis/v/glycolysis",
      type: "video",
      description: "Step-by-step walkthrough of all 10 steps with visuals",
    },
    {
      title: "Ninja Nerd — Glycolysis (Full Lecture)",
      url: "https://www.youtube.com/watch?v=9H5h0tGqxgk",
      type: "video",
      description:
        "Board-style lecture covering regulation, energetics, and clinical correlations",
    },
    {
      title: "OpenStax Biology 2e — Glycolysis",
      url: "https://openstax.org/books/biology-2e/pages/7-2-glycolysis",
      type: "textbook",
      description: "Free college-level text with diagrams and review questions",
    },
    {
      title: "IMAT Buddy — Bioenergetics Practice Questions",
      url: "https://www.imatbuddy.com/imat-science-question-banks/",
      type: "practice",
      description: "IMAT-style glycolysis questions with worked solutions",
    },
  ],
  highYieldPoints: [
    "Location: cytoplasm (cytosol) — NOT mitochondria",
    "O₂ requirement: NONE — first step of BOTH aerobic and anaerobic respiration",
    "Substrate-level phosphorylation: direct ATP transfer, NOT oxidative phosphorylation",
    "PFK-1 = key regulator: inhibited by ATP/citrate, activated by AMP/F2,6BP",
    "RBCs rely solely on glycolysis (no mitochondria)",
    "Cancer cells: Warburg effect → high glycolysis even with O₂",
    "NADH must be recycled via fermentation (anaerobic) or ETC (aerobic)",
  ],
  explanation: (
    <div>
      <p>
        Glycolysis is the{" "}
        <strong>universal first step of cellular respiration</strong>, occurring
        in the <strong>cytoplasm</strong> of every living cell. It converts one
        molecule of glucose (C₆H₁₂O₆) into two molecules of pyruvate (CH₃COCOO⁻)
        through a sequence of 10 enzyme-catalysed reactions.
      </p>

      <h3>Energy Balance at a Glance</h3>
      <p className="text-sm text-muted-foreground mb-3">
        Watch glycolysis unfold: the dashboard animates through investment →
        payoff → net yield.
      </p>
      <EnergyDashboard />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Two Phases of Glycolysis</h3>

      <h4>Phase 1: Investment Phase (Steps 1–5)</h4>
      <p>
        2 ATP molecules are consumed to phosphorylate glucose and split it into
        two 3-carbon molecules (glyceraldehyde-3-phosphate, G3P). Key enzymes:
        <strong> hexokinase</strong> (step 1, traps glucose in cell) and
        <strong> phosphofructokinase-1</strong> (step 3, rate-limiting committed
        step).
      </p>

      <EquationBlock
        equation={{
          id: "glycolysis-investment",
          latex: "ATP \\longrightarrow ADP + P_i \\quad (\\times 2)",
          description: "Investment phase: 2 ATP consumed (steps 1 & 3)",
        }}
      />

      <h4>Phase 2: Payoff Phase (Steps 6–10)</h4>
      <p>
        Each G3P is oxidised, producing 2 NADH and 4 ATP via substrate-level
        phosphorylation (2 ATP per G3P × 2 = 4 ATP per glucose). The key
        ATP-generating steps are catalysed by{" "}
        <strong>phosphoglycerate kinase</strong> (step 7) and
        <strong> pyruvate kinase</strong> (step 10).
      </p>

      <EquationBlock
        equation={{
          id: "glycolysis-payoff",
          latex:
            "1,3\\text{-}BPG + ADP \\xrightarrow{\\text{PGK}} 3\\text{-}PG + ATP \\quad (\\times 2)",
          description: "Substrate-level phosphorylation in the payoff phase",
        }}
      />

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Enzyme Regulation — PFK-1</h3>
      <p>
        The most important regulatory point in glycolysis is{" "}
        <strong>PFK-1</strong>
        (phosphofructokinase-1), which catalyses the committed step F6P →
        F1,6BP. Its activity is finely tuned by the cell&apos;s energy status:
      </p>

      <p className="text-sm text-muted-foreground mb-3">
        Try it yourself: drag the sliders to see how ATP and AMP levels control
        PFK-1 activity and the overall pathway flux.
      </p>
      <EnzymeSimulator />

      <h3>Net Yield per Glucose</h3>

      <EquationBlock
        equation={{
          id: "glycolysis-net",
          latex:
            "C_6H_{12}O_6 + 2\\ NAD^+ + 2\\ ADP + 2\\ P_i \\longrightarrow 2\\ Pyruvate + 2\\ NADH + 2\\ H^+ + 2\\ ATP + 2\\ H_2O",
          description: "Overall net reaction of glycolysis",
        }}
      />

      <div className="my-4 grid grid-cols-2 gap-3 rounded-lg border bg-card p-4">
        <div>
          <h4 className="text-sm font-semibold text-red-500">Investment</h4>
          <p className="text-lg font-bold">-2 ATP</p>
          <p className="text-xs text-muted-foreground">H steps 1 & 3</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-green-500">Payoff</h4>
          <p className="text-lg font-bold">+4 ATP + 2 NADH</p>
          <p className="text-xs text-muted-foreground">Steps 7 & 10</p>
        </div>
        <div className="col-span-2 border-t pt-2">
          <h4 className="text-sm font-semibold">Net Yield</h4>
          <p className="text-lg font-bold">2 Pyruvate + 2 ATP + 2 NADH</p>
        </div>
      </div>

      <h3>Pathway Challenge</h3>
      <p className="text-sm text-muted-foreground mb-3">
        Now test yourself: arrange these key steps in the correct order.
      </p>
      <PathwayChallenge />

      <h3>Key Enzymes & Regulation</h3>
      <div className="grid gap-3">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="font-semibold text-sm">
            Hexokinase / Glucokinase (Step 1)
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Phosphorylates glucose to G6P,{" "}
            <strong>trapping glucose inside the cell</strong>. G6P cannot cross
            the cell membrane. Inhibited by G6P (product inhibition).
            Glucokinase (liver/pancreas) has higher Kₘ and is not inhibited by
            G6P.
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="font-semibold text-sm">
            Phosphofructokinase-1 (PFK-1, Step 3)
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            The <strong>major rate-limiting, committed step</strong> of
            glycolysis. Catalyses F6P → F1,6BP. Allosterically regulated by
            energy status:
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded bg-red-500/10 p-2">
              <span className="font-semibold text-red-600">Inhibitors</span>
              <ul className="list-disc list-inside mt-1 text-muted-foreground">
                <li>ATP (high energy charge)</li>
                <li>Citrate (Krebs cycle intermediate)</li>
                <li>H⁺ (acidosis → slows glycolysis)</li>
              </ul>
            </div>
            <div className="rounded bg-green-500/10 p-2">
              <span className="font-semibold text-green-600">Activators</span>
              <ul className="list-disc list-inside mt-1 text-muted-foreground">
                <li>AMP (low energy charge)</li>
                <li>Fructose-2,6-bisphosphate</li>
                <li>ADP</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="font-semibold text-sm">Pyruvate Kinase (Step 10)</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Catalyses PEP → Pyruvate, generating ATP via substrate-level
            phosphorylation. Activated by F1,6BP (feedforward activation).
            Inhibited by ATP and alanine. The second irreversible step of
            glycolysis.
          </p>
        </div>
      </div>

      <h3>Clinical Corner: Warburg Effect & PET Imaging</h3>
      <p>
        Cancer cells rewire their metabolism to favour glycolysis even in the
        presence of adequate oxygen — a phenomenon called the{" "}
        <strong>Warburg effect</strong>. This provides rapid ATP and
        biosynthetic intermediates needed for cell proliferation. PET imaging
        exploits this: <sup>18</sup>FDG (a radioactive glucose analogue)
        accumulates in tumours because they take up more glucose than normal
        tissues. The FDG is trapped intracellularly after hexokinase
        phosphorylation but cannot proceed through glycolysis, creating a bright
        signal on PET scans.
      </p>

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "glycolysis-worked-1",
            question:
              "If a cell is treated with an inhibitor that blocks PFK-1, explain what happens to glycolysis and cellular ATP levels.",
            hints: [
              "PFK-1 catalyses the first committed step — what does 'committed' mean?",
              "Consider what accumulates upstream vs. what depletes downstream.",
              "Think about feedback regulation: what normally activates/inhibits PFK-1?",
            ],
            solution:
              "PFK-1 catalyses F6P → F1,6BP, the committed step. Inhibition blocks all downstream flux. F6P and G6P accumulate upstream. ATP production from glycolysis ceases. Under anaerobic conditions (RBCs), this is catastrophic — no ATP is produced. Under aerobic conditions, the cell switches to fatty acid/amino acid oxidation, but glucose-derived ATP is lost.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Cytoplasm — NOT mitochondria",
          "No O₂ required — universal pathway",
          "2 ATP invested → 4 ATP + 2 NADH produced",
          "PFK-1 = master regulator (ATP inhibits, AMP activates)",
          "Substrate-level phosphorylation",
          "RBCs rely entirely on glycolysis",
          "Cancer cells: Warburg effect → high glucose uptake",
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
      id: "glycolysis-q1",
      type: "multiple-choice",
      prompt:
        "What is the net ATP yield from one molecule of glucose in glycolysis?",
      answer: "2 ATP",
      explanation: "4 ATP produced − 2 ATP consumed = 2 ATP net.",
      difficulty: "recall",
      options: ["1 ATP", "2 ATP", "4 ATP", "38 ATP"],
    },
    {
      id: "glycolysis-q2",
      type: "multiple-choice",
      prompt: "Where does glycolysis take place in eukaryotic cells?",
      answer: "Cytoplasm (cytosol)",
      explanation:
        "Unlike the Krebs cycle and ETC (mitochondrial), glycolysis occurs entirely in the cytoplasm.",
      difficulty: "recall",
      options: [
        "Mitochondrial matrix",
        "Cytoplasm (cytosol)",
        "Inner mitochondrial membrane",
        "Endoplasmic reticulum",
      ],
    },
    {
      id: "glycolysis-q3",
      type: "multiple-choice",
      prompt:
        "Which enzyme catalyses the rate-limiting, committed step of glycolysis?",
      answer: "Phosphofructokinase-1 (PFK-1)",
      explanation:
        "PFK-1 catalyses F6P → F1,6BP, the first irreversible step unique to glycolysis.",
      difficulty: "recall",
      options: [
        "Hexokinase",
        "Phosphofructokinase-1 (PFK-1)",
        "Pyruvate kinase",
        "Phosphoglycerate kinase",
      ],
    },
    {
      id: "glycolysis-q4",
      type: "multiple-choice",
      prompt: "What is the Warburg effect?",
      answer: "Cancer cells rely on glycolysis even with oxygen available",
      explanation:
        "Cancer cells exhibit high rates of glycolysis even under aerobic conditions.",
      difficulty: "apply",
      options: [
        "Normal cells switching to anaerobic metabolism",
        "Cancer cells relying on glycolysis even with oxygen available",
        "Mitochondrial dysfunction in all cells",
        "Increased oxidative phosphorylation in tumours",
      ],
    },
    {
      id: "glycolysis-q5",
      type: "multiple-choice",
      prompt:
        "Which of the following is a substrate-level phosphorylation in glycolysis?",
      answer: "1,3-BPG → 3-PG (phosphoglycerate kinase)",
      explanation:
        "Substrate-level phosphorylation is direct phosphate transfer from substrate to ADP. Occurs at PGK (step 7) and pyruvate kinase (step 10).",
      difficulty: "apply",
      options: [
        "Glucose → G6P (hexokinase)",
        "F6P → F1,6BP (PFK-1)",
        "1,3-BPG → 3-PG (phosphoglycerate kinase)",
        "PEP → Pyruvate (pyruvate kinase)",
      ],
      imatYear: 2022,
    },
    {
      id: "glycolysis-q6",
      type: "explain-why",
      prompt: "Why does PFK-1 inhibition by ATP make metabolic sense?",
      answer:
        "When ATP is abundant, the cell does not need to run glycolysis. This prevents wasteful glucose consumption and allows glucose to be stored or used in other pathways.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "krebs-cycle",
    "electron-transport-chain",
    "fermentation",
    "atp",
  ],
  prerequisites: ["atp"],
};
