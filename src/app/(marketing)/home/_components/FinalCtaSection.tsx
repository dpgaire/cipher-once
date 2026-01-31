"use client";

import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="py-10 md:py-28">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-xl bg-primary">
            <Lock className="h-10 w-10 text-primary-foreground" />
          </div>

          <h2 className="mb-6 text-3xl font-bold md:text-5xl lg:text-6xl">
            Share Secrets Safely and Instantly
          </h2>

          <p className="mb-10 text-lg text-muted-foreground">
            Join developers, teams, and businesses who rely on CipherOnce
            to share passwords, files, and confidential messages securely.
            Everything is encrypted, temporary, and under your control.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/create" passHref>
              <button className="group flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 sm:w-auto">
                Create Your First Secure Share
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            No signup • No credit card • Free forever • 100% private
          </p>
        </div>
      </div>
    </section>
  );
}
