import { NextResponse } from 'next/server';
import { setupGoogleCalendarWatch } from '@/lib/google-calendar-watch';

export async function POST() {
  try {
    const watchResponse = await setupGoogleCalendarWatch();
    
    if (!watchResponse) {
      return NextResponse.json({ error: 'Failed to setup Google Calendar watch' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Google Calendar watch setup successful',
      watchData: watchResponse 
    }, { status: 200 });
  } catch (error) {
    console.error('Error in setup-calendar-watch:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}