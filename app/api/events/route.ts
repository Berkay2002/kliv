import { NextResponse } from 'next/server';
import { google } from 'googleapis';

interface LovaktivitetCard {
  id: string;
  title: string;
  src: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  content: string;
  metadata: {
    date: string;
    location: string;
  };
}

function parseDescription(description: string): {
  src: string;
  ctaText: string;
  ctaLink: string;
  content: string;
} {
  const lines = description.split('\n');
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
    ctaText: parsed.ctaText || '',
    ctaLink: parsed.ctaLink || '',
    content: parsed.content || '',
  };
}

function formatDate(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startFormatted = start.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const endFormatted = end.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  if (startFormatted === endFormatted) {
    return startFormatted;
  }
  
  return `${startFormatted} - ${endFormatted}`;
}

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    console.log('API Key exists:', !!apiKey);
    console.log('Calendar ID exists:', !!calendarId);

    if (!apiKey || !calendarId) {
      console.error('Missing credentials - API Key:', !!apiKey, 'Calendar ID:', !!calendarId);
      return NextResponse.json(
        { error: 'Missing Google Calendar credentials' },
        { status: 500 }
      );
    }

    const calendar = google.calendar({ version: 'v3', auth: apiKey });
    
    const now = new Date();
    const timeMin = now.toISOString();

    console.log('Fetching events from Google Calendar...');
    
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: timeMin,
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 50,
    });

    const events = response.data.items || [];
    console.log(`Fetched ${events.length} events from Google Calendar`);
    
    const lovaktiviteter: LovaktivitetCard[] = events.map(event => {
      const parsed = parseDescription(event.description || '');
      
      return {
        id: event.id || '',
        title: event.summary || '',
        src: parsed.src,
        description: parsed.content,
        ctaText: parsed.ctaText,
        ctaLink: parsed.ctaLink,
        content: parsed.content,
        metadata: {
          date: formatDate(
            event.start?.dateTime || event.start?.date || '',
            event.end?.dateTime || event.end?.date || ''
          ),
          location: event.location || '',
        },
      };
    });

    return NextResponse.json(lovaktiviteter, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch events', details: errorMessage },
      { status: 500 }
    );
  }
} 