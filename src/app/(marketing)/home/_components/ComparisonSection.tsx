"use client";

import { CheckCircle2, X } from "lucide-react";

const rows = [
  { feature: "End-to-end encryption", email: false, cipher: true },
  { feature: "Zero server-side knowledge", email: false, cipher: true },
  { feature: "Self-destructing messages", email: false, cipher: true },
  { feature: "No data retention after expiry", email: false, cipher: true },
  { feature: "No registration required", email: false, cipher: true },
  { feature: "Immune to server-side breaches", email: false, cipher: true },
  { feature: "One-time access enforcement", email: false, cipher: true },
  { feature: "URL-embedded decryption key", email: false, cipher: true },
  { feature: "Access notifications", email: false, cipher: true },
  { feature: "Open-source & auditable", email: false, cipher: true },
];

export function ComparisonSection() {
  return (
    <section className="relative border-t border-white/5 bg-[#0a0a0f] py-24 lg:py-36">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8a9a]">
              Comparison
            </span>
          </div>
          <h2
            className="mb-5 text-4xl font-bold text-white lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Why not just use
            <br />
            <span className="text-[#C9A84C]">email or chat?</span>
          </h2>
          <p className="text-lg text-[#6a6a7a]">
            General-purpose communication tools were not designed with secrets
            in mind. The difference is architectural, not cosmetic.
          </p>
        </div>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/5">
          {/* Header */}
          <div className="grid grid-cols-[1fr_140px_140px] border-b border-white/5 bg-white/[0.03]">
            <div className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#6a6a7a]">
              Security Feature
            </div>
            <div className="flex items-center justify-center px-6 py-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#6a6a7a]">
                Email / Chat
              </span>
            </div>
            <div className="flex items-center justify-center bg-[#C9A84C]/5 px-6 py-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
                CipherOnce
              </span>
            </div>
          </div>

          <div className="divide-y divide-white/[0.03]">
            {rows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[1fr_140px_140px] transition-colors hover:bg-white/[0.02] ${
                  i % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
                }`}
              >
                <div className="px-6 py-4 text-sm text-[#8a8a9a]">
                  {row.feature}
                </div>
                <div className="flex items-center justify-center px-6 py-4">
                  <X className="h-4 w-4 text-red-500/60" />
                </div>
                <div className="flex items-center justify-center bg-[#C9A84C]/[0.02] px-6 py-4">
                  <CheckCircle2 className="h-4 w-4 text-[#C9A84C]" />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-white/5 bg-[#C9A84C]/[0.03] px-6 py-5 text-center">
            <p className="text-sm font-semibold text-[#C9A84C]">
              CipherOnce was built exclusively for secrets — not retrofitted from a general-purpose tool.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}