"use client";

import { howItWorksSteps, technicalDetails } from "../utils/how-it-works-data";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-10 lg:py-28">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps. Military-grade security.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 grid-cols-1 lg:grid-cols-3">
            {howItWorksSteps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center rounded-2xl bg-background p-4 lg:p-6 shadow-sm transition sm:bg-transparent sm:p-0 sm:shadow-none"
                >
                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 sm:h-12 sm:w-12 sm:rounded-lg">
                    <Icon
                      className={`h-7 w-7 sm:h-6 sm:w-6 ${
                        item.step === "2"
                          ? "text-green-500"
                          : item.step === "3"
                          ? "text-red-500"
                          : "text-primary"
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-bold sm:text-lg">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-sm">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Details */}
        <div className="mx-auto mt-12 lg:mt-16 max-w-4xl rounded-xl border border-border bg-background p-8">
          <h3 className="mb-6 text-lg lg:text-xl font-bold">
            Technical Implementation
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {technicalDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                    <div className="flex gap-4" key={detail.title}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <div className="mb-1 text-sm font-semibold">
                                {detail.title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {detail.desc}
                            </div>
                        </div>
                    </div>
                )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
