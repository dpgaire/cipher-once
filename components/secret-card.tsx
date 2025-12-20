"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { SecretStatusBadge } from "./secret-status-badge"
import { CopyButton } from "./copy-button"
import { Button } from "@/components/ui/button"
import { ExternalLink, Trash2, Lock, Clock, Eye } from "lucide-react"
import Link from "next/link"
import { formatTimeRemaining } from "@/lib/secret-utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SecretCardProps {
  secret: {
    id: string
    short_id: string
    created_at: string
    expires_at: string
    view_count: number
    max_views: number
    is_burned: boolean
    passphrase_hash: string | null
  }
  onDelete?: (id: string) => void
}

export function SecretCard({ secret, onDelete }: SecretCardProps) {
  const isExpired = new Date(secret.expires_at) < new Date()
  const status = secret.is_burned ? "burned" : isExpired ? "expired" : "active"
  const secretUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/s/${secret.short_id}`

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <Link href={secretUrl} target="_blank" className="flex items-center gap-2 hover:underline">
                <code className="rounded bg-muted px-2.5 py-1 text-base font-mono font-semibold">{secret.short_id}</code>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
              </Link>
              {secret.passphrase_hash && (
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
              Created {new Date(secret.created_at).toLocaleDateString()}
            </p>
          </div>
          <SecretStatusBadge status={status} viewCount={secret.view_count} maxViews={secret.max_views} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              Expires in
            </span>
            <span className={`font-medium ${status !== "active" ? "text-destructive" : ""}`}>
              {formatTimeRemaining(secret.expires_at)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Eye className="h-4 w-4" />
              Views
            </span>
            <span className="font-medium">
              {secret.view_count} / {secret.max_views === -1 ? "Unlimited" : secret.max_views}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/20 p-4">
        <div className="flex gap-2">
          <Button variant="default" size="sm" asChild>
            <Link href={secretUrl} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open
            </Link>
          </Button>
          <CopyButton text={secretUrl}  />
        </div>

        {onDelete && (
          <Button variant="ghost" size="sm" onClick={() => onDelete(secret.id)} className="text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}