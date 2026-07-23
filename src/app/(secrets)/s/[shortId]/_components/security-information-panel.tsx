"use client";

import { Shield, Lock, Eye, Clock, Key, Server, CheckCircle2 } from "lucide-react";
import { formatTimeRemaining } from "@/lib/utils";
import type { Secret } from "../_types";

interface SecurityInformationPanelProps {
  secret: Secret;
}

export function SecurityInformationPanel({ secret }: SecurityInformationPanelProps) {
  const items = [
    {
      icon: Lock,
      label: "Encryption",
      value: "AES-256-GCM",
      sub: "Your browser encrypts before upload",
    },
    {
      icon: Key,
      label: "Key Location",
      value: "URL Fragment",
      sub: "Decryption key never reaches our server",
    },
    {
      icon: Server,
      label: "Server Access",
      value: "Zero Knowledge",
      sub: "We store only encrypted data",
    },
    {
      icon: Eye,
      label: "Maximum Views",
      value: secret.max_views === -1 ? "Unlimited" : String(secret.max_views),
      sub: secret.max_views === -1 ? "Secret remains accessible" : "Deleted after viewing",
    },
    {
      icon: Clock,
      label: "Expires",
      value: new Date(secret.expires_at) > new Date()
        ? formatTimeRemaining(secret.expires_at)
        : "Expired",
      sub: new Date(secret.expires_at) > new Date()
        ? "Permanently deleted after expiry"
        : "This secret is no longer available",
    },
    {
      icon: Eye,
      label: "Content Size",
      value: secret.encrypted_content
        ? `${((new TextEncoder().encode(secret.encrypted_content).length) / 1024).toFixed(1)} KB`
        : secret.file_size
          ? `${(secret.file_size / 1024).toFixed(1)} KB`
          : "N/A",
    },
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
          <Shield className="h-4 w-4 text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Security & Privacy</p>
          <p className="text-xs text-[#4a4a5a]">What happens to your data, explained</p>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="group flex items-start gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3.5 py-2.5 transition-all hover:border-white/[0.06] hover:bg-white/[0.03]"
          >
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#C9A84C]/10 bg-[#C9A84C]/5">
              <item.icon className="h-3.5 w-3.5 text-[#C9A84C]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4a4a5a]">
                  {item.label}
                </p>
                <p className="text-xs font-semibold text-white">{item.value}</p>
              </div>
              {item.sub && (
                <p className="mt-0.5 text-[10px] leading-relaxed text-[#4a4a5a]">{item.sub}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.03] px-3.5 py-2.5">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
        <p className="text-xs text-emerald-400/70">
          Encrypted in your browser · We never see your content · You are in control
        </p>
      </div>
    </div>
  );
}
