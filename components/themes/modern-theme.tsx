import type { ResumeData } from "@/lib/types"
import Image from "next/image"

interface ModernThemeProps {
  data: ResumeData
}

export function ModernTheme({ data }: ModernThemeProps) {
  return (
    <div className="max-w-[850px] mx-auto font-sans text-gray-800 p-8 bg-white">
      {/* Header */}
      <header className="mb-6 pb-4 border-b-2 border-emerald-500 flex items-start gap-6">
        {data.personal.profileImage && (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={data.personal.profileImage || "/placeholder.svg"}
              alt={data.personal.name || "Profile"}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-1">{data.personal.name || "Your Name"}</h1>
          <h2 className="text-xl text-emerald-600 mb-3">{data.personal.title || "Professional Title"}</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            {data.personal.email && <div>{data.personal.email}</div>}
            {data.personal.phone && <div>{data.personal.phone}</div>}
            {data.personal.location && <div>{data.personal.location}</div>}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mt-2">
            {data.personal.website && <div>Website: {data.personal.website}</div>}
            {data.personal.github && <div>GitHub: {data.personal.github}</div>}
            {data.personal.linkedin && <div>LinkedIn: {data.personal.linkedin}</div>}
            {data.personal.portfolio && <div>Portfolio: {data.personal.portfolio}</div>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {data.personal.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-emerald-700">Professional Summary</h2>
          <p className="text-sm">{data.personal.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-emerald-700">Work Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="pl-3 border-l-2 border-emerald-300">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-semibold">{exp.title || "Job Title"}</h3>
                  <div className="text-sm text-gray-600">
                    {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <div className="text-base font-medium">{exp.company || "Company Name"}</div>
                  <div className="text-sm text-gray-600">{exp.location || "Location"}</div>
                </div>
                <p className="text-sm whitespace-pre-line">{exp.description || "Job description"}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-emerald-700">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id} className="pl-3 border-l-2 border-emerald-300">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-semibold">{project.name || "Project Name"}</h3>
                  <div className="text-sm text-gray-600">
                    {project.startDate || "Start Date"} - {project.endDate || "End Date"}
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-4 mb-2 text-sm">
                  {project.githubLink && <div className="text-emerald-600">GitHub: {project.githubLink}</div>}
                  {project.liveLink && <div className="text-emerald-600">Live Demo: {project.liveLink}</div>}
                </div>
                {project.technologies && (
                  <div className="text-sm mb-2">
                    <span className="font-medium">Technologies:</span> {project.technologies}
                  </div>
                )}
                <p className="text-sm">{project.description || "Project description"}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-emerald-700">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="pl-3 border-l-2 border-emerald-300">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-semibold">
                    {edu.degree || "Degree"} in {edu.field || "Field of Study"}
                  </h3>
                  <div className="text-sm text-gray-600">
                    {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <div className="text-base font-medium">{edu.institution || "Institution Name"}</div>
                  <div className="text-sm text-gray-600">{edu.location || "Location"}</div>
                </div>
                {edu.description && <p className="text-sm whitespace-pre-line">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-emerald-700">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <div key={skill.id} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                {skill.name || "Skill"}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Additional Sections */}
      {data.additionalSections.map((section) => (
        <section key={section.id} className="mb-6">
          <h2 className="text-xl font-bold mb-3 text-emerald-700">{section.title}</h2>
          <div className="pl-3 border-l-2 border-emerald-300 text-sm whitespace-pre-line">{section.content}</div>
        </section>
      ))}
    </div>
  )
}

