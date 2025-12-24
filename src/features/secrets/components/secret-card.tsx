"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { calculateExpirationDate } from "@/lib/secret-utils"

import { SecretCardHeader } from "./secret-card-header"
import { SecretCardInfo } from "./secret-card-info"
import { SecretCardActions } from "./secret-card-actions"
import { QRCodeDisplay } from "./qr-code-display"

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
    setIsBurning(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from("secrets").update({ is_burned: true }).eq("id", secret.id)
      if (error) throw error
      setShowBurnDialog(false)
      if (onDelete) {
        onDelete(secret.id)
      } else {
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to burn secret:", error)
    } finally {
      setIsBurning(false)
    }
  }

  const handleExtendExpiry = async (hours: number) => {
    setIsExtending(true)
    try {
      const newExpiryDate = calculateExpirationDate(hours)
      const supabase = createClient()
      const { error } = await supabase.from("secrets").update({ expires_at: newExpiryDate.toISOString() }).eq("id", secret.id)
      if (error) throw error
      setShowExtendExpiryDialog(false)
      router.refresh()
    } catch (error) {
      console.error("Failed to extend expiry:", error)
    } finally {
      setIsExtending(false)
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
      <CardHeader className="space-y-3 pb-4">
        <SecretCardHeader
          shortId={secret.short_id}
          secretUrl={secretUrl}
          hasPassphrase={!!secret.passphrase_hash}
          createdAt={secret.created_at}
          status={status}
          viewCount={secret.view_count}
          maxViews={secret.max_views}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        <SecretCardInfo
          expiresAt={secret.expires_at}
          viewCount={secret.view_count}
          maxViews={secret.max_views}
          status={status}
        />

        {showQR && (
          <div className="mt-4 flex flex-col items-center">
            <QRCodeDisplay value={secretUrl} size={128} />
            <p className="mt-2 text-xs text-muted-foreground text-center max-w-[128px]">
              (Public link only, key not included)
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <SecretCardActions
          secretUrl={secretUrl}
          secretId={secret.id}
          status={status}
          showQR={showQR}
          onToggleQR={() => setShowQR(!showQR)}
          onDelete={onDelete}
          onBurn={handleBurnSecret}
          onExtend={handleExtendExpiry}
          isBurning={isBurning}
          isExtending={isExtending}
          showLogsDialog={showLogsDialog}
          onToggleLogsDialog={setShowLogsDialog}
          showBurnDialog={showBurnDialog}
          onToggleBurnDialog={setShowBurnDialog}
          showExtendExpiryDialog={showExtendExpiryDialog}
          onToggleExtendExpiryDialog={setShowExtendExpiryDialog}
          newExpirationHours={newExpirationHours}
          setNewExpirationHours={setNewExpirationHours}
        />
      </CardFooter>
    </Card>
  )
}