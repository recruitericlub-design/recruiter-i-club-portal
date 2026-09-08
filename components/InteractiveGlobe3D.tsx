"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { 
  RotateCcw, 
  Play, 
  Pause, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Banknote,
  HeartHandshake,
  CheckCircle2,
  Globe2,
  Activity,
  ExternalLink,
  MapPin
} from "lucide-react";
import { playSciFiBeep, playMechanicalClick } from "@/lib/soundFX";

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
  wageRatioNumber: number;
  visaTime: string;
  workSchedule: string;
  culturalTraits: string[];
  economicAdvantage: string;
  flightCode: string;
  isMainHub?: boolean;
  satelliteImage: string;
  satelliteCoords: string;
  altitude: string;
}

// 7 Key Partner Hubs with Exact Geographic Coordinates
const COUNTRIES_DATA: Record<string, CountryDossier[]> = {
  uk: [
    {
      id: "kyiv",
      name: "Київ",
      country: "Україна",
      region: "Східна Європа // Головний хаб",
      flag: "🇺🇦",
      code: "UA",
      lat: 50.4501,
      lon: 30.5234,
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
        "Рідна мова та спільні виробничі традиції",
        "Швидка інтеграція в робочий колектив",
        "Проблема: щоденний ризик призову та зупинки конвеєрів"
      ],
      economicAdvantage: "Пряме зарахування у штат українського підприємства. 100% імунітет від мобілізації для іноземного персоналу (ст. 23 ЗУ).",
      flightCode: "UA-HUB",
      isMainHub: true,
      satelliteImage: "https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "50°27'N 30°31'E",
      altitude: "179m"
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
      hubType: "КРАЇНИ СНД // БЕЗВІЗОВИЙ КОРИДОР",
      targetWageUA: "від 900 €",
      targetWageUAH: "~40 500 ₴ / міс",
      homeWage: "~250 € / міс",
      homeWageUAH: "~11 250 ₴",
      wageMultiplier: "в 3.5 раза вище",
      wageRatioNumber: 3.5,
      visaTime: "30–45 календарних днів",
      workSchedule: "Зміни по 10–12 годин, 6 днів/тижд",
      culturalTraits: [
        "Повна відсутність мовного бар'єра (вільна російська)",
        "Сухий закон: нульовий алкогольний фактор на зміні та в побуті",
        "Традиційна дисципліна: беззаперечна повага до бригадира й майстра",
        "Висока сімейна мотивація (відправляють дохід родині)"
      ],
      economicAdvantage: "Фахівці без мовного бар'єра. Заробіток у 3.5 раза вищий за домашній, що гарантує 100% старанність та нульову плинність кадрів.",
      flightCode: "HY-731",
      satelliteImage: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "41°18'N 69°14'E",
      altitude: "455m"
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
      targetWageUAH: "~27 000 ₴ / міс",
      homeWage: "~160 € / міс",
      homeWageUAH: "~7 200 ₴",
      wageMultiplier: "в 3.8 раза вище",
      wageRatioNumber: 3.8,
      visaTime: "90–110 днів (робоча віза D)",
      workSchedule: "Позмінний цеховий графік за техкартами",
      culturalTraits: [
        "Англійська мова + російськомовні старші бригадири",
        "Висока витримка при монотонній цеховій праці (зварювання, ЧПК)",
        "Суворе дотримання субординації та внутрішніх регламентів",
        "Миролюбний менталітет, абсолютний порядок у гуртожитках"
      ],
      economicAdvantage: "Ставка від 600 € забезпечує українському заводу економію фонду оплати праці до 35–40% при вищій продуктивності.",
      flightCode: "AI-419",
      satelliteImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "28°36'N 77°12'E",
      altitude: "216m"
    },
    {
      id: "manila",
      name: "Маніла",
      country: "Філіппіни",
      region: "Південно-Східна Азія // Сервіс & Харчопром",
      flag: "🇵🇭",
      code: "PH",
      lat: 14.5995,
      lon: 120.9842,
      hubType: "АЗІЙСЬКИЙ ЕТАЛОН СТАНДАРТІВ НАССР",
      targetWageUA: "від 650 €",
      targetWageUAH: "~29 250 ₴ / міс",
      homeWage: "~190 € / міс",
      homeWageUAH: "~8 550 ₴",
      wageMultiplier: "в 3.4 раза вище",
      wageRatioNumber: 3.4,
      visaTime: "60–90 днів",
      workSchedule: "Зміни по 8–10 годин, харчові регламенти",
      culturalTraits: [
        "Вільна розмовна англійська мова (державний рівень)",
        "Вроджена акуратність, перфекціонізм та дотримання санітарії",
        "Висока лояльність до роботодавця, контракти від 2 років",
        "Швидке навчання роботі на європейському обладнанні"
      ],
      economicAdvantage: "Ідеальний вибір для харчових комбінатів, чистих цехів НАССР, логістичних комплексів та точного пакування.",
      flightCode: "PR-658",
      satelliteImage: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "14°35'N 120°58'E",
      altitude: "16m"
    },
    {
      id: "dhaka",
      name: "Дакка",
      country: "Бангладеш",
      region: "Південна Азія // Текстиль & Будівництво",
      flag: "🇧🇩",
      code: "BD",
      lat: 23.8103,
      lon: 90.4125,
      hubType: "ТЕКСТИЛЬНИЙ ГІГАНТ // ШВЕЙНІ ЛІНІЇ",
      targetWageUA: "від 600 €",
      targetWageUAH: "~27 000 ₴ / міс",
      homeWage: "~140 € / міс",
      homeWageUAH: "~6 300 ₴",
      wageMultiplier: "в 4.2 раза вище",
      wageRatioNumber: 4.2,
      visaTime: "75–95 днів",
      workSchedule: "Потокові швидкісні лінії, 6 днів/тижд",
      culturalTraits: [
        "Світовий центр легкої промисловості — швачки з 7+ роками стажу",
        "Швидкість строчки в 1.5 раза перевищує середні норми",
        "Витривалість до монотонної роботи без втрати концентрації",
        "Невибагливість у побуті та висока дисципліна"
      ],
      economicAdvantage: "Рішення №1 для швейних фабрик, що шиють спецодяг, армійську амуніцію або трикотаж: собівартість пошиття знижується на 40%.",
      flightCode: "BG-201",
      satelliteImage: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "23°48'N 90°24'E",
      altitude: "12m"
    },
    {
      id: "kathmandu",
      name: "Катманду",
      country: "Непал",
      region: "Південна Азія // Фізична витривалість",
      flag: "🇳🇵",
      code: "NP",
      lat: 27.7172,
      lon: 85.3240,
      hubType: "БУДІВЕЛЬНИЙ & АГРАРНИЙ ПУЛ",
      targetWageUA: "від 600 €",
      targetWageUAH: "~27 000 ₴ / міс",
      homeWage: "~150 € / міс",
      homeWageUAH: "~6 750 ₴",
      wageMultiplier: "в 4.0 раза вище",
      wageRatioNumber: 4.0,
      visaTime: "75–95 днів",
      workSchedule: "Важка фізична праця, відкриті майданчики",
      culturalTraits: [
        "Виняткова фізична витривалість і стійкість до погодних умов",
        "Буддійська та індуїстська культура: спокій, безконфліктність",
        "Працьовитість без нарікань на погодні умови та навантаження",
        "Згуртованість у бригадах, висока взаємодопомога"
      ],
      economicAdvantage: "Закривають найважчі ділянки робіт на монолітному будівництві, дорожніх роботах та в агрокомплексах, де спостерігається 100% дефіцит.",
      flightCode: "RA-405",
      satelliteImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "27°43'N 85°19'E",
      altitude: "1400m"
    },
    {
      id: "chisinau",
      name: "Кишинів",
      country: "Молдова",
      region: "Східна Європа // Транзитний логістичний вузол",
      flag: "🇲🇩",
      code: "MD",
      lat: 47.0105,
      lon: 28.8638,
      hubType: "ТРАНЗИТНИЙ ХАБ // СУПРОВІД КОРДОНУ",
      targetWageUA: "від 950 €",
      targetWageUAH: "~42 750 ₴ / міс",
      homeWage: "~450 € / міс",
      homeWageUAH: "~20 250 ₴",
      wageMultiplier: "в 2.1 раза вище",
      wageRatioNumber: 2.1,
      visaTime: "10–20 днів",
      workSchedule: "Логістичний координаційний штаб",
      culturalTraits: [
        "Європейський кордон та пряме автомобільне сполучення з Україною",
        "Транзитний розподільчий пункт для груп з Азії",
        "Юридична перевірка документів перед перетином кордону"
      ],
      economicAdvantage: "Безпечний логістичний коридор: прийом авіарейсів у Кишиневі та організований трансфер автобусами через КПП Паланка/Тудора до Києва.",
      flightCode: "9U-893",
      satelliteImage: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80",
      satelliteCoords: "47°01'N 28°51'E",
      altitude: "85m"
    }
  ]
};

// World Major Cities for High-Tech Realism
const WORLD_CITIES = [
  { name: "Токіо", lat: 35.6762, lon: 139.6503 },
  { name: "Лондон", lat: 51.5074, lon: -0.1278 },
  { name: "Берлін", lat: 52.5200, lon: 13.4050 },
  { name: "Париж", lat: 48.8566, lon: 2.3522 },
  { name: "Дубай", lat: 25.2048, lon: 55.2708 },
  { name: "Варшава", lat: 52.2297, lon: 21.0122 },
  { name: "Сеул", lat: 37.5665, lon: 126.9780 },
  { name: "Сінгапур", lat: 1.3521, lon: 103.8198 },
  { name: "Стамбул", lat: 41.0082, lon: 28.9784 }
];

export const InteractiveGlobe3D: React.FC<{ locale?: string }> = ({ locale = "uk" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const countries = COUNTRIES_DATA[locale] || COUNTRIES_DATA.uk;
  const kyivHub = countries.find(c => c.isMainHub) || countries[0];

  const [selectedId, setSelectedId] = useState<string>("tashkent");
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);

  // Rotation Physics State (Pitch X, Yaw Y)
  // Default centered on Eastern Europe & Central Asia
  const rotRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -0.85 });
  const targetRotRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -0.85 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0.002 });

  const activeCountry = useMemo(() => {
    return countries.find(c => c.id === selectedId) || null;
  }, [countries, selectedId]);

  // Rotate camera smoothly to face the selected country
  const focusOnCountry = useCallback((country: CountryDossier) => {
    playSciFiBeep(1100, 0.08);
    setSelectedId(country.id);

    // Target angles so that country appears on front face
    const latRad = country.lat * (Math.PI / 180);
    const lonRad = country.lon * (Math.PI / 180);

    targetRotRef.current = {
      x: Math.max(-0.6, Math.min(0.6, latRad * 0.7)),
      y: -lonRad - Math.PI * 0.5
    };
  }, []);

  // 3D Spherical Projection Helper
  const projectPoint = useCallback((latDeg: number, lonDeg: number, radius: number, cx: number, cy: number, rotX: number, rotY: number) => {
    const lat = latDeg * (Math.PI / 180);
    const lon = lonDeg * (Math.PI / 180);

    // Spherical coordinates
    const x0 = Math.cos(lat) * Math.sin(lon);
    const y0 = Math.sin(lat);
    const z0 = Math.cos(lat) * Math.cos(lon);

    // Rotate Yaw (Y axis)
    const x1 = x0 * Math.cos(rotY) + z0 * Math.sin(rotY);
    const y1 = y0;
    const z1 = -x0 * Math.sin(rotY) + z0 * Math.cos(rotY);

    // Rotate Pitch (X axis)
    const x2 = x1;
    const y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
    const z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);

    return {
      x: cx + x2 * radius,
      y: cy - y2 * radius,
      z: z2, // > 0 means visible on front hemisphere
      rawX: x2,
      rawY: y2
    };
  }, []);

  // Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let startTime = performance.now();

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width;
      const height = canvas.height;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const radius = Math.min(width, height) * 0.42;

      // 1. Smooth Camera Physics Lerp
      if (!isDraggingRef.current) {
        // Lerp pitch
        rotRef.current.x += (targetRotRef.current.x - rotRef.current.x) * 0.08;

        // Lerp yaw handling wrap-around
        let diffY = (targetRotRef.current.y - rotRef.current.y) % (Math.PI * 2);
        if (diffY > Math.PI) diffY -= Math.PI * 2;
        if (diffY < -Math.PI) diffY += Math.PI * 2;
        rotRef.current.y += diffY * 0.08;

        // Auto spin if idle
        if (isAutoRotating && Math.abs(diffY) < 0.005) {
          targetRotRef.current.y += 0.0015;
          rotRef.current.y += 0.0015;
        }
      }

      const rotX = rotRef.current.x;
      const rotY = rotRef.current.y;

      // 2. Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // 3. Deep Atmospheric Cosmic Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.25);
      glowGrad.addColorStop(0, "rgba(245, 158, 11, 0.08)");
      glowGrad.addColorStop(0.5, "rgba(217, 119, 6, 0.04)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 4. Base Earth Sphere (Dark Titanium Obsidian)
      const earthGrad = ctx.createRadialGradient(cx - radius * 0.35, cy - radius * 0.35, radius * 0.1, cx, cy, radius);
      earthGrad.addColorStop(0, "#1e293b");
      earthGrad.addColorStop(0.5, "#0f172a");
      earthGrad.addColorStop(0.85, "#020617");
      earthGrad.addColorStop(1, "#000000");
      ctx.fillStyle = earthGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // 5. Outer Precision Rim Border
      ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 6. Astrolabe Horizon Degree Ring
      ctx.save();
      const ringR = radius * 1.05;
      ctx.strokeStyle = "rgba(226, 201, 160, 0.2)";
      ctx.lineWidth = 1.0 * dpr;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.stroke();

      // 15° Degree tick marks
      for (let deg = 0; deg < 360; deg += 15) {
        const rad = (deg * Math.PI) / 180;
        const isMajor = deg % 45 === 0;
        const len = (isMajor ? 6 : 3) * dpr;
        const x1 = cx + Math.cos(rad) * ringR;
        const y1 = cy + Math.sin(rad) * ringR;
        const x2 = cx + Math.cos(rad) * (ringR + len);
        const y2 = cy + Math.sin(rad) * (ringR + len);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.restore();

      // 7. World Cities Reference Dots (Clean, Discrete)
      WORLD_CITIES.forEach(city => {
        const pt = projectPoint(city.lat, city.lon, radius, cx, cy, rotX, rotY);
        if (pt.z > 0.1) {
          ctx.fillStyle = "rgba(148, 163, 184, 0.45)";
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5 * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 8. 3D Golden Curved Supply Arcs to Kyiv (The Showstopper!)
      const kyivPt = projectPoint(kyivHub.lat, kyivHub.lon, radius, cx, cy, rotX, rotY);

      countries.forEach(hub => {
        if (hub.isMainHub) return;

        const hubPt = projectPoint(hub.lat, hub.lon, radius, cx, cy, rotX, rotY);

        // Draw arc if at least one endpoint is facing front
        if (hubPt.z > -0.2 || kyivPt.z > -0.2) {
          const numSegments = 30;
          const arcPoints: { x: number; y: number; z: number }[] = [];

          for (let i = 0; i <= numSegments; i++) {
            const t = i / numSegments;
            // Interpolate lat / lon
            const lat = hub.lat + (kyivHub.lat - hub.lat) * t;
            const lon = hub.lon + (kyivHub.lon - hub.lon) * t;

            // Parabolic altitude arching above the sphere
            const alt = 1.0 + Math.sin(t * Math.PI) * 0.22;
            const p = projectPoint(lat, lon, radius * alt, cx, cy, rotX, rotY);
            arcPoints.push(p);
          }

          // Draw the arc
          ctx.save();
          const isCurrentSelected = hub.id === selectedId;
          ctx.strokeStyle = isCurrentSelected ? "rgba(245, 158, 11, 0.85)" : "rgba(245, 158, 11, 0.35)";
          ctx.lineWidth = (isCurrentSelected ? 2.2 : 1.2) * dpr;
          ctx.beginPath();

          let drawing = false;
          for (let i = 0; i < arcPoints.length - 1; i++) {
            const p1 = arcPoints[i];
            const p2 = arcPoints[i + 1];
            if (p1.z > 0 && p2.z > 0) {
              if (!drawing) {
                ctx.moveTo(p1.x, p1.y);
                drawing = true;
              }
              ctx.lineTo(p2.x, p2.y);
            } else {
              drawing = false;
            }
          }
          ctx.stroke();

          // Animated Photon Pulse streaming along the arc toward Kyiv!
          const pulseProgress = ((elapsed * 0.0003 + hub.lat * 0.1) % 1.0);
          const pulseIdx = Math.min(numSegments - 1, Math.floor(pulseProgress * numSegments));
          const pulsePt = arcPoints[pulseIdx];

          if (pulsePt && pulsePt.z > 0.05) {
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = "#fbbf24";
            ctx.shadowBlur = 8 * dpr;
            ctx.beginPath();
            ctx.arc(pulsePt.x, pulsePt.y, (isCurrentSelected ? 3.5 : 2.5) * dpr, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      });

      // 9. Partner Country Hub Pins (Fixed on their EXACT coordinates!)
      countries.forEach(hub => {
        const pt = projectPoint(hub.lat, hub.lon, radius, cx, cy, rotX, rotY);

        // Only draw when facing the viewer
        if (pt.z > 0.05) {
          const isSelected = hub.id === selectedId;
          const isHovered = hub.id === hoveredHub;

          ctx.save();

          // Outer radar beacon ping
          if (isSelected || isHovered) {
            const pulseR = (8 + (Math.sin(elapsed * 0.008) + 1) * 4) * dpr;
            ctx.strokeStyle = hub.isMainHub ? "rgba(16, 185, 129, 0.7)" : "rgba(245, 158, 11, 0.7)";
            ctx.lineWidth = 1.5 * dpr;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pulseR, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Pin Core Dot
          ctx.fillStyle = hub.isMainHub ? "#10b981" : isSelected ? "#f59e0b" : "#fbbf24";
          ctx.shadowColor = hub.isMainHub ? "#10b981" : "#f59e0b";
          ctx.shadowBlur = 10 * dpr;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (hub.isMainHub ? 5.5 : isSelected ? 5.0 : 3.8) * dpr, 0, Math.PI * 2);
          ctx.fill();

          // Label Pill next to pin
          const labelText = `${hub.flag} ${hub.name}`;
          ctx.font = `bold ${Math.round((isSelected ? 11 : 9.5) * dpr)}px monospace`;
          const textWidth = ctx.measureText(labelText).width;
          const pillX = pt.x + 8 * dpr;
          const pillY = pt.y - 8 * dpr;

          // Pill background
          ctx.fillStyle = isSelected ? "rgba(245, 158, 11, 0.95)" : "rgba(15, 23, 42, 0.85)";
          ctx.strokeStyle = isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = 1 * dpr;
          ctx.beginPath();
          ctx.roundRect(pillX - 4 * dpr, pillY - 11 * dpr, textWidth + 8 * dpr, 15 * dpr, 4 * dpr);
          ctx.fill();
          ctx.stroke();

          // Pill text
          ctx.fillStyle = isSelected ? "#000000" : "#ffffff";
          ctx.shadowBlur = 0;
          ctx.fillText(labelText, pillX, pillY);

          ctx.restore();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [countries, kyivHub, selectedId, isAutoRotating, hoveredHub, projectPoint]);

  // Raycasting Click Handler: Directly click on any country on the canvas!
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const clickX = (e.clientX - rect.left) * dpr;
    const clickY = (e.clientY - rect.top) * dpr;

    const cx = canvas.width * 0.5;
    const cy = canvas.height * 0.5;
    const radius = Math.min(canvas.width, canvas.height) * 0.42;
    const rotX = rotRef.current.x;
    const rotY = rotRef.current.y;

    // Find closest hub within 25px radius
    let closestHub: CountryDossier | null = null;
    let minDistance = 28 * dpr;

    countries.forEach(hub => {
      const pt = projectPoint(hub.lat, hub.lon, radius, cx, cy, rotX, rotY);
      if (pt.z > 0.05) {
        const dist = Math.hypot(pt.x - clickX, pt.y - clickY);
        if (dist < minDistance) {
          minDistance = dist;
          closestHub = hub;
        }
      }
    });

    if (closestHub) {
      focusOnCountry(closestHub);
    }
  };

  // Mouse drag handlers with natural physical inertia
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDraggingRef.current) {
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;

      targetRotRef.current.y -= dx * 0.005;
      targetRotRef.current.x += dy * 0.004;
      targetRotRef.current.x = Math.max(-0.6, Math.min(0.6, targetRotRef.current.x));

      rotRef.current.x = targetRotRef.current.x;
      rotRef.current.y = targetRotRef.current.y;

      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    } else {
      // Hover detection
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const mouseX = (e.clientX - rect.left) * dpr;
      const mouseY = (e.clientY - rect.top) * dpr;
      const cx = canvas.width * 0.5;
      const cy = canvas.height * 0.5;
      const radius = Math.min(canvas.width, canvas.height) * 0.42;

      let foundHover: string | null = null;
      countries.forEach(hub => {
        const pt = projectPoint(hub.lat, hub.lon, radius, cx, cy, rotRef.current.x, rotRef.current.y);
        if (pt.z > 0.05) {
          const dist = Math.hypot(pt.x - mouseX, pt.y - mouseY);
          if (dist < 22 * dpr) {
            foundHover = hub.id;
          }
        }
      });
      setHoveredHub(foundHover);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for mobile
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

    targetRotRef.current.y -= dx * 0.005;
    targetRotRef.current.x += dy * 0.004;
    targetRotRef.current.x = Math.max(-0.6, Math.min(0.6, targetRotRef.current.x));

    rotRef.current.x = targetRotRef.current.x;
    rotRef.current.y = targetRotRef.current.y;

    lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const resetView = () => {
    playSciFiBeep(880, 0.05);
    targetRotRef.current = { x: 0.35, y: -0.85 };
    setSelectedId("tashkent");
  };

  return (
    <div className="w-full flex flex-col items-center select-none" ref={containerRef}>
      
      {/* 2-Column Stage: 3D Globe on Left, Intelligence Dossier on Right */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-center">
        
        {/* 3D Master Globe Stage */}
        <div className="xl:col-span-7 flex flex-col items-center justify-center relative">
          
          {/* Visual Container */}
          <div className="relative w-full max-w-[460px] sm:max-w-[500px] aspect-square flex items-center justify-center touch-none">
            
            {/* Unified 3D Photorealistic Canvas (Zero Mismatch, Zero Sliding Lines!) */}
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`absolute inset-0 w-full h-full block ${
                hoveredHub ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"
              }`}
            />

            {/* Top Telemetry Header HUD */}
            <div className="absolute top-2.5 left-3 right-3 pointer-events-none flex items-center justify-between text-[10px] font-mono text-slate-400 z-10">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950/85 border border-[#e2c9a0]/30 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-white font-bold tracking-wider">
                  {activeCountry ? `${activeCountry.flag} ${activeCountry.name.toUpperCase()} // ${activeCountry.code}` : "ГЛОБАЛЬНА ЛОГІСТИКА"}
                </span>
              </div>

              <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-950/85 border border-white/10 backdrop-blur-md text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>МАРШРУТИ АКТИВНІ</span>
              </div>
            </div>

            {/* Bottom Coordinate Bar */}
            <div className="absolute bottom-2 left-3 right-3 pointer-events-none flex items-center justify-between text-[9px] font-mono text-slate-400 z-10">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950/80 border border-white/10 backdrop-blur-md">
                <Globe2 className="w-3 h-3 text-amber-400" />
                <span>КИЇВ (ХАБ): 50.45°N // 30.52°E</span>
              </div>
              <span className="text-slate-400 hidden sm:inline">Клікайте прямо на країну на карті</span>
            </div>
          </div>

          {/* Quick Hub Selector Buttons beneath Globe */}
          <div className="w-full max-w-lg mt-3 px-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar justify-start sm:justify-center">
              {countries.map((country) => {
                const isSelected = selectedId === country.id;
                return (
                  <button
                    key={country.id}
                    onClick={() => focusOnCountry(country)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                      isSelected
                        ? "bg-amber-500 border-amber-400 text-black font-bold shadow-gold-glow scale-105"
                        : country.isMainHub
                        ? "bg-slate-900/90 border-emerald-500/40 text-emerald-300 hover:bg-slate-800"
                        : "bg-slate-900/70 border-white/10 text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <span>{country.flag}</span>
                    <span className="font-semibold">{country.name}</span>
                    <span className="text-[10px] opacity-80">
                      {country.isMainHub ? "UA" : country.targetWageUA.replace(" / міс", "")}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Utility Controls */}
            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playMechanicalClick();
                    setIsAutoRotating(!isAutoRotating);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900/80 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
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
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900/80 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3 h-3 text-[#e2c9a0]" />
                  <span>Скинути ракурс</span>
                </button>
              </div>

              <span className="text-slate-400">Обертайте курсором у будь-який бік</span>
            </div>
          </div>

        </div>

        {/* B2B Country Intelligence Dossier (Fixed Height to Prevent Layout Shift) */}
        <div className="xl:col-span-5 w-full flex flex-col justify-center">
          <div className="w-full min-h-[520px] rounded-2xl bg-slate-950/90 border border-amber-500/40 p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between transition-all">
            
            {activeCountry ? (
              <div className="flex flex-col h-full justify-between space-y-3">
                {/* Header with Hub Type */}
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] font-mono">
                    <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {activeCountry.hubType}
                    </span>
                    <span className="text-slate-400 font-mono">{activeCountry.satelliteCoords}</span>
                  </div>

                  {/* Country Name & Flag */}
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

                {/* Satellite Reconnaissance Window */}
                <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[16/7] shadow-inner group">
                  <img
                    src={activeCountry.satelliteImage}
                    alt={activeCountry.country}
                    className="w-full h-full object-cover brightness-[0.85] contrast-110 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950/85 border border-amber-400/40 text-[8px] font-mono text-amber-300 font-bold backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>СУПУТНИКОВА ТЕЛЕМЕТРІЯ</span>
                  </div>

                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[8px] font-mono text-slate-300 pointer-events-none">
                    <span className="text-amber-200/90 font-bold">{activeCountry.satelliteCoords}</span>
                    <span className="text-[#e2c9a0]">ВИСОТА: {activeCountry.altitude}</span>
                  </div>
                </div>

                {/* Wage Benchmark Box */}
                <div className="p-3 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30">
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-[9px] font-mono uppercase text-[#e2c9a0]">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Banknote className="w-3.5 h-3.5 text-amber-400" />
                      Рівень заробітних плат (порівняння)
                    </span>
                    <span className="text-emerald-400 font-bold">{activeCountry.wageMultiplier}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-left">
                      <div className="text-[9px] text-slate-400 font-mono">СТАВКА В УКРАЇНІ:</div>
                      <div className="text-lg font-black text-amber-400 tracking-tight mt-0.5">
                        {activeCountry.targetWageUA}
                      </div>
                      <div className="text-[9px] text-amber-300/80 font-mono">
                        {activeCountry.targetWageUAH}
                      </div>
                    </div>

                    <div className="text-left border-l border-white/10 pl-2">
                      <div className="text-[9px] text-slate-400 font-mono">ДОМАШНЯ СТАВКА:</div>
                      <div className="text-base font-bold text-slate-400 tracking-tight mt-0.5 line-through decoration-red-400/50">
                        {activeCountry.homeWage}
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono">
                        {activeCountry.homeWageUAH}
                      </div>
                    </div>
                  </div>

                  {/* Relative Visual Meter */}
                  <div className="mt-2 pt-1.5 border-t border-white/5">
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-1">
                      <span>Різниця доходів:</span>
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

                {/* Cultural Profile & Discipline */}
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-[10px]">
                  <div className="font-mono text-amber-300 uppercase font-bold flex items-center gap-1.5 mb-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                    <span>Трудова дисципліна та менталітет:</span>
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

                {/* Visa & Immunity Requisites */}
                <div className="grid grid-cols-2 gap-2 text-[9px] font-mono pt-1">
                  <div className="p-1.5 rounded bg-white/5 border border-white/5">
                    <div className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>СТРОК ВИХОДУ:</span>
                    </div>
                    <div className="text-white font-bold mt-0.5">{activeCountry.visaTime}</div>
                  </div>

                  <div className="p-1.5 rounded bg-white/5 border border-white/5">
                    <div className="text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>СТ. 23 ЗУ:</span>
                    </div>
                    <div className="text-emerald-400 font-bold mt-0.5">100% Імунітет</div>
                  </div>
                </div>

                {/* CTA Action Button */}
                <div className="pt-2 border-t border-white/10">
                  <a
                    href="#calculator"
                    onClick={() => playSciFiBeep(1200, 0.08)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-black font-extrabold text-xs hover:brightness-110 shadow-gold-glow transition-all active:scale-95"
                  >
                    <span>Замовити персонал з коридору {activeCountry.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full justify-center items-center text-center p-6">
                <MapPin className="w-8 h-8 text-amber-400 animate-bounce mb-3" />
                <h4 className="text-base font-bold text-white">Оберіть країну на карті</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Клікніть на будь-яку мітку на глобусі, щоб наблизити її та відкрити повне комерційне досьє.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
