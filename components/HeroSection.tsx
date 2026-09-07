"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  FileCheck2, 
  Clock, 
  Play
} from "lucide-react";
import { ClientLoginModal } from "./ClientLoginModal";

interface HeroSectionProps { messages: any; locale: string; }

export const HeroSection: React.FC<HeroSectionProps> = ({ messages, locale }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Video Container with Cinematic Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Poster / Fallback high-res industrial background */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=80")`,
          }}
        />

        {/* Video layer (HTML5 background video container ready for client video) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=80"
          className="w-full h-full object-cover opacity-35"
        >
          {/* Default industrial b-roll preview */}
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-welder-working-in-a-metal-workshop-43098-large.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Cinematic Multi-layered Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/15 blur-[140px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide shadow-gold-glow"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
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
              className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal"
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
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-bold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:brightness-110 shadow-gold-glow-lg transition-all duration-300"
              >
                <span>{messages.hero?.ctaPrimary}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => setIsLoginModalOpen(true)}
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
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/5 text-xs text-slate-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ-пїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅ D</span>
              </div>
            </motion.div>
          </div>

          {/* Right Floating Card: Live Verification Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="lg:col-span-4 hidden lg:block"
          >
            <div className="glass-card rounded-2xl p-6 border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/20 blur-3xl rounded-full" />
              
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    CRM Live Candidate
                  </span>
                </div>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md">
                  пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
                    alt="Candidate portrait"
                    className="w-14 h-14 rounded-xl object-cover border border-amber-500/40"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">пїЅпїЅпїЅпїЅпїЅпїЅ пїЅ. (32 пїЅпїЅпїЅпїЅ)</h4>
                    <p className="text-xs text-amber-400">пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ MIG/MAG 135/136</p>
                    <p className="text-[11px] text-slate-400">???? пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅ пїЅпїЅпїЅпїЅпїЅ 7 пїЅпїЅпїЅпїЅ</p>
                  </div>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-3 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>ВіпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ:</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> пїЅпїЅпїЅпїЅпїЅ пїЅпїЅ 100%
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ:</span>
                    <span className="text-white font-medium">пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>пїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅ?пїЅпїЅпїЅ:</span>
                    <span className="text-amber-300 font-semibold">24 пїЅпїЅ (ВіпїЅпїЅ D)</span>
                  </div>
                </div>

                <a
                  href="#calculator"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-amber-300" />
                  пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅ пїЅпїЅпїЅ
                </a>
              </div>
            </div>
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
              <div
                key={i}
                className="glass-card glass-card-hover rounded-2xl p-5 border-white/5 relative group"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-3 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium leading-snug">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    <ClientLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} locale={locale} messages={messages} />
    </section>
  );
};
