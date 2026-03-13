"use client";

import { Shield, ArrowRight, Lock, Eye, Zap } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0f] flex items-center">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#C9A84C]/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1a1a2e]/80 rounded-full blur-[100px] pointer-events-none" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl">
          {/* Badge */}
          <div className="mb-10 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-5 py-2.5">
              <div className="h-1.5 w-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C9A84C]">
                Zero-Knowledge · End-to-End Encrypted
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1
            className="mb-8 text-center font-bold leading-[1.05] tracking-tight text-white"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Secrets Shared Once.
            <br />
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "1.5px #C9A84C",
              }}
            >
              Gone Forever.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg leading-relaxed text-[#8a8a9a]">
            CipherOnce encrypts your passwords, API keys, and confidential
            messages client-side — generating a self-destructing link that
            vanishes after one view or expiration. No server ever sees your
            plaintext.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/create" passHref>
              <button className="group relative flex items-center gap-3 overflow-hidden rounded-lg bg-[#C9A84C] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#0a0a0f] shadow-[0_0_40px_rgba(201,168,76,0.25)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(201,168,76,0.4)]">
                <span className="relative z-10">Create Secure Share</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0 skew-x-12" />
              </button>
            </Link>
            <Link href="#how-it-works">
              <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold tracking-wide text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white">
                See How It Works
              </button>
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-white/5 pt-10">
            {[
              { icon: Lock, label: "AES-256-GCM Encryption" },
              { icon: Eye, label: "Zero Server Knowledge" },
              { icon: Zap, label: "Self-Destructs on Access" },
              { icon: Shield, label: "No Tracking · No Logs" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 text-[#C9A84C]" />
                <span className="text-xs font-medium tracking-wide text-[#6a6a7a]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}