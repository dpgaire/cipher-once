"use client";

import { Shield, Server, Flame, Eye } from 'lucide-react';
import Link from 'next/link';

export function SecurityArchitectureSection() {
  return (
    <section id="security" className="border-t border-border py-10 md:py-28">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">Security Architecture</h2>
          <p className="text-lg text-muted-foreground">Transparency in design and implementation</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          <div className="rounded-xl border border-border bg-background p-8">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">End-to-End Encryption</h3>
            </div>
            <p className="mb-4 text-muted-foreground">
              Every secret is encrypted using AES-256-GCM before leaving your device. The encryption key is
              generated locally and embedded in the URL fragment (#), which is never sent to our servers.
            </p>
            <div className="rounded-lg bg-muted wrap-break-word p-4 font-mono text-xs text-muted-foreground">
              https://cipheronce.com/s/abc123<span className="text-primary">#encryption-key-here</span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-8">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Server className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Zero-Knowledge Storage</h3>
            </div>
            <p className="text-muted-foreground">
              Our servers only store encrypted data blobs. Without the decryption key (which we never see),
              the stored data is mathematically impossible to decrypt. Not even our engineers can access your secrets.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background p-8">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Flame className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Guaranteed Destruction</h3>
            </div>
            <p className="text-muted-foreground">
              After a secret is viewed or expires, it's permanently deleted from all systems. No backups,
              no snapshots, no recovery options. This ensures secrets cannot be accessed through data breaches or legal requests.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background p-8">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Eye className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Privacy First</h3>
            </div>
            <p className="text-muted-foreground">
              We don't collect IP addresses, browser fingerprints, or any personally identifiable information.
              No tracking pixels, no analytics scripts, no third-party cookies. Your privacy is absolute.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 lg:mt-12 max-w-4xl rounded-xl border border-primary/50 bg-primary/10 p-8 text-center">
          <p className="text-lg font-semibold text-primary">
            Want to verify our security claims? Our encryption implementation is open-source and independently auditable.
          </p>
          <Link href="https://github.com/dpgaire/cipher-once" target="_blank">

          <button className="mt-4 text-sm cursor-pointer font-semibold text-primary hover:text-primary/90">
            View Source Code →
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
