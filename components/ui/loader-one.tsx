"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoaderOneProps {
  size?: number;
  className?: string;
  label?: string;
}

export const LoaderOne: React.FC<LoaderOneProps> = ({
  size = 48,
  className = "",
  label = "Синхронізація...",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-400 border-r-amber-500/30"
        />

        {/* Counter Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-1.5 rounded-full border-2 border-transparent border-b-cyan-400 border-l-cyan-500/20"
        />

        {/* Center Pulsing Dot */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
        />
      </div>

      {label && (
        <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400/80">
          {label}
        </span>
      )}
    </div>
  );
};
