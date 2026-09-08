"use client";

import React, { useEffect, useRef, useState } from "react";
import { 
  RotateCcw, 
  Play, 
  Pause, 
  ZoomOut, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Plane,
  Sparkles,
  Banknote,
  HeartHandshake,
  CheckCircle2,
  Scan,
  Compass
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

interface FlightRoute {
  id: string;
  code: string;
  fromName: string;
  origin: [number, number];
  speed: number;
  offset: number;
}

export interface InteractiveGlobe3DProps {
  locale?: string;
}

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
        visaTime: "0 дней (Оформление на месте)",
        securityCheck: "100% ОТК / Защита от штрафов Гоструда",
        workSchedule: "Штатное расписание предприятия, официальное бронирование",
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
        visaTime: "25–35 рабочих дней",
        securityCheck: "МВД + Интерпол + Биометрический скрининг",
        workSchedule: "Готовность к сменам 10–12 часов, 6 дней/нед",
        culturalTraits: [
          "Полное отсутствие языкового барьера (свободный русский/понимание)",
          "Сухой закон: нулевой алкогольный фактор на сменах и в общежитиях",
          "Традиционная трудовая этика: безоговорочное уважение к мастеру",
          "Высокая семейная ответственность (отправляют доход семье)"
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
      visaTime: "25–35 робочих днів",
      securityCheck: "МВС + Інтерпол + Біометричний скринінг",
      workSchedule: "Готовність до 10–12 год змін, 6 днів/тиж",
      culturalTraits: [
        "Відсутність мовного бар'єру (вільне розуміння)",
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

const getCountryInscriptions = (lang: "uk" | "ru" | "en") => {
  if (lang === "ru") {
    return [
      { country: "УКРАИНА", city: "Киев ★", lat: 48.8, lon: 32.2, size: 21, isGold: true },
      { country: "УЗБЕКИСТАН", city: "Ташкент •", lat: 41.5, lon: 64.5, size: 16, isGold: false },
      { country: "ИНДИЯ", city: "Нью-Дели •", lat: 22.0, lon: 78.5, size: 21, isGold: false },
      { country: "ФИЛИППИНЫ", city: "Манила •", lat: 13.0, lon: 122.5, size: 14, isGold: false },
      { country: "БАНГЛАДЕШ", city: "Дакка •", lat: 24.2, lon: 90.0, size: 13, isGold: false },
      { country: "НЕПАЛ", city: "Катманду •", lat: 28.5, lon: 84.0, size: 13, isGold: false },
      { country: "МОЛДОВА", city: "", lat: 46.8, lon: 28.5, size: 10, isGold: false },
    ];
  }
  if (lang === "en") {
    return [
      { country: "UKRAINE", city: "Kyiv ★", lat: 48.8, lon: 32.2, size: 21, isGold: true },
      { country: "UZBEKISTAN", city: "Tashkent •", lat: 41.5, lon: 64.5, size: 16, isGold: false },
      { country: "INDIA", city: "New Delhi •", lat: 22.0, lon: 78.5, size: 21, isGold: false },
      { country: "PHILIPPINES", city: "Manila •", lat: 13.0, lon: 122.5, size: 14, isGold: false },
      { country: "BANGLADESH", city: "Dhaka •", lat: 24.2, lon: 90.0, size: 13, isGold: false },
      { country: "NEPAL", city: "Kathmandu •", lat: 28.5, lon: 84.0, size: 13, isGold: false },
      { country: "MOLDOVA", city: "", lat: 46.8, lon: 28.5, size: 10, isGold: false },
    ];
  }
  return [
    { country: "УКРАЇНА", city: "Київ ★", lat: 48.8, lon: 32.2, size: 21, isGold: true },
    { country: "УЗБЕКИСТАН", city: "Ташкент •", lat: 41.5, lon: 64.5, size: 16, isGold: false },
    { country: "ІНДІЯ", city: "Нью-Делі •", lat: 22.0, lon: 78.5, size: 21, isGold: false },
    { country: "ФІЛІППІНИ", city: "Маніла •", lat: 13.0, lon: 122.5, size: 14, isGold: false },
    { country: "БАНГЛАДЕШ", city: "Дакка •", lat: 24.2, lon: 90.0, size: 13, isGold: false },
    { country: "НЕПАЛ", city: "Катманду •", lat: 28.5, lon: 84.0, size: 13, isGold: false },
    { country: "МОЛДОВА", city: "", lat: 46.8, lon: 28.5, size: 10, isGold: false },
  ];
};

const getGlobeTranslations = (lang: "uk" | "ru" | "en") => {
  if (lang === "ru") {
    return {
      satelliteMonitoring: "СПУТНИКОВЫЙ МОНИТОРИНГ",
      satellitePrefix: "СПУТНИК",
      zoom: "МАСШТАБ",
      activeFlights: "✈️ Активные регулярные рейсы в Украину",
      defaultTitle: "Выберите страну на 3D-глобусе",
      defaultDesc: "Кликните на любую страну или самолет на карте. Глобус приблизится с высокой детализацией, а здесь откроется спутниковый снимок, уровень зарплат и преимущества.",
      reset: "✕ Сброс",
      wageComparison: "Уровень заработных плат (нетто)",
      readyToWork: "Готовы работать в UA:",
      homeIncome: "Доход на родине:",
      staffMotivation: "Мотивация персонала:",
      motivationBenefit: "Высокая дисциплина / 0% текучести",
      culturalMentality: "Культурные особенности и менталитет:",
      visaLeadTime: "Срок визы D-04:",
      mobilization: "Мобилизация:",
      mobilizationImmunity: "100% Иммунитет (ст. 23)",
      calcButton: (name: string) => "Рассчитать затраты на " + name,
      satelliteReconBadge: "СЪЕМКА ИЗ СПУТНИКА // SENTINEL-2 OPTICS",
      pause: "Пауза",
      rotate: "Вращение",
      earthOverview: "Обзор Земли (100%)",
      hint: "💡 Кликните на страну для спутникового приближения",
      hub: "Хаб",
    };
  }
  if (lang === "en") {
    return {
      satelliteMonitoring: "SATELLITE RECONNAISSANCE",
      satellitePrefix: "SATELLITE",
      zoom: "ZOOM",
      activeFlights: "✈️ Active scheduled flights to Ukraine",
      defaultTitle: "Select a country on the 3D globe",
      defaultDesc: "Click on any country or airliner on the map. The globe zooms in with high satellite precision, displaying aerial imagery, wage benchmarks, and cultural benefits.",
      reset: "✕ Reset",
      wageComparison: "Net Wage Benchmark",
      readyToWork: "Ready to work in UA:",
      homeIncome: "Domestic income:",
      staffMotivation: "Staff Motivation:",
      motivationBenefit: "High discipline / 0% turnover",
      culturalMentality: "Cultural Characteristics & Mentality:",
      visaLeadTime: "Visa D-04 timeline:",
      mobilization: "Mobilization:",
      mobilizationImmunity: "100% Immunity (Art. 23)",
      calcButton: (name: string) => "Calculate costs for " + name,
      satelliteReconBadge: "SATELLITE RECON // SENTINEL-2 OPTICS",
      pause: "Pause",
      rotate: "Rotate",
      earthOverview: "Earth Overview (100%)",
      hint: "💡 Click on a country for deep satellite zoom",
      hub: "Hub",
    };
  }
  return {
    satelliteMonitoring: "СУПУТНИКОВИЙ МОНІТОРИНГ",
    satellitePrefix: "СУПУТНИК",
    zoom: "МАСШТАБ",
    activeFlights: "✈️ Активні регулярні рейси в Україну",
    defaultTitle: "Оберіть країну на 3D-глобусі",
    defaultDesc: "Клікніть на будь-яку країну або літак на карті. Глобус наблизиться з високою деталізацією, а тут відкриється супутниковий знімок, рівень зарплат та переваги.",
    reset: "✕ Скинути",
    wageComparison: "Рівень заробітних плат (нетто)",
    readyToWork: "Готові працювати в UA:",
    homeIncome: "Дохід на батьківщині:",
    staffMotivation: "Мотивація персоналу:",
    motivationBenefit: "Висока дисципліна / 0% плинності",
    culturalMentality: "Культурні особливості та менталітет:",
    visaLeadTime: "Строк візи D-04:",
    mobilization: "Мобілізація:",
    mobilizationImmunity: "100% Імунітет (ст. 23)",
    calcButton: (name: string) => "Розрахувати витрати на " + name,
    satelliteReconBadge: "СУПУТНИКОВИЙ ЗНІМОК // SENTINEL-2 OPTICS",
    pause: "Пауза",
    rotate: "Обертання",
    earthOverview: "Огляд Землі (100%)",
    hint: "💡 Клікніть на країну для супутникового наближення",
    hub: "Хаб",
  };
};

export const InteractiveGlobe3D: React.FC<InteractiveGlobe3DProps> = ({ locale = "uk" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeLang = (locale === "ru" ? "ru" : locale === "en" ? "en" : "uk") as "uk" | "ru" | "en";
  const countries = getCountries(activeLang);
  const t = getGlobeTranslations(activeLang);

  const [selectedCity, setSelectedCity] = useState<CountryDossier | null>(null);
  const [hoveredCity, setHoveredCity] = useState<CountryDossier | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [currentZoomState, setCurrentZoomState] = useState(1.0);

  // Dynamic Camera & Target References
  const rotRef = useRef({ x: -0.38, y: 0.53 });
  const targetRotRef = useRef({ x: -0.38, y: 0.53 });
  const zoomRef = useRef(1.0);
  const targetZoomRef = useRef(1.0);

  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0.0006 });
  const isAutoRotatingRef = useRef(true);

  // Synchronize rotation ref
  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);

  // Synchronize selected country when locale changes
  useEffect(() => {
    if (selectedCity) {
      const updated = countries.find(c => c.id === selectedCity.id);
      if (updated) setSelectedCity(updated);
    }
  }, [locale]);

  // Orbital Flight Routes heading to Kyiv (UA)
  const flightRoutes: FlightRoute[] = [
    { id: "f1", code: "HY-731", fromName: "Ташкент", origin: [41.2995, 69.2401], speed: 0.00012, offset: 0.15 },
    { id: "f2", code: "AI-419", fromName: "Делі", origin: [28.6139, 77.2090], speed: 0.00010, offset: 0.45 },
    { id: "f3", code: "PR-882", fromName: "Маніла", origin: [14.5995, 120.9842], speed: 0.00008, offset: 0.70 },
    { id: "f4", code: "BG-504", fromName: "Дакка", origin: [23.8103, 90.4125], speed: 0.00011, offset: 0.30 },
    { id: "f5", code: "RA-218", fromName: "Катманду", origin: [27.7172, 85.3240], speed: 0.00010, offset: 0.85 },
  ];

  // Realistic Cartographic Borders: Muted Warm Sand/Parchment
  const countryPolygons: { name: string; stroke: string; fill: string; width: number; points: [number, number][] }[] = [
    {
      name: "Україна",
      stroke: "rgba(234, 179, 8, 0.95)",
      fill: "rgba(234, 179, 8, 0.16)",
      width: 3.8,
      points: [
        [52.38, 33.19], [52.10, 34.20], [51.50, 34.80], [50.80, 35.30],
        [50.10, 36.50], [49.80, 38.00], [49.25, 40.23], [48.60, 39.80],
        [47.80, 39.20], [47.10, 38.20], [46.80, 36.80], [46.10, 35.00],
        [45.40, 36.50], [44.90, 36.40], [44.40, 34.00], [44.38, 33.74],
        [45.20, 33.00], [45.80, 33.50], [46.30, 31.80], [46.60, 30.80],
        [45.40, 29.80], [45.30, 28.20], [46.20, 28.50], [47.80, 27.20],
        [48.20, 26.50], [47.90, 25.00], [48.00, 24.20], [48.43, 22.14],
        [49.00, 22.50], [49.80, 23.00], [50.40, 24.10], [51.50, 23.80],
        [51.90, 25.50], [51.70, 27.50], [52.10, 30.50], [52.38, 33.19]
      ]
    },
    {
      name: "Узбекистан",
      stroke: "rgba(226, 201, 160, 0.90)",
      fill: "rgba(226, 201, 160, 0.13)",
      width: 2.2,
      points: [
        [45.0, 56.0], [45.6, 58.5], [44.9, 61.5], [42.0, 63.0],
        [41.0, 66.0], [41.3, 69.2], [41.0, 71.5], [40.5, 73.0],
        [40.0, 71.5], [39.0, 68.0], [37.2, 67.3], [37.5, 65.5],
        [38.5, 63.5], [40.0, 62.0], [41.5, 60.5], [41.2, 56.0], [45.0, 56.0]
      ]
    },
    {
      name: "Індія",
      stroke: "rgba(226, 201, 160, 0.90)",
      fill: "rgba(226, 201, 160, 0.13)",
      width: 2.2,
      points: [
        [35.5, 74.8], [34.5, 77.5], [31.5, 79.0], [30.0, 81.0],
        [27.0, 88.0], [27.5, 92.0], [28.0, 97.0], [24.0, 95.0],
        [22.0, 89.0], [21.5, 87.0], [17.5, 83.0], [13.0, 80.2],
        [10.0, 79.8], [8.1, 77.5], [10.0, 75.8], [15.0, 73.8],
        [19.0, 72.8], [23.0, 68.5], [24.5, 71.0], [28.0, 70.0],
        [31.0, 74.5], [35.5, 74.8]
      ]
    },
    {
      name: "Філіппіни",
      stroke: "rgba(226, 201, 160, 0.90)",
      fill: "rgba(226, 201, 160, 0.13)",
      width: 2.0,
      points: [
        [18.5, 121.0], [18.0, 122.5], [16.0, 122.5], [14.0, 124.2],
        [12.5, 125.5], [9.5, 126.2], [6.0, 126.0], [5.5, 125.0],
        [7.0, 122.0], [9.0, 123.0], [10.5, 122.5], [12.0, 120.0],
        [14.5, 120.5], [16.5, 119.8], [18.5, 121.0]
      ]
    },
    {
      name: "Бангладеш",
      stroke: "rgba(226, 201, 160, 0.90)",
      fill: "rgba(226, 201, 160, 0.13)",
      width: 2.0,
      points: [
        [26.5, 88.5], [26.0, 89.8], [25.2, 92.0], [23.8, 92.5],
        [21.5, 92.2], [21.7, 91.8], [22.3, 90.5], [21.8, 89.5],
        [22.5, 89.0], [24.5, 88.2], [26.5, 88.5]
      ]
    },
    {
      name: "Непал",
      stroke: "rgba(226, 201, 160, 0.90)",
      fill: "rgba(226, 201, 160, 0.13)",
      width: 2.0,
      points: [
        [30.4, 80.5], [30.0, 81.5], [28.8, 83.5], [28.0, 85.5],
        [27.7, 88.2], [26.8, 88.0], [26.5, 87.0], [27.5, 85.0],
        [28.2, 82.0], [29.0, 80.2], [30.4, 80.5]
      ]
    },
    {
      name: "Молдова",
      stroke: "rgba(226, 201, 160, 0.90)",
      fill: "rgba(226, 201, 160, 0.13)",
      width: 2.0,
      points: [
        [48.4, 27.5], [48.2, 28.5], [47.5, 29.2], [46.5, 30.0],
        [45.5, 28.2], [46.0, 28.1], [47.0, 27.6], [48.0, 27.0], [48.4, 27.5]
      ]
    }
  ];

  const countryInscriptions = getCountryInscriptions(activeLang);

  const [projectedPins, setProjectedPins] = useState<{ 
    pin: CountryDossier; 
    x: number; 
    y: number; 
    visible: boolean; 
    opacity: number; 
    scale: number;
  }[]>([]);

  const [projectedPlanes, setProjectedPlanes] = useState<{
    id: string;
    code: string;
    x: number;
    y: number;
    heading: number;
    visible: boolean;
    opacity: number;
  }[]>([]);

  const activeCountry = selectedCity || hoveredCity;

  const focusCountry = (country: CountryDossier, zoomLevel = 2.45) => {
    targetZoomRef.current = zoomLevel;
    const targetY = country.lon * (Math.PI / 180);
    const targetX = Math.max(-0.62, Math.min(-0.18, -country.lat * (Math.PI / 180) * 0.65));
    targetRotRef.current = { x: targetX, y: targetY };
  };

  const handleCountryClick = (country: CountryDossier) => {
    playSciFiBeep(1100, 0.07);
    if (selectedCity?.id === country.id) {
      resetView();
    } else {
      setSelectedCity(country);
      focusCountry(country, 2.45);
    }
  };

  const resetView = () => {
    playSciFiBeep(840, 0.06);
    setSelectedCity(null);
    setHoveredCity(null);
    targetZoomRef.current = 1.0;
    targetRotRef.current = { x: -0.38, y: 0.53 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true }) ||
               canvas.getContext("experimental-webgl", { alpha: true, antialias: true }) as WebGLRenderingContext | null;

    if (!gl) return;

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

        float outerAtmosphereRadius = radius * 1.035;
        if (d2 > outerAtmosphereRadius * outerAtmosphereRadius) {
          discard;
        }

        if (d2 > radius * radius) {
          float dist = sqrt(d2);
          float alpha = smoothstep(outerAtmosphereRadius, radius, dist);
          vec3 haloColor = vec3(0.18, 0.45, 0.85) * alpha * 0.45;
          gl_FragColor = vec4(haloColor, alpha * 0.35);
          return;
        }

        float z = sqrt(max(0.0, radius * radius - d2));
        vec3 normal = normalize(vec3(st.x, -st.y, z));

        vec3 p = normal;
        float cx = cos(uRotation.x);
        float sx = sin(uRotation.x);
        p = vec3(p.x, p.y * cx - p.z * sx, p.y * sx + p.z * cx);

        float cy = cos(uRotation.y);
        float sy = sin(uRotation.y);
        p = vec3(p.x * cy + p.z * sy, p.y, -p.x * sy + p.z * cy);

        float lat = asin(clamp(p.y, -1.0, 1.0));
        float lon = atan(p.x, p.z);
        vec2 uv = vec2((lon + PI) / (2.0 * PI), (lat + PI * 0.5) / PI);

        vec4 dayColor = texture2D(uEarthTexture, uv);
        vec4 nightColor = texture2D(uNightTexture, uv);

        vec3 sunDir = normalize(vec3(0.55, 0.40, 0.80));
        float NdotL = dot(normal, sunDir);

        float diffuse = clamp(NdotL * 0.85 + 0.35, 0.0, 1.0);
        float nightFactor = smoothstep(0.20, -0.28, NdotL);
        vec3 cityLights = nightColor.rgb * vec3(1.35, 1.15, 0.82) * nightFactor * 1.65;

        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfVec = normalize(sunDir + viewDir);
        float specFactor = pow(max(0.0, dot(normal, halfVec)), 32.0);
        float isWater = smoothstep(0.32, 0.0, dayColor.r);
        vec3 specular = vec3(0.9, 0.95, 1.0) * specFactor * 0.35 * isWater * max(0.0, NdotL);

        float rim = pow(1.0 - normal.z, 3.5);
        vec3 rimGlow = vec3(0.25, 0.60, 0.95) * rim * 0.52;

        vec3 finalColor = (dayColor.rgb * diffuse) + cityLights + specular + rimGlow;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
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

    const dayTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, dayTexture);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([10, 20, 40, 255])
    );

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
        offCtx.drawImage(earthImage, 0, 0, tw, th);

        countryPolygons.forEach((poly) => {
          if (poly.points.length < 2) return;
          offCtx.beginPath();
          poly.points.forEach(([lat, lon], idx) => {
            const x = ((lon + 180) / 360) * tw;
            const y = ((90 - lat) / 180) * th;
            if (idx === 0) offCtx.moveTo(x, y);
            else offCtx.lineTo(x, y);
          });
          offCtx.closePath();

          offCtx.fillStyle = poly.fill;
          offCtx.fill();

          offCtx.strokeStyle = poly.stroke;
          offCtx.lineWidth = poly.width;
          offCtx.lineJoin = "round";
          offCtx.lineCap = "round";
          offCtx.stroke();
        });

        countryInscriptions.forEach((item) => {
          const x = ((item.lon + 180) / 360) * tw;
          const y = ((90 - item.lat) / 180) * th;

          offCtx.save();
          offCtx.textAlign = "center";
          offCtx.textBaseline = "middle";

          offCtx.font = `bold ${item.size}px "Segoe UI", Arial, sans-serif`;
          offCtx.strokeStyle = "rgba(0, 0, 0, 0.94)";
          offCtx.lineWidth = 4.8;
          offCtx.lineJoin = "round";
          offCtx.strokeText(item.country, x, y);

          offCtx.fillStyle = item.isGold ? "#fef08a" : "#f5ede0";
          offCtx.fillText(item.country, x, y);

          if (item.city) {
            const citySize = Math.round(item.size * 0.68);
            offCtx.font = `bold ${citySize}px "Segoe UI", Arial, sans-serif`;
            offCtx.strokeStyle = "rgba(0, 0, 0, 0.90)";
            offCtx.lineWidth = 3.6;
            offCtx.strokeText(item.city, x, y + item.size * 0.95);

            offCtx.fillStyle = item.isGold ? "#fde047" : "#e8d8be";
            offCtx.fillText(item.city, x, y + item.size * 0.95);
          }

          offCtx.restore();
        });

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

    const nightTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, nightTexture);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 255])
    );

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

    let animId: number;
    let startTime = performance.now();

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const kyivLatRad = 50.4501 * (Math.PI / 180);
    const kyivLonRad = 30.5234 * (Math.PI / 180);
    const kyiv3D = {
      x: Math.cos(kyivLatRad) * Math.sin(kyivLonRad),
      y: Math.sin(kyivLatRad),
      z: Math.cos(kyivLatRad) * Math.cos(kyivLonRad),
    };

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime);

      zoomRef.current += (targetZoomRef.current - zoomRef.current) * 0.085;
      setCurrentZoomState(zoomRef.current);

      if (isDraggingRef.current) {
        targetRotRef.current.x = rotRef.current.x;
        targetRotRef.current.y = rotRef.current.y;
      } else {
        if (selectedCity) {
          rotRef.current.x += (targetRotRef.current.x - rotRef.current.x) * 0.085;
          
          let diffY = (targetRotRef.current.y - rotRef.current.y) % (2 * Math.PI);
          if (diffY > Math.PI) diffY -= 2 * Math.PI;
          if (diffY < -Math.PI) diffY += 2 * Math.PI;
          rotRef.current.y += diffY * 0.085;
        } else if (isAutoRotatingRef.current) {
          rotRef.current.y += velocityRef.current.y;
          velocityRef.current.y = velocityRef.current.y * 0.96 + 0.00055 * 0.04;
          targetRotRef.current.y = rotRef.current.y;
        }
      }

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

      const cssRadius = Math.min(rect.width, rect.height) * 0.38 * zoomRef.current;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotX = rotRef.current.x;
      const rotY = rotRef.current.y;

      const newPins = countries.map((city) => {
        const latRad = city.lat * (Math.PI / 180);
        const lonRad = city.lon * (Math.PI / 180);

        const Px = Math.cos(latRad) * Math.sin(lonRad);
        const Py = Math.sin(latRad);
        const Pz = Math.cos(latRad) * Math.cos(lonRad);

        const p1x = Px * Math.cos(rotY) - Pz * Math.sin(rotY);
        const p1y = Py;
        const p1z = Px * Math.sin(rotY) + Pz * Math.cos(rotY);

        const p2x = p1x;
        const p2y = p1y * Math.cos(rotX) + p1z * Math.sin(rotX);
        const p2z = -p1y * Math.sin(rotX) + p1z * Math.cos(rotX);

        const isFacing = p2z > 0.15;
        const horizonFactor = Math.max(0, Math.min(1, (p2z - 0.15) / 0.35));

        return {
          pin: city,
          x: cx + p2x * cssRadius,
          y: cy - p2y * cssRadius,
          visible: isFacing && horizonFactor > 0.05,
          opacity: horizonFactor,
          scale: Math.max(0.85, Math.min(1.3, 0.85 + p2z * 0.35)),
        };
      });

      setProjectedPins(newPins);

      const newPlanes = flightRoutes.map((route) => {
        const oLat = route.origin[0] * (Math.PI / 180);
        const oLon = route.origin[1] * (Math.PI / 180);
        const origin3D = {
          x: Math.cos(oLat) * Math.sin(oLon),
          y: Math.sin(oLat),
          z: Math.cos(oLat) * Math.cos(oLon),
        };

        const dot = origin3D.x * kyiv3D.x + origin3D.y * kyiv3D.y + origin3D.z * kyiv3D.z;
        const theta = Math.acos(Math.max(-1, Math.min(1, dot)));
        
        const t = (elapsed * route.speed + route.offset) % 1.0;
        const sinTheta = Math.sin(theta);
        
        const s1 = Math.sin((1 - t) * theta) / (sinTheta || 1);
        const s2 = Math.sin(t * theta) / (sinTheta || 1);

        const cur3D = {
          x: s1 * origin3D.x + s2 * kyiv3D.x,
          y: s1 * origin3D.y + s2 * kyiv3D.y,
          z: s1 * origin3D.z + s2 * kyiv3D.z,
        };

        const tNext = Math.min(1.0, t + 0.02);
        const sn1 = Math.sin((1 - tNext) * theta) / (sinTheta || 1);
        const sn2 = Math.sin(tNext * theta) / (sinTheta || 1);
        const next3D = {
          x: sn1 * origin3D.x + sn2 * kyiv3D.x,
          y: sn1 * origin3D.y + sn2 * kyiv3D.y,
          z: sn1 * origin3D.z + sn2 * kyiv3D.z,
        };

        const p1x = cur3D.x * Math.cos(rotY) - cur3D.z * Math.sin(rotY);
        const p1y = cur3D.y;
        const p1z = cur3D.x * Math.sin(rotY) + cur3D.z * Math.cos(rotY);

        const p2x = p1x;
        const p2y = p1y * Math.cos(rotX) + p1z * Math.sin(rotX);
        const p2z = -p1y * Math.sin(rotX) + p1z * Math.cos(rotX);

        const np1x = next3D.x * Math.cos(rotY) - next3D.z * Math.sin(rotY);
        const np1y = next3D.y;
        const np1z = next3D.x * Math.sin(rotY) + next3D.z * Math.cos(rotY);

        const np2x = np1x;
        const np2y = np1y * Math.cos(rotX) + np1z * Math.sin(rotX);

        const planeAltitude = cssRadius * 1.028;
        const planeX = cx + p2x * planeAltitude;
        const planeY = cy - p2y * planeAltitude;

        const nextPlaneX = cx + np2x * planeAltitude;
        const nextPlaneY = cy - np2y * planeAltitude;

        const dx = nextPlaneX - planeX;
        const dy = nextPlaneY - planeY;
        const headingDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

        const isFacing = p2z > 0.12;
        const horizonFactor = Math.max(0, Math.min(1, (p2z - 0.12) / 0.3));

        return {
          id: route.id,
          code: route.code,
          x: planeX,
          y: planeY,
          heading: headingDeg,
          visible: isFacing && horizonFactor > 0.05,
          opacity: horizonFactor,
        };
      });

      setProjectedPlanes(newPlanes);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [selectedCity, locale]);

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

  const activeProjectedPin = projectedPins.find(p => p.pin.id === activeCountry?.id);

  return (
    <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center select-none">
      
      {/* SIDE-BY-SIDE STAGE: 3D Globe on the Left, Rich Dossier Beside it on the Right (Never overlaps the country!) */}
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-8">
        
        {/* 3D Globe Visual Column */}
        <div className="relative w-full max-w-[480px] sm:max-w-[500px] aspect-square flex-shrink-0 touch-none">
          
          {/* WebGL Photorealistic Earth Canvas with Baked Sovereign Borders & Night Lights */}
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing block"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />

          {/* Top Cartographic Header HUD */}
          <div className="absolute top-2.5 left-3 right-3 pointer-events-none flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950/85 border border-[#e2c9a0]/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-white font-bold tracking-wider">
                {activeCountry ? `${t.satellitePrefix}: ${activeCountry.code} // ${activeCountry.name.toUpperCase()}` : t.satelliteMonitoring}
              </span>
            </div>

            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-950/85 border border-[#e2c9a0]/20 backdrop-blur-md">
              <span className="text-slate-400">{t.zoom}:</span>
              <span className="text-[#e2c9a0] font-bold">{(currentZoomState * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* Reticle around active country (Clean warm titanium/champagne) */}
          {activeProjectedPin && activeProjectedPin.visible && (
            <div
              style={{
                left: `${activeProjectedPin.x}px`,
                top: `${activeProjectedPin.y}px`,
                opacity: activeProjectedPin.opacity,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute pointer-events-none transition-all duration-200 z-30"
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 border border-[#e2c9a0]/40 rounded-full animate-ping duration-1000 opacity-25" />
                <div className="absolute inset-0 border border-[#e2c9a0]/60 rounded-full animate-[spin_8s_linear_infinite]" />
                <div className="absolute w-full h-[1px] bg-[#e2c9a0]/40" />
                <div className="absolute h-full w-[1px] bg-[#e2c9a0]/40" />
                <div className="w-3.5 h-3.5 rounded-full border-2 border-[#fff8ed] bg-[#e2c9a0] shadow-[0_0_10px_rgba(226,201,160,0.8)]" />
              </div>
            </div>
          )}

          {/* TOP-DOWN AEROSPACE AIRPLANES GLIDING ALONG GREAT-CIRCLE ROUTES */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {projectedPlanes.map(({ id, code, x, y, heading, visible, opacity }) => {
              if (!visible) return null;
              return (
                <div
                  key={id}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    opacity,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="absolute pointer-events-none transition-opacity duration-150"
                >
                  <div
                    style={{ transform: `rotate(${heading}deg)` }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Glowing Twin Jet Contrails streaming behind the wings */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 flex gap-2.5 -mt-1 pointer-events-none">
                      <div className="w-[1.5px] h-12 bg-gradient-to-b from-amber-300/80 via-white/30 to-transparent blur-[0.4px]" />
                      <div className="w-[1.5px] h-12 bg-gradient-to-b from-amber-300/80 via-white/30 to-transparent blur-[0.4px]" />
                    </div>

                    {/* Top-Down Modern Commercial Airliner Vector Silhouette */}
                    <svg
                      width="26"
                      height="28"
                      viewBox="0 0 24 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                    >
                      <path d="M12 7L24 16L22 17.5L12 11.5L2 17.5L0 16L12 7Z" fill="#f8fafc" />
                      <path d="M12 7L24 16L22 17.5L12 11.5L2 17.5L0 16L12 7Z" stroke="#eab308" strokeWidth="0.5" />
                      <rect x="7" y="11" width="1.8" height="4" rx="0.9" fill="#ca8a04" />
                      <rect x="15.2" y="11" width="1.8" height="4" rx="0.9" fill="#ca8a04" />
                      <path d="M12 0C13.2 0 13.7 2 13.7 6L13.4 20L12 21.5L10.6 20L10.3 6C10.3 2 10.8 0 12 0Z" fill="#ffffff" />
                      <path d="M11 3.5C11.3 3.2 12.7 3.2 13 3.5L13.2 4.8H10.8L11 3.5Z" fill="#0f172a" />
                      <path d="M12 20L17 24.5L16 25.5L12 23L8 25.5L7 24.5L12 20Z" fill="#f8fafc" />
                      <rect x="11.5" y="18.5" width="1" height="5.5" rx="0.5" fill="#ca8a04" />
                    </svg>

                    <div className="absolute left-full ml-1.5 px-1.5 py-0.5 rounded bg-slate-950/90 border border-amber-500/40 text-[8px] font-mono text-amber-300 whitespace-nowrap shadow-md">
                      ✈️ {code}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Hub Pips (Warm, realistic cartographic tones) */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {projectedPins.map(({ pin, x, y, visible, opacity, scale }) => {
              if (!visible) return null;
              const isSelected = selectedCity?.id === pin.id;
              const isMain = pin.isMainHub;

              return (
                <div
                  key={pin.id}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    opacity,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                  }}
                  className="absolute pointer-events-auto transition-opacity duration-150"
                  onClick={() => handleCountryClick(pin)}
                  onMouseEnter={() => setHoveredCity(pin)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  <div className="relative flex items-center justify-center cursor-pointer group">
                    <div
                      className={`rounded-full border transition-all ${
                        isMain
                          ? "w-3.5 h-3.5 bg-amber-400 border-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.9)]"
                          : "w-2.5 h-2.5 bg-[#e2c9a0] border-[#fff8ed] shadow-[0_0_8px_rgba(226,201,160,0.6)] group-hover:scale-125"
                      }`}
                    />

                    {!selectedCity && (
                      <div
                        className={`absolute bottom-full mb-1.5 px-2.5 py-1 rounded-md border text-[10px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md shadow-xl whitespace-nowrap z-40 transition-all opacity-0 group-hover:opacity-100 ${
                          isMain
                            ? "bg-slate-950/95 border-amber-500/80 text-amber-300"
                            : "bg-slate-950/95 border-[#e2c9a0]/60 text-[#f5ede0]"
                        }`}
                      >
                        <span>{pin.flag}</span>
                        <span>{pin.name}</span>
                        <span className="text-[9px] text-amber-300 font-bold">({pin.targetWageUA})</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BESIDE-THE-GLOBE DOSSIER PANEL: NEVER COVERS THE 3D EARTH SPHERE! */}
        <div className="w-full lg:w-[410px] flex-shrink-0 flex flex-col justify-center">
          {activeCountry ? (
            <div className="w-full p-5 rounded-2xl bg-slate-950/95 border border-[#e2c9a0]/40 text-xs shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
              
              {/* Header with Region & Reset View */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
                <span className="font-mono text-[9px] text-[#e2c9a0] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {activeCountry.hubType}
                </span>
                <button
                  onClick={resetView}
                  className="text-white/50 hover:text-white font-mono text-xs px-2 py-0.5 rounded hover:bg-white/10 transition-colors"
                  title={t.reset}
                >
                  {t.reset}
                </button>
              </div>

              {/* Country Title + Flight Origin Badge */}
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-white flex items-center gap-2.5">
                  <span className="text-2xl">{activeCountry.flag}</span>
                  <span>{activeCountry.name}, {activeCountry.country}</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300 font-bold">
                  <Plane className="w-3 h-3 text-amber-400" />
                  <span>{activeCountry.flightCode}</span>
                </div>
              </div>

              {/* SATELLITE RECONNAISSANCE OPTICS VIEWPORT (User Requirement: "как будто сьемки из спутника") */}
              <div className="relative mt-3 rounded-xl overflow-hidden border border-[#e2c9a0]/35 aspect-[16/8] shadow-lg group">
                <img 
                  src={activeCountry.satelliteImage} 
                  alt={activeCountry.country} 
                  className="w-full h-full object-cover brightness-[0.85] contrast-110 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
                
                {/* Recon Sensor HUD */}
                <div className="absolute top-2 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950/85 border border-amber-400/40 text-[9px] font-mono text-amber-300 font-bold backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t.satelliteReconBadge}</span>
                </div>
                
                <div className="absolute top-2 right-2.5 px-1.5 py-0.5 rounded bg-slate-950/85 border border-white/10 text-[9px] font-mono text-slate-300 backdrop-blur-md">
                  {activeCountry.resolution}
                </div>

                {/* Tactical Crosshair reticle in center */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-9 h-9 border border-[#e2c9a0] rounded-full" />
                  <div className="absolute w-14 h-[1px] bg-[#e2c9a0]" />
                  <div className="absolute h-14 w-[1px] bg-[#e2c9a0]" />
                </div>

                {/* Bottom Recon Telemetry Bar */}
                <div className="absolute bottom-1.5 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-slate-200 pointer-events-none">
                  <span className="text-amber-200/90 font-bold">{activeCountry.satelliteCoords}</span>
                  <span className="text-[#e2c9a0]">ALT: {activeCountry.altitude}</span>
                </div>
              </div>

              {/* MAIN WAGE COMPARISON BENTO BOX */}
              <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-[#e2c9a0]/30 shadow-inner">
                <div className="text-[9px] font-mono uppercase text-[#e2c9a0]/90 tracking-wider flex items-center justify-between pb-1.5 border-b border-white/10">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Banknote className="w-3.5 h-3.5 text-amber-400" />
                    {t.wageComparison}
                  </span>
                  <span className="text-emerald-400 font-bold">{activeCountry.wageMultiplier}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2.5">
                  {/* UA Target Wage */}
                  <div className="text-left">
                    <div className="text-[9px] text-slate-400 font-mono">{t.readyToWork}</div>
                    <div className="text-xl sm:text-2xl font-black text-amber-400 tracking-tight mt-0.5">
                      {activeCountry.targetWageUA}
                    </div>
                    <div className="text-[10px] text-amber-300/80 font-mono font-medium">
                      {activeCountry.targetWageUAH}
                    </div>
                  </div>

                  {/* Home Country Wage */}
                  <div className="text-left border-l border-white/10 pl-3">
                    <div className="text-[9px] text-slate-400 font-mono">{t.homeIncome}</div>
                    <div className="text-base sm:text-lg font-bold text-slate-400 tracking-tight mt-0.5 line-through decoration-red-400/50">
                      {activeCountry.homeWage}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {activeCountry.homeWageUAH}
                    </div>
                  </div>
                </div>

                {/* Motivation Multiplier */}
                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">{t.staffMotivation}</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {t.motivationBenefit}
                  </span>
                </div>
              </div>

              {/* Cultural Differences & Mentality (User Requirement) */}
              <div className="mt-2.5 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[10px] font-mono text-[#e2c9a0] uppercase font-bold flex items-center gap-1.5 mb-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.culturalMentality}</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  {activeCountry.culturalTraits.map((trait, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Economic Rationale */}
              <p className="text-[11px] text-slate-300 mt-2 leading-relaxed font-sans">
                {activeCountry.economicAdvantage}
              </p>

              {/* Key Safety & Visa Metrics */}
              <div className="grid grid-cols-2 gap-2 my-2.5 pt-2 border-t border-white/10 text-[10px] font-mono">
                <div className="p-1.5 rounded bg-white/5 border border-white/5">
                  <div className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{t.visaLeadTime}</span>
                  </div>
                  <div className="text-white font-bold mt-0.5">{activeCountry.visaTime}</div>
                </div>

                <div className="p-1.5 rounded bg-white/5 border border-white/5">
                  <div className="text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{t.mobilization}</span>
                  </div>
                  <div className="text-emerald-400 font-bold mt-0.5">{t.mobilizationImmunity}</div>
                </div>
              </div>

              {/* Action CTA Button: Order Specialists */}
              <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                <a
                  href="#calculator"
                  onClick={() => playSciFiBeep(1200, 0.08)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-black font-bold text-xs hover:brightness-110 shadow-gold-glow transition-all active:scale-95"
                >
                  <span>{t.calcButton(activeCountry.name)}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={resetView}
                  className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                  title={t.reset}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full p-6 rounded-2xl bg-slate-950/70 border border-white/10 text-xs shadow-xl backdrop-blur-md flex flex-col items-center text-center justify-center min-h-[360px]">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3 shadow-gold-glow">
                <Plane className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wide">
                {t.defaultTitle}
              </h4>
              <p className="text-slate-400 mt-2 leading-relaxed max-w-xs">
                {t.defaultDesc}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px]">
                <span>{t.activeFlights}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tactile Country Quick-Selector Bar & Aerospace Controls */}
      <div className="w-full max-w-4xl mt-5 px-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar justify-start sm:justify-center">
          {countries.slice(0, 6).map((country) => {
            const isSelected = selectedCity?.id === country.id;

            return (
              <button
                key={country.id}
                onClick={() => handleCountryClick(country)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-mono transition-all duration-200 ${
                  isSelected
                    ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-gold-glow scale-105"
                    : country.isMainHub
                    ? "bg-slate-900/80 border-amber-500/40 text-amber-200/90 hover:bg-slate-800 hover:border-amber-400"
                    : "bg-slate-900/70 border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-[#e2c9a0]/30"
                }`}
              >
                <span className="text-base">{country.flag}</span>
                <span className="font-semibold">{country.country}</span>
                <span className="text-[10px] font-mono text-[#e2c9a0]/80">
                  {country.isMainHub ? t.hub : country.targetWageUA.replace(" / міс", "").replace(" / мес", "").replace(" / mo", "")}
                </span>
                {isSelected && <span className="text-[10px] text-amber-400 font-bold">🔍</span>}
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSciFiBeep(880, 0.05);
                setIsAutoRotating(!isAutoRotating);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/70 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
            >
              {isAutoRotating ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.pause}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.rotate}</span>
                </>
              )}
            </button>

            <button
              onClick={resetView}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/70 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#e2c9a0]" />
              <span>{t.earthOverview}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400">
            <span>{t.hint}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
