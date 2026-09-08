"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxHeroImagesProps {
  images: {
    src: string;
    title: string;
    badge?: string;
  }[];
  className?: string;
}

export const ParallaxHeroImages: React.FC<ParallaxHeroImagesProps> = ({
  images,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-16 overflow-hidden ${className}`}
    >
      {/* Edge Focus Radial Mask */}
      <div className="absolute inset-0 pointer-events-none z-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {images.map((item, idx) => {
          const y = idx % 2 === 0 ? y1 : y2;
          return (
            <motion.div
              key={idx}
              style={{ y }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 aspect-[4/3]"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-xs font-bold text-white tracking-wide">
                  {item.title}
                </span>
                {item.badge && (
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
