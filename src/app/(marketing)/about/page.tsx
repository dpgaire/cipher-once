import { Shield, Key, Zap, Info, Repeat, KeyRound, Flame, ShieldCheck, ArrowRight, EyeOff, Lock } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About CipherOnce - Our Mission for Secure Sharing",
  description: "Learn about CipherOnce, the problem of insecure secret sharing it solves, and how our zero-knowledge, end-to-end encrypted platform works to protect your privacy.",
  keywords: ["about cipheronce", "secure sharing mission", "zero-knowledge", "end-to-end encryption", "data privacy", "cybersecurity", "ephemeral messaging"],
  openGraph: {
    title: "About CipherOnce - Our Mission for Secure Sharing",
    description: "Learn how CipherOnce's zero-knowledge platform solves the problem of insecure secret sharing.",
    url: "/about",
  },
  twitter: {
    title: "About CipherOnce - Our Mission for Secure Sharing",
    description: "Learn how CipherOnce's zero-knowledge platform solves the problem of insecure secret sharing.",
  },
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#C9A84C]/5 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="container relative mx-auto max-w-4xl px-6 py-16 md:py-24">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 shadow-[0_0_40px_rgba(201,168,76,0.15)]">
            <Info className="h-7 w-7 text-[#C9A84C]" />
          </div>
          <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6a6a7a]">Open Source · Zero Knowledge · Free</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            About CipherOnce
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#6a6a7a]">
            We believe sensitive information deserves better than email threads and Slack messages. CipherOnce was built to make secure, ephemeral sharing as easy as copying a link.
          </p>
        </div>

        {/* ── The Problem ─────────────────────────────────────────────── */}
        <div className="mb-10 rounded-2xl border border-red-500/10 bg-red-500/[0.03] p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
              <Zap className="h-4 w-4 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>The Problem We Solve</h2>
          </div>
          <div className="space-y-4 text-[#8a8a9a]">
            <p className="leading-relaxed">
              Every day, developers, teams, and individuals share passwords, API keys, and confidential notes through email, Slack, Discord, and SMS. These platforms were never designed to carry secrets — they store everything indefinitely, replicate messages across servers, and expose your data to breaches that may not surface for years.
            </p>
            <p className="leading-relaxed">
              The average data breach exposes credentials shared months or years prior. Traditional "secure" sharing services claim safety, but many process your plaintext on their servers — creating a single point of failure that attackers actively target.
            </p>
            <div className="rounded-xl border border-red-500/10 bg-red-500/5 px-5 py-4">
              <p className="text-sm font-semibold text-red-300/80 leading-relaxed">
                "Sending a password over chat is like writing your house key on a postcard. It might arrive safely — but you'll never know how many people read it along the way."
              </p>
            </div>
          </div>
        </div>

        {/* ── Solution pillars ────────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="mb-8 text-center text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Our Solution: A New Standard of Security
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Shield, color: "text-emerald-400", border: "border-emerald-500/15", bg: "bg-emerald-500/10",
                title: "End-to-End Encrypted",
                body: "Encryption and decryption happen entirely in your browser using AES-256-GCM. The raw plaintext never leaves your device and never touches our servers — not even for a millisecond.",
              },
              {
                icon: Key, color: "text-[#C9A84C]", border: "border-[#C9A84C]/15", bg: "bg-[#C9A84C]/10",
                title: "Zero-Knowledge Server",
                body: "The decryption key lives in the URL fragment (#) — a part of the URL that browsers never send to servers. We store only encrypted ciphertext. We are architecturally incapable of reading your secrets.",
              },
              {
                icon: Zap, color: "text-red-400", border: "border-red-500/15", bg: "bg-red-500/10",
                title: "Burn After Reading",
                body: "Every secret is configured with a view limit and expiry. Once conditions are met, the encrypted record is permanently deleted — no backups, no archives, no recovery. Gone means gone.",
              },
            ].map(({ icon: Icon, color, border, bg, title, body }) => (
              <div key={title} className={`rounded-2xl border ${border} bg-white/[0.02] p-6 transition-all duration-200 hover:bg-white/[0.04]`}>
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border ${border} ${bg}`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <h3 className="mb-2 text-sm font-bold text-white">{title}</h3>
                <p className="text-xs leading-relaxed text-[#6a6a7a]">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Why We Built This ────────────────────────────────────────── */}
        <div className="mb-10 rounded-2xl border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10">
              <Shield className="h-4 w-4 text-[#C9A84C]" />
            </div>
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Why We Built This</h2>
          </div>
          <div className="space-y-4 text-[#8a8a9a]">
            <p className="leading-relaxed">
              We built CipherOnce because the tools most people use for sharing secrets treat security as an afterthought. Privacy shouldn't require a PhD in cryptography or an enterprise budget. It should be the default.
            </p>
            <p className="leading-relaxed">
              CipherOnce is open source, requires no account for basic use, and is built on verifiable cryptographic principles rather than marketing promises. Our architecture is designed so that even if we wanted to read your secrets — we cannot. That's not a policy. It's physics.
            </p>
            <p className="leading-relaxed">
              Whether you're a solo developer sharing API keys, an enterprise team managing credentials, or an individual protecting personal information, CipherOnce gives you the same military-grade protection without the complexity.
            </p>
          </div>
        </div>

        {/* ── Stats strip ─────────────────────────────────────────────── */}
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: "AES-256", label: "Encryption standard" },
            { value: "0 bytes", label: "Plaintext stored" },
            { value: "100%", label: "Client-side encryption" },
            { value: "Open", label: "Source code" },
          ].map(({ value, label }) => (
            <div key={label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-center">
              <p className="mb-1 text-2xl font-bold text-[#C9A84C]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{value}</p>
              <p className="text-[10px] uppercase tracking-wider text-[#4a4a5a]">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Learn More grid ─────────────────────────────────────────── */}
        <div>
          <h2 className="mb-6 text-center text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Learn More
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
  {[
    { href: "/onetimesecretalternative", icon: Repeat, color: "text-purple-400", border: "border-purple-500/15", bg: "bg-purple-500/10", title: "One-Time Secret Alternative", desc: "Why CipherOnce is a more secure, privacy-first alternative to traditional one-time secret services." },
    { href: "/secure-password-sharing", icon: KeyRound, color: "text-[#C9A84C]", border: "border-[#C9A84C]/15", bg: "bg-[#C9A84C]/10", title: "Secure Password Sharing", desc: "Best practices for sharing credentials and how CipherOnce's zero-knowledge model protects them." },
    { href: "/self-destructing-messages", icon: Flame, color: "text-red-400", border: "border-red-500/15", bg: "bg-red-500/10", title: "Self-Destructing Messages", desc: "The technology behind ephemeral messages and why true destruction requires zero-knowledge architecture." },
    { href: "/zero-knowledge-secret-sharing", icon: ShieldCheck, color: "text-emerald-400", border: "border-emerald-500/15", bg: "bg-emerald-500/10", title: "Zero-Knowledge Architecture", desc: "A technical deep-dive into how CipherOnce ensures we are structurally incapable of reading your data." },
    { href: "/client-side-encryption", icon: Lock, color: "text-blue-400", border: "border-blue-500/15", bg: "bg-blue-500/10", title: "Client-Side Encryption", desc: "How your browser encrypts secrets before they ever leave your device — and why that makes all the difference." },
    { href: "/no-content-logging", icon: EyeOff, color: "text-[#8a6ad4]", border: "border-purple-500/15", bg: "bg-purple-500/10", title: "No Content Logging", desc: "We cannot read your secrets — not by policy, but by architecture. A full breakdown of what we store and don't." },
  ].map(({ href, icon: Icon, color, border, bg, title, desc }) => (
    <Link
      key={href}
      href={href}
      className={`group flex items-start gap-4 rounded-2xl border ${border} bg-white/[0.02] p-6 transition-all duration-200 hover:bg-white/[0.04]`}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${border} ${bg}`}>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="mb-1.5 flex items-center gap-2">
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <ArrowRight className="h-3.5 w-3.5 text-[#4a4a5a] transition-transform group-hover:translate-x-0.5 group-hover:text-[#C9A84C]" />
        </div>
        <p className="text-xs leading-relaxed text-[#6a6a7a]">{desc}</p>
      </div>
    </Link>
  ))}
</div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <div className="mt-12 text-center">
          <Link href="/create">
            <button className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-[#C9A84C] px-8 py-4 text-sm font-bold text-[#0a0a0f] shadow-[0_0_40px_rgba(201,168,76,0.25)] transition-all hover:shadow-[0_0_60px_rgba(201,168,76,0.4)]">
              Create Your First Secret
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
            </button>
          </Link>
          <p className="mt-3 text-xs text-[#4a4a5a]">No account required · Free forever · Open source</p>
        </div>
      </div>
    </div>
  )
}