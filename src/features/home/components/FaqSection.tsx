"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FaqSection() {
  const faqs = [
    {
      q: "How is this different from password managers?",
      a: "Password managers are for storing your own credentials long-term. CipherOnce is for securely sharing secrets with others that self-destruct after being viewed once."
    },
    {
      q: "Can you recover a secret after it's been viewed?",
      a: "No. Once a secret is viewed or expires, it's permanently deleted from our systems. There is no recovery mechanism, not even for our administrators."
    },
    {
      q: "What happens if I lose the link?",
      a: "The link contains the encryption key. If you lose it before the secret is viewed, the encrypted data becomes permanently inaccessible. We recommend copying secrets to your clipboard before closing the page."
    },
    {
      q: "Is my data really secure?",
      a: "Yes. We use AES-256-GCM encryption performed entirely in your browser. The encryption key never reaches our servers. Even if our systems were compromised, attackers would only find encrypted data they cannot decrypt."
    },
    {
      q: "Do you keep any logs?",
      a: "We maintain minimal operational logs for security monitoring (failed access attempts, rate limiting) but do not log IP addresses, user agents, or any content-related information."
    },
    {
      q: "Can I use this for business/commercial purposes?",
      a: "Absolutely. Many businesses use CipherOnce for securely sharing credentials, API keys, and confidential documents with partners, contractors, and team members."
    }
  ];

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">Frequently Asked Questions</h2>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-lg font-bold">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-gray-600">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
