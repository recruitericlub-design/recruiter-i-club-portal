"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export interface HubPoint {
  id: string;
  name: string;
  country: string;
  adminName: string;
  lat: number;
  lng: number;
  isMainHub?: boolean;
  isTransitHub?: boolean;
  color: string;
  flag: string;
  targetWage: string;
  visaTime: string;
  flightCode: string;
}

export const HUBS: HubPoint[] = [
  {
    id: "kyiv",
    name: "Київ",
    country: "Україна",
    adminName: "Ukraine",
    lat: 50.4501,
    lng: 30.5234,
    isMainHub: true,
    color: "#38bdf8",
    flag: "🇺🇦",
    targetWage: "Головний хаб",
    visaTime: "0 днів",
    flightCode: "UA-HUB",
  },
  {
    id: "chisinau",
    name: "Кишинів",
    country: "Молдова",
    adminName: "Moldova",
    lat: 47.0105,
    lng: 28.8638,
    isTransitHub: true,
    color: "#10b981",
    flag: "🇲🇩",
    targetWage: "Транзитний хаб",
    visaTime: "10–20 днів",
    flightCode: "RMO-KBP",
  },
  {
    id: "tashkent",
    name: "Ташкент",
    country: "Узбекистан",
    adminName: "Uzbekistan",
    lat: 41.2995,
    lng: 69.2401,
    color: "#fbbf24",
    flag: "🇺🇿",
    targetWage: "від 900 €",
    visaTime: "30–45 днів",
    flightCode: "TAS-KBP",
  },
  {
    id: "delhi",
    name: "Нью-Делі",
    country: "Індія",
    adminName: "India",
    lat: 28.6139,
    lng: 77.2090,
    color: "#f59e0b",
    flag: "🇮🇳",
    targetWage: "від 600 €",
    visaTime: "60–90 днів",
    flightCode: "DEL-KBP",
  },
  {
    id: "almaty",
    name: "Алмати",
    country: "Казахстан",
    adminName: "Kazakhstan",
    lat: 43.2389,
    lng: 76.8897,
    color: "#fbbf24",
    flag: "🇰🇿",
    targetWage: "від 950 €",
    visaTime: "30–45 днів",
    flightCode: "ALA-KBP",
  },
  {
    id: "dhaka",
    name: "Дакка",
    country: "Бангладеш",
    adminName: "Bangladesh",
    lat: 23.8103,
    lng: 90.4125,
    color: "#f59e0b",
    flag: "🇧🇩",
    targetWage: "від 600 €",
    visaTime: "60–90 днів",
    flightCode: "DAC-KBP",
  },
  {
    id: "kathmandu",
    name: "Катманду",
    country: "Непал",
    adminName: "Nepal",
    lat: 27.7172,
    lng: 85.3240,
    color: "#f59e0b",
    flag: "🇳🇵",
    targetWage: "від 650 €",
    visaTime: "60–85 днів",
    flightCode: "KTM-KBP",
  },
  {
    id: "hanoi",
    name: "Ханой",
    country: "В'єтнам",
    adminName: "Vietnam",
    lat: 21.0285,
    lng: 105.8542,
    color: "#f59e0b",
    flag: "🇻🇳",
    targetWage: "від 700 €",
    visaTime: "60–80 днів",
    flightCode: "HAN-KBP",
  },
  {
    id: "manila",
    name: "Маніла",
    country: "Філіппіни",
    adminName: "Philippines",
    lat: 14.5995,
    lng: 120.9842,
    color: "#f59e0b",
    flag: "🇵🇭",
    targetWage: "від 750 €",
    visaTime: "60–90 днів",
    flightCode: "MNL-KBP",
  },
];

interface ThreeGlobeSceneProps {
  selectedHubId: string;
  onSelectHub: (hub: HubPoint) => void;
  isAutoRotate: boolean;
}

export const ThreeGlobeScene: React.FC<ThreeGlobeSceneProps> = ({
  selectedHubId,
  onSelectHub,
  isAutoRotate,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const globeInstanceRef = useRef<ThreeGlobe | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const isAnimatingCamRef = useRef<boolean>(false);
  const countriesDataRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to convert lat/lng to 3D position vector on sphere of radius R
  const latLngToVector = (lat: number, lng: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 90) * (Math.PI / 180);
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  // Fly camera to specific hub with close cinematic zoom (dist = 175)
  const flyToHub = useCallback((hub: HubPoint) => {
    // Zoom close to show detailed border polygons
    const camDist = 175;
    const targetPos = latLngToVector(hub.lat, hub.lng, camDist);
    targetCamPosRef.current = targetPos;
    isAnimatingCamRef.current = true;
  }, []);

  // Update polygon colors and elevation when selectedHubId changes
  const updateCountryHighlights = useCallback((activeId: string) => {
    const Globe = globeInstanceRef.current;
    if (!Globe || !countriesDataRef.current) return;

    const activeHub = HUBS.find((h) => h.id === activeId);
    const activeAdmin = activeHub ? activeHub.adminName : "";
    const targetAdmins = HUBS.map((h) => h.adminName);

    Globe.polygonCapColor((feat: any) => {
      const admin = feat.properties.ADMIN || feat.properties.NAME;
      if (admin === activeAdmin) {
        if (admin === "Ukraine") return "rgba(56, 189, 248, 0.65)";
        if (admin === "Moldova") return "rgba(16, 185, 129, 0.65)";
        return "rgba(245, 158, 11, 0.65)"; // Intense gold highlight for active
      }
      if (admin === "Ukraine") return "rgba(56, 189, 248, 0.35)";
      if (admin === "Moldova") return "rgba(16, 185, 129, 0.35)";
      if (targetAdmins.includes(admin)) return "rgba(245, 158, 11, 0.28)";
      return "rgba(15, 23, 42, 0.18)"; // Muted dark slate for background
    });

    Globe.polygonStrokeColor((feat: any) => {
      const admin = feat.properties.ADMIN || feat.properties.NAME;
      if (admin === activeAdmin) {
        if (admin === "Ukraine") return "#38bdf8";
        if (admin === "Moldova") return "#34d399";
        return "#fbbf24"; // Bright razor-sharp neon border
      }
      if (admin === "Ukraine") return "rgba(56, 189, 248, 0.6)";
      if (admin === "Moldova") return "rgba(16, 185, 129, 0.6)";
      if (targetAdmins.includes(admin)) return "rgba(251, 191, 36, 0.5)";
      return "rgba(51, 65, 85, 0.25)"; // Ultra-subtle border for background countries
    });

    Globe.polygonAltitude((feat: any) => {
      const admin = feat.properties.ADMIN || feat.properties.NAME;
      if (admin === activeAdmin) return 0.045; // Elevated holographic relief for selected country
      if (admin === "Ukraine" || admin === "Moldova" || targetAdmins.includes(admin)) return 0.015;
      return 0.003;
    });
  }, []);

  // When selectedHubId changes, fly camera and update country highlights
  useEffect(() => {
    const hub = HUBS.find((h) => h.id === selectedHubId);
    if (hub) {
      flyToHub(hub);
      updateCountryHighlights(selectedHubId);
    }
  }, [selectedHubId, flyToHub, updateCountryHighlights]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (centered directly on globe)
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(0, 50, 200);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. CSS2D Renderer for Razor-sharp HTML/SVG markers
    const css2dRenderer = new CSS2DRenderer();
    css2dRenderer.setSize(width, height);
    css2dRenderer.domElement.style.position = "absolute";
    css2dRenderer.domElement.style.top = "0px";
    css2dRenderer.domElement.style.left = "0px";
    css2dRenderer.domElement.style.pointerEvents = "none";
    container.appendChild(css2dRenderer.domElement);

    // 5. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.7;
    controls.zoomSpeed = 0.8;
    controls.minDistance = 125;
    controls.maxDistance = 380;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 0.5;
    controls.enablePan = false;
    controlsRef.current = controls;

    // Interrupt camera animation if user manually grabs the globe
    controls.addEventListener("start", () => {
      isAnimatingCamRef.current = false;
    });

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(-200, 200, 300);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.9);
    dirLight2.position.set(300, -100, -100);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xf59e0b, 0.7);
    dirLight3.position.set(-300, -150, 100);
    scene.add(dirLight3);

    // 7. Instantiate ThreeGlobe
    const Globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true })
      .globeImageUrl("/textures/earth-night.jpg")
      .bumpImageUrl("/textures/earth-topology.png")
      .showAtmosphere(true)
      .atmosphereColor("#0ea5e9")
      .atmosphereAltitude(0.24);

    globeInstanceRef.current = Globe;
    scene.add(Globe);

    // 8. Configure Arcs (Connecting partner hubs -> Moldova transit -> Kyiv destination)
    const kyivHub = HUBS[0]; // Kyiv
    const chisinauHub = HUBS[1]; // Moldova

    const arcsData: any[] = [];

    // Main corridors into Kyiv
    HUBS.slice(2).forEach((hub) => {
      // Direct high-altitude route to Kyiv
      arcsData.push({
        startLat: hub.lat,
        startLng: hub.lng,
        endLat: kyivHub.lat,
        endLng: kyivHub.lng,
        color: [hub.color, "#38bdf8"],
        name: `${hub.name} → Київ`,
        alt: 0.26,
      });

      // Route via Moldova transit hub
      arcsData.push({
        startLat: hub.lat,
        startLng: hub.lng,
        endLat: chisinauHub.lat,
        endLng: chisinauHub.lng,
        color: [hub.color, "#10b981"],
        name: `${hub.name} → Кишинів (Транзит)`,
        alt: 0.18,
      });
    });

    // Dedicated Chisinau -> Kyiv ground/air transit corridor
    arcsData.push({
      startLat: chisinauHub.lat,
      startLng: chisinauHub.lng,
      endLat: kyivHub.lat,
      endLng: kyivHub.lng,
      color: ["#10b981", "#38bdf8"],
      name: "Кишинів → Київ (Офіційний наземний коридор)",
      alt: 0.08,
      stroke: 2.2,
    });

    Globe.arcsData(arcsData)
      .arcColor((d: any) => d.color)
      .arcAltitude((d: any) => d.alt || 0.22)
      .arcStroke((d: any) => d.stroke || 1.3)
      .arcDashLength(0.4)
      .arcDashGap(0.8)
      .arcDashInitialGap(() => Math.random())
      .arcDashAnimateTime(2000);

    // 9. Configure Concentric Radar Rings
    const ringsData = HUBS.map((hub) => ({
      lat: hub.lat,
      lng: hub.lng,
      color: hub.color,
      maxR: hub.isMainHub ? 4.5 : (hub.isTransitHub ? 4.0 : 3.2),
      propagationSpeed: hub.isMainHub ? 2.5 : 1.8,
      repeatPeriod: hub.isMainHub ? 1200 : 1600,
    }));

    Globe.ringsData(ringsData)
      .ringColor((d: any) => d.color)
      .ringMaxRadius((d: any) => d.maxR)
      .ringPropagationSpeed((d: any) => d.propagationSpeed)
      .ringRepeatPeriod((d: any) => d.repeatPeriod);

    // 10. Configure High-DPI HTML/SVG Markers with Real Flags and Tactile Badges
    Globe.htmlElementsData(HUBS)
      .htmlElement((d: any) => {
        const el = document.createElement("div");
        el.className = "group pointer-events-auto cursor-pointer select-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-125";
        
        const badgeBorder = d.isMainHub 
          ? "border-cyan-400 shadow-[0_0_16px_rgba(56,189,248,0.5)]" 
          : (d.isTransitHub 
              ? "border-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.5)]"
              : "border-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.4)]");

        const wageColor = d.isMainHub 
          ? "text-cyan-300 bg-cyan-500/20" 
          : (d.isTransitHub 
              ? "text-emerald-300 bg-emerald-500/20" 
              : "text-amber-300 bg-amber-500/20");

        el.innerHTML = `
          <div class="flex flex-col items-center">
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/90 border ${badgeBorder} backdrop-blur-md">
              <span class="text-sm leading-none drop-shadow-md">${d.flag}</span>
              <span class="text-[11px] font-bold font-mono text-white tracking-tight whitespace-nowrap">${d.name}</span>
              <span class="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${wageColor} whitespace-nowrap">${d.targetWage}</span>
            </div>
            <div class="w-2.5 h-2.5 mt-1 rounded-full border-2 border-white shadow-[0_0_10px_#fff]" style="background-color: ${d.color};"></div>
          </div>
        `;

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelectHub(d);
          flyToHub(d);
        });

        return el;
      })
      .htmlAltitude(0.025)
      .htmlElementVisibilityModifier((el: HTMLElement, isVisible: boolean) => {
        el.style.opacity = isVisible ? "1" : "0";
        el.style.pointerEvents = isVisible ? "auto" : "none";
      });

    // 11. Load GeoJSON Polygons (Countries Borders)
    fetch("/data/countries.geojson")
      .then((res) => res.json())
      .then((countries) => {
        countriesDataRef.current = countries;
        Globe.polygonsData(countries.features);
        updateCountryHighlights(selectedHubId);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load countries.geojson:", err);
        setIsLoading(false);
      });

    // 12. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
          css2dRenderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 13. Render Loop with Smooth Camera Lerp
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera interpolation towards selected hub
      if (isAnimatingCamRef.current && targetCamPosRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.055);
        camera.lookAt(0, 0, 0);

        if (camera.position.distanceTo(targetCamPosRef.current) < 1.0) {
          isAnimatingCamRef.current = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
      css2dRenderer.render(scene, camera);
    };

    animate();

    // 14. Initial focus on Tashkent
    const initialHub = HUBS.find((h) => h.id === selectedHubId) || HUBS[2];
    flyToHub(initialHub);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      Globe._destructor?.();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (container.contains(css2dRenderer.domElement)) {
        container.removeChild(css2dRenderer.domElement);
      }
    };
  }, [flyToHub, onSelectHub, isAutoRotate, updateCountryHighlights]);

  // Update autoRotate when prop changes
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotate;
    }
  }, [isAutoRotate]);

  return (
    <div className="relative w-full h-full min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] flex items-center justify-center">
      {/* Three.js + CSS2D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing relative flex items-center justify-center" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617]/70 backdrop-blur-sm z-30 transition-opacity">
          <div className="w-12 h-12 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin mb-4" />
          <div className="font-mono text-xs text-amber-400/90 tracking-widest uppercase">
            ІНІЦІАЛІЗАЦІЯ СФЕРИ NASA ТА КОРДОНІВ КРАЇН...
          </div>
        </div>
      )}
    </div>
  );
};
