"use client";

import { Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-14  lg:py-40">
      <div className="absolute inset-0 bg-primary/5 opacity-[0.5]"></div>
      <div className="container relative mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 bg-primary text-white inline-flex items-center gap-0 lg:gap-2 rounded-full border border-primary px-2 lg:px-4 py-2 text-xs lg:text-sm font-semibold">
            <Shield className="h-8 w-8" />
            End-to-End Encrypted • Zero-Knowledge Architecture
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Secure, Private Secrets
            <br />
            <span className="text-primary">That Disappear After Use</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            The most secure way to share passwords, API keys, and confidential
            data. Encrypted in your browser, destroyed after reading. No traces,
            no logs, no exceptions.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/create" passHref>
              <button className="group flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 sm:w-auto">
                Create a Secret
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            No registration • No credit card • Always free
          </p>
        </div>
      </div>
    </section>
  );
}
