export type WorkType =
  | "Full-time"
  | "Part-time"
  | "Internship"
  | "Contract"
  | "Apprenticeship";
export type WorkMode = "On-site" | "Hybrid" | "Remote";

export type SubRole = {
  position: string;
  type: WorkType;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  workMode: WorkMode;
  description: string;
  skills: string[];
  achievements?: string[];
};

export type Experience = {
  id: string;
  company: string;
  position?: string;
  type?: WorkType;
  location?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  workMode?: WorkMode;
  description?: string;
  skills: string[];
  achievements?: string[];
  roles?: SubRole[];
  featuredOnHome?: boolean;
  collapsible?: boolean;
};

export const experiences: Experience[] = [
  {
    id: "invisible-technologies",
    company: "Invisible Technologies",
    position: "AI Evaluator and Trainer",
    type: "Contract",
    location: "Remote",
    startDate: "Jul 2026",
    endDate: "Present",
    duration: "2 mos",
    workMode: "Remote",
    description:
      "Contracted to evaluate and refine advanced conversational AI systems and Audio Virtual Agents for an enterprise client. Conduct comparative performance analyses between machine learning model iterations, utilizing audio datasets and JSON transcripts to evaluate output accuracy. Synthesize model evaluation metrics to deliver structured, high-quality technical feedback for ongoing algorithmic alignment and natural language model optimization.",
    skills: [
      "Model Evaluation",
      "Data Analysis",
      "Conversational AI",
      "Natural Language Processing",
      "Machine Learning",
    ],
    featuredOnHome: true,
  },
  {
    id: "mercor",
    company: "Mercor",
    position: "Offensive Cyber Expert",
    type: "Contract",
    location: "Remote",
    startDate: "Jul 2026",
    endDate: "Present",
    duration: "2 mos",
    workMode: "Remote",
    description:
      "Partnered with Mercor as an independent contractor to enhance AI models in cybersecurity. Developed expert-level prompts for offensive and defensive cybersecurity topics to improve model understanding, and evaluated and annotated model responses for technical accuracy and sensitivity to ensure high-quality outputs.",
    skills: [
      "AI Safety",
      "Prompt Engineering",
      "Cybersecurity",
      "Offensive Security",
      "Technical Evaluation",
    ],
    featuredOnHome: true,
  },
  {
    id: "netstar",
    company: "NetSTAR Global",
    position: "Machine Learning Engineer",
    type: "Apprenticeship",
    location: "Remote",
    startDate: "Jan 2026",
    endDate: "May 2026",
    duration: "5 mos",
    workMode: "Remote",
    description:
      "Engineered an enterprise-grade automated threat intelligence platform with a hybrid detection architecture combining a FastText NLP classifier, structured ML models, and algorithmic distance rules to identify deceptive URLs and brand spoofing, improving detection accuracy and reducing manual investigation time for client security teams. Analyzed 1B+ phishing URLs using SQL and orchestrated a containerized environment to support real-time telemetry on a live Power BI dashboard, integrating NetSTAR and PhishStats APIs to dynamically enrich zero-day threat evaluation for client networks.",
    skills: [
      "FastText",
      "Power BI",
      "SQL",
      "Docker",
      "Python",
      "Machine Learning",
    ],
    achievements: [
      "Achieved ~96% accuracy on zero-day phishing threats with an ML ensemble (XGBoost, LightGBM, Random Forest, Logistic Regression)",
      "Engineered high-throughput data pipelines processing 1B+ phishing URLs using SQL and distributed frameworks",
      "Containerized the infrastructure with Docker and deployed real-time Power BI dashboards for enterprise client security teams",
      "Integrated NetSTAR and PhishStats APIs to dynamically enrich zero-day threat evaluation for client networks",
    ],
    featuredOnHome: true,
  },
  {
    id: "ericsson",
    company: "Ericsson",
    skills: [
      "Citrix Workspace",
      "Citrix Virtual Apps",
      "Google Cloud Platform",
      "Cloud Migration",
      "Database Management",
    ],
    roles: [
      {
        position: "Engineer, Cloud and Infra",
        type: "Full-time",
        location: "Noida, Uttar Pradesh, India",
        startDate: "Sep 2023",
        endDate: "Dec 2024",
        duration: "1 yr 4 mos",
        workMode: "Hybrid",
        description:
          "Orchestrated the scale-out Citrix virtual infrastructure migration of 2,000+ production servers to Google Cloud Platform (GCP), executing one of the company's largest public cloud modernization initiatives. Collaborated with security teams to harden the hybrid cloud environment.",
        skills: [
          "Citrix Workspace",
          "Citrix Virtual Apps",
          "Google Cloud Platform",
          "Cloud Migration",
          "Database Management",
          "SQL",
        ],
        achievements: [
          "Led team migration of 2,000+ servers from on-prem to GCP, reducing infrastructure cost by an estimated 30%",
          "Improved tool uptime to three 9s (99.9% uptime SLA)",
          "Automated database management workflows, reducing maintenance time by 40% and freeing 8 hours/week for the team",
        ],
      },
      {
        position: "Cloud and Infrastructure Intern",
        type: "Internship",
        location: "Noida, Uttar Pradesh, India",
        startDate: "Feb 2023",
        endDate: "Sep 2023",
        duration: "8 mos",
        workMode: "On-site",
        description:
          "Managed and maintained cloud and infrastructure systems for Ericsson Global, ensuring reliability, security, and performance while supporting cross-functional teams.",
        skills: [
          "Citrix Workspace",
          "Citrix Virtual Apps",
          "Cloud Infrastructure",
        ],
      },
    ],
    featuredOnHome: true,
  },
  {
    id: "tata-power",
    company: "TATA Power",
    position: "Full Stack Intern",
    type: "Part-time",
    location: "Noida, Uttar Pradesh, India",
    startDate: "Jul 2021",
    endDate: "Sep 2021",
    duration: "3 mos",
    workMode: "On-site",
    description:
      "Streamlined employee transfer and joining policies by designing a database schema and prototyping an internal portal. Partnered with HR to document policy workflows and improve discoverability.",
    skills: [
      "MongoDB",
      "React.js",
      "Database Design",
      "Web Development",
      "Project Management",
    ],
  },
  {
    id: "robovitics",
    company: "roboVITics - The Official Robotics Club of VIT",
    position: "Member of the Management Board",
    type: "Part-time",
    location: "Vellore, Tamil Nadu, India",
    startDate: "Mar 2021",
    endDate: "Jan 2022",
    duration: "11 mos",
    workMode: "On-site",
    description:
      "Served as management board member for VIT's premier robotics organization with 500+ members. Led the design department, teaching Adobe Creative Suite and Figma to 75+ students and mentoring them through club projects.",
    skills: ["Adobe Creative Suite", "Figma", "Leadership", "Event Management"],
    collapsible: true,
  },
  {
    id: "trikon",
    company: "Trikon Technologies",
    position: "Firmware Developer",
    type: "Internship",
    location: "Noida, Uttar Pradesh, India",
    startDate: "May 2021",
    endDate: "Aug 2021",
    duration: "4 mos",
    workMode: "On-site",
    description:
      "Developed and tested firmware for embedded systems and microcontrollers, collaborating with cross-functional teams on automation systems, IoT devices, and motor control applications.",
    skills: [
      "Embedded Software",
      "Embedded C",
      "Marlin",
      "IoT",
      "Motor Control",
    ],
    featuredOnHome: true,
    collapsible: true,
  },
  {
    id: "syolo",
    company: "Syolo Consulting",
    position: "Engineer Intern",
    type: "Internship",
    location: "Noida, Uttar Pradesh, India",
    startDate: "Mar 2020",
    endDate: "May 2020",
    duration: "3 mos",
    workMode: "On-site",
    description:
      "Gained foundational experience in engineering practices and consulting methodologies.",
    skills: ["Engineering", "Consulting", "Problem Solving"],
    featuredOnHome: true,
    collapsible: true,
  },
];

/**
 * Experiences shown on the homepage compact card, in data-file order — the
 * same order the About-page timeline uses. No custom sort: the data file is
 * the single source of truth for ordering.
 */
export const homeExperiences = experiences.filter(
  (experience) => experience.featuredOnHome
);
