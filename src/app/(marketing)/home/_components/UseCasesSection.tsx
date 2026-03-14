"use client";

import { Code2, Building2, Users } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

const useCases = [
  {
    icon: Code2,
    category: "Developers & DevOps",
    headline: "Ship secrets safely.",
    items: [
      "Share API keys and tokens during onboarding without email traces",
      "Rotate credentials securely across distributed teams",
      "Pass database passwords through CI/CD without logging exposure",
      "Send SSH private keys with guaranteed single-use destruction",
      "Deliver environment variables for staging and production",
    ],
  },
  {
    icon: Building2,
    category: "Enterprises & Compliance",
    headline: "Meet your audit requirements.",
    items: [
      "Enforce least-privilege access with time-bounded secrets",
      "Satisfy SOC 2, HIPAA, and ISO 27001 data handling policies",
      "Replace insecure email attachments with encrypted ephemeral links",
      "Provide auditable, access-logged secret delivery",
      "Reduce insider threat exposure with automatic expiration",
    ],
  },
  {
    icon: Users,
    category: "Teams & Individuals",
    headline: "Privacy for everyone.",
    items: [
      "Share Wi-Fi passwords without messaging history risk",
      "Send confidential documents to contractors or partners",
      "Distribute account credentials during transitions",
      "Exchange sensitive personal information without permanence",
      "Share temporary access codes with zero residue",
    ],
  },
];

export function UseCasesSection() {
  return (
    <section className="relative border-t border-white/5 bg-[#0a0a0f] py-24 lg:py-36">
      {/* Subtle background glow */}
      <div className="absolute  max-w-full left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/3 blur-[120px] pointer-events-none" />

      <div className="container relative mx-auto px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8a9a]">
              Use Cases
            </span>
          </div>
          <h2
            className="mb-5 text-4xl font-bold text-white lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Trusted across industries.
            <br />
            <span className="text-[#C9A84C]">Built for professionals.</span>
          </h2>
          <p className="text-lg text-[#6a6a7a]">
            From solo developers to Fortune 500 security teams, CipherOnce
            handles the secrets that matter most.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {useCases.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-300 hover:border-[#C9A84C]/15 hover:bg-white/[0.04]"
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10">
                    <Icon className="h-5 w-5 text-[#C9A84C]" />
                  </div>
                  <div className="mb-1 text-xs font-bold uppercase tracking-widest text-[#C9A84C]">
                    {group.category}
                  </div>
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {group.headline}
                  </h3>
                </div>

                {/* Divider */}
                <div className="mb-6 h-px bg-gradient-to-r from-[#C9A84C]/20 to-transparent" />

                {/* Items */}
                <ul className="space-y-3.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C] opacity-80" />
                      <span className="text-sm leading-relaxed text-[#6a6a7a]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}