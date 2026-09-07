"use client";

import React, { useState } from "react";
import { AlertOctagon, ShieldCheck, ArrowRight, CheckCircle2, TrendingDown, Scale } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { playSliderTick, playMechanicalClick } from "@/lib/soundFX";

export const DerzhpratsiFinesCalculator: React.FC<{ locale: string }> = ({ locale }) => {
  const [workersCount, setWorkersCount] = useState<number>(5);
  const [formDone, setFormDone] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  const minWage = 8647; // 2026 minimum wage in UAH
  const fineSingle = minWage * 10; // 86,470 грн (10 МЗП)
  const fineRepeat = minWage * 30; // 259,410 грн (30 МЗП)
  const permitFee = 9984; // 3 ПМПО (3,328 * 3)

  const totalFineFirst = workersCount * fineSingle;
  const totalFineRepeat = workersCount * fineRepeat;
  const totalPermitCost = workersCount * permitFee;
  const potentialSavings = totalFineFirst - totalPermitCost;

  const handleSliderChange = (val: number) => {
    playSliderTick();
    setWorkersCount(val);
  };

  const handlePresetClick = (val: number) => {
    playMechanicalClick();
    setWorkersCount(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: company,
          phone,
          specialty: `Калькулятор штрафів Держпраці: ${workersCount} робітників`,
          workersCount,
          contactName: "B2B Аудит Держпраці",
        }),
      });
      setFormDone(true);
    } catch {
      setFormDone(true);
    }
  };

  return (
    <section id="fines-calculator" className="py-20 relative z-10 bg-slate-900/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Калькулятор фінансових ризиків 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Оцініть ризик штрафів Держпраці за роботу без офіційного дозволу
          </h2>
          <p className="mt-4 text-sm text-slate-400 max-w-2xl mx-auto">
            У 2026 році штраф за допуск одного неоформленого працівника або фіктивний лізинг становить <strong>10 мінімальних зарплат (86 470 грн)</strong>. Розрахуйте суму відповідальності та переведіть штат у біле правове поле.
          </p>
        </div>

        {/* Interactive Bento Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Controls */}
          <SpotlightCard
            spotlightColor="amber"
            className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-bold text-white">
                  Кількість робітників у зоні ризику:
                </label>
                <span className="text-2xl font-black font-mono text-amber-400">
                  {workersCount} осіб
                </span>
              </div>

              <input
                type="range"
                min={1}
                max={50}
                value={workersCount}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 mb-6"
              />

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono text-slate-400 mb-6">
                <button
                  type="button"
                  onClick={() => handlePresetClick(5)}
                  className={`p-2 rounded-lg border transition-all active:scale-95 ${workersCount === 5 ? "bg-amber-500 text-black font-bold border-amber-400" : "bg-slate-950 border-white/5 hover:border-white/20"}`}
                >
                  5 осіб (Бригада)
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick(15)}
                  className={`p-2 rounded-lg border transition-all active:scale-95 ${workersCount === 15 ? "bg-amber-500 text-black font-bold border-amber-400" : "bg-slate-950 border-white/5 hover:border-white/20"}`}
                >
                  15 осіб (Зміна)
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick(30)}
                  className={`p-2 rounded-lg border transition-all active:scale-95 ${workersCount === 30 ? "bg-amber-500 text-black font-bold border-amber-400" : "bg-slate-950 border-white/5 hover:border-white/20"}`}
                >
                  30 осіб (Цех)
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Scale className="w-4 h-4 shrink-0" />
                  <span>Стаття 265 Кодексу законів про працю України:</span>
                </div>
                <p className="leading-relaxed">
                  Фактичний допуск працівника до роботи без оформлення трудового договору (контракту) та дозволу ДЦЗ карається штрафом у розмірі 10 МЗП (86 470 грн) за кожного працівника, щодо якого скоєно порушення.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 text-[11px] text-slate-500 flex items-center justify-between font-mono">
              <span>* Розрахунок на базі МЗП 8 647 грн (2026 рік)</span>
              <span className="text-amber-500/60">[СТ. 265 КЗПП]</span>
            </div>
          </SpotlightCard>

          {/* Right: Calculations & Lead Capture */}
          <SpotlightCard
            spotlightColor="rose"
            className="lg:col-span-6 p-6 sm:p-8 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 flex flex-col justify-between space-y-6 shadow-2xl"
          >
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-3">
                Фінансовий ризик при перевірці Держпраці:
              </span>

              {/* Fines Comparison Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30">
                  <span className="text-[11px] text-red-300 block mb-1">Перше виявлення (10 МЗП):</span>
                  <span className="text-2xl font-black font-mono text-red-400">
                    {totalFineFirst.toLocaleString("uk-UA")} грн
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50">
                  <span className="text-[11px] text-red-300 block mb-1">Повторне порушення (30 МЗП):</span>
                  <span className="text-2xl font-black font-mono text-red-300">
                    {totalFineRepeat.toLocaleString("uk-UA")} грн
                  </span>
                </div>
              </div>

              {/* White Legal Hiring Alternative */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 mb-6">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Вартість офіційного мита ДЦЗ:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {totalPermitCost.toLocaleString("uk-UA")} грн
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-emerald-500/20">
                  <span className="text-emerald-300 font-bold">Запобігання збиткам (економія):</span>
                  <span className="font-mono text-emerald-300 font-black text-sm">
                    +{potentialSavings.toLocaleString("uk-UA")} грн
                  </span>
                </div>
              </div>
            </div>

            {/* Lead Form */}
            <div>
              {formDone ? (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center gap-3 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Дякуємо! Юрист зв'яжеться з вами для проведення безкоштовного аудиту ризиків.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Компанія (ТОВ/ФОП)"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="+380 (XX) XXX-XX-XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs rounded-xl shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Замовити офіційний аудит штату (0 грн)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* State Audit Seal */}
              <div className="mt-4 pt-3 border-t border-white/5 text-[9px] font-mono text-slate-500 uppercase tracking-widest text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-red-400/80" />
                <span>[ ДЕРЖПРАЦІ АУДИТ 2026 // СТ. 265 КЗПП // ПОВНИЙ КОМПЛАЄНС ]</span>
              </div>
            </div>
          </SpotlightCard>

        </div>

      </div>
    </section>
  );
};
