"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, ExternalLink, Clock, Calendar, ShieldCheck, ArrowRight, CheckCircle2, User, Phone, Mail, Building2 } from "lucide-react";
import { KnowledgeArticle } from "@/lib/knowledgeBase";
import { playDrawerWhoosh, playMechanicalClick } from "@/lib/soundFX";

interface ArticleDrawerProps {
  article: KnowledgeArticle | null;
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export const ArticleDrawer: React.FC<ArticleDrawerProps> = ({
  article,
  isOpen,
  onClose,
  locale,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playMechanicalClick();
        onClose();
      }
    };
    if (isOpen) {
      playDrawerWhoosh();
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  const isUk = locale === "uk";
  const isRu = locale === "ru";
  const title = isUk ? article.title.uk : isRu ? article.title.ru : article.title.en;
  const category = isUk ? article.category.uk : isRu ? article.category.ru : article.category.en;
  const content = isUk ? article.contentHtml.uk : isRu ? article.contentHtml.ru : article.contentHtml.en;

  const handleQuickLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          phone,
          specialty: `Консультація зі статті: ${article.slug}`,
          workersCount: 5,
          contactName: "B2B Запит з бази знань",
        }),
      });
      setFormSubmitted(true);
    } catch {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-slate-900 border-l border-white/10 text-slate-100 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          
          {/* Header Bar */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{article.readTimeMin} хв читання</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/${locale}/knowledge/${article.slug}`}
                target="_blank"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Відкрити в окремому вікні"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-red-950 hover:text-red-300 transition-colors"
                title="Закрити"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-200">
            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              {title}
            </h1>

            {/* Author / Date Info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pb-4 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Оновлено: {article.updatedAt}</span>
              </div>
            </div>

            {/* Stats Highlight Card if available */}
            {article.statsHighlight && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono block">
                    {article.statsHighlight.value}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {isUk
                      ? article.statsHighlight.label.uk
                      : isRu
                      ? article.statsHighlight.label.ru
                      : article.statsHighlight.label.en}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
            )}

            {/* Rendered HTML */}
            <div
              className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-6 [&>h3]:mb-2 [&>h4]:text-sm [&>h4]:font-bold [&>h4]:text-amber-400 [&>h4]:mt-4 [&>h4]:mb-1 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>p]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* FAQ Accordion in Drawer */}
            {article.faqs.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-amber-400">
                  Часті запитання за темою:
                </h3>
                {article.faqs.map((faq, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                    <p className="text-xs font-bold text-white">
                      {isUk ? faq.q.uk : isRu ? faq.q.ru : faq.q.en}
                    </p>
                    <p className="text-xs text-slate-400">
                      {isUk ? faq.a.uk : isRu ? faq.a.ru : faq.a.en}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* In-drawer Lead Form */}
            <div className="pt-6 border-t border-white/10">
              <div className="glass-card rounded-2xl p-6 border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-slate-950">
                <h4 className="text-base font-bold text-white mb-1">
                  Потрібен точний розрахунок для вашого підприємства?
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  Залиште контакти — юридичний радник Recruiter I Club підготує індивідуальну смету та дорожню карту протягом 15 хвилин.
                </p>

                {formSubmitted ? (
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Дякуємо! Наш експерт звʼяжеться з вами найближчим часом.</span>
                  </div>
                ) : (
                  <form onSubmit={handleQuickLead} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        required
                        placeholder="Назва компанії (ТОВ/ФОП)"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="+380 (XX) XXX-XX-XX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs rounded-xl shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Отримати офіційний розрахунок</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-4 border-t border-white/10 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
            <span>Recruiter I Club © {new Date().getFullYear()}</span>
            <Link
              href={`/${locale}/knowledge/${article.slug}`}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <span>Повна версія дослідження</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
