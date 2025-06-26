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
    default: "Kliv Idrottsförening Botkyrka - Judo & Kampsport",
    template: "%s | Kliv IF"
  },
  description: "Kliv Idrottsförening Botkyrka (org.nr 802509-8842) - En mötesplats för judo, kampsport och gemenskap i Norsborg. Välkommen att träna med oss!",
  keywords: [
    "Kliv Idrottsförening", 
    "Kliv IF", 
    "Botkyrka", 
    "Norsborg", 
    "judo", 
    "kampsport", 
    "idrott", 
    "förening", 
    "sport", 
    "gemenskap", 
    "träning", 
    "hälsa", 
    "evenemang",
    "Svenska Judoförbundet",
    "Riksidrottsförbundet"
  ],
  authors: [{ name: "Kliv Idrottsförening Botkyrka", url: "https://www.kliv-if.se" }],
  creator: "Kliv Idrottsförening Botkyrka",
  publisher: "Kliv Idrottsförening Botkyrka",
  applicationName: "Kliv IF",
  category: "Sports & Recreation",
  classification: "Sports Association",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kliv-if.se'),
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/transparant-vit.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' }
    ],
    apple: [
      {
        url: '/transparant-vit.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: "Kliv Idrottsförening Botkyrka - Judo & Kampsport",
    description: "Kliv Idrottsförening Botkyrka - En mötesplats för judo, kampsport och gemenskap i Norsborg. Välkommen att träna med oss!",
    url: '/',
    siteName: 'Kliv Idrottsförening Botkyrka',
    images: [
      {
        url: '/transparant-vit.png',
        width: 1080,
        height: 1080,
        alt: 'Kliv Idrottsförening Botkyrka Logo',
      },
    ],
    locale: 'sv_SE',
    type: 'website',
    countryName: 'Sweden',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kliv Idrottsförening Botkyrka - Judo & Kampsport",
    description: "En mötesplats för judo, kampsport och gemenskap i Norsborg. Välkommen att träna med oss!",
    images: ['/transparant-vit.png'],
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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
        <meta name="format-detection" content="telephone=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kliv IF" />
        <meta name="msapplication-TileColor" content="#DC2626" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kliv-if.se'} />
        <link rel="sitemap" href="/sitemap.xml" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              "name": "Kliv Idrottsförening Botkyrka",
              "alternateName": "Kliv IF",
              "description": "Kliv Idrottsförening Botkyrka - En mötesplats för judo, kampsport och gemenskap i Norsborg.",
              "url": "https://www.kliv-if.se",
              "logo": "https://www.kliv-if.se/transparant-vit.png",
              "image": "https://www.kliv-if.se/transparant-vit.png",
              "sport": ["Judo", "Kampsport"],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Tomtbergavägen 370A",
                "addressLocality": "Norsborg",
                "postalCode": "145 71",
                "addressCountry": "SE"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@kliv.se",
                "availableLanguage": "Swedish"
              },
              "foundingDate": "2017-06-29",
              "identifier": {
                "@type": "PropertyValue",
                "propertyID": "SE_ORG",
                "value": "802509-8842"
              },
              "sameAs": [
                "https://www.facebook.com/spearif",
                "https://www.instagram.com/spear_if/"
              ],
              "memberOf": [
                {
                  "@type": "SportsOrganization",
                  "name": "Svenska Judoförbundet"
                },
                {
                  "@type": "SportsOrganization", 
                  "name": "Riksidrottsförbundet"
                }
              ]
            })
          }}
        />
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