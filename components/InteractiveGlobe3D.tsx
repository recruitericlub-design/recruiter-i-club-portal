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
  Banknote, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Plane,
  Compass,
  Building2,
  Users
} from "lucide-react";
import { playSciFiBeep, playMechanicalClick } from "@/lib/soundFX";
import { HUBS, HubPoint } from "./ThreeGlobeScene";

// Dynamically load ThreeGlobeScene with ssr: false so window/WebGL stays 100% client-side
const DynamicThreeGlobe = dynamic(
  () => import("./ThreeGlobeScene").then((mod) => mod.ThreeGlobeScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] flex flex-col items-center justify-center bg-[#020617]/90 rounded-2xl border border-white/5">
        <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-400 rounded-full animate-spin mb-4" />
        <div className="font-mono text-xs text-amber-400/90 tracking-widest uppercase">
          ЗАВАНТАЖЕННЯ 3D-СФЕРИ NASA ТА КОРДОНІВ...
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
      hubType: "ГОЛОВНИЙ B2B ХАБ // ЗАРАХУВАННЯ В ШТАТ",
      targetWageUA: "1 100 – 1 450 €",
      targetWageUAH: "48 000 – 65 000 ₴ / міс",
      homeWage: "Дефіцитний ринок",
      homeWageUAH: "Високий ризик мобілізації",
      wageMultiplier: "100% захист",
      wageRatioNumber: 1.0,
      visaTime: "0 днів (Оформлення на місці)",
      workSchedule: "Штатний розклад підприємства",
      culturalTraits: [
        "Рідна мова та спільні виробничі стандарти",
        "Швидка інтеграція в робочий колектив",
        "Проблема: щоденний ризик призову та дефіцит спеціалістів"
      ],
      economicAdvantage: "Пряме зарахування у штат українського ТОВ/ФОП. 100% імунітет від мобілізації для іноземного персоналу (ст. 23 ЗУ).",
      flightCode: "UA-HUB",
      isMainHub: true,
    },
    {
      id: "tashkent",
      name: "Ташкент",
      country: "Узбекистан",
      region: "Країни СНД // Центральна Азія",
      flag: "🇺🇿",
      code: "UZ",
      hubType: "КРАЇНИ СНД // БЕЗВІЗОВИЙ КОРИДОР",
      targetWageUA: "від 900 €",
      targetWageUAH: "~40 500 ₴ / міс",
      homeWage: "~250 € / міс",
      homeWageUAH: "~11 250 ₴",
      wageMultiplier: "в 3.6 раза вище",
      wageRatioNumber: 3.6,
      visaTime: "30–45 календарних днів",
      workSchedule: "Зміни по 10–12 годин, 6 днів/тижд",
      culturalTraits: [
        "Повна відсутність мовного бар'єра (вільна комунікація)",
        "Сухий закон: нульовий алкогольний фактор на зміні та в побуті",
        "Традиційна субординація та беззаперечна повага до бригадира",
        "Висока мотивація (надсилають дохід сім'ям вдома)"
      ],
      economicAdvantage: "Фахівці без мовного бар'єра. Заробіток у 3.6 раза вищий за домашній, що гарантує 100% старанність та мінімальну плинність кадрів.",
      flightCode: "TAS-KBP",
    },
    {
      id: "delhi",
      name: "Нью-Делі",
      country: "Індія",
      region: "Південна Азія // Технічний кластер",
      flag: "🇮🇳",
      code: "IN",
      hubType: "ПІВДЕННА АЗІЯ // ПРОМИСЛОВИЙ ПУЛ",
      targetWageUA: "від 600 €",
      targetWageUAH: "~27 000 ₴ / міс",
      homeWage: "~160 € / міс",
      homeWageUAH: "~7 200 ₴",
      wageMultiplier: "в 3.8 раза вище",
      wageRatioNumber: 3.8,
      visaTime: "60–90 днів (робоча віза D)",
      workSchedule: "Позмінний цеховий графік за техкартами",
      culturalTraits: [
        "Англійська мова + російськомовні старші бригадири",
        "Висока витримка при монотонній цеховій праці (зварювання, ЧПК)",
        "Суворе дотримання технологічних карт та інструкцій ВТК",
        "Миролюбний менталітет, порядок у гуртожитках"
      ],
      economicAdvantage: "Ставка від 600 € забезпечує українському заводу оптимізацію фонду оплати праці до 35–40% при вищій продуктивності праці.",
      flightCode: "DEL-KBP",
    },
    {
      id: "almaty",
      name: "Алмати",
      country: "Казахстан",
      region: "Центральна Азія // Інженерний сектор",
      flag: "🇰🇿",
      code: "KZ",
      hubType: "КРАЇНИ СНД // БЕЗВІЗОВИЙ КОРИДОР",
      targetWageUA: "від 950 €",
      targetWageUAH: "~42 750 ₴ / міс",
      homeWage: "~380 € / міс",
      homeWageUAH: "~17 100 ₴",
      wageMultiplier: "в 2.5 раза вище",
      wageRatioNumber: 2.5,
      visaTime: "30–45 календарних днів",
      workSchedule: "Зміни 8–10 годин, європейський графік",
      culturalTraits: [
        "Вільне володіння мовою, адаптація за 24 години",
        "Досвід на великих нафтогазових та металургійних заводах",
        "Висока інженерна підготовка операторів ЧПК та наладчиків"
      ],
      economicAdvantage: "Кваліфіковані кадри для складних технологічних ліній. Швидкий запуск без витрат часу на мовну адаптацію.",
      flightCode: "ALA-KBP",
    },
    {
      id: "dhaka",
      name: "Дакка",
      country: "Бангладеш",
      region: "Південна Азія // Текстиль & Будівництво",
      flag: "🇧🇩",
      code: "BD",
      hubType: "ТЕКСТИЛЬНИЙ ГІГАНТ // ШВЕЙНІ ЛІНІЇ",
      targetWageUA: "від 600 €",
      targetWageUAH: "~27 000 ₴ / міс",
      homeWage: "~140 € / міс",
      homeWageUAH: "~6 300 ₴",
      wageMultiplier: "в 4.2 раза вище",
      wageRatioNumber: 4.2,
      visaTime: "60–90 днів",
      workSchedule: "Потокові швидкісні лінії, 6 днів/тижд",
      culturalTraits: [
        "Світовий центр легкої промисловості — швачки з 7+ роками стажу",
        "Швидкість строчки в 1.5 раза перевищує середні норми",
        "Витривалість до монотонної конвеєрної роботи",
        "Невибагливість у побуті та висока трудова дисципліна"
      ],
      economicAdvantage: "Рішення №1 для швейних фабрик, що шиють спецодяг або амуніцію: собівартість пошиття знижується на 35–40%.",
      flightCode: "DAC-KBP",
    },
    {
      id: "kathmandu",
      name: "Катманду",
      country: "Непал",
      region: "Південна Азія // Фізична витривалість",
      flag: "🇳🇵",
      code: "NP",
      hubType: "БУДІВЕЛЬНИЙ & АГРАРНИЙ ПУЛ",
      targetWageUA: "від 650 €",
      targetWageUAH: "~29 250 ₴ / міс",
      homeWage: "~150 € / міс",
      homeWageUAH: "~6 750 ₴",
      wageMultiplier: "в 4.0 раза вище",
      wageRatioNumber: 4.0,
      visaTime: "60–85 днів",
      workSchedule: "Важка фізична праця, відкриті майданчики",
      culturalTraits: [
        "Виняткова фізична витривалість і стійкість до будь-якої погоди",
        "Буддійська культура: спокій, безконфліктність, порядок",
        "Працьовитість без нарікань на фізичні навантаження",
        "Згуртованість у бригадах, взаємодопомога"
      ],
      economicAdvantage: "Закривають найважчі ділянки на монолітному будівництві, бетонуванні та в агрокомплексах, де місцевий персонал відсутній.",
      flightCode: "KTM-KBP",
    },
    {
      id: "hanoi",
      name: "Ханой",
      country: "В'єтнам",
      region: "Південно-Східна Азія // Електроніка & Текстиль",
      flag: "🇻🇳",
      code: "VN",
      hubType: "ТОЧНА МЕХАНІКА & МІКРОПАЙКА",
      targetWageUA: "від 700 €",
      targetWageUAH: "~31 500 ₴ / міс",
      homeWage: "~220 € / міс",
      homeWageUAH: "~9 900 ₴",
      wageMultiplier: "в 3.2 раза вище",
      wageRatioNumber: 3.2,
      visaTime: "60–80 днів",
      workSchedule: "Позмінно, чисті цехи та лінії збірки",
      culturalTraits: [
        "Акуратність, моторика рук та уважність до мікродеталей",
        "Висока корпоративна лояльність і відданість роботі",
        "Швидке освоєння інструкцій та технологічних карт"
      ],
      economicAdvantage: "Ідеальний вибір для приладобудування, збірки електроніки, кабельних мереж та точного пошиття.",
      flightCode: "HAN-KBP",
    },
    {
      id: "manila",
      name: "Маніла",
      country: "Філіппіни",
      region: "Південно-Східна Азія // Сервіс & Харчопром",
      flag: "🇵🇭",
      code: "PH",
      hubType: "СТАНДАРТИ НАССР // АНГЛІЙСЬКА МОВА",
      targetWageUA: "від 750 €",
      targetWageUAH: "~33 750 ₴ / міс",
      homeWage: "~210 € / міс",
      homeWageUAH: "~9 450 ₴",
      wageMultiplier: "в 3.5 раза вище",
      wageRatioNumber: 3.5,
      visaTime: "60–90 днів",
      workSchedule: "Зміни по 8–10 годин, харчові регламенти",
      culturalTraits: [
        "Вільна розмовна англійська мова (державний статус)",
        "Вроджена охайність, перфекціонізм та дотримання санітарії",
        "Висока лояльність до роботодавця, контракти від 2 років"
      ],
      economicAdvantage: "Еталонний персонал для харчових комбінатів, ліній пакування HACCP та складських терміналів.",
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
      hubType: "ГЛАВНЫЙ B2B ХАБ // ЗАЧИСЛЕНИЕ В ШТАТ",
      targetWageUA: "1 100 – 1 450 €",
      targetWageUAH: "48 000 – 65 000 ₴ / мес",
      homeWage: "Дефицитный рынок",
      homeWageUAH: "Высокий риск мобилизации",
      wageMultiplier: "100% защита",
      wageRatioNumber: 1.0,
      visaTime: "0 дней (Оформление на месте)",
      workSchedule: "Штатное расписание завода",
      culturalTraits: [
        "Родной язык и общие стандарты производства",
        "Быстрая интеграция в трудовой коллектив",
        "Проблема: ежедневный риск мобилизации и дефицит специалистов"
      ],
      economicAdvantage: "Прямое зачисление в штат украинского предприятия. 100% иммунитет от призыва для иностранных граждан (ст. 23 ЗУ).",
      flightCode: "UA-HUB",
      isMainHub: true,
    },
    {
      id: "tashkent",
      name: "Ташкент",
      country: "Узбекистан",
      region: "Страны СНГ // Центральная Азия",
      flag: "🇺🇿",
      code: "UZ",
      hubType: "СТРАНЫ СНГ // БЕЗВИЗОВЫЙ КОРИДОР",
      targetWageUA: "от 900 €",
      targetWageUAH: "~40 500 ₴ / мес",
      homeWage: "~250 € / мес",
      homeWageUAH: "~11 250 ₴",
      wageMultiplier: "в 3.6 раза выше",
      wageRatioNumber: 3.6,
      visaTime: "30–45 календарных дней",
      workSchedule: "Смены по 10–12 часов, 6 дней в неделю",
      culturalTraits: [
        "Полное отсутствие языкового барьера (свободный русский)",
        "Сухой закон: нулевой алкогольный фактор на смене и в общежитии",
        "Традиционная дисциплина и беспрекословное уважение к бригадиру",
        "Высокая мотивация (отправляют заработок семьям)"
      ],
      economicAdvantage: "Специалисты без языкового барьера. Заработок в 3.6 раза выше домашнего гарантирует 100% усердие и нулевую текучесть кадров.",
      flightCode: "TAS-KBP",
    },
    {
      id: "delhi",
      name: "Нью-Дели",
      country: "Индия",
      region: "Южная Азия // Технический кластер",
      flag: "🇮🇳",
      code: "IN",
      hubType: "ЮЖНАЯ АЗИЯ // ПРОМЫШЛЕННЫЙ ПУЛ",
      targetWageUA: "от 600 €",
      targetWageUAH: "~27 000 ₴ / мес",
      homeWage: "~160 € / мес",
      homeWageUAH: "~7 200 ₴",
      wageMultiplier: "в 3.8 раза выше",
      wageRatioNumber: 3.8,
      visaTime: "60–90 дней (рабочая виза D)",
      workSchedule: "Посменный график по техкартам",
      culturalTraits: [
        "Английский язык + русскоговорящие старшие бригадиры",
        "Высокая выдержка при монотонном цеховом труде (сварка, ЧПУ)",
        "Строгое соблюдение регламентов ОТК и инструкций",
        "Миролюбивый менталитет, абсолютный порядок"
      ],
      economicAdvantage: "Ставка от 600 € обеспечивает украинскому заводу экономию фонда оплаты труда до 35–40% при высокой выработке.",
      flightCode: "DEL-KBP",
    },
    {
      id: "almaty",
      name: "Алматы",
      country: "Казахстан",
      region: "Центральная Азия // Инженерный сектор",
      flag: "🇰🇿",
      code: "KZ",
      hubType: "СТРАНЫ СНГ // БЕЗВИЗОВЫЙ КОРИДОР",
      targetWageUA: "от 950 €",
      targetWageUAH: "~42 750 ₴ / мес",
      homeWage: "~380 € / мес",
      homeWageUAH: "~17 100 ₴",
      wageMultiplier: "в 2.5 раза выше",
      wageRatioNumber: 2.5,
      visaTime: "30–45 календарных дней",
      workSchedule: "Смены 8–10 часов, европейский график",
      culturalTraits: [
        "Свободный язык, адаптация за 24 часа",
        "Опыт на крупных металлургических и машиностроительных заводах",
        "Высокая квалификация операторов ЧПУ и наладчиков"
      ],
      economicAdvantage: "Специалисты для сложных технологических линий. Быстрый запуск без затрат времени на адаптацию.",
      flightCode: "ALA-KBP",
    },
    {
      id: "dhaka",
      name: "Дакка",
      country: "Бангладеш",
      region: "Южная Азия // Текстиль & Строительство",
      flag: "🇧🇩",
      code: "BD",
      hubType: "ТЕКСТИЛЬНЫЙ ГИГАНТ // ШВЕЙНЫЕ ЛИНИИ",
      targetWageUA: "от 600 €",
      targetWageUAH: "~27 000 ₴ / мес",
      homeWage: "~140 € / мес",
      homeWageUAH: "~6 300 ₴",
      wageMultiplier: "в 4.2 раза выше",
      wageRatioNumber: 4.2,
      visaTime: "60–90 дней",
      workSchedule: "Поточные скоростные линии, 6 дней в неделю",
      culturalTraits: [
        "Мировой центр легкой промышленности — швеи со стажем 7+ лет",
        "Скорость строчки в 1.5 раза превышает средние нормы",
        "Выносливость к монотонной конвейерной работе",
        "Неприхотливость в быту и высокая трудовая дисциплина"
      ],
      economicAdvantage: "Решение №1 для швейных производств (спецодежда, амуниция): себестоимость пошива снижается на 35–40%.",
      flightCode: "DAC-KBP",
    },
    {
      id: "kathmandu",
      name: "Катманду",
      country: "Непал",
      region: "Южная Азия // Физическая выносливость",
      flag: "🇳🇵",
      code: "NP",
      hubType: "СТРОИТЕЛЬНЫЙ & АГРАРНЫЙ ПУЛ",
      targetWageUA: "от 650 €",
      targetWageUAH: "~29 250 ₴ / мес",
      homeWage: "~150 € / мес",
      homeWageUAH: "~6 750 ₴",
      wageMultiplier: "в 4.0 раза выше",
      wageRatioNumber: 4.0,
      visaTime: "60–85 дней",
      workSchedule: "Тяжелый физический труд, открытые площадки",
      culturalTraits: [
        "Исключительная физическая выносливость в любых погодных условиях",
        "Буддийская культура: спокойствие, бесконфликтность, порядок",
        "Трудолюбие без жалоб на нагрузки",
        "Сплоченность в бригадах, взаимопомощь"
      ],
      economicAdvantage: "Закрывают самые тяжелые участки на монолитном строительстве, дорожных работах и в агрокомплексах.",
      flightCode: "KTM-KBP",
    },
    {
      id: "hanoi",
      name: "Ханой",
      country: "Вьетнам",
      region: "Юго-Восточная Азия // Электроника & Текстиль",
      flag: "🇻🇳",
      code: "VN",
      hubType: "ТОЧНАЯ МЕХАНИКА & СБОРКА",
      targetWageUA: "от 700 €",
      targetWageUAH: "~31 500 ₴ / мес",
      homeWage: "~220 € / мес",
      homeWageUAH: "~9 900 ₴",
      wageMultiplier: "в 3.2 раза выше",
      wageRatioNumber: 3.2,
      visaTime: "60–80 дней",
      workSchedule: "Посменно, чистые цеха и конвейеры",
      culturalTraits: [
        "Аккуратность, мелкая моторика и внимание к деталям",
        "Высокая корпоративная дисциплина и преданность работе",
        "Быстрое освоение технологических карт"
      ],
      economicAdvantage: "Идеально для точной механики, пайки электроники, сборки кабельных сетей и швейных фабрик.",
      flightCode: "HAN-KBP",
    },
    {
      id: "manila",
      name: "Манила",
      country: "Филиппины",
      region: "Юго-Восточная Азия // Пищепром & Сервис",
      flag: "🇵🇭",
      code: "PH",
      hubType: "СТАНДАРТЫ НАССР // АНГЛИЙСКИЙ ЯЗЫК",
      targetWageUA: "от 750 €",
      targetWageUAH: "~33 750 ₴ / мес",
      homeWage: "~210 € / мес",
      homeWageUAH: "~9 450 ₴",
      wageMultiplier: "в 3.5 раза выше",
      wageRatioNumber: 3.5,
      visaTime: "60–90 дней",
      workSchedule: "Смены по 8–10 часов, регламенты НАССР",
      culturalTraits: [
        "Свободный английский язык (государственный статус)",
        "Врожденная чистоплотность и педантичность в санитарии",
        "Высокая лояльность к работодателю, долгосрочные контракты"
      ],
      economicAdvantage: "Персонал для пищевых производств, чистых цехов HACCP, сортировочных линий и складских терминалов.",
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
      hubType: "PRIMARY B2B DESTINATION // DIRECT PAYROLL",
      targetWageUA: "1,100 – 1,450 €",
      targetWageUAH: "48,000 – 65,000 ₴ / mo",
      homeWage: "High deficit",
      homeWageUAH: "High military draft risk",
      wageMultiplier: "100% Protection",
      wageRatioNumber: 1.0,
      visaTime: "0 days (Local placement)",
      workSchedule: "Enterprise standard operating shift",
      culturalTraits: [
        "Native language and shared operational culture",
        "Rapid team integration",
        "Challenge: severe labor deficit due to wartime conditions"
      ],
      economicAdvantage: "Direct enrollment onto Ukrainian entity payroll. 100% statutory military draft exemption for foreign workers (Art. 23 Law of Ukraine).",
      flightCode: "UA-HUB",
      isMainHub: true,
    },
    {
      id: "tashkent",
      name: "Tashkent",
      country: "Uzbekistan",
      region: "CIS Region // Central Asia",
      flag: "🇺🇿",
      code: "UZ",
      hubType: "CIS REGION // EXPEDITED CORRIDOR",
      targetWageUA: "from 900 €",
      targetWageUAH: "~40,500 ₴ / mo",
      homeWage: "~250 € / mo",
      homeWageUAH: "~11,250 ₴",
      wageMultiplier: "3.6× Higher",
      wageRatioNumber: 3.6,
      visaTime: "30–45 calendar days",
      workSchedule: "10–12h shifts, 6 days/week",
      culturalTraits: [
        "Zero language barrier (fluent Russian communication)",
        "Zero alcohol tolerance on-shift and in housing",
        "Traditional discipline and respect for foremen",
        "Family-driven motivation (remittances home)"
      ],
      economicAdvantage: "Zero language barrier workforce. Earning 3.6× home wages guarantees strict work discipline and near-zero turnover.",
      flightCode: "TAS-KBP",
    },
    {
      id: "delhi",
      name: "New Delhi",
      country: "India",
      region: "South Asia // Industrial Engineering Cluster",
      flag: "🇮🇳",
      code: "IN",
      hubType: "SOUTH ASIA // SKILLED INDUSTRIAL POOL",
      targetWageUA: "from 600 €",
      targetWageUAH: "~27,000 ₴ / mo",
      homeWage: "~160 € / mo",
      homeWageUAH: "~7,200 ₴",
      wageMultiplier: "3.8× Higher",
      wageRatioNumber: 3.8,
      visaTime: "60–90 days (Type D Work Visa)",
      workSchedule: "Shift-based manufacturing operations",
      culturalTraits: [
        "English fluency + bilingual lead foremen",
        "High endurance for continuous production (welding, CNC)",
        "Strict adherence to QA/QC specifications and safety cards",
        "Peaceful mindset, exemplary dormitory order"
      ],
      economicAdvantage: "Rates from 600 € reduce manufacturing payroll expenditures by up to 35–40% while sustaining high production throughput.",
      flightCode: "DEL-KBP",
    },
    {
      id: "almaty",
      name: "Almaty",
      country: "Kazakhstan",
      region: "Central Asia // Technical Sector",
      flag: "🇰🇿",
      code: "KZ",
      hubType: "CIS REGION // EXPEDITED CORRIDOR",
      targetWageUA: "from 950 €",
      targetWageUAH: "~42,750 ₴ / mo",
      homeWage: "~380 € / mo",
      homeWageUAH: "~17,100 ₴",
      wageMultiplier: "2.5× Higher",
      wageRatioNumber: 2.5,
      visaTime: "30–45 calendar days",
      workSchedule: "8–10h shifts, European standard",
      culturalTraits: [
        "Fluent communication, 24h operational onboarding",
        "Experience in heavy industrial plants and machining",
        "Strong technical background for CNC operators"
      ],
      economicAdvantage: "Qualified specialists for complex industrial lines with immediate operational readiness.",
      flightCode: "ALA-KBP",
    },
    {
      id: "dhaka",
      name: "Dhaka",
      country: "Bangladesh",
      region: "South Asia // Textile & Construction",
      flag: "🇧🇩",
      code: "BD",
      hubType: "TEXTILE GIANT // GARMENT LINES",
      targetWageUA: "from 600 €",
      targetWageUAH: "~27,000 ₴ / mo",
      homeWage: "~140 € / mo",
      homeWageUAH: "~6,300 ₴",
      wageMultiplier: "4.2× Higher",
      wageRatioNumber: 4.2,
      visaTime: "60–90 days",
      workSchedule: "Fast-paced assembly, 6 days/week",
      culturalTraits: [
        "Global textile powerhouse: seamstresses with 7+ years tenure",
        "Sewing speed 1.5× higher than average industry benchmarks",
        "High stamina for repetitive manufacturing",
        "Strict adherence to factory shift protocols"
      ],
      economicAdvantage: "Top solution for apparel and tactical gear factories: reduces unit manufacturing labor costs by up to 40%.",
      flightCode: "DAC-KBP",
    },
    {
      id: "kathmandu",
      name: "Kathmandu",
      country: "Nepal",
      region: "South Asia // High Endurance Labor",
      flag: "🇳🇵",
      code: "NP",
      hubType: "CONSTRUCTION & AGRICULTURAL CORRIDOR",
      targetWageUA: "from 650 €",
      targetWageUAH: "~29,250 ₴ / mo",
      homeWage: "~150 € / mo",
      homeWageUAH: "~6,750 ₴",
      wageMultiplier: "4.0× Higher",
      wageRatioNumber: 4.0,
      visaTime: "60–85 days",
      workSchedule: "Heavy physical labor, outdoor sites",
      culturalTraits: [
        "Exceptional physical resilience in all weather conditions",
        "Peaceful, orderly cultural background",
        "Dedicated work ethic without complaints on workload",
        "Strong team cohesiveness"
      ],
      economicAdvantage: "Closes critical staffing gaps in concrete construction, groundwork, and agro-processing operations.",
      flightCode: "KTM-KBP",
    },
    {
      id: "hanoi",
      name: "Hanoi",
      country: "Vietnam",
      region: "Southeast Asia // Precision Manufacturing",
      flag: "🇻🇳",
      code: "VN",
      hubType: "PRECISION MECHANICS & ASSEMBLY",
      targetWageUA: "from 700 €",
      targetWageUAH: "~31,500 ₴ / mo",
      homeWage: "~220 € / mo",
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
      economicAdvantage: "Ideal for precision engineering, wire harness assembly, electronics, and technical textiles.",
      flightCode: "HAN-KBP",
    },
    {
      id: "manila",
      name: "Manila",
      country: "Philippines",
      region: "Southeast Asia // Food Processing & Hospitality",
      flag: "🇵🇭",
      code: "PH",
      hubType: "HACCP STANDARDS // ENGLISH FLUENCY",
      targetWageUA: "from 750 €",
      targetWageUAH: "~33,750 ₴ / mo",
      homeWage: "~210 € / mo",
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
    return dossiers.find((d) => d.id === selectedHubId) || dossiers[1];
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
      {/* 1. Country Selection Bar */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-500/30">
        <div className="flex items-center gap-2 min-w-max">
          {dossiers.map((d) => {
            const isSelected = d.id === selectedHubId;
            return (
              <button
                key={d.id}
                onClick={() => handleSelectCountry(d.id)}
                className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono transition-all duration-200 ${
                  isSelected
                    ? "bg-amber-500/20 border-amber-400 text-white shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                    : "bg-slate-900/70 border-white/10 text-slate-400 hover:border-amber-500/40 hover:text-slate-200"
                }`}
              >
                <span className="text-base">{d.flag}</span>
                <span className="font-bold">{d.country}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isSelected ? "bg-amber-500/40 text-amber-200" : "bg-white/5 text-slate-400"
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

      {/* 2. Main Visual Canvas + Dossier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left / Center: The 3D Three.js Globe */}
        <div className="lg:col-span-7 xl:col-span-7 relative rounded-2xl bg-gradient-to-b from-slate-900/60 to-[#020617] border border-white/10 p-2 sm:p-4 overflow-hidden backdrop-blur-md shadow-2xl">
          
          {/* Top Status Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-bold tracking-wider">3D WEBGL ENGINE // NASA NIGHT LIGHTS</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleAutoRotate}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-white/10 hover:border-amber-500/50 text-slate-300 hover:text-white transition-colors"
                title={isAutoRotate ? "Зупинити обертання" : "Увімкнути автообертання"}
              >
                {isAutoRotate ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isAutoRotate ? "Пауза" : "Автообертання"}</span>
              </button>
              <button
                onClick={() => handleSelectCountry("tashkent")}
                className="p-1.5 rounded-lg bg-slate-800/80 border border-white/10 hover:border-amber-500/50 text-slate-300 hover:text-white transition-colors"
                title="Скинути камеру"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Three.js Globe Render Container */}
          <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] flex items-center justify-center">
            <DynamicThreeGlobe
              selectedHubId={selectedHubId}
              onSelectHub={handleGlobeSelectHub}
              isAutoRotate={isAutoRotate}
            />
          </div>

          {/* Bottom Telemetry Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 border-t border-white/10 font-mono text-[10px] text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">ПОЛІГОНИ GEOJSON:</span>
              <span>177 держав світу з акцентом на активні коридори найму</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>ДЦЗ & Робочі візи D</span>
            </div>
          </div>
        </div>

        {/* Right: The Luxury B2B Dossier Card (Matching the Generated Mockup) */}
        <div className="lg:col-span-5 xl:col-span-5 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDossier.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl shadow-2xl space-y-6"
            >
              {/* Header: Flag, Country, Capital, Corridor Badge */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{activeDossier.flag}</span>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">
                        {activeDossier.country}
                      </h3>
                      <div className="font-mono text-xs text-amber-400 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        <span>{activeDossier.name} // {activeDossier.flightCode}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-[11px] font-bold tracking-wider">
                  {activeDossier.isMainHub ? "ГОЛОВНИЙ ХАБ" : "АКТИВНИЙ КОРИДОР"}
                </span>
              </div>

              {/* Main Salary Telemetry Box (Concept Highlight) */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 border border-amber-500/30 space-y-3">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Рівень заробітної плати в Україні</span>
                  <span className="text-emerald-400 font-bold">{activeDossier.wageMultiplier}</span>
                </div>

                <div className="flex items-baseline gap-3">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight text-amber-400">
                    {activeDossier.targetWageUA}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    ({activeDossier.targetWageUAH})
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-400">
                  <span>Дохід на батьківщині:</span>
                  <span className="text-slate-300 font-bold">{activeDossier.homeWage} ({activeDossier.homeWageUAH})</span>
                </div>
              </div>

              {/* Recruitment Telemetry 3-col Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 space-y-1">
                  <div className="font-mono text-[10px] text-slate-400 uppercase flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Строки прибуття</span>
                  </div>
                  <div className="text-xs font-bold text-white font-mono">
                    {activeDossier.visaTime}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 space-y-1">
                  <div className="font-mono text-[10px] text-slate-400 uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Імунітет від призову</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-300 font-mono">
                    100% (ст. 23 ЗУ)
                  </div>
                </div>
              </div>

              {/* Cultural Adaptation & Work Ethic Checklist */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-slate-300 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Культурні особливості та дисципліна:</span>
                </div>
                <div className="space-y-2">
                  {activeDossier.culturalTraits.map((trait, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Economic Advantage Note */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-slate-400 leading-relaxed font-sans">
                <span className="text-amber-300 font-semibold">Економічна перевага: </span>
                {activeDossier.economicAdvantage}
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={scrollToCalculator}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all duration-200"
                >
                  <span>Розрахувати квоту</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://t.me/recruiter_i_club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors"
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
