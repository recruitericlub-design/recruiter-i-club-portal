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
  code: string;
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
    code: "UA",
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
    code: "MD",
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
    code: "UZ",
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
    code: "IN",
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
    code: "KZ",
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
    code: "BD",
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
    code: "NP",
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
    code: "VN",
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
    code: "PH",
    lat: 14.5995,
    lng: 120.9842,
    color: "#f59e0b",
    flag: "🇵🇭",
    targetWage: "від 750 €",
    visaTime: "60–90 днів",
    flightCode: "MNL-KBP",
  },
];

// Vector SVG Circular National Flags
const getFlagSvg = (code: string): string => {
  switch (code) {
    case "UZ":
      return `<svg viewBox="0 0 32 32" class="w-full h-full">
        <rect width="32" height="10" fill="#0099b5"/>
        <rect y="10" width="32" height="2" fill="#ce1126"/>
        <rect y="12" width="32" height="8" fill="#ffffff"/>
        <rect y="20" width="32" height="2" fill="#ce1126"/>
        <rect y="22" width="32" height="10" fill="#1eb53a"/>
        <circle cx="7" cy="5" r="3" fill="#ffffff"/>
        <circle cx="8" cy="5" r="2.5" fill="#0099b5"/>
        <circle cx="12" cy="4" r="0.8" fill="#ffffff"/>
        <circle cx="14" cy="4" r="0.8" fill="#ffffff"/>
        <circle cx="16" cy="4" r="0.8" fill="#ffffff"/>
      </svg>`;
    case "UA":
      return `<svg viewBox="0 0 32 32" class="w-full h-full">
        <rect width="32" height="16" fill="#0057b7"/>
        <rect y="16" width="32" height="16" fill="#ffd700"/>
      </svg>`;
    case "MD":
      return `<svg viewBox="0 0 32 32" class="w-full h-full">
        <rect width="11" height="32" fill="#003da5"/>
        <rect x="11" width="10" height="32" fill="#ffd100"/>
        <rect x="21" width="11" height="32" fill="#c8102e"/>
        <circle cx="16" cy="16" r="3" fill="#8B4513"/>
      </svg>`;
    case "IN":
      return `<svg viewBox="0 0 32 32" class="w-full h-full">
        <rect width="32" height="11" fill="#ff9933"/>
        <rect y="11" width="32" height="10" fill="#ffffff"/>
        <rect y="21" width="32" height="11" fill="#138808"/>
        <circle cx="16" cy="16" r="3.5" fill="none" stroke="#000080" stroke-width="1"/>
      </svg>`;
    case "KZ":
      return `<svg viewBox="0 0 32 32" class="w-full h-full">
        <rect width="32" height="32" fill="#00afca"/>
        <circle cx="16" cy="16" r="5" fill="#fec50c"/>
      </svg>`;
    case "BD":
      return `<svg viewBox="0 0 32 32" class="w-full h-full">
        <rect width="32" height="32" fill="#006a4e"/>
        <circle cx="14" cy="16" r="7" fill="#f42a41"/>
      </svg>`;
    case "NP":
      return `<svg viewBox="0 0 32 32" class="w-full h-full">
        <rect width="32" height="32" fill="#003893"/>
        <polygon points="4,2 26,14 12,14 26,30 4,30" fill="#dc143c"/>
      </svg>`;
    case "VN":
      return `<svg viewBox="0 0 32 32" class="w-full h-full">
        <rect width="32" height="32" fill="#da251d"/>
        <polygon points="16,7 18.5,13.5 25,13.5 19.5,17.5 21.5,24 16,20 10.5,24 12.5,17.5 7,13.5 13.5,13.5" fill="#ffff00"/>
      </svg>`;
    case "PH":
      return `<svg viewBox="0 0 32 32" class="w-full h-full">
        <rect width="32" height="16" fill="#0038a8"/>
        <rect y="16" width="32" height="16" fill="#ce1126"/>
        <polygon points="0,0 16,16 0,32" fill="#ffffff"/>
        <circle cx="6" cy="16" r="2.5" fill="#fcd116"/>
      </svg>`;
    default:
      return `<div class="w-full h-full bg-amber-500"></div>`;
  }
};

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

  // Convert lat/lng to 3D position vector on sphere of radius R with cinematic tilt
  const latLngToVector = (lat: number, lng: number, radius: number): THREE.Vector3 => {
    const phi = (90 - (lat + 14)) * (Math.PI / 180);
    const theta = (lng + 90 - 20) * (Math.PI / 180);
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  // Fly camera to specific hub with close cinematic zoom (dist = 185)
  const flyToHub = useCallback((hub: HubPoint) => {
    const camDist = 185;
    const targetPos = latLngToVector(hub.lat, hub.lng, camDist);
    targetCamPosRef.current = targetPos;
    isAnimatingCamRef.current = true;
  }, []);

  // Update Country Highlights & Single Clean Active Arc
  const updateActiveVisuals = useCallback((activeId: string) => {
    const Globe = globeInstanceRef.current;
    if (!Globe) return;

    const activeHub = HUBS.find((h) => h.id === activeId) || HUBS[2]; // Default Tashkent
    const kyivHub = HUBS[0]; // Kyiv

    // 1. UPDATE ARCS: Exactly ONE clean, laser-sharp glowing arc (stroke 0.7)!
    const activeArcs: any[] = [];
    if (activeHub.id === "kyiv") {
      activeArcs.push({
        startLat: HUBS[2].lat,
        startLng: HUBS[2].lng,
        endLat: kyivHub.lat,
        endLng: kyivHub.lng,
        color: ["#fbbf24", "#38bdf8"],
        alt: 0.28,
        stroke: 0.7,
      });
    } else if (activeHub.id === "chisinau") {
      activeArcs.push({
        startLat: activeHub.lat,
        startLng: activeHub.lng,
        endLat: kyivHub.lat,
        endLng: kyivHub.lng,
        color: ["#10b981", "#38bdf8"],
        alt: 0.16,
        stroke: 0.7,
      });
    } else {
      activeArcs.push({
        startLat: activeHub.lat,
        startLng: activeHub.lng,
        endLat: kyivHub.lat,
        endLng: kyivHub.lng,
        color: ["#fbbf24", "#38bdf8"],
        alt: 0.28,
        stroke: 0.7,
      });
    }

    Globe.arcsData(activeArcs)
      .arcColor((d: any) => d.color)
      .arcAltitude((d: any) => d.alt)
      .arcStroke((d: any) => d.stroke)
      .arcDashLength(0.4)
      .arcDashGap(0.6)
      .arcDashInitialGap(0)
      .arcDashAnimateTime(1800);

    // 2. UPDATE POLYGONS: Thin semi-transparent borders for ALL countries, glowing border for active!
    if (countriesDataRef.current) {
      const activeAdmin = activeHub.adminName;

      Globe.polygonCapColor((feat: any) => {
        const admin = feat.properties.ADMIN || feat.properties.NAME;
        if (admin === activeAdmin) {
          if (admin === "Ukraine") return "rgba(56, 189, 248, 0.28)";
          if (admin === "Moldova") return "rgba(16, 185, 129, 0.28)";
          return "rgba(245, 158, 11, 0.32)"; // Subtle glowing warm amber tint (no solid block)
        }
        if (admin === "Ukraine") return "rgba(56, 189, 248, 0.15)";
        return "rgba(0, 0, 0, 0)"; // 100% transparent fill so NASA lights show cleanly
      });

      Globe.polygonSideColor(() => "rgba(0, 0, 0, 0)");

      Globe.polygonStrokeColor((feat: any) => {
        const admin = feat.properties.ADMIN || feat.properties.NAME;
        if (admin === activeAdmin) {
          if (admin === "Ukraine") return "#38bdf8";
          if (admin === "Moldova") return "#34d399";
          return "#fbbf24"; // Radiant golden laser neon border (Screenshot 2)
        }
        if (admin === "Ukraine") return "rgba(56, 189, 248, 0.7)";
        if (admin === "Moldova") return "rgba(16, 185, 129, 0.6)";
        if (HUBS.some((h) => h.adminName === admin)) {
          return "rgba(245, 158, 11, 0.35)";
        }
        // ALL OTHER COUNTRIES: delicate, thin, semi-transparent line!
        return "rgba(148, 163, 184, 0.2)";
      });

      Globe.polygonAltitude((feat: any) => {
        const admin = feat.properties.ADMIN || feat.properties.NAME;
        if (admin === activeAdmin) return 0.015; // Smooth subtle elevation (no giant walls)
        if (admin === "Ukraine") return 0.008;
        return 0.003;
      });
    }

    // 3. UPDATE HTML MARKERS
    Globe.htmlElementsData(HUBS);
  }, []);

  // When selectedHubId changes, trigger camera fly and visual update
  useEffect(() => {
    const hub = HUBS.find((h) => h.id === selectedHubId);
    if (hub) {
      flyToHub(hub);
      updateActiveVisuals(selectedHubId);
    }
  }, [selectedHubId, flyToHub, updateActiveVisuals]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 750;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (zoomed closer, angled)
    const camera = new THREE.PerspectiveCamera(42, width / height, 1, 2000);
    camera.position.set(0, 40, 215);
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
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. CSS2D Renderer for Crisp HTML/SVG markers
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
    controls.rotateSpeed = 0.6;
    controls.zoomSpeed = 0.8;
    controls.minDistance = 140;
    controls.maxDistance = 380;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 0.35;
    controls.enablePan = false;
    controlsRef.current = controls;

    controls.addEventListener("start", () => {
      isAnimatingCamRef.current = false;
    });

    // 6. Planetary Atmosphere Outer Halo Mesh (Exact cyan rim glow of Screenshot 2)
    const atmosphereGeo = new THREE.SphereGeometry(100 * 1.18, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(0.0, 0.85, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // 7. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(-200, 200, 300);
    scene.add(dirLight1);

    const cyanRimLight = new THREE.DirectionalLight(0x00e5ff, 1.8);
    cyanRimLight.position.set(300, -100, -100);
    scene.add(cyanRimLight);

    const amberLight = new THREE.DirectionalLight(0xf59e0b, 0.8);
    amberLight.position.set(-300, -150, 100);
    scene.add(amberLight);

    // 8. Instantiate ThreeGlobe
    const Globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true })
      .globeImageUrl("/textures/earth-night.jpg")
      .bumpImageUrl("/textures/earth-topology.png")
      .showAtmosphere(true)
      .atmosphereColor("#00e5ff")
      .atmosphereAltitude(0.28);

    globeInstanceRef.current = Globe;
    scene.add(Globe);

    // 9. Configure High-DPI HTML/SVG Circular Flag Pins (Exactly like Screenshot 2)
    Globe.htmlElementsData(HUBS)
      .htmlElement((d: any) => {
        const isSelected = d.id === selectedHubId;
        const isKyiv = d.id === "kyiv";
        const isMoldova = d.id === "chisinau";

        const el = document.createElement("div");
        el.className = "group pointer-events-auto cursor-pointer select-none -translate-x-1/2 -translate-y-full transition-transform duration-200 hover:scale-125";

        const flagHtml = getFlagSvg(d.code);

        if (isSelected) {
          // ACTIVE SELECTED PIN: Big round flag pin + pointer needle + elegant dark badge!
          el.innerHTML = `
            <div class="flex items-center gap-2.5 filter drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]">
              <div class="relative flex flex-col items-center">
                <div class="w-10 h-10 rounded-full border-2 border-white bg-slate-900 overflow-hidden shadow-2xl p-0.5">
                  ${flagHtml}
                </div>
                <div class="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-white -mt-0.5"></div>
              </div>

              <!-- Ultra-sleek Translucent Dark Wage Pill (like Screenshot 2) -->
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-amber-400/60 backdrop-blur-xl shadow-2xl">
                <span class="text-xs font-bold font-mono text-white tracking-tight">${d.name}</span>
                <span class="text-amber-400 text-xs font-mono font-bold">• ${d.targetWage}</span>
              </div>
            </div>
          `;
        } else if (isKyiv) {
          // UKRAINE DESTINATION PIN
          el.innerHTML = `
            <div class="flex items-center gap-1.5 filter drop-shadow-[0_0_14px_rgba(56,189,248,0.5)]">
              <div class="relative flex flex-col items-center">
                <div class="w-7 h-7 rounded-full border-2 border-cyan-400 bg-slate-900 overflow-hidden shadow-xl p-0.5">
                  ${flagHtml}
                </div>
                <div class="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[5px] border-t-cyan-400 -mt-0.5"></div>
              </div>
              <span class="px-2 py-0.5 rounded-lg bg-slate-950/85 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300 backdrop-blur-md">
                Київ (UA)
              </span>
            </div>
          `;
        } else if (isMoldova) {
          // MOLDOVA TRANSIT PIN
          el.innerHTML = `
            <div class="flex items-center gap-1.5 filter drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">
              <div class="relative flex flex-col items-center">
                <div class="w-6 h-6 rounded-full border border-emerald-400 bg-slate-900 overflow-hidden shadow-md">
                  ${flagHtml}
                </div>
                <div class="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-emerald-400 -mt-0.5"></div>
              </div>
            </div>
          `;
        } else {
          // OTHER HUBS: Clean circular flag pin with glowing beacon (NO cluttering text!)
          el.innerHTML = `
            <div class="relative flex flex-col items-center filter drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]">
              <div class="w-6 h-6 rounded-full border border-white/80 bg-slate-900 overflow-hidden shadow-md">
                ${flagHtml}
              </div>
              <div class="w-1.5 h-1.5 mt-0.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24] animate-pulse"></div>
            </div>
          `;
        }

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

    // 10. Load GeoJSON Polygons
    fetch("/data/countries.geojson")
      .then((res) => res.json())
      .then((countries) => {
        countriesDataRef.current = countries;
        Globe.polygonsData(countries.features);
        updateActiveVisuals(selectedHubId);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load countries.geojson:", err);
        setIsLoading(false);
      });

    // 11. Pulse Radar Ring at Kyiv & selected hub
    const kyivHub = HUBS[0];
    const activeHub = HUBS.find((h) => h.id === selectedHubId) || HUBS[2];
    const ringsData = [
      { lat: kyivHub.lat, lng: kyivHub.lng, color: "#38bdf8", maxR: 4.2, propagationSpeed: 2.2, repeatPeriod: 1300 },
      { lat: activeHub.lat, lng: activeHub.lng, color: "#fbbf24", maxR: 3.8, propagationSpeed: 2.0, repeatPeriod: 1500 },
    ];

    Globe.ringsData(ringsData)
      .ringColor((d: any) => d.color)
      .ringMaxRadius((d: any) => d.maxR)
      .ringPropagationSpeed((d: any) => d.propagationSpeed)
      .ringRepeatPeriod((d: any) => d.repeatPeriod);

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

    // 13. Render Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

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

    const initialHub = HUBS.find((h) => h.id === selectedHubId) || HUBS[2];
    flyToHub(initialHub);
    updateActiveVisuals(selectedHubId);

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
  }, [flyToHub, onSelectHub, isAutoRotate, updateActiveVisuals]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotate;
    }
  }, [isAutoRotate]);

  return (
    <div className="relative w-full h-full min-h-[520px] sm:min-h-[620px] lg:min-h-[720px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing relative flex items-center justify-center" />

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617]/70 backdrop-blur-sm z-30 transition-opacity">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin mb-4" />
          <div className="font-mono text-xs text-cyan-400/90 tracking-widest uppercase">
            ІНІЦІАЛІЗАЦІЯ СУПУТНИКОВОЇ СФЕРИ NASA...
          </div>
        </div>
      )}
    </div>
  );
};
