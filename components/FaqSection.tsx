"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Як відбувається оформлення робочої візи D для працівників з Азії?",
      a: "Ми беремо на себе повний цикл: реєстрація запрошення на роботу від роботодавця (або через наш юридичний хаб), підготовка страхового поліса, перевірка довідок про несудимість, запис на подачу в консульство та логістику прибуття. Ви отримуєте готового працівника з легальним правом на працю.",
    },
    {
      q: "Які терміни від підписання договору до прибуття робітників на зміну?",
      a: "Залежно від країни походження: кандидати з Узбекистану та Східної Європи прибувають за 21–28 днів; з Індії та Філіппін (через міграційні протоколи) — 30–45 днів. Перші відео-анкети на затвердження ви отримуєте вже протягом 3–5 днів.",
    },
    {
      q: "Що станеться, якщо працівник не впорається з обовʼязками або порушить дисципліну?",
      a: "У договорі передбачено 30-денний гарантійний термін. У разі невідповідності кваліфікації або порушення внутрішнього розпорядку, ми безкоштовно та оперативно замінюємо співробітника або повертаємо кошти згідно з умовами SLA.",
    },
    {
      q: "Чи володіють кандидати українською або англійською мовами?",
      a: "Кандидати з Індії та Філіппін вільно розмовляють англійською мовою. Кандидати з Узбекистану та Казахстану розуміють та спілкуються зрозумілою для виробничого персоналу мовою. Крім того, на старті кожної групи працює наш координатор-перекладач.",
    },
    {
      q: "Як здійснюється оплата ваших послуг?",
      a: "Ми працюємо виключно офіційно за безготівковим розрахунком з ПДВ або без. Оплата розбивається на прозорі етапи: після затвердження конкретних кандидатів та після їх фактичного виходу на роботу.",
    },
  ];

  return (
    <section id="faq" className="py-24 relative bg-slate-900/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border-amber-500/20">
            <HelpCircle className="w-4 h-4" />
            <span>Відповіді на часті питання</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Все, що потрібно знати про найм іноземного персоналу
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="glass-card rounded-2xl border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 text-white hover:text-amber-400 transition-colors"
                >
                  <span className="text-base font-bold leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};