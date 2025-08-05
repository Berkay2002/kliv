import { NextResponse } from 'next/server'
import { getPendingEvents, approvePendingEvent, deletePendingEvent, getSubscribers } from '@/lib/subscribers'
import { sendEmail } from '@/lib/email'
import { requireAdminAuth } from '@/lib/admin-auth'

function parseDescription(description: string): {
  src: string;
  ctaText: string;
  ctaLink: string;
  content: string;
} {
  // Handle both newline-separated and continuous text
  let text = description;
  
  // If there are no newlines but we see field patterns, try to add breaks
  if (!text.includes('\n') && text.includes('image:') && text.includes('content:')) {
    // Add newlines before known field names
    text = text
      .replace(/description:/g, '\ndescription:')
      .replace(/image:/g, '\nimage:')
      .replace(/ctaText:/g, '\nctaText:')
      .replace(/ctaLink:/g, '\nctaLink:')
      .replace(/content:/g, '\ncontent:')
      .trim();
  }
  
  const lines = text.split('\n');
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

function formatEventTime(event: any): string {
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

export async function POST(request: Request) {
  try {
    // Protect this route - require admin authentication
    const authError = await requireAdminAuth()
    if (authError) {
      return authError
    }

    const { eventId } = await request.json()
    
    if (!eventId) {
      return NextResponse.json({ error: 'Event ID required' }, { status: 400 })
    }

    console.log('✅ Admin approving event:', eventId)

    // Get the specific pending event
    const pendingEvents = await getPendingEvents()
    const pendingEvent = pendingEvents.find(e => e.id === eventId)
    
    if (!pendingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Get subscribers
    const subscribers = await getSubscribers()
    
    if (subscribers.length === 0) {
      console.log('⚠️  No subscribers found - marking as approved but not sending emails')
      await approvePendingEvent(eventId)
      return NextResponse.json({ 
        message: 'Event approved but no subscribers to notify',
        subscribersNotified: 0 
      })
    }

    // Generate subscriber notification email
    const event = pendingEvent.event
    const parsedContent = event.description ? parseDescription(event.description) : { content: '' }
    const cleanDescription = parsedContent.content || event.description || ''
    
    const subject = 'Nytt evenemang tillagt'
    let htmlContent = `<h1>Hej!</h1>`
    htmlContent += `<p>Vi har ett nytt evenemang i kalendern:</p>`
    htmlContent += `<h2>Nya evenemang:</h2><ul>`
    htmlContent += `<li><strong>${event.summary}</strong> - ${formatEventTime(event)} på ${event.location || 'Okänd plats'}`
    
    if (cleanDescription) {
      htmlContent += `<br><em>${cleanDescription}</em>`
    }
    
    if (event.htmlLink) {
      htmlContent += `<br><a href="${event.htmlLink}">Visa i Google Kalender</a>`
    }
    
    htmlContent += `</li></ul>`
    htmlContent += `<p>Besök vår hemsida för fullständig information.</p>`

    // Send to all subscribers
    let successCount = 0
    for (const subscriberEmail of subscribers) {
      console.log(`  📤 Sending to: ${subscriberEmail}`)
      const emailSent = await sendEmail({
        to: subscriberEmail,
        subject: subject,
        html: htmlContent,
      })
      if (emailSent) successCount++
    }

    // Mark as approved and remove from pending
    await approvePendingEvent(eventId)
    await deletePendingEvent(eventId)

    console.log(`✅ Event approved and sent to ${successCount}/${subscribers.length} subscribers`)

    return NextResponse.json({
      message: 'Event approved and notifications sent',
      subscribersNotified: successCount,
      totalSubscribers: subscribers.length
    })

  } catch (error) {
    console.error('❌ Error approving event:', error)
    return NextResponse.json(
      { error: 'Failed to approve event' },
      { status: 500 }
    )
  }
}