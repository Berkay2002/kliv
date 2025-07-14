"use client";

import { OptimizedImageSlider } from "@/components/OptimizedImageSlider";
import { SectionSeparator } from "@/components/SectionSeparator";
import Image from "next/image";

export default function JudoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden -mt-24 pt-24">
        <OptimizedImageSlider
          images={[
            "/images/judo/judo1.webp",
            "/images/judo/judo2.webp",
            "/images/judo/judo3.webp",
            "/images/judo/judo4.webp",
          ]}
          mobileImages={[
            "/images/judo/mobilJudo.webp",
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
                  Judo
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl text-center">
                  Upptack kraften i judo - en kampsport som bygger styrka, disciplin och sjalvfortroende.
                </p>
              </div>
            </div>
          </div>
        </OptimizedImageSlider>
      </section>

      <SectionSeparator fromBg="muted" toBg="background" />

      {/* Var Tranare Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Var Tranare</h2>
            {/* Red accent line under title */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Placeholder text for trainer description. This will be replaced with actual content later.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                More placeholder text about the trainer and their experience.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Additional information about training philosophy and approach.
              </p>
            </div>
            
            {/* Trainer Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <Image
                  src="/images/judo/raja.webp"
                  alt="Var Judotranare"
                  width={400}
                  height={500}
                  className="rounded-lg shadow-xl object-cover w-80 h-96"
                />
                <div className="absolute inset-0 rounded-lg ring-1 ring-black/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator fromBg="background" toBg="muted" />

      {/* Traningsgrupp och Schema Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Traningsgrupp och Schema</h2>
            {/* Red accent line under title */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              Placeholder text about training groups and schedule.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              More information about training times and group divisions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              Contact information for detailed schedule and available spots.
            </p>
          </div>
        </div>
      </section>

      <SectionSeparator fromBg="muted" toBg="background" />

      {/* Traningsavgifter och Betalningsinformation Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Traningsavgifter och Betalningsinformation</h2>
            {/* Red accent line under title */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              Placeholder text about training fees and payment information.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              Information about monthly costs and payment options.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              Contact details for current pricing and payment methods.
            </p>
          </div>
        </div>
      </section>

      <SectionSeparator fromBg="background" toBg="muted" />

      {/* Var vi hittas Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Var vi hittas</h2>
            {/* Red accent line under title */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Placeholder text about our training facilities and location.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Information about accessibility and parking.
              </p>
              <div className="bg-background/50 p-6 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Adress:</h3>
                <p className="text-muted-foreground">Tomtbergavagen 370A</p>
                <p className="text-muted-foreground">Botkyrka</p>
              </div>
            </div>
            
            {/* Google Maps */}
            <div className="w-full h-80 lg:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2036.8234567890123!2d17.8234567!3d59.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTomtbergavagen%20370A%2C%20Botkyrka!5e0!3m2!1ssv!2sse!4v1234567890123!5m2!1ssv!2sse"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-lg"
                title="Karta over Tomtbergavagen 370A, Botkyrka"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}