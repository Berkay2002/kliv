import { google } from 'googleapis';
import { v4 as uuidv4 } from 'uuid';

export interface WatchResponse {
  id: string;
  resourceId: string;
  resourceUri: string;
  expiration: string;
}

export async function setupGoogleCalendarWatch(): Promise<WatchResponse | null> {
  try {
    const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;
    const webhookUrl = process.env.GOOGLE_WEBHOOK_URL || `${process.env.NEXT_PUBLIC_SITE_URL}/api/google-calendar-webhook`;

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !calendarId) {
      console.error('Missing Google Service Account or Calendar ID environment variables.');
      return null;
    }

    const jwtClient = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    await jwtClient.authorize();

    const calendar = google.calendar({ version: 'v3', auth: jwtClient });

    const watchRequest = {
      id: uuidv4(),
      type: 'web_hook',
      address: webhookUrl,
      params: {
        ttl: '3600', // 1 hour TTL
      },
    };

    console.log('Setting up Google Calendar watch with request:', watchRequest);

    const response = await calendar.events.watch({
      calendarId: calendarId,
      requestBody: watchRequest,
    });

    console.log('Google Calendar watch setup successful:', response.data);

    return {
      id: response.data.id!,
      resourceId: response.data.resourceId!,
      resourceUri: response.data.resourceUri!,
      expiration: response.data.expiration!,
    };
  } catch (error) {
    console.error('Error setting up Google Calendar watch:', error);
    return null;
  }
}

export async function stopGoogleCalendarWatch(channelId: string, resourceId: string): Promise<boolean> {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
      console.error('Missing Google Service Account environment variables.');
      return false;
    }

    const jwtClient = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    await jwtClient.authorize();

    const calendar = google.calendar({ version: 'v3', auth: jwtClient });

    await calendar.channels.stop({
      requestBody: {
        id: channelId,
        resourceId: resourceId,
      },
    });

    console.log('Google Calendar watch stopped successfully');
    return true;
  } catch (error) {
    console.error('Error stopping Google Calendar watch:', error);
    return false;
  }
}