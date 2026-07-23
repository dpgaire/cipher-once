"use client";

import { Clock, Eye, Lock, Shield, FileIcon, CheckCircle2, UserCheck } from "lucide-react";

interface LivePreviewProps {
  content: string;
  selectedFile: File | null;
  expirationLabel: string;
  maxViews: number;
  requirePassphrase: boolean;
  requireAuth: boolean;
}

export function LivePreview({
  content,
  selectedFile,
  expirationLabel,
  maxViews,
  requirePassphrase,
  requireAuth,
}: LivePreviewProps) {
  const hasContent = content.trim().length > 0 || selectedFile;

  return (
    <div className="sticky top-16 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#4a4a5a]">
        Recipient Preview
      </p>

      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent">
        {/* Header */}
        <div className="border-b border-white/[0.04] px-5 py-5 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-[#C9A84C]/15 bg-[#C9A84C]/5">
            <Shield className="h-4 w-4 text-[#C9A84C]" />
          </div>
          <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {hasContent ? "Encrypted Secret" : "Waiting for content"}
          </h3>
          <p className="mt-0.5 text-xs text-[#6a6a7a]">
            {hasContent
              ? "Someone will share this with you securely"
              : "Enter content to see a preview"}
          </p>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2 px-5 py-3">
          <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4a4a5a]">Expires</p>
            <p className="text-xs font-semibold text-white mt-0.5">{hasContent ? expirationLabel : "—"}</p>
          </div>
          <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4a4a5a]">Views</p>
            <p className="text-xs font-semibold text-white mt-0.5">{hasContent ? (maxViews === -1 ? "Unlimited" : `${maxViews}`) : "—"}</p>
          </div>
          <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4a4a5a]">Password</p>
            <p className="text-xs font-semibold text-white mt-0.5">{hasContent ? (requirePassphrase ? "Required" : "None") : "—"}</p>
          </div>
          <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4a4a5a]">Auth</p>
            <p className="text-xs font-semibold text-white mt-0.5">{hasContent ? (requireAuth ? "Required" : "Optional") : "—"}</p>
          </div>
        </div>

        {/* Content preview */}
        {content && (
          <div className="border-t border-white/[0.04] px-5 py-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#4a4a5a]">Content preview</p>
            <div className="rounded-lg border border-white/[0.04] bg-[#0d0d14] p-3">
              <pre className="line-clamp-3 whitespace-pre-wrap break-all font-mono text-xs text-[#8a8a9a] select-none blur-sm">
                {content}
              </pre>
            </div>
            <p className="mt-1.5 text-right text-xs text-[#4a4a5a]">{content.length} chars</p>
          </div>
        )}

        {/* File */}
        {selectedFile && !content && (
          <div className="border-t border-white/[0.04] px-5 py-4">
            <div className="flex items-center gap-3 rounded-lg border border-[#C9A84C]/10 bg-[#C9A84C]/5 px-3 py-2.5">
              <FileIcon className="h-4 w-4 text-[#C9A84C]" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{selectedFile.name}</p>
                <p className="text-xs text-[#4a4a5a]">{Math.round(selectedFile.size / 1024)} KB</p>
              </div>
            </div>
          </div>
        )}

        {/* Mock reveal */}
        <div className="px-5 pb-5">
          <button
            disabled
            className="w-full rounded-lg bg-[#C9A84C]/40 py-3 text-sm font-bold text-[#0a0a0f]/60 cursor-not-allowed"
          >
            {hasContent ? "Reveal Secret" : "Awaiting content"}
          </button>
        </div>
      </div>

      {/* Trust badge */}
      <div className="flex items-center gap-2 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.03] px-3 py-2.5">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
        <p className="text-xs text-emerald-400/70">
          {hasContent
            ? "Encrypted in your browser · We never see the content"
            : "Content will be encrypted in your browser"}
        </p>
      </div>
    </div>
  );
}
