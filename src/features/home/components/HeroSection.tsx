"use client";

import { Shield, ArrowRight } from 'lucide-react';
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-36">
      <div className="absolute inset-0 bg-blue-600 opacity-[0.02]"></div>
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-600 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            <Shield className="h-4 w-4" />
            End-to-End Encrypted • Zero-Knowledge Architecture
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Share secrets that
            <br />
            <span className="text-blue-600">vanish after one view</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
            The most secure way to share passwords, API keys, and confidential data.
            Encrypted in your browser, destroyed after reading. No traces, no logs, no exceptions.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/create" passHref>
              <button className="group flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-700 sm:w-auto">
                Create a Secret
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <button className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-900 hover:border-gray-300 hover:bg-gray-50 sm:w-auto">
              View Demo
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500">No registration • No credit card • Always free</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto mt-16 px-6">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-gray-200 rounded-xl border border-gray-200 bg-white">
          <div className="px-8 py-6 text-center">
            <div className="text-3xl font-bold text-blue-600">256-bit</div>
            <div className="mt-1 text-sm font-medium text-gray-600">AES Encryption</div>
          </div>
          <div className="px-8 py-6 text-center">
            <div className="text-3xl font-bold text-blue-600">100%</div>
            <div className="mt-1 text-sm font-medium text-gray-600">Client-Side</div>
          </div>
          <div className="px-8 py-6 text-center">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="mt-1 text-sm font-medium text-gray-600">Data Retention</div>
          </div>
        </div>
      </div>
    </section>
  );
}
