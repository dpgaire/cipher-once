"use client";

import { AlertCircle } from "lucide-react";

export function ProblemStatementSection() {
  return (
    <section className="border-t border-border py-10 lg:py-28">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Traditional email and chat apps weren’t built for secrets
          </h2>

          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            Passwords, API keys, confidential documents, and sensitive messages can live forever
            in inboxes, backups, and chat logs — even after you think they’re deleted.
            Accidental leaks, compromised accounts, or insider errors put your data at risk.
          </p>

          <div className="mx-auto max-w-2xl rounded-xl border border-destructive/50 bg-destructive/10 p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 shrink-0 text-destructive" />
              <div className="text-left">
                <p className="text-sm font-semibold">Real Security Example</p>
                <p className="mt-2 text-sm leading-relaxed">
                  A developer shares database credentials in Slack. Months later, an attacker
                  gains access to the workspace. Even “deleted” messages can be retrieved,
                  leading to full database compromise.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-2xl font-bold text-primary">
            CipherOnce keeps secrets secure, private, and temporary — automatically.
          </p>

          <p className="mt-4 text-lg text-muted-foreground">
            Share files, passwords, API keys, or messages with one-time access,
            expiration, and full encryption. No traces, no logs, no risk.
          </p>
        </div>
      </div>
    </section>
  );
}
