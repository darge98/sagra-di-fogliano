import { NextResponse } from "next/server";
import {
  getSportDriveConfig,
  ensureSheetHeaders,
  uploadCertificateToDrive,
  appendRegistrationToSheet,
  type MemberRow,
  type RegistrationPayload,
} from "@/lib/google-sport-registration";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const sport = formData.get("sport") as string | null;
    const sportLabel = formData.get("sportLabel") as string | null;
    const teamName = (formData.get("teamName") as string) || "";
    const contactEmail = formData.get("contactEmail") as string | null;
    const contactPhone = formData.get("contactPhone") as string | null;
    const membersJson = formData.get("members") as string | null;

    if (!sport || !sportLabel || !contactEmail || !contactPhone || !membersJson) {
      return NextResponse.json(
        { error: "Dati mancanti: sport, email, telefono e membri sono obbligatori." },
        { status: 400 }
      );
    }

    const membersData = JSON.parse(membersJson) as Array<{
      firstName: string;
      lastName: string;
      gender: string;
      birthDate: string;
      birthPlace: string;
      address: string;
    }>;

    if (!Array.isArray(membersData) || membersData.length === 0) {
      return NextResponse.json(
        { error: "Devi inserire almeno un componente." },
        { status: 400 }
      );
    }

    const { spreadsheetId, certificatiFolderId } = getSportDriveConfig(sport);

    const uploadPromises = membersData.map(async (m, i) => {
      const certFile = formData.get(`certificate_${i}`) as File | null;
      let certificateFileName = "";

      if (certFile && certFile.size > 0) {
        const buffer = Buffer.from(await certFile.arrayBuffer());
        const mimeType = certFile.type || "application/octet-stream";
        const prefix = `${sport}_${m.lastName}_${m.firstName}`.replace(/\s+/g, "_");
        certificateFileName = await uploadCertificateToDrive(
          certificatiFolderId,
          buffer,
          certFile.name,
          mimeType,
          prefix
        );
      }

      return {
        firstName: m.firstName,
        lastName: m.lastName,
        gender: m.gender,
        birthDate: m.birthDate,
        birthPlace: m.birthPlace,
        address: m.address,
        certificateFileName,
      } satisfies MemberRow;
    });

    const members = await Promise.all(uploadPromises);

    await ensureSheetHeaders(spreadsheetId);

    const payload: RegistrationPayload = {
      sportId: sport,
      sportLabel,
      teamName: teamName || "Individuale",
      contactEmail,
      contactPhone,
      members,
    };

    await appendRegistrationToSheet(spreadsheetId, sportLabel, payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore registrazione:", error);
    const message =
      error instanceof Error ? error.message : "Errore durante l'iscrizione.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
