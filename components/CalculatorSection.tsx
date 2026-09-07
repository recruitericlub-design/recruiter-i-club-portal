"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  Users, 
  Wrench, 
  Globe2, 
  Clock, 
  Coins, 
  Send, 
  CheckCircle2, 
  Building, 
  Phone, 
  Mail, 
  Sparkles,
  Loader2,
  AlertCircle,
  TrendingDown,
  Scale,
  ShieldCheck,
  Percent,
  ArrowRight,
  Info
} from "lucide-react";

interface CalculatorSectionProps {
  messages: any;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ messages }) => {
  // Active Tab: 'recruit' | 'loss' | 'tax'
  const [activeTab, setActiveTab] = useState<"recruit" | "loss" | "tax">("recruit");

  // === 1. RECRUITMENT TAB STATE ===
  const [region, setRegion] = useState<"cis" | "asia">("cis");
  const [workersCount, setWorkersCount] = useState(5);
  const [specialty, setSpecialty] = useState("welders");

  // Specialties
  const specialties = [
    { id: "welders", name: "Зварювальники (MIG/MAG/TIG)", defaultSalary: 950 },
    { id: "builders", name: "Будівельники / Арматурники / Муляри", defaultSalary: 850 },
    { id: "cnc", name: "Оператори верстатів ЧПК / Токарі", defaultSalary: 1100 },
    { id: "warehouse", name: "Комплектувальники / Водії навантажувачів", defaultSalary: 750 },
    { id: "food", name: "Робітники харчового виробництва / Обвалювальники", defaultSalary: 700 },
    { id: "textile", name: "Промислові швачки", defaultSalary: 650 },
  ];

  // Pricing calculations
  const pricePerWorker = useMemo(() => {
    if (region === "cis") {
      if (workersCount >= 51) return 1050;
      if (workersCount >= 11) return 1100;
      return 1200;
    } else {
      if (workersCount >= 51) return 850;
      if (workersCount >= 11) return 900;
      return 1000;
    }
  }, [region, workersCount]);

  const totalContractEUR = pricePerWorker * workersCount;
  const eurRate = 45.0; // Current NBU approx rate
  const totalContractUAH = totalContractEUR * eurRate;
  const paymentStepEUR = totalContractEUR * 0.25;
  const paymentStepUAH = totalContractUAH * 0.25;

  // Timeline
  const timelineText = region === "cis" 
    ? "1–2 місяці (швидкий візовий коридор)" 
    : "3–4 місяці (максимум 4 міс. у договорі)";

  // Form submission state
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedDealId, setSubmittedDealId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const specObj = specialties.find(s => s.id === specialty);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          contactName,
          phone,
          email,
          city,
          specialty: specObj?.name || specialty,
          workersCount,
          requirements: `Регіон: ${region === "cis" ? "Центральна Азія / СНД" : "Південна Азія (Індія/Непал)"}. Строк: ${timelineText}. Бюджет: €${totalContractEUR}. ${notes}`,
          salaryOffered: `від €${specObj?.defaultSalary || 800}/міс`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Помилка надсилання заявки");
      setSubmittedDealId(data.dealId || "DEAL-RECORDED");
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // === 2. VACANCY LOSS TAB STATE (ТЗ §4.1) ===
  const [annualRevenueMln, setAnnualRevenueMln] = useState(60); // 60 млн грн
  const [totalEmployees, setTotalEmployees] = useState(80);
  const [vacantPositions, setVacantPositions] = useState(5);
  const [roleImpact, setRoleImpact] = useState(0.25); // 0.15 допоміжний, 0.25 робітник, 0.40 ключовий

  const dailyRevenue = (annualRevenueMln * 1000000) / 250;
  const revenuePerEmployee = dailyRevenue / Math.max(totalEmployees, 1);
  const dailyLossTotal = revenuePerEmployee * roleImpact * vacantPositions;
  const loss30Days = dailyLossTotal * 30;
  const loss90Days = dailyLossTotal * 90;
  const loss180Days = dailyLossTotal * 180;
  const paybackDays = Math.max(1, Math.round((totalContractEUR * eurRate) / Math.max(dailyLossTotal, 1)));

  // === 3. FOT & TAX TAB STATE (ТЗ §4.2) ===
  const [netSalaryEUR, setNetSalaryEUR] = useState(650);
  const [taxWorkersCount, setTaxWorkersCount] = useState(5);

  const netSalaryUAH = netSalaryEUR * eurRate;
  // Rates 2026: ПДФО 18%, ВЗ 5% => 23% deduct from Gross => Net = Gross * 0.77
  const grossSalaryUAH = netSalaryUAH / 0.77;
  const pdfoUAH = grossSalaryUAH * 0.18;
  const vzUAH = grossSalaryUAH * 0.05;
  const esvUAH = grossSalaryUAH * 0.22; // Paid by employer
  const totalCostPerWorkerUAH = grossSalaryUAH + esvUAH;
  const totalGroupCostMonthlyUAH = totalCostPerWorkerUAH * taxWorkersCount;
  const hourlyCostUAH = totalCostPerWorkerUAH / 168; // 168 hours per month

  return (
    <section id="calculator" className="py-24 relative overflow-hidden bg-slate-900/60">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border-amber-500/20">
            <Calculator className="w-4 h-4" />
            <span>Інтерактивний B2B-хаб розрахунків</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Прозорий фінансовий калькулятор
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Оцініть точну вартість прямого найму, збитки бізнесу від простою та легальне податкове навантаження за нормативами 2026 року.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-950/80 border border-white/10 backdrop-blur-xl shadow-2xl max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab("recruit")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "recruit"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Залучення «під ключ»</span>
            </button>

            <button
              onClick={() => setActiveTab("loss")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "loss"
                  ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              <span>Втрати від простою</span>
            </button>

            <button
              onClick={() => setActiveTab("tax")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "tax"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>ФОТ і податки 2026</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: RECRUITMENT UNDER KEY ================= */}
        {activeTab === "recruit" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Sliders & Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="glass-card rounded-2xl p-6 sm:p-8 border-white/10 space-y-6">
                
                {/* Geography Toggle */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                    1. Географічний напрямок залучення
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRegion("cis")}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        region === "cis"
                          ? "bg-amber-500/10 border-amber-500/50 text-white shadow-lg shadow-amber-500/10"
                          : "bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white">Центральна Азія / СНД</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                          1–2 міс.
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Узбекистан, Казахстан. Вільна російська мова, швидкий вихід, ставка від €850/міс.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegion("asia")}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        region === "asia"
                          ? "bg-amber-500/10 border-amber-500/50 text-white shadow-lg shadow-amber-500/10"
                          : "bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white">Південна Азія (Англомовні)</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                          3–4 міс.
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Індія, Непал, Бангладеш, Філіппіни. Дисципліна, вигідний тариф, ставка від €550/міс.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Specialty Select */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    2. Кваліфікація / Профіль робітників
                  </label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500/60"
                  >
                    {specialties.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (орієнтир зарплати ~€{s.defaultSalary}/міс)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Workers Count Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      3. Кількість робітників (від 3 осіб — «Старт-3»)
                    </label>
                    <span className="font-mono font-bold text-lg text-amber-400">
                      {workersCount} осіб
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={80}
                    step={1}
                    value={workersCount}
                    onChange={(e) => setWorkersCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-2">
                    <span>3 (пілот)</span>
                    <span>10 (бригада)</span>
                    <span>25 (цех)</span>
                    <span>50+ (завод)</span>
                  </div>
                </div>

                {/* 4-Stage Payment Breakdown */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Безпечна 4-етапна модель оплати (4 × 25%)
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      €{paymentStepEUR.toLocaleString()} за етап
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5">
                      <span className="text-amber-400 font-bold block">1. Договір (25%)</span>
                      <span className="text-slate-400">Аудит та старт</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5">
                      <span className="text-amber-400 font-bold block">2. Дозвіл ДЦЗ (25%)</span>
                      <span className="text-slate-400">Затвердження</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5">
                      <span className="text-amber-400 font-bold block">3. Віза D (25%)</span>
                      <span className="text-slate-400">Хаб Молдова</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5">
                      <span className="text-emerald-400 font-bold block">4. Вихід на зміну (25%)</span>
                      <span className="text-slate-400">Фінальний платіж</span>
                    </div>
                  </div>
                </div>

                {/* Transparent Cost Note */}
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-amber-300">Прозорий кошторис:</strong> 75% вартості залучення — це прямі державні збори (дозвіл ДЦЗ ~€220), нотаріальні переклади та безпечний транзит через коридор Молдова–Одеса. Агентська винагорода сплачується лише на 4-му етапі після виходу робітника.
                  </p>
                </div>

              </div>
            </div>

            {/* Right Column: Total Card & Direct Lead Form */}
            <div className="lg:col-span-5 space-y-6">
              {/* Summary Card */}
              <div className="glass-card rounded-2xl p-6 border-amber-500/30 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Розрахунок залучення
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">
                    {timelineText}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                    €{totalContractEUR.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-400 font-mono mt-1">
                    ≈ {Math.round(totalContractUAH).toLocaleString()} грн (за курсом {eurRate})
                  </div>
                  <div className="text-xs text-amber-400/90 mt-2 font-medium">
                    Тариф: €{pricePerWorker} за працівника «під ключ»
                  </div>
                </div>

                {/* Lead Form */}
                {submittedDealId ? (
                  <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="font-bold text-white text-lg">Заявку успішно зареєстровано!</h4>
                    <p className="text-xs text-slate-300">
                      Номер угоди в CRM: <strong className="text-emerald-300 font-mono">{submittedDealId}</strong>. Наш провідний спеціаліст зв'яжеться з вами протягом 30 хвилин.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmittedDealId(null)}
                      className="mt-3 text-xs text-amber-400 underline font-semibold"
                    >
                      Подати ще один розрахунок
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                      Зафіксувати розрахунок та отримати детальний кошторис:
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Назва підприємства (ТОВ / ФОП)"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/80 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Ваше ім'я (ЛПР)"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/80 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="+380 (XX) XXX-XX-XX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/80 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Корпоративний Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/80 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Місто / Область"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/80 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {submitError && (
                      <div className="text-xs text-red-400 bg-red-950/40 p-2.5 rounded-lg border border-red-500/30 flex items-center gap-2">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <span>Обробка запиту в CRM...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Отримати комерційну пропозицію</span>
                        </>
                      )}
                    </button>
                    <div className="text-[10px] text-center text-slate-500">
                      Прямий контракт • Гарантія 30 днів • Регламент зв'язку 30 хвилин
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: VACANCY LOSS CALCULATOR (ТЗ §4.1) ================= */}
        {activeTab === "loss" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls */}
            <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Річний оборот підприємства (грн)
                  </label>
                  <span className="font-mono font-bold text-base text-rose-400">
                    {annualRevenueMln} млн грн
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={300}
                  step={5}
                  value={annualRevenueMln}
                  onChange={(e) => setAnnualRevenueMln(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Працівників у штаті
                    </label>
                    <span className="font-mono font-bold text-white text-sm">
                      {totalEmployees} осіб
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={400}
                    step={10}
                    value={totalEmployees}
                    onChange={(e) => setTotalEmployees(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-slate-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Незакритих вакансій
                    </label>
                    <span className="font-mono font-bold text-rose-400 text-sm">
                      {vacantPositions} місць
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    step={1}
                    value={vacantPositions}
                    onChange={(e) => setVacantPositions(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Вплив вакансій на безперервність виробництва
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRoleImpact(0.15)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      roleImpact === 0.15
                        ? "bg-rose-500/20 border-rose-500 text-white"
                        : "bg-slate-950 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    Допоміжний (0.15)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleImpact(0.25)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      roleImpact === 0.25
                        ? "bg-rose-500/20 border-rose-500 text-white"
                        : "bg-slate-950 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    Стандартний (0.25)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleImpact(0.40)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      roleImpact === 0.40
                        ? "bg-rose-500/20 border-rose-500 text-white"
                        : "bg-slate-950 border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    Ключовий (0.40)
                  </button>
                </div>
              </div>

              {/* Formula explanation from ТЗ */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 text-xs text-slate-400 space-y-1 font-mono">
                <div className="text-slate-300 font-bold">Формула збитків (ТЗ §4.1):</div>
                <div>Денна втрата = (Оборот / 250 днів / Штат) × Коефіцієнт × Вакансії</div>
                <div className="text-rose-400 font-bold text-sm pt-1">
                  Щоденні прямі втрати: {Math.round(dailyLossTotal).toLocaleString()} грн / день
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-5 space-y-4">
              <div className="glass-card rounded-2xl p-6 bg-gradient-to-b from-rose-950/40 to-slate-950 border-rose-500/30 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-rose-300 font-bold">
                  Втрати бізнесу через незакриті зміни:
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 flex justify-between items-center">
                    <span className="text-xs text-slate-300">За 1 місяць (30 днів):</span>
                    <span className="text-lg font-bold font-mono text-rose-400">
                      {Math.round(loss30Days).toLocaleString()} грн
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-rose-500/30 flex justify-between items-center">
                    <span className="text-xs text-slate-200 font-bold">За 3 місяці (середній ринковий простій):</span>
                    <span className="text-xl font-black font-mono text-rose-300">
                      {Math.round(loss90Days).toLocaleString()} грн
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 flex justify-between items-center">
                    <span className="text-xs text-slate-300">За пів року (180 днів):</span>
                    <span className="text-lg font-bold font-mono text-rose-500">
                      {Math.round(loss180Days).toLocaleString()} грн
                    </span>
                  </div>
                </div>

                {/* Payback Banner */}
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2 mt-4">
                  <Sparkles className="w-6 h-6 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white">
                    Повна окупність залучення:
                  </div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    на {paybackDays}-й день роботи!
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Залучення дисциплінованого персоналу в Recruiter I Club повністю перекриває втрати підприємства менше ніж за 2 тижні стабільного випуску продукції.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("recruit")}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <span>Перейти до замовлення персоналу</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: FOT & TAX CALCULATOR 2026 (ТЗ §4.2) ================= */}
        {activeTab === "tax" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Inputs */}
            <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Бажана ставка «на руки» (Net) за 1 працівника
                  </label>
                  <span className="font-mono font-bold text-base text-cyan-400">
                    €{netSalaryEUR} / міс (~{Math.round(netSalaryUAH).toLocaleString()} грн)
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={1500}
                  step={50}
                  value={netSalaryEUR}
                  onChange={(e) => setNetSalaryEUR(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Кількість працівників у зміні
                  </label>
                  <span className="font-mono font-bold text-white text-base">
                    {taxWorkersCount} осіб
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={taxWorkersCount}
                  onChange={(e) => setTaxWorkersCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Tax Structure Grid */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-3 text-xs font-mono">
                <div className="text-slate-300 font-bold font-sans flex items-center justify-between">
                  <span>Офіційні податкові ставки України (2026 рік):</span>
                  <span className="text-[11px] text-cyan-400">Мін. ЗП: 8 647 грн</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">ПДФО</span>
                    <span className="font-bold text-cyan-300 text-sm">18%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Військовий збір</span>
                    <span className="font-bold text-cyan-300 text-sm">5%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">ЄСВ роботодавця</span>
                    <span className="font-bold text-cyan-300 text-sm">22%</span>
                  </div>
                </div>
              </div>

              {/* Legal 0 tax grace period */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-slate-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-cyan-300">Юридичний нюанс (ТЗ §4.2):</strong> Перші 2 місяці з моменту отримання дозволу ДЦЗ податки становлять <strong className="text-white">0 грн</strong>, оскільки діяльність ще не розпочата і працівник здійснює консульський та візовий трансфер.
                </p>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="lg:col-span-5 space-y-4">
              <div className="glass-card rounded-2xl p-6 bg-gradient-to-b from-slate-900 to-slate-950 border-cyan-500/30 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  Повна собівартість штатної одиниці:
                </div>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/60 border border-white/5">
                    <span className="text-slate-400">Чиста виплата (Net):</span>
                    <span className="font-bold text-white">{Math.round(netSalaryUAH).toLocaleString()} грн</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/60 border border-white/5">
                    <span className="text-slate-400">Нарахована (Gross):</span>
                    <span className="font-bold text-white">{Math.round(grossSalaryUAH).toLocaleString()} грн</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/60 border border-white/5">
                    <span className="text-slate-400">ПДФО (18%) + ВЗ (5%):</span>
                    <span className="font-bold text-cyan-300">{Math.round(pdfoUAH + vzUAH).toLocaleString()} грн</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-950/60 border border-white/5">
                    <span className="text-slate-400">ЄСВ роботодавця (22%):</span>
                    <span className="font-bold text-cyan-300">{Math.round(esvUAH).toLocaleString()} грн</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-sm">
                    <span className="text-cyan-200 font-bold">Разом на 1 працівника:</span>
                    <span className="font-black text-cyan-300">{Math.round(totalCostPerWorkerUAH).toLocaleString()} грн</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/10 text-center space-y-1.5">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                    ФОТ для групи ({taxWorkersCount} працівників):
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    {Math.round(totalGroupCostMonthlyUAH).toLocaleString()} грн / міс
                  </div>
                  <div className="text-xs text-cyan-400 font-mono font-medium">
                    Собівартість 1 години роботи: ~{Math.round(hourlyCostUAH)} грн/год
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("recruit")}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all hover:brightness-110 flex items-center justify-center gap-2"
                >
                  <span>Замовити розрахунок під вашу компанію</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
