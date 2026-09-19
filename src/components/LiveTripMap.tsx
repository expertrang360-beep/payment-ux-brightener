import { useEffect, useRef, useState } from "react";
import { LocateFixed, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type LatLng = { lat: number; lng: number };
type MapInstance = { setCenter: (position: LatLng) => void; setZoom: (zoom: number) => void; getZoom: () => number | undefined };
type MarkerInstance = { setPosition: (position: LatLng) => void };

declare global {
  interface Window {
    google?: {
      maps: {
        Map: new (element: HTMLElement, options: Record<string, unknown>) => MapInstance;
        Marker: new (options: Record<string, unknown>) => MarkerInstance;
        Polyline: new (options: Record<string, unknown>) => unknown;
      };
    };
    __payroxaMapsReady?: () => void;
  }
}

const routePoints: LatLng[] = [
  { lat: 6.4478, lng: 3.4723 },
  { lat: 6.4455, lng: 3.4618 },
  { lat: 6.4412, lng: 3.4511 },
  { lat: 6.4356, lng: 3.4387 },
  { lat: 6.4281, lng: 3.4219 },
];

let mapsPromise: Promise<void> | undefined;

function loadMaps() {
  if (typeof window === "undefined") return Promise.reject(new Error("Maps require a browser"));
  if (window.google?.maps) return Promise.resolve();
  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    const key = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
    const channel = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"];
    if (!key) {
      reject(new Error("Map key unavailable"));
      return;
    }
    window.__payroxaMapsReady = () => resolve();
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&loading=async&callback=__payroxaMapsReady&channel=${encodeURIComponent(channel ?? "payroxa-mobility")}`;
    script.async = true;
    script.onerror = () => reject(new Error("Map failed to load"));
    document.head.appendChild(script);
  });
  return mapsPromise;
}

export function LiveTripMap({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapInstance>();
  const vehicleRef = useRef<MarkerInstance>();
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let active = true;
    loadMaps().then(() => {
      if (!active || !containerRef.current || !window.google?.maps) return;
      const maps = window.google.maps;
      const map = new maps.Map(containerRef.current, {
        center: routePoints[2],
        zoom: 14,
        disableDefaultUI: true,
        clickableIcons: false,
        gestureHandling: "greedy",
        styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
      });
      new maps.Polyline({ map, path: routePoints, strokeColor: "#2563eb", strokeOpacity: 0.95, strokeWeight: 5 });
      new maps.Marker({ map, position: routePoints[0], title: "Pickup" });
      new maps.Marker({ map, position: routePoints[routePoints.length - 1], title: "Destination" });
      const positionIndex = Math.min(routePoints.length - 1, Math.floor(progress * (routePoints.length - 1)));
      const vehicle = new maps.Marker({ map, position: routePoints[positionIndex], title: "Your Payroxa partner" });
      mapRef.current = map;
      vehicleRef.current = vehicle;
      setMapReady(true);
    }).catch(() => setMapReady(false));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const positionIndex = Math.min(routePoints.length - 1, Math.floor(progress * (routePoints.length - 1)));
    vehicleRef.current?.setPosition(routePoints[positionIndex]);
  }, [progress]);

  const zoom = (change: number) => {
    const current = mapRef.current?.getZoom() ?? 14;
    mapRef.current?.setZoom(Math.max(10, Math.min(19, current + change)));
  };

  return (
    <div className="relative h-64 overflow-hidden bg-secondary">
      <div ref={containerRef} className="absolute inset-0" aria-label="Live trip map" />
      {!mapReady && <div className="absolute inset-0 grid place-items-center bg-secondary"><p className="text-xs font-medium text-muted-foreground">Loading live route…</p></div>}
      <div className="absolute right-3 top-3 flex flex-col gap-1">
        <Button size="icon" variant="secondary" className="bg-background shadow-soft" onClick={() => zoom(1)} aria-label="Zoom in"><Plus /></Button>
        <Button size="icon" variant="secondary" className="bg-background shadow-soft" onClick={() => zoom(-1)} aria-label="Zoom out"><Minus /></Button>
      </div>
      <Button size="icon" variant="secondary" className="absolute bottom-3 right-3 bg-background shadow-soft" onClick={() => mapRef.current?.setCenter(routePoints[2])} aria-label="Center route"><LocateFixed /></Button>
      <div className="absolute left-3 top-3 rounded-lg bg-background px-3 py-2 shadow-soft"><p className="text-[10px] text-muted-foreground">Live route</p><p className="text-xs font-semibold text-foreground">Lekki → Victoria Island</p></div>
    </div>
  );
}