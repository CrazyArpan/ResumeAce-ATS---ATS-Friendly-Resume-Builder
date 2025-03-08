import type { ResumeData } from "@/lib/types"
import Image from "next/image"

interface ExecutiveThemeProps {
  data: ResumeData
}

export function ExecutiveTheme({ data }: ExecutiveThemeProps) {
  return (
    <div className="max-w-[850px] mx-auto font-serif text-gray-800 p-8 bg-white">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-1 uppercase tracking-wide">{data.personal.name || "Your Name"}</h1>
        <h2 className="text-xl mb-4 text-indigo-800">{data.personal.title || "Professional Title"}</h2>

        <div className="flex justify-center items-center gap-6 mb-4">
          {data.personal.profileImage && (
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-indigo-200">
              <Image
                src={data.personal.profileImage || "/placeholder.svg"}
                alt={data.personal.name || "Profile"}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.location && <div>{data.personal.location}</div>}
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm mt-2">
          {data.personal.website && <div>Website: {data.personal.website}</div>}
          {data.personal.github && <div>GitHub: {data.personal.github}</div>}
          {data.personal.linkedin && <div>LinkedIn: {data.personal.linkedin}</div>}
          {data.personal.portfolio && <div>Portfolio: {data.personal.portfolio}</div>}
        </div>
      </header>

      {/* Summary */}
      {data.personal.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-center uppercase border-b-2 border-indigo-200 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed">{data.personal.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center uppercase border-b-2 border-indigo-200 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-semibold text-indigo-800">{exp.title || "Job Title"}</h3>
                  <div className="text-sm font-medium">
                    {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mb-3">
                  <div className="text-base font-medium">{exp.company || "Company Name"}</div>
                  <div className="text-sm">{exp.location || "Location"}</div>
                </div>
                <p className="text-sm whitespace-pre-line leading-relaxed">{exp.description || "Job description"}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center uppercase border-b-2 border-indigo-200 pb-1">
            Key Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-semibold text-indigo-800">{project.name || "Project Name"}</h3>
                  <div className="text-sm font-medium">
                    {project.startDate || "Start Date"} - {project.endDate || "End Date"}
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-4 mb-2 text-sm">
                  {project.githubLink && <div>GitHub: {project.githubLink}</div>}
                  {project.liveLink && <div>Live Demo: {project.liveLink}</div>}
                </div>
                {project.technologies && (
                  <div className="text-sm mb-2 italic">Technologies: {project.technologies}</div>
                )}
                <p className="text-sm leading-relaxed">{project.description || "Project description"}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center uppercase border-b-2 border-indigo-200 pb-1">Education</h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-semibold text-indigo-800">
                    {edu.degree || "Degree"} in {edu.field || "Field of Study"}
                  </h3>
                  <div className="text-sm font-medium">
                    {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <div className="text-base font-medium">{edu.institution || "Institution Name"}</div>
                  <div className="text-sm">{edu.location || "Location"}</div>
                </div>
                {edu.description && <p className="text-sm whitespace-pre-line leading-relaxed">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center uppercase border-b-2 border-indigo-200 pb-1">
            Core Competencies
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {data.skills.map((skill) => (
              <div key={skill.id} className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-md text-sm">
                {skill.name || "Skill"}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Additional Sections */}
      {data.additionalSections.map((section) => (
        <section key={section.id} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center uppercase border-b-2 border-indigo-200 pb-1">
            {section.title}
          </h2>
          <div className="text-sm whitespace-pre-line leading-relaxed">{section.content}</div>
        </section>
      ))}
    </div>
  )
}

