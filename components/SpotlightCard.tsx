"use client";

import React, { useRef, useState, useCallback } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: "amber" | "cyan" | "emerald" | "rose";
  showCorners?: boolean;
  intensity?: number;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "amber",
  showCorners = true,
  intensity = 0.15,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const colorMap = {
    amber: {
      glow: `rgba(245, 158, 11, ${intensity})`,
      border: `rgba(245, 158, 11, ${intensity * 1.8})`,
      corner: "text-amber-500/40",
    },
    cyan: {
      glow: `rgba(6, 182, 212, ${intensity})`,
      border: `rgba(6, 182, 212, ${intensity * 1.8})`,
      corner: "text-cyan-500/40",
    },
    emerald: {
      glow: `rgba(16, 185, 129, ${intensity})`,
      border: `rgba(16, 185, 129, ${intensity * 1.8})`,
      corner: "text-emerald-500/40",
    },
    rose: {
      glow: `rgba(244, 63, 94, ${intensity})`,
      border: `rgba(244, 63, 94, ${intensity * 1.8})`,
      corner: "text-rose-500/40",
    },
  };

  const currentTheme = colorMap[spotlightColor] || colorMap.amber;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/[0.08] transition-all duration-300 hover:border-white/20 shadow-lg ${className}`}
      {...props}
    >
      {/* 1. Dynamic Cursor Spotlight Glow (Surface Fill) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${currentTheme.glow}, transparent 80%)`,
        }}
      />

      {/* 2. Dynamic Cursor Light on 1px Sub-pixel Border */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${position.x}px ${position.y}px, ${currentTheme.border}, transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* 3. Engineering Blueprint CAD Crosshairs in Corners */}
      {showCorners && (
        <>
          <span
            className={`pointer-events-none absolute top-1.5 left-2 font-mono text-[10px] select-none ${currentTheme.corner} transition-opacity duration-300 group-hover:opacity-100 opacity-30`}
          >
            +
          </span>
          <span
            className={`pointer-events-none absolute top-1.5 right-2 font-mono text-[10px] select-none ${currentTheme.corner} transition-opacity duration-300 group-hover:opacity-100 opacity-30`}
          >
            +
          </span>
          <span
            className={`pointer-events-none absolute bottom-1.5 left-2 font-mono text-[10px] select-none ${currentTheme.corner} transition-opacity duration-300 group-hover:opacity-100 opacity-30`}
          >
            +
          </span>
          <span
            className={`pointer-events-none absolute bottom-1.5 right-2 font-mono text-[10px] select-none ${currentTheme.corner} transition-opacity duration-300 group-hover:opacity-100 opacity-30`}
          >
            +
          </span>
        </>
      )}

      {/* Content wrapper */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};
