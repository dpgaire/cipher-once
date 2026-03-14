import { getGlobalStats } from "../_services/analytics"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Lock, Eye, Flame } from "lucide-react"
import { GlobalStatsResponse } from "@/lib/types/analytics"

export async function GlobalStats() {
  let stats: GlobalStatsResponse | null = null
  try { stats = await getGlobalStats() } catch {
    return <ErrorState message="Could not load global stats." />
  }
  if (!stats) return <ErrorState message="No global stats available." />

  const statsList = [
    { title: "Total Users", value: stats.total_users, icon: Users, color: "text-[#C9A84C]", border: "border-[#C9A84C]/15", bg: "bg-[#C9A84C]/10", glow: "shadow-[0_0_20px_rgba(201,168,76,0.08)]" },
    { title: "Secrets Created", value: stats.total_secrets_created, icon: Lock, color: "text-emerald-400", border: "border-emerald-500/15", bg: "bg-emerald-500/10", glow: "shadow-[0_0_20px_rgba(16,185,129,0.08)]" },
    { title: "Secrets Viewed", value: stats.total_secrets_viewed, icon: Eye, color: "text-purple-400", border: "border-purple-500/15", bg: "bg-purple-500/10", glow: "shadow-[0_0_20px_rgba(168,85,247,0.08)]" },
    { title: "Secrets Burned", value: stats.total_secrets_burned, icon: Flame, color: "text-red-400", border: "border-red-500/15", bg: "bg-red-500/10", glow: "shadow-[0_0_20px_rgba(239,68,68,0.08)]" },
  ]

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {statsList.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.title} className={`rounded-2xl border ${stat.border} bg-white/[0.02] p-5 ${stat.glow} transition-all hover:bg-white/[0.04]`}>
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${stat.border} ${stat.bg}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
                <p className="text-xs text-[#4a4a5a]">{stat.title}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}


function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex h-24 items-center justify-center rounded-2xl border border-red-500/15 bg-red-500/[0.03]">
      <p className="text-sm text-red-400">{message}</p>
    </div>
  )
}