import { createClient } from 'redis';
import { calendar_v3 } from 'googleapis';

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on('error', err => console.log('Redis Client Error', err));

async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
    console.log('Connected to Redis');
  }
}

const SUBSCRIBERS_KEY = 'email_subscribers';
const PENDING_EVENTS_KEY = 'pending_events';

export async function addSubscriber(email: string): Promise<boolean> {
  await connectRedis();
  try {
    const currentSubscribers = await client.sMembers(SUBSCRIBERS_KEY);
    if (!currentSubscribers.includes(email)) {
      await client.sAdd(SUBSCRIBERS_KEY, email);
      console.log(`Subscriber added: ${email}`);
      return true;
    }
    console.log(`Subscriber already exists: ${email}`);
    return false;
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return false;
  }
}

export async function removeSubscriber(email: string): Promise<boolean> {
  await connectRedis();
  try {
    const removed = await client.sRem(SUBSCRIBERS_KEY, email);
    if (removed > 0) {
      console.log(`Subscriber removed: ${email}`);
      return true;
    }
    console.log(`Subscriber not found: ${email}`);
    return false;
  } catch (error) {
    console.error('Error removing subscriber:', error);
    return false;
  }
}

export async function getSubscribers(): Promise<string[]> {
  await connectRedis();
  try {
    const subscribers = await client.sMembers(SUBSCRIBERS_KEY);
    return subscribers;
  } catch (error) {
    console.error('Error getting subscribers:', error);
    return [];
  }
}

// Event storage functions
export interface PendingEvent {
  id: string;
  event: calendar_v3.Schema$Event;
  dateAdded: string;
  status: 'pending' | 'approved' | 'rejected';
}

export async function storePendingEvent(event: calendar_v3.Schema$Event): Promise<boolean> {
  await connectRedis();
  try {
    const pendingEvent: PendingEvent = {
      id: event.id || '',
      event: event,
      dateAdded: new Date().toISOString(),
      status: 'pending'
    };
    
    await client.hSet(PENDING_EVENTS_KEY, event.id || '', JSON.stringify(pendingEvent));
    console.log(`Pending event stored: ${event.summary} (${event.id})`);
    return true;
  } catch (error) {
    console.error('Error storing pending event:', error);
    return false;
  }
}

export async function getPendingEvents(): Promise<PendingEvent[]> {
  await connectRedis();
  try {
    const eventData = await client.hGetAll(PENDING_EVENTS_KEY);
    const events: PendingEvent[] = [];
    
    for (const [key, value] of Object.entries(eventData)) {
      try {
        const event = JSON.parse(value) as PendingEvent;
        if (event.status === 'pending') {
          events.push(event);
        }
      } catch (parseError) {
        console.error(`Error parsing event ${key}:`, parseError);
      }
    }
    
    // Sort by date added, newest first
    return events.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  } catch (error) {
    console.error('Error getting pending events:', error);
    return [];
  }
}

export async function approvePendingEvent(eventId: string): Promise<boolean> {
  await connectRedis();
  try {
    const eventData = await client.hGet(PENDING_EVENTS_KEY, eventId);
    if (!eventData) {
      console.error(`Event not found: ${eventId}`);
      return false;
    }
    
    const event = JSON.parse(eventData) as PendingEvent;
    event.status = 'approved';
    
    await client.hSet(PENDING_EVENTS_KEY, eventId, JSON.stringify(event));
    console.log(`Event approved: ${eventId}`);
    return true;
  } catch (error) {
    console.error('Error approving event:', error);
    return false;
  }
}

export async function deletePendingEvent(eventId: string): Promise<boolean> {
  await connectRedis();
  try {
    await client.hDel(PENDING_EVENTS_KEY, eventId);
    console.log(`Pending event deleted: ${eventId}`);
    return true;
  } catch (error) {
    console.error('Error deleting pending event:', error);
    return false;
  }
}

// Helper functions for existing events (Google Calendar operations)
export async function getExistingEvents(): Promise<calendar_v3.Schema$Event[]> {
  // This would typically use Google Calendar API directly
  // For now, return empty array - this is used by the API endpoints
  // Implementation would go here if needed by API endpoints
  return [];
}

export function formatEventForDisplay(event: calendar_v3.Schema$Event): {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  formattedTime: string;
} {
  const start = event.start?.dateTime || event.start?.date || '';
  const end = event.end?.dateTime || event.end?.date || '';
  
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: event.start?.dateTime ? 'numeric' : undefined,
    minute: event.start?.dateTime ? 'numeric' : undefined,
    timeZone: 'Europe/Stockholm'
  };
  
  let formattedTime = startDate ? startDate.toLocaleDateString('sv-SE', options) : 'Okänd tid';
  
  if (endDate && event.end?.dateTime) {
    const endTimeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Europe/Stockholm'
    };
    formattedTime += ` - ${endDate.toLocaleTimeString('sv-SE', endTimeOptions)}`;
  }
  
  return {
    id: event.id || '',
    title: event.summary || '',
    startDate: start.split('T')[0] || '',
    endDate: end.split('T')[0] || '',
    location: event.location || '',
    description: event.description || '',
    formattedTime
  };
} 