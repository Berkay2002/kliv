# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 application for Kliv Idrottsförening Botkyrka, a Swedish sports association website. The project uses TypeScript, Tailwind CSS, and shadcn/ui components with a custom monochromatic theme and red accents.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server (runs on localhost:3000)
- `npm run build` - Build application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

### Adding Components
- `npx shadcn@latest add [component-name]` - Add new shadcn/ui components
- Components are automatically installed to `components/ui/`

### Image Optimization
- `node convert-to-webp.js` - Convert JPG/PNG images to WebP format with size comparison
- Optimizes images in `public/images/judo/` folder specifically

### Calendar System Commands
- `curl -X POST http://localhost:3000/api/setup-calendar-watch` - Setup Google Calendar watch
- `curl -X POST http://localhost:3000/api/subscribers -H "Content-Type: application/json" -d '{"email": "test@example.com"}'` - Add test subscriber

## Architecture Overview

### Next.js App Router Structure
- **`app/`** - Main application directory using App Router
  - `layout.tsx` - Root layout with comprehensive SEO, metadata, and structured data
  - `page.tsx` - Home page with hero video section, feature cards, and team section
  - `globals.css` - Global styles with extensive custom CSS variables for theming
  - `providers.tsx` - Context providers for theme management
  - `navigationbar.tsx` - Main navigation component
  - `header.tsx` - Header component
  - `Footer.tsx` - Footer component

### Component System
- **`components/ui/`** - shadcn/ui components (button, card, form, etc.)
- **`components/`** - Custom components:
  - `ContactForm.tsx` - Contact form with validation
  - `ErrorBoundary.tsx` - Error handling wrapper
  - `LoadingSpinner.tsx` - Loading state component
  - `MobileOptimizedTeamSection.tsx` - Mobile-friendly team display
  - `OptimizedExpandableCards.tsx` - Expandable card components
  - `OptimizedImageSlider.tsx` - Image carousel/slider
  - `ResponsiveImage.tsx` - Responsive image handling
  - `SectionSeparator.tsx` - Visual separators between sections
  - `SocialMediaIcons.tsx` - Social media icon components
  - `SubscriptionForm.tsx` - Email subscription form
  - `TeamSection.tsx` - Team member display
  - `theme-provider.tsx` - Theme management
  - `mode-toggle.tsx` - Dark/light mode toggle
  - `shuffle-grid.tsx` - Animated grid component

### Styling System
- **Custom Monochromatic Theme**: Extensive warm gray/beige palette with red accents
- **CSS Variables**: All colors defined in `globals.css` with light/dark variants
- **Kliv Red**: Custom red color system (`--kliv-red`, `--kliv-red-light`, `--kliv-red-dark`)
- **Tailwind Extensions**: Custom utilities for extended color palette

### Key Features
- **SEO Optimized**: Comprehensive metadata, structured data, and OpenGraph tags
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Dark Mode**: Complete theme system with warm/cool variants
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation
- **Performance**: Image optimization, video compression, and lazy loading

## Theme System

### Color Palette
The project uses a sophisticated monochromatic theme:
- **Light Theme**: Warm beige tones with subtle gray undertones
- **Dark Theme**: Cool grays with proper contrast ratios
- **Accent**: Custom red (`--kliv-red`) used for CTAs and highlights

### CSS Variables
All theming is controlled through CSS variables in `globals.css`:
- Semantic color names (`--background`, `--foreground`, `--card`, etc.)
- Extended gray scale (`--gray-50` to `--gray-950`)
- Kliv-specific colors (`--kliv-red`, `--kliv-red-light`, `--kliv-red-dark`)

### Component Styling
- shadcn/ui components inherit theme colors automatically
- Custom components use theme-aware classes
- Hover states and animations use red accents

## Content Structure

### Swedish Content
- All user-facing content is in Swedish
- SEO metadata includes Swedish keywords and descriptions
- Structured data for Swedish sports organization

### Media Assets
- **Videos**: Compressed video formats (webm, mp4) in `public/videos/`
- **Images**: Optimized images in `public/images/` with responsive loading
- **Logos**: SVG logos in `public/logo/` with transparent and text variants

## Development Guidelines

### Code Patterns
- Use TypeScript for all components
- Follow Next.js App Router patterns
- Implement proper error boundaries
- Use client components (`'use client'`) when needed for interactivity
- Import fonts using Next.js `next/font` (Inter is configured with variable font support)
- Use the `cn()` utility from `lib/utils.ts` for conditional CSS classes

### Styling Guidelines
- Use Tailwind classes with theme variables
- Implement responsive design with mobile-first approach
- Use custom CSS variables for consistent theming
- Follow shadcn/ui component patterns

### Component Development
- Create reusable components in `components/`
- Use proper TypeScript interfaces
- Implement accessibility features
- Follow responsive design principles

## SEO and Performance

### SEO Features
- Comprehensive metadata in root layout
- OpenGraph and Twitter card support
- Structured data for sports organization
- Sitemap and robots.txt configuration

### Performance Optimizations
- Next.js Image optimization
- Compressed video formats
- Lazy loading for images
- Efficient CSS with variable-based theming

## Calendar System Environment Variables

### Required Variables
- `GOOGLE_CALENDAR_ID` - Google Calendar ID for the organization calendar
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` - Service account email for Google Calendar API
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` - Private key for service account authentication
- `GOOGLE_WEBHOOK_URL` - Webhook URL for Google Calendar notifications
- `REDIS_URL` - Redis connection string for subscriber storage
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` - SMTP configuration for notifications

### API Endpoints
- `/api/setup-calendar-watch` - Initialize Google Calendar watch
- `/api/google-calendar-webhook` - Handle Google Calendar webhook notifications
- `/api/subscribers` - Manage email subscribers
- `/api/events` - Fetch calendar events for display

## Testing and Deployment

### Build Process
- Always run `npm run build` before deployment
- Check for TypeScript errors during build
- Run `npm run lint` to check code quality
- Verify responsive design across breakpoints
- Test dark/light mode functionality

### Development Environment
- Node.js 18+ required
- Uses Inter font with variable font loading
- Remote images allowed from `ui-avatars.com` (configured in next.config.js)

### Calendar System Testing
- Test calendar watch setup: `curl -X POST http://localhost:3000/api/setup-calendar-watch`
- Test webhook endpoint: `curl -X POST http://localhost:3000/api/google-calendar-webhook -H "X-Goog-Resource-State: exists"`
- Test subscriber management: `curl -X POST http://localhost:3000/api/subscribers -H "Content-Type: application/json" -d '{"email": "test@example.com"}'`
- Test events API: `curl http://localhost:3000/api/events`

### Debugging Commands
- **System Diagnostics**: `curl -X GET http://localhost:3000/api/diagnostics` - Check all environment variables and Redis connection
- **View Subscribers**: `curl -X GET http://localhost:3000/api/subscribers` - List all current subscribers  
- **Test Notifications**: `curl -X POST http://localhost:3000/api/test-notifications -H "Content-Type: application/json" -d '{"type": "test"}'` - Send test email to all subscribers
- **Manual Webhook Test**: `curl -X POST http://localhost:3000/api/google-calendar-webhook -H "X-Goog-Resource-State: exists"` - Trigger webhook processing manually

### Deployment Notes
- Optimized for Vercel deployment
- Environment variables for site URL and verification
- Production-ready with proper caching headers
- Calendar watch system requires webhook URL to be publicly accessible