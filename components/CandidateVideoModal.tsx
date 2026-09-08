"use client";

import React, { useState } from "react";
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Radio
} from "lucide-react";
import { playSciFiBeep } from "@/lib/soundFX";

interface CandidateVideoModalProps {
  candidate: {
    id: string;
    name: string;
    profession: string;
    country: string;
    flag: string;
    experience: string;
    salary: string;
    skills: string[];
    videoDuration: string;
    avatar: string;
  } | null;
  onClose: () => void;
}

export const CandidateVideoModal: React.FC<CandidateVideoModalProps> = ({
  candidate,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<"video" | "welds" | "biometrics">("video");

  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl shadow-black overflow-hidden flex flex-col font-sans max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-3.5 bg-slate-950 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{candidate.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">
                  {candidate.name} // {candidate.profession}
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold">
                  ВЕРИФІКОВАНО
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                TRADE-TEST ID: #{candidate.id.toUpperCase()} • {candidate.country}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              playSciFiBeep(880, 0.05);
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Visual Screen */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          {/* Simulated High-Res Trade Test Video with Welder / CNC */}
          <video
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover opacity-85 brightness-110"
            src="https://assets.mixkit.co/videos/preview/mixkit-welder-working-in-a-metal-workshop-43098-large.mp4"
          />

          {/* Tactical HUD Overlay on Video */}
          <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between z-10">
            {/* Top Telemetry */}
            <div className="flex items-center justify-between text-[10px] font-mono text-amber-300 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold">LIVE TRADE TEST // ЦЕХ ТАШКЕНТ-1</span>
              </div>
              <span>HD 1080P 60FPS</span>
            </div>

            {/* Center Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
              <div className="w-16 h-16 border border-cyan-400 rounded-full" />
              <div className="absolute w-24 h-[1px] bg-cyan-400" />
              <div className="absolute h-24 w-[1px] bg-cyan-400" />
            </div>

            {/* Bottom Controls Bar */}
            <div className="pointer-events-auto flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-950/80 px-3 py-2 rounded-lg border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 rounded hover:bg-white/10 text-amber-400 transition-colors"
                  title="Звук тесту"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
                </button>
                <span>{candidate.videoDuration}</span>
              </div>

              <div className="flex items-center gap-3 text-[10px] text-emerald-400 font-bold">
                <span>РЕНТГЕН-КОНТРОЛЬ: PASS</span>
                <span>МЕТАЛОГРАФІЯ: 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Audit Footer */}
        <div className="p-4 bg-slate-950/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto text-left text-[11px] font-mono">
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <span className="text-slate-400 block text-[9px]">ДОСВІД</span>
              <strong className="text-white">{candidate.experience}</strong>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <span className="text-slate-400 block text-[9px]">ЗАРПЛАТА</span>
              <strong className="text-amber-400">{candidate.salary}</strong>
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/5">
              <span className="text-slate-400 block text-[9px]">ВІЗА</span>
              <strong className="text-emerald-400">ГОТОВА ДО ДЦЗ</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="https://t.me/recruiter_i_club"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs hover:brightness-110 shadow-gold-glow transition-all active:scale-95"
            >
              <span>Забронювати спеціаліста</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
