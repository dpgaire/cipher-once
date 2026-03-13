"use client";

import { ShieldCheck, Key, Eye, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";

const details = [
  {
    icon: Key,
    title: "Client-Side Encryption",
    description:
      "Encryption happens entirely within your browser using the Web Crypto API before any data is transmitted. We use AES-256-GCM — an authenticated encryption mode that guarantees both confidentiality and integrity. A unique 256-bit key and 96-bit IV are generated for every single secret.",
    example: "https://cipheronce.com/s/abc123xyz",
    exampleKey: "#AES256GCM-key-never-sent-to-server",
  },
  {
    icon: Eye,
    title: "Zero Server-Side Knowledge",
    description:
      "The decryption key is embedded exclusively in the URL fragment (the # portion). URL fragments are never transmitted to web servers by design — it's a browser standard. Our infrastructure receives only ciphertext that it cannot decrypt under any circumstance, including lawful government requests.",
    example: null,
  },
  {
    icon: ShieldCheck,
    title: "Immutable Audit Trail",
    description:
      "Every access event is cryptographically logged — not to surveil you, but to ensure atomic deletion. The moment a one-time secret is accessed, the deletion is executed in the same database transaction as the read. There is no window where both reading and retention can coexist.",
    example: null,
  },
  {
    icon: Trash2,
    title: "Guaranteed Ephemeral Storage",
    description:
      "CipherOnce uses strict TTL (time-to-live) enforcement at the storage layer. Expired secrets are purged during the next cleanup cycle with no soft-delete or recovery path. Our data retention policy is zero for expired content — this is enforced at the infrastructure level, not application logic.",
    example: null,
  },
];

export function SecurityArchitectureSection() {
  return (
    <section
      id="security"
      className="relative border-t border-white/5 bg-[#0a0a0f] py-24 lg:py-36"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8a9a]">
              Security Architecture
            </span>
          </div>
          <h2
            className="mb-5 text-4xl font-bold text-white lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Transparency is
            <br />
            <span className="text-[#C9A84C]">our security model.</span>
          </h2>
          <p className="text-lg text-[#6a6a7a]">
            We don't ask you to trust us. We show you the architecture and let
            you verify it yourself.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-4">
          {details.map((detail, i) => {
            const Icon = detail.icon;
            return (
              <div
                key={detail.title}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-300 hover:border-[#C9A84C]/15"
              >
                <div className="mb-5 flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.2)]">
                    <Icon className="h-5 w-5 text-[#0a0a0f]" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="text-xs font-mono text-[#C9A84C]/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {detail.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[#6a6a7a]">
                      {detail.description}
                    </p>
                  </div>
                </div>

                {detail.example && (
                  <div className="ml-17 rounded-lg border border-white/5 bg-[#0d0d14] p-4 font-mono text-xs">
                    <span className="text-[#6a6a7a]">{detail.example}</span>
                    <span className="text-[#C9A84C]">
                      {detail.exampleKey}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Open source banner */}
          <div className="rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/[0.04] p-8 text-center">
            <div className="mb-2 text-lg font-bold text-[#C9A84C]">
              Independently Auditable
            </div>
            <p className="mb-5 text-sm text-[#6a6a7a]">
              Our complete encryption implementation is open-source. Security
              researchers, auditors, and curious developers are welcome to
              review and verify every claim.
            </p>
            <Link
              href="https://github.com/dpgaire/cipher-once"
              target="_blank"
            >
              <button className="inline-flex items-center gap-2 rounded-lg border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-6 py-3 text-sm font-bold text-[#C9A84C] transition-all hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/15">
                View Source on GitHub
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}