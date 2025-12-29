import { DashboardHeader } from "@/features/secrets/components/dashboard-header"
import { DashboardMobileNavWrapper } from "@/features/secrets/components/dashboard-mobile-nav-wrapper"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
    </div>
  )
}
