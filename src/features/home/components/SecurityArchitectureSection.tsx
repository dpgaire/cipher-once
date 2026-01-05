"use client";

import Link from 'next/link';
import { securityArchitectureDetails } from '../utils/security-architecture-data';

export function SecurityArchitectureSection() {
  return (
    <section id="security" className="border-t border-border py-10 md:py-28">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">Security Architecture</h2>
          <p className="text-lg text-muted-foreground">Transparency in design and implementation</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          {securityArchitectureDetails.map(detail => {
            const Icon = detail.icon;
            return (
              <div key={detail.title} className="rounded-xl border border-border bg-background p-8">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">{detail.title}</h3>
                </div>
                <p className="mb-4 text-muted-foreground">
                  {detail.description}
                </p>
                {detail.example && (
                  <div className="rounded-lg bg-muted wrap-break-word p-4 font-mono text-xs text-muted-foreground">
                    {detail.example}<span className="text-primary">#encryption-key-here</span>
                  </div>
                )}
              </div>
            )
          })}
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
