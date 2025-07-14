"use client";

import { OptimizedImageSlider } from "@/components/OptimizedImageSlider";
import { OptimizedExpandableCards } from "@/components/OptimizedExpandableCards";
import { SectionSeparator } from "@/components/SectionSeparator";

export default function LovaktiviteterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden -mt-24 pt-24">
        <OptimizedImageSlider
          images={[
            "/images/sportstruck-06-25-25/Landscape/DSC00470.webp",
            "/images/sportstruck-06-25-25/Landscape/DSC00488.webp",
            "/images/sportstruck-06-25-25/Landscape/DSC00518.webp",
            "/images/sportstruck-06-25-25/Landscape/DSC00562.webp",
            "/images/sportstruck-06-25-25/Landscape/DSC00585.webp",
            "/images/sportstruck-06-25-25/Landscape/DSC00669.webp",
            "/images/sportstruck-06-25-25/Landscape/DSC00706.webp",
          ]}
          mobileImages={[
            "/images/sportstruck-06-25-25/Portrait/DSC00475.webp",
            "/images/sportstruck-06-25-25/Portrait/DSC00486.webp",
            "/images/sportstruck-06-25-25/Portrait/DSC00513.webp",
            "/images/sportstruck-06-25-25/Portrait/DSC00548.webp",
            "/images/sportstruck-06-25-25/Portrait/DSC00467.webp",
            "/images/sportstruck-06-25-25/Portrait/DSC00732.webp",
            "/images/sportstruck-06-25-25/Portrait/DSC00785.webp",
          ]}
          className="absolute inset-0 w-full h-screen"
          overlayClassName="bg-black/50"
          autoplay={true}
          interval={5000}
        >
          {/* Content - Centered */}
          <div className="flex items-center justify-center h-full">
            <div className="container mx-auto px-4 py-16">
              <div className="flex flex-col items-center justify-center max-w-4xl mx-auto h-full">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl mb-6">
                  Lovaktiviteter
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl text-center">
                  Vi erbjuder en trygg plats för barn som får prova på ledarledda idrottsaktiviteter helt kostnadsfritt.
                </p>
              </div>
            </div>
          </div>
        </OptimizedImageSlider>
      </section>
      <SectionSeparator fromBg="muted" toBg="background" />


      {/* Description */}
      <section className="py-16 bg-background">
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

      <SectionSeparator fromBg="background" toBg="muted" />

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

      {/* Expandable Cards Section */}
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
          <OptimizedExpandableCards />
        </div>
      </section>

    </div>
  );
}
