import { Shield, Lock, Eye, Clock, Zap, CheckCircle2, ArrowRight, Key, Flame, AlertTriangle, Code, Users, Briefcase, FileText, QrCode, Trash2, Server, Sparkles } from 'lucide-react';

import Link from "next/link"

export default async function HomePage() {
  return (
   <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/5 py-24 md:py-32 lg:py-40">
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium backdrop-blur-xl">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">End-to-End Encrypted • Zero Knowledge</span>
            </div>

            <h1 className="mb-8 text-balance text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
              Share secrets that
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  disappear
                </span>
                <div className="absolute -inset-2 bg-blue-500/20 blur-3xl -z-10" />
              </span>
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-xl leading-relaxed text-white/60 md:text-2xl font-light">
              Zero-knowledge. One-time. No traces.
            </p>

            <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-white/50 md:text-xl">
              CipherOnce lets you securely share sensitive text using client-side encryption.
              Even our servers can't read your data.
            </p>
             
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
               <Link href="/create">
               <button className="group relative inline-flex items-center justify-center h-14 px-10 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Create a secure secret</span>
                <ArrowRight className="ml-2 h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              </button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/40">No signup required for your first secret</p>
          </div>
        </div>

        {/* Animated gradient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/30 blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-cyan-600/20 blur-[150px]" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </section>

      {/* Trust Signal */}
      <section className="relative border-b border-white/5 bg-gradient-to-b from-black via-blue-950/10 to-black py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent p-10 md:p-14 backdrop-blur-xl">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="h-7 w-7 text-amber-400" />
              </div>
              <h2 className="mb-5 text-3xl font-bold md:text-4xl lg:text-5xl">
                Email, Slack, and WhatsApp were never designed for secrets.
              </h2>
              <p className="text-xl text-white/60 mb-3 leading-relaxed">
                Passwords, API keys, private messages — once sent, they live forever.
              </p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                CipherOnce fixes that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <h2 className="mb-5 text-4xl font-bold md:text-5xl lg:text-6xl">How It Works</h2>
            <p className="text-xl text-white/50">Simple, Technical, Honest</p>
          </div>

          <div className="mx-auto max-w-5xl space-y-16 md:space-y-20">
            {[
              {
                step: "1",
                icon: Lock,
                title: "Encrypt in your browser",
                description: "Your secret is encrypted before it leaves your device using the Web Crypto API.",
                gradient: "from-blue-600 to-blue-500"
              },
              {
                step: "2",
                icon: Key,
                title: "Share a one-time link",
                description: "We store only encrypted data. The decryption key lives only in the URL fragment — never on our servers.",
                gradient: "from-cyan-600 to-blue-600"
              },
              {
                step: "3",
                icon: Flame,
                title: "Auto-destruct",
                description: "After viewing (or expiration), the secret is permanently destroyed.",
                gradient: "from-blue-500 to-cyan-500"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex gap-8 md:gap-12">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-2xl font-bold text-white shadow-2xl shadow-blue-500/30`}>
                      {item.step}
                    </div>
                    {index < 2 && (
                      <div className="mt-6 h-full w-px bg-gradient-to-b from-blue-500/50 to-transparent" />
                    )}
                  </div>
                  <div className="flex-1 pt-3">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <Icon className="h-7 w-7 text-blue-400" />
                    </div>
                    <h3 className="mb-4 text-3xl font-bold">{item.title}</h3>
                    <p className="text-lg leading-relaxed text-white/60">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why CipherOnce is Different */}
      <section className="relative border-y border-white/5 bg-gradient-to-b from-black via-blue-950/5 to-black py-24 md:py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <h2 className="mb-5 text-4xl font-bold md:text-5xl lg:text-6xl">Why CipherOnce Is Different</h2>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:gap-8">
            {[
              {
                icon: Shield,
                title: "True zero-knowledge",
                description: "We don't know your secrets.\nWe can't know your secrets."
              },
              {
                icon: Lock,
                title: "Client-side encryption",
                description: "No server-side decryption.\nNo backdoors.\nNo \"trust us\" claims."
              },
              {
                icon: Flame,
                title: "One-time & expiring",
                description: "Secrets burn after use — by design."
              },
              {
                icon: QrCode,
                title: "Share via link or QR",
                description: "Works online or offline.\nScan → decrypt → disappear."
              }
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-transparent transition-all duration-300" />
                  <div className="relative z-10">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 transition-transform group-hover:scale-110 duration-300">
                      <Icon className="h-7 w-7 text-blue-400" />
                    </div>
                    <div className="flex items-start gap-3 mb-4">
                      <CheckCircle2 className="h-6 w-6 text-blue-400 shrink-0 mt-1" />
                      <h3 className="text-2xl font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-base leading-relaxed text-white/60 whitespace-pre-line">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <h2 className="mb-5 text-4xl font-bold md:text-5xl lg:text-6xl">Who It's For</h2>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3 lg:gap-8">
            {[
              {
                icon: Code,
                title: "Developers",
                items: ["Share API keys", "Send credentials safely", "Avoid leaking secrets in chat"]
              },
              {
                icon: Briefcase,
                title: "Founders & Teams",
                items: ["Share private info with investors or partners", "Control access & expiration", "Reduce risk"]
              },
              {
                icon: Users,
                title: "Freelancers & Consultants",
                items: ["Send sensitive client data", "Look professional", "Maintain privacy"]
              }
            ].map((persona) => {
              const Icon = persona.icon;
              return (
                <div
                  key={persona.title}
                  className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 transition-transform group-hover:scale-110 duration-300">
                    <Icon className="h-7 w-7 text-blue-400" />
                  </div>
                  <h3 className="mb-6 text-2xl font-bold">{persona.title}</h3>
                  <ul className="space-y-3">
                    {persona.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/60">
                        <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Case Examples */}
      <section className="relative border-y border-white/5 bg-gradient-to-b from-black via-blue-950/5 to-black py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="mb-5 text-4xl font-bold md:text-5xl lg:text-6xl">Use Case Examples</h2>
            </div>

            <div className="space-y-6">
              {[
                "\"Here's the production DB password — view once.\"",
                "\"Scan this QR to access the confidential note.\"",
                "\"This message expires in 10 minutes.\""
              ].map((example, idx) => (
                <div key={idx} className="group rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-transparent p-8 backdrop-blur-xl text-center transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
                  <p className="text-xl md:text-2xl font-medium text-white/90 italic">{example}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Simple. Safe. Gone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security By Design */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-2xl shadow-blue-500/30">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Security By Design</h2>
            <p className="mb-16 text-xl text-white/50">(Not a Feature)</p>

            <div className="grid gap-5 md:grid-cols-2 mb-16">
              {[
                { icon: Lock, text: "AES-256-GCM encryption" },
                { icon: Key, text: "Keys never sent to server" },
                { icon: Server, text: "Zero-knowledge architecture" },
                { icon: Trash2, text: "Automatic burn after view" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-4 rounded-xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent p-6 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="text-lg font-semibold">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 text-xl text-white/50">
              <p>No ads.</p>
              <p>No tracking of content.</p>
              <p>No dark patterns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Still Early */}
      <section className="relative border-y border-white/5 bg-gradient-to-b from-black via-blue-950/5 to-black py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-5 text-4xl font-bold md:text-5xl lg:text-6xl">Still Early — And That's a Good Thing</h2>
            <p className="mb-16 text-xl text-white/60">CipherOnce is actively evolving.</p>

            <div className="mb-12">
              <h3 className="mb-10 text-2xl font-semibold text-blue-400">Coming next:</h3>
              <div className="grid gap-5 md:grid-cols-2">
                {[
                  "Secure file sharing (PDFs, images, docs)",
                  "Folder-based secret sharing",
                  "Advanced access rules",
                  "Team dashboards"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 rounded-xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent p-6 backdrop-blur-xl text-left transition-all duration-300 hover:border-blue-500/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                      <Sparkles className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-base text-white/80 leading-relaxed pt-1">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xl font-semibold text-blue-400">Your feedback shapes what ships next.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-2xl shadow-blue-500/40">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <h2 className="mb-8 text-4xl font-bold md:text-5xl lg:text-6xl">Share secrets the safe way.</h2>
            <div className="mb-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
               <Link href="/create">
               <button className="group relative inline-flex items-center justify-center h-14 px-10 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Create a secure secret</span>
                <ArrowRight className="ml-2 h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              </button>
              </Link>
            </div>
            <p className="text-lg text-white/50">
              No credit card. No commitment.
            </p>
          </div>
        </div>

        {/* Bottom gradient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[150px]" />
        </div>
      </section>

    </div>
  )
}
