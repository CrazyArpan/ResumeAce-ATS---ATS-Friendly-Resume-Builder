"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { Theme } from "@/lib/types"

interface ThemeSelectorProps {
  activeTheme: Theme
  onThemeChange: (theme: Theme) => void
}

export function ThemeSelector({ activeTheme, onThemeChange }: ThemeSelectorProps) {
  const themes: { id: Theme; name: string; description: string }[] = [
    {
      id: "professional",
      name: "Professional",
      description: "Clean and minimal design suitable for corporate environments",
    },
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary design with a touch of color",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional resume layout with a timeless feel",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Unique design that stands out while remaining ATS-friendly",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Ultra-clean design focusing on content with minimal styling",
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sophisticated design for senior professionals and executives",
    },
  ]

  return (
    <Card className="dark:bg-gray-800">
      <CardContent className="pt-4 sm:pt-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium dark:text-white">Select a Theme</h3>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            All themes are ATS-friendly while offering different visual styles.
          </p>
        </div>
        <RadioGroup
          value={activeTheme}
          onValueChange={(value) => onThemeChange(value as Theme)}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
        >
          {themes.map((theme) => (
            <div key={theme.id} className="relative">
              <RadioGroupItem value={theme.id} id={theme.id} className="sr-only" />
              <Label
                htmlFor={theme.id}
                className={`flex flex-col items-center justify-between rounded-md border-2 p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 cursor-pointer ${
                  activeTheme === theme.id
                    ? "border-primary bg-primary/10 dark:border-primary dark:bg-primary/20"
                    : "border-muted dark:border-gray-700"
                }`}
              >
                <div className="mb-2 h-16 sm:h-24 w-full rounded bg-muted dark:bg-gray-700 flex items-center justify-center">
                  <div
                    className={`h-12 w-12 sm:h-16 sm:w-16 rounded-full ${
                      theme.id === "professional"
                        ? "bg-blue-200 dark:bg-blue-900"
                        : theme.id === "modern"
                          ? "bg-emerald-200 dark:bg-emerald-900"
                          : theme.id === "classic"
                            ? "bg-amber-200 dark:bg-amber-900"
                            : theme.id === "creative"
                              ? "bg-purple-200 dark:bg-purple-900"
                              : theme.id === "minimal"
                                ? "bg-gray-200 dark:bg-gray-700"
                                : "bg-indigo-200 dark:bg-indigo-900"
                    } flex items-center justify-center`}
                  >
                    <span className="text-xs dark:text-white">{theme.name}</span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-medium dark:text-white">{theme.name}</h3>
                  <p className="text-xs text-muted-foreground dark:text-gray-400 line-clamp-2">{theme.description}</p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

