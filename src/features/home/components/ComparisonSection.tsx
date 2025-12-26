"use client";

import { CheckCircle2 } from 'lucide-react';

export function ComparisonSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">Why Not Use Email or Chat?</h2>
          <p className="text-lg text-muted-foreground">See the difference for yourself</p>
        </div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Email / Chat</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-primary">CipherOnce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["End-to-end encrypted", false, true],
                ["Self-destructs after reading", false, true],
                ["No server-side storage", false, true],
                ["Zero knowledge architecture", false, true],
                ["No permanent logs", false, true],
                ["Cannot be forwarded", false, true],
                ["Time-based expiration", false, true],
                ["No account required", false, true],
              ].map((item) => {
                const featureName = item[0] as string;
                const email = item[1];
                const cipher = item[2];
                return (
                  <tr key={featureName}>
                    <td className="px-6 py-4 text-sm text-foreground">{featureName}</td>
                    <td className="px-6 py-4 text-center">
                      {email ? (
                        <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <div className="mx-auto h-5 w-5 rounded-full bg-muted-foreground/20"></div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {cipher ? (
                        <CheckCircle2 className="mx-auto h-5 w-5 text-primary" />
                      ) : (
                        <div className="mx-auto h-5 w-5 rounded-full bg-muted-foreground/20"></div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
