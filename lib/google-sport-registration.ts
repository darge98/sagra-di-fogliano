import { google } from "googleapis";
import { Readable } from "stream";

// ==========================================
// 1. CONFIGURAZIONE AUTENTICAZIONE OAUTH2
// ==========================================

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Inizializza le API di Drive e Sheets passando il client OAuth2
const drive = google.drive({ version: "v3", auth: oauth2Client });
const sheets = google.sheets({ version: "v4", auth: oauth2Client });

// ==========================================
// 2. INTERFACCE E TIPI
// ==========================================

export interface MemberRow {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  certificateFileName: string;
}

export interface RegistrationPayload {
  sportId: string;
  sportLabel: string;
  teamName: string;
  contactEmail: string;
  contactPhone: string;
  members: MemberRow[];
}

// ==========================================
// 3. FUNZIONI DI UTILITÀ E ROUTING SPORT
// ==========================================

/**
 * Recupera gli ID di Drive e Sheets in base allo sport selezionato.
 */
export function getSportDriveConfig(sportId: string) {
  let spreadsheetId: string | undefined;
  let certificatiFolderId: string | undefined;

  // Normalizziamo l'ID in minuscolo per evitare errori di battitura
  const normalizedSportId = sportId.toLowerCase();

  switch (normalizedSportId) {
    case "calcio":
      spreadsheetId = process.env.SPORT_CALCIO_SPREADSHEET_ID;
      certificatiFolderId = process.env.SPORT_CALCIO_CERTIFICATI_FOLDER_ID;
      break;
    case "beachvolley":
      spreadsheetId = process.env.SPORT_BEACHVOLLEY_SPREADSHEET_ID;
      certificatiFolderId = process.env.SPORT_BEACHVOLLEY_CERTIFICATI_FOLDER_ID;
      break;
    case "4fogliano":
    case "quattro-fogliano": // Nel caso l'id del form sia scritto diversamente
      spreadsheetId = process.env.SPORT_4FOGLIANO_SPREADSHEET_ID;
      certificatiFolderId = process.env.SPORT_4FOGLIANO_CERTIFICATI_FOLDER_ID;
      break;
    case "lodolata":
      spreadsheetId = process.env.SPORT_LODOLATA_SPREADSHEET_ID;
      certificatiFolderId = process.env.SPORT_LODOLATA_CERTIFICATI_FOLDER_ID;
      break;
    default:
      throw new Error(`Sport non riconosciuto o non configurato: ${sportId}`);
  }

  // Controllo di sicurezza: se mancano le variabili nel file .env per quello sport
  if (!spreadsheetId || !certificatiFolderId) {
    throw new Error(`Configurazione Drive/Sheets mancante per lo sport: ${sportId}`);
  }

  return { spreadsheetId, certificatiFolderId };
}

// ==========================================
// 4. LOGICA DI SCRITTURA E UPLOAD
// ==========================================

export async function uploadCertificateToDrive(
  folderId: string,
  buffer: Buffer,
  originalName: string,
  mimeType: string,
  prefix: string
) {
  const cleanOriginalName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const fileName = `${prefix}_${Date.now()}_${cleanOriginalName}`;

  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType: mimeType,
        body: stream,
      },
      fields: "id, name",
    });

    return response.data.name || fileName;
  } catch (error) {
    console.error("Errore durante l'upload su Drive:", error);
    throw new Error("Impossibile caricare il certificato su Google Drive.");
  }
}

export async function ensureSheetHeaders(spreadsheetId: string) {
  const sheetName = "Foglio1"; // Assicurati che i tuoi file excel abbiano questo nome nel tab in basso

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:Z1`,
    });

    const hasHeaders = response.data.values && response.data.values.length > 0;

    if (!hasHeaders) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              "Data Iscrizione",
              "Sport",
              "Nome Squadra",
              "Email Referente",
              "Telefono Referente",
              "Nome Componente",
              "Cognome Componente",
              "Sesso",
              "Data Nascita",
              "Luogo Nascita",
              "Indirizzo",
              "Nome File Certificato",
            ],
          ],
        },
      });
    }
  } catch (error) {
    console.error("Errore durante il controllo delle intestazioni:", error);
    throw new Error("Impossibile accedere al foglio Google Sheets.");
  }
}

export async function appendRegistrationToSheet(
  spreadsheetId: string,
  sportLabel: string,
  payload: RegistrationPayload
) {
  const sheetName = "Foglio1";
  const registrationDate = new Date().toLocaleString("it-IT");

  const rows = payload.members.map((member) => [
    registrationDate,
    sportLabel,
    payload.teamName || "Individuale",
    payload.contactEmail,
    payload.contactPhone,
    member.firstName,
    member.lastName,
    member.gender,
    member.birthDate,
    member.birthPlace,
    member.address,
    member.certificateFileName,
  ]);

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:M`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: rows,
      },
    });
  } catch (error) {
    console.error("Errore durante la scrittura su Sheets:", error);
    throw new Error("Impossibile salvare i dati dell'iscrizione sul foglio di calcolo.");
  }
}