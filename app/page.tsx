'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TeamSection from '@/components/TeamSection';
import Head from 'next/head';

// Structured data for the organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "name": "Kliv Idrottsförening",
  "description": "En idrottsförening som främjar gemenskap, hälsa och fair play för alla åldrar.",
  "url": "https://www.kliv-if.se",
  "logo": "https://www.kliv-if.se/logo/logo-black.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Exempelvägen 123",
    "addressLocality": "Staden",
    "postalCode": "123 45",
    "addressCountry": "SE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+46-12-345-6789",
    "contactType": "customer service",
    "email": "kontakt@kliv-if.se"
  },
  "sameAs": [
    "https://www.facebook.com/your-page",
    "https://www.instagram.com/your-profile/",
    "https://www.linkedin.com/company/your-company/"
  ]
};

// Import icons
import {
  Shield as ShieldIcon,
  HeartHandshake as CommunityIcon,
  BarChart as GrowthIcon,
  Users as TeamIcon,
  ArrowRight as ArrowRightIcon,
} from 'lucide-react';

// Type definitions
interface Member {
  id: number;
  name: string;
  role: string;
  email: string;
  image: string;
  description?: string;
}

interface FeatureCardProps {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

// FeatureCard component - Now uses theme variables
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const IconWithProps = React.cloneElement(icon, {
    className: 'w-10 h-10 text-primary',
    'aria-hidden': true
  });

  return (
    <Card className="h-full transition-all duration-300 md:hover:scale-105 md:hover:shadow-lg focus-within:scale-105 focus-within:shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none bg-card border-border hover:border-primary/20">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-center">
          {IconWithProps}
        </div>
        <h3 className="mb-2 text-lg sm:text-xl font-semibold text-foreground text-center">{title}</h3>
        <p className="text-muted-foreground text-center text-sm sm:text-base">{description}</p>
      </CardContent>
    </Card>
  );
};

// Placeholder team members
const members: Member[] = [
  { id: 1, name: 'Alex Svensson', role: 'Ordförande', email: 'ordforande@kliv-if.se', image: '/members/placeholder-1.jpg' },
  { id: 2, name: 'Elina Berg', role: 'Kassör', email: 'kassor@kliv-if.se', image: '/members/placeholder-2.jpg' },
  { id: 3, name: 'David Lindgren', role: 'Sportchef', email: 'sportchef@kliv-if.se', image: '/members/placeholder-3.jpg' },
  { id: 4, name: 'Sofia Eriksson', role: 'Eventansvarig', email: 'event@kliv-if.se', image: '/members/placeholder-4.jpg' },
  { id: 5, name: 'Martin Nilsson', role: 'Medlemsansvarig', email: 'medlem@kliv-if.se', image: '/members/placeholder-5.jpg' },
];

function HomePage() {
  const features = [
    { icon: <ShieldIcon aria-hidden="true" />, title: 'Fair Play', description: 'Vi tror på rättvist spel och respekt för alla deltagare.' },
    { icon: <CommunityIcon aria-hidden="true" />, title: 'Gemenskap', description: 'Vårt mål är att skapa en inkluderande miljö för alla medlemmar.' },
    { icon: <GrowthIcon aria-hidden="true" />, title: 'Utveckling', description: 'Vi stöttar personlig utveckling genom idrott och aktiviteter.' },
    { icon: <TeamIcon aria-hidden="true" />, title: 'Lagsport', description: 'Tillsammans är vi starkare och kan uppnå mer.' }
  ];

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </Head>
      <div className="min-h-screen bg-background">
        
        {/* Hero Section with Video Background */}
        <section className=" h-screen flex items-center justify-center text-center overflow-hidden -mt-24 pt-24">
          {/* Video Background - Absolute positioning within hero section */}
          <div className="absolute inset-0 -top-24 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/KlivMontage720p_small.webm" type="video/webm" />
              <source src="/videos/KlivMontage720p_compressed.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 py-16">
            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
              {/* Logo */}
              <div className="mb-8">
                <Image
                  src="/logo/transparant-text-vit.svg"
                  alt="Kliv Idrottsförening Logo"
                  width={600}
                  height={200}
                  className="w-80 h-auto md:w-96 lg:w-[32rem] xl:w-[40rem] drop-shadow-2xl"
                  priority
                />
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg w-full shadow-xl" aria-label="Kontakta oss">
                  <Link href="/kontakta-oss" className="flex items-center justify-center">
                      Kontakta oss <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 shadow-xl" aria-label="Se våra sporter">
                  <Link href="/sporter" className="flex items-center justify-center">
                    Våra Sporter
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Gradient from Hero to About Sections where it transitions from the background color of the Hero section to the background color of the About section. */}
        <div className="w-full h-16 md:h-24 bg-gradient-to-b from-transparent to-muted"></div>

        {/* About Section - Uses 'bg-muted' */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Vilka vi är</h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </section>

        {/* Gradient from About to Features Sections where it transitions from the background color of the About section to the background color of the Features section. */}
        <div className="w-full h-16 md:h-24 bg-gradient-to-b from-muted to-background"></div>

        {/* Features Section - Uses 'bg-background' */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-2 sm:px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-foreground">Vår Vision</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {features.map((feature, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gradient from Features to Mission Sections where it transitions from the background color of the Features section to the background color of the Mission section. */}
        <div className="w-full h-16 md:h-24 bg-gradient-to-b from-background to-muted"></div>

        {/* Mission Section - Uses 'bg-muted' */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Vår Strävan</h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Vårt mål är att erbjuda en trygg och inspirerande miljö där medlemmar kan växa, både som idrottare och individer. Vi tror på kraften i idrott för att bygga broar och skapa en starkare gemenskap.
              </p>
            </div>
          </div>
        </section>

        {/* Gradient from Mission to Team Sections where it transitions from the background color of the Mission section to the background color of the Team section. */}
        <div className="w-full h-16 md:h-24 bg-gradient-to-b from-muted to-background"></div>

        {/* Team Section - Uses 'bg-background' */}
        <TeamSection members={members} />

        {/* Gradient from Team to Footer Sections where it transitions from the background color of the Team section to the background color of the Footer section. */}
        
      </div>
    </>
  );
}

export default function Home() {
  return (
    <HomePage />
  );
}