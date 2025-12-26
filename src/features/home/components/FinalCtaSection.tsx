"use client";

import { Lock, ArrowRight } from 'lucide-react';
import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-xl bg-blue-600">
            <Lock className="h-10 w-10 text-white" />
          </div>

          <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Start sharing secrets securely
          </h2>

          <p className="mb-10 text-lg text-gray-600">
            Join thousands of developers, teams, and businesses who trust CipherOnce
            for their most sensitive data sharing needs.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/create" passHref>
              <button className="group flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-700 sm:w-auto">
                Create Your First Secret
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            No signup required • Free forever • 100% secure
          </p>
        </div>
      </div>
    </section>
  );
}
