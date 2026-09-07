import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { KNOWLEDGE_ARTICLES, KnowledgeArticle } from "@/lib/knowledgeBase";
import { locales } from "@/i18n";
import { 
  Building2, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Share2,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getMessages } from "next-intl/server";

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params: { locale, slug } }: PageProps): Promise<Metadata> {
  const article = KNOWLEDGE_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};

  const isUk = locale === "uk";
  const isRu = locale === "ru";

  const title = isUk ? article.title.uk : isRu ? article.title.ru : article.title.en;
  const description = isUk ? article.excerpt.uk : isRu ? article.excerpt.ru : article.excerpt.en;
  const baseUrl = "https://recruiter-i-club-portal.vercel.app";
  const pageUrl = `${baseUrl}/${locale}/knowledge/${slug}`;

  return {
    title: `${title} | Recruiter I Club`,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        uk: `${baseUrl}/uk/knowledge/${slug}`,
        ru: `${baseUrl}/ru/knowledge/${slug}`,
        en: `${baseUrl}/en/knowledge/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Recruiter I Club",
      locale,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
    },
  };
}

export default async function KnowledgeArticlePage({ params: { locale, slug } }: PageProps) {
  const article = KNOWLEDGE_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const messages = await getMessages();
  const isUk = locale === "uk";
  const isRu = locale === "ru";

  const title = isUk ? article.title.uk : isRu ? article.title.ru : article.title.en;
  const category = isUk ? article.category.uk : isRu ? article.category.ru : article.category.en;
  const content = isUk ? article.contentHtml.uk : isRu ? article.contentHtml.ru : article.contentHtml.en;

  const relatedArticles = KNOWLEDGE_ARTICLES.filter((a) =>
    article.relatedSlugs.includes(a.slug)
  );

  const baseUrl = "https://recruiter-i-club-portal.vercel.app";
  const pageUrl = `${baseUrl}/${locale}/knowledge/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": isUk ? "Головна" : isRu ? "Главная" : "Home",
            "item": `${baseUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": isUk ? "База знань" : isRu ? "База знаний" : "Knowledge Base",
            "item": `${baseUrl}/${locale}#knowledge`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": title,
            "item": pageUrl,
          },
        ],
      },
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#article`,
        "headline": title,
        "description": isUk ? article.excerpt.uk : isRu ? article.excerpt.ru : article.excerpt.en,
        "author": {
          "@type": "Organization",
          "name": "Recruiter I Club Legal & Operations Hub",
          "url": baseUrl,
        },
        "publisher": {
          "@type": "Organization",
          "name": "Recruiter I Club",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`,
          },
        },
        "datePublished": article.publishedAt,
        "dateModified": article.updatedAt,
        "mainEntityOfPage": pageUrl,
        "articleSection": category,
      },
      ...(article.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              "mainEntity": article.faqs.map((f) => ({
                "@type": "Question",
                "name": isUk ? f.q.uk : isRu ? f.q.ru : f.q.en,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": isUk ? f.a.uk : isRu ? f.a.ru : f.a.en,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* Microdata for AI Search & Googlebot */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Navbar */}
      <Navbar locale={locale} messages={messages} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 overflow-x-auto">
            <Link href={`/${locale}`} className="hover:text-white transition-colors flex items-center gap-1 shrink-0">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Головна</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href={`/${locale}#knowledge`} className="hover:text-white transition-colors shrink-0">
              База знань B2B
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-amber-400 font-semibold truncate max-w-xs sm:max-w-md">
              {category}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-10 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{article.readTimeMin} хв читання</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              {title}
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              {isUk ? article.excerpt.uk : isRu ? article.excerpt.ru : article.excerpt.en}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Автор: {article.author}</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>Оновлено: {article.updatedAt}</span>
              </div>
            </div>
          </header>

          {/* Key Metric Highlight */}
          {article.statsHighlight && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 mb-10 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold mb-1">
                  Ключовий показник нормативу 2026:
                </span>
                <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                  {article.statsHighlight.value}
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  {isUk ? article.statsHighlight.label.uk : isRu ? article.statsHighlight.label.ru : article.statsHighlight.label.en}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
          )}

          {/* Article HTML Body */}
          <article
            className="prose prose-invert max-w-none text-sm sm:text-base text-slate-300 leading-relaxed space-y-6 [&>h3]:text-xl [&>h3]:font-extrabold [&>h3]:text-white [&>h3]:mt-8 [&>h3]:mb-3 [&>h4]:text-base [&>h4]:font-bold [&>h4]:text-amber-400 [&>h4]:mt-6 [&>h4]:mb-2 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2.5 [&>p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* FAQ Accordion Section */}
          {article.faqs.length > 0 && (
            <section className="mt-12 pt-8 border-t border-white/10 space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">
                Часті запитання за цією темою (FAQ):
              </h2>
              <div className="space-y-3">
                {article.faqs.map((faq, idx) => (
                  <div key={idx} className="glass-card rounded-xl p-5 border-white/10 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-amber-400">
                      {isUk ? faq.q.uk : isRu ? faq.q.ru : faq.q.en}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {isUk ? faq.a.uk : isRu ? faq.a.ru : faq.a.en}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA Banner Box */}
          <div className="mt-14 glass-card rounded-2xl p-8 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950">
            <div className="max-w-xl">
              <h3 className="text-xl font-bold text-white mb-2">
                Бажаєте розрахувати штат для вашого підприємства?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Скористайтеся нашим інтерактивним B2B-калькулятором або замовте детальний прорахунок собівартості у спеціаліста Recruiter I Club.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${locale}#calculator`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <span>Відкрити калькулятор</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${locale}#knowledge`}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-white/10 transition-all"
                >
                  До всіх статей
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-16 pt-10 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-6">
                Рекомендовані дослідження:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/${locale}/knowledge/${rel.slug}`}
                    className="glass-card rounded-xl p-5 border-white/10 hover:border-amber-500/40 transition-all group block"
                  >
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">
                      {isUk ? rel.category.uk : isRu ? rel.category.ru : rel.category.en}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                      {isUk ? rel.title.uk : isRu ? rel.title.ru : rel.title.en}
                    </h4>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
