import Link from "next/link";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Painel de administração</h2>
        <p className="text-muted-foreground text-sm">
          Gerencie bares, horários, eventos e solicitações LGPD
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href={`/${locale}/admin/bars`}
          className="border rounded-lg p-4 hover:bg-accent transition-colors"
        >
          <h3 className="font-medium">Bares</h3>
          <p className="text-sm text-muted-foreground">Listar e cadastrar estabelecimentos</p>
        </Link>
      </div>
    </div>
  );
}
