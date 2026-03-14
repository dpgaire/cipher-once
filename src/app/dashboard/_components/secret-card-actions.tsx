import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { SECRET_EXPIRATION_OPTIONS } from "@/lib/utils"
import { Trash2, PlusCircle, Flame } from "lucide-react"

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
  newExpirationHours: number
  setNewExpirationHours: (hours: number) => void
}

export function SecretCardActions({
  secretId, status, onDelete, onBurn, onExtend, isBurning, isExtending,
  showBurnDialog, onToggleBurnDialog, showExtendExpiryDialog, onToggleExtendExpiryDialog,
  newExpirationHours, setNewExpirationHours,
}: SecretCardActionsProps) {
  return (
    <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.01] px-5 py-3">
      <div className="flex gap-2">
        {status === "active" && (
          <>
            {/* Burn dialog */}
            <Dialog open={showBurnDialog} onOpenChange={onToggleBurnDialog}>
              <DialogTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/15 bg-red-500/5 text-red-400 transition-all hover:border-red-500/30 hover:bg-red-500/10">
                  <Flame className="h-3.5 w-3.5" />
                </button>
              </DialogTrigger>
              <DialogContent className="border-white/5 bg-[#0d0d14] text-white">
                <DialogHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                    <Flame className="h-5 w-5 text-red-400" />
                  </div>
                  <DialogTitle className="text-center text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Burn Secret Now?
                  </DialogTitle>
                </DialogHeader>
                <p className="text-center text-sm text-[#6a6a7a]">
                  This action cannot be undone. The secret will be permanently destroyed and no longer viewable.
                </p>
                <div className="mt-2 flex gap-3">
                  <button onClick={() => onToggleBurnDialog(false)} className="flex-1 rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10">
                    Cancel
                  </button>
                  <button onClick={onBurn} disabled={isBurning} className="flex-1 rounded-lg border border-red-500/20 bg-red-500/10 py-2.5 text-sm font-bold text-red-400 transition-all hover:bg-red-500/20 disabled:opacity-50">
                    {isBurning ? "Burning..." : "Burn Now"}
                  </button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Extend expiry dialog */}
            <Dialog open={showExtendExpiryDialog} onOpenChange={onToggleExtendExpiryDialog}>
              <DialogTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C9A84C]/15 bg-[#C9A84C]/5 text-[#C9A84C] transition-all hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/10">
                  <PlusCircle className="h-3.5 w-3.5" />
                </button>
              </DialogTrigger>
              <DialogContent className="border-white/5 bg-[#0d0d14] text-white">
                <DialogHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10">
                    <PlusCircle className="h-5 w-5 text-[#C9A84C]" />
                  </div>
                  <DialogTitle className="text-center text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Extend Secret Expiry
                  </DialogTitle>
                </DialogHeader>
                <p className="text-center text-sm text-[#6a6a7a]">Choose a new expiration time for this secret.</p>
                <div className="mt-2 space-y-4">
                  <Select value={newExpirationHours.toString()} onValueChange={(v) => setNewExpirationHours(Number(v))}>
                    <SelectTrigger className="rounded-lg border-white/5 bg-white/[0.03] text-white focus:border-[#C9A84C]/40 focus:ring-0">
                      <SelectValue placeholder="Select new expiration" />
                    </SelectTrigger>
                    <SelectContent className="border-white/5 bg-[#0d0d14] text-white">
                      {SECRET_EXPIRATION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value.toString()} className="text-[#8a8a9a] focus:bg-[#C9A84C]/10 focus:text-white">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-3">
                    <button onClick={() => onToggleExtendExpiryDialog(false)} className="flex-1 rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10">
                      Cancel
                    </button>
                    <button onClick={() => onExtend(newExpirationHours)} disabled={isExtending} className="flex-1 rounded-lg bg-[#C9A84C] py-2.5 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] disabled:opacity-50">
                      {isExtending ? "Extending..." : "Extend"}
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      {onDelete && (
        <button onClick={() => onDelete(secretId)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 text-[#4a4a5a] transition-all hover:border-red-500/20 hover:bg-red-500/5 hover:text-red-400">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}