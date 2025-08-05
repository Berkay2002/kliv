import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getPendingEvents } from '@/lib/subscribers'
import { parseEventDescription } from '@/lib/event-parser'
import { requireAdminAuth } from '@/lib/admin-auth'

export async function GET() {
  try {
    // Protect this route - require admin authentication
    const authError = await requireAdminAuth()
    if (authError) {
      return authError
    }

    console.log('📋 Admin requesting pending events')
    
    const pendingEvents = await getPendingEvents()
    
    // Parse descriptions for cleaner display
    const eventsWithParsedDescriptions = pendingEvents.map(pendingEvent => {
      const parsed = parseEventDescription(pendingEvent.event.description || '');
      
      return {
        ...pendingEvent,
        parsedDescription: parsed.content,
        isStructured: parsed.isStructured,
        ctaText: parsed.ctaText,
        ctaLink: parsed.ctaLink,
        imageSrc: parsed.src
      };
    });

    console.log(`📊 Returning ${eventsWithParsedDescriptions.length} pending events to admin`)
    
    return NextResponse.json(eventsWithParsedDescriptions)
  } catch (error) {
    console.error('❌ Error fetching pending events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pending events' },
      { status: 500 }
    )
  }
}