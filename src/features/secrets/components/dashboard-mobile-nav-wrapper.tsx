"use client"

import { useSearchParams } from "next/navigation"
import { DashboardMobileNav } from "./dashboard-mobile-nav"

export function DashboardMobileNavWrapper() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "active"

  return <DashboardMobileNav tab={tab} />
}
