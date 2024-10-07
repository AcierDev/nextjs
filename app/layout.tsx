'use client'

import type { Metadata } from "next"
import localFont from "next/font/local"
import { useState } from "react"

import "./globals.css"
import { Navbar } from "@/components/ui/Navbar"
import { OrderSettingsProvider } from "@/contexts/OrderSettingsContext"
import { RealmAppProvider } from "@/hooks/useRealmApp"
import { ThemeProvider } from "../components/providers/ThemeProvider"
import { SettingsPanel } from "@/components/setttings/SettingsPanel"
import { UserProvider } from "@/contexts/UserContext"

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

const metadata: Metadata = {
  title: "Tuesday",
  description: "Replacing Monday",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleOpenSettings = () => {
    setIsSettingsOpen(true)
  }

  const handleCloseSettings = () => {
    setIsSettingsOpen(false)
  }

  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          <RealmAppProvider>
            <OrderSettingsProvider>
              <UserProvider>
                <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
                  <Navbar onOpenSettings={handleOpenSettings} />
                  <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
                    {children}
                  </main>
                  {isSettingsOpen && (
                    <SettingsPanel onClose={handleCloseSettings} />
                  )}
                </div>
              </UserProvider>
            </OrderSettingsProvider>
          </RealmAppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}