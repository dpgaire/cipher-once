import { formatTimeRemaining } from "@/lib/utils"
import { Clock, Eye } from "lucide-react"

interface SecretCardInfoProps {
  expiresAt: string
  viewCount: number
  maxViews: number
  status: "active" | "burned" | "expired"
}

export function SecretCardInfo({ expiresAt, viewCount, maxViews, status }: SecretCardInfoProps) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-2 text-[#4a4a5a]">
          <Clock className="h-3.5 w-3.5" />
          Expires in
        </span>
        <span className={`font-semibold ${status !== "active" ? "text-red-400" : "text-white"}`}>
          {formatTimeRemaining(expiresAt)}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-2 text-[#4a4a5a]">
          <Eye className="h-3.5 w-3.5" />
          Views
        </span>
        <span className="font-semibold text-white">
          {viewCount} / {maxViews === -1 ? "Unlimited" : maxViews}
        </span>
      </div>
    </div>
  )
}
