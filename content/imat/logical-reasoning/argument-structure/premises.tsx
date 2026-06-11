import type { AtomicNote } from "@/data/imat/types";

const premisesNote: AtomicNote = {
  slug: "premises",
  subject: "logical-reasoning",
  topic: "argument-structure",
  title: "Identifying Premises",
  summary:
    "Premises are the evidence, reasons, or data that support the conclusion. They answer the question 'Why should I believe the conclusion?'",
  memoryHook:
    '"Because Bridge" — premises are what the conclusion rests ON. If you can put "because" between a premise and the conclusion and it makes sense, you have identified a premise.',
  imatTrap:
    "Background information and context are NOT premises. A premise must actively support the conclusion. Do not mistake a counter-argument or concession for a premise supporting the main conclusion.",
  whyItMatters:
    "In clinical diagnosis, premises are the symptoms, lab results, and patient history that support a diagnosis (the conclusion). Identifying weak premises helps avoid misdiagnosis.",
  explanation: (
    <div>
      <p>
        <strong>Premises</strong> are the building blocks of an argument — the
        statements that provide evidence or reasons to accept the conclusion.
      </p>
      <h3>How to Identify Premises</h3>
      <ul>
        <li>
          <strong>Look for premise indicators:</strong> because, since, given
          that, for, as, inasmuch as, due to the fact that.
        </li>
        <li>
          <strong>Ask "Why?":</strong> Once you have identified the conclusion,
          ask &quot;Why does the author believe this?&quot; The answers are the
          premises.
        </li>
        <li>
          <strong>Apply the "Because" test:</strong> &quot;[Conclusion] because
          [premise].&quot; If it reads naturally, you have correctly identified
          the premise.
        </li>
      </ul>
      <h3>Types of Premises</h3>
      <ul>
        <li>
          <strong>Factual premises:</strong> verifiable data, statistics,
          observations (e.g., &quot;The patient&apos;s temperature is
          39°C&quot;).
        </li>
        <li>
          <strong>Value premises:</strong> normative claims about what ought to
          be (e.g., &quot;Patient autonomy should be respected&quot;).
        </li>
        <li>
          <strong>Assumption premises:</strong> unstated beliefs necessary for
          the argument to work (see: assumptions).
        </li>
      </ul>
      <h3>Example</h3>
      <p>
        &quot;<strong>Because</strong> the new drug reduced tumour size by 40%
        in trials, and <strong>since</strong> it had fewer side effects than
        chemotherapy, <strong>we should consider</strong> it as a first-line
        treatment.&quot;
      </p>
      <p>
        Two premises: (1) reduced tumour size by 40%, (2) fewer side effects.
        Conclusion: it should be considered as first-line treatment.
      </p>
    </div>
  ),
  questions: [
    {
      id: "premises-q1",
      type: "multiple-choice",
      prompt:
        'In the argument "Since regular exercise reduces stress and improves sleep quality, doctors should recommend exercise to patients with insomnia," how many explicit premises are there?',
      answer: "2",
      explanation:
        "There are two premises: (1) regular exercise reduces stress, and (2) regular exercise improves sleep quality. These support the conclusion that doctors should recommend exercise.",
      difficulty: "apply",
      options: ["1", "2", "3", "4"],
    },
    {
      id: "premises-q2",
      type: "multiple-choice",
      prompt: "Which of the following is a premise indicator?",
      answer: "Given that",
      explanation:
        '"Given that" introduces a premise. "Therefore," "thus," and "hence" are conclusion indicators.',
      difficulty: "recall",
      options: ["Therefore", "Thus", "Given that", "Hence"],
    },
    {
      id: "premises-q3",
      type: "explain-why",
      prompt:
        "Explain the difference between a factual premise and a value premise, using a medical ethics example.",
      answer:
        "A factual premise states verifiable data (e.g., 'The treatment has a 90% success rate'). A value premise makes a normative claim (e.g., 'Patients deserve the best chance of recovery'). Both can support the same conclusion but operate differently in an argument.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["main-conclusion", "assumptions", "additional-evidence"],
  prerequisites: ["main-conclusion"],
};

export default premisesNote;
