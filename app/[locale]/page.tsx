import React from "react";
import { getMessages } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { CalculatorSection } from "@/components/CalculatorSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { CandidateShowcase } from "@/components/CandidateShowcase";
import { B2BTrustSection } from "@/components/B2BTrustSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* Fixed Navigation Bar */}
      <Navbar locale={locale} messages={messages} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* 1. Cinematic Hero Section with Background Video & Real-time Stats */}
        <HeroSection messages={messages} onOpenLogin={() => {}} />

        {/* 2. Interactive Step-by-Step CRM Hiring Roadmap */}
        <RoadmapSection messages={messages} />

        {/* 3. Smart Workforce Need Calculator & Direct CRM Lead Form */}
        <CalculatorSection messages={messages} />

        {/* 4. Target Industry Sectors */}
        <IndustriesSection />

        {/* 5. Live Pre-screened Candidate Dossier Showcase */}
        <CandidateShowcase />

        {/* 6. Legal & Financial Guarantees */}
        <B2BTrustSection />

        {/* 7. Comprehensive FAQ for Employers */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer locale={locale} />
    </div>
  );
}