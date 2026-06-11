import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "ancient-philosophy",
  subject: "general-knowledge",
  topic: "philosophy",
  title: "Ancient Greek Philosophy",
  summary:
    "Socrates, Plato, and Aristotle laid the foundations of Western philosophy — from ethics and epistemology to metaphysics and politics — shaping scientific thought for over two millennia.",
  memoryHook:
    "S-P-A: Socrates (questioning method — 'I know that I know nothing'), Plato (Theory of Forms, The Republic, Academy), Aristotle (empiricism, logic, Lyceum, tutor of Alexander the Great). Chain: Socrates → Plato → Aristotle.",
  imatTrap:
    "Plato was an idealist (Forms are more real than physical objects); Aristotle was an empiricist (knowledge comes from observation). Students reverse them. Also: Socrates wrote nothing — we know him through Plato's dialogues. The Socratic method = elenchus (cross-examination).",
  whyItMatters:
    "Aristotle's classification of living things prefigured taxonomy. His logic (syllogisms) underpinned scientific reasoning until the 17th century. Hippocratic medicine (contemporary with Socrates) established the empirical tradition that modern evidence-based medicine inherits.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Socrates (c. 470–399 BCE)</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Wrote nothing himself; known through{" "}
          <strong>Plato&apos;s dialogues</strong> and Xenophon.
        </li>
        <li>
          <strong>Socratic method (elenchus)</strong>: Systematic questioning to
          expose contradictions and arrive at truth. &quot;The unexamined life
          is not worth living.&quot;
        </li>
        <li>
          Condemned to death by Athens (399 BCE) for &quot;corrupting the
          youth&quot; and impiety. Accepted the sentence — became a martyr for
          philosophy.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Plato (c. 428–348 BCE)</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Theory of Forms</strong>: The physical world is a shadow of
          perfect, eternal Forms (Ideas). The Form of the Good is the highest
          reality.
        </li>
        <li>
          <strong>The Republic</strong>: Ideal state ruled by philosopher-kings.
          Contains the <strong>Allegory of the Cave</strong> — prisoners mistake
          shadows for reality; the philosopher escapes to see the sun (the Form
          of the Good).
        </li>
        <li>
          Founded the <strong>Academy</strong> in Athens (c. 387 BCE) — one of
          the first institutions of higher learning.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Aristotle (384–322 BCE)</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Student at Plato&apos;s Academy; later tutored{" "}
          <strong>Alexander the Great</strong>.
        </li>
        <li>
          <strong>Empiricist</strong>: Knowledge comes from observing the
          natural world, not from abstract Forms.
        </li>
        <li>
          Founded formal <strong>logic</strong> (syllogism: All men are mortal →
          Socrates is a man → Socrates is mortal).
        </li>
        <li>
          Classified living organisms by observation — a precursor to biological
          taxonomy.
        </li>
        <li>
          Founded the <strong>Lyceum</strong> in Athens.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "ancient-philosophy-q1",
      type: "multiple-choice",
      prompt:
        "Which philosopher argued that true reality consists of eternal, perfect 'Forms' and that the physical world is merely a shadow of these Forms?",
      options: ["Socrates", "Plato", "Aristotle", "Epicurus"],
      answer: "Plato",
      explanation:
        "Plato's Theory of Forms holds that abstract, perfect Forms (Justice, Beauty, the Good) are the true reality, while physical objects are imperfect copies. This is illustrated in the Allegory of the Cave in The Republic.",
      difficulty: "recall",
    },
    {
      id: "ancient-philosophy-q2",
      type: "multiple-choice",
      prompt:
        "What is the key difference between Plato's and Aristotle's approaches to knowledge?",
      options: [
        "Plato was an empiricist; Aristotle was an idealist",
        "Plato believed knowledge comes from abstract Forms; Aristotle believed it comes from observation of the natural world",
        "Both believed knowledge comes from divine revelation",
        "Aristotle rejected logic; Plato formalised it",
      ],
      answer:
        "Plato believed knowledge comes from abstract Forms; Aristotle believed it comes from observation of the natural world",
      explanation:
        "Plato was an idealist (reality is in abstract Forms), while Aristotle was an empiricist (reality is discovered through observing nature). This fundamental split — idealism vs. empiricism — shaped Western thought for millennia.",
      difficulty: "apply",
    },
    {
      id: "ancient-philosophy-q3",
      type: "explain-why",
      prompt:
        "Why did Socrates claim 'the unexamined life is not worth living'?",
      answer:
        "Socrates believed that the purpose of human existence is to pursue wisdom and virtue through critical self-reflection. Without questioning one's beliefs, values, and actions, a person lives unthinkingly — no better than an animal. Philosophy is the examined life.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["modern-philosophy", "dante", "renaissance"],
  prerequisites: [],
};

export default note;
