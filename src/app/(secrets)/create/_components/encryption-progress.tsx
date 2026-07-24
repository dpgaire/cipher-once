"use client";

import { Key, Lock, Upload, Link, Check, Loader2 } from "lucide-react";

interface EncryptionProgressProps {
  isActive: boolean;
}

const STEPS = [
  { key: "generating", label: "Generating Key", icon: Key },
  { key: "encrypting", label: "Encrypting", icon: Lock },
  { key: "uploading", label: "Uploading", icon: Upload },
  { key: "creating", label: "Creating Link", icon: Link },
  { key: "done", label: "Done", icon: Check },
];

export function EncryptionProgress({ isActive }: EncryptionProgressProps) {
  if (!isActive) return null;

  return (
    <div className="rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 p-6 space-y-4">
      <div className="space-y-3">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isCurrent = index === 0;
          const isPast = false;

          return (
            <div key={step.key} className="flex items-center gap-3">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isPast
                    ? "bg-emerald-500/20 text-emerald-400"
                    : isCurrent
                      ? "bg-[#C9A84C]/20 text-[#C9A84C] animate-pulse"
                      : "bg-white/5 text-[#4a4a5a]"
                }`}
              >
                {isPast ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Icon className="h-3.5 w-3.5" />
                )}
              </div>
              <p
                className={`text-sm font-medium ${
                  isPast
                    ? "text-emerald-400"
                    : isCurrent
                      ? "text-white"
                      : "text-[#4a4a5a]"
                }`}
              >
                {step.label}
              </p>
              {isCurrent && (
                <Loader2 className="h-3 w-3 animate-spin text-[#C9A84C]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
