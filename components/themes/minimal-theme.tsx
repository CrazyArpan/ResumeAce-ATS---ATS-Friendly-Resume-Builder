import type { ResumeData } from "@/lib/types"
import Image from "next/image"

interface MinimalThemeProps {
  data: ResumeData
}

export function MinimalTheme({ data }: MinimalThemeProps) {
  return (
    <div className="max-w-[850px] mx-auto font-sans text-gray-800 p-8 bg-white">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          {data.personal.profileImage && (
            <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={data.personal.profileImage || "/placeholder.svg"}
                alt={data.personal.name || "Profile"}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{data.personal.name || "Your Name"}</h1>
            <h2 className="text-lg text-gray-600">{data.personal.title || "Professional Title"}</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>• {data.personal.phone}</div>}
          {data.personal.location && <div>• {data.personal.location}</div>}
          {data.personal.website && <div>• {data.personal.website}</div>}
          {data.personal.github && <div>• {data.personal.github}</div>}
          {data.personal.linkedin && <div>• {data.personal.linkedin}</div>}
          {data.personal.portfolio && <div>• {data.personal.portfolio}</div>}
        </div>
      </header>

      {/* Summary */}
      {data.personal.summary && (
        <section className="mb-6">
          <p className="text-sm">{data.personal.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 uppercase text-gray-700">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-semibold">
                    {exp.title || "Job Title"} • {exp.company || "Company Name"}
                  </h3>
                  <div className="text-sm text-gray-600">
                    {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-1">{exp.location || "Location"}</div>
                <p className="text-sm whitespace-pre-line">{exp.description || "Job description"}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 uppercase text-gray-700">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-semibold">{project.name || "Project Name"}</h3>
                  <div className="text-sm text-gray-600">
                    {project.startDate || "Start Date"} - {project.endDate || "End Date"}
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-3 mb-1 text-sm text-gray-600">
                  {project.githubLink && <div>GitHub: {project.githubLink}</div>}
                  {project.liveLink && <div>• Demo: {project.liveLink}</div>}
                </div>
                {project.technologies && <div className="text-sm mb-1 text-gray-600">{project.technologies}</div>}
                <p className="text-sm">{project.description || "Project description"}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 uppercase text-gray-700">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-semibold">
                    {edu.degree || "Degree"} in {edu.field || "Field of Study"}
                  </h3>
                  <div className="text-sm text-gray-600">
                    {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {edu.institution || "Institution Name"} • {edu.location || "Location"}
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
          <h2 className="text-lg font-bold mb-2 uppercase text-gray-700">Skills</h2>
          <p className="text-sm">
            {data.skills.map((skill, index) => (
              <span key={skill.id}>
                {skill.name || "Skill"}
                {index < data.skills.length - 1 ? " • " : ""}
              </span>
            ))}
          </p>
        </section>
      )}

      {/* Additional Sections */}
      {data.additionalSections.map((section) => (
        <section key={section.id} className="mb-6">
          <h2 className="text-lg font-bold mb-2 uppercase text-gray-700">{section.title}</h2>
          <div className="text-sm whitespace-pre-line">{section.content}</div>
        </section>
      ))}
    </div>
  )
}

