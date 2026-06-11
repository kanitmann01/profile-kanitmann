"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "ww-qf-1",
    question: "What was Italy's position in 1914 at the start of WWI?",
    answer:
      "Neutral. Italy was in the Triple Alliance but declared neutrality in 1914, joining the Entente in 1915 after the Treaty of London.",
    context: "Italy in WWI",
  },
  {
    id: "ww-qf-2",
    question: "Which medical advancement is associated with WWII?",
    answer:
      "Mass production of penicillin (Florey and Chain). The first blood bank was a WWI innovation.",
    context: "Medical advances",
  },
  {
    id: "ww-qf-3",
    question: "When did Italy switch sides in WWII?",
    answer:
      "1943 — Allied invasion of Sicily, Mussolini deposed, armistice with Allies. Civil war in the north until 1945.",
    context: "Italy in WWII",
  },
  {
    id: "ww-qf-4",
    question: "What were the MAIN causes of WWI?",
    answer:
      "Militarism, Alliances, Imperialism, Nationalism. Trigger: assassination of Archduke Franz Ferdinand (Sarajevo, 28 June 1914).",
    context: "WWI causes",
  },
];

export const worldWarsNote: AtomicNote = {
  slug: "world-wars",
  subject: "general-knowledge",
  topic: "european-history",
  title: "The World Wars",
  summary:
    "Two global conflicts (1914-1918 and 1939-1945) that reshaped borders, ideologies, and medicine, ending European hegemony and birthing the modern international order.",
  memoryHook:
    "WWI = M-A-I-N (Militarism, Alliances, Imperialism, Nationalism), spark = Sarajevo 1914. WWII = Treaty of Versailles yields fascism yields Hitler. Medical: WWI yields blood banks, triage. WWII yields penicillin, Nuremberg Code.",
  imatTrap:
    "Italy switched sides in BOTH wars. WWI: neutral 1914 to Entente 1915. WWII: Axis 1940 to Allied armistice 1943. Students often assume Italy was consistently on one side.",
  whyItMatters:
    "Both wars accelerated medical innovation: WWI pioneered blood transfusion and triage. WWII brought penicillin and the Nuremberg Code (1947) establishing informed consent in medical research.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Italy's role in both wars is the most tested topic",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Medical advances in wartime (penicillin, blood banks)",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "ww-we-1",
      question:
        "In 1915, Italy joined which side in WWI, and why did it switch? The options mention the Triple Alliance and Entente. Trace the timeline and explain Italy's reasoning step by step.",
      hints: [
        "Italy was originally in the Triple Alliance with Germany and Austria-Hungary.",
        "But Italy declared NEUTRALITY in 1914. Why would they abandon their allies?",
        "The Treaty of London (1915) promised territorial gains (Trento, Trieste, etc.).",
        "Italy claimed the Triple Alliance was defensive and Austria-Hungary was the aggressor.",
      ],
      solution:
        "Italy joined the Entente (Allied) side in 1915. Timeline: (1) 1882 — Italy joins Triple Alliance (Germany, Austria-Hungary). (2) 1914 — Austria-Hungary declares war on Serbia; Italy declares neutrality, claiming the alliance was defensive and Austria was the aggressor. (3) 1915 — Secret Treaty of London promises Italy Trento, Trieste, South Tyrol, Istria, and Dalmatia after victory. (4) May 1915 — Italy declares war on Austria-Hungary. Key IMAT point: Italy did not simply 'switch sides' — it had strategic reasons and territorial ambitions.",
    },
  ],
  externalResources: [
    {
      title: "BBC Bitesize — World War I",
      url: "https://www.bbc.co.uk/bitesize/topics/zqhyb9q",
      type: "article",
      description: "GCSE-level history resources on World War I",
    },
    {
      title: "Britannica — World War II",
      url: "https://www.britannica.com/event/World-War-II",
      type: "article",
      description: "Comprehensive reference on World War II",
    },
    {
      title: "IMAT Buddy — General Knowledge",
      url: "https://www.imatbuddy.com/imat-general-knowledge/",
      type: "practice",
      description: "IMAT-style GK practice questions on world wars",
    },
  ],
  highYieldPoints: [
    "WWI causes: MAIN (Militarism, Alliances, Imperialism, Nationalism)",
    "Italy: Triple Alliance but NEUTRAL 1914 to Entente 1915 (Treaty of London promised Trento, Trieste)",
    "WWI medical: blood banks (1917, Oswald Robertson), triage, shell shock recognition",
    "WWII causes: Versailles humiliation, rise of fascism (Mussolini 1922, Hitler 1933), failure of League of Nations",
    "Italy: Axis 1940 to armistice 1943 (Allied invasion of Sicily, Mussolini deposed)",
    "WWII medical: penicillin mass production (Florey and Chain), Nuremberg Code (1947, informed consent)",
    "Outcomes: League of Nations to UN (1945), Cold War begins, European decolonisation",
  ],
  explanation: (
    <div>
      <h3>World War I (1914-1918)</h3>
      <p>
        <strong>Causes (MAIN):</strong> Militarism, Alliances, Imperialism,
        Nationalism.
      </p>
      <p>
        <strong>Trigger:</strong> Assassination of Archduke Franz Ferdinand
        (Sarajevo, 28 June 1914).
      </p>
      <p>
        <strong>Italy:</strong> Triple Alliance member, but neutral 1914. Joined
        Entente 1915 via Treaty of London (promised Trento, Trieste).
      </p>
      <p>
        <strong>Outcome:</strong> Treaty of Versailles (1919), collapse of four
        empires, League of Nations.
      </p>

      <h3>World War II (1939-1945)</h3>
      <p>
        <strong>Causes:</strong> Versailles humiliation, rise of fascism
        (Mussolini 1922, Hitler 1933), failure of League of Nations.
      </p>
      <p>
        <strong>Key events:</strong> Invasion of Poland (1 Sept 1939), Fall of
        France (1940), D-Day (6 June 1944), atomic bombs (Aug 1945).
      </p>
      <p>
        <strong>Italy:</strong> Mussolini joined Axis 1940. Allied invasion of
        Sicily (1943), armistice Sept 1943, civil war until 1945.
      </p>
      <p>
        <strong>Outcome:</strong> UN founded (1945), Cold War begins, European
        decolonisation, Nuremberg Trials.
      </p>

      <h3>Medical Legacy</h3>
      <p>
        <strong>WWI:</strong> Blood banks (Oswald Robertson, 1917), triage,
        Thomas splint, shell shock recognition.
      </p>
      <p>
        <strong>WWII:</strong> Mass penicillin (Florey and Chain), Nuremberg
        Code (1947) — informed consent from Nazi doctor trials.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 2)}
        title="Quick Check: World Wars Facts"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "WWI causes: MAIN (Militarism, Alliances, Imperialism, Nationalism)",
          "Italy: Triple Alliance but NEUTRAL 1914 to Entente 1915 (Treaty of London)",
          "WWI medical: blood banks (1917), triage, shell shock",
          "Italy: Axis 1940 to armistice 1943 (Allied invasion of Sicily)",
          "WWII medical: penicillin (mass production), Nuremberg Code (1947)",
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
      id: "world-wars-q1",
      type: "multiple-choice",
      prompt: "What was Italy's position during WWI (1914-1915)?",
      options: [
        "Fought with Germany and Austria-Hungary",
        "Neutral, then joined Entente in 1915",
        "Joined Entente immediately in 1914",
        "Neutral throughout the war",
      ],
      answer: "Neutral, then joined Entente in 1915",
      explanation:
        "Italy declared neutrality in 1914 and joined the Entente in 1915 after the Treaty of London.",
      difficulty: "recall",
    },
    {
      id: "world-wars-q2",
      type: "multiple-choice",
      prompt: "Which medical advancement is most associated with WWII?",
      options: [
        "First blood bank",
        "Mass penicillin production",
        "X-rays",
        "Smallpox vaccine",
      ],
      answer: "Mass penicillin production",
      explanation:
        "Florey and Chain developed penicillin for clinical use during WWII, enabling mass production by 1943.",
      difficulty: "apply",
    },
    {
      id: "world-wars-q3",
      type: "multiple-choice",
      prompt: "When did Italy switch from the Axis to the Allies in WWII?",
      options: ["1940", "1941", "1943", "1945"],
      answer: "1943",
      explanation:
        "Allied invasion of Sicily (1943), Mussolini deposed, armistice signed September 1943.",
      difficulty: "recall",
    },
    {
      id: "world-wars-q4",
      type: "multiple-choice",
      prompt:
        "What was the primary cause of WWII according to the IMAT syllabus?",
      options: [
        "The assassination of Franz Ferdinand",
        "The Treaty of Versailles and rise of fascism",
        "The failure of the United Nations",
        "The Bolshevik Revolution",
      ],
      answer: "The Treaty of Versailles and rise of fascism",
      explanation:
        "Versailles imposed harsh reparations and humiliation on Germany, enabling the rise of Hitler and fascism.",
      difficulty: "recall",
    },
    {
      id: "world-wars-q5",
      type: "multiple-choice",
      prompt: "What was the significance of the Nuremberg Code (1947)?",
      options: [
        "It ended WWII",
        "It established informed consent in medical research",
        "It founded the UN",
        "It divided Germany",
      ],
      answer: "It established informed consent in medical research",
      explanation:
        "The Nuremberg Code emerged from the Nazi doctor trials, establishing that voluntary informed consent is essential in human experimentation.",
      difficulty: "apply",
    },
    {
      id: "world-wars-q6",
      type: "explain-why",
      prompt: "How did the Treaty of Versailles contribute to WWII?",
      answer:
        "The Treaty imposed harsh reparations, territorial losses, and war guilt on Germany, creating economic devastation and humiliation. This enabled Hitler's rise by promising to restore German pride and territory.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["renaissance", "un-system", "eu-institutions"],
  prerequisites: [],
};
