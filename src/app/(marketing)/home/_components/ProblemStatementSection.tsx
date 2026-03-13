"use client";

import { AlertTriangle, Mail, MessageSquare, Database } from "lucide-react";

const risks = [
  {
    icon: Mail,
    title: "Email Inboxes",
    desc: "Messages persist indefinitely across backups, servers, and third-party integrations — long after you think they're gone.",
  },
  {
    icon: MessageSquare,
    title: "Chat & Slack",
    desc: "Workspace breaches expose years of message history. Deleted messages are recoverable by platform administrators.",
  },
  {
    icon: Database,
    title: "Cloud Storage",
    desc: "Shared drives retain version history. A single permission misconfiguration can expose sensitive data to anyone.",
  },
];

export function ProblemStatementSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#0a0a0f] py-24 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-[#C9A84C]/3 to-transparent pointer-events-none" />

      <div className="container relative mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left: Copy */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-2">
                <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-red-400">
                  The Problem
                </span>
              </div>

              <h2
                className="mb-6 text-4xl font-bold leading-tight text-white lg:text-5xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Your tools were never
                <br />
                <span className="text-[#C9A84C]">built for secrets.</span>
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-[#6a6a7a]">
                Every time you paste a password into Slack or email an API key,
                you're creating a permanent record that lives in server logs,
                backups, and breach databases — invisible to you, accessible to
                attackers.
              </p>

              <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-6">
                <p className="mb-2 text-sm font-bold text-red-400 uppercase tracking-widest">
                  Real-World Breach Scenario
                </p>
                <p className="text-sm leading-relaxed text-[#8a8a9a]">
                  A developer shares database credentials via Slack. Six months
                  later, an attacker gains access to the workspace. The message
                  was "deleted" — but message retention exports are recoverable.
                  Full database compromise follows within hours.
                </p>
              </div>
            </div>

            {/* Right: Risk cards */}
            <div className="space-y-4">
              {risks.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group flex gap-5 rounded-xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[#C9A84C]/15 hover:bg-white/[0.04]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="mb-1.5 text-sm font-bold text-white">{title}</p>
                    <p className="text-sm leading-relaxed text-[#6a6a7a]">{desc}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/5 p-6 text-center">
                <p className="text-base font-bold text-[#C9A84C]">
                  CipherOnce eliminates the attack surface entirely.
                </p>
                <p className="mt-1 text-sm text-[#8a8a9a]">
                  Secrets expire. Links self-destruct. Nothing persists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}