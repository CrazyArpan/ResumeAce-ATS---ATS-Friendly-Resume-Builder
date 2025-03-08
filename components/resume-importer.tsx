"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import type { ResumeData } from "@/lib/types"

interface ResumeImporterProps {
  onImport: (data: ResumeData) => void
}

export function ResumeImporter({ onImport }: ResumeImporterProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setSuccess(false)
    }
  }

  const parseResume = async () => {
    if (!file) {
      setError("Please select a file to import")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // In a real implementation, this would send the file to a server for parsing
      // or use a client-side library to extract text and structure from the resume

      // For now, we'll simulate parsing with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create a basic resume structure from the file name
      const fileName = file.name.replace(/\.[^/.]+$/, "") // Remove extension
      const nameParts = fileName.split(/[_\-\s]/).filter(Boolean)

      // Create a simple resume data structure
      const importedData: ResumeData = {
        personal: {
          name: nameParts.length >= 2 ? `${nameParts[0]} ${nameParts[1]}` : fileName,
          title: "Imported Resume",
          email: "",
          phone: "",
          location: "",
          website: "",
          portfolio: "",
          github: "",
          linkedin: "",
          profileImage: "",
          summary: "This resume was imported from an existing file. Please update the information as needed.",
        },
        experience: [],
        education: [],
        projects: [],
        skills: [],
        additionalSections: [
          {
            id: Date.now().toString(),
            title: "Imported Content",
            content:
              "The content from your resume file would appear here. Since this is a demo, please manually add your resume content to the appropriate sections.",
          },
        ],
      }

      setSuccess(true)
      onImport(importedData)
    } catch (err) {
      setError("Failed to parse resume. Please try again or enter your information manually.")
      console.error("Resume parsing error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="flex items-center gap-2 dark:text-white">
          <FileText className="h-5 w-5" />
          Import Existing Resume
        </CardTitle>
        <CardDescription className="dark:text-gray-400">
          Upload your existing resume to import its content into our builder.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-4 sm:px-6">
        <div className="border-2 border-dashed dark:border-gray-700 rounded-lg p-4 sm:p-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium dark:text-white">Upload Resume File</h3>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-2">Supported formats: PDF, DOCX, TXT</p>
            <div className="flex flex-col xs:flex-row items-center gap-2">
              <Label
                htmlFor="resume-file"
                className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
              >
                Select File
              </Label>
              <Input
                id="resume-file"
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              {file && <span className="text-sm dark:text-gray-300 truncate max-w-[200px]">{file.name}</span>}
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="dark:bg-red-900/20 dark:border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Resume imported successfully! You can now edit the imported data.</AlertDescription>
          </Alert>
        )}

        <Button onClick={parseResume} disabled={!file || isLoading} className="w-full">
          {isLoading ? "Importing..." : "Import Resume"}
        </Button>

        <p className="text-xs text-muted-foreground dark:text-gray-400 text-center">
          Note: Automatic resume parsing is not 100% accurate. You may need to adjust the imported data.
        </p>
      </CardContent>
    </Card>
  )
}

