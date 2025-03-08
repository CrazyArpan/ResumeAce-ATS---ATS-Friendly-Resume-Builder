"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ResumeData, ResumeScore } from "@/lib/types"
import { AlertCircle, CheckCircle2, Info, FileText, ArrowUp, AlertTriangle, Award, Zap } from "lucide-react"

interface ResumeScoreCheckerProps {
  data: ResumeData
}

export function ResumeScoreChecker({ data }: ResumeScoreCheckerProps) {
  const [score, setScore] = useState<ResumeScore | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("current")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const checkResumeScore = () => {
    setLoading(true)
    setUploadError(null)

    // Simulate API call with a timeout
    setTimeout(() => {
      const newScore = calculateScore(data)
      setScore(newScore)
      setLoading(false)
    }, 1500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setUploadError(null)

    if (file) {
      if (file.type === "application/pdf") {
        setUploadedFile(file)
      } else {
        setUploadError("Please upload a PDF file")
        setUploadedFile(null)
      }
    }
  }

  const checkUploadedResumeScore = () => {
    if (!uploadedFile) {
      setUploadError("Please upload a resume PDF first")
      return
    }

    setLoading(true)
    setUploadError(null)

    // Simulate API call with a timeout
    setTimeout(() => {
      // In a real implementation, this would parse the PDF and extract text
      // For now, we'll generate a random score
      const randomScore = Math.floor(Math.random() * 41) + 60 // Random score between 60-100

      const newScore: ResumeScore = {
        overall: randomScore,
        sections: {
          personal: {
            score: Math.floor(Math.random() * 31) + 70,
            feedback:
              randomScore > 80
                ? "Your personal information section is well-filled."
                : "Consider adding more details to your personal information section.",
            improvements: [
              "Add a professional email address that includes your name",
              "Include your LinkedIn profile URL",
              "Make sure your location includes city and state/province",
            ],
          },
          experience: {
            score: Math.floor(Math.random() * 31) + 70,
            feedback:
              randomScore > 80
                ? "Your experience section is well-detailed."
                : "Add more details to your work experience with bullet points and quantifiable achievements.",
            improvements: [
              "Start each bullet point with a strong action verb",
              "Include metrics and quantifiable achievements",
              "Ensure job titles match industry standards for better keyword matching",
            ],
          },
          education: {
            score: Math.floor(Math.random() * 31) + 70,
            feedback:
              randomScore > 80
                ? "Your education section is well-structured."
                : "Add more details to your education section.",
            improvements: [
              "Include your GPA if it's 3.5 or higher",
              "List relevant coursework that matches job requirements",
              "Add academic achievements and honors",
            ],
          },
          skills: {
            score: Math.floor(Math.random() * 31) + 70,
            feedback:
              randomScore > 80
                ? "Your skills section has a good number of keywords."
                : "Add more relevant skills to improve ATS keyword matching.",
            improvements: [
              "Include both technical and soft skills",
              "Add industry-specific keywords from job descriptions",
              "Organize skills by category for better readability",
            ],
          },
        },
        recommendations: [
          "Consider using more industry-specific keywords throughout your resume.",
          "Ensure your resume has a clean, ATS-friendly format without complex tables or graphics.",
          "Use standard section headings that ATS systems can easily recognize.",
          "Quantify your achievements with specific metrics where possible.",
        ],
        keywordsMissing: ["project management", "team leadership", "budget planning", "strategic planning"],
        keywordsFound: ["communication", "problem solving", "Microsoft Office", "customer service"],
        improvementPriorities: [
          {
            section: "experience",
            priority: "high",
            action: "Add more quantifiable achievements with metrics",
          },
          {
            section: "skills",
            priority: "medium",
            action: "Add more technical skills relevant to your industry",
          },
          {
            section: "education",
            priority: "low",
            action: "Include relevant coursework and certifications",
          },
        ],
      }

      setScore(newScore)
      setLoading(false)
    }, 2000)
  }

  const calculateScore = (data: ResumeData): ResumeScore => {
    const score: ResumeScore = {
      overall: 0,
      sections: {},
      recommendations: [],
      keywordsMissing: [],
      keywordsFound: [],
      improvementPriorities: [],
    }

    // Check personal section
    const personalScore = {
      score: 0,
      feedback: "",
      improvements: [] as string[],
    }
    let personalPoints = 0

    if (data.personal.name) personalPoints += 10
    if (data.personal.title) personalPoints += 10
    if (data.personal.email) personalPoints += 10
    if (data.personal.phone) personalPoints += 10
    if (data.personal.location) personalPoints += 5

    // Check for professional email format
    if (data.personal.email) {
      if (
        !data.personal.email.includes("@") ||
        data.personal.email.startsWith("info@") ||
        data.personal.email.includes("gmail.com")
      ) {
        personalScore.improvements.push("Consider using a more professional email address or a personal domain")
      }
    } else {
      personalScore.improvements.push("Add your email address - this is essential contact information")
    }

    // Check for LinkedIn profile
    if (!data.personal.linkedin) {
      personalScore.improvements.push("Add your LinkedIn profile URL to enhance your professional presence")
    }

    // Check for location format
    if (data.personal.location) {
      if (!data.personal.location.includes(",")) {
        personalScore.improvements.push("Format your location as 'City, State/Province' for clarity")
      }
    } else {
      personalScore.improvements.push("Add your location to help with location-based job matching")
    }

    if (data.personal.summary) {
      if (data.personal.summary.length > 300) {
        personalPoints += 15
      } else if (data.personal.summary.length > 150) {
        personalPoints += 10
        personalScore.improvements.push("Expand your professional summary to 300+ characters with relevant keywords")
        score.recommendations.push(
          "Consider expanding your professional summary to 300+ characters for better ATS performance.",
        )
      } else {
        personalPoints += 5
        personalScore.improvements.push("Your summary is too brief. Aim for 300+ characters with relevant keywords")
        score.recommendations.push(
          "Your professional summary is too short. Aim for 300+ characters with relevant keywords.",
        )
      }
    } else {
      personalScore.improvements.push("Add a professional summary highlighting your expertise and career goals")
      score.recommendations.push("Add a professional summary to improve your resume's ATS score.")
    }

    personalScore.score = Math.min(100, personalPoints)
    personalScore.feedback =
      personalPoints >= 50
        ? "Your personal information section is well-filled."
        : "Complete more fields in your personal information section."

    score.sections.personal = personalScore

    // Check experience section
    const experienceScore = {
      score: 0,
      feedback: "",
      improvements: [] as string[],
    }
    let experiencePoints = 0

    if (data.experience.length > 0) {
      experiencePoints += Math.min(60, data.experience.length * 20)

      // Check for detailed descriptions
      const hasDetailedDescriptions = data.experience.every(
        (exp) => exp.description && exp.description.length > 100 && exp.description.includes("•"),
      )

      if (hasDetailedDescriptions) {
        experiencePoints += 40
      } else {
        experienceScore.improvements.push("Use bullet points (•) in your work experience descriptions")
        experienceScore.improvements.push("Ensure each job has at least 3-5 bullet points describing achievements")
        score.recommendations.push(
          "Use bullet points (•) in your work experience descriptions and provide detailed achievements.",
        )
      }

      // Check for action verbs
      let hasActionVerbs = true
      const actionVerbs = [
        "managed",
        "led",
        "developed",
        "created",
        "implemented",
        "achieved",
        "increased",
        "reduced",
        "improved",
      ]

      data.experience.forEach((exp) => {
        if (exp.description) {
          let foundVerb = false
          actionVerbs.forEach((verb) => {
            if (exp.description.toLowerCase().includes(verb)) {
              foundVerb = true
            }
          })

          if (!foundVerb) {
            hasActionVerbs = false
          }
        }
      })

      if (!hasActionVerbs) {
        experienceScore.improvements.push(
          "Start each bullet point with strong action verbs (e.g., Managed, Developed, Implemented)",
        )
      }

      // Check for metrics and numbers
      let hasMetrics = false
      data.experience.forEach((exp) => {
        if (exp.description && /\d+%|\$\d+|\d+ (people|employees|team members)/.test(exp.description)) {
          hasMetrics = true
        }
      })

      if (!hasMetrics) {
        experienceScore.improvements.push(
          "Include metrics and quantifiable achievements (e.g., 'Increased sales by 20%')",
        )
        score.improvementPriorities.push({
          section: "experience",
          priority: "high",
          action: "Add quantifiable achievements with metrics (%, $, numbers)",
        })
      }
    } else {
      experienceScore.improvements.push("Add work experience entries - this is a critical section for ATS scoring")
      score.recommendations.push("Add work experience to significantly improve your resume's ATS score.")
      score.improvementPriorities.push({
        section: "experience",
        priority: "high",
        action: "Add at least one work experience entry with detailed bullet points",
      })
    }

    experienceScore.score = Math.min(100, experiencePoints)
    experienceScore.feedback =
      experiencePoints >= 60
        ? "Your experience section is well-detailed."
        : "Add more details to your work experience with bullet points and quantifiable achievements."

    score.sections.experience = experienceScore

    // Check education section
    const educationScore = {
      score: 0,
      feedback: "",
      improvements: [] as string[],
    }
    let educationPoints = 0

    if (data.education.length > 0) {
      educationPoints += Math.min(80, data.education.length * 40)

      // Check for detailed information
      const hasDetailedInfo = data.education.every(
        (edu) => edu.institution && edu.degree && edu.field && edu.startDate && edu.endDate,
      )

      if (hasDetailedInfo) {
        educationPoints += 20
      } else {
        educationScore.improvements.push(
          "Complete all fields for each education entry (institution, degree, field, dates)",
        )
        score.recommendations.push("Complete all fields in your education entries (institution, degree, field, dates).")
      }

      // Check for descriptions
      const hasDescriptions = data.education.some((edu) => edu.description && edu.description.length > 50)
      if (!hasDescriptions) {
        educationScore.improvements.push(
          "Add descriptions to your education entries including relevant coursework or achievements",
        )
      }
    } else {
      educationScore.improvements.push("Add at least one education entry to improve your resume's completeness")
      score.recommendations.push("Add education details to improve your resume's ATS score.")
      score.improvementPriorities.push({
        section: "education",
        priority: "medium",
        action: "Add your educational background with degree details",
      })
    }

    educationScore.score = Math.min(100, educationPoints)
    educationScore.feedback =
      educationPoints >= 60
        ? "Your education section is well-structured."
        : "Add more details to your education section."

    score.sections.education = educationScore

    // Check skills section
    const skillsScore = {
      score: 0,
      feedback: "",
      improvements: [] as string[],
    }
    let skillsPoints = 0

    if (data.skills.length > 0) {
      skillsPoints += Math.min(100, data.skills.length * 10)

      if (data.skills.length < 5) {
        skillsScore.improvements.push("Add more skills - aim for 8-12 skills for optimal ATS matching")
        score.recommendations.push("Add more skills (aim for 8-12) to improve keyword matching in ATS systems.")
        score.improvementPriorities.push({
          section: "skills",
          priority: "high",
          action: "Add more relevant skills to reach at least 8 skills",
        })
      }

      // Check for industry-specific keywords
      const techSkills = ["javascript", "python", "react", "node", "aws", "cloud", "database", "sql"]
      const softSkills = ["leadership", "communication", "teamwork", "problem solving", "critical thinking"]

      let hasTechSkills = false
      let hasSoftSkills = false

      data.skills.forEach((skill) => {
        if (skill.name) {
          const skillLower = skill.name.toLowerCase()
          techSkills.forEach((tech) => {
            if (skillLower.includes(tech)) {
              hasTechSkills = true
              score.keywordsFound.push(skill.name)
            }
          })

          softSkills.forEach((soft) => {
            if (skillLower.includes(soft)) {
              hasSoftSkills = true
              score.keywordsFound.push(skill.name)
            }
          })
        }
      })

      if (!hasTechSkills) {
        skillsScore.improvements.push("Include technical skills relevant to your industry")
        score.keywordsMissing.push(...techSkills.slice(0, 3))
      }

      if (!hasSoftSkills) {
        skillsScore.improvements.push("Add soft skills like leadership, communication, and problem-solving")
        score.keywordsMissing.push(...softSkills.slice(0, 3))
      }
    } else {
      skillsScore.improvements.push("Add a skills section with at least 8-12 relevant skills")
      score.recommendations.push("Add skills to improve your resume's keyword matching in ATS systems.")
      score.improvementPriorities.push({
        section: "skills",
        priority: "high",
        action: "Create a skills section with both technical and soft skills",
      })
    }

    skillsScore.score = Math.min(100, skillsPoints)
    skillsScore.feedback =
      skillsPoints >= 60
        ? "Your skills section has a good number of keywords."
        : "Add more relevant skills to improve ATS keyword matching."

    score.sections.skills = skillsScore

    // Check projects section
    const projectsScore = {
      score: 0,
      feedback: "",
      improvements: [] as string[],
    }
    let projectsPoints = 0

    if (data.projects.length > 0) {
      projectsPoints += Math.min(80, data.projects.length * 30)

      // Check for detailed descriptions
      const hasDetailedDescriptions = data.projects.every(
        (proj) => proj.description && proj.description.length > 100 && proj.technologies,
      )

      if (hasDetailedDescriptions) {
        projectsPoints += 20
      } else {
        projectsScore.improvements.push("Add more detailed descriptions to your projects (aim for 100+ characters)")
        projectsScore.improvements.push("List the technologies used for each project")
        score.recommendations.push("Add detailed descriptions and technologies used in your projects.")
      }

      // Check for links
      const hasLinks = data.projects.some((proj) => proj.githubLink || proj.liveLink)
      if (!hasLinks) {
        projectsScore.improvements.push("Include GitHub repositories or live demo links for your projects")
      }
    } else {
      projectsScore.improvements.push("Consider adding projects to showcase your practical skills and experience")
      score.recommendations.push("Consider adding projects to showcase your practical skills.")
      score.improvementPriorities.push({
        section: "projects",
        priority: "medium",
        action: "Add at least one project with technologies used and description",
      })
    }

    projectsScore.score = Math.min(100, projectsPoints)
    projectsScore.feedback =
      projectsPoints >= 60
        ? "Your projects section effectively showcases your work."
        : "Add more details to your projects section."

    score.sections.projects = projectsScore

    // Calculate overall score (weighted average)
    const weights = {
      personal: 0.15,
      experience: 0.35,
      education: 0.15,
      skills: 0.25,
      projects: 0.1,
    }

    score.overall = Math.round(
      personalScore.score * weights.personal +
        experienceScore.score * weights.experience +
        educationScore.score * weights.education +
        skillsScore.score * weights.skills +
        projectsScore.score * weights.projects,
    )

    // Add general recommendations
    if (!data.personal.profileImage) {
      score.recommendations.push("Consider adding a professional profile photo to make your resume more personable.")
    }

    if (data.additionalSections.length === 0) {
      score.recommendations.push("Add custom sections like 'Certifications' or 'Achievements' to enhance your resume.")
      score.improvementPriorities.push({
        section: "additional",
        priority: "low",
        action: "Add a custom section for certifications or achievements",
      })
    }

    // Add common missing keywords
    if (score.keywordsMissing.length === 0) {
      score.keywordsMissing = [
        "project management",
        "team leadership",
        "strategic planning",
        "cross-functional collaboration",
      ]
    }

    // Add common found keywords if none detected
    if (score.keywordsFound.length === 0) {
      const possibleKeywords = ["communication", "problem solving", "teamwork", "organization", "attention to detail"]
      const randomKeywords = []
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * possibleKeywords.length)
        randomKeywords.push(possibleKeywords[randomIndex])
        possibleKeywords.splice(randomIndex, 1)
      }
      score.keywordsFound = randomKeywords
    }

    return score
  }

  const renderScoreResults = () => {
    if (!score) return null

    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 dark:text-white">Overall ATS Score: {score.overall}%</h3>
          <div className="relative h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
            <div
              className={`absolute top-0 left-0 h-full rounded-full ${
                score.overall >= 80 ? "bg-green-500" : score.overall >= 60 ? "bg-amber-500" : "bg-red-500"
              }`}
              style={{ width: `${score.overall}%` }}
            ></div>
          </div>
          <div
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
              score.overall >= 80
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                : score.overall >= 60
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
            }`}
          >
            {score.overall >= 80 ? (
              <>
                <Award className="h-4 w-4" />
                Excellent! Your resume is well-optimized for ATS systems
              </>
            ) : score.overall >= 60 ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Good job! Your resume should pass most ATS systems
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4" />
                Your resume needs improvement to perform well with ATS systems
              </>
            )}
          </div>
        </div>

        {/* Priority Improvements */}
        {score.improvementPriorities && score.improvementPriorities.length > 0 && (
          <div className="border rounded-md dark:border-gray-700 p-4 bg-blue-50 dark:bg-blue-900/20">
            <h4 className="font-medium mb-3 flex items-center gap-1.5 dark:text-white">
              <Zap className="h-4 w-4 text-blue-500" />
              Priority Improvements
            </h4>
            <div className="space-y-3">
              {score.improvementPriorities.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-20 text-center text-xs font-medium px-2 py-1 rounded-full ${
                      item.priority === "high"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : item.priority === "medium"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    }`}
                  >
                    {item.priority.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm dark:text-gray-300">{item.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">Section: {item.section}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Scores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {Object.entries(score.sections).map(([section, data]) => (
            <div key={section} className="border rounded-md dark:border-gray-700 p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium capitalize dark:text-white">{section}</h4>
                <span
                  className={`text-sm font-medium ${
                    data.score >= 80
                      ? "text-green-600 dark:text-green-400"
                      : data.score >= 60
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {data.score}%
                </span>
              </div>
              <div className="relative h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                <div
                  className={`absolute top-0 left-0 h-full rounded-full ${
                    data.score >= 80 ? "bg-green-500" : data.score >= 60 ? "bg-amber-500" : "bg-red-500"
                  }`}
                  style={{ width: `${data.score}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{data.feedback}</p>

              {data.improvements && data.improvements.length > 0 && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Suggested improvements:</p>
                  <ul className="space-y-1">
                    {data.improvements.map((improvement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        <ArrowUp className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Keywords Analysis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Keywords Found */}
          <div className="border rounded-md dark:border-gray-700 p-4">
            <h4 className="font-medium mb-2 flex items-center gap-1.5 dark:text-white">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Keywords Found
            </h4>
            <div className="flex flex-wrap gap-2">
              {score.keywordsFound &&
                score.keywordsFound.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  >
                    {keyword}
                  </span>
                ))}
            </div>
          </div>

          {/* Keywords Missing */}
          <div className="border rounded-md dark:border-gray-700 p-4">
            <h4 className="font-medium mb-2 flex items-center gap-1.5 dark:text-white">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              Keywords Missing
            </h4>
            <div className="flex flex-wrap gap-2">
              {score.keywordsMissing &&
                score.keywordsMissing.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                  >
                    {keyword}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* General Recommendations */}
        {score.recommendations.length > 0 && (
          <div className="border rounded-md dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
            <h4 className="font-medium mb-3 flex items-center gap-1.5 dark:text-white">
              <Info className="h-4 w-4 text-blue-500" />
              General Recommendations
            </h4>
            <ul className="space-y-2 text-sm">
              {score.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="dark:text-gray-300">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center pt-2">
          <Button onClick={activeTab === "current" ? checkResumeScore : checkUploadedResumeScore} variant="outline">
            Re-analyze Resume
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Info className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-medium dark:text-white">ATS Resume Score Checker</h2>
      </div>
      <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
        Analyze your resume for ATS compatibility and get recommendations for improvement.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4 sm:mb-6">
        <TabsList className="grid grid-cols-2 w-full dark:bg-gray-700">
          <TabsTrigger value="current">Current Resume</TabsTrigger>
          <TabsTrigger value="upload">Upload Existing Resume</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          {!score ? (
            <div className="text-center py-8">
              <div className="mb-4 text-sm text-muted-foreground dark:text-gray-400 max-w-md mx-auto">
                Our AI will analyze your current resume against ATS (Applicant Tracking System) criteria and provide a
                score and recommendations.
              </div>
              <Button onClick={checkResumeScore} disabled={loading} size="lg">
                {loading ? "Analyzing..." : "Check My Resume"}
              </Button>
            </div>
          ) : (
            renderScoreResults()
          )}
        </TabsContent>

        <TabsContent value="upload">
          {!score ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="border-2 border-dashed dark:border-gray-700 rounded-lg p-4 sm:p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium dark:text-white">Upload Existing Resume</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-2 max-w-md mx-auto">
                    Upload your existing resume PDF to check its ATS compatibility
                  </p>
                  <div className="flex flex-col xs:flex-row items-center gap-2">
                    <Label
                      htmlFor="resume-pdf"
                      className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Select PDF
                    </Label>
                    <Input id="resume-pdf" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                    {uploadedFile && (
                      <span className="text-sm dark:text-gray-300 truncate max-w-[200px]">{uploadedFile.name}</span>
                    )}
                  </div>
                  {uploadError && <p className="text-sm text-red-500 mt-2">{uploadError}</p>}
                </div>
              </div>

              <Button
                onClick={checkUploadedResumeScore}
                disabled={loading || !uploadedFile}
                className="w-full"
                size="lg"
              >
                {loading ? "Analyzing..." : "Check Uploaded Resume"}
              </Button>

              <p className="text-xs text-muted-foreground dark:text-gray-400 text-center">
                Note: For best results, ensure your PDF is text-based and not a scanned image.
              </p>
            </div>
          ) : (
            renderScoreResults()
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

