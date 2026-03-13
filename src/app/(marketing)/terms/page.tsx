import Link from "next/link"
import { FileText, UserCheck, Shield, AlertTriangle, Lock, AlertCircle, XCircle, RefreshCw, Gavel, Mail } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | CipherOnce",
  description: "Read the Terms of Service for CipherOnce. By using our zero-knowledge secret sharing service, you agree to these terms.",
  keywords: ["terms of service", "user agreement", "acceptable use", "legal", "CipherOnce terms"],
  openGraph: {
    title: "Terms of Service | CipherOnce",
    description: "By using our zero-knowledge secret sharing service, you agree to these terms.",
    url: "/terms",
  },
  twitter: {
    title: "Terms of Service | CipherOnce",
    description: "By using our zero-knowledge secret sharing service, you agree to these terms.",
  },
}

const sections = [
  {
    icon: FileText,
    number: "01",
    title: "Acceptance of Terms",
    content: (
      <p className="text-sm leading-relaxed text-[#8a8a9a]">
        By accessing or using our Service, you agree to be bound by these Terms and our{" "}
        <Link href="/privacy" className="font-semibold text-[#C9A84C] hover:opacity-80">Privacy Policy</Link>.
        If you do not agree to these Terms, you may not use the Service.
      </p>
    ),
  },
  {
    icon: Shield,
    number: "02",
    title: "Description of Service",
    content: (
      <p className="text-sm leading-relaxed text-[#8a8a9a]">
        CipherOnce provides a zero-knowledge platform for sharing sensitive information securely. Secrets are encrypted
        client-side in your browser, and we have no ability to access or decrypt your content. The Service allows you to
        create self-destructing links with configurable expiration times and view limits.
      </p>
    ),
  },
  {
    icon: UserCheck,
    number: "03",
    title: "User Accounts",
    content: (
      <p className="text-sm leading-relaxed text-[#8a8a9a]">
        To access certain features — such as managing secrets and viewing access logs — you must create an account.
        You are responsible for safeguarding your account credentials and for all activities that occur under your account.
        You agree to notify us immediately of any unauthorized use of your account.
      </p>
    ),
  },
  {
    icon: AlertTriangle,
    number: "04",
    title: "Acceptable Use Policy",
    content: (
      <>
        <p className="mb-4 text-sm text-[#8a8a9a]">You agree not to use the Service to:</p>
        <ul className="mb-4 space-y-2">
          {[
            "Transmit unlawful, harmful, threatening, abusive, harassing, or defamatory content",
            "Share illegal information, including copyrighted material you don't have rights to",
            "Impersonate any person or entity, or misrepresent your affiliation",
            "Attempt unauthorized access, interference, or disruption of the Service or infrastructure",
            "Use the Service for spamming, phishing, or distribution of malware",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-[#8a8a9a]">
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60" />
              {item}
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-red-500/10 bg-red-500/5 px-4 py-3">
          <p className="text-xs text-red-400">
            Violation of this policy may result in immediate termination of your access to the Service.
          </p>
        </div>
      </>
    ),
  },
  {
    icon: Lock,
    number: "05",
    title: "Content Responsibility and Ownership",
    content: (
      <p className="text-sm leading-relaxed text-[#8a8a9a]">
        You retain full ownership of the content you create and share through the Service. Because of our zero-knowledge
        architecture, you are solely responsible for the content you transmit. We have no knowledge of your content and no
        liability for it. You are also solely responsible for maintaining the confidentiality of the shareable links you create.
      </p>
    ),
  },
  {
    icon: AlertCircle,
    number: "06",
    title: "Disclaimer of Warranties",
    content: (
      <p className="text-sm leading-relaxed text-[#8a8a9a]">
        The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranty that the Service will be
        uninterrupted, timely, secure, or error-free. You use the Service at your own risk. We expressly disclaim all
        warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a
        particular purpose, and non-infringement.
      </p>
    ),
  },
  {
    icon: XCircle,
    number: "07",
    title: "Limitation of Liability",
    content: (
      <p className="text-sm leading-relaxed text-[#8a8a9a]">
        To the fullest extent permitted by law, CipherOnce shall not be liable for any indirect, incidental, special,
        consequential, or exemplary damages — including loss of profits, goodwill, data, or other intangible losses —
        resulting from your use of the Service. Because we cannot access your data, we cannot be responsible for data loss.
      </p>
    ),
  },
  {
    icon: XCircle,
    number: "08",
    title: "Termination",
    content: (
      <p className="text-sm leading-relaxed text-[#8a8a9a]">
        We may terminate or suspend your access to the Service at any time, with or without cause or notice, for any
        reason including breach of these Terms. Upon termination, your right to use the Service will immediately cease.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    number: "09",
    title: "Changes to Terms",
    content: (
      <p className="text-sm leading-relaxed text-[#8a8a9a]">
        We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at
        least 30 days' notice before new terms take effect. Continued use of the Service constitutes acceptance of updated Terms.
      </p>
    ),
  },
  {
    icon: Gavel,
    number: "10",
    title: "Governing Law",
    content: (
      <p className="text-sm leading-relaxed text-[#8a8a9a]">
        These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company
        is based, without regard to its conflict of law provisions.
      </p>
    ),
  },
  {
    icon: Mail,
    number: "11",
    title: "Contact Us",
    content: (
      <>
        <p className="mb-3 text-sm text-[#8a8a9a]">
          If you have questions about these Terms, please reach out directly.
        </p>
        <Link
          href="https://www.durgagairhe.com.np/"
          target="_blank"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#C9A84C] hover:opacity-80"
        >
          Developer profile →
        </Link>
      </>
    ),
  },
]

export default async function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/5 py-16 lg:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#C9A84C]/5 blur-[100px]" />
        <div className="container relative mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-4 py-2">
            <FileText className="h-3.5 w-3.5 text-[#C9A84C]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">Legal</span>
          </div>
          <h1
            className="mb-3 text-4xl font-bold text-white lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Terms of Service
          </h1>
          <p className="text-sm text-[#4a4a5a]">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6a6a7a]">
            Welcome to CipherOnce. These Terms govern your access to and use of our zero-knowledge secret sharing platform.
            Please read them carefully before using the Service.
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div
                key={section.number}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-7 transition-colors hover:border-white/8"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A84C]">
                    <Icon className="text-[#0a0a0f]" style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#C9A84C]/40">{section.number}</span>
                    <h2 className="text-lg font-bold text-white">{section.title}</h2>
                  </div>
                </div>
                {section.content}
              </div>
            )
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-8 rounded-2xl border border-[#C9A84C]/15 bg-[#C9A84C]/[0.03] p-6 text-center">
          <p className="text-sm text-[#6a6a7a]">
            By using CipherOnce, you acknowledge that you have read and agree to these Terms.{" "}
            <Link href="/privacy" className="font-semibold text-[#C9A84C] hover:opacity-80">
              View our Privacy Policy →
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}