import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Carica esplicitamente il file .env.local
dotenv.config({ path: ".env" });

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
const PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID!;

// Sheet names (must match exactly the tabs in your Google Sheet)
const SHEET_SAGRA = "Sagra";
const SHEET_SAGRA_EVENTI = "SagraEventi";
const SHEET_MENU = "Menu";
const SHEET_SPORT = "Sport";
const SHEET_SPORT_DETTAGLI = "SportDettagli";
const SHEET_STORIA = "Storia";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function getSheetRows(
    sheets: ReturnType<typeof google.sheets>,
    sheetName: string
): Promise<Record<string, string>[]> {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A:Z`,
    });

    const rows = res.data.values;
    if (!rows || rows.length < 2) return [];

    const headers = rows[0].map((h: string) => h.trim());
    return rows.slice(1).map((row) => {
        const obj: Record<string, string> = {};
        headers.forEach((header: string, i: number) => {
            obj[header] = (row[i] ?? "").trim();
        });
        return obj;
    });
}

/** Fetch optional sheet - returns [] if sheet doesn't exist or fails */
async function getSheetRowsSafe(
    sheets: ReturnType<typeof google.sheets>,
    sheetName: string
): Promise<Record<string, string>[]> {
    try {
        return await getSheetRows(sheets, sheetName);
    } catch {
        return [];
    }
}

function toBool(value: string | undefined): boolean {
    if (!value) return false;
    const v = value.toLowerCase().trim();
    return v === "true" || v === "sì" || v === "si" || v === "yes" || v === "1" || v === "x";
}

// ---------------------------------------------------------------------------
// Build sagra-cards.json
// ---------------------------------------------------------------------------

function buildSagraCards(
    sagraRows: Record<string, string>[],
    eventiRows: Record<string, string>[],
    menuRows: Record<string, string>[]
) {
    return sagraRows.map((day) => {
        // Events for this day
        const events = eventiRows
            .filter((e) => e.dayId === day.id)
            .map((e) => {
                const event: Record<string, unknown> = {
                    time: e.time,
                    title: e.title,
                    icon: e.icon || "Music",
                };
                if (e.description) event.description = e.description;
                if (toBool(e.highlight)) event.highlight = true;
                return event;
            });

        // Menu for this day, grouped by category
        const menuForDay = menuRows.filter((m) => m.dayId === day.id);
        const categories = [...new Set(menuForDay.map((m) => m.category))];
        const menu = categories.map((cat) => ({
            category: cat,
            items: menuForDay
                .filter((m) => m.category === cat)
                .map((m) => {
                    const item: Record<string, unknown> = {
                        name: m.name,
                        price: m.price,
                    };
                    if (toBool(m.vegan)) item.vegan = true;
                    if (toBool(m.glutenFree)) item.glutenFree = true;
                    if (toBool(m.spicy)) item.spicy = true;
                    return item;
                }),
        }));

        return {
            id: day.id,
            dayShort: day.dayShort,
            dayNumber: day.dayNumber,
            dayName: day.dayName,
            date: day.date,
            tagline: day.tagline,
            events,
            ...(menu.length > 0 ? { menu } : {}),
        };
    });
}

// ---------------------------------------------------------------------------
// Build sports-cards.json
// ---------------------------------------------------------------------------

function buildSportsCards(
    sportRows: Record<string, string>[],
    dettagliRows: Record<string, string>[]
) {
    return sportRows.map((sport) => {
        const details = dettagliRows
            .filter((d) => d.sportId === sport.id)
            .map((d) => ({
                label: d.label,
                value: d.value,
            }));

        return {
            id: sport.id,
            title: sport.title,
            icon: sport.icon || "Trophy",
            date: sport.date,
            time: sport.time,
            description: sport.description,
            prize: sport.prize,
            ...(details.length > 0 ? { details } : {}),
        };
    });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
    console.log("📋 Fetching data from Google Sheets...");

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: SERVICE_ACCOUNT_EMAIL,
            private_key: PRIVATE_KEY,
        },
        scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Fetch all sheets in parallel
    const [sagraRows, eventiRows, menuRows, sportRows, dettagliRows, storiaRows] =
        await Promise.all([
            getSheetRows(sheets, SHEET_SAGRA),
            getSheetRows(sheets, SHEET_SAGRA_EVENTI),
            getSheetRows(sheets, SHEET_MENU),
            getSheetRows(sheets, SHEET_SPORT),
            getSheetRows(sheets, SHEET_SPORT_DETTAGLI),
            getSheetRowsSafe(sheets, SHEET_STORIA),
        ]);

    console.log(
        `  ✅ Sagra: ${sagraRows.length} giorni, ${eventiRows.length} eventi, ${menuRows.length} piatti`
    );
    console.log(
        `  ✅ Sport: ${sportRows.length} sport, ${dettagliRows.length} dettagli`
    );
    if (storiaRows.length > 0) {
        console.log(`  ✅ Storia: ${storiaRows.length} riga/e`);
    }

    // Build JSON
    const sagraCards = buildSagraCards(sagraRows, eventiRows, menuRows);
    const sportsCards = buildSportsCards(sportRows, dettagliRows);

    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Build storia.json from first row (columns: titolo, contenuto)
    const storiaPath = path.join(dataDir, "storia.json");
    const defaultStoria = {
        titolo: "La nostra storia",
        contenuto:
            "La Sagra di Fogliano nasce dalla passione e dalla tradizione della nostra comunità.",
        fotoVolontari: "/images/volontari.jpg",
    };
    let storiaData = defaultStoria;
    if (storiaRows.length > 0) {
        const first = storiaRows[0];
        const titolo = (first.titolo ?? first.Titolo ?? "").trim();
        const contenuto = (first.contenuto ?? first.Contenuto ?? "").trim();
        const fotoVolontari = (first.fotoVolontari ?? first.foto ?? "").trim();
        if (titolo || contenuto || fotoVolontari) {
            storiaData = {
                titolo: titolo || defaultStoria.titolo,
                contenuto: contenuto || defaultStoria.contenuto,
                fotoVolontari: fotoVolontari || defaultStoria.fotoVolontari,
            };
        }
    }

    // Write to data/
    fs.writeFileSync(storiaPath, JSON.stringify(storiaData, null, 4), "utf-8");
    console.log("📁 Written data/storia.json");

    fs.writeFileSync(
        path.join(dataDir, "sagra-cards.json"),
        JSON.stringify(sagraCards, null, 4),
        "utf-8"
    );
    fs.writeFileSync(
        path.join(dataDir, "sports-cards.json"),
        JSON.stringify(sportsCards, null, 4),
        "utf-8"
    );

    console.log("📁 Written sagra-cards.json, sports-cards.json");
    console.log("✨ Done!");
}

main().catch((err) => {
    console.error("❌ Error fetching Google Sheets data:", err);
    process.exit(1);
});
