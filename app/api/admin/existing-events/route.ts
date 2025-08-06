import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/admin-auth'
import { google } from 'googleapis'

export async function GET() {
  try {
    // Protect this route - require admin authentication
    const authError = await requireAdminAuth()
    if (authError) {
      return authError
    }

    console.log('📋 Admin requesting existing events')

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

    // Fetch future events from Google Calendar
    const now = new Date();
    const timeMin = now.toISOString();

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: timeMin,
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 100,
    });

    const events = response.data.items || [];

    console.log(`📊 Returning ${events.length} existing events to admin`)
    
    return NextResponse.json(events)
  } catch (error) {
    console.error('❌ Error fetching existing events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch existing events' },
      { status: 500 }
    )
  }
}