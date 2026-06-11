"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "eu-qf-1",
    question:
      "Which EU institution proposes legislation (monopoly on initiative)?",
    answer:
      "The European Commission. It also enforces EU law (guardian of the treaties).",
    context: "EU institutions",
  },
  {
    id: "eu-qf-2",
    question:
      "Which is NOT a legislative body: European Council or Council of the EU?",
    answer:
      "European Council (heads of state, sets direction, no legislative power). Council of the EU (ministers) co-legislates with Parliament.",
    context: "Council vs European Council",
  },
  {
    id: "eu-qf-3",
    question: "Difference between a regulation and a directive?",
    answer:
      "Regulation = directly applicable. Directive = sets objectives, member states choose how (requires national transposition).",
    context: "EU law types",
  },
  {
    id: "eu-qf-4",
    question: "Which treaty formally established the European Union (1993)?",
    answer:
      "The Maastricht Treaty. It created the three-pillar structure and introduced EU citizenship.",
    context: "Founding treaties",
  },
];

export const euInstitutionsNote: AtomicNote = {
  slug: "eu-institutions",
  subject: "general-knowledge",
  topic: "international-institutions",
  title: "European Union Institutions",
  summary:
    "The EU balances supranational and intergovernmental governance through four key bodies: Commission (proposes), Parliament (co-legislates), Council of the EU (co-legislates), CJEU (interprets).",
  memoryHook:
    "CPCC: Commission (proposes, guardian), Parliament (directly elected, co-legislator), Council of ministers (co-legislator), Court of Justice (CJEU). European Council = heads of state (direction, no laws).",
  imatTrap:
    "Council of the EU (ministers, legislates) does not equal European Council (heads of state, direction only). Commission proposes laws — it is NOT the same as the Council. Regulations = directly applicable; directives = need national transposition.",
  whyItMatters:
    "EU legislation governs public health (EMA), medical device directives, cross-border healthcare, and mutual recognition of qualifications (Directive 2005/36/EC) — directly affects Italian medical graduates.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "EU institutions appear in nearly every IMAT GK section",
    },
    {
      years: [2021, 2024],
      frequency: "medium",
      notes:
        "Difference between Council of the EU and European Council is a common trap",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "eu-we-1",
      question:
        "Which EU institution is responsible for ensuring member states comply with EU law? Options: European Commission, European Parliament, Council of the EU, European Council. Explain the role of each to justify the answer.",
      hints: [
        "Which institution has enforcement powers? It is called 'the guardian of the treaties.'",
        "This is NOT the legislative body — it is the executive/enforcement body.",
        "The Parliament and Council pass laws; this institution makes sure they are followed.",
      ],
      solution:
        "The European Commission is responsible for ensuring member states comply with EU law. It is called 'the guardian of the treaties.' Roles: Commission (enforces, proposes), Parliament (co-legislates, represents citizens), Council of the EU (co-legislates, represents member states), European Council (sets strategic direction, no legislative power). The Commission can investigate infringements, issue formal notices, and refer member states to the CJEU.",
    },
  ],
  externalResources: [
    {
      title: "EU Official — Institutions and Bodies",
      url: "https://european-union.europa.eu/institutions-law-budget/institutions-and-bodies_en",
      type: "article",
      description: "Official EU guide to its institutions",
    },
    {
      title: "Khan Academy — European Union",
      url: "https://www.khanacademy.org/humanities/world-history/euro-history",
      type: "video",
      description: "EU history and institutions overview",
    },
    {
      title: "IMAT Buddy — General Knowledge",
      url: "https://www.imatbuddy.com/imat-general-knowledge/",
      type: "practice",
      description: "IMAT-style GK practice questions on EU",
    },
  ],
  highYieldPoints: [
    "Commission: proposes laws, enforces, guardian of the treaties (Brussels)",
    "Parliament: directly elected, co-legislator (Strasbourg/Brussels)",
    "Council of the EU: national ministers, co-legislator (Brussels)",
    "European Council: heads of state, sets direction, NO legislative power",
    "CJEU: interprets EU law uniformly (Luxembourg)",
    "Regulation: directly applicable in all member states",
    "Directive: requires national transposition (member states choose how)",
    "Maastricht Treaty (1993) formally established the EU",
    "27 member states (post-Brexit)",
  ],
  explanation: (
    <div>
      <h3>Overview</h3>
      <p>
        EU formally established by <strong>Maastricht Treaty (1993)</strong>,
        evolving from EEC (1957). Currently <strong>27 member states</strong>{" "}
        (post-Brexit).
      </p>

      <h3>Key Institutions</h3>
      <p>
        <strong>European Commission:</strong> Proposes legislation, implements
        policies, enforces EU law (guardian of the treaties). One Commissioner
        per member state. Seat: Brussels.
      </p>
      <p>
        <strong>European Parliament:</strong> Directly elected (705 MEPs).
        Co-legislator with Council under ordinary legislative procedure. Seat:
        Strasbourg/Brussels.
      </p>
      <p>
        <strong>Council of the EU (Council of Ministers):</strong> National
        ministers by policy area. Co-legislator with Parliament. Rotating
        presidency every 6 months. Seat: Brussels.
      </p>
      <p>
        <strong>European Council:</strong> Heads of state/government summits.
        Sets political direction. NO legislative power. Seat: Brussels.
      </p>
      <p>
        <strong>CJEU:</strong> Ensures uniform interpretation of EU law. Can
        annul EU acts. Seat: Luxembourg.
      </p>

      <h3>Legislative Process</h3>
      <p>
        Ordinary legislative procedure: Commission proposes, Parliament and
        Council co-decide, adopted as regulation (directly applicable) or
        directive (needs transposition).
      </p>

      <QuickFire
        questions={quickFire.slice(0, 2)}
        title="Quick Check: EU Facts"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Commission: proposes laws, enforces, guardian of the treaties (Brussels)",
          "Parliament: directly elected, co-legislator (Strasbourg/Brussels)",
          "Council of the EU: national ministers, co-legislator (Brussels)",
          "European Council: heads of state, sets direction, NO legislative power",
          "Regulation: directly applicable. Directive: requires national transposition",
          "Maastricht Treaty (1993) formally established the EU",
        ].map((point) => (
          <div
            key={point}
            className="flex items-start gap-2 rounded-lg border border-blue-500/20 bg-blue-500/5 p-2 mb-1"
          >
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <span className="text-xs text-muted-foreground">{point}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  questions: [
    {
      id: "eu-institutions-q1",
      type: "multiple-choice",
      prompt:
        "Which EU institution proposes legislation and is the guardian of the treaties?",
      options: [
        "European Parliament",
        "Council of the EU",
        "European Commission",
        "European Council",
      ],
      answer: "European Commission",
      explanation:
        "The Commission has the sole right of legislative initiative and ensures member states comply with EU law.",
      difficulty: "recall",
    },
    {
      id: "eu-institutions-q2",
      type: "multiple-choice",
      prompt:
        "What is the key difference between the Council of the EU and the European Council?",
      options: [
        "They are the same institution",
        "Council of the EU = ministers who legislate; European Council = heads of state who set direction",
        "European Council legislates; Council of the EU sets direction",
        "Both are directly elected",
      ],
      answer:
        "Council of the EU = ministers who legislate; European Council = heads of state who set direction",
      explanation:
        "The Council of the EU (ministers) co-legislates. The European Council (heads of state) sets political direction without legislative power.",
      difficulty: "apply",
    },
    {
      id: "eu-institutions-q3",
      type: "multiple-choice",
      prompt:
        "What is the difference between an EU regulation and an EU directive?",
      options: [
        "Regulations apply only to large member states",
        "Regulations are directly applicable; directives need national transposition",
        "Directives are directly applicable; regulations need transposition",
        "There is no difference",
      ],
      answer:
        "Regulations are directly applicable; directives need national transposition",
      explanation:
        "Regulations become law automatically in all member states. Directives set objectives but leave implementation to national authorities.",
      difficulty: "apply",
    },
    {
      id: "eu-institutions-q4",
      type: "multiple-choice",
      prompt: "Which treaty formally created the European Union?",
      options: [
        "Treaty of Rome (1957)",
        "Maastricht Treaty (1993)",
        "Treaty of Lisbon (2007)",
        "Schengen Agreement (1985)",
      ],
      answer: "Maastricht Treaty (1993)",
      explanation:
        "The Maastricht Treaty established the three-pillar structure of the EU and introduced EU citizenship.",
      difficulty: "recall",
    },
    {
      id: "eu-institutions-q5",
      type: "multiple-choice",
      prompt: "How many members does the European Parliament have?",
      options: ["27", "100", "705", "1,000"],
      answer: "705",
      explanation:
        "The European Parliament has 705 directly elected MEPs. Number changed after Brexit.",
      difficulty: "recall",
    },
    {
      id: "eu-institutions-q6",
      type: "explain-why",
      prompt: "Why does the European Council NOT have legislative power?",
      answer:
        "The European Council brings together heads of state to define the EU's political direction and priorities. Passing laws is done by the Council of the EU (ministers) together with the Parliament. Separating strategic direction from legislation prevents excessive concentration of power.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["un-system", "world-wars"],
  prerequisites: [],
};
