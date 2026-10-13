
export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Painel de administração</h2>
      <p className="text-muted-foreground text-sm">
        Seção protegida. A partir daqui você pode cadastrar/editar bares,
        horários, eventos e fotos (CRUD do admin).
      </p>
      <p className="text-muted-foreground text-xs">
        Dica: para aplicar migrations no banco, use{" "}
        <code>npm run db:migrate</code> (com DATABASE_URL no .env.local).
      </p>
    </div>
  );
}
