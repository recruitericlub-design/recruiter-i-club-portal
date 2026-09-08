"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

interface FeaturesSectionProps {
  features: FeatureItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features,
  title,
  subtitle,
  className = "",
}) => {
  return (
    <section className={`py-12 relative ${className}`}>
      {(title || subtitle) && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 text-sm text-white/60 leading-relaxed font-mono">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="relative group p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-300 overflow-hidden backdrop-blur-md"
            >
              {/* Top ambient highlight line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                {feature.badge && (
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">
                    {feature.badge}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
