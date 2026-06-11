"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "un-qf-1",
    question:
      "Which UN body can authorise binding resolutions and military action?",
    answer:
      "The Security Council (15 members: 5 permanent P5 with veto, 10 rotating). GA resolutions are non-binding.",
    context: "UN Security Council",
  },
  {
    id: "un-qf-2",
    question: "Name the P5 permanent members of the Security Council.",
    answer:
      "USA, UK, France, Russia, China. (Not Germany, not Japan, not India.)",
    context: "P5 members",
  },
  {
    id: "un-qf-3",
    question: "What is the relationship between WHO and the UN?",
    answer:
      "WHO is a specialised agency — autonomous with its own budget and governance (World Health Assembly), linked to the UN by a special agreement. NOT a UN organ.",
    context: "UN agencies",
  },
  {
    id: "un-qf-4",
    question: "When was the UN founded and how many original members?",
    answer: "24 October 1945, 51 original members. Headquarters: New York.",
    context: "UN founding",
  },
];

export const unSystemNote: AtomicNote = {
  slug: "un-system",
  subject: "general-knowledge",
  topic: "international-institutions",
  title: "The United Nations System",
  summary:
    "The UN (founded 1945) is the central framework for international cooperation. Six principal organs plus specialised agencies (WHO, UNESCO, UNICEF) address peace, health, education, and development.",
  memoryHook:
    "UN = 6 organs plus agencies. Organs: GA (all members, non-binding), SC (P5 veto), ECOSOC, ICJ (The Hague), Secretariat (SG), Trusteeship (suspended). Agencies: WHO (health), UNESCO (culture), UNICEF (children).",
  imatTrap:
    "GA does not equal SC — GA is deliberative (non-binding); SC has enforcement power (binding resolutions, sanctions, military action). P5 veto: USA, UK, France, Russia, China. WHO is a specialised agency, NOT a UN organ.",
  whyItMatters:
    "WHO coordinates global health: pandemics, vaccination (COVAX), eradication (smallpox 1980). UNICEF drives child health. Understanding the UN system is essential for global public health governance.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "UN system appears in nearly every IMAT GK section",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "WHO and global health topics are increasingly common",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "un-we-1",
      question:
        "Which of the following statements about the UN is correct? (A) The General Assembly can pass binding resolutions. (B) The Security Council has 15 members, 5 of which have veto power. (C) WHO is a principal organ of the UN. (D) All UN members are on the Security Council. Explain why each is correct or incorrect.",
      hints: [
        "GA resolutions are recommendations, not binding.",
        "WHO is a specialised agency, not a principal organ.",
        "Only 15 of 193 members serve on the SC at any time.",
        "The SC has exactly 15 members, with 5 permanent (P5) having veto power.",
      ],
      solution:
        "(B) is correct. The Security Council has 15 members: 5 permanent (P5: USA, UK, France, Russia, China) with veto power and 10 non-permanent elected for 2-year terms. (A) is wrong — GA passes non-binding recommendations. (C) is wrong — WHO is a specialised agency, not an organ. (D) is wrong — only 15 members sit on the SC at any time.",
    },
  ],
  externalResources: [
    {
      title: "UN — Main Bodies",
      url: "https://www.un.org/en/about-us/main-bodies",
      type: "article",
      description: "Official UN guide to its principal organs",
    },
    {
      title: "WHO — About WHO",
      url: "https://www.who.int/about",
      type: "article",
      description: "WHO governance and structure",
    },
    {
      title: "IMAT Buddy — General Knowledge",
      url: "https://www.imatbuddy.com/imat-general-knowledge/",
      type: "practice",
      description: "IMAT-style GK practice questions on UN",
    },
  ],
  highYieldPoints: [
    "UN founded 24 October 1945 by 51 nations, HQ New York",
    "GA: 193 members, one vote each, non-binding resolutions",
    "SC: 15 members (P5: USA, UK, France, Russia, China) with veto power, binding resolutions",
    "Only the SC can authorise sanctions and military action",
    "WHO, UNESCO, UNICEF = specialised agencies (NOT organs of the UN)",
    "ICJ: settles disputes between states, The Hague, Netherlands",
    "Trusteeship Council: suspended since 1994 (all trust territories achieved independence)",
  ],
  explanation: (
    <div>
      <h3>Founding and Purpose</h3>
      <p>
        Founded <strong>24 October 1945</strong> in San Francisco by 51 nations
        after the League of Nations failed to prevent WWII. Headquarters: New
        York. Charter: maintain peace, international cooperation, human rights.
      </p>

      <h3>Six Principal Organs</h3>
      <p>
        <strong>General Assembly (GA):</strong> All 193 members, one vote each.
        Resolutions are non-binding recommendations.
      </p>
      <p>
        <strong>Security Council (SC):</strong> 15 members — 5 permanent (P5:
        USA, UK, France, Russia, China) with <strong>veto power</strong>, 10
        elected for 2-year terms. Only body that authorises binding resolutions,
        sanctions, and military action.
      </p>
      <p>
        <strong>ECOSOC:</strong> Coordinates economic, social, and humanitarian
        work.
      </p>
      <p>
        <strong>ICJ:</strong> Settles disputes between states. The Hague,
        Netherlands.
      </p>
      <p>
        <strong>Secretariat:</strong> Headed by the Secretary-General.
        Administrative arm.
      </p>
      <p>
        <strong>Trusteeship Council:</strong> Suspended operations in 1994.
      </p>

      <h3>Key Specialised Agencies</h3>
      <p>
        <strong>WHO:</strong> Global health coordination, disease surveillance,
        International Health Regulations.
      </p>
      <p>
        <strong>UNESCO:</strong> World Heritage Sites, education, science,
        culture.
      </p>
      <p>
        <strong>UNICEF:</strong> Child health, nutrition, education, emergency
        relief.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 2)}
        title="Quick Check: UN Facts"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "UN founded 24 October 1945, 51 original members, HQ New York",
          "GA: 193 members, one vote each, non-binding resolutions",
          "SC: 15 members (P5: USA, UK, France, Russia, China) with veto, binding resolutions",
          "Only the SC can authorise sanctions and military action",
          "WHO, UNESCO, UNICEF = specialised agencies (NOT organs)",
          "ICJ: settles state disputes, The Hague",
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
      id: "un-system-q1",
      type: "multiple-choice",
      prompt:
        "Which UN body can authorise binding resolutions, sanctions, and military action?",
      options: ["General Assembly", "Security Council", "ECOSOC", "ICJ"],
      answer: "Security Council",
      explanation:
        "The Security Council is the only UN body whose resolutions are legally binding on member states.",
      difficulty: "recall",
    },
    {
      id: "un-system-q2",
      type: "multiple-choice",
      prompt: "Which is NOT a permanent member of the UN Security Council?",
      options: ["China", "Germany", "France", "Russia"],
      answer: "Germany",
      explanation:
        "P5 are USA, UK, France, Russia, and China. Germany has no veto power.",
      difficulty: "recall",
    },
    {
      id: "un-system-q3",
      type: "multiple-choice",
      prompt: "What is WHO's relationship to the UN?",
      options: [
        "It is a principal organ of the UN",
        "It is a specialised agency linked to the UN by agreement",
        "It is independent and not linked to the UN",
        "It is a committee of the Security Council",
      ],
      answer: "It is a specialised agency linked to the UN by agreement",
      explanation:
        "WHO is autonomous with its own budget and governance, cooperating with the UN as a specialised agency.",
      difficulty: "apply",
    },
    {
      id: "un-system-q4",
      type: "multiple-choice",
      prompt: "When was the UN founded?",
      options: ["1919", "1939", "1945", "1950"],
      answer: "1945",
      explanation:
        "The United Nations was founded on 24 October 1945 in San Francisco with 51 original members.",
      difficulty: "recall",
    },
    {
      id: "un-system-q5",
      type: "multiple-choice",
      prompt: "What is the ICJ's role?",
      options: [
        "Prosecute war criminals",
        "Settle disputes between states",
        "Draft UN resolutions",
        "Peacekeeping operations",
      ],
      answer: "Settle disputes between states",
      explanation:
        "The International Court of Justice (ICJ) in The Hague settles legal disputes between states and provides advisory opinions.",
      difficulty: "recall",
    },
    {
      id: "un-system-q6",
      type: "explain-why",
      prompt:
        "Why does the General Assembly pass non-binding resolutions while the Security Council passes binding ones?",
      answer:
        "The UN Charter gives the Security Council primary responsibility for international peace and security, so its resolutions are binding. The GA is a deliberative forum where all 193 members have equal voice but no enforcement power — this balances inclusivity with effectiveness.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["eu-institutions", "world-wars"],
  prerequisites: [],
};
