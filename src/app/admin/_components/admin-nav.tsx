"use client"
 
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, History, ChevronRight, X, Shield } from "lucide-react"
import type { User } from "@supabase/supabase-js"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { UserProfileDropdown } from "@/app/(auth)/_components/user-profile-dropdown"
 
interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}
 
interface AdminNavProps {
  user: User
  isMobileOpen: boolean
  toggleSidebar: () => void
}
 
const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/logs", label: "Access Logs", icon: History },
]
 
export function AdminNav({ user, isMobileOpen, toggleSidebar }: AdminNavProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
 
  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href) && pathname[href.length] === "/"
  }
 
  return (
    <aside className={cn(
      "flex h-screen flex-col border-r border-white/5 bg-[#0a0a0f] transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-white/5 px-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10">
            <Shield className="h-4 w-4 text-[#C9A84C]" />
          </div>
          {!isCollapsed && (
            <span className="truncate text-sm font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Admin Panel
            </span>
          )}
        </div>
 
        {/* Desktop collapse toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg border border-white/5 bg-white/[0.03] text-[#4a4a5a] transition-all hover:border-[#C9A84C]/20 hover:text-[#C9A84C]"
        >
          <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", !isCollapsed && "rotate-180")} />
        </button>
 
        {/* Mobile close */}
        <button
          onClick={toggleSidebar}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/5 bg-white/[0.03] text-[#4a4a5a] transition-all hover:text-white lg:hidden"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
 
      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href)
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={toggleSidebar}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                    isCollapsed && "justify-center px-2",
                    active
                      ? "border border-[#C9A84C]/20 bg-[#C9A84C]/10 text-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.08)]"
                      : "border border-transparent text-[#6a6a7a] hover:border-white/5 hover:bg-white/[0.03] hover:text-white"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", active ? "text-[#C9A84C]" : "text-current")} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {active && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
                    </>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
 
      {/* Footer */}
      <div className={cn("border-t border-white/5 p-3", isCollapsed && "px-2")}>
        <UserProfileDropdown user={user} />
      </div>
    </aside>
  )
}