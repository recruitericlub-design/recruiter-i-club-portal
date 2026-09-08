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
import { HeroBentoGrid } from "./HeroBentoGrid";
import { ContainerTextFlip } from "./ui/container-text-flip";
import { PointerHighlight } from "./ui/pointer-highlight";
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
            {/* Top Badge matching Reference Image */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-wide shadow-gold-glow"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Свіжі довідки ДЦЗ та візи D-04 — Оновлено 2 хв тому</span>
            </motion.div>

            {/* H1 Heading matching Reference Image */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]"
            >
              Людей бракує:{" "}
              <ContainerTextFlip
                words={[
                  "Зварювальників 135/136",
                  "Операторів ЧПУ",
                  "Арматурників",
                  "Будівельників",
                  "Швачок",
                  "Електриків",
                ]}
                className="my-1 sm:my-0"
              />
              <span className="block text-amber-400 font-black mt-2 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                Підприємство не має зупинятися.
              </span>
            </motion.h1>

            {/* Subtitle matching Reference Image */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal"
            >
              <PointerHighlight badgeText="100% Легально">
                <span className="text-white font-semibold underline decoration-amber-500/50 underline-offset-4">
                  Прямий міжнародний найм
                </span>
              </PointerHighlight>{" "}
              лінійного персоналу у ваш штат від 3 осіб. Наймайте напряму — роботодавець ви. Строк від 1 до 4 місяців (фіксовано в договорі). 4 платежі по 25% за результат, гарантія заміни 30 днів.
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
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:brightness-110 shadow-gold-glow-lg transition-all duration-300 active:scale-95"
              >
                <span>Замовити Персонал</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  playSciFiBeep(980, 0.06);
                  setIsLoginModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-semibold text-slate-200 hover:text-white glass-card hover:bg-slate-900/90 border border-slate-700/80 transition-all duration-300 active:scale-95"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>{messages.hero?.ctaSecondary || "База кандидатів"}</span>
              </button>
            </motion.div>

            {/* 3 Technical Guarantee Blueprint Cards matching Reference Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs font-mono"
            >
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-white/10 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <div className="text-white font-bold text-[11px]">Ліцензія ДСЗУ</div>
                  <div className="text-[9px] text-slate-500">Держреєстр 2026</div>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-white/10 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <div className="text-white font-bold text-[11px]">Рентген-контроль</div>
                  <div className="text-[9px] text-slate-500">Шви під тиском 25 бар</div>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-white/10 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <div className="text-white font-bold text-[11px]">100% візи під ключ</div>
                  <div className="text-[9px] text-slate-500">Повний юридичний супровід</div>
                </div>
              </div>
            </motion.div>

            {/* Faint Prisma CRM code watermark from reference image */}
            <div className="pt-2 font-mono text-[9px] text-slate-700/50 select-none pointer-events-none hidden sm:block">
              <div>Prisma CRM structure {'{'}</div>
              <div className="pl-3 text-slate-800">Prisme CRRM structure {'{'} candidate_status: VERIFIED, audit: D_04 {'}'}</div>
            </div>
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

        {/* 4-Module Master Bento Grid matching Reference Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <HeroBentoGrid locale={locale} messages={messages} />
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