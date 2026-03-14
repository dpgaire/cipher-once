"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { SecretCard } from "./secret-card"
import { EmptyState } from "@/components/ui/empty"
import { Shield, FileText, Activity, Flame, Clock, User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Secret } from "../../(secrets)/s/[shortId]/_types"
import { DashboardSkeleton } from "./dashboard-skeleton"

interface DashboardPageComponentProps {
  initialSecrets: Secret[]
  searchParams: { tab?: string }
  stats: {
    total_secrets_created: number
    total_secrets_viewed: number
    total_secrets_burned: number
    is_admin: boolean
  } | null
}

function DashboardPageComponent({ initialSecrets, searchParams, stats }: DashboardPageComponentProps) {
  const activeTab = searchParams.tab || "active"
  const isAdmin = Boolean(stats?.is_admin)
  const [secrets, setSecrets] = useState<Secret[]>(initialSecrets)

  const handleDeleteSecret = async (secretId: string) => {
    if (!confirm("Are you sure you want to delete this secret? This action is irreversible.")) return
    const supabase = createClient()
    const { error } = await supabase.from("secrets").delete().eq("id", secretId)
    if (error) { console.error("Error deleting secret:", error); alert("Failed to delete secret") }
    else { setSecrets(secrets.filter((s) => s.id !== secretId)) }
  }

  const activeSecrets = secrets.filter((s) => !s.is_burned && new Date(s.expires_at) > new Date())
  const expiredSecrets = secrets.filter((s) => !s.is_burned && new Date(s.expires_at) <= new Date())
  const burnedSecrets = secrets.filter((s) => s.is_burned)

  const statsCards = [
    { label: "Active", value: activeSecrets.length, icon: Shield, color: "text-emerald-400", border: "border-emerald-500/15", bg: "bg-emerald-500/10", glow: "shadow-[0_0_20px_rgba(16,185,129,0.08)]" },
    { label: "Total Created", value: stats?.total_secrets_created ?? 0, icon: FileText, color: "text-[#C9A84C]", border: "border-[#C9A84C]/15", bg: "bg-[#C9A84C]/10", glow: "shadow-[0_0_20px_rgba(201,168,76,0.08)]" },
    { label: "Total Views", value: stats?.total_secrets_viewed ?? 0, icon: Activity, color: "text-purple-400", border: "border-purple-500/15", bg: "bg-purple-500/10", glow: "shadow-[0_0_20px_rgba(168,85,247,0.08)]" },
    { label: "Burned", value: stats?.total_secrets_burned ?? 0, icon: Flame, color: "text-red-400", border: "border-red-500/15", bg: "bg-red-500/10", glow: "shadow-[0_0_20px_rgba(239,68,68,0.08)]" },
    ...(isAdmin ? [{ label: "Admin", value: "Panel", icon: User, color: "text-blue-400", border: "border-blue-500/15", bg: "bg-blue-500/10", glow: "shadow-[0_0_20px_rgba(59,130,246,0.08)]", href: "/admin" }] : []),
  ]

  const navItems = [
    { name: "Active", value: "active", count: activeSecrets.length, icon: Shield },
    { name: "Expired", value: "expired", count: expiredSecrets.length, icon: Clock },
    { name: "Burned", value: "burned", count: burnedSecrets.length, icon: Flame },
  ]

  const renderContent = () => {
    const sets = { active: activeSecrets, expired: expiredSecrets, burned: burnedSecrets }
    const icons = { active: Shield, expired: Clock, burned: Flame }
    const descriptions = {
      active: "Create your first secret to share sensitive information securely.",
      expired: "Secrets that pass their expiration date will appear here.",
      burned: "Secrets that have been viewed and destroyed will appear here.",
    }
    const titles = { active: "No active secrets", expired: "No expired secrets", burned: "No burned secrets" }
    const tab = activeTab as "active" | "expired" | "burned"
    const current = sets[tab] ?? []
    if (current.length === 0) {
      return (
        <EmptyState
          icon={icons[tab]}
          title={titles[tab]}
          description={descriptions[tab]}
          {...(tab === "active" ? { actionLabel: "Create Secret", actionHref: "/create" } : {})}
        />
      )
    }
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {current.map((secret) => <SecretCard key={secret.id} secret={secret} onDelete={handleDeleteSecret} />)}
      </div>
    )
  }

  return (
    <div className="container max-w-7xl flex-1 py-8">
      {/* Stats Grid */}
      <div className={`mb-8 grid gap-4 grid-cols-2 ${isAdmin ? "md:grid-cols-5" : "md:grid-cols-4"}`}>
        {statsCards.map((stat) => {
          const Icon = stat.icon
          const card = (
            <div className={`rounded-2xl border ${stat.border} bg-white/[0.02] p-5 ${stat.glow} backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.04]`}>
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${stat.border} ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-[#4a4a5a]">{stat.label}</p>
                </div>
              </div>
            </div>
          )
          return (stat as any).href ? (
            <Link key={stat.label} href={(stat as any).href} className="cursor-pointer">
              {card}
            </Link>
          ) : (
            <div key={stat.label}>{card}</div>
          )
        })}
      </div>

      {/* Secrets list card */}
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
        {/* Header */}
        <div className="border-b border-white/5 px-7 pt-6 pb-5">
          <p className="text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Your Secrets</p>
          <p className="mt-0.5 text-xs text-[#4a4a5a]">Manage and track all your shared secrets.</p>

          {/* Tab nav */}
          <nav className="mt-5 flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.value
              return (
                <Link
                  key={item.name}
                  href={`/dashboard?tab=${item.value}`}
                  className={cn(
                    "flex items-center flex-wrap gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200",
                    isActive
                      ? "bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C]"
                      : "border border-transparent text-[#6a6a7a] hover:border-white/5 hover:bg-white/[0.03] hover:text-white"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.name}
                  <span className={cn(
                    "rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                    isActive ? "bg-[#C9A84C]/20 text-[#C9A84C]" : "bg-white/5 text-[#4a4a5a]"
                  )}>
                    {item.count}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-7">{renderContent()}</div>
      </div>
    </div>
  )
}

interface DashboardPageProps {
  secrets: Secret[]
  searchParams: { tab?: string }
  stats: {
    total_secrets_created: number
    total_secrets_viewed: number
    total_secrets_burned: number
    is_admin: boolean
  } | null
}

export function DashboardPage({ secrets, searchParams, stats }: DashboardPageProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardPageComponent initialSecrets={secrets} searchParams={searchParams} stats={stats} />
    </Suspense>
  )
}