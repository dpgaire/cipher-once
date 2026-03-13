import Link from "next/link"
import { BookOpen, Plus, Share2, Eye, Shield, FileText, AlertCircle, Mail, ArrowRight, Lock, CheckCircle2 } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CipherOnce Documentation | Secure One-Time Secret Sharing",
  description: "Official CipherOnce documentation. Learn how to securely share secrets and files with one-time access, client-side encryption, automatic destruction, and zero-knowledge design.",
  keywords: ["one-time secret", "secure secret sharing", "encrypted file sharing", "self-destructing secrets", "client-side encryption", "privacy focused sharing", "CipherOnce"],
  openGraph: {
    title: "CipherOnce Docs – Secure One-Time Secret Sharing",
    description: "Learn how CipherOnce protects your secrets using client-side encryption and one-time access.",
    url: "https://cipheronce.com/docs",
    siteName: "CipherOnce",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CipherOnce Documentation",
    description: "Secure, self-destructing, one-time secret and file sharing.",
  },
}

const howItWorks = [
  {
    icon: Plus,
    number: "01",
    title: "Create a Secret",
    steps: [
      <>Go to the <Link href="/create" className="font-semibold text-[#C9A84C] hover:opacity-80">Create Secret</Link> page</>,
      "Enter sensitive text — passwords, API keys, private notes, or messages",
      "Optionally attach a file (encrypted before upload)",
      "Set expiration time or maximum view count",
      "Add an optional passphrase for extra protection",
      <>Click <span className="font-semibold text-white">Create Secret</span></>,
    ],
  },
  {
    icon: Share2,
    number: "02",
    title: "Share the Secret Link",
    steps: [
      "You'll receive a unique, one-time secret link",
      <>Copy the <span className="font-semibold text-white">entire URL</span> — including the part after the <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[#C9A84C]">#</code></>,
      "This fragment contains the encryption key and is never sent to the server",
      "Share the link securely with the intended recipient",
      "If you used a passphrase, share it separately via a different channel",
    ],
  },
  {
    icon: Eye,
    number: "03",
    title: "Viewing a Secret",
    steps: [
      "The recipient opens the link in their browser",
      "Passphrase (if set) is required to proceed",
      "Secret is decrypted locally — never on the server",
      "Once viewed, the secret is permanently and irreversibly destroyed",
    ],
  },
]

const securityPoints = [
  { label: "Client-side encryption", desc: "Encryption keys never leave your device." },
  { label: "Zero-knowledge design", desc: "Servers store only encrypted ciphertext." },
  { label: "One-time access", desc: "Secrets self-destruct after viewing." },
  { label: "Metadata logging only", desc: "IP, user agent, and timestamps logged for abuse prevention only." },
  { label: "No tracking", desc: "No ads, trackers, or behavioral profiling of any kind." },
]

const shareTypes = [
  "Passwords, API keys, tokens",
  "Private messages or credentials",
  "Confidential documents and files",
  "Legal, financial, or technical data",
  "SSH keys and database credentials",
  "Environment variables and secrets",
]

const troubleshootingItems = [
  <>Ensure the full link including <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[#C9A84C]">#key</code> is copied — some apps truncate it</>,
  "Some messaging apps strip URL fragments — send via email or a secure channel",
  "Secrets cannot be recovered once viewed or expired — they're gone permanently",
  "On iOS, files may open in a new tab instead of downloading directly",
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5 py-16 lg:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#C9A84C]/5 blur-[100px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="container relative mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-4 py-2">
            <BookOpen className="h-3.5 w-3.5 text-[#C9A84C]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">Documentation</span>
          </div>
          <h1
            className="mb-4 text-4xl font-bold text-white lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            CipherOnce User Manual
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[#6a6a7a]">
            Secure, private, one-time secret and file sharing — built with a zero-knowledge mindset from day one.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["How it works", "Security model", "What you can share", "Troubleshooting"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="rounded-full border border-white/5 bg-white/[0.02] px-4 py-1.5 text-xs font-medium text-[#6a6a7a] transition-all hover:border-[#C9A84C]/20 hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-4xl px-6 py-16 lg:px-8 space-y-6">

        {/* What is CipherOnce */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A84C]">
              <Lock style={{ width: 18, height: 18 }} className="text-[#0a0a0f]" />
            </div>
            <h2 className="text-xl font-bold text-white">What is CipherOnce?</h2>
          </div>
          <p className="mb-3 text-sm leading-relaxed text-[#8a8a9a]">
            CipherOnce is a privacy-first platform that allows you to share sensitive information and files that can be
            accessed <span className="font-semibold text-white">only once</span> and are automatically destroyed after viewing or expiration.
          </p>
          <p className="text-sm leading-relaxed text-[#8a8a9a]">
            All encryption happens <span className="font-semibold text-white">client-side in your browser</span>. CipherOnce servers
            never see your secrets in plaintext, ensuring true zero-knowledge security.
          </p>
        </div>

        {/* How it works */}
        <div id="how-it-works" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-7 flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A84C]">
              <Share2 style={{ width: 18, height: 18 }} className="text-[#0a0a0f]" />
            </div>
            <h2 className="text-xl font-bold text-white">How CipherOnce Works</h2>
          </div>
          <div className="space-y-6">
            {howItWorks.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.number} className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-xs text-[#C9A84C]/50">{section.number}</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10">
                      <Icon className="h-4 w-4 text-[#C9A84C]" />
                    </div>
                    <h3 className="text-base font-bold text-white">{section.title}</h3>
                  </div>
                  <ol className="space-y-2">
                    {section.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#8a8a9a]">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 font-mono text-[9px] text-[#C9A84C]">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )
            })}
          </div>
        </div>

        {/* Security model */}
        <div id="security-model" className="rounded-2xl border border-[#C9A84C]/10 bg-[#C9A84C]/[0.02] p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A84C]">
              <Shield style={{ width: 18, height: 18 }} className="text-[#0a0a0f]" />
            </div>
            <h2 className="text-xl font-bold text-white">Security & Privacy Model</h2>
          </div>
          <div className="space-y-3">
            {securityPoints.map(({ label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]" />
                <span className="text-sm text-[#8a8a9a]">
                  <span className="font-semibold text-white">{label}:</span> {desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* What you can share */}
        <div id="what-you-can-share" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A84C]">
              <FileText style={{ width: 18, height: 18 }} className="text-[#0a0a0f]" />
            </div>
            <h2 className="text-xl font-bold text-white">What Can You Share?</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {shareTypes.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-[#8a8a9a]">
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Troubleshooting */}
        <div id="troubleshooting" className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A84C]">
              <AlertCircle style={{ width: 18, height: 18 }} className="text-[#0a0a0f]" />
            </div>
            <h2 className="text-xl font-bold text-white">Troubleshooting</h2>
          </div>
          <div className="space-y-3">
            {troubleshootingItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
                <span className="mt-0.5 font-mono text-xs text-[#C9A84C]/50">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm text-[#8a8a9a]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-2xl border border-[#C9A84C]/15 bg-[#C9A84C]/[0.03] p-8">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A84C]">
              <Mail style={{ width: 18, height: 18 }} className="text-[#0a0a0f]" />
            </div>
            <h2 className="text-xl font-bold text-white">Contact the Developer</h2>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-[#8a8a9a]">
            CipherOnce is actively developed and security-reviewed. If you discover a bug, security vulnerability, or need support:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="mailto:gairhedurga13@gmail.com"
              className="group flex items-center gap-2 rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-5 py-2.5 text-sm font-semibold text-[#C9A84C] transition-all hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/15"
            >
              gairhedurga13@gmail.com
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="https://www.durgagairhe.com.np/"
              target="_blank"
              className="group flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-5 py-2.5 text-sm font-semibold text-[#6a6a7a] transition-all hover:border-white/10 hover:text-white"
            >
              Developer profile
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <p className="mt-4 text-xs text-[#4a4a5a]">Responsible disclosure is appreciated.</p>
        </div>

      </main>
    </div>
  )
}