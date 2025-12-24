"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/features/core/components/header"

interface ClientHeaderProps {
  isAuthenticated?: boolean
}

export function ClientHeader({ isAuthenticated }: ClientHeaderProps) {
  const pathname = usePathname()

  // Do not render the main header on dashboard routes
  if (pathname.startsWith("/dashboard")) {
    return null
  }

  return <Header isAuthenticated={isAuthenticated} />
}
