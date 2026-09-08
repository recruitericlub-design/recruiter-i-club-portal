"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ContainerTextFlipProps {
  words: string[];
  duration?: number;
  className?: string;
  wordClassName?: string;
}

export const ContainerTextFlip: React.FC<ContainerTextFlipProps> = ({
  words,
  duration = 3000,
  className = "",
  wordClassName = "",
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden py-1 px-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 font-bold backdrop-blur-sm ${className}`}
      style={{ perspective: "1000px" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[currentWordIndex]}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: 90 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className={`inline-block text-amber-400 whitespace-nowrap drop-shadow-[0_0_12px_rgba(245,158,11,0.4)] ${wordClassName}`}
        >
          {words[currentWordIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
