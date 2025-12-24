"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CopyButton } from "./copy-button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ExternalLink, Trash2, QrCode, ScrollText, Flame, PlusCircle } from "lucide-react"
import { QRCodeDisplay } from "./qr-code-display"
import { SecretAccessLogs } from "./secret-access-logs"
import { SECRET_EXPIRATION_OPTIONS } from "@/lib/secret-utils"

interface SecretCardActionsProps {
  secretUrl: string
  secretId: string
  status: "active" | "burned" | "expired"
  showQR: boolean
  onToggleQR: () => void
  onDelete?: (id: string) => void
  onBurn: () => void
  onExtend: (hours: number) => void
  isBurning: boolean
  isExtending: boolean
  showLogsDialog: boolean
  onToggleLogsDialog: (open: boolean) => void
  showBurnDialog: boolean
  onToggleBurnDialog: (open: boolean) => void
  showExtendExpiryDialog: boolean
  onToggleExtendExpiryDialog: (open: boolean) => void
  newExpirationHours: number,
  setNewExpirationHours: (hours: number) => void,
}

export function SecretCardActions({
  secretUrl,
  secretId,
  status,
  showQR,
  onToggleQR,
  onDelete,
  onBurn,
  onExtend,
  isBurning,
  isExtending,
  showLogsDialog,
  onToggleLogsDialog,
  showBurnDialog,
  onToggleBurnDialog,
  showExtendExpiryDialog,
  onToggleExtendExpiryDialog,
  newExpirationHours,
  setNewExpirationHours,
}: SecretCardActionsProps) {
  return (
    <div className="flex items-center justify-between border-t bg-muted/20 p-4">
      <div className="flex gap-2">
        <Button variant="default" size="sm" asChild>
          <Link href={secretUrl} target="_blank">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open
          </Link>
        </Button>
        <CopyButton text={secretUrl} />
        <Button variant="outline" size="sm" onClick={onToggleQR}>
          <QrCode className="h-4 w-4" />
        </Button>
        <Dialog open={showLogsDialog} onOpenChange={onToggleLogsDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <ScrollText className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Access Logs for {secretId}</DialogTitle>
            </DialogHeader>
            <SecretAccessLogs secretId={secretId} />
          </DialogContent>
        </Dialog>

        {status === "active" && (
          <>
            <Dialog open={showBurnDialog} onOpenChange={onToggleBurnDialog}>
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
                  Are you sure you want to burn this secret immediately? This action cannot be undone, and the secret will no longer be viewable.
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => onToggleBurnDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={onBurn} disabled={isBurning}>
                    {isBurning ? "Burning..." : "Burn Now"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showExtendExpiryDialog} onOpenChange={onToggleExtendExpiryDialog}>
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
                    Choose a new expiration time for this secret.
                  </p>
                  <Select
                    value={newExpirationHours.toString()}
                    onValueChange={(v) => setNewExpirationHours(Number(v))}
                  >
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
                  <Button variant="ghost" onClick={() => onToggleExtendExpiryDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="default" onClick={() => onExtend(newExpirationHours)} disabled={isExtending}>
                    {isExtending ? "Extending..." : "Extend"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      {onDelete && (
        <Button variant="ghost" size="sm" onClick={() => onDelete(secretId)} className="text-destructive hover:bg-destructive/10">
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
