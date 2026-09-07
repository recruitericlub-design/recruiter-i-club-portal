"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Factory, 
  HardHat, 
  Boxes, 
  UtensilsCrossed, 
  Truck, 
  Cpu, 
  CheckCircle2, 
  ArrowUpRight 
} from "lucide-react";

export const IndustriesSection: React.FC = () => {
  const industries = [
    {
      title: "����� ��������������� & �������������",
      desc: "��������� ������������� 135/136/141/111, ������-������������, ��������� ��������� �������, ���������������.",
      icon: Factory,
      stats: "780+ ��������",
      countries: "����������, ����",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "�������� & ���������� ����������",
      desc: "�����������, ���������, ������, ���������� �����������������, ��������� � ������� �� ������� ���������������� ��?�����.",
      icon: HardHat,
      stats: "640+ �����������",
      countries: "����������, �����",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "�������� ��������� & ���������",
      desc: "��������� ���������������� (High Reach), ����������������� ��������� � ���������, �������������, ������������.",
      icon: Boxes,
      stats: "520+ ���������",
      countries: "����, �����",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "������� ������������ & �������������",
      desc: "�������������� �?���, ��������� ����������� ���, ������������, �������� �������� � ������ ���������� �������� ��.",
      icon: UtensilsCrossed,
      stats: "310+ ����������",
      countries: "Գ�����, �����",
      image: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "����������� ������� �� ��������� ���",
      desc: "���������� �� ����������������� Fanuc, Heidenhain, Siemens Sinumerik, ��������� 3-5 ������� ��������� ������.",
      icon: Cpu,
      stats: "120+ �������",
      countries: "����, Գ�����",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "̳�������� �������� & ����������",
      desc: "��䳿 ��������� ������� C+E (��� 95, ADR), ��������� �����������, ��������� �������� �� ���������.",
      icon: Truck,
      stats: "90+ ��䳿�",
      countries: "����������, �������",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="industries" className="py-24 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider block mb-2">
              ֳ���� �������� ������
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              �����, �� �� ����������� ����������
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            ����� ������������ �� ��������� ���-����� ��������� ���������� �� �������� ����������.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.article
                key={ind.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden border-white/10 group flex flex-col justify-between"
              >
                <div>
                  {/* Card Image Banner with Dark Gradient */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] font-semibold text-amber-400">
                      {ind.stats}
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 backdrop-blur-md border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-amber-400 transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                </div>

                {/* Footer details */}
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                  <span>������: <strong className="text-slate-300 font-medium">{ind.countries}</strong></span>
                  <a
                    href="#calculator"
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>��������</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
