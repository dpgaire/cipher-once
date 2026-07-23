"use client";

import { CheckCircle2, Eye } from "lucide-react";
import { useState } from "react";

interface RecipientChecklistProps {
  onReveal: () => void;
  disabled?: boolean;
}

export function RecipientChecklist({ onReveal, disabled }: RecipientChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const items = [
    "I am in a private location where no one can see my screen",
    "I am the correct recipient of this secret",
    "I am ready to copy or save the information",
  ];

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const allChecked = checkedItems.size === items.length;

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10">
          <CheckCircle2 className="h-4 w-4 text-[#C9A84C]" />
        </div>
        <p className="text-sm font-bold text-white">Before Revealing</p>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => {
          const isChecked = checkedItems.has(index);
          return (
            <button
              key={index}
              onClick={() => toggleItem(index)}
              className="flex w-full items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-left transition-all hover:bg-white/[0.04]"
            >
              <div
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                  isChecked
                    ? "border-emerald-500/50 bg-emerald-500/20"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {isChecked && (
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                )}
              </div>
              <p
                className={`text-sm transition-colors ${
                  isChecked ? "text-[#6a6a7a] line-through" : "text-white"
                }`}
              >
                {item}
              </p>
            </button>
          );
        })}
      </div>

      <button
        onClick={onReveal}
        disabled={!allChecked || disabled}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#C9A84C] py-4 text-sm font-bold text-[#0a0a0f] shadow-[0_0_30px_rgba(201,168,76,0.2)] transition-all hover:shadow-[0_0_50px_rgba(201,168,76,0.4)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Eye className="h-4 w-4" />
        Reveal Secret
        <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
      </button>
    </div>
  );
}
