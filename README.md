# Kliv

A modern Next.js application built with TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- ⚡ **Next.js 14** - React framework for production
- 🎨 **Tailwind CSS** - Utility-first CSS framework with custom monochromatic theme
- 🎯 **TypeScript** - Type safety and enhanced developer experience
- 🧩 **shadcn/ui** - Beautiful, accessible UI components
- 🌙 **Dark Mode** - Built-in dark mode support
- 📱 **Responsive** - Mobile-first responsive design

## Custom Theme

This project uses a custom monochromatic color scheme with:
- Light and dark mode variants
- Custom CSS variables for theming
- Oswald font integration
- Tailwind CSS custom color palette

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Adding shadcn/ui Components

To add new components from shadcn/ui:

```bash
npx shadcn@latest add [component-name]
```

For example:
```bash
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with custom CSS variables
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page
├── components/
│   └── ui/                  # shadcn/ui components
├── lib/
│   └── utils.ts             # Utility functions
├── tailwind.config.ts       # Tailwind configuration
├── components.json          # shadcn/ui configuration
└── tsconfig.json           # TypeScript configuration
```

## Customization

### Colors
The color scheme is defined in `app/globals.css` using CSS variables. Modify the variables to change the theme:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  /* ... other variables */
}
```

### Components
All UI components are located in `components/ui/` and can be customized as needed.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
