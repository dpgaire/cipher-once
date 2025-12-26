"use client";

import { Shield, ArrowRight } from 'lucide-react';
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-36">
      <div className="absolute inset-0 bg-primary/5 opacity-[0.5]"></div>
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Shield className="h-4 w-4" />
            End-to-End Encrypted • Zero-Knowledge Architecture
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Share secrets that
            <br />
            <span className="text-primary">vanish after one view</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            The most secure way to share passwords, API keys, and confidential data.
            Encrypted in your browser, destroyed after reading. No traces, no logs, no exceptions.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/create" passHref>
              <button className="group flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 sm:w-auto">
                Create a Secret
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-border bg-background px-8 py-4 text-base font-semibold text-foreground hover:border-muted-foreground/50 hover:bg-muted sm:w-auto">
              View Demo
            </button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">No registration • No credit card • Always free</p>
        </div>
      </div>
    </section>
  );
}
