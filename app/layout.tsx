import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ResumeAce ATS - ATS-Friendly Resume Builder",
  description:
    "Create professional, ATS-optimized resumes that not only help you pass applicant tracking systems and land more interviews but also allow you to check your CV or Resume's ATS score.",
  icons: {
    icon: [
      { url: '/placeholder-logo.svg', sizes: 'any', type: 'image/svg+xml' }
    ]
  }  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'