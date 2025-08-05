import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/admin-auth'
import { getPendingEvents, deletePendingEvent, storePendingEvent } from '@/lib/subscribers'
import { google } from 'googleapis'
import { formatEventDescription } from '@/lib/event-parser'

interface EditEventRequest {
  eventId: string;
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

export async function PUT(request: Request) {
  try {
    // Protect this route - require admin authentication
    const authError = await requireAdminAuth()
    if (authError) {
      return authError
    }

    const eventData: EditEventRequest = await request.json()
    
    // Validate required fields
    if (!eventData.eventId || !eventData.title || !eventData.startDate || !eventData.location || !eventData.content) {
      return NextResponse.json({ 
        error: 'Missing required fields: eventId, title, startDate, location, content' 
      }, { status: 400 })
    }

    console.log('✏️ Admin editing pending event:', eventData.eventId)

    // Get the existing pending event
    const pendingEvents = await getPendingEvents()
    const existingEvent = pendingEvents.find(e => e.id === eventData.eventId)
    
    if (!existingEvent) {
      return NextResponse.json({ error: 'Pending event not found' }, { status: 404 })
    }

    // Setup Google Calendar API if we need to update the calendar event
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

    // Update the event object
    const updatedEventObject: any = {
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

    console.log('📅 Updating Google Calendar event:', eventData.eventId);

    // Update event in Google Calendar
    const response = await calendar.events.update({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId: eventData.eventId,
      requestBody: updatedEventObject,
    });

    const updatedEvent = response.data;
    console.log('✅ Event updated in Google Calendar');

    // Remove the old pending event and store the updated one
    await deletePendingEvent(eventData.eventId);
    await storePendingEvent(updatedEvent);

    console.log('✅ Pending event updated successfully');

    return NextResponse.json({
      message: 'Event updated successfully',
      eventId: updatedEvent.id,
      title: eventData.title
    });

  } catch (error) {
    console.error('❌ Error editing event:', error);
    
    // Handle specific Google Calendar API errors
    if (error instanceof Error && 'code' in error && error.code === 403) {
      return NextResponse.json(
        { error: 'Insufficient permissions to update calendar events' },
        { status: 403 }
      );
    }
    
    if (error instanceof Error && 'code' in error && error.code === 400) {
      return NextResponse.json(
        { error: 'Invalid event data provided' },
        { status: 400 }
      );
    }

    if (error instanceof Error && 'code' in error && error.code === 404) {
      return NextResponse.json(
        { error: 'Event not found in Google Calendar' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update event', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}