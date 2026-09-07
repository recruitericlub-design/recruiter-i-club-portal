"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ClipboardCheck, 
  Video, 
  UserCheck, 
  FileText, 
  PlaneTakeoff, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface RoadmapSectionProps {
  messages: any;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({ messages }) => {
  const steps = [
    {
      num: "01",
      title: messages.roadmap?.step1Title,
      desc: messages.roadmap?.step1Desc,
      icon: ClipboardCheck,
      badge: "���� 1�2",
    },
    {
      num: "02",
      title: messages.roadmap?.step2Title,
      desc: messages.roadmap?.step2Desc,
      icon: Video,
      badge: "���� 3�7",
    },
    {
      num: "03",
      title: messages.roadmap?.step3Title,
      desc: messages.roadmap?.step3Desc,
      icon: UserCheck,
      badge: "���� 8�10",
    },
    {
      num: "04",
      title: messages.roadmap?.step4Title,
      desc: messages.roadmap?.step4Desc,
      icon: FileText,
      badge: "���� 11�25",
    },
    {
      num: "05",
      title: messages.roadmap?.step5Title,
      desc: messages.roadmap?.step5Desc,
      icon: PlaneTakeoff,
      badge: "���� 26�35",
    },
  ];

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border-amber-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>ϳ� ��������� CRM-�������</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {messages.roadmap?.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            {messages.roadmap?.subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="glass-card glass-card-hover rounded-2xl p-6 border-white/5 relative flex flex-col justify-between group"
              >
                {/* Step Number Watermark */}
                <div className="absolute top-4 right-4 text-3xl font-black text-slate-800/80 group-hover:text-amber-500/20 transition-colors">
                  {step.num}
                </div>

                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="inline-block text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md mb-3 border border-amber-500/20">
                    {step.badge}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[11px] text-slate-500 group-hover:text-amber-400 transition-colors">
                  <span>����� ������� #{idx + 1}</span>
                  <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
