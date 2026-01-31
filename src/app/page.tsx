import { Metadata } from "next";
import { HeroSection } from '@/app/(marketing)/home/_components/HeroSection';
import dynamic from "next/dynamic";
const ProblemStatementSection = dynamic(() => import('@/app/(marketing)/home/_components/ProblemStatementSection').then(mod => mod.ProblemStatementSection));
const HowItWorksSection = dynamic(() => import('@/app/(marketing)/home/_components/HowItWorksSection').then(mod => mod.HowItWorksSection));
const FeaturesSection = dynamic(() => import('@/app/(marketing)/home/_components/FeaturesSection').then(mod => mod.FeaturesSection));
const UseCasesSection = dynamic(() => import('@/app/(marketing)/home/_components/UseCasesSection').then(mod => mod.UseCasesSection));
const SecurityArchitectureSection = dynamic(() => import('@/app/(marketing)/home/_components/SecurityArchitectureSection').then(mod => mod.SecurityArchitectureSection));
const ComparisonSection = dynamic(() => import('@/app/(marketing)/home/_components/ComparisonSection').then(mod => mod.ComparisonSection));
const FaqSection = dynamic(() => import('@/app/(marketing)/home/_components/FaqSection').then(mod => mod.FaqSection));
const FinalCtaSection = dynamic(() => import('@/app/(marketing)/home/_components/FinalCtaSection').then(mod => mod.FinalCtaSection));

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
      