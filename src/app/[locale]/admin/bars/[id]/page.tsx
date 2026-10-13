import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

export default async function EditBarPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const supabase = await createClient();
  const { data: bar } = await supabase
    .from("bars")
    .select("*")
    .eq("id", id)
    .single();

  if (!bar) notFound();

  async function updateBar(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const city = (formData.get("city") as string) || "Fortaleza";
    const address = (formData.get("address") as string) || null;
    const lat = Number(formData.get("lat"));
    const lng = Number(formData.get("lng"));
    const instagram = (formData.get("instagram") as string) || null;
    const website = (formData.get("website") as string) || null;
    const status = formData.get("status") as string;
    const supabase = await createClient();
    const { error } = await supabase
      .from("bars")
      .update({
        name,
        city,
        address,
        lat,
        lng,
        instagram_handle: instagram,
        website,
        status,
      })
      .eq("id", id);
    if (error) throw new Error(error.message);
    redirect(`/${locale}/admin/bars`);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-medium">Editar bar</h2>
        <p className="text-muted-foreground text-sm">{bar.name}</p>
      </div>
      <form action={updateBar} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input id="name" name="name" defaultValue={bar.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input id="city" name="city" defaultValue={bar.city || "Fortaleza"} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Endereço</Label>
          <Input id="address" name="address" defaultValue={bar.address || ""} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="lat">Latitude *</Label>
            <Input id="lat" name="lat" type="number" step="any" defaultValue={bar.lat} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lng">Longitude *</Label>
            <Input id="lng" name="lng" type="number" step="any" defaultValue={bar.lng} required />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input id="instagram" name="instagram" defaultValue={bar.instagram_handle || ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" name="website" type="url" defaultValue={bar.website || ""} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select id="status" name="status" defaultValue={bar.status} className="flex h-9 w-full rounded-md border bg-background px-3 py-1 text-sm">
            <option value="active">active</option>
            <option value="suspect">suspect</option>
            <option value="closed">closed</option>
          </select>
        </div>
        <div className="flex gap-2">
          <Button type="submit">Salvar</Button>
          <Link href={`/${locale}/admin/bars`}>
            <Button type="button" variant="outline">Cancelar</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
