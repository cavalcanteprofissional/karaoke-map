"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { SearchBar, type GeocodeResult } from "@/components/search-bar";
import { MapView, type MapViewport } from "@/features/map/map-view";
import { mapConfig } from "@/lib/config";
import { useGeolocation } from "@/features/map/use-geolocation";

export function MapClient() {
  const [viewport, setViewport] = useState<MapViewport>({
    center: mapConfig.center,
    zoom: mapConfig.zoom,
  });
  const geo = useGeolocation();

  const handleSelect = useCallback((r: GeocodeResult) => {
    setViewport({
      center: [r.lng, r.lat],
      zoom: 14,
    });
  }, []);

  const handleLocate = useCallback(() => {
    geo.request();
  }, [geo]);


  return (
    <>
      <div className="absolute left-4 top-4 z-10 w-[calc(100%-2rem)] max-w-xl">
        <div className="flex flex-col gap-2 rounded-lg border bg-background/80 p-2 backdrop-blur sm:flex-row sm:items-center">
          <SearchBar onSelect={handleSelect} />
          <Button
            type="button"
            variant="outline"
            onClick={handleLocate}
            disabled={geo.pending}
          >
            {geo.pending ? "Localizando..." : "Usar minha localização"}
          </Button>
        </div>
      </div>
      <MapView viewport={viewport} />
    </>
  );
}
