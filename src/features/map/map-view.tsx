"use client";

import type { Map as MapLibreMap } from "maplibre-gl";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { mapConfig, mapStyleUrl } from "@/lib/config";

import "maplibre-gl/dist/maplibre-gl.css";

export interface MapViewport {
  center: [number, number];
  zoom: number;
}

export function MapView({
  viewport = { center: mapConfig.center, zoom: mapConfig.zoom },
}: {
  viewport?: MapViewport;
}) {
  const t = useTranslations("Home");
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [error, setError] = useState(false);
  const hasKey = Boolean(mapConfig.key);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    let disposed = false;
    let instance: MapLibreMap | undefined;

    (async () => {
      try {
        const maplibregl = await import("maplibre-gl");
        if (disposed || !containerRef.current) {
          return;
        }
        instance = new maplibregl.Map({
          container: containerRef.current,
          style: mapStyleUrl(),
          center: viewport.center,
          zoom: viewport.zoom,
          attributionControl: { compact: true },
        });
        instance.addControl(
          new maplibregl.NavigationControl({ showCompass: false }),
          "top-right",
        );
        mapRef.current = instance;
      } catch {
        if (!disposed) setError(true);
      }
    })();

    return () => {
      disposed = true;
      instance?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasKey]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || map.isMoving()) return;
    map.easeTo({ center: viewport.center, zoom: viewport.zoom, duration: 600 });
  }, [viewport]);

  if (!hasKey || error) {
    return (
      <div className="text-muted-foreground flex h-full w-full items-center justify-center p-6 text-center text-sm">
        {t("mapError")}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      role="application"
      aria-label={t("title")}
    />
  );
}
