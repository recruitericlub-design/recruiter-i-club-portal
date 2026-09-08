"use client";

import React from "react";
import { ShieldCheck, FileCheck, Lock, Globe, AlertCircle, CheckCircle2 } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { CometCard } from "./ui/comet-card";

export const WartimeSecurityProtocol: React.FC<{ locale: string }> = ({ locale }) => {
  const isUk = locale === "uk";
  const isRu = locale === "ru";

  const securityPillars = [
    {
      icon: FileCheck,
      title: isUk ? "1. Апостильована довідка про несудимість" : isRu ? "1. Апостилированная справка о несудимости" : "1. Apostilled Police Clearance",
      desc: isUk
        ? "Кожен кандидат надає оригінал офіційної довідки правоохоронних органів країни походження з апостилем МЗС та перекладом на українську мову."
        : "Каждый кандидат предоставляет оригинал официальной справки об отсутствии судимостей с апостилем МИД и нотариальным переводом.",
      code: "POLICE-CLEARANCE-APOSTILLE",
    },
    {
      icon: Lock,
      title: isUk ? "2. Консульська перевірка та бази Інтерполу" : isRu ? "2. Консульская проверка и базы Интерпола" : "2. Interpol & Consular Vetting",
      desc: isUk
        ? "Перед вклеюванням довгострокової візи D-04 дипломатичні установи України та консульські офіцери проводять біометричний скринінг за міжнародними безпековими реєстрами."
        : "Перед открытием визы D дипломатические службы Украины проводят биометрический скрининг по международным реестрам безопасности.",
      code: "INTERPOL-BIO-VETTING-D04",
    },
    {
      icon: Globe,
      title: isUk ? "3. Суворе ембарго на ворожі юрисдикції" : isRu ? "3. Строгое эмбарго на вражеские юрисдикции" : "3. Zero-Tolerance Hostile States Embargo",
      desc: isUk
        ? "Recruiter I Club принципово не залучає громадян РФ, Білорусі та країн зі списку FATF високого терористичного ризику. Працюємо лише з дружніми та нейтральними націями."
        : "Recruiter I Club принципиально не привлекает граждан РФ, Беларуси и стран высокого террористического риска. Работаем только с проверенными нациями.",
      code: "EMBARGO-NON-COMPLIANT-GEO",
    },
    {
      icon: ShieldCheck,
      title: isUk ? "4. Воєнний протокол дій під час тривог" : isRu ? "4. Военный протокол действий при тревогах" : "4. Air-Raid & Shelter Safety Protocols",
      desc: isUk
        ? "Перед виходом на підприємство кандидати проходять двомовний інструктаж щодо сигналів повітряної тривоги, маршрутів до сертифікованих укриттів та надання домедичної допомоги."
        : "Кандидаты проходят двуязычный инструктаж по сигналам тревоги, маршрутам в сертифицированные бомбоубежища и первой помощи.",
      code: "CIVIL-DEFENSE-ALARM-BRIEF",
    },
  ];

  return (
    <section id="security-protocol" className="py-20 relative z-10 bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Безпековий стандарт воєнного часу</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Чотирирівневий протокол перевірки благонадійності персоналу
          </h2>
          <p className="mt-4 text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Ми розуміємо стратегічну важливість об'єктів критичної інфраструктури, заводів та елеваторів. Recruiter I Club гарантує 100% прозорість біографії та безпековий контроль кожного працівника.
          </p>
        </div>

        {/* 4 Pillars Grid with Cyan Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <SpotlightCard
                key={idx}
                spotlightColor="cyan"
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {p.desc}
                  </p>
                </div>

                <div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Верифікація</span>
                    </div>
                    <span className="text-slate-500 text-[9px]">{p.code}</span>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Comet Card: Strategic Industrial Defense Banner */}
        <div className="mt-8">
          <CometCard cometColor="#06b6d4" className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                    🇺🇦 СТ. 23 ЗУ // ІМУНІТЕТ 100%
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    ЗАКОН УКРАЇНИ «ПРО МОБІЛІЗАЦІЙНУ ПІДГОТОВКУ ТА МОБІЛІЗАЦІЮ»
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  Збереження виробничого потенціалу України без ризику мобілізаційних втрат
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                  Іноземні громадяни офіційно не підлягають мобілізації до лав ЗСУ. Ваші верстати, виробничі лінії та будівельні обʼєкти працюють безперервно у 3 зміни.
                </p>
              </div>
            </div>

            <a
              href="#calculator"
              className="shrink-0 px-6 py-3 rounded-xl font-mono text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:brightness-110 shadow-cyan-glow transition-all"
            >
              Отримати юридичне розʼяснення
            </a>
          </CometCard>
        </div>

      </div>
    </section>
  );
};
