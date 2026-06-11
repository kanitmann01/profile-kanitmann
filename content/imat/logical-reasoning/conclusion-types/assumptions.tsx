import type { AtomicNote } from "@/data/imat/types";

const assumptionsNote: AtomicNote = {
  slug: "assumptions",
  subject: "logical-reasoning",
  topic: "conclusion-types",
  title: "Identifying Assumptions",
  summary:
    "Assumptions are unstated premises that are necessary for the argument to work. Without them, the conclusion does not follow from the stated premises.",
  memoryHook:
    '"The Missing Link" — an assumption is the invisible bridge between the stated evidence and the conclusion. If you remove the bridge, the argument collapses.',
  imatTrap:
    "Do not confuse a sufficient assumption (one that guarantees the conclusion) with a necessary assumption (one that MUST be true for the argument to work). IMAT usually asks for necessary assumptions — the minimum the author must believe.",
  whyItMatters:
    "In evidence-based medicine, identifying hidden assumptions in research is crucial. A study may assume its sample is representative, that confounders are controlled, or that correlation implies causation.",
  explanation: (
    <div>
      <p>
        An <strong>assumption</strong> is an unstated premise — something the
        author takes for granted but does not explicitly say. Every argument has
        assumptions; finding them is key to evaluating the argument&apos;s
        strength.
      </p>
      <h3>The Negation Test</h3>
      <p>
        To check if something is a <strong>necessary</strong> assumption, negate
        it. If the negation destroys the argument, it is a necessary assumption.
      </p>
      <ul>
        <li>
          Argument: &quot;This drug worked in trials, so it will work in
          clinical practice.&quot;
        </li>
        <li>
          Assumption: &quot;Trial conditions are similar enough to clinical
          practice.&quot;
        </li>
        <li>
          Negation: &quot;Trial conditions are NOT similar to clinical
          practice.&quot; → The argument collapses.
        </li>
      </ul>
      <h3>Common IMAT Assumption Types</h3>
      <ul>
        <li>
          <strong>Causation from correlation:</strong> Assumes no other factor
          explains the relationship.
        </li>
        <li>
          <strong>Generalisation:</strong> Assumes the sample is representative
          of the population.
        </li>
        <li>
          <strong>Analogy:</strong> Assumes two things are similar in relevant
          respects.
        </li>
        <li>
          <strong>Future prediction:</strong> Assumes current trends will
          continue.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "assumptions-q1",
      type: "multiple-choice",
      prompt:
        "A study finds that students who eat breakfast score higher on tests. The author concludes that eating breakfast causes better performance. What is the key assumption?",
      answer:
        "No other factor (like sleep or socioeconomic status) explains both breakfast-eating and higher scores",
      explanation:
        "The argument assumes causation from correlation. It must assume that the correlation is not explained by a confounding variable.",
      difficulty: "apply",
      options: [
        "All students eat breakfast",
        "No other factor explains both breakfast-eating and higher scores",
        "Test scores are the only measure of performance",
        "Breakfast is the cheapest meal",
      ],
    },
    {
      id: "assumptions-q2",
      type: "multiple-choice",
      prompt:
        "Using the negation test, if negating a statement makes the argument fall apart, that statement is a:",
      answer: "Necessary assumption",
      explanation:
        "The negation test identifies necessary assumptions — statements that MUST be true for the argument to hold. If the negation does not destroy the argument, the statement was not a necessary assumption.",
      difficulty: "recall",
      options: [
        "Main conclusion",
        "Sufficient assumption",
        "Necessary assumption",
        "Supporting premise",
      ],
    },
    {
      id: "assumptions-q3",
      type: "explain-why",
      prompt:
        '"Hospital A has a lower mortality rate than Hospital B, so Hospital A provides better care." Identify the argument\'s assumption and apply the negation test.',
      answer:
        "The assumption is that patient populations are comparable (case mix). Negation: 'Hospital A and B have very different patient populations (e.g., A treats younger, healthier patients).' If true, the lower mortality rate could be due to patient differences, not quality of care — destroying the argument.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "main-conclusion",
    "premises",
    "additional-evidence",
    "reasoning-errors",
  ],
  prerequisites: ["main-conclusion", "premises"],
};

export default assumptionsNote;
