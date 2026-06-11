"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question:
      "Which organ systems are primarily responsible for maintaining homeostasis?",
    answer: "Nervous system and endocrine system",
    context: "Fast (nerves) vs slow (hormones) control",
  },
  {
    id: "qf-2",
    question: "What is the function of the circulatory system?",
    answer:
      "Transport O₂, nutrients, hormones, and waste products throughout the body",
    context: "Supply + removal",
  },
  {
    id: "qf-3",
    question: "Which organ system filters blood and produces urine?",
    answer: "Urinary system (kidneys, ureters, bladder, urethra)",
    context: "Waste removal + fluid balance",
  },
];

export const organSystemsNote: AtomicNote = {
  slug: "organ-systems",
  subject: "biology",
  topic: "anatomy-and-physiology",
  title: "Organ Systems",
  summary:
    "The human body consists of 11 major organ systems, each with specific functions. They are structurally and functionally integrated — no system works in isolation. Key systems: nervous, endocrine, circulatory, respiratory, digestive, muscular, skeletal, integumentary, immune, urinary, and reproductive.",
  memoryHook:
    "11 Systems: Nervous (control), Endocrine (hormones), Circulatory (transport), Respiratory (gas exchange), Digestive (food breakdown), Muscular (movement), Skeletal (support), Integumentary (protection), Immune (defence), Urinary (filtration), Reproductive (procreation).",
  imatTrap:
    "Organs can belong to MULTIPLE systems. The pancreas is BOTH endocrine (insulin/glucagon — islets of Langerhans) and exocrine (digestive enzymes — acinar cells). The skin is integumentary, but also has sensory, thermoregulatory, and immune functions. The trap is assuming one organ = one system.",
  whyItMatters:
    "Understanding organ systems is fundamental to clinical medicine. Symptoms in one system often originate in another (e.g., heart failure causes fluid in lungs → respiratory distress). Integrated knowledge is required for diagnosis, treatment planning, and surgical interventions.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Organ-system mapping — which organ belongs to which system",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Systems integration (e.g., CO₂ transport in blood)",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Pancreas: endocrine AND exocrine function",
    },
  ],
  equations: [
    {
      id: "organ-cardiac-output",
      latex: "CO = HR \\times SV",
      description:
        "Cardiac output = heart rate × stroke volume (~5 L/min at rest)",
      variables: "HR = beats/min, SV = mL/beat",
    },
    {
      id: "organ-vital-capacity",
      latex: "VC = TV + IRV + ERV",
      description:
        "Vital capacity = tidal volume + inspiratory reserve + expiratory reserve",
    },
    {
      id: "organ-gfr",
      latex: "GFR \\approx 125\\ mL/min \\quad (\\text{normal})",
      description:
        "Glomerular filtration rate — volume of blood filtered per minute",
    },
  ],
  workedExamples: [
    {
      id: "organ-worked-1",
      question:
        "Trace the path of an oxygen molecule from the atmosphere to a muscle cell in the leg, naming the organ systems involved at each step.",
      hints: [
        "What system moves air into the lungs?",
        "What system transports O₂ in the blood?",
        "What tissue actually consumes the O₂?",
      ],
      solution:
        "1) Nose/mouth (respiratory system) → 2) Trachea → bronchi → alveoli (respiratory system). 3) O₂ diffuses into pulmonary capillaries (circulatory system). 4) O₂ binds to haemoglobin in RBCs. 5) Heart pumps oxygenated blood (circulatory system) → 6) Arteries → arterioles → capillaries in leg muscle. 7) O₂ diffuses into muscle cells (muscular system) → mitochondria for oxidative phosphorylation. Systems involved: respiratory, circulatory, and muscular.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Human Body Systems",
      url: "https://www.khanacademy.org/science/biology/human-biology",
      type: "video",
      description: "Video series covering all major organ systems",
    },
    {
      title: "OpenStax Anatomy & Physiology",
      url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-2-structural-organization-of-the-human-body",
      type: "textbook",
      description: "Free textbook on human anatomy and physiology",
    },
    {
      title: "IMAT Buddy — Human Biology Questions",
      url: "https://www.imatbuddy.com/imat-science-question-banks/",
      type: "practice",
      description: "IMAT-style questions on organ systems",
    },
  ],
  highYieldPoints: [
    "11 major systems: nervous, endocrine, circulatory, respiratory, digestive, muscular, skeletal, integumentary, immune, urinary, reproductive",
    "Pancreas: endocrine (insulin/glucagon) + exocrine (digestive enzymes) — dual function",
    "Heart (circulatory), lungs (respiratory), and blood (circulatory) work together for gas exchange",
    "Nervous: fast electrical signals; Endocrine: slow chemical messengers (hormones in blood)",
    "Kidneys (urinary): filter blood, regulate pH, fluid balance, and electrolyte concentration",
    "Skin (integumentary): barrier, thermoregulation, vitamin D synthesis, sensory perception",
    "Systems integration: e.g., exercise requires coordinated action of muscular, circulatory, respiratory, and nervous systems",
  ],
  explanation: (
    <div>
      <p>
        The human body is organised hierarchically: cells → tissues → organs →
        <strong>organ systems</strong> → organism. Each organ system has a
        specific function, but systems work together to maintain health.
      </p>

      <h3>The 11 Organ Systems</h3>
      <div className="grid gap-3">
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">1. Nervous System</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Brain, spinal cord, peripheral nerves. Rapid signalling via action
            potentials. Controls voluntary movement, reflexes, sensation, and
            higher functions (memory, language).
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">2. Endocrine System</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Glands (pituitary, thyroid, adrenal, pancreas) that secrete hormones
            into blood. Slower, longer-lasting control of metabolism, growth,
            reproduction, and homeostasis.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">
            3. Circulatory (Cardiovascular) System
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Heart, blood vessels, blood. Transports O₂, nutrients, hormones, and
            waste. Maintains body temperature and pH balance.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">4. Respiratory System</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Nose, trachea, bronchi, lungs. Gas exchange: O₂ in, CO₂ out. Also
            involved in pH regulation and sound production.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">5. Digestive System</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Mouth, oesophagus, stomach, intestines, liver, pancreas, gall
            bladder. Mechanical and chemical breakdown of food → nutrient
            absorption.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">6. Muscular System</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Skeletal, smooth, and cardiac muscle. Movement, posture, heat
            production (shivering).
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">7. Skeletal System</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Bones, cartilage, ligaments, joints. Support, protection of organs,
            mineral storage (Ca²⁺), blood cell production (bone marrow).
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">8. Integumentary System</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Skin, hair, nails, sweat glands. Barrier against pathogens, UV
            protection, thermoregulation, vitamin D synthesis.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">
            9. Immune (Lymphatic) System
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Lymph nodes, spleen, thymus, bone marrow, leukocytes. Defence
            against pathogens, removal of cellular debris, immune memory.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">10. Urinary System</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Kidneys, ureters, bladder, urethra. Filter blood, remove waste
            (urea), regulate fluid and electrolyte balance, control blood pH and
            pressure.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">11. Reproductive System</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Male: testes, penis, associated ducts. Female: ovaries, fallopian
            tubes, uterus, vagina. Production of gametes, hormone secretion, and
            (in females) support of pregnancy.
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Key Integrations</h3>
      <p>
        The <strong>nervous</strong> and <strong>endocrine</strong> systems are
        the master controllers. The <strong>circulatory</strong> system connects
        all others: O₂ from respiratory, nutrients from digestive, hormones from
        endocrine, and waste to urinary. The <strong>immune</strong> system
        patrols the entire body via blood and lymph.
      </p>

      <h3>The Dual-Role Pancreas</h3>
      <p>
        Most endocrine organs are purely endocrine (thyroid, pituitary), but the
        pancreas is both:
      </p>
      <ul>
        <li>
          <strong>Endocrine:</strong> islets of Langerhans → insulin, glucagon,
          somatostatin into blood
        </li>
        <li>
          <strong>Exocrine:</strong> acinar cells → digestive enzymes (amylase,
          lipase, proteases) into pancreatic duct → small intestine
        </li>
      </ul>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "organ-worked-1",
            question:
              "Trace the path of an oxygen molecule from the atmosphere to a muscle cell in the leg, naming the organ systems involved at each step.",
            hints: [
              "What system moves air into the lungs?",
              "What system transports O₂ in the blood?",
              "What tissue actually consumes the O₂?",
            ],
            solution:
              "1) Nose/mouth (respiratory system) → 2) Trachea → bronchi → alveoli (respiratory system). 3) O₂ diffuses into pulmonary capillaries (circulatory system). 4) O₂ binds to haemoglobin in RBCs. 5) Heart pumps oxygenated blood (circulatory system) → 6) Arteries → arterioles → capillaries in leg muscle. 7) O₂ diffuses into muscle cells (muscular system) → mitochondria for oxidative phosphorylation. Systems involved: respiratory, circulatory, and muscular.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "11 organ systems, each with distinct primary functions",
          "Systems are integrated — no system works alone",
          "Pancreas: both endocrine (hormones) and exocrine (enzymes)",
          "Nervous (fast) + Endocrine (slow) = master control",
          "Circulatory = transport network connecting all systems",
          "Skin is the largest organ (by surface area)",
          "Kidneys regulate blood volume, pH, and electrolyte balance",
        ].map((point) => (
          <div
            key={point}
            className="flex items-start gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-2"
          >
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">{point}</span>
          </div>
        ))}
      </div>

      <QuickFire questions={recallQuestions.slice(2, 3)} title="Final Check" />
    </div>
  ),
  questions: [
    {
      id: "organ-q1",
      type: "multiple-choice",
      prompt: "Which organ system is responsible for producing hormones?",
      answer: "Endocrine system",
      difficulty: "recall",
      options: [
        "Nervous system",
        "Endocrine system",
        "Circulatory system",
        "Digestive system",
      ],
    },
    {
      id: "organ-q2",
      type: "multiple-choice",
      prompt: "The pancreas belongs to which organ system(s)?",
      answer: "Both endocrine and digestive",
      difficulty: "recall",
      options: [
        "Endocrine only",
        "Digestive only",
        "Both endocrine and digestive",
        "Respiratory",
      ],
    },
    {
      id: "organ-q3",
      type: "multiple-choice",
      prompt: "What is the function of the urinary system?",
      answer: "Filter blood, remove waste, regulate fluid balance",
      difficulty: "recall",
      options: [
        "Produce blood cells",
        "Filter blood, remove waste, regulate fluid balance",
        "Digest food",
        "Control body movements",
      ],
    },
    {
      id: "organ-q4",
      type: "multiple-choice",
      prompt:
        "Which system transports hormones from endocrine glands to target organs?",
      answer: "Circulatory system",
      difficulty: "apply",
      options: [
        "Nervous system",
        "Circulatory system",
        "Lymphatic system",
        "Respiratory system",
      ],
    },
    {
      id: "organ-q5",
      type: "multiple-choice",
      prompt: "Oxygen moves from the alveoli into the blood via which process?",
      answer: "Diffusion",
      difficulty: "apply",
      options: [
        "Active transport",
        "Facilitated diffusion",
        "Diffusion",
        "Endocytosis",
      ],
      imatYear: 2022,
    },
    {
      id: "organ-q6",
      type: "explain-why",
      prompt:
        "Explain why a failure in one organ system often has effects on multiple other systems, using an example.",
      answer:
        "Systems are functionally interconnected. Example: heart failure (circulatory) reduces blood pumping → fluid accumulates in lungs (respiratory → dyspnoea) → reduced O₂ delivery to kidneys (urinary → reduced GFR → fluid retention, worsening heart failure). This is a cascade: one failing system pulls others down, which is why multi-organ failure is life-threatening.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["homeostasis", "cell-theory", "organelles"],
  prerequisites: ["homeostasis"],
};
