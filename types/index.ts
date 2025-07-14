export interface LovaktivitetCard {
  id: string;
  title: string;
  src: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  content: string;
  metadata?: {
    date?: string;
    location?: string;
  };
} 