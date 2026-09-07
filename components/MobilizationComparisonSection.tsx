"use client";

import React from "react";
import { ShieldAlert, ShieldCheck, CheckCircle2, XCircle, ArrowRight, AlertTriangle, Sparkles, Scale } from "lucide-react";

export const MobilizationComparisonSection: React.FC<{ locale: string }> = ({ locale }) => {
  const isUk = locale === "uk";
  const isRu = locale === "ru";

  return (
    <section id="mobilization-immunity" className="py-20 relative z-10 bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Стратегічна безпека виробництва 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            100% Мобілізаційний імунітет vs Ризики бронювання локальних кадрів
          </h2>
          <p className="mt-4 text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Посилення критеріїв критичності (постанови КМУ №692 та №862) та зарплатний поріг у <strong>25 941 грн (3 МЗП)</strong> поставили під загрозу роботу промисловості. Дізнайтеся, чому іноземний штат — це єдина гарантія безперервної роботи підприємства.
          </p>
        </div>

        {/* Side-by-side Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Local Staff & Booking Risks */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border-red-500/20 bg-gradient-to-b from-red-950/20 via-slate-900 to-slate-950 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      Спроби бронювання місцевих працівників
                    </h3>
                    <span className="text-xs text-red-400 font-mono">Висока турбулентність та ризик зупинки ліній</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 text-xs text-slate-300">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Зарплатний бар'єр 25 941 грн:</strong> Вимога середньої зарплати в 3 МЗП на підприємстві створює колосальне навантаження на ФОТ і податки (ПДФО + ЄСВ + ВЗ).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Ризик скасування статусу критичності:</strong> Уряд регулярно переглядає ліміти та критерії. Підприємство може втратити бронь за 1 день за результатами аудиту міністерств.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Вручення повісток у дорозі:</strong> Навіть за наявності довідок працівники бояться виходити на зміну, уникають громадського транспорту, що веде до хронічних неходів на роботу.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Зарплатний шантаж:</strong> Дефіцитні фахівці постійно вимагають підвищення ставок на 25–40%, погрожуючи звільненням у будь-який момент.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-[11px] text-slate-500 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>За опитуваннями EBA: 79.4% заводів уже зазнали зриву контрактів через мобілізацію ключових робітників.</span>
            </div>
          </div>

          {/* Card 2: Foreign Staff with Recruiter I Club */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border-emerald-500/30 bg-gradient-to-b from-emerald-950/25 via-slate-900 to-slate-950 flex flex-col justify-between relative shadow-[0_0_40px_rgba(16,185,129,0.1)]">
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase tracking-wider">
              100% Захищений вибір
            </div>

            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      Прямий найм іноземців від Recruiter I Club
                    </h3>
                    <span className="text-xs text-emerald-400 font-mono">Повна юридична недоторканність та стабільність</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 text-xs text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Законний мобілізаційний імунітет:</strong> Згідно зі ст. 23 Закону України, іноземні громадяни НЕ підлягають військовому обов'язку та мобілізації. Їх не викликають у ТЦК.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Фіксований контракт на 1–2 роки:</strong> Працівник юридично прив'язаний до вашого підприємства згідно з Дозволом ДЦЗ. Він не звільниться через тиждень і не піде до конкурентів.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Оптимізований ФОТ:</strong> Можливість офіційної оплати від базового мінімального окладу (8 647 грн) без вимоги штучного завищення середньої зарплати до 26 тис. грн.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Вихід на зміну 100% за графіком:</strong> За кожною групою закріплено двомовного координатора та організовано безпечний трансфер гуртожиток–цех без затримок.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-500/20 flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-emerald-300">Гарантія безперервності виробництва</span>
              <a
                href="#calculator"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <span>Замовити захищений штат</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Law Quote Banner */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-amber-400 shrink-0" />
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Юридична основа:</strong> Частина 1 статті 1 Закону України «Про військовий обов'язок і військову службу» встановлює військовий обов'язок <em>виключно для громадян України</em>. Іноземці, працевлаштовані за Дозволом Державного центру зайнятості, не перебувають на обліку в центрах комплектування.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
