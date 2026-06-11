"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "mi-qf-1",
    question:
      "Which novel is considered the foundational work of modern Italian literature and a symbol of the Risorgimento?",
    answer: "I Promessi Sposi (The Betrothed) by Alessandro Manzoni.",
    context: "Manzoni",
  },
  {
    id: "mi-qf-2",
    question: "Which Italian author won the Nobel Prize in Literature in 1934?",
    answer:
      "Luigi Pirandello, primarily for his drama (Six Characters in Search of an Author).",
    context: "Pirandello",
  },
  {
    id: "mi-qf-3",
    question: "How many times did Manzoni revise I Promessi Sposi?",
    answer:
      "Three times. The final Quarantana edition (1840-42) used purified Florentine Italian.",
    context: "Manzoni's revisions",
  },
  {
    id: "mi-qf-4",
    question: "Name three 20th-century Italian authors and one key work each.",
    answer:
      "Carlo Levi (Christ Stopped at Eboli), Italo Calvino (Invisible Cities), Umberto Eco (The Name of the Rose).",
    context: "Modern authors",
  },
];

export const modernItalianNote: AtomicNote = {
  slug: "modern-italian",
  subject: "general-knowledge",
  topic: "italian-literature",
  title: "Modern Italian Literature",
  summary:
    "From Manzoni's unifying novel to Calvino's postmodern fables, modern Italian literature reflects the nation's political struggles, identity formation, and cultural innovation (19th-20th centuries).",
  memoryHook:
    "M-P-L-E: Manzoni (I Promessi Sposi — unifying novel, 1827), Pirandello (Six Characters — meta-theatre, Nobel 1934), Levi (Christ Stopped at Eboli — Southern Question), Eco (Il nome della rosa — semiotic mystery). Calvino = Invisible Cities.",
  imatTrap:
    "Manzoni revised I Promessi Sposi THREE times — the final Quarantana edition (1840-42) used purified Florentine Italian to unify the language. Pirandello won the Nobel for drama, not novels. Eco was a semiotician, not just a novelist.",
  whyItMatters:
    "Italian literature shaped national identity before and after unification (Risorgimento, 1861). Manzoni's linguistic choices paralleled political unity. Pirandello's exploration of identity prefigured modern psychology and existentialism.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "medium",
      notes: "Manzoni and Pirandello most tested",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Calvino or Eco appear in some years",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "mi-we-1",
      question:
        "Why was Manzoni's choice of language in I Promessi Sposi politically significant? (A) He wrote in dialect to appeal to local readers. (B) He deliberately used purified Florentine Italian to help unify the nation linguistically. (C) He wrote in Latin to reach an international audience. (D) He used French because it was the language of culture. Explain.",
      hints: [
        "The Risorgimento was about political unification — what paralleled this?",
        "Which dialect became the basis for standard Italian?",
        "Manzoni revised THREE times to get the language right — what was he aiming for?",
      ],
      solution:
        "(B) is correct. Manzoni revised the novel to use purified Florentine Italian, deliberately choosing the dialect that would become the basis for a unified national language. At a time when Italy was politically fragmented, his novel provided a linguistic model that paralleled and supported the Risorgimento movement. The first edition had a mix of Lombard and Tuscan; the final Quarantana was purified Florentine. This was an explicitly political act — language unification as a step toward political unification.",
    },
  ],
  externalResources: [
    {
      title: "Britannica — Italian Literature",
      url: "https://www.britannica.com/art/Italian-literature",
      type: "article",
      description: "Comprehensive overview of Italian literary history",
    },
    {
      title: "IMAT Buddy — General Knowledge",
      url: "https://www.imatbuddy.com/imat-general-knowledge/",
      type: "practice",
      description: "IMAT-style GK practice questions on Italian literature",
    },
    {
      title: "Khan Academy — Modern Italy",
      url: "https://www.khanacademy.org/humanities/world-history",
      type: "video",
      description: "Risorgimento and Italian unification context",
    },
  ],
  highYieldPoints: [
    "Manzoni: I Promessi Sposi (1827), revised three times, final Quarantana (1840-42)",
    "Manzoni used purified Florentine to help unify the Italian language",
    "I Promessi Sposi = foundational novel, symbol of Risorgimento",
    "Pirandello: Six Characters in Search of an Author (1921), Nobel Prize 1934",
    "Pirandello: meta-theatre, identity as mask, relativity of truth",
    "Carlo Levi: Christ Stopped at Eboli (1945), Southern Question",
    "Calvino: Invisible Cities (1972), postmodern fable",
    "Eco: The Name of the Rose (1980), semiotics professor",
  ],
  explanation: (
    <div>
      <h3>Alessandro Manzoni (1785-1873)</h3>
      <p>
        <strong>I Promessi Sposi</strong> (The Betrothed, 1827): Set in
        17th-century Lombardy under Spanish rule. Two peasants (Renzo and Lucia)
        thwarted by a local tyrant. Revised three times; the final Quarantana
        edition (1840-42) used purified Florentine Italian — a deliberate act of
        linguistic unification. Considered the foundational novel of modern
        Italian literature and a symbol of the Risorgimento.
      </p>

      <h3>Luigi Pirandello (1867-1936)</h3>
      <p>
        <strong>Sei personaggi in cerca d'autore</strong> (Six Characters in
        Search of an Author, 1921): Meta-theatrical play blurring reality and
        fiction. Themes: identity as mask, relativity of truth, fragmentation of
        self. Won the <strong>Nobel Prize in Literature (1934)</strong>.
      </p>

      <h3>20th-Century Voices</h3>
      <p>
        <strong>Carlo Levi</strong> — <em>Cristo si e fermato a Eboli</em>{" "}
        (1945): Memoir of exile in Basilicata, exposing the Southern Question
        (poverty of Southern Italy).
      </p>
      <p>
        <strong>Italo Calvino</strong> — <em>Le citta invisibili</em> (1972):
        Postmodern fable. Marco Polo describes imaginary cities to Kublai Khan.
      </p>
      <p>
        <strong>Umberto Eco</strong> — <em>Il nome della rosa</em> (1980):
        Medieval murder mystery in a monastery. Eco was a semiotics professor.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 2)}
        title="Quick Check: Modern Italian Lit"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Manzoni: I Promessi Sposi (1827), revised three times, final Quarantana (1840-42)",
          "Manzoni used purified Florentine to help unify the Italian language",
          "I Promessi Sposi = foundational novel, symbol of Risorgimento",
          "Pirandello: Six Characters in Search of an Author (1921), Nobel 1934",
          "Pirandello: meta-theatre, identity as mask, relativity of truth",
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
      id: "modern-italian-q1",
      type: "multiple-choice",
      prompt:
        "Which novel is the foundational work of modern Italian literature and a symbol of the Risorgimento?",
      options: [
        "Il nome della rosa",
        "I Promessi Sposi",
        "Le citta invisibili",
        "Cristo si e fermato a Eboli",
      ],
      answer: "I Promessi Sposi",
      explanation:
        "Manzoni's I Promessi Sposi is the cornerstone of modern Italian literature.",
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
        "Pirandello won the Nobel in 1934 for his dramatic works, especially Six Characters in Search of an Author.",
      difficulty: "recall",
    },
    {
      id: "modern-italian-q3",
      type: "multiple-choice",
      prompt: "How many times did Manzoni revise I Promessi Sposi?",
      options: [
        "Once",
        "Twice",
        "Three times",
        "Never — he published one edition",
      ],
      answer: "Three times",
      explanation:
        "Manzoni revised the novel three times, with the final Quarantana edition (1840-42) using purified Florentine Italian.",
      difficulty: "recall",
    },
    {
      id: "modern-italian-q4",
      type: "multiple-choice",
      prompt:
        "What is Pirandello's Six Characters in Search of an Author known for?",
      options: [
        "Being a realist novel",
        "Being a meta-theatrical play blurring reality and fiction",
        "Being a political manifesto",
        "Being a collection of poetry",
      ],
      answer: "Being a meta-theatrical play blurring reality and fiction",
      explanation:
        "Pirandello's play broke theatrical conventions by having characters interrupt the performance and discuss their own fictional nature.",
      difficulty: "apply",
    },
    {
      id: "modern-italian-q5",
      type: "multiple-choice",
      prompt:
        "Which author wrote about the Southern Question in Christ Stopped at Eboli?",
      options: [
        "Umberto Eco",
        "Carlo Levi",
        "Italo Calvino",
        "Luigi Pirandello",
      ],
      answer: "Carlo Levi",
      explanation:
        "Levi's memoir of political exile in Basilicata exposed the extreme poverty and neglect of Southern Italy.",
      difficulty: "recall",
    },
    {
      id: "modern-italian-q6",
      type: "explain-why",
      prompt:
        "Why was Manzoni's choice of language in I Promessi Sposi politically significant?",
      answer:
        "Manzoni revised the novel to use purified Florentine Italian, deliberately choosing the dialect that would become the basis for a unified national language. At a time of political fragmentation, his novel provided a linguistic model paralleling the Risorgimento movement.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["dante", "renaissance", "world-wars"],
  prerequisites: [],
};
