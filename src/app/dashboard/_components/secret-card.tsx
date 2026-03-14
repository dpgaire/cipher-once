"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { SecretCardHeader } from "./secret-card-header"
import { SecretCardInfo } from "./secret-card-info"
import { SecretCardActions } from "./secret-card-actions"
import { QRCodeDisplay } from "./qr-code-display"
import { calculateExpirationDate } from "@/lib/utils"

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
  const secretUrl = `/s/${secret.short_id}`

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

    const borderColor = status === "active" ? "border-white/5 hover:border-[#C9A84C]/15"
    : status === "expired" ? "border-amber-500/10 hover:border-amber-500/20"
    : "border-red-500/10 hover:border-red-500/15"

  return (
    <div className={`overflow-hidden rounded-2xl border bg-white/[0.02] transition-all duration-200 hover:bg-white/[0.03] hover:-translate-y-0.5 hover:shadow-lg ${borderColor}`}>
      {/* Card body */}
      <div className="space-y-4 p-5">
        <SecretCardHeader
          shortId={secret.short_id}
          secretUrl={secretUrl}
          hasPassphrase={!!secret.passphrase_hash}
          createdAt={secret.created_at}
          status={status}
          viewCount={secret.view_count}
          maxViews={secret.max_views}
        />
        <SecretCardInfo
          expiresAt={secret.expires_at}
          viewCount={secret.view_count}
          maxViews={secret.max_views}
          status={status}
        />

        {showQR && (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white p-4">
            <QRCodeDisplay value={secretUrl} size={128} />
            <p className="text-center text-[10px] text-[#6a6a7a] max-w-[128px]">
              Public link only — key not included
            </p>
          </div>
        )}
      </div>

      {/* Footer actions */}
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
    </div>
  )
}