import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { sendEmail } from '@/lib/email';
import { getSubscribers } from '@/lib/subscribers';

export async function POST(request: Request) {
  try {
    const channelId = request.headers.get('X-Goog-Channel-ID');
    const resourceId = request.headers.get('X-Goog-Resource-ID');
    const resourceState = request.headers.get('X-Goog-Resource-State');
    const messageNumber = request.headers.get('X-Goog-Message-Number');
    const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;

    console.log('Received Google Calendar Webhook Notification:');
    console.log(`Channel ID: ${channelId}`);
    console.log(`Resource ID: ${resourceId}`);
    console.log(`Resource State: ${resourceState}`);
    console.log(`Message Number: ${messageNumber}`);
    console.log(`Calendar ID: ${calendarId}`);

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
      console.log('Calendar resource state is "exists". Fetching events and notifying subscribers...');

      const response = await calendar.events.list({
        calendarId: calendarId,
        timeMin: (new Date()).toISOString(), // Fetch events from now onwards
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 10, // Limit results for efficiency
      });

      const events = response.data.items || [];

      if (events.length > 0) {
        const subscribers = await getSubscribers();
        if (subscribers.length > 0) {
          const eventTitles = events.map(event => event.summary).join(', ');
          const subject = `Nya/uppdaterade evenemang: ${eventTitles}`;
          let htmlContent = `<h1>Hej!</h1><p>Vi har nya eller uppdaterade evenemang i kalendern:</p><ul>`;

          events.forEach(event => {
            htmlContent += `<li><strong>${event.summary}</strong> - ${event.start?.dateTime || event.start?.date} på ${event.location || 'Okänd plats'}</li>`;
            if (event.htmlLink) {
              htmlContent += `<p><a href="${event.htmlLink}">Visa evenemang i Google Kalender</a></p>`;
            }
          });
          htmlContent += `</ul><p>Besök vår hemsida för fullständig information.</p>`;

          for (const subscriberEmail of subscribers) {
            await sendEmail({
              to: subscriberEmail,
              subject: subject,
              html: htmlContent,
            });
          }
          console.log(`Notifications sent to ${subscribers.length} subscribers.`);
        } else {
          console.log('No subscribers to notify.');
        }
      } else {
        console.log('No upcoming events found after notification, or no significant change.');
      }
    }

    return NextResponse.json({ message: 'Webhook processed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    // Respond with 200 OK even on error, to avoid Google retrying excessively
    // You should log errors and handle them internally.
    return NextResponse.json(
      { error: 'Failed to process webhook (check server logs)' },
      { status: 200 } // Still return 200 to Google to prevent endless retries.
    );
  }
} 