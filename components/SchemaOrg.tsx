import React from "react";

interface SchemaOrgProps {
  locale: string;
}

export const SchemaOrg: React.FC<SchemaOrgProps> = ({ locale }) => {
  const isUk = locale === "uk";
  const isRu = locale === "ru";

  const orgName = "Recruiter I Club � ̳��������� B2B ��������� & ���������";
  const orgDesc = isUk
    ? "�������� ����, ������ ������� (��� D) �� ��������� ������������� ����������� � ����������� ��������� � �糿 �� ������ � ������ �� ����� ��."
    : isRu
    ? "����������� ������, ������� ������������� (���� D) � ������ ������������������ ����������������� � ������������� ��������� �� ���� � ������."
    : "Official B2B recruitment, Visa D processing, and relocation of skilled industrial and construction personnel from Asia and Europe.";

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://recruiter-club.vercel.app/#organization",
      name: orgName,
      alternateName: "Recruiter I Club",
      url: "https://recruiter-club.vercel.app",
      logo: "https://recruiter-club.vercel.app/logo.png",
      description: orgDesc,
      address: {
        "@type": "PostalAddress",
        streetAddress: "���. ��������, 22",
        addressLocality: "���",
        addressRegion: "������� �������",
        postalCode: "01001",
        addressCountry: "UA",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+380501234567",
          contactType: "customer service",
          areaServed: ["UA", "PL", "DE", "CZ", "RO"],
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
      "@type": "LocalBusiness",
      "@id": "https://recruiter-club.vercel.app/#localbusiness",
      name: orgName,
      image: "https://recruiter-club.vercel.app/og-image.jpg",
      telephone: "+380501234567",
      email: "office@recruiter-club.com",
      url: "https://recruiter-club.vercel.app",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "���. ��������, 22",
        addressLocality: "���",
        postalCode: "01001",
        addressCountry: "UA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 50.447065,
        longitude: 30.523028,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "19:00",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://recruiter-club.vercel.app/#service-staffing",
      name: isUk
        ? "ϳ��� �� ����� ��������� � �糿 �� ����"
        : "������ � ������ ��������� �� ���� ��� ����",
      serviceType: "International Staffing & Recruitment",
      provider: {
        "@type": "Organization",
        name: "Recruiter I Club",
      },
      areaServed: {
        "@type": "Country",
        name: "Ukraine",
      },
      description: isUk
        ? "����������� ���� �������������, �����������, ��������� �������� ��� � �����������, ��䳿, Գ����. ���������� ������ ��� D, ���������� �� ����, �������� �� ��?���, ������� ����� 30 ���."
        : "����������� ������ ���������, ����������, ���������� ������� � ��� �� �����������, �����, ��������. ���������� ������� ���� D, ������������ �� �����, �������� �� ������.",
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: "0",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
