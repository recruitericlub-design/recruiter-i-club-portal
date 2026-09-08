"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ChromaticImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  badge?: string;
}

export const ChromaticImage: React.FC<ChromaticImageProps> = ({
  src,
  alt,
  width = 600,
  height = 400,
  className = "",
  badge = "HD TELEMETRY",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 group bg-slate-950 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Image */}
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isHovered ? "filter contrast-125" : ""
          }`}
        />

        {/* Chromatic Aberration Layers on hover */}
        {isHovered && (
          <>
            <div
              className="absolute inset-0 mix-blend-screen opacity-50 translate-x-[2px] pointer-events-none"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "drop-shadow(2px 0 red)",
              }}
            />
            <div
              className="absolute inset-0 mix-blend-screen opacity-50 -translate-x-[2px] pointer-events-none"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "drop-shadow(-2px 0 cyan)",
              }}
            />
          </>
        )}
      </div>

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

      {/* Industrial Reticle Badge */}
      {badge && (
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 border border-amber-500/40 text-[10px] font-mono text-amber-300 backdrop-blur-md">
          {badge}
        </div>
      )}
    </div>
  );
};
