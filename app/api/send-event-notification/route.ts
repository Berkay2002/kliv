import { NextResponse } from 'next/server';
import { google, calendar_v3 } from 'googleapis';
import { sendEmail } from '@/lib/email';
import { getSubscribers } from '@/lib/subscribers';

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

function formatEventTime(event: calendar_v3.Schema$Event): string {
  const start = event.start?.dateTime || event.start?.date;
  const end = event.end?.dateTime || event.end?.date;
  
  if (!start) return 'Okänd tid';
  
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: event.start?.dateTime ? 'numeric' : undefined,
    minute: event.start?.dateTime ? 'numeric' : undefined,
    timeZone: 'Europe/Stockholm'
  };
  
  let timeString = startDate.toLocaleDateString('sv-SE', options);
  
  if (endDate && event.end?.dateTime) {
    const endTimeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Europe/Stockholm'
    };
    timeString += ` - ${endDate.toLocaleTimeString('sv-SE', endTimeOptions)}`;
  }
  
  return timeString;
}

function generateSubscriberNotificationContent(events: calendar_v3.Schema$Event[]): { subject: string; htmlContent: string } {
  const eventCount = events.length;
  const subject = eventCount === 1 ? 'Nytt evenemang tillagt' : 'Nya evenemang tillagda';
  
  let htmlContent = `<h1>Hej!</h1>`;
  htmlContent += `<p>Vi har ${eventCount === 1 ? 'ett nytt evenemang' : 'nya evenemang'} i kalendern:</p>`;
  
  htmlContent += `<h2>Nya evenemang:</h2><ul>`;
  
  events.forEach(event => {
    const parsedContent = event.description ? parseDescription(event.description) : { content: '' };
    const cleanDescription = parsedContent.content || event.description || '';
    
    htmlContent += `<li><strong>${event.summary}</strong> - ${formatEventTime(event)} på ${event.location || 'Okänd plats'}`;
    if (cleanDescription) {
      htmlContent += `<br><em>${cleanDescription}</em>`;
    }
    if (event.htmlLink) {
      htmlContent += `<br><a href="${event.htmlLink}">Visa i Google Kalender</a>`;
    }
    htmlContent += `</li>`;
  });
  
  htmlContent += `</ul>`;
  htmlContent += `<p>Besök vår hemsida för fullständig information.</p>`;
  
  return { subject, htmlContent };
}

export async function POST(request: Request) {
  const startTime = Date.now();
  console.log('📧 MANUAL NOTIFICATION REQUEST:', new Date().toISOString());
  
  try {
    const body = await request.json();
    const { eventIds, adminConfirmation } = body;
    
    if (!eventIds || !Array.isArray(eventIds) || eventIds.length === 0) {
      return NextResponse.json({ error: 'Event IDs required' }, { status: 400 });
    }
    
    if (!adminConfirmation) {
      return NextResponse.json({ error: 'Admin confirmation required' }, { status: 400 });
    }
    
    console.log(`📋 Processing manual notification for ${eventIds.length} events:`, eventIds);
    
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !process.env.GOOGLE_CALENDAR_ID) {
      console.error('Missing Google Service Account or Calendar ID environment variables.');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const jwtClient = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    await jwtClient.authorize();
    const calendar = google.calendar({ version: 'v3', auth: jwtClient });
    
    // Fetch the specific events
    const events: calendar_v3.Schema$Event[] = [];
    for (const eventId of eventIds) {
      try {
        const response = await calendar.events.get({
          calendarId: process.env.GOOGLE_CALENDAR_ID,
          eventId: eventId,
        });
        if (response.data) {
          events.push(response.data);
        }
      } catch (error) {
        console.warn(`⚠️  Could not fetch event ${eventId}:`, error);
      }
    }
    
    if (events.length === 0) {
      return NextResponse.json({ error: 'No events found with provided IDs' }, { status: 404 });
    }
    
    console.log(`📅 Found ${events.length} events to notify about`);
    
    // Get subscribers
    const subscribers = await getSubscribers();
    console.log(`👥 Found ${subscribers.length} subscribers`);
    
    if (subscribers.length === 0) {
      return NextResponse.json({ 
        message: 'No subscribers found',
        eventsProcessed: events.length 
      }, { status: 200 });
    }
    
    // Generate and send notifications
    const { subject, htmlContent } = generateSubscriberNotificationContent(events);
    console.log('📧 Sending notifications with subject:', subject);
    
    let successCount = 0;
    for (const subscriberEmail of subscribers) {
      console.log(`  📤 Sending to: ${subscriberEmail}`);
      const emailSent = await sendEmail({
        to: subscriberEmail,
        subject: subject,
        html: htmlContent,
      });
      if (emailSent) successCount++;
    }
    
    const endTime = Date.now();
    console.log(`✅ Manual notifications sent successfully to ${successCount}/${subscribers.length} subscribers for ${events.length} events in ${endTime - startTime}ms`);
    
    return NextResponse.json({
      message: 'Notifications sent successfully',
      eventsProcessed: events.length,
      subscribersNotified: successCount,
      totalSubscribers: subscribers.length,
      processingTime: `${endTime - startTime}ms`
    }, { status: 200 });
    
  } catch (error) {
    const endTime = Date.now();
    console.error('❌ MANUAL NOTIFICATION ERROR after', `${endTime - startTime}ms:`, error);
    return NextResponse.json(
      { error: 'Failed to send notifications (check server logs)', processingTime: `${endTime - startTime}ms` },
      { status: 500 }
    );
  }
}