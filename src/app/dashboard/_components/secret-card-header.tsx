import Link from "next/link"
import { ExternalLink, Lock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SecretStatusBadge } from "./secret-status-badge"

interface SecretCardHeaderProps {
  shortId: string
  secretUrl: string
  hasPassphrase?: boolean
  createdAt: string
  status: "active" | "burned" | "expired"
  viewCount: number
  maxViews: number
}

export function SecretCardHeader({ shortId, secretUrl, hasPassphrase, createdAt, status, viewCount, maxViews }: SecretCardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5">
          <Link
            href={secretUrl}
            target="_blank"
            className="group flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 font-mono text-sm font-semibold text-white transition-all hover:border-[#C9A84C]/25 hover:bg-[#C9A84C]/5 hover:text-[#C9A84C]"
          >
            {shortId}
            <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          {hasPassphrase && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex h-6 w-6 items-center justify-center rounded-md border border-white/5 bg-white/[0.03]">
                    <Lock className="h-3 w-3 text-[#6a6a7a]" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="border-white/10 bg-[#0d0d14] text-white">Passphrase Protected</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="mt-1.5 text-[10px] text-[#4a4a5a]">
          Created {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      <SecretStatusBadge status={status} viewCount={viewCount} maxViews={maxViews} />
    </div>
  )
}
