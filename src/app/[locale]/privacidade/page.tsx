import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/config";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");
  const tc = await getTranslations("Common");

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-5 py-10">
      <div>
        <Link href="/" className="text-muted-foreground text-sm hover:underline">
          ← {tc("backToMap")}
        </Link>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {t("intro")}
      </p>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">{t("removalTitle")}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t("removalIntro")}
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>{t("optionFull")}</li>
          <li>{t("optionCorrection")}</li>
          <li>{t("optionOptOut")}</li>
        </ul>
        <p className="text-sm font-medium">{t("deadline")}</p>
        <p className="text-sm">
          {t("contactLabel")}:{" "}
          <a className="underline" href={`mailto:${siteConfig.lgpdEmail}`}>
            {siteConfig.lgpdEmail}
          </a>
        </p>
      </section>

      <p className="text-muted-foreground border-t pt-4 text-xs">
        {t("footerSource")}
      </p>
    </main>
  );
}
