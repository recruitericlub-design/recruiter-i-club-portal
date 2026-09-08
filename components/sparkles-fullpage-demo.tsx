"use client";

import React from "react";
import { SparklesCore } from "./ui/sparkles";

export const SparklesFullpageDemo: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.5}
        maxSize={1.8}
        particleDensity={35}
        className="w-full h-full"
        particleColor="#fbbf24"
        speed={0.6}
      />
    </div>
  );
};
