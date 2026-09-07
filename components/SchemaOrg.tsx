import React from "react";

interface SchemaOrgProps {
  locale: string;
}

export const SchemaOrg: React.FC<SchemaOrgProps> = ({ locale }) => {
  const isUk = locale === "uk";
  const isRu = locale === "ru";

  const orgName = "Recruiter I Club — Прямий міжнародний найм персоналу в штат підприємства";
  const orgDesc = isUk
    ? "Послуги з пошуку, підбору та правового супроводу працевлаштування іноземних громадян в Україні. Офіційні дозволи ДЦЗ, візи D-04, строки 1–4 місяці, 4 етапи оплати по 25%, гарантія заміни 30 днів."
    : isRu
    ? "Услуги по поиску, подбору и правовому сопровождению трудоустройства иностранных граждан в Украине. Официальные разрешения ДЦЗ, визы D-04, сроки 1–4 месяца, оплата 4×25%."
    : "Direct international recruitment and legal employment support for industrial and construction companies in Ukraine. Timelines: 1 to 4 months, 4-stage 25% payments, 30-day warranty.";

  const baseUrl = "https://recruiter-i-club-portal.vercel.app";

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: orgName,
      alternateName: "Recruiter I Club",
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description: orgDesc,
      address: {
        "@type": "PostalAddress",
        streetAddress: "вул. Хрещатик, 22",
        addressLocality: "Київ",
        addressRegion: "Київська область",
        postalCode: "01001",
        addressCountry: "UA",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+380734277174",
          contactType: "customer service",
          areaServed: ["UA"],
          availableLanguage: ["Ukrainian", "Russian", "English"],
        },
      ],
      sameAs: [
        "https://linkedin.com/company/recruiter-i-club",
        "https://t.me/recruiter_i_club",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${baseUrl}/#service-recruitment`,
      name: isUk
        ? "Послуги з пошуку, підбору та правового супроводу працевлаштування іноземних громадян"
        : "Услуги по поиску, подбору и правовому сопровождению трудоустройства иностранцев",
      serviceType: "International Direct Staffing & Legal Employment",
      provider: {
        "@type": "Organization",
        name: "Recruiter I Club",
      },
      areaServed: {
        "@type": "Country",
        name: "Ukraine",
      },
      description: isUk
        ? "Офіційний прямий найм зварювальників, будівельників, операторів ЧПК, швачок та різноробочих з Узбекистану, Індії, Непалу та Бангладеш. Дозвіл ДЦЗ, віза D, строк від 1 до 4 місяців, гарантія заміни 30 днів."
        : "Официальный прямой найм сварщиков, строителей, операторов ЧПУ, швей и разнорабочих из Узбекистана, Индии, Непала и Бангладеш. Сроки от 1 до 4 месяцев, гарантия 30 дней.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice: "850",
        highPrice: "1200",
        offerCount: "6",
        priceValidUntil: "2027-12-31",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Які реальні строки виходу працівників на об'єкт?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Строки становлять від 1 до 4 місяців залежно від країни походження. Для Центральної Азії (Узбекистан, Казахстан) — 1–2 місяці завдяки спрощеному візовому коридору. Для Південної Азії (Індія, Непал, Бангладеш) — 3–4 місяці (максимальний строк 4 місяці чітко фіксується в договорі).",
          },
        },
        {
          "@type": "Question",
          name: "Як працює безпечна 4-етапна оплата 4×25%?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Оплата розділена на 4 рівні частини: 1) 25% при підписанні договору; 2) 25% після погодження кандидатів та отримання Дозволу ДЦЗ; 3) 25% після відкриття візи D та прибуття в транзитний хаб Молдови; 4) 25% лише після фактичного прибуття людей на підприємство та виходу на зміну.",
          },
        },
        {
          "@type": "Question",
          name: "Які гарантії, якщо працівник не підійде або звільниться?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Діє 30-денна юридична гарантія заміни. Якщо працівник не вийшов на зміну або не відповідає узгодженій кваліфікації протягом 30 днів, Recruiter I Club надає безкоштовну заміну з комісією агентства 0 €.",
          },
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
