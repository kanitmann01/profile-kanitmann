import type { AtomicNote } from "@/data/imat/types";

const homeostasis: AtomicNote = {
  slug: "homeostasis",
  subject: "biology",
  topic: "anatomy-and-physiology",
  title: "Homeostasis and Feedback Mechanisms",
  summary:
    "Homeostasis is the maintenance of stable internal conditions through negative and positive feedback loops involving receptors, control centers, and effectors.",
  memoryHook:
    "Think of a thermostat: sensor (receptor) detects cold → furnace (effector) turns on → temperature rises → sensor detects warmth → furnace turns off. That's negative feedback. Positive feedback is like a microphone near a speaker — the signal amplifies until something stops it.",
  imatTrap:
    "Students confuse negative vs positive feedback. Negative feedback = correction (opposes change). Positive feedback = amplification (reinforces change). Most homeostasis is NEGATIVE feedback. Positive feedback is rare and always has a defined endpoint (childbirth, clotting).",
  whyItMatters:
    "Diabetes mellitus results from broken negative feedback in blood glucose regulation. Understanding feedback loops is essential for grasping endocrine disorders, thermoregulation failures (heat stroke), and pharmacological interventions.",
  explanation: (
    <div className="space-y-4">
      <p>
        <strong>Homeostasis</strong> is the dynamic maintenance of a stable
        internal environment despite external changes. It requires three
        components:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Receptor (sensor)</strong>: detects changes (stimuli) — e.g.,
          thermoreceptors in skin and hypothalamus
        </li>
        <li>
          <strong>Control center</strong>: processes information and sends
          commands — e.g., hypothalamus (thermoregulation), pancreas (blood
          glucose)
        </li>
        <li>
          <strong>Effector</strong>: carries out the response — e.g., sweat
          glands, skeletal muscles, liver
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Negative Feedback</h3>
      <p>
        The response <em>opposes</em> the stimulus, returning the system toward
        the set point. This is the most common mechanism.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Thermoregulation</strong>: Cold → hypothalamus detects drop →
          shivering, vasoconstriction, increased metabolism → temperature rises
          → hypothalamus detects warmth → responses stop
        </li>
        <li>
          <strong>Blood glucose</strong>: High glucose → pancreatic beta cells
          release insulin → cells take up glucose, liver stores glycogen →
          glucose drops → insulin secretion decreases
        </li>
        <li>
          <strong>Low glucose</strong>: Pancreatic alpha cells release glucagon
          → liver breaks down glycogen → glucose rises → glucagon secretion
          decreases
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Positive Feedback</h3>
      <p>
        The response <em>amplifies</em> the stimulus, driving the system further
        from the set point. Always has a defined endpoint.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Childbirth</strong>: Uterine contractions push baby → baby's
          head stretches cervix → stretch receptors signal hypothalamus →
          posterior pituitary releases oxytocin → oxytocin strengthens
          contractions → more stretching → more oxytocin → cycle continues until
          delivery
        </li>
        <li>
          <strong>Blood clotting</strong>: Vessel damage → platelets adhere and
          release chemicals → chemicals attract more platelets → platelet plug
          forms → cascade amplifies until clot is complete
        </li>
        <li>
          <strong>Lactation</strong>: Baby suckles → nerve signals to
          hypothalamus → posterior pituitary releases oxytocin → milk ejection →
          more suckling → more oxytocin
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "homeostasis-q1",
      type: "multiple-choice",
      prompt: "Which of the following is an example of positive feedback?",
      options: [
        "Thermoregulation in response to cold",
        "Insulin release after a meal",
        "Oxytocin release during childbirth",
        "Glucagon release during fasting",
      ],
      answer: "Oxytocin release during childbirth",
      explanation:
        "Childbirth is a classic positive feedback loop: contractions stretch the cervix, triggering oxytocin release, which strengthens contractions, creating a self-amplifying cycle until delivery.",
      difficulty: "recall",
    },
    {
      id: "homeostasis-q2",
      type: "explain-why",
      prompt:
        "Why is the hypothalamus considered the master control center for homeostasis?",
      answer:
        "The hypothalamus integrates signals from thermoreceptors, osmoreceptors, and chemoreceptors, then coordinates responses via the autonomic nervous system and endocrine system (e.g., ADH release, TRH for thyroid). It regulates temperature, thirst, hunger, and circadian rhythms.",
      difficulty: "analyze",
    },
    {
      id: "homeostasis-q3",
      type: "multiple-choice",
      prompt:
        "In blood glucose regulation, what is the effector when glucose levels are high?",
      options: [
        "Pancreatic beta cells",
        "Liver and muscle cells",
        "Hypothalamus",
        "Pancreatic alpha cells",
      ],
      answer: "Liver and muscle cells",
      explanation:
        "When glucose is high, beta cells (control center) release insulin, but the effectors are liver and muscle cells, which take up glucose and store it as glycogen.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["organ-systems", "carbohydrates", "proteins"],
  prerequisites: ["carbohydrates"],
};

export default homeostasis;
