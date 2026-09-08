"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CometCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  cometColor?: string;
}

export const CometCard: React.FC<CometCardProps> = ({
  children,
  className,
  containerClassName,
  cometColor = "#f59e0b",
}) => {
  return (
    <div className={cn("relative p-[1.5px] overflow-hidden rounded-2xl group", containerClassName)}>
      {/* Animated Rotating Conic Comet Trail */}
      <div 
        className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] opacity-60 group-hover:opacity-100 transition-opacity"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, ${cometColor} 340deg, #ffffff 360deg)`
        }}
      />

      {/* Inner Card Content Container */}
      <div className={cn("relative rounded-[15px] bg-slate-950/90 backdrop-blur-xl h-full w-full", className)}>
        {children}
      </div>
    </div>
  );
};
