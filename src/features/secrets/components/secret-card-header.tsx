"use client"

import Link from "next/link"
import { ExternalLink, Lock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SecretStatusBadge } from "@/components/secret-status-badge"

interface SecretCardHeaderProps {
  shortId: string
  secretUrl: string
  hasPassphrase?: boolean
  createdAt: string
  status: "active" | "burned" | "expired"
  viewCount: number
  maxViews: number
}

export function SecretCardHeader({
  shortId,
  secretUrl,
  hasPassphrase,
  createdAt,
  status,
  viewCount,
  maxViews,
}: SecretCardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <Link href={secretUrl} target="_blank" className="flex items-center gap-2 hover:underline">
            <code className="rounded bg-muted px-2.5 py-1 text-base font-mono font-semibold">{shortId}</code>
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
          </Link>
          {hasPassphrase && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>Passphrase Protected</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Created {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      <SecretStatusBadge status={status} viewCount={viewCount} maxViews={maxViews} />
    </div>
  )
}
