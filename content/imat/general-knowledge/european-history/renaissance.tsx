"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "ren-qf-1",
    question: "Which city is called the cradle of the Renaissance?",
    answer: "Florence (not Rome, not Venice). Under Medici patronage.",
    context: "Origins",
  },
  {
    id: "ren-qf-2",
    question:
      "Who published De humani corporis fabrica in 1543, correcting Galen through direct dissection?",
    answer: "Andreas Vesalius. This work founded modern anatomy.",
    context: "Medical Renaissance",
  },
  {
    id: "ren-qf-3",
    question: "Name the three most famous artists of the High Renaissance.",
    answer: "Leonardo da Vinci, Michelangelo, Raphael.",
    context: "Renaissance art",
  },
  {
    id: "ren-qf-4",
    question:
      "What invention (c. 1440) revolutionised knowledge dissemination during the Renaissance?",
    answer:
      "The printing press (Gutenberg, c. 1440). Democratised knowledge, enabled Reformation.",
    context: "Printing press",
  },
];

export const renaissanceNote: AtomicNote = {
  slug: "renaissance",
  subject: "general-knowledge",
  topic: "european-history",
  title: "The Renaissance",
  summary:
    "Cultural movement (14th-17th c.) originating in Italy that revived classical learning, humanist values, and transformed art, science, and politics. Florence = cradle, Medici = patrons.",
  memoryHook:
    "R-A-I-N: Renaissance = Art (Da Vinci, Michelangelo), Innovation (printing press, heliocentrism), Italy-born (Florence to Rome/Venice), New learning (humanism, empiricism).",
  imatTrap:
    "The Renaissance began in FLORENCE, not Rome. Students confuse Italian Renaissance (14th c.) with Northern Renaissance (15th-16th c., more religious). Leonardo was a polymath (artist, anatomist, engineer), not just a painter.",
  whyItMatters:
    "Renaissance anatomy (Vesalius) and the scientific method laid foundations for modern medicine. Humanism shifted focus from divine authority to observation — the bedrock of evidence-based practice.",
  imatPatterns: [
    {
      years: [2022, 2023],
      frequency: "medium",
      notes: "Renaissance art and science appear regularly in GK",
    },
    {
      years: [2024],
      frequency: "medium",
      notes: "Focus on Vesalius and medical Renaissance",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "ren-we-1",
      question:
        "Why is the Renaissance considered a turning point in medical history? (A) Doctors began using Latin texts. (B) Direct observation replaced reliance on ancient authorities. (C) The Catholic Church banned dissection. (D) Surgery was separated from medicine. Explain why each option is correct or incorrect.",
      hints: [
        "What changed about HOW knowledge was acquired during the Renaissance?",
        "Before the Renaissance, medicine relied on Galen (ancient authority). What changed?",
        "Think about Vesalius and Harvey — what did they do differently from their predecessors?",
        "Was the Church banning dissection or allowing more of it?",
      ],
      solution:
        "(B) is correct. The Renaissance shifted medicine from relying on ancient texts (Galen, Aristotle) to empirical observation. Vesalius dissected human cadavers and corrected Galen's animal-based anatomy. Harvey measured blood flow rather than citing Galen. (A) is wrong — Latin texts were already used in medieval times. (C) is wrong — the Church did not ban dissection; in fact, it became more accepted. (D) is wrong — surgery remained connected to medicine, and this was not the key change. The empirical turn is the foundation of modern science.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Renaissance",
      url: "https://www.khanacademy.org/humanities/renaissance-reformation",
      type: "video",
      description: "Free Renaissance art and history lessons",
    },
    {
      title: "Britannica — Renaissance",
      url: "https://www.britannica.com/event/Renaissance",
      type: "article",
      description: "Comprehensive reference article on the Renaissance",
    },
    {
      title: "IMAT Buddy — General Knowledge",
      url: "https://www.imatbuddy.com/imat-general-knowledge/",
      type: "practice",
      description: "IMAT-style GK practice questions on Renaissance",
    },
  ],
  highYieldPoints: [
    "Renaissance began in FLORENCE (14th c.) under Medici patronage",
    "Humanism: Petrarch (Father of Humanism), focus on classical texts",
    "Vesalius: De humani corporis fabrica (1543) — first modern anatomy via dissection",
    "Printing press (Gutenberg, c. 1440) — spread knowledge, enabled Reformation",
    "Leonardo: polymath (artist, anatomist, engineer) — not just a painter",
    "Italian Renaissance (14th c.) is different from Northern Renaissance (15th-16th c., more religious)",
    "High Renaissance artists: Leonardo, Michelangelo, Raphael",
  ],
  explanation: (
    <div>
      <p>
        <strong>The Renaissance</strong> (French for 'rebirth') was a period of
        cultural, artistic, and intellectual renewal that began in
        <strong>Florence, Italy</strong> around the 1300s and spread across
        Europe by the 1600s.
      </p>

      <h3>Key Characteristics</h3>
      <p>
        <strong>Humanism:</strong> Emphasised human potential, classical texts,
        secular inquiry. Key figure: Petrarch ('Father of Humanism').
      </p>
      <p>
        <strong>Artistic revolution:</strong> Perspective, realism, anatomy.
        Leonardo (polymath), Michelangelo (Sistine Chapel), Raphael (School of
        Athens).
      </p>
      <p>
        <strong>Scientific advances:</strong> Copernicus (heliocentrism),
        Galileo (telescope), Vesalius (anatomy — De humani corporis fabrica,
        1543).
      </p>
      <p>
        <strong>Printing press</strong> (Gutenberg, c. 1440): Democratised
        knowledge, enabled Reformation.
      </p>

      <h3>Italian Context</h3>
      <p>
        <strong>Medici family</strong> of Florence: Bankers and patrons.
        City-states (Florence, Venice, Milan) competed culturally. Fall of
        Constantinople (1453) brought Greek scholars westward.
      </p>

      <h3>Impact on Medicine</h3>
      <p>
        Vesalius challenged Galen through direct dissection. Harvey described
        blood circulation (1628). The Renaissance shifted medicine from textual
        authority to empirical observation.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 2)}
        title="Quick Check: Renaissance Facts"
      />

      <h3>Worked Example: GK Approach</h3>
      <WorkedExampleCard
        example={{
          id: "ren-we-demo",
          question:
            "An IMAT question asks about the significance of the Medici family. Which is correct? (A) They were Renaissance popes who commissioned St. Peter's. (B) They were Florentine bankers who patronised Renaissance artists and thinkers. (C) They were Venetian merchants who funded exploration. (D) They were German printers who brought the printing press to Italy.",
          hints: [
            "Which Italian city is associated with the Medici?",
            "Were they religious leaders or bankers?",
            "What did their patronage fund?",
          ],
          solution:
            "(B) is correct. The Medici were Florentine bankers who used their wealth to patronise artists (Michelangelo, Botticelli), thinkers, and scientists. They did not just fund art — they funded the entire Renaissance ecosystem. (A) is wrong — there were Medici popes (Leo X, Clement VII) but the family was primarily bankers, not popes. (C) is wrong — the Medici were Florentine, not Venetian. (D) is wrong — Gutenberg was German, not Medici.",
        }}
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "Renaissance began in FLORENCE (14th c.) under Medici patronage",
          "Humanism: Petrarch (Father of Humanism), focus on classical texts",
          "Vesalius: De humani corporis fabrica (1543) — first modern anatomy via dissection",
          "Printing press (Gutenberg, 1440) — spread knowledge, enabled Reformation",
          "Leonardo: polymath (artist, anatomist, engineer)",
          "Italian Renaissance (14th c.) does not equal Northern Renaissance (15th-16th c.)",
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
      id: "renaissance-q1",
      type: "multiple-choice",
      prompt: "Which city is the birthplace of the Renaissance?",
      options: ["Rome", "Venice", "Florence", "Milan"],
      answer: "Florence",
      explanation:
        "Florence, under Medici patronage, was the cradle of the Renaissance from the 14th century.",
      difficulty: "recall",
    },
    {
      id: "renaissance-q2",
      type: "multiple-choice",
      prompt:
        "Who published De humani corporis fabrica (1543), founding modern anatomy?",
      options: [
        "Leonardo da Vinci",
        "Andreas Vesalius",
        "William Harvey",
        "Galileo Galilei",
      ],
      answer: "Andreas Vesalius",
      explanation:
        "Vesalius's 1543 work was the first comprehensive human anatomy based on direct dissection.",
      difficulty: "recall",
    },
    {
      id: "renaissance-q3",
      type: "multiple-choice",
      prompt:
        "Why was the printing press (c. 1440) a catalyst for the Renaissance?",
      options: [
        "It allowed the Church to control publications",
        "It reduced book costs and spread classical texts across Europe",
        "It was invented in Florence",
        "It eliminated the need for scribes",
      ],
      answer: "It reduced book costs and spread classical texts across Europe",
      explanation:
        "The printing press democratised knowledge, enabled the Reformation, and accelerated the spread of humanist ideas.",
      difficulty: "apply",
    },
    {
      id: "renaissance-q4",
      type: "multiple-choice",
      prompt:
        "Which family was the primary patron of the Florentine Renaissance?",
      options: ["The Borgias", "The Sforzas", "The Medici", "The Gonzagas"],
      answer: "The Medici",
      explanation:
        "The Medici were Florentine bankers who patronised the artists, thinkers, and scientists who defined the Renaissance.",
      difficulty: "recall",
    },
    {
      id: "renaissance-q5",
      type: "multiple-choice",
      prompt:
        "Which artist is known as a polymath who excelled in art, anatomy, and engineering?",
      options: ["Raphael", "Michelangelo", "Leonardo da Vinci", "Donatello"],
      answer: "Leonardo da Vinci",
      explanation:
        "Leonardo was a quintessential Renaissance man — painter, anatomist, engineer, inventor, architect.",
      difficulty: "recall",
    },
    {
      id: "renaissance-q6",
      type: "explain-why",
      prompt:
        "Why is the Renaissance considered the beginning of modern science?",
      answer:
        "The Renaissance shifted from relying on ancient authorities (Galen, Aristotle) to direct observation and empirical investigation. Vesalius dissected cadavers, Galileo used telescopes, and Harvey measured blood circulation. This empirical approach is the foundation of modern science.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["dante", "ancient-philosophy", "world-wars"],
  prerequisites: [],
};
