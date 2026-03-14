import { CheckCircle2, Clock, Eye, Flame } from "lucide-react"

interface SecretStatusBadgeProps {
  status: "active" | "expired" | "burned" | "viewed"
  viewCount?: number
  maxViews?: number
}

export function SecretStatusBadge({ status, viewCount = 0, maxViews = 1 }: SecretStatusBadgeProps) {
  const config = {
    active: { label: "Active", icon: CheckCircle2, cls: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" },
    expired: { label: "Expired", icon: Clock, cls: "border-amber-500/20 bg-amber-500/10 text-amber-400" },
    burned: { label: "Burned", icon: Flame, cls: "border-red-500/20 bg-red-500/10 text-red-400" },
    viewed: { label: `${viewCount}/${maxViews === -1 ? "∞" : maxViews} views`, icon: Eye, cls: "border-purple-500/20 bg-purple-500/10 text-purple-400" },
  }[status]

  const Icon = config.icon
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${config.cls}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}