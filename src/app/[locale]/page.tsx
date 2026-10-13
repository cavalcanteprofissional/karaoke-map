import { getTranslations, setRequestLocale } from "next-intl/server";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { MapClient } from "./map-client";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const tf = await getTranslations("Filters");
  const tp = await getTranslations("Privacy");

  return (
    <main className="flex flex-1 flex-col">
      <header className="bg-background/80 z-10 flex items-center justify-between gap-3 border-b px-4 py-3 backdrop-blur">
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold">{t("title")}</h1>
          <p className="text-muted-foreground truncate text-xs">{t("subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2 border-b px-4 py-2">
        <Badge variant="secondary">{tf("openNow")}</Badge>
        <Badge variant="secondary">{tf("karaokeToday")}</Badge>
        <span className="text-muted-foreground text-xs">{tf("soon")}</span>
      </div>

      <section className="relative min-h-[60vh] flex-1">
        <MapClient />
      </section>

      <footer className="text-muted-foreground flex items-center justify-between gap-2 border-t px-4 py-2 text-xs">
        <span>Karaokê Map</span>
        <Link href="/privacidade" className="hover:text-foreground underline">
          {tp("title")}
        </Link>
      </footer>
    </main>
  );
}
