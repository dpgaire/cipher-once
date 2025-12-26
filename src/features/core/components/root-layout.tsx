"use client"

import React from "react"
import { Header } from "@/features/core/components/header"
import { Footer } from "@/features/core/components/footer"
import { usePathname } from "next/navigation"


interface RootLayoutProps {
  children: React.ReactNode
  isAuthenticated: boolean
}

export function RootLayout({ children, isAuthenticated }: RootLayoutProps) {
  const pathname = usePathname()

  // Define routes where the header and footer should not be shown
  const isAuthPage = pathname.startsWith("/auth")
  const isDashboard = pathname.startsWith("/dashboard")
  // const isCreatePage = pathname.startsWith("/create")
  const isSecretPage = pathname.startsWith("/s/")

  // A more flexible way to manage layouts
  // const showGlobalHeaderFooter = !isAuthPage && !isDashboard && !isCreatePage && !isSecretPage
  const showGlobalHeaderFooter = !isAuthPage && !isDashboard  && !isSecretPage


  if (showGlobalHeaderFooter) {
    return (
      <>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </>
    )
  }

  // For auth, dashboard, create, and secret pages, render children directly
  // These pages/layouts can have their own specific headers or footers
  return <>{children}</>
}