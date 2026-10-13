import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM ?? "Karaokê Map <no-reply@karaoke-map.local>";
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_LGPD_EMAIL ?? "cavalcanteprofissional@outlook.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      barId,
      subjectType = "bar",
      subjectRef,
      type,
      notes,
      requesterEmail,
    } = body ?? {};

    if (!type || !subjectRef) {
      return NextResponse.json(
        { error: "type and subjectRef are required" },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const { error } = await supabase.from("removal_requests").insert({
      bar_id: barId ?? null,
      subject_type: subjectType,
      subject_ref: subjectRef,
      type,
      notes: notes ?? null,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: RESEND_FROM,
            to: [ADMIN_EMAIL],
            replyTo: requesterEmail || undefined,
            subject: `[Karaokê Map] Nova solicitação LGPD: ${type}`,
            text: `Nova solicitação LGPD\n\nTipo: ${type}\nAssunto: ${subjectRef}\nBar ID: ${barId ?? "N/A"}\nSolicitante: ${requesterEmail ?? "N/A"}\n\nNotas:\n${notes ?? "-"}`,
          }),
        });
      } catch {
        // Ignora falha de envio de e-mail
      }
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
