# Kliv Idrottsförening Botkyrka 🥋

A modern, responsive website for Kliv Idrottsförening - a Swedish sports association specializing in judo and martial arts. Built with Next.js 15, TypeScript, and a sophisticated design system featuring a custom monochromatic theme with red accents.

## 🌟 Features

### Core Features
- **🏠 Multi-page Website**: Home, activities, judo programs, contact, and administrative pages
- **📅 Google Calendar Integration**: Real-time event synchronization with webhook notifications
- **📧 Email System**: Contact forms and subscriber management with automated notifications
- **👥 Team Management**: Dynamic team member profiles and contact information
- **🎨 Custom Design System**: Monochromatic theme with warm/cool variants and Kliv red accents
- **🌙 Dark Mode**: Complete theme system with seamless light/dark mode switching
- **📱 Responsive Design**: Mobile-first approach optimized for all devices
- **♿ Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

### Technical Features
- **⚡ Next.js 15**: Latest React framework with App Router
- **🎯 TypeScript**: Full type safety throughout the application
- **🎨 Tailwind CSS**: Utility-first styling with extensive customization
- **🧩 shadcn/ui**: Beautiful, accessible UI component library
- **🔧 Redis Integration**: Subscriber data storage and caching
- **📊 Analytics**: Vercel Analytics integration
- **🔒 Security**: Environment variable protection and validation
- **🚀 Performance**: Optimized images, lazy loading, and efficient caching

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS with custom theme
- shadcn/ui components
- Framer Motion for animations
- Lucide React icons

**Backend & APIs:**
- Next.js API Routes
- Google Calendar API
- Google Maps API
- Nodemailer for email service
- Redis for data storage

**Deployment & Tools:**
- Vercel (recommended)
- ESLint & Prettier
- Sharp for image optimization

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm
- Redis instance (local or cloud)
- Google Cloud Platform account (for APIs)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Berkay2002/kliv.git
   cd kliv
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables (see [Configuration](#-configuration) section)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## ⚙️ Configuration

### Required Environment Variables

Copy `.env.example` to `.env.local` and configure:

#### Google APIs
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_api_key
GOOGLE_CALENDAR_ID=your_calendar_id@group.calendar.google.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

#### Email Configuration
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### Redis & Site Settings
```env
REDIS_URL=redis://localhost:6379
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Kliv Idrottsförening"
```

### Google Calendar Setup

1. **Create a Google Cloud Project**
2. **Enable Calendar API**
3. **Create Service Account**
4. **Generate private key**
5. **Share calendar with service account**
6. **Setup calendar watch**:
   ```bash
   curl -X POST http://localhost:3000/api/setup-calendar-watch
   ```

See [EVENT_CREATION_GUIDE.md](EVENT_CREATION_GUIDE.md) for detailed setup instructions.

## 📁 Project Structure

```
kliv/
├── app/                      # Next.js App Router
│   ├── admin/               # Admin pages
│   ├── aktivitet/           # Activity pages
│   ├── api/                 # API routes
│   ├── judo/                # Judo program pages
│   ├── kontakta-oss/        # Contact pages
│   ├── globals.css          # Global styles & CSS variables
│   ├── layout.tsx           # Root layout with SEO
│   └── page.tsx             # Home page
├── components/              # Reusable components
│   ├── ui/                  # shadcn/ui components
│   ├── ContactForm.tsx      # Contact form with validation
│   ├── TeamSection.tsx      # Team member displays
│   └── ...                  # Other custom components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── public/                  # Static assets
│   ├── images/              # Optimized images
│   ├── videos/              # Compressed videos
│   └── logo/                # Brand assets
├── types/                   # TypeScript type definitions
└── scripts/                 # Build and utility scripts
```

## 🎨 Design System

### Theme Architecture

Kliv uses a sophisticated design system built on CSS variables:

- **Monochromatic Base**: Warm grays and beiges for light mode, cool grays for dark mode
- **Kliv Red Accent**: Custom red color system for CTAs and highlights
- **Semantic Naming**: Colors named by function (`--background`, `--foreground`, etc.)
- **Full Theme Support**: Complete light/dark mode implementation

### Custom CSS Variables

All theming is controlled in `app/globals.css`:

```css
:root {
  --kliv-red: 0 72% 51%;           /* Primary red */
  --kliv-red-light: 0 72% 61%;     /* Light variant */
  --kliv-red-dark: 0 72% 41%;      /* Dark variant */
  --background: 35 20% 96%;        /* Warm beige */
  --foreground: 20 14% 4%;         /* Dark text */
  /* ...extensive color system */
}
```

### Component Styling

- **shadcn/ui Components**: Automatically inherit theme colors
- **Custom Components**: Use theme-aware Tailwind classes
- **Responsive Design**: Mobile-first with custom breakpoints
- **Animations**: Framer Motion with red accent highlights

## 🔧 Development

### Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

### Image Optimization

Convert images to WebP format:
```bash
node convert-to-webp.js
```

### Testing Calendar Integration

```bash
# Setup calendar watch
curl -X POST http://localhost:3000/api/setup-calendar-watch

# Add test subscriber
curl -X POST http://localhost:3000/api/subscribers \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Test webhook
curl -X POST http://localhost:3000/api/google-calendar-webhook \
  -H "X-Goog-Resource-State: exists"
```

### Debugging Commands

```bash
# System diagnostics
curl -X GET http://localhost:3000/api/diagnostics

# View subscribers
curl -X GET http://localhost:3000/api/subscribers

# Test notifications
curl -X POST http://localhost:3000/api/test-notifications \
  -H "Content-Type: application/json" \
  -d '{"type": "test"}'
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** - automatic deployments on push to main

### Build Checklist

- [ ] Run `npm run build` locally
- [ ] Check TypeScript errors
- [ ] Run `npm run lint`
- [ ] Test responsive design
- [ ] Verify dark/light mode
- [ ] Test calendar integration
- [ ] Validate environment variables

### Production Requirements

- **Webhook URL**: Must be publicly accessible for Google Calendar
- **Redis**: Production Redis instance (Upstash, Railway, etc.)
- **Email Service**: Configured SMTP for contact forms
- **Domain**: Custom domain for professional appearance

## 📚 Documentation

- [**DEPLOYMENT.md**](DEPLOYMENT.md) - Detailed deployment guide
- [**EVENT_CREATION_GUIDE.md**](EVENT_CREATION_GUIDE.md) - Calendar setup instructions
- [**CLAUDE.md**](CLAUDE.md) - Development guidelines for AI assistants

## 🎯 SEO & Performance

### SEO Features
- Comprehensive metadata and OpenGraph tags
- Structured data for Swedish sports organization
- Semantic HTML with proper heading hierarchy
- Swedish language optimization
- Sitemap and robots.txt

### Performance Optimizations
- Next.js Image optimization
- WebP image format conversion
- Lazy loading for images and components
- Compressed video formats
- Efficient CSS with variable-based theming
- Redis caching for API responses

## 🔐 Security

- Environment variable validation
- CORS protection on API routes
- Input sanitization on forms
- Service account authentication for Google APIs
- Rate limiting on contact forms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for all components
- Follow Next.js App Router patterns
- Implement proper error boundaries
- Use `'use client'` directive only when needed
- Follow responsive design principles
- Maintain accessibility standards

## 📄 License

ISC License - see LICENSE file for details.

## 📞 Support

For questions about this project:
- **Developer**: [Berkay Orhan](https://berkay.se/)
- **Organization**: [Kliv Idrottsförening](mailto:kontakt@klivif.se)
- **Issues**: [GitHub Issues](https://github.com/Berkay2002/kliv/issues)

---

**Built with ❤️ for Kliv Idrottsförening Botkyrka**