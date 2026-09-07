"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ClipboardCheck, 
  Video, 
  FileCheck2, 
  FileText, 
  PlaneTakeoff, 
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock
} from "lucide-react";

interface RoadmapSectionProps {
  messages: any;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({ messages }) => {
  const steps = [
    {
      num: "01",
      title: "Заявка та аудит підприємства",
      desc: "Погодження кваліфікаційних вимог до кандидатів, умов праці та проживання. Підписання прямого договору (1-й платіж 25%).",
      icon: ClipboardCheck,
      badge: "День 1–2",
      payment: "Транш 1: 25%",
    },
    {
      num: "02",
      title: "Сорсинг та Trade Test у країні",
      desc: "Практична перевірка навичок (тестовий шов для зварювальників, робота з кресленнями), медичний огляд, відеовізитка.",
      icon: Video,
      badge: "1–3 тижні",
      payment: "Відеозвіт клієнту",
    },
    {
      num: "03",
      title: "Дозвіл Державного центру зайнятості",
      desc: "Офіційне рішення ДЦЗ на використання праці іноземця на 1–2 роки безпосередньо у штаті замовника (2-й платіж 25%).",
      icon: FileCheck2,
      badge: "7–10 роб. днів",
      payment: "Транш 2: 25%",
    },
    {
      num: "04",
      title: "Робоча віза D-04 у консульстві",
      desc: "Подача документів до консульської установи України за кордоном, верифікація біометрії та видача робочої візи.",
      icon: FileText,
      badge: "1–2 місяці",
      payment: "Офіційна віза D",
    },
    {
      num: "05",
      title: "Логістичний хаб та трансфер в Одесу",
      desc: "Зустріч в аеропорту Кишинева (Молдова), супроводжуваний перетин кордону та прибуття в Одесу (3-й платіж 25%).",
      icon: PlaneTakeoff,
      badge: "2–3 тижні",
      payment: "Транш 3: 25%",
    },
    {
      num: "06",
      title: "Вихід на зміну та 30 днів гарантії",
      desc: "Фактичний вихід на лінію, онбординг, сплата фінальної комісії (25%). Повний 30-денний гарантійний супровід та заміна.",
      icon: CheckCircle2,
      badge: "Вихід на роботу",
      payment: "Фінальний транш: 25%",
    },
  ];

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border-amber-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Контрольований маршрут 100% під ключ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Чесний цикл: від 1 до 4 місяців до першої зміни
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Центральна Азія (СНД) — вихід за <strong className="text-amber-300">1–2 місяці</strong>. Південна Азія (Індія, Непал) — за <strong className="text-amber-300">3–4 місяці</strong> (максимум 4 міс. зафіксовано в договорі). Оплата частинами 4×25%.
          </p>
        </div>

        {/* Steps Grid (2 rows of 3 on desktop, full Bento-style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="glass-card p-6 border-white/5 relative flex flex-col justify-between group hover:border-amber-500/40"
              >
                {/* Step Number Watermark */}
                <div className="absolute top-4 right-4 text-3xl font-black font-mono text-slate-800/60 group-hover:text-amber-500/20 transition-colors">
                  {step.num}
                </div>

                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-300">
                      {step.payment}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md mb-3 border border-amber-500/20 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{step.badge}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[11px] text-slate-500 group-hover:text-amber-400 transition-colors font-mono">
                  <span>Контрольна точка #{idx + 1}</span>
                  <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
