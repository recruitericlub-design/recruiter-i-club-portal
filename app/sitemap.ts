import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://recruiter-i-club-portal.vercel.app";
  const locales = ["uk", "ru", "en"];

  const routes = [
    "",
    "/#calculator",
    "/#candidates",
    "/#knowledge",
    "/#terminal",
    "/#fines-calculator",
    "/#faq",
  ];

  const professions = [
    "zvaryuvalnyky-135-136",
    "operatory-chpk",
    "armaturnyky-monolitnyky",
    "shvachky-promyslovi",
    "budivelnyky-ozdiblyuvachi",
    "elektromontery",
  ];

  const knowledgeSlugs = [
    "mobilization-immunity-law-23",
    "labor-inspections-derzhpratsi-fines-2026",
    "legal-work-permits-dcz-steps",
    "direct-hiring-vs-outstaffing-comparison",
    "welder-trade-tests-radiography-verification",
    "cost-analysis-foreign-staff-ukraine",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    });

    professions.forEach((slug) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/professions/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    });

    knowledgeSlugs.forEach((slug) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/knowledge/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.85,
      });
    });
  });

  return sitemapEntries;
}
