'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { OptimizedImageSlider } from '@/components/OptimizedImageSlider';
import Head from 'next/head';
import MobileOptimizedTeamSection from '@/components/MobileOptimizedTeamSection';
import { SubscriptionForm } from '@/components/SubscriptionForm';
import { KlivBentoGrid } from '@/components/KlivBentoGrid';
import { organizationInfo, homePage, teamMembers, getTeamMemberAvatar } from '@/config/content';

// Structured data for the organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "name": organizationInfo.name,
  "description": organizationInfo.description,
  "url": "https://www.kliv-if.se",
  "logo": "https://www.kliv-if.se/logo/logo-black.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": organizationInfo.address.street,
    "addressLocality": organizationInfo.address.city,
    "postalCode": organizationInfo.address.postalCode,
    "addressCountry": "SE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": organizationInfo.contact.phone,
    "contactType": "customer service",
    "email": organizationInfo.contact.email
  },
  "sameAs": [
    organizationInfo.socialMedia.facebook,
    organizationInfo.socialMedia.instagram,
  ]
};

// Import icons
import {
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


// FeatureCard component - Now uses theme variables with red accents

// Team members from content config
const members: Member[] = teamMembers.map((member, index) => ({
  id: index + 1,
  name: member.name,
  role: member.role,
  email: member.email,
  image: getTeamMemberAvatar(member),
}));

function HomePage() {

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </Head>
      <div className="min-h-screen bg-background">
        
        {/* Hero Section with Optimized Image Slider */}
        <section className="h-screen flex items-center justify-center text-center overflow-hidden -mt-24 pt-24">
          <OptimizedImageSlider
            images={homePage.hero.images.landscape}
            mobileImages={homePage.hero.images.portrait}
            className="absolute inset-0 w-full h-screen"
            overlayClassName="bg-black/40 dark:bg-black/60"
            autoplay={true}
            interval={5000}
          >
            {/* Content */}
            <div className="flex items-center justify-center h-full">
              <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
                  {/* Logo */}
                  <div className="mb-8">
                    <Image
                      src="/logo/transparant-text-vit.svg"
                      alt="Kliv Idrottsförening Logo"
                      width={600}
                      height={200}
                      className="w-80 h-auto md:w-96 lg:w-[20rem] xl:w-[24rem] drop-shadow-2xl"
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
                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 shadow-xl text-lg" aria-label="Se våra lovaktiviteter">
                      <Link
                        href="/lovaktiviteter"
                        className="flex items-center justify-center"
                      >
                        Våra Lovaktiviteter
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </OptimizedImageSlider>
        </section>

        {/* Gradient from Hero to About Sections where it transitions from the background color of the Hero section to the background color of the About section. */}
        <div className="w-full h-16 md:h-24 bg-linear-to-b from-transparent to-muted"></div>

        {/* About Section - Uses 'bg-muted' */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{homePage.whoWeAre.title}</h2>
                {/* Red accent line under title */}
                <div className="w-24 h-1 bg-linear-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                {homePage.whoWeAre.description}
              </p>
            </div>
          </div>
        </section>

        {/* Gradient from About to Bento Grid Sections */}
        <div className="w-full h-16 md:h-24 bg-linear-to-b from-muted to-background"></div>

        {/* Bento Grid Section - Replaces Features */}
        <KlivBentoGrid />

        {/* Gradient from Bento Grid to Mission Sections */}
        <div className="w-full h-16 md:h-24 bg-linear-to-b from-background to-muted"></div>

        {/* Mission Section - Uses 'bg-muted' */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{homePage.mission.title}</h2>
                {/* Red accent line under title */}
                <div className="w-24 h-1 bg-linear-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {homePage.mission.description}
              </p>
            </div>
          </div>
        </section>

        {/* Gradient from Mission to Team Sections where it transitions from the background color of the Mission section to the background color of the Team section. */}
        <div className="w-full h-16 md:h-24 bg-linear-to-b from-muted to-background"></div>

        {/* Team Section - Uses 'bg-background' */}
        <MobileOptimizedTeamSection members={members} />

        {/* Gradient from Team to Newsletter Sections */}
        <div className="w-full h-16 md:h-24 bg-linear-to-b from-background to-muted"></div>

        {/* Newsletter Section - Uses 'bg-muted' */}
        <section className="py-16 md:py-24 bg-muted relative">
          {/* Red accent gradient backgrounds */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-linear-to-br from-kliv-red/10 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-linear-to-tl from-kliv-red/10 to-transparent blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{homePage.newsletter.title}</h2>
                {/* Red accent line under title */}
                <div className="w-24 h-1 bg-linear-to-r from-transparent via-kliv-red to-transparent mx-auto mb-6"></div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {homePage.newsletter.description}
                </p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-kliv-red/20 rounded-lg p-6 shadow-lg">
                <SubscriptionForm />
              </div>
            </div>
          </div>
        </section>

        {/* Gradient from Newsletter to Footer Sections */}
        <div className="w-full h-16 md:h-24 bg-linear-to-b from-muted to-gray-50 dark:to-gray-850"></div>
        
      </div>
    </>
  );
}

export default function Home() {
  return (
    <HomePage />
  );
}