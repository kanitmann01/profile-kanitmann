export type UniversitySlug =
  | "cagliari"
  | "bari"
  | "messina"
  | "marche-polytechnic"
  | "catania"
  | "federico-ii"
  | "padova"
  | "milan-bicocca"
  | "sapienza"
  | "vanvitelli"
  | "turin"
  | "parma"
  | "tor-vergata"
  | "bologna"
  | "milan-statale"
  | "pavia";

export type RatingDimension = {
  score: number; // 0-5
  weight: number; // percentage (e.g., 35 = 35%)
  weighted: number;
};

export type UniversityRating = {
  admissionOdds: RatingDimension;
  academicReputation: RatingDimension;
  costAndScholarships: RatingDimension;
  livability: RatingDimension;
  practicality: RatingDimension;
  overall: number; // weighted average out of 5
};

export type University = {
  rank: number;
  slug: UniversitySlug;
  italianName: string;
  shortName: string;
  location: string;
  region: string;
  setting: string;
  nonEuSeats2025: number;
  nonEuSeatsProjection2026: number;
  imatCutoff: {
    "2023"?: number;
    "2024": number;
    "2025": number;
    safeTarget2026: string;
  };
  monthlyBudget: string;
  tuition: string;
  tuitionFirstInstalment: string;
  scholarship: {
    name: string;
    benefits: string;
    deadline: string;
  };
  preEnrollmentStatus: string;
  qsRankings: {
    medicine?: string;
    overall?: string;
  };
  ratings: UniversityRating;
  verdict: string;
  safety: string;
  internationalCommunity: string;
  partTimeWork: string;
  crowding: string;
  studentReviews: string;
  strengths: string[];
  weaknesses: string[];
};

export const universities: University[] = [
  {
    rank: 1,
    slug: "cagliari",
    italianName: "Università degli Studi di Cagliari (UniCa)",
    shortName: "Cagliari",
    location: "Cagliari, Sardinia",
    region: "Sardinia (Autonomous)",
    setting: "Suburban campus at Monserrato, 6 km from city centre",
    nonEuSeats2025: 20,
    nonEuSeatsProjection2026: 20,
    imatCutoff: {
      "2024": 56.5,
      "2025": 54.2,
      safeTarget2026: "56–58",
    },
    monthlyBudget: "€700–€1,100",
    tuition: "€0–€2,500/yr (ISEE)",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "ERSU Cagliari",
      benefits: "Free tuition + dorm + meals + ~€2,000–€6,500/yr cash",
      deadline: "28 Aug 2026",
    },
    preEnrollmentStatus: "Universitaly (standard, closed 30 Jun 2026)",
    qsRankings: {
      medicine: "Not in top-300 (new programme)",
      overall: "#1201–1400",
    },
    ratings: {
      admissionOdds: { score: 4.5, weight: 35, weighted: 1.57 },
      academicReputation: { score: 2.5, weight: 15, weighted: 0.38 },
      costAndScholarships: { score: 4.0, weight: 15, weighted: 0.6 },
      livability: { score: 4.5, weight: 20, weighted: 0.9 },
      practicality: { score: 2.5, weight: 15, weighted: 0.38 },
      overall: 3.8,
    },
    verdict:
      "Strategic safety pick. Lowest cut-off in Italy + safest city + best weather. Trade-off: island isolation and a brand-new programme with no track record yet.",
    safety:
      "Safest in this report (3.9/5 for solo female travellers); petty theft only in tourist zones.",
    internationalCommunity:
      "Small (~5% of 24,000 students); English NOT widely spoken off-campus; active ESN.",
    partTimeWork:
      "Limited (small city); 20 hr/week legal; Italian essential; €7–€10/hr.",
    crowding:
      "Small cohort ~20/yr; admin less overwhelmed than mega-unis; housing in Monserrato easier than Rome/Naples.",
    studentReviews:
      "Programme launched 2024/25, no alumni yet; first-cohort reviews positive; responsive international office.",
    strengths: [
      "Lowest IMAT cut-off in Italy (54.2 in 2025)",
      "Safest city in this report",
      "Best weather in Italy (~300 sunny days)",
      "Brand-new hospital-integrated campus",
      "Affordable cost of living",
      "Island lifestyle with beaches and nature",
    ],
    weaknesses: [
      "Programme launched 2024/25 — long-term reputation unproven",
      "Island isolation: flights to mainland €80–€150; ferry 5–13 hr",
      "Very small international community",
      "English not widely spoken outside campus",
      "Lowest QS rank in this report",
      "Limited part-time job market",
    ],
  },
  {
    rank: 2,
    slug: "bari",
    italianName: "Università degli Studi di Bari Aldo Moro (UniBA)",
    shortName: "Bari Aldo Moro",
    location: "Bari, Puglia",
    region: "Puglia",
    setting: "Urban — Polyclinic of Bari teaching hospital, central city",
    nonEuSeats2025: 11,
    nonEuSeatsProjection2026: 11,
    imatCutoff: {
      "2023": 32.7,
      "2024": 42.6,
      "2025": 49.3,
      safeTarget2026: "52–55",
    },
    monthlyBudget: "€700–€1,200",
    tuition: "€0–€3,000/yr (ISEE); typical €336–€2,210",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "ADISU Puglia",
      benefits: "Free tuition + dorm + meals + ~€2,000–€6,500/yr cash",
      deadline: "10 Aug 2026",
    },
    preEnrollmentStatus: "DreamApply pre-evaluation — 30 Jun 2026 (CLOSED)",
    qsRankings: {
      medicine: "Not in top-300; THE Med 401–500",
      overall: "#741–750",
    },
    ratings: {
      admissionOdds: { score: 1.0, weight: 35, weighted: 0.35 },
      academicReputation: { score: 3.5, weight: 15, weighted: 0.53 },
      costAndScholarships: { score: 4.5, weight: 15, weighted: 0.67 },
      livability: { score: 3.5, weight: 20, weighted: 0.7 },
      practicality: { score: 3.0, weight: 15, weighted: 0.45 },
      overall: 2.7,
    },
    verdict:
      "EXCLUDED for AY 2026/27 — pre-evaluation deadline (30 Jun 2026) already passed. Listed for completeness.",
    safety:
      "Generally safe; avoid San Girolamo, Japigia, Libertà outskirts at night.",
    internationalCommunity:
      "Small non-EU cohort; moderate Erasmus; English limited off-campus.",
    partTimeWork:
      "Limited Bari job market; 20 hr/week legal; Italian essential; €6–€9/hr.",
    crowding:
      "Very small cohort (11 seats); admin overwhelmed; housing relatively easy.",
    studentReviews:
      "Not well-represented in English-language review spaces; mixed reports on oral exam difficulty.",
    strengths: [
      "Very low IMAT cut-off (49.3 in 2025)",
      "Affordable cost of living",
      "ADISU Puglia scholarship available (deadline 10 Aug 2026)",
      "Historic university with established medical faculty",
    ],
    weaknesses: [
      "EXCLUDED — pre-evaluation deadline passed (30 Jun 2026)",
      "Only 11 non-EU seats — smallest quota in this report",
      "Low QS rank (#741–750 overall)",
      "Only Italian-language programme track for clinical years reported",
      "Limited international community",
    ],
  },
  {
    rank: 3,
    slug: "messina",
    italianName: "Università degli Studi di Messina (UniME)",
    shortName: "Messina",
    location: "Messina, Sicily",
    region: "Sicily",
    setting: "Urban — historic city centre + AOU G. Martino hospital complex",
    nonEuSeats2025: 56,
    nonEuSeatsProjection2026: 56,
    imatCutoff: {
      "2023": 49.7,
      "2024": 59.9,
      "2025": 58.2,
      safeTarget2026: "60–63",
    },
    monthlyBudget: "€500–€900",
    tuition: "€156–€2,500/yr",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "ERSU Messina",
      benefits: "Free tuition + dorm + meals + cash",
      deadline: "18 Aug 2026",
    },
    preEnrollmentStatus:
      "UniME pre-evaluation portal (€30 fee) + Universitaly — deadline 20 Jul 2026 (STILL OPEN)",
    qsRankings: {
      medicine: "#401–450",
      overall: "#651–700",
    },
    ratings: {
      admissionOdds: { score: 5.0, weight: 35, weighted: 1.75 },
      academicReputation: { score: 3.0, weight: 15, weighted: 0.45 },
      costAndScholarships: { score: 4.5, weight: 15, weighted: 0.67 },
      livability: { score: 3.5, weight: 20, weighted: 0.7 },
      practicality: { score: 4.5, weight: 15, weighted: 0.67 },
      overall: 4.0,
    },
    verdict:
      "BEST VALUE IN ITALY — 56 non-EU seats (most in this report), cheapest cost of living, applications still OPEN until 20 Jul 2026. Apply TODAY.",
    safety:
      "Safest Sicilian city (1.5/5 crime index); petty theft only; well-lit centre.",
    internationalCommunity:
      "Growing IMAT cohort (~56/yr); English limited off-campus; tight-knit international group.",
    partTimeWork:
      "Limited Messina job market; 20 hr/week legal; Italian recommended; €6–€9/hr.",
    crowding:
      "Large cohort (56 seats); admin moderately overwhelmed; housing inexpensive.",
    studentReviews:
      "Generally positive; improving English programme; cheaper than mainland; some administrative delays reported.",
    strengths: [
      "Highest non-EU seat count in Italy (56) — best admission odds in this report",
      "Applications STILL OPEN until 20 Jul 2026",
      "Cheapest cost of living (€500–€900/mo)",
      "Safest Sicilian city",
      "ERSU Messina scholarship deadline 18 Aug 2026",
      "Cut-off stable (59.9 → 58.2) — predictable",
    ],
    weaknesses: [
      "Limited international community",
      "English not widely spoken off-campus",
      "Messina is isolated on Sicily's north-east tip",
      "Lower QS rank (#651–700)",
      "Limited part-time job market",
      "Hot Sicilian summers",
    ],
  },
  {
    rank: 4,
    slug: "marche-polytechnic",
    italianName: "Università Politecnica delle Marche (UNIVPM)",
    shortName: "Marche Polytechnic",
    location: "Ancona, Marche",
    region: "Marche",
    setting:
      "Urban — Torrette teaching hospital complex, hillside above Ancona",
    nonEuSeats2025: 20,
    nonEuSeatsProjection2026: 60, // expanded
    imatCutoff: {
      "2023": 55.3,
      "2024": 59.2,
      "2025": 58.2,
      safeTarget2026: "60–62",
    },
    monthlyBudget: "€500–€700",
    tuition: "€0–€2,800/yr (ISEE)",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "ERDIS Marche",
      benefits: "Free tuition + dorm + meals + cash",
      deadline: "24 Aug 2026, 16:00",
    },
    preEnrollmentStatus:
      "Universitaly — 30 Jun 2026 (PASSED; verify late apps)",
    qsRankings: {
      medicine: "Not in top-300",
      overall: "#651–700",
    },
    ratings: {
      admissionOdds: { score: 4.5, weight: 35, weighted: 1.57 },
      academicReputation: { score: 3.0, weight: 15, weighted: 0.45 },
      costAndScholarships: { score: 5.0, weight: 15, weighted: 0.75 },
      livability: { score: 4.0, weight: 20, weighted: 0.8 },
      practicality: { score: 3.5, weight: 15, weighted: 0.53 },
      overall: 3.9,
    },
    verdict:
      "Strong dark horse for 2026. 60 projected seats (tripled from 20) + cheapest city in Italy + very safe. Verify late pre-enrollment.",
    safety: "Very safe (Ancona small city 100k); almost no violent crime.",
    internationalCommunity:
      "Small but growing; English limited off-campus; active ESN.",
    partTimeWork:
      "Limited Ancona job market; 20 hr/week legal; Italian essential; €7–€10/hr.",
    crowding:
      "Expanding from 20 → 60 seats; admin may be strained; housing in Ancona very affordable.",
    studentReviews:
      "Growing positive reputation; students report good teaching quality; small-city lifestyle.",
    strengths: [
      "Projected 60 non-EU seats for 2026 (tripled from 20) — massive admission odds improvement",
      "Cheapest city in this report (€500–€700/mo)",
      "Very safe small city (Ancona ~100k)",
      "ERDIS Marche scholarship deadline 24 Aug 2026",
      "Low cut-off (58.2) with large capacity increase",
      "Central Italy location — easy train to Bologna/Rome",
    ],
    weaknesses: [
      "Pre-enrollment deadline likely passed (30 Jun 2026)",
      "Newer English programme — reputation still building",
      "Ancona is a small port city — limited nightlife/culture",
      "Limited part-time job market",
      "English not widely spoken off-campus",
    ],
  },
  {
    rank: 5,
    slug: "catania",
    italianName: "Università degli Studi di Catania (UniCT)",
    shortName: "Catania",
    location: "Catania, Sicily",
    region: "Sicily",
    setting: "Urban — historic centre + Policlinico G. Rodolico hospital",
    nonEuSeats2025: 60,
    nonEuSeatsProjection2026: 60,
    imatCutoff: {
      "2023": 42.5,
      "2024": 54.6,
      "2025": 61.6,
      safeTarget2026: "64–66",
    },
    monthlyBudget: "€700–€1,100",
    tuition: "€156–€2,100/yr",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "ERSU Catania",
      benefits: "Free tuition + dorm + meals + cash",
      deadline: "10 Aug 2026, 14:00",
    },
    preEnrollmentStatus:
      "Universitaly pre-enrollment — 31 Jul 2026 (STILL OPEN)",
    qsRankings: {
      medicine: "#351–400",
      overall: "#601–650",
    },
    ratings: {
      admissionOdds: { score: 4.5, weight: 35, weighted: 1.57 },
      academicReputation: { score: 3.5, weight: 15, weighted: 0.53 },
      costAndScholarships: { score: 4.0, weight: 15, weighted: 0.6 },
      livability: { score: 3.5, weight: 20, weighted: 0.7 },
      practicality: { score: 4.5, weight: 15, weighted: 0.67 },
      overall: 3.9,
    },
    verdict:
      "Strong mid-tier pick with largest non-EU quota (60) + vibrant city + applications still OPEN until 31 Jul 2026.",
    safety:
      "Generally safe centre; avoid San Cristoforo, Librino, Zia Lisa at night.",
    internationalCommunity:
      "Vibrant international scene; large Erasmus; English moderate; active ESN Catania.",
    partTimeWork:
      "Moderate Catania job market (tourism + services); 20 hr/week legal; Italian helpful; €7–€10/hr.",
    crowding:
      "Large cohort (60 seats); admin typically overwhelmed; housing affordable.",
    studentReviews:
      "Generally positive; strong clinical exposure; vibrant student life; administrative delays common.",
    strengths: [
      "Largest non-EU quota in Italy (60 seats) — tied with Messina",
      "Applications still OPEN until 31 Jul 2026",
      "Vibrant historic city with active nightlife",
      "Cut-off rising = growing reputation (42.5 → 61.6 in 3 yrs)",
      "Affordable cost of living",
      "ERSU Catania scholarship deadline 10 Aug 2026",
      "Strong clinical exposure at major Sicilian hospital",
    ],
    weaknesses: [
      "Cut-off rising rapidly (+7 pts in 2025 alone)",
      "Safety concerns in certain neighbourhoods",
      "Hot Sicilian summers",
      "Administrative delays common",
      "Italian language important for clinical years",
    ],
  },
  {
    rank: 6,
    slug: "federico-ii",
    italianName: "Università degli Studi di Napoli Federico II",
    shortName: "Federico II",
    location: "Naples, Campania",
    region: "Campania",
    setting: "Urban — Policlinico Federico II teaching hospital, city centre",
    nonEuSeats2025: 25,
    nonEuSeatsProjection2026: 25,
    imatCutoff: {
      "2023": 46.7,
      "2024": 63.4,
      "2025": 63.1,
      safeTarget2026: "65–67",
    },
    monthlyBudget: "€600–€950",
    tuition: "€0–€2,800/yr (ISEE)",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "ADISURC Campania",
      benefits: "Free tuition + dorm + meals + cash",
      deadline: "18 Aug 2026, 14:00",
    },
    preEnrollmentStatus:
      "Universitaly — 30 Jun 2026 (PASSED; verify late apps)",
    qsRankings: {
      medicine: "#251–300",
      overall: "#335",
    },
    ratings: {
      admissionOdds: { score: 3.5, weight: 35, weighted: 1.23 },
      academicReputation: { score: 4.5, weight: 15, weighted: 0.67 },
      costAndScholarships: { score: 4.0, weight: 15, weighted: 0.6 },
      livability: { score: 2.0, weight: 20, weighted: 0.4 },
      practicality: { score: 3.0, weight: 15, weighted: 0.45 },
      overall: 3.4,
    },
    verdict:
      "Italy's oldest public university + strong QS rank (#335) + affordable. Trade-off: Naples safety concerns require careful neighbourhood choice.",
    safety:
      "AVOID Scampia, Secondigliano, Forcella, Spanish Quarters at night. SAFE: Vomero, Chiaia, Posillipo, Arenella.",
    internationalCommunity:
      "Moderate; large historic university; English moderate; strong Erasmus presence.",
    partTimeWork:
      "Decent Naples job market; 20 hr/week legal; Italian preferred; €7–€10/hr.",
    crowding:
      "Medium cohort (25 seats); admin overwhelmed (meg-uni); housing requires careful neighbourhood selection.",
    studentReviews:
      "Mixed; strong reputation historically but organizational complaints; high workload.",
    strengths: [
      "Italy's oldest public university (founded 1224)",
      "Strong QS rank (#335 overall, #251–300 Medicine)",
      "Affordable cost of living (€600–€950/mo)",
      "ADISURC Campania scholarship deadline 18 Aug 2026",
      "Stable cut-off (63.4 → 63.1)",
      "Vibrant city with rich culture and food scene",
    ],
    weaknesses: [
      "Significant safety concerns — neighbourhood choice critical",
      "Pre-enrollment deadline likely passed (30 Jun 2026)",
      "Only 25 non-EU seats — moderate competition",
      "Notorious bureaucracy (mega-university)",
      "Italian language important for daily life and clinical years",
    ],
  },
  {
    rank: 7,
    slug: "padova",
    italianName: "Università degli Studi di Padova (UNIPD)",
    shortName: "Padova",
    location:
      "Venice (Santi Giovanni e Paolo Hospital) since 2025/26 — administrative HQ in Padova, Veneto",
    region: "Veneto",
    setting: "Venice hospital campus (relocated 2025/26 from Padova city)",
    nonEuSeats2025: 25,
    nonEuSeatsProjection2026: 25,
    imatCutoff: {
      "2023": 66,
      "2024": 71.6,
      "2025": 65.4,
      safeTarget2026: "68–70",
    },
    monthlyBudget: "€900–€1,400 (Venice expensive)",
    tuition: "€0–€2,950/yr (ISEE)",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "ESU Padova",
      benefits: "Free tuition + dorm + meals + cash",
      deadline: "Mid-Sep 2026 (verify)",
    },
    preEnrollmentStatus:
      "Universitaly — 30 Jun 2026 (PASSED; verify late apps)",
    qsRankings: {
      medicine: "#104 (QS Medicine 2026)",
      overall: "#236",
    },
    ratings: {
      admissionOdds: { score: 3.5, weight: 35, weighted: 1.23 },
      academicReputation: { score: 5.0, weight: 15, weighted: 0.75 },
      costAndScholarships: { score: 2.5, weight: 15, weighted: 0.38 },
      livability: { score: 4.0, weight: 20, weighted: 0.8 },
      practicality: { score: 3.0, weight: 15, weighted: 0.45 },
      overall: 3.5,
    },
    verdict:
      "Top-3 Italian medical school by QS (#104 world). Cut-off dropped 6 pts due to Venice relocation — temporary opportunity window.",
    safety: "Venice extremely safe; petty theft in tourist zones only.",
    internationalCommunity:
      "Strong; large Erasmus + international body; English widely spoken in Venice.",
    partTimeWork:
      "Limited Venice job market (tourism-dominated); 20 hr/week legal; Italian preferred; €8–€12/hr.",
    crowding:
      "Medium cohort (25 seats); admin quality high; housing in Venice very expensive and scarce.",
    studentReviews:
      "Strong academic reputation; relocation to Venice caused organisation complaints; world-class faculty.",
    strengths: [
      "Top-3 Italian medical school — QS #104 Medicine worldwide",
      "Cut-off dropped 6 pts (71.6 → 65.4) — temporary opportunity",
      "Venice is uniquely beautiful and extremely safe",
      "Strong international community",
      "ESU Padova scholarship available",
      "World-class research and teaching reputation",
    ],
    weaknesses: [
      "Venice cost of living is high (€900–€1,400/mo)",
      "Venice housing extremely scarce and expensive",
      "Relocation to Venice caused organisational teething issues",
      "Limited part-time job market (tourism-dominated)",
      "Pre-enrollment deadline likely passed (30 Jun 2026)",
      "Only 25 non-EU seats",
    ],
  },
  {
    rank: 8,
    slug: "milan-bicocca",
    italianName: "Università degli Studi di Milano-Bicocca",
    shortName: "Milan-Bicocca",
    location:
      "Bergamo (Papa Giovanni XXIII Hospital) — NOT in Milan/Bicocca or Monza",
    region: "Lombardy",
    setting: "Hospital-integrated campus at Bergamo, 50 km NE of Milan",
    nonEuSeats2025: 18,
    nonEuSeatsProjection2026: 18,
    imatCutoff: {
      "2024": 70.9,
      "2025": 65.1,
      safeTarget2026: "68–70 (volatile)",
    },
    monthlyBudget: "€700–€1,100",
    tuition: "€156–€4,000/yr (ISEE)",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "DSU Lombardy",
      benefits: "Free tuition + dorm + meals + cash",
      deadline: "Late Sep 2026 (verify)",
    },
    preEnrollmentStatus:
      "Universitaly — 30 Jun 2026 (PASSED; verify late apps)",
    qsRankings: {
      medicine: "Not in top-300",
      overall: "#481–490",
    },
    ratings: {
      admissionOdds: { score: 3.5, weight: 35, weighted: 1.23 },
      academicReputation: { score: 3.0, weight: 15, weighted: 0.45 },
      costAndScholarships: { score: 3.5, weight: 15, weighted: 0.53 },
      livability: { score: 3.5, weight: 20, weighted: 0.7 },
      practicality: { score: 2.5, weight: 15, weighted: 0.38 },
      overall: 3.2,
    },
    verdict:
      "Decent option if you want Lombardy at a mid-tier cut-off. Note: programme is in Bergamo, NOT Milan. Cut-off dropped 5.8 pts in 2025.",
    safety: "Bergamo very safe; petty crime minimal.",
    internationalCommunity:
      "Small; growing IMAT cohort; English limited off-campus in Bergamo.",
    partTimeWork:
      "Moderate Bergamo job market; 20 hr/week legal; Italian preferred; €8–€11/hr.",
    crowding:
      "Very small cohort (18 seats); admin more responsive; housing in Bergamo easier than Milan.",
    studentReviews:
      "Limited English-language reviews; programme still maturing; students report good teaching.",
    strengths: [
      "Cut-off dropped significantly (70.9 → 65.1) — easier entry",
      "Bergamo is very safe and more affordable than Milan",
      "DSU Lombardy scholarship available",
      "Modern hospital-integrated campus",
    ],
    weaknesses: [
      "Programme is in Bergamo, NOT Milan — confusion risk",
      "Very small cohort (18 seats) — volatile cut-off",
      "Not actually in Bicocca/Milan campus",
      "Newer English programme — reputation still building",
      "Limited international community in Bergamo",
      "Pre-enrollment deadline likely passed (30 Jun 2026)",
    ],
  },
  {
    rank: 9,
    slug: "sapienza",
    italianName: "Sapienza Università di Roma",
    shortName: "Sapienza",
    location: "Rome, Lazio",
    region: "Lazio",
    setting: "Urban — main campus in Tiburtina/San Lorenzo district",
    nonEuSeats2025: 13,
    nonEuSeatsProjection2026: 13,
    imatCutoff: {
      "2023": 45.7,
      "2024": 60.3,
      "2025": 65.8,
      safeTarget2026: "68–70",
    },
    monthlyBudget: "€900–€1,400",
    tuition: "€0–€2,924/yr (ISEE)",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "DiSCo Lazio",
      benefits: "Free tuition + dorm + meals + up to €7,557/yr cash",
      deadline: "22 Jul 2026, 12:00 noon",
    },
    preEnrollmentStatus:
      "Universitaly — 30 Jun 2026 (PASSED; verify late apps); DiSCo Lazio still OPEN",
    qsRankings: {
      medicine: "#101–150",
      overall: "#133",
    },
    ratings: {
      admissionOdds: { score: 2.0, weight: 35, weighted: 0.7 },
      academicReputation: { score: 5.0, weight: 15, weighted: 0.75 },
      costAndScholarships: { score: 3.0, weight: 15, weighted: 0.45 },
      livability: { score: 3.0, weight: 20, weighted: 0.6 },
      practicality: { score: 2.5, weight: 15, weighted: 0.38 },
      overall: 3.1,
    },
    verdict:
      "Top-tier QS rank (#133, Medicine #101–150) + DiSCo Lazio scholarship still open until 22 Jul 2026. Trade-off: extremely small cohort (13 seats) = high cut-off risk.",
    safety:
      "Rome generally safe; avoid Tor Bella Monaca, Centocelle, San Basilio at night. Safe: San Lorenzo, Tiburtina, Trieste.",
    internationalCommunity:
      "Large international body; English widely spoken at university; moderate off-campus.",
    partTimeWork:
      "Good Rome job market (tourism + services); 20 hr/week legal; Italian preferred; €8–€12/hr.",
    crowding:
      "Very small cohort (13 seats); mega-university admin challenges; housing in Rome competitive.",
    studentReviews:
      "Mixed; prestigious reputation but notorious bureaucracy; very small IMS cohort can feel isolated.",
    strengths: [
      "Top QS rank (#133 overall, #101–150 Medicine)",
      "DiSCo Lazio scholarship still OPEN until 22 Jul 2026 — up to €7,557/yr cash + free tuition + dorm + meals",
      "Rome is a world-class city with endless culture",
      "Strong international community",
      "Good part-time job market",
    ],
    weaknesses: [
      "Only 13 non-EU seats — extremely small cohort",
      "Pre-enrollment closed (30 Jun 2026) — verify late apps",
      "Notorious bureaucracy (mega-university)",
      "Cut-off rising fast (45.7 → 65.8 in 3 yrs)",
      "Rome housing is expensive and competitive",
      "Safety requires neighbourhood awareness",
    ],
  },
  {
    rank: 10,
    slug: "vanvitelli",
    italianName: "Università degli Studi della Campania Luigi Vanvitelli",
    shortName: "Vanvitelli",
    location:
      "Naples (English Medicine) / Caserta (Italian + some pre-clinical)",
    region: "Campania",
    setting:
      "Urban — Naples campus near AOU hospital; some pre-clinical in Caserta 30 km north (commute)",
    nonEuSeats2025: 50,
    nonEuSeatsProjection2026: 50,
    imatCutoff: {
      "2023": 47.3,
      "2024": 63.2,
      "2025": 66.2,
      safeTarget2026: "68–70",
    },
    monthlyBudget: "€600–€950",
    tuition: "€0–€2,704/yr (ISEE)",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "ADISURC Campania",
      benefits: "Free tuition + dorm + meals + cash",
      deadline: "18 Aug 2026, 14:00",
    },
    preEnrollmentStatus:
      "Universitaly — 30 Jun 2026 (PASSED; verify late apps)",
    qsRankings: {
      medicine: "Top 451–500",
      overall: "#951–1000",
    },
    ratings: {
      admissionOdds: { score: 4.0, weight: 35, weighted: 1.4 },
      academicReputation: { score: 3.5, weight: 15, weighted: 0.53 },
      costAndScholarships: { score: 4.0, weight: 15, weighted: 0.6 },
      livability: { score: 2.5, weight: 20, weighted: 0.5 },
      practicality: { score: 3.0, weight: 15, weighted: 0.45 },
      overall: 3.5,
    },
    verdict:
      "Best admission odds (50 seats) in the mid-cut-off range. Trade-off: split campuses and lower prestige than Federico II. Verify late pre-enrollment.",
    safety:
      "Same as Federico II: AVOID Scampia/Secondigliano; SAFE Vomero/Chiaia/Arenella.",
    internationalCommunity:
      "Large non-EU cohort (~50/yr) — biggest southern Italian English Medicine intake; active ESN Napoli + Caserta.",
    partTimeWork:
      "Decent Naples job market; 20 hr/week legal; Italian preferred; €7–€10/hr.",
    crowding:
      "Largest non-EU quota in this tier (50 seats); admin more responsive than Federico II; housing same as Federico II.",
    studentReviews:
      "Generally positive; friendlier/more responsive secretariat than Federico II; oral exams dominate; cut-off rising gradually.",
    strengths: [
      "LARGEST non-EU quota in central/southern Italy (50 seats) — best admission odds in this cut-off range",
      "Cut-off rising gradually (63.2 → 66.2) — predictable trajectory",
      "More responsive secretariat than Federico II",
      "Two teaching hospital networks (AOU + Policlinico)",
      "Same affordability as Federico II",
    ],
    weaknesses: [
      "Split campuses (Naples + Caserta) — commuting friction",
      "Second university of Naples — less historical prestige than Federico II",
      "Pre-enrollment deadline likely passed (30 Jun 2026)",
      "Same Naples safety concerns as Federico II",
      "Lower QS rank than Federico II (#951–1000 vs #251–300)",
    ],
  },
  {
    rank: 11,
    slug: "turin",
    italianName: "Università degli Studi di Torino (UniTo)",
    shortName: "Turin",
    location: "Turin (Orbassano — San Luigi Gonzaga Hospital)",
    region: "Piedmont",
    setting:
      "Suburban — San Luigi Gonzaga Hospital in Orbassano, 12 km SW of Turin centre",
    nonEuSeats2025: 32,
    nonEuSeatsProjection2026: 32,
    imatCutoff: {
      "2023": 49,
      "2024": 70.8,
      "2025": 67.2,
      safeTarget2026: "70–71",
    },
    monthlyBudget: "€700–€1,100",
    tuition: "€156–€3,300/yr (ISEE)",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "EDISU Piemonte",
      benefits: "Free tuition + dorm + meals + ~€7,000/yr cash",
      deadline: "Mid-Sep 2026 (verify)",
    },
    preEnrollmentStatus:
      "Universitaly — 30 Jun 2026 (PASSED; verify late apps)",
    qsRankings: {
      medicine: "Top-200 (THE Clinical & Health top-200)",
      overall: "#246",
    },
    ratings: {
      admissionOdds: { score: 3.5, weight: 35, weighted: 1.22 },
      academicReputation: { score: 4.0, weight: 15, weighted: 0.6 },
      costAndScholarships: { score: 3.5, weight: 15, weighted: 0.53 },
      livability: { score: 4.0, weight: 20, weighted: 0.8 },
      practicality: { score: 3.5, weight: 15, weighted: 0.53 },
      overall: 3.7,
    },
    verdict:
      "Solid all-rounder at a slightly easier cut-off than Milan/Pavia. Trade-off: programme is newer and student reviews mixed.",
    safety:
      "Generally safe; avoid Mirafiori Sud, Falchera, Vallette at night; safe student areas: Centro, San Salvario, Aurora.",
    internationalCommunity:
      "Moderate; large Erasmus; English moderate; strong Indian/West African student community.",
    partTimeWork:
      "Good Turin job market (Fiat/industrial hub); 20 hr/week legal; Italian preferred; €8–€12/hr.",
    crowding:
      "Medium cohort 32/yr; admin overwhelmed (typical large Italian uni); housing in Turin moderately competitive.",
    studentReviews:
      "Mixed (EDUopinions 2.5–3.3/5); English programme is newest of the historic northern unis; organizational complaints common.",
    strengths: [
      "Top Italian QS rank (#246 overall, top-200 Medicine)",
      "EDISU Piemonte scholarship — generous (€7,000/yr + free tuition/dorm)",
      "Solid industrial-city job market",
      "32 non-EU seats — moderate admission odds",
      "Cut-off dropped 3.6 pts in 2025 (70.8 → 67.18)",
    ],
    weaknesses: [
      "English programme newest among historic northern unis — still maturing",
      "Lowest student review scores among northern unis (EDUopinions 2.5–3.3/5)",
      "Orbassano campus requires commute from Turin",
      "Pre-enrollment deadline likely passed (30 Jun 2026)",
      "Po Valley winter fog + cold",
    ],
  },
  {
    rank: 12,
    slug: "parma",
    italianName: "Università degli Studi di Parma",
    shortName: "Parma",
    location: "Piacenza campus (~45 min from Parma city)",
    region: "Emilia-Romagna",
    setting:
      "Small urban — hospital-integrated campus in Piacenza, 70 km SE of Milan",
    nonEuSeats2025: 45,
    nonEuSeatsProjection2026: 45,
    imatCutoff: {
      "2023": 50.1,
      "2024": 59.1,
      "2025": 67.7,
      safeTarget2026: "69–70",
    },
    monthlyBudget: "€600–€950",
    tuition: "€156–€2,725/yr (ISEE)",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "ER.GO Emilia-Romagna",
      benefits: "Free tuition + dorm + meals + ~€7,000/yr cash",
      deadline: "Mid-Sep 2026 (verify)",
    },
    preEnrollmentStatus:
      "Universitaly — 30 Jun 2026 (PASSED; verify late apps)",
    qsRankings: {
      medicine: "Not in top-200 (overall #501–550)",
      overall: "#501–550",
    },
    ratings: {
      admissionOdds: { score: 4.5, weight: 35, weighted: 1.57 },
      academicReputation: { score: 3.5, weight: 15, weighted: 0.53 },
      costAndScholarships: { score: 4.0, weight: 15, weighted: 0.6 },
      livability: { score: 4.0, weight: 20, weighted: 0.8 },
      practicality: { score: 4.0, weight: 15, weighted: 0.6 },
      overall: 4.1,
    },
    verdict:
      "TOP PICK for score 69–70 who want northern Italy. Best non-EU quota in the north (45 seats) + safe affordable small city + generous ER.GO scholarship.",
    safety:
      "Very safe (Piacenza small affluent city ~100k); petty crime minimal.",
    internationalCommunity:
      "Small but tight-knit; mostly EU Erasmus; English moderate in Piacenza.",
    partTimeWork:
      "Good Emilia-Romagna job market (industrial + food hub); 20 hr/week legal; Italian preferred; €8–€12/hr.",
    crowding:
      "Medium-large cohort 45/yr; admin responsive; housing cheaper than Milan/Bologna.",
    studentReviews:
      "Generally positive; small-cohort intimacy (45/yr); modern Piacenza campus; cut-off rising rapidly (+8.5 pts in 1 yr).",
    strengths: [
      "Highest non-EU quota in northern Italy (45 seats) — best admission odds in the north",
      "Cut-off still moderate (67.66) despite rapid rise",
      "Very safe + affordable small city (Piacenza)",
      "Generous ER.GO Emilia-Romagna scholarship",
      "Modern hospital-integrated Piacenza campus",
      "Emilia-Romagna = Italy's best region for student services",
    ],
    weaknesses: [
      "Cut-off rose +8.5 pts in one year (59.1 → 67.66) — demand surging",
      "Programme is in Piacenza, not Parma city (confusion source)",
      "Piacenza is a small city — limited nightlife",
      "Pre-enrollment deadline likely passed (30 Jun 2026)",
      "Lower QS rank than Milan/Pavia/Bologna/Padova",
    ],
  },
  {
    rank: 13,
    slug: "tor-vergata",
    italianName: "Università degli Studi di Roma Tor Vergata",
    shortName: "Tor Vergata",
    location: "Rome (south-eastern suburb, outside GRA ring road)",
    region: "Lazio",
    setting:
      "Suburban — 600-hectare greenfield campus, 13 km from central Rome; 40–50 min by public transport",
    nonEuSeats2025: 20,
    nonEuSeatsProjection2026: 20,
    imatCutoff: {
      "2023": 53.4,
      "2024": 60.6,
      "2025": 69.1,
      safeTarget2026: "71–73",
    },
    monthlyBudget: "€850–€1,300",
    tuition: "€0–€2,800/yr (ISEE)",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "DiSCo Lazio",
      benefits: "Free tuition + dorm + meals + up to €7,557/yr cash",
      deadline: "22 Jul 2026, 12:00 noon",
    },
    preEnrollmentStatus:
      "Delphi portal — ~15 Jul 2026 (PASSED); Universitaly — 30 Jun 2026 (PASSED)",
    qsRankings: {
      medicine: "#201–250",
      overall: "#261–280",
    },
    ratings: {
      admissionOdds: { score: 2.5, weight: 35, weighted: 0.88 },
      academicReputation: { score: 4.0, weight: 15, weighted: 0.6 },
      costAndScholarships: { score: 3.0, weight: 15, weighted: 0.45 },
      livability: { score: 3.5, weight: 20, weighted: 0.7 },
      practicality: { score: 3.5, weight: 15, weighted: 0.53 },
      overall: 3.2,
    },
    verdict:
      "Strong modern alternative to Sapienza with smaller cohort. Apply for DiSCo Lazio scholarship by 22 Jul 2026 even if pre-enrollment closed.",
    safety:
      "Suburban campus area safe; avoid Roman periphery (Tor Bella Monaca, Don Bosco) at night; safe: Cinecittà, Anagnina, Appio Latino.",
    internationalCommunity:
      "Moderate; growing international intake; English works on campus, limited off-campus.",
    partTimeWork:
      "Decent Rome job market but commute required; 20 hr/week legal; Italian preferred; €8–€12/hr.",
    crowding:
      "Small cohort 20/yr; modern dedicated campus; admin more responsive than Sapienza; housing near Anagnina/Cinecittà cheaper than central Rome.",
    studentReviews:
      "Generally positive; modern facilities (1980s purpose-built); small IMS cohort = community feel; cut-off rising fast.",
    strengths: [
      "DiSCo Lazio scholarship (deadline 22 Jul 2026 — STILL OPEN)",
      "Modern purpose-built 600-hectare campus",
      "Smaller cohort (20) than Sapienza — less admin chaos",
      "Cut-off rising fast = strong reputation growth",
      "Suburban campus = tight international community",
    ],
    weaknesses: [
      "Delphi pre-evaluation deadline likely PASSED (~15 Jul 2026)",
      "Universitaly pre-enrollment PASSED (30 Jun 2026)",
      "Isolated suburban campus — 40–50 min commute to central Rome",
      "Cut-off rose +8.5 pts in 1 year (60.6 → 69.12) — competitive",
      "Only 20 non-EU seats — moderate volatility",
    ],
  },
  {
    rank: 14,
    slug: "bologna",
    italianName: "Alma Mater Studiorum — Università di Bologna (UNIBO)",
    shortName: "Bologna",
    location: "Bologna, Emilia-Romagna",
    region: "Emilia-Romagna",
    setting:
      "Urban — historic city centre + Sant'Orsola Hospital teaching complex",
    nonEuSeats2025: 20,
    nonEuSeatsProjection2026: 20,
    imatCutoff: {
      "2023": 51.5,
      "2024": 74.5,
      "2025": 70.4,
      safeTarget2026: "73–74",
    },
    monthlyBudget: "€800–€1,200",
    tuition: "€156–€3,315/yr (ISEE)",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "ER.GO Emilia-Romagna",
      benefits: "Free tuition + dorm + meals + ~€7,000/yr cash",
      deadline: "Mid-Sep 2026 (verify)",
    },
    preEnrollmentStatus:
      "Universitaly — 30 Jun 2026 (PASSED; verify late apps)",
    qsRankings: {
      medicine: "Top-100 (QS Life Sciences & Medicine)",
      overall: "#133",
    },
    ratings: {
      admissionOdds: { score: 2.5, weight: 35, weighted: 0.88 },
      academicReputation: { score: 4.5, weight: 15, weighted: 0.67 },
      costAndScholarships: { score: 3.0, weight: 15, weighted: 0.45 },
      livability: { score: 4.5, weight: 20, weighted: 0.9 },
      practicality: { score: 3.5, weight: 15, weighted: 0.53 },
      overall: 3.4,
    },
    verdict:
      "Italy's oldest university + top student city. Apply if score 73+. Verify late pre-enrollment. Housing is the main challenge — start search 4 months early.",
    safety:
      "Very safe city; avoid Bolognina and San Donato outskirts at night; safe: Centro, Universitaria, Savena.",
    internationalCommunity:
      "Huge international student body; English widely spoken; largest Erasmus programme in Italy.",
    partTimeWork:
      "Good Bologna job market; 20 hr/week legal; Italian helpful; €8–€12/hr.",
    crowding:
      "Small cohort (20 seats); admin overwhelmed (mega-uni); housing in Bologna is VERY competitive.",
    studentReviews:
      "Excellent academic reputation; student life is outstanding; housing crisis is the #1 complaint.",
    strengths: [
      "Western world's oldest university (founded 1088)",
      "Top-100 QS Medicine worldwide",
      "Best student city in Italy — vibrant, safe, cultural",
      "ER.GO Emilia-Romagna scholarship — generous",
      "Huge international community",
      "#133 overall QS rank",
    ],
    weaknesses: [
      "Only 20 non-EU seats — high cut-off (70.39 in 2025)",
      "Housing crisis — extremely competitive and expensive",
      "Pre-enrollment deadline likely passed (30 Jun 2026)",
      "Cut-off volatile (74.5 → 70.4 in 1 yr)",
      "Notorious bureaucracy (mega-university)",
    ],
  },
  {
    rank: 15,
    slug: "milan-statale",
    italianName: "Università degli Studi di Milano (Statale / UniMi)",
    shortName: "Milan (Statale)",
    location:
      "Milan (LITA building, Cascina Treviglio/Segrate area, 8–10 km east of Duomo)",
    region: "Lombardy",
    setting:
      "Suburban — LITA research/facility complex in Segrate, 8–10 km east of central Milan",
    nonEuSeats2025: 15,
    nonEuSeatsProjection2026: 15,
    imatCutoff: {
      "2023": 54,
      "2024": 74.8,
      "2025": 73.0,
      safeTarget2026: "75–76",
    },
    monthlyBudget: "€1,100–€1,800",
    tuition: "€156–€4,115/yr (ISEE)",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "DSU Lombardy + UniMi Excellence",
      benefits: "Free tuition + dorm + meals + cash",
      deadline: "Late Sep 2026 (DSU); UniMi Excellence separate deadline",
    },
    preEnrollmentStatus:
      "Universitaly — 30 Jun 2026 (PASSED; verify late apps)",
    qsRankings: {
      medicine: "Top-100 (QS Medicine subject rank)",
      overall: "#285",
    },
    ratings: {
      admissionOdds: { score: 1.5, weight: 35, weighted: 0.53 },
      academicReputation: { score: 5.0, weight: 15, weighted: 0.75 },
      costAndScholarships: { score: 2.0, weight: 15, weighted: 0.3 },
      livability: { score: 3.5, weight: 20, weighted: 0.7 },
      practicality: { score: 3.0, weight: 15, weighted: 0.45 },
      overall: 3.3,
    },
    verdict:
      "Italy's #1 medical school by QS subject rank + strongest job market. Trade-off: extreme cost of living + only 15 seats.",
    safety:
      "Milan generally safe; avoid Quarto Oggiaro, Corvetto, San Siro outer blocks at night.",
    internationalCommunity:
      "Largest international ecosystem in Italy; English widely spoken everywhere.",
    partTimeWork:
      "Best student job market in Italy; 20 hr/week legal; English sufficient; €10–€15/hr.",
    crowding:
      "Very small cohort (15 seats); admin overwhelmed; housing in Milan is EXPENSIVE and competitive.",
    studentReviews:
      "Premier medical school in Italy; clinical exposure at Milan's top hospitals; extremely competitive entry.",
    strengths: [
      "Italy's #1 medical school by QS subject rank (top-100 worldwide)",
      "Best job market in Italy for student part-time work",
      "Milan = Italy's most international and dynamic city",
      "UniMi Excellence scholarship programme",
      "World-class clinical training at Milan's top hospitals",
    ],
    weaknesses: [
      "Extreme cost of living (€1,100–€1,800/mo)",
      "Only 15 non-EU seats — most competitive admission odds",
      "Cut-off among highest in Italy (73.0 in 2025)",
      "Pre-enrollment deadline likely passed (30 Jun 2026)",
      "Campus is in Segrate suburb, 8–10 km from central Milan",
      "Housing extremely expensive and competitive",
    ],
  },
  {
    rank: 16,
    slug: "pavia",
    italianName: "Università degli Studi di Pavia (UNIPV)",
    shortName: "Pavia",
    location: "Pavia, Lombardy (35 km south of Milan)",
    region: "Lombardy",
    setting:
      "Small urban — historic collegiate university in Pavia city centre",
    nonEuSeats2025: 40,
    nonEuSeatsProjection2026: 40,
    imatCutoff: {
      "2023": 58.8,
      "2024": 69.7,
      "2025": 73.0,
      safeTarget2026: "74–75",
    },
    monthlyBudget: "€700–€1,200",
    tuition: "€156–€4,000/yr (ISEE)",
    tuitionFirstInstalment: "€156 fixed",
    scholarship: {
      name: "DSU Lombardy",
      benefits: "Free tuition + dorm + meals + cash",
      deadline: "Late Sep 2026 (verify)",
    },
    preEnrollmentStatus:
      "Universitaly — 30 Jun 2026 (PASSED; verify late apps)",
    qsRankings: {
      medicine: "#72 (QS Medicine 2026 — highest in Italy)",
      overall: "#346",
    },
    ratings: {
      admissionOdds: { score: 3.0, weight: 35, weighted: 1.05 },
      academicReputation: { score: 5.0, weight: 15, weighted: 0.75 },
      costAndScholarships: { score: 3.5, weight: 15, weighted: 0.53 },
      livability: { score: 4.0, weight: 20, weighted: 0.8 },
      practicality: { score: 3.5, weight: 15, weighted: 0.53 },
      overall: 3.8,
    },
    verdict:
      "Pavia combines Italy's top QS Med rank (#72 world) with 40 non-EU seats — the best 'prestige + admission odds' combination in the country.",
    safety: "Very safe small city (Pavia ~70k); petty crime minimal.",
    internationalCommunity:
      "Growing; Oxford-style collegiate system creates community; English moderate; active ESN.",
    partTimeWork:
      "Limited Pavia market; Milan accessible by train (35 min); 20 hr/week legal; Italian preferred; €8–€12/hr.",
    crowding:
      "Medium-large cohort (40 seats); admin better than mega-unis; collegiate system provides support; housing easier than Milan.",
    studentReviews:
      "Excellent academic reputation; unique collegiate experience; strong student satisfaction; very competitive entry.",
    strengths: [
      "Italy's #1 QS Medicine rank (#72 worldwide)",
      "40 non-EU seats — LARGEST among elite-tier universities",
      "Unique Oxford-style collegiate system",
      "Very safe and charming small city",
      "Milan is 35 min by train — easy access to city/career",
      "DSU Lombardy scholarship available",
      "Best 'prestige + admission odds' combo in Italy",
    ],
    weaknesses: [
      "Cut-off very high (73.0 in 2025) — requires top IMAT score",
      "Pre-enrollment deadline likely passed (30 Jun 2026)",
      "Small city — limited nightlife compared to Milan/Bologna",
      "Limited local part-time job market",
      "Pavia is small (~70k) — may feel isolated",
    ],
  },
];

/** Get university by slug */
export function getUniversityBySlug(
  slug: UniversitySlug
): University | undefined {
  return universities.find((u) => u.slug === slug);
}

/** Get university by rank */
export function getUniversityByRank(rank: number): University | undefined {
  return universities.find((u) => u.rank === rank);
}

/** IMAT score tier categories */
export type IMATScoreTier = "lower" | "mid" | "upper" | "elite";

export function getTierForScore(score: number): IMATScoreTier {
  if (score <= 58) return "lower";
  if (score <= 66) return "mid";
  if (score <= 72) return "upper";
  return "elite";
}

/** Get recommended universities for a given IMAT score tier */
export function getRecommendationsByTier(tier: IMATScoreTier): University[] {
  switch (tier) {
    case "lower":
      return [
        getUniversityBySlug("messina"),
        getUniversityBySlug("cagliari"),
        getUniversityBySlug("marche-polytechnic"),
      ].filter(Boolean) as University[];
    case "mid":
      return [
        getUniversityBySlug("catania"),
        getUniversityBySlug("parma"),
        getUniversityBySlug("vanvitelli"),
      ].filter(Boolean) as University[];
    case "upper":
      return [
        getUniversityBySlug("turin"),
        getUniversityBySlug("padova"),
        getUniversityBySlug("pavia"),
        getUniversityBySlug("bologna"),
      ].filter(Boolean) as University[];
    case "elite":
      return [
        getUniversityBySlug("pavia"),
        getUniversityBySlug("milan-statale"),
        getUniversityBySlug("sapienza"),
      ].filter(Boolean) as University[];
  }
}

/** Deadline urgency classification */
export type DeadlineUrgency = "critical" | "high" | "medium" | "passed";

export type Deadline = {
  date: string;
  description: string;
  universities: string[];
  urgency: DeadlineUrgency;
};

export const criticalDeadlines: Deadline[] = [
  {
    date: "20 Jul 2026, 23:59 CEST",
    description:
      "Messina pre-evaluation (€30 fee) + Universitaly — BOTH required simultaneously",
    universities: ["Messina"],
    urgency: "critical",
  },
  {
    date: "22 Jul 2026, 12:00 noon Rome time",
    description:
      "DiSCo Lazio scholarship Phase 1 form at laziodisco.it — no documents needed",
    universities: ["Sapienza", "Tor Vergata"],
    urgency: "critical",
  },
  {
    date: "31 Jul 2026",
    description: "Catania Universitaly pre-enrollment deadline",
    universities: ["Catania"],
    urgency: "high",
  },
  {
    date: "10 Aug 2026, 14:00",
    description: "ERSU Catania + ADISU Puglia scholarship deadline",
    universities: ["Catania", "Bari Aldo Moro"],
    urgency: "high",
  },
  {
    date: "18 Aug 2026, 14:00",
    description:
      "ADISURC Campania scholarship deadline (Federico II + Vanvitelli)",
    universities: ["Federico II", "Vanvitelli"],
    urgency: "high",
  },
  {
    date: "18 Aug 2026",
    description: "ERSU Messina scholarship deadline",
    universities: ["Messina"],
    urgency: "high",
  },
  {
    date: "24 Aug 2026, 16:00",
    description: "ERDIS Marche scholarship deadline",
    universities: ["Marche Polytechnic"],
    urgency: "high",
  },
  {
    date: "28 Aug 2026",
    description: "ERSU Cagliari scholarship deadline",
    universities: ["Cagliari"],
    urgency: "high",
  },
  {
    date: "8 Oct 2026",
    description: "IMAT 2026 EXAM DAY — same date worldwide",
    universities: ["All"],
    urgency: "medium",
  },
];

/** IMAT exam format info */
export const imatExamInfo = {
  examDate: "Thursday, 8 October 2026",
  fee: "€130",
  format:
    "Paper-based, pen-and-paper, 60 multiple-choice questions (5 options each)",
  duration: "100 minutes",
  scoring: "+1.5 per correct, −0.4 per wrong, 0 for blank. Maximum score = 90.",
  sections: [
    {
      section: "Reading Skills & General Knowledge",
      questions: 4,
      weight: "6.7%",
    },
    {
      section: "Logical Reasoning & Problem Solving",
      questions: 5,
      weight: "8.3%",
    },
    { section: "Biology", questions: 23, weight: "38.3%" },
    { section: "Chemistry", questions: 15, weight: "25.0%" },
    { section: "Mathematics & Physics", questions: 13, weight: "21.7%" },
  ],
  registration:
    "Via Universitaly.it (~late August to ~9 September 2026, 15:00 CEST)",
  note: "Format stable since 2023 restructuring (MUR took over from Cambridge Assessment). 2026 official MUR decree pending as of 18 July 2026.",
};
