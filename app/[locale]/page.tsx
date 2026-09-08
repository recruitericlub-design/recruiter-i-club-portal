import React from "react";
import { getMessages } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { CyberGridBackground } from "@/components/CyberGridBackground";
import { HeroSection } from "@/components/HeroSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { MobilizationComparisonSection } from "@/components/MobilizationComparisonSection";
import { CalculatorSection } from "@/components/CalculatorSection";
import { DerzhpratsiFinesCalculator } from "@/components/DerzhpratsiFinesCalculator";
import { IndustriesSection } from "@/components/IndustriesSection";
import { CandidateShowcase } from "@/components/CandidateShowcase";
import { WartimeSecurityProtocol } from "@/components/WartimeSecurityProtocol";
import { B2BTrustSection } from "@/components/B2BTrustSection";
import { HomeKnowledgeSection } from "@/components/HomeKnowledgeSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { DockNavigation } from "@/components/DockNavigation";
import { CosmicStarryBackground } from "@/components/CosmicStarryBackground";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-amber-500 selection:text-black relative">
      {/* Deep Cosmic Starfield with Twinkling Stars & Meteors across Entire Background */}
      <CosmicStarryBackground />

      {/* Fixed Navigation Bar with Audio Toggle */}
      <Navbar locale={locale} messages={messages} />

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        {/* 1. Cinematic Hero with 3D Holographic Interactive Flight Globe */}
        <HeroSection messages={messages} locale={locale} />

        {/* 2. Interactive Step-by-Step CRM Hiring Roadmap */}
        <RoadmapSection messages={messages} />

        {/* 3. Mobilization Immunity vs Local Hiring Risk Comparison */}
        <MobilizationComparisonSection locale={locale} />

        {/* 4. Smart Workforce Need Calculator & Direct CRM Lead Form */}
        <CalculatorSection messages={messages} />

        {/* 5. Derzhpratsi Labor Fines Calculator (2026 Audit Defense) */}
        <DerzhpratsiFinesCalculator locale={locale} />

        {/* 6. Target Industry Sectors (Детальний B2B-каталог кваліфікацій) */}
        <IndustriesSection />

        {/* 9. Live Pre-screened Candidate Dossier Showcase */}
        <CandidateShowcase />

        {/* 10. Wartime Security & Background Check Protocol */}
        <WartimeSecurityProtocol locale={locale} />

        {/* 11. Legal & Financial Guarantees */}
        <B2BTrustSection />

        {/* 12. Bento Knowledge Hub & Contextual Research */}
        <HomeKnowledgeSection locale={locale} />

        {/* 13. Comprehensive FAQ for Employers */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer locale={locale} />

      {/* Floating Tactical Dock Navigation (Aceternity UI) */}
      <DockNavigation locale={locale} />
    </div>
  );
}