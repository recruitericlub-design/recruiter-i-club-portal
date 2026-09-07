"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  FileCheck2, 
  Clock, 
  Play,
  Compass
} from "lucide-react";
import { ClientLoginModal } from "./ClientLoginModal";
import { InteractiveGlobe3D } from "./InteractiveGlobe3D";
import { SpotlightCard } from "./SpotlightCard";
import { playSciFiBeep } from "@/lib/soundFX";

interface HeroSectionProps {
  messages: any;
  locale: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ messages, locale }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Video & Cinematic Dark Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=80"
          className="w-full h-full object-cover opacity-20"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-welder-working-in-a-metal-workshop-43098-large.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Multi-layered Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute -top-40 left-1/3 w-[800px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Hero Left Column */}
          <div className="lg:col-span-6 space-y-7 text-center sm:text-left">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide shadow-gold-glow"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
              <span>{messages.hero?.badge}</span>
            </motion.div>

            {/* H1 Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              {messages.hero?.titleStart}{" "}
              <span className="gold-gradient-text block sm:inline">
                {messages.hero?.titleHighlight}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal"
            >
              {messages.hero?.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <a
                href="#calculator"
                onClick={() => playSciFiBeep(1200, 0.08)}
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-bold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:brightness-110 shadow-gold-glow-lg transition-all duration-300"
              >
                <span>{messages.hero?.ctaPrimary}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  playSciFiBeep(980, 0.06);
                  setIsLoginModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-semibold text-slate-200 hover:text-white glass-card hover:bg-slate-900/90 border border-slate-700/80 transition-all duration-300"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>{messages.hero?.ctaSecondary}</span>
              </button>
            </motion.div>

            {/* Micro Guarantees Bullet List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/5 text-xs text-slate-400 font-mono"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Ліцензія ДСЗУ</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Рентген-контроль швів</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% візи D під ключ</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Holographic Flight Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            <InteractiveGlobe3D />
          </motion.div>

        </div>

        {/* Bottom Key Metric Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { value: messages.hero?.stat1Value, label: messages.hero?.stat1Label, icon: Users },
            { value: messages.hero?.stat2Value, label: messages.hero?.stat2Label, icon: ShieldCheck },
            { value: messages.hero?.stat3Value, label: messages.hero?.stat3Label, icon: Clock },
            { value: messages.hero?.stat4Value, label: messages.hero?.stat4Label, icon: FileCheck2 },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <SpotlightCard
                key={i}
                spotlightColor="amber"
                className="p-5 flex flex-col justify-between"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-3 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium leading-snug">
                  {stat.label}
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 font-mono text-[9px] text-amber-500/50 uppercase tracking-widest">
                  [ VERIFIED // 2026 ]
                </div>
              </SpotlightCard>
            );
          })}
        </motion.div>

        {/* Industrial Verification & National Resilience Seals Row (Concept 3) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center sm:justify-between gap-6 text-center"
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/5 backdrop-blur-md">
            <div className="w-8 h-8 rounded-full border border-amber-500/40 flex items-center justify-center text-[10px] font-mono font-bold text-amber-400">
              ISO
            </div>
            <div className="text-left">
              <div className="text-[11px] font-bold text-white font-mono">UKR-ISO 9001:2026</div>
              <div className="text-[9px] text-slate-400">Кваліфікаційний ВТК аудит</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/60 border border-emerald-500/20 backdrop-blur-md">
            <div className="w-8 h-8 rounded-full border border-emerald-500/40 flex items-center justify-center text-[10px] font-mono font-bold text-emerald-400">
              100%
            </div>
            <div className="text-left">
              <div className="text-[11px] font-bold text-white font-mono">СТ. 23 ЗУ // ІМУНІТЕТ</div>
              <div className="text-[9px] text-emerald-400/80">Звільнення від мобілізації</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-md">
            <div className="w-8 h-8 rounded-full border border-cyan-500/40 flex items-center justify-center text-[10px] font-mono font-bold text-cyan-400">
              ДЦЗ
            </div>
            <div className="text-left">
              <div className="text-[11px] font-bold text-white font-mono">ОФІЦІЙНИЙ ДОЗВІЛ</div>
              <div className="text-[9px] text-slate-400">Прямий контракт у штат</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/5 backdrop-blur-md">
            <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center text-[10px] font-mono font-bold text-amber-300">
              SLA
            </div>
            <div className="text-left">
              <div className="text-[11px] font-bold text-white font-mono">ГАРАНТІЯ 30 ДНІВ</div>
              <div className="text-[9px] text-slate-400">Безкоштовна заміна 0 грн</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Client Login Modal */}
      <ClientLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        locale={locale}
        messages={messages}
      />
    </section>
  );
};