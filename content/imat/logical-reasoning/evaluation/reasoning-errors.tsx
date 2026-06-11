import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "re-qf-1",
    question:
      '"Dr. Smith smokes, so his advice on lung cancer is worthless." What fallacy?',
    answer:
      "Ad hominem — attacking the person instead of engaging with their argument.",
    context: "Ad hominem",
  },
  {
    id: "re-qf-2",
    question:
      '"If we allow gene editing, we will create designer babies and destroy human nature." What fallacy?',
    answer:
      "Slippery slope — assumes a chain of dire consequences without evidence each step is inevitable.",
    context: "Slippery slope",
  },
  {
    id: "re-qf-3",
    question:
      '"Two patients had side effects from this vaccine, so it is dangerous for everyone." What fallacy?',
    answer:
      "Hasty generalisation — drawing a broad conclusion from a tiny sample (2 out of millions).",
    context: "Hasty generalisation",
  },
  {
    id: "re-qf-4",
    question: '"You are either with us or against us." What fallacy?',
    answer:
      "False dilemma — presenting only two options when more exist (e.g., neutral, partially agree, etc.).",
    context: "False dilemma",
  },
];

export const reasoningErrorsNote: AtomicNote = {
  slug: "reasoning-errors",
  subject: "logical-reasoning",
  topic: "evaluation",
  title: "Reasoning Errors (Logical Fallacies)",
  summary:
    "Logical fallacies are flaws in reasoning that make arguments invalid or unsound. IMAT tests your ability to identify common fallacies like ad hominem, straw man, false cause, and slippery slope.",
  memoryHook:
    '"Name the Trick" — each fallacy has a name. Once you can name it, you can spot it. Key: Ad Hominem (attack person), Straw Man (distort argument), Slippery Slope (chain of doom), False Cause (correlation does not equal causation).',
  imatTrap:
    "Not every weak argument is a named fallacy. Make sure the error matches a specific fallacy pattern. Ad hominem is only a fallacy when used to REJECT a claim — criticising character in other contexts may be relevant.",
  whyItMatters:
    "Recognising fallacies protects against manipulation in advertising, political rhetoric, and pseudoscience. In medicine, it prevents errors like assuming correlation implies causation.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Fallacy identification appears in nearly every IMAT LR section",
    },
    {
      years: [2021, 2024],
      frequency: "medium",
      notes: "False cause and ad hominem are the most tested",
    },
  ],
  workedExamples: [
    {
      id: "re-we-1",
      question:
        "After the new hospital opened, disease rates dropped. Therefore, the hospital caused the decrease. A student says this is a False Cause fallacy. Another student says it is a Hasty Generalisation. Who is correct? Explain the difference between these two fallacies using this example.",
      hints: [
        "What is the relationship between A (hospital opened) and B (disease rates dropped)?",
        "The argument assumes A caused B just because A came before B — which fallacy is this?",
        "Hasty generalisation would require drawing a broad conclusion from a small sample. Is that what is happening here?",
        "False cause = assuming causation from correlation/sequence. Hasty generalisation = small sample to broad conclusion.",
      ],
      solution: `The first student (False Cause) is correct. This is Post Hoc Ergo Propter Hoc ('after this, therefore because of this') — a subtype of False Cause. The argument assumes that because the hospital opening preceded the disease rate drop, the hospital caused the drop. Hasty Generalisation would require something like 'I saw two patients recover at the new hospital, therefore all patients recover there.' The difference: False Cause is about misattributed CAUSATION; Hasty Generalisation is about insufficient SAMPLING. The IMAT often includes two plausible-sounding fallacies — you must distinguish them precisely.`,
    },
    {
      id: "re-we-2",
      question:
        "Critics say we should reduce sugar consumption. But if we reduce sugar, we would have to ban cake, and then we would ban Christmas, and soon we would live in a joyless dictatorship. This argument contains TWO fallacies. Identify both and explain how they interact.",
      hints: [
        "Each step claims an increasingly extreme outcome without evidence — what is that?",
        "Is the critics' actual argument being accurately represented, or distorted?",
        'The original position is "reduce sugar." The response turns this into "ban cake, ban Christmas, dictatorship."',
        "One fallacy is about distortion, the other about unwarranted prediction chains.",
      ],
      solution:
        "This is BOTH a Straw Man and a Slippery Slope. Straw Man (primary): the critics' position (reduce sugar) is distorted into an extreme version (ban cake, ban Christmas) that is easier to attack. Slippery Slope (secondary): each claimed consequence (reduce sugar → ban cake → ban Christmas → dictatorship) is presented as inevitable without evidence linking the steps. They interact: the Straw Man sets up a ridiculous starting point, and the Slippery Slope exaggerates the chain from there. The strongest match is Straw Man, as the primary error is misrepresenting the original argument.",
    },
    {
      id: "re-we-3",
      question:
        "Dr. Rossi says: 'Based on my 30 years of clinical experience, this alternative medicine treatment works.' A patient says: 'But Dr. Rossi is not a researcher — his opinion does not prove the treatment works.' Who is committing a fallacy? Could it be both?",
      hints: [
        "Is Dr. Rossi using his authority as a clinician to support a scientific claim? What fallacy might that be?",
        "Is the patient dismissing Dr. Rossi's opinion because of his role, not the evidence?",
        "An Appeal to Authority is only a fallacy when the authority is outside their domain or when evidence is needed.",
        "Clinical experience is relevant evidence but is it sufficient to prove efficacy?",
      ],
      solution:
        "This is a subtle case. Dr. Rossi may be committing an Appeal to Authority if he claims his clinical experience alone proves efficacy (anecdotal experience is not the same as controlled evidence). However, clinical expertise is relevant — it is only a fallacy if he dismisses the need for controlled studies. The patient is NOT necessarily committing a fallacy — questioning whether authority alone suffices is valid reasoning. The real issue: both might miss that clinical experience generates hypotheses, but controlled trials test them. Neither argument is fallacy-free if they ignore the need for evidence.",
    },
  ],
  externalResources: [
    {
      title: "Your Logical Fallacy Is",
      url: "https://yourlogicalfallacyis.com/",
      type: "article",
      description:
        "Visual guide to common logical fallacies with memorable examples",
    },
    {
      title: "Logically Fallacious",
      url: "https://www.logicallyfallacious.com/",
      type: "article",
      description:
        "Extensive collection of fallacies with definitions and examples",
    },
    {
      title: "Khan Academy — LSAT Logical Reasoning",
      url: "https://www.khanacademy.org/test-prep/lsat",
      type: "practice",
      description: "Free LSAT prep with fallacy identification questions",
    },
    {
      title: "Critical Thinking Web — Fallacies",
      url: "https://philosophy.hku.hk/think/fallacy/",
      type: "article",
      description: "University of Hong Kong: fallacy recognition exercises",
    },
  ],
  highYieldPoints: [
    "Ad Hominem: attacks the person, not the argument",
    "Straw Man: misrepresents the argument to make it easier to attack",
    "Slippery Slope: chain of consequences without evidence between steps",
    "False Cause (Post Hoc): correlation does not mean causation",
    "Hasty Generalisation: sample too small or unrepresentative for the conclusion",
    "False Dilemma: only two options presented when more exist",
    "Appeal to Authority: expert cited outside their domain of expertise",
    "Not every bad argument is a named fallacy — check against specific patterns",
  ],
  explanation: (
    <div>
      <p>
        A <strong>logical fallacy</strong> is an error in reasoning that
        undermines an argument. Fallacies can be formal (structural errors) or
        informal (content errors).
      </p>

      <h3>Key Fallacies for IMAT</h3>
      <p>
        <strong>Ad Hominem:</strong> Attacking the person instead of their
        argument. "Dr. Smith smokes, so his advice on lung cancer is worthless."
      </p>
      <p>
        <strong>Straw Man:</strong> Distorting an opponent\'s argument. "She
        says we should fund public health, so she wants to defund hospitals."
      </p>
      <p>
        <strong>Slippery Slope:</strong> Claiming one event will inevitably lead
        to a chain of negative outcomes without evidence.
      </p>
      <p>
        <strong>False Cause (Post Hoc):</strong> Assuming B followed A, so A
        caused B. "I took this supplement and my cold disappeared — it cured
        me."
      </p>
      <p>
        <strong>Appeal to Authority:</strong> Claiming something is true because
        an authority says so, outside their expertise.
      </p>
      <p>
        <strong>Hasty Generalisation:</strong> Drawing a broad conclusion from
        too small a sample.
      </p>
      <p>
        <strong>False Dilemma:</strong> Presenting only two options when more
        exist.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 2)}
        title="Quick Check: Fallacy Identification"
      />

      <h3>Worked Example: Distinguishing Fallacies</h3>
      <WorkedExampleCard
        example={{
          id: "re-we-demo",
          question:
            "Classify each: (1) 'My doctor recommends this supplement, so it must work.' (2) 'You cannot trust anything that pharmaceutical company says because they once had a recall.' (3) 'Either we ban all screens for children, or we accept that they will be addicted for life.'",
          hints: [
            "(1) relies on a doctor's recommendation without evidence — which fallacy?",
            "(2) dismisses everything a company says based on one negative fact — what is that attacking?",
            "(3) gives only two extreme options with no middle ground — what fallacy ignores nuance?",
          ],
          solution:
            "(1) Appeal to Authority — the doctor's recommendation is treated as conclusive evidence. Doctors can be wrong, and even correct recommendations need supporting data. (2) Ad Hominem (tu quoque variation) — attacking the company's character/credibility to dismiss their claims, regardless of the merit of those claims. (3) False Dilemma — there are many options between 'ban all screens' and 'accept addiction,' such as time limits, content filters, educational screen use, etc.",
        }}
      />

      <QuickFire
        questions={quickFire.slice(2, 4)}
        title="Quick Check: More Fallacies"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Ad Hominem: attack the person, not the argument",
          "Straw Man: distort the argument to make it easier to attack",
          "Slippery Slope: chain of dire consequences without evidence",
          "False Cause (Post Hoc): correlation does not mean causation",
          "Hasty Generalisation: too small or unrepresentative sample",
          "False Dilemma: only two options when more exist",
          "Appeal to Authority: expert outside their domain",
        ].map((point) => (
          <div
            key={point}
            className="flex items-start gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-2 mb-1"
          >
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">{point}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  questions: [
    {
      id: "reasoning-errors-q1",
      type: "multiple-choice",
      prompt:
        "We should not listen to Professor Jones about nutrition because he is overweight. Which fallacy?",
      answer: "Ad hominem",
      explanation:
        "The argument attacks Professor Jones personally (his weight) rather than engaging with his nutritional arguments.",
      difficulty: "recall",
      options: ["Straw man", "Ad hominem", "Slippery slope", "False cause"],
    },
    {
      id: "reasoning-errors-q2",
      type: "multiple-choice",
      prompt:
        "After the new hospital opened, disease rates dropped. Therefore, the hospital caused the decrease. Which fallacy?",
      answer: "False cause (post hoc)",
      explanation:
        "The argument assumes causation from temporal sequence alone. Other factors could explain the drop.",
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
      type: "multiple-choice",
      prompt:
        "If we allow calculators in exams, students will use AI, stop learning, and medical standards will collapse. Which fallacy?",
      answer: "Slippery slope",
      explanation:
        "A chain of increasingly dire consequences is claimed without evidence that each step is inevitable.",
      difficulty: "apply",
      options: ["Straw man", "Slippery slope", "False cause", "Ad hominem"],
    },
    {
      id: "reasoning-errors-q4",
      type: "explain-why",
      prompt:
        "Two of my friends had side effects from the vaccine — it is dangerous for everyone. Identify the fallacy.",
      answer:
        "Hasty generalisation — drawing a broad conclusion (dangerous for everyone) from an extremely small sample (two friends).",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "drawing-conclusion",
    "assumptions",
    "additional-evidence",
    "matching-arguments",
  ],
  prerequisites: ["main-conclusion", "premises"],
};
