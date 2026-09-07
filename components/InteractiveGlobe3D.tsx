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

export const InteractiveGlobe3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0.35, y: -1.2 });
  const mouseRef = useRef({ x: 0, y: 0, downX: 0, downY: 0 });

  const cities: City[] = [
    { name: "Ташкент", country: "Узбекистан", flag: "🇺🇿", lat: 41.2995, lon: 69.2401, workers: "480+ майстрів", visaTime: "21–28 днів", type: "origin" },
    { name: "Нью-Делі", country: "Індія", flag: "🇮🇳", lat: 28.6139, lon: 77.2090, workers: "320+ фахівців", visaTime: "30–35 днів", type: "origin" },
    { name: "Маніла", country: "Філіппіни", flag: "🇵🇭", lat: 14.5995, lon: 120.9842, workers: "190+ операторів", visaTime: "30–40 днів", type: "origin" },
    { name: "Київ", country: "Україна", flag: "🇺🇦", lat: 50.4501, lon: 30.5234, workers: "Головний B2B хаб", visaTime: "Пряме працевлаштування", type: "destination" },
    { name: "Варшава", country: "Польща", flag: "🇵🇱", lat: 52.2297, lon: 21.0122, workers: "Європейський хаб", visaTime: "Віза D / Zezwolenie", type: "destination" },
    { name: "Берлін", country: "Німеччина", flag: "🇩🇪", lat: 52.5200, lon: 13.4050, workers: "Логістика ЄС", visaTime: "Ван дер Ельст / Віза", type: "destination" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let autoRotation = rotation;

    // High DPI Canvas Scaling
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Dynamic flight arcs
    const arcs: Arc[] = [
      { from: cities[0], to: cities[3], progress: 0.1, speed: 0.007 }, // Tashkent -> Kyiv
      { from: cities[0], to: cities[4], progress: 0.5, speed: 0.006 }, // Tashkent -> Warsaw
      { from: cities[1], to: cities[4], progress: 0.3, speed: 0.005 }, // Delhi -> Warsaw
      { from: cities[2], to: cities[3], progress: 0.7, speed: 0.004 }, // Manila -> Kyiv
      { from: cities[1], to: cities[5], progress: 0.9, speed: 0.005 }, // Delhi -> Berlin
    ];

    // Math 3D Projection onto 2D viewport
    const project3D = (lat: number, lon: number, radius: number, rotX: number, rotY: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180) + rotY;

      // Spherical to Cartesian
      let x = -(radius * Math.sin(phi) * Math.cos(theta));
      let z = radius * Math.sin(phi) * Math.sin(theta);
      let y = radius * Math.cos(phi);

      // Rotate around X axis
      const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
      const z1 = y * Math.sin(rotX) + z * Math.cos(rotX);

      return { x, y: y1, z: z1, visible: z1 > -radius * 0.2 };
    };

    let time = 0;

    const render = () => {
      time += 0.015;
      if (!isDragging) {
        autoRotation = {
          x: autoRotation.x,
          y: autoRotation.y + 0.004,
        };
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.36;

      ctx.clearRect(0, 0, width, height);

      // 1. Atmosphere Glow Rim
      const atmosGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.7,
        centerX,
        centerY,
        radius * 1.35
      );
      atmosGradient.addColorStop(0, "rgba(245, 158, 11, 0.0)");
      atmosGradient.addColorStop(0.7, "rgba(245, 158, 11, 0.08)");
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
      sphereGrad.addColorStop(0, "rgba(15, 23, 42, 0.95)");
      sphereGrad.addColorStop(1, "rgba(2, 6, 23, 0.98)");
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Cyber Latitude & Longitude Wireframe Grid
      ctx.strokeStyle = "rgba(245, 158, 11, 0.12)";
      ctx.lineWidth = 1;

      // Parallels (Latitude lines)
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

      // Meridians (Longitude lines)
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

      // 4. Parabolic Flight Arcs & Photon Pulses
      arcs.forEach((arc) => {
        arc.progress = (arc.progress + arc.speed) % 1;
        const p1 = project3D(arc.from.lat, arc.from.lon, radius, autoRotation.x, autoRotation.y);
        const p2 = project3D(arc.to.lat, arc.to.lon, radius, autoRotation.x, autoRotation.y);

        if (p1.visible || p2.visible) {
          const midLat = (arc.from.lat + arc.to.lat) / 2;
          const midLon = (arc.from.lon + arc.to.lon) / 2;
          const pMid = project3D(midLat, midLon, radius * 1.35, autoRotation.x, autoRotation.y);

          const startX = centerX + p1.x;
          const startY = centerY + p1.y;
          const endX = centerX + p2.x;
          const endY = centerY + p2.y;
          const ctrlX = centerX + pMid.x;
          const ctrlY = centerY + pMid.y;

          // Arc Curve Line
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
          ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated Flight Photon Particle (Bezier Interpolation)
          const t = arc.progress;
          const photonX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
          const photonY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;

          // Photon Glow
          ctx.beginPath();
          ctx.arc(photonX, photonY, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#fbbf24";
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // 5. City Hotspots & Glowing Rings
      cities.forEach((city) => {
        const pt = project3D(city.lat, city.lon, radius, autoRotation.x, autoRotation.y);
        if (pt.visible) {
          const screenX = centerX + pt.x;
          const screenY = centerY + pt.y;

          // Pulse ring
          const isOrigin = city.type === "origin";
          const pulseSize = 6 + Math.sin(time * 3) * 3;

          ctx.beginPath();
          ctx.arc(screenX, screenY, pulseSize, 0, Math.PI * 2);
          ctx.strokeStyle = isOrigin ? "rgba(245, 158, 11, 0.6)" : "rgba(56, 189, 248, 0.8)";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // City center dot
          ctx.beginPath();
          ctx.arc(screenX, screenY, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = isOrigin ? "#f59e0b" : "#38bdf8";
          ctx.fill();

          // City label
          ctx.font = "bold 11px 'Plus Jakarta Sans', sans-serif";
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
          ctx.shadowBlur = 6;
          ctx.fillText(`${city.flag} ${city.name}`, screenX + 9, screenY + 4);
          ctx.shadowBlur = 0;
        }
      });

      // 6. External HUD Radar Rings & Navigation Marks
      ctx.strokeStyle = "rgba(245, 158, 11, 0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.12, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating Radar Crosshair Sweep
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.4);
      ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
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

  // Mouse drag handlers for full 3D interactive Orbit rotation
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
          <span>ПОВІТРЯНИЙ КОРИДОР АКТИВНИЙ</span>
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
        <span>Орбіта 360° // Потягніть мишкою</span>
      </div>
    </div>
  );
};