import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "un-system",
  subject: "general-knowledge",
  topic: "international-institutions",
  title: "The United Nations System",
  summary:
    "The UN, founded in 1945, is the central framework for international cooperation — its six principal organs and specialised agencies (WHO, UNESCO, UNICEF) address peace, health, education, and development.",
  memoryHook:
    "UN = 6 organs + agencies. Organs: GA (all members), SC (5 permanent + 10 rotating), ECOSOC (economic/social), Trusteeship (suspended), ICJ (The Hague), Secretariat (SG). Agencies: WHO (health), UNESCO (culture/education), UNICEF (children). P5 veto = USA, UK, France, Russia, China.",
  imatTrap:
    "The UN General Assembly is NOT the Security Council — GA is a deliberative body (one state, one vote, non-binding resolutions); SC has enforcement power (binding resolutions, sanctions, military action). The P5 veto means any of the 5 permanent members can block SC action. WHO is a UN specialised agency, NOT a UN organ.",
  whyItMatters:
    "WHO (a UN agency) coordinates global health responses — pandemics, vaccination campaigns (COVAX), disease eradication (smallpox, 1980). UNICEF drives child health and nutrition programmes. Understanding the UN system is essential for global public health governance.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Founding &amp; Purpose</h3>
      <p>
        Founded <strong>24 October 1945</strong> in San Francisco by 51 nations,
        after the failure of the League of Nations to prevent WWII.
        Headquarters: New York City (international territory). Charter purposes:
        maintain peace, develop friendly relations, achieve international
        cooperation, promote human rights.
      </p>

      <h3 className="text-lg font-semibold mt-4">Six Principal Organs</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>General Assembly (GA)</strong>: All 193 member states, one
          vote each. Deliberative forum; resolutions are non-binding
          recommendations.
        </li>
        <li>
          <strong>Security Council (SC)</strong>: 15 members — 5 permanent (P5:
          USA, UK, France, Russia, China) with <strong>veto power</strong>, plus
          10 elected for 2-year terms. Only body that can authorise binding
          resolutions, sanctions, and military action.
        </li>
        <li>
          <strong>ECOSOC</strong> (Economic and Social Council): Coordinates
          economic, social, and humanitarian work.
        </li>
        <li>
          <strong>International Court of Justice (ICJ)</strong>: Settles
          disputes between states. Located in The Hague, Netherlands.
        </li>
        <li>
          <strong>Secretariat</strong>: Headed by the Secretary-General.
          Administrative arm.
        </li>
        <li>
          <strong>Trusteeship Council</strong>: Suspended operations in 1994
          after the last trust territory gained independence.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Key Specialised Agencies</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>WHO</strong> (World Health Organization): Global health
          coordination, disease surveillance, vaccination programmes,
          International Health Regulations.
        </li>
        <li>
          <strong>UNESCO</strong> (UN Educational, Scientific and Cultural
          Organization): World Heritage Sites, education, science, culture.
        </li>
        <li>
          <strong>UNICEF</strong> (UN Children&apos;s Fund): Child health,
          nutrition, education, emergency relief.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "un-system-q1",
      type: "multiple-choice",
      prompt:
        "Which UN body has the power to authorise binding resolutions, sanctions, and military action?",
      options: [
        "General Assembly",
        "Security Council",
        "ECOSOC",
        "International Court of Justice",
      ],
      answer: "Security Council",
      explanation:
        "The Security Council is the only UN body whose resolutions are legally binding on member states. It can impose sanctions, authorise military action, and refer cases to the ICC. GA resolutions are non-binding recommendations.",
      difficulty: "recall",
    },
    {
      id: "un-system-q2",
      type: "multiple-choice",
      prompt:
        "Which of the following is NOT a permanent member of the UN Security Council?",
      options: ["China", "Germany", "France", "Russia"],
      answer: "Germany",
      explanation:
        "The P5 are: USA, UK, France, Russia, and China. Germany, despite being a major power and UN member, is not a permanent Security Council member and has no veto power.",
      difficulty: "recall",
    },
    {
      id: "un-system-q3",
      type: "explain-why",
      prompt:
        "Why is WHO considered a UN specialised agency rather than a UN organ?",
      answer:
        "WHO is an autonomous organisation with its own membership, budget, and governance (World Health Assembly), linked to the UN through a special agreement. UN organs (like the GA or SC) are created directly by the UN Charter. Specialised agencies are independent bodies that cooperate with the UN on specific issues.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["eu-institutions", "world-wars"],
  prerequisites: [],
};

export default note;
