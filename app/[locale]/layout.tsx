import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales } from "@/i18n";
import { SchemaOrg } from "@/components/SchemaOrg";
import "../globals.css";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isUk = locale === "uk";
  const isRu = locale === "ru";

  const title = isUk
    ? "Recruiter I Club — Прямий міжнародний найм персоналу у ваш штат | Офіційні візи D та дозволи ДЦЗ"
    : isRu
    ? "Recruiter I Club — Прямой международный найм персонала в ваш штат | Официальные разрешения ДЦЗ и визы D"
    : "Recruiter I Club — Direct International Staffing & Workforce Provider | Official Work Permits";

  const description = isUk
    ? "Послуги з пошуку, підбору та правового супроводу працевлаштування іноземних громадян в Україні. Прямий найм у штат ТОВ/ФОП. Строки від 1 до 4 місяців, оплата 4×25%, гарантія заміни 30 днів."
    : isRu
    ? "Услуги по поиску, подбору и правовому сопровождению трудоустройства иностранных граждан в Украине. Прямой найм в штат предприятия. Сроки от 1 до 4 месяцев, оплата 4×25%."
    : "Direct international recruitment and legal employment support for industrial and construction companies in Ukraine. Timelines: 1 to 4 months, 4-stage 25% payments, 30-day warranty.";

  const baseUrl = "https://recruiter-i-club-portal.vercel.app";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: [
      "підбір персоналу з Азії",
      "робітники з Узбекистану",
      "зварювальники з Індії",
      "робоча віза D",
      "аутстафінг персоналу Україна",
      "рекрутинг для виробництва",
      "будівельники під ключ",
      "Recruiter I Club",
    ],
    authors: [{ name: "Recruiter I Club" }],
    creator: "Recruiter I Club",
    publisher: "Recruiter I Club",
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "uk-UA": `${baseUrl}/uk`,
        "ru-UA": `${baseUrl}/ru`,
        "en-US": `${baseUrl}/en`,
        "x-default": `${baseUrl}/uk`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: "Recruiter I Club",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Recruiter I Club — B2B Recruitment Ecosystem",
        },
      ],
      locale: isUk ? "uk_UA" : isRu ? "ru_RU" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth dark">
      <head>
        <link rel="alternate" hrefLang="uk" href="https://recruiter-i-club-portal.vercel.app/uk" />
        <link rel="alternate" hrefLang="ru" href="https://recruiter-i-club-portal.vercel.app/ru" />
        <link rel="alternate" hrefLang="en" href="https://recruiter-i-club-portal.vercel.app/en" />
        <link rel="alternate" hrefLang="x-default" href="https://recruiter-i-club-portal.vercel.app/uk" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-amber-500 selection:text-black">
        <SchemaOrg locale={locale} />
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}