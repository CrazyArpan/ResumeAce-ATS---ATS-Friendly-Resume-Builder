"use client"

import { useState, useEffect } from "react"
import { ResumeForm } from "@/components/resume-form"
import { ResumePreview } from "@/components/resume-preview"
import { ThemeSelector } from "@/components/theme-selector"
import { ResumeScoreChecker } from "@/components/resume-score-checker"
import { ResumeImporter } from "@/components/resume-importer"
import { Button } from "@/components/ui/button"
import { Download, Upload, Plus, Menu, X, Edit, BarChart3, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { defaultResumeData } from "@/lib/default-data"
import type { ResumeData, Theme } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [activeTheme, setActiveTheme] = useState<Theme>("professional")
  const [activeSection, setActiveSection] = useState("edit")
  const [showImporter, setShowImporter] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { toast } = useToast()
  const isMobile = useMobile()

  // Close sidebar by default on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  const handleDataChange = (newData: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...newData }))
  }

  const handleThemeChange = (theme: Theme) => {
    setActiveTheme(theme)
  }

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded successfully.",
    })
  }

  const handleImport = (importedData: ResumeData) => {
    setResumeData(importedData)
    setShowImporter(false)
    setActiveSection("edit")
    toast({
      title: "Resume Imported",
      description: "Your resume has been imported successfully. You can now edit it.",
    })
  }

  const handleNewResume = () => {
    if (confirm("Are you sure you want to start a new resume? This will clear all current data.")) {
      setResumeData(defaultResumeData)
      toast({
        title: "New Resume Created",
        description: "You can now start building your new resume.",
      })
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const renderContent = () => {
    if (showImporter) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
          <ResumeImporter onImport={handleImport} />
          <div className="mt-4 text-center">
            <Button variant="ghost" onClick={() => setShowImporter(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )
    }

    switch (activeSection) {
      case "edit":
        return (
          <div className="space-y-4 sm:space-y-6">
            <ThemeSelector activeTheme={activeTheme} onThemeChange={handleThemeChange} />
            <ResumeForm data={resumeData} onChange={handleDataChange} />
          </div>
        )
      case "preview":
        return (
          <div className="space-y-4">
            <div className="hidden sm:flex justify-end">
              <Button onClick={handleDownload} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
            <ResumePreview data={resumeData} theme={activeTheme} />
          </div>
        )
      case "score":
        return <ResumeScoreChecker data={resumeData} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Build Your ATS-Optimized Resume</h2>

        {/* Desktop buttons */}
        <div className="hidden sm:flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowImporter(true)}
            className="flex items-center gap-1"
            disabled={showImporter}
          >
            <Upload className="h-4 w-4" />
            Import Resume
          </Button>
          <Button variant="outline" size="sm" onClick={handleNewResume} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            New Resume
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar toggle for mobile */}
        <div className="md:hidden flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
          <span className="font-medium dark:text-white">
            {activeSection === "edit" ? "Edit Resume" : activeSection === "preview" ? "Preview Resume" : "ATS Score"}
          </span>
          <Button variant="ghost" size="sm" onClick={toggleSidebar} className="p-1 h-8 w-8">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Sidebar */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            sidebarOpen ? "block" : "hidden md:block",
            "w-full md:w-64 flex-shrink-0",
          )}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b dark:border-gray-700">
              <h3 className="font-medium text-lg dark:text-white">Resume Builder</h3>
            </div>
            <div className="p-2">
              <nav className="space-y-1">
                <Button
                  variant={activeSection === "edit" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveSection("edit")
                    if (isMobile) setSidebarOpen(false)
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Resume
                </Button>
                <Button
                  variant={activeSection === "preview" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveSection("preview")
                    if (isMobile) setSidebarOpen(false)
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Resume
                </Button>
                <Button
                  variant={activeSection === "score" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveSection("score")
                    if (isMobile) setSidebarOpen(false)
                  }}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  ATS Score
                </Button>
              </nav>
            </div>

            {/* Sidebar actions - only visible on desktop */}
            <div className="p-2 border-t dark:border-gray-700 hidden md:block">
              <div className="space-y-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowImporter(true)}
                  className="w-full justify-start"
                  disabled={showImporter}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Resume
                </Button>
                <Button variant="outline" size="sm" onClick={handleNewResume} className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  New Resume
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}

