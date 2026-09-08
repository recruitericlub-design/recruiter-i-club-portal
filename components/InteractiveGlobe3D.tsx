"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { 
  RotateCcw, 
  Play, 
  Pause, 
  ZoomOut, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Banknote,
  HeartHandshake,
  CheckCircle2,
  Scan,
  Compass,
  Globe2,
  Activity,
  Layers
} from "lucide-react";
import { playSciFiBeep } from "@/lib/soundFX";

export interface CountryDossier {
  id: string;
  name: string;
  country: string;
  region: string;
  flag: string;
  code: string;
  lat: number;
  lon: number;
  hubType: string;
  targetWageUA: string;
  targetWageUAH: string;
  homeWage: string;
  homeWageUAH: string;
  wageMultiplier: string;
  wageRatioNumber: number; // e.g. 3.2
  visaTime: string;
  securityCheck: string;
  workSchedule: string;
  culturalTraits: string[];
  economicAdvantage: string;
  flightCode: string;
  flightOrigin: string;
  isMainHub?: boolean;
  satelliteImage: string;
  satelliteCoords: string;
  altitude: string;
  resolution: string;
}

interface WorldCity {
  name: string;
  lat: number;
  lon: number;
  isPartner?: boolean;
}

interface WorkforceArc {
  id: string;
  fromName: string;
  fromCoords: [number, number]; // [lat, lon]
  toCoords: [number, number];   // [lat, lon]
  color: string;
  speed: number;
  offset: number;
  maxAltitude: number;
}

export interface InteractiveGlobe3DProps {
  locale?: string;
}

// Global network of world cities for rich planetary data density
const WORLD_CITIES: WorldCity[] = [
  { name: "Kyiv", lat: 50.4501, lon: 30.5234, isPartner: true },
  { name: "Tashkent", lat: 41.2995, lon: 69.2401, isPartner: true },
  { name: "New Delhi", lat: 28.6139, lon: 77.2090, isPartner: true },
  { name: "Manila", lat: 14.5995, lon: 120.9842, isPartner: true },
  { name: "Dhaka", lat: 23.8103, lon: 90.4125, isPartner: true },
  { name: "Kathmandu", lat: 27.7172, lon: 85.3240, isPartner: true },
  { name: "Chisinau", lat: 47.0105, lon: 28.8638, isPartner: true },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Seoul", lat: 37.5665, lon: 126.9780 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Bangkok", lat: 13.7563, lon: 100.5018 },
  { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
  { name: "Dubai", lat: 25.2048, lon: 55.2708 },
  { name: "Istanbul", lat: 41.0082, lon: 28.9784 },
  { name: "Warsaw", lat: 52.2297, lon: 21.0122 },
  { name: "Berlin", lat: 52.5200, lon: 13.4050 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Rome", lat: 41.9028, lon: 12.4964 },
  { name: "Cairo", lat: 30.0444, lon: 31.2357 },
  { name: "Astana", lat: 51.1694, lon: 71.4491 },
  { name: "Almaty", lat: 43.2389, lon: 76.9455 },
  { name: "Samarkand", lat: 39.6542, lon: 66.9597 },
  { name: "Baku", lat: 40.4093, lon: 49.8671 },
];

const getCountries = (lang: "uk" | "ru" | "en"): CountryDossier[] => {
  if (lang === "ru") {
    return [
      {
        id: "kyiv",
        name: "Киев",
        country: "Украина",
        region: "Восточная Европа // Базовый хаб",
        flag: "🇺🇦",
        code: "UA",
        lat: 50.4501,
        lon: 30.5234,
        hubType: "ГЛАВНЫЙ B2B ХАБ // ОФОРМЛЕНИЕ В ШТАТ",
        targetWageUA: "1 100 – 1 450 €",
        targetWageUAH: "48 000 – 65 000 ₴ / мес",
        homeWage: "Дефицитный рынок",
        homeWageUAH: "Высокий риск мобилизации",
        wageMultiplier: "100% защита",
        wageRatioNumber: 1.0,
        visaTime: "0 дней (Оформление на месте)",
        securityCheck: "100% ОТК / Защита от штрафов Гоструда",
        workSchedule: "Штатное расписание предприятия, бронирование",
        culturalTraits: [
          "Родной язык и общие производственные традиции",
          "Быстрая интеграция в трудовой коллектив",
          "Проблема: ежедневный риск призыва и остановки конвейеров"
        ],
        economicAdvantage: "Прямое зачисление в штат украинского предприятия без посредников. 100% иммунитет от мобилизации для иностранного персонала (ст. 23 ЗУ).",
        flightCode: "UA-HUB",
        flightOrigin: "Киев (Борисполь / Жуляны)",
        isMainHub: true,
        satelliteImage: "https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "50°27'N 30°31'E",
        altitude: "179m",
        resolution: "0.3m/px GSD"
      },
      {
        id: "tashkent",
        name: "Ташкент",
        country: "Узбекистан",
        region: "Страны СНГ // Центральная Азия",
        flag: "🇺🇿",
        code: "UZ",
        lat: 41.2995,
        lon: 69.2401,
        hubType: "СТРАНЫ СНГ // БЕЗВИЗОВЫЙ РЕЖИМ",
        targetWageUA: "от 900 €",
        targetWageUAH: "~39 500 ₴ / мес",
        homeWage: "~220 – 320 € / мес",
        homeWageUAH: "~9 500 – 14 000 ₴",
        wageMultiplier: "в 3.2 раза выше",
        wageRatioNumber: 3.2,
        visaTime: "25–35 рабочих дней",
        securityCheck: "МВД + Интерпол + Биометрический скрининг",
        workSchedule: "Готовность к сменам 10–12 часов, 6 дней/нед",
        culturalTraits: [
          "Полное отсутствие языкового барьера (свободный русский)",
          "Сухой закон: нулевой алкогольный фактор на сменах и в быту",
          "Традиционная трудовая этика: безоговорочное уважение к мастеру",
          "Высокая семейная мотивация (отправляют доход семье)"
        ],
        economicAdvantage: "Специалисты из стран СНГ без языкового барьера. Доход в 3+ раза выше домашнего, что гарантирует 100% дисциплину и нулевую текучесть.",
        flightCode: "HY-731",
        flightOrigin: "Ташкент (TAS)",
        satelliteImage: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "41°18'N 69°14'E",
        altitude: "455m",
        resolution: "0.5m/px GSD"
      },
      {
        id: "delhi",
        name: "Нью-Дели",
        country: "Индия",
        region: "Южная Азия // Технический кластер",
        flag: "🇮🇳",
        code: "IN",
        lat: 28.6139,
        lon: 77.2090,
        hubType: "ЮЖНАЯ АЗИЯ // ПРОМЫШЛЕННЫЙ ПУЛ",
        targetWageUA: "от 600 €",
        targetWageUAH: "~26 500 ₴ / мес",
        homeWage: "~140 – 210 € / мес",
        homeWageUAH: "~6 000 – 9 200 ₴",
        wageMultiplier: "в 3.5 раза выше",
        wageRatioNumber: 3.5,
        visaTime: "35–45 рабочих дней",
        securityCheck: "Консульская легализация + Справка о несудимости",
        workSchedule: "Цеховые посменные графики, точное следование техкартам",
        culturalTraits: [
          "Английский язык + русскоязычные старшие бригадиры",
          "Высокая техническая выдержка при монотонном цеховом труде",
          "Строгое соблюдение субординации и внутренних регламентов",
          "Миролюбивый менталитет, абсолютный порядок в общежитиях"
        ],
        economicAdvantage: "Ставка от 600 € обеспечивает украинскому предприятию экономию фонда оплаты труда до 35–40% при высокой мотивации персонала.",
        flightCode: "AI-419",
        flightOrigin: "Дели (DEL)",
        satelliteImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "28°36'N 77°12'E",
        altitude: "216m",
        resolution: "0.5m/px GSD"
      },
      {
        id: "manila",
        name: "Манила",
        country: "Филиппины",
        region: "Юго-Восточная Азия",
        flag: "🇵🇭",
        code: "PH",
        lat: 14.5995,
        lon: 120.9842,
        hubType: "ТОЧНОЕ ПРОИЗВОДСТВО & ШВЕЙНЫЕ ЛИНИИ",
        targetWageUA: "от 650 €",
        targetWageUAH: "~28 500 ₴ / мес",
        homeWage: "~160 – 240 € / мес",
        homeWageUAH: "~7 000 – 10 500 ₴",
        wageMultiplier: "в 3.0 раза выше",
        wageRatioNumber: 3.0,
        visaTime: "40–50 рабочих дней",
        securityCheck: "Госрегистрация DMW/POEA + Интерпол",
        workSchedule: "Скоростные конвейерные и операционные линии",
        culturalTraits: [
          "Свободное владение английским языком (100%)",
          "Культура безупречной чистоты рабочего места (стандарты 5S)",
          "Эталонная аккуратность: уровень брака менее 0.1%",
          "Природная вежливость, дисциплина и безукоризненная гигиена"
        ],
        economicAdvantage: "Идеальный выбор для легкой промышленности, швейных фабрик, упаковки и электроники по стандартам заводов ЕС и Японии.",
        flightCode: "PR-882",
        flightOrigin: "Манила (MNL)",
        satelliteImage: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "14°35'N 120°58'E",
        altitude: "16m",
        resolution: "0.4m/px GSD"
      },
      {
        id: "dhaka",
        name: "Дакка",
        country: "Бангладеш",
        region: "Южная Азия // Строительство",
        flag: "🇧🇩",
        code: "BD",
        lat: 23.8103,
        lon: 90.4125,
        hubType: "МАССОВЫЙ СТРОИТЕЛЬНО-МОНТАЖНЫЙ ПУЛ",
        targetWageUA: "от 600 €",
        targetWageUAH: "~26 500 ₴ / мес",
        homeWage: "~110 – 160 € / мес",
        homeWageUAH: "~4 800 – 7 000 ₴",
        wageMultiplier: "в 4.0 раза выше",
        wageRatioNumber: 4.0,
        visaTime: "30–40 рабочих дней",
        securityCheck: "Правительственный реестр BMET + Сертификат здоровья",
        workSchedule: "Монолитные, фасадные и монтажные объекты",
        culturalTraits: [
          "Исключительная сплоченность: работа слаженными бригадами",
          "Устойчивость к тяжелым физическим нагрузкам и холоду",
          "Беспрекословное подчинение назначенному бригадиру",
          "Высочайшая мотивация сохранить рабочее место в Европе"
        ],
        economicAdvantage: "Быстрое комплектование крупных строительных и инфраструктурных объектов бригадами от 15 до 50 человек с кураторами.",
        flightCode: "BG-504",
        flightOrigin: "Дакка (DAC)",
        satelliteImage: "https://images.unsplash.com/photo-1608659597669-b45511779f93?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "23°48'N 90°24'E",
        altitude: "12m",
        resolution: "0.5m/px GSD"
      },
      {
        id: "kathmandu",
        name: "Катманду",
        country: "Непал",
        region: "Горный регион Азии",
        flag: "🇳🇵",
        code: "NP",
        lat: 27.7172,
        lon: 85.3240,
        hubType: "ТЯЖЕЛЫЕ ПРОИЗВОДСТВА & КАРЬЕРЫ",
        targetWageUA: "от 600 €",
        targetWageUAH: "~26 500 ₴ / мес",
        homeWage: "~120 – 170 € / мес",
        homeWageUAH: "~5 200 – 7 400 ₴",
        wageMultiplier: "в 3.8 раза выше",
        wageRatioNumber: 3.8,
        visaTime: "35–45 рабочих дней",
        securityCheck: "Полицейский департамент Непала + Медосмотр ВОЗ",
        workSchedule: "Физически сложные условия, открытые площадки",
        culturalTraits: [
          "Легендарная выносливость горных народов",
          "Абсолютная честность, искренность и преданность труду",
          "Полное отсутствие внутренней или внешней агрессии",
          "Высокая неприхотливость к бытовым условиям проживания"
        ],
        economicAdvantage: "Природная стрессоустойчивость, надежность в самых суровых цеховых условиях карьеров, металлургии и бетонных заводов.",
        flightCode: "RA-218",
        flightOrigin: "Катманду (KTM)",
        satelliteImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "27°42'N 85°19'E",
        altitude: "1400m",
        resolution: "0.5m/px GSD"
      },
      {
        id: "chisinau",
        name: "Кишинев",
        country: "Молдова",
        region: "Восточная Европа // Транзит",
        flag: "🇲🇩",
        code: "MD",
        lat: 47.0105,
        lon: 28.8638,
        hubType: "ТРАНЗИТНЫЙ ЕВРОПЕЙСКИЙ ХАБ",
        targetWageUA: "от 950 €",
        targetWageUAH: "~41 500 ₴ / мес",
        homeWage: "~450 – 600 € / мес",
        homeWageUAH: "~19 500 – 26 000 ₴",
        wageMultiplier: "в 1.8 раза выше",
        wageRatioNumber: 1.8,
        visaTime: "Оперативный транзит (1–2 дня)",
        securityCheck: "Погранслужба Украины (ГПСУ) + ДЦЗ",
        workSchedule: "Сухопутный безопасный коридор доставки",
        culturalTraits: [
          "Украинско-молдавское приграничное партнерство",
          "Быстрая наземная логистика без закрытого неба",
          "Прямой автобусный подъезд в любую область Украины"
        ],
        economicAdvantage: "Прямая доставка нанятых специалистов комфортабельными автобусами непосредственно в общежития заказчика в Украине.",
        flightCode: "MD-CORRIDOR",
        flightOrigin: "Кишинев (KIV)",
        satelliteImage: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "47°00'N 28°51'E",
        altitude: "85m",
        resolution: "0.5m/px GSD"
      }
    ];
  }

  if (lang === "en") {
    return [
      {
        id: "kyiv",
        name: "Kyiv",
        country: "Ukraine",
        region: "Eastern Europe // Primary Hub",
        flag: "🇺🇦",
        code: "UA",
        lat: 50.4501,
        lon: 30.5234,
        hubType: "HEADQUARTERS B2B HUB // DIRECT PAYROLL",
        targetWageUA: "€1,100 – €1,450",
        targetWageUAH: "48,000 – 65,000 ₴ / mo",
        homeWage: "Severe Deficit Market",
        homeWageUAH: "High Mobilization Risk",
        wageMultiplier: "100% immune",
        wageRatioNumber: 1.0,
        visaTime: "0 days (Domestic placement)",
        securityCheck: "100% Quality Audit / State Labor Compliance",
        workSchedule: "Enterprise payroll, official regulatory exemption",
        culturalTraits: [
          "Native language & established industrial manufacturing traditions",
          "Immediate operational integration into production workflows",
          "Challenge: daily conscription risks halting factory lines"
        ],
        economicAdvantage: "Direct payroll onboarding into Ukrainian enterprises. 100% statutory immunity from mobilization under Art. 23 of Law of Ukraine.",
        flightCode: "UA-HUB",
        flightOrigin: "Kyiv (KBP / IEV)",
        isMainHub: true,
        satelliteImage: "https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "50°27'N 30°31'E",
        altitude: "179m",
        resolution: "0.3m/px GSD"
      },
      {
        id: "tashkent",
        name: "Tashkent",
        country: "Uzbekistan",
        region: "CIS Region // Central Asia",
        flag: "🇺🇿",
        code: "UZ",
        lat: 41.2995,
        lon: 69.2401,
        hubType: "CIS COUNTRIES // EXPEDITED ENTRY",
        targetWageUA: "from €900",
        targetWageUAH: "~39,500 ₴ / mo",
        homeWage: "~€220 – €320 / mo",
        homeWageUAH: "~9,500 – 14,000 ₴",
        wageMultiplier: "3.2x higher",
        wageRatioNumber: 3.2,
        visaTime: "25–35 working days",
        securityCheck: "MIA + Interpol + Biometric Screening",
        workSchedule: "Ready for 10–12 hour shifts, 6 days/week",
        culturalTraits: [
          "Zero language barrier across production teams",
          "Zero-alcohol lifestyle: strictly sober workforce on shifts",
          "High respect for factory foremen and industrial hierarchy",
          "Family-driven motivation ensuring zero absenteeism"
        ],
        economicAdvantage: "Skilled workers from Central Asia. Wages 3.2x domestic income guarantee absolute dedication, discipline, and zero turnover.",
        flightCode: "HY-731",
        flightOrigin: "Tashkent (TAS)",
        satelliteImage: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "41°18'N 69°14'E",
        altitude: "455m",
        resolution: "0.5m/px GSD"
      },
      {
        id: "delhi",
        name: "New Delhi",
        country: "India",
        region: "South Asia // Technical Cluster",
        flag: "🇮🇳",
        code: "IN",
        lat: 28.6139,
        lon: 77.2090,
        hubType: "SOUTH ASIA // INDUSTRIAL WORKFORCE",
        targetWageUA: "from €600",
        targetWageUAH: "~26,500 ₴ / mo",
        homeWage: "~€140 – €210 / mo",
        homeWageUAH: "~6,000 – 9,200 ₴",
        wageMultiplier: "3.5x higher",
        wageRatioNumber: 3.5,
        visaTime: "35–45 working days",
        securityCheck: "Consular Legalization + Clean Criminal Record",
        workSchedule: "Plant shift schedules, precision blueprint execution",
        culturalTraits: [
          "English fluency + bilingual lead shift supervisors",
          "Exceptional physical stamina on repetitive production lines",
          "Strict adherence to technical blueprints and safety SOPs",
          "Peaceful team mentality with zero friction in living quarters"
        ],
        economicAdvantage: "Base wages from €600 save Ukrainian plants up to 35–40% in labor payroll while keeping maximum motivation for overtime.",
        flightCode: "AI-419",
        flightOrigin: "Delhi (DEL)",
        satelliteImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "28°36'N 77°12'E",
        altitude: "216m",
        resolution: "0.5m/px GSD"
      },
      {
        id: "manila",
        name: "Manila",
        country: "Philippines",
        region: "Southeast Asia",
        flag: "🇵🇭",
        code: "PH",
        lat: 14.5995,
        lon: 120.9842,
        hubType: "PRECISION MANUFACTURING & TEXTILES",
        targetWageUA: "from €650",
        targetWageUAH: "~28,500 ₴ / mo",
        homeWage: "~€160 – €240 / mo",
        homeWageUAH: "~7,000 – 10,500 ₴",
        wageMultiplier: "3.0x higher",
        wageRatioNumber: 3.0,
        visaTime: "40–50 working days",
        securityCheck: "DMW/POEA Accreditation + Interpol Check",
        workSchedule: "High-speed conveyor and operational lines",
        culturalTraits: [
          "100% English proficiency across all staff",
          "5S workplace culture and impeccable cleanliness",
          "Defect rate below 0.1% in micro-assembly operations",
          "Natural politeness, precision, and reliable personal hygiene"
        ],
        economicAdvantage: "The premier solution for light manufacturing, garment plants, packaging, and electronics adhering to EU and Japanese QA standards.",
        flightCode: "PR-882",
        flightOrigin: "Manila (MNL)",
        satelliteImage: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "14°35'N 120°58'E",
        altitude: "16m",
        resolution: "0.4m/px GSD"
      },
      {
        id: "dhaka",
        name: "Dhaka",
        country: "Bangladesh",
        region: "South Asia // Construction Pool",
        flag: "🇧🇩",
        code: "BD",
        lat: 23.8103,
        lon: 90.4125,
        hubType: "MASSIVE CONSTRUCTION & FORMWORK POOL",
        targetWageUA: "from €600",
        targetWageUAH: "~26,500 ₴ / mo",
        homeWage: "~€110 – €160 / mo",
        homeWageUAH: "~4,800 – 7,000 ₴",
        wageMultiplier: "4.0x higher",
        wageRatioNumber: 4.0,
        visaTime: "30–40 working days",
        securityCheck: "Government BMET Registry + Health Certification",
        workSchedule: "Monolithic, concrete, and facade construction works",
        culturalTraits: [
          "Exceptional team cohesion: organized brigade units",
          "High resilience to extreme weather and heavy physical labor",
          "Absolute obedience to appointed foremen and site engineers",
          "Highest motivation to maintain long-term European employment"
        ],
        economicAdvantage: "Fast staffing of major commercial construction and infrastructure projects with pre-assembled brigades of 15–50 workers.",
        flightCode: "BG-504",
        flightOrigin: "Dhaka (DAC)",
        satelliteImage: "https://images.unsplash.com/photo-1608659597669-b45511779f93?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "23°48'N 90°24'E",
        altitude: "12m",
        resolution: "0.5m/px GSD"
      },
      {
        id: "kathmandu",
        name: "Kathmandu",
        country: "Nepal",
        region: "Himalayan Region",
        flag: "🇳🇵",
        code: "NP",
        lat: 27.7172,
        lon: 85.3240,
        hubType: "HEAVY INDUSTRIAL & QUARRY TEAMS",
        targetWageUA: "from €600",
        targetWageUAH: "~26,500 ₴ / mo",
        homeWage: "~€120 – €170 / mo",
        homeWageUAH: "~5,200 – 7,400 ₴",
        wageMultiplier: "3.8x higher",
        wageRatioNumber: 3.8,
        visaTime: "35–45 working days",
        securityCheck: "Nepal Police Clearance + WHO Medical Check",
        workSchedule: "Physically demanding open-air sites and mills",
        culturalTraits: [
          "Renowned physical endurance of Himalayan native peoples",
          "Absolute honesty, trust, and dedication to physical craft",
          "Complete absence of internal or external interpersonal conflict",
          "Effortless adaptation to austere living accommodations"
        ],
        economicAdvantage: "Natural stress resilience, zero conflicts, and dependable performance in the most arduous quarrying and metallurgical environments.",
        flightCode: "RA-218",
        flightOrigin: "Kathmandu (KTM)",
        satelliteImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "27°42'N 85°19'E",
        altitude: "1400m",
        resolution: "0.5m/px GSD"
      },
      {
        id: "chisinau",
        name: "Chisinau",
        country: "Moldova",
        region: "Eastern Europe // Transit Hub",
        flag: "🇲🇩",
        code: "MD",
        lat: 47.0105,
        lon: 28.8638,
        hubType: "TRANSIT EUROPEAN GATEWAY",
        targetWageUA: "from €950",
        targetWageUAH: "~41,500 ₴ / mo",
        homeWage: "~€450 – €600 / mo",
        homeWageUAH: "~19,500 – 26,000 ₴",
        wageMultiplier: "1.8x higher",
        wageRatioNumber: 1.8,
        visaTime: "Express overland transit (1–2 days)",
        securityCheck: "State Border Guard Service of Ukraine + DCZ",
        workSchedule: "Overland secure transport corridor",
        culturalTraits: [
          "Border neighborhood between Ukraine and Moldova",
          "Swift overland logistics bypassing closed airspace",
          "Direct coach transport to client facilities in Ukraine"
        ],
        economicAdvantage: "Direct door-to-door ground transfer of onboarded employees directly into client worker dormitories in Ukraine.",
        flightCode: "MD-CORRIDOR",
        flightOrigin: "Chisinau (KIV)",
        satelliteImage: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=800&q=80",
        satelliteCoords: "47°00'N 28°51'E",
        altitude: "85m",
        resolution: "0.5m/px GSD"
      }
    ];
  }

  // Default Ukrainian
  return [
    {
      id: "kyiv",
      name: "Київ",
      country: "Україна",
      region: "Східна Європа // Базовий хаб",
      flag: "🇺🇦",
      code: "UA",
      lat: 50.4501,
      lon: 30.5234,
      hubType: "ГОЛОВНИЙ B2B ХАБ // ОФОРМЛЕННЯ В ШТАТ",
      targetWageUA: "1 100 – 1 450 €",
      targetWageUAH: "48 000 – 65 000 ₴ / міс",
      homeWage: "Дефіцитний ринок",
      homeWageUAH: "Високий ризик мобілізації",
      wageMultiplier: "100% захист",
      wageRatioNumber: 1.0,
      visaTime: "0 днів (Оформлення на місці)",
      securityCheck: "100% ВТК / Захист від штрафів Держпраці",
      workSchedule: "Штатний розпис підприємства, офіційне бронювання",
      culturalTraits: [
        "Рідна мова та спільні виробничі традиції ДСТУ",
        "Швидка інтеграція в колектив",
        "Проблема: щоденний ризик призову та зупинки ліній"
      ],
      economicAdvantage: "Пряме зарахування у штат українського заводу без посередників. 100% імунітет від мобілізації для іноземного персоналу (ст. 23 ЗУ).",
      flightCode: "UA-HUB",
      flightOrigin: "Київ (Бориспіль / Жуляни)",
      isMainHub: true,
      satelliteImage: "https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "50°27'N 30°31'E",
      altitude: "179m",
      resolution: "0.3m/px GSD"
    },
    {
      id: "tashkent",
      name: "Ташкент",
      country: "Узбекистан",
      region: "Країни СНД // Центральна Азія",
      flag: "🇺🇿",
      code: "UZ",
      lat: 41.2995,
      lon: 69.2401,
      hubType: "КРАЇНИ СНД // БЕЗВІЗОВИЙ РЕЖИМ",
      targetWageUA: "від 900 €",
      targetWageUAH: "~39 500 ₴ / міс",
      homeWage: "~220 – 320 € / міс",
      homeWageUAH: "~9 500 – 14 000 ₴",
      wageMultiplier: "у 3.2 рази вище",
      wageRatioNumber: 3.2,
      visaTime: "25–35 робочих днів",
      securityCheck: "МВС + Інтерпол + Біометричний скринінг",
      workSchedule: "Готовність до 10–12 год змін, 6 днів/тиж",
      culturalTraits: [
        "Відсутність мовного бар'єру (вільне володіння)",
        "Сухий закон: повна відсутність алкогольного фактору",
        "Патріархальна трудова етика: повага до керівництва і майстра",
        "Висока сімейна відповідальність (надсилають кошти додому)"
      ],
      economicAdvantage: "Робітники з країн СНД без мовного бар'єру. Дохід у 3+ рази перевищує домашній, що гарантує 100% дисципліну, відсутність зривів та нульову плинність.",
      flightCode: "HY-731",
      flightOrigin: "Ташкент (TAS)",
      satelliteImage: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "41°18'N 69°14'E",
      altitude: "455m",
      resolution: "0.5m/px GSD"
    },
    {
      id: "delhi",
      name: "Нью-Делі",
      country: "Індія",
      region: "Південна Азія // Технічний кластер",
      flag: "🇮🇳",
      code: "IN",
      lat: 28.6139,
      lon: 77.2090,
      hubType: "ПІВДЕННА АЗІЯ // ПРОМИСЛОВИЙ ПУЛ",
      targetWageUA: "від 600 €",
      targetWageUAH: "~26 500 ₴ / міс",
      homeWage: "~140 – 210 € / міс",
      homeWageUAH: "~6 000 – 9 200 ₴",
      wageMultiplier: "у 3.5 рази вище",
      wageRatioNumber: 3.5,
      visaTime: "35–45 робочих днів",
      securityCheck: "Консульська легалізація + Довідка несудимості",
      workSchedule: "Цехові позмінні графіки, точне слідування техкартам",
      culturalTraits: [
        "Англійська мова + російськомовні старші бригадири",
        "Висока технічна витримка при монотонній праці",
        "Суворе дотримання субординації та внутрішніх регламентів",
        "Миролюбний менталітет, нуль конфліктів у гуртожитках"
      ],
      economicAdvantage: "Ставка від 600 € забезпечує українському підприємству економію фонду оплати праці до 35–40% при найвищій мотивації кадрів працювати без вихідних.",
      flightCode: "AI-419",
      flightOrigin: "Делі (DEL)",
      satelliteImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "28°36'N 77°12'E",
      altitude: "216m",
      resolution: "0.5m/px GSD"
    },
    {
      id: "manila",
      name: "Маніла",
      country: "Філіппіни",
      region: "Південно-Східна Азія",
      flag: "🇵🇭",
      code: "PH",
      lat: 14.5995,
      lon: 120.9842,
      hubType: "ТОЧНЕ ВИРОБНИЦТВО & ШВЕЙНІ ЛІНІЇ",
      targetWageUA: "від 650 €",
      targetWageUAH: "~28 500 ₴ / міс",
      homeWage: "~160 – 240 € / міс",
      homeWageUAH: "~7 000 – 10 500 ₴",
      wageMultiplier: "у 3.0 рази вище",
      wageRatioNumber: 3.0,
      visaTime: "40–50 робочих днів",
      securityCheck: "Державна сертифікація DMW/POEA + Інтерпол",
      workSchedule: "Швидкісні конвеєрні та операційні лінії",
      culturalTraits: [
        "Вільне володіння англійською мовою (100%)",
        "Культура бездоганної чистоти робочого місця (5S стандарти)",
        "Еталонна акуратність: рівень браку менше 0.1%",
        "Природна привітність, акуратність та бездоганна гігієна"
      ],
      economicAdvantage: "Ідеальний вибір для легкої промисловості, швейних фабрик, упаковки та мікроелектроніки за стандартами провідних заводів ЄС та Японії.",
      flightCode: "PR-882",
      flightOrigin: "Маніла (MNL)",
      satelliteImage: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "14°35'N 120°58'E",
      altitude: "16m",
      resolution: "0.4m/px GSD"
    },
    {
      id: "dhaka",
      name: "Дакка",
      country: "Бангладеш",
      region: "Південна Азія // Будівництво",
      flag: "🇧🇩",
      code: "BD",
      lat: 23.8103,
      lon: 90.4125,
      hubType: "МАСОВИЙ БУДІВЕЛЬНО-МОНТАЖНИЙ ПУЛ",
      targetWageUA: "від 600 €",
      targetWageUAH: "~26 500 ₴ / міс",
      homeWage: "~110 – 160 € / міс",
      homeWageUAH: "~4 800 – 7 000 ₴",
      wageMultiplier: "у 4.0 рази вище",
      wageRatioNumber: 4.0,
      visaTime: "30–40 робочих днів",
      securityCheck: "Урядовий BMET реєстр + Сертифікат здоров'я",
      workSchedule: "Монолітні, фасадні та монтажні об'єкти",
      culturalTraits: [
        "Виняткова згуртованість: робота організованими бригадами",
        "Стійкість до важких фізичних навантажень та холоду",
        "Слухняність перед призначеним бригадиром",
        "Максимальна мотивація зберегти робоче місце в Європі"
      ],
      economicAdvantage: "Швидке комплектування великих будівельних та інфраструктурних об'єктів сформованими бригадами від 15 до 50 осіб із власними координаторами.",
      flightCode: "BG-504",
      flightOrigin: "Дакка (DAC)",
      satelliteImage: "https://images.unsplash.com/photo-1608659597669-b45511779f93?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "23°48'N 90°24'E",
      altitude: "12m",
      resolution: "0.5m/px GSD"
    },
    {
      id: "kathmandu",
      name: "Катманду",
      country: "Непал",
      region: "Гірський регіон Азії",
      flag: "🇳🇵",
      code: "NP",
      lat: 27.7172,
      lon: 85.3240,
      hubType: "ВАЖКІ ВИРОБНИЦТВА & КАР'ЄРИ",
      targetWageUA: "від 600 €",
      targetWageUAH: "~26 500 ₴ / міс",
      homeWage: "~120 – 170 € / міс",
      homeWageUAH: "~5 200 – 7 400 ₴",
      wageMultiplier: "у 3.8 рази вище",
      wageRatioNumber: 3.8,
      visaTime: "35–45 робочих днів",
      securityCheck: "Поліцейський департамент Непалу + Медогляд ВООЗ",
      workSchedule: "Фізично складні умови, відкриті майданчики",
      culturalTraits: [
        "Легендарна витривалість гірських народів",
        "Абсолютна чесність, довірливість та відданість роботі",
        "Повна відсутність внутрішньої або зовнішньої агресії",
        "Висока адаптивність до простих умов проживання"
      ],
      economicAdvantage: "Природна стресостійкість, абсолютна відсутність конфліктів, надійність у найсуворіших умовах кар'єрів, металургії та бетонування.",
      flightCode: "RA-218",
      flightOrigin: "Катманду (KTM)",
      satelliteImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "27°42'N 85°19'E",
      altitude: "1400m",
      resolution: "0.5m/px GSD"
    },
    {
      id: "chisinau",
      name: "Кишинів",
      country: "Молдова",
      region: "Східна Європа // Транзит",
      flag: "🇲🇩",
      code: "MD",
      lat: 47.0105,
      lon: 28.8638,
      hubType: "ТРАНЗИТНИЙ ЄВРОПЕЙСЬКИЙ ХАБ",
      targetWageUA: "від 950 €",
      targetWageUAH: "~41 500 ₴ / міс",
      homeWage: "~450 – 600 € / міс",
      homeWageUAH: "~19 500 – 26 000 ₴",
      wageMultiplier: "у 1.8 рази вище",
      wageRatioNumber: 1.8,
      visaTime: "Оперативний транзит (1–2 дні)",
      securityCheck: "Прикордонна служба України (ДПСУ) + ДЦЗ",
      workSchedule: "Сухопутний коридор безпечного трансферу",
      culturalTraits: [
        "Україно-румунське прикордонне сусідство",
        "Швидка логістика без авіасполучення",
        "Прямий автомобільний під'їзд до будь-якої області України"
      ],
      economicAdvantage: "Пряма доставка рекрутованих співробітників автобусами безпосередньо до гуртожитків замовника в Україні.",
      flightCode: "MD-CORRIDOR",
      flightOrigin: "Кишинів (KIV)",
      satelliteImage: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "47°00'N 28°51'E",
      altitude: "85m",
      resolution: "0.5m/px GSD"
    }
  ];
};

const getGlobeTranslations = (lang: "uk" | "ru" | "en") => {
  if (lang === "ru") {
    return {
      hudStatus: "МЕЖДУНАРОДНЫЕ ЛОГИСТИЧЕСКИЕ КОРИДОРЫ",
      hudSub: "РЕАЛЬНОЕ ВРЕМЯ // ПОСТАВКА КАДРОВ В УКРАИНУ",
      zoom: "МАСШТАБ",
      defaultTitle: "Глобальная сеть рекрутинга Recruiter I Club",
      defaultDesc: "Интерактивная гео-телеметрия поставок квалифицированного персонала. Нажмите на любой хаб для приближения и открытия детализированного досье с расчетом зарплат и видеоконтролем.",
      defaultStat1: "7 хабов",
      defaultStat1Label: "Прямые коридоры",
      defaultStat2: "100%",
      defaultStat2Label: "Защита от мобилизации (ст. 23)",
      defaultStat3: "0%",
      defaultStat3Label: "Текучесть кадров",
      reset: "Сброс обзора",
      wageTitle: "Сравнение заработных плат (нетто)",
      uaWageLabel: "Готовы работать в Украине:",
      homeWageLabel: "Средний доход на родине:",
      difference: "Разница доходов:",
      motivationNote: "Экономическая мотивация: высокая дисциплина и отсутствие текучести",
      culturalTitle: "Культурный менталитет и дисциплина:",
      timelineTitle: "Срок вывода на смену:",
      mobilizationTitle: "Воинский учет:",
      mobilizationImmunity: "100% Иммунитет (ст. 23 ЗУ)",
      calculateBtn: (name: string) => "Рассчитать бюджет на " + name,
      satelliteBadge: "СЪЕМКА ИЗ СПУТНИКА // SENTINEL-2",
      hint: "Вращайте глобус и нажимайте на страны",
      allHubs: "Все коридоры активны",
    };
  }
  if (lang === "en") {
    return {
      hudStatus: "INTERNATIONAL RECRUITMENT CORRIDORS",
      hudSub: "REAL-TIME TELEMETRY // UKRAINE PRODUCTION HUBS",
      zoom: "ZOOM",
      defaultTitle: "Global Direct Staffing Network",
      defaultDesc: "Interactive planetary telemetry of vetted workforce supply corridors. Click any country hub to focus with deep satellite telemetry, verified wage benchmarks, and compliance data.",
      defaultStat1: "7 Hubs",
      defaultStat1Label: "Direct pipelines",
      defaultStat2: "100%",
      defaultStat2Label: "Mobilization Immunity (Art. 23)",
      defaultStat3: "0%",
      defaultStat3Label: "Turnover Rate",
      reset: "Reset View",
      wageTitle: "Net Monthly Wage Benchmarking",
      uaWageLabel: "Target Wage in Ukraine:",
      homeWageLabel: "Domestic Baseline Income:",
      difference: "Income Multiplier:",
      motivationNote: "Economic motivation: zero absenteeism and high overtime willingness",
      culturalTitle: "Cultural Characteristics & Team Mentality:",
      timelineTitle: "Deployment Timeline:",
      mobilizationTitle: "Military Exemption:",
      mobilizationImmunity: "100% Immunity (Art. 23 Law of Ukraine)",
      calculateBtn: (name: string) => "Calculate Costs for " + name,
      satelliteBadge: "SATELLITE RECON // SENTINEL-2 OPTICS",
      hint: "Drag to rotate Earth, click hubs for deep zoom",
      allHubs: "All corridors operational",
    };
  }
  return {
    hudStatus: "МІЖНАРОДНІ ЛОГІСТИЧНІ КОРИДОРИ",
    hudSub: "РЕАЛЬНИЙ ЧАС // ПОСТАЧАННЯ КАДРІВ В УКРАЇНУ",
    zoom: "МАСШТАБ",
    defaultTitle: "Глобальна рекрутингова мережа Recruiter I Club",
    defaultDesc: "Інтерактивна гео-телеметрія постачання кваліфікованого персоналу на українські заводи. Клікніть на будь-який хаб для наближення та відкриття детального досьє з розрахунком зарплат.",
    defaultStat1: "7 хабів",
    defaultStat1Label: "Прямі коридори",
    defaultStat2: "100%",
    defaultStat2Label: "Захист від мобілізації (ст. 23)",
    defaultStat3: "0%",
    defaultStat3Label: "Плинність кадрів",
    reset: "Скинути огляд",
    wageTitle: "Порівняння заробітних плат (нетто)",
    uaWageLabel: "Готові працювати в Україні:",
    homeWageLabel: "Середній дохід на батьківщині:",
    difference: "Різниця доходу:",
    motivationNote: "Економічна мотивація: висока дисципліна та відсутність плинності",
    culturalTitle: "Культурний менталітет і дисципліна:",
    timelineTitle: "Строк виходу на зміну:",
    mobilizationTitle: "Військовий облік:",
    mobilizationImmunity: "100% Імунітет (ст. 23 ЗУ)",
    calculateBtn: (name: string) => "Розрахувати витрати на " + name,
    satelliteBadge: "СУПУТНИКОВИЙ ЗНІМОК // SENTINEL-2",
    hint: "Обертайте глобус і клікайте на хаби",
    allHubs: "Усі коридори активні",
  };
};

export const InteractiveGlobe3D: React.FC<InteractiveGlobe3DProps> = ({ locale = "uk" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeLang = (locale === "ru" ? "ru" : locale === "en" ? "en" : "uk") as "uk" | "ru" | "en";
  const countries = useMemo(() => getCountries(activeLang), [activeLang]);
  const t = useMemo(() => getGlobeTranslations(activeLang), [activeLang]);

  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoomDisplay, setZoomDisplay] = useState(100);

  // Active selected country
  const activeCountry = useMemo(() => {
    const id = selectedCityId || hoveredCityId;
    return countries.find(c => c.id === id) || null;
  }, [selectedCityId, hoveredCityId, countries]);

  // Keep persistent camera coordinates in mutable refs (NEVER trigger WebGL re-init!)
  const rotRef = useRef({ x: -0.38, y: 0.53 });
  const targetRotRef = useRef({ x: -0.38, y: 0.53 });
  const zoomRef = useRef(1.0);
  const targetZoomRef = useRef(1.0);

  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0.0006 });
  const isAutoRotatingRef = useRef(true);

  // Synchronize auto rotation
  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);

  // Luminous Workforce Supply Arcs connecting partner countries to Kyiv, Ukraine
  const arcs: WorkforceArc[] = useMemo(() => [
    { id: "a-uz", fromName: "Tashkent", fromCoords: [41.2995, 69.2401], toCoords: [50.4501, 30.5234], color: "rgba(234, 179, 8, 0.85)", speed: 0.00022, offset: 0.1, maxAltitude: 0.28 },
    { id: "a-in", fromName: "Delhi", fromCoords: [28.6139, 77.2090], toCoords: [50.4501, 30.5234], color: "rgba(245, 158, 11, 0.85)", speed: 0.00018, offset: 0.4, maxAltitude: 0.35 },
    { id: "a-ph", fromName: "Manila", fromCoords: [14.5995, 120.9842], toCoords: [50.4501, 30.5234], color: "rgba(226, 201, 160, 0.90)", speed: 0.00014, offset: 0.7, maxAltitude: 0.48 },
    { id: "a-bd", fromName: "Dhaka", fromCoords: [23.8103, 90.4125], toCoords: [50.4501, 30.5234], color: "rgba(234, 179, 8, 0.85)", speed: 0.00020, offset: 0.3, maxAltitude: 0.38 },
    { id: "a-np", fromName: "Kathmandu", fromCoords: [27.7172, 85.3240], toCoords: [50.4501, 30.5234], color: "rgba(245, 158, 11, 0.85)", speed: 0.00019, offset: 0.85, maxAltitude: 0.36 },
    { id: "a-md", fromName: "Chisinau", fromCoords: [47.0105, 28.8638], toCoords: [50.4501, 30.5234], color: "rgba(52, 211, 153, 0.85)", speed: 0.00030, offset: 0.5, maxAltitude: 0.12 },
  ], []);

  // Smooth camera glide to target country (ZERO JUMPING!)
  const focusCountry = (country: CountryDossier, zoomLevel = 2.2) => {
    targetZoomRef.current = zoomLevel;
    const targetY = country.lon * (Math.PI / 180);
    const targetX = Math.max(-0.62, Math.min(-0.18, -country.lat * (Math.PI / 180) * 0.65));
    targetRotRef.current = { x: targetX, y: targetY };
  };

  const handleCountryClick = (country: CountryDossier) => {
    playSciFiBeep(1100, 0.07);
    if (selectedCityId === country.id) {
      resetView();
    } else {
      setSelectedCityId(country.id);
      focusCountry(country, 2.2);
    }
  };

  const resetView = () => {
    playSciFiBeep(840, 0.06);
    setSelectedCityId(null);
    setHoveredCityId(null);
    targetZoomRef.current = 1.0;
    targetRotRef.current = { x: -0.38, y: 0.53 };
  };

  // MAIN WEBGL ENGINE: Initializes ONCE on mount! (NEVER rebuilds on click!)
  useEffect(() => {
    const canvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!canvas || !overlayCanvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true }) ||
               (canvas.getContext("experimental-webgl", { alpha: true, antialias: true }) as WebGLRenderingContext | null);
    const ctx = overlayCanvas.getContext("2d");

    if (!gl || !ctx) return;

    // WebGL Shaders
    const vsSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 vUv;

      uniform vec2 uResolution;
      uniform vec2 uRotation;
      uniform float uRadius;
      uniform float uZoom;
      uniform sampler2D uEarthTexture;
      uniform sampler2D uNightTexture;

      const float PI = 3.14159265359;

      void main() {
        vec2 st = (gl_FragCoord.xy - uResolution * 0.5);
        float radius = uRadius * uZoom;
        float d2 = dot(st, st);

        // Multi-layered Atmospheric Rayleigh scattering glow
        float outerAtmosphereRadius = radius * 1.045;
        if (d2 > outerAtmosphereRadius * outerAtmosphereRadius) {
          discard;
        }

        if (d2 > radius * radius) {
          float dist = sqrt(d2);
          float alpha = smoothstep(outerAtmosphereRadius, radius, dist);
          // Ethereal aerospace cyan-azure halo
          vec3 haloColor = vec3(0.20, 0.55, 0.95) * alpha * 0.55;
          gl_FragColor = vec4(haloColor, alpha * 0.40);
          return;
        }

        // 3D Sphere Surface Normal
        float z = sqrt(max(0.0, radius * radius - d2));
        vec3 normal = normalize(vec3(st.x, -st.y, z));

        // Spherical Euler Rotation (X: Pitch, Y: Yaw)
        vec3 p = normal;
        float cx = cos(uRotation.x);
        float sx = sin(uRotation.x);
        p = vec3(p.x, p.y * cx - p.z * sx, p.y * sx + p.z * cx);

        float cy = cos(uRotation.y);
        float sy = sin(uRotation.y);
        p = vec3(p.x * cy + p.z * sy, p.y, -p.x * sy + p.z * cy);

        // Spherical UV Mapping
        float lat = asin(clamp(p.y, -1.0, 1.0));
        float lon = atan(p.x, p.z);
        vec2 uv = vec2((lon + PI) / (2.0 * PI), (lat + PI * 0.5) / PI);

        // Sample NASA Day Texture (with embedded cartographic graticule)
        vec4 dayColor = texture2D(uEarthTexture, uv);

        // Sample NASA Night City Lights
        vec4 nightColor = texture2D(uNightTexture, uv);

        // Natural Angled Sun Direction
        vec3 sunDir = normalize(vec3(0.55, 0.40, 0.80));
        float NdotL = dot(normal, sunDir);

        // Day illumination
        float diffuse = clamp(NdotL * 0.85 + 0.35, 0.0, 1.0);

        // Night city lights on shaded hemisphere
        float nightFactor = smoothstep(0.18, -0.28, NdotL);
        vec3 cityLights = nightColor.rgb * vec3(1.35, 1.15, 0.82) * nightFactor * 1.85;

        // Ocean Specular Glint
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfVec = normalize(sunDir + viewDir);
        float specFactor = pow(max(0.0, dot(normal, halfVec)), 32.0);
        float isWater = smoothstep(0.32, 0.0, dayColor.r);
        vec3 specular = vec3(0.9, 0.95, 1.0) * specFactor * 0.35 * isWater * max(0.0, NdotL);

        // Thin Internal Rayleigh Atmospheric Limb
        float rim = pow(1.0 - normal.z, 3.5);
        vec3 rimGlow = vec3(0.25, 0.60, 0.95) * rim * 0.52;

        vec3 finalColor = (dayColor.rgb * diffuse) + cityLights + specular + rimGlow;
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const aPositionLoc = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uRotationLoc = gl.getUniformLocation(program, "uRotation");
    const uRadiusLoc = gl.getUniformLocation(program, "uRadius");
    const uZoomLoc = gl.getUniformLocation(program, "uZoom");
    const uEarthTextureLoc = gl.getUniformLocation(program, "uEarthTexture");
    const uNightTextureLoc = gl.getUniformLocation(program, "uNightTexture");

    // Texture 0: Earth Day Map + Precision Cartographic Graticule (Equator, Meridians, Parallels)
    const dayTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, dayTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([10, 20, 40, 255]));

    const earthImage = new Image();
    earthImage.crossOrigin = "anonymous";
    earthImage.src = "/earth-blue-marble.jpg";
    earthImage.onload = () => {
      const offCanvas = document.createElement("canvas");
      const tw = 2048;
      const th = 1024;
      offCanvas.width = tw;
      offCanvas.height = th;
      const offCtx = offCanvas.getContext("2d");

      if (offCtx) {
        // 1. Draw base NASA Blue Marble
        offCtx.drawImage(earthImage, 0, 0, tw, th);

        // 2. Bake Precision Astrolabe Graticule (Latitude Parallels & Longitude Meridians)
        offCtx.save();
        offCtx.strokeStyle = "rgba(226, 201, 160, 0.16)"; // Champagne gold
        offCtx.lineWidth = 1.0;

        // Longitude Meridians every 30 degrees
        for (let lon = -180; lon <= 180; lon += 30) {
          const x = ((lon + 180) / 360) * tw;
          offCtx.beginPath();
          offCtx.moveTo(x, 0);
          offCtx.lineTo(x, th);
          offCtx.stroke();
        }

        // Latitude Parallels every 15 degrees
        for (let lat = -75; lat <= 75; lat += 15) {
          const y = ((90 - lat) / 180) * th;
          offCtx.beginPath();
          offCtx.moveTo(0, y);
          offCtx.lineTo(tw, y);
          offCtx.stroke();
        }

        // Equator Line (Solid warm gold)
        const eqY = th * 0.5;
        offCtx.strokeStyle = "rgba(234, 179, 8, 0.45)";
        offCtx.lineWidth = 2.0;
        offCtx.beginPath();
        offCtx.moveTo(0, eqY);
        offCtx.lineTo(tw, eqY);
        offCtx.stroke();

        // Tropics of Cancer (+23.5°) and Capricorn (-23.5°)
        offCtx.setLineDash([4, 4]);
        offCtx.strokeStyle = "rgba(234, 179, 8, 0.28)";
        offCtx.lineWidth = 1.2;
        const cancerY = ((90 - 23.44) / 180) * th;
        const capricornY = ((90 + 23.44) / 180) * th;
        offCtx.beginPath();
        offCtx.moveTo(0, cancerY);
        offCtx.lineTo(tw, cancerY);
        offCtx.moveTo(0, capricornY);
        offCtx.lineTo(tw, capricornY);
        offCtx.stroke();

        offCtx.restore();

        // Upload baked texture to GPU
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, dayTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offCanvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      }
    };

    // Texture 1: NASA Night City Lights
    const nightTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, nightTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));

    const nightImage = new Image();
    nightImage.crossOrigin = "anonymous";
    nightImage.src = "/earth-night.jpg";
    nightImage.onload = () => {
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, nightTexture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, nightImage);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };

    // Resize Handler
    const resize = () => {
      if (!canvas || !overlayCanvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      overlayCanvas.width = rect.width * dpr;
      overlayCanvas.height = rect.height * dpr;

      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Coordinate Math Helpers
    const latLonTo3D = (latDeg: number, lonDeg: number) => {
      const lat = latDeg * (Math.PI / 180);
      const lon = lonDeg * (Math.PI / 180);
      return {
        x: Math.cos(lat) * Math.sin(lon),
        y: Math.sin(lat),
        z: Math.cos(lat) * Math.cos(lon)
      };
    };

    const rotatePoint = (pt: { x: number; y: number; z: number }, rotX: number, rotY: number) => {
      // Rotate Yaw (Y)
      const p1x = pt.x * Math.cos(rotY) - pt.z * Math.sin(rotY);
      const p1y = pt.y;
      const p1z = pt.x * Math.sin(rotY) + pt.z * Math.cos(rotY);

      // Rotate Pitch (X)
      const p2x = p1x;
      const p2y = p1y * Math.cos(rotX) + p1z * Math.sin(rotX);
      const p2z = -p1y * Math.sin(rotX) + p1z * Math.cos(rotX);

      return { x: p2x, y: p2y, z: p2z };
    };

    let animId: number;
    let startTime = performance.now();

    // MAIN CONTINUOUS RENDER LOOP (60 FPS BUTTERY SMOOTH LERP)
    const render = () => {
      const now = performance.now();
      const elapsed = now - startTime;

      // 1. Camera Zoom Smooth Easing
      zoomRef.current += (targetZoomRef.current - zoomRef.current) * 0.065;
      setZoomDisplay(Math.round(zoomRef.current * 100));

      // 2. Camera Rotation Smooth Easing
      if (isDraggingRef.current) {
        targetRotRef.current.x = rotRef.current.x;
        targetRotRef.current.y = rotRef.current.y;
      } else {
        if (targetRotRef.current !== rotRef.current) {
          rotRef.current.x += (targetRotRef.current.x - rotRef.current.x) * 0.065;
          
          let diffY = (targetRotRef.current.y - rotRef.current.y) % (2 * Math.PI);
          if (diffY > Math.PI) diffY -= 2 * Math.PI;
          if (diffY < -Math.PI) diffY += 2 * Math.PI;
          rotRef.current.y += diffY * 0.065;
        }

        if (isAutoRotatingRef.current && targetRotRef.current === rotRef.current) {
          rotRef.current.y += velocityRef.current.y;
          velocityRef.current.y = velocityRef.current.y * 0.97 + 0.00045 * 0.03;
          targetRotRef.current.y = rotRef.current.y;
        }
      }

      // 3. WebGL Draw Call
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const baseRadius = Math.min(rect.width, rect.height) * 0.38 * dpr;

      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uRotationLoc, rotRef.current.x, rotRef.current.y);
      gl.uniform1f(uRadiusLoc, baseRadius);
      gl.uniform1f(uZoomLoc, zoomRef.current);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, dayTexture);
      gl.uniform1i(uEarthTextureLoc, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, nightTexture);
      gl.uniform1i(uNightTextureLoc, 1);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // 4. OVERLAY CANVAS: Luminous 3D Bezier Arcs + Astrolabe Ring + World Cities
      ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

      const cx = overlayCanvas.width * 0.5;
      const cy = overlayCanvas.height * 0.5;
      const currentRadius = baseRadius * zoomRef.current;
      const rotX = rotRef.current.x;
      const rotY = rotRef.current.y;

      // A. Astrolabe Horizon Ring with Degree Markings
      ctx.save();
      const ringRadius = currentRadius * 1.055;
      ctx.strokeStyle = "rgba(226, 201, 160, 0.22)";
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Degree tick marks on the ring (every 15°)
      for (let deg = 0; deg < 360; deg += 15) {
        const rad = (deg * Math.PI) / 180;
        const isMajor = deg % 45 === 0;
        const len = isMajor ? 6.0 * dpr : 3.0 * dpr;

        const x1 = cx + Math.cos(rad) * ringRadius;
        const y1 = cy + Math.sin(rad) * ringRadius;
        const x2 = cx + Math.cos(rad) * (ringRadius + len);
        const y2 = cy + Math.sin(rad) * (ringRadius + len);

        ctx.strokeStyle = isMajor ? "rgba(234, 179, 8, 0.55)" : "rgba(226, 201, 160, 0.20)";
        ctx.lineWidth = isMajor ? 1.5 : 1.0;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        if (isMajor && dpr > 1) {
          ctx.font = `bold ${Math.round(8 * dpr)}px monospace`;
          ctx.fillStyle = "rgba(226, 201, 160, 0.65)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const tx = cx + Math.cos(rad) * (ringRadius + len + 8 * dpr);
          const ty = cy + Math.sin(rad) * (ringRadius + len + 8 * dpr);
          ctx.fillText(`${deg}°`, tx, ty);
        }
      }
      ctx.restore();

      // B. World Cities Network Dots (populates the globe so it's NEVER empty!)
      WORLD_CITIES.forEach((city) => {
        const v3 = latLonTo3D(city.lat, city.lon);
        const rp = rotatePoint(v3, rotX, rotY);

        if (rp.z > 0.12) {
          const sx = cx + rp.x * currentRadius;
          const sy = cy - rp.y * currentRadius;
          const alpha = Math.min(1.0, (rp.z - 0.12) / 0.35);

          ctx.save();
          if (city.isPartner) {
            // Golden pulse ring for active partner hubs
            ctx.fillStyle = `rgba(234, 179, 8, ${alpha * 0.95})`;
            ctx.shadowColor = "rgba(234, 179, 8, 0.8)";
            ctx.shadowBlur = 8 * dpr;
            ctx.beginPath();
            ctx.arc(sx, sy, 3.2 * dpr, 0, Math.PI * 2);
            ctx.fill();

            // Label for partner hub
            ctx.font = `bold ${Math.round(9 * dpr)}px "Segoe UI", sans-serif`;
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
            ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
            ctx.shadowBlur = 4 * dpr;
            ctx.textAlign = "center";
            ctx.fillText(city.name, sx, sy - 6 * dpr);
          } else {
            // Subtle amber pin for global civilization hubs
            ctx.fillStyle = `rgba(226, 201, 160, ${alpha * 0.45})`;
            ctx.beginPath();
            ctx.arc(sx, sy, 1.4 * dpr, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      });

      // C. Luminous 3D Parabolic Workforce Arcs (Stripe / GitHub luxury standard!)
      arcs.forEach((arc) => {
        const vStart = latLonTo3D(arc.fromCoords[0], arc.fromCoords[1]);
        const vEnd = latLonTo3D(arc.toCoords[0], arc.toCoords[1]);

        // Spherical great-circle angle
        const dot = Math.max(-1, Math.min(1, vStart.x * vEnd.x + vStart.y * vEnd.y + vStart.z * vEnd.z));
        const omega = Math.acos(dot);
        const sinOmega = Math.sin(omega) || 1;

        const numSegments = 40;
        const screenPoints: { x: number; y: number; z: number }[] = [];

        for (let i = 0; i <= numSegments; i++) {
          const t = i / numSegments;
          const s1 = Math.sin((1 - t) * omega) / sinOmega;
          const s2 = Math.sin(t * omega) / sinOmega;

          // Spherical interpolation
          const vx = s1 * vStart.x + s2 * vEnd.x;
          const vy = s1 * vStart.y + s2 * vEnd.y;
          const vz = s1 * vStart.z + s2 * vEnd.z;

          // Parabolic orbital lift above Earth surface
          const altitude = 1.0 + Math.sin(t * Math.PI) * arc.maxAltitude;
          const p3 = { x: vx * altitude, y: vy * altitude, z: vz * altitude };

          const rp = rotatePoint(p3, rotX, rotY);
          screenPoints.push({
            x: cx + rp.x * currentRadius,
            y: cy - rp.y * currentRadius,
            z: rp.z
          });
        }

        // Draw the luminous arc path
        ctx.save();
        ctx.lineWidth = 1.6 * dpr;
        ctx.strokeStyle = arc.color;
        ctx.shadowColor = "rgba(234, 179, 8, 0.6)";
        ctx.shadowBlur = 6 * dpr;

        ctx.beginPath();
        let isDrawing = false;

        for (let i = 0; i < screenPoints.length - 1; i++) {
          const pCurrent = screenPoints[i];
          const pNext = screenPoints[i + 1];

          // Render only if facing front
          if (pCurrent.z > 0.05 && pNext.z > 0.05) {
            if (!isDrawing) {
              ctx.moveTo(pCurrent.x, pCurrent.y);
              isDrawing = true;
            }
            ctx.lineTo(pNext.x, pNext.y);
          } else {
            isDrawing = false;
          }
        }
        ctx.stroke();

        // Animated Golden Photon Pulse streaming along the arc toward Kyiv!
        const pulseProgress = (elapsed * arc.speed + arc.offset) % 1.0;
        const pulseIdx = Math.min(numSegments - 1, Math.floor(pulseProgress * numSegments));
        const pulsePt = screenPoints[pulseIdx];

        if (pulsePt && pulsePt.z > 0.05) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#fde047";
          ctx.shadowBlur = 10 * dpr;
          ctx.beginPath();
          ctx.arc(pulsePt.x, pulsePt.y, 3.2 * dpr, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []); // Run ONCE on mount! NEVER re-render WebGL on country selection!

  // Natural Polar Drag Controls
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;

    rotRef.current.y -= dx * 0.005;
    rotRef.current.x -= dy * 0.003;
    rotRef.current.x = Math.max(-0.65, Math.min(-0.15, rotRef.current.x));

    velocityRef.current = { x: dy * 0.0004, y: -dx * 0.0015 };
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMouseRef.current.x;
    const dy = e.touches[0].clientY - lastMouseRef.current.y;

    rotRef.current.y -= dx * 0.005;
    rotRef.current.x -= dy * 0.003;
    rotRef.current.x = Math.max(-0.65, Math.min(-0.15, rotRef.current.x));

    lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      
      {/* SOLID TWO-COLUMN STAGE: Globe on Left, Fixed Height Console on Right (ZERO JUMPING!) */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-center">
        
        {/* 3D Masterpiece Globe Stage (7 Columns on Wide Desktop) */}
        <div className="xl:col-span-7 flex flex-col items-center justify-center relative">
          
          {/* Visual Container */}
          <div className="relative w-full max-w-[460px] sm:max-w-[500px] aspect-square flex items-center justify-center touch-none">
            
            {/* 1. Photorealistic WebGL Earth Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing block"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />

            {/* 2. 2D High-precision Overlay Canvas (Arcs, Graticule Ticks & Cities) */}
            <canvas
              ref={overlayCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* Top Telemetry Header HUD */}
            <div className="absolute top-2.5 left-3 right-3 pointer-events-none flex items-center justify-between text-[10px] font-mono text-slate-400 z-10">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950/85 border border-[#e2c9a0]/30 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-white font-bold tracking-wider">
                  {activeCountry ? activeCountry.code + " // " + activeCountry.name.toUpperCase() : t.hudStatus}
                </span>
              </div>

              <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-950/85 border border-[#e2c9a0]/30 backdrop-blur-md shadow-lg">
                <span className="text-slate-400">{t.zoom}:</span>
                <span className="text-amber-300 font-bold">{zoomDisplay}%</span>
              </div>
            </div>

            {/* Bottom Horizon Astrolabe Bar */}
            <div className="absolute bottom-2 left-3 right-3 pointer-events-none flex items-center justify-between text-[9px] font-mono text-slate-400 z-10">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950/80 border border-white/10 backdrop-blur-md">
                <Globe2 className="w-3 h-3 text-amber-400" />
                <span>LAT 50.45°N // LON 30.52°E</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950/80 border border-white/10 backdrop-blur-md text-emerald-400">
                <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>{t.allHubs}</span>
              </div>
            </div>
          </div>

          {/* Quick Hub Selector Pills beneath Globe */}
          <div className="w-full max-w-lg mt-4 px-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar justify-start sm:justify-center">
              {countries.map((country) => {
                const isSelected = selectedCityId === country.id;
                return (
                  <button
                    key={country.id}
                    onClick={() => handleCountryClick(country)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                      isSelected
                        ? "bg-amber-500/25 border-amber-400 text-amber-300 font-bold shadow-gold-glow scale-105"
                        : country.isMainHub
                        ? "bg-slate-900/85 border-amber-500/40 text-amber-200/90 hover:bg-slate-800"
                        : "bg-slate-900/70 border-white/10 text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <span>{country.flag}</span>
                    <span className="font-semibold">{country.name}</span>
                    <span className="text-[10px] text-[#e2c9a0]/80">
                      {country.isMainHub ? "UA" : country.targetWageUA.replace(" / міс", "").replace(" / мес", "").replace(" / mo", "")}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Utility Controls Bar */}
            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playSciFiBeep(880, 0.05);
                    setIsAutoRotating(!isAutoRotating);
                  }}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-900/80 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
                >
                  {isAutoRotating ? (
                    <>
                      <Pause className="w-3 h-3 text-amber-400" />
                      <span>Пауза</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-emerald-400" />
                      <span>Обертання</span>
                    </>
                  )}
                </button>

                <button
                  onClick={resetView}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-900/80 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3 h-3 text-[#e2c9a0]" />
                  <span>{t.reset}</span>
                </button>
              </div>

              <span className="hidden sm:inline text-slate-400">{t.hint}</span>
            </div>
          </div>
        </div>

        {/* B2B Country Intelligence Dossier (5 Columns on Desktop, Fixed Height to PREVENT ANY JUMPING!) */}
        <div className="xl:col-span-5 w-full flex flex-col justify-center">
          <div className="w-full min-h-[520px] rounded-2xl bg-slate-950/90 border border-[#e2c9a0]/40 p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between transition-all">
            
            {activeCountry ? (
              /* ACTIVE COUNTRY INTEL */
              <div className="flex flex-col h-full justify-between space-y-3">
                {/* Header with Hub Type & Reset */}
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] font-mono">
                    <span className="text-[#e2c9a0] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {activeCountry.hubType}
                    </span>
                    <button
                      onClick={resetView}
                      className="text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Title & Flight Origin */}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="text-xl font-black text-white flex items-center gap-2">
                      <span className="text-2xl">{activeCountry.flag}</span>
                      <span>{activeCountry.name}, {activeCountry.country}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300 font-bold">
                      {activeCountry.flightCode}
                    </span>
                  </div>
                </div>

                {/* SATELLITE RECONNAISSANCE WINDOW */}
                <div className="relative rounded-xl overflow-hidden border border-[#e2c9a0]/30 aspect-[16/7] shadow-inner group">
                  <img
                    src={activeCountry.satelliteImage}
                    alt={activeCountry.country}
                    className="w-full h-full object-cover brightness-[0.85] contrast-110 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Recon HUD Tag */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950/85 border border-amber-400/40 text-[8px] font-mono text-amber-300 font-bold backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>{t.satelliteBadge}</span>
                  </div>

                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-slate-950/85 border border-white/10 text-[8px] font-mono text-slate-300 backdrop-blur-md">
                    {activeCountry.resolution}
                  </div>

                  {/* Crosshair Optics */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                    <div className="w-8 h-8 border border-[#e2c9a0] rounded-full" />
                    <div className="absolute w-12 h-[1px] bg-[#e2c9a0]" />
                    <div className="absolute h-12 w-[1px] bg-[#e2c9a0]" />
                  </div>

                  {/* Bottom Telemetry Bar */}
                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[8px] font-mono text-slate-300 pointer-events-none">
                    <span className="text-amber-200/90 font-bold">{activeCountry.satelliteCoords}</span>
                    <span className="text-[#e2c9a0]">ALT: {activeCountry.altitude}</span>
                  </div>
                </div>

                {/* WAGE BENCHMARK VISUAL COMPARISON BOX */}
                <div className="p-3 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-[#e2c9a0]/30">
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-[9px] font-mono uppercase text-[#e2c9a0]">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Banknote className="w-3.5 h-3.5 text-amber-400" />
                      {t.wageTitle}
                    </span>
                    <span className="text-emerald-400 font-bold">{activeCountry.wageMultiplier}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {/* UA Target Wage */}
                    <div className="text-left">
                      <div className="text-[9px] text-slate-400 font-mono">{t.uaWageLabel}</div>
                      <div className="text-lg font-black text-amber-400 tracking-tight mt-0.5">
                        {activeCountry.targetWageUA}
                      </div>
                      <div className="text-[9px] text-amber-300/80 font-mono">
                        {activeCountry.targetWageUAH}
                      </div>
                    </div>

                    {/* Home Country Wage */}
                    <div className="text-left border-l border-white/10 pl-2">
                      <div className="text-[9px] text-slate-400 font-mono">{t.homeWageLabel}</div>
                      <div className="text-base font-bold text-slate-400 tracking-tight mt-0.5 line-through decoration-red-400/50">
                        {activeCountry.homeWage}
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono">
                        {activeCountry.homeWageUAH}
                      </div>
                    </div>
                  </div>

                  {/* Relative Visual Comparison Progress Bar */}
                  <div className="mt-2 pt-1.5 border-t border-white/5">
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-1">
                      <span>{t.difference}</span>
                      <span className="text-emerald-400 font-bold">{activeCountry.wageMultiplier}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                      <div
                        className="bg-amber-400 h-full rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                        style={{ width: `${Math.min(100, activeCountry.wageRatioNumber * 25)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* CULTURAL PROFILE & WORK ETHIC */}
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-[10px]">
                  <div className="font-mono text-[#e2c9a0] uppercase font-bold flex items-center gap-1.5 mb-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.culturalTitle}</span>
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    {activeCountry.culturalTraits.map((trait, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                        <span>{trait}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* VISA & LEGAL REQUISITES */}
                <div className="grid grid-cols-2 gap-2 text-[9px] font-mono pt-1">
                  <div className="p-1.5 rounded bg-white/5 border border-white/5">
                    <div className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{t.timelineTitle}</span>
                    </div>
                    <div className="text-white font-bold mt-0.5">{activeCountry.visaTime}</div>
                  </div>

                  <div className="p-1.5 rounded bg-white/5 border border-white/5">
                    <div className="text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{t.mobilizationTitle}</span>
                    </div>
                    <div className="text-emerald-400 font-bold mt-0.5">{t.mobilizationImmunity}</div>
                  </div>
                </div>

                {/* CTA Action Button */}
                <div className="pt-2 border-t border-white/10">
                  <a
                    href="#calculator"
                    onClick={() => playSciFiBeep(1200, 0.08)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-black font-extrabold text-xs hover:brightness-110 shadow-gold-glow transition-all active:scale-95"
                  >
                    <span>{t.calculateBtn(activeCountry.name)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              /* DEFAULT HIGH-IMPACT OVERVIEW (SAME EXACT HEIGHT, ZERO SHIFT!) */
              <div className="flex flex-col h-full justify-between py-2 text-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] mb-3">
                    <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
                    <span>{t.hudSub}</span>
                  </div>

                  <h3 className="text-lg font-black text-white tracking-tight leading-snug">
                    {t.defaultTitle}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed max-w-sm mx-auto">
                    {t.defaultDesc}
                  </p>
                </div>

                {/* 3 Metric Stat Bento Callouts */}
                <div className="grid grid-cols-3 gap-2 my-4 text-left">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10">
                    <div className="text-amber-400 font-black text-base font-mono">{t.defaultStat1}</div>
                    <div className="text-[9px] text-slate-400 leading-tight mt-0.5">{t.defaultStat1Label}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-500/30">
                    <div className="text-emerald-400 font-black text-base font-mono">{t.defaultStat2}</div>
                    <div className="text-[9px] text-slate-400 leading-tight mt-0.5">{t.defaultStat2Label}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10">
                    <div className="text-cyan-400 font-black text-base font-mono">{t.defaultStat3}</div>
                    <div className="text-[9px] text-slate-400 leading-tight mt-0.5">{t.defaultStat3Label}</div>
                  </div>
                </div>

                {/* Direct Action Prompt */}
                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 text-xs text-slate-300 flex items-center justify-between">
                  <span className="text-[11px]">Оберіть країну на глобусі:</span>
                  <div className="flex items-center gap-1.5">
                    {countries.slice(1, 5).map(c => (
                      <button
                        key={c.id}
                        onClick={() => handleCountryClick(c)}
                        className="p-1 rounded bg-white/10 hover:bg-amber-500 hover:text-black transition-all text-sm"
                        title={c.name}
                      >
                        {c.flag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary CTA button */}
                <a
                  href="#calculator"
                  onClick={() => playSciFiBeep(1200, 0.08)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-black font-extrabold text-xs hover:brightness-110 shadow-gold-glow transition-all active:scale-95"
                >
                  <span>Розрахувати вартість найму персоналу</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
