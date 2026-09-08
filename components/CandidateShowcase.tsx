"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Play, 
  FileText, 
  Sparkles, 
  Globe, 
  Briefcase, 
  ShieldAlert, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { playMechanicalClick, playSciFiBeep } from "@/lib/soundFX";

export const CandidateShowcase: React.FC = () => {
  const sampleCandidates = [
    {
      id: "c-1",
      name: "Джамшид Р.",
      profession: "Зварювальник MIG/MAG 135/136",
      country: "Узбекистан",
      flag: "🇺🇿",
      experience: "8 років досвіду",
      salary: "1 400 – 1 700 €",
      skills: ["Зварювання труб", "Рентген-контроль", "Сертифікат EN ISO 9606-1"],
      videoDuration: "1:45 хв",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: "c-2",
      name: "Раджеш К.",
      profession: "Оператор токарних верстатів ЧПК",
      country: "Індія",
      flag: "🇮🇳",
      experience: "6 років досвіду",
      salary: "1 500 – 1 900 €",
      skills: ["Siemens Sinumerik", "Fanuc", "Англійська мова B2"],
      videoDuration: "2:10 хв",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: "c-3",
      name: "Марлон С.",
      profession: "Водій електроштабелера (High Reach)",
      country: "Філіппіни",
      flag: "🇵🇭",
      experience: "5 років досвіду",
      salary: "1 150 – 1 400 €",
      skills: ["WMS системи", "Висота до 12м", "Міжнародне посвідчення"],
      videoDuration: "1:30 хв",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      id: "c-4",
      name: "Отабек М.",
      profession: "Бригадир монолітного будівництва",
      country: "Узбекистан",
      flag: "🇺🇿",
      experience: "10 років досвіду",
      salary: "1 600 – 2 200 €",
      skills: ["Читання креслень", "Вʼязка арматури", "Керування бригадою 15 осіб"],
      videoDuration: "2:40 хв",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80",
    },
  ];

  return (
    <section id="candidates" className="py-24 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border-amber-500/20">
            <Sparkles className="w-4 h-4" />
            <span>Прямий доступ до бази перевірених працівників</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Анонімна вітрина доступних кандидатів
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Кожен кандидат пройшов співбесіду, підтвердив кваліфікацію на відео та очікує підтвердження роботодавця.
          </p>
        </div>

        {/* Candidate Cards Grid with 3D Holographic Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleCandidates.map((cand, idx) => (
            <CardContainer key={cand.id} className="w-full">
              <CardBody className="glass-card glass-card-hover rounded-2xl p-5 border-white/10 flex flex-col justify-between group relative w-full h-full bg-slate-950/80 backdrop-blur-xl">
                <div>
                  {/* Photo & Video Tag with 3D pop */}
                  <CardItem translateZ="50" className="w-full relative mb-4">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-full h-44 object-cover rounded-xl border border-white/10 group-hover:scale-105 transition-transform duration-500 shadow-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent rounded-xl" />
                    
                    {/* Flag & Country Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 shadow-md">
                      <span>{cand.flag}</span>
                      <span>{cand.country}</span>
                    </div>

                    {/* Video preview pill */}
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-bold flex items-center gap-1 shadow-gold-glow">
                      <Play className="w-2.5 h-2.5 fill-black" />
                      <span>Відео-тест {cand.videoDuration}</span>
                    </div>
                  </CardItem>

                  {/* Candidate Info with 3D elevation */}
                  <CardItem translateZ="40" className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                        {cand.name}
                      </h3>
                      <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                        СТ. 23 ЗУ
                      </span>
                    </div>
                    <p className="text-xs text-amber-300 font-medium mb-3">
                      {cand.profession}
                    </p>

                    {/* Ukrainian Enterprise Security Guarantee Note */}
                    <div className="mb-3 px-2 py-1 rounded-lg bg-slate-900/90 border border-cyan-500/20 text-[9px] font-mono text-cyan-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>100% легально для заводів України</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-400 mb-4 pb-4 border-b border-white/5">
                      <div className="flex justify-between">
                        <span>Досвід:</span>
                        <strong className="text-slate-200 font-semibold">{cand.experience}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Зарплата:</span>
                        <strong className="text-amber-400 font-bold">{cand.salary}</strong>
                      </div>
                    </div>

                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {cand.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] bg-slate-900/90 text-slate-300 px-2 py-0.5 rounded-md border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardItem>
                </div>

                {/* Action Button with high 3D pop */}
                <CardItem translateZ="60" className="w-full">
                  <a
                    href="#calculator"
                    onClick={() => playMechanicalClick()}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 text-black text-xs font-bold flex items-center justify-center gap-2 shadow-gold-glow transition-all duration-200"
                  >
                    <span>Запросити повне досьє</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400">
            У базі зараз понад <span className="text-amber-400 font-bold">140 активних кандидатів</span> з діючими закордонними паспортами та знятими відеозвітами навичок.
          </p>
        </div>
      </div>
    </section>
  );
};