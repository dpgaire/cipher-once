import Link from "next/link"
import { Shield, Eye, Database, Lock, Trash2, Globe, Cookie, UserCheck, RefreshCw, Mail } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | CipherOnce",
  description: "CipherOnce Privacy Policy. Learn how we protect your data using client-side encryption, zero-knowledge architecture, and minimal metadata collection.",
  keywords: ["CipherOnce privacy", "zero-knowledge", "client-side encryption", "secure secret sharing", "data protection"],
  openGraph: {
    title: "Privacy Policy | CipherOnce",
    description: "Understand how CipherOnce handles your data with a strict zero-knowledge commitment.",
    url: "/privacy",
  },
  twitter: {
    title: "Privacy Policy | CipherOnce",
    description: "Understand how CipherOnce protects your privacy with zero-knowledge encryption.",
  },
}

const sections = [
  {
    icon: Shield,
    id: "zero-knowledge",
    title: "Zero-Knowledge Architecture",
    content: (
      <>
        <p className="mb-4 text-[#8a8a9a] leading-relaxed">
          CipherOnce is designed as a <span className="font-semibold text-white">zero-knowledge</span> service.
          Secrets and files are encrypted and decrypted entirely within your browser using modern cryptography (AES-256-GCM).
        </p>
        <p className="mb-4 text-[#8a8a9a] leading-relaxed">
          The encryption key is embedded in the URL fragment (<code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[#C9A84C]">#key</code>) and is never transmitted to our servers. As a result:
        </p>
        <ul className="space-y-2">
          {["We cannot read your secrets", "We cannot recover lost secrets", "We cannot decrypt your files"].map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-[#8a8a9a]">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: Database,
    id: "data-collected",
    title: "Information We Collect",
    content: (
      <div className="space-y-4">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#C9A84C]">Data You Provide</p>
          <ul className="space-y-2.5">
            {[
              { label: "Encrypted Secret Content", desc: "Stored only in encrypted form. We never see plaintext." },
              { label: "Secret Configuration", desc: "Expiration time, view limits, passphrase usage, and feature flags." },
              { label: "Account Information", desc: "Email address and authentication identifiers if you register." },
            ].map(({ label, desc }) => (
              <li key={label} className="flex gap-3 text-sm">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]/50" />
                <span className="text-[#8a8a9a]"><span className="font-semibold text-white">{label}:</span> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#C9A84C]">Automatically Collected</p>
          <ul className="space-y-2.5">
            {[
              { label: "Access Logs", desc: "IP address, browser User-Agent, timestamp, access status, and error metadata. Visible only to the secret owner." },
              { label: "Server Logs", desc: "Basic operational logs for security and rate limiting. Not used for tracking or profiling." },
            ].map(({ label, desc }) => (
              <li key={label} className="flex gap-3 text-sm">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]/50" />
                <span className="text-[#8a8a9a]"><span className="font-semibold text-white">{label}:</span> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    icon: Eye,
    id: "usage",
    title: "How We Use Your Information",
    content: (
      <>
        <ul className="mb-4 space-y-2">
          {[
            "To store and deliver encrypted secrets",
            "To enforce expiration and view limits",
            "To secure accounts and prevent abuse",
            "To display access history to secret owners",
            "To communicate critical service or security notices",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-[#8a8a9a]">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
              {item}
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-[#C9A84C]/15 bg-[#C9A84C]/5 px-4 py-3">
          <p className="text-sm text-[#C9A84C]">
            We do <span className="font-bold">not</span> use your data for advertising, behavioral analytics, or profiling.
          </p>
        </div>
      </>
    ),
  },
  {
    icon: Trash2,
    id: "retention",
    title: "Data Retention & Deletion",
    content: (
      <ul className="space-y-2">
        {[
          { label: "Secrets", desc: "Permanently deleted after expiration, view limit, or manual destruction." },
          { label: "Access Logs", desc: "Deleted automatically when the associated secret is deleted." },
          { label: "Accounts", desc: "You may delete your account at any time, which removes all associated data." },
        ].map(({ label, desc }) => (
          <li key={label} className="flex gap-3 text-sm">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
            <span className="text-[#8a8a9a]"><span className="font-semibold text-white">{label}:</span> {desc}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: Globe,
    id: "third-parties",
    title: "Third-Party Services",
    content: (
      <>
        <p className="mb-4 text-sm text-[#8a8a9a]">CipherOnce uses a minimal set of trusted infrastructure providers:</p>
        <ul className="mb-4 space-y-2">
          <li className="flex gap-3 text-sm">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
            <span className="text-[#8a8a9a]">
              <span className="font-semibold text-white">Supabase:</span> Database, authentication, and server functions.{" "}
              <Link href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:opacity-80">
                Privacy Policy →
              </Link>
            </span>
          </li>
          <li className="flex gap-3 text-sm">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
            <span className="text-[#8a8a9a]"><span className="font-semibold text-white">Vercel:</span> Hosting and edge infrastructure. Standard operational logs may apply.</span>
          </li>
        </ul>
        <div className="rounded-lg border border-[#C9A84C]/15 bg-[#C9A84C]/5 px-4 py-3">
          <p className="text-sm text-[#C9A84C]">We never sell or share your data with advertisers or data brokers.</p>
        </div>
      </>
    ),
  },
  {
    icon: Cookie,
    id: "cookies",
    title: "Cookies",
    content: (
      <p className="text-sm leading-relaxed text-[#8a8a9a]">
        CipherOnce uses <span className="font-semibold text-white">essential cookies only</span> for authentication and session management.
        We do not use tracking, analytics, or advertising cookies.
      </p>
    ),
  },
  {
    icon: UserCheck,
    id: "rights",
    title: "Your Rights",
    content: (
      <ul className="space-y-2">
        {["Access or delete your account data", "Delete secrets at any time", "Request account removal"].map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm text-[#8a8a9a]">
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: RefreshCw,
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <p className="text-sm leading-relaxed text-[#8a8a9a]">
        We may update this policy as CipherOnce evolves. Updates will be reflected on this page with a revised date.
        Continued use after changes constitutes acceptance of the updated policy.
      </p>
    ),
  },
  {
    icon: Mail,
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p className="mb-3 text-sm text-[#8a8a9a]">For privacy questions, data requests, or security disclosures:</p>
        <Link
          href="https://www.durgagairhe.com.np/"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#C9A84C] transition-opacity hover:opacity-80"
          target="_blank"
        >
          Developer profile →
        </Link>
      </>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5 py-16 lg:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#C9A84C]/5 blur-[100px]" />
        <div className="container relative mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-4 py-2">
            <Shield className="h-3.5 w-3.5 text-[#C9A84C]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">Legal</span>
          </div>
          <h1
            className="mb-3 text-4xl font-bold text-white lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-[#4a4a5a]">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6a6a7a]">
            CipherOnce is built with privacy as a core principle. This policy explains what data we collect,
            why we collect it — and most importantly — what we <span className="font-semibold text-white">cannot</span> see or access.
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="space-y-4">
          {sections.map((section, i) => {
            const Icon = section.icon
            return (
              <div
                key={section.id}
                id={section.id}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-7 transition-colors hover:border-white/8"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A84C]">
                    <Icon className="h-4.5 w-4.5 text-[#0a0a0f]" style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#C9A84C]/40">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="text-lg font-bold text-white">{section.title}</h2>
                  </div>
                </div>
                {section.content}
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}