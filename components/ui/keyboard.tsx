"use client";

import React from "react";

interface KeyProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export const Key: React.FC<KeyProps> = ({ children, active, className = "" }) => {
  return (
    <div
      className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-md font-mono text-xs font-semibold shadow-[0_3px_0_0_rgba(0,0,0,0.6)] border border-white/20 transition-all ${
        active
          ? "bg-amber-500 text-slate-950 translate-y-[2px] shadow-[0_1px_0_0_rgba(0,0,0,0.6)]"
          : "bg-slate-800/90 text-white/90 hover:bg-slate-700/90 hover:border-amber-400/40"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const KeyboardDemo: React.FC = () => {
  return (
    <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 inline-flex items-center space-x-2">
      <span className="text-xs text-white/60 font-mono mr-2">Швидкий пошук:</span>
      <Key>⌘</Key>
      <Key>K</Key>
      <span className="text-white/30 text-xs font-mono">або</span>
      <Key>Esc</Key>
    </div>
  );
};
