"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export interface HubPoint {
  id: string;
  name: string;
  country: string;
  adminName: string;
  lat: number;
  lng: number;
  isMainHub?: boolean;
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

  // Fly camera to specific hub
  const flyToHub = useCallback((hub: HubPoint) => {
    const camDist = 260; // Optimal viewing distance for ThreeGlobe (R = 100)
    const targetPos = latLngToVector(hub.lat, hub.lng, camDist);
    targetCamPosRef.current = targetPos;
    isAnimatingCamRef.current = true;
  }, []);

  // When selectedHubId changes externally, trigger camera fly
  useEffect(() => {
    const hub = HUBS.find((h) => h.id === selectedHubId);
    if (hub) {
      flyToHub(hub);
    }
  }, [selectedHubId, flyToHub]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(0, 80, 280);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.7;
    controls.zoomSpeed = 0.8;
    controls.minDistance = 140;
    controls.maxDistance = 450;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 0.6;
    controls.enablePan = false;
    controlsRef.current = controls;

    // Interrupt camera animation if user manually rotates
    controls.addEventListener("start", () => {
      isAnimatingCamRef.current = false;
    });

    // 5. Lighting
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

    // 6. Instantiate ThreeGlobe
    const Globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true })
      .globeImageUrl("/textures/earth-night.jpg")
      .bumpImageUrl("/textures/earth-topology.png")
      .showAtmosphere(true)
      .atmosphereColor("#0ea5e9")
      .atmosphereAltitude(0.22);

    globeInstanceRef.current = Globe;
    scene.add(Globe);

    // 7. Configure Arcs (from partner hubs into Kyiv)
    const kyivHub = HUBS[0];
    const arcsData = HUBS.slice(1).map((hub) => ({
      startLat: hub.lat,
      startLng: hub.lng,
      endLat: kyivHub.lat,
      endLng: kyivHub.lng,
      color: [hub.color, "#38bdf8"],
      hubId: hub.id,
      name: `${hub.name} → Київ`,
    }));

    Globe.arcsData(arcsData)
      .arcColor((d: any) => d.color)
      .arcAltitude(0.24)
      .arcStroke(1.2)
      .arcDashLength(0.4)
      .arcDashGap(0.8)
      .arcDashInitialGap(() => Math.random())
      .arcDashAnimateTime(2000);

    // 8. Configure Rings (pulsing radar rings at hubs)
    const ringsData = HUBS.map((hub) => ({
      lat: hub.lat,
      lng: hub.lng,
      color: hub.isMainHub ? "#38bdf8" : hub.color,
      maxR: hub.isMainHub ? 4.5 : 3.5,
      propagationSpeed: hub.isMainHub ? 2.5 : 1.8,
      repeatPeriod: hub.isMainHub ? 1200 : 1600,
    }));

    Globe.ringsData(ringsData)
      .ringColor((d: any) => d.color)
      .ringMaxRadius((d: any) => d.maxR)
      .ringPropagationSpeed((d: any) => d.propagationSpeed)
      .ringRepeatPeriod((d: any) => d.repeatPeriod);

    // 9. Configure Hub Labels
    const labelsData = HUBS.map((hub) => ({
      id: hub.id,
      lat: hub.lat,
      lng: hub.lng,
      text: `${hub.flag} ${hub.name}`,
      color: hub.isMainHub ? "#38bdf8" : "#fef08a",
      size: hub.isMainHub ? 1.4 : 1.1,
      dotRadius: hub.isMainHub ? 0.6 : 0.45,
    }));

    Globe.labelsData(labelsData)
      .labelText((d: any) => d.text)
      .labelColor((d: any) => d.color)
      .labelSize((d: any) => d.size)
      .labelDotRadius((d: any) => d.dotRadius)
      .labelAltitude(0.02)
      .labelResolution(3);

    // 10. Load GeoJSON Polygons (Countries Borders)
    const targetAdminNames = HUBS.map((h) => h.adminName);

    fetch("/data/countries.geojson")
      .then((res) => res.json())
      .then((countries) => {
        Globe.polygonsData(countries.features)
          .polygonCapColor((feat: any) => {
            const admin = feat.properties.ADMIN || feat.properties.NAME;
            if (admin === "Ukraine") {
              return "rgba(56, 189, 248, 0.45)"; // Cyan fill for Ukraine
            }
            if (targetAdminNames.includes(admin)) {
              return "rgba(245, 158, 11, 0.38)"; // Golden amber fill for partner countries
            }
            return "rgba(15, 23, 42, 0.25)"; // Dark slate background fill for other countries
          })
          .polygonSideColor(() => "rgba(0, 0, 0, 0.15)")
          .polygonStrokeColor((feat: any) => {
            const admin = feat.properties.ADMIN || feat.properties.NAME;
            if (admin === "Ukraine") {
              return "#38bdf8"; // Luminous cyan border
            }
            if (targetAdminNames.includes(admin)) {
              return "#fbbf24"; // Luminous golden amber border
            }
            return "rgba(71, 85, 105, 0.35)"; // Subtle, dim borders for background countries so globe isn't empty
          })
          .polygonAltitude((feat: any) => {
            const admin = feat.properties.ADMIN || feat.properties.NAME;
            if (admin === "Ukraine" || targetAdminNames.includes(admin)) {
              return 0.015; // Raised slightly for partner countries
            }
            return 0.005;
          });

        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load countries.geojson:", err);
        setIsLoading(false);
      });

    // 11. Raycasting for Clicking on Globe
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Globe.children, true);

      if (intersects.length > 0) {
        const hitPoint = intersects[0].point;
        // Find closest hub
        let closestHub: HubPoint | null = null;
        let minDist = Infinity;

        HUBS.forEach((hub) => {
          const hubVec = latLngToVector(hub.lat, hub.lng, 100);
          const dist = hitPoint.distanceTo(hubVec);
          if (dist < minDist) {
            minDist = dist;
            closestHub = hub;
          }
        });

        // If clicked within reasonable proximity of a hub (35 units on sphere of R=100)
        if (closestHub && minDist < 35) {
          onSelectHub(closestHub);
          flyToHub(closestHub);
        }
      }
    };

    renderer.domElement.addEventListener("click", handleCanvasClick);

    // 12. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
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

        if (camera.position.distanceTo(targetCamPosRef.current) < 1.5) {
          isAnimatingCamRef.current = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 14. Initial focus on Tashkent
    const initialHub = HUBS.find((h) => h.id === selectedHubId) || HUBS[1];
    flyToHub(initialHub);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("click", handleCanvasClick);
      controls.dispose();
      renderer.dispose();
      Globe._destructor?.();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [flyToHub, onSelectHub, isAutoRotate]);

  // Update autoRotate when prop changes
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotate;
    }
  }, [isAutoRotate]);

  return (
    <div className="relative w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[620px] flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617]/80 backdrop-blur-sm z-20 transition-opacity">
          <div className="w-12 h-12 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin mb-4" />
          <div className="font-mono text-xs text-amber-400/90 tracking-widest uppercase">
            ІНІЦІАЛІЗАЦІЯ 3D-СФЕРИ NASA ТА GEOJSON МЕЖ...
          </div>
        </div>
      )}

      {/* Subtle Hint */}
      <div className="absolute bottom-3 left-4 z-10 pointer-events-none flex items-center gap-2 font-mono text-[10px] text-slate-500 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span>Обертання мишею / Клік на країну для наближення</span>
      </div>
    </div>
  );
};
