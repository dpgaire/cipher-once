import { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from '@/features/home/components/HeroSection';

const ProblemStatementSection = dynamic(() => import('@/features/home/components/ProblemStatementSection').then(mod => mod.ProblemStatementSection));
const HowItWorksSection = dynamic(() => import('@/features/home/components/HowItWorksSection').then(mod => mod.HowItWorksSection));
const FeaturesSection = dynamic(() => import('@/features/home/components/FeaturesSection').then(mod => mod.FeaturesSection));
const UseCasesSection = dynamic(() => import('@/features/home/components/UseCasesSection').then(mod => mod.UseCasesSection));
const SecurityArchitectureSection = dynamic(() => import('@/features/home/components/SecurityArchitectureSection').then(mod => mod.SecurityArchitectureSection));
const ComparisonSection = dynamic(() => import('@/features/home/components/ComparisonSection').then(mod => mod.ComparisonSection));
const FaqSection = dynamic(() => import('@/features/home/components/FaqSection').then(mod => mod.FaqSection));
const FinalCtaSection = dynamic(() => import('@/features/home/components/FinalCtaSection').then(mod => mod.FinalCtaSection));

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
      