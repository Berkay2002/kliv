import { NextResponse } from 'next/server';
import { createClient } from 'redis';

export async function GET() {
  try {
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        nextPublicSiteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'Not set'
      },
      requiredEnvVars: {
        googleCalendarId: !!process.env.GOOGLE_CALENDAR_ID,
        googleServiceAccountEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        googleServiceAccountPrivateKey: !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
        googleWebhookUrl: !!process.env.GOOGLE_WEBHOOK_URL,
        redisUrl: !!process.env.REDIS_URL,
        emailHost: !!process.env.EMAIL_HOST,
        emailPort: !!process.env.EMAIL_PORT,
        emailUser: !!process.env.EMAIL_USER,
        emailPass: !!process.env.EMAIL_PASS
      },
      redis: {
        connected: false,
        error: null
      },
      webhookUrl: process.env.GOOGLE_WEBHOOK_URL || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/google-calendar-webhook`
    };

    // Test Redis connection
    if (process.env.REDIS_URL) {
      try {
        const client = createClient({ url: process.env.REDIS_URL });
        await client.connect();
        diagnostics.redis.connected = true;
        await client.disconnect();
      } catch (error) {
        diagnostics.redis.error = error instanceof Error ? error.message : 'Unknown Redis error';
      }
    }

    // Count missing environment variables
    const missingVars = Object.entries(diagnostics.requiredEnvVars)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    const response = {
      ...diagnostics,
      summary: {
        allEnvVarsSet: missingVars.length === 0,
        missingEnvVars: missingVars,
        redisConnectable: diagnostics.redis.connected,
        readyForNotifications: missingVars.length === 0 && diagnostics.redis.connected
      }
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error in diagnostics:', error);
    return NextResponse.json({ 
      error: 'Diagnostics failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}