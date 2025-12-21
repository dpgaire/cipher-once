// components/admin-nav.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, BarChart, Shield, ChevronRight } from "lucide-react"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import type { User } from "@supabase/supabase-js"

export function AdminNav({ user, toggleSidebar }: { user: User, toggleSidebar: () => void }) {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart },
  ]

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-card border-r shadow-lg p-4"> {/* Removed h-screen */}
      {/* Header */}
      <div className="flex items-center gap-3 px-2 py-3 border-b bg-primary text-primary-foreground rounded-lg">
        <Shield className="h-6 w-6" />
        <h2 className="text-xl font-bold tracking-tight">Admin Panel</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href + '/') && item.href !== '/admin')
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                    transition-all duration-200 ease-out
                    ${isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/70 hover:translate-x-1"
                    }
                  `}
                  onClick={toggleSidebar} // Close sidebar on nav item click (for mobile)
                >
                  {/* Active Indicator Pill */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary-foreground rounded-r-full" />
                  )}

                  <Icon className={`
                    h-5 w-5 transition-all duration-200
                    ${isActive
                      ? "text-primary-foreground scale-110"
                      : "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
                    }
                  `} />
                  
                  <span className="flex-1">{item.label}</span>
                  
                  {isActive && (
                    <ChevronRight className="h-4 w-4 opacity-80 group-hover:translate-x-1 transition-transform" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Dropdown Footer */}
      <div className="mt-auto border-t border-border bg-muted/50 p-2 rounded-md">
        <UserProfileDropdown user={user} />
      </div>
    </aside>
  )
}