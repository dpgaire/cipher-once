"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
}

export function CopyButton({ text, label = "Copy", className, variant = "outline" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const isDefault = variant === "default";

  return (
    <button
      onClick={handleCopy}
      className={`group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg text-sm font-semibold transition-all duration-200 ${
        isDefault
          ? "bg-[#C9A84C] py-3 text-[#0a0a0f] hover:shadow-[0_0_24px_rgba(201,168,76,0.3)]"
          : "border border-white/10 bg-white/5 py-2.5 text-white hover:border-[#C9A84C]/30 hover:bg-white/10"
      } ${copied ? (isDefault ? "bg-emerald-500 shadow-none" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400") : ""} ${className ?? ""}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {label}
        </>
      )}
      {!copied && isDefault && (
        <div className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0 skew-x-12" />
      )}
    </button>
  );
}