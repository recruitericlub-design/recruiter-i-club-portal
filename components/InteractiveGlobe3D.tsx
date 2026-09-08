"use client";

import React, { useEffect, useRef, useState } from "react";
import { Globe, Plane, Radio, Shield, Sparkles, Navigation, Info } from "lucide-react";

interface City {
  name: string;
  country: string;
  flag: string;
  lat: number;
  lon: number;
  workers: string;
  visaTime: string;
  type: "origin" | "destination";
}

interface Arc {
  from: City;
  to: City;
  progress: number;
  speed: number;
}

interface CountryBorder {
  name: string;
  flag: string;
  color: string;
  borderColor: string;
  points: [number, number][];
  center: [number, number];
}

export const InteractiveGlobe3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0.35, y: -1.2 });
  const mouseRef = useRef({ x: 0, y: 0, downX: 0, downY: 0 });

  // Key Industrial Cities & Hubs
  const cities: City[] = [
    { name: "Київ", country: "Україна", flag: "🇺🇦", lat: 50.4501, lon: 30.5234, workers: "Головний B2B хаб", visaTime: "Пряме працевлаштування", type: "destination" },
    { name: "Ташкент", country: "Узбекистан", flag: "🇺🇿", lat: 41.2995, lon: 69.2401, workers: "480+ майстрів", visaTime: "21–28 днів", type: "origin" },
    { name: "Нью-Делі", country: "Індія", flag: "🇮🇳", lat: 28.6139, lon: 77.2090, workers: "320+ фахівців", visaTime: "30–35 днів", type: "origin" },
    { name: "Маніла", country: "Філіппіни", flag: "🇵🇭", lat: 14.5995, lon: 120.9842, workers: "190+ операторів", visaTime: "30–40 днів", type: "origin" },
    { name: "Дакка", country: "Бангладеш", flag: "🇧🇩", lat: 23.8103, lon: 90.4125, workers: "150+ монтажників", visaTime: "35–45 днів", type: "origin" },
    { name: "Катманду", country: "Непал", flag: "🇳🇵", lat: 27.7172, lon: 85.3240, workers: "110+ робітників", visaTime: "30–40 днів", type: "origin" },
    { name: "Кишинів", country: "Молдова", flag: "🇲🇩", lat: 47.0105, lon: 28.8638, workers: "Транзитний коридор", visaTime: "Автобусний трансфер", type: "origin" },
  ];

  // Sovereign Country Borders & Geographical Coordinates (Proportionally Scaled)
  const countryBorders: CountryBorder[] = [
    {
      name: "Україна",
      flag: "🇺🇦",
      color: "rgba(245, 158, 11, 0.38)",
      borderColor: "#fbbf24",
      center: [50.4501, 30.5234],
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
      flag: "🇺🇿",
      color: "rgba(6, 182, 212, 0.28)",
      borderColor: "#06b6d4",
      center: [41.2995, 69.2401],
      points: [
        [45.0, 56.0], [45.6, 58.5], [44.9, 61.5], [42.0, 63.0],
        [41.0, 66.0], [41.3, 69.2], [41.0, 71.5], [40.5, 73.0],
        [40.0, 71.5], [39.0, 68.0], [37.2, 67.3], [37.5, 65.5],
        [38.5, 63.5], [40.0, 62.0], [41.5, 60.5], [41.2, 56.0], [45.0, 56.0]
      ]
    },
    {
      name: "Індія",
      flag: "🇮🇳",
      color: "rgba(6, 182, 212, 0.25)",
      borderColor: "#06b6d4",
      center: [28.6139, 77.2090],
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
      flag: "🇵🇭",
      color: "rgba(6, 182, 212, 0.28)",
      borderColor: "#06b6d4",
      center: [14.5995, 120.9842],
      points: [
        [18.5, 121.0], [18.0, 122.5], [16.0, 122.5], [14.0, 124.2],
        [12.5, 125.5], [9.5, 126.2], [6.0, 126.0], [5.5, 125.0],
        [7.0, 122.0], [9.0, 123.0], [10.5, 122.5], [12.0, 120.0],
        [14.5, 120.5], [16.5, 119.8], [18.5, 121.0]
      ]
    },
    {
      name: "Бангладеш",
      flag: "🇧🇩",
      color: "rgba(6, 182, 212, 0.28)",
      borderColor: "#06b6d4",
      center: [23.6850, 90.3563],
      points: [
        [26.5, 88.5], [26.0, 89.8], [25.2, 92.0], [23.8, 92.5],
        [21.5, 92.2], [21.7, 91.8], [22.3, 90.5], [21.8, 89.5],
        [22.5, 89.0], [24.5, 88.2], [26.5, 88.5]
      ]
    },
    {
      name: "Непал",
      flag: "🇳🇵",
      color: "rgba(6, 182, 212, 0.28)",
      borderColor: "#06b6d4",
      center: [28.3949, 84.1240],
      points: [
        [30.4, 80.5], [30.0, 81.5], [28.8, 83.5], [28.0, 85.5],
        [27.7, 88.2], [26.8, 88.0], [26.5, 87.0], [27.5, 85.0],
        [28.2, 82.0], [29.0, 80.2], [30.4, 80.5]
      ]
    },
    {
      name: "Молдова",
      flag: "🇲🇩",
      color: "rgba(6, 182, 212, 0.35)",
      borderColor: "#06b6d4",
      center: [47.0105, 28.8638],
      points: [
        [48.4, 27.5], [48.2, 28.5], [47.5, 29.2], [46.5, 30.0],
        [45.5, 28.2], [46.0, 28.1], [47.0, 27.6], [48.0, 27.0], [48.4, 27.5]
      ]
    }
  ];

  // Continents Outline for Global Geographic Context
  const continents: [number, number][][] = [
    // Eurasia
    [
      [71.0, 28.0], [68.0, 50.0], [72.0, 80.0], [77.0, 105.0], [70.0, 140.0],
      [60.0, 165.0], [52.0, 142.0], [40.0, 128.0], [30.0, 122.0], [20.0, 108.0],
      [10.0, 100.0], [22.0, 69.0], [25.0, 57.0], [30.0, 35.0], [36.0, 27.0],
      [43.0, 10.0], [36.0, -5.0], [43.0, -9.0], [50.0, -1.0], [58.0, 5.0],
      [65.0, 12.0], [71.0, 28.0]
    ],
    // Africa
    [
      [37.0, 10.0], [32.0, 32.0], [12.0, 44.0], [-10.0, 40.0], [-25.0, 32.0],
      [-34.0, 18.0], [-22.0, 14.0], [5.0, 10.0], [15.0, -17.0], [30.0, -10.0],
      [37.0, 10.0]
    ],
    // North America
    [
      [70.0, -160.0], [70.0, -85.0], [55.0, -55.0], [45.0, -65.0], [25.0, -80.0],
      [15.0, -90.0], [20.0, -105.0], [30.0, -115.0], [45.0, -125.0], [60.0, -145.0],
      [70.0, -160.0]
    ],
    // South America
    [
      [12.0, -75.0], [5.0, -50.0], [-10.0, -35.0], [-22.0, -40.0], [-35.0, -55.0],
      [-55.0, -68.0], [-40.0, -73.0], [-20.0, -70.0], [-5.0, -80.0], [12.0, -75.0]
    ],
    // Australia
    [
      [-12.0, 130.0], [-15.0, 145.0], [-28.0, 153.0], [-38.0, 145.0], [-35.0, 115.0],
      [-20.0, 115.0], [-12.0, 130.0]
    ]
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let autoRotation = rotation;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Direct Flight Arcs from Recruiting Origins into Kyiv
    const kyivCity = cities[0];
    const arcs: Arc[] = [
      { from: cities[1], to: kyivCity, progress: 0.1, speed: 0.007 }, // Tashkent -> Kyiv
      { from: cities[2], to: kyivCity, progress: 0.4, speed: 0.006 }, // Delhi -> Kyiv
      { from: cities[3], to: kyivCity, progress: 0.7, speed: 0.005 }, // Manila -> Kyiv
      { from: cities[4], to: kyivCity, progress: 0.2, speed: 0.006 }, // Dhaka -> Kyiv
      { from: cities[5], to: kyivCity, progress: 0.5, speed: 0.005 }, // Kathmandu -> Kyiv
      { from: cities[6], to: kyivCity, progress: 0.8, speed: 0.008 }, // Chisinau -> Kyiv
    ];

    const project3D = (lat: number, lon: number, radius: number, rotX: number, rotY: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180) + rotY;

      let x = -(radius * Math.sin(phi) * Math.cos(theta));
      let z = radius * Math.sin(phi) * Math.sin(theta);
      let y = radius * Math.cos(phi);

      const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
      const z1 = y * Math.sin(rotX) + z * Math.cos(rotX);

      return { x, y: y1, z: z1, visible: z1 > -radius * 0.1 };
    };

    let time = 0;

    const render = () => {
      time += 0.015;
      if (!isDragging) {
        autoRotation = {
          x: autoRotation.x,
          y: autoRotation.y + 0.0035,
        };
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.36;

      ctx.clearRect(0, 0, width, height);

      // 1. Atmosphere Outer Glow Rim
      const atmosGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.7,
        centerX,
        centerY,
        radius * 1.35
      );
      atmosGradient.addColorStop(0, "rgba(245, 158, 11, 0.0)");
      atmosGradient.addColorStop(0.7, "rgba(245, 158, 11, 0.09)");
      atmosGradient.addColorStop(1, "rgba(245, 158, 11, 0.0)");
      ctx.fillStyle = atmosGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Dark Sphere Silhouette
      const sphereGrad = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      sphereGrad.addColorStop(0, "rgba(15, 23, 42, 0.96)");
      sphereGrad.addColorStop(1, "rgba(2, 6, 23, 0.98)");
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Cyber Latitude & Longitude Wireframe Grid
      ctx.strokeStyle = "rgba(245, 158, 11, 0.10)";
      ctx.lineWidth = 0.8;

      // Parallels
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = 0; lon <= 360; lon += 8) {
          const pt = project3D(lat, lon, radius, autoRotation.x, autoRotation.y);
          if (pt.visible) {
            if (first) {
              ctx.moveTo(centerX + pt.x, centerY + pt.y);
              first = false;
            } else {
              ctx.lineTo(centerX + pt.x, centerY + pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Meridians
      for (let lon = 0; lon < 360; lon += 45) {
        ctx.beginPath();
        let first = true;
        for (let lat = -80; lat <= 80; lat += 6) {
          const pt = project3D(lat, lon, radius, autoRotation.x, autoRotation.y);
          if (pt.visible) {
            if (first) {
              ctx.moveTo(centerX + pt.x, centerY + pt.y);
              first = false;
            } else {
              ctx.lineTo(centerX + pt.x, centerY + pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // 4. Global Continents Landmass Outline
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillStyle = "rgba(30, 41, 59, 0.35)";
      ctx.lineWidth = 1;
      continents.forEach((poly) => {
        ctx.beginPath();
        let first = true;
        let anyVisible = false;
        poly.forEach(([lat, lon]) => {
          const pt = project3D(lat, lon, radius, autoRotation.x, autoRotation.y);
          if (pt.visible) {
            anyVisible = true;
            if (first) { ctx.moveTo(centerX + pt.x, centerY + pt.y); first = false; }
            else { ctx.lineTo(centerX + pt.x, centerY + pt.y); }
          }
        });
        if (anyVisible) {
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      });

      // 5. Accurate Country Boundaries: Ukraine + Recruitment Nations
      countryBorders.forEach((country) => {
        const isUkraine = country.name === "Україна";
        ctx.beginPath();
        let first = true;
        let visibleCount = 0;

        country.points.forEach(([lat, lon]) => {
          const pt = project3D(lat, lon, radius, autoRotation.x, autoRotation.y);
          if (pt.visible) {
            visibleCount++;
            if (first) {
              ctx.moveTo(centerX + pt.x, centerY + pt.y);
              first = false;
            } else {
              ctx.lineTo(centerX + pt.x, centerY + pt.y);
            }
          }
        });

        if (visibleCount > 3) {
          ctx.closePath();
          // Glow fill
          ctx.fillStyle = isUkraine
            ? `rgba(245, 158, 11, ${0.35 + Math.sin(time * 3) * 0.08})`
            : country.color;
          ctx.fill();

          // Border stroke with neon aura
          ctx.strokeStyle = isUkraine ? "#fbbf24" : country.borderColor;
          ctx.lineWidth = isUkraine ? 2.2 : 1.4;
          ctx.shadowColor = isUkraine ? "#f59e0b" : "#06b6d4";
          ctx.shadowBlur = isUkraine ? 14 : 7;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Country Center Beacon & Label
        const centerPt = project3D(country.center[0], country.center[1], radius, autoRotation.x, autoRotation.y);
        if (centerPt.visible) {
          const cx = centerX + centerPt.x;
          const cy = centerY + centerPt.y;

          // Pulse wave
          const pulse = (time * 2 + (isUkraine ? 0 : 0.6)) % 1;
          ctx.beginPath();
          ctx.arc(cx, cy, 3 + pulse * 11, 0, Math.PI * 2);
          ctx.strokeStyle = isUkraine ? `rgba(251, 191, 36, ${1 - pulse})` : `rgba(6, 182, 212, ${1 - pulse})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Dot
          ctx.beginPath();
          ctx.arc(cx, cy, isUkraine ? 4.5 : 3, 0, Math.PI * 2);
          ctx.fillStyle = isUkraine ? "#f59e0b" : "#38bdf8";
          ctx.fill();

          // Text Badge
          ctx.font = isUkraine ? "bold 11px monospace" : "10px monospace";
          ctx.fillStyle = isUkraine ? "#fbbf24" : "#e2e8f0";
          ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
          ctx.shadowBlur = 8;
          ctx.fillText(`${country.flag} ${country.name}`, cx + 8, cy + 4);
          ctx.shadowBlur = 0;
        }
      });

      // 6. Direct Flight Arcs to Kyiv & Photon Pulses
      arcs.forEach((arc) => {
        arc.progress = (arc.progress + arc.speed) % 1;
        const p1 = project3D(arc.from.lat, arc.from.lon, radius, autoRotation.x, autoRotation.y);
        const p2 = project3D(arc.to.lat, arc.to.lon, radius, autoRotation.x, autoRotation.y);

        if (p1.visible || p2.visible) {
          const midLat = (arc.from.lat + arc.to.lat) / 2;
          const midLon = (arc.from.lon + arc.to.lon) / 2;
          const pMid = project3D(midLat, midLon, radius * 1.34, autoRotation.x, autoRotation.y);

          const startX = centerX + p1.x;
          const startY = centerY + p1.y;
          const endX = centerX + p2.x;
          const endY = centerY + p2.y;
          const ctrlX = centerX + pMid.x;
          const ctrlY = centerY + pMid.y;

          // Parabolic Dashed Line
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
          ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
          ctx.lineWidth = 1.3;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated Flight Photon
          const t = arc.progress;
          const photonX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
          const photonY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;

          ctx.beginPath();
          ctx.arc(photonX, photonY, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#fbbf24";
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 7. External HUD Radar Rings & Navigation Marks
      ctx.strokeStyle = "rgba(245, 158, 11, 0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.12, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating Radar Crosshair Sweep
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.4);
      ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius * 1.12, 0);
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY,
      downX: e.clientX,
      downY: e.clientY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - mouseRef.current.x) * 0.008;
    const deltaY = (e.clientY - mouseRef.current.y) * 0.008;
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;

    setRotation((prev) => ({
      x: Math.max(-1.2, Math.min(1.2, prev.x + deltaY)),
      y: prev.y + deltaX,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full aspect-square max-w-[550px] mx-auto select-none">
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating HUD Telemetry Overlay matching Reference Image */}
      <div className="absolute top-6 left-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-amber-500/30 text-[11px] font-mono pointer-events-none space-y-1.5 shadow-2xl z-20">
        <div className="text-amber-400 font-bold tracking-wider text-[11px]">
          Поточний проект: <span className="text-white">20-09</span>
        </div>
        <div className="text-slate-300 text-[10px]">
          ETA: <span className="text-amber-400 font-bold">48h</span>
        </div>
        <div className="text-slate-400 text-[10px] flex items-center gap-1">
          <span>Координати:</span>
          <span className="text-cyan-400 font-semibold">Ташкент &gt; Київ</span>
        </div>
        <div className="pt-1 text-[9px] text-emerald-400 flex items-center gap-1.5 border-t border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>КОРИДОРИ ДОСТАВКИ РОБІТНИКІВ АКТИВНІ</span>
        </div>
      </div>

      {/* Orbit Degree Markers matching Reference Image */}
      <div className="pointer-events-none absolute inset-0 z-10 font-mono text-[10px] text-slate-500/70 select-none">
        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-amber-500/60 font-bold">200</span>
        <span className="absolute top-12 right-10 text-slate-400">:200</span>
        <span className="absolute top-1/2 right-2 -translate-y-1/2 text-amber-500/60 font-bold">150</span>
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400">166</span>
        <span className="absolute bottom-16 left-8 text-amber-500/60 font-bold">230</span>
      </div>

      {/* Drag Instruction Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-950/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-slate-300 pointer-events-none flex items-center gap-2 shadow-xl z-20">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span>Орбіта 360° // Реальні кордони країн</span>
      </div>
    </div>
  );
};