"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "aphi-qf-1",
    question: "What is the key difference between Plato and Aristotle?",
    answer:
      "Plato = idealism (Forms are true reality, physical world is shadow). Aristotle = empiricism (knowledge from observing the natural world).",
    context: "Plato vs Aristotle",
  },
  {
    id: "aphi-qf-2",
    question: "Did Socrates write anything?",
    answer:
      "No — we know Socrates through Plato's dialogues and Xenophon. He used the Socratic method (elenchus) of cross-examination.",
    context: "Socrates",
  },
  {
    id: "aphi-qf-3",
    question: "What is the Allegory of the Cave?",
    answer:
      "Plato's allegory in The Republic: prisoners mistake shadows on a wall for reality. The philosopher escapes to see the true world (the Form of the Good).",
    context: "Plato's allegory",
  },
  {
    id: "aphi-qf-4",
    question: "What did Aristotle contribute to logic?",
    answer:
      "The syllogism — a deductive argument with two premises and a conclusion (e.g., All men are mortal. Socrates is a man. Therefore Socrates is mortal.).",
    context: "Aristotelian logic",
  },
];

export const ancientPhilosophyNote: AtomicNote = {
  slug: "ancient-philosophy",
  subject: "general-knowledge",
  topic: "philosophy",
  title: "Ancient Greek Philosophy",
  summary:
    "Socrates, Plato, and Aristotle laid the foundations of Western philosophy — ethics, epistemology, metaphysics, and politics — shaping scientific thought for over two millennia.",
  memoryHook:
    "S-P-A: Socrates (questioning — 'I know nothing'), Plato (Theory of Forms, The Republic, Academy), Aristotle (empiricism, logic, Lyceum, tutor of Alexander). Chain: Socrates to Plato to Aristotle.",
  imatTrap:
    "Plato = idealist (Forms are more real than objects). Aristotle = empiricist (knowledge from observation). Students reverse them. Socrates wrote nothing — we know him through Plato. The Socratic method = elenchus, not just 'asking questions.'",
  whyItMatters:
    "Aristotle's classification prefigured taxonomy. His logic (syllogisms) underpinned scientific reasoning until the 17th century. Hippocratic medicine established the empirical tradition modern evidence-based medicine inherits.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Socrates/Plato/Aristotle appear in nearly every IMAT GK section",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes:
        "Theory of Forms and Allegory of the Cave are the most tested topics",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "aphi-we-1",
      question:
        "A philosopher argues that true reality consists of perfect, eternal Forms, and the physical world is merely an imperfect copy. Which philosopher is this? Options: Socrates, Plato, Aristotle, Epicurus. How would you distinguish this philosopher from the others in one sentence each?",
      hints: [
        "This philosopher is an IDEALIST — reality is in the abstract, not the physical.",
        "Socrates did not have a Theory of Forms (Plato developed it in his dialogues).",
        "Aristotle rejected the Theory of Forms — he was an empiricist.",
        "Epicurus focused on pleasure as the highest good (hedonism), not metaphysics.",
      ],
      solution:
        "This is PLATO. His Theory of Forms holds that perfect, eternal Forms (Justice, Beauty, the Good) are the true reality, and physical objects are imperfect shadows. Distinguishing: Socrates (wrote nothing, Socratic method of questioning), Aristotle (empiricist, rejected Forms, focused on observation), Epicurus (hedonism, atomism, not metaphysics). Plato's key work: The Republic, containing the Allegory of the Cave.",
    },
  ],
  externalResources: [
    {
      title: "Stanford Encyclopedia — Ancient Philosophy",
      url: "https://plato.stanford.edu/entries/ancient-philosophy/",
      type: "article",
      description: "Comprehensive academic reference on ancient philosophy",
    },
    {
      title: "Khan Academy — Greek Philosophy",
      url: "https://www.khanacademy.org/humanities/world-history/ancient-medieval",
      type: "video",
      description: "Overview of ancient Greek philosophy",
    },
    {
      title: "IMAT Buddy — General Knowledge",
      url: "https://www.imatbuddy.com/imat-general-knowledge/",
      type: "practice",
      description: "IMAT-style GK practice questions on philosophy",
    },
  ],
  highYieldPoints: [
    "Socrates: wrote nothing, Socratic method (elenchus), executed 399 BCE for corrupting youth",
    "Plato: Theory of Forms (idealism), The Republic, Allegory of the Cave, founded the Academy",
    "Aristotle: empiricism, logic/syllogism, Lyceum, tutored Alexander the Great",
    "Chain: Socrates (teacher) to Plato (student) to Aristotle (student at Plato's Academy)",
    "Key difference: Plato = idealism (Forms); Aristotle = empiricism (observation)",
    "Aristotelian logic: syllogisms underpinned science until the 17th century",
    "Aristotle classified living organisms — precursor to biological taxonomy",
  ],
  explanation: (
    <div>
      <h3>Socrates (c. 470-399 BCE)</h3>
      <p>
        Wrote nothing — known through <strong>Plato's dialogues</strong> and
        Xenophon.
      </p>
      <p>
        <strong>Socratic method (elenchus):</strong> Systematic questioning to
        expose contradictions and arrive at truth. 'The unexamined life is not
        worth living.'
      </p>
      <p>
        Condemned to death by Athens (399 BCE) for corrupting the youth and
        impiety. Accepted the sentence — martyr for philosophy.
      </p>

      <h3>Plato (c. 428-348 BCE)</h3>
      <p>
        <strong>Theory of Forms:</strong> Physical world is a shadow of perfect,
        eternal Forms (Ideas). The Form of the Good is the highest reality.
      </p>
      <p>
        <strong>The Republic:</strong> Ideal state ruled by philosopher-kings.
        Contains the <strong>Allegory of the Cave</strong> — prisoners mistake
        shadows for reality; the philosopher escapes to see the sun (Form of the
        Good).
      </p>
      <p>
        Founded the <strong>Academy</strong> in Athens (c. 387 BCE) — one of the
        first institutions of higher learning.
      </p>

      <h3>Aristotle (384-322 BCE)</h3>
      <p>
        Student at Plato's Academy; tutored <strong>Alexander the Great</strong>
        .
      </p>
      <p>
        <strong>Empiricist:</strong> Knowledge from observing the natural world,
        not abstract Forms.
      </p>
      <p>
        Founded formal <strong>logic</strong> (syllogism: All men are mortal →
        Socrates is a man → Socrates is mortal).
      </p>
      <p>
        Classified living organisms — precursor to biological taxonomy. Founded
        the <strong>Lyceum</strong> in Athens.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 2)}
        title="Quick Check: Greek Philosophy"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Socrates: wrote nothing, Socratic method (elenchus), executed 399 BCE",
          "Plato: Theory of Forms (idealism), The Republic, Allegory of the Cave, Academy",
          "Aristotle: empiricism, logic/syllogism, Lyceum, tutored Alexander the Great",
          "Chain: Socrates to Plato to Aristotle",
          "Key difference: Plato = idealism (Forms); Aristotle = empiricism (observation)",
        ].map((point) => (
          <div
            key={point}
            className="flex items-start gap-2 rounded-lg border border-blue-500/20 bg-blue-500/5 p-2 mb-1"
          >
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <span className="text-xs text-muted-foreground">{point}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  questions: [
    {
      id: "ancient-philosophy-q1",
      type: "multiple-choice",
      prompt:
        "Which philosopher believed true reality is in perfect, eternal Forms?",
      options: ["Socrates", "Plato", "Aristotle", "Epicurus"],
      answer: "Plato",
      explanation:
        "Plato's Theory of Forms holds that abstract, perfect Forms are true reality, and physical objects are imperfect copies.",
      difficulty: "recall",
    },
    {
      id: "ancient-philosophy-q2",
      type: "multiple-choice",
      prompt: "What is the key difference between Plato and Aristotle?",
      options: [
        "Plato was an empiricist; Aristotle was an idealist",
        "Plato believed in Forms; Aristotle believed knowledge comes from observation",
        "Both believed knowledge comes from divine revelation",
        "Aristotle rejected logic; Plato formalised it",
      ],
      answer:
        "Plato believed in Forms; Aristotle believed knowledge comes from observation",
      explanation:
        "Plato = idealist (Forms). Aristotle = empiricist (observation). This split shaped Western thought for millennia.",
      difficulty: "apply",
    },
    {
      id: "ancient-philosophy-q3",
      type: "multiple-choice",
      prompt: "Why do we know about Socrates through Plato?",
      options: [
        "Socrates wrote extensively",
        "Socrates wrote nothing — Plato wrote dialogues featuring him",
        "Socrates wrote in a lost language",
        "Plato was Socrates' son",
      ],
      answer: "Socrates wrote nothing — Plato wrote dialogues featuring him",
      explanation:
        "Socrates wrote nothing. Our knowledge comes mainly from Plato's dialogues and Xenophon.",
      difficulty: "recall",
    },
    {
      id: "ancient-philosophy-q4",
      type: "multiple-choice",
      prompt: "What is the Socratic method?",
      options: [
        "Lecturing students on ethics",
        "Systematic questioning to expose contradictions",
        "Writing philosophical treatises",
        "Meditation and contemplation",
      ],
      answer: "Systematic questioning to expose contradictions",
      explanation:
        "The Socratic method (elenchus) uses cross-examination to reveal inconsistencies in beliefs and arrive at truth.",
      difficulty: "recall",
    },
    {
      id: "ancient-philosophy-q5",
      type: "multiple-choice",
      prompt: "What does the Allegory of the Cave represent?",
      options: [
        "The danger of caves",
        "That most people mistake appearances for reality; philosophers seek true knowledge",
        "That shadows are real",
        "That education is unnecessary",
      ],
      answer:
        "That most people mistake appearances for reality; philosophers seek true knowledge",
      explanation:
        "The cave represents the physical world of appearances; the sun represents the Form of the Good — ultimate reality.",
      difficulty: "apply",
    },
    {
      id: "ancient-philosophy-q6",
      type: "explain-why",
      prompt: "Explain the Allegory of the Cave and what it represents.",
      answer:
        "In Plato's Allegory of the Cave, prisoners are chained in a cave, seeing only shadows on the wall and mistaking them for reality. One prisoner escapes, sees the real world and the sun (the Form of the Good). The allegory represents Plato's Theory of Forms: most people mistake appearances for reality; the philosopher seeks true knowledge beyond mere appearances.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["modern-philosophy", "dante", "renaissance"],
  prerequisites: [],
};
