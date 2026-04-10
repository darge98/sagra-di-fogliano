import nodemailer from "nodemailer";
import { getEmailTemplate } from "@/lib/email-templates";

const GMAIL_USER = "sagradifogliano@gmail.com";

/** Crea il transporter Gmail usando la App Password dal .env */
function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export interface RegistrationEmailPayload {
  sportId: string;
  sportLabel: string;
  teamName: string;
  contactEmail: string;
}

/**
 * Invia la mail di conferma iscrizione al referente.
 * Non lancia eccezioni: in caso di errore logga e ritorna senza bloccare la registrazione.
 */
export async function sendRegistrationEmail(
  payload: RegistrationEmailPayload
): Promise<void> {
  try {
    const { subject, bodyHtml } = getEmailTemplate(payload.sportId, {
      sportLabel: payload.sportLabel,
      teamName: payload.teamName,
      contactName: payload.contactEmail,
    });

    const transporter = createTransporter();

    await transporter.sendMail({
      from: `Sagra di Fogliano <${GMAIL_USER}>`,
      to: payload.contactEmail,
      subject,
      html: bodyHtml,
    });

    console.log(`📧 Email di conferma inviata a ${payload.contactEmail} (sport: ${payload.sportId})`);
  } catch (err) {
    console.error("⚠️ Errore invio email di conferma (la registrazione è stata salvata correttamente):", err);
  }
}
