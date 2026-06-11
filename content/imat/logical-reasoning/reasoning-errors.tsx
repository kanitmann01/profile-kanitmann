"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const quickFire = [
  {
    id: "re-qf-1",
    question:
      "'I wore my lucky socks and passed the test. Therefore, my lucky socks caused me to pass.' What fallacy?",
    answer:
      "False Cause (post hoc ergo propter hoc) — assuming correlation means causation just because the socks came first.",
    context: "False cause",
  },
  {
    id: "re-qf-2",
    question:
      "'All doctors recommend this drug, and my doctor is a doctor, so my doctor must recommend it.' What is the error?",
    answer:
      "Fallacy of composition — assuming what is true of the group (all doctors) is true of each individual (your specific doctor).",
    context: "Composition fallacy",
  },
  {
    id: "re-qf-3",
    question:
      "'You cannot prove that the treatment does NOT work, so it must work.' Identify the fallacy.",
    answer:
      "Appeal to ignorance — lack of evidence against does not equal evidence for. The burden of proof is on the claim that it works.",
    context: "Appeal to ignorance",
  },
];

export const reasoningErrorsNote: AtomicNote = {
  slug: "reasoning-errors",
  subject: "logical-reasoning",
  topic: "evaluation",
  title: "Reasoning Errors (Fallacies)",
  summary:
    "Common logical fallacies tested on the IMAT: false cause, hasty generalisation, ad hominem, straw man, false dilemma, circular reasoning, and appeals to authority or ignorance.",
  memoryHook:
    '"F-H-A-S-C-A": False cause, Hasty generalisation, Ad hominem, Straw man, Circular reasoning, Appeal to authority. Spot the pattern, name the fallacy.',
  imatTrap:
    "Ad hominem attacks the PERSON, not the argument. 'A smoker giving health advice is hypocritical' is not an ad hominem — it may be relevant to credibility, not logic. True ad hominem: 'You're wrong because you're a smoker.'",
  whyItMatters:
    "Fallacies pervade medical claims: 'This patient's symptoms are psychosomatic because I can't find a cause' (appeal to ignorance), 'Alternative medicine has been used for centuries' (appeal to tradition). Recognising them is critical thinking.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Fallacy identification appears in most IMAT LR sections",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "False cause and hasty generalisation are most common",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "re-we-1",
      question:
        "A politician says: 'My opponent criticises my healthcare policy. But what does he know about healthcare? He failed his medical degree!' Identify the fallacy being used. Is it ad hominem or something else? How would you respond?",
      hints: [
        "Is the politician attacking the opponent's ARGUMENT or the opponent PERSONALLY?",
        "The opponent's medical qualifications might be relevant to credibility — but is that the same as a logical fallacy?",
        "Distinguish: abusive ad hominem (insults) vs circumstantial ad hominem (attacking motives or background).",
      ],
      solution:
        "This is an AD HOMINEM fallacy. The politician attacks the opponent's failed medical degree instead of addressing the substance of the healthcare policy criticism. However, this is a subtle one: if the opponent were criticising a technical medical detail, his failed degree might be relevant to his EXPERTISE. But attacking his qualifications to dismiss his argument about POLICY (not medical facts) is a fallacy. The proper response: 'Address the argument, not the person.'",
    },
    {
      id: "re-we-2",
      question:
        "A news report says: 'We interviewed three patients who developed complications after taking Drug X. Therefore, Drug X is dangerous.' Identify the fallacy. What additional information would you need to properly evaluate the claim?",
      hints: [
        "How many patients total took Drug X? Three patients out of what total?",
        "Are three patients enough to generalise to all patients?",
        "What type of study would you need to properly evaluate Drug X's safety?",
      ],
      solution:
        "This is a HASTY GENERALISATION — concluding about a large population (all Drug X users) from a tiny, non-random sample (three patients). The report may also involve SELECTION BIAS (only patients with complications were interviewed, not those with good outcomes). To properly evaluate, you would need: (1) total number of patients who took Drug X, (2) complication rate compared to a control group, (3) severity of complications, (4) whether complications were caused by Drug X or other factors. The IMAT trap: emotional anecdotes feel convincing but are logically weak.",
    },
  ],
  externalResources: [
    {
      title: "Your Logical Fallacy Is — Interactive Guide",
      url: "https://yourlogicalfallacyis.com/",
      type: "article",
      description: "Visual guide to common logical fallacies with examples",
    },
    {
      title: "LSAT Lab — Flaw Questions",
      url: "https://www.lsatlab.com/logical-reasoning/flaw/",
      type: "practice",
      description: "Drill flaw/fallacy identification in LSAT-style passages",
    },
    {
      title: "Khan Academy — Logical Fallacies",
      url: "https://www.khanacademy.org/test-prep/lsat",
      type: "video",
      description: "LSAT prep lessons on identifying reasoning errors",
    },
    {
      title: "Critical Thinking Web — Fallacies",
      url: "https://philosophy.hku.hk/think/fallacy/",
      type: "article",
      description:
        "University of Hong Kong: comprehensive fallacy guide with exercises",
    },
  ],
  highYieldPoints: [
    "False cause (post hoc ergo propter hoc): sequence does not imply causation",
    "Hasty generalisation: small or biased sample cannot support a broad claim",
    "Ad hominem: attack the person, not the argument",
    "Straw man: misrepresent the opponent's position to make it easier to attack",
    "False dilemma: presenting only two options when more exist",
    "Circular reasoning: premise and conclusion say the same thing",
    "Appeal to authority: the authority must be a genuine expert on that specific topic",
    "Appeal to ignorance: lack of disproof is not proof",
  ],
  explanation: (
    <div>
      <p>
        <strong>Reasoning errors (fallacies)</strong> are flaws in logic that
        make an argument invalid or unsound. The IMAT tests your ability to
        identify them by name or by description.
      </p>

      <h3>Common Fallacies on IMAT</h3>
      <p>
        <strong>False cause (post hoc ergo propter hoc):</strong> Assuming that
        because B happened after A, A caused B.
      </p>
      <p>
        <strong>Hasty generalisation:</strong> Drawing a general conclusion from
        a tiny or unrepresentative sample.
      </p>
      <p>
        <strong>Ad hominem:</strong> Attacking the person making the argument
        rather than the argument itself.
      </p>
      <p>
        <strong>Straw man:</strong> Misrepresenting someone's position to make
        it easier to attack.
      </p>
      <p>
        <strong>False dilemma (false dichotomy):</strong> Presenting only two
        options when more exist.
      </p>
      <p>
        <strong>Circular reasoning (begging the question):</strong> The
        conclusion is assumed in the premise.
      </p>
      <p>
        <strong>Appeal to authority:</strong> Using an authority on a topic
        outside their expertise.
      </p>
      <p>
        <strong>Appeal to ignorance:</strong> Arguing that because something is
        not proven false, it must be true.
      </p>

      <QuickFire
        questions={quickFire.slice(0, 1)}
        title="Quick Check: False Cause"
      />

      <h3>Worked Example: Identifying Fallacies in Medical Claims</h3>
      <WorkedExampleCard
        example={{
          id: "re-we-demo",
          question:
            "An advertisement says: 'This herbal supplement has been used for centuries in traditional medicine. Therefore, it must be effective.' Identify the fallacy. What evidence would actually demonstrate effectiveness?",
          hints: [
            "Is tradition a reliable guide to effectiveness?",
            "Bloodletting was used for centuries — was it effective?",
            "What type of evidence would actually prove the supplement works?",
            "Identify the specific fallacy: appeal to tradition, appeal to nature, or something else?",
          ],
          solution:
            "This is an APPEAL TO TRADITION fallacy: assuming that because something has been done for a long time, it must be effective. History is full of ineffective or harmful traditional treatments. The core error: tradition is not evidence of efficacy. To demonstrate effectiveness, you need a randomised controlled trial comparing the supplement to placebo, with adequate sample size, blinding, and statistical analysis. The IMAT trap: students are impressed by 'centuries of use' without recognising it as a logical fallacy.",
        }}
      />

      <QuickFire
        questions={quickFire.slice(1, 3)}
        title="Quick Check: Composition & Appeal to Ignorance"
      />

      <h3>High-Yield Points</h3>
      <div>
        {[
          "False cause: sequence does not imply causation",
          "Hasty generalisation: small sample cannot support broad claim",
          "Ad hominem: attack the person, not the argument",
          "Straw man: misrepresent the opponent's position",
          "False dilemma: presenting only two options when more exist",
          "Circular reasoning: premise and conclusion say the same thing",
        ].map((point) => (
          <div
            key={point}
            className="flex items-start gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-2 mb-1"
          >
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">{point}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  questions: [
    {
      id: "reasoning-errors-q1",
      type: "multiple-choice",
      prompt:
        "Every swan I have seen is white, so all swans are white. What fallacy?",
      answer: "Hasty generalisation",
      explanation:
        "A conclusion about all swans from a limited sample. Black swans exist in Australia.",
      difficulty: "recall",
      options: [
        "False cause",
        "Hasty generalisation",
        "Ad hominem",
        "Circular reasoning",
      ],
    },
    {
      id: "reasoning-errors-q2",
      type: "multiple-choice",
      prompt:
        "'You cannot prove that this alternative treatment is ineffective, so it must work.' What fallacy?",
      answer: "Appeal to ignorance",
      explanation:
        "Lack of evidence against a claim does not constitute evidence for it.",
      difficulty: "recall",
      options: [
        "Ad hominem",
        "Appeal to ignorance",
        "Straw man",
        "False dilemma",
      ],
    },
    {
      id: "reasoning-errors-q3",
      type: "multiple-choice",
      prompt:
        "A politician says 'Either we cut taxes, or the economy collapses.' What is the error?",
      answer: "False dilemma — presents only two options when many exist",
      explanation:
        "False dilemma (false dichotomy) limits choices to two when there are alternatives (e.g., moderate tax changes, spending reform).",
      difficulty: "apply",
      options: [
        "Ad hominem",
        "Straw man",
        "False dilemma",
        "Appeal to authority",
      ],
    },
    {
      id: "reasoning-errors-q4",
      type: "multiple-choice",
      prompt:
        "'This medicine is effective because the label says it works, and the label is correct because the medicine works.' What fallacy?",
      answer: "Circular reasoning (begging the question)",
      explanation:
        "The premise and conclusion are the same claim restated in different words. There is no independent support.",
      difficulty: "apply",
      options: [
        "False cause",
        "Hasty generalisation",
        "Ad hominem",
        "Circular reasoning",
      ],
    },
    {
      id: "reasoning-errors-q5",
      type: "multiple-choice",
      prompt:
        "Dr. Smith is a Nobel laureate in physics. He endorses a new diet, saying it is scientifically proven. What fallacy?",
      answer:
        "Appeal to authority — physics expertise does not qualify him to judge diets",
      explanation:
        "Dr. Smith is an authority in physics, not nutrition. An authority on one topic is not automatically an authority on all topics.",
      difficulty: "analyze",
      options: [
        "Ad hominem",
        "Straw man",
        "Appeal to authority",
        "False cause",
      ],
    },
    {
      id: "reasoning-errors-q6",
      type: "explain-why",
      prompt:
        "Why is anecdotal evidence (personal stories) considered a weak form of evidence in medicine?",
      answer:
        "Anecdotes are individual, uncontrolled observations. They can be influenced by: placebo effect, natural recovery, selection bias (people with bad outcomes are more likely to share stories), and recall bias. Anecdotes can suggest hypotheses, but they cannot prove causation or generalise to wider populations. This is why medical decisions are based on systematic studies, not testimonials.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "assumptions",
    "additional-evidence",
    "drawing-conclusion",
    "matching-arguments",
  ],
  prerequisites: ["main-conclusion", "premises"],
};
