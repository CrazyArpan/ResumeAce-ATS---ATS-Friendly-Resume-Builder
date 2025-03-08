"use client"

import type { ResumeData, Theme } from "@/lib/types"
import { ProfessionalTheme } from "@/components/themes/professional-theme"
import { ModernTheme } from "@/components/themes/modern-theme"
import { ClassicTheme } from "@/components/themes/classic-theme"
import { CreativeTheme } from "@/components/themes/creative-theme"
import { MinimalTheme } from "@/components/themes/minimal-theme"
import { ExecutiveTheme } from "@/components/themes/executive-theme"
import { ZoomIn, ZoomOut, Download } from "lucide-react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface ResumePreviewProps {
  data: ResumeData
  theme: Theme
}

export function ResumePreview({ data, theme }: ResumePreviewProps) {
  const [scale, setScale] = useState(1)
  const [isDownloading, setIsDownloading] = useState(false)
  const resumeRef = useRef<HTMLDivElement>(null)

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 1.5))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleDownload = async () => {
    if (!resumeRef.current) return

    try {
      setIsDownloading(true)
      const currentScale = scale
      setScale(1)
      await new Promise(resolve => setTimeout(resolve, 100))
      const resumeElement = resumeRef.current
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      })
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 20
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      const fileName = data.personalInfo?.name 
        ? `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf` 
        : 'ResumeAce_Resume.pdf'
      pdf.save(fileName)
      setScale(currentScale)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const renderTheme = () => {
    switch (theme) {
      case "professional":
        return <ProfessionalTheme data={data} />
      case "modern":
        return <ModernTheme data={data} />
      case "classic":
        return <ClassicTheme data={data} />
      case "creative":
        return <CreativeTheme data={data} />
      case "minimal":
        return <MinimalTheme data={data} />
      case "executive":
        return <ExecutiveTheme data={data} />
      default:
        return <ProfessionalTheme data={data} />
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
      <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600 flex justify-between items-center">
        <h3 className="font-medium dark:text-white">Resume Preview</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={zoomOut} disabled={scale <= 0.5 || isDownloading} className="h-8 w-8 p-0">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs dark:text-gray-300 w-12 text-center">{Math.round(scale * 100)}%</span>
            <Button variant="ghost" size="sm" onClick={zoomIn} disabled={scale >= 1.5 || isDownloading} className="h-8 w-8 p-0">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload} 
            disabled={isDownloading}
            className="hidden sm:flex items-center gap-1"
          >
            {isDownloading ? 'Generating...' : (
              <>
                <Download className="h-4 w-4" />
                Download
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="p-4 sm:p-6 max-h-[600px] overflow-y-auto bg-white">
        <div 
          ref={resumeRef}
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: "top center",
            width: 'fit-content',
            margin: '0 auto'
          }}
        >
          {renderTheme()}
        </div>
      </div>
    </div>
  )
}