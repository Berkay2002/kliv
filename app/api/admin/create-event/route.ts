import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { formatEventDescription } from '@/lib/event-parser'
import { requireAdminAuth } from '@/lib/admin-auth'

interface CreateEventRequest {
  title: string;
  startDate: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  location: string;
  description?: string;
  content: string;
  image?: string;
  ctaText: string;
  ctaLink: string;
}

export async function POST(request: Request) {
  try {
    // Protect this route - require admin authentication
    const authError = await requireAdminAuth()
    if (authError) {
      return authError
    }

    const eventData: CreateEventRequest = await request.json()
    
    // Validate required fields
    if (!eventData.title || !eventData.startDate || !eventData.location || !eventData.content) {
      return NextResponse.json({ 
        error: 'Missing required fields: title, startDate, location, content' 
      }, { status: 400 })
    }

    console.log('🎯 Admin creating event:', eventData.title)

    // Setup Google Calendar API
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !process.env.GOOGLE_CALENDAR_ID) {
      console.error('Missing Google Service Account or Calendar ID environment variables.')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const jwtClient = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    await jwtClient.authorize();
    const calendar = google.calendar({ version: 'v3', auth: jwtClient });

    // Format the description with metadata
    const formattedDescription = formatEventDescription({
      description: eventData.description,
      image: eventData.image,
      ctaText: eventData.ctaText,
      ctaLink: eventData.ctaLink,
      content: eventData.content
    });

    // Prepare event times
    const startDateTime = eventData.startTime 
      ? `${eventData.startDate}T${eventData.startTime}:00`
      : eventData.startDate;
    
    const endDateTime = eventData.endDate && eventData.endTime
      ? `${eventData.endDate}T${eventData.endTime}:00`
      : eventData.endDate
      ? eventData.endDate
      : eventData.startTime
      ? `${eventData.startDate}T${eventData.startTime}:00`
      : eventData.startDate;

    // Create the event object
    const eventObject: any = {
      summary: eventData.title,
      location: eventData.location,
      description: formattedDescription,
      start: eventData.startTime ? {
        dateTime: startDateTime,
        timeZone: 'Europe/Stockholm'
      } : {
        date: startDateTime
      },
      end: eventData.startTime || eventData.endTime ? {
        dateTime: endDateTime,
        timeZone: 'Europe/Stockholm'
      } : {
        date: endDateTime
      }
    };

    console.log('📅 Creating Google Calendar event with data:', {
      summary: eventObject.summary,
      start: eventObject.start,
      end: eventObject.end,
      location: eventObject.location
    });

    // Create event in Google Calendar
    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: eventObject,
    });

    const createdEvent = response.data;
    console.log('✅ Event created successfully:', createdEvent.id);

    return NextResponse.json({
      message: 'Event created successfully',
      eventId: createdEvent.id,
      htmlLink: createdEvent.htmlLink,
      title: eventData.title
    });

  } catch (error) {
    console.error('❌ Error creating event:', error);
    
    // Handle specific Google Calendar API errors
    if (error instanceof Error && 'code' in error && error.code === 403) {
      return NextResponse.json(
        { error: 'Insufficient permissions to create calendar events' },
        { status: 403 }
      );
    }
    
    if (error instanceof Error && 'code' in error && error.code === 400) {
      return NextResponse.json(
        { error: 'Invalid event data provided' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create event', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}