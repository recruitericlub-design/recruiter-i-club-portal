"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Factory, 
  HardHat, 
  Boxes, 
  UtensilsCrossed, 
  Scissors, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Banknote,
  Award,
  Users,
  Building2,
  FileCheck
} from "lucide-react";
import { playMechanicalClick, playSciFiBeep } from "@/lib/soundFX";

export const IndustriesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const industries = [
    {
      id: "metal",
      name: "Машинобудування та металообробка",
      shortTitle: "Металообробка & ЧПК",
      icon: Factory,
      tagline: "Атестовані зварювальники під рентген та оператори ЧПК",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      salary: "від 950 € / міс",
      salaryUAH: "~42 000 – 62 000 ₴",
      timeline: "30–60 днів",
      hubs: "🇺🇿 Узбекистан, 🇮🇳 Індія",
      professions: [
        "Зварювальники MIG/MAG (135/136) під тиск 25 бар",
        "Аргонники TIG (141) для нержавіючої сталі та трубопроводів",
        "Оператори токарних та фрезерних верстатів ЧПК (Fanuc, Siemens, Haas)",
        "Слюсарі механоскладальних робіт (МСР) та котельники",
        "Оператори лазерної та плазмової різки металу",
      ],
      tradeTestSpecs: [
        "Обов'язковий зварювальний шов з УЗД / Рентген-контролем (ISO 9606-1)",
        "Читання складних технологічних креслень та техкарт",
        "Відеофіксація нарізання різьби та наладки верстата перед подачею на візу",
      ],
      guarantee: "100% захист від мобілізації (ст. 23 ЗУ). Жодної зупинки цехів.",
    },
    {
      id: "construction",
      name: "Будівництво та інфраструктура",
      shortTitle: "Будівництво & Моноліт",
      icon: HardHat,
      tagline: "Злагоджені монолітні бригади, арматурники та муляри",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
      salary: "від 750 € / міс",
      salaryUAH: "~33 000 – 49 000 ₴",
      timeline: "30–45 днів",
      hubs: "🇺🇿 Узбекистан (безвіз), 🇳🇵 Непал",
      professions: [
        "Арматурники-монолітники (в'язка від 1.2 т/зміна)",
        "Бетонники та монтажники опалубки (Doka, Peri)",
        "Муляри (лицьова кладка цегли та газоблоку)",
        "Монтажники сталевих та залізобетонних конструкцій",
        "Дорожні робітники та асфальтобетонники",
      ],
      tradeTestSpecs: [
        "Нормативний хронометраж в'язки арматурних каркасів",
        "Досвід робіт на об'єктах промислового та житлового будівництва від 5 років",
        "Наявність російськомовного бригадира у кожній ланці від 8 осіб",
      ],
      guarantee: "Прямий трудовий договір у штат забудовника або генпідрядника.",
    },
    {
      id: "food",
      name: "Харчова промисловість та переробка",
      shortTitle: "Харчопром & НАССР",
      icon: UtensilsCrossed,
      tagline: "Спеціалісти обвалювання м'яса та оператори ліній НАССР",
      image: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=1200&q=80",
      salary: "від 650 € / міс",
      salaryUAH: "~28 500 – 40 000 ₴",
      timeline: "45–75 днів",
      hubs: "🇵🇭 Філіппіни, 🇳🇵 Непал, 🇮🇳 Індія",
      professions: [
        "Обвалювальники та жилувальники м'яса (яловичина, свинина, птиця)",
        "Оператори фасувальних та пакувальних автоматів",
        "Робітники цехів переробки та заморозки риби",
        "Апаратники пастеризації та молочного виробництва",
        "Вантажники та комплектувальники холодних складів (+4°C / -18°C)",
      ],
      tradeTestSpecs: [
        "Повний міжнародний медичний чекап та санітарні книжки за стандартом ЄС",
        "Суворе дотримання норм біобезпеки та регламентів НАССР",
        "Висока швидкість та точність виходу готового продукту за нормами виробітку",
      ],
      guarantee: "100% дисципліна на виробництві, нульовий алкогольний фактор.",
    },
    {
      id: "logistics",
      name: "Складська логістика & 3PL розподільчі центри",
      shortTitle: "Склади & 3PL Хаби",
      icon: Boxes,
      tagline: "Оператори висотних штабелерів та комплектувальники WMS",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      salary: "від 700 € / міс",
      salaryUAH: "~31 000 – 43 000 ₴",
      timeline: "45–60 днів",
      hubs: "🇮🇳 Індія, 🇧🇩 Бангладеш, 🇵🇭 Філіппіни",
      professions: [
        "Водії електроштабелерів High Reach (висота підйому до 12м)",
        "Водії дизельних та газових навантажувачів (до 5 тонн)",
        "Комплектувальники замовлень із сканерами ТЗД (WMS)",
        "Стикерувальники, пакувальники та сортувальники E-commerce",
        "Вантажники рампи та зон крос-докінгу",
      ],
      tradeTestSpecs: [
        "Міжнародні посвідчення водія спецтехніки з практичним тестом у цеху",
        "Швидкість збору позицій від 120 штук на годину без помилок адресного зберігання",
        "Повна матеріальна відповідальність та перевірка відсутності судимостей",
      ],
      guarantee: "Швидка адаптація під вашу WMS-систему за 3 робочі дні.",
    },
    {
      id: "textile",
      name: "Текстильне & швейне виробництво",
      shortTitle: "Швейна промисловість",
      icon: Scissors,
      tagline: "Промислові швачки на потокові лінії та пошиття амуніції",
      image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80",
      salary: "від 600 € / міс",
      salaryUAH: "~26 500 – 37 000 ₴",
      timeline: "45–60 днів",
      hubs: "🇮🇳 Індія, 🇧🇩 Бангладеш",
      professions: [
        "Швачки на швидкісні прямострочні машини (Juki, Siruba, Jack)",
        "Оператори 4-х та 5-ниткових оверлоків і розпошивальних машин",
        "Швачки для пошиття спецодягу та військової амуніції (плитоноски, Cordura)",
        "Розкрійники на стрічкові та дискові ножі",
        "Контролери ВТК готових швейних виробів",
      ],
      tradeTestSpecs: [
        "Практичний хронометраж складання вузла виробу на камеру",
        "Щільність та рівність строчки за ТУ (4–5 стібків на 1 см)",
        "Готовність до високої монотонної концентрації по 10–12 годин на зміну",
      ],
      guarantee: "Зниження собівартості пошиття на 30–45% у порівнянні з ринком.",
    },
  ];

  const current = industries[activeTab];
  const CurrentIcon = current.icon;

  return (
    <section id="industries" className="py-24 relative bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>ГАЛУЗЕВА ЕКСПЕРТИЗА // 5 КЛЮЧОВИХ СЕКТОРІВ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Галузі, для яких ми формуємо стабільні зміни
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Не абстрактні резюме, а перевірені практикою майстри під регламенти вашого заводу або будівельного майданчика.
          </p>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none no-scrollbar justify-start lg:justify-center mb-10">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={ind.id}
                onClick={() => {
                  playMechanicalClick();
                  setActiveTab(idx);
                }}
                className={`shrink-0 flex items-center gap-2.5 px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-amber-500 text-black border-amber-400 font-bold shadow-gold-glow scale-[1.02]"
                    : "bg-slate-900/80 border-white/10 text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-black" : "text-amber-400"}`} />
                <span>{ind.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Deep Interactive Detail Bento Stage */}
        <div className="rounded-2xl bg-slate-900/90 border border-white/15 p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Photo & Key Metrics */}
            <div className="lg:col-span-5 space-y-5">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-white/10 shadow-xl group">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2.5 py-1 rounded bg-slate-950/85 text-amber-300 border border-amber-400/30 font-bold">
                    {current.hubs}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-950/85 text-emerald-400 border border-emerald-400/30 font-bold">
                    {current.timeline}
                  </span>
                </div>
              </div>

              {/* Wage and Legal Highlights */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10">
                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 mb-1">
                    <Banknote className="w-3.5 h-3.5 text-amber-400" />
                    <span>СТАВКА В УКРАЇНІ</span>
                  </div>
                  <div className="text-lg font-black text-amber-400">{current.salary}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{current.salaryUAH}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/20">
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>СТАТУС (СТ. 23 ЗУ)</span>
                  </div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">100% Імунітет</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">Не підлягають призову</div>
                </div>
              </div>
            </div>

            {/* Right Column: Professions, Trade Tests & SLA */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-2">
                  <CurrentIcon className="w-4 h-4 text-amber-400" />
                  <span>{current.tagline}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {current.name}
                </h3>
              </div>

              {/* Professions List */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Кваліфікації, які ми залучаємо у ваш штат:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.professions.map((prof, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-2.5 rounded-lg bg-slate-950/70 border border-white/5 text-xs text-slate-200 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{prof}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trade Test Requirements */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/20 space-y-2">
                <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>Регламент верифікації та практичних Trade-тестів:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {current.tradeTestSpecs.map((spec, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">›</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Guarantee Callout & CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Гарантія безкоштовної заміни: 30 календарних днів</span>
                </div>

                <a
                  href="#calculator"
                  onClick={() => playSciFiBeep(1200, 0.08)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs hover:brightness-110 shadow-gold-glow transition-all active:scale-95"
                >
                  <span>Розрахувати зміну для цієї галузі</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
