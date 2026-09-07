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
  CheckCircle 
} from "lucide-react";

export const B2BTrustSection: React.FC = () => {
  const guarantees = [
    {
      icon: Scale,
      title: "100% Легальне оформлення",
      desc: "Офіційний трудовий договір, робоча віза категорії D на 1–3 роки, сплата всіх податків та реєстрація в міграційній службі.",
    },
    {
      icon: Video,
      title: "Відеоконтроль кваліфікації",
      desc: "Надаємо не просто резюме на папері, а сертифіковані відеозаписи виконання тестових завдань (контроль зварювального шва, робота на верстаті).",
    },
    {
      icon: RefreshCw,
      title: "Гарантія безкоштовної заміни",
      desc: "Якщо працівник з будь-якої причини не підійшов або захворів протягом перших 30 днів — надаємо рівноцінну заміну за наш рахунок.",
    },
    {
      icon: Banknote,
      title: "Фінансова безпека 0 € авансу",
      desc: "Ви не платите за підбір до моменту узгодження та затвердження конкретних анкет у вашому особистому B2B-кабінеті.",
    },
    {
      icon: FileCheck2,
      title: "SLA та договір відповідальності",
      desc: "Фіксуємо чіткі терміни прибуття персоналу в офіційному контракті з фінансовими неустойками за кожен день затримки.",
    },
    {
      icon: ShieldCheck,
      title: "Адаптація та супровід куратором",
      desc: "Наші двомовні супервайзери зустрічають працівників, проводять первинний інструктаж безпеки та допомагають із побутом.",
    },
  ];

  return (
    <section className="py-24 relative bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border-amber-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Юридичні та фінансові гарантії</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Чому провідні підприємства обирають Recruiter I Club
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Знімаємо з вашого HR-відділу та юридичного департаменту 100% рутини, бюрократії та міграційних ризиків.
          </p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card glass-card-hover rounded-2xl p-6 border-white/10 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};