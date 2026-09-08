"use client";

import React, { useId, useEffect, useRef } from "react";

interface SparklesCoreProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id,
  className = "",
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.8,
  speed = 0.8,
  particleColor = "#fbbf24",
  particleDensity = 80,
}) => {
  const generatedId = useId();
  const canvasId = id || generatedId;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
      canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Calculate count based on area and density
    const area = (canvas.width * canvas.height) / 10000;
    const count = Math.max(30, Math.floor(area * (particleDensity / 10)));

    interface Particle {
      x: number;
      y: number;
      size: number;
      alpha: number;
      targetAlpha: number;
      vx: number;
      vy: number;
      fadeSpeed: number;
    }

    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        alpha: Math.random() * 0.8 + 0.2,
        targetAlpha: Math.random() * 0.9 + 0.1,
        vx: (Math.random() - 0.5) * 0.3 * speed,
        vy: -Math.random() * 0.4 * speed - 0.1,
        fadeSpeed: Math.random() * 0.015 + 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Twinkle / Alpha pulse
        if (Math.abs(p.alpha - p.targetAlpha) < 0.05) {
          p.targetAlpha = Math.random() * 0.9 + 0.1;
        } else if (p.alpha < p.targetAlpha) {
          p.alpha += p.fadeSpeed;
        } else {
          p.alpha -= p.fadeSpeed;
        }

        // Render sparkle particle with soft radial glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.shadowBlur = p.size > 1.2 ? 6 : 0;
        ctx.shadowColor = particleColor;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [maxSize, minSize, particleColor, particleDensity, speed]);

  return (
    <canvas
      id={canvasId}
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ background }}
    />
  );
};
