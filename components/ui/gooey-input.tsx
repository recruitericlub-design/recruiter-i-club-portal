"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface GooeyInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (val: string) => void;
  buttonLabel?: string;
  className?: string;
}

export const GooeyInput: React.FC<GooeyInputProps> = ({
  placeholder = "Введіть ваш телефон або Email...",
  value,
  onChange,
  onSubmit,
  buttonLabel = "Розрахувати",
  className = "",
}) => {
  const [internalValue, setInternalValue] = useState("");
  const val = value !== undefined ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    else setInternalValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(val);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center ${className}`}>
      <div className="relative w-full flex items-center rounded-2xl bg-slate-900/90 border border-amber-500/30 p-1.5 focus-within:border-amber-400 focus-within:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all">
        <input
          type="text"
          value={val}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none font-mono"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
        >
          {buttonLabel}
        </motion.button>
      </div>
    </form>
  );
};
