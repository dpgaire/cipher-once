"use client";

import { AlertCircle } from 'lucide-react';

export function ProblemStatementSection() {
  return (
    <section className="border-t border-gray-200 bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Email and chat apps weren't built for secrets
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            Every password you send via email or Slack lives forever in servers, backups, and logs.
            Even after you delete it. Even after you think it's gone.
          </p>
          <div className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 flex-shrink-0 text-red-600" />
              <div className="text-left">
                <p className="text-sm font-semibold text-red-900">Security Incident Example</p>
                <p className="mt-2 text-sm leading-relaxed text-red-800">
                  A developer shares database credentials in Slack. Three months later, an attacker gains access
                  to their company Slack workspace. Result: Full database compromise from a "deleted" message.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-2xl font-bold text-blue-600">
            CipherOnce eliminates this risk completely.
          </p>
        </div>
      </div>
    </section>
  );
}
