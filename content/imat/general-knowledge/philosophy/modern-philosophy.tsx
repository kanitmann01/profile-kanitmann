import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "modern-philosophy",
  subject: "general-knowledge",
  topic: "philosophy",
  title: "Modern Western Philosophy",
  summary:
    "From Descartes' rationalism to Kant's critical philosophy and Nietzsche's existential challenge, modern philosophy reshaped epistemology, ethics, and the concept of the self.",
  memoryHook:
    "D-K-N: Descartes ('I think, therefore I am' — rationalism, mind-body dualism), Kant (categorical imperative, synthetic a priori, Copernican revolution in philosophy), Nietzsche ('God is dead', will to power, Übermensch, eternal recurrence).",
  imatTrap:
    "Descartes was a rationalist (knowledge from reason), not an empiricist — that was Locke/Hume. Kant SYNTHESISED rationalism and empiricism. Nietzsche was NOT a nihilist — he diagnosed nihilism as a crisis to be overcome. 'God is dead' is a diagnosis, not a celebration.",
  whyItMatters:
    "Kant's categorical imperative underpins modern medical ethics (treat people as ends, never merely as means). Descartes' mind-body dualism shaped how we conceptualise consciousness. Nietzsche's ideas influenced existential psychotherapy and the concept of authenticity.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">René Descartes (1596–1650)</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Rationalism</strong>: Knowledge comes from reason, not sensory
          experience.
        </li>
        <li>
          <strong>Method of doubt</strong>: Systematically doubted everything
          until reaching an indubitable truth:{" "}
          <em>&quot;Cogito, ergo sum&quot;</em> (&quot;I think, therefore I
          am&quot;).
        </li>
        <li>
          <strong>Mind-body dualism (Cartesian dualism)</strong>: The mind (res
          cogitans) and body (res extensa) are fundamentally different
          substances. This raised the &quot;mind-body problem&quot; that
          persists in philosophy of consciousness.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Immanuel Kant (1724–1804)</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Copernican revolution</strong>: We don&apos;t passively
          receive reality — our mind actively structures experience through
          innate categories (space, time, causality).
        </li>
        <li>
          <strong>Synthesised rationalism and empiricism</strong>: All knowledge
          begins with experience, but not all knowledge arises from experience.
        </li>
        <li>
          <strong>Categorical imperative</strong>: Act only according to maxims
          you could will to become universal laws. Also: treat humanity always
          as an end, never merely as a means.
        </li>
        <li>
          Key works: <em>Critique of Pure Reason</em> (1781),{" "}
          <em>Groundwork of the Metaphysics of Morals</em> (1785).
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">
        Friedrich Nietzsche (1844–1900)
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>&quot;God is dead&quot;</strong>: Not atheism as celebration,
          but a diagnosis — the Enlightenment destroyed the metaphysical
          foundation of Western morality, creating a crisis of meaning
          (nihilism).
        </li>
        <li>
          <strong>Will to power</strong>: The fundamental drive of all living
          things is not survival (Darwin) but the expansion and expression of
          power.
        </li>
        <li>
          <strong>Übermensch (Overman)</strong>: An individual who creates their
          own values beyond conventional morality.
        </li>
        <li>
          <strong>Eternal recurrence</strong>: What if you had to live this
          exact life again, infinitely? Would you affirm it?
        </li>
        <li>
          Key works: <em>Thus Spoke Zarathustra</em> (1883–85),{" "}
          <em>Beyond Good and Evil</em> (1886),{" "}
          <em>On the Genealogy of Morals</em> (1887).
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "modern-philosophy-q1",
      type: "multiple-choice",
      prompt:
        "Which philosopher is associated with the 'categorical imperative' and the idea that we should treat humanity always as an end, never merely as a means?",
      options: ["Descartes", "Nietzsche", "Kant", "Hume"],
      answer: "Kant",
      explanation:
        "Kant's categorical imperative is the supreme principle of morality: act only on maxims that could be universal laws, and always treat rational beings as ends in themselves. This principle underpins modern deontological ethics and medical ethics.",
      difficulty: "recall",
    },
    {
      id: "modern-philosophy-q2",
      type: "multiple-choice",
      prompt: "What did Nietzsche mean by 'God is dead'?",
      options: [
        "A literal statement about the death of a deity",
        "A celebration of atheism",
        "A diagnosis that the Enlightenment destroyed the metaphysical foundation of Western morality",
        "An argument for scientific materialism",
      ],
      answer:
        "A diagnosis that the Enlightenment destroyed the metaphysical foundation of Western morality",
      explanation:
        "Nietzsche was diagnosing a cultural crisis: the rise of science and Enlightenment rationality had undermined the Christian worldview that gave Western civilisation its moral framework. The challenge now was to create new values (the Übermensch) rather than succumb to nihilism.",
      difficulty: "apply",
    },
    {
      id: "modern-philosophy-q3",
      type: "explain-why",
      prompt: "How did Kant synthesise rationalism and empiricism?",
      answer:
        "Kant argued that all knowledge begins with sensory experience (agreeing with empiricists like Hume), but the mind actively structures that experience through innate categories like space, time, and causality (agreeing with rationalists like Descartes). We can never know 'things-in-themselves' (noumena), only things as they appear to us (phenomena).",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["ancient-philosophy", "renaissance", "world-wars"],
  prerequisites: [],
};

export default note;
