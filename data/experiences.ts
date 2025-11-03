export type WorkType = "Full-time" | "Part-time" | "Internship"
export type WorkMode = "On-site" | "Hybrid" | "Remote"

export type Experience = {
  id: string
  company: string
  position: string
  type: WorkType
  location: string
  startDate: string
  endDate: string
  duration: string
  workMode: WorkMode
  description: string
  skills: string[]
  achievements?: string[]
  featuredOnHome?: boolean
}

export const experiences: Experience[] = [
  {
    id: "ericsson-engineer",
    company: "Ericsson",
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
    featuredOnHome: true,
  },
  {
    id: "ericsson-intern",
    company: "Ericsson",
    position: "Cloud and Infrastructure Intern",
    type: "Internship",
    location: "Noida, Uttar Pradesh, India",
    startDate: "Feb 2023",
    endDate: "Sep 2023",
    duration: "8 mos",
    workMode: "On-site",
    description:
      "Managed and maintained cloud and infrastructure systems for Ericsson Global, ensuring reliability, security, and performance while supporting cross-functional teams.",
    skills: ["Citrix Workspace", "Citrix Virtual Apps", "Cloud Infrastructure"],
    featuredOnHome: true,
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
    skills: ["MongoDB", "React.js", "Database Design", "Web Development", "Project Management"],
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
    skills: ["Embedded Software", "Embedded C", "Marlin", "IoT", "Motor Control"],
    featuredOnHome: true,
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
    description: "Gained foundational experience in engineering practices and consulting methodologies.",
    skills: ["Engineering", "Consulting", "Problem Solving"],
    featuredOnHome: true,
  },
]

export const homeExperiences = experiences.filter((experience) => experience.featuredOnHome)

