"use client";

import { AlertCircle } from 'lucide-react';

export function ProblemStatementSection() {
  return (
    <section className="border-t border-border py-10 lgpy-28">
      <div className="container mx-autopx-4 lg:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Email and chat apps weren't built for secrets
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            Every password you send via email or Slack lives forever in servers, backups, and logs.
            Even after you delete it. Even after you think it's gone.
          </p>
          <div className="mx-auto max-w-2xl rounded-xl border border-destructive/50 bg-destructive/10 p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 shrink-0 text-destructive" />
              <div className="text-left">
                <p className="text-sm font-semibold ">Security Incident Example</p>
                <p className="mt-2 text-sm leading-relaxed ">
                  A developer shares database credentials in Slack. Three months later, an attacker gains access
                  to their company Slack workspace. Result: Full database compromise from a "deleted" message.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-2xl font-bold text-primary">
            CipherOnce eliminates this risk completely.
          </p>
        </div>
      </div>
    </section>
  );
}
