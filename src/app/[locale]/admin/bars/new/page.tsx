import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function NewBarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  async function createBar(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const city = (formData.get("city") as string) || "Fortaleza";
    const address = (formData.get("address") as string) || null;
    const lat = Number(formData.get("lat"));
    const lng = Number(formData.get("lng"));
    const instagram = (formData.get("instagram") as string) || null;
    const website = (formData.get("website") as string) || null;
    const supabase = await createClient();
    const { error } = await supabase.from("bars").insert({
      name,
      city,
      address,
      lat,
      lng,
      instagram_handle: instagram,
      website,
      status: "active",
      karaoke_types: ["permanente"],
    });
    if (error) throw new Error(error.message);
    redirect(`/${locale}/admin/bars`);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-medium">Novo bar</h2>
        <p className="text-muted-foreground text-sm">Cadastre um estabelecimento</p>
      </div>
      <form action={createBar} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input id="city" name="city" defaultValue="Fortaleza" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Endereço</Label>
          <Input id="address" name="address" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="lat">Latitude *</Label>
            <Input id="lat" name="lat" type="number" step="any" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lng">Longitude *</Label>
            <Input id="lng" name="lng" type="number" step="any" required />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input id="instagram" name="instagram" placeholder="sem @" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" name="website" type="url" />
          </div>
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
