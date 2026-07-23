"use client";

import { Check, Circle, Lock, Upload, Eye, Flame, Clock } from "lucide-react";

interface SecretJourneyTimelineProps {
  createdAt: string;
  isViewed: boolean;
  isBurned: boolean;
}

const STEPS = [
  { key: "created", label: "Created", icon: Circle },
  { key: "encrypted", label: "Encrypted", icon: Lock },
  { key: "uploaded", label: "Uploaded", icon: Upload },
  { key: "waiting", label: "Waiting", icon: Clock },
  { key: "opened", label: "Opened", icon: Eye },
  { key: "viewed", label: "Viewed", icon: Eye },
  { key: "destroyed", label: "Destroyed", icon: Flame },
];

export function SecretJourneyTimeline({
  createdAt,
  isViewed,
  isBurned,
}: SecretJourneyTimelineProps) {
  const getStepStatus = (stepIndex: number): "complete" | "current" | "pending" => {
    if (isBurned && stepIndex === STEPS.length - 1) return "current";
    if (isViewed && stepIndex >= STEPS.length - 2) {
      if (stepIndex === STEPS.length - 2) return "current";
      if (stepIndex === STEPS.length - 1) return "pending";
    }
    if (stepIndex <= 2) return "complete";
    if (stepIndex === 3 && !isViewed) return "current";
    if (stepIndex >= 4) return isViewed ? (stepIndex === 4 ? "complete" : "pending") : "pending";
    return "pending";
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10">
          <Clock className="h-4 w-4 text-[#C9A84C]" />
        </div>
        <p className="text-sm font-bold text-white">Secret Journey</p>
      </div>

      <div className="relative">
        <div className="absolute left-[15px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-[#C9A84C]/40 via-[#C9A84C]/20 to-transparent" />

        <div className="space-y-0">
          {STEPS.map((step, index) => {
            const status = getStepStatus(index);
            const Icon = step.icon;

            return (
              <div key={step.key} className="relative flex items-start gap-4 pb-6 last:pb-0">
                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    status === "complete"
                      ? "border-emerald-500/30 bg-emerald-500/20"
                      : status === "current"
                        ? "border-[#C9A84C]/50 bg-[#C9A84C]/20 shadow-[0_0_12px_rgba(201,168,76,0.2)]"
                        : "border-white/5 bg-white/[0.02]"
                  }`}
                >
                  {status === "complete" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Icon
                      className={`h-3.5 w-3.5 ${
                        status === "current"
                          ? "text-[#C9A84C]"
                          : "text-[#4a4a5a]"
                      }`}
                    />
                  )}
                </div>

                <div className="flex flex-col justify-center min-h-8">
                  <p
                    className={`text-sm font-medium transition-colors ${
                      status === "complete"
                        ? "text-emerald-400"
                        : status === "current"
                          ? "text-white"
                          : "text-[#4a4a5a]"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.key === "created" && (
                    <p className="text-[10px] text-[#4a4a5a]">
                      {new Date(createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
