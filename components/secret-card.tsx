"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { SecretStatusBadge } from "./secret-status-badge"
import { CopyButton } from "./copy-button"
import { Button } from "@/components/ui/button"
import { ExternalLink, Trash2, Lock, Clock, Eye, QrCode, ScrollText, Flame, PlusCircle } from "lucide-react"
import Link from "next/link"
import { formatTimeRemaining, calculateExpirationDate, SECRET_EXPIRATION_OPTIONS } from "@/lib/secret-utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { QRCodeDisplay } from "@/components/qr-code-display"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SecretAccessLogs } from "./secret-access-logs"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


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
  const [showQR, setShowQR] = useState(false)
  const [showLogsDialog, setShowLogsDialog] = useState(false)
  const [showBurnDialog, setShowBurnDialog] = useState(false)
  const [showExtendExpiryDialog, setShowExtendExpiryDialog] = useState(false)
  const [isBurning, setIsBurning] = useState(false)
  const [newExpirationHours, setNewExpirationHours] = useState(24)
  const [isExtending, setIsExtending] = useState(false)
  const router = useRouter()
  const isExpired = new Date(secret.expires_at) < new Date()
  const status = secret.is_burned ? "burned" : isExpired ? "expired" : "active"
  const secretUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/s/${secret.short_id}`

  const handleBurnSecret = async () => {
    setIsBurning(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('secrets')
        .update({ is_burned: true })
        .eq('id', secret.id);

      if (error) throw error;

      setShowBurnDialog(false);
      if (onDelete) {
        onDelete(secret.id); // Refresh the list by indicating this secret is gone
      } else {
        router.refresh(); // Or refresh the page if no specific onDelete is provided
      }
    } catch (error) {
      console.error("Failed to burn secret:", error);
      // Optionally show a toast notification for the error
    } finally {
      setIsBurning(false);
    }
  };

  const handleExtendExpiry = async () => {
    setIsExtending(true);
    try {
      const newExpiryDate = calculateExpirationDate(newExpirationHours);
      const supabase = createClient();
      const { error } = await supabase
        .from('secrets')
        .update({ expires_at: newExpiryDate.toISOString() })
        .eq('id', secret.id);

      if (error) throw error;

      setShowExtendExpiryDialog(false);
      // Refresh the dashboard to show updated expiry
      router.refresh(); 
    } catch (error) {
      console.error("Failed to extend expiry:", error);
      // Optionally show a toast notification for the error
    } finally {
      setIsExtending(false);
    }
  };


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

        {showQR && (
          <div className="mt-4 flex flex-col items-center">
            <QRCodeDisplay value={secretUrl} size={128} />
            <p className="mt-2 text-xs text-muted-foreground text-center max-w-[128px]">
              (Public link only, key not included)
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/20 p-4">
        <div className="flex gap-2">
          <Button variant="default" size="sm" asChild>
            <Link href={secretUrl} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open
            </Link>
          </Button>
          <CopyButton text={secretUrl} />
          <Button variant="outline" size="sm" onClick={() => setShowQR(!showQR)}>
            <QrCode className="h-4 w-4" />
          </Button>
          <Dialog open={showLogsDialog} onOpenChange={setShowLogsDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <ScrollText className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Access Logs for {secret.short_id}</DialogTitle>
              </DialogHeader>
              <SecretAccessLogs secretId={secret.id} />
            </DialogContent>
          </Dialog>

          {status === "active" && (
            <>
              <Dialog open={showBurnDialog} onOpenChange={setShowBurnDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-500/10">
                    <Flame className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Burn Secret Now?</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to burn this secret immediately? This action cannot be undone,
                    and the secret will no longer be viewable.
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setShowBurnDialog(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleBurnSecret} disabled={isBurning}>
                      {isBurning ? "Burning..." : "Burn Now"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* New: Extend Expiry Button */}
              <Dialog open={showExtendExpiryDialog} onOpenChange={setShowExtendExpiryDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-blue-500 hover:bg-blue-500/10">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Extend Secret Expiry</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Choose a new expiration time for this secret. The current expiration is{" "}
                      {new Date(secret.expires_at).toLocaleString()}.
                    </p>
                    <Select value={newExpirationHours.toString()} onValueChange={(v) => setNewExpirationHours(Number(v))}>
                      <SelectTrigger id="new-expiration">
                        <SelectValue placeholder="Select new expiration" />
                      </SelectTrigger>
                      <SelectContent>
                        {SECRET_EXPIRATION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setShowExtendExpiryDialog(false)}>
                      Cancel
                    </Button>
                    <Button variant="default" onClick={handleExtendExpiry} disabled={isExtending}>
                      {isExtending ? "Extending..." : "Extend"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
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