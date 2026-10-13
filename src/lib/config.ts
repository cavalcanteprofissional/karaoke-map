export const siteConfig = {
  name: "Karaokê Map",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  lgpdEmail: process.env.NEXT_PUBLIC_LGPD_EMAIL ?? "lgpd@example.com",
} as const;

export const mapConfig = {
  key: process.env.NEXT_PUBLIC_MAPTILER_KEY ?? "",
  style: process.env.NEXT_PUBLIC_MAP_STYLE ?? "streets-v2-dark",
  center: [
    Number(process.env.NEXT_PUBLIC_DEFAULT_LNG ?? -38.5267),
    Number(process.env.NEXT_PUBLIC_DEFAULT_LAT ?? -3.7319),
  ] as [number, number],
  zoom: Number(process.env.NEXT_PUBLIC_DEFAULT_ZOOM ?? 11),
} as const;

export function mapStyleUrl(): string {
  return `https://api.maptiler.com/maps/${mapConfig.style}/style.json?key=${mapConfig.key}`;
}
