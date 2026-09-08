"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  position?: { x: number; y: number };
  isStatic?: boolean;
  duration?: number;
  lensColor?: string;
  ariaLabel?: string;
}

export const Lens: React.FC<LensProps> = ({
  children,
  zoomFactor = 1.8,
  lensSize = 160,
  isStatic = false,
  position = { x: 200, y: 150 },
  lensColor = "rgba(245, 158, 11, 0.15)",
  ariaLabel = "Zoom Lens",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const currentPos = isStatic ? position : mousePosition;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden cursor-crosshair select-none rounded-2xl"
    >
      {children}

      <AnimatePresence>
        {(isHovered || isStatic) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: `${currentPos.x - lensSize / 2}px`,
              top: `${currentPos.y - lensSize / 2}px`,
              width: `${lensSize}px`,
              height: `${lensSize}px`,
              pointerEvents: "none",
            }}
            className="rounded-full border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.5)] overflow-hidden z-40 backdrop-contrast-125"
            aria-label={ariaLabel}
          >
            {/* Magnified view container */}
            <div
              style={{
                position: "absolute",
                left: `${-currentPos.x * zoomFactor + lensSize / 2}px`,
                top: `${-currentPos.y * zoomFactor + lensSize / 2}px`,
                transform: `scale(${zoomFactor})`,
                transformOrigin: "top left",
                width: containerRef.current?.offsetWidth || "100%",
                height: containerRef.current?.offsetHeight || "100%",
              }}
            >
              {children}
            </div>

            {/* Tactical Crosshair overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-amber-400/40" />
              <div className="absolute h-full w-[1px] bg-amber-400/40" />
              <div className="w-3 h-3 rounded-full border border-amber-400/60" />
              <div className="absolute top-2 right-3 font-mono text-[8px] text-amber-300 font-bold bg-black/60 px-1 rounded">
                x{zoomFactor}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
