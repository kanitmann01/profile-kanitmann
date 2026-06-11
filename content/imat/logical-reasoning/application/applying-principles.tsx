import type { AtomicNote } from "@/data/imat/types";

const applyingPrinciplesNote: AtomicNote = {
  slug: "applying-principles",
  subject: "logical-reasoning",
  topic: "application",
  title: "Applying Principles",
  summary:
    "These questions give you a general principle or rule and ask you to apply it to a specific case. The correct answer follows directly from the principle, even if it seems counterintuitive.",
  memoryHook:
    '"Rule First, Feelings Later" — accept the principle as given (even if you disagree with it) and apply it mechanically. Your personal opinion about the principle is irrelevant.',
  imatTrap:
    "Do not substitute your own principles for the one given. The question tests whether you can apply THE GIVEN rule, not whether you agree with it. Also watch for answer choices that follow a SIMILAR but not identical principle.",
  whyItMatters:
    "Medical ethics requires applying established principles (autonomy, beneficence, non-maleficence, justice) to specific cases. A doctor must apply guidelines consistently, even when personal feelings suggest otherwise.",
  explanation: (
    <div>
      <p>
        &quot;Applying principles&quot; questions present a{" "}
        <strong>general rule</strong> and ask which specific scenario follows
        from it (or violates it). This tests your ability to move from abstract
        to concrete.
      </p>
      <h3>Strategy</h3>
      <ol>
        <li>
          <strong>State the principle clearly:</strong> Rewrite it in your own
          words to ensure you understand the conditions and the consequence.
        </li>
        <li>
          <strong>Identify the conditions:</strong> What must be true for the
          principle to apply? (e.g., &quot;If a patient is competent AND refuses
          treatment...&quot;)
        </li>
        <li>
          <strong>Check each answer:</strong> Does the scenario meet ALL the
          conditions? If yes, does the stated consequence follow?
        </li>
        <li>
          <strong>Eliminate near-misses:</strong> Answers that meet some but not
          all conditions are traps.
        </li>
      </ol>
      <h3>Example</h3>
      <p>
        Principle: &quot;A treatment should only be given if its benefits
        outweigh its risks.&quot;
      </p>
      <p>
        Application: A drug with serious side effects should NOT be prescribed
        for a mild, self-limiting condition — because the risks outweigh the
        benefits for a condition that resolves on its own.
      </p>
    </div>
  ),
  questions: [
    {
      id: "applying-principles-q1",
      type: "multiple-choice",
      prompt:
        'Principle: "A person should not be held responsible for actions they could not control." Which scenario VIOLATES this principle?',
      answer: "A sleepwalker is prosecuted for damage caused while asleep",
      explanation:
        "Sleepwalking is involuntary — the person cannot control their actions while asleep. Prosecuting them violates the principle that people should not be held responsible for uncontrollable actions.",
      difficulty: "apply",
      options: [
        "A sober driver is fined for speeding",
        "A sleepwalker is prosecuted for damage caused while asleep",
        "A student is praised for studying hard",
        "A company is taxed for its profits",
      ],
    },
    {
      id: "applying-principles-q2",
      type: "multiple-choice",
      prompt:
        "When applying a given principle, what should you do if the principle conflicts with your personal beliefs?",
      answer:
        "Apply the given principle as stated, regardless of personal beliefs",
      explanation:
        "The question tests your ability to apply THE GIVEN rule. Your personal agreement or disagreement is irrelevant. Substitute your own principle and you will choose the wrong answer.",
      difficulty: "recall",
      options: [
        "Reject the principle and use your own",
        "Apply the given principle as stated, regardless of personal beliefs",
        "Choose the answer that matches both the principle and your beliefs",
        "Skip the question",
      ],
    },
    {
      id: "applying-principles-q3",
      type: "explain-why",
      prompt:
        'Principle: "Informed consent requires that the patient understands the risks, benefits, and alternatives." Explain why a surgeon operating on a patient who only signed a form without discussion violates this principle.',
      answer:
        "Signing a form alone does not guarantee understanding. The principle requires the patient to actually understand risks, benefits, and alternatives — not merely to sign a document. Without discussion, the surgeon cannot verify comprehension, so the principle's conditions are not met.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["matching-arguments", "reasoning-errors", "drawing-conclusion"],
  prerequisites: ["main-conclusion", "premises"],
};

export default applyingPrinciplesNote;
