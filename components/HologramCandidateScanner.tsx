"use client";

import React, { useState, useRef } from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Play, 
  FileText, 
  Scan, 
  Layers, 
  Activity, 
  QrCode, 
  Sparkles, 
  Cpu, 
  ExternalLink,
  Search
} from "lucide-react";
import { Lens } from "@/components/ui/lens";
import { playSciFiBeep } from "@/lib/soundFX";

export const HologramCandidateScanner: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<"biometrics" | "xray" | "visa">("xray");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  // 3D Perspective Tilt Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const switchLayer = (layer: "biometrics" | "xray" | "visa") => {
    playSciFiBeep(880, 0.08);
    setActiveLayer(layer);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 perspective-container">
      {/* HUD Header Bar */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-amber-500/30 rounded-t-2xl px-6 py-3.5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Scan className="w-4 h-4" />
            <span>TERMINAL: ДОСЬЄ В РЕАЛЬНОМУ ЧАСІ & РЕНТГЕН-КОНТРОЛЬ</span>
          </div>
        </div>

        {/* 3 Layer Switchers */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-white/10 text-xs font-mono">
          <button
            onClick={() => switchLayer("biometrics")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeLayer === "biometrics"
                ? "bg-amber-500 text-black font-bold shadow-gold-glow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Біометрія</span>
          </button>

          <button
            onClick={() => switchLayer("xray")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeLayer === "xray"
                ? "bg-cyan-500 text-black font-bold shadow-cyan-glow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Рентген шва (X-Ray)</span>
          </button>

          <button
            onClick={() => switchLayer("visa")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeLayer === "visa"
                ? "bg-emerald-500 text-black font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Віза D / Коридор ЄС</span>
          </button>
        </div>
      </div>

      {/* Main 3D Hologram Terminal Body */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="relative bg-slate-900/90 border-x border-b border-amber-500/30 rounded-b-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden"
      >
        {/* Continuous Laser Scanning Line */}
        <div
          className={`absolute left-0 right-0 h-[3px] pointer-events-none z-30 ${
            activeLayer === "xray" ? "cyan-scan-line" : "laser-scan-line"
          } animate-scan-laser`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Visual Hologram Canvas with Tactical Lens Inspection */}
          <div className="lg:col-span-6 relative flex flex-col">
            <div className="mb-2 flex items-center justify-between text-[9px] font-mono text-cyan-400">
              <span className="flex items-center gap-1">
                <Search className="w-3 h-3 animate-pulse text-cyan-400" />
                <span>[ ТАКТИЧНА ЛУПА: НАВЕДІТЬ ДЛЯ МІКРОСКОПІЧНОГО АУДИТУ ]</span>
              </span>
              <span className="text-amber-400 font-bold">LENS x1.9</span>
            </div>

            <Lens zoomFactor={1.9} lensSize={160}>
              <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-slate-950 flex items-center justify-center group w-full">
                {/* LAYER 1: Biometrics Photo */}
                {activeLayer === "biometrics" && (
                  <div className="relative w-full h-full animate-in fade-in duration-300">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                      alt="Candidate portrait"
                      className="w-full h-full object-cover grayscale-[30%] contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

                    {/* Face Targeting Brackets */}
                    <div className="absolute inset-16 border-2 border-dashed border-amber-400/60 rounded-2xl flex flex-col justify-between p-2 pointer-events-none animate-pulse">
                      <div className="flex justify-between text-[10px] font-mono text-amber-300">
                        <span>[ FACE IDENT: PASS ]</span>
                        <span>MATCH: 99.8%</span>
                      </div>
                      <div className="text-center text-[10px] font-mono text-emerald-400 bg-black/60 py-0.5 rounded">
                        BIOMETRICS VERIFIED
                      </div>
                    </div>
                  </div>
                )}

                {/* LAYER 2: X-Ray Weld Radiography (The Showstopper) */}
                {activeLayer === "xray" && (
                  <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center p-4 animate-in zoom-in-95 duration-300">
                    {/* Radiographic X-Ray image */}
                    <div 
                      className="w-full h-full bg-cover bg-center rounded-xl filter invert contrast-200 opacity-80"
                      style={{
                        backgroundImage: `url("https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80")`,
                      }}
                    />
                    <div className="absolute inset-0 bg-cyan-950/40 mix-blend-overlay" />

                    {/* Laser weld telemetry crosshair overlay */}
                    <div className="absolute inset-4 border border-cyan-500/40 rounded-xl p-3 flex flex-col justify-between pointer-events-none font-mono text-[11px]">
                      <div className="flex justify-between text-cyan-300 bg-slate-950/80 px-2 py-1 rounded border border-cyan-500/30">
                        <span>X-RAY SCAN: ISO 9606-1 135 P BW FM1</span>
                        <span className="text-emerald-400 font-bold">GRADE A+</span>
                      </div>

                      {/* Radiographic seam indicators */}
                      <div className="space-y-1 bg-slate-950/85 p-2 rounded border border-cyan-500/20 text-[10px]">
                        <div className="flex justify-between text-slate-300">
                          <span>Глибина кореня шва:</span>
                          <span className="text-emerald-400 font-bold">100% ПРОВАРЕНО</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Мікропори / Тріщини:</span>
                          <span className="text-emerald-400 font-bold">0.0% (ВІДСУТНІ)</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Міцність на розрив:</span>
                          <span className="text-cyan-300 font-bold">540 MPa (Норма: 490)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LAYER 3: Visa D Schengen Authorization */}
                {activeLayer === "visa" && (
                  <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                      <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 font-mono">
                      Віза D-04 та Дозвіл ДЦЗ
                    </h4>
                    <p className="text-xs text-slate-400 mb-4 max-w-sm">
                      Офіційний дозвіл Державного центру зайнятості України на працевлаштування іноземного фахівця.
                    </p>
                    <div className="w-full bg-slate-900/80 p-3 rounded-xl border border-white/10 text-xs font-mono flex justify-between">
                      <span className="text-slate-400">Перевірка СБУ:</span>
                      <strong className="text-emerald-400">ПОГОДЖЕНО 100%</strong>
                    </div>
                  </div>
                )}
              </div>
            </Lens>
          </div>

          {/* Right Column: Candidate Dossier Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                  Атестований спеціаліст #UZ-8419
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  Джамшид Рахімов (34 роки)
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-mono">Статус:</span>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  Готовий до вильоту
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Зварювальник MIG/MAG (135/136) вищої кваліфікації. 8 років досвіду на заводах важкого машинобудування. Повний комплект європейських протоколів рентген-випробувань зварних зʼєднань.
            </p>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-500 block">Країна:</span>
                <strong className="text-white">🇺🇿 Узбекистан</strong>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-500 block">Сертифікат:</span>
                <strong className="text-amber-400">EN ISO 9606-1</strong>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-500 block">Час виходу:</span>
                <strong className="text-emerald-400">21–24 дні</strong>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-3">
              <a
                href="#calculator"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-gold-glow hover:brightness-110 transition-all"
              >
                <span>Затвердити кандидата на свій обʼєкт</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://assets.mixkit.co/videos/preview/mixkit-welder-working-in-a-metal-workshop-43098-large.mp4"
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Відеозвіт тесту (1:45)</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};