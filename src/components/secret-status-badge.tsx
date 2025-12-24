import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, Eye, Flame } from "lucide-react"

interface SecretStatusBadgeProps {
  status: "active" | "expired" | "burned" | "viewed"
  viewCount?: number
  maxViews?: number
}

export function SecretStatusBadge({ status, viewCount = 0, maxViews = 1 }: SecretStatusBadgeProps) {
  const statusConfig = {
    active: {
      label: "Active",
      icon: CheckCircle2,
      variant: "default" as const,
      className: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20",
    },
    expired: {
      label: "Expired",
      icon: Clock,
      variant: "secondary" as const,
      className: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20",
    },
    burned: {
      label: "Burned",
      icon: Flame,
      variant: "destructive" as const,
      className: "bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/20",
    },
    viewed: {
      label: `${viewCount}/${maxViews === -1 ? "∞" : maxViews} views`,
      icon: Eye,
      variant: "outline" as const,
      className: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon className="mr-1 h-3 w-3" />
      {config.label}
    </Badge>
  )
}
