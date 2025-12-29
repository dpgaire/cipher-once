"use client"

import React from "react"
import { Header } from "@/features/core/components/header"
import { Footer } from "@/features/core/components/footer"
import { usePathname } from "next/navigation"

interface RootLayoutProps {
  children: React.ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname()

  const isDashboard = pathname.startsWith("/dashboard")
  const isSecretPage = pathname.startsWith("/s/")
  const isAdmin = pathname.startsWith("/admin")


  const showGlobalHeaderFooter = !isDashboard && !isSecretPage && !isAdmin

  if (showGlobalHeaderFooter) {
    return (
      <>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </>
    )
  }

  return <>{children}</>
}