const { setupGoogleCalendarWatch } = require('../lib/google-calendar-watch');

async function testCalendarNotifications() {
  console.log('Testing Google Calendar notification setup...');
  
  // Test 1: Setup calendar watch
  console.log('\n1. Setting up Google Calendar watch...');
  try {
    const watchResponse = await setupGoogleCalendarWatch();
    if (watchResponse) {
      console.log('✅ Watch setup successful!');
      console.log('Watch ID:', watchResponse.id);
      console.log('Resource ID:', watchResponse.resourceId);
      console.log('Expiration:', new Date(parseInt(watchResponse.expiration)));
    } else {
      console.log('❌ Watch setup failed');
    }
  } catch (error) {
    console.error('❌ Error setting up watch:', error.message);
  }
  
  // Test 2: Test webhook endpoint
  console.log('\n2. Testing webhook endpoint...');
  try {
    const webhookUrl = process.env.GOOGLE_WEBHOOK_URL || `${process.env.NEXT_PUBLIC_SITE_URL}/api/google-calendar-webhook`;
    console.log('Webhook URL:', webhookUrl);
    
    // You can manually test the webhook by creating/updating a calendar event
    console.log('To test: Create or update an event in your Google Calendar');
    console.log('The webhook should receive notifications automatically');
  } catch (error) {
    console.error('❌ Error testing webhook:', error.message);
  }
  
  console.log('\n3. Environment variables check...');
  const requiredEnvVars = [
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY',
    'NEXT_PUBLIC_GOOGLE_CALENDAR_ID',
    'REDIS_URL',
    'EMAIL_HOST',
    'EMAIL_USER',
    'EMAIL_PASS'
  ];
  
  let missingVars = [];
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });
  
  if (missingVars.length === 0) {
    console.log('✅ All required environment variables are set');
  } else {
    console.log('❌ Missing environment variables:', missingVars.join(', '));
  }
}

testCalendarNotifications().catch(console.error);