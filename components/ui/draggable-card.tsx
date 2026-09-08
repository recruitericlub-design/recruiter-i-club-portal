"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

interface DraggableCardProps {
  children: React.ReactNode;
  className?: string;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
  children,
  className = "",
}) => {
  const constraintsRef = useRef(null);

  return (
    <div ref={constraintsRef} className="relative w-full h-full">
      <motion.div
        drag
        dragConstraints={{ top: -40, left: -40, right: 40, bottom: 40 }}
        dragElastic={0.2}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        className={`cursor-grab select-none active:cursor-grabbing ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};
