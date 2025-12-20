import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock, Plus } from "lucide-react"
import { UserProfileDropdown } from "./user-profile-dropdown"
import type { User } from "@supabase/supabase-js"

interface DashboardNavProps {
  user: User
}

export function DashboardNav({ user }: DashboardNavProps) {
  if (!user) {
    // This should not happen if the layout protecting the page works correctly
    return null
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
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
          <UserProfileDropdown user={user} />
        </div>
      </div>
    </header>
  )
}
