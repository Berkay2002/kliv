# Event Creation Guide

This system supports **two ways** to create events that will be sent to subscribers after admin approval.

## Method 1: Admin Dashboard (Recommended for most users)

### Access
- Visit `/admin/dashboard` (requires Clerk authentication)
- Click "Skapa Event" button

### Features
- **User-friendly form** with normal input fields
- **Image upload** via Cloudinary integration
- **Predefined CTA options** dropdown
- **Live preview** of how the event will look
- **Automatic formatting** - no manual metadata required

### Process
1. Fill out simple form (title, date, location, description)
2. Upload image (optional)
3. Select CTA text and link from dropdown
4. Click "Skapa Event"
5. Event appears in Google Calendar
6. Admin gets notification for approval
7. Admin approves → Subscribers get notification

## Method 2: Google Calendar (For advanced users)

### Access
- Direct Google Calendar editing
- Must follow specific metadata format

### Format Required
```
description: Short description
image: /images/events/your-image.webp
ctaText: Läs mer
ctaLink: /lovaktiviteter/your-event
content: Detailed description that will be shown to subscribers...
```

### Process
1. Create event in Google Calendar with proper metadata format
2. Webhook detects new event
3. System parses metadata automatically
4. Admin gets notification for approval
5. Admin approves → Subscribers get notification

## Predefined CTA Options

The system includes these predefined CTA links:
- `/lovaktiviteter` - Lovaktiviteter
- `/lovaktiviteter/hostlovskul` - Höstlovskul
- `/lovaktiviteter/vinterlovskul` - Vinterlovskul
- `/lovaktiviteter/pasklovskul` - Påsklovskul
- `/lovaktiviteter/sommarlovskul` - Sommarlovskul
- `/judo` - Judo
- `/kontakta-oss` - Kontakta oss
- Custom link option

## Environment Variables Required

### Cloudinary (for admin dashboard image upload)
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=kliv_events
```

### Google Calendar (existing)
```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=your_private_key
GOOGLE_CALENDAR_ID=your_calendar_id
```

## Benefits of Dual System

- **Flexibility**: Choose the method that suits your workflow
- **User-friendly**: Admin dashboard eliminates manual formatting
- **Backward compatible**: Existing Google Calendar workflow still works
- **Consistent**: Both methods lead to the same approval system
- **Professional**: Clean, formatted emails regardless of creation method