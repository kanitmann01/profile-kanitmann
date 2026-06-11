"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "dante-qf-1",
    question: "In what language did Dante write the Divine Comedy?",
    answer:
      "Vernacular Tuscan Italian — NOT Latin. This was revolutionary and helped standardise Italian.",
    context: "Dante's language",
  },
  {
    id: "dante-qf-2",
    question:
      "Who guides Dante through Inferno and Purgatorio, and who guides him through Paradiso?",
    answer:
      "Virgil (reason) guides Inferno/Purgatorio. Beatrice (faith) guides Paradiso.",
    context: "Dante's guides",
  },
  {
    id: "dante-qf-3",
    question: "What rhyme scheme does the Divine Comedy use?",
    answer:
      "Terza rima — interlocking three-line stanzas: ABA BCB CDC, reflecting the Holy Trinity.",
    context: "Terza rima",
  },
  {
    id: "dante-qf-4",
    question: "How many canticles and total cantos are in the Divine Comedy?",
    answer:
      "3 canticles (Inferno, Purgatorio, Paradiso) with 33 cantos each plus 1 introductory canto = 100 total.",
    context: "Structure",
  },
];

export const danteNote: AtomicNote = {
  slug: "dante",
  subject: "general-knowledge",
  topic: "italian-literature",
  title: "Dante Alighieri and the Divine Comedy",
  summary:
    "Dante's Divine Comedy (c. 1308-1321) is an epic poem in three canticles — Inferno, Purgatorio, Paradiso — that shaped the Italian language and remains a cornerstone of Western literature.",
  memoryHook:
    "3-3-3 rule: 3 canticles (Inferno, Purgatorio, Paradiso), 33 cantos each (+1 intro = 100 total), terza rima (ABA BCB CDC). Vernacular Tuscan. Guides: Virgil = reason, Beatrice = faith.",
  imatTrap:
    "Dante wrote in VERNACULAR ITALIAN, not Latin. Students confuse Virgil (Inferno/Purgatorio guide) with Beatrice (Paradiso guide). Dante was EXILED from Florence due to political conflict, not imprisoned by the Church.",
  whyItMatters:
    "Dante's vernacular established a literary language for Italy centuries before political unification (1861). His work bridges medieval theology and Renaissance humanism.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Dante appears in nearly every IMAT GK section",
    },
    {
      years: [2021, 2024],
      frequency: "medium",
      notes: "Structure of the Divine Comedy and terza rima are common",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "dante-we-1",
      question:
        "Why is Dante called the Father of the Italian language? (A) He wrote in Latin. (B) He wrote the Divine Comedy in Tuscan vernacular, helping standardise Italian. (C) He invented the Italian alphabet. (D) He translated the Bible into Italian. Explain each option.",
      hints: [
        "What was the language of most scholarly works in Dante's time?",
        "What language did Dante actually use?",
        "How did this choice affect the development of the Italian language?",
        "Did he invent the alphabet or translate the Bible? No — those are different achievements.",
      ],
      solution:
        "(B) is correct. Dante wrote the Divine Comedy in vernacular Tuscan Italian at a time when scholarly works were in Latin. His masterpiece demonstrated that Italian could express the highest literary and philosophical ideas, influencing other writers (Boccaccio, Petrarch) and establishing Tuscan as the basis for standard Italian. He did not invent the alphabet or translate the Bible. His choice of vernacular was revolutionary because it made high literature accessible beyond the clergy and educated elite.",
    },
  ],
  externalResources: [
    {
      title: "Digital Dante — Columbia University",
      url: "https://digitaldante.columbia.edu/",
      type: "article",
      description:
        "Comprehensive Dante resource with text, translations, and commentary",
    },
    {
      title: "IMAT Buddy — Italian Literature",
      url: "https://www.imatbuddy.com/imat-general-knowledge/",
      type: "practice",
      description: "IMAT-style GK practice questions on Italian literature",
    },
    {
      title: "Britannica — Dante Alighieri",
      url: "https://www.britannica.com/biography/Dante-Alighieri",
      type: "article",
      description: "Comprehensive reference on Dante's life and works",
    },
  ],
  highYieldPoints: [
    "Dante (1265-1321), exiled from Florence 1302 due to Guelph/Ghibelline conflict",
    "Divine Comedy: 3 canticles (Inferno, Purgatorio, Paradiso), 100 cantos total",
    "Terza rima: ABA BCB CDC — interlocking three-line stanzas reflecting the Trinity",
    "Written in vernacular Tuscan Italian, NOT Latin — Father of the Italian language",
    "Virgil (reason) guides through Inferno and Purgatorio",
    "Beatrice (faith) guides through Paradiso",
    "Inferno: 9 circles of sin. Purgatorio: 7 terraces (7 deadly sins). Paradiso: 9 spheres",
    "Dante was exiled, not imprisoned by the Church",
  ],
  explanation: (
    <div>
      <h3>Historical Context</h3>
      <p>
        <strong>Dante Alighieri</strong> (1265-1321), Florentine poet and
        politician. Exiled from Florence in 1302 due to Guelph/Ghibelline
        conflict. Wrote the <em>Divine Comedy</em> during exile.
      </p>

      <h3>Structure of the Divine Comedy</h3>
      <p>
        <strong>Inferno (Hell):</strong> 9 circles of sin. Guided by{" "}
        <strong>Virgil</strong> (Roman poet, symbol of reason). 'Abandon all
        hope, ye who enter here.'
      </p>
      <p>
        <strong>Purgatorio (Purgatory):</strong> Mountain with 7 terraces (7
        deadly sins). Souls purify. Still guided by Virgil.
      </p>
      <p>
        <strong>Paradiso (Paradise):</strong> 9 celestial spheres + Empyrean.
        Guided by <strong>Beatrice</strong> (Dante's idealised love, symbol of
        divine grace).
      </p>

      <h3>Literary Significance</h3>
      <p>
        <strong>Vernacular Tuscan Italian</strong> — revolutionary choice, not
        Latin. Dante called 'Father of the Italian language.'
      </p>
      <p>
        <strong>Terza rima</strong> (ABA BCB CDC): interlocking three-line
        stanzas reflecting the Trinity.
      </p>
      <p>
        Blends classical (Virgil) and Christian (Aquinas) traditions — bridge
        between medieval and Renaissance thought.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 2)}
        title="Quick Check: Dante Facts"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Dante (1265-1321), exiled from Florence 1302",
          "Divine Comedy: 3 canticles (Inferno, Purgatorio, Paradiso), 100 cantos total",
          "Terza rima: ABA BCB CDC — interlocking three-line stanzas",
          "Written in vernacular Tuscan Italian, NOT Latin — Father of Italian language",
          "Virgil (reason) guides through Inferno and Purgatorio",
          "Beatrice (faith) guides through Paradiso",
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
      id: "dante-q1",
      type: "multiple-choice",
      prompt: "Who guides Dante through Inferno and Purgatorio?",
      options: ["Beatrice", "Virgil", "Aristotle", "St. Bernard"],
      answer: "Virgil",
      explanation:
        "Virgil (Roman poet, symbol of reason) guides Dante through Hell and Purgatory. Beatrice takes over in Paradiso.",
      difficulty: "recall",
    },
    {
      id: "dante-q2",
      type: "multiple-choice",
      prompt: "In what language did Dante write the Divine Comedy?",
      options: ["Latin", "Vernacular Tuscan Italian", "French", "Greek"],
      answer: "Vernacular Tuscan Italian",
      explanation:
        "Dante chose vernacular Tuscan over Latin, helping establish it as the basis for standard Italian.",
      difficulty: "recall",
    },
    {
      id: "dante-q3",
      type: "multiple-choice",
      prompt: "The Divine Comedy uses terza rima, which is:",
      options: [
        "A four-line rhyming scheme",
        "Interlocking three-line stanzas: ABA BCB CDC",
        "Unrhymed verse",
        "A poetic form invented in the 20th century",
      ],
      answer: "Interlocking three-line stanzas: ABA BCB CDC",
      explanation:
        "Terza rima uses interlocking triple rhymes that symbolically reflect the Holy Trinity.",
      difficulty: "recall",
    },
    {
      id: "dante-q4",
      type: "multiple-choice",
      prompt: "How many cantos are in the Divine Comedy?",
      options: ["33", "66", "99", "100"],
      answer: "100",
      explanation:
        "3 canticles of 33 cantos each = 99, plus 1 introductory canto = 100 total.",
      difficulty: "recall",
    },
    {
      id: "dante-q5",
      type: "multiple-choice",
      prompt: "Why was Dante exiled from Florence?",
      options: [
        "He was accused of heresy",
        "Political conflict (Guelph vs Ghibelline)",
        "He refused to write in Latin",
        "He criticised the Pope",
      ],
      answer: "Political conflict (Guelph vs Ghibelline)",
      explanation:
        "Dante was exiled in 1302 due to his involvement in the Guelph/Ghibelline political conflict in Florence. He never returned.",
      difficulty: "apply",
    },
    {
      id: "dante-q6",
      type: "explain-why",
      prompt: "Why was Dante's choice of vernacular Italian revolutionary?",
      answer:
        "At the time, scholarly and literary works were written in Latin, accessible only to the clergy and educated elite. By writing in Tuscan vernacular, Dante made high literature accessible to a broader audience and helped establish Italian as a literary language worthy of the highest philosophical and poetic expression.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["modern-italian", "renaissance", "ancient-philosophy"],
  prerequisites: [],
};
