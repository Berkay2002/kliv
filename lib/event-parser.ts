// Centralized event parsing logic for both admin dashboard and email notifications

export interface ParsedEventData {
  src: string;
  ctaText: string;
  ctaLink: string;
  content: string;
  rawDescription: string;
  isStructured: boolean;
}

export function parseEventDescription(description: string): ParsedEventData {
  if (!description) {
    return {
      src: '',
      ctaText: '',
      ctaLink: '',
      content: '',
      rawDescription: '',
      isStructured: false
    };
  }

  // Check if this looks like structured metadata
  const hasStructuredData = description.includes('image:') && description.includes('content:');
  
  if (hasStructuredData) {
    // Handle structured format
    return parseStructuredDescription(description);
  } else {
    // Handle plain text format
    return parsePlainDescription(description);
  }
}

function parseStructuredDescription(description: string): ParsedEventData {
  // Handle both newline-separated and continuous text
  let text = description;
  
  // If there are no newlines but we see field patterns, try to add breaks
  if (!text.includes('\n') && text.includes('image:') && text.includes('content:')) {
    // Add newlines before known field names
    text = text
      .replace(/description:/g, '\ndescription:')
      .replace(/image:/g, '\nimage:')
      .replace(/ctaText:/g, '\nctaText:')
      .replace(/ctaLink:/g, '\nctaLink:')
      .replace(/content:/g, '\ncontent:')
      .trim();
  }
  
  const lines = text.split('\n');
  const parsed: Record<string, string> = {};

  lines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      parsed[key.trim()] = value;
    }
  });

  return {
    src: parsed.image || '',
    ctaText: parsed.ctaText || 'Läs mer',
    ctaLink: parsed.ctaLink || '',
    content: parsed.content || parsed.description || description,
    rawDescription: description,
    isStructured: true
  };
}

function parsePlainDescription(description: string): ParsedEventData {
  // For plain text, use the entire description as content
  // Apply some smart defaults
  return {
    src: '', // No image in plain text
    ctaText: 'Läs mer', // Default CTA text
    ctaLink: '/lovaktiviteter', // Default CTA link
    content: description.trim(),
    rawDescription: description,
    isStructured: false
  };
}

// Helper function to format data back to structured format for Google Calendar
export function formatEventDescription(data: {
  description?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  content: string;
}): string {
  const parts = [];
  
  if (data.description) {
    parts.push(`description: ${data.description}`);
  }
  
  if (data.image) {
    parts.push(`image: ${data.image}`);
  }
  
  if (data.ctaText) {
    parts.push(`ctaText: ${data.ctaText}`);
  }
  
  if (data.ctaLink) {
    parts.push(`ctaLink: ${data.ctaLink}`);
  }
  
  parts.push(`content: ${data.content}`);
  
  return parts.join('\n');
}

// Predefined CTA options for the admin form
export const CTA_OPTIONS = [
  { value: '/lovaktiviteter', label: 'Lovaktiviteter' },
  { value: '/lovaktiviteter/hostlovskul', label: 'Höstlovskul' },
  { value: '/lovaktiviteter/vinterlovskul', label: 'Vinterlovskul' },
  { value: '/lovaktiviteter/pasklovskul', label: 'Påsklovskul' },
  { value: '/lovaktiviteter/sommarlovskul', label: 'Sommarlovskul' },
  { value: '/judo', label: 'Judo' },
  { value: '/kontakta-oss', label: 'Kontakta oss' },
  { value: 'custom', label: 'Anpassad länk...' }
];

export const DEFAULT_CTA_TEXT_OPTIONS = [
  'Läs mer',
  'Anmäl dig',
  'Delta',
  'Kom och träna',
  'Mer information',
  'Boka plats'
];