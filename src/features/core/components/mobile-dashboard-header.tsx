"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import { UserProfileDropdown } from "@/features/auth/components/user-profile-dropdown"
import { NotificationBell } from "@/features/notifications/components/notification-bell"
import type { User } from "@supabase/supabase-js"
import { Skeleton } from "@/components/ui/skeleton"

interface MobileDashboardHeaderProps {
  user: User | null
  loading: boolean
}

export function MobileDashboardHeader({ user, loading }: MobileDashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background flex md:hidden h-16 items-center justify-between px-4">
      <Link href="/dashboard" className="flex items-center gap-2.5 font-bold transition-opacity hover:opacity-80">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <Lock className="h-4.5 w-4.5" />
        </div>
        <span className="text-xl">CipherOnce</span>
      </Link>
      <div className="flex items-center gap-4">
        <NotificationBell />
        {loading ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : user ? (
          <UserProfileDropdown user={user} />
        ) : null}
      </div>
    </header>
  )
}
