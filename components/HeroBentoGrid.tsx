"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  CheckCircle2, 
  Upload, 
  ChevronRight
} from "lucide-react";
import { playSliderTick, playMechanicalClick, playSciFiBeep } from "@/lib/soundFX";

interface HeroBentoGridProps {
  locale?: string;
  messages?: any;
}

export const HeroBentoGrid: React.FC<HeroBentoGridProps> = ({ locale = "uk", messages }) => {
  // --- CARD 2: Simulator State ---
  const [turnover, setTurnover] = useState(45);
  const [vacancies, setVacancies] = useState(30);
  const [downtime, setDowntime] = useState(2);

  // --- CARD 3: Video Preview Modal/State ---
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // --- CARD 4: Stepper Quiz State ---
  const [selectedCountry, setSelectedCountry] = useState<string>("uz");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("welder");
  const [isFileDropped, setIsFileDropped] = useState(false);

  // Dynamic calculations for Card 2 ROI Bars (10 bars)
  const baseLoss = Math.round((turnover * 2.8 + vacancies * 3.5 + downtime * 12) * 1.5);
  const paybackRate = Math.min(100, Math.round((100 - turnover * 0.4) + vacancies * 0.3));

  const countries = [
    { id: "uz", flag: "🇺🇿", name: "Узбекистан", code: "UZB" },
    { id: "in", flag: "🇮🇳", name: "Індія", code: "IND" },
    { id: "np", flag: "🇳🇵", name: "Непал", code: "NPL" },
    { id: "bd", flag: "🇧🇩", name: "Бангладеш", code: "BGD" },
  ];

  const specialties = [
    { id: "welder", title: "Зварювальники" },
    { id: "builder", title: "Будівельники" },
    { id: "cnc", title: "Токарі / ЧПУ" },
    { id: "rebar", title: "Арматурники" },
  ];

  return (
    <div className="w-full mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        
        {/* ========================================================================= */}
        {/* CARD 1: LIVE CRM TELEMETRY                                               */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl bg-slate-900/70 border border-white/10 p-4 sm:p-5 flex flex-col justify-between backdrop-blur-md shadow-2xl overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
          {/* Blueprint Corner Accents */}
          <span className="absolute top-2 left-2 text-[10px] font-mono text-white/20 select-none">⌜</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono text-white/20 select-none">⌝</span>
          <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white/20 select-none">⌞</span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white/20 select-none">⌟</span>

          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                LIVE CRM TELEMETRY
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[9px] font-bold">
                [TR]
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 leading-tight mb-3">
              JetBrains Mono log, world map with Dnieper Cobalt control markers and CAD blueprints
            </p>

            {/* World Map SVG with Dnieper Cobalt Control Nodes */}
            <div className="relative w-full h-36 bg-slate-950/80 rounded-xl border border-white/5 overflow-hidden p-1 flex items-center justify-center">
              {/* Subtle grid background */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none" 
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)",
                  backgroundSize: "12px 12px"
                }}
              />

              <svg 
                viewBox="0 0 500 220" 
                className="w-full h-full text-slate-800"
                fill="currentColor"
              >
                {/* World Map Simplified Continents */}
                <path d="M 60,40 Q 110,30 140,55 Q 150,90 120,110 Q 80,120 50,80 Z" opacity="0.4" /> {/* North America */}
                <path d="M 110,120 Q 140,130 130,170 Q 110,200 95,160 Z" opacity="0.4" /> {/* South America */}
                <path d="M 230,45 Q 280,35 300,60 Q 280,85 240,75 Z" opacity="0.5" /> {/* Europe */}
                <path d="M 235,90 Q 285,85 275,150 Q 240,170 225,120 Z" opacity="0.4" /> {/* Africa */}
                <path d="M 310,40 Q 420,35 440,85 Q 400,140 330,110 Z" opacity="0.5" /> {/* Asia */}
                <path d="M 390,145 Q 440,140 435,180 Q 385,185 390,145 Z" opacity="0.4" /> {/* Australia */}

                {/* Arcs: Recruitment corridors converging to Kyiv */}
                {/* Tashkent to Kyiv */}
                <path 
                  d="M 360,85 Q 320,55 285,62" 
                  fill="none" 
                  stroke="#06b6d4" 
                  strokeWidth="1.2" 
                  strokeDasharray="3 3"
                  className="animate-pulse"
                />
                {/* Delhi to Kyiv */}
                <path 
                  d="M 375,108 Q 325,75 285,62" 
                  fill="none" 
                  stroke="#06b6d4" 
                  strokeWidth="1.2" 
                  strokeDasharray="3 3"
                  className="animate-pulse"
                />
                {/* Manila to Kyiv */}
                <path 
                  d="M 430,125 Q 350,70 285,62" 
                  fill="none" 
                  stroke="#f59e0b" 
                  strokeWidth="1" 
                  strokeDasharray="2 3"
                />

                {/* Dnieper Cobalt & Gold Nodes */}
                {/* Kyiv Destination Node */}
                <g transform="translate(285, 62)">
                  <circle r="6" fill="#f59e0b" fillOpacity="0.25" className="animate-ping" />
                  <circle r="3.5" fill="#f59e0b" />
                  <circle r="1.5" fill="#000" />
                </g>

                {/* Tashkent Node */}
                <g transform="translate(360, 85)">
                  <circle r="5" fill="#06b6d4" fillOpacity="0.3" className="animate-ping" />
                  <circle r="2.5" fill="#06b6d4" />
                </g>

                {/* Delhi Node */}
                <g transform="translate(375, 108)">
                  <circle r="5" fill="#06b6d4" fillOpacity="0.3" className="animate-ping" />
                  <circle r="2.5" fill="#06b6d4" />
                </g>

                {/* Manila Node */}
                <g transform="translate(430, 125)">
                  <circle r="4" fill="#06b6d4" fillOpacity="0.2" />
                  <circle r="2" fill="#06b6d4" />
                </g>

                {/* Chisinau Node */}
                <g transform="translate(275, 70)">
                  <circle r="3" fill="#06b6d4" fillOpacity="0.4" />
                  <circle r="1.8" fill="#06b6d4" />
                </g>
              </svg>

              {/* Bottom-Left Mini-Radar HUD with spinning sweep */}
              <div className="absolute bottom-2 left-2 w-12 h-12 rounded-full border border-cyan-500/40 bg-slate-950/90 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 rounded-full border border-cyan-500/20 scale-75" />
                <div className="absolute inset-0 rounded-full border border-cyan-500/10 scale-50" />
                {/* Crosshairs */}
                <div className="absolute w-full h-[1px] bg-cyan-500/30" />
                <div className="absolute h-full w-[1px] bg-cyan-500/30" />
                {/* Rotating sweep line */}
                <div 
                  className="absolute inset-0 origin-center animate-[spin_3s_linear_infinite]"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0deg, rgba(6, 182, 212, 0.4) 60deg, transparent 65deg)"
                  }}
                />
                {/* Target Blip */}
                <span className="absolute top-2 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Telemetry Tag */}
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-slate-900/90 border border-cyan-500/30 text-[8px] font-mono text-cyan-300">
                HUB: KYIV_REC_01
              </div>
            </div>
          </div>

          {/* JetBrains Mono Status Log */}
          <div className="mt-3 pt-2.5 border-t border-white/5 font-mono text-[9px] text-slate-400 space-y-1 bg-slate-950/60 p-2 rounded-lg border border-white/5">
            <div className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>[SYS_OK] Consular stream D-04 connected</span>
            </div>
            <div className="text-slate-300 truncate">
              [BATCH_42] 18 welders passed x-ray audit
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: СИМУЛЯТОР ROI & НАЛОГІВ                                           */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl bg-slate-900/70 border border-white/10 p-4 sm:p-5 flex flex-col justify-between backdrop-blur-md shadow-2xl overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
          <span className="absolute top-2 left-2 text-[10px] font-mono text-white/20 select-none">⌜</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono text-white/20 select-none">⌝</span>
          <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white/20 select-none">⌞</span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white/20 select-none">⌟</span>

          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                СИМУЛЯТОР ROI & НАЛОГІВ
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[9px] font-bold">
                [6B]
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 leading-tight mb-3">
              CAD blueprints, CAD Blueprints nytini linees
            </p>

            {/* Sliders Grid with Real-time Readouts */}
            <div className="space-y-2.5 font-mono text-[10px]">
              {/* Turnover */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Turnovers</span>
                  <span className="text-amber-400 font-bold">{turnover}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={turnover} 
                  onChange={(e) => {
                    setTurnover(Number(e.target.value));
                    playSliderTick();
                  }}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Vacancies */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Vacancies</span>
                  <span className="text-amber-400 font-bold">{vacancies}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={vacancies} 
                  onChange={(e) => {
                    setVacancies(Number(e.target.value));
                    playSliderTick();
                  }}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Equipment downtime */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Equipment downtime</span>
                  <span className="text-amber-400 font-bold">{downtime}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={downtime} 
                  onChange={(e) => {
                    setDowntime(Number(e.target.value));
                    playSliderTick();
                  }}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Metrics Readout */}
              <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400 border-t border-white/5">
                <span>Equipment down: <strong className="text-white">{downtime * 5}%</strong></span>
                <span>Мінімальна ЗП 2026: <strong className="text-amber-400">8 000 ₴</strong></span>
              </div>
            </div>

            {/* Dynamic SVG Bar Chart matching reference image */}
            <div className="mt-3 pt-2">
              <div className="text-[9px] font-mono text-slate-500 mb-1.5 flex justify-between items-center">
                <span>Canvas chart of budget loss/payback</span>
                <span className="text-amber-400">+{paybackRate}% ROI</span>
              </div>

              <div className="relative h-20 w-full bg-slate-950/80 rounded-lg border border-white/5 p-2 flex items-end justify-between gap-1">
                {/* Y-axis scale markings */}
                <div className="absolute left-1 top-1 text-[8px] font-mono text-slate-600">600</div>
                <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[8px] font-mono text-slate-600">208</div>
                <div className="absolute left-1 bottom-1 text-[8px] font-mono text-slate-600">0</div>

                {/* 10 Vertical Bars responding to slider state */}
                <div className="w-full flex items-end justify-around pl-6 h-full">
                  {[
                    { h: Math.max(12, 50 - turnover * 0.4), color: "bg-slate-700" },
                    { h: Math.max(15, 45 - turnover * 0.3), color: "bg-slate-700" },
                    { h: Math.max(18, 40 - turnover * 0.2), color: "bg-slate-600" },
                    { h: Math.max(22, 35 + vacancies * 0.1), color: "bg-amber-900/60" },
                    { h: Math.max(28, 40 + vacancies * 0.2), color: "bg-amber-700/70" },
                    { h: Math.max(35, 45 + downtime * 1.5), color: "bg-amber-600" },
                    { h: Math.max(48, 55 + paybackRate * 0.2), color: "bg-amber-500" },
                    { h: Math.max(62, 65 + paybackRate * 0.25), color: "bg-amber-400 shadow-gold-glow" },
                    { h: Math.max(76, 75 + paybackRate * 0.3), color: "bg-amber-400 shadow-gold-glow" },
                    { h: Math.max(88, 85 + paybackRate * 0.35), color: "bg-yellow-300 shadow-gold-glow" },
                  ].map((bar, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: `${Math.min(95, bar.h)}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-2 sm:w-2.5 rounded-t-sm ${bar.color} transition-colors`}
                    />
                  ))}
                </div>
              </div>

              {/* X-axis scale labels */}
              <div className="flex justify-between pl-7 pr-1 text-[8px] font-mono text-slate-600 mt-1">
                <span>0</span>
                <span>6.9</span>
                <span>12.2</span>
              </div>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-white/5 font-mono text-[9px] text-slate-500 flex justify-between">
            <span>Section 4.2 // 19</span>
            <span className="text-amber-500/80">LIVE MODEL</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: POOL & AWARDS                                                     */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl bg-slate-900/70 border border-white/10 p-4 sm:p-5 flex flex-col justify-between backdrop-blur-md shadow-2xl overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
          <span className="absolute top-2 left-2 text-[10px] font-mono text-white/20 select-none">⌜</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono text-white/20 select-none">⌝</span>
          <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white/20 select-none">⌞</span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white/20 select-none">⌟</span>

          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                POOL & AWARDS
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[9px] font-bold">
                [03]
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 leading-tight mb-3">
              Атестований резерв інженерних та робітничих кадрів
            </p>

            {/* Split Layout: Candidate Dossier (Left) + Skills Radar (Right) */}
            <div className="grid grid-cols-2 gap-3 items-center">
              {/* Left Sub-Card: Candidate Profile */}
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-950/70 border border-white/5">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-amber-500/30 mb-2">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80"
                    alt="Verified Candidate"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                  <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-500 border border-black" />
                </div>
                <span className="text-[10px] font-mono text-slate-300 font-bold leading-tight">
                  Interactive candidate
                </span>
                
                {/* Badges: GR GT CKD */}
                <div className="flex items-center justify-center gap-1 my-1.5 text-[8px] font-mono text-slate-400">
                  <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">GR</span>
                  <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">GT</span>
                  <span className="px-1 py-0.2 rounded bg-slate-800 text-slate-300">CKD</span>
                </div>

                {/* Golden Video Hover CTA Button */}
                <button
                  onClick={() => {
                    playSciFiBeep(1150, 0.08);
                    setIsVideoPlaying(!isVideoPlaying);
                  }}
                  className="w-full py-1.5 px-2 rounded-lg text-[10px] font-bold font-mono text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <Play className="w-3 h-3 fill-black" />
                  <span>video hover</span>
                </button>
              </div>

              {/* Right Sub-Card: 5-Axis Skills Pentagon Radar */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/70 border border-white/5 relative">
                <span className="text-[10px] font-mono text-slate-300 font-bold mb-1">
                  Skills radar
                </span>

                {/* SVG 5-Axis Radar Polygon */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    {/* Concentric Pentagon Reference Grids */}
                    {/* 100% outer */}
                    <polygon 
                      points="50,10 88,38 73,84 27,84 12,38" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.12)" 
                      strokeWidth="0.8" 
                    />
                    {/* 60% middle */}
                    <polygon 
                      points="50,26 73,43 64,70 36,70 27,43" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.08)" 
                      strokeWidth="0.8" 
                    />
                    {/* 30% inner */}
                    <polygon 
                      points="50,38 61,46 57,60 43,60 39,46" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.05)" 
                      strokeWidth="0.8" 
                    />

                    {/* Radial axis lines */}
                    <line x1="50" y1="50" x2="50" y2="10" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                    <line x1="50" y1="50" x2="88" y2="38" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                    <line x1="50" y1="50" x2="73" y2="84" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                    <line x1="50" y1="50" x2="27" y2="84" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                    <line x1="50" y1="50" x2="12" y2="38" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />

                    {/* Golden Filled Value Polygon (matching reference image) */}
                    <polygon 
                      points="50,16 82,39 68,76 31,78 18,36" 
                      fill="rgba(245, 158, 11, 0.28)" 
                      stroke="#f59e0b" 
                      strokeWidth="1.8"
                    />

                    {/* Glowing Vertex Dots */}
                    <circle cx="50" cy="16" r="2" fill="#fbbf24" />
                    <circle cx="82" cy="39" r="2" fill="#fbbf24" />
                    <circle cx="68" cy="76" r="2" fill="#fbbf24" />
                    <circle cx="31" cy="78" r="2" fill="#fbbf24" />
                    <circle cx="18" cy="36" r="2" fill="#fbbf24" />

                    {/* Labels matching reference image typography */}
                    <text x="50" y="5" textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="monospace">Boller</text>
                    <text x="92" y="38" textAnchor="start" fill="#94a3b8" fontSize="6" fontFamily="monospace">Ckse</text>
                    <text x="72" y="93" textAnchor="start" fill="#94a3b8" fontSize="6" fontFamily="monospace">Skills</text>
                    <text x="25" y="93" textAnchor="end" fill="#94a3b8" fontSize="6" fontFamily="monospace">Rrvdos</text>
                    <text x="8" y="38" textAnchor="end" fill="#94a3b8" fontSize="6" fontFamily="monospace">Neck</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Video preview drawer when clicked */}
            <AnimatePresence>
              {isVideoPlaying && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[9px] font-mono text-amber-300 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    Відео-тест швів (тиск 25 бар) — EN ISO 9606-1
                  </span>
                  <button 
                    onClick={() => setIsVideoPlaying(false)}
                    className="text-slate-400 hover:text-white font-bold ml-2"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 font-mono text-[9px] text-slate-500 flex justify-between">
            <span>Аудит: ISO 9606-1</span>
            <span className="text-emerald-400">100% ВЕРИФІКОВАНО</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 4: B2C QUIZ-ЗАЯВКА                                                   */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl bg-slate-900/70 border border-white/10 p-4 sm:p-5 flex flex-col justify-between backdrop-blur-md shadow-2xl overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
          <span className="absolute top-2 left-2 text-[10px] font-mono text-white/20 select-none">⌜</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono text-white/20 select-none">⌝</span>
          <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white/20 select-none">⌞</span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white/20 select-none">⌟</span>

          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                B2C QUIZ-ЗАЯВКА
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[9px] font-bold">
                [04]
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 leading-tight mb-2.5">
              Stepper physics:
            </p>

            {/* Stepper Steps */}
            <div className="space-y-2.5">
              {/* Step 1: Country Flags */}
              <div>
                <span className="text-[9px] font-mono text-slate-300 block mb-1.5">
                  Step 1: country flags:
                </span>
                <div className="flex items-center gap-1.5">
                  {countries.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCountry(c.id);
                        playMechanicalClick();
                      }}
                      className={`flex-1 py-1 rounded-lg border text-xs font-mono flex items-center justify-center gap-1 transition-all ${
                        selectedCountry === c.id
                          ? "bg-amber-500/20 border-amber-500 text-white shadow-gold-glow"
                          : "bg-slate-950/60 border-white/10 text-slate-400 hover:text-white"
                      }`}
                      title={c.name}
                    >
                      <span className="text-sm">{c.flag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Specialties */}
              <div>
                <span className="text-[9px] font-mono text-slate-300 block mb-1.5">
                  Step 2: specialities
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {specialties.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedSpecialty(s.id);
                        playMechanicalClick();
                      }}
                      className={`py-1 px-1.5 rounded-lg border text-[9px] font-mono text-center truncate transition-all ${
                        selectedSpecialty === s.id
                          ? "bg-amber-500 text-black font-bold border-amber-400 shadow-gold-glow"
                          : "bg-slate-950/60 border-white/5 text-slate-300 hover:text-white"
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Tactile Drop-zone with Tryzub Watermark */}
              <div>
                <span className="text-[8px] font-mono text-slate-400 block mb-1">
                  Step 3: tactile Drop-zone gravity zone catching CV timeline gravity animation and Tryzub watermark on screen
                </span>
                
                <div
                  onClick={() => {
                    playMechanicalClick();
                    setIsFileDropped(true);
                  }}
                  className={`relative h-20 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden p-2 text-center group ${
                    isFileDropped
                      ? "border-emerald-500/60 bg-emerald-500/10"
                      : "border-amber-500/30 hover:border-amber-400 bg-slate-950/80 hover:bg-slate-950"
                  }`}
                >
                  {/* Embossed Ukrainian Tryzub (Trident) Watermark matching Reference Image */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity">
                    <svg 
                      viewBox="0 0 100 120" 
                      className="w-16 h-16 text-amber-400" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3.5"
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      {/* Ukrainian Trident Geometry */}
                      <path d="M 50,15 L 50,105" />
                      <path d="M 50,25 L 35,45 L 35,70 C 35,90 50,105 50,105 C 50,105 65,90 65,70 L 65,45 L 50,25" />
                      <path d="M 22,35 L 22,65 C 22,85 40,105 50,105" />
                      <path d="M 78,35 L 78,65 C 78,85 60,105 50,105" />
                      <path d="M 22,35 L 35,45" />
                      <path d="M 78,35 L 65,45" />
                      <circle cx="50" cy="15" r="2.5" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Foreground Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    {isFileDropped ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-0.5 animate-bounce" />
                        <span className="text-[9px] font-mono text-emerald-300 font-bold">
                          [ТЗ ПРИЙНЯТО // 1-4 МІСЯЦІ]
                        </span>
                        <span className="text-[8px] font-mono text-slate-400">
                          Розрахунок штату передано в CRM
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-amber-400 mb-1 group-hover:-translate-y-0.5 transition-transform" />
                        <span className="text-[9px] font-mono text-slate-200 font-bold">
                          Перетягніть ТЗ або розрахунок штату
                        </span>
                        <span className="text-[8px] font-mono text-slate-500">
                          PDF, CAD, Excel або текстовий бриф
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="mt-2 pt-2 border-t border-white/5 font-mono text-[9px] text-slate-500 flex justify-between items-center">
            <span>Section 5.1</span>
            <span className="text-amber-400 flex items-center gap-1 font-bold">
              ВІД 3 ОСІБ <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
