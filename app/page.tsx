import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Clock, Zap, CheckCircle2, ArrowRight, Key, Flame } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col">
      <Header isAuthenticated={!!user} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-background via-primary/[0.02] to-background py-24 md:py-32">
          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="text-foreground/80">End-to-End Encrypted • Zero Knowledge</span>
              </div>

              <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Share Secrets
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-blue-600 bg-clip-text text-transparent">
                  Without a Trace
                </span>
              </h1>

              <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Send passwords, API keys, and sensitive data with military-grade encryption. Self-destructing links that
                burn after one view.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/25">
                  <Link href="/create">
                    Create Secret Link
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent">
                  <Link href="#features">See How It Works</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative gradient orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 md:py-32">
          <div className="container">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Security First, Always</h2>
              <p className="text-pretty text-lg text-muted-foreground">
                Built on cryptographic principles trusted by security professionals worldwide
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Shield,
                  title: "Zero-Knowledge Encryption",
                  description: "Encrypted in your browser with AES-256-GCM. We never see your data, ever.",
                },
                {
                  icon: Flame,
                  title: "Burn After Reading",
                  description: "Secrets self-destruct after viewing. No copies, no traces, no recovery.",
                },
                {
                  icon: Clock,
                  title: "Time-Locked Expiration",
                  description: "Set custom expiration from 1 hour to 7 days. Auto-delete guaranteed.",
                },
                {
                  icon: Key,
                  title: "Passphrase Protection",
                  description: "Optional second-factor security. Link + passphrase = unbreakable.",
                },
                {
                  icon: Eye,
                  title: "Access Tracking",
                  description: "Know exactly when and how many times your secret was accessed.",
                },
                {
                  icon: Zap,
                  title: "Instant & Anonymous",
                  description: "No signup required. Create and share in under 10 seconds.",
                },
              ].map((feature) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={feature.title}
                    className="group relative overflow-hidden border-muted/40 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <CardHeader className="pb-4">
                      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-y bg-muted/30 py-24 md:py-32">
          <div className="container">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Three Steps to Perfect Security</h2>
              <p className="text-pretty text-lg text-muted-foreground">Simple for you. Impossible to break.</p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-12 md:gap-16">
              {[
                {
                  step: "01",
                  title: "Create & Encrypt",
                  description:
                    "Type your secret. We encrypt it instantly in your browser before it ever leaves your device. Not even our servers can read it.",
                },
                {
                  step: "02",
                  title: "Share the Link",
                  description:
                    "Copy the unique link with embedded encryption key. Share via email, Slack, or any channel you trust.",
                },
                {
                  step: "03",
                  title: "Auto-Destruct",
                  description:
                    "Recipient views once, secret burns forever. No recovery possible. Perfect forward secrecy.",
                },
              ].map((item, index) => (
                <div key={item.step} className="flex gap-6 md:gap-8">
                  <div className="flex flex-col items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/25">
                      {item.step}
                    </div>
                    {index < 2 && <div className="mt-4 h-full w-0.5 bg-gradient-to-b from-primary to-transparent" />}
                  </div>
                  <div className="flex-1 pt-4">
                    <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                    <p className="text-pretty leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

       

        {/* CTA Section */}
        <section className="border-t bg-gradient-to-b from-background via-primary/[0.02] to-background py-24 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-6 text-balance text-3xl font-bold md:text-4xl">Start Sharing Securely Today</h2>
              <p className="mb-10 text-pretty text-lg text-muted-foreground">
                No credit card. No signup required. Military-grade encryption in seconds.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/25">
                  <Link href="/create">
                    Create Your First Secret
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {!user && (
                  <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent">
                    <Link href="/auth/sign-up">Sign Up Free</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
