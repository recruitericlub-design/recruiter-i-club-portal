"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipCardProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  tooltipClassName?: string;
}

export const TooltipCard: React.FC<TooltipCardProps> = ({
  children,
  content,
  className = "",
  tooltipClassName = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute bottom-full left-1/2 -translate-x-1/2 z-50 px-3 py-2 rounded-xl bg-slate-900/95 border border-amber-500/30 text-xs text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md pointer-events-none whitespace-nowrap min-w-[160px] text-center ${tooltipClassName}`}
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900/95" />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};
