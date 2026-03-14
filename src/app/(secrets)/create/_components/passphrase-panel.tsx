// ─── PassphrasePanel ────────────────────────────────────────────────────────
"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";
import { PasswordPatternModal } from "@/app/dashboard/settings/_components/password-pattern-modal";

interface PassphrasePanelProps {
  requirePassphrase: boolean;
  onRequirePassphraseChange: (require: boolean) => void;
  passphrase: string;
  onPassphraseChange: (passphrase: string) => void;
  disabled?: boolean;
}

export function PassphrasePanel({
  requirePassphrase, onRequirePassphraseChange,
  passphrase, onPassphraseChange, disabled = false,
}: PassphrasePanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <p className="text-sm font-semibold text-white">Require password</p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-[#4a4a5a] transition-colors hover:text-[#C9A84C]"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs text-[#4a4a5a]">Add an extra layer of protection</p>
        </div>
        <Switch
          id="passphrase-toggle"
          checked={requirePassphrase}
          onCheckedChange={onRequirePassphraseChange}
          disabled={disabled}
          className="data-[state=checked]:bg-[#C9A84C]"
        />
      </div>

      {requirePassphrase && (
        <div className="space-y-1.5">
          <label htmlFor="passphrase" className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
            Password
          </label>
          <input
            id="passphrase"
            type="password"
            placeholder="Enter a password or PIN (min. 4 characters)"
            value={passphrase}
            onChange={(e) => onPassphraseChange(e.target.value)}
            disabled={disabled}
            className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all duration-200 focus:border-[#C9A84C]/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)] disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="text-[10px] text-[#4a4a5a]">Recipients will need this to view the secret</p>
        </div>
      )}

      <PasswordPatternModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}