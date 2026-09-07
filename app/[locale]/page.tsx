import React from "react";
import { getMessages } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { RadarTelemetryTicker } from "@/components/RadarTelemetryTicker";
import { CyberGridBackground } from "@/components/CyberGridBackground";
import { HeroSection } from "@/components/HeroSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { HologramCandidateScanner } from "@/components/HologramCandidateScanner";
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
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-amber-500 selection:text-black relative">
      {/* Background Interactive Gravitational Particles */}
      <CyberGridBackground />

      {/* Fixed Navigation Bar with Audio Toggle */}
      <Navbar locale={locale} messages={messages} />

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        {/* Live Flight & Consular Radar Telemetry Bar */}
        <RadarTelemetryTicker />

        {/* 1. Cinematic Hero with 3D Holographic Interactive Flight Globe */}
        <HeroSection messages={messages} locale={locale} />

        {/* 2. Interactive Step-by-Step CRM Hiring Roadmap */}
        <RoadmapSection messages={messages} />

        {/* 3. Cybernetic Hologram & X-Ray Radiography Inspection Terminal */}
        <section id="terminal" className="py-16 relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-cyan-400 text-xs font-mono uppercase tracking-widest block mb-2 font-bold">
              [ ПЕРЕВІРКА КВАЛІФІКАЦІЇ ЗА СТАНДАРТОМ ISO ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Інтерактивний 3D-термінал верифікації робітників
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Перемикайте шари сканера: дивіться рентген-знімки швів під тиском, біометричні довідки та візові дозволи.
            </p>
          </div>
          <HologramCandidateScanner />
        </section>

        {/* 4. Smart Workforce Need Calculator & Direct CRM Lead Form */}
        <CalculatorSection messages={messages} />

        {/* 5. Target Industry Sectors */}
        <IndustriesSection />

        {/* 6. Live Pre-screened Candidate Dossier Showcase */}
        <CandidateShowcase />

        {/* 7. Legal & Financial Guarantees */}
        <B2BTrustSection />

        {/* 8. Comprehensive FAQ for Employers */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer locale={locale} />
    </div>
  );
}