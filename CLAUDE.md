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
  - `BackToTop.tsx` - Scroll-to-top functionality
  - `SectionSeparator.tsx` - Visual separators between sections
  - `TeamSection.tsx` - Team member display
  - `theme-provider.tsx` - Theme management
  - `mode-toggle.tsx` - Dark/light mode toggle

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

## Testing and Deployment

### Build Process
- Always run `npm run build` before deployment
- Check for TypeScript errors during build
- Verify responsive design across breakpoints
- Test dark/light mode functionality

### Deployment Notes
- Optimized for Vercel deployment
- Environment variables for site URL and verification
- Production-ready with proper caching headers