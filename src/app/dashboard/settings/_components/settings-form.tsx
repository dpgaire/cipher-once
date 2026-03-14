"use client";

import { useSettings } from "../_hooks/use-settings";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Info, Settings } from "lucide-react";
import { MAX_VIEW_OPTIONS, SECRET_EXPIRATION_OPTIONS } from "@/lib/utils";
import { useState } from "react";
import { PasswordPatternModal } from "./password-pattern-modal";
import { Skeleton } from "@/components/ui/skeleton";

function SettingsSkeleton() {
  return (
    <div className="container max-w-7xl mx-auto py-8 space-y-6">
      <Skeleton className="h-8 w-32 rounded-lg bg-white/5" />
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-7 space-y-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="h-3 w-40 rounded bg-white/5" />
            <Skeleton className="h-11 w-full rounded-lg bg-white/5" />
          </div>
        ))}
        <Skeleton className="h-11 w-32 rounded-lg bg-white/5" />
      </div>
    </div>
  );
}

const selectClass = "rounded-lg border-white/5 bg-white/[0.03] text-white focus:border-[#C9A84C]/40 focus:ring-0 [&_svg]:text-[#6a6a7a] data-[placeholder]:text-[#4a4a5a]";
const selectContentClass = "border-white/5 bg-[#0d0d14] text-white";
const selectItemClass = "text-[#8a8a9a] focus:bg-[#C9A84C]/10 focus:text-white";

export function SettingsForm() {
  const { loading, saving, settings, handleSave, handleInputChange } = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (loading) return <SettingsSkeleton />;

  return (
    <div className="container max-w-7xl mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        Settings
      </h1>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-7">
        {/* Card header */}
        <div className="mb-7 flex items-center gap-3 border-b border-white/5 pb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10">
            <Settings className="h-4 w-4 text-[#C9A84C]" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Default Secret Settings</p>
            <p className="text-xs text-[#4a4a5a]">Configure your defaults when creating a new secret</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Allow download toggle */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="mb-1 text-sm font-semibold text-white">Allow file download by default</p>
              <p className="text-xs text-[#4a4a5a]">
                If disabled, recipients can preview files but cannot download them unless explicitly allowed.
              </p>
            </div>
            <Switch
              checked={settings.defaultAllowDownload}
              onCheckedChange={(checked) => handleInputChange("defaultAllowDownload", checked)}
              className="data-[state=checked]:bg-[#C9A84C]"
            />
          </div>

          {/* Watermark */}
          {!settings.defaultAllowDownload && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
                Default watermark text
              </label>
              <input
                type="text"
                value={settings.watermarkText || ""}
                onChange={(e) => handleInputChange("watermarkText", e.target.value)}
                placeholder="e.g. cipheronce.com"
                className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all focus:border-[#C9A84C]/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
              />
              <p className="text-[10px] text-[#4a4a5a]">
                Embedded into image & PDF previews when downloads are disabled.
              </p>
            </div>
          )}

          {/* Theme */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">Theme</label>
            <Select value={settings.theme} onValueChange={(value) => handleInputChange("theme", value)}>
              <SelectTrigger className={selectClass}><SelectValue placeholder="Select theme" /></SelectTrigger>
              <SelectContent className={selectContentClass}>
                <SelectItem value="light" className={selectItemClass}>Light</SelectItem>
                <SelectItem value="dark" className={selectItemClass}>Dark</SelectItem>
                <SelectItem value="system" className={selectItemClass}>System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Default expiration */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">Default expiration</label>
            <Select value={String(settings.defaultExpiration)} onValueChange={(value) => handleInputChange("defaultExpiration", value)}>
              <SelectTrigger className={selectClass}><SelectValue placeholder="Select expiration" /></SelectTrigger>
              <SelectContent className={selectContentClass}>
                {SECRET_EXPIRATION_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={String(opt.value)} className={selectItemClass}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Default view limit */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">Default view limit</label>
            <Select value={String(settings.defaultViewLimit)} onValueChange={(value) => handleInputChange("defaultViewLimit", value)}>
              <SelectTrigger className={selectClass}><SelectValue placeholder="Select view limit" /></SelectTrigger>
              <SelectContent className={selectContentClass}>
                {MAX_VIEW_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={String(opt.value)} className={selectItemClass}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Default password */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">Default password</label>
              <button type="button" onClick={() => setIsModalOpen(true)} className="text-[#4a4a5a] transition-colors hover:text-[#C9A84C]">
                <Info className="h-3.5 w-3.5" />
              </button>
            </div>
            <input
              type="password"
              value={settings.defaultPassword}
              onChange={(e) => handleInputChange("defaultPassword", e.target.value)}
              placeholder="Leave blank for no password"
              className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-[#4a4a5a] outline-none transition-all focus:border-[#C9A84C]/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.08)]"
            />
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] px-6 py-3 text-sm font-bold text-[#0a0a0f] transition-all hover:shadow-[0_0_24px_rgba(201,168,76,0.3)] disabled:opacity-50"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saving ? "Saving..." : "Save Settings"}
            {!saving && <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />}
          </button>
        </div>
      </div>

      <PasswordPatternModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}