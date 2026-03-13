import { ForgotPasswordForm } from '@/app/(auth)/_components/forgot-password-form'
import { KeyRound, Shield } from 'lucide-react'

export default function ForgotPasswordPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0f] px-4 py-12">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/6 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 shadow-[0_0_30px_rgba(201,168,76,0.15)]">
            <KeyRound className="h-6 w-6 text-[#C9A84C]" />
          </div>
          <h1
            className="mb-2 text-3xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Reset your password
          </h1>
          <p className="text-sm text-[#6a6a7a]">
            Enter your email and we'll send you a secure reset link
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm">
          <ForgotPasswordForm />
        </div>

        {/* Security note */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <Shield className="h-3.5 w-3.5 text-[#4a4a5a]" />
          <p className="text-[10px] text-[#4a4a5a]">
            Reset links expire after 1 hour · Zero-knowledge architecture
          </p>
        </div>
      </div>
    </div>
  )
}