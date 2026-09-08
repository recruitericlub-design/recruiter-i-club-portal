"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";

interface PointerHighlightProps {
  children: React.ReactNode;
  badgeText?: string;
  className?: string;
}

export const PointerHighlight: React.FC<PointerHighlightProps> = ({
  children,
  badgeText = "0% Аутстафінгу",
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -10, y: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-7 -right-12 z-40 pointer-events-none flex items-center space-x-1"
        >
          <MousePointer2 className="w-3.5 h-3.5 text-amber-400 fill-amber-400 -rotate-45" />
          <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-mono font-bold tracking-tight shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            {badgeText}
          </span>
        </motion.div>
      )}
      {children}
    </div>
  );
};
