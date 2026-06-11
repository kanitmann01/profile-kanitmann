import type { AtomicNote } from "@/data/imat/types";

const organSystems: AtomicNote = {
  slug: "organ-systems",
  subject: "biology",
  topic: "anatomy-and-physiology",
  title: "Overview of Major Organ Systems",
  summary:
    "The human body comprises interconnected organ systems — circulatory, respiratory, digestive, nervous, endocrine, excretory, and immune — each with specialized organs working together to maintain homeostasis.",
  memoryHook:
    "CRD-NESI: Circulatory, Respiratory, Digestive, Nervous, Endocrine, Nervous, Skeletal, Immune. Or think of the body as a city: Circulatory = roads, Respiratory = power plant (O₂), Digestive = food supply, Nervous = internet, Endocrine = postal service (hormones), Excretory = waste management, Immune = police.",
  imatTrap:
    "Students memorize organs but forget interconnections. The IMAT loves questions about how systems interact (e.g., how respiratory and circulatory systems coordinate for gas exchange, or how nervous and endocrine systems both regulate homeostasis but with different speeds).",
  whyItMatters:
    "Understanding system interconnections is crucial for clinical reasoning. Heart failure (circulatory) causes fluid backup in lungs (respiratory). Diabetes (endocrine) damages kidneys (excretory) and nerves (nervous). No system works in isolation.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Circulatory System</h3>
      <p>
        <strong>Function</strong>: Transports oxygen, nutrients, hormones, and
        waste products.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Heart</strong>: Four-chambered pump (right side → lungs, left
          side → body)
        </li>
        <li>
          <strong>Blood vessels</strong>: Arteries (away from heart, thick
          walls), veins (toward heart, valves), capillaries (exchange sites)
        </li>
        <li>
          <strong>Blood</strong>: Red blood cells (O₂ transport via hemoglobin),
          white blood cells (immunity), platelets (clotting), plasma (transport
          medium)
        </li>
      </ul>

      <h3 className="text-lg font-semibold">Respiratory System</h3>
      <p>
        <strong>Function</strong>: Gas exchange — O₂ in, CO₂ out.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>
            Nose/mouth → trachea → bronchi → bronchioles → alveoli
          </strong>
        </li>
        <li>
          <strong>Alveoli</strong>: Site of gas exchange (O₂ diffuses into
          blood, CO₂ diffuses out)
        </li>
        <li>
          <strong>Diaphragm</strong>: Contracts → inhalation; relaxes →
          exhalation
        </li>
      </ul>

      <h3 className="text-lg font-semibold">Digestive System</h3>
      <p>
        <strong>Function</strong>: Breaks down food, absorbs nutrients,
        eliminates waste.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Mouth</strong>: Mechanical (chewing) and chemical (salivary
          amylase → starch) digestion
        </li>
        <li>
          <strong>Stomach</strong>: HCl and pepsin → protein digestion; churning
        </li>
        <li>
          <strong>Small intestine</strong>: Major site of digestion and
          absorption (villi increase surface area); receives bile
          (liver/gallbladder) and pancreatic enzymes
        </li>
        <li>
          <strong>Large intestine</strong>: Water absorption, feces formation
        </li>
        <li>
          <strong>Accessory organs</strong>: Liver (bile, detoxification),
          pancreas (enzymes, insulin/glucagon), gallbladder (bile storage)
        </li>
      </ul>

      <h3 className="text-lg font-semibold">Nervous System</h3>
      <p>
        <strong>Function</strong>: Rapid communication via electrical impulses;
        processes sensory input, coordinates responses.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Central nervous system (CNS)</strong>: Brain and spinal cord
        </li>
        <li>
          <strong>Peripheral nervous system (PNS)</strong>: Cranial and spinal
          nerves; somatic (voluntary) and autonomic (involuntary: sympathetic =
          fight/flight, parasympathetic = rest/digest)
        </li>
        <li>
          <strong>Neurons</strong>: Sensory (afferent), motor (efferent),
          interneurons
        </li>
      </ul>

      <h3 className="text-lg font-semibold">Endocrine System</h3>
      <p>
        <strong>Function</strong>: Slow, sustained communication via hormones
        released into blood.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Hypothalamus</strong>: Links nervous and endocrine systems;
          controls pituitary
        </li>
        <li>
          <strong>Pituitary</strong>: "Master gland" — releases TSH, ACTH, GH,
          ADH, oxytocin
        </li>
        <li>
          <strong>Thyroid</strong>: Thyroxine (metabolism), calcitonin (lowers
          blood Ca²⁺)
        </li>
        <li>
          <strong>Adrenals</strong>: Cortisol (stress), aldosterone (Na⁺/K⁺
          balance), epinephrine (fight/flight)
        </li>
        <li>
          <strong>Pancreas</strong>: Insulin (lowers glucose), glucagon (raises
          glucose)
        </li>
      </ul>

      <h3 className="text-lg font-semibold">Excretory (Urinary) System</h3>
      <p>
        <strong>Function</strong>: Filters blood, removes waste, regulates
        water/electrolyte balance.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Kidneys</strong>: Nephrons filter blood → reabsorb useful
          substances → excrete urea, excess ions, water as urine
        </li>
        <li>
          <strong>Ureters → bladder → urethra</strong>: Urine transport and
          storage
        </li>
      </ul>

      <h3 className="text-lg font-semibold">Immune System</h3>
      <p>
        <strong>Function</strong>: Defends against pathogens and abnormal cells.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Innate immunity</strong>: Physical barriers (skin, mucous
          membranes), phagocytes (neutrophils, macrophages), inflammation, fever
        </li>
        <li>
          <strong>Adaptive immunity</strong>: B cells (produce antibodies), T
          cells (helper T cells coordinate, cytotoxic T cells kill infected
          cells), memory cells provide long-term immunity
        </li>
        <li>
          <strong>Lymphatic system</strong>: Lymph nodes, spleen, thymus — house
          immune cells, filter lymph
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">System Interconnections</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Respiratory + Circulatory</strong>: Alveoli and capillaries
          exchange gases; blood transports O₂ to cells and CO₂ back to lungs
        </li>
        <li>
          <strong>Digestive + Circulatory</strong>: Nutrients absorbed in small
          intestine enter blood; liver processes them
        </li>
        <li>
          <strong>Nervous + Endocrine</strong>: Hypothalamus controls pituitary;
          nervous system triggers rapid responses, endocrine sustains them
        </li>
        <li>
          <strong>Excretory + Circulatory</strong>: Kidneys filter blood;
          regulate blood pressure via renin-angiotensin system
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "organ-systems-q1",
      type: "multiple-choice",
      prompt: "Which organ system is responsible for producing antibodies?",
      options: [
        "Circulatory system",
        "Endocrine system",
        "Immune system",
        "Nervous system",
      ],
      answer: "Immune system",
      explanation:
        "B cells (lymphocytes) of the immune system produce antibodies in response to antigens. While B cells circulate in blood, they are part of the immune system, not the circulatory system.",
      difficulty: "recall",
    },
    {
      id: "organ-systems-q2",
      type: "explain-why",
      prompt:
        "Explain how the respiratory and circulatory systems work together during exercise.",
      answer:
        "During exercise, muscles consume more O₂ and produce more CO₂. The circulatory system increases heart rate and redirects blood flow to muscles. The respiratory system increases breathing rate and depth to take in more O₂ and expel more CO₂. At the alveoli, O₂ diffuses into blood and CO₂ diffuses out. The coordinated response ensures muscles receive adequate O₂ and waste is removed efficiently.",
      difficulty: "analyze",
    },
    {
      id: "organ-systems-q3",
      type: "multiple-choice",
      prompt:
        "Which hormone is released by the pancreas in response to high blood glucose?",
      options: ["Glucagon", "Insulin", "Cortisol", "Thyroxine"],
      answer: "Insulin",
      explanation:
        "Pancreatic beta cells release insulin when blood glucose is high. Insulin promotes glucose uptake by cells and storage as glycogen in the liver, lowering blood glucose levels.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["homeostasis", "proteins", "carbohydrates"],
  prerequisites: ["homeostasis"],
};

export default organSystems;
