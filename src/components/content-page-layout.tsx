// ─── Shared layout shell for all content / article pages ─────────────────────
// Usage: wrap page sections with <ContentPage> and use <Section>, <Prose>, <CtaButton>

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import React from "react"

// ── Page shell ────────────────────────────────────────────────────────────────
export function ContentPage({
  badge,
  icon,
  iconColor = "text-[#C9A84C]",
  iconBorder = "border-[#C9A84C]/30",
  iconBg = "bg-[#C9A84C]/10",
  iconGlow = "shadow-[0_0_40px_rgba(201,168,76,0.15)]",
  glowColor = "#C9A84C",
  title,
  lead,
  children,
}: {
  badge?: string
  icon: React.ReactNode
  iconColor?: string
  iconBorder?: string
  iconBg?: string
  iconGlow?: string
  glowColor?: string
  title: string
  lead: string
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: `${glowColor}0C` }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="container relative mx-auto max-w-3xl px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border ${iconBorder} ${iconBg} ${iconGlow}`}>
            <span className={iconColor}>{icon}</span>
          </div>
          {badge && (
            <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#6a6a7a]">{badge}</span>
            </div>
          )}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#6a6a7a]">{lead}</p>
        </div>

        <div className="space-y-6">{children}</div>
      </div>
    </div>
  )
}

// ── Article card / section ────────────────────────────────────────────────────
export function Section({
  title,
  icon,
  iconColor = "text-[#C9A84C]",
  borderColor = "border-white/5",
  children,
}: {
  title: string
  icon?: React.ReactNode
  iconColor?: string
  borderColor?: string
  children: React.ReactNode
}) {
  return (
    <div className={`rounded-2xl border ${borderColor} bg-white/[0.02] p-8`}>
      {(title || icon) && (
        <div className="mb-5 flex items-center gap-3">
          {icon && (
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${borderColor} bg-white/[0.03] ${iconColor}`}>
              {icon}
            </div>
          )}
          {title && <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{title}</h2>}
        </div>
      )}
      {children}
    </div>
  )
}

// ── Prose block ───────────────────────────────────────────────────────────────
export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 text-sm leading-relaxed text-[#8a8a9a]">{children}</div>
}

// ── Styled bullet list ────────────────────────────────────────────────────────
export function BulletList({ items }: { items: { label: string; desc: string }[] }) {
  return (
    <ul className="space-y-3">
      {items.map(({ label, desc }) => (
        <li key={label} className="flex items-start gap-3">
          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
          <p className="text-sm leading-relaxed text-[#8a8a9a]">
            <span className="font-semibold text-white">{label}: </span>
            {desc}
          </p>
        </li>
      ))}
    </ul>
  )
}

// ── Numbered steps ────────────────────────────────────────────────────────────
export function StepList({ items }: { items: { label: string; desc: string }[] }) {
  return (
    <ol className="space-y-4">
      {items.map(({ label, desc }, i) => (
        <li key={label} className="flex items-start gap-4">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 text-[10px] font-bold text-[#C9A84C]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="text-sm leading-relaxed text-[#8a8a9a]">
            <span className="font-semibold text-white">{label}: </span>
            {desc}
          </p>
        </li>
      ))}
    </ol>
  )
}

// ── Callout / quote block ─────────────────────────────────────────────────────
export function Callout({ children, color = "amber" }: { children: React.ReactNode; color?: "amber" | "emerald" | "red" | "gold" }) {
  const styles = {
    amber: "border-amber-500/15 bg-amber-500/[0.04] text-amber-300/80",
    emerald: "border-emerald-500/15 bg-emerald-500/[0.04] text-emerald-300/80",
    red: "border-red-500/15 bg-red-500/[0.04] text-red-300/80",
    gold: "border-[#C9A84C]/15 bg-[#C9A84C]/[0.04] text-[#C9A84C]/80",
  }[color]
  return (
    <div className={`rounded-xl border px-5 py-4 ${styles}`}>
      <p className="text-sm font-semibold leading-relaxed">{children}</p>
    </div>
  )
}

// ── CTA Button ────────────────────────────────────────────────────────────────
export function CtaButton({ href = "/create", label = "Create a Secure Secret" }: { href?: string; label?: string }) {
  return (
    <div className="pt-2 text-center">
      <Link href={href}>
        <button className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-[#C9A84C] px-8 py-4 text-sm font-bold text-[#0a0a0f] shadow-[0_0_40px_rgba(201,168,76,0.25)] transition-all hover:shadow-[0_0_60px_rgba(201,168,76,0.4)]">
          {label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          <div className="absolute inset-0 -translate-x-full skew-x-12 bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
        </button>
      </Link>
      <p className="mt-3 text-xs text-[#4a4a5a]">No account required · Free forever · Open source</p>
    </div>
  )
}