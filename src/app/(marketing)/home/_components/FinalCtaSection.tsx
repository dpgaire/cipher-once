"use client";

import { ArrowRight, Shield, Lock, Eye } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "AES-256", label: "Encryption standard" },
  { value: "0", label: "Data retained after expiry" },
  { value: "100%", label: "Client-side encryption" },
  { value: "Open", label: "Source & auditable" },
];

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#0a0a0f] py-24 lg:py-40">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/5 blur-[140px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* Stats row */}
        <div className="mx-auto mb-20 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-5 text-center"
            >
              <div
                className="mb-1 text-2xl font-black text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-[#6a6a7a]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon cluster */}
          <div className="mb-10 flex justify-center">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-28 w-28 rounded-full bg-[#C9A84C]/10 blur-xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 shadow-[0_0_40px_rgba(201,168,76,0.15)]">
                <Lock className="h-9 w-9 text-[#C9A84C]" />
              </div>
            </div>
          </div>

          <h2
            className="mb-6 font-bold leading-tight text-white"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
            }}
          >
            Your secrets deserve better
            <br />
            than an inbox.
          </h2>

          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-[#6a6a7a]">
            Join thousands of developers, security teams, and privacy-conscious
            professionals who use CipherOnce to share what matters — once, safely,
            without a trace.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/create" passHref>
              <button className="group relative flex items-center gap-3 overflow-hidden rounded-lg bg-[#C9A84C] px-10 py-4 text-sm font-bold uppercase tracking-widest text-[#0a0a0f] shadow-[0_0_50px_rgba(201,168,76,0.3)] transition-all duration-300 hover:shadow-[0_0_80px_rgba(201,168,76,0.5)]">
                <span className="relative z-10">Create Your First Secret</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0 skew-x-12" />
              </button>
            </Link>
          </div>

          {/* Assurance row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: Shield, text: "No signup required" },
              { icon: Eye, text: "No tracking" },
              { icon: Lock, text: "Free forever" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-[#C9A84C]" />
                <span className="text-xs text-[#6a6a7a]">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}