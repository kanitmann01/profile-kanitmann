import type { AtomicNote } from "@/data/imat/types";

const reasoningErrorsNote: AtomicNote = {
  slug: "reasoning-errors",
  subject: "logical-reasoning",
  topic: "evaluation",
  title: "Reasoning Errors (Logical Fallacies)",
  summary:
    "Logical fallacies are flaws in reasoning that make arguments invalid or unsound. IMAT tests your ability to identify common fallacies like ad hominem, straw man, slippery slope, and false cause.",
  memoryHook:
    '"Name the Trick" — each fallacy has a name. Once you can name it, you can spot it. Key fallacies: Ad Hominem (attack the person), Straw Man (distort the argument), Slippery Slope (chain of doom), False Cause (correlation ≠ causation).',
  imatTrap:
    "Not every weak argument is a named fallacy. Make sure the reasoning error matches a specific fallacy pattern. Also, an ad hominem is only a fallacy when used to REJECT a claim — criticising a person&apos;s character in other contexts may be relevant.",
  whyItMatters:
    "Recognising fallacies protects you from manipulation in advertising, political rhetoric, and pseudoscience. In medicine, it prevents errors like assuming correlation implies causation in clinical observations.",
  explanation: (
    <div>
      <p>
        A <strong>logical fallacy</strong> is an error in reasoning that
        undermines the logic of an argument. Fallacies can be formal (structural
        errors) or informal (content errors).
      </p>
      <h3>Key Fallacies for IMAT</h3>
      <ul>
        <li>
          <strong>Ad Hominem:</strong> Attacking the person instead of their
          argument. &quot;Dr. Smith smokes, so his advice on lung cancer is
          worthless.&quot;
        </li>
        <li>
          <strong>Straw Man:</strong> Distorting an opponent&apos;s argument to
          make it easier to attack. &quot;She says we should fund public health,
          so she wants to defund hospitals.&quot;
        </li>
        <li>
          <strong>Slippery Slope:</strong> Claiming one event will inevitably
          lead to a chain of negative outcomes without evidence. &quot;If we
          allow gene editing, we will create designer babies and destroy human
          nature.&quot;
        </li>
        <li>
          <strong>False Cause (Post Hoc):</strong> Assuming that because B
          followed A, A caused B. &quot;I took this supplement and my cold
          disappeared — the supplement cured me.&quot;
        </li>
        <li>
          <strong>Appeal to Authority:</strong> Claiming something is true
          because an authority figure says so, outside their expertise.
          &quot;The Nobel laureate says this diet works, so it must.&quot;
        </li>
        <li>
          <strong>Hasty Generalisation:</strong> Drawing a broad conclusion from
          a small or unrepresentative sample. &quot;Two of my friends had side
          effects from the vaccine — it is dangerous for everyone.&quot;
        </li>
        <li>
          <strong>False Dilemma:</strong> Presenting only two options when more
          exist. &quot;Either we ban all cars or accept climate change.&quot;
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "reasoning-errors-q1",
      type: "multiple-choice",
      prompt:
        '"We should not listen to Professor Jones about nutrition because he is overweight." This is an example of which fallacy?',
      answer: "Ad hominem",
      explanation:
        "The argument attacks Professor Jones personally (his weight) rather than engaging with his nutritional arguments. This is a classic ad hominem fallacy.",
      difficulty: "recall",
      options: ["Straw man", "Ad hominem", "Slippery slope", "False cause"],
    },
    {
      id: "reasoning-errors-q2",
      type: "multiple-choice",
      prompt:
        '"After the new hospital opened, disease rates dropped. Therefore, the hospital caused the decrease." What fallacy is this?',
      answer: "False cause (post hoc)",
      explanation:
        "The argument assumes causation from temporal sequence alone. Disease rates may have dropped for other reasons (improved sanitation, vaccination campaigns, etc.).",
      difficulty: "apply",
      options: [
        "Hasty generalisation",
        "False cause (post hoc)",
        "Appeal to authority",
        "False dilemma",
      ],
    },
    {
      id: "reasoning-errors-q3",
      type: "explain-why",
      prompt:
        'Identify the fallacy: "If we allow students to use calculators in exams, next they will want to use AI, then they will stop learning entirely, and medical standards will collapse."',
      answer:
        "This is a slippery slope fallacy. It claims a chain of increasingly dire consequences without providing evidence that each step is inevitable. The argument fails to show why allowing calculators would necessarily lead to each subsequent outcome.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["drawing-conclusion", "assumptions", "additional-evidence"],
  prerequisites: ["main-conclusion", "premises"],
};

export default reasoningErrorsNote;
