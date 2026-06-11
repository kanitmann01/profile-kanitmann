import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "modern-italian",
  subject: "general-knowledge",
  topic: "italian-literature",
  title: "Modern Italian Literature",
  summary:
    "From Manzoni's unifying novel to Calvino's postmodern fables, modern Italian literature reflects the nation's political struggles, identity formation, and cultural innovation from the 19th–20th centuries.",
  memoryHook:
    "M-P-L-E: Manzoni (I Promessi Sposi — unifying novel, 1827), Pirandello (Six Characters — meta-theatre, Nobel 1934), Levi (Christ Stopped at Eboli — Southern question), Eco (Il nome della rosa — semiotic medieval mystery). Calvino = invisible cities, postmodern.",
  imatTrap:
    "Manzoni revised I Promessi Sposi THREE times — the final &quot;Quarantana&quot; edition (1840–42) was in purified Florentine Italian, deliberately chosen to unify the language. Pirandello won the Nobel Prize in 1934, not for a novel but for his drama. Eco was a semiotician, not just a novelist.",
  whyItMatters:
    "Italian literature shaped national identity before and after unification (Risorgimento, 1861). Manzoni's linguistic choices paralleled political unity. Pirandello's exploration of identity and perception prefigured modern psychology and existentialism.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">
        Alessandro Manzoni (1785–1873)
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>I Promessi Sposi</strong> (The Betrothed, 1827): Set in
          17th-century Lombardy under Spanish rule. A historical novel about two
          peasants (Renzo and Lucia) thwarted by a local tyrant.
        </li>
        <li>
          Revised three times; the final &quot;Quarantana&quot; edition used
          purified Florentine Italian — a deliberate act of linguistic
          unification.
        </li>
        <li>
          Considered the foundational novel of modern Italian literature and a
          symbol of the Risorgimento (Italian unification movement).
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">
        Luigi Pirandello (1867–1936)
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Sei personaggi in cerca d&apos;autore</strong> (Six Characters
          in Search of an Author, 1921): Meta-theatrical play where fictional
          characters interrupt a rehearsal, blurring reality and fiction.
        </li>
        <li>
          Themes: identity as mask, relativity of truth, the fragmentation of
          the self.
        </li>
        <li>
          Won the <strong>Nobel Prize in Literature (1934)</strong>.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">20th-Century Voices</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Carlo Levi</strong> — <em>Cristo si è fermato a Eboli</em>{" "}
          (Christ Stopped at Eboli, 1945): Memoir of political exile in
          Basilicata, exposing Southern Italy&apos;s poverty (the &quot;Southern
          Question&quot;).
        </li>
        <li>
          <strong>Italo Calvino</strong> — <em>Le città invisibili</em>{" "}
          (Invisible Cities, 1972): Postmodern fable where Marco Polo describes
          imaginary cities to Kublai Khan. Themes: memory, desire, signs.
        </li>
        <li>
          <strong>Umberto Eco</strong> — <em>Il nome della rosa</em> (The Name
          of the Rose, 1980): Medieval murder mystery set in a monastery. Eco
          was a professor of semiotics; the novel is a labyrinth of signs,
          symbols, and intertextuality.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "modern-italian-q1",
      type: "multiple-choice",
      prompt:
        "Which novel is considered the foundational work of modern Italian literature and a symbol of the Risorgimento?",
      options: [
        "Il nome della rosa",
        "I Promessi Sposi",
        "Le città invisibili",
        "Cristo si è fermato a Eboli",
      ],
      answer: "I Promessi Sposi",
      explanation:
        "Manzoni's I Promessi Sposi (The Betrothed) is the cornerstone of modern Italian literature. Its final 'Quarantana' edition used purified Florentine Italian, contributing to linguistic unification alongside political unification.",
      difficulty: "recall",
    },
    {
      id: "modern-italian-q2",
      type: "multiple-choice",
      prompt: "Which Italian author won the Nobel Prize in Literature in 1934?",
      options: [
        "Italo Calvino",
        "Umberto Eco",
        "Luigi Pirandello",
        "Alessandro Manzoni",
      ],
      answer: "Luigi Pirandello",
      explanation:
        "Pirandello won the Nobel Prize in 1934, primarily for his dramatic works, especially Six Characters in Search of an Author (1921), which revolutionised modern theatre with its meta-theatrical exploration of identity.",
      difficulty: "recall",
    },
    {
      id: "modern-italian-q3",
      type: "explain-why",
      prompt:
        "Why was Manzoni's choice of language in I Promessi Sposi politically significant?",
      answer:
        "Manzoni revised the novel to use purified Florentine Italian, deliberately choosing the dialect that would become the basis for a unified national language. At a time when Italy was politically fragmented, his novel provided a linguistic model that paralleled and supported the Risorgimento movement for political unification.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["dante", "renaissance", "world-wars"],
  prerequisites: [],
};

export default note;
