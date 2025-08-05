import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getPendingEvents } from '@/lib/subscribers'

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

export async function GET() {
  try {
    console.log('🔍 Debug Admin: Checking authentication')
    
    // Check authentication
    const { userId } = await auth()
    console.log('👤 User ID:', userId || 'NOT AUTHENTICATED')
    
    if (!userId) {
      return NextResponse.json({ 
        error: 'Unauthorized', 
        debug: 'No userId from auth()' 
      }, { status: 401 })
    }

    console.log('✅ Authentication successful, fetching pending events')
    
    const pendingEvents = await getPendingEvents()
    console.log(`📊 Found ${pendingEvents.length} pending events`)
    
    // Parse descriptions for cleaner display
    const eventsWithParsedDescriptions = pendingEvents.map(pendingEvent => {
      let parsedDescription = '';
      
      if (pendingEvent.event.description) {
        const parsed = parseDescription(pendingEvent.event.description);
        parsedDescription = parsed.content || pendingEvent.event.description;
      }
      
      console.log(`  📋 Event: ${pendingEvent.event.summary} - ${parsedDescription.substring(0, 50)}...`)
      
      return {
        ...pendingEvent,
        parsedDescription
      };
    });

    console.log(`✅ Returning ${eventsWithParsedDescriptions.length} events to admin`)
    
    return NextResponse.json({
      authenticated: true,
      userId: userId,
      eventCount: eventsWithParsedDescriptions.length,
      events: eventsWithParsedDescriptions
    })
  } catch (error) {
    console.error('❌ Debug Admin Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch pending events', 
        debug: error instanceof Error ? error.message : 'Unknown error',
        authenticated: false 
      },
      { status: 500 }
    )
  }
}