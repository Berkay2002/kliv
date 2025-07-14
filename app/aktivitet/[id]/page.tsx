import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { LovaktivitetCard } from '@/types';

async function getEvent(id: string): Promise<LovaktivitetCard | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/events`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    
    const events: LovaktivitetCard[] = await response.json();
    return events.find(event => event.id === id) || null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

export default async function AktivitetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={event.src}
          alt={event.title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="max-w-4xl">
              <Link
                href="/lovaktiviteter"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Tillbaka till lovaktiviteter
              </Link>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {event.title}
              </h1>
              
              {/* Metadata */}
              {event.metadata && (
                <div className="flex flex-wrap gap-6 text-white/90">
                  {event.metadata.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-kliv-red" />
                      <span className="font-medium">{event.metadata.date}</span>
                    </div>
                  )}
                  {event.metadata.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-kliv-red" />
                      <span className="font-medium">{event.metadata.location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {event.content}
                </p>
              </div>
              
              {/* CTA Button */}
              {event.ctaText && event.ctaLink && (
                <div className="mt-8">
                  <a
                    href={event.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-kliv-red hover:bg-kliv-red-dark text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    {event.ctaText}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-muted/50 rounded-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold mb-4">Aktivitetsinfo</h3>
                
                {event.metadata && (
                  <div className="space-y-4">
                    {event.metadata.date && (
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-kliv-red mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Datum</p>
                          <p className="font-medium">{event.metadata.date}</p>
                        </div>
                      </div>
                    )}
                    
                    {event.metadata.location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-kliv-red mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Plats</p>
                          <p className="font-medium">{event.metadata.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Google Maps */}
          {event.metadata?.location && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-kliv-red" />
                Plats
              </h3>
              <div className="rounded-lg overflow-hidden border border-border shadow-lg">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY}&q=${encodeURIComponent(event.metadata.location)}`}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEvent(id);
  
  if (!event) {
    return {
      title: 'Aktivitet hittades inte',
      description: 'Den begärda aktiviteten kunde inte hittas.',
    };
  }
  
  return {
    title: `${event.title} - Kliv Idrottsförening`,
    description: event.content || event.description,
    openGraph: {
      title: event.title,
      description: event.content || event.description,
      images: [
        {
          url: event.src,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
  };
}