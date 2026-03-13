import { ShieldCheck } from "lucide-react";

export function SecurityNotice() {
  return (
    <div className="mt-5 flex items-start gap-4 rounded-xl border border-[#C9A84C]/15 bg-[#C9A84C]/[0.04] px-5 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10">
        <ShieldCheck className="h-4 w-4 text-[#C9A84C]" />
      </div>
      <div>
        <p className="mb-0.5 text-sm font-bold text-[#C9A84C]">End-to-End Encrypted</p>
        <p className="text-xs leading-relaxed text-[#6a6a7a]">
          Your secret is encrypted in your browser before being sent to our servers.
          We never see your unencrypted data — not even briefly.
        </p>
      </div>
    </div>
  );
}