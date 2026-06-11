"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "What is homeostasis?",
    answer:
      "The maintenance of a stable internal environment despite external changes",
    context: "Dynamic equilibrium",
  },
  {
    id: "qf-2",
    question: "What are the three components of a negative feedback loop?",
    answer: "Receptor (sensor), control centre (integrator), effector",
    context: "Reflex arc structure",
  },
  {
    id: "qf-3",
    question: "Is childbirth an example of positive or negative feedback?",
    answer: "Positive feedback — oxytocin release amplifies contractions",
    context: "Self-amplifying cycle",
  },
];

export const homeostasisNote: AtomicNote = {
  slug: "homeostasis",
  subject: "biology",
  topic: "anatomy-and-physiology",
  title: "Homeostasis",
  summary:
    "The maintenance of a stable internal environment via feedback mechanisms. Negative feedback reverses deviations (e.g., thermoregulation, blood glucose). Positive feedback amplifies them (e.g., childbirth, blood clotting). The nervous and endocrine systems are the major control systems.",
  memoryHook:
    "Negative feedback = 'reverse the change' (most common). Positive feedback = 'amplify the change' (rare, but dramatic). Think: thermostat (negative) vs childbirth contractions (positive).",
  imatTrap:
    "Homeostasis does NOT mean 'no change' — it means dynamic equilibrium within a narrow range. Blood glucose oscillates between 4–6 mM, body temp ~37°C ± 0.5°C. Also: positive feedback is NORMAL for some processes (childbirth, lactation, clotting) — it is NOT always pathological. The trap is viewing positive feedback only as a loss of homeostasis.",
  whyItMatters:
    "Failure of homeostasis underlies most diseases: diabetes (blood glucose), hypertension (blood pressure), hypothermia/hyperthermia (temperature), dehydration (fluid balance). Understanding feedback is the basis for clinical interventions: insulin therapy, antipyretics, intravenous fluids.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Negative vs positive feedback — identify examples",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes:
        "Components of a feedback loop (receptor, control centre, effector)",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Thermoregulation as a model system",
    },
  ],
  equations: [
    {
      id: "homeo-glucose-range",
      latex: "[\\text{Glucose}]_{normal} \\approx 4.0\\! -\\! 6.0\\ \\text{mM}",
      description: "Normal fasting blood glucose range",
    },
    {
      id: "homeo-temp-range",
      latex: "T_{core} \\approx 37 \\pm 0.5^\\circ C",
      description: "Normal core body temperature range",
    },
    {
      id: "homeo-ph-range",
      latex: "pH_{blood} \\approx 7.35\\! -\\! 7.45",
      description: "Normal arterial blood pH range",
    },
  ],
  workedExamples: [
    {
      id: "homeo-worked-1",
      question:
        "After a large carbohydrate meal, blood glucose rises to 8 mM. Describe the negative feedback mechanisms that restore it to normal range.",
      hints: [
        "Which organ detects the change and which hormone does it release?",
        "What effect does this hormone have on target cells?",
        "How does the corrective signal stop when glucose returns to normal?",
      ],
      solution:
        "1) Pancreatic β-cells detect elevated blood glucose. 2) They release insulin. 3) Insulin signals muscle, liver, and adipose cells to increase glucose uptake (GLUT4 translocation) and stimulates liver glycogenesis. 4) Blood glucose falls. 5) As glucose approaches normal, insulin secretion decreases (negative feedback — the response reverses the stimulus). The system is off when glucose is back to ~5 mM. This is a classic IMAT essay-style question.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Homeostasis",
      url: "https://www.khanacademy.org/science/biology/principles-of-physiology/body-structure-and-homeostasis/a/homeostasis",
      type: "article",
      description: "Clear explanation of feedback mechanisms",
    },
    {
      title: "OpenStax Anatomy & Physiology — Homeostasis",
      url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-5-homeostasis",
      type: "textbook",
      description: "Detailed textbook chapter on feedback systems",
    },
    {
      title: "IMAT Buddy — Physiology Questions",
      url: "https://www.imatbuddy.com/imat-science-question-banks/",
      type: "practice",
      description: "IMAT-style homeostasis and feedback questions",
    },
  ],
  highYieldPoints: [
    "Homeostasis = dynamic equilibrium within a narrow physiological range",
    "Negative feedback: reverses deviation — most common (temp, glucose, pH, BP)",
    "Positive feedback: amplifies deviation — oxytocin (childbirth), platelet plug (clotting), action potentials",
    "Components: receptor (detects), control centre (compares to set point), effector (makes the change)",
    "Pancreas: β-cells release insulin (high glucose), α-cells release glucagon (low glucose) — antagonistic hormones",
    "Thermoregulation: hypothalamus is the control centre — vasodilation/sweating (cool) vs vasoconstriction/shivering (warm)",
    "Fever: positive feedback on pyrogens resetting the hypothalamic set point upward",
  ],
  explanation: (
    <div>
      <p>
        <strong>Homeostasis</strong> is the process by which the body maintains
        a stable internal environment within narrow physiological ranges. It is
        essential for optimal enzyme function, cellular metabolism, and
        survival. The two major control systems are the{" "}
        <strong>nervous system</strong> and the{" "}
        <strong>endocrine system</strong>.
      </p>

      <h3>Feedback Loops</h3>
      <p>
        The basic feedback loop has three components:
        <strong>Receptor</strong> (detects the change) →{" "}
        <strong>Control centre</strong> (compares to set point) →{" "}
        <strong>Effector</strong> (produces the response).
      </p>

      <h4>Negative Feedback</h4>
      <p>
        The <strong>response reverses the stimulus</strong>. This is the most
        common type, used for:
      </p>
      <ul>
        <li>Blood glucose (insulin lowers glucose, glucagon raises it)</li>
        <li>Body temperature (sweating cools, shivering warms)</li>
        <li>Blood pressure (baroreceptors → heart rate adjustment)</li>
        <li>Blood pH (buffer systems, respiratory rate adjustment)</li>
        <li>Blood calcium (calcitonin vs parathyroid hormone)</li>
      </ul>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h4>Positive Feedback</h4>
      <p>
        The <strong>response amplifies the stimulus</strong>, creating a
        self-amplifying cycle. It is less common and usually part of a process
        that must reach completion:
      </p>
      <ul>
        <li>
          <strong>Childbirth:</strong> oxytocin release → stronger contractions
          → more oxytocin release → contractions intensify until delivery
        </li>
        <li>
          <strong>Blood clotting:</strong> initial clot → cascade of clotting
          factors → more clotting → stable plug
        </li>
        <li>
          <strong>Action potentials:</strong> Na⁺ entry → depolarisation → more
          Na⁺ channels open → full depolarisation
        </li>
      </ul>

      <h3>Thermoregulation — A Model System</h3>
      <p>
        The <strong>hypothalamus</strong> acts as the control centre. When core
        temperature deviates from ~37°C:
      </p>
      <div className="grid grid-cols-2 gap-3 rounded-lg border bg-card p-4">
        <div>
          <h4 className="text-sm font-semibold text-red-500">Too Hot</h4>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
            <li>Vasodilation (more blood to skin)</li>
            <li>Sweating (evaporative cooling)</li>
            <li>Reduced metabolic heat production</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-blue-500">Too Cold</h4>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
            <li>Vasoconstriction (less blood to skin)</li>
            <li>Shivering (muscle heat generation)</li>
            <li>Piloerection (minimal in humans)</li>
          </ul>
        </div>
      </div>

      <h3>Blood Glucose Regulation</h3>
      <p>
        The <strong>pancreas</strong> contains clusters of endocrine cells
        called
        <strong>islets of Langerhans</strong>:
      </p>
      <ul>
        <li>
          <strong>β-cells:</strong> sense high glucose → release insulin →
          glucose uptake + storage (glycogenesis)
        </li>
        <li>
          <strong>α-cells:</strong> sense low glucose → release glucagon →
          glycogen breakdown (glycogenolysis) + gluconeogenesis
        </li>
      </ul>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Clinical Disruption</h3>
      <p>
        <strong>Diabetes mellitus</strong>: type 1 (autoimmune β-cell
        destruction, no insulin), type 2 (insulin resistance, cells do not
        respond). Both disrupt glucose homeostasis, leading to hyperglycaemia,
        which causes microvascular damage (retinopathy, nephropathy,
        neuropathy).
      </p>

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "homeo-worked-1",
            question:
              "After a large carbohydrate meal, blood glucose rises to 8 mM. Describe the negative feedback mechanisms that restore it to normal range.",
            hints: [
              "Which organ detects the change and which hormone does it release?",
              "What effect does this hormone have on target cells?",
              "How does the corrective signal stop when glucose returns to normal?",
            ],
            solution:
              "1) Pancreatic β-cells detect elevated blood glucose. 2) They release insulin. 3) Insulin signals muscle, liver, and adipose cells to increase glucose uptake (GLUT4 translocation) and stimulates liver glycogenesis. 4) Blood glucose falls. 5) As glucose approaches normal, insulin secretion decreases (negative feedback — the response reverses the stimulus).",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Homeostasis: stable internal environment (dynamic, not static)",
          "Negative feedback reverses change (most common)",
          "Positive feedback amplifies change (rare, specific purposes)",
          "Receptor → Control centre → Effector",
          "Hypothalamus: temperature, thirst, hunger control centre",
          "Pancreas: insulin (β) + glucagon (α) for glucose balance",
          "Diabetes = homeostatic failure of blood glucose",
        ].map((point) => (
          <div
            key={point}
            className="flex items-start gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-2"
          >
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">{point}</span>
          </div>
        ))}
      </div>

      <QuickFire questions={recallQuestions.slice(2, 3)} title="Final Check" />
    </div>
  ),
  questions: [
    {
      id: "homeo-q1",
      type: "multiple-choice",
      prompt: "What does homeostasis maintain?",
      answer: "A stable internal environment",
      difficulty: "recall",
      options: [
        "A constant external environment",
        "A stable internal environment",
        "Complete absence of change",
        "Maximum body temperature",
      ],
    },
    {
      id: "homeo-q2",
      type: "multiple-choice",
      prompt: "Which of the following is an example of positive feedback?",
      answer: "Oxytocin release during childbirth",
      difficulty: "recall",
      options: [
        "Insulin lowering blood glucose",
        "Oxytocin release during childbirth",
        "Sweating in response to heat",
        "Shivering in cold conditions",
      ],
    },
    {
      id: "homeo-q3",
      type: "multiple-choice",
      prompt: "What are the three components of a feedback loop?",
      answer: "Receptor, control centre, effector",
      difficulty: "recall",
      options: [
        "Stimulus, response, hormone",
        "Receptor, control centre, effector",
        "Sensor, gland, organ",
        "Input, output, feedback",
      ],
    },
    {
      id: "homeo-q4",
      type: "multiple-choice",
      prompt: "Which organ is the control centre for thermoregulation?",
      answer: "Hypothalamus",
      difficulty: "apply",
      options: ["Thalamus", "Hypothalamus", "Cerebellum", "Medulla oblongata"],
    },
    {
      id: "homeo-q5",
      type: "multiple-choice",
      prompt: "In type 1 diabetes, the homeostatic failure is due to:",
      answer: "Autoimmune destruction of pancreatic β-cells",
      difficulty: "apply",
      options: [
        "Insulin resistance in target cells",
        "Autoimmune destruction of pancreatic β-cells",
        "Excess glucagon production",
        "Failure of liver glycogenesis",
      ],
      imatYear: 2023,
    },
    {
      id: "homeo-q6",
      type: "explain-why",
      prompt:
        "Explain why positive feedback is typically not used for long-term homeostatic regulation.",
      answer:
        "Positive feedback is self-amplifying — it drives a variable further away from its set point rather than returning it. This creates an unstable, runaway system that would rapidly exceed physiological limits if not terminated. It is only useful for processes that need rapid completion (childbirth, clotting), after which the feedback loop is broken by a distinct event (e.g., delivery of baby ends oxytocin release).",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["organ-systems", "enzymes"],
  prerequisites: [],
};
