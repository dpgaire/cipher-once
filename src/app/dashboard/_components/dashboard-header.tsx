"use client"

import Link from "next/link"
import { Plus, Mail } from "lucide-react"
import { UserProfileDropdown } from "@/app/(auth)/_components/user-profile-dropdown"
import { Skeleton } from "@/components/ui/skeleton"
import { NotificationBell } from "@/components/core/notification-bell"
import type { User } from "@supabase/supabase-js"

interface DashboardHeaderProps {
  user: User | null
  loading: boolean
}

export function DashboardHeader({ user, loading }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 hidden w-full border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl md:flex">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 font-bold transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 shadow-[0_0_20px_rgba(201,168,76,0.1)]">
            <img src="/icon-512.png" className="rounded-lg" />
          </div>
          <span
            className="text-xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            CipherOnce
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/inbox"
            className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2 text-sm font-medium text-[#6a6a7a] transition-all hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
          >
            <Mail className="h-4 w-4" />
            Inbox
          </Link>

          <Link
            href="/create"
            className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] px-4 py-2 text-sm font-bold text-[#0a0a0f] shadow-[0_0_20px_rgba(201,168,76,0.2)] transition-all hover:shadow-[0_0_30px_rgba(201,168,76,0.35)]"
          >
            <Plus className="h-4 w-4" />
            New Secret
            <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
          </Link>

          <NotificationBell />

          {loading ? (
            <Skeleton className="h-9 w-9 rounded-full bg-white/5" />
          ) : user ? (
            <UserProfileDropdown user={user} />
          ) : null}
        </div>
      </div>
    </header>
  )
}