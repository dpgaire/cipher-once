import { Shield, Key, Zap, Info } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About CipherOnce - Our Mission for Secure Sharing",
  description:
    "Learn about CipherOnce, the problem of insecure secret sharing it solves, and how our zero-knowledge, end-to-end encrypted platform works to protect your privacy.",
  keywords: [
    "about cipheronce",
    "secure sharing mission",
    "zero-knowledge",
    "end-to-end encryption",
    "data privacy",
    "cybersecurity",
    "ephemeral messaging",
  ],
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
    <div className="bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto max-w-4xl py-12 px-6 md:py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Info className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-balance md:text-5xl">About CipherOnce</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Our mission is to make sharing sensitive information simple, secure, and private.
          </p>
        </div>

        {/* The Problem Section */}
        <div className="mb-16 rounded-xl border bg-card p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">The Problem We Solve</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              In our digital lives, we constantly need to share sensitive information: passwords for a shared account,
              API keys for a project, or confidential notes.
            </p>
            <p>
              Too often, we send this data through insecure channels like email, Slack, or text messages. This leaves
              a plain-text copy of the secret on servers, in chat logs, and in inboxes, making it vulnerable to
              data breaches, unauthorized access, and accidental exposure for years to come.
            </p>
            <p className="font-medium text-foreground">
              Sending a password in a chat is like sending a postcard with your house key taped to it. It might get
              there, but you have no idea who sees it along the way.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-12">
          <h2 className="mb-8 text-center text-3xl font-bold">Our Solution: A New Standard of Security</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1: E2E Encryption */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">End-to-End Encryption</h3>
              <p className="text-sm text-muted-foreground">
                Your secret is encrypted and decrypted directly in your browser. The raw, unencrypted data never
                leaves your device.
              </p>
            </div>
            {/* Feature 2: Zero-Knowledge */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <Key className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Zero-Knowledge Server</h3>
              <p className="text-sm text-muted-foreground">
                The encryption key is part of the URL fragment (#), which is never sent to our servers. We only store
                encrypted gibberish and have no ability to decrypt your data.
              </p>
            </div>
            {/* Feature 3: Self-Destruction */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Self-Destructing Links</h3>
              <p className="text-sm text-muted-foreground">
                Secrets are automatically and permanently deleted from our servers after they are viewed or when their
                expiration time is reached. Burn after reading, by design.
              </p>
            </div>
          </div>
        </div>

        {/* Why Section */}
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-semibold">Why We Built This</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground">
            <p>
              We believe privacy is a fundamental right. In an era of constant data collection and surveillance,
              individuals and teams need simple tools to protect their sensitive information without sacrificing
              convenience.
            </p>
            <p>
              CipherOnce was created to be that tool: a straightforward, secure, and trustworthy utility for sharing
              secrets with peace of mind. No accounts required, no complex setup, just secure sharing that puts your
              privacy first.
            </p>
          </div>
        </div>

        {/* Documentation Section */}
        <div className="mt-16 pt-12 border-t">
          <h2 className="mb-8 text-center text-3xl font-bold">Learn More</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/one-time-secret-alternative"
              className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Repeat className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">One-Time Secret Alternative</h3>
              <p className="text-sm text-muted-foreground">
                Explore why CipherOnce is a modern, more secure alternative to traditional one-time secret sharing methods.
              </p>
            </Link>

            <Link
              href="/secure-password-sharing"
              className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <KeyRound className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Secure Password Sharing</h3>
              <p className="text-sm text-muted-foreground">
                Learn the best practices for sharing passwords securely and how CipherOnce facilitates this process.
              </p>
            </Link>

            <Link
              href="/self-destructing-messages"
              className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Flame className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Self-Destructing Messages</h3>
              <p className="text-sm text-muted-foreground">
                Understand the technology behind self-destructing messages and their importance in digital privacy.
              </p>
            </Link>

            <Link
              href="/zero-knowledge-secret-sharing"
              className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Zero-Knowledge Secret Sharing</h3>
              <p className="text-sm text-muted-foreground">
                A deep dive into our zero-knowledge architecture and what it means for the security of your data.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
import Link from "next/link";
import { Repeat, KeyRound, Flame, ShieldCheck } from "lucide-react";
