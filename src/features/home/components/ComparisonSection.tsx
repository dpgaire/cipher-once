"use client";

import { CheckCircle2, X } from 'lucide-react';
import { comparisonData } from '../utils/comparison-data';

export function ComparisonSection() {
  return (
    <section className="py-10 md:py-28">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">Why Not Use Email or Chat?</h2>
          <p className="text-lg text-muted-foreground">See the difference for yourself</p>
        </div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 lg:px-6 lg:py-4 text-left text-sm font-semibold">Feature</th>
                <th className="px-4 py-2 lg:px-6 lg:py-4 text-center text-sm font-semibold">Email/Chat</th>
                <th className="px-4 py-2 lg:px-6 lg:py-4 text-center text-sm font-semibold text-primary">CipherOnce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {comparisonData.map((item) => {
                const featureName = item[0] as string;
                const email = item[1];
                const cipher = item[2];
                return (
                  <tr key={featureName}>
                    <td className="px-4 py-2 lg:px-6 lg:py-4 text-sm text-foreground">{featureName}</td>
                    <td className="px-4 py-2 lg:px-6 lg:py-4 text-center">
                      {!email ? (
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      ) : (
                        <div className="mx-auto h-5 w-5 rounded-full bg-muted-foreground/20"></div>
                      )}
                    </td>
                    <td className="px-4 py-2 lg:px-6 lg:py-4 text-center">
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
