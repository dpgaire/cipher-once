'use client';

import { useAuthSession } from "@/features/auth/hooks/use-auth-session";
import { MobileDashboardHeader } from "@/features/core/components/mobile-dashboard-header"
import { DashboardHeader } from "@/features/secrets/components/dashboard-header"
import { DashboardMobileNav } from "@/features/secrets/components/dashboard-mobile-nav"


export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const {  loading, user } = useAuthSession();
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} loading={loading} />
      <MobileDashboardHeader user={user} loading={loading} />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <DashboardMobileNav/>
    </div>
  )
}
