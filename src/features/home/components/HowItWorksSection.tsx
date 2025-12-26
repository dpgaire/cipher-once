"use client";

import { Lock, Key, Flame, Shield, Server, Trash2 } from 'lucide-react';

export function HowItWorksSection() {
  return (
    <section id="how" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">How It Works</h2>
          <p className="text-lg text-gray-600">Three simple steps. Military-grade security.</p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                step: "1",
                icon: Lock,
                title: "Encrypt locally",
                desc: "Your secret is encrypted with AES-256 in your browser. The server never sees unencrypted data.",
              },
              {
                step: "2",
                icon: Key,
                title: "Share the link",
                desc: "The encryption key stays in the URL fragment. It never reaches our servers or appears in logs.",
              },
              {
                step: "3",
                icon: Flame,
                title: "Auto-destruct",
                desc: "After one view or when the timer expires, the encrypted data is permanently erased. No recovery possible.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600 text-2xl font-bold text-white">
                    {item.step}
                  </div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p className="text-base leading-relaxed text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Details */}
        <div className="mx-auto mt-16 max-w-4xl rounded-xl border border-gray-200 bg-white p-8">
          <h3 className="mb-6 text-xl font-bold">Technical Implementation</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="mb-1 text-sm font-semibold">AES-256-GCM Encryption</div>
                <div className="text-sm text-gray-600">Industry standard authenticated encryption</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <Key className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="mb-1 text-sm font-semibold">Random Key Generation</div>
                <div className="text-sm text-gray-600">Cryptographically secure 256-bit keys</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <Server className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="mb-1 text-sm font-semibold">Zero Server Knowledge</div>
                <div className="text-sm text-gray-600">Server only stores encrypted blobs</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <Trash2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="mb-1 text-sm font-semibold">Immediate Deletion</div>
                <div className="text-sm text-gray-600">Permanent erasure after retrieval</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
