import type { AtomicNote } from "@/data/imat/types";

const matchingArgumentsNote: AtomicNote = {
  slug: "matching-arguments",
  subject: "logical-reasoning",
  topic: "application",
  title: "Matching Arguments (Parallel Reasoning)",
  summary:
    "These questions ask you to find an argument with the same logical structure as the given one. You must abstract the reasoning pattern and match it, ignoring the surface topic.",
  memoryHook:
    '"Strip the Skin, Keep the Bones" — remove the topic-specific content and look at the logical skeleton. If two arguments share the same structure (e.g., All A are B; X is A; therefore X is B), they are parallel.',
  imatTrap:
    "Do not match by topic or content — match by STRUCTURE. Two arguments about medicine are not parallel just because they share a subject. The logical form must be identical, including the direction of reasoning and quantifiers (all/some/none).",
  whyItMatters:
    "Pattern recognition across domains is a core medical skill. A diagnostic reasoning pattern in cardiology may mirror one in neurology. Recognising structural similarity helps transfer knowledge between fields.",
  explanation: (
    <div>
      <p>
        &quot;Matching arguments&quot; questions present an argument and ask you
        to find another argument with the{" "}
        <strong>same logical structure</strong>. The content will differ, but
        the reasoning pattern must be identical.
      </p>
      <h3>Step-by-Step Strategy</h3>
      <ol>
        <li>
          <strong>Identify the structure:</strong> Label the parts — premises,
          conclusion, and the relationship between them.
        </li>
        <li>
          <strong>Abstract the pattern:</strong> Replace specific content with
          variables (A, B, C). For example: &quot;All A are B. X is A. Therefore
          X is B.&quot;
        </li>
        <li>
          <strong>Match each answer choice:</strong> Apply the same abstraction
          to each option. The one with the identical pattern is correct.
        </li>
        <li>
          <strong>Check quantifiers:</strong> &quot;All&quot; vs.
          &quot;some&quot; vs. &quot;no&quot; changes the structure.
        </li>
      </ol>
      <h3>Example</h3>
      <p>
        Original: &quot;All surgeons have steady hands. Dr. Lee is a surgeon.
        Therefore, Dr. Lee has steady hands.&quot;
      </p>
      <p>Structure: All A are B. X is A. Therefore X is B.</p>
      <p>
        Match: &quot;All mammals are warm-blooded. A whale is a mammal.
        Therefore, a whale is warm-blooded.&quot; — Same structure.
      </p>
    </div>
  ),
  questions: [
    {
      id: "matching-arguments-q1",
      type: "multiple-choice",
      prompt:
        'Which argument has the SAME structure as: "All nurses wear scrubs. Maria wears scrubs. Therefore, Maria is a nurse."',
      answer: '"All cats have fur. Fido has fur. Therefore, Fido is a cat."',
      explanation:
        "Both arguments share the invalid structure: All A are B. X is B. Therefore X is A. This is the fallacy of affirming the consequent. The matching argument must have the same flaw.",
      difficulty: "apply",
      options: [
        '"All cats have four legs. My dog has four legs. Therefore, my dog is a cat."',
        '"All cats have fur. Fido has fur. Therefore, Fido is a cat."',
        '"All cats are animals. Fido is an animal. Therefore, Fido is a cat."',
        '"Some cats are black. Fido is black. Therefore, Fido is a cat."',
      ],
    },
    {
      id: "matching-arguments-q2",
      type: "multiple-choice",
      prompt:
        "What is the FIRST step in solving a parallel reasoning question?",
      answer:
        "Identify and abstract the logical structure of the original argument",
      explanation:
        "Before comparing answer choices, you must understand the original argument's logical skeleton. Without this, you will be distracted by surface-level similarities in the answer options.",
      difficulty: "recall",
      options: [
        "Read all answer choices quickly",
        "Identify and abstract the logical structure of the original argument",
        "Eliminate choices about different topics",
        "Look for the same conclusion in the answer choices",
      ],
    },
    {
      id: "matching-arguments-q3",
      type: "explain-why",
      prompt:
        "Explain why matching arguments by topic instead of structure leads to wrong answers, with an example.",
      answer:
        "Two arguments can share a topic but have completely different logical structures. For example, 'All doctors study anatomy' (All A are B) and 'Some doctors play sports' (Some A are B) are both about doctors but have different logical forms. Matching by topic ignores the reasoning pattern, which is what the question tests.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["main-conclusion", "premises", "applying-principles"],
  prerequisites: ["main-conclusion", "premises"],
};

export default matchingArgumentsNote;
