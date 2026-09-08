"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Compass,
  SlidersHorizontal,
  ExternalLink
} from "lucide-react";
import { playSciFiBeep, playMechanicalClick } from "@/lib/soundFX";
import { HUBS, HubPoint } from "./ThreeGlobeScene";

// Dynamically load ThreeGlobeScene with ssr: false
const DynamicThreeGlobe = dynamic(
  () => import("./ThreeGlobeScene").then((mod) => mod.ThreeGlobeScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[580px] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4" />
        <div className="font-mono text-xs text-cyan-400/90 tracking-widest uppercase">
          ЗАВАНТАЖЕННЯ 3D-СФЕРИ NASA...
        </div>
      </div>
    ),
  }
);

export interface CountryDossier {
  id: string;
  name: string;
  country: string;
  region: string;
  flag: string;
  code: string;
  hubType: string;
  targetWageUA: string;
  targetWageUAH: string;
  homeWage: string;
  homeWageUAH: string;
  wageMultiplier: string;
  wageRatioNumber: number;
  visaTime: string;
  workSchedule: string;
  culturalTraits: string[];
  economicAdvantage: string;
  flightCode: string;
  isMainHub?: boolean;
  isTransitHub?: boolean;
}

const DOSSIERS: Record<string, CountryDossier[]> = {
  uk: [
    {
      id: "kyiv",
      name: "Київ",
      country: "Україна",
      region: "Східна Європа // Головний хаб",
      flag: "🇺🇦",
      code: "UA",
      hubType: "ГОЛОВНИЙ B2B ХАБ",
      targetWageUA: "1 100 – 1 450 €",
      targetWageUAH: "48 000 – 65 000 ₴",
      homeWage: "Дефіцитний ринок",
      homeWageUAH: "Високий ризик призову",
      wageMultiplier: "100% захист",
      wageRatioNumber: 1.0,
      visaTime: "0 днів (В Україні)",
      workSchedule: "Штатний розклад підприємства",
      culturalTraits: [
        "Рідна мова та спільні стандарти виробництва",
        "Проблема: щоденний ризик призову та дефіцит кадрів"
      ],
      economicAdvantage: "Пряме зарахування у штат ТОВ/ФОП. 100% імунітет від мобілізації для іноземців (ст. 23 ЗУ).",
      flightCode: "UA-HUB",
      isMainHub: true,
    },
    {
      id: "chisinau",
      name: "Кишинів",
      country: "Молдова",
      region: "Східна Європа // Транзит",
      flag: "🇲🇩",
      code: "MD",
      hubType: "ОФІЦІЙНИЙ ТРАНЗИТНИЙ ХАБ",
      targetWageUA: "Транзитний коридор",
      targetWageUAH: "Прямий автобусний трансфер",
      homeWage: "Транзитний хаб",
      homeWageUAH: "Зустріч в аеропорту",
      wageMultiplier: "Безпечний коридор",
      wageRatioNumber: 1.0,
      visaTime: "10–20 днів",
      workSchedule: "Координаційний штаб 24/7",
      culturalTraits: [
        "Офіційний безпечний наземний коридор до кордону України",
        "Зустріч представниками Recruiter I Club в аеропорту Кишинева",
        "Трансфер комфортабельними автобусами безпосередньо до заводу"
      ],
      economicAdvantage: "Гарантія безпечного в'їзду персоналу: організований транзит через Молдову без затримок на кордоні.",
      flightCode: "RMO-KBP",
      isTransitHub: true,
    },
    {
      id: "tashkent",
      name: "Ташкент",
      country: "Узбекистан",
      region: "Центральна Азія // Безвізовий коридор",
      flag: "🇺🇿",
      code: "UZ",
      hubType: "АКТИВНИЙ КОРИДОР",
      targetWageUA: "від 900 €",
      targetWageUAH: "~40 500 ₴ / міс",
      homeWage: "~250 €",
      homeWageUAH: "~11 250 ₴",
      wageMultiplier: "в 3.6× вище",
      wageRatioNumber: 3.6,
      visaTime: "30–45 календарних днів",
      workSchedule: "Зміни по 10–12 год, 6 днів",
      culturalTraits: [
        "Повна відсутність мовного бар'єра",
        "Сухий закон: нульовий алкогольний фактор на зміні",
        "Традиційна субординація та повага до бригадира",
        "Висока мотивація (відправляють дохід родинам)"
      ],
      economicAdvantage: "Спеціалісти без мовного бар'єра. Заробіток у 3.6 раза вищий за домашній гарантує 100% старанність.",
      flightCode: "TAS-KBP",
    },
    {
      id: "delhi",
      name: "Нью-Делі",
      country: "Індія",
      region: "Південна Азія // Промисловий пул",
      flag: "🇮🇳",
      code: "IN",
      hubType: "АКТИВНИЙ КОРИДОР",
      targetWageUA: "від 600 €",
      targetWageUAH: "~27 000 ₴ / міс",
      homeWage: "~160 €",
      homeWageUAH: "~7 200 ₴",
      wageMultiplier: "в 3.8× вище",
      wageRatioNumber: 3.8,
      visaTime: "60–90 днів (віза D)",
      workSchedule: "Цеховий графік за техкартами",
      culturalTraits: [
        "Англійська мова + російськомовні старші бригадири",
        "Висока витримка при монотонній цеховій праці",
        "Суворе дотримання технологічних регламентів"
      ],
      economicAdvantage: "Ставка від 600 € знижує витрати фонду оплати праці до 35–40% при вищій виробітці.",
      flightCode: "DEL-KBP",
    },
    {
      id: "almaty",
      name: "Алмати",
      country: "Казахстан",
      region: "Центральна Азія // Інженерний сектор",
      flag: "🇰🇿",
      code: "KZ",
      hubType: "АКТИВНИЙ КОРИДОР",
      targetWageUA: "від 950 €",
      targetWageUAH: "~42 750 ₴ / міс",
      homeWage: "~380 €",
      homeWageUAH: "~17 100 ₴",
      wageMultiplier: "в 2.5× вище",
      wageRatioNumber: 2.5,
      visaTime: "30–45 календарних днів",
      workSchedule: "Зміни 8–10 годин, єврографік",
      culturalTraits: [
        "Вільне володіння мовою, запуск за 24 години",
        "Досвід на великих заводах і металургійних комбінатах",
        "Кваліфікація операторів ЧПК та наладчиків"
      ],
      economicAdvantage: "Кадри для складних технологічних ліній. Швидкий запуск без витрат часу на адаптацію.",
      flightCode: "ALA-KBP",
    },
    {
      id: "dhaka",
      name: "Дакка",
      country: "Бангладеш",
      region: "Південна Азія // Текстиль & Будівництво",
      flag: "🇧🇩",
      code: "BD",
      hubType: "АКТИВНИЙ КОРИДОР",
      targetWageUA: "від 600 €",
      targetWageUAH: "~27 000 ₴ / міс",
      homeWage: "~140 €",
      homeWageUAH: "~6 300 ₴",
      wageMultiplier: "в 4.2× вище",
      wageRatioNumber: 4.2,
      visaTime: "60–90 днів",
      workSchedule: "Потокові лінії, 6 днів/тижд",
      culturalTraits: [
        "Світовий центр легкої промисловості — швачки зі стажем 7+ років",
        "Швидкість строчки в 1.5 раза перевищує середні норми",
        "Невибагливість у побуті та висока дисципліна"
      ],
      economicAdvantage: "Рішення №1 для швейних фабрик (спецодяг, амуніція): собівартість пошиття знижується на 40%.",
      flightCode: "DAC-KBP",
    },
    {
      id: "kathmandu",
      name: "Катманду",
      country: "Непал",
      region: "Південна Азія // Фізична витривалість",
      flag: "🇳🇵",
      code: "NP",
      hubType: "АКТИВНИЙ КОРИДОР",
      targetWageUA: "від 650 €",
      targetWageUAH: "~29 250 ₴ / міс",
      homeWage: "~150 €",
      homeWageUAH: "~6 750 ₴",
      wageMultiplier: "в 4.0× вище",
      wageRatioNumber: 4.0,
      visaTime: "60–85 днів",
      workSchedule: "Важка фізична праця, відкриті майданчики",
      culturalTraits: [
        "Виняткова фізична витривалість і стійкість до будь-якої погоди",
        "Буддійська культура: спокій, безконфліктність, порядок",
        "Працьовитість без нарікань на навантаження"
      ],
      economicAdvantage: "Закривають найважчі ділянки на монолітному будівництві та в агрокомплексах.",
      flightCode: "KTM-KBP",
    },
    {
      id: "hanoi",
      name: "Ханой",
      country: "В'єтнам",
      region: "Південно-Східна Азія // Точна механіка",
      flag: "🇻🇳",
      code: "VN",
      hubType: "АКТИВНИЙ КОРИДОР",
      targetWageUA: "від 700 €",
      targetWageUAH: "~31 500 ₴ / міс",
      homeWage: "~220 €",
      homeWageUAH: "~9 900 ₴",
      wageMultiplier: "в 3.2× вище",
      wageRatioNumber: 3.2,
      visaTime: "60–80 днів",
      workSchedule: "Позмінно, чисті цехи та збірка",
      culturalTraits: [
        "Акуратність, моторика рук та увага до мікродеталей",
        "Висока корпоративна лояльність і відданість роботі",
        "Швидке освоєння інструкцій та технологічних карт"
      ],
      economicAdvantage: "Ідеально для приладобудування, збірки електроніки та точного пошиття.",
      flightCode: "HAN-KBP",
    },
    {
      id: "manila",
      name: "Маніла",
      country: "Філіппіни",
      region: "Південно-Східна Азія // Харчопром HACCP",
      flag: "🇵🇭",
      code: "PH",
      hubType: "АКТИВНИЙ КОРИДОР",
      targetWageUA: "від 750 €",
      targetWageUAH: "~33 750 ₴ / міс",
      homeWage: "~210 €",
      homeWageUAH: "~9 450 ₴",
      wageMultiplier: "в 3.5× вище",
      wageRatioNumber: 3.5,
      visaTime: "60–90 днів",
      workSchedule: "Смени по 8–10 годин, регламенти HACCP",
      culturalTraits: [
        "Вільна розмовна англійська мова (державний статус)",
        "Вроджена охайність, перфекціонізм та дотримання санітарії",
        "Висока лояльність до роботодавця, контракти від 2 років"
      ],
      economicAdvantage: "Еталонний персонал для харчових комбінатів, ліній пакування HACCP та складських комплексів.",
      flightCode: "MNL-KBP",
    },
  ],
  ru: [
    {
      id: "kyiv",
      name: "Киев",
      country: "Украина",
      region: "Восточная Европа // Главный хаб",
      flag: "🇺🇦",
      code: "UA",
      hubType: "ГЛАВНЫЙ B2B ХАБ",
      targetWageUA: "1 100 – 1 450 €",
      targetWageUAH: "48 000 – 65 000 ₴",
      homeWage: "Дефицитный рынок",
      homeWageUAH: "Высокий риск мобилизации",
      wageMultiplier: "100% защита",
      wageRatioNumber: 1.0,
      visaTime: "0 дней (В Украине)",
      workSchedule: "Штатное расписание завода",
      culturalTraits: [
        "Родной язык и общие стандарты производства",
        "Проблема: ежедневный риск мобилизации и дефицит кадров"
      ],
      economicAdvantage: "Прямое зачисление в штат ТОВ/ФОП. 100% иммунитет от призыва для иностранцев (ст. 23 ЗУ).",
      flightCode: "UA-HUB",
      isMainHub: true,
    },
    {
      id: "chisinau",
      name: "Кишинёв",
      country: "Молдова",
      region: "Восточная Европа // Транзит",
      flag: "🇲🇩",
      code: "MD",
      hubType: "ОФИЦИАЛЬНЫЙ ТРАНЗИТНЫЙ ХАБ",
      targetWageUA: "Транзитный коридор",
      targetWageUAH: "Прямой автобусный трансфер",
      homeWage: "Транзитный хаб",
      homeWageUAH: "Встреча в аэропорту",
      wageMultiplier: "Безопасный коридор",
      wageRatioNumber: 1.0,
      visaTime: "10–20 дней",
      workSchedule: "Координационный штаб 24/7",
      culturalTraits: [
        "Официальный безопасный наземный коридор до границы Украины",
        "Встреча представителями Recruiter I Club в аэропорту Кишинёва",
        "Трансфер комфортабельными автобусами прямо на завод"
      ],
      economicAdvantage: "Гарантия безопасного прибытия: организованный транзит через Молдову без рисков на границе.",
      flightCode: "RMO-KBP",
      isTransitHub: true,
    },
    {
      id: "tashkent",
      name: "Ташкент",
      country: "Узбекистан",
      region: "Центральная Азия // Безвизовый коридор",
      flag: "🇺🇿",
      code: "UZ",
      hubType: "АКТИВНЫЙ КОРИДОР",
      targetWageUA: "от 900 €",
      targetWageUAH: "~40 500 ₴ / мес",
      homeWage: "~250 €",
      homeWageUAH: "~11 250 ₴",
      wageMultiplier: "в 3.6× выше",
      wageRatioNumber: 3.6,
      visaTime: "30–45 календарных дней",
      workSchedule: "Смены по 10–12 ч, 6 дней",
      culturalTraits: [
        "Полное отсутствие языкового барьера (свободный русский)",
        "Сухой закон: нулевой алкогольный фактор на смене",
        "Традиционная дисциплина и уважение к бригадиру",
        "Высокая мотивация (отправляют заработок семьям)"
      ],
      economicAdvantage: "Специалисты без языкового барьера. Заработок в 3.6 раза выше домашнего гарантирует 100% усердие.",
      flightCode: "TAS-KBP",
    },
    {
      id: "delhi",
      name: "Нью-Дели",
      country: "Индия",
      region: "Южная Азия // Промышленный пул",
      flag: "🇮🇳",
      code: "IN",
      hubType: "АКТИВНЫЙ КОРИДОР",
      targetWageUA: "от 600 €",
      targetWageUAH: "~27 000 ₴ / мес",
      homeWage: "~160 €",
      homeWageUAH: "~7 200 ₴",
      wageMultiplier: "в 3.8× выше",
      wageRatioNumber: 3.8,
      visaTime: "60–90 дней (виза D)",
      workSchedule: "Посменный график по техкартам",
      culturalTraits: [
        "Английский язык + русскоговорящие старшие бригадиры",
        "Высокая выдержка при монотонном цеховом труде",
        "Строгое соблюдение регламентов ОТК"
      ],
      economicAdvantage: "Ставка от 600 € обеспечивает заводу экономию фонда оплаты труда до 35–40% при высокой выработке.",
      flightCode: "DEL-KBP",
    },
    {
      id: "almaty",
      name: "Алматы",
      country: "Казахстан",
      region: "Центральная Азия // Инженерный сектор",
      flag: "🇰🇿",
      code: "KZ",
      hubType: "АКТИВНЫЙ КОРИДОР",
      targetWageUA: "от 950 €",
      targetWageUAH: "~42 750 ₴ / мес",
      homeWage: "~380 €",
      homeWageUAH: "~17 100 ₴",
      wageMultiplier: "в 2.5× выше",
      wageRatioNumber: 2.5,
      visaTime: "30–45 календарных дней",
      workSchedule: "Смены 8–10 часов, европейский график",
      culturalTraits: [
        "Свободный язык, запуск за 24 часа",
        "Опыт на крупных металлургических комбинатах",
        "Квалификация операторов ЧПУ и наладчиков"
      ],
      economicAdvantage: "Кадры для сложных технологических линий. Быстрый запуск без затрат времени на адаптацию.",
      flightCode: "ALA-KBP",
    },
    {
      id: "dhaka",
      name: "Дакка",
      country: "Бангладеш",
      region: "Южная Азия // Текстиль & Строительство",
      flag: "🇧🇩",
      code: "BD",
      hubType: "АКТИВНЫЙ КОРИДОР",
      targetWageUA: "от 600 €",
      targetWageUAH: "~27 000 ₴ / мес",
      homeWage: "~140 €",
      homeWageUAH: "~6 300 ₴",
      wageMultiplier: "в 4.2× выше",
      wageRatioNumber: 4.2,
      visaTime: "60–90 дней",
      workSchedule: "Поточные линии, 6 дней в неделю",
      culturalTraits: [
        "Мировой центр легкой промышленности — швеи со стажем 7+ лет",
        "Скорость строчки в 1.5 раза превышает средние нормы",
        "Неприхотливость в быту и высокая трудовая дисциплина"
      ],
      economicAdvantage: "Решение №1 для швейных фабрик: себестоимость пошива снижается на 40%.",
      flightCode: "DAC-KBP",
    },
    {
      id: "kathmandu",
      name: "Катманду",
      country: "Непал",
      region: "Южная Азия // Физическая выносливость",
      flag: "🇳🇵",
      code: "NP",
      hubType: "АКТИВНЫЙ КОРИДОР",
      targetWageUA: "от 650 €",
      targetWageUAH: "~29 250 ₴ / мес",
      homeWage: "~150 €",
      homeWageUAH: "~6 750 ₴",
      wageMultiplier: "в 4.0× выше",
      wageRatioNumber: 4.0,
      visaTime: "60–85 дней",
      workSchedule: "Тяжелый физический труд, открытые площадки",
      culturalTraits: [
        "Исключительная физическая выносливость в любых погодных условиях",
        "Буддийская культура: спокойствие, бесконфликтность, порядок",
        "Трудолюбие без жалоб на нагрузки"
      ],
      economicAdvantage: "Закрывают самые тяжелые участки на монолитном строительстве и в агрокомплексах.",
      flightCode: "KTM-KBP",
    },
    {
      id: "hanoi",
      name: "Ханой",
      country: "Вьетнам",
      region: "Юго-Восточная Азия // Точная механика",
      flag: "🇻🇳",
      code: "VN",
      hubType: "АКТИВНЫЙ КОРИДОР",
      targetWageUA: "от 700 €",
      targetWageUAH: "~31 500 ₴ / мес",
      homeWage: "~220 €",
      homeWageUAH: "~9 900 ₴",
      wageMultiplier: "в 3.2× выше",
      wageRatioNumber: 3.2,
      visaTime: "60–80 дней",
      workSchedule: "Посменно, чистые цеха и конвейеры",
      culturalTraits: [
        "Аккуратность, мелкая моторика и внимание к деталям",
        "Высокая корпоративная дисциплина и преданность работе",
        "Быстрое освоение технологических карт"
      ],
      economicAdvantage: "Идеально для точной механики, пайки электроники и швейных производств.",
      flightCode: "HAN-KBP",
    },
    {
      id: "manila",
      name: "Манила",
      country: "Филиппины",
      region: "Юго-Восточная Азия // Пищепром HACCP",
      flag: "🇵🇭",
      code: "PH",
      hubType: "АКТИВНЫЙ КОРИДОР",
      targetWageUA: "от 750 €",
      targetWageUAH: "~33 750 ₴ / мес",
      homeWage: "~210 €",
      homeWageUAH: "~9 450 ₴",
      wageMultiplier: "в 3.5× выше",
      wageRatioNumber: 3.5,
      visaTime: "60–90 дней",
      workSchedule: "Смены по 8–10 часов, регламенты НАССР",
      culturalTraits: [
        "Свободный английский язык (государственный статус)",
        "Врожденная чистоплотность и педантичность в санитарии",
        "Высокая лояльность к работодателю, долгосрочные контракты"
      ],
      economicAdvantage: "Персонал для пищевых производств, чистых цехов HACCP и складских комплексов.",
      flightCode: "MNL-KBP",
    },
  ],
  en: [
    {
      id: "kyiv",
      name: "Kyiv",
      country: "Ukraine",
      region: "Eastern Europe // Primary Hub",
      flag: "🇺🇦",
      code: "UA",
      hubType: "PRIMARY B2B DESTINATION",
      targetWageUA: "1,100 – 1,450 €",
      targetWageUAH: "48,000 – 65,000 ₴",
      homeWage: "High deficit",
      homeWageUAH: "Military draft risk",
      wageMultiplier: "100% Protection",
      wageRatioNumber: 1.0,
      visaTime: "0 days (Local placement)",
      workSchedule: "Enterprise standard operating shift",
      culturalTraits: [
        "Native language and shared operational culture",
        "Challenge: severe labor deficit due to wartime conditions"
      ],
      economicAdvantage: "Direct enrollment onto Ukrainian entity payroll. 100% statutory draft exemption (Art. 23 Law of Ukraine).",
      flightCode: "UA-HUB",
      isMainHub: true,
    },
    {
      id: "chisinau",
      name: "Chisinau",
      country: "Moldova",
      region: "Eastern Europe // Transit",
      flag: "🇲🇩",
      code: "MD",
      hubType: "OFFICIAL TRANSIT HUB",
      targetWageUA: "Transit Corridor",
      targetWageUAH: "Direct bus escort to facility",
      homeWage: "Transit Hub",
      homeWageUAH: "Airport reception",
      wageMultiplier: "Safe Corridor",
      wageRatioNumber: 1.0,
      visaTime: "10–20 days",
      workSchedule: "24/7 Logistics headquarters",
      culturalTraits: [
        "Official secure land corridor directly to Ukraine border",
        "Airport reception in Chisinau by Recruiter I Club staff",
        "Organized bus transit directly to employer facility"
      ],
      economicAdvantage: "Guaranteed safe workforce arrival: direct organized transit via Moldova with zero border friction.",
      flightCode: "RMO-KBP",
      isTransitHub: true,
    },
    {
      id: "tashkent",
      name: "Tashkent",
      country: "Uzbekistan",
      region: "Central Asia // Expedited Corridor",
      flag: "🇺🇿",
      code: "UZ",
      hubType: "ACTIVE CORRIDOR",
      targetWageUA: "from 900 €",
      targetWageUAH: "~40,500 ₴ / mo",
      homeWage: "~250 €",
      homeWageUAH: "~11,250 ₴",
      wageMultiplier: "3.6× Higher",
      wageRatioNumber: 3.6,
      visaTime: "30–45 calendar days",
      workSchedule: "10–12h shifts, 6 days/week",
      culturalTraits: [
        "Zero language barrier (fluent Russian)",
        "Zero alcohol tolerance on-shift",
        "Traditional discipline and respect for foremen",
        "Family-driven motivation (remittances home)"
      ],
      economicAdvantage: "Zero language barrier workforce. Earning 3.6× home wages guarantees strict work discipline.",
      flightCode: "TAS-KBP",
    },
    {
      id: "delhi",
      name: "New Delhi",
      country: "India",
      region: "South Asia // Skilled Industrial Pool",
      flag: "🇮🇳",
      code: "IN",
      hubType: "ACTIVE CORRIDOR",
      targetWageUA: "from 600 €",
      targetWageUAH: "~27,000 ₴ / mo",
      homeWage: "~160 €",
      homeWageUAH: "~7,200 ₴",
      wageMultiplier: "3.8× Higher",
      wageRatioNumber: 3.8,
      visaTime: "60–90 days (Type D Visa)",
      workSchedule: "Shift-based manufacturing operations",
      culturalTraits: [
        "English fluency + bilingual lead foremen",
        "High endurance for continuous production",
        "Strict adherence to QA/QC specifications"
      ],
      economicAdvantage: "Rates from 600 € reduce manufacturing payroll expenditures by up to 35–40%.",
      flightCode: "DEL-KBP",
    },
    {
      id: "almaty",
      name: "Almaty",
      country: "Kazakhstan",
      region: "Central Asia // Technical Sector",
      flag: "🇰🇿",
      code: "KZ",
      hubType: "ACTIVE CORRIDOR",
      targetWageUA: "from 950 €",
      targetWageUAH: "~42,750 ₴ / mo",
      homeWage: "~380 €",
      homeWageUAH: "~17,100 ₴",
      wageMultiplier: "2.5× Higher",
      wageRatioNumber: 2.5,
      visaTime: "30–45 calendar days",
      workSchedule: "8–10h shifts, European standard",
      culturalTraits: [
        "Fluent communication, 24h operational onboarding",
        "Experience in heavy industrial plants",
        "Strong technical background for CNC operators"
      ],
      economicAdvantage: "Qualified specialists for complex industrial lines with immediate operational readiness.",
      flightCode: "ALA-KBP",
    },
    {
      id: "dhaka",
      name: "Dhaka",
      country: "Bangladesh",
      region: "South Asia // Garment Powerhouse",
      flag: "🇧🇩",
      code: "BD",
      hubType: "ACTIVE CORRIDOR",
      targetWageUA: "from 600 €",
      targetWageUAH: "~27,000 ₴ / mo",
      homeWage: "~140 €",
      homeWageUAH: "~6,300 ₴",
      wageMultiplier: "4.2× Higher",
      wageRatioNumber: 4.2,
      visaTime: "60–90 days",
      workSchedule: "Fast-paced assembly, 6 days/week",
      culturalTraits: [
        "Global textile powerhouse: seamstresses with 7+ years tenure",
        "Sewing speed 1.5× higher than average industry benchmarks",
        "Strict adherence to factory shift protocols"
      ],
      economicAdvantage: "Top solution for apparel factories: reduces unit manufacturing labor costs by up to 40%.",
      flightCode: "DAC-KBP",
    },
    {
      id: "kathmandu",
      name: "Kathmandu",
      country: "Nepal",
      region: "South Asia // High Endurance Labor",
      flag: "🇳🇵",
      code: "NP",
      hubType: "ACTIVE CORRIDOR",
      targetWageUA: "from 650 €",
      targetWageUAH: "~29,250 ₴ / mo",
      homeWage: "~150 €",
      homeWageUAH: "~6,750 ₴",
      wageMultiplier: "4.0× Higher",
      wageRatioNumber: 4.0,
      visaTime: "60–85 days",
      workSchedule: "Heavy physical labor, outdoor sites",
      culturalTraits: [
        "Exceptional physical resilience in all weather conditions",
        "Peaceful, orderly cultural background",
        "Dedicated work ethic without complaints"
      ],
      economicAdvantage: "Closes critical staffing gaps in concrete construction and agro-processing operations.",
      flightCode: "KTM-KBP",
    },
    {
      id: "hanoi",
      name: "Hanoi",
      country: "Vietnam",
      region: "Southeast Asia // Precision Mechanics",
      flag: "🇻🇳",
      code: "VN",
      hubType: "ACTIVE CORRIDOR",
      targetWageUA: "from 700 €",
      targetWageUAH: "~31,500 ₴ / mo",
      homeWage: "~220 €",
      homeWageUAH: "~9,900 ₴",
      wageMultiplier: "3.2× Higher",
      wageRatioNumber: 3.2,
      visaTime: "60–80 days",
      workSchedule: "Cleanroom and electronics shift work",
      culturalTraits: [
        "High manual dexterity and precision for micro-assembly",
        "Strong enterprise loyalty and work ethic",
        "Fast learning of technical blueprints"
      ],
      economicAdvantage: "Ideal for precision engineering, wire harness assembly, and electronics.",
      flightCode: "HAN-KBP",
    },
    {
      id: "manila",
      name: "Manila",
      country: "Philippines",
      region: "Southeast Asia // Food Processing & Hospitality",
      flag: "🇵🇭",
      code: "PH",
      hubType: "ACTIVE CORRIDOR",
      targetWageUA: "from 750 €",
      targetWageUAH: "~33,750 ₴ / mo",
      homeWage: "~210 €",
      homeWageUAH: "~9,450 ₴",
      wageMultiplier: "3.5× Higher",
      wageRatioNumber: 3.5,
      visaTime: "60–90 days",
      workSchedule: "8–10h shifts, strict sanitation protocols",
      culturalTraits: [
        "Native English proficiency (official state language)",
        "High cleanliness, personal hygiene, and attention to HACCP",
        "Strong commitment to 2+ year international contracts"
      ],
      economicAdvantage: "Benchmark workforce for meat/food processing, cleanroom HACCP lines, and modern automated logistics.",
      flightCode: "MNL-KBP",
    },
  ],
};

interface InteractiveGlobe3DProps {
  locale?: string;
}

export const InteractiveGlobe3D: React.FC<InteractiveGlobe3DProps> = ({ locale = "uk" }) => {
  const currentLocale = (locale === "ru" || locale === "en") ? locale : "uk";
  const dossiers = useMemo(() => DOSSIERS[currentLocale] || DOSSIERS.uk, [currentLocale]);

  const [selectedHubId, setSelectedHubId] = useState<string>("tashkent");
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);

  // Active Dossier
  const activeDossier = useMemo(() => {
    return dossiers.find((d) => d.id === selectedHubId) || dossiers[2];
  }, [dossiers, selectedHubId]);

  const handleSelectCountry = (hubId: string) => {
    playMechanicalClick();
    setSelectedHubId(hubId);
  };

  const handleGlobeSelectHub = (hub: HubPoint) => {
    playSciFiBeep();
    setSelectedHubId(hub.id);
  };

  const toggleAutoRotate = () => {
    playMechanicalClick();
    setIsAutoRotate((prev) => !prev);
  };

  const scrollToCalculator = () => {
    playMechanicalClick();
    const el = document.getElementById("calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* 1. Country Selection Bar (Top Horizontal Pills) */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-500/30">
        <div className="flex items-center gap-2 min-w-max">
          {dossiers.map((d) => {
            const isSelected = d.id === selectedHubId;
            const isMoldova = d.id === "chisinau";
            const isKyiv = d.id === "kyiv";

            let activeBorder = "bg-amber-500/20 border-amber-400 text-white shadow-[0_0_20px_rgba(245,158,11,0.25)]";
            let pillBg = "bg-amber-500/40 text-amber-200";

            if (isKyiv) {
              activeBorder = "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]";
              pillBg = "bg-cyan-500/40 text-cyan-200";
            } else if (isMoldova) {
              activeBorder = "bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)]";
              pillBg = "bg-emerald-500/40 text-emerald-200";
            }

            return (
              <button
                key={d.id}
                onClick={() => handleSelectCountry(d.id)}
                className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-200 ${
                  isSelected
                    ? activeBorder
                    : "bg-slate-900/60 border-white/10 text-slate-400 hover:border-amber-500/40 hover:text-slate-200"
                }`}
              >
                <span className="text-base leading-none">{d.flag}</span>
                <span className="font-bold">{d.country}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isSelected ? pillBg : "bg-white/5 text-slate-400"
                }`}>
                  {d.targetWageUA}
                </span>
                {isSelected && (
                  <motion.div
                    layoutId="activeCountryGlow"
                    className="absolute inset-0 rounded-xl border-2 border-amber-400 pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Stage: Expansive Full-Width 3D Globe with Floating Frosted Glass HUD Card (Exact Match to Screenshot 2) */}
      <div className="relative w-full h-[620px] sm:h-[680px] lg:h-[740px] flex items-center justify-center overflow-visible">
        
        {/* The Giant 3D Three.js Globe filling the entire viewport with cyan atmosphere glow */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <DynamicThreeGlobe
            selectedHubId={selectedHubId}
            onSelectHub={handleGlobeSelectHub}
            isAutoRotate={isAutoRotate}
          />
        </div>

        {/* Minimalist Floating Camera & Playback Controls (Top Left of Globe) */}
        <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
          <button
            onClick={toggleAutoRotate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 border border-white/10 hover:border-amber-500/50 text-slate-300 hover:text-white backdrop-blur-xl text-[11px] font-mono transition-all shadow-xl"
            title={isAutoRotate ? "Пауза" : "Авто"}
          >
            {isAutoRotate ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isAutoRotate ? "Пауза" : "Авто"}</span>
          </button>
          <button
            onClick={() => handleSelectCountry("tashkent")}
            className="p-2 rounded-full bg-slate-950/80 border border-white/10 hover:border-amber-500/50 text-slate-300 hover:text-white backdrop-blur-xl transition-all shadow-xl"
            title="Скинути камеру"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Floating Frosted Glass HUD Card on the Upper Right (Exact Layout of Screenshot 2) */}
        <div className="absolute top-3 right-3 sm:top-6 sm:right-6 w-full max-w-[340px] sm:max-w-[370px] z-30 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDossier.id}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className="relative p-5 sm:p-6 rounded-2xl bg-slate-950/40 border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-4"
            >
              {/* Header: Title + Corridor Pill + Ellipsis */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl leading-none">{activeDossier.flag}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                      {activeDossier.country}
                    </h3>
                    <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Compass className="w-3 h-3 text-amber-400" />
                      <span>{activeDossier.name} // {activeDossier.flightCode}</span>
                    </div>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-mono font-bold tracking-wider ${
                  activeDossier.isMainHub 
                    ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-300"
                    : (activeDossier.isTransitHub
                        ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
                        : "bg-amber-500/20 border-amber-400/40 text-amber-300")
                }`}>
                  {activeDossier.isMainHub ? "ГОЛОВНИЙ ХАБ" : (activeDossier.isTransitHub ? "ТРАНЗИТ" : "АКТИВНИЙ")}
                </span>
              </div>

              {/* Salary Section (Matching Screenshot 2) */}
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase">
                  <span>Рівень оплати праці</span>
                  <span className="text-emerald-400 font-bold">{activeDossier.wageMultiplier}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight text-amber-400">
                    {activeDossier.targetWageUA}
                  </div>
                  <div className="text-right text-[11px] font-mono text-slate-400">
                    Вдома: <span className="text-slate-200 font-semibold">{activeDossier.homeWage}</span>
                  </div>
                </div>
              </div>

              {/* Compliance & Timeline Badges Row (Matching Screenshot 2) */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Гарантії та строки прибуття:</span>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left text-xs">
                    <div className="text-white font-bold font-mono">100% захист від мобілізації</div>
                    <div className="text-[10px] text-slate-400">ст. 23 ЗУ // Іноземні громадяни</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-left text-xs">
                    <div className="text-white font-bold font-mono">{activeDossier.visaTime}</div>
                    <div className="text-[10px] text-slate-400">Офіційна віза D та Дозвіл ДЦЗ</div>
                  </div>
                </div>
              </div>

              {/* Economic Advantage */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-300 leading-relaxed font-sans">
                <span className="text-amber-400 font-semibold">Перевага: </span>
                {activeDossier.economicAdvantage}
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex gap-2">
                <button
                  onClick={scrollToCalculator}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all duration-200"
                >
                  <span>Розрахувати квоту</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://t.me/recruiter_i_club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Консультація</span>
                </a>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
