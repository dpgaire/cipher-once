"use client";

import { Flame, Shield, Trash2, X } from "lucide-react";
import { useState } from "react";

interface DestroyConfirmationProps {
  onDestroy: () => void;
  isBurned: boolean;
}

export function DestroyConfirmation({
  onDestroy,
  isBurned,
}: DestroyConfirmationProps) {
  const [confirmed, setConfirmed] = useState(false);

  if (isBurned) {
    return (
      <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
            <Shield className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-emerald-400">Secret Destroyed</p>
            <p className="text-xs leading-relaxed text-[#6a6a7a]">
              This secret has been permanently deleted from our servers.
              No copy remains. The link is no longer valid.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!confirmed) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
            <Flame className="h-5 w-5 text-red-400" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-bold text-white">Destroy this secret</p>
            <p className="text-xs leading-relaxed text-[#6a6a7a]">
              Permanently delete this secret from our servers.
              This action cannot be undone.
            </p>
          </div>
        </div>

        <button
          onClick={() => setConfirmed(true)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 py-3 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]"
        >
          <Trash2 className="h-4 w-4" />
          Destroy This Secret
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
          <Flame className="h-5 w-5 text-red-400" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-bold text-red-400">Are you sure?</p>
          <p className="text-xs leading-relaxed text-[#6a6a7a]">
            This will permanently delete the encrypted data from our servers.
            The secret will be gone forever.
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => setConfirmed(false)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
        >
          <X className="h-4 w-4" />
          Cancel
        </button>
        <button
          onClick={onDestroy}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-sm font-bold text-white transition-all hover:bg-red-600 hover:shadow-[0_0_24px_rgba(239,68,68,0.3)]"
        >
          <Trash2 className="h-4 w-4" />
          Delete Forever
        </button>
      </div>
    </div>
  );
}
