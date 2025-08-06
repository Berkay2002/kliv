import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/admin-auth'
import { google } from 'googleapis'

interface DeleteEventRequest {
  eventId: string;
}

export async function DELETE(request: Request) {
  try {
    // Protect this route - require admin authentication
    const authError = await requireAdminAuth()
    if (authError) {
      return authError
    }

    const { eventId }: DeleteEventRequest = await request.json()
    
    if (!eventId) {
      return NextResponse.json({ 
        error: 'Missing required field: eventId' 
      }, { status: 400 })
    }

    console.log('🗑️ Admin deleting existing event:', eventId)

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

    // First, get the event details for logging
    let eventTitle = 'Unknown Event';
    try {
      const eventResponse = await calendar.events.get({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        eventId: eventId,
      });
      eventTitle = eventResponse.data.summary || 'Unknown Event';
    } catch (getError) {
      console.warn('Could not fetch event details for logging:', getError);
    }

    // Delete the event from Google Calendar
    await calendar.events.delete({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId: eventId,
    });

    console.log('✅ Event deleted from Google Calendar:', eventTitle);

    return NextResponse.json({
      message: 'Event deleted successfully',
      eventId: eventId,
      title: eventTitle
    });

  } catch (error) {
    console.error('❌ Error deleting event:', error);
    
    // Handle specific Google Calendar API errors
    if (error instanceof Error && 'code' in error && error.code === 403) {
      return NextResponse.json(
        { error: 'Insufficient permissions to delete calendar events' },
        { status: 403 }
      );
    }
    
    if (error instanceof Error && 'code' in error && error.code === 404) {
      return NextResponse.json(
        { error: 'Event not found in Google Calendar' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete event', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}