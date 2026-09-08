"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  currentAlpha: number;
  twinkleSpeed: number;
  color: string;
  hasSpikes: boolean;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const CosmicStarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const colors = [
      "rgba(255, 255, 255,", // Pure white
      "rgba(251, 191, 36,",  // Golden / Amber
      "rgba(103, 232, 249,", // Cyan / Ice blue
      "rgba(254, 240, 138,", // Warm yellow
    ];

    let stars: Star[] = [];
    const meteors: Meteor[] = [];

    const initStars = (w: number, h: number) => {
      // Calculate star count based on screen area (high density for rich cosmic feel)
      const count = Math.max(350, Math.floor((w * h) / 3800));
      const newStars: Star[] = [];

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let size = 0.8;
        let hasSpikes = false;
        let colorIdx = 0;

        if (rand < 0.65) {
          // Micro distant star
          size = Math.random() * 0.7 + 0.6;
          colorIdx = 0;
        } else if (rand < 0.90) {
          // Medium star
          size = Math.random() * 0.9 + 1.2;
          colorIdx = Math.floor(Math.random() * colors.length);
        } else {
          // Bright prominent star with diffraction glow
          size = Math.random() * 1.2 + 2.0;
          colorIdx = Math.floor(Math.random() * colors.length);
          hasSpikes = true;
        }

        newStars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size,
          baseAlpha: Math.random() * 0.5 + 0.35,
          currentAlpha: Math.random() * 0.5 + 0.35,
          twinkleSpeed: Math.random() * 0.02 + 0.006,
          color: colors[colorIdx],
          hasSpikes,
        });
      }

      stars = newStars;
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars(width, height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn meteors periodically
    let meteorTimer = 0;

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 1.2,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 120 + 80,
        speed: Math.random() * 10 + 12,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2, // ~45 deg downward
        alpha: 1.0,
        active: true,
      });
    };

    let time = 0;

    const render = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Cosmic Nebula Dust Glows in corners (adds deep space dimensionality)
      const grad1 = ctx.createRadialGradient(width * 0.8, height * 0.15, 50, width * 0.8, height * 0.15, 550);
      grad1.addColorStop(0, "rgba(245, 158, 11, 0.035)");
      grad1.addColorStop(1, "transparent");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.2, height * 0.7, 50, width * 0.2, height * 0.7, 650);
      grad2.addColorStop(0, "rgba(6, 182, 212, 0.03)");
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Stars with Twinkle Physics
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.currentAlpha = s.baseAlpha + Math.sin(time * s.twinkleSpeed + i) * 0.35;
        const alpha = Math.max(0.1, Math.min(1.0, s.currentAlpha));

        ctx.fillStyle = `${s.color}${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // 4-Point cross spikes for bright stars
        if (s.hasSpikes && alpha > 0.6) {
          const spikeLen = s.size * 2.8;
          ctx.strokeStyle = `${s.color}${alpha * 0.45})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          // Horizontal
          ctx.moveTo(s.x - spikeLen, s.y);
          ctx.lineTo(s.x + spikeLen, s.y);
          // Vertical
          ctx.moveTo(s.x, s.y - spikeLen);
          ctx.lineTo(s.x, s.y + spikeLen);
          ctx.stroke();

          // Soft radial aura
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${s.color}${alpha * 0.15})`;
          ctx.fill();
        }
      }

      // 3. Draw and Update Meteors (Shooting Stars)
      meteorTimer++;
      if (meteorTimer > 280 && Math.random() < 0.04) {
        spawnMeteor();
        meteorTimer = 0;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (!m.active) {
          meteors.splice(i, 1);
          continue;
        }

        const headX = m.x;
        const headY = m.y;
        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const mGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        mGrad.addColorStop(0, "transparent");
        mGrad.addColorStop(0.7, `rgba(251, 191, 36, ${m.alpha * 0.5})`);
        mGrad.addColorStop(1, `rgba(255, 255, 255, ${m.alpha})`);

        ctx.strokeStyle = mGrad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        // Move meteor
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.015;

        if (m.alpha <= 0 || m.x < -100 || m.x > width + 100 || m.y > height + 100) {
          m.active = false;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "#020617" }}
    />
  );
};
