"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  Calculator, 
  Scale, 
  Users, 
  Sparkles,
  ChevronRight
} from "lucide-react";
import { KNOWLEDGE_ARTICLES, KnowledgeArticle } from "@/lib/knowledgeBase";
import { SpotlightCard } from "./SpotlightCard";
import { playMechanicalClick } from "@/lib/soundFX";

interface BentoKnowledgeHubProps {
  locale: string;
  onSelectArticle: (article: KnowledgeArticle) => void;
}

type RoleFilter = "all" | "ceo" | "cfo" | "coo" | "hr";

export const BentoKnowledgeHub: React.FC<BentoKnowledgeHubProps> = ({
  locale,
  onSelectArticle,
}) => {
  const [activeRole, setActiveRole] = useState<RoleFilter>("all");

  const isUk = locale === "uk";
  const isRu = locale === "ru";

  const roleButtons: { id: RoleFilter; label: string; icon: any }[] = [
    { id: "all", label: isUk ? "Всі дослідження" : isRu ? "Все исследования" : "All Articles", icon: BookOpen },
    { id: "ceo", label: isUk ? "👔 Власник / СЕО" : isRu ? "👔 Владелец / СЕО" : "👔 Owner / CEO", icon: TrendingUp },
    { id: "cfo", label: isUk ? "📊 Фінансовий директор (CFO)" : isRu ? "📊 Финдиректор (CFO)" : "📊 CFO", icon: Calculator },
    { id: "coo", label: isUk ? "⚙️ Операційний директор (COO)" : isRu ? "⚙️ Опердиректор (COO)" : "⚙️ COO", icon: Users },
    { id: "hr", label: isUk ? "⚖️ HR-директор / Юрист" : isRu ? "⚖️ HR-директор / Юрист" : "⚖️ HR / Legal", icon: Scale },
  ];

  const filteredArticles = activeRole === "all"
    ? KNOWLEDGE_ARTICLES
    : KNOWLEDGE_ARTICLES.filter((art) => art.roles.includes(activeRole as any));

  const handleRoleChange = (role: RoleFilter) => {
    playMechanicalClick();
    setActiveRole(role);
  };

  const handleArticleClick = (article: KnowledgeArticle) => {
    playMechanicalClick();
    onSelectArticle(article);
  };

  return (
    <section id="knowledge" className="py-24 relative z-10 bg-slate-950/70 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>База знань & Експертиза B2B</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Офіційний комплаєнс, податки та методологія найму 2026
          </h2>
          <p className="mt-4 text-sm text-slate-400 max-w-2xl mx-auto">
            Оберіть вашу роль у компанії, щоб побачити аналітичні розрахунки, сметні нормативи та юридичні інструкції, підготовлені за стандартами ЄС.
          </p>
        </div>

        {/* Role Filters Bento Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {roleButtons.map((btn) => {
            const Icon = btn.icon;
            const isActive = activeRole === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => handleRoleChange(btn.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                  isActive
                    ? "bg-amber-500 text-black shadow-gold-glow"
                    : "bg-slate-900/90 text-slate-400 hover:text-white border border-white/5 hover:border-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid Cards with Dynamic Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const title = isUk ? article.title.uk : isRu ? article.title.ru : article.title.en;
            const category = isUk ? article.category.uk : isRu ? article.category.ru : article.category.en;
            const excerpt = isUk ? article.excerpt.uk : isRu ? article.excerpt.ru : article.excerpt.en;

            return (
              <SpotlightCard
                key={article.id}
                spotlightColor="amber"
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/25">
                      {category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                      <Clock className="w-3.5 h-3.5 text-amber-400/80" />
                      <span>{article.readTimeMin} хв</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => handleArticleClick(article)}
                    className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-3 cursor-pointer"
                  >
                    {title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {excerpt}
                  </p>
                </div>

                <div>
                  {/* Stats Badge if available */}
                  {article.statsHighlight && (
                    <div className="mb-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Ключовий показник:</span>
                      <span className="text-sm font-bold font-mono text-amber-400">
                        {article.statsHighlight.value}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <button
                      onClick={() => handleArticleClick(article)}
                      className="text-xs font-bold text-amber-400 group-hover:text-amber-300 flex items-center gap-1.5 transition-all"
                    >
                      <span>Читати дослідження</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <Link
                      href={`/${locale}/knowledge/${article.slug}`}
                      className="text-[11px] text-slate-500 hover:text-slate-300 font-mono"
                      title="Відкрити постійне посилання"
                    >
                      #SILO
                    </Link>
                  </div>

                  {/* State Inspection Seal */}
                  <div className="mt-3 text-[9px] font-mono text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-amber-500/50" />
                    <span>[ ВТК ІНСПЕКЦІЯ // ДЦЗ 2026 // ЄС СТАНДАРТ ]</span>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Bottom Banner with CRM Link */}
        <div className="mt-14 glass-card rounded-2xl p-6 sm:p-8 border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Потрібна персональна консультація міграційного адвоката?
            </h4>
            <p className="text-xs text-slate-400">
              Ми проведемо безоплатний аудит штатного розпису вашого підприємства та підберемо оптимальну квоту іноземних працівників.
            </p>
          </div>
          <a
            href="#calculator"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all shrink-0 flex items-center gap-2"
          >
            <span>Розрахувати потребу</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
