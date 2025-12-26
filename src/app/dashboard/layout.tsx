import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/features/secrets/components/dashboard-header"
import { DashboardMobileNav } from "@/features/secrets/components/dashboard-mobile-nav"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <DashboardMobileNav />
    </div>
  )
}
