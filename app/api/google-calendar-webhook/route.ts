import { NextResponse } from 'next/server';
import { google, calendar_v3 } from 'googleapis';
import { sendEmail } from '@/lib/email';
import { getSubscribers } from '@/lib/subscribers';

interface EventChange {
  type: 'new' | 'updated' | 'deleted';
  event: calendar_v3.Schema$Event;
  previousEvent?: calendar_v3.Schema$Event;
}

export async function POST(request: Request) {
  const startTime = Date.now();
  console.log('🔔 WEBHOOK RECEIVED:', new Date().toISOString());
  
  try {
    const channelId = request.headers.get('X-Goog-Channel-ID');
    const resourceId = request.headers.get('X-Goog-Resource-ID');
    const resourceState = request.headers.get('X-Goog-Resource-State');
    const messageNumber = request.headers.get('X-Goog-Message-Number');
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    console.log('📋 WEBHOOK HEADERS:');
    console.log(`  Channel ID: ${channelId}`);
    console.log(`  Resource ID: ${resourceId}`);
    console.log(`  Resource State: ${resourceState}`);
    console.log(`  Message Number: ${messageNumber}`);
    console.log(`  Calendar ID: ${calendarId}`);

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !calendarId) {
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

    if (resourceState === 'exists') {
      console.log('✅ Resource state is "exists" - processing calendar changes...');

      // Get recent events with updated time to detect changes
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      
      console.log('🔍 Fetching events updated since:', oneHourAgo.toISOString());
      
      const response = await calendar.events.list({
        calendarId: calendarId,
        timeMin: oneHourAgo.toISOString(),
        updatedMin: oneHourAgo.toISOString(),
        singleEvents: true,
        orderBy: 'updated',
        maxResults: 50,
      });

      const events = response.data.items || [];
      console.log(`📅 Found ${events.length} recently updated events`);

      if (events.length > 0) {
        console.log('🔍 Fetching subscribers...');
        const subscribers = await getSubscribers();
        console.log(`👥 Found ${subscribers.length} subscribers:`, subscribers);
        
        if (subscribers.length > 0) {
          console.log('🔄 Analyzing event changes...');
          const changes = await analyzeEventChanges(events);
          console.log(`📊 Detected ${changes.length} significant changes`);
          
          if (changes.length > 0) {
            const { subject, htmlContent } = generateNotificationContent(changes);
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
            console.log(`✅ Notifications sent successfully to ${successCount}/${subscribers.length} subscribers for ${changes.length} changes.`);
          } else {
            console.log('ℹ️  No significant changes detected (events may be older than 10 minutes).');
          }
        } else {
          console.log('⚠️  No subscribers found - notifications not sent.');
        }
      } else {
        console.log('ℹ️  No recently updated events found.');
      }
    } else {
      console.log(`ℹ️  Resource state is "${resourceState}" - skipping processing.`);
    }

    const endTime = Date.now();
    console.log(`🏁 WEBHOOK COMPLETED in ${endTime - startTime}ms`);
    return NextResponse.json({ message: 'Webhook processed successfully', processingTime: `${endTime - startTime}ms` }, { status: 200 });
  } catch (error) {
    const endTime = Date.now();
    console.error('❌ WEBHOOK ERROR after', `${endTime - startTime}ms:`, error);
    return NextResponse.json(
      { error: 'Failed to process webhook (check server logs)', processingTime: `${endTime - startTime}ms` },
      { status: 200 }
    );
  }
}

async function analyzeEventChanges(events: calendar_v3.Schema$Event[]): Promise<EventChange[]> {
  const changes: EventChange[] = [];
  const now = new Date();
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

  for (const event of events) {
    const created = new Date(event.created || '');
    const updated = new Date(event.updated || '');
    
    // Check if event was created recently (new event)
    if (created > tenMinutesAgo) {
      changes.push({
        type: 'new',
        event: event
      });
    }
    // Check if event was updated recently (but not just created)
    else if (updated > tenMinutesAgo && updated > created) {
      changes.push({
        type: 'updated',
        event: event
      });
    }
  }

  return changes;
}

function generateNotificationContent(changes: EventChange[]): { subject: string; htmlContent: string } {
  const newEvents = changes.filter(c => c.type === 'new');
  const updatedEvents = changes.filter(c => c.type === 'updated');
  
  let subject = '';
  let htmlContent = `<h1>Hej!</h1>`;

  if (newEvents.length > 0 && updatedEvents.length > 0) {
    subject = `Nya och uppdaterade evenemang i kalendern`;
    htmlContent += `<p>Vi har både nya och uppdaterade evenemang i kalendern:</p>`;
  } else if (newEvents.length > 0) {
    subject = newEvents.length === 1 ? 'Nytt evenemang tillagt' : 'Nya evenemang tillagda';
    htmlContent += `<p>Vi har ${newEvents.length === 1 ? 'ett nytt evenemang' : 'nya evenemang'} i kalendern:</p>`;
  } else if (updatedEvents.length > 0) {
    subject = updatedEvents.length === 1 ? 'Evenemang uppdaterat' : 'Evenemang uppdaterade';
    htmlContent += `<p>Vi har uppdaterat ${updatedEvents.length === 1 ? 'ett evenemang' : 'evenemang'} i kalendern:</p>`;
  }

  if (newEvents.length > 0) {
    htmlContent += `<h2>Nya evenemang:</h2><ul>`;
    newEvents.forEach(change => {
      const event = change.event;
      htmlContent += `<li><strong>${event.summary}</strong> - ${formatEventTime(event)} på ${event.location || 'Okänd plats'}`;
      if (event.description) {
        htmlContent += `<br><em>${event.description}</em>`;
      }
      if (event.htmlLink) {
        htmlContent += `<br><a href="${event.htmlLink}">Visa i Google Kalender</a>`;
      }
      htmlContent += `</li>`;
    });
    htmlContent += `</ul>`;
  }

  if (updatedEvents.length > 0) {
    htmlContent += `<h2>Uppdaterade evenemang:</h2><ul>`;
    updatedEvents.forEach(change => {
      const event = change.event;
      htmlContent += `<li><strong>${event.summary}</strong> - ${formatEventTime(event)} på ${event.location || 'Okänd plats'}`;
      if (event.description) {
        htmlContent += `<br><em>${event.description}</em>`;
      }
      if (event.htmlLink) {
        htmlContent += `<br><a href="${event.htmlLink}">Visa i Google Kalender</a>`;
      }
      htmlContent += `</li>`;
    });
    htmlContent += `</ul>`;
  }

  htmlContent += `<p>Besök vår hemsida för fullständig information.</p>`;

  return { subject, htmlContent };
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