"use client";

import React from "react";

interface NoiseBackgroundProps {
  children?: React.ReactNode;
  opacity?: number;
  className?: string;
}

export const NoiseBackground: React.FC<NoiseBackgroundProps> = ({
  children,
  opacity = 0.04,
  className = "",
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* SVG Noise Generator */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
