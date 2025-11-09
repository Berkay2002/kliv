# Så här ändrar du webbplatsens innehåll

**För: Kliv Idrottsförening**

---

## Översikt

Allt innehåll på webbplatsen (text och bilder) finns i **EN ENDA FIL**:

```
📁 config/content.ts
```

Den här filen innehåller ALLT redigerbart innehåll:
- Organisationsinformation (adress, telefon, e-post)
- Teammedlemmar (namn, roller, e-post, bilder)
- Sidtexter (hem, judo, lovaktiviteter, kontakt)
- Menyer
- Formulär
- Sociala medier-länkar

---

## Hur du ändrar innehåll

### Steg 1: Öppna innehållsfilen

Navigera till och öppna:
```
config/content.ts
```

### Steg 2: Hitta rätt avsnitt

Filen är uppdelad i tydligt märkta avsnitt:

```typescript
// =============================================================================
// ORGANISATION INFORMATION
// =============================================================================

// =============================================================================
// TEAMMEDLEMMAR
// =============================================================================

// =============================================================================
// STARTSIDANS INNEHÅLL
// =============================================================================

// osv...
```

### Steg 3: Ändra texten

Ändra bara texten mellan citattecken `"..."`. Till exempel:

**Före:**
```typescript
export const organizationInfo = {
  contact: {
    email: "kontakt@klivif.se",
    phone: "+46 123 456 789",
  },
};
```

**Efter:**
```typescript
export const organizationInfo = {
  contact: {
    email: "nykontakt@klivif.se",
    phone: "+46 987 654 321",
  },
};
```

### Steg 4: Spara och testa

1. Spara filen (`Ctrl+S` eller `Cmd+S`)
2. Kör `npm run dev` för att se ändringar lokalt
3. Kör `npm run build` innan publicering

---

## Vanliga ändringar

### 1. Uppdatera kontaktinformation

**Plats:** `organizationInfo` avsnitt

```typescript
export const organizationInfo = {
  contact: {
    email: "DIN_EMAIL_HÄR",        // Ändra e-post
    phone: "DITT_TELEFONNUMMER",   // Ändra telefon
  },
  address: {
    street: "DIN_GATA_HÄR",        // Ändra adress
    city: "DIN_STAD",
    postalCode: "DITT_POSTNUMMER",
  },
};
```

### 2. Uppdatera sociala medier

**Plats:** `organizationInfo.socialMedia` avsnitt

```typescript
socialMedia: {
  facebook: "https://www.facebook.com/DIN_SIDA",
  instagram: "https://www.instagram.com/DIN_PROFIL/",
},
```

### 3. Uppdatera teammedlemmar

**Plats:** `teamMembers` avsnitt

**Ändra en befintlig medlem:**
```typescript
{
  name: "Anna Andersson",         // Ändra namn
  role: "Ordförande",             // Ändra roll
  email: "anna@klivif.se",        // Ändra e-post
  image: "",                      // Lämna tom för auto-genererad avatar
},
```

**Lägga till ett profilfoto:**
1. Ladda upp foto till `/public/images/team/`
2. Uppdatera image-fältet:
```typescript
image: "/images/team/anna-andersson.jpg",
```

**Lägga till ny medlem:**
```typescript
export const teamMembers = [
  { name: "Person 1", role: "Roll", email: "email@klivif.se", image: "" },
  { name: "Person 2", role: "Roll", email: "email@klivif.se", image: "" },
  // Lägg till ny medlem här:
  { name: "Ny Person", role: "Ny Roll", email: "ny@klivif.se", image: "" },
];
```

**Ta bort en medlem:**
Radera hela objektet (delen mellan `{` och `},`)

### 4. Uppdatera startsidans text

**Plats:** `homePage` avsnitt

Exempel - Ändra "Vilka vi är":
```typescript
whoWeAre: {
  title: "Vilka vi är",
  description: "DIN NYA BESKRIVNING HÄR",
},
```

### 5. Uppdatera Judo-sidan

**Plats:** `judoPage` avsnitt

```typescript
export const judoPage = {
  schedule: {
    ageGroup: "barn 7-12 år",         // Ändra åldersgrupp
    days: "måndagar",                 // Ändra träningsdagar
    time: "17:30-19:30",              // Ändra tid
    location: "Kårsbyhallen",         // Ändra plats
  },

  fees: {
    amount: "750kr",                  // Ändra avgift
    period: "per termin",             // Ändra period
    bankgiro: "5220-6166",            // Ändra bankgiro
  },
};
```

### 6. Ändra bilder

**För galleribilder, hero-bilder, etc:**

**Plats:** Olika sidavsnitt (t.ex. `homePage.hero.images`)

```typescript
hero: {
  images: {
    landscape: [
      "/images/NY_BILD_1.webp",       // Ändra bildsökväg
      "/images/NY_BILD_2.webp",       // Ändra bildsökväg
      // Lägg till eller ta bort bilder från listan
    ],
  },
},
```

**Lägga till ny bild:**
1. Ladda upp bild till `/public/images/` mapp
2. Lägg till sökvägen:
   ```typescript
   "/images/din-nya-bild.webp",
   ```

**Ta bort en bild:**
Radera raden med bildsökvägen

---

## Viktiga regler

### ✅ GÖR:
- Ändra text mellan citattecken `"så här"`
- Uppdatera e-postadresser, telefonnummer, adresser
- Lägg till eller ta bort teammedlemmar
- Ändra bildsökvägar
- Redigera beskrivningar och titlar
- Spara ändringarna innan du testar

### ❌ GÖR INTE:
- Ändra **strukturen** (delen före kolon `:`)
- Ta bort kommatecken `,` i slutet av rader (utom sista)
- Radera hela avsnitt utan att veta vad du gör
- Ändra filkodning (behåll UTF-8)
- Glöm att testa efter ändringar

### Exempel:

**RÄTT:**
```typescript
title: "Ny titel",  // ✅ Endast texten ändrad
```

**FEL:**
```typescript
minTitel: "Ny titel",  // ❌ Ändrade nyckeln (strukturen)
```

**FEL:**
```typescript
title: "Ny titel"   // ❌ Saknar komma i slutet
email: "test@test.com",
```

---

## Testa dina ändringar

### Lokal testning (Rekommenderat)

1. Öppna terminal i projektmappen
2. Kör: `npm run dev`
3. Öppna webbläsare på `http://localhost:3000`
4. Kontrollera att ändringarna syns
5. Testa alla sidor där du gjorde ändringar

### Innan publicering

1. Stoppa utvecklingsservern (Ctrl+C)
2. Kör: `npm run build`
3. Om bygget lyckas är du redo att publicera
4. Om bygget misslyckas, kolla efter syntaxfel i `config/content.ts`

---

## Snabbreferens: Var hittar jag vad?

| Vad ska ändras | Avsnitt | Ungefärlig rad |
|----------------|---------|----------------|
| Kontaktinfo (e-post, telefon) | `organizationInfo` | Rad ~20 |
| Teammedlemmar | `teamMembers` | Rad ~50 |
| Menyer | `navigation` | Rad ~90 |
| Startsidans text | `homePage` | Rad ~100 |
| Judo-sidans text | `judoPage` | Rad ~200 |
| Lovaktiviteter | `lovaktiviteterPage` | Rad ~280 |
| Kontaktsidan | `contactPage` | Rad ~330 |
| Kontaktformulär | `contactForm` | Rad ~350 |
| Sociala medier | `organizationInfo.socialMedia` | Rad ~40 |
| Sidfot | `footer` | Rad ~400 |

---

## Felsökning

### Problem: Ändringarna syns inte
**Lösning:**
- Kontrollera att du sparade filen
- Starta om dev-servern (`Ctrl+C`, sedan `npm run dev`)
- Rensa webbläsarcache (Ctrl+Shift+R eller Cmd+Shift+R)

### Problem: Webbplatsen bygger inte
**Lösning:**
- Kolla efter syntaxfel i `config/content.ts`
- Se till att alla citattecken är stängda
- Se till att alla kommatecken är på plats
- Återställ från backup om nödvändigt

### Problem: Bilden syns inte
**Lösning:**
- Kolla att bildsökvägen börjar med `/` (t.ex. `/images/foto.jpg`)
- Se till att bilden finns i `public/images/` mappen
- Kontrollera att filnamnet stämmer exakt (versalkänsligt)

---

## Snabbstartschecklista

- [ ] Öppna `config/content.ts`
- [ ] Hitta avsnittet du vill ändra
- [ ] Ändra texten mellan citattecken `"..."`
- [ ] Spara filen
- [ ] Kör `npm run dev` för att testa
- [ ] Kör `npm run build` innan publicering
- [ ] Publicera ändringarna

---

**Senast uppdaterad:** 2025-01-09
**Version:** 1.0
**För:** Kliv Idrottsförening

För teknisk support, kontakta er webbutvecklare.
