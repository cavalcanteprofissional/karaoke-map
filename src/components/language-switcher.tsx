"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-1" aria-label="Language">
      {routing.locales.map((l) => (
        <Button
          key={l}
          variant={l === locale ? "secondary" : "ghost"}
          size="xs"
          disabled={l === locale || isPending}
          onClick={() =>
            startTransition(() => {
              router.replace(pathname, { locale: l });
            })
          }
        >
          {l.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
