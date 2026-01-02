"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlusCircle, Mail, User, Home, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardMobileNav() {
  const pathname = usePathname()
  const navItems = [
    { name: "Dashbaord", href: "/dashboard", icon: Home, value: "dashboard" },
    { name: "Inbox", href: "/dashboard/inbox", icon: Mail, value: "inbox" },
    { name: "Profile", href: "/dashboard/profile", icon: User, value: "profile" },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, value: "settings" },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background">
      <div className="grid h-full grid-cols-5 mx-auto font-medium">
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
                "inline-flex flex-col items-center justify-center px-5 hover:bg-muted",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.name}</span>
            </Link>
          )
        })}
        <Link
          href="/create"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted text-muted-foreground"
        >
          <PlusCircle className="w-5 h-5 mb-1" />
          <span className="text-xs">New</span>
        </Link>
      </div>
    </div>
  )
}
