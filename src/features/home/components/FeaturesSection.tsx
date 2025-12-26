"use client";

import { Shield, Lock, Flame, Eye, Clock, FileText, QrCode, Trash2, Globe, CheckCircle2 } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">Enterprise-Grade Security</h2>
          <p className="text-lg text-muted-foreground">Built with security professionals in mind</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Shield, title: "True Zero-Knowledge", desc: "We cannot decrypt your secrets. Period. The encryption key never leaves your device." },
            { icon: Lock, title: "Client-Side Encryption", desc: "All encryption happens in your browser using the Web Crypto API. We never see plaintext." },
            { icon: Flame, title: "Self-Destruct by Design", desc: "Secrets are deleted immediately after viewing. No grace period, no 'trash bin', no recovery." },
            { icon: Eye, title: "One-Time Access", desc: "Each secret can only be viewed once. Multiple access attempts are automatically blocked." },
            { icon: Clock, title: "Time-Based Expiration", desc: "Set custom expiration times from 5 minutes to 7 days. Unread secrets auto-delete." },
            { icon: FileText, title: "File Sharing", desc: "Share documents, images, and files up to 20MB with the same encryption standards." },
            { icon: QrCode, title: "QR Code Generation", desc: "Perfect for offline or in-person sharing. Scan and access securely." },
            { icon: Trash2, title: "No Content Logging", desc: "We don't log IP addresses, user agents, or any identifying information." },
            { icon: Globe, title: "No Account Required", desc: "Start sharing immediately. No registration, no tracking, no data collection." },
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
