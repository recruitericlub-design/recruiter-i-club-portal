"use client";

import React, { useEffect, useRef } from "react";

interface WebcamPixelGridProps {
  className?: string;
  gridSize?: number;
}

export const WebcamPixelGrid: React.FC<WebcamPixelGridProps> = ({
  className = "",
  gridSize = 20,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * gridSize + gridSize / 2;
          const y = r * gridSize + gridSize / 2;
          const dist = Math.hypot(x - mouseRef.current.x, y - mouseRef.current.y);

          const maxDist = 120;
          let radius = 1.2;
          let alpha = 0.15;

          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            radius = 1.2 + factor * 3.5;
            alpha = 0.15 + factor * 0.7;
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = dist < maxDist ? `rgba(245, 158, 11, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [gridSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};
