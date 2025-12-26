import { Metadata } from "next";
import { HeroSection } from '@/features/home/components/HeroSection';
import { ProblemStatementSection } from '@/features/home/components/ProblemStatementSection';
import { HowItWorksSection } from '@/features/home/components/HowItWorksSection';
import { FeaturesSection } from '@/features/home/components/FeaturesSection';
import { UseCasesSection } from '@/features/home/components/UseCasesSection';
import { SecurityArchitectureSection } from '@/features/home/components/SecurityArchitectureSection';
import { ComparisonSection } from '@/features/home/components/ComparisonSection';
import { FaqSection } from '@/features/home/components/FaqSection';
import { FinalCtaSection } from '@/features/home/components/FinalCtaSection';


export const metadata: Metadata = {
  title: "CipherOnce: Zero-Knowledge Secret Sharing | One-Time Password Alternative",
  description: "Share secrets securely with CipherOnce. Our zero-knowledge, client-side encrypted platform offers a secure way to share passwords, API keys, and self-destructing messages online. The ultimate one-time secret alternative.",
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <HeroSection />
      <ProblemStatementSection />
      <HowItWorksSection />
      <FeaturesSection />
      <UseCasesSection />
      <SecurityArchitectureSection />
      <ComparisonSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
}
      