"use client";

import React, { useState, useMemo } from "react";
import { 
  Users, 
  Globe2, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowRight,
  Calculator,
  Banknote,
  FileCheck2,
  Lock,
  ChevronRight,
  AlertCircle,
  Loader2
} from "lucide-react";
import { playSliderTick, playMechanicalClick, playSciFiBeep } from "@/lib/soundFX";

interface CalculatorSectionProps {
  messages: any;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ messages }) => {
  // Step 1: Specialty
  const [specialtyId, setSpecialtyId] = useState<string>("welder");
  // Step 2: Workers count (slider 3 to 50)
  const [workersCount, setWorkersCount] = useState<number>(5);
  // Step 3: Region corridor
  const [region, setRegion] = useState<"cis" | "asia">("cis");

  // Lead Form
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedDealId, setSubmittedDealId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const specialties = [
    { 
      id: "welder", 
      name: "Зварювальники (MIG/MAG 135/136)", 
      cisWage: 950, 
      asiaWage: 650,
      badge: "Шов під рентген 25 бар" 
    },
    { 
      id: "cnc", 
      name: "Оператори верстатів ЧПК / Токарі", 
      cisWage: 1100, 
      asiaWage: 750,
      badge: "Siemens, Fanuc, Haas" 
    },
    { 
      id: "builder", 
      name: "Арматурники / Монолітники / Муляри", 
      cisWage: 850, 
      asiaWage: 600,
      badge: "В'язка від 1.2 т/зміна" 
    },
    { 
      id: "seamstress", 
      name: "Промислові швачки", 
      cisWage: 750, 
      asiaWage: 600,
      badge: "Спецодяг та амуніція" 
    },
    { 
      id: "warehouse", 
      name: "Водії штабелерів / Комплектувальники", 
      cisWage: 800, 
      asiaWage: 600,
      badge: "WMS системи та ТЗД" 
    },
  ];

  const currentSpecialty = specialties.find(s => s.id === specialtyId) || specialties[0];

  // Pricing calculations
  const pricePerWorkerEUR = useMemo(() => {
    if (region === "cis") {
      if (workersCount >= 30) return 950;
      if (workersCount >= 10) return 1050;
      return 1150;
    } else {
      if (workersCount >= 30) return 800;
      if (workersCount >= 10) return 850;
      return 950;
    }
  }, [region, workersCount]);

  const eurRate = 45.0; // UAH/EUR
  const totalContractEUR = pricePerWorkerEUR * workersCount;
  const totalContractUAH = totalContractEUR * eurRate;
  const tranche25EUR = totalContractEUR * 0.25;
  const tranche25UAH = totalContractUAH * 0.25;

  const monthlyWageEUR = region === "cis" ? currentSpecialty.cisWage : currentSpecialty.asiaWage;
  const totalMonthlyFotEUR = monthlyWageEUR * workersCount;
  const totalMonthlyFotUAH = totalMonthlyFotEUR * eurRate;

  const timelineDays = region === "cis" ? "30–45 календарних днів" : "90–110 календарних днів";

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          contactName,
          phone,
          specialty: currentSpecialty.name,
          workersCount,
          requirements: `Регіон: ${region === "cis" ? "Узбекистан (СНД)" : "Південна Азія (Індія/Непал)"}. Бюджет: €${totalContractEUR}. Термін: ${timelineDays}.`,
          salaryOffered: `€${monthlyWageEUR}/міс`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Помилка надсилання заявки");
      setSubmittedDealId(data.dealId || "DEAL-RECORDED");
      playSciFiBeep(1200, 0.15);
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="calculator" className="py-24 relative bg-slate-900/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>ПРОЗОРИЙ B2B РОЗРАХУНОК 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Калькулятор вартості прямого залучення в штат
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Оберіть спеціальність, обсяг зміни та країну — отримайте фіксовану вартість під ключ та графік безпечної оплати 4×25%.
          </p>
        </div>

        {/* Calculator Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 3 Clear Steps */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-white/15 backdrop-blur-xl shadow-2xl space-y-6">
              
              {/* STEP 1: Specialty */}
              <div>
                <label className="block text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3">
                  КРОК 1. Оберіть кваліфікацію працівників
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {specialties.map((spec) => {
                    const isSelected = specialtyId === spec.id;
                    return (
                      <button
                        key={spec.id}
                        onClick={() => {
                          playMechanicalClick();
                          setSpecialtyId(spec.id);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-amber-500/20 border-amber-400 text-white shadow-gold-glow"
                            : "bg-slate-900/80 border-white/10 text-slate-300 hover:text-white hover:bg-slate-800"
                        }`}
                      >
                        <div className="font-bold text-xs">{spec.name}</div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                          <span className="text-amber-300 font-mono">
                            від €{region === "cis" ? spec.cisWage : spec.asiaWage}/міс
                          </span>
                          <span className="text-[9px] font-mono text-slate-500">{spec.badge}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Workers Count Slider */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    КРОК 2. Кількість робітників у зміну
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-amber-400 font-mono">{workersCount}</span>
                    <span className="text-xs text-slate-400 font-mono">осіб</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={3}
                  max={50}
                  step={1}
                  value={workersCount}
                  onChange={(e) => {
                    playSliderTick();
                    setWorkersCount(parseInt(e.target.value));
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />

                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
                  <span>Мінімум: 3 особи</span>
                  <span>Знижка від 10 осіб</span>
                  <span>Максимум: 50+ осіб</span>
                </div>
              </div>

              {/* STEP 3: Geographic Region Corridor */}
              <div className="pt-4 border-t border-white/10">
                <label className="block text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3">
                  КРОК 3. Географічний коридор залучення
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* CIS Option */}
                  <button
                    onClick={() => {
                      playMechanicalClick();
                      setRegion("cis");
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      region === "cis"
                        ? "bg-amber-500/20 border-amber-400 text-white shadow-gold-glow"
                        : "bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">🇺🇿 Центральна Азія (Узбекистан)</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                        БЕЗВІЗ
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-2 space-y-1">
                      <div>• Строк прибуття: <strong className="text-white">30–45 днів</strong></div>
                      <div>• Зарплата: <strong className="text-amber-300">від 900 € / міс</strong></div>
                      <div>• Спільні виробничі традиції, без мовного бар'єра</div>
                    </div>
                  </button>

                  {/* Asia Option */}
                  <button
                    onClick={() => {
                      playMechanicalClick();
                      setRegion("asia");
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      region === "asia"
                        ? "bg-amber-500/20 border-amber-400 text-white shadow-gold-glow"
                        : "bg-slate-900/80 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">🇮🇳 Південна Азія (Індія / Непал)</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        ВІЗА D
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-2 space-y-1">
                      <div>• Строк прибуття: <strong className="text-white">90–110 днів</strong> (макс. 4 міс.)</div>
                      <div>• Зарплата: <strong className="text-amber-300">від 600 € / міс</strong></div>
                      <div>• Економія ФОТ до 35–40%, висока монотонна витримка</div>
                    </div>
                  </button>

                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Commercial Quote & Safe 4-Stage Payment Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 border border-amber-500/40 shadow-2xl backdrop-blur-xl">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                <span className="text-[#e2c9a0] font-bold uppercase tracking-wider">
                  ПІДСУМОК КОМЕРЦІЙНОГО РОЗРАХУНКУ
                </span>
                <span className="text-emerald-400 font-bold">100% ФІКСАЦІЯ В ДОГОВОРІ</span>
              </div>

              {/* Total Contract Cost */}
              <div className="my-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
                <div className="text-xs text-slate-300 font-mono">Повна вартість залучення «під ключ» ({workersCount} осіб):</div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1 tracking-tight">
                  {totalContractEUR.toLocaleString()} €
                </div>
                <div className="text-xs text-amber-300/80 font-mono mt-0.5">
                  ~{Math.round(totalContractUAH).toLocaleString()} ₴ ({pricePerWorkerEUR} € за особу)
                </div>
              </div>

              {/* Monthly FOT Benchmark */}
              <div className="grid grid-cols-2 gap-3 mb-5 text-left text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                  <div className="text-[10px] text-slate-400">МІСЯЧНИЙ ФОТ НА ЗМІНУ</div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {totalMonthlyFotEUR.toLocaleString()} €
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">~{Math.round(totalMonthlyFotUAH).toLocaleString()} ₴ / міс</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/20">
                  <div className="text-[10px] text-emerald-400">СТРОК ВИХОДУ В ЦЕХ</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">
                    {region === "cis" ? "30–45 днів" : "до 4 місяців"}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Фіксовано в договорі</div>
                </div>
              </div>

              {/* Safe Escrow 4x25% Breakdown */}
              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Безпечний графік оплати 4×25%:</span>
                  <span className="text-amber-400 font-mono">по {Math.round(tranche25EUR).toLocaleString()} €</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                  <div className="p-2 rounded bg-slate-950/80 border border-white/5 flex justify-between items-center">
                    <span>1. Підписання прямого договору</span>
                    <strong className="text-amber-300">25%</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-950/80 border border-white/5 flex justify-between items-center">
                    <span>2. Отримання Дозволу на працю ДЦЗ</span>
                    <strong className="text-amber-300">25%</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-950/80 border border-white/5 flex justify-between items-center">
                    <span>3. Вклеювання віз D та переліт</span>
                    <strong className="text-amber-300">25%</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-950/80 border border-emerald-500/30 flex justify-between items-center">
                    <span>4. Фактичний вихід на зміну в цех</span>
                    <strong className="text-emerald-400">25% (після прибуття!)</strong>
                  </div>
                </div>
              </div>

              {/* Article 23 Badge */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-slate-300 mb-6">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong>100% захист від мобілізації (ст. 23 ЗУ)</strong> та юридична гарантія заміни робітника 30 днів.
                </span>
              </div>

              {/* Lead Submission Form */}
              {submittedDealId ? (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-white">Розрахунок успішно зафіксовано!</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Номер заявки: <strong className="text-amber-300 font-mono">{submittedDealId}</strong>. Наш юрист зв'яжеться з вами протягом 15 хвилин з готовим проектом договору.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Назва підприємства (ТОВ/ФОП)"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="+380 (XX) XXX-XX-XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {submitError && (
                    <div className="text-[11px] text-red-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-black font-black text-xs sm:text-sm hover:brightness-110 shadow-gold-glow transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Фіксація розрахунку...</span>
                      </>
                    ) : (
                      <>
                        <span>Отримати комерційну пропозицію та договір</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
