export type Certification = {
  title: string
  issuer: string
  issueDate: string
  expirationDate?: string
  credentialId?: string
  credentialUrl?: string
  skills?: string[]
}

export const certifications: Certification[] = [
  {
    title: "AWS Educate Introduction to Generative AI - Training Badge",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2025-10-01",
    credentialId: "a755c1b2-33e4-4726-854c-a2131f0507ab",
    skills: ["Artificial Intelligence", "Machine Learning"],
  },
  {
    title: "AWS Educate Machine Learning Foundations - Training Badge",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2025-10-01",
    skills: ["Artificial Intelligence", "Machine Learning"],
  },
  {
    title: "AI 101: Building Beyond Basics",
    issuer: "Teach For America",
    issueDate: "2025-09-01",
  },
  {
    title: "Native American Research",
    issuer: "CITI Program",
    issueDate: "2025-03-01",
    expirationDate: "2029-03-01",
    credentialId: "68442266",
  },
  {
    title: "Social and Behavioral Research Investigators",
    issuer: "CITI Program",
    issueDate: "2025-03-01",
    expirationDate: "2029-03-01",
    credentialId: "68442265",
  },
  {
    title: "International English Language Testing System",
    issuer: "IDP Education Ltd",
    issueDate: "2024-04-01",
    expirationDate: "2026-04-01",
    credentialId: "24IA502842MANK009A",
    skills: ["English"],
  },
  {
    title: "BCSS Machine Learning Fundamental Level",
    issuer: "Ericsson",
    issueDate: "2023-10-01",
    credentialId: "9c023a22-9790-4ab2-b854-093e8da72e24",
    skills: ["Artificial Intelligence", "Machine Learning"],
  },
  {
    title: "Deep Learning in Computer Vision",
    issuer: "Higher School of Economics",
    issueDate: "2020-08-01",
    credentialId: "2WASE6828J7M",
  },
  {
    title: "Introduction to Graph Theory",
    issuer: "UC San Diego",
    issueDate: "2020-07-01",
    credentialId: "KP8F8DJZ5GE3",
  },
  {
    title: "Xilinx Zynq Ultrascale + MPSoC and Pynq Framework Custom Design Webinar",
    issuer: "Xilinx",
    issueDate: "2020-04-01",
  },
  {
    title: "Google Web Ranger",
    issuer: "Google",
    issueDate: "2017-08-01",
  },
]

