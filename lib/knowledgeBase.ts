export interface KnowledgeArticle {
  id: string;
  slug: string;
  category: {
    uk: string;
    ru: string;
    en: string;
  };
  cluster: number;
  roles: ("ceo" | "cfo" | "coo" | "hr")[];
  title: {
    uk: string;
    ru: string;
    en: string;
  };
  excerpt: {
    uk: string;
    ru: string;
    en: string;
  };
  readTimeMin: number;
  publishedAt: string;
  updatedAt: string;
  author: string;
  statsHighlight?: {
    value: string;
    label: { uk: string; ru: string; en: string };
  };
  contentHtml: {
    uk: string;
    ru: string;
    en: string;
  };
  faqs: {
    q: { uk: string; ru: string; en: string };
    a: { uk: string; ru: string; en: string };
  }[];
  relatedSlugs: string[];
}

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "art-1",
    slug: "cost-of-importing-workers-2026",
    category: {
      uk: "Фінанси та кошториси",
      ru: "Финансы и сметы",
      en: "Finances & Cost",
    },
    cluster: 1,
    roles: ["ceo", "cfo"],
    title: {
      uk: "Скільки коштує найняти робітника з Азії під ключ: Детальний розрахунок смет та окупності від Recruiter I Club у 2026 році",
      ru: "Сколько стоит нанять рабочего из Азии под ключ: Детальный расчет смет и окупаемости от Recruiter I Club в 2026 году",
      en: "How Much Does It Cost to Hire Workers from Asia Turnkey: Detailed 2026 Cost & ROI Breakdown by Recruiter I Club",
    },
    excerpt: {
      uk: "Прозора сітка тарифів від €850 до €1200, покрокова розбивка собівартості та математичний розрахунок окупності інвестицій за 14 робочих днів.",
      ru: "Прозрачная сетка тарифов от €850 до €1200, пошаговая разбивка себестоимости и математический расчет окупаемости за 14 рабочих дней.",
      en: "Transparent pricing from €850 to €1200, step-by-step cost breakdown, and mathematically proven 14-day payback period.",
    },
    readTimeMin: 6,
    publishedAt: "2026-01-15",
    updatedAt: "2026-03-01",
    author: "Recruiter I Club Financial & Operations Board",
    statsHighlight: {
      value: "€850–€1 200",
      label: {
        uk: "Тариф під ключ з гарантією 30 днів",
        ru: "Тариф под ключ с гарантией 30 дней",
        en: "Turnkey cost with 30-day warranty",
      },
    },
    contentHtml: {
      uk: `
        <p class="lead">Ринок праці в Україні переживає безпрецедентний дефіцит кадрів. Спроби закрити критичні вакансії місцевими ресурсами спричиняють безконтрольну зарплатну гонку та регулярні простої виробничих ліній. З 2019 року <strong>Recruiter I Club</strong> вирішує ці завдання системно: ми особисто побудували фізичну інфраструктуру тестування в Азії та забезпечуємо 100% легальний імпорт персоналу.</p>
        
        <h3>Офіційна комерційна сітка тарифів Recruiter I Club (2026)</h3>
        <p>Вартість послуг зафіксована у твердій валюті та залежить від регіону залучення та обсягу групи:</p>
        
        <h4>1. Англомовний профіль (Індія, Непал, Бангладеш):</h4>
        <ul>
          <li>Пакет 3–10 працівників: <strong>€1 000</strong> за особу.</li>
          <li>Пакет 11–50 працівників: <strong>€900</strong> за особу.</li>
          <li>Пакет від 51 працівника (гурт): <strong>€850</strong> за особу.</li>
        </ul>

        <h4>2. Російськомовний профіль (Узбекистан, Азербайджан, Центральна Азія):</h4>
        <ul>
          <li>Пакет 3–10 працівників: <strong>€1 200</strong> за особу.</li>
          <li>Пакет 11–50 працівників: <strong>€1 100</strong> за особу.</li>
          <li>Пакет від 51 працівника: <strong>€1 050</strong> за особу.</li>
        </ul>

        <h3>Детальна калькуляція собівартості (Базовий тариф €1 000):</h3>
        <div class="overflow-x-auto my-4">
          <table class="w-full text-xs text-left border-collapse border border-slate-700">
            <thead class="bg-slate-800 text-amber-400">
              <tr>
                <th class="p-2.5 border border-slate-700">Стаття витрат</th>
                <th class="p-2.5 border border-slate-700">Сума (EUR)</th>
                <th class="p-2.5 border border-slate-700">Цільове призначення</th>
              </tr>
            </thead>
            <tbody class="text-slate-300">
              <tr>
                <td class="p-2 border border-slate-800 font-semibold">Сорсинг та практичний тест у Делі</td>
                <td class="p-2 border border-slate-800">€200</td>
                <td class="p-2 border border-slate-800">Оренда цеху, практичні випробування зварювальників та швачок</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-800 font-semibold">Оформлення дозволу на працю</td>
                <td class="p-2 border border-slate-800">€100</td>
                <td class="p-2 border border-slate-800">Підготовка документів юристами для подання в ДЦЗ</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-800 font-semibold">Державне мито ДЦЗ (до 6 міс.)</td>
                <td class="p-2 border border-slate-800">€196 (9 984 грн)</td>
                <td class="p-2 border border-slate-800">Офіційний платіж у бюджет України (3 прожиткові мінімуми)</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-800 font-semibold">Консульський супровід візи D-04</td>
                <td class="p-2 border border-slate-800">€100</td>
                <td class="p-2 border border-slate-800">Взаємодія з МЗС та консульствами України</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-800 font-semibold">Транзитний хаб у Молдові</td>
                <td class="p-2 border border-slate-800">€200</td>
                <td class="p-2 border border-slate-800">Зустріч в аеропорту Кишинева, супровід до кордону Паланка/Тудора</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-800 font-semibold">Трансфер Кишинів → Одеса</td>
                <td class="p-2 border border-slate-800">€44</td>
                <td class="p-2 border border-slate-800">Спеціалізований комфортабельний автобус для персоналу</td>
              </tr>
              <tr>
                <td class="p-2 border border-slate-800 font-semibold">Чиста комісія Recruiter I Club</td>
                <td class="p-2 border border-slate-800">€160</td>
                <td class="p-2 border border-slate-800">Управління ризиками, страхування та гарантія заміни 30 днів</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Безпечна модель оплати 4×25%</h3>
        <p>Роботодавець не фінансує весь процес наосліп. Платежі розділені на 4 рівні транші за фактом завершення кожного етапу:</p>
        <ol>
          <li><strong>25%</strong> — підписання договору та старт рекрутингу;</li>
          <li><strong>25%</strong> — після погодження анкет і видачі дозволу ДЦЗ;</li>
          <li><strong>25%</strong> — після відкриття візи D та прильоту в Кишинів;</li>
          <li><strong>25%</strong> — лише після виходу працівника на зміну вашого підприємства.</li>
        </ol>
      `,
      ru: `
        <p class="lead">Рынок труда в Украине парализован дефицитом рабочих рук. Попытки закрыть вакансии локально ведут к бесконечной гонке зарплат и простоям оборудования. С 2019 года <strong>Recruiter I Club</strong> решает эту задачу системно через прямые поставки кадров из проверенных хабов Азии.</p>
        <h3>Официальная сетка тарифов Recruiter I Club (2026)</h3>
        <p>Индия, Непал, Бангладеш: от €850 до €1 000 за человека. Узбекистан, Казахстан: от €1 050 до €1 200 за человека. Прозрачная поэтапная оплата 4×25% и юридическая гарантия замены 30 дней.</p>
      `,
      en: `
        <p class="lead">Industrial workforce shortage in Ukraine requires stable international sourcing. Recruiter I Club provides end-to-end recruitment of verified workers from Asia (€850–€1200) with a transparent 4×25% milestone payment schedule and a 30-day replacement SLA.</p>
      `,
    },
    faqs: [
      {
        q: {
          uk: "Скільки коштує повний цикл найму працівника з Азії у 2026 році?",
          ru: "Сколько стоит полный цикл найма рабочего из Азии в 2026 году?",
          en: "How much does the full cycle of hiring a worker from Asia cost in 2026?",
        },
        a: {
          uk: "Вартість становить від €850 до €1 000 для працівників з Індії та Непалу, та від €1 050 до €1 200 для кандидатів із Центральної Азії. Оплата розбивається на 4 частини по 25%.",
          ru: "Стоимость составляет от €850 до €1 000 для рабочих из Индии и Непала, и от €1 050 до €1 200 для кандидатов из Центральной Азии с оплатой 4×25%.",
          en: "The cost ranges from €850 to €1000 for workers from India/Nepal, and from €1050 to €1200 for Central Asian candidates with 4×25% milestone payments.",
        },
      },
    ],
    relatedSlugs: [
      "foreign-employee-taxation-ukraine-2026",
      "import-timeline-asia-to-ukraine",
    ],
  },

  {
    id: "art-2",
    slug: "foreign-employee-taxation-ukraine-2026",
    category: {
      uk: "Податки та бухгалтерія",
      ru: "Налоги и бухгалтерия",
      en: "Taxes & Accounting",
    },
    cluster: 2,
    roles: ["cfo", "ceo", "hr"],
    title: {
      uk: "Оподаткування зарплати іноземного працівника в Україні у 2026 році: Розрахунок податків на ФОТ нерезидента для головного бухгалтера",
      ru: "Налогообложение зарплаты иностранного сотрудника в Украине в 2026 году: Расчет налогов на ФОТ нерезидента для главного бухгалтера",
      en: "Foreign Employee Payroll Taxation in Ukraine 2026: Official Payroll Tax Calculation for CFOs and Accountants",
    },
    excerpt: {
      uk: "Офіційний розрахунок для мінімалки 8 647 грн (ПДФО 18%, Військовий збір 5%, ЄСВ 22%) та законний пільговий період 60 днів з податками 0 грн.",
      ru: "Официальный расчет на минималку 8 647 грн (ПДФО 18%, Военный сбор 5%, ЕСВ 22%) и законный льготный период 60 дней со ставкой 0 грн.",
      en: "Official tax calculation for the 8,647 UAH minimum wage (PIT 18%, Military Tax 5%, SSC 22%) plus the legal 60-day 0 UAH tax grace period.",
    },
    readTimeMin: 7,
    publishedAt: "2026-01-20",
    updatedAt: "2026-03-02",
    author: "Recruiter I Club Tax & Legal Advisory",
    statsHighlight: {
      value: "0 грн",
      label: {
        uk: "Податки перші 60 днів (пільговий період)",
        ru: "Налоги первые 60 дней (льготный период)",
        en: "Taxes during first 60 days grace period",
      },
    },
    contentHtml: {
      uk: `
        <p class="lead">Головні бухгалтери та фінансові директори часто побоюються податкового хаосу та перевірок ДПС при працевлаштуванні іноземців. Законодавство України чітко визначає: іноземець, офіційно працевлаштований у штат ТОВ або ФОП за дозволом ДЦЗ, оподатковується за тими самими ставками, що й громадяни України, без жодних завищених коефіцієнтів.</p>

        <h3>Базові показники Держбюджету України на 2026 рік:</h3>
        <ul>
          <li><strong>Прожитковий мінімум для працездатних осіб</strong>: 3 328,00 грн.</li>
          <li><strong>Мінімальна заробітна плата</strong>: 8 647,00 грн.</li>
          <li><strong>ПДФО</strong>: 18%.</li>
          <li><strong>Військовий збір</strong>: 5% (відповідно до актуальних норм Податкового кодексу).</li>
          <li><strong>Єдиний соціальний внесок (ЄСВ)</strong>: 22%.</li>
        </ul>

        <h3>Наскрізний розрахунок зарплати іноземцю з мінімального окладу (8 647,00 грн):</h3>
        <ol>
          <li><strong>Нарахована зарплата (Gross)</strong>: 8 647,00 грн.</li>
          <li><strong>Утримання з працівника</strong>:
            <ul>
              <li>ПДФО (18%): 1 556,46 грн;</li>
              <li>Військовий збір (5%): 432,35 грн;</li>
              <li><em>Разом утримано</em>: 1 988,81 грн.</li>
            </ul>
          </li>
          <li><strong>Виплата «на руки» працівнику (Net)</strong>: <strong>6 658,19 грн</strong>.</li>
          <li><strong>Нарахування роботодавця (ЄСВ 22%)</strong>: 1 902,34 грн.</li>
          <li><strong>Загальні витрати підприємства на місяць</strong>: <strong>10 549,34 грн</strong>.</li>
        </ol>

        <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 my-6">
          <h4 class="text-amber-400 font-bold text-sm mb-1">⚡ Законний пільговий період 60 днів (0 грн податків)</h4>
          <p class="text-xs text-slate-300 leading-relaxed">
            Згідно із Законом України «Про зайнятість населення», роботодавець отримує <strong>2 місяці безкоштовного періоду з моменту видачі дозволу на роботу</strong>. Протягом цих 60 днів, доки кандидат оформлює візу D-04 та перебуває в дорозі, заробітна плата законно не нараховується, а податки до бюджету становлять <strong>0,00 грн</strong>.
          </p>
        </div>
      `,
      ru: `
        <p class="lead">Иностранец, официально принятый в штат ТОВ на основании разрешения Центра занятости, облагается по стандартным ставкам Налогового кодекса: ПДФО 18%, Военный сбор 5%, ЕСВ 22%. При минимальном окладе 8 647 грн общие расходы компании составляют 10 549 грн/мес.</p>
      `,
      en: `
        <p class="lead">Foreign workers officially hired in Ukraine under work permits are taxed identically to domestic staff: PIT 18%, Military Tax 5%, SSC 22%. Total monthly cost for minimum wage (8,647 UAH) is 10,549 UAH, with 0 UAH tax during the first 60 days.</p>
      `,
    },
    faqs: [
      {
        q: {
          uk: "Які податки сплачує підприємство за іноземного працівника у 2026 році?",
          ru: "Какие налоги платит предприятие за иностранного сотрудника в 2026 году?",
          en: "What taxes does a company pay for a foreign employee in 2026?",
        },
        a: {
          uk: "Стандартні ставки: ПДФО 18%, Військовий збір 5% (утримуються з окладу), та ЄСВ 22% (нараховується роботодавцем). При мінімальній зарплаті 8 647 грн загальні витрати становлять 10 549,34 грн.",
          ru: "Стандартные ставки: ПДФО 18%, Военный сбор 5% (из зарплаты) и ЕСВ 22% (начисление предприятия). Всего 10 549,34 грн при минималке 8 647 грн.",
          en: "Standard rates: 18% PIT and 5% Military Tax deducted from salary, plus 22% SSC paid by employer.",
        },
      },
      {
        q: {
          uk: "Чи нараховуються податки, доки працівник ще не доїхав в Україну?",
          ru: "Начисляются ли налоги, пока рабочий еще в пути в Украину?",
          en: "Are taxes accrued while the worker is in transit to Ukraine?",
        },
        a: {
          uk: "Ні. Діє законний пільговий період 60 днів з моменту отримання дозволу ДЦЗ. Доки працівник не перетнув кордон і не підписав трудовий договір, податки становлять 0 грн.",
          ru: "Нет. Действует законный льготный период 60 дней после выдачи разрешения ДЦЗ. Налоги в это время равны 0 грн.",
          en: "No. A legal 60-day grace period applies from permit issuance. Taxes during transit are 0 UAH.",
        },
      },
    ],
    relatedSlugs: [
      "cost-of-importing-workers-2026",
      "work-permit-and-trc-guide",
    ],
  },

  {
    id: "art-3",
    slug: "import-timeline-asia-to-ukraine",
    category: {
      uk: "Терміни та логістика",
      ru: "Сроки и логистика",
      en: "Timelines & Logistics",
    },
    cluster: 3,
    roles: ["coo", "ceo", "hr"],
    title: {
      uk: "Терміни та логістика доставки персоналу з Азії: Скільки часу реально займає привіз працівників в Україну у 2026 році",
      ru: "Сроки и логистика доставки персонала из Азии: Сколько времени реально занимает привоз рабочих в Украину в 2026 году",
      en: "Timelines & Logistics for Importing Asian Workforce: How Long Does It Realistically Take in 2026",
    },
    excerpt: {
      uk: "Реальні строки від 1 до 4 місяців (Центральна Азія: 1–2 міс., Південна Азія: 3–4 міс.) та відпрацьований транзитний маршрут через Кишинів до Одеси.",
      ru: "Реальные сроки от 1 до 4 месяцев (Центральная Азия: 1–2 мес., Южная Азия: 3–4 мес.) и транзитный коридор через Кишинев в Одессу.",
      en: "Realistic timelines from 1 to 4 months (Central Asia: 1–2 mo., South Asia: 3–4 mo.) and proven transit via Chisinau to Odesa.",
    },
    readTimeMin: 5,
    publishedAt: "2026-01-25",
    updatedAt: "2026-03-01",
    author: "Recruiter I Club Logistics Department",
    statsHighlight: {
      value: "1–4 місяці",
      label: {
        uk: "Фіксований у договорі строк виходу на зміну",
        ru: "Фиксированный в договоре срок выхода на смену",
        en: "Contractually fixed shift arrival timeline",
      },
    },
    contentHtml: {
      uk: `
        <p class="lead">Коли підприємство стикається з дефіцитом робітників, кожна втрачена неділя коштує сотні тисяч гривень невідвантаженої продукції. Recruiter I Club прямо називає чесні строки: <strong>від 1 до 4 місяців</strong> залежно від візового режиму країни відбору.</p>

        <h3>Логістичні зони залучення:</h3>
        <ul>
          <li><strong>Центральна Азія (Узбекистан, Казахстан)</strong>: <strong>1–2 місяці</strong> завдяки спрощеному оформленню та безвізовому коридору;</li>
          <li><strong>Південна Азія (Індія, Непал, Бангладеш, Філіппіни)</strong>: <strong>3–4 місяці</strong> (максимальний строк 4 місяці жорстко зафіксовано в договорі).</li>
        </ul>

        <h3>Покроковий таймлайн імпорту (6 етапів):</h3>
        <ol>
          <li><strong>Сорсинг та відеоанкети (5–10 днів)</strong>: Відбір та практичне тестування в цехах Делі чи Дакки. Клієнт отримує відеозаписи роботи кандидатів.</li>
          <li><strong>Дозвіл на працю ДЦЗ (10–15 робочих днів)</strong>: Офіційна подача документів в електронному форматі з КЕП.</li>
          <li><strong>Консульський етап візи D-04 (30–45 днів)</strong>: Проходження співбесіди та вклеювання довгострокової робочої візи в консульствах України.</li>
          <li><strong>Авіапереліт Делі/Дакка → Кишинів (3–5 днів)</strong>: Організований чартерний або регулярний переліт до міжнародного хабу Молдови.</li>
          <li><strong>Супроводжуваний трансфер Кишинів → Одеса (1–2 дні)</strong>: Зустріч представником I Club на кордоні (Паланка) та переїзд спеціалізованим автобусом.</li>
          <li><strong>Онбординг та вихід на зміну (3–5 днів)</strong>: Медичний огляд, розселення в гуртожитку та вихід на робоче місце під наглядом двомовного координатора.</li>
        </ol>
      `,
      ru: `
        <p class="lead">Сроки прибытия рабочих составляют от 1 до 4 месяцев: 1–2 месяца для граждан Узбекистана и 3–4 месяца для Индии и Бангладеш с отработанным логистическим коридором через Молдову.</p>
      `,
      en: `
        <p class="lead">Staff delivery takes from 1 to 4 months: 1–2 months for Central Asia and 3–4 months for South Asia through our established transit corridor via Chisinau to Odesa.</p>
      `,
    },
    faqs: [
      {
        q: {
          uk: "Які реальні строки прибуття першої групи робітників?",
          ru: "Каковы реальные сроки прибытия первой группы рабочих?",
          en: "What is the realistic arrival timeline for the first workforce group?",
        },
        a: {
          uk: "Від 1 до 4 місяців. Для Узбекистану — 1–2 місяці, для Індії та Непалу — 3–4 місяці з моменту підписання угоди.",
          ru: "От 1 до 4 месяцев: 1–2 месяца для Узбекистана, 3–4 месяца для Индии и Непала.",
          en: "From 1 to 4 months: 1–2 months for Uzbekistan, 3–4 months for India and Nepal.",
        },
      },
    ],
    relatedSlugs: [
      "cost-of-importing-workers-2026",
      "work-permit-and-trc-guide",
    ],
  },

  {
    id: "art-4",
    slug: "work-permit-and-trc-guide",
    category: {
      uk: "Юридичний комплаєнс",
      ru: "Юридический комплаенс",
      en: "Legal & Compliance",
    },
    cluster: 4,
    roles: ["hr", "ceo", "cfo"],
    title: {
      uk: "Як легально найняти іноземця в Україні у 2026 році: Покроковий юридичний гайд з отримання дозволу ДЦЗ та посвідки на проживання",
      ru: "Как легально нанять иностранца в Украине в 2026 году: Пошаговый юридический гайд по получению разрешения ДЦЗ и вида на жительство",
      en: "How to Legally Hire Foreign Workers in Ukraine 2026: Step-by-step Work Permit & Residence Compliance Guide",
    },
    excerpt: {
      uk: "Повний регламент прямого найму: 3 прожиткові мінімуми збору ДЦЗ (9 984 грн), пільга при продовженні, електронний КЕП та 100% захист від штрафів Держпраці.",
      ru: "Регламент прямого найма: 3 прожиточных минимума сбора ДЦЗ (9 984 грн), льгота при продлении, электронный КЭП и защита от штрафов Гоструда.",
      en: "Complete direct employment regulation: 3 subsistence minimums fee (9,984 UAH), renewal discount, and 100% compliance against labor penalties.",
    },
    readTimeMin: 6,
    publishedAt: "2026-01-30",
    updatedAt: "2026-03-02",
    author: "Recruiter I Club Migration Attorneys",
    statsHighlight: {
      value: "9 984 грн",
      label: {
        uk: "Офіційне мито ДЦЗ (3 ПМПО) за дозвіл на 6 міс.",
        ru: "Официальная пошлина ДЦЗ (3 ПМПО) за разрешение на 6 мес.",
        en: "Official State Employment fee for 6 mo. permit",
      },
    },
    contentHtml: {
      uk: `
        <p class="lead">Використання так званого «неофіційного лізингу» або «сірих схем» загрожує роботодавцю штрафами Держпраці у розмірі сотень тисяч гривень за кожного нелегального працівника. Модель <strong>Recruiter I Club</strong> передбачає виключно <strong>прямий офіційний найм у штат замовника</strong> згідно із Законом України «Про зайнятість населення».</p>

        <h3>Державне мито за видачу дозволу ДЦЗ (прив'язка до ПМПО 3 328 грн на 2026 рік):</h3>
        <ul>
          <li>Дозвіл строком дії до 6 місяців: 3 ПМПО = <strong>9 984,00 грн</strong>;</li>
          <li>Дозвіл строком дії до 1 року: 5 ПМПО = <strong>16 640,00 грн</strong>;</li>
          <li>Дозвіл строком дії до 2 років: 8 ПМПО = <strong>26 624,00 грн</strong>.</li>
        </ul>

        <h4>Фінансова знижка при продовженні дозволу:</h4>
        <p>При подовженні чинного дозволу на роботу офіційний державний збір автоматично знижується на <strong>1 прожитковий мінімум (мінус 3 328,00 грн)</strong>, що робить утримання перевіреного штату у другий рік суттєво дешевшим.</p>

        <h3>Посвідка на тимчасове проживання (ВНЖ / TRC):</h3>
        <p>Після прибуття працівника в Україну за візою D-04 наші юристи оформлюють посвідку ДМС з біометричним чіпом строком дії на період дії дозволу на працю. Загальні витрати на бланки та адмінпослуги складають 1 140,00 грн.</p>
      `,
      ru: `
        <p class="lead">Прямой найм по разрешению Центра занятости исключает любые штрафы Гоструда. Государственная пошлина за разрешение на 6 месяцев составляет 9 984 грн (3 ПМПО), а при продлении действует законная скидка 3 328 грн.</p>
      `,
      en: `
        <p class="lead">Direct hiring under the State Employment Center permit eliminates labor audit risks. The 6-month official permit fee is 9,984 UAH, with a 3,328 UAH reduction upon contract renewal.</p>
      `,
    },
    faqs: [
      {
        q: {
          uk: "Чи це аутстафінг чи прямий найм у штат компанії?",
          ru: "Это аутстаффинг или прямой найм в штат предприятия?",
          en: "Is this staff leasing/outstaffing or direct hiring into payroll?",
        },
        a: {
          uk: "Виключно прямий офіційний найм у штат вашого підприємства. Дозвіл ДЦЗ видається на конкретну юридичну особу роботодавця.",
          ru: "Исключительно прямой официальный найм в штат вашего предприятия по индивидуальному разрешению ДЦЗ.",
          en: "Exclusively direct hiring onto your company's payroll under an individualized State Employment Center permit.",
        },
      },
    ],
    relatedSlugs: [
      "foreign-employee-taxation-ukraine-2026",
      "import-timeline-asia-to-ukraine",
    ],
  },

  {
    id: "art-5",
    slug: "overcoming-language-barrier-on-production",
    category: {
      uk: "Адаптація та безпека",
      ru: "Адаптация и безопасность",
      en: "Adaptation & Safety",
    },
    cluster: 5,
    roles: ["coo", "hr", "ceo"],
    title: {
      uk: "Мовний бар'єр та адаптація робітників з Азії: Як Recruiter I Club забезпечує безпеку та виробітку на українських підприємствах",
      ru: "Языковой барьер и адаптация рабочих из Азии: Как Recruiter I Club обеспечивает безопасность и выработку на украинских предприятиях",
      en: "Overcoming Language Barrier and Shopfloor Adaptation: How Recruiter I Club Secures Safety & Output",
    },
    excerpt: {
      uk: "Унікальна «Модель 360»: двомовні супервайзери на змінах 100% часу, візуальний менеджмент піктограм, QR-відеоінструкції та побутовий супровід 24/7.",
      ru: "Уникальная «Модель 360»: двуязычные супервайзеры 100% смены, визуальный менеджмент, QR-видеоинструкции и бытовой саппорт 24/7.",
      en: "Unique '360 Model': bilingual coordinators 100% on shift, visual management pictograms, QR video guides, and 24/7 domestic support.",
    },
    readTimeMin: 7,
    publishedAt: "2026-02-05",
    updatedAt: "2026-03-03",
    author: "Recruiter I Club Industrial Engineering Team",
    statsHighlight: {
      value: "100%",
      label: {
        uk: "Присутність двомовного координатора на змінах",
        ru: "Присутствие двуязычного координатора на сменах",
        en: "Bilingual coordinator shift presence",
      },
    },
    contentHtml: {
      uk: `
        <p class="lead">Головний операційний страх керівників заводів та начальників виробництва: <em>«Як ми порозуміємося? Вони порушать техніку безпеки та пошкодять дороге обладнання!»</em>. З 2019 року Recruiter I Club відточував у країнах ЄС та Молдові перевірену інженерну методологію безбар'єрної інтеграції — <strong>«Модель 360»</strong>.</p>

        <h3>Три лінії операційного захисту від I Club:</h3>
        
        <h4>1. Двомовні координатори-супервайзери на змінах:</h4>
        <p>За кожною групою від 10–15 робітників закріплюється координатор, який вільно володіє українською мовою та національною мовою робітників (хінді, бенгалі, узбецька). Він бере участь у ранкових планірках, перекладає наряди майстрів та контролює виконання щоденних нормативів KPI.</p>

        <h4>2. Безбар'єрний візуальний менеджмент (Visual Management):</h4>
        <p>Регламенти безпеки та інструкції переводяться в інфографіку та зрозумілі піктограми. Біля верстатів розміщуються таблички з QR-кодами, які ведуть на короткі 30-секундні відеоролики рідною мовою працівника про правильну експлуатацію вузла.</p>

        <h4>3. Побутовий супровід 24/7:</h4>
        <p>Координатор бере на себе розселення, медичне обслуговування, купівлю національних продуктів харчування та адаптацію. Працівники не мають побутового стресу та на 100% фокусуються на виконанні плану.</p>
      `,
      ru: `
        <p class="lead">Модель управления 360 исключает риски порчи оборудования: двуязычный супервайзер работает в цеху 100% смены, правила ТБ переводятся в пиктограммы, а бытовой сервис 24/7 снимает нагрузку с HR заказчика.</p>
      `,
      en: `
        <p class="lead">Our 360 Management Model eliminates machinery risks: bilingual coordinators on shift 100% of the time, pictorial safety guidelines, and 24/7 domestic support.</p>
      `,
    },
    faqs: [
      {
        q: {
          uk: "Чи не зіпсують іноземні працівники дороге обладнання?",
          ru: "Не испортят ли иностранные рабочие дорогое оборудование?",
          en: "Will foreign workers risk damaging expensive equipment?",
        },
        a: {
          uk: "Ні. Кожна група супроводжується двомовним супервайзером, проходить відеоінструктаж та практичні випробування перед виходом на лінію. Діє гарантія заміни 30 днів.",
          ru: "Нет. На сменах дежурит двуязычный супервайзер, все процессы переведены в визуальные регламенты, а кандидаты проверены в цехах в Дели.",
          en: "No. Every group is supervised by bilingual coordinators with visual SOPs and pre-tested qualifications.",
        },
      },
    ],
    relatedSlugs: [
      "german-job-turbo-and-ikea-refugee-program-lessons",
      "cost-of-importing-workers-2026",
    ],
  },

  {
    id: "art-6",
    slug: "german-job-turbo-and-ikea-refugee-program-lessons",
    category: {
      uk: "Міжнародний досвід та ESG",
      ru: "Международный опыт и ESG",
      en: "Global ESG Experience",
    },
    cluster: 6,
    roles: ["hr", "ceo"],
    title: {
      uk: "Інтеграція іноземних працівників за стандартами ЄС: Чому досвід реформ Німеччини та програм IKEA рятує український бізнес",
      ru: "Интеграция иностранных работников по стандартам ЕС: Почему опыт реформ Германии и программ IKEA спасает украинский бизнес",
      en: "EU-Standard Foreign Worker Integration: Why Germany's Job-Turbo and IKEA's Programs Save Ukrainian Businesses",
    },
    excerpt: {
      uk: "Як принцип моментального виходу на роботу Job-Turbo та наставництво Buddy System від IKEA знижують плинність кадрів до рекордних 2%.",
      ru: "Как принцип моментального старта Job-Turbo и наставничество Buddy System от IKEA снижают текучесть кадров до рекордных 2%.",
      en: "How Germany's Job-Turbo fast-track deployment and IKEA's Buddy System mentorship reduce workforce turnover to an industry-record 2%.",
    },
    readTimeMin: 6,
    publishedAt: "2026-02-10",
    updatedAt: "2026-03-03",
    author: "Recruiter I Club ESG & Social Inclusion Department",
    statsHighlight: {
      value: "2%",
      label: {
        uk: "Плинність кадрів при системі Buddy System",
        ru: "Текучесть кадров при системе Buddy System",
        en: "Turnover rate under Buddy System",
      },
    },
    contentHtml: {
      uk: `
        <p class="lead">Як сертифікований ESG-партнер українського бізнесу, <strong>Recruiter I Club</strong> адаптує провідні світові практики індустріальної інклюзії від німецького уряду та корпорації IKEA / Ingka Group.</p>

        <h3>1. Німецька модель «Job-Turbo» (Реформа 2023–2026):</h3>
        <p>Німецький досвід довів, що тривале навчання мови на курсах перед початком роботи шкодить бізнесу. Принцип «Job-Turbo» передбачає <strong>моментальний вихід робітника на лінію</strong> з базовою комунікацією (рівень А2), а поглиблене вивчення специфічних професійних термінів здійснюється безпосередньо на робочому місці без відриву від виробництва.</p>

        <h3>2. Наставництво та Buddy System (Досвід IKEA):</h3>
        <p>За кожним новим іноземним працівником закріплюється досвідчений місцевий фахівець-напарник («Buddy»), який отримує щомісячну доплату до KPI. Це повністю усуває напругу всередині колективу, прискорює вихід на нормативну виробітку та знижує плинність кадрів до рекордних 2% на рік.</p>
      `,
      ru: `
        <p class="lead">Мы переносим стандарты Германии (Job-Turbo: мгновенный выход на смену) и IKEA (Buddy System: закрепление локального наставника за иностранцем), обеспечивая рекордную стабильность коллектива.</p>
      `,
      en: `
        <p class="lead">We implement German Job-Turbo fast-track on-site learning and IKEA's Buddy System peer mentorship to keep employee retention above 98%.</p>
      `,
    },
    faqs: [
      {
        q: {
          uk: "Як система напарника (Buddy System) впливає на українських співробітників?",
          ru: "Как система наставничества (Buddy System) влияет на украинских сотрудников?",
          en: "How does the Buddy System mentorship affect domestic Ukrainian employees?",
        },
        a: {
          uk: "Локальні працівники отримують фінансову надбавку до зарплати за кураторство, не відчувають конкуренції та стають лідерами змін.",
          ru: "Местные сотрудники получают надбавку за наставничество, исключается ревность в коллективе, ускоряется адаптация.",
          en: "Domestic staff receive mentorship KPI bonuses, eliminating workplace friction and boosting retention.",
        },
      },
    ],
    relatedSlugs: [
      "overcoming-language-barrier-on-production",
      "cost-of-importing-workers-2026",
    ],
  },
];
