import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function BarsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: bars } = await supabase
    .from("bars")
    .select("id,name,city,status,created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium">Bares</h2>
          <p className="text-muted-foreground text-sm">
            Lista de estabelecimentos cadastrados
          </p>
        </div>
        <Link
          href={`/${locale}/admin/bars/new`}
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center rounded-md px-4 text-sm font-medium transition-colors"
        >
          Novo bar
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left font-medium p-3">Nome</th>
              <th className="text-left font-medium p-3">Cidade</th>
              <th className="text-left font-medium p-3">Status</th>
              <th className="text-left font-medium p-3">Criado em</th>
              <th className="text-left font-medium p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {bars?.map((bar) => (
              <tr key={bar.id} className="border-t">
                <td className="p-3">{bar.name}</td>
                <td className="p-3 text-muted-foreground">{bar.city}</td>
                <td className="p-3">
                  <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs">
                    {bar.status}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground">
                  {bar.created_at
                    ? new Date(bar.created_at).toLocaleDateString("pt-BR")
                    : "-"}
                </td>
                <td className="p-3">
                  <Link
                    href={`/${locale}/admin/bars/${bar.id}`}
                    className="text-primary hover:underline"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
            {!bars?.length && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  Nenhum bar cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
