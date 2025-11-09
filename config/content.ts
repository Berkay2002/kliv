/**
 * KLIV IDROTTSFÖRENING - CONTENT CONFIGURATION
 *
 * This file contains ALL editable text and images for the website.
 * The client can easily update content here without navigating through the codebase.
 *
 * INSTRUCTIONS FOR EDITING:
 * 1. Find the section you want to edit (e.g., contact, team, pages)
 * 2. Update the text or image paths
 * 3. Save the file
 * 4. Run 'npm run dev' to see changes locally
 * 5. Run 'npm run build' before deploying
 *
 * IMPORTANT NOTES:
 * - Keep text in Swedish unless specifically needed in another language
 * - Image paths should start with / (e.g., /images/photo.webp)
 * - Email addresses should be valid
 * - Phone numbers should include country code
 * - Don't change the structure (keys), only the values
 */

// =============================================================================
// SITE METADATA & SEO
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
// ORGANIZATION INFORMATION
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
// TEAM MEMBERS
// =============================================================================

export const teamMembers = [
  {
    name: "Muhammet Tozak",
    role: "Ordförande",
    email: "muhammet@klivif.se",
    // Leave image empty to use auto-generated avatar based on name
    image: "",
  },
  {
    name: "Maria Rafaelius",
    role: "Medlemsansvarig",
    email: "Maria@kliv.se",
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
// NAVIGATION MENU
// =============================================================================

export const navigation = [
  { name: "Hem", href: "/" },
  { name: "Judo", href: "/judo" },
  { name: "Lovaktiviteter", href: "/lovaktiviteter" },
  { name: "Kontakta Oss", href: "/kontakta-oss" },
];

// =============================================================================
// HOME PAGE CONTENT
// =============================================================================

export const homePage = {
  hero: {
    // Images for the hero section slider
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
    features: [
      {
        title: "Fair Play",
        description: "Vi tror på rättvist spel och respekt för alla deltagare.",
      },
      {
        title: "Gemenskap",
        description: "Vårt mål är att skapa en inkluderande miljö för alla medlemmar.",
      },
      {
        title: "Utveckling",
        description: "Vi stöttar personlig utveckling genom idrott och aktiviteter.",
      },
      {
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
// JUDO PAGE CONTENT
// =============================================================================

export const judoPage = {
  header: {
    title: "Judo",
    description: "Upptack kraften i judo - en kampsport som bygger styrka, disciplin och sjalvfortroende.",
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
    mapTitle: "Karta over Tomtbergavagen 370A, Botkyrka",
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
// LOVAKTIVITETER PAGE CONTENT
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
// CONTACT PAGE CONTENT
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
// CONTACT FORM
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
// SUBSCRIPTION FORM
// =============================================================================

export const subscriptionForm = {
  heading: "Prenumerera på evenemang",
  description: "Få de senaste uppdateringarna om kommande lovaktiviteter och evenemang direkt i din inkorg.",
  placeholder: "Din e-postadress",
  button: "Prenumerera",
  buttonLoading: "Prenumererar...",
};

// =============================================================================
// FOOTER CONTENT
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
// LEGAL PAGES
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
// LOGOS
// =============================================================================

export const logos = {
  white: "/logo/transparant-vit.svg",
  whiteWithText: "/logo/transparant-text-vit.svg",
  black: "/logo/transparant-svart.svg",
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get team member avatar URL
 * If custom image is provided, use it. Otherwise, generate avatar from name.
 */
export function getTeamMemberAvatar(member: typeof teamMembers[0]): string {
  if (member.image) {
    return member.image;
  }
  // Generate avatar from name using ui-avatars.com
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=random`;
}

/**
 * Get formatted contact phone with spaces
 */
export function getFormattedPhone(): string {
  return organizationInfo.contact.phone;
}

/**
 * Get full organization address
 */
export function getFullAddress(): string {
  return organizationInfo.address.fullAddress;
}
