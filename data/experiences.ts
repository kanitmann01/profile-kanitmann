export type WorkType = "Full-time" | "Part-time" | "Internship";
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
    duration: "1 mo",
    workMode: "Remote",
    description:
      "Contracted to evaluate and refine advanced conversational AI systems and Audio Virtual Agents for an enterprise client. Conduct comparative performance analyses between machine learning model iterations, utilizing audio datasets and JSON transcripts to evaluate output accuracy. Synthesize model evaluation metrics to deliver structured, high-quality technical feedback for ongoing algorithmic alignment and natural language model optimization.",
    skills: [
      "Conversational AI",
      "Model Evaluation",
      "Natural Language Processing",
      "Machine Learning",
      "Audio Data Analysis",
    ],
    featuredOnHome: true,
  },
  {
    id: "netstar",
    company: "NetSTAR Global",
    position: "ML Engineer",
    type: "Internship",
    location: "Remote",
    startDate: "Jan 2026",
    endDate: "May 2026",
    duration: "5 mos",
    workMode: "Remote",
    description:
      "Developed machine learning models and data pipelines for global-scale network analytics. Built feature extraction pipelines, trained classification models, and delivered actionable insights from network telemetry data for enterprise clients.",
    skills: [
      "Python",
      "Machine Learning",
      "Data Pipelines",
      "TensorFlow",
      "Scikit-learn",
    ],
    achievements: [
      "Built ML classification models for network anomaly detection achieving high precision on telemetry data",
      "Designed automated feature extraction pipeline processing millions of network events daily",
      "Delivered executive dashboards translating model outputs into actionable engineering recommendations",
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
          "Led deployment and optimization of Citrix virtual infrastructure across regional data centers, improving resource utilization and reducing system latency. Contributed to migrating approximately 2,000 servers from on-premises infrastructure to Google Cloud Platform (GCP) and collaborated with security teams to harden the hybrid cloud environment.",
        skills: [
          "Citrix Workspace",
          "Citrix Virtual Apps",
          "Google Cloud Platform",
          "Cloud Migration",
          "Database Management",
        ],
        achievements: [
          "Successfully migrated 2,000+ servers to GCP with minimal disruption",
          "Improved resource utilization and reduced system latency",
          "Implemented automated database management workflows",
          "Achieved high uptime for mission-critical applications",
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

export const homeExperiences = experiences.filter(
  (experience) => experience.featuredOnHome
);
