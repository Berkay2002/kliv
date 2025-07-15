# Deployment Guide for Google Calendar Notifications

## Prerequisites

1. **Redis Database**: You'll need a Redis instance. Options:
   - [Upstash Redis](https://upstash.com/docs/redis) (recommended, free tier)
   - [Railway Redis](https://railway.app)
   - [Redis Labs](https://redislabs.com)

2. **Google Service Account**: Set up in Google Cloud Console
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable Calendar API
   - Create a Service Account
   - Download the JSON key file

## Step 1: Deploy to Vercel

1. **Push your code to GitHub** (if not already done)
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Deploy the project

## Step 2: Configure Environment Variables in Vercel

In your Vercel dashboard, go to Settings → Environment Variables and add:

### Required Variables:
```
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
GOOGLE_WEBHOOK_URL=https://your-app.vercel.app/api/google-calendar-webhook
NEXT_PUBLIC_GOOGLE_CALENDAR_ID=your_calendar_id@group.calendar.google.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...your private key...\n-----END PRIVATE KEY-----\n"
REDIS_URL=redis://your-redis-url
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

### Notes:
- Replace `your-app.vercel.app` with your actual Vercel URL
- For Gmail, use an App Password instead of your regular password
- The private key must include the `\n` characters as shown

## Step 3: Setup Google Calendar Watch

After deployment, you need to initialize the calendar watch:

1. **Test the webhook endpoint** first:
   ```bash
   curl -X POST https://your-app.vercel.app/api/google-calendar-webhook \
     -H "Content-Type: application/json" \
     -H "X-Goog-Channel-ID: test" \
     -H "X-Goog-Resource-ID: test" \
     -H "X-Goog-Resource-State: exists"
   ```

2. **Setup the calendar watch**:
   ```bash
   curl -X POST https://your-app.vercel.app/api/setup-calendar-watch
   ```

   This should return a response with watch details and expiration time.

## Step 4: Test the Complete Flow

1. **Add a test subscriber**:
   ```bash
   curl -X POST https://your-app.vercel.app/api/subscribers \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com"}'
   ```

2. **Create or update a calendar event** in your Google Calendar

3. **Check your email** - you should receive a notification within a few minutes

## Step 5: Monitor and Maintain

### Watch Expiration
- Google Calendar watches expire and need to be renewed
- The current TTL is set to 1 hour (3600 seconds)
- You may want to create a cron job to renew the watch periodically

### Logs
- Check Vercel function logs for webhook activity
- Monitor Redis connection and subscriber counts

## Troubleshooting

### Common Issues:

1. **Webhook not receiving notifications**:
   - Verify HTTPS URL is publicly accessible
   - Check Google Cloud Console for webhook errors
   - Ensure service account has calendar read permissions

2. **Email not sending**:
   - Verify email credentials and app password
   - Check if email service allows SMTP

3. **Redis connection issues**:
   - Verify Redis URL format and credentials
   - Check if Redis instance is accessible from Vercel

### Debugging Commands:

```bash
# Check if webhook is accessible
curl -I https://your-app.vercel.app/api/google-calendar-webhook

# Test setup endpoint
curl -X POST https://your-app.vercel.app/api/setup-calendar-watch

# Check subscribers
curl https://your-app.vercel.app/api/subscribers
```

## Security Notes

- Never commit environment variables to git
- Use Vercel's environment variable encryption
- Regularly rotate service account keys
- Monitor webhook logs for suspicious activity