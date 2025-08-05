'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { SectionSeparator } from '@/components/SectionSeparator';
import MobileOptimizedTeamSection from '@/components/MobileOptimizedTeamSection';
import Link from 'next/link';

// Contact information from the codebase
const contactInfo = {
  address: {
    street: 'Tomtbergavägen 370A',
    city: 'Norsborg',
    postalCode: '145 71',
    country: 'Sverige'
  },
  email: 'kontakt@klivif.se',
  phone: '+46 123 456 789',
  orgNumber: '802509-8842',
  socialMedia: {
    facebook: 'https://www.facebook.com/spearif',
    instagram: 'https://www.instagram.com/spear_if/'
  }
};

// Team members from the codebase (same as in home page)
const members = [
  { id: 1, name: 'Muhammet Tozak', role: 'Ordförande', email: 'muhammet@klivif.se', image: 'https://ui-avatars.com/api/?name=Muhammet+Tozak&size=400&background=f0f0f0&color=666&format=png' },
  { id: 2, name: 'Maria Rafaelius', role: 'Medlemsansvarig', email: 'Maria@kliv.se', image: 'https://ui-avatars.com/api/?name=Maria+Rafaelius&size=400&background=f0f0f0&color=666&format=png' },
  { id: 3, name: 'Eldar Ljuca', role: 'Aktivitetsansvarig', email: 'Eldar@klivif.se', image: 'https://ui-avatars.com/api/?name=Eldar+Ljuca&size=400&background=f0f0f0&color=666&format=png' },
  { id: 4, name: 'Binel Elias', role: 'PR-ansvarig', email: 'Binel@klivif.se', image: 'https://ui-avatars.com/api/?name=Binel+Elias&size=400&background=f0f0f0&color=666&format=png' },
  { id: 5, name: 'Leah Aybar', role: 'PR-ansvarig', email: 'Leah@klivif.se', image: 'https://ui-avatars.com/api/?name=Leah+Aybar&size=400&background=f0f0f0&color=666&format=png' },
];

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm"
            >
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  Kontakta Oss
                </h1>
                <div className="w-16 h-1 bg-kliv-red mb-4"></div>
                <p className="text-muted-foreground">
                  Har du frågor eller vill komma i kontakt med oss? Fyll i formuläret så hör vi av oss.
                </p>
              </div>
              
              <ContactForm />
            </motion.div>

            {/* Right Side - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Contact Details */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-foreground">
                  Kontaktinformation
                </h2>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-kliv-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-kliv-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Besöksadress</h3>
                      <p className="text-muted-foreground">
                        {contactInfo.address.street}<br />
                        {contactInfo.address.postalCode} {contactInfo.address.city}<br />
                        {contactInfo.address.country}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-kliv-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-kliv-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">E-post</h3>
                      <Link
                        href={`mailto:${contactInfo.email}`}
                        className="text-kliv-red hover:text-kliv-red-light transition-colors"
                      >
                        {contactInfo.email}
                      </Link>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-kliv-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-kliv-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
                      <Link
                        href={`tel:${contactInfo.phone}`}
                        className="text-kliv-red hover:text-kliv-red-light transition-colors"
                      >
                        {contactInfo.phone}
                      </Link>
                    </div>
                  </div>

                  {/* Organization Number */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-kliv-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="text-kliv-red font-bold text-lg">#</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Organisationsnummer</h3>
                      <p className="text-muted-foreground">{contactInfo.orgNumber}</p>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="pt-4">
                    <h3 className="font-semibold text-foreground mb-3">Följ oss</h3>
                    <div className="flex gap-3">
                      <Link
                        href={contactInfo.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-full transition-colors"
                      >
                        <Facebook className="w-5 h-5 text-blue-600" />
                      </Link>
                      <Link
                        href={contactInfo.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 dark:hover:bg-pink-900/50 rounded-full transition-colors"
                      >
                        <Instagram className="w-5 h-5 text-pink-600" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Width Google Maps */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-xl border border-border overflow-hidden shadow-sm"
          >
            <div className="p-4 border-b border-border">
              <h3 className="text-xl font-semibold text-foreground">Hitta till oss</h3>
              <p className="text-sm text-muted-foreground">
                {contactInfo.address.street}, {contactInfo.address.postalCode} {contactInfo.address.city}
              </p>
            </div>
            <div className="relative">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY}&q=${encodeURIComponent('Tomtbergavägen 370A, Norsborg, Sweden')}`}
                width="100%"
                height={400}
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <SectionSeparator fromBg="background" toBg="muted" />

            {/* Additional Info */}
            <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Vi svarar snabbt
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kliv-red to-transparent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground">
              Vi strävar efter att svara på alla förfrågningar inom 2-3 arbetsdagar. 
              För brådskande ärenden, ring oss direkt på {contactInfo.phone}.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionSeparator fromBg="muted" toBg="background" />

      {/* Team Section */}
      <div className="bg-muted">
        <MobileOptimizedTeamSection members={members} />
      </div>

    </div>
  );
}