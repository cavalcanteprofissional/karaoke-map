import { NextRequest, NextResponse } from "next/server";

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;

interface MapTilerFeature {
  place_name: string;
  center: [number, number];
  bbox?: [number, number, number, number];
}

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
  boundingbox?: [string, string, string, string];
}

async function geocodeWithMapTiler(q: string) {
  if (!MAPTILER_KEY) return null;
  const url = new URL("https://api.maptiler.com/geocoding/" + encodeURIComponent(q) + ".json");
  url.searchParams.set("key", MAPTILER_KEY);
  url.searchParams.set("limit", "5");
  url.searchParams.set("language", "pt");
  url.searchParams.set("autocomplete", "true");

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.features?.length) return null;
    return (data.features as MapTilerFeature[]).map((f) => ({
      name: f.place_name,
      lat: f.center[1],
      lng: f.center[0],
      bbox: f.bbox as [number, number, number, number] | undefined,
    }));
  } catch {
    return null;
  }
}

async function geocodeWithNominatim(q: string) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", q);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "5");
  url.searchParams.set("addressdetails", "1");

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "karaoke-map/0.2.0 (https://github.com/cavalcanteprofissional/karaoke-map)",
        "Accept-Language": "pt-BR",
      },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data as NominatimResult[]).map((r) => ({
      name: r.display_name,
      lat: Number(r.lat),
      lng: Number(r.lon),
      bbox: r.boundingbox ? ([Number(r.boundingbox[2]), Number(r.boundingbox[0]), Number(r.boundingbox[3]), Number(r.boundingbox[1])] as [number, number, number, number]) : undefined,
    }));
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q || q.length < 3) {
    return NextResponse.json({ results: [] }, { status: 200 });
  }

  let results = await geocodeWithMapTiler(q);
  if (!results || results.length === 0) {
    results = await geocodeWithNominatim(q);
  }

  return NextResponse.json({ results: results ?? [] }, {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=600" },
  });
}
