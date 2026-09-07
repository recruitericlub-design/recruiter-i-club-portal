import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales } from "@/i18n";
import { SchemaOrg } from "@/components/SchemaOrg";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isUk = locale === "uk";
  const isRu = locale === "ru";

  const title = isUk
    ? "Recruiter I Club — Підбір та привіз кваліфікованого персоналу з Азії та Європи | Візи D під ключ"
    : isRu
    ? "Recruiter I Club — Подбор и привоз квалифицированного персонала из Азии и Европы | Визы D под ключ"
    : "Recruiter I Club — Turnkey International Staffing & Workforce Provider | Visa D";

  const description = isUk
    ? "Офіційний підбір, оформлення робочих віз D та аутстафінг зварювальників, будівельників, операторів ЧПК та працівників складів з Узбекистану, Індії та Філіппін. Гарантія заміни 30 днів, 0 € авансу."
    : isRu
    ? "Официальный подбор, оформление рабочих виз D и аутстаффинг сварщиков, строителей, операторов ЧПУ и работников складов из Узбекистана, Индии и Филиппин. Гарантия замены 30 дней."
    : "Official B2B recruitment, Visa D processing, and relocation of skilled industrial and construction personnel from Asia and Europe. Turnkey delivery in 21-35 days.";

  const baseUrl = "https://recruiter-club.vercel.app";

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
        <link rel="alternate" hrefLang="uk" href="https://recruiter-club.vercel.app/uk" />
        <link rel="alternate" hrefLang="ru" href="https://recruiter-club.vercel.app/ru" />
        <link rel="alternate" hrefLang="en" href="https://recruiter-club.vercel.app/en" />
        <link rel="alternate" hrefLang="x-default" href="https://recruiter-club.vercel.app/uk" />
      </head>
      <body className={`${inter.variable} font-sans bg-slate-950 text-slate-100 min-h-screen antialiased`}>
        <SchemaOrg locale={locale} />
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}