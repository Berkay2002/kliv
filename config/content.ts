/**
 * KLIV IDROTTSFÖRENING - INNEHÅLLSKONFIGURATION
 *
 * Denna fil innehåller ALLT redigerbart innehåll och bilder för webbplatsen.
 * Klienten kan enkelt uppdatera innehåll här utan att navigera genom koden.
 *
 * INSTRUKTIONER FÖR REDIGERING:
 * 1. Hitta sektionen du vill redigera (t.ex. kontakt, team, sidor)
 * 2. Uppdatera texten eller bildsökvägarna
 * 3. Spara filen
 * 4. Kör 'npm run dev' för att se ändringar lokalt
 * 5. Kör 'npm run build' innan deployment
 *
 * VIKTIGA NOTERINGAR:
 * - Behåll text på svenska om inte annat språk specifikt behövs
 * - Bildsökvägar ska börja med / (t.ex. /images/photo.webp)
 * - E-postadresser ska vara giltiga
 * - Telefonnummer ska inkludera landskod
 * - Ändra inte strukturen (nycklarna), bara värdena
 */

// =============================================================================
// WEBBPLATSENS METADATA & SEO
// =============================================================================

export const siteMetadata = {
  title: "Kliv Idrottsförening Botkyrka - Judo & Kampsport",
  description: "Kliv Idrottsförening Botkyrka (org.nr 802509-8842) - En mötesplats för judo, kampsport och gemenskap i Norsborg. Välkommen att träna med oss!",
  keywords: "Kliv Idrottsförening, Kliv IF, Botkyrka, Norsborg, judo, kampsport, idrott, förening, sport, gemenskap, träning, hälsa, evenemang, Svenska Judoförbundet, Riksidrottsförbundet",
  siteName: "Kliv Idrottsförening Botkyrka",
  locale: "sv_SE",
  ogImage: "/transparant-vit.png",
};

// =============================================================================
// ORGANISATIONSINFORMATION
// =============================================================================

export const organizationInfo = {
  name: "Kliv Idrottsförening",
  fullName: "Kliv Idrottsförening Botkyrka",
  organizationNumber: "802509-8842",
  foundedDate: "2017-06-29",
  description: "En idrottsförening som främjar gemenskap, hälsa och fair play för alla åldrar.",
  address: {
    street: "Tomtbergavägen 370A",
    postalCode: "145 71",
    city: "Norsborg",
    country: "Sverige",
    fullAddress: "Tomtbergavägen 370A, 145 71 Norsborg, Sverige",
  },
  contact: {
    email: "kontakt@klivif.se",
    phone: "+46 123 456 789",
  },
  socialMedia: {
    facebook: "https://www.facebook.com/spearif",
    instagram: "https://www.instagram.com/spear_if/",
  },
};

// =============================================================================
// TEAMMEDLEMMAR
// =============================================================================

export const teamMembers = [
  {
    name: "Muhammet Tozak",
    role: "Ordförande",
    email: "muhammet@klivif.se",
    // Lämna bilden tom för att använda automatiskt genererad avatar baserad på namn
    image: "",
  },
  {
    name: "Maria Rafaelius",
    role: "Medlemsansvarig",
    email: "Maria@klivif.se",
    image: "",
  },
  {
    name: "Eldar Ljuca",
    role: "Aktivitetsansvarig",
    email: "Eldar@klivif.se",
    image: "",
  },
  {
    name: "Binel Elias",
    role: "PR-ansvarig",
    email: "Binel@klivif.se",
    image: "",
  },
  {
    name: "Leah Aybar",
    role: "PR-ansvarig",
    email: "Leah@klivif.se",
    image: "",
  },
];

// =============================================================================
// NAVIGATIONSMENY
// =============================================================================

export const navigation = [
  {
    name: "Hem",
    href: "/",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    color: "text-blue-500"
  },
  {
    name: "Judo",
    href: "/judo",
    gradient: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
    color: "text-purple-500"
  },
  {
    name: "Lovaktiviteter",
    href: "/lovaktiviteter",
    gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    color: "text-red-500"
  },
  {
    name: "Kontakta Oss",
    href: "/kontakta-oss",
    gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    color: "text-green-500"
  },
];

// =============================================================================
// HEMSIDANS INNEHÅLL
// =============================================================================

export const homePage = {
  hero: {
    // Bilder för hero-sektionens bildspel
    images: {
      landscape: [
        "/images/sportstruck-06-25-25/Landscape/DSC00446.webp",
        "/images/sportstruck-06-25-25/Landscape/DSC00470.webp",
        "/images/sportstruck-06-25-25/Landscape/DSC00488.webp",
        "/images/sportstruck-06-25-25/Landscape/DSC00490.webp",
        "/images/sportstruck-06-25-25/Landscape/DSC00496.webp",
        "/images/sportstruck-06-25-25/Landscape/DSC00518.webp",
        "/images/sportstruck-06-25-25/Landscape/DSC00523.webp",
        "/images/sportstruck-06-25-25/Landscape/DSC00562.webp",
        "/images/sportstruck-06-25-25/Landscape/DSC00572.webp",
        "/images/sportstruck-06-25-25/Landscape/DSC00585.webp",
        "/images/sportstruck-06-25-25/Landscape/DSC00601.webp",
        "/images/sportstruck-06-25-25/Landscape/DSC00658.webp",
        "/images/sportstruck-06-25-25/Landscape/DSC00669.webp",
        "/images/sportstruck-06-25-25/Landscape/DSC00706.webp",
      ],
      portrait: [
        "/images/sportstruck-06-25-25/Portrait/DSC00450.webp",
        "/images/sportstruck-06-25-25/Portrait/DSC00457.webp",
        "/images/sportstruck-06-25-25/Portrait/DSC00467.webp",
        "/images/sportstruck-06-25-25/Portrait/DSC00468.webp",
        "/images/sportstruck-06-25-25/Portrait/DSC00471.webp",
        "/images/sportstruck-06-25-25/Portrait/DSC00475.webp",
        "/images/sportstruck-06-25-25/Portrait/DSC00479.webp",
        "/images/sportstruck-06-25-25/Portrait/DSC00486.webp",
        "/images/sportstruck-06-25-25/Portrait/DSC00513.webp",
        "/images/sportstruck-06-25-25/Portrait/DSC00548.webp",
        "/images/sportstruck-06-25-25/Portrait/DSC00732.webp",
        "/images/sportstruck-06-25-25/Portrait/DSC00785.webp",
      ],
    },
  },

  whoWeAre: {
    title: "Vilka vi är",
    description: "Vi är en modern idrottsförening som introducerar och uppmuntrar idrottande bland barn och ungdomar i Norra Botkyrka.",
  },

  vision: {
    title: "Vår Vision",
    // Tillgängliga ikoner: "shield", "community", "growth", "team"
    // Du kan lägga till fler funktioner här och de kommer automatiskt att visas
    features: [
      {
        icon: "shield",
        title: "Fair Play",
        description: "Vi tror på rättvist spel och respekt för alla deltagare.",
      },
      {
        icon: "community",
        title: "Gemenskap",
        description: "Vårt mål är att skapa en inkluderande miljö för alla medlemmar.",
      },
      {
        icon: "growth",
        title: "Utveckling",
        description: "Vi stöttar personlig utveckling genom idrott och aktiviteter.",
      },
      {
        icon: "team",
        title: "Lagsport",
        description: "Tillsammans är vi starkare och kan uppnå mer.",
      },
    ],
  },

  mission: {
    title: "Vår Strävan",
    description: "I nuläget väljer många barn och ungdomar att tidigt sluta med idrott på grund av krav som ställs av den traditionella föreningsmodellen. På Kliv Idrottsförening strävar vi efter att erbjuda en mer flexibel och spontan idrottsmiljö - utan krav som träningsnärvaro och matcher varje helg.",
  },

  newsletter: {
    title: "Missa inte våra evenemang",
    description: "Prenumerera på vårt nyhetsbrev för att få de senaste uppdateringarna om kommande lovaktiviteter och evenemang.",
  },

  team: {
    title: "Vårt Team",
    description: "Vi är styrelsen för Kliv Idrottsförening. Om du har några frågor eller funderingar är du välkommen att kontakta oss!",
  },
};

// =============================================================================
// JUDOSIDANS INNEHÅLL
// =============================================================================

export const judoPage = {
  header: {
    title: "Judo",
    description: "Upptäck kraften i judo - en kampsport som bygger styrka, disciplin och självförtroende.",
  },

  trainer: {
    title: "Vår Tränare",
    name: "Raja Fernando",
    description: "Vår tränare är ingen annan än Raja Fernando som tävlat inom judo internationellt och har en livstids erfarenhet av judo. Raja Fernando graderades under 2023 till 6:e dan svartbälte och befinner sig bland de högst graderade personerna i norden!",
    image: "/images/judo/raja.webp",
  },

  schedule: {
    title: "Träningsgrupp och Schema",
    ageGroup: "barn 7-12 år",
    days: "måndagar",
    time: "17:30-19:30",
    location: "Kårsbyhallen",
    description: "Vi erbjuder för tillfället träningar för barn 7-12 år. Träningarna hålls på måndagar 17:30-19:30 i Kårsbyhallen.",
    trialInfo: "Du är välkommen att ta med ditt barn och att testa på judo kostnadsfritt under ett pass - se bara till att kontakta vår medlemsansvariga innan du dyker upp.",
  },

  fees: {
    title: "Träningsavgifter och Betalningsinformation",
    amount: "750kr",
    period: "per termin",
    bankgiro: "5220-6166",
    description: "Träningsavgiften för samtliga barn är 750kr per termin och medlemsavgiften ingår i denna avgift. Träningsavgiften betalas in till föreningens bankgiro (5220-6166) senast 2 månader efter påbörjad termin.",
    paymentNote: "Märk betalningen med för- och efternamn på barnet, samt vilken termin betalningen gäller (exempelvis HT-2024).",
  },

  location: {
    title: "Var vi hittas",
    venue: "Kårsbyhallen",
    description: "Våra lokaler är nyrenoverade och ligger i Kårsbyhallen (Norsborg). Kårsbyhallen ligger på 3-minuters promenadavstånd från Norsborg tunnelbana.",
    parkingInfo: "Du kan även parkera 5-timmar gratis med p-skiva strax utanför hallen.",
    mapTitle: "Karta över Tomtbergavägen 370A, Botkyrka",
  },

  images: {
    gallery: [
      "/images/judo/judo1.webp",
      "/images/judo/judo2.webp",
      "/images/judo/judo3.webp",
      "/images/judo/judo4.webp",
    ],
    mobile: "/images/judo/mobilJudo.webp",
  },
};

// =============================================================================
// LOVAKTIVITETERS SIDINNEHÅLL
// =============================================================================

export const lovaktiviteterPage = {
  header: {
    title: "Lovaktiviteter",
    description: "Vi erbjuder en trygg plats för barn som får prova på ledarledda idrottsaktiviteter helt kostnadsfritt.",
  },

  mainSection: {
    title: "Våra lovaktiviteter hjälper barn att komma igång med idrott",
    description: "Under loven erbjuder vi en trygg plats för hundratals barn som får prova på ledarledda idrottsaktiviteter helt kostnadsfritt. Genom att samarbeta med lokala föreningar hjälper vi barn att hitta in i idrottens värld!",
  },

  safeAndFree: {
    title: "Trygga och kostnadsfria lovaktiviteter",
    description: "Våra kostnadsfria lovverksamheter fungerar som en trygg plats för barn i området under skolloven. Alla aktiviteter är kravlösa, bemannade av utbildade ledare och helt gratis.",
  },

  upcomingActivities: {
    title: "Kommande aktiviteter",
    description: "Här hittar du alla våra kommande lovaktiviteter och evenemang. Vi uppdaterar löpande med nya spännande möjligheter!",
    noEventsMessage: "Inga planerade lovaktiviteter för tillfället. Håll utkik här och på våra sociala medier för kommande evenemang!",
  },

  newsletter: {
    title: "Missa inte våra evenemang",
    description: "Prenumerera på vårt nyhetsbrev för att få de senaste uppdateringarna om kommande lovaktiviteter och evenemang.",
  },

  images: {
    landscape: [
      "/images/sportstruck-06-25-25/Landscape/DSC00470.webp",
      "/images/sportstruck-06-25-25/Landscape/DSC00488.webp",
      "/images/sportstruck-06-25-25/Landscape/DSC00518.webp",
      "/images/sportstruck-06-25-25/Landscape/DSC00562.webp",
      "/images/sportstruck-06-25-25/Landscape/DSC00585.webp",
      "/images/sportstruck-06-25-25/Landscape/DSC00669.webp",
      "/images/sportstruck-06-25-25/Landscape/DSC00706.webp",
    ],
    portrait: [
      "/images/sportstruck-06-25-25/Portrait/DSC00475.webp",
      "/images/sportstruck-06-25-25/Portrait/DSC00479.webp",
      "/images/sportstruck-06-25-25/Portrait/DSC00486.webp",
      "/images/sportstruck-06-25-25/Portrait/DSC00513.webp",
      "/images/sportstruck-06-25-25/Portrait/DSC00548.webp",
    ],
  },
};

// =============================================================================
// KONTAKTSIDANS INNEHÅLL
// =============================================================================

export const contactPage = {
  header: {
    title: "Kontakta Oss",
    description: "Har du frågor eller vill komma i kontakt med oss? Fyll i formuläret så hör vi av oss.",
  },

  contactInfo: {
    title: "Kontaktinformation",
  },

  responseTime: {
    title: "Vi svarar snabbt",
    description: "Vi strävar efter att svara på alla förfrågningar inom 2-3 arbetsdagar. För brådskande ärenden, ring oss direkt på {phone}.",
  },

  map: {
    label: "Hitta till oss",
  },
};

// =============================================================================
// KONTAKTFORMULÄR
// =============================================================================

export const contactForm = {
  fields: {
    name: {
      label: "Namn *",
      placeholder: "Ditt fullständiga namn",
      required: "Namn är obligatoriskt",
    },
    email: {
      label: "E-post *",
      placeholder: "din@email.com",
      required: "E-post är obligatorisk",
      invalid: "Ogiltig e-postadress",
    },
    phone: {
      label: "Telefon",
      placeholder: "+46 123 456 789",
    },
    subject: {
      label: "Ämne *",
      required: "Ämne är obligatoriskt",
      options: [
        { value: "general", label: "Allmän förfrågan" },
        { value: "membership", label: "Medlemskap" },
        { value: "activities", label: "Lovaktiviteter" },
        { value: "sportstruck", label: "Sportstruck & Sportoteket" },
        { value: "collaboration", label: "Samarbete" },
        { value: "volunteer", label: "Volontärarbete" },
        { value: "other", label: "Annat" },
      ],
    },
    message: {
      label: "Meddelande *",
      placeholder: "Berätta om din förfrågan eller hur vi kan hjälpa dig...",
      required: "Meddelande är obligatoriskt",
    },
  },

  buttons: {
    submit: "Skicka meddelande",
    submitting: "Skickar...",
  },

  messages: {
    success: "Meddelandet har skickats!",
    error: "Något gick fel. Försök igen.",
  },
};

// =============================================================================
// PRENUMERATIONSFORMULÄR
// =============================================================================

export const subscriptionForm = {
  heading: "Prenumerera på evenemang",
  description: "Få de senaste uppdateringarna om kommande lovaktiviteter och evenemang direkt i din inkorg.",
  placeholder: "Din e-postadress",
  button: "Prenumerera",
  buttonLoading: "Prenumererar...",
};

// =============================================================================
// SIDFOTENS INNEHÅLL
// =============================================================================

export const footer = {
  copyright: "© 2025 Kliv Idrottsförening. Alla rättigheter förbehållna.",
  links: {
    privacy: {
      label: "Integritetspolicy",
      href: "/integritetspolicy",
    },
    terms: {
      label: "Allmänna villkor",
      href: "/villkor",
    },
  },
};

// =============================================================================
// JURIDISKA SIDOR
// =============================================================================

export const legalPages = {
  privacy: {
    title: "Integritetspolicy",
  },
  terms: {
    title: "Allmänna villkor",
  },
};

// =============================================================================
// LOGOTYPER
// =============================================================================

export const logos = {
  white: "/logo/transparant-vit.svg",
  whiteWithText: "/logo/transparant-text-vit.svg",
  black: "/logo/transparant-svart.svg",
};

// =============================================================================
// HJÄLPFUNKTIONER
// =============================================================================

/**
 * Generera en enkel hash från en sträng
 * Används för att skapa deterministiska färger från namn
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Färgpalett för avatarer - visuellt tilltalande färger som fungerar bra med vit text
 * Färgerna är valda för att ha god kontrast och vara lätta att skilja åt
 */
const avatarColors = [
  '3b82f6', // Blue
  'ef4444', // Red
  '10b981', // Green
  'f59e0b', // Amber
  '8b5cf6', // Purple
  'ec4899', // Pink
  '06b6d4', // Cyan
  'f97316', // Orange
  '84cc16', // Lime
  '6366f1', // Indigo
];

/**
 * Hämta teammedlemmens avatar-URL
 * Om en anpassad bild finns, använd den. Annars, generera avatar från namn.
 * Använder deterministisk färgval baserad på namnet för konsistenta resultat.
 */
export function getTeamMemberAvatar(member: typeof teamMembers[0]): string {
  if (member.image) {
    return member.image;
  }
  // Generera deterministisk färg från namn
  const hash = simpleHash(member.name);
  const colorIndex = hash % avatarColors.length;
  const backgroundColor = avatarColors[colorIndex];

  // Generera avatar från namn med hjälp av ui-avatars.com med konsistent färg
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=${backgroundColor}&color=fff`;
}

/**
 * Hämta formaterat kontakttelefonnummer med mellanslag
 */
export function getFormattedPhone(): string {
  return organizationInfo.contact.phone;
}

/**
 * Hämta fullständig organisationsadress
 */
export function getFullAddress(): string {
  return organizationInfo.address.fullAddress;
}
