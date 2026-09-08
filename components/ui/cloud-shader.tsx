"use client";

import React, { useEffect, useRef } from "react";

interface CloudShaderProps {
  className?: string;
  speed?: number;
  color?: string;
}

export const CloudShader: React.FC<CloudShaderProps> = ({
  className = "",
  speed = 0.002,
  color = "#f59e0b",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      t += speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Draw procedural atmospheric gradient clouds
      const grad1 = ctx.createRadialGradient(
        w * 0.3 + Math.sin(t) * 50,
        h * 0.4 + Math.cos(t * 0.8) * 30,
        10,
        w * 0.3,
        h * 0.4,
        w * 0.5
      );
      grad1.addColorStop(0, "rgba(245, 158, 11, 0.08)");
      grad1.addColorStop(1, "transparent");

      const grad2 = ctx.createRadialGradient(
        w * 0.7 - Math.cos(t * 0.9) * 40,
        h * 0.6 + Math.sin(t * 0.7) * 40,
        10,
        w * 0.7,
        h * 0.6,
        w * 0.6
      );
      grad2.addColorStop(0, "rgba(6, 182, 212, 0.06)");
      grad2.addColorStop(1, "transparent");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [speed, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};
