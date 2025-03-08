export type Theme = "professional" | "modern" | "classic" | "creative" | "minimal" | "executive"

export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  portfolio: string
  github: string
  linkedin: string
  profileImage: string
  summary: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Project {
  id: string
  name: string
  description: string
  githubLink: string
  liveLink: string
  technologies: string
  startDate: string
  endDate: string
}

export interface Skill {
  id: string
  name: string
}

export interface AdditionalSection {
  id: string
  title: string
  content: string
}

export interface ResumeData {
  personal: PersonalInfo
  experience: Experience[]
  education: Education[]
  projects: Project[]
  skills: Skill[]
  additionalSections: AdditionalSection[]
}

export interface SectionScore {
  score: number
  feedback: string
  improvements?: string[]
}

export interface ImprovementPriority {
  section: string
  priority: "high" | "medium" | "low"
  action: string
}

export interface ResumeScore {
  overall: number
  sections: {
    [key: string]: SectionScore
  }
  recommendations: string[]
  keywordsMissing?: string[]
  keywordsFound?: string[]
  improvementPriorities?: ImprovementPriority[]
}

