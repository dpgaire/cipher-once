"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Clock, Flame, PlusCircle, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardMobileNavProps {
  tab: string
}

export function DashboardMobileNav({ tab }: DashboardMobileNavProps) {
  const pathname = usePathname()
  const navItems = [
    { name: "Active", href: "/dashboard?tab=active", icon: Shield, value: "active" },
    { name: "Expired", href: "/dashboard?tab=expired", icon: Clock, value: "expired" },
    { name: "Burned", href: "/dashboard?tab=burned", icon: Flame, value: "burned" },
    { name: "Inbox", href: "/inbox", icon: Mail, value: "inbox" },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background">
      <div className="grid h-full grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.value === "inbox" ? pathname === item.href : tab === item.value
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
