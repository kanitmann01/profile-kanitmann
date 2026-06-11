"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "mph-qf-1",
    question:
      "What does Descartes' 'Cogito, ergo sum' mean and what was it for?",
    answer:
      "'I think, therefore I am.' It was the indubitable foundation after systematic doubt — the one thing he could not doubt.",
    context: "Descartes",
  },
  {
    id: "mph-qf-2",
    question: "Did Nietzsche celebrate or diagnose 'God is dead'?",
    answer:
      "DIAGNOSIS — he was describing a cultural crisis: the Enlightenment destroyed the Christian foundation of Western morality, creating nihilism.",
    context: "Nietzsche",
  },
  {
    id: "mph-qf-3",
    question: "What is Kant's categorical imperative?",
    answer:
      "Act only on maxims you could will to become universal laws. Treat humanity always as an end, never merely as a means.",
    context: "Kant's ethics",
  },
  {
    id: "mph-qf-4",
    question: "What are the three key Nietzschean concepts?",
    answer:
      "'God is dead' (diagnosis of nihilism), will to power (fundamental drive), Ubermensch (creates own values beyond conventional morality).",
    context: "Nietzschean concepts",
  },
];

export const modernPhilosophyNote: AtomicNote = {
  slug: "modern-philosophy",
  subject: "general-knowledge",
  topic: "philosophy",
  title: "Modern Western Philosophy",
  summary:
    "From Descartes' rationalism to Kant's critical philosophy and Nietzsche's existential challenge — modern philosophy reshaped epistemology, ethics, and the concept of the self.",
  memoryHook:
    "D-K-N: Descartes ('I think, therefore I am' — rationalism, mind-body dualism), Kant (categorical imperative, synthetic a priori, Copernican revolution), Nietzsche ('God is dead,' will to power, Ubermensch).",
  imatTrap:
    "Descartes was a RATIONALIST (knowledge from reason), not an empiricist (Locke/Hume). Kant SYNTHESISED rationalism and empiricism. Nietzsche was NOT a nihilist — 'God is dead' is a diagnosis, not a celebration.",
  whyItMatters:
    "Kant's categorical imperative underpins modern medical ethics (treat people as ends, never merely as means). Cartesian dualism shapes how we conceptualise consciousness. Nietzsche influenced existential psychotherapy.",
  imatPatterns: [
    {
      years: [2022, 2023],
      frequency: "medium",
      notes: "Modern philosophy appears in most IMAT GK sections",
    },
    {
      years: [2024],
      frequency: "high",
      notes: "Kant's categorical imperative was tested in 2024",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "mph-we-1",
      question:
        "How did Kant synthesise rationalism and empiricism? (A) He rejected both. (B) He argued knowledge begins with experience but the mind structures it through innate categories. (C) He was a pure rationalist. (D) He was a pure empiricist. Explain why (B) is correct and what 'Copernican revolution' means in this context.",
      hints: [
        "Rationalists (Descartes) say knowledge comes from reason alone.",
        "Empiricists (Locke, Hume) say knowledge comes from sensory experience.",
        "Kant's move: BOTH are right in some way. The mind has innate categories, but experience fills them.",
        "The Copernican revolution analogy: just as Copernicus shifted the centre from Earth to Sun, Kant shifted philosophy from 'mind conforms to objects' to 'objects conform to mind.'",
      ],
      solution:
        "(B) is correct. Kant argued that all knowledge begins with sensory experience (agreeing with empiricists), but the mind actively structures that experience through innate categories like space, time, and causality (agreeing with rationalists). We can never know 'things-in-themselves' (noumena), only things as they appear to us (phenomena). This 'Copernican revolution' in philosophy reconciled the two traditions. Key works: Critique of Pure Reason (1781), Groundwork of the Metaphysics of Morals (1785).",
    },
  ],
  externalResources: [
    {
      title: "Stanford Encyclopedia — Modern Philosophy",
      url: "https://plato.stanford.edu/entries/modern-philosophy/",
      type: "article",
      description:
        "Comprehensive academic reference on early modern philosophy",
    },
    {
      title: "Khan Academy — Modern Philosophy",
      url: "https://www.khanacademy.org/humanities/philosophy",
      type: "video",
      description: "Overview of Descartes, Kant, and Nietzsche",
    },
    {
      title: "IMAT Buddy — General Knowledge",
      url: "https://www.imatbuddy.com/imat-general-knowledge/",
      type: "practice",
      description: "IMAT-style GK practice questions on philosophy",
    },
  ],
  highYieldPoints: [
    "Descartes: rationalist, 'Cogito ergo sum,' method of doubt, mind-body dualism",
    "Descartes: 'I think, therefore I am' as the indubitable foundation of knowledge",
    "Kant: Copernican revolution — mind structures experience via innate categories (space, time, causality)",
    "Kant: synthetic a priori, synthesised rationalism and empiricism",
    "Kant: categorical imperative (universalisability, treat as end not means)",
    "Nietzsche: 'God is dead' = DIAGNOSIS of cultural crisis, not celebration of atheism",
    "Nietzsche: will to power, Ubermensch (Overman), eternal recurrence",
    "Nietzsche was NOT a nihilist — he diagnosed nihilism to overcome it",
  ],
  explanation: (
    <div>
      <h3>Rene Descartes (1596-1650)</h3>
      <p>
        <strong>Rationalism:</strong> Knowledge from reason, not sensory
        experience.
      </p>
      <p>
        <strong>Method of doubt:</strong> Doubted everything until reaching{" "}
        <em>'Cogito, ergo sum'</em> ('I think, therefore I am').
      </p>
      <p>
        <strong>Mind-body dualism (Cartesian dualism):</strong> Mind (res
        cogitans) and body (res extensa) are different substances — raised the
        mind-body problem.
      </p>

      <h3>Immanuel Kant (1724-1804)</h3>
      <p>
        <strong>Copernican revolution:</strong> The mind actively structures
        experience through innate categories (space, time, causality).
      </p>
      <p>
        <strong>Synthesised rationalism and empiricism:</strong> All knowledge
        begins with experience, but not all arises from experience.
      </p>
      <p>
        <strong>Categorical imperative:</strong> Act only on maxims you could
        will as universal laws. Treat humanity always as an end, never merely as
        a means.
      </p>
      <p>
        Key works: <em>Critique of Pure Reason</em> (1781),{" "}
        <em>Groundwork of the Metaphysics of Morals</em> (1785).
      </p>

      <h3>Friedrich Nietzsche (1844-1900)</h3>
      <p>
        <strong>'God is dead':</strong> A DIAGNOSIS — the Enlightenment
        destroyed the metaphysical foundation of Western morality, creating a
        crisis of meaning (nihilism).
      </p>
      <p>
        <strong>Will to power:</strong> The fundamental drive is not survival
        but the expansion and expression of power.
      </p>
      <p>
        <strong>Ubermensch (Overman):</strong> Creates their own values beyond
        conventional morality.
      </p>
      <p>
        <strong>Eternal recurrence:</strong> Would you affirm this exact life,
        repeated infinitely?
      </p>
      <p>
        Key works: <em>Thus Spoke Zarathustra</em> (1883-85),{" "}
        <em>Beyond Good and Evil</em> (1886).
      </p>

      <QuickFire
        questions={quickFire.slice(0, 2)}
        title="Quick Check: Modern Philosophy"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Descartes: rationalist, 'Cogito ergo sum', mind-body dualism",
          "Kant: Copernican revolution — mind structures experience via categories",
          "Kant: categorical imperative (universalisability, treat as end not means)",
          "Nietzsche: 'God is dead' = DIAGNOSIS of cultural crisis, not celebration",
          "Nietzsche: will to power, Ubermensch, eternal recurrence",
          "Nietzsche was NOT a nihilist — he diagnosed nihilism to overcome it",
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
      id: "modern-philosophy-q1",
      type: "multiple-choice",
      prompt:
        "Which philosopher is associated with the categorical imperative?",
      options: ["Descartes", "Nietzsche", "Kant", "Hume"],
      answer: "Kant",
      explanation:
        "Kant's categorical imperative: act only on maxims you could will as universal laws. Treat humanity as an end, never merely as a means.",
      difficulty: "recall",
    },
    {
      id: "modern-philosophy-q2",
      type: "multiple-choice",
      prompt: "What did Nietzsche mean by 'God is dead'?",
      options: [
        "A literal death of a deity",
        "A celebration of atheism",
        "A diagnosis that the Enlightenment destroyed the foundation of Western morality",
        "An argument for materialism",
      ],
      answer:
        "A diagnosis that the Enlightenment destroyed the foundation of Western morality",
      explanation:
        "Nietzsche diagnosed a cultural crisis: Enlightenment rationality undermined Christian morality, creating nihilism that must be overcome.",
      difficulty: "apply",
    },
    {
      id: "modern-philosophy-q3",
      type: "multiple-choice",
      prompt: "What is Cartesian dualism?",
      options: [
        "Mind and body are identical",
        "Mind and body are fundamentally different substances",
        "Only the body exists",
        "Only the mind exists",
      ],
      answer: "Mind and body are fundamentally different substances",
      explanation:
        "Descartes argued the mind (res cogitans, thinking substance) and body (res extensa, extended substance) are fundamentally different.",
      difficulty: "recall",
    },
    {
      id: "modern-philosophy-q4",
      type: "multiple-choice",
      prompt: "What was Kant's Copernican revolution in philosophy?",
      options: [
        "He proved the Earth revolves around the Sun",
        "He argued that objects conform to the mind, not the mind to objects",
        "He rejected all previous philosophy",
        "He founded a new religion",
      ],
      answer:
        "He argued that objects conform to the mind, not the mind to objects",
      explanation:
        "Kant's revolution was to argue that the mind actively structures experience through innate categories. Objects as we perceive them conform to the mind's structure.",
      difficulty: "apply",
    },
    {
      id: "modern-philosophy-q5",
      type: "multiple-choice",
      prompt: "Nietzsche's will to power refers to:",
      options: [
        "Political domination by the strong",
        "The fundamental drive for expansion and self-expression",
        "The desire for material wealth",
        "A scientific principle",
      ],
      answer: "The fundamental drive for expansion and self-expression",
      explanation:
        "For Nietzsche, the will to power is the fundamental driving force of life — not just survival, but growth, creativity, and overcoming.",
      difficulty: "apply",
    },
    {
      id: "modern-philosophy-q6",
      type: "explain-why",
      prompt: "How did Kant synthesise rationalism and empiricism?",
      answer:
        "Kant argued all knowledge begins with sensory experience (empiricism) but the mind actively structures that experience through innate categories like space, time, and causality (rationalism). We cannot know 'things-in-themselves' (noumena), only phenomena. This reconciled the two traditions.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["ancient-philosophy", "renaissance", "world-wars"],
  prerequisites: [],
};
