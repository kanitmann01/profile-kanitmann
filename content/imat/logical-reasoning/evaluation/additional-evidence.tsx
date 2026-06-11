import type { AtomicNote } from "@/data/imat/types";

const additionalEvidenceNote: AtomicNote = {
  slug: "additional-evidence",
  subject: "logical-reasoning",
  topic: "evaluation",
  title: "Additional Evidence (Strengthen/Weaken)",
  summary:
    "These questions ask what new information would strengthen or weaken an argument. The correct answer directly affects the link between premises and conclusion.",
  memoryHook:
    '"Bridge Builder vs. Bridge Wrecker" — strengthening evidence reinforces the assumption bridge; weakening evidence attacks it. Always ask: does this affect the LOGIC or just add background?',
  imatTrap:
    "Irrelevant information that sounds impressive is the most common trap. A fact about the topic is not the same as evidence that strengthens or weakens the specific argument being made.",
  whyItMatters:
    "Clinicians constantly evaluate new evidence — a new study, a patient&apos;s additional symptom, a novel treatment option. Knowing what counts as relevant evidence is the foundation of critical appraisal.",
  explanation: (
    <div>
      <p>
        &quot;Additional evidence&quot; questions test your ability to evaluate
        arguments by introducing new information. You must determine whether the
        new information <strong>strengthens</strong> or <strong>weakens</strong>{" "}
        the argument.
      </p>
      <h3>Strategy for Strengthen Questions</h3>
      <ul>
        <li>Identify the conclusion and the key assumption.</li>
        <li>
          Look for an answer that <strong>supports the assumption</strong> or
          provides additional evidence for the conclusion.
        </li>
        <li>
          The best strengtheners make the conclusion <em>more likely</em> to
          follow from the premises.
        </li>
      </ul>
      <h3>Strategy for Weaken Questions</h3>
      <ul>
        <li>Identify the conclusion and the key assumption.</li>
        <li>
          Look for an answer that <strong>attacks the assumption</strong>,
          introduces an <strong>alternative explanation</strong>, or shows the
          premises do not guarantee the conclusion.
        </li>
        <li>
          The best weakeners create <strong>doubt</strong> about the link
          between evidence and conclusion.
        </li>
      </ul>
      <h3>Example — Weaken</h3>
      <p>
        Argument: &quot;City A built more bike lanes, and cycling increased.
        Therefore, building bike lanes causes more cycling.&quot;
      </p>
      <p>
        Weakener: &quot;City A also launched a public health campaign promoting
        cycling at the same time.&quot; — This introduces an alternative cause.
      </p>
    </div>
  ),
  questions: [
    {
      id: "additional-evidence-q1",
      type: "multiple-choice",
      prompt:
        'Argument: "Patients who take Drug X recover faster, so Drug X is effective." Which would MOST strengthen this argument?',
      answer:
        "A controlled trial showed Drug X patients recovered faster than placebo patients",
      explanation:
        "A controlled trial eliminates the alternative explanation that patients might have recovered anyway. This directly supports the causal claim.",
      difficulty: "apply",
      options: [
        "Drug X is expensive",
        "A controlled trial showed Drug X patients recovered faster than placebo patients",
        "Some patients prefer Drug X over other treatments",
        "Drug X has been on the market for 10 years",
      ],
    },
    {
      id: "additional-evidence-q2",
      type: "multiple-choice",
      prompt:
        'Argument: "The school introduced tutoring, and test scores improved. Therefore, tutoring caused the improvement." Which would MOST weaken this argument?',
      answer:
        "The school also reduced class sizes and hired more teachers in the same year",
      explanation:
        "This introduces alternative explanations for the score improvement, undermining the claim that tutoring alone caused it.",
      difficulty: "apply",
      options: [
        "The tutoring programme was well-attended",
        "Test scores had been declining for years before the tutoring",
        "The school also reduced class sizes and hired more teachers in the same year",
        "Students enjoyed the tutoring sessions",
      ],
    },
    {
      id: "additional-evidence-q3",
      type: "explain-why",
      prompt:
        'Explain why "Many people who take Vitamin C do not get colds" does NOT strengthen the argument "Vitamin C prevents colds."',
      answer:
        "This is anecdotal and lacks a control group. Many people who do NOT take Vitamin C also do not get colds. Without comparing rates between Vitamin C users and non-users, we cannot assess whether Vitamin C makes a difference. Correlation without comparison is not evidence.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["assumptions", "reasoning-errors", "premises"],
  prerequisites: ["main-conclusion", "premises", "assumptions"],
};

export default additionalEvidenceNote;
