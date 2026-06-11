import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "dante",
  subject: "general-knowledge",
  topic: "italian-literature",
  title: "Dante Alighieri & the Divine Comedy",
  summary:
    "Dante's Divine Comedy (c. 1308–1321) is an epic poem in three canticles — Inferno, Purgatorio, Paradiso — that shaped the Italian language and remains a cornerstone of Western literature.",
  memoryHook:
    "3-3-3 rule: 3 canticles (Inferno, Purgatorio, Paradiso), 33 cantos each (+1 intro = 100 total), terza rima (ABA BCB CDC rhyme). Written in vernacular Tuscan, not Latin. Guide: Virgil = reason, Beatrice = faith.",
  imatTrap:
    "Dante wrote in vernacular Italian, NOT Latin — this was revolutionary and helped standardise the Italian language. Students confuse Virgil (guide through Inferno & Purgatorio) with Beatrice (guide through Paradiso). Also: Dante was exiled from Florence, not imprisoned by the Church.",
  whyItMatters:
    "Dante's use of vernacular Italian established a literary language for the peninsula centuries before political unification (1861). His work bridges medieval theology and Renaissance humanism, influencing art, philosophy, and the concept of the afterlife in Western culture.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Historical Context</h3>
      <p>
        <strong>Dante Alighieri</strong> (1265–1321) was a Florentine poet,
        politician, and philosopher. He was exiled from Florence in 1302 due to
        the conflict between the Guelphs (papal supporters) and Ghibellines
        (imperial supporters). He wrote the <em>Divine Comedy</em> during exile.
      </p>

      <h3 className="text-lg font-semibold mt-4">
        Structure of the Divine Comedy
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Inferno (Hell)</strong>: 9 circles of descending sin. Guided
          by <strong>Virgil</strong> (Roman poet, symbol of human reason).
          Famous inscription: &quot;Abandon all hope, ye who enter here.&quot;
        </li>
        <li>
          <strong>Purgatorio (Purgatory)</strong>: Mountain with 7 terraces (7
          deadly sins). Souls purify themselves before ascending to Paradise.
          Still guided by Virgil.
        </li>
        <li>
          <strong>Paradiso (Paradise)</strong>: 9 celestial spheres + the
          Empyrean. Guided by <strong>Beatrice</strong> (Dante&apos;s idealised
          love, symbol of divine grace/theology).
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Literary Significance</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Written in <strong>vernacular Tuscan Italian</strong>, not Latin — a
          deliberate choice to reach a broader audience.
        </li>
        <li>
          Helped standardise the Italian language; Dante is called the
          &quot;Father of the Italian language.&quot;
        </li>
        <li>
          Uses <strong>terza rima</strong> (interlocking three-line stanzas: ABA
          BCB CDC…), reflecting the Holy Trinity.
        </li>
        <li>
          Blends classical (Virgil, Aristotle) and Christian (Aquinas, Bernard)
          traditions — a bridge between medieval and Renaissance thought.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "dante-q1",
      type: "multiple-choice",
      prompt: "Who guides Dante through the Inferno and Purgatorio?",
      options: ["Beatrice", "Virgil", "Aristotle", "St. Bernard"],
      answer: "Virgil",
      explanation:
        "Virgil, the Roman poet author of the Aeneid, represents human reason. He guides Dante through Hell and Purgatory but cannot enter Paradise (as a pre-Christian soul). Beatrice takes over as guide in Paradiso.",
      difficulty: "recall",
    },
    {
      id: "dante-q2",
      type: "multiple-choice",
      prompt: "In what language did Dante write the Divine Comedy?",
      options: ["Latin", "Vernacular Tuscan Italian", "French", "Greek"],
      answer: "Vernacular Tuscan Italian",
      explanation:
        "Dante deliberately chose vernacular Tuscan over Latin, making literature accessible beyond the clergy and scholars. This choice helped establish Tuscan as the basis for standard Italian.",
      difficulty: "recall",
    },
    {
      id: "dante-q3",
      type: "explain-why",
      prompt: "Why is Dante considered the 'Father of the Italian language'?",
      answer:
        "Dante wrote the Divine Comedy in vernacular Tuscan Italian at a time when scholarly works were composed in Latin. His masterpiece demonstrated that Italian could express the highest literary and philosophical ideas, influencing other writers and eventually establishing Tuscan as the foundation of standard Italian.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["modern-italian", "renaissance", "ancient-philosophy"],
  prerequisites: [],
};

export default note;
