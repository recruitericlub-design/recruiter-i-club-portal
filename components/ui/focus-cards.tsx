"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const FocusCards = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<any>, {
          onMouseEnter: () => setHovered(index),
          onMouseLeave: () => setHovered(null),
          isBlurred: hovered !== null && hovered !== index,
          isFocused: hovered === index,
        });
      })}
    </div>
  );
};

export const FocusCardItem = ({
  children,
  className,
  isBlurred,
  isFocused,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  className?: string;
  isBlurred?: boolean;
  isFocused?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "rounded-2xl transition-all duration-300 relative",
        isBlurred && "blur-[2px] opacity-40 scale-[0.98]",
        isFocused && "scale-[1.02] shadow-[0_0_35px_rgba(245,158,11,0.25)] border-amber-500/60 z-20",
        className
      )}
    >
      {children}
    </div>
  );
};
