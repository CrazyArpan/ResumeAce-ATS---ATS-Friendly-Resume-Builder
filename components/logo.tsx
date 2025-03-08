import { FileText } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-5 w-5 sm:h-6 sm:w-6",
    md: "h-6 w-6 sm:h-8 sm:w-8",
    lg: "h-8 w-8 sm:h-10 sm:w-10",
  }

  const textSizeClasses = {
    sm: "text-base sm:text-lg",
    md: "text-lg sm:text-xl",
    lg: "text-xl sm:text-2xl",
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-primary rounded-md rotate-3 opacity-20"></div>
        <div className="relative bg-primary text-primary-foreground rounded-md p-1 flex items-center justify-center">
          <FileText className={sizeClasses[size]} />
        </div>
      </div>
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} text-gray-900 dark:text-white`}>
          Resume<span className="hidden xs:inline">Ace</span>
          <span className="text-primary">ATS</span>
        </div>
      )}
    </div>
  )
}

