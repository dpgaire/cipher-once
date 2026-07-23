"use client";

import { Check, Copy, Timer, Shield } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SecureCopyButtonProps {
  text: string;
  className?: string;
}

const CLEAR_OPTIONS = [
  { label: "30 seconds", value: 30 },
  { label: "60 seconds", value: 60 },
  { label: "2 minutes", value: 120 },
] as const;

export function SecureCopyButton({ text, className }: SecureCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [clearAfter, setClearAfter] = useState<number>(30);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const clearClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("");
    } catch {
    }
  }, []);

  useEffect(() => {
    if (timeRemaining === null) return;
    if (timeRemaining <= 0) {
      clearClipboard();
      setTimeRemaining(null);
      return;
    }
    const interval = setInterval(() => {
      setTimeRemaining((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining, clearClipboard]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeRemaining(clearAfter);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds >= 60) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}:${s.toString().padStart(2, "0")}`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleCopy}
        className={`group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl text-sm font-semibold transition-all duration-200 ${
          copied
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            : "bg-[#C9A84C] text-[#0a0a0f] hover:shadow-[0_0_24px_rgba(201,168,76,0.25)]"
        } py-3.5 ${className ?? ""}`}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied to clipboard
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy to Clipboard
          </>
        )}
      </button>

      <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <Timer className="h-4 w-4 text-[#6a6a7a]" />
        <div className="flex-1">
          <p className="text-[11px] text-[#6a6a7a]">Auto-clear clipboard after</p>
        </div>
        {timeRemaining !== null ? (
          <div className="flex items-center gap-2">
            <Shield className={`h-3.5 w-3.5 ${timeRemaining <= 10 ? "text-amber-400 animate-pulse" : "text-emerald-400"}`} />
            <span className="text-xs font-mono font-semibold text-[#C9A84C] min-w-[3rem] text-right tabular-nums">
              {formatTime(timeRemaining)}
            </span>
          </div>
        ) : (
          <Select
            value={String(clearAfter)}
            onValueChange={(value) => setClearAfter(Number(value))}
          >
            <SelectTrigger className="h-8 w-[110px] border border-white/5 bg-white/[0.03] text-xs text-white rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border border-white/10 bg-[#0a0a0f] text-white">
              {CLEAR_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={String(opt.value)} className="text-xs">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
