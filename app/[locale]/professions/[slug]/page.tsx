import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { DEFICIENT_PROFESSIONS, DeficientProfession } from "@/lib/professionsData";
import { 
  Building2, 
  Clock, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Activity, 
  TrendingUp,
  FileCheck,
  Zap
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
  const profession = DEFICIENT_PROFESSIONS.find((p) => p.slug === slug);
  if (!profession) return {};

  const isUk = locale === "uk";
  const isRu = locale === "ru";

  const title = isUk ? profession.title.uk : isRu ? profession.title.ru : profession.title.en;
  const desc = isUk ? profession.shortDesc.uk : isRu ? profession.shortDesc.ru : profession.shortDesc.en;
  const baseUrl = "https://recruiter-i-club-portal.vercel.app";
  const pageUrl = `${baseUrl}/${locale}/professions/${slug}`;

  return {
    title: `Найм: ${title} під ключ в Україні | Recruiter I Club`,
    description: `${desc} Норматив: ${isUk ? profession.shiftOutputNorm.uk : profession.shiftOutputNorm.ru}. Строк прибуття 1–4 міс. Гарантія 30 днів.`,
    alternates: {
      canonical: pageUrl,
      languages: {
        uk: `${baseUrl}/uk/professions/${slug}`,
        ru: `${baseUrl}/ru/professions/${slug}`,
        en: `${baseUrl}/en/professions/${slug}`,
      },
    },
    openGraph: {
      title: `${title} — прямий офіційний найм персоналу`,
      description: desc,
      url: pageUrl,
      siteName: "Recruiter I Club",
      locale,
      type: "website",
    },
  };
}

export default async function ProfessionDetailPage({ params: { locale, slug } }: PageProps) {
  const profession = DEFICIENT_PROFESSIONS.find((p) => p.slug === slug);
  if (!profession) notFound();

  const messages = await getMessages();
  const isUk = locale === "uk";
  const isRu = locale === "ru";

  const title = isUk ? profession.title.uk : isRu ? profession.title.ru : profession.title.en;
  const industry = isUk ? profession.industryName.uk : isRu ? profession.industryName.ru : profession.industryName.en;
  const desc = isUk ? profession.shortDesc.uk : isRu ? profession.shortDesc.ru : profession.shortDesc.en;
  const norm = isUk ? profession.shiftOutputNorm.uk : isRu ? profession.shiftOutputNorm.ru : profession.shiftOutputNorm.en;
  const delivery = isUk ? profession.deliveryTime.uk : isRu ? profession.deliveryTime.ru : profession.deliveryTime.en;
  const salary = isUk ? profession.salaryBenchmark.uk : isRu ? profession.salaryBenchmark.ru : profession.salaryBenchmark.en;
  const testInfo = isUk ? profession.testDetails.uk : isRu ? profession.testDetails.ru : profession.testDetails.en;

  const related = DEFICIENT_PROFESSIONS.filter(
    (p) => p.industryId === profession.industryId && p.id !== profession.id
  );

  const baseUrl = "https://recruiter-i-club-portal.vercel.app";
  const pageUrl = `${baseUrl}/${locale}/professions/${slug}`;

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
            "name": isUk ? "Каталог професій" : isRu ? "Каталог профессий" : "Professions Hub",
            "item": `${baseUrl}/${locale}#professions-hub`,
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
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": `Прямий підбір фахівців: ${title}`,
        "serviceType": "International Workforce Staffing",
        "provider": {
          "@type": "Organization",
          "name": "Recruiter I Club",
          "url": baseUrl,
        },
        "description": desc,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": "850",
          "priceValidUntil": "2027-12-31",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Як підтверджується кваліфікація за фахом ${title}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": testInfo,
            },
          },
          {
            "@type": "Question",
            "name": `Який норматив виробітки за зміну показують працівники?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": norm,
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <Link href={`/${locale}#professions-hub`} className="hover:text-white transition-colors shrink-0">
              Каталог професій 2026
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-amber-400 font-semibold truncate max-w-xs">
              {title}
            </span>
          </nav>

          {/* Header Card */}
          <header className="glass-card rounded-2xl p-6 sm:p-8 border-white/10 mb-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {industry}
              </span>
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 bg-red-950/40 px-3 py-1 rounded-full border border-red-500/30">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{profession.demandPercentage}% дефіцит на ринку України</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {title} під ключ для вашого виробництва
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {desc}
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Строк виходу на зміну:</span>
                <span className="text-sm font-bold text-white font-mono mt-0.5 block">{delivery}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Орієнтир зарплати:</span>
                <span className="text-sm font-bold text-amber-400 font-mono mt-0.5 block">{salary}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Міжнародний стандарт:</span>
                <span className="text-sm font-bold text-cyan-400 font-mono mt-0.5 block">{profession.standards}</span>
              </div>
            </div>
          </header>

          {/* Shift Output Benchmark Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 mb-8 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Гарантований норматив виробітки за 8-годинну зміну:
              </span>
              <p className="text-base font-extrabold text-white leading-snug">
                {norm}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                * Виробітка фіксується у договорі SLA. У разі систематичного невиконання нормативів надається безкоштовна заміна працівника.
              </p>
            </div>
          </div>

          {/* Practical Testing Protocol */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border-white/10 mb-8 space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <FileCheck className="w-5 h-5 text-amber-400" />
              <h2>Як проводиться практичний тест кваліфікації:</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {testInfo}
            </p>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-400 space-y-2">
              <p className="font-semibold text-white">Ключові навички перевірених працівників:</p>
              <div className="flex flex-wrap gap-2">
                {profession.skillsList.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-medium">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Lead Card */}
          <div className="glass-card rounded-2xl p-8 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 mb-12">
            <h3 className="text-xl font-bold text-white mb-2">
              Замовити бригаду фахівців: {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              Ми сформуємо пул верифікованих відеоанкет та підготуємо документи для оформлення дозволу ДЦЗ протягом 5–7 робочих днів.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}#calculator`}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center gap-2"
              >
                <span>Розрахувати вартість під ключ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}#professions-hub`}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-white/10 transition-all"
              >
                До всіх спеціальностей
              </Link>
            </div>
          </div>

          {/* Related from same industry */}
          {related.length > 0 && (
            <div className="pt-8 border-t border-white/10">
              <h3 className="text-base font-bold text-white mb-4">
                Схожі спеціальності галузі:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/${locale}/professions/${rel.slug}`}
                    className="glass-card rounded-xl p-4 border-white/10 hover:border-amber-500/40 transition-all group block"
                  >
                    <span className="text-[10px] text-amber-400 font-mono block mb-1">
                      {rel.standards}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {isUk ? rel.title.uk : isRu ? rel.title.ru : rel.title.en}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
