"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  FileCheck2, 
  RefreshCw, 
  Video, 
  Scale, 
  Banknote,
  CheckCircle,
  AlertTriangle,
  Building2,
  Clock,
  HeartHandshake
} from "lucide-react";

export const B2BTrustSection: React.FC = () => {
  const pillars = [
    {
      icon: Scale,
      title: "Прямий найм у ваш штат",
      desc: "Працівники приймаються безпосередньо у штат вашого ТОВ/ФОП. Це НЕ лізинг і НЕ оренда персоналу: ви власник трудового ресурсу та керуєте змінами.",
      badge: "Юридичний комплаєнс",
    },
    {
      icon: Clock,
      title: "Чесний строк: від 1 до 4 місяців",
      desc: "Називаємо реальні строки до підписання: 1–2 міс. для СНД, 3–4 міс. для Азії. Максимум 4 місяці зафіксовано в офіційному договорі.",
      badge: "Без компрометуючих обіцянок",
    },
    {
      icon: Building2,
      title: "Один відповідальний контур маршруту",
      desc: "Власний операційний супровід: підбір ➔ консульство ➔ літак ➔ зустріч у хабі Кишинева ➔ супровід кордону ➔ трансфер до Одеси ➔ передача замовнику.",
      badge: "Повний контроль логістики",
    },
    {
      icon: Banknote,
      title: "Безпечна оплата: 4 платежі по 25%",
      desc: "Оплата розділена на 4 етапи. Фінальні 25% агентської винагороди ви сплачуєте лише після фактичного прибуття робітників на зміну.",
      badge: "0% фінансового ризику",
    },
    {
      icon: RefreshCw,
      title: "30 днів юридичної гарантії заміни",
      desc: "Якщо працівник не приїхав, порушив трудову дисципліну або пішов у перший місяць — надаємо безкоштовну заміну з комісією клубу 0 €.",
      badge: "Захист інвестицій",
    },
    {
      icon: HeartHandshake,
      title: "Куратор першого місяця онбордингу",
      desc: "4 планові контакти щотижня, зв'язок із працівником та вашим HR-директором, розв'язання мовних і побутових питань на старті.",
      badge: "Підтримка на місці",
    },
  ];

  const safetyProtocols = [
    { num: "01", title: "Інструктаж рідною мовою", text: "Детальний брифінг у країні походження та підписання усвідомленої інформованої згоди до вильоту." },
    { num: "02", title: "Регіони зниженого ризику", text: "Співпрацюємо з підприємствами Центральної та Західної України, що мають безпечні умови." },
    { num: "03", title: "Аудит наявності укриттів", text: "Обов'язкова перевірка обладнаного укриття на виробництві та за місцем проживання працівників." },
    { num: "04", title: "Супровід куратора 24/7", text: "Психологічна підтримка та адаптація іноземних робітників під час перших повітряних тривог." },
    { num: "05", title: "Прямий зв'язок з бригадиром", text: "Призначення відповідального лідера групи для координації швидкої евакуації в укриття." },
  ];

  return (
    <section className="py-24 relative bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border-amber-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Фундамент стабільності та довіри</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Чотири непорушні опори партнерства
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Знімаємо 100% бюрократії з Держпраці та ДПС. Люди офіційно у вашому штаті, лінії працюють безперервно.
          </p>
        </div>

        {/* Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bento-card p-6 border-white/5 group flex flex-col justify-between hover:border-amber-500/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-slate-400">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 5-Step Wartime Safety Protocol (Unique Market Differentiator) */}
        <div className="bento-card p-8 border-amber-500/20 bg-gradient-to-r from-slate-900/90 to-slate-950">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                Унікальний регламент безпеки
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                5-пунктовий протокол готовності до тривог та обстрілів
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              На відміну від конкурентів, які замовчують воєнні ризики, Recruiter I Club готує персонал заздалегідь для уникнення паніки та простоїв.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {safetyProtocols.map((sp) => (
              <div key={sp.num} className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 space-y-1.5">
                <span className="text-xs font-mono font-bold text-amber-400">{sp.num}</span>
                <h4 className="text-xs font-bold text-white leading-tight">{sp.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{sp.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};