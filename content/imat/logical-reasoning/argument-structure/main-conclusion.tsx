import type { AtomicNote } from "@/data/imat/types";

const mainConclusionNote: AtomicNote = {
  slug: "main-conclusion",
  subject: "logical-reasoning",
  topic: "argument-structure",
  title: "Identifying the Main Conclusion",
  summary:
    "The main conclusion is the central claim an author is trying to prove. It is supported by premises but does not itself support another statement within the argument.",
  memoryHook:
    '"Therefore Test" — insert "therefore" before a sentence. If it makes sense as the final point the author is driving at, you have found the conclusion.',
  imatTrap:
    "Do not confuse a restatement of a premise with the conclusion. The conclusion is never the evidence — it is what the evidence points to. Watch for conclusion indicators: therefore, thus, hence, so, it follows that, consequently.",
  whyItMatters:
    "In medical practice, identifying the main conclusion of a research paper's argument is essential for evidence-based decision-making. Lawyers, journalists, and policymakers must all separate claims from supporting evidence daily.",
  explanation: (
    <div>
      <p>
        Every argument has a <strong>conclusion</strong> — the main point the
        author wants you to accept — and <strong>premises</strong> — the reasons
        given to support it.
      </p>
      <h3>How to Find the Main Conclusion</h3>
      <ul>
        <li>
          <strong>Look for indicator words:</strong> therefore, thus, hence, so,
          it follows that, consequently, we can conclude that.
        </li>
        <li>
          <strong>Apply the "Therefore" test:</strong> Try placing
          &quot;therefore&quot; before each statement. The one that works best
          as the final takeaway is the conclusion.
        </li>
        <li>
          <strong>Ask "Why?":</strong> For each statement, ask &quot;Why should
          I believe this?&quot; If the answer is another statement in the
          passage, the first statement is likely the conclusion.
        </li>
        <li>
          <strong>Eliminate premises:</strong> If a statement is used to support
          another statement, it is a premise, not the conclusion.
        </li>
      </ul>
      <h3>Example</h3>
      <p>
        &quot;Studies show that students who sleep at least 7 hours perform
        better on exams. Marco sleeps only 5 hours on school nights.{" "}
        <strong>
          Therefore, Marco is likely underperforming on his exams due to sleep
          deprivation.
        </strong>
        &quot;
      </p>
      <p>
        The final sentence is the conclusion — the other two sentences are
        premises supporting it.
      </p>
    </div>
  ),
  questions: [
    {
      id: "main-conclusion-q1",
      type: "multiple-choice",
      prompt:
        'Read the argument: "All mammals have a neocortex. Humans are mammals. Therefore, humans have a neocortex." What is the main conclusion?',
      answer: "Humans have a neocortex",
      explanation:
        'The word "therefore" signals the conclusion. The first two statements are premises supporting this claim.',
      difficulty: "recall",
      options: [
        "All mammals have a neocortex",
        "Humans are mammals",
        "Humans have a neocortex",
        "Mammals are humans",
      ],
    },
    {
      id: "main-conclusion-q2",
      type: "multiple-choice",
      prompt: "Which of the following is a conclusion indicator word?",
      answer: "Consequently",
      explanation:
        '"Consequently" signals that what follows is a conclusion drawn from prior premises. Other indicators include therefore, thus, hence, and so.',
      difficulty: "recall",
      options: ["Because", "Since", "Consequently", "Given that"],
    },
    {
      id: "main-conclusion-q3",
      type: "explain-why",
      prompt:
        'In the argument "Since the patient has a fever and elevated white blood cell count, she likely has an infection," identify the conclusion and explain how you know.',
      answer:
        'The conclusion is "she likely has an infection." The word "since" introduces the premises (fever and elevated WBC), which support the conclusion about infection.',
      difficulty: "apply",
    },
  ],
  crosslinks: ["premises", "drawing-conclusion", "assumptions"],
  prerequisites: [],
};

export default mainConclusionNote;
