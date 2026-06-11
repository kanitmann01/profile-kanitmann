import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "renaissance",
  subject: "general-knowledge",
  topic: "european-history",
  title: "The Renaissance",
  summary:
    "A cultural movement spanning the 14th–17th centuries, originating in Italy, that revived classical learning and humanist values, transforming art, science, and politics.",
  memoryHook:
    "R-A-I-N: Renaissance = Art (Da Vinci, Michelangelo), Innovation (printing press, heliocentrism), Italy-born (Florence → Rome/Venice), New learning (humanism, empiricism). Florence = cradle, Medici = money.",
  imatTrap:
    "The Renaissance did NOT start in Rome — it began in Florence under Medici patronage. Students confuse the Italian Renaissance (14th c.) with the Northern Renaissance (15th–16th c., more religious). Also: Leonardo was a polymath, not just a painter.",
  whyItMatters:
    "Renaissance anatomy (Vesalius) and the scientific method laid foundations for modern medicine. Humanism shifted focus from divine authority to observation — the bedrock of evidence-based practice.",
  explanation: (
    <div className="space-y-4">
      <p>
        <strong>The Renaissance</strong> (French for &quot;rebirth&quot;) was a
        period of cultural, artistic, and intellectual renewal that began in{" "}
        <strong>Florence, Italy</strong> around the 1300s and spread across
        Europe by the 1600s.
      </p>

      <h3 className="text-lg font-semibold mt-4">Key Characteristics</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Humanism</strong>: Intellectual movement that emphasised human
          potential, classical Greek/Roman texts, and secular inquiry over
          medieval scholasticism. Key figure: <strong>Petrarch</strong>{" "}
          (&quot;Father of Humanism&quot;).
        </li>
        <li>
          <strong>Artistic revolution</strong>: Perspective, realism, anatomical
          accuracy. <strong>Leonardo da Vinci</strong> (polymath — painter,
          anatomist, engineer), <strong>Michelangelo</strong> (Sistine Chapel,
          David), <strong>Raphael</strong> (School of Athens).
        </li>
        <li>
          <strong>Scientific advances</strong>: Copernicus (heliocentrism),
          Galileo (telescope, physics), Vesalius (human anatomy —{" "}
          <em>De humani corporis fabrica</em>, 1543).
        </li>
        <li>
          <strong>Printing press</strong> (Gutenberg, c. 1440): Democratised
          knowledge, accelerated literacy, enabled the Reformation.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Italian Context</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Medici family</strong> of Florence: Bankers and patrons who
          funded artists, architects, and scholars.
        </li>
        <li>
          City-states (Florence, Venice, Milan, Papal States) competed
          culturally, driving innovation.
        </li>
        <li>
          Fall of Constantinople (1453) brought Greek scholars westward,
          fuelling classical revival.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Impact on Medicine</h3>
      <p>
        Andreas Vesalius challenged Galen&apos;s anatomical errors through
        direct dissection. William Harvey later described blood circulation
        (1628). The Renaissance shifted medicine from textual authority to
        empirical observation.
      </p>
    </div>
  ),
  questions: [
    {
      id: "renaissance-q1",
      type: "multiple-choice",
      prompt: "Which city is considered the birthplace of the Renaissance?",
      options: ["Rome", "Venice", "Florence", "Milan"],
      answer: "Florence",
      explanation:
        "Florence, under Medici patronage, was the cradle of the Renaissance from the 14th century. Its wealth, guild system, and competitive city-state culture fostered artistic and intellectual innovation.",
      difficulty: "recall",
    },
    {
      id: "renaissance-q2",
      type: "multiple-choice",
      prompt:
        "Which Renaissance figure published 'De humani corporis fabrica' (1543), correcting Galen's anatomical errors through direct human dissection?",
      options: [
        "Leonardo da Vinci",
        "Andreas Vesalius",
        "William Harvey",
        "Galileo Galilei",
      ],
      answer: "Andreas Vesalius",
      explanation:
        "Vesalius's 1543 work was the first comprehensive human anatomy based on direct dissection, overturning centuries of reliance on Galen's animal-based anatomy.",
      difficulty: "recall",
    },
    {
      id: "renaissance-q3",
      type: "explain-why",
      prompt:
        "Why is the invention of the printing press (c. 1440) considered a catalyst for the Renaissance?",
      answer:
        "The printing press (Gutenberg) dramatically reduced the cost of books, increased literacy, and allowed rapid dissemination of classical texts, scientific ideas, and humanist writings across Europe. It also enabled the Reformation by spreading vernacular Bibles and pamphlets.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["dante", "ancient-philosophy", "world-wars"],
  prerequisites: [],
};

export default note;
