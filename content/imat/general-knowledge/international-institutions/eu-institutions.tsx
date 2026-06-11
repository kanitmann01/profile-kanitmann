import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "eu-institutions",
  subject: "general-knowledge",
  topic: "international-institutions",
  title: "European Union Institutions",
  summary:
    "The EU's institutional framework balances supranational and intergovernmental governance through four key bodies: the Commission, Parliament, Council, and Court of Justice.",
  memoryHook:
    "EU = CPCC: Commission (proposes laws, 'guardian of treaties'), Parliament (directly elected, co-legislator), Council of the EU (ministers from member states, co-legislator), Court of Justice (CJEU — ensures uniform interpretation). European Council = heads of state (sets direction, no legislative power).",
  imatTrap:
    "Council of the EU ≠ European Council. The Council of the EU (Council of Ministers) is where national ministers legislate. The European Council is the summit of heads of state/government that sets political direction. Also: the European Commission is NOT the same as the Council — the Commission proposes, the Council and Parliament decide.",
  whyItMatters:
    "EU legislation governs public health standards, pharmaceutical regulation (EMA), medical device directives, and cross-border healthcare (Directive 2011/24/EU). Italian medical graduates practise across the EU under mutual recognition of qualifications (Directive 2005/36/EC).",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Overview</h3>
      <p>
        The European Union (EU) was formally established by the{" "}
        <strong>Maastricht Treaty (1993)</strong>, evolving from the European
        Economic Community (EEC, 1957). It currently has{" "}
        <strong>27 member states</strong> (post-Brexit). Its institutional
        framework balances supranational (Commission, Parliament, CJEU) and
        intergovernmental (European Council, Council of the EU) decision-making.
      </p>

      <h3 className="text-lg font-semibold mt-4">Key Institutions</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>European Commission</strong>: Executive arm. Proposes
          legislation, implements policies, manages the budget, enforces EU law
          (&quot;guardian of the treaties&quot;). One Commissioner per member
          state. Headed by the Commission President. Seat: Brussels.
        </li>
        <li>
          <strong>European Parliament</strong>: Directly elected by EU citizens
          (705 MEPs). Co-legislator with the Council under the ordinary
          legislative procedure. Approves the budget. Seat: Strasbourg
          (plenary), Brussels (committees).
        </li>
        <li>
          <strong>Council of the EU</strong> (Council of Ministers): Composed of
          national ministers from each member state, varying by policy area.
          Co-legislator with Parliament. Rotating presidency every 6 months.
          Seat: Brussels.
        </li>
        <li>
          <strong>European Council</strong>: Summits of heads of
          state/government. Sets political direction and priorities. Does NOT
          have legislative power. Elects the Commission President. Seat:
          Brussels.
        </li>
        <li>
          <strong>Court of Justice of the EU (CJEU)</strong>: Ensures uniform
          interpretation and application of EU law. Can annul EU acts and rule
          on infringement proceedings against member states. Seat: Luxembourg.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Legislative Process</h3>
      <p>
        Most EU laws follow the <strong>ordinary legislative procedure</strong>:
        the Commission proposes → Parliament and Council co-decide (readings,
        trilogues) → adopted as regulation or directive. Regulations are
        directly applicable; directives require transposition into national law.
      </p>
    </div>
  ),
  questions: [
    {
      id: "eu-institutions-q1",
      type: "multiple-choice",
      prompt:
        "Which EU institution is responsible for proposing legislation and is known as the 'guardian of the treaties'?",
      options: [
        "European Parliament",
        "Council of the EU",
        "European Commission",
        "European Council",
      ],
      answer: "European Commission",
      explanation:
        "The European Commission has the sole right of legislative initiative (proposes laws), implements EU policies, manages the budget, and ensures member states comply with EU law — hence 'guardian of the treaties'.",
      difficulty: "recall",
    },
    {
      id: "eu-institutions-q2",
      type: "multiple-choice",
      prompt:
        "What is the key difference between the Council of the EU and the European Council?",
      options: [
        "They are the same institution with different names",
        "The Council of the EU is composed of national ministers and legislates; the European Council is composed of heads of state and sets political direction without legislative power",
        "The European Council legislates; the Council of the EU sets political direction",
        "Both are directly elected by EU citizens",
      ],
      answer:
        "The Council of the EU is composed of national ministers and legislates; the European Council is composed of heads of state and sets political direction without legislative power",
      explanation:
        "The Council of the EU (Council of Ministers) is where national ministers from each member state negotiate and adopt legislation. The European Council brings together heads of state/government to define the EU's political agenda but does not pass laws.",
      difficulty: "apply",
    },
    {
      id: "eu-institutions-q3",
      type: "explain-why",
      prompt:
        "What is the difference between an EU regulation and an EU directive?",
      answer:
        "An EU regulation is directly applicable in all member states without the need for national implementing legislation — it becomes law automatically. An EU directive sets objectives that member states must achieve but leaves the choice of form and methods to national authorities, requiring transposition into domestic law within a set deadline.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["un-system", "world-wars"],
  prerequisites: [],
};

export default note;
