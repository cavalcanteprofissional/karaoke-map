"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "@/i18n/navigation";

export function AdminShell({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    startTransition(() => {
      router.replace(`/${locale}/admin/login`);
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background/80 flex items-center justify-between border-b px-4 py-3 backdrop-blur">
        <div>
          <h1 className="text-sm font-semibold">Karaokê Map · Admin</h1>
          <p className="text-muted-foreground text-xs">Conta admin única</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          disabled={pending}
        >
          Sair
        </Button>
      </header>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
