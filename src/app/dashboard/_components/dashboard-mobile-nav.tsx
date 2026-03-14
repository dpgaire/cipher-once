"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlusCircle, Mail, Home, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardMobileNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Inbox", href: "/dashboard/inbox", icon: Mail },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-white/5 bg-[#0a0a0f]/90 backdrop-blur-xl md:hidden">
      <div className="grid h-16 grid-cols-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wider transition-colors",
                isActive ? "text-[#C9A84C]" : "text-[#4a4a5a] hover:text-[#6a6a7a]"
              )}
            >
              <div className={cn(
                "flex h-7 w-7 items-center justify-center rounded-lg transition-all",
                isActive ? "bg-[#C9A84C]/10 border border-[#C9A84C]/20" : ""
              )}>
                <Icon className="h-4 w-4" />
              </div>
              {item.name}
            </Link>
          )
        })}

        {/* Create */}
        <Link
          href="/create"
          className="flex flex-col items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#4a4a5a] transition-colors hover:text-[#6a6a7a]"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10">
            <PlusCircle className="h-4 w-4 text-[#C9A84C]" />
          </div>
          New
        </Link>
      </div>
    </div>
  )
}