"use client";

import {
  ShieldCheck,
  Clock,
  Eye,
  FileKey,
  Globe,
  GitBranch,
  Bell,
  Fingerprint,
  Layers,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: ShieldCheck,
    title: "AES-256-GCM Encryption",
    desc: "Every secret is encrypted client-side with the gold standard in authenticated encryption — the same algorithm used by the U.S. government for classified data.",
    badge: "Core Security",
  },
  {
    icon: Fingerprint,
    title: "Zero-Knowledge Architecture",
    desc: "Our servers receive only ciphertext. The decryption key travels exclusively in your URL fragment, invisible to our infrastructure and network logs.",
    badge: "Privacy",
  },
  {
    icon: Clock,
    title: "Flexible Expiration",
    desc: "Set secrets to expire in 1 hour, 24 hours, 7 days, or on first view. Choose what fits your threat model. Expired data is deleted automatically.",
    badge: "Control",
  },
  {
    icon: Eye,
    title: "One-Time Access",
    desc: "Configure any secret for single-view destruction. The moment someone opens it, the ciphertext is purged from storage — unrecoverable by anyone.",
    badge: "Ephemeral",
  },
  {
    icon: FileKey,
    title: "File & Text Sharing",
    desc: "Share plaintext messages, passwords, API keys, or encrypted file attachments up to 100MB. Full end-to-end protection for every format.",
    badge: "Versatile",
  },
  {
    icon: Bell,
    title: "Access Notifications",
    desc: "Receive an instant alert the moment your secret is accessed. Know exactly when your data was viewed without compromising zero-knowledge guarantees.",
    badge: "Awareness",
  },
  {
    icon: Globe,
    title: "No Registration Required",
    desc: "Start sharing in seconds with no account, no email, no tracking. Your identity is never linked to your secrets.",
    badge: "Anonymous",
  },
  {
    icon: GitBranch,
    title: "Open Source",
    desc: "Our encryption implementation is fully open-source and independently auditable. Trust through verification, not promises.",
    badge: "Transparent",
    href: "https://github.com/dpgaire/cipher-once",
  },
  {
    icon: Layers,
    title: "API Access",
    desc: "Integrate CipherOnce into your CI/CD pipeline, secret rotation workflows, or custom tooling via our clean REST API.",
    badge: "Developer",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative border-t border-white/5 bg-[#0a0a0f] py-24 lg:py-36"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8a9a]">
              Features
            </span>
          </div>
          <h2
            className="mb-5 text-4xl font-bold text-white lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Enterprise-grade security.
            <br />
            <span className="text-[#C9A84C]">Zero friction.</span>
          </h2>
          <p className="text-lg text-[#6a6a7a]">
            Every feature engineered for security professionals and teams who
            can't afford to compromise.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            const card = (
              <div
                key={feature.title}
                className="group relative flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-7 transition-all duration-300 hover:border-[#C9A84C]/20 hover:bg-white/[0.04]"
              >
                {/* Badge */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 transition-all duration-300 group-hover:border-[#C9A84C]/40">
                    <Icon className="h-5 w-5 text-[#C9A84C]" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#6a6a7a]">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="mb-2.5 text-base font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6a6a7a]">
                  {feature.desc}
                </p>

                {feature.href && (
                  <div className="mt-4 text-xs font-semibold text-[#C9A84C] opacity-0 transition-opacity group-hover:opacity-100">
                    View Source →
                  </div>
                )}

                {/* Corner accent */}
                <div className="absolute right-0 top-0 h-px w-16 bg-gradient-to-l from-[#C9A84C]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute right-0 top-0 h-16 w-px bg-gradient-to-b from-[#C9A84C]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );

            return feature.href ? (
              <Link href={feature.href} target="_blank" key={feature.title}>
                {card}
              </Link>
            ) : (
              <div key={feature.title}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}