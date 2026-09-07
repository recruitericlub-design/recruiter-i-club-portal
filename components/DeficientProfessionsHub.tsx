"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  Flame, 
  ArrowRight, 
  Clock, 
  Award, 
  Activity, 
  ChevronRight, 
  TrendingUp, 
  Factory, 
  HardHat, 
  Truck, 
  Scissors, 
  Utensils, 
  Tractor 
} from "lucide-react";
import { DEFICIENT_PROFESSIONS, DeficientProfession } from "@/lib/professionsData";

export const DeficientProfessionsHub: React.FC<{ locale: string }> = ({ locale }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

  const isUk = locale === "uk";
  const isRu = locale === "ru";

  const industryTabs = [
    { id: "all", label: isUk ? "Всі професії (10)" : isRu ? "Все профессии (10)" : "All Jobs", icon: Briefcase },
    { id: "metal", label: isUk ? "Металообробка" : isRu ? "Металлообработка" : "Metal", icon: Factory },
    { id: "construction", label: isUk ? "Будівництво" : isRu ? "Строительство" : "Construction", icon: HardHat },
    { id: "logistics", label: isUk ? "Логістика" : isRu ? "Логистика" : "Logistics", icon: Truck },
    { id: "textile", label: isUk ? "Текстиль" : isRu ? "Текстиль" : "Textile", icon: Scissors },
    { id: "food", label: isUk ? "Харчопром" : isRu ? "Пищепром" : "Food", icon: Utensils },
    { id: "agro", label: isUk ? "Агрокомплекс" : isRu ? "Агрокомплекс" : "Agro", icon: Tractor },
  ];

  const filteredProfessions = selectedIndustry === "all"
    ? DEFICIENT_PROFESSIONS
    : DEFICIENT_PROFESSIONS.filter((p) => p.industryId === selectedIndustry);

  return (
    <section id="professions-hub" className="py-24 relative z-10 bg-slate-950/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>Каталог робітничих кадрів 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Дефіцитні виробничі професії з перевіреною виробіткою
          </h2>
          <p className="mt-4 text-sm text-slate-400 max-w-2xl mx-auto">
            Кандидати з практичним досвідом від 3–5 років, протестовані в навчальних цехах за стандартами ISO. Оберіть спеціальність та отримайте відеозвіти кваліфікації.
          </p>
        </div>

        {/* Industry Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {industryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedIndustry === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedIndustry(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-amber-500 text-black shadow-gold-glow"
                    : "bg-slate-900/90 text-slate-400 hover:text-white border border-white/5 hover:border-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessions.map((prof) => {
            const title = isUk ? prof.title.uk : isRu ? prof.title.ru : prof.title.en;
            const desc = isUk ? prof.shortDesc.uk : isRu ? prof.shortDesc.ru : prof.shortDesc.en;
            const norm = isUk ? prof.shiftOutputNorm.uk : isRu ? prof.shiftOutputNorm.ru : prof.shiftOutputNorm.en;
            const delivery = isUk ? prof.deliveryTime.uk : isRu ? prof.deliveryTime.ru : prof.deliveryTime.en;
            const salary = isUk ? prof.salaryBenchmark.uk : isRu ? prof.salaryBenchmark.ru : prof.salaryBenchmark.en;

            return (
              <div
                key={prof.id}
                className="glass-card rounded-2xl p-6 border-white/10 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] relative overflow-hidden"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-red-500/15 text-red-300 border border-red-500/30 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{prof.demandPercentage}% дефіцит</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-white/5">
                      {prof.standards}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-2">
                    {title}
                  </h3>

                  {/* Short description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {desc}
                  </p>

                  {/* Shift Output Metric Box */}
                  <div className="p-3 bg-slate-950/70 rounded-xl border border-white/5 space-y-1 mb-4">
                    <span className="text-[10px] text-amber-400/90 font-bold uppercase tracking-wider block">
                      Норматив виробітки за зміну:
                    </span>
                    <p className="text-xs font-semibold text-slate-200">
                      {norm}
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {prof.skillsList.map((skill, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Строк прибуття:</span>
                    <span className="font-mono text-white font-semibold">{delivery}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Орієнтовна ставка:</span>
                    <span className="font-mono text-amber-400 font-bold">{salary}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <a
                      href="#calculator"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center gap-1.5"
                    >
                      <span>Замовити під ключ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <Link
                      href={`/${locale}/professions/${prof.slug}`}
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Специфікація</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
