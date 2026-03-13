"use client";

import { Lock, Share2, Trash2, KeyRound, ShieldCheck, Cpu } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Lock,
    title: "Encrypt Locally",
    desc: "Your secret is encrypted directly in your browser using AES-256-GCM before any data leaves your device. The server receives only ciphertext — never plaintext.",
    color: "text-[#C9A84C]",
    border: "border-[#C9A84C]/20",
    bg: "bg-[#C9A84C]/10",
  },
  {
    number: "02",
    icon: Share2,
    title: "Share the Link",
    desc: "A unique, time-limited URL is generated. The decryption key is embedded in the URL fragment (#) — never transmitted to our servers. Only the link holder can decrypt.",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/10",
  },
  {
    number: "03",
    icon: Trash2,
    title: "Self-Destructs",
    desc: "After the recipient views the secret — or upon expiration — the encrypted payload is permanently deleted from all storage. No recovery. No residue.",
    color: "text-red-400",
    border: "border-red-500/20",
    bg: "bg-red-500/10",
  },
];

const technicalDetails = [
  { icon: KeyRound, title: "AES-256-GCM Encryption", desc: "Industry-standard authenticated encryption with 256-bit keys and a unique IV per secret." },
  { icon: ShieldCheck, title: "Client-Side Key Derivation", desc: "Encryption keys are generated locally and embedded in the URL fragment, never sent to any server." },
  { icon: Cpu, title: "Zero Server-Side Knowledge", desc: "Our infrastructure stores only ciphertext. Without the URL fragment, no one — including us — can decrypt your data." },
  { icon: Trash2, title: "Guaranteed Deletion", desc: "Atomic deletion on first access. Database entries are purged immediately; no soft-deletes or recovery paths exist." },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative border-t border-white/5 bg-[#0a0a0f] py-24 lg:py-36">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8a9a]">How It Works</span>
          </div>
          <h2
            className="mb-5 text-4xl font-bold text-white lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Three steps. Absolute security.
          </h2>
          <p className="text-lg text-[#6a6a7a]">
            Military-grade protection that takes seconds to set up.
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto mb-20 max-w-5xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`relative rounded-2xl border ${step.border} bg-white/[0.02] p-8 transition-all duration-300 hover:bg-white/[0.04]`}
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.bg} border ${step.border}`}>
                      <Icon className={`h-5 w-5 ${step.color}`} />
                    </div>
                    <span
                      className="text-5xl font-black text-white/[0.04] leading-none"
                      style={{ fontFamily: "monospace" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[#6a6a7a]">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mx-auto max-w-5xl rounded-2xl border border-[#C9A84C]/15 bg-[#C9A84C]/[0.03] p-10">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#C9A84C]">
            Technical Implementation
          </div>
          <h3
            className="mb-8 text-2xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Built on cryptographic fundamentals
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {technicalDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <div key={detail.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10">
                    <Icon className="h-4.5 w-4.5 text-[#C9A84C]" style={{ width: 18, height: 18 }} />
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold text-white">{detail.title}</p>
                    <p className="text-sm leading-relaxed text-[#6a6a7a]">{detail.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}