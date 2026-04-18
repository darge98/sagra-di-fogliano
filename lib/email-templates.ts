/**
 * Configurazione email di conferma iscrizione per ogni sport.
 * 
 * Modifica qui le costanti per cambiare l'IBAN, il Satispay o le quote.
 * La logica si occupa di generare il testo corretto per squadre e individuali.
 */

const PAGAMENTO_IBAN = "IT93I0503412805000000000435 (Parrocchia san Colombano)";
const PAGAMENTO_SATISPAY = "<a href=\"https://web.satispay.com/app/open/shops/088e4a6c-5612-48f9-9d69-521499474fef\">Clicca qui per il pagamento</a>";

interface SportConfig {
  sportName: string;
  eventName: string;
  quotaTesto: string;
  causale: string;
  isIndividuale: boolean;
}

const sportConfigs: Record<string, SportConfig> = {
  calcio: {
    sportName: "Calcio a 8",
    eventName: "al Torneo di Calcio a 8",
    quotaTesto: "La quota per squadra è di <strong>150€</strong>",
    causale: "Calcio a 8 - {{teamName}}",
    isIndividuale: false,
  },
  beachvolley: {
    sportName: "Beach Volley",
    eventName: "al Torneo di Beach Volley",
    quotaTesto: "La quota per squadra è di <strong>70€</strong>",
    causale: "Beach Volley - {{teamName}}",
    isIndividuale: false,
  },
  "4fogliano": {
    sportName: "4Fogliano",
    eventName: "al Torneo di Basket 4Fogliano",
    quotaTesto: "La quota per squadra è di <strong>60€</strong>",
    causale: "4Fogliano - {{teamName}}",
    isIndividuale: false,
  },
  lodolata: {
    sportName: "Lodolata",
    eventName: "alla Lodolata",
    quotaTesto: "La quota individuale è di <strong>2€</strong>",
    causale: "Lodolata",
    isIndividuale: true,
  },
};

/**
 * Restituisce il template (oggetto e corpo html) per lo sport richiesto.
 */
export function getEmailTemplate(
  sportId: string,
  replacements: Record<string, string>
): { subject: string; bodyHtml: string } {
  const config = sportConfigs[sportId.toLowerCase()];

  // Fallback se lo sport non esiste in configurazione
  if (!config) {
    let subject = "✅ Iscrizione ricevuta | Sagra di Fogliano";
    let bodyHtml = `<p>Grazie per esserti iscritto a <strong>{{sportLabel}}</strong>!</p><p>A presto,<br>Lo staff della Sagra di Fogliano</p>`;

    for (const [key, value] of Object.entries(replacements)) {
      const placeholder = `{{${key}}}`;
      subject = subject.replaceAll(placeholder, value);
      bodyHtml = bodyHtml.replaceAll(placeholder, value);
    }
    return { subject, bodyHtml };
  }

  // Costruzione dinamica dell'email in base al fatto che sia squadra o individuale
  const { sportName, eventName, quotaTesto, causale, isIndividuale } = config;

  const teamLabel = isIndividuale ? "Atleta" : "Squadra";
  let subject = `✅ Iscrizione ricevuta – ${sportName} | ${teamLabel}: {{teamName}} | Sagra di Fogliano`;

  const verboAssicurare = isIndividuale ? "assicurarti" : "assicurarvi";
  const terminePosto = isIndividuale ? "in gara" : "nel tabellone";
  const termineDettagli = isIndividuale ? "della gara" : "del torneo";

  let bodyHtml = `
      <p>Ciao!</p>
      <p>Grazie mille per esserti iscritto ${eventName} delle Giornate dello Sportivo! Siamo felici di averti con noi.</p>
      <p>Per completare ufficialmente l'iscrizione e ${verboAssicurare} il posto ${terminePosto}, manca solo l'ultimo passaggio: il pagamento della quota di partecipazione.</p>

      <h3>Dettagli del Pagamento</h3>
      <p>${quotaTesto}. Puoi procedere scegliendo il metodo che preferisci tra i seguenti:</p>
      <ul>
        <li><strong>IBAN:</strong> ${PAGAMENTO_IBAN} &nbsp;–&nbsp; Causale: ${causale}</li>
        <li><strong>Satispay:</strong> ${PAGAMENTO_SATISPAY}</li>
      </ul>

      <h3>Cosa fare dopo il pagamento?</h3>
      <p>Una volta effettuata la transazione, ti chiediamo la cortesia di rispondere a questa email allegando la distinta o lo screenshot dell'avvenuto pagamento.</p>
      <p>Non appena riceveremo il riscontro, ti invieremo un'email di conferma definitiva con tutti i dettagli tecnici ${termineDettagli}.</p>
      <p>Per qualsiasi dubbio o necessità, non esitare a scriverci rispondendo a questa mail.</p>
      <p>Grazie e ci vediamo in campo!<br><strong>Lo Staff della GdS</strong></p>
  `;

  // Sostituzione dei placeholder dinamici come {{teamName}}
  for (const [key, value] of Object.entries(replacements)) {
    const placeholder = `{{${key}}}`;
    subject = subject.replaceAll(placeholder, value);
    bodyHtml = bodyHtml.replaceAll(placeholder, value);
  }

  return { subject, bodyHtml };
}
