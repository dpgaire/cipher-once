"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqs } from '../utils/faq-data';

export function FaqSection() {
  return (
    <section className="border-t border-border py-10 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto max-w-3xl space-y-2 lg:space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-sm lg:text-lg font-bold cursor-pointer">{faq.q}</AccordionTrigger>
                <AccordionContent className=" text-xs lg:text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
