'use client';

import { useAuthSession } from "@/app/(auth)/_hooks/use-auth-session";
import { MobileDashboardHeader } from "@/components/core/mobile-dashboard-header"
import { DashboardHeader } from "@/app/dashboard/_components/dashboard-header"
import { DashboardMobileNav } from "@/app/dashboard/_components/dashboard-mobile-nav"


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
