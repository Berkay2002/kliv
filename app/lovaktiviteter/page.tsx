"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Calendar, Heart, Users, Trophy, Star, Gift } from "lucide-react";
import { useIsMobile } from "@/hooks/useResponsiveImage";

const Chrono = dynamic(() => import("react-chrono").then((mod) => mod.Chrono), {
  ssr: false,
});

const activities = [
  { title: "Sportlovskul", icon: Trophy, description: "Roliga aktiviteter under sportlovet" },
  { title: "Påsklovskul", icon: Star, description: "Äventyr och idrott under påsklovet" },
  { title: "Sportstruck", icon: Users, description: "Mobil idrottsverksamhet som kommer till dig" },
  { title: "Sportoteket", icon: Heart, description: "Låna sportutrustning kostnadsfritt" },
  { title: "Höstlovskul", icon: Calendar, description: "Aktiviteter under höstlovet" },
  { title: "Jullovskul", icon: Gift, description: "Festliga aktiviteter under jullovet" },
];

// Timeline data mapping
const timelineItemsBase = [
  {
    title: "Sportlov",
    cardTitle: "Sportlovskul",
    landscapeImage: "/images/sportstruck-06-25-25/Landscape/DSC00446.webp",
    portraitImage: "/images/sportstruck-06-25-25/Portrait/DSC00450.webp",
  },
  {
    title: "Påsklov",
    cardTitle: "Påsklovskul",
    landscapeImage: "/images/sportstruck-06-25-25/Landscape/DSC00585.webp",
    portraitImage: "/images/sportstruck-06-25-25/Portrait/DSC00548.webp",
  },
  {
    title: "Sommarlov",
    cardTitle: "Sportstruck & Sportoteket",
    landscapeImage: "/images/sportstruck-06-25-25/Landscape/DSC00669.webp",
    portraitImage: "/images/sportstruck-06-25-25/Portrait/DSC00467.webp",
  },
  {
    title: "Höstlov",
    cardTitle: "Höstlovskul",
    landscapeImage: "/images/sportstruck-06-25-25/Landscape/DSC00490.webp",
    portraitImage: "/images/sportstruck-06-25-25/Portrait/DSC00486.webp",
  },
  {
    title: "Jullov",
    cardTitle: "Jullovskul",
    landscapeImage: "/images/sportstruck-06-25-25/Landscape/DSC00470.webp",
    portraitImage: "/images/sportstruck-06-25-25/Portrait/DSC00471.webp",
  },
];

export default function LovaktiviteterPage() {
  const isMobile = useIsMobile();

  // Create timeline items with responsive images
  const timelineItems = timelineItemsBase.map(item => ({
    title: item.title,
    cardTitle: item.cardTitle,
    media: {
      type: "IMAGE" as const,
      source: { url: isMobile ? item.portraitImage : item.landscapeImage },
    },
  }));
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden -mt-24 pt-24">
        {/* Background Images - Absolute positioned */}
        <div className="absolute inset-0 -top-24 z-0">
          {/* Desktop/Landscape Image */}
          <Image
            src="/images/sportstruck-06-25-25/Landscape/DSC00470.webp"
            alt="Lovaktiviteter Background"
            fill
            className="object-cover hidden md:block"
            priority
            sizes="100vw"
          />
          {/* Mobile/Portrait Image */}
          <Image
            src="/images/sportstruck-06-25-25/Portrait/DSC00475.webp"
            alt="Lovaktiviteter Background Mobile"
            fill
            className="object-cover block md:hidden"
            priority
            sizes="100vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        {/* Content - Centered */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center max-w-4xl mx-auto h-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl mb-6">
              Lovaktiviteter
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl text-center">
              Vi erbjuder en trygg plats för barn som får prova på ledarledda idrottsaktiviteter helt kostnadsfritt.
            </p>
          </div>
        </div>
      </section>

      <div className="h-16 bg-gradient-to-b from-transparent to-muted" />

      {/* Description */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Våra lovaktiviteter hjälper barn att komma igång med idrott</h2>
            {/* Red accent line under title */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Under loven erbjuder vi en trygg plats för hundratals barn som får prova på ledarledda idrottsaktiviteter helt kostnadsfritt. Genom att samarbeta med lokala föreningar hjälper vi barn att hitta in i idrottens värld!
          </p>
        </div>
      </section>

      <div className="h-16 bg-gradient-to-b from-muted to-background" />

      {/* Activities Grid */}
      <section className="py-16 bg-background relative">
        {/* Red accent gradient backgrounds */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-kliv-red/10 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-kliv-red/10 to-transparent blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Vad Vi Arrangerar</h2>
            {/* Red accent line under title */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div
                  key={i}
                  className="bg-card rounded-lg p-6 shadow hover:shadow-xl hover:shadow-kliv-red/10 border border-border hover:border-kliv-red/30 transition-all duration-300 group relative overflow-hidden hover:scale-105"
                >
                  {/* Red accent gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-kliv-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-14 h-14 bg-kliv-red/10 group-hover:bg-kliv-red/20 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-kliv-red group-hover:text-kliv-red-light transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-kliv-red transition-colors duration-300">{activity.title}</h3>
                    <p className="text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-16 bg-gradient-to-b from-background to-muted" />

      {/* Safe & Free Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Trygga och kostnadsfria lovaktiviteter</h2>
            {/* Red accent line under title */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Våra kostnadsfria lovverksamheter fungerar som en trygg plats för barn i området under skolloven. Alla
            aktiviteter är kravlösa, bemannade av utbildade ledare och helt gratis.
          </p>
        </div>
      </section>

      <div className="h-16 bg-gradient-to-b from-muted to-background" />

      {/* Timeline Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Lovaktiviteter genom året</h2>
            {/* Red accent line under title */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
          </div>
          <div className="timeline-container">
            <Chrono
              items={timelineItems}
              mode="VERTICAL_ALTERNATING"
              useReadMore={true}
              readMore="Läs mer"
              cardHeight={150}
              allowDynamicUpdate
              disableToolbar
              hideControls
              theme={{
                primary: "hsl(var(--kliv-red))",
                secondary: "hsl(var(--secondary))",
                cardBgColor: "hsl(var(--card))",
                cardTitleColor: "hsl(var(--foreground))",
                cardSubtitleColor: "hsl(var(--muted-foreground))",
                cardDetailsColor: "hsl(var(--muted-foreground))",
                titleColor: "hsl(var(--foreground))",
                titleColorActive: "hsl(var(--kliv-red))",
              }}
              fontSizes={{
                cardTitle: "1.2rem",
                cardSubtitle: "0.9rem",
                cardDetailedText: "0.95rem",
              }}
              classNames={{
                card: "rounded-xl overflow-hidden shadow-md",
                cardTitle: "text-center flex justify-center items-center p-3 font-semibold",
                title: "text-center",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
