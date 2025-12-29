"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock, Plus } from "lucide-react"
import { UserProfileDropdown } from "@/features/auth/components/user-profile-dropdown"
import { useAuthSession } from "@/features/auth/hooks/use-auth-session"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardHeader() {
  const { user, loading } = useAuthSession()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background hidden md:flex">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 font-bold transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Lock className="h-4.5 w-4.5" />
          </div>
          <span className="text-xl">CipherOnce</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button asChild>
            <Link href="/create">
              <Plus className="mr-2 h-4 w-4" />
              New Secret
            </Link>
          </Button>
          {loading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <UserProfileDropdown user={user} />
          ) : null}
        </div>
      </div>
    </header>
  )
}
