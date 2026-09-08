"use client";

import React, { useState } from "react";
import { 
  FileCheck2, 
  ShieldCheck, 
  Download, 
  X, 
  Scale, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Lock,
  Building2,
  Calendar
} from "lucide-react";
import { playSciFiBeep } from "@/lib/soundFX";

interface ContractPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: string;
}

export const ContractPreviewModal: React.FC<ContractPreviewModalProps> = ({
  isOpen,
  onClose,
  locale = "uk",
}) => {
  const [activeTab, setActiveTab] = useState<"articles" | "guarantees" | "payments">("articles");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl shadow-black/80 overflow-hidden font-sans">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-gold-glow">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  Типовий прямий договір найму персоналу
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold">
                  ЮРИДИЧНИЙ ЗРАЗОК 2026
                </span>
              </div>
              <p className="text-xs text-slate-400">
                ТОВ «Роботодавець» ↔ ТОВ «Recruiter I Club» // Реєстр ДСЗУ №412-26
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSciFiBeep(880, 0.05);
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-slate-950/40 px-6 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab("articles")}
            className={`pb-3 px-3 text-xs font-mono font-bold transition-all border-b-2 ${
              activeTab === "articles"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Ключові статті та ст. 23 ЗУ
          </button>
          <button
            onClick={() => setActiveTab("guarantees")}
            className={`pb-3 px-3 text-xs font-mono font-bold transition-all border-b-2 ${
              activeTab === "guarantees"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Гарантія заміни 30 днів (SLA)
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`pb-3 px-3 text-xs font-mono font-bold transition-all border-b-2 ${
              activeTab === "payments"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Етапи розрахунків 4×25%
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
          {activeTab === "articles" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-300 font-bold font-mono text-xs mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>ПУНКТ 4.3. ПРАВОВИЙ СТАТУС ТА МОБІЛІЗАЦІЙНИЙ ІМУНІТЕТ</span>
                </div>
                <p className="text-slate-300">
                  «Відповідно до ст. 23 Закону України «Про мобілізаційну підготовку та мобілізацію» та ст. 1 Закону України «Про військовий обов'язок і військову службу», залучені іноземні спеціалісти є громадянами іноземних держав, перебувають на території України на підставі дозволу ДЦЗ та посвідки на тимчасове проживання (посвідка ДМС) і <strong className="text-white">не підлягають військовому обліку чи мобілізаційному призову до лав ЗСУ</strong>».
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-white/10">
                <div className="flex items-center gap-2 text-white font-bold font-mono text-xs mb-1.5">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>ПУНКТ 2.1. ПРЯМИЙ ТРУДОВИЙ ДОГОВІР З ПІДПРИЄМСТВОМ</span>
                </div>
                <p className="text-slate-400">
                  «Працівники зараховуються безпосередньо у штат Замовника (ТОВ або ФОП) на підставі індивідуального трудового договору. Замовник виступає прямим роботодавцем, утримує податки згідно чинного законодавства України та має повний операційний контроль над виконанням трудових обов'язків».
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-white/10">
                <div className="flex items-center gap-2 text-white font-bold font-mono text-xs mb-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>ПУНКТ 5.2. ФІКСОВАНІ СТРОКИ ВИХОДУ НА ЗМІНУ</span>
                </div>
                <p className="text-slate-400">
                  «Строк виконання повного циклу оформлення та прибуття робітників на об'єкт Замовника становить: від 30 до 60 днів — для громадян країн Центральної Азії; від 90 до 120 днів (не більше 4 календарних місяців) — для громадян країн Південної Азії. У разі прострочення з вини Виконавця нараховується пеня згідно розділу 8 цього Договору».
                </p>
              </div>
            </div>
          )}

          {activeTab === "guarantees" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-xs mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>БЕЗКОШТОВНА ЗАМІНА КАНДИДАТА ПРОТЯГОМ 30 КАЛЕНДАРНИХ ДНІВ</span>
                </div>
                <p className="text-slate-300">
                  Якщо протягом перших 30 днів роботи працівник не відповідає кваліфікації, зазначеній у заявці, або порушує внутрішній трудовий розпорядок, Recruiter I Club зобов'язується <strong className="text-white">надати повноцінну заміну без додаткової агентської комісії (0 грн / 0 €)</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10">
                  <div className="text-amber-400 font-bold font-mono mb-1">Trade Test Верифікація</div>
                  <p className="text-slate-400 text-[11px]">
                    Відеозапис практичного тесту (зварювальний шов під тиском, робота за верстатом) додається до особової справи до моменту подачі на візу.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10">
                  <div className="text-cyan-400 font-bold font-mono mb-1">Повний супровід ДМС</div>
                  <p className="text-slate-400 text-[11px]">
                    Юридичний супровід оформлення посвідки на тимчасове проживання та реєстрації місця проживання в органах ЦНАП/ДМС.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <p className="text-slate-400 mb-2">
                Ми працюємо за прозорою системою захищеного розрахунку 4×25% — оплата прив'язана виключно до фактичних контрольних точок:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">ЕТАП 1 • 25%</span>
                  <div className="text-white font-bold text-xs mt-0.5">Підписання договору</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Старт рекрутингу та формування пулу верифікованих анкет під ваші ТЗ.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">ЕТАП 2 • 25%</span>
                  <div className="text-white font-bold text-xs mt-0.5">Дозвіл ДЦЗ</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Після погодження відібраних кандидатів та отримання офіційного Дозволу ДЦЗ.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">ЕТАП 3 • 25%</span>
                  <div className="text-white font-bold text-xs mt-0.5">Відкриття візи D</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Після вклеювання віз D-04 у консульстві та прибуття групи в транзитний хаб.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/40">
                  <span className="text-[10px] font-mono text-yellow-400 font-bold">ЕТАП 4 • 25%</span>
                  <div className="text-white font-bold text-xs mt-0.5">Вихід на зміну в цех</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Тільки після фактичного прибуття робітників на об'єкт та підписання акту виходу.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Юридична відповідність: ЦК України та ЗУ «Про зайнятість населення»</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="https://t.me/recruiter_i_club"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs hover:brightness-110 shadow-gold-glow transition-all active:scale-95"
            >
              <span>Замовити персональний договір</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
