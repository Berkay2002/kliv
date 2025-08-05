import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { getSubscribers } from '@/lib/subscribers';

export async function POST(request: Request) {
  try {
    const { type = 'test', eventTitle = 'Test Event', eventTime = 'Test Time', eventLocation = 'Test Location' } = await request.json().catch(() => ({}));
    
    console.log('🧪 MANUAL NOTIFICATION TEST STARTED');
    
    // Get subscribers
    const subscribers = await getSubscribers();
    console.log(`👥 Found ${subscribers.length} subscribers:`, subscribers);
    
    if (subscribers.length === 0) {
      return NextResponse.json({ 
        error: 'No subscribers found',
        message: 'Add subscribers first using POST /api/subscribers' 
      }, { status: 400 });
    }

    // Generate test notification content
    const subject = type === 'new' ? 'Test: Nytt evenemang tillagt' : 
                   type === 'updated' ? 'Test: Evenemang uppdaterat' : 
                   'Test: Kalender notifikation';
    
    const htmlContent = `
      <h1>Hej!</h1>
      <p>Detta är en test-notifikation från kalendersystemet.</p>
      
      <h2>${type === 'new' ? 'Nytt evenemang:' : type === 'updated' ? 'Uppdaterat evenemang:' : 'Test evenemang:'}</h2>
      <ul>
        <li><strong>${eventTitle}</strong> - ${eventTime} på ${eventLocation}</li>
        <li><em>Detta är en test för att verifiera att e-postfunktionaliteten fungerar.</em></li>
      </ul>
      
      <p>Om du får detta e-postmeddelande fungerar kalendernotifikationssystemet korrekt!</p>
      <p><small>Skickat: ${new Date().toLocaleString('sv-SE')}</small></p>
    `;

    // Send test emails
    let successCount = 0;
    const results = [];
    
    for (const subscriberEmail of subscribers) {
      console.log(`📤 Sending test email to: ${subscriberEmail}`);
      
      const emailSent = await sendEmail({
        to: subscriberEmail,
        subject: subject,
        html: htmlContent,
      });
      
      results.push({
        email: subscriberEmail,
        sent: emailSent
      });
      
      if (emailSent) successCount++;
    }

    console.log(`✅ Test notifications sent to ${successCount}/${subscribers.length} subscribers`);

    return NextResponse.json({
      message: 'Test notifications completed',
      summary: {
        totalSubscribers: subscribers.length,
        successfulSends: successCount,
        failedSends: subscribers.length - successCount
      },
      results: results,
      testData: {
        type,
        subject,
        eventTitle,
        eventTime,
        eventLocation
      }
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Error in test notifications:', error);
    return NextResponse.json({ 
      error: 'Test notification failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}