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

// FeatureCard component - Now uses theme variables with red accents
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const IconWithProps = React.cloneElement(icon, {
    className: 'w-10 h-10 text-kliv-red transition-colors duration-300 group-hover:text-kliv-red-light',
    'aria-hidden': true
  });

  return (
    <Card className="h-full transition-all duration-300 md:hover:scale-105 md:hover:shadow-lg md:hover:shadow-kliv-red/10 focus-within:scale-105 focus-within:shadow-lg focus-visible:ring-2 focus-visible:ring-kliv-red focus-visible:ring-offset-2 outline-none bg-card border-border hover:border-kliv-red/30 group relative overflow-hidden">
      {/* Red accent gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-kliv-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <CardContent className="p-4 sm:p-6 relative z-10">
        <div className="mb-4 flex items-center justify-center">
          <div className="p-3 rounded-full bg-kliv-red/10 group-hover:bg-kliv-red/20 transition-colors duration-300">
            {IconWithProps}
          </div>
        </div>
        <h3 className="mb-2 text-lg sm:text-xl font-semibold text-foreground text-center group-hover:text-kliv-red transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground text-center text-sm sm:text-base">{description}</p>
      </CardContent>
    </Card>
  );
};

// Placeholder team members
const members: Member[] = [
  { id: 1, name: 'Muhammet Tozak', role: 'Ordförande', email: 'muhammet@klivif.se', image: 'https://ui-avatars.com/api/?name=Muhammet+Tozak&size=400&background=f0f0f0&color=666&format=png' },
  { id: 2, name: 'Maria Rafaelius', role: 'Medlemsansvarig', email: 'Maria@kliv.se', image: 'https://ui-avatars.com/api/?name=Maria+Rafaelius&size=400&background=f0f0f0&color=666&format=png' },
  { id: 3, name: 'Eldar Ljuca', role: 'Aktivitetsansvarig', email: 'Eldar@klivif.se', image: 'https://ui-avatars.com/api/?name=Eldar+Ljuca&size=400&background=f0f0f0&color=666&format=png' },
  { id: 4, name: 'Binel Elias', role: 'PR-ansvarig', email: 'Binel@klivif.se', image: 'https://ui-avatars.com/api/?name=Binel+Elias&size=400&background=f0f0f0&color=666&format=png' },
  { id: 5, name: 'Leah Aybar', role: 'PR-ansvarig', email: 'Leah@klivif.se', image: 'https://ui-avatars.com/api/?name=Leah+Aybar&size=400&background=f0f0f0&color=666&format=png' },
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
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Vilka vi är</h2>
                {/* Red accent line under title */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                Vi är en modern idrottsförening som introducerar och uppmuntrar idrottande bland barn och ungdomar i Norra Botkyrka.
              </p>
            </div>
          </div>
        </section>

        {/* Gradient from About to Features Sections where it transitions from the background color of the About section to the background color of the Features section. */}
        <div className="w-full h-16 md:h-24 bg-gradient-to-b from-muted to-background"></div>

        {/* Features Section - Uses 'bg-background' */}
        <section className="py-16 md:py-24 bg-background relative">
          {/* Red accent gradient backgrounds */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-kliv-red/10 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-kliv-red/10 to-transparent blur-3xl"></div>
          
          <div className="container mx-auto px-2 sm:px-4 relative z-10">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Vår Vision</h2>
              {/* Red accent line under title */}
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
            </div>
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
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Vår Strävan</h2>
                {/* Red accent line under title */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                I nuläget väljer många barn och ungdomar att tidigt sluta med idrott på grund av krav som ställs av den traditionella föreningsmodellen. På Kliv Idrottsförening strävar vi efter att erbjuda en mer flexibel och spontan idrottsmiljö - utan krav som träningsnärvaro och matcher varje helg.
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