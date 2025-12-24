"use client"

import { Clock, Eye } from "lucide-react"
import { formatTimeRemaining } from "@/lib/secret-utils"

interface SecretCardInfoProps {
  expiresAt: string
  viewCount: number
  maxViews: number
  status: "active" | "burned" | "expired"
}

export function SecretCardInfo({
  expiresAt,
  viewCount,
  maxViews,
  status,
}: SecretCardInfoProps) {
  return (
    <div className="grid grid-cols-1 gap-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          Expires in
        </span>
        <span className={`font-medium ${status !== "active" ? "text-destructive" : ""}`}>
          {formatTimeRemaining(expiresAt)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-muted-foreground">
          <Eye className="h-4 w-4" />
          Views
        </span>
        <span className="font-medium">
          {viewCount} / {maxViews === -1 ? "Unlimited" : maxViews}
        </span>
      </div>
    </div>
  )
}
