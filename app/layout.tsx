import React from "react"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"
import Navigation from "./navigationbar"
import Footer from "./Footer"
import BackToTop from "@/components/BackToTop"
import { SectionSeparator } from "@/components/SectionSeparator"

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: {
    default: "Kliv Idrottsförening - Tillsammans för idrott och gemenskap",
    template: "%s | Kliv Idrottsförening"
  },
  description: "Kliv Idrottsförening är en mötesplats för idrottsglädje och gemenskap. Upptäck våra sporter, evenemang och hur du kan bli en del av vårt lag.",
  keywords: ["Kliv Idrottsförening", "idrott", "förening", "sport", "gemenskap", "träning", "hälsa", "evenemang"],
  authors: [{ name: "Kliv Idrottsförening" }],
  creator: "Kliv Idrottsförening",
  publisher: "Kliv Idrottsförening",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kliv-if.se'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    apple: [
      {
        url: '/logo/logo-black.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: "Kliv Idrottsförening - Tillsammans för idrott och gemenskap",
    description: "Kliv Idrottsförening är en mötesplats för idrottsglädje och gemenskap. Upptäck våra sporter, evenemang och hur du kan bli en del av vårt lag.",
    url: '/',
    siteName: 'Kliv Idrottsförening',
    images: [
      {
        url: '/logo/logo-black.png',
        width: 1200,
        height: 630,
        alt: 'Kliv Idrottsförening Logo',
      },
    ],
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kliv Idrottsförening - Tillsammans för idrott och gemenskap",
    description: "En mötesplats för idrottsglädje och gemenskap. Upptäck våra sporter, evenemang och hur du kan bli en del av vårt lag.",
    images: ['/logo/logo-black.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kliv-if.se'} />
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-background text-foreground`}>
        <Providers>
          <Navigation />
          <main className="flex-1 pt-16">{children}</main>
          {/* This separator now correctly blends the main content area with the footer area */}
          <SectionSeparator fromBg="background" toBg="muted" />
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  )
}