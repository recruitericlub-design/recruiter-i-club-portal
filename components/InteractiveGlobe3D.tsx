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
  CheckCircle2
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
  targetWageUA: string;       // e.g. "від 900 € / міс" or "від 600 € / міс"
  targetWageUAH: string;      // e.g. "~39 500 ₴ / міс"
  homeWage: string;           // e.g. "~220 – 320 € / міс"
  homeWageUAH: string;        // e.g. "~9 500 – 14 000 ₴"
  wageMultiplier: string;     // e.g. "у 3.2 рази вище"
  visaTime: string;           // e.g. "25–35 робочих днів"
  securityCheck: string;      // "100% ВТК / Інтерпол / ст. 23 ЗУ"
  workSchedule: string;       // "10–12 год / зміна, 6 днів/тиж"
  culturalTraits: string[];   // Cultural mentality and adaptation features
  economicAdvantage: string;  // Economic motivation rationale
  flightCode: string;         // Flight number into Kyiv
  flightOrigin: string;       // Origin airport
  isMainHub?: boolean;
}

interface FlightRoute {
  id: string;
  code: string;
  fromName: string;
  origin: [number, number]; // [lat, lon]
  speed: number;
  offset: number;
}

export const InteractiveGlobe3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  // Clean, realistic B2B wage metrics & economic/cultural partner dossiers
  const countries: CountryDossier[] = [
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
    }
  ];

  // Orbital Flight Routes heading to Kyiv (UA)
  const flightRoutes: FlightRoute[] = [
    { id: "f1", code: "HY-731", fromName: "Ташкент", origin: [41.2995, 69.2401], speed: 0.00012, offset: 0.15 },
    { id: "f2", code: "AI-419", fromName: "Делі", origin: [28.6139, 77.2090], speed: 0.00010, offset: 0.45 },
    { id: "f3", code: "PR-882", fromName: "Маніла", origin: [14.5995, 120.9842], speed: 0.00008, offset: 0.70 },
    { id: "f4", code: "BG-504", fromName: "Дакка", origin: [23.8103, 90.4125], speed: 0.00011, offset: 0.30 },
    { id: "f5", code: "RA-218", fromName: "Катманду", origin: [27.7172, 85.3240], speed: 0.00010, offset: 0.85 },
  ];

  // Realistic Cartographic Borders: Muted Warm Sand/Parchment (NO cheap neon cyan!)
  const countryPolygons: { name: string; stroke: string; fill: string; width: number; points: [number, number][] }[] = [
    {
      name: "Україна",
      stroke: "rgba(234, 179, 8, 0.95)", // Sovereign Deep Warm Gold
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
      stroke: "rgba(226, 201, 160, 0.90)", // Warm Titanium Sand / Parchment
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

  // Cartographic Inscriptions: warm parchment and gold typography
  const countryInscriptions = [
    { country: "УКРАЇНА", city: "Київ ★", lat: 48.8, lon: 32.2, size: 21, isGold: true },
    { country: "УЗБЕКИСТАН", city: "Ташкент •", lat: 41.5, lon: 64.5, size: 16, isGold: false },
    { country: "ІНДІЯ", city: "Нью-Делі •", lat: 22.0, lon: 78.5, size: 21, isGold: false },
    { country: "ФІЛІППІНИ", city: "Маніла •", lat: 13.0, lon: 122.5, size: 14, isGold: false },
    { country: "БАНГЛАДЕШ", city: "Дакка •", lat: 24.2, lon: 90.0, size: 13, isGold: false },
    { country: "НЕПАЛ", city: "Катманду •", lat: 28.5, lon: 84.0, size: 13, isGold: false },
    { country: "МОЛДОВА", city: "", lat: 46.8, lon: 28.5, size: 10, isGold: false },
  ];

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

  // Active country is either clicked or hovered
  const activeCountry = selectedCity || hoveredCity;

  // Deep Satellite Zoom on Click: magnifies the chosen country!
  const focusCountry = (country: CountryDossier, zoomLevel = 2.35) => {
    targetZoomRef.current = zoomLevel;

    // Calculate optimal rotX and rotY to place country front and center
    const targetY = country.lon * (Math.PI / 180);
    // Keep Europe & country upright with comfortable pitch angle
    const targetX = Math.max(-0.62, Math.min(-0.18, -country.lat * (Math.PI / 180) * 0.65));

    targetRotRef.current = { x: targetX, y: targetY };
  };

  const handleCountryClick = (country: CountryDossier) => {
    playSciFiBeep(1100, 0.07);
    if (selectedCity?.id === country.id) {
      resetView();
    } else {
      setSelectedCity(country);
      focusCountry(country, 2.35);
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

    // Vertex Shader
    const vsSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Dual-Pass NASA Fragment Shader: Day Marble + Night City Lights + Deep Satellite Zoom + Specular
    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uEarthTexture;
      uniform sampler2D uNightTexture;
      uniform vec2 uResolution;
      uniform vec2 uRotation;
      uniform float uRadius;
      uniform float uZoom;

      #define PI 3.141592653589793

      void main() {
        vec2 st = (gl_FragCoord.xy - uResolution * 0.5);
        float d = length(st);
        
        // Effective spherical radius with dynamic zoom
        float R = uRadius * uZoom;

        // Razor-sharp natural sphere boundary (NO fake neon outer rings!)
        if (d > R) {
          discard;
        }

        // Exact spherical normal (North Pole at +y / Top)
        float z = sqrt(max(0.0, R * R - d * d));
        vec3 normal = vec3(st.x / R, st.y / R, z / R);

        // Apply 3D Rotation (Pitch X, Yaw Y)
        float cx = cos(uRotation.x);
        float sx = sin(uRotation.x);
        float cy = cos(uRotation.y);
        float sy = sin(uRotation.y);

        vec3 p = normal;
        // Pitch (X)
        p = vec3(p.x, p.y * cx - p.z * sx, p.y * sx + p.z * cx);
        // Yaw (Y)
        p = vec3(p.x * cy + p.z * sy, p.y, -p.x * sy + p.z * cy);

        // Spherical UV Mapping (Latitude +PI/2 = North = v 1.0)
        float lat = asin(clamp(p.y, -1.0, 1.0));
        float lon = atan(p.x, p.z);
        vec2 uv = vec2((lon + PI) / (2.0 * PI), (lat + PI * 0.5) / PI);

        // Sample Day Texture (with baked sovereign borders and typography)
        vec4 dayColor = texture2D(uEarthTexture, uv);

        // Sample Real NASA Night City Lights Texture
        vec4 nightColor = texture2D(uNightTexture, uv);

        // Natural Angled Sunlight Direction
        vec3 sunDir = normalize(vec3(0.55, 0.40, 0.80));
        float NdotL = dot(normal, sunDir);

        // Day diffuse illumination
        float diffuse = clamp(NdotL * 0.85 + 0.35, 0.0, 1.0);

        // Night city lights emergence on shaded hemisphere (Authentic NASA city lighting)
        float nightFactor = smoothstep(0.20, -0.28, NdotL);
        vec3 cityLights = nightColor.rgb * vec3(1.35, 1.15, 0.82) * nightFactor * 1.65;

        // Specular Ocean Glint (only on sunlight side)
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfVec = normalize(sunDir + viewDir);
        float specFactor = pow(max(0.0, dot(normal, halfVec)), 32.0);
        float isWater = smoothstep(0.32, 0.0, dayColor.r);
        vec3 specular = vec3(0.9, 0.95, 1.0) * specFactor * 0.35 * isWater * max(0.0, NdotL);

        // Thin Internal Rayleigh Atmospheric Limb (Real orbital blue haze)
        float rim = pow(1.0 - normal.z, 3.5);
        vec3 rimGlow = vec3(0.25, 0.60, 0.95) * rim * 0.52;

        // Final Composite
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

    // Full-screen Quad Buffer
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

    // Texture 0: Day Texture + Baked Sovereign Borders & Inscriptions
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
        // 1. Draw NASA Blue Marble Satellite Map
        offCtx.drawImage(earthImage, 0, 0, tw, th);

        // 2. Draw Realistic Political Sovereign Borders for Key Partners (Natural warm tones)
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

          // Delicate natural tint fill
          offCtx.fillStyle = poly.fill;
          offCtx.fill();

          // Authentic cartographic border line
          offCtx.strokeStyle = poly.stroke;
          offCtx.lineWidth = poly.width;
          offCtx.lineJoin = "round";
          offCtx.lineCap = "round";
          offCtx.stroke();
        });

        // 3. Bake Professional Cartographic Country Inscriptions & Capital Names
        countryInscriptions.forEach((item) => {
          const x = ((item.lon + 180) / 360) * tw;
          const y = ((90 - item.lat) / 180) * th;

          offCtx.save();
          offCtx.textAlign = "center";
          offCtx.textBaseline = "middle";

          // High-contrast dark halo outline
          offCtx.font = `bold ${item.size}px "Segoe UI", Arial, sans-serif`;
          offCtx.strokeStyle = "rgba(0, 0, 0, 0.94)";
          offCtx.lineWidth = 4.8;
          offCtx.lineJoin = "round";
          offCtx.strokeText(item.country, x, y);

          // Fill text: Gold for Ukraine, Warm Ivory/Champagne for Partners
          offCtx.fillStyle = item.isGold ? "#fef08a" : "#f5ede0";
          offCtx.fillText(item.country, x, y);

          // Capital city inscription
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

        // Upload baked high-precision texture to WebGL
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

    // Texture 1: Real NASA Night City Lights Texture
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

    // Kyiv coordinates for flight routes
    const kyivLatRad = 50.4501 * (Math.PI / 180);
    const kyivLonRad = 30.5234 * (Math.PI / 180);
    const kyiv3D = {
      x: Math.cos(kyivLatRad) * Math.sin(kyivLonRad),
      y: Math.sin(kyivLatRad),
      z: Math.cos(kyivLatRad) * Math.cos(kyivLonRad),
    };

    // Render loop with smooth interpolation (lerp) for rotation, deep zoom and airplanes
    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime);

      // 1. Zoom lerp
      zoomRef.current += (targetZoomRef.current - zoomRef.current) * 0.085;
      setCurrentZoomState(zoomRef.current);

      // 2. Rotation physics and fly-to interpolation
      if (isDraggingRef.current) {
        // Dragging is direct
        targetRotRef.current.x = rotRef.current.x;
        targetRotRef.current.y = rotRef.current.y;
      } else {
        if (selectedCity) {
          // Smooth Lerp to focused target country using shortest angular arc for Yaw
          rotRef.current.x += (targetRotRef.current.x - rotRef.current.x) * 0.085;
          
          let diffY = (targetRotRef.current.y - rotRef.current.y) % (2 * Math.PI);
          if (diffY > Math.PI) diffY -= 2 * Math.PI;
          if (diffY < -Math.PI) diffY += 2 * Math.PI;
          rotRef.current.y += diffY * 0.085;
        } else if (isAutoRotatingRef.current) {
          // Natural steady axial rotation (West to East)
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

      // Project Cartographic Markers using exact inverse spherical rotation with dynamic zoom
      const cssRadius = Math.min(rect.width, rect.height) * 0.38 * zoomRef.current;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotX = rotRef.current.x;
      const rotY = rotRef.current.y;

      const newPins = countries.map((city) => {
        const latRad = city.lat * (Math.PI / 180);
        const lonRad = city.lon * (Math.PI / 180);

        // 3D Point on World Sphere
        const Px = Math.cos(latRad) * Math.sin(lonRad);
        const Py = Math.sin(latRad);
        const Pz = Math.cos(latRad) * Math.cos(lonRad);

        // Invert Yaw (Y)
        const p1x = Px * Math.cos(rotY) - Pz * Math.sin(rotY);
        const p1y = Py;
        const p1z = Px * Math.sin(rotY) + Pz * Math.cos(rotY);

        // Invert Pitch (X)
        const p2x = p1x;
        const p2y = p1y * Math.cos(rotX) + p1z * Math.sin(rotX);
        const p2z = -p1y * Math.sin(rotX) + p1z * Math.cos(rotX);

        // Facing camera test
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

      // 3. Project Top-Down Aerospace Airplanes gliding along Great-Circle routes to Kyiv!
      const newPlanes = flightRoutes.map((route) => {
        const oLat = route.origin[0] * (Math.PI / 180);
        const oLon = route.origin[1] * (Math.PI / 180);
        const origin3D = {
          x: Math.cos(oLat) * Math.sin(oLon),
          y: Math.sin(oLat),
          z: Math.cos(oLat) * Math.cos(oLon),
        };

        // Great-Circle Arc SLERP interpolation
        const dot = origin3D.x * kyiv3D.x + origin3D.y * kyiv3D.y + origin3D.z * kyiv3D.z;
        const theta = Math.acos(Math.max(-1, Math.min(1, dot)));
        
        // Progress t along route (0 to 1)
        const t = (elapsed * route.speed + route.offset) % 1.0;
        const sinTheta = Math.sin(theta);
        
        const s1 = Math.sin((1 - t) * theta) / (sinTheta || 1);
        const s2 = Math.sin(t * theta) / (sinTheta || 1);

        const cur3D = {
          x: s1 * origin3D.x + s2 * kyiv3D.x,
          y: s1 * origin3D.y + s2 * kyiv3D.y,
          z: s1 * origin3D.z + s2 * kyiv3D.z,
        };

        // Forward tangent point for heading calculation
        const tNext = Math.min(1.0, t + 0.02);
        const sn1 = Math.sin((1 - tNext) * theta) / (sinTheta || 1);
        const sn2 = Math.sin(tNext * theta) / (sinTheta || 1);
        const next3D = {
          x: sn1 * origin3D.x + sn2 * kyiv3D.x,
          y: sn1 * origin3D.y + sn2 * kyiv3D.y,
          z: sn1 * origin3D.z + sn2 * kyiv3D.z,
        };

        // Rotate current plane position by globe rotation
        const p1x = cur3D.x * Math.cos(rotY) - cur3D.z * Math.sin(rotY);
        const p1y = cur3D.y;
        const p1z = cur3D.x * Math.sin(rotY) + cur3D.z * Math.cos(rotY);

        const p2x = p1x;
        const p2y = p1y * Math.cos(rotX) + p1z * Math.sin(rotX);
        const p2z = -p1y * Math.sin(rotX) + p1z * Math.cos(rotX);

        // Rotate forward tangent point
        const np1x = next3D.x * Math.cos(rotY) - next3D.z * Math.sin(rotY);
        const np1y = next3D.y;
        const np1z = next3D.x * Math.sin(rotY) + next3D.z * Math.cos(rotY);

        const np2x = np1x;
        const np2y = np1y * Math.cos(rotX) + np1z * Math.sin(rotX);

        // Plane cruises slightly above the globe surface (1.028 radius)
        const planeAltitude = cssRadius * 1.028;
        const planeX = cx + p2x * planeAltitude;
        const planeY = cy - p2y * planeAltitude;

        const nextPlaneX = cx + np2x * planeAltitude;
        const nextPlaneY = cy - np2y * planeAltitude;

        // Tangent heading angle
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
  }, [selectedCity]);

  // Natural Polar Axis Drag Controls
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;

    rotRef.current.y -= dx * 0.005;
    // Strict vertical tilt clamp keeping Europe and Ukraine upright
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

  // Find projected pin for active country to render targeting reticle
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
                {activeCountry ? `СУПУТНИК: ${activeCountry.code} // ${activeCountry.name.toUpperCase()}` : "СУПУТНИКОВИЙ МОНІТОРИНГ"}
              </span>
            </div>

            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-950/85 border border-[#e2c9a0]/20 backdrop-blur-md">
              <span className="text-slate-400">МАСШТАБ:</span>
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
                transform: `translate(-50%, -50%)`,
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
                      {/* Swept Main Wings */}
                      <path d="M12 7L24 16L22 17.5L12 11.5L2 17.5L0 16L12 7Z" fill="#f8fafc" />
                      {/* Wing metallic golden leading edge */}
                      <path d="M12 7L24 16L22 17.5L12 11.5L2 17.5L0 16L12 7Z" stroke="#eab308" strokeWidth="0.5" />
                      {/* Twin Jet Engines under the wings */}
                      <rect x="7" y="11" width="1.8" height="4" rx="0.9" fill="#ca8a04" />
                      <rect x="15.2" y="11" width="1.8" height="4" rx="0.9" fill="#ca8a04" />
                      {/* Aerodynamic Fuselage */}
                      <path d="M12 0C13.2 0 13.7 2 13.7 6L13.4 20L12 21.5L10.6 20L10.3 6C10.3 2 10.8 0 12 0Z" fill="#ffffff" />
                      {/* Cockpit Windshield */}
                      <path d="M11 3.5C11.3 3.2 12.7 3.2 13 3.5L13.2 4.8H10.8L11 3.5Z" fill="#0f172a" />
                      {/* Tail Horizontal Stabilizers */}
                      <path d="M12 20L17 24.5L16 25.5L12 23L8 25.5L7 24.5L12 20Z" fill="#f8fafc" />
                      {/* Tail Fin */}
                      <rect x="11.5" y="18.5" width="1" height="5.5" rx="0.5" fill="#ca8a04" />
                    </svg>

                    {/* Flight Code Callout Badge */}
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
                    {/* Pip: Gold for Ukraine, Warm Champagne Titanium for Partners */}
                    <div
                      className={`rounded-full border transition-all ${
                        isMain
                          ? "w-3.5 h-3.5 bg-amber-400 border-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.9)]"
                          : "w-2.5 h-2.5 bg-[#e2c9a0] border-[#fff8ed] shadow-[0_0_8px_rgba(226,201,160,0.6)] group-hover:scale-125"
                      }`}
                    />

                    {/* Micro-Tooltip on hover only if not active */}
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
        <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col justify-center">
          {activeCountry ? (
            <div className="w-full p-5 rounded-2xl bg-slate-950/95 border border-[#e2c9a0]/40 text-xs shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
              
              {/* Header with Region & Reset View */}
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10">
                <span className="font-mono text-[9px] text-[#e2c9a0] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {activeCountry.hubType}
                </span>
                <button
                  onClick={resetView}
                  className="text-white/50 hover:text-white font-mono text-xs px-2 py-0.5 rounded hover:bg-white/10 transition-colors"
                  title="Скинути фокус"
                >
                  ✕ Скинути
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

              {/* MAIN WAGE COMPARISON BENTO BOX */}
              <div className="mt-3.5 p-3.5 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-[#e2c9a0]/30 shadow-inner">
                <div className="text-[9px] font-mono uppercase text-[#e2c9a0]/90 tracking-wider flex items-center justify-between pb-1.5 border-b border-white/10">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Banknote className="w-3.5 h-3.5 text-amber-400" />
                    Рівень заробітних плат (нетто)
                  </span>
                  <span className="text-emerald-400 font-bold">{activeCountry.wageMultiplier}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2.5">
                  {/* UA Target Wage */}
                  <div className="text-left">
                    <div className="text-[9px] text-slate-400 font-mono">Готові працювати в UA:</div>
                    <div className="text-xl sm:text-2xl font-black text-amber-400 tracking-tight mt-0.5">
                      {activeCountry.targetWageUA}
                    </div>
                    <div className="text-[10px] text-amber-300/80 font-mono font-medium">
                      {activeCountry.targetWageUAH}
                    </div>
                  </div>

                  {/* Home Country Wage */}
                  <div className="text-left border-l border-white/10 pl-3">
                    <div className="text-[9px] text-slate-400 font-mono">Дохід на батьківщині:</div>
                    <div className="text-base sm:text-lg font-bold text-slate-400 tracking-tight mt-0.5 line-through decoration-red-400/50">
                      {activeCountry.homeWage}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {activeCountry.homeWageUAH}
                    </div>
                  </div>
                </div>

                {/* Motivation Multiplier */}
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Мотивація персоналу:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Висока дисципліна / 0% плинності
                  </span>
                </div>
              </div>

              {/* Cultural Differences & Mentality (User Requirement) */}
              <div className="mt-3 p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[10px] font-mono text-[#e2c9a0] uppercase font-bold flex items-center gap-1.5 mb-2">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                  <span>Культурні особливості та менталітет:</span>
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
              <p className="text-[11px] text-slate-300 mt-2.5 leading-relaxed font-sans">
                {activeCountry.economicAdvantage}
              </p>

              {/* Key Safety & Visa Metrics */}
              <div className="grid grid-cols-2 gap-2 my-3 pt-2 border-t border-white/10 text-[10px] font-mono">
                <div className="p-1.5 rounded bg-white/5 border border-white/5">
                  <div className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>Строк візи D-04:</span>
                  </div>
                  <div className="text-white font-bold mt-0.5">{activeCountry.visaTime}</div>
                </div>

                <div className="p-1.5 rounded bg-white/5 border border-white/5">
                  <div className="text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Мобілізація:</span>
                  </div>
                  <div className="text-emerald-400 font-bold mt-0.5">100% Імунітет (ст. 23)</div>
                </div>
              </div>

              {/* Action CTA Button: Order Specialists */}
              <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                <a
                  href="#calculator"
                  onClick={() => playSciFiBeep(1200, 0.08)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-black font-bold text-xs hover:brightness-110 shadow-gold-glow transition-all active:scale-95"
                >
                  <span>Розрахувати витрати на {activeCountry.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={resetView}
                  className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                  title="Скинути наближення"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Default State when no country is clicked yet */
            <div className="w-full p-6 rounded-2xl bg-slate-950/70 border border-white/10 text-xs shadow-xl backdrop-blur-md flex flex-col items-center text-center justify-center min-h-[360px]">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3 shadow-gold-glow">
                <Plane className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wide">
                Оберіть країну на 3D-глобусі
              </h4>
              <p className="text-slate-400 mt-2 leading-relaxed max-w-xs">
                Клікніть на будь-яку країну або літак на карті. Глобус наблизиться з високою деталізацією, а тут відкриється порівняння зарплат, культурні відмінності та переваги.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px]">
                <span>✈️ Активні регулярні рейси в Україну</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tactile Country Quick-Selector Bar & Aerospace Controls */}
      <div className="w-full max-w-4xl mt-5 px-2">
        {/* Country Quick Tabs with Deep Satellite Zoom */}
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
                  {country.isMainHub ? "Хаб" : country.targetWageUA.replace(" / міс", "")}
                </span>
                {isSelected && <span className="text-[10px] text-amber-400 font-bold">🔍</span>}
              </button>
            );
          })}
        </div>

        {/* Tactile Control Utility Buttons */}
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
                  <span>Пауза</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Обертання</span>
                </>
              )}
            </button>

            <button
              onClick={resetView}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/70 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#e2c9a0]" />
              <span>Огляд Землі (100%)</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400">
            <span>💡 Клікніть на країну для супутникового наближення</span>
          </div>
        </div>
      </div>
    </div>
  );
};