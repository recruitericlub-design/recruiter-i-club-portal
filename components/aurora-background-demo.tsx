"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center text-center max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>НАЦІОНАЛЬНИЙ СТАНДАРТ РЕКРУТИНГУ // 2026</span>
        </div>

        <div className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Індустріальна стійкість українського бізнесу.
        </div>
        
        <div className="font-light text-base md:text-lg text-slate-300 py-3 max-w-2xl leading-relaxed">
          Забезпечуємо безперебійний випуск продукції на оборонних, машинобудівних та агропромислових підприємствах України завдяки легальному найму іноземних спеціалістів.
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <a
            href="#calculator"
            className="bg-gradient-to-r from-amber-400 to-yellow-400 rounded-xl text-black font-bold px-8 py-3.5 text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center gap-2"
          >
            <span>Розрахувати штат</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#terminal"
            className="border border-white/20 rounded-xl text-white font-medium px-6 py-3.5 text-xs hover:bg-white/5 transition-all"
          >
            Переглянути 3D-термінал
          </a>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
