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
  title: "CipherOnce: Secure, Ephemeral, Zero-Knowledge Secret Sharing",
  description: "Share secrets, passwords, and API keys securely with end-to-end encrypted, self-destructing links. CipherOnce is a zero-knowledge platform for ephemeral and secure data transfer.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
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
      