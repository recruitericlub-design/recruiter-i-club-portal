"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, Info, Shield, CheckCircle2 } from "lucide-react";

interface CityPin {
  id: string;
  name: string;
  country: string;
  flag: string;
  lat: number;
  lon: number;
  workers: string;
  isMainHub?: boolean;
}

export const InteractiveGlobe3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityPin | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Rotation angles
  const rotRef = useRef({ x: 0.35, y: -0.8 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0.0025 });

  // Sovereign recruitment hubs & Ukraine main destination (Clean, uncluttered)
  const cities: CityPin[] = [
    { id: "kyiv", name: "Київ", country: "Україна", flag: "🇺🇦", lat: 50.4501, lon: 30.5234, workers: "Головний B2B Хаб (Прямий найм)", isMainHub: true },
    { id: "tashkent", name: "Ташкент", country: "Узбекистан", flag: "🇺🇿", lat: 41.2995, lon: 69.2401, workers: "480+ атестованих майстрів" },
    { id: "delhi", name: "Нью-Делі", country: "Індія", flag: "🇮🇳", lat: 28.6139, lon: 77.2090, workers: "320+ робітничих фахівців" },
    { id: "manila", name: "Маніла", country: "Філіппіни", flag: "🇵🇭", lat: 14.5995, lon: 120.9842, workers: "190+ операторів виробництва" },
    { id: "dhaka", name: "Дакка", country: "Бангладеш", flag: "🇧🇩", lat: 23.8103, lon: 90.4125, workers: "150+ монтажників" },
    { id: "kathmandu", name: "Катманду", country: "Непал", flag: "🇳🇵", lat: 27.7172, lon: 85.3240, workers: "110+ будівельників" },
    { id: "chisinau", name: "Кишинів", country: "Молдова", flag: "🇲🇩", lat: 47.0105, lon: 28.8638, workers: "Транзитний логістичний коридор" },
  ];

  const [projectedPins, setProjectedPins] = useState<{ pin: CityPin; x: number; y: number; visible: boolean; z: number }[]>([]);

  // WebGL realistic Earth Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true }) ||
               canvas.getContext("experimental-webgl", { alpha: true, antialias: true }) as WebGLRenderingContext | null;

    if (!gl) {
      console.warn("WebGL not supported, rendering fallback.");
      return;
    }

    // Vertex Shader
    const vsSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Photorealistic Earth Sphere with Rayleigh Atmosphere & Sun Shading
    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uEarthTexture;
      uniform vec2 uResolution;
      uniform vec2 uRotation;
      uniform float uRadius;

      #define PI 3.141592653589793

      void main() {
        vec2 st = (gl_FragCoord.xy - uResolution * 0.5);
        float d = length(st);
        float R = uRadius;

        // Outer Atmosphere Glow
        if (d > R) {
          float haloDist = (d - R) / (R * 0.16);
          if (haloDist < 1.0) {
            float haloAlpha = pow(1.0 - haloDist, 3.2) * 0.65;
            vec3 haloColor = vec3(0.25, 0.65, 1.0);
            gl_FragColor = vec4(haloColor, haloAlpha);
          } else {
            discard;
          }
          return;
        }

        // Spherical surface coordinates
        float z = sqrt(max(0.0, R * R - d * d));
        vec3 normal = vec3(st.x / R, -st.y / R, z / R);

        // Apply 3D Rotation (Pitch X, Yaw Y)
        float cx = cos(uRotation.x);
        float sx = sin(uRotation.x);
        float cy = cos(uRotation.y);
        float sy = sin(uRotation.y);

        vec3 p = normal;
        // Pitch (X)
        p = vec3(p.x, p.y * cx - p.z * sx, p.y * sx + p.z * cx);
        // Yaw (Y)
        p = vec3(p.x * cy + p.z * sy, p.y, -p.x * sy + p.z * cy);

        // Spherical UV Mapping
        float lat = asin(clamp(p.y, -1.0, 1.0));
        float lon = atan(p.x, p.z);
        vec2 uv = vec2((lon + PI) / (2.0 * PI), (lat + PI * 0.5) / PI);

        vec4 texColor = texture2D(uEarthTexture, uv);

        // Sun Direction Lighting (Gentle angled sunlight)
        vec3 sunDir = normalize(vec3(0.65, 0.45, 0.85));
        float NdotL = dot(normal, sunDir);
        float diffuse = clamp(NdotL * 0.9 + 0.22, 0.12, 1.0);

        // Specular Ocean Glint
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfVec = normalize(sunDir + viewDir);
        float specFactor = pow(max(0.0, dot(normal, halfVec)), 28.0);
        // Water is blue-ish/darker in red
        float isWater = smoothstep(0.35, 0.0, texColor.r);
        vec3 specular = vec3(1.0, 0.95, 0.8) * specFactor * 0.45 * isWater;

        // Realistic Rayleigh Limb Atmosphere
        float rim = pow(1.0 - normal.z, 2.5);
        vec3 rimGlow = vec3(0.25, 0.65, 1.0) * rim * 0.6;

        vec3 finalColor = texColor.rgb * diffuse + specular + rimGlow;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen Quad
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const aPositionLoc = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uRotationLoc = gl.getUniformLocation(program, "uRotation");
    const uRadiusLoc = gl.getUniformLocation(program, "uRadius");
    const uEarthTextureLoc = gl.getUniformLocation(program, "uEarthTexture");

    // Load Earth Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Temporary 1x1 navy pixel while texture loads
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([10, 25, 45, 255])
    );

    const earthImage = new Image();
    earthImage.crossOrigin = "anonymous";
    earthImage.src = "/earth-blue-marble.jpg";
    earthImage.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, earthImage);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };

    let animId: number;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Render loop
    const render = () => {
      // Inertia & auto-rotation
      if (!isDraggingRef.current) {
        rotRef.current.y += velocityRef.current.y;
        velocityRef.current.y = velocityRef.current.y * 0.98 + 0.0022 * 0.02;
        rotRef.current.x = Math.max(-0.85, Math.min(0.85, rotRef.current.x));
      }

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const radius = Math.min(rect.width, rect.height) * 0.38 * dpr;

      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uRotationLoc, rotRef.current.x, rotRef.current.y);
      gl.uniform1f(uRadiusLoc, radius);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uEarthTextureLoc, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Project Hub Pins in 3D Space (Screen Coords)
      const cssRadius = Math.min(rect.width, rect.height) * 0.38;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const newPins = cities.map((city) => {
        const phi = (90 - city.lat) * (Math.PI / 180);
        const theta = (city.lon + 180) * (Math.PI / 180) + rotRef.current.y;

        let px = -(cssRadius * Math.sin(phi) * Math.cos(theta));
        let pz = cssRadius * Math.sin(phi) * Math.sin(theta);
        let py = cssRadius * Math.cos(phi);

        // Pitch around X
        const rotX = rotRef.current.x;
        const py1 = py * Math.cos(rotX) - pz * Math.sin(rotX);
        const pz1 = py * Math.sin(rotX) + pz * Math.cos(rotX);

        // Only visible if on the front side facing the camera (pz1 > 0)
        return {
          pin: city,
          x: cx + px,
          y: cy - py1,
          visible: pz1 > cssRadius * 0.05,
          z: pz1,
        };
      });

      setProjectedPins(newPins);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Mouse / Touch Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;

    rotRef.current.y += dx * 0.007;
    rotRef.current.x -= dy * 0.007;
    rotRef.current.x = Math.max(-0.85, Math.min(0.85, rotRef.current.x));

    velocityRef.current = { x: dy * 0.001, y: dx * 0.003 };
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMouseRef.current.x;
    const dy = e.touches[0].clientY - lastMouseRef.current.y;

    rotRef.current.y += dx * 0.007;
    rotRef.current.x -= dy * 0.007;
    rotRef.current.x = Math.max(-0.85, Math.min(0.85, rotRef.current.x));

    lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[540px] mx-auto select-none touch-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* WebGL Photorealistic Earth Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Overlay 3D Hub Pins (Clean & Uncluttered) */}
      <div className="absolute inset-0 pointer-events-none">
        {projectedPins.map(({ pin, x, y, visible, z }) => {
          if (!visible) return null;
          const isSelected = selectedCity?.id === pin.id;
          const isMain = pin.isMainHub;

          return (
            <div
              key={pin.id}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -100%) scale(${Math.max(0.75, Math.min(1.15, 0.7 + (z / 200) * 0.4))})`,
              }}
              className="absolute pointer-events-auto transition-transform duration-75 group"
              onClick={() => setSelectedCity(isSelected ? null : pin)}
            >
              {/* Marker Pin */}
              <div className="relative flex flex-col items-center cursor-pointer">
                {/* Pulse Ring */}
                <span
                  className={`absolute -inset-1 rounded-full animate-ping opacity-60 ${
                    isMain ? "bg-amber-400" : "bg-cyan-400"
                  }`}
                  style={{ animationDuration: isMain ? "2s" : "3s" }}
                />

                {/* Center Beacon Dot */}
                <div
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-lg border ${
                    isMain
                      ? "bg-amber-500 border-yellow-200 text-[8px] shadow-[0_0_15px_rgba(245,158,11,0.8)]"
                      : "bg-cyan-500 border-cyan-200 text-[8px] shadow-[0_0_12px_rgba(6,182,212,0.7)]"
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                </div>

                {/* Country Flag & City Name Badge */}
                <div
                  className={`mt-1 px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold flex items-center gap-1 backdrop-blur-md whitespace-nowrap shadow-xl transition-all ${
                    isMain
                      ? "bg-amber-950/85 border-amber-400/80 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      : "bg-slate-900/85 border-white/20 text-white/90 group-hover:border-cyan-400/70"
                  }`}
                >
                  <span>{pin.flag}</span>
                  <span>{pin.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected City HUD Card */}
      {selectedCity && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-72 p-3.5 rounded-xl bg-slate-900/95 border border-amber-500/40 text-xs shadow-2xl backdrop-blur-md z-30 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {selectedCity.isMainHub ? "B2B ПРИЙМАЮЧИЙ ХАБ" : "АКРЕДИТОВАНИЙ ХАБ ВІДБОРУ"}
            </span>
            <button
              onClick={() => setSelectedCity(null)}
              className="text-white/40 hover:text-white font-mono text-xs px-1"
            >
              ✕
            </button>
          </div>
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <span className="text-base">{selectedCity.flag}</span>
            <span>{selectedCity.name}, {selectedCity.country}</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1 font-mono">
            {selectedCity.workers}
          </p>
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>Прямий найм у штат</span>
            <span className="text-emerald-400 font-bold">100% Легально</span>
          </div>
        </div>
      )}

      {/* Minimalistic Interactive Indicator Bottom Left */}
      <div className="absolute bottom-3 left-3 pointer-events-none hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/60 border border-white/10 text-[9px] font-mono text-slate-400 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>Обертайте планету 360°</span>
      </div>
    </div>
  );
};