"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Factory, 
  HardHat, 
  Boxes, 
  UtensilsCrossed, 
  Truck, 
  Scissors, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  Clock
} from "lucide-react";

export const IndustriesSection: React.FC = () => {
  const industries = [
    {
      title: "Агропромисловий комплекс (АПК)",
      desc: "Механізатори, трактористи, комбайнери та робітники теплиць. Захист агросезону від зриву збору врожаю.",
      icon: TrendingUp,
      stats: "Ставка: від €600/міс",
      countries: "Узбекистан, Індія",
      time: "Вихід: 1–3 міс.",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Будівництво та інфраструктура",
      desc: "Арматурники, бетонники, муляри, монтажники та дорожні робітники для масштабних інфраструктурних об'єктів.",
      icon: HardHat,
      stats: "Ставка: від €750/міс",
      countries: "Узбекистан, Непал",
      time: "Вихід: 1–3 міс.",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Машинобудування та металообробка",
      desc: "Атестовані зварювальники MIG/MAG/TIG (тест шва під рентгеном), оператори верстатів ЧПК, слюсарі-складальники.",
      icon: Factory,
      stats: "Ставка: від €950/міс",
      countries: "Індія, Філіппіни",
      time: "Вихід: 2–4 міс.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Складська логістика & 3PL хаби",
      desc: "Водії електронавантажувачів (High Reach), комплектувальники замовлень, стикерувальники для складів E-commerce.",
      icon: Boxes,
      stats: "Ставка: від €700/міс",
      countries: "Індія, Бангладеш",
      time: "Вихід: 3–4 міс.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Харчова промисловість та переробка",
      desc: "Обвалювальники м'яса, пакувальники та оператори ліній харчових фабрик з дотриманням санітарних норм НАССР.",
      icon: UtensilsCrossed,
      stats: "Ставка: від €650/міс",
      countries: "Філіппіни, Непал",
      time: "Вихід: 3–4 міс.",
      image: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Текстильне & швейне виробництво",
      desc: "Досвідчені промислові швачки на швидкісні прямострочні та оверлочні машини для пошиття спецодягу й трикотажу.",
      icon: Scissors,
      stats: "Ставка: від €600/міс",
      countries: "Індія, Бангладеш",
      time: "Вихід: 3–4 міс.",
      image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="industries" className="py-24 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider block mb-2 font-mono">
              Цільові сектори економіки
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Галузі, де ми комплектуємо робочі зміни
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Відбираємо кандидатів за результатами практичних тестів під специфіку вашого виробництва або агропідприємства.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.article
                key={ind.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bento-card overflow-hidden border-white/5 group flex flex-col justify-between hover:border-amber-500/30"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] font-semibold text-amber-300 font-mono">
                      {ind.stats}
                    </div>

                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-slate-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{ind.time}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 backdrop-blur-md border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-amber-300 transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                </div>

                {/* Footer details */}
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                  <span>Донори: <strong className="text-slate-300 font-medium">{ind.countries}</strong></span>
                  <a
                    href="#calculator"
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Замовити</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
