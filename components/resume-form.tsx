"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Trash2, Upload, Edit, Plus } from "lucide-react"
import type { ResumeData } from "@/lib/types"
import Image from "next/image"
import type React from "react"

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: Partial<ResumeData>) => void
}

export function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState("personal")
  const [imagePreview, setImagePreview] = useState<string | null>(data.personal.profileImage || null)
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const [showAddSectionInput, setShowAddSectionInput] = useState(false)

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({
      personal: {
        ...data.personal,
        [name]: value,
      },
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImagePreview(base64String)
        onChange({
          personal: {
            ...data.personal,
            profileImage: base64String,
          },
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const addExperience = () => {
    onChange({
      experience: [
        ...data.experience,
        {
          id: Date.now().toString(),
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    })
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    onChange({
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    onChange({
      experience: data.experience.filter((exp) => exp.id !== id),
    })
  }

  const addEducation = () => {
    onChange({
      education: [
        ...data.education,
        {
          id: Date.now().toString(),
          institution: "",
          degree: "",
          field: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    })
  }

  const updateEducation = (id: string, field: string, value: string | boolean) => {
    onChange({
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    onChange({
      education: data.education.filter((edu) => edu.id !== id),
    })
  }

  const addProject = () => {
    onChange({
      projects: [
        ...data.projects,
        {
          id: Date.now().toString(),
          name: "",
          description: "",
          githubLink: "",
          liveLink: "",
          technologies: "",
          startDate: "",
          endDate: "",
        },
      ],
    })
  }

  const updateProject = (id: string, field: string, value: string) => {
    onChange({
      projects: data.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    })
  }

  const removeProject = (id: string) => {
    onChange({
      projects: data.projects.filter((proj) => proj.id !== id),
    })
  }

  const addSkill = () => {
    onChange({
      skills: [...data.skills, { id: Date.now().toString(), name: "" }],
    })
  }

  const updateSkill = (id: string, value: string) => {
    onChange({
      skills: data.skills.map((skill) => (skill.id === id ? { ...skill, name: value } : skill)),
    })
  }

  const removeSkill = (id: string) => {
    onChange({
      skills: data.skills.filter((skill) => skill.id !== id),
    })
  }

  const addAdditionalSection = () => {
    if (newSectionTitle.trim()) {
      onChange({
        additionalSections: [
          ...data.additionalSections,
          {
            id: Date.now().toString(),
            title: newSectionTitle.trim(),
            content: "",
          },
        ],
      })
      setNewSectionTitle("")
      setShowAddSectionInput(false)
    }
  }

  const updateAdditionalSection = (id: string, field: string, value: string) => {
    onChange({
      additionalSections: data.additionalSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section,
      ),
    })
  }

  const removeAdditionalSection = (id: string) => {
    onChange({
      additionalSections: data.additionalSections.filter((section) => section.id !== id),
    })
  }

  return (
    <Tabs value={activeSection} onValueChange={setActiveSection}>
      <TabsList className="grid grid-cols-3 sm:grid-cols-6 mb-4 sm:mb-6 dark:bg-gray-700">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="additional">Additional</TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="dark:text-white">Personal Information</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Enter your personal details that will appear at the top of your resume.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6">
            <div className="flex flex-col items-center mb-4">
              <div className="mb-4 relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gray-200">
                {imagePreview ? (
                  <div className="relative w-full h-full group">
                    <Image src={imagePreview || "/placeholder.svg"} alt="Profile" fill style={{ objectFit: "cover" }} />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Label
                        htmlFor="profile-image"
                        className="cursor-pointer text-white dark:text-gray-300 flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Change
                      </Label>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <Label
                htmlFor="profile-image"
                className="cursor-pointer dark:text-gray-300 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2 rounded-md"
              >
                <Upload className="h-4 w-4" />
                {imagePreview ? "Change Photo" : "Upload Photo"}
              </Label>
              <Input id="profile-image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Upload a professional headshot for your resume (recommended size: 400x400px)
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="dark:text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={data.personal.name}
                  onChange={handlePersonalChange}
                  placeholder="John Doe"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="dark:text-gray-300">
                  Professional Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={data.personal.title}
                  onChange={handlePersonalChange}
                  placeholder="Software Engineer"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={data.personal.email}
                  onChange={handlePersonalChange}
                  placeholder="john.doe@example.com"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="dark:text-gray-300">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={data.personal.phone}
                  onChange={handlePersonalChange}
                  placeholder="(123) 456-7890"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="dark:text-gray-300">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={data.personal.location}
                  onChange={handlePersonalChange}
                  placeholder="New York, NY"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="dark:text-gray-300">
                  Website
                </Label>
                <Input
                  id="website"
                  name="website"
                  value={data.personal.website}
                  onChange={handlePersonalChange}
                  placeholder="johndoe.com"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github" className="dark:text-gray-300">
                  GitHub
                </Label>
                <Input
                  id="github"
                  name="github"
                  value={data.personal.github}
                  onChange={handlePersonalChange}
                  placeholder="github.com/johndoe"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="dark:text-gray-300">
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={data.personal.linkedin}
                  onChange={handlePersonalChange}
                  placeholder="linkedin.com/in/johndoe"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio" className="dark:text-gray-300">
                  Portfolio
                </Label>
                <Input
                  id="portfolio"
                  name="portfolio"
                  value={data.personal.portfolio}
                  onChange={handlePersonalChange}
                  placeholder="portfolio.johndoe.com"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary" className="dark:text-gray-300">
                Professional Summary
              </Label>
              <Textarea
                id="summary"
                name="summary"
                value={data.personal.summary}
                onChange={handlePersonalChange}
                placeholder="Experienced software engineer with a passion for..."
                rows={4}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="experience">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6">
            <div>
              <CardTitle className="dark:text-white">Work Experience</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Add your work experience, starting with the most recent position.
              </CardDescription>
            </div>
            <Button
              onClick={addExperience}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 mt-2 sm:mt-0"
            >
              <PlusCircle className="h-4 w-4" />
              Add Experience
            </Button>
          </CardHeader>
          <CardContent className="space-y-6 px-4 sm:px-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border rounded-lg p-3 sm:p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium dark:text-white">Experience Entry</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
                    className="text-destructive h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`job-title-${exp.id}`} className="dark:text-gray-300">
                      Job Title
                    </Label>
                    <Input
                      id={`job-title-${exp.id}`}
                      value={exp.title}
                      onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                      placeholder="Senior Developer"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`company-${exp.id}`} className="dark:text-gray-300">
                      Company
                    </Label>
                    <Input
                      id={`company-${exp.id}`}
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      placeholder="Acme Inc."
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`exp-start-${exp.id}`} className="dark:text-gray-300">
                      Start Date
                    </Label>
                    <Input
                      id={`exp-start-${exp.id}`}
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                      placeholder="Jan 2020"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-end-${exp.id}`} className="dark:text-gray-300">
                      End Date
                    </Label>
                    <Input
                      id={`exp-end-${exp.id}`}
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                      placeholder="Present"
                      disabled={exp.current}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exp-location-${exp.id}`} className="dark:text-gray-300">
                    Location
                  </Label>
                  <Input
                    id={`exp-location-${exp.id}`}
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                    placeholder="New York, NY"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exp-description-${exp.id}`} className="dark:text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id={`exp-description-${exp.id}`}
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                    placeholder="• Led a team of 5 developers to deliver a new product feature
• Improved application performance by 30%
• Implemented CI/CD pipeline"
                    rows={4}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  />
                </div>
              </div>
            ))}
            {data.experience.length === 0 && (
              <div className="text-center py-4 text-muted-foreground dark:text-gray-400">
                No experience added yet. Click the button above to add your work experience.
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="education">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6">
            <div>
              <CardTitle className="dark:text-white">Education</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Add your educational background, starting with the most recent.
              </CardDescription>
            </div>
            <Button onClick={addEducation} variant="outline" size="sm" className="flex items-center gap-1 mt-2 sm:mt-0">
              <PlusCircle className="h-4 w-4" />
              Add Education
            </Button>
          </CardHeader>
          <CardContent className="space-y-6 px-4 sm:px-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="border rounded-lg p-3 sm:p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium dark:text-white">Education Entry</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(edu.id)}
                    className="text-destructive h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${edu.id}`} className="dark:text-gray-300">
                      Institution
                    </Label>
                    <Input
                      id={`institution-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                      placeholder="University of Example"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${edu.id}`} className="dark:text-gray-300">
                      Degree
                    </Label>
                    <Input
                      id={`degree-${edu.id}`}
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      placeholder="Bachelor of Science"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`field-${edu.id}`} className="dark:text-gray-300">
                      Field of Study
                    </Label>
                    <Input
                      id={`field-${edu.id}`}
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                      placeholder="Computer Science"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-location-${edu.id}`} className="dark:text-gray-300">
                      Location
                    </Label>
                    <Input
                      id={`edu-location-${edu.id}`}
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                      placeholder="New York, NY"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`edu-start-${edu.id}`} className="dark:text-gray-300">
                      Start Date
                    </Label>
                    <Input
                      id={`edu-start-${edu.id}`}
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                      placeholder="Sep 2016"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-end-${edu.id}`} className="dark:text-gray-300">
                      End Date
                    </Label>
                    <Input
                      id={`edu-end-${edu.id}`}
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                      placeholder="May 2020"
                      disabled={edu.current}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-description-${edu.id}`} className="dark:text-gray-300">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id={`edu-description-${edu.id}`}
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                    placeholder="• GPA: 3.8/4.0
• Relevant coursework: Data Structures, Algorithms
• Senior thesis: Machine Learning Applications"
                    rows={3}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  />
                </div>
              </div>
            ))}
            {data.education.length === 0 && (
              <div className="text-center py-4 text-muted-foreground dark:text-gray-400">
                No education added yet. Click the button above to add your educational background.
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="projects">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6">
            <div>
              <CardTitle className="dark:text-white">Projects</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Add your personal or professional projects to showcase your skills.
              </CardDescription>
            </div>
            <Button onClick={addProject} variant="outline" size="sm" className="flex items-center gap-1 mt-2 sm:mt-0">
              <PlusCircle className="h-4 w-4" />
              Add Project
            </Button>
          </CardHeader>
          <CardContent className="space-y-6 px-4 sm:px-6">
            {data.projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-3 sm:p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium dark:text-white">Project Entry</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProject(project.id)}
                    className="text-destructive h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`project-name-${project.id}`} className="dark:text-gray-300">
                      Project Name
                    </Label>
                    <Input
                      id={`project-name-${project.id}`}
                      value={project.name}
                      onChange={(e) => updateProject(project.id, "name", e.target.value)}
                      placeholder="E-commerce Platform"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`project-start-${project.id}`} className="dark:text-gray-300">
                      Start Date
                    </Label>
                    <Input
                      id={`project-start-${project.id}`}
                      value={project.startDate}
                      onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                      placeholder="Jan 2022"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`project-end-${project.id}`} className="dark:text-gray-300">
                      End Date
                    </Label>
                    <Input
                      id={`project-end-${project.id}`}
                      value={project.endDate}
                      onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                      placeholder="Mar 2022"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`github-link-${project.id}`} className="dark:text-gray-300">
                      GitHub Link
                    </Label>
                    <Input
                      id={`github-link-${project.id}`}
                      value={project.githubLink}
                      onChange={(e) => updateProject(project.id, "githubLink", e.target.value)}
                      placeholder="github.com/username/project"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`live-link-${project.id}`} className="dark:text-gray-300">
                      Live Demo Link
                    </Label>
                    <Input
                      id={`live-link-${project.id}`}
                      value={project.liveLink}
                      onChange={(e) => updateProject(project.id, "liveLink", e.target.value)}
                      placeholder="project-demo.com"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`technologies-${project.id}`} className="dark:text-gray-300">
                    Technologies Used
                  </Label>
                  <Input
                    id={`technologies-${project.id}`}
                    value={project.technologies}
                    onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                    placeholder="React, Node.js, MongoDB"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`project-description-${project.id}`} className="dark:text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id={`project-description-${project.id}`}
                    value={project.description}
                    onChange={(e) => updateProject(project.id, "description", e.target.value)}
                    placeholder="Describe your project, its features, and your role in it."
                    rows={4}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  />
                </div>
              </div>
            ))}
            {data.projects.length === 0 && (
              <div className="text-center py-4 text-muted-foreground dark:text-gray-400">
                No projects added yet. Click the button above to add your projects.
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="skills">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6">
            <div>
              <CardTitle className="dark:text-white">Skills</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Add your technical and professional skills.
              </CardDescription>
            </div>
            <Button onClick={addSkill} variant="outline" size="sm" className="flex items-center gap-1 mt-2 sm:mt-0">
              <PlusCircle className="h-4 w-4" />
              Add Skill
            </Button>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, e.target.value)}
                    placeholder="JavaScript"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="text-destructive h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {data.skills.length === 0 && (
              <div className="text-center py-4 text-muted-foreground dark:text-gray-400">
                No skills added yet. Click the button above to add your skills.
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="additional">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6">
            <div>
              <CardTitle className="dark:text-white">Additional Sections</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Add custom sections to your resume such as certifications, awards, or languages.
              </CardDescription>
            </div>
            {!showAddSectionInput && (
              <Button
                onClick={() => setShowAddSectionInput(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 mt-2 sm:mt-0"
              >
                <Plus className="h-4 w-4" />
                Add New Section
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-6 px-4 sm:px-6">
            {showAddSectionInput && (
              <div className="flex flex-col sm:flex-row sm:items-end gap-2 mb-4 border p-3 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex-grow space-y-2">
                  <Label htmlFor="new-section-title" className="dark:text-gray-300">
                    Section Title
                  </Label>
                  <Input
                    id="new-section-title"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    placeholder="Certifications, Awards, Languages, etc."
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  />
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <Button onClick={addAdditionalSection} disabled={!newSectionTitle.trim()} size="sm">
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddSectionInput(false)
                      setNewSectionTitle("")
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {data.additionalSections.map((section) => (
              <div key={section.id} className="border rounded-lg p-3 sm:p-4 space-y-4 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-grow">
                    <Label htmlFor={`section-title-${section.id}`} className="dark:text-gray-300">
                      Section Title
                    </Label>
                    <Input
                      id={`section-title-${section.id}`}
                      value={section.title}
                      onChange={(e) => updateAdditionalSection(section.id, "title", e.target.value)}
                      placeholder="Section Title"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAdditionalSection(section.id)}
                    className="text-destructive h-8 w-8 p-0 ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`section-content-${section.id}`} className="dark:text-gray-300">
                    Content
                  </Label>
                  <Textarea
                    id={`section-content-${section.id}`}
                    value={section.content}
                    onChange={(e) => updateAdditionalSection(section.id, "content", e.target.value)}
                    placeholder="• Add your content here
• Use bullet points for better readability
• Each point should be concise and relevant"
                    rows={5}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                  />
                </div>
              </div>
            ))}

            {data.additionalSections.length === 0 && !showAddSectionInput && (
              <div className="text-center py-4 text-muted-foreground dark:text-gray-400">
                No additional sections added yet. Click the button above to add custom sections like certifications,
                awards, or languages.
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

