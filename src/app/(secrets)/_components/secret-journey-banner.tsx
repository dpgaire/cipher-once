"use client";

import { Lock, Upload, Eye, Flame, CheckCircle2, ArrowRight } from "lucide-react";

export type JourneyStep = "create" | "encrypt" | "upload" | "deliver" | "view" | "destroy";

interface SecretJourneyBannerProps {
  currentStep: JourneyStep;
  completedSteps?: JourneyStep[];
  compact?: boolean;
}

const STEPS: { key: JourneyStep; label: string; icon: React.ElementType }[] = [
  { key: "create", label: "Created", icon: CheckCircle2 },
  { key: "encrypt", label: "Encrypted", icon: Lock },
  { key: "upload", label: "Uploaded", icon: Upload },
  { key: "deliver", label: "Delivered", icon: ArrowRight },
  { key: "view", label: "Viewed", icon: Eye },
  { key: "destroy", label: "Destroyed", icon: Flame },
];

function getStepIndex(step: JourneyStep) {
  return STEPS.findIndex((s) => s.key === step);
}

export function SecretJourneyBanner({ currentStep, completedSteps = [], compact }: SecretJourneyBannerProps) {
  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentIndex;
          const isCompleted = completedSteps.includes(step.key) || index < currentIndex;
          const isLast = index === STEPS.length - 1;

          return (
            <div key={step.key} className="flex items-center flex-1">
              <div className={`flex flex-1 flex-col items-center gap-1`}>
                <div
                  className={`flex items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    compact ? "h-5 w-5" : "h-8 w-8"
                  } ${
                    isCompleted
                      ? "border-emerald-500/60 bg-emerald-500/20"
                      : isActive
                        ? "border-[#C9A84C]/60 bg-[#C9A84C]/20 shadow-[0_0_12px_rgba(201,168,76,0.15)]"
                        : "border-white/5 bg-white/[0.02]"
                  }`}
                >
                  <Icon
                    className={`transition-all duration-300 ${
                      compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"
                    } ${
                      isCompleted
                        ? "text-emerald-400"
                        : isActive
                          ? "text-[#C9A84C]"
                          : "text-[#3a3a4a]"
                    }`}
                  />
                </div>
                {!compact && (
                  <span
                    className={`text-[9px] font-medium tracking-wider transition-all duration-300 ${
                      isCompleted
                        ? "text-emerald-400/80"
                        : isActive
                          ? "text-[#C9A84C]"
                          : "text-[#3a3a4a]"
                    }`}
                  >
                    {step.label}
                  </span>
                )}
              </div>
              {!isLast && (
                <div
                  className={`h-px flex-1 mx-1 transition-all duration-500 ${
                    index < currentIndex
                      ? "bg-gradient-to-r from-emerald-500/40 to-emerald-500/10"
                      : "bg-white/5"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
