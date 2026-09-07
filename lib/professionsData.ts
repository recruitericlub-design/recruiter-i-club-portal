export interface DeficientProfession {
  id: string;
  slug: string;
  industryId: "metal" | "construction" | "logistics" | "textile" | "food" | "agro";
  industryName: {
    uk: string;
    ru: string;
    en: string;
  };
  title: {
    uk: string;
    ru: string;
    en: string;
  };
  shortDesc: {
    uk: string;
    ru: string;
    en: string;
  };
  shiftOutputNorm: {
    uk: string;
    ru: string;
    en: string;
  };
  standards: string;
  deliveryTime: {
    uk: string;
    ru: string;
    en: string;
  };
  salaryBenchmark: {
    uk: string;
    ru: string;
    en: string;
  };
  experienceYears: number;
  demandPercentage: number;
  testDetails: {
    uk: string;
    ru: string;
    en: string;
  };
  skillsList: string[];
}

export const DEFICIENT_PROFESSIONS: DeficientProfession[] = [
  // 1. Heavy Industry & Metal
  {
    id: "prof-1",
    slug: "welders-mig-mag",
    industryId: "metal",
    industryName: {
      uk: "Металообробка та Машинобудування",
      ru: "Металлообработка и Машиностроение",
      en: "Metalworking & Heavy Machinery",
    },
    title: {
      uk: "Зварювальники MIG/MAG 135/136",
      ru: "Сварщики MIG/MAG 135/136",
      en: "MIG/MAG 135/136 Welders",
    },
    shortDesc: {
      uk: "Напівавтоматичне зварювання сталевих конструкцій під рентген-контроль та ультразвукову дефектоскопію.",
      ru: "Полуавтоматическая сварка стальных конструкций под рентген-контроль и ультразвук.",
      en: "Semi-automatic welding of structural steel with mandatory X-ray and ultrasonic testing.",
    },
    shiftOutputNorm: {
      uk: "18–25 погонних метрів безперервного якісного шва за 8-годинну зміну",
      ru: "18–25 погонных метров качественного шва за 8-часовую смену",
      en: "18–25 linear meters of defect-free weld per 8-hour shift",
    },
    standards: "ISO 9606-1, EN 287-1, AWS D1.1",
    deliveryTime: {
      uk: "1–2 міс. (Узбекистан) / 3–4 міс. (Індія)",
      ru: "1–2 мес. (Узбекистан) / 3–4 мес. (Индия)",
      en: "1–2 mo. (Uzbekistan) / 3–4 mo. (India)",
    },
    salaryBenchmark: {
      uk: "28 000 – 42 000 грн/міс",
      ru: "28 000 – 42 000 грн/мес",
      en: "28,000 – 42,000 UAH/mo",
    },
    experienceYears: 4,
    demandPercentage: 99,
    testDetails: {
      uk: "Практичний тест у Делі: зварювання стикових та таврових з'єднань під тиском 25 бар.",
      ru: "Практический тест в Дели: сварка стыковых соединений под давлением 25 бар.",
      en: "Practical testing in Delhi: butt and T-joint welding certified up to 25 bar pressure.",
    },
    skillsList: ["Креслення КМД", "MIG/MAG 135/136", "Напівавтомат", "Контроль геометрії"],
  },
  {
    id: "prof-2",
    slug: "tig-argon-welders",
    industryId: "metal",
    industryName: {
      uk: "Металообробка та Машинобудування",
      ru: "Металлообработка и Машиностроение",
      en: "Metalworking & Heavy Machinery",
    },
    title: {
      uk: "Зварювальники TIG 141 (Аргон)",
      ru: "Сварщики TIG 141 (Аргон)",
      en: "TIG 141 Argon Welders",
    },
    shortDesc: {
      uk: "Аргонодугове зварювання нержавіючої сталі, титану та алюмінію для трубопроводів високого тиску.",
      ru: "Аргонодуговая сварка нержавеющей стали и алюминия для трубопроводов высокого давления.",
      en: "TIG argon arc welding of stainless steel and aluminum for high-pressure pipe systems.",
    },
    shiftOutputNorm: {
      uk: "12–16 зварних стиків труб діаметром 50–150 мм під 100% гідровипробування",
      ru: "12–16 сварных стыков труб 50–150 мм под 100% гидроиспытания",
      en: "12–16 pipe welded joints (50–150 mm) under 100% hydrotesting",
    },
    standards: "ISO 9606-2, ASME IX",
    deliveryTime: {
      uk: "1–2 міс. (Узбекистан) / 3–4 міс. (Індія)",
      ru: "1–2 мес. (Узбекистан) / 3–4 мес. (Индия)",
      en: "1–2 mo. (Uzbekistan) / 3–4 mo. (India)",
    },
    salaryBenchmark: {
      uk: "32 000 – 48 000 грн/міс",
      ru: "32 000 – 48 000 грн/мес",
      en: "32,000 – 48,000 UAH/mo",
    },
    experienceYears: 5,
    demandPercentage: 98,
    testDetails: {
      uk: "Тестовий зварний стик нержавіючої труби під рентгенівський знімок у нашій лабораторії.",
      ru: "Тестовый стык нержавеющей трубы под рентгеновский снимок в лаборатории.",
      en: "Stainless steel test weld checked via full X-ray radiography in our partner lab.",
    },
    skillsList: ["TIG 141", "Нержавіюча сталь", "Трубопроводи тиску", "Рентген-контроль"],
  },
  {
    id: "prof-3",
    slug: "cnc-operators",
    industryId: "metal",
    industryName: {
      uk: "Металообробка та Машинобудування",
      ru: "Металлообработка и Машиностроение",
      en: "Metalworking & Heavy Machinery",
    },
    title: {
      uk: "Оператори та налагоджувальники верстатів ЧПК",
      ru: "Операторы станков с ЧПУ",
      en: "CNC Machine Operators & Setters",
    },
    shortDesc: {
      uk: "Фрезерні та токарні 3–5 осьові обробні центри з числовим програмним керуванням (Fanuc, Siemens, Heidenhain).",
      ru: "Фрезерные и токарные 3–5 осевые центры с ЧПУ (Fanuc, Siemens, Heidenhain).",
      en: "3-5 axis milling and turning CNC machining centers with Fanuc, Siemens, Heidenhain.",
    },
    shiftOutputNorm: {
      uk: "Нульовий відсоток браку (допуск до 0.01 мм), обслуговування 2 верстатів одночасно",
      ru: "Нулевой брак (допуск до 0.01 мм), обслуживание 2 станков одновременно",
      en: "Zero defect tolerance (down to 0.01 mm), operating 2 machines concurrently",
    },
    standards: "DIN ISO 286, ISO 9001",
    deliveryTime: {
      uk: "1–2 міс. (Узбекистан) / 3–4 міс. (Індія)",
      ru: "1–2 мес. (Узбекистан) / 3–4 мес. (Индия)",
      en: "1–2 mo. (Uzbekistan) / 3–4 mo. (India)",
    },
    salaryBenchmark: {
      uk: "30 000 – 45 000 грн/міс",
      ru: "30 000 – 45 000 грн/мес",
      en: "30,000 – 45,000 UAH/mo",
    },
    experienceYears: 4,
    demandPercentage: 99,
    testDetails: {
      uk: "Самостійне налаштування нульової точки деталі та виточування контрольного валу за кресленням.",
      ru: "Настройка нулевой точки и выточка контрольного вала по чертежу.",
      en: "Independent workpiece zero-point setup and precision shaft machining from blue-prints.",
    },
    skillsList: ["Fanuc / Siemens", "G-код", "Штангенциркуль / Мікрометр", "3-5 осей"],
  },

  // 2. Construction
  {
    id: "prof-4",
    slug: "monolith-reinforcement",
    industryId: "construction",
    industryName: {
      uk: "Будівництво та Девелопмент",
      ru: "Строительство и Девелопмент",
      en: "Construction & Infrastructure",
    },
    title: {
      uk: "Арматурники та Бетонники (Моноліт)",
      ru: "Арматурщики и Бетонщики (Монолит)",
      en: "Monolithic Reinforcement & Concrete Workers",
    },
    shortDesc: {
      uk: "В'язання каркасів перекриттів, колон, фундаментних плит та прийом бетону з віброущільненням.",
      ru: "Вязка каркасов перекрытий, колонн и прием бетона с виброуплотнением.",
      en: "Rebar tying for slabs, columns, foundations, and high-volume concrete pouring.",
    },
    shiftOutputNorm: {
      uk: "1.2–1.8 тонни зв'язаної арматури на особу або 8–12 м³ укладеного бетону за зміну",
      ru: "1.2–1.8 тонны связанной арматуры на человека или 8–12 м³ бетона за смену",
      en: "1.2–1.8 tons of tied rebar per worker or 8–12 m³ poured concrete per shift",
    },
    standards: "ДБН В.2.6-98:2009, Eurocode 2",
    deliveryTime: {
      uk: "1–2 міс. (Узбекистан) / 3–4 міс. (Непал/Індія)",
      ru: "1–2 мес. (Узбекистан) / 3–4 мес. (Непал/Индия)",
      en: "1–2 mo. (Uzbekistan) / 3–4 mo. (Nepal/India)",
    },
    salaryBenchmark: {
      uk: "25 000 – 38 000 грн/міс",
      ru: "25 000 – 38 000 грн/мес",
      en: "25,000 – 38,000 UAH/mo",
    },
    experienceYears: 3,
    demandPercentage: 97,
    testDetails: {
      uk: "Тест на швидкість в'язання гачком та пістолетом, читання арматурних карт пілонів.",
      ru: "Тест на скорость вязки крючком, чтение арматурных карт пилонов.",
      en: "Speed test of hook & gun rebar tying, reinforcement diagram reading.",
    },
    skillsList: ["В'язання гачком", "Опалубка Doka/Peri", "Глибинний вібратор", "Креслення АР/КЖ"],
  },
  {
    id: "prof-5",
    slug: "steel-structure-installers",
    industryId: "construction",
    industryName: {
      uk: "Будівництво та Девелопмент",
      ru: "Строительство и Девелопмент",
      en: "Construction & Infrastructure",
    },
    title: {
      uk: "Монтажники металоконструкцій та покрівлі",
      ru: "Монтажники металлоконструкций и кровли",
      en: "Structural Steel & Cladding Installers",
    },
    shortDesc: {
      uk: "Монтаж каркасів ангарів, логістичних терміналів, сендвіч-панелей та профнастилу на висоті.",
      ru: "Монтаж каркасов ангаров, логистических терминалов и сэндвич-панелей на высоте.",
      en: "Erection of steel frames for warehouses, terminals, insulated sandwich panels, and cladding.",
    },
    shiftOutputNorm: {
      uk: "40–60 м² змонтованих сендвіч-панелей або до 3.5 тонн металоконструкцій на ланку",
      ru: "40–60 м² смонтированных сэндвич-панелей на звено за смену",
      en: "40–60 m² of installed sandwich panels or up to 3.5 tons of steel frame per team",
    },
    standards: "ДБН В.2.6-198:2014",
    deliveryTime: {
      uk: "1–2 міс. (Узбекистан) / 3–4 міс. (Індія)",
      ru: "1–2 мес. (Узбекистан) / 3–4 мес. (Индия)",
      en: "1–2 mo. (Uzbekistan) / 3–4 mo. (India)",
    },
    salaryBenchmark: {
      uk: "28 000 – 42 000 грн/міс",
      ru: "28 000 – 42 000 грн/мес",
      en: "28,000 – 42,000 UAH/mo",
    },
    experienceYears: 4,
    demandPercentage: 96,
    testDetails: {
      uk: "Допуски до висотних робіт, робота з монтажними люльками та лазерними нівелірами.",
      ru: "Высотные допуски, работа с люльками и лазерными нивелирами.",
      en: "Working-at-height safety certification, cradle rigging, and laser alignment.",
    },
    skillsList: ["Сендвіч-панелі", "Висотний монтаж", "Болтові з'єднання", "Нівелювання"],
  },

  // 3. Logistics & Warehousing
  {
    id: "prof-6",
    slug: "truck-drivers-ce",
    industryId: "logistics",
    industryName: {
      uk: "Логістика та Склади класу А",
      ru: "Логистика и Склады класса А",
      en: "Logistics & Fleet Transport",
    },
    title: {
      uk: "Водії вантажних авто (Категорії C, C+E)",
      ru: "Водители грузовиков (Категории C, C+E)",
      en: "Heavy Truck Drivers (Category C, C+E)",
    },
    shortDesc: {
      uk: "Міжміські перевезення тягачами 20т (Scania, MAN, Volvo), самоскиди та тентовані напівпричепи.",
      ru: "Магистральные перевозки тягачами 20т (Scania, MAN, Volvo), самосвалы и полуприцепы.",
      en: "Long-haul 20t truck drivers (Scania, MAN, Volvo), tippers, and curtain-side trailers.",
    },
    shiftOutputNorm: {
      uk: "Суворе дотримання режиму праці й відпочинку та нормативів витрати пального (до 29л/100км)",
      ru: "Соблюдение тахографа и нормы расхода топлива до 29л/100км",
      en: "Digital tachograph compliance and optimized fuel consumption below 29L/100km",
    },
    standards: "Європейські ліцензії, Код 95 (підтверджений аналог)",
    deliveryTime: {
      uk: "1–2 міс. (Узбекистан, Казахстан)",
      ru: "1–2 мес. (Узбекистан, Казахстан)",
      en: "1–2 mo. (Uzbekistan, Kazakhstan)",
    },
    salaryBenchmark: {
      uk: "35 000 – 55 000 грн/міс",
      ru: "35 000 – 55 000 грн/мес",
      en: "35,000 – 55,000 UAH/mo",
    },
    experienceYears: 5,
    demandPercentage: 100,
    testDetails: {
      uk: "Практичний екзамен з маневрування автопоїзда заднім ходом у рампу за 90 секунд.",
      ru: "Практический экзамен маневрирования задним ходом в рампу за 90 сек.",
      en: "Practical reverse ramp-docking test with 40ft semi-trailer in under 90 seconds.",
    },
    skillsList: ["Категорія C+E", "Цифровий тахограф", "Euro-5/6 тягачі", "Кріплення вантажів"],
  },
  {
    id: "prof-7",
    slug: "forklift-drivers-reach",
    industryId: "logistics",
    industryName: {
      uk: "Логістика та Склади класу А",
      ru: "Логистика и Склады класса А",
      en: "Logistics & Fleet Transport",
    },
    title: {
      uk: "Водії річтраків High Reach (до 12 м)",
      ru: "Водители ричтраков High Reach (до 12 м)",
      en: "High Reach Forklift Operators (up to 12m)",
    },
    shortDesc: {
      uk: "Робота у вузькопрохідних стелажних зонах складів класу А, точне розміщення палет на 6–8 яруси.",
      ru: "Работа в узкопроходных зонах складов класса А, ярусность 6–8 этажей.",
      en: "Narrow-aisle racking operations in Class A logistics hubs, placing pallets up to 12 meters.",
    },
    shiftOutputNorm: {
      uk: "120–160 переміщених та верифікованих палет за зміну без пошкодження упаковки",
      ru: "120–160 перемещенных паллет за смену без повреждений",
      en: "120–160 verified pallet moves per shift with zero package damage",
    },
    standards: "ISO 3691-1, WMS Scanner Certified",
    deliveryTime: {
      uk: "1–2 міс. (Узбекистан) / 3–4 міс. (Індія/Філіппіни)",
      ru: "1–2 мес. (Узбекистан) / 3–4 мес. (Индия/Филиппины)",
      en: "1–2 mo. (Uzbekistan) / 3–4 mo. (India/Philippines)",
    },
    salaryBenchmark: {
      uk: "24 000 – 35 000 грн/міс",
      ru: "24 000 – 35 000 грн/мес",
      en: "24,000 – 35,000 UAH/mo",
    },
    experienceYears: 3,
    demandPercentage: 98,
    testDetails: {
      uk: "Тест на зняття палети вагою 800 кг з висоти 10.5 метрів у коридорі шириною 2.8 метра.",
      ru: "Тест на снятие паллеты 800 кг с высоты 10.5 м в коридоре 2.8 м.",
      en: "Test picking of an 800 kg pallet from 10.5m height inside a 2.8m narrow aisle.",
    },
    skillsList: ["Річтрак 12м", "WMS сканер", "Склади класу А", "Палетний облік"],
  },

  // 4. Light Industry & Textile
  {
    id: "prof-8",
    slug: "industrial-seamstresses",
    industryId: "textile",
    industryName: {
      uk: "Легка промисловість та Текстиль",
      ru: "Легкая промышленность и Текстиль",
      en: "Textile & Garment Manufacturing",
    },
    title: {
      uk: "Швачки промислових потокових ліній",
      ru: "Швеи промышленных поточных линий",
      en: "Industrial Garment Assembly Seamstresses",
    },
    shortDesc: {
      uk: "Масове пошиття військової форми, спецтранспорту, медичного та повсякденного трикотажу на оверлоках.",
      ru: "Пошив военной формы, спецодежды, трикотажа на оверлоках.",
      en: "High-volume sewing of tactical apparel, workwear, and knitwear on industrial overlocks.",
    },
    shiftOutputNorm: {
      uk: "120–150 готових виробів або 450–600 вузлових операцій за 8-годинну зміну",
      ru: "120–150 готовых изделий или 450–600 узловых операций за смену",
      en: "120–150 finished garments or 450–600 sub-operations per 8-hour shift",
    },
    standards: "Juki / Brother Standard Operator Card",
    deliveryTime: {
      uk: "3–4 міс. (Бангладеш, Індія) / 1–2 міс. (Узбекистан)",
      ru: "3–4 мес. (Бангладеш, Индия) / 1–2 мес. (Узбекистан)",
      en: "3–4 mo. (Bangladesh, India) / 1–2 mo. (Uzbekistan)",
    },
    salaryBenchmark: {
      uk: "22 000 – 32 000 грн/міс",
      ru: "22 000 – 32 000 грн/мес",
      en: "22,000 – 32,000 UAH/mo",
    },
    experienceYears: 4,
    demandPercentage: 99,
    testDetails: {
      uk: "Тест у Дакці: прострочка кишені та комірця за хронометражем (до 45 секунд/деталь).",
      ru: "Тест в Дакке: вшивание кармана и воротника за 45 секунд.",
      en: "Practical test in Dhaka: pocket stitching and collar attachment under 45 seconds.",
    },
    skillsList: ["Оверлок 4/5 ниток", "Прямострочка", "Тактичний одяг", "Швидкісний потік"],
  },

  // 5. Food Processing
  {
    id: "prof-9",
    slug: "meat-deboners",
    industryId: "food",
    industryName: {
      uk: "Харчова промисловість & М'ясопереробка",
      ru: "Пищевая промышленность и Мясопереработка",
      en: "Food Processing & Meat Plants",
    },
    title: {
      uk: "Обвалювальники та Жилувальники м'яса",
      ru: "Обвальщики и Жиловщики мяса",
      en: "Industrial Meat Deboners & Trimmers",
    },
    shortDesc: {
      uk: "Обвалювання яловичини, свинини та птиці на сучасних конвеєрах м'ясокомбінатів (температура +4°C).",
      ru: "Обвалка говядины, свинины и птицы на конвейерах при температуре +4°C.",
      en: "Deboning of beef, pork, and poultry on industrial conveyors under +4°C cold chain.",
    },
    shiftOutputNorm: {
      uk: "1.4–1.8 тонни сировини за зміну з нормативом чистоти кістки понад 99.2%",
      ru: "1.4–1.8 тонны сырья за смену с чистотой кости свыше 99.2%",
      en: "1.4–1.8 tons of meat deboned per shift with bone clearance exceeding 99.2%",
    },
    standards: "HACCP, ISO 22000",
    deliveryTime: {
      uk: "3–4 міс. (Індія, Непал) / 1–2 міс. (Узбекистан)",
      ru: "3–4 мес. (Индия, Непал) / 1–2 мес. (Узбекистан)",
      en: "3–4 mo. (India, Nepal) / 1–2 mo. (Uzbekistan)",
    },
    salaryBenchmark: {
      uk: "26 000 – 38 000 грн/міс",
      ru: "26 000 – 38 000 грн/мес",
      en: "26,000 – 38,000 UAH/mo",
    },
    experienceYears: 4,
    demandPercentage: 97,
    testDetails: {
      uk: "Обвалювання лопаткової частини яловичини за 3.5 хвилини зі збереженням анатомічної цілісності м'язів.",
      ru: "Обвалка лопатки говядины за 3.5 мин без повреждения мякоти.",
      en: "Complete shoulder deboning test within 3.5 minutes keeping anatomical muscle integrity.",
    },
    skillsList: ["HACCP", "Обвалювальні ножі", "Кольчужні рукавиці", "Холодний цех +4°C"],
  },

  // 6. Agriculture
  {
    id: "prof-10",
    slug: "tractor-combine-operators",
    industryId: "agro",
    industryName: {
      uk: "Агропромисловий комплекс",
      ru: "Агропромышленный комплекс",
      en: "Agribusiness & Farm Machinery",
    },
    title: {
      uk: "Трактористи-механізатори (John Deere, Claas)",
      ru: "Трактористы-механизаторы (John Deere, Claas)",
      en: "Tractor & Combine Harvester Operators",
    },
    shortDesc: {
      uk: "Оранка, посівна та збір урожаю на важких енергонасичених тракторах з GPS-автопілотами.",
      ru: "Пахота, посевная и сбор урожая на тяжелых тракторах с GPS-автопилотами.",
      en: "Tillage, seeding, and harvesting operations on heavy GPS auto-steer tractors.",
    },
    shiftOutputNorm: {
      uk: "35–50 гектарів обробленої площі за 12-годинну зміну з дотриманням глибини висіву",
      ru: "35–50 гектаров обработанной площади за 12-часовую смену",
      en: "35–50 hectares cultivated per 12-hour shift maintaining seed depth accuracy",
    },
    standards: "ISOBUS, GreenStar GPS Precision",
    deliveryTime: {
      uk: "1–2 міс. (Узбекистан, Казахстан)",
      ru: "1–2 мес. (Узбекистан, Казахстан)",
      en: "1–2 mo. (Uzbekistan, Kazakhstan)",
    },
    salaryBenchmark: {
      uk: "30 000 – 50 000 грн/міс (сезон)",
      ru: "30 000 – 50 000 грн/мес (сезон)",
      en: "30,000 – 50,000 UAH/mo (seasonal)",
    },
    experienceYears: 5,
    demandPercentage: 99,
    testDetails: {
      uk: "Калібрування сівалки, робота з бортовим комп'ютером та обслуговування гідросистеми.",
      ru: "Калибровка сеялки, работа с бортовым компьютером и гидравликой.",
      en: "Seeder calibration, onboard terminal setup, and hydraulic system diagnostics.",
    },
    skillsList: ["John Deere / Claas", "GreenStar GPS", "Посівні комплекси", "Агрономічні норми"],
  },
];
