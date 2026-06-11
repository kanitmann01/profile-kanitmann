import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "world-wars",
  subject: "general-knowledge",
  topic: "european-history",
  title: "The World Wars",
  summary:
    "Two global conflicts (1914–1918 and 1939–1945) that reshaped borders, ideologies, technology, and medicine, ending European hegemony and birthing the modern international order.",
  memoryHook:
    "WWI = M-A-I-N causes (Militarism, Alliances, Imperialism, Nationalism), spark = Sarajevo 1914. WWII = Treaty of Versailles → fascism → Hitler. Medicine: WWI → blood banks, triage, shell shock. WWII → penicillin, radar, atomic age.",
  imatTrap:
    "Italy switched sides: neutral 1914, joined the Allies (Entente) in 1915 via the Treaty of London. In WWII, Italy was initially Axis (1940), then surrendered to the Allies in 1943. Students often assume Italy was consistently on one side.",
  whyItMatters:
    "Both wars accelerated medical innovation: WWI pioneered blood transfusion, antiseptic surgery, and psychological trauma recognition (PTSD). WWII brought mass penicillin production, advances in trauma surgery, and the Nuremberg Code (1947) on medical ethics.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">World War I (1914–1918)</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Causes (MAIN)</strong>: Militarism, Alliances (Triple Entente
          vs Triple Alliance), Imperialism, Nationalism.
        </li>
        <li>
          <strong>Trigger</strong>: Assassination of Archduke Franz Ferdinand in
          Sarajevo (28 June 1914).
        </li>
        <li>
          <strong>Italy&apos;s role</strong>: Initially part of the Triple
          Alliance with Germany and Austria-Hungary, but declared neutrality in
          1914. Joined the Entente in 1915 after the secret Treaty of London
          promised territorial gains.
        </li>
        <li>
          <strong>Outcome</strong>: Treaty of Versailles (1919), collapse of
          four empires (Ottoman, Austro-Hungarian, Russian, German), League of
          Nations established.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">World War II (1939–1945)</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Causes</strong>: Treaty of Versailles humiliation, rise of
          fascism (Mussolini 1922, Hitler 1933), expansionism, failure of the
          League of Nations.
        </li>
        <li>
          <strong>Key events</strong>: Invasion of Poland (1 Sept 1939), Fall of
          France (1940), D-Day (6 June 1944), atomic bombs on Hiroshima/Nagasaki
          (Aug 1945).
        </li>
        <li>
          <strong>Italy</strong>: Mussolini&apos;s fascist regime joined Axis in
          1940. Allied invasion of Sicily (1943), Italian armistice with Allies
          (Sept 1943), civil war in the north until 1945.
        </li>
        <li>
          <strong>Outcome</strong>: United Nations founded (1945), Cold War
          begins, European decolonisation, Nuremberg Trials.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">
        Medical &amp; Technological Legacy
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>WWI</strong>: Blood banks (Oswald Robertson, 1917), triage
          systems, Thomas splint (femur fractures), recognition of &quot;shell
          shock&quot;.
        </li>
        <li>
          <strong>WWII</strong>: Mass production of penicillin (Florey & Chain),
          radar, jet engines, V2 rockets → space race, Nuremberg Code (1947)
          establishing informed consent.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "world-wars-q1",
      type: "multiple-choice",
      prompt:
        "What was Italy's position during the early years of World War I (1914–1915)?",
      options: [
        "Fought alongside Germany and Austria-Hungary",
        "Remained neutral, then joined the Entente in 1915",
        "Immediately joined the Entente in 1914",
        "Remained neutral throughout the entire war",
      ],
      answer: "Remained neutral, then joined the Entente in 1915",
      explanation:
        "Despite being in the Triple Alliance, Italy declared neutrality in 1914 and only entered the war in 1915 on the Entente side after the secret Treaty of London promised territorial gains (Trento, Trieste).",
      difficulty: "recall",
    },
    {
      id: "world-wars-q2",
      type: "multiple-choice",
      prompt:
        "Which medical advancement is most closely associated with World War II?",
      options: [
        "First blood bank",
        "Mass production of penicillin",
        "Discovery of X-rays",
        "Development of the smallpox vaccine",
      ],
      answer: "Mass production of penicillin",
      explanation:
        "Although Fleming discovered penicillin in 1928, it was Florey and Chain who developed it for clinical use during WWII, enabling mass production by 1943. The first blood bank was a WWI innovation (1917).",
      difficulty: "apply",
    },
    {
      id: "world-wars-q3",
      type: "explain-why",
      prompt:
        "How did the Treaty of Versailles (1919) contribute to the outbreak of World War II?",
      answer:
        "The Treaty imposed harsh reparations, territorial losses, and war guilt clauses on Germany, creating economic devastation and national humiliation. This fertile ground enabled Hitler's rise by promising to restore German pride and territory.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["renaissance", "un-system", "eu-institutions"],
  prerequisites: [],
};

export default note;
