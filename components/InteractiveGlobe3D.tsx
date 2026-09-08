"use client";

import React, { useEffect, useRef, useState } from "react";
import { 
  RotateCcw, 
  Play, 
  Pause, 
  ZoomOut, 
  ShieldCheck, 
  Clock, 
  Users, 
  ArrowRight
} from "lucide-react";
import { playSciFiBeep } from "@/lib/soundFX";

export interface CountryDossier {
  id: string;
  name: string;
  country: string;
  flag: string;
  code: string;
  lat: number;
  lon: number;
  hubType: string;
  workersCount: string;
  visaTime: string;
  securityCheck: string;
  languageSupport: string;
  isMainHub?: boolean;
  professions: string[];
  keyStrengths: string;
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

  // Keep ref in sync
  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);

  // Clean, professional cartographic partner network & B2B dossier
  const countries: CountryDossier[] = [
    {
      id: "kyiv",
      name: "Київ",
      country: "Україна",
      flag: "🇺🇦",
      code: "UA",
      lat: 50.4501,
      lon: 30.5234,
      hubType: "ГОЛОВНИЙ B2B ХАБ // ПРЯМИЙ НАЙМ У ШТАТ",
      workersCount: "Єдиний офіційний центр координації",
      visaTime: "0 днів (Оформлення на місці)",
      securityCheck: "100% ВТК / Захист від штрафів Держпраці",
      languageSupport: "Державна мова / Виробничі стандарти ДСТУ",
      isMainHub: true,
      professions: [
        "Зварювальники 135/136",
        "Оператори ЧПУ",
        "Слюсарі-монтажники",
        "Будівельники-монолітники",
        "Швачки"
      ],
      keyStrengths: "Пряме зарахування робітників у штатні розписи українських заводів без посередників та аутстафінгу."
    },
    {
      id: "tashkent",
      name: "Ташкент",
      country: "Узбекистан",
      flag: "🇺🇿",
      code: "UZ",
      lat: 41.2995,
      lon: 69.2401,
      hubType: "АКРЕДИТОВАНИЙ ВІДБІРКОВИЙ ЦЕНТР",
      workersCount: "480+ атестованих майстрів у пулі",
      visaTime: "25–35 робочих днів",
      securityCheck: "МВС + Інтерпол + Біометричний скринінг",
      languageSupport: "Вільна виробнича комунікація / Бригадири",
      professions: [
        "Зварювальники труб під рентген",
        "Арматурники",
        "Оператори фрезерних верстатів",
        "Бетонярі"
      ],
      keyStrengths: "Висока культура праці, сувора дисципліна, відсутність алкогольного фактору, повна готовність до змін 10–12 год."
    },
    {
      id: "delhi",
      name: "Нью-Делі",
      country: "Індія",
      flag: "🇮🇳",
      code: "IN",
      lat: 28.6139,
      lon: 77.2090,
      hubType: "ІНЖЕНЕРНО-ТЕХНІЧНИЙ КЛАСТЕР",
      workersCount: "320+ спеціалістів виробництва",
      visaTime: "35–45 робочих днів",
      securityCheck: "Консульська легалізація + Довідка несудимості",
      languageSupport: "Англійська мова / Російськомовні координатори",
      professions: [
        "Токарі-універсали",
        "Фрезерувальники 4-6 розряду",
        "Електромонтажники промислового устаткування",
        "Оператори лазерної різки"
      ],
      keyStrengths: "Потужна базова технічна освіта, висока швидкість читання креслень, досвід на міжнародних заводах."
    },
    {
      id: "manila",
      name: "Маніла",
      country: "Філіппіни",
      flag: "🇵🇭",
      code: "PH",
      lat: 14.5995,
      lon: 120.9842,
      hubType: "СПЕЦІАЛІЗОВАНИЙ ЦЕНТР ПРЕЦИЗІЙНОГО ВИРОБНИЦТВА",
      workersCount: "190+ операторів та швачок",
      visaTime: "40–50 робочих днів",
      securityCheck: "Державна сертифікація DMW/POEA + Інтерпол",
      languageSupport: "Англійська мова (високий рівень)",
      professions: [
        "Швачки високошвидкісних ліній",
        "Збирачі мікроелектроніки",
        "Оператори пакувальних комплексів",
        "Контролери якості ВТК"
      ],
      keyStrengths: "Еталонна акуратність, мінімальний рівень браку (менше 0.1%), ідеальне дотримання технологічних карт."
    },
    {
      id: "dhaka",
      name: "Дакка",
      country: "Бангладеш",
      flag: "🇧🇩",
      code: "BD",
      lat: 23.8103,
      lon: 90.4125,
      hubType: "МАСОВИЙ БУДІВЕЛЬНО-МОНТАЖНИЙ ПУЛ",
      workersCount: "150+ монтажників та будівельників",
      visaTime: "30–40 робочих днів",
      securityCheck: "Урядовий BMET реєстр + Сертифікат здоров'я",
      languageSupport: "Бригадири-координатори",
      professions: [
        "Монтажники будівельних лісів",
        "Бетонярі-монолітники",
        "Дорожні робітники",
        "Слюсарі металоконструкцій"
      ],
      keyStrengths: "Швидке закриття великих потреб (від 15 до 50 осіб на один об'єкт), стійкість до важких погодних умов."
    },
    {
      id: "kathmandu",
      name: "Катманду",
      country: "Непал",
      flag: "🇳🇵",
      code: "NP",
      lat: 27.7172,
      lon: 85.3240,
      hubType: "ГІРНИЧО-БУДІВЕЛЬНИЙ РЕЗЕРВ ВИТРИВАЛОСТІ",
      workersCount: "110+ фізично загартованих майстрів",
      visaTime: "35–45 робочих днів",
      securityCheck: "Поліцейський департамент Непалу + Медогляд",
      languageSupport: "Базова виробнича термінологія / Координатори",
      professions: [
        "Арматурники",
        "Каменярі-муляри",
        "Такелажники важких вантажів",
        "Робітники кар'єрів"
      ],
      keyStrengths: "Феноменальна фізична витривалість, чесність, повага до керівництва та нульовий рівень конфліктності."
    },
    {
      id: "chisinau",
      name: "Кишинів",
      country: "Молдова",
      flag: "🇲🇩",
      code: "MD",
      lat: 47.0105,
      lon: 28.8638,
      hubType: "ТРАНЗИТНИЙ ЄВРОПЕЙСЬКИЙ ХАБ",
      workersCount: "Логістичний коридор прибуття",
      visaTime: "Оперативний транзит (1–2 дні)",
      securityCheck: "Прикордонна служба України (ДПСУ) + ДЦЗ",
      languageSupport: "Українська / Румунська / Російська",
      professions: [
        "Водії міжнародних категорій C/E",
        "Логісти транзитних потоків"
      ],
      keyStrengths: "Сухопутний коридор безпечної доставки рекрутованих працівників прямо до підприємств замовника в Україні."
    }
  ];

  // Sovereign Country Borders Polygons (Baked directly into NASA Earth texture)
  const countryPolygons: { name: string; stroke: string; fill: string; width: number; points: [number, number][] }[] = [
    {
      name: "Україна",
      stroke: "rgba(245, 158, 11, 0.98)",
      fill: "rgba(245, 158, 11, 0.28)",
      width: 4.5,
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
      stroke: "rgba(56, 189, 248, 0.95)",
      fill: "rgba(56, 189, 248, 0.22)",
      width: 2.8,
      points: [
        [45.0, 56.0], [45.6, 58.5], [44.9, 61.5], [42.0, 63.0],
        [41.0, 66.0], [41.3, 69.2], [41.0, 71.5], [40.5, 73.0],
        [40.0, 71.5], [39.0, 68.0], [37.2, 67.3], [37.5, 65.5],
        [38.5, 63.5], [40.0, 62.0], [41.5, 60.5], [41.2, 56.0], [45.0, 56.0]
      ]
    },
    {
      name: "Індія",
      stroke: "rgba(56, 189, 248, 0.95)",
      fill: "rgba(56, 189, 248, 0.20)",
      width: 2.8,
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
      stroke: "rgba(56, 189, 248, 0.95)",
      fill: "rgba(56, 189, 248, 0.22)",
      width: 2.4,
      points: [
        [18.5, 121.0], [18.0, 122.5], [16.0, 122.5], [14.0, 124.2],
        [12.5, 125.5], [9.5, 126.2], [6.0, 126.0], [5.5, 125.0],
        [7.0, 122.0], [9.0, 123.0], [10.5, 122.5], [12.0, 120.0],
        [14.5, 120.5], [16.5, 119.8], [18.5, 121.0]
      ]
    },
    {
      name: "Бангладеш",
      stroke: "rgba(56, 189, 248, 0.95)",
      fill: "rgba(56, 189, 248, 0.22)",
      width: 2.4,
      points: [
        [26.5, 88.5], [26.0, 89.8], [25.2, 92.0], [23.8, 92.5],
        [21.5, 92.2], [21.7, 91.8], [22.3, 90.5], [21.8, 89.5],
        [22.5, 89.0], [24.5, 88.2], [26.5, 88.5]
      ]
    },
    {
      name: "Непал",
      stroke: "rgba(56, 189, 248, 0.95)",
      fill: "rgba(56, 189, 248, 0.22)",
      width: 2.4,
      points: [
        [30.4, 80.5], [30.0, 81.5], [28.8, 83.5], [28.0, 85.5],
        [27.7, 88.2], [26.8, 88.0], [26.5, 87.0], [27.5, 85.0],
        [28.2, 82.0], [29.0, 80.2], [30.4, 80.5]
      ]
    },
    {
      name: "Молдова",
      stroke: "rgba(56, 189, 248, 0.95)",
      fill: "rgba(56, 189, 248, 0.22)",
      width: 2.4,
      points: [
        [48.4, 27.5], [48.2, 28.5], [47.5, 29.2], [46.5, 30.0],
        [45.5, 28.2], [46.0, 28.1], [47.0, 27.6], [48.0, 27.0], [48.4, 27.5]
      ]
    }
  ];

  // Cartographic Inscriptions directly on Map Surface
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

  // Smooth Fly-To Function for quick selection
  const flyToCountry = (country: CountryDossier, zoomLevel = 1.48) => {
    playSciFiBeep(1100, 0.07);
    setSelectedCity(country);
    targetZoomRef.current = zoomLevel;

    // Calculate optimal rotX and rotY to place country front and center
    const targetY = country.lon * (Math.PI / 180);
    // Keep Ukraine and Europe upright with comfortable pitch angle
    const targetX = Math.max(-0.62, Math.min(-0.18, -country.lat * (Math.PI / 180) * 0.65));

    targetRotRef.current = { x: targetX, y: targetY };
  };

  const resetView = () => {
    playSciFiBeep(840, 0.06);
    setSelectedCity(null);
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

    // Dual-Pass NASA Fragment Shader: Day Marble + Night City Lights + Dynamic Zoom + Specular
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

        // Night city lights emergence on the shaded hemisphere (Authentic NASA city lighting)
        float nightFactor = smoothstep(0.20, -0.28, NdotL);
        vec3 cityLights = nightColor.rgb * vec3(1.4, 1.2, 0.85) * nightFactor * 1.65;

        // Specular Ocean Glint (only on sunlight side)
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfVec = normalize(sunDir + viewDir);
        float specFactor = pow(max(0.0, dot(normal, halfVec)), 32.0);
        float isWater = smoothstep(0.32, 0.0, dayColor.r);
        vec3 specular = vec3(0.9, 0.95, 1.0) * specFactor * 0.35 * isWater * max(0.0, NdotL);

        // Thin Internal Rayleigh Atmospheric Limb (Real orbital blue haze)
        float rim = pow(1.0 - normal.z, 3.5);
        vec3 rimGlow = vec3(0.25, 0.60, 0.95) * rim * 0.55;

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

        // 2. Draw Realistic Political Sovereign Borders for Key Partners
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

          // Fill text
          offCtx.fillStyle = item.isGold ? "#fef08a" : "#ffffff";
          offCtx.fillText(item.country, x, y);

          // Capital city inscription
          if (item.city) {
            const citySize = Math.round(item.size * 0.68);
            offCtx.font = `bold ${citySize}px "Segoe UI", Arial, sans-serif`;
            offCtx.strokeStyle = "rgba(0, 0, 0, 0.90)";
            offCtx.lineWidth = 3.6;
            offCtx.strokeText(item.city, x, y + item.size * 0.95);

            offCtx.fillStyle = item.isGold ? "#fde047" : "#bae6fd";
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

    // Render loop with smooth interpolation (lerp) for rotation and zoom
    const render = () => {
      // 1. Zoom lerp
      zoomRef.current += (targetZoomRef.current - zoomRef.current) * 0.08;
      setCurrentZoomState(zoomRef.current);

      // 2. Rotation physics and fly-to interpolation
      if (isDraggingRef.current) {
        // Dragging is direct
        targetRotRef.current.x = rotRef.current.x;
        targetRotRef.current.y = rotRef.current.y;
      } else {
        if (selectedCity) {
          // Smooth Lerp to focused target country using shortest angular arc for Yaw
          rotRef.current.x += (targetRotRef.current.x - rotRef.current.x) * 0.08;
          
          let diffY = (targetRotRef.current.y - rotRef.current.y) % (2 * Math.PI);
          if (diffY > Math.PI) diffY -= 2 * Math.PI;
          if (diffY < -Math.PI) diffY += 2 * Math.PI;
          rotRef.current.y += diffY * 0.08;
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
          scale: Math.max(0.85, Math.min(1.2, 0.85 + p2z * 0.3)),
        };
      });

      setProjectedPins(newPins);

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

  // Find projected pin for selected city to render targeting reticle
  const activeProjectedPin = projectedPins.find(p => p.pin.id === selectedCity?.id);

  return (
    <div className="relative w-full max-w-[560px] mx-auto flex flex-col items-center select-none">
      
      {/* Visual Globe Container with Aerospace Aspect */}
      <div
        ref={containerRef}
        className="relative w-full aspect-square max-w-[540px] touch-none"
      >
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

        {/* Aerospace Telemetry Top HUD Badge */}
        <div className="absolute top-2.5 left-3 right-3 pointer-events-none flex items-center justify-between text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950/80 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold tracking-wider">
              {selectedCity ? `ЦІЛЬ: ${selectedCity.code} // ${selectedCity.name.toUpperCase()}` : "СУПУТНИКОВИЙ МОНІТОРИНГ"}
            </span>
          </div>

          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-slate-950/80 border border-white/10 backdrop-blur-md">
            <span className="text-slate-400">МАСШТАБ:</span>
            <span className="text-amber-400 font-bold">{(currentZoomState * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* Aerospace Targeting Reticle around active focused country */}
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
            {/* Spinning Tactical Target Crosshair */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Outer corner brackets */}
              <div className="absolute inset-0 border border-amber-400/40 rounded-full animate-ping duration-1000 opacity-30" />
              <div className="absolute inset-0 border border-amber-400/70 rounded-full animate-[spin_8s_linear_infinite]" />
              {/* Crosshair ticks */}
              <div className="absolute w-full h-[1px] bg-amber-400/50" />
              <div className="absolute h-full w-[1px] bg-amber-400/50" />
              {/* Inner focal pip */}
              <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-300 bg-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.9)]" />
            </div>
          </div>
        )}

        {/* Interactive Hub Pips */}
        <div className="absolute inset-0 pointer-events-none">
          {projectedPins.map(({ pin, x, y, visible, opacity, scale }) => {
            if (!visible) return null;
            const isSelected = selectedCity?.id === pin.id;
            const isHovered = hoveredCity?.id === pin.id;
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
                onClick={() => {
                  if (isSelected) {
                    resetView();
                  } else {
                    flyToCountry(pin, 1.48);
                  }
                }}
                onMouseEnter={() => setHoveredCity(pin)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                <div className="relative flex items-center justify-center cursor-pointer group">
                  {/* Micro-Pip */}
                  <div
                    className={`rounded-full border transition-all ${
                      isMain
                        ? "w-3 h-3 bg-amber-400 border-amber-100 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                        : "w-2.5 h-2.5 bg-sky-400 border-sky-100 group-hover:scale-125"
                    }`}
                  />

                  {/* Refined Tooltip on Hover only if not selected */}
                  {(isHovered && !isSelected) && (
                    <div
                      className={`absolute bottom-full mb-1.5 px-2.5 py-1 rounded-md border text-[10px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md shadow-xl whitespace-nowrap z-40 transition-all ${
                        isMain
                          ? "bg-slate-950/95 border-amber-500/80 text-amber-300"
                          : "bg-slate-950/95 border-sky-400/80 text-sky-200"
                      }`}
                    >
                      <span>{pin.flag}</span>
                      <span>{pin.name}</span>
                      <span className="text-[8px] text-white/60 font-normal">({pin.country})</span>
                      <span className="text-amber-400 text-[9px]">🔍 Натисніть для наближення</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Detail B2B Dossier HUD Card overlay */}
        {selectedCity && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-80 p-4 rounded-xl bg-slate-950/95 border border-amber-500/40 text-xs shadow-2xl backdrop-blur-xl z-40 animate-in fade-in zoom-in-95 duration-200">
            {/* Header with Close */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <span className="font-mono text-[9px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {selectedCity.hubType}
              </span>
              <button
                onClick={resetView}
                className="text-white/50 hover:text-white font-mono text-xs px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors"
                title="Закрити та скинути наближення"
              >
                ✕
              </button>
            </div>

            {/* Country Title */}
            <div className="flex items-center justify-between">
              <div className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-lg">{selectedCity.flag}</span>
                <span>{selectedCity.name}, {selectedCity.country}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
                {selectedCity.code}
              </span>
            </div>

            {/* Strength Description */}
            <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
              {selectedCity.keyStrengths}
            </p>

            {/* Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 my-3 pt-2 border-t border-white/10 text-[10px] font-mono">
              <div className="p-1.5 rounded bg-white/5 border border-white/5">
                <div className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Строк візи D-04:</span>
                </div>
                <div className="text-white font-bold mt-0.5">{selectedCity.visaTime}</div>
              </div>

              <div className="p-1.5 rounded bg-white/5 border border-white/5">
                <div className="text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Безпека:</span>
                </div>
                <div className="text-emerald-400 font-bold mt-0.5">100% Перевірено</div>
              </div>
            </div>

            {/* Professions tags */}
            <div className="mb-3">
              <div className="text-[9px] font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1">
                <Users className="w-3 h-3 text-sky-400" />
                <span>Доступні фахівці в пулі:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedCity.professions.slice(0, 3).map((prof, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-[9px] font-mono bg-sky-500/10 text-sky-300 border border-sky-500/20"
                  >
                    {prof}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA Button: Order Specialists */}
            <div className="pt-2 border-t border-white/10 flex items-center gap-2">
              <a
                href="#calculator"
                onClick={() => playSciFiBeep(1200, 0.08)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-[11px] hover:brightness-110 shadow-gold-glow transition-all"
              >
                <span>Замовити з {selectedCity.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={resetView}
                className="px-2.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-[11px] font-mono transition-colors"
                title="Скинути наближення"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tactile Country Quick-Selector Bar & Aerospace Controls */}
      <div className="w-full mt-3 px-1">
        {/* Country Quick Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar justify-start sm:justify-center">
          {countries.slice(0, 6).map((country) => {
            const isSelected = selectedCity?.id === country.id;
            return (
              <button
                key={country.id}
                onClick={() => {
                  if (isSelected) {
                    resetView();
                  } else {
                    flyToCountry(country, 1.48);
                  }
                }}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200 ${
                  isSelected
                    ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.4)] scale-105"
                    : country.isMainHub
                    ? "bg-slate-900/80 border-amber-500/40 text-amber-200/90 hover:bg-slate-800 hover:border-amber-400"
                    : "bg-slate-900/70 border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-white/20"
                }`}
              >
                <span>{country.flag}</span>
                <span>{country.country}</span>
                {isSelected && <span className="text-[10px] text-amber-400 font-bold">🔍</span>}
              </button>
            );
          })}
        </div>

        {/* Tactile Control Utility Buttons */}
        <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSciFiBeep(880, 0.05);
                setIsAutoRotating(!isAutoRotating);
              }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-900/60 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
            >
              {isAutoRotating ? (
                <>
                  <Pause className="w-3 h-3 text-amber-400" />
                  <span>Пауза обертання</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-emerald-400" />
                  <span>Відновити оберт</span>
                </>
              )}
            </button>

            <button
              onClick={resetView}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-900/60 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-sky-400" />
              <span>Огляд Землі (100%)</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[9px] text-slate-500">
            <span>🖱️ Перетягуйте мишкою або клікайте на країну</span>
          </div>
        </div>
      </div>
    </div>
  );
};