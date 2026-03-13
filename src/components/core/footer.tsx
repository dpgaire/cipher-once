import Link from "next/link";
import { Github, Shield, ArrowRight } from "lucide-react";

const productLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Security", href: "/#security" },
  { label: "Create Secret", href: "/create" },
  { label: "API Docs", href: "/docs" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Security Disclosure", href: "/security" },
];

const trustBadges = [
  "AES-256-GCM Encrypted",
  "Zero Server Knowledge",
  "Open Source",
  "No Data Retention",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#0a0a0f]">
      {/* Top ambient glow */}
      <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      {/* Main footer content */}
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr]">

          {/* Brand column */}
          <div className="space-y-6">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C9A84C]/30 bg-[#C9A84C]/10 transition-all group-hover:border-[#C9A84C]/50">
                <img src="/icon-512.png" className="h-5 w-5 rounded-sm" alt="CipherOnce" />
              </div>
              <span
                className="text-base font-bold text-white group-hover:text-[#C9A84C] transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                CipherOnce
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-[#6a6a7a]">
              Built for privacy-conscious users. Zero-knowledge architecture
              designed from day one — your secrets stay yours, permanently.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#6a6a7a]"
                >
                  <Shield className="h-2.5 w-2.5 text-[#C9A84C]" />
                  {badge}
                </span>
              ))}
            </div>

            {/* GitHub */}
            <Link
              href="https://github.com/dpgaire/cipher-once"
              target="_blank"
              className="group inline-flex items-center gap-2 text-xs font-medium text-[#6a6a7a] transition-colors hover:text-[#C9A84C]"
            >
              <Github className="h-4 w-4" />
              Open source on GitHub
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Product links */}
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A84C]">
              Product
            </p>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-[#6a6a7a] transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-[#C9A84C] transition-all duration-200 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A84C]">
              Company
            </p>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-[#6a6a7a] transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-[#C9A84C] transition-all duration-200 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 lg:px-8 py-5 sm:flex-row">
          <p className="text-xs text-[#4a4a5a]">
            © {new Date().getFullYear()} CipherOnce. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-[#4a4a5a]">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}