"use client";

import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export function WavyBackgroundDemo() {
  return (
    <WavyBackground 
      className="max-w-4xl mx-auto pb-20 text-center px-4"
      colors={["#f59e0b", "#06b6d4", "#fbbf24", "#0284c7", "#10b981"]}
      waveOpacity={0.4}
      speed="slow"
    >
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-6">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Енергія української промисловості // 2026</span>
      </div>

      <p className="text-2xl md:text-4xl lg:text-5xl text-white font-extrabold tracking-tight font-sans">
        Підприємство не має зупинятися.
      </p>
      
      <p className="text-base md:text-lg mt-4 text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
        Прямий міжнародний найм дефіцитних робітничих кадрів для заводів, агросектору та будівництва України. 100% юридичний комплаєнс та імунітет від мобілізації.
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        <a
          href="#calculator"
          className="px-8 py-3.5 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 shadow-gold-glow flex items-center gap-2 transition-all active:scale-95"
        >
          <span>Замовити підбір бригади</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </WavyBackground>
  );
}
