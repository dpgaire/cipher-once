"use client";

import { CheckCircle2 } from 'lucide-react';
import { useCases } from '../utils/use-cases-data';

export function UseCasesSection() {
  return (
    <section className="py-10 md:py-28">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">Trusted By Professionals</h2>
          <p className="text-lg text-muted-foreground">From startups to Fortune 500 companies</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {useCases.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.title} className="rounded-xl border border-border bg-background p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-6 text-xl font-bold">{group.title}</h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
