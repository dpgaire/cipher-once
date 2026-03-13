import { Mail, ArrowRight, Shield, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0f] px-4 py-12">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/6 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "50px 50px" }}
      />

      <div className="relative w-full max-w-md">
        {/* Icon */}
        <div className="mb-8 text-center">
          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-[#C9A84C]/10 blur-xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 shadow-[0_0_30px_rgba(201,168,76,0.15)]">
              <Mail className="h-7 w-7 text-[#C9A84C]" />
            </div>
          </div>
          <h1
            className="mb-2 text-3xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Check your email
          </h1>
          <p className="text-sm text-[#6a6a7a]">We've sent you a verification link</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
          <div className="mb-6 text-center">
            <p className="mb-1 text-base font-bold text-white">Verify your email address</p>
            <p className="text-sm text-[#4a4a5a]">Click the link in your email to complete registration</p>
          </div>

          <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <p className="text-sm leading-relaxed text-[#6a6a7a]">
              Please check your inbox — and spam folder — for a message from{" "}
              <span className="font-semibold text-white">CipherOnce</span>. Click the
              verification link to activate your account and start sharing secrets securely.
            </p>
          </div>

          {/* Checklist */}
          <div className="mb-6 space-y-2.5">
            {[
              "Check your main inbox",
              "Check your spam or junk folder",
              "Link expires in 24 hours",
            ].map((tip) => (
              <div key={tip} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#C9A84C]/60" />
                <span className="text-xs text-[#6a6a7a]">{tip}</span>
              </div>
            ))}
          </div>

          <div className="h-px bg-white/5 mb-5" />

          <Link href="/login" className="block">
            <button className="group flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10">
              Back to sign in
            </button>
          </Link>

          <p className="mt-4 text-center text-xs text-[#4a4a5a]">
            Wrong email?{" "}
            <Link href="/sign-up" className="font-semibold text-[#C9A84C] hover:opacity-80">
              Sign up again
            </Link>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Shield className="h-3.5 w-3.5 text-[#4a4a5a]" />
          <p className="text-[10px] text-[#4a4a5a]">AES-256 encrypted · Zero-knowledge · Free forever</p>
        </div>
      </div>
    </div>
  )
}