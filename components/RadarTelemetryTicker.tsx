"use client";

import React from "react";
import { Plane, Radio, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export const RadarTelemetryTicker: React.FC = () => {
  const flights = [
    {
      flight: "TK-842",
      from: "Ташкент",
      fromFlag: "🇺🇿",
      to: "Київ / Варшава",
      toFlag: "🇪🇺",
      brigade: "14 Зварювальників MIG/MAG",
      status: "На шляху до обʼєкта",
      eta: "Сьогодні 18:40",
      type: "flight",
    },
    {
      flight: "AI-151",
      from: "Нью-Делі",
      fromFlag: "🇮🇳",
      to: "Краків",
      toFlag: "🇵🇱",
      brigade: "8 Операторів верстатів ЧПК",
      status: "Віза D отримана",
      eta: "Виліт через 36 год",
      type: "visa",
    },
    {
      flight: "PR-720",
      from: "Маніла",
      fromFlag: "🇵🇭",
      to: "Київ",
      toFlag: "🇺🇦",
      brigade: "12 Водіїв High Reach",
      status: "Біометрія пройдена 100%",
      eta: "Виліт за графіком",
      type: "consular",
    },
    {
      flight: "HY-302",
      from: "Самарканд",
      fromFlag: "🇺🇿",
      to: "Вроцлав",
      toFlag: "🇵🇱",
      brigade: "18 Будівельників-монолітників",
      status: "Оформлення Zezwolenie Typ A",
      eta: "Готовність: 5 днів",
      type: "permit",
    },
  ];

  return (
    <div className="w-full bg-slate-950/90 border-y border-amber-500/20 overflow-hidden py-2 backdrop-blur-md relative z-30">
      <div className="flex items-center">
        {/* Fixed Left Badge */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-0.5 bg-slate-900 border-r border-amber-500/30 shrink-0 text-[10px] font-mono font-bold tracking-wider text-amber-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>LIVE CRM TELEMETRY</span>
        </div>

        {/* Marquee Animation */}
        <div className="flex items-center gap-8 whitespace-nowrap overflow-hidden text-xs font-mono">
          <div className="flex items-center gap-8 animate-[marquee_35s_linear_infinite]">
            {flights.concat(flights).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-white/5 text-slate-300 hover:border-amber-500/40 transition-colors"
              >
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5 rotate-45 text-amber-400" />
                  {item.flight}
                </span>

                <span className="text-slate-400">
                  {item.fromFlag} {item.from} ➔ {item.toFlag} {item.to}
                </span>

                <span className="text-slate-600">•</span>

                <span className="text-white font-semibold">{item.brigade}</span>

                <span className="text-slate-600">•</span>

                <span className="text-emerald-400 text-[11px] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {item.status}
                </span>

                <span className="text-slate-500 text-[10px]">[{item.eta}]</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};