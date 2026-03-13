"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Can CipherOnce employees read my secrets?",
    a: "No. Encryption happens in your browser before data is transmitted. The decryption key is embedded in the URL fragment, which is never sent to our servers by design — it's a browser standard. Our infrastructure stores only ciphertext that we cannot decrypt under any circumstance, including government requests or subpoenas.",
  },
  {
    q: "What happens after someone views a one-time secret?",
    a: "The encrypted payload is deleted in the same database transaction as the read operation. This is atomic — there is no window between reading and deletion. The data cannot be recovered by anyone, including our engineering team. We don't retain logs of secret content.",
  },
  {
    q: "Is the encryption implementation actually auditable?",
    a: "Yes. Our full encryption codebase is open-source on GitHub. We use the browser's native Web Crypto API with AES-256-GCM, so there are no proprietary black boxes. Security researchers are encouraged to review and report any issues through our responsible disclosure program.",
  },
  {
    q: "What encryption algorithm do you use?",
    a: "AES-256-GCM (Advanced Encryption Standard with 256-bit keys in Galois/Counter Mode). This is an authenticated encryption scheme that provides both confidentiality and integrity verification. It's the same standard used by the U.S. government for top-secret classified data.",
  },
  {
    q: "What data do you store on your servers?",
    a: "Only the AES-256-GCM ciphertext, an expiration timestamp, and an access counter. We store no plaintext, no decryption keys, no user identities, no IP addresses linked to secret content, and no analytics about what secrets contain. The URL fragment containing your key never reaches us.",
  },
  {
    q: "Can I use CipherOnce for HIPAA or SOC 2 compliance?",
    a: "CipherOnce's zero-knowledge architecture, ephemeral storage, and audit logging are well-aligned with data minimization requirements in HIPAA, SOC 2 Type II, and ISO 27001. We recommend consulting with your compliance team about specific requirements, but many enterprises use CipherOnce as part of their compliant secret-sharing workflow.",
  },
  {
    q: "Is there an API for developer and CI/CD integration?",
    a: "Yes. CipherOnce provides a clean REST API that allows you to create, retrieve, and manage ephemeral secrets programmatically. This enables integration with secret rotation workflows, deployment pipelines, and custom internal tooling while maintaining the same security guarantees as the web interface.",
  },
  {
    q: "What happens if the recipient loses the link before viewing?",
    a: "If the link is lost before access, the secret will expire according to the expiration time you set (1 hour, 24 hours, 7 days). After expiration, it's permanently deleted. There is no recovery path — this is intentional and is part of the security guarantee. Simply create a new secret and share the new link.",
  },
];

export function FaqSection() {
  return (
    <section className="relative border-t border-white/5 bg-[#0a0a0f] py-24 lg:py-36">
      {/* Ambient glow */}
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#C9A84C]/3 blur-[100px] pointer-events-none" />

      <div className="container relative mx-auto px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8a9a]">
              FAQ
            </span>
          </div>
          <h2
            className="mb-5 text-4xl font-bold text-white lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Questions worth asking
            <br />
            <span className="text-[#C9A84C]">before you share.</span>
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-white/5 bg-white/[0.02] px-6 transition-all duration-200 data-[state=open]:border-[#C9A84C]/20 data-[state=open]:bg-white/[0.04]"
              >
                <AccordionTrigger className="py-5 text-left text-sm font-semibold text-white hover:text-[#C9A84C] hover:no-underline [&[data-state=open]]:text-[#C9A84C] cursor-pointer">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-[#6a6a7a]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}