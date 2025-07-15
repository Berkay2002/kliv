"use client";

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { SubscriptionForm } from "@/components/SubscriptionForm"; // Corrected import

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = !mounted
    ? "/logo/transparant-vit.svg" // Default to white logo for dark theme
    : theme === 'dark'
    ? "/logo/transparant-vit.svg"
    : "/logo/transparant-svart.svg";

  return (
    <footer className="relative bg-gray-50 dark:bg-gray-850 border-t border-kliv-red dark:border-kliv-red">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-3xl w-full justify-items-center">
          
          {/* Logo and Social Media */}
          <div className="space-y-3 lg:space-y-4 text-center">
            <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 group mx-auto">
              <Image
                src={logoSrc}
                alt="Kliv Idrottsförening Logo"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
                priority
              />
            </div>

            <div className="flex items-center justify-center space-x-3 lg:space-x-4">
              <Link
                href="https://www.facebook.com/spearif"
                className="p-3 lg:p-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 group shadow-sm"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} className="lg:hidden text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                <Facebook size={22} className="hidden lg:block text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </Link>
              <Link
                href="https://www.instagram.com/spear_if/"
                className="p-3 lg:p-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all duration-300 group shadow-sm"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} className="lg:hidden text-gray-600 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors" />
                <Instagram size={22} className="hidden lg:block text-gray-600 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Subscription Form */}
          <div className="w-full flex justify-center mt-6 md:mt-0">
            <SubscriptionForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-3 lg:space-y-4 text-center mt-6 md:mt-0">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Kontakt
            </h3>

            <div className="grid grid-cols-2 gap-2 lg:gap-3 max-w-sm mx-auto">
              <div className="flex flex-col items-center space-y-1">
                <MapPin size={18} className="text-kliv-red" />
                <div className="text-center">
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-xs">Besöksadress</p>
                  <div className="text-gray-600 dark:text-gray-400 text-xs leading-tight">
                    <p>Tomtbergavägen 370A</p>
                    <p>145 71 Norsborg</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <Mail size={18} className="text-kliv-red" />
                <div className="text-center">
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-xs">E-post</p>
                  <Link
                    href="mailto:kontakt@kliv-if.se"
                    className="text-kliv-red hover:text-kliv-red-light transition-colors duration-200 hover:underline block text-xs"
                  >
                    info@kliv.se
                  </Link>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <Phone size={18} className="text-kliv-red" />
                <div className="text-center">
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-xs">Telefon</p>
                  <Link
                    href="tel:+46123456789"
                    className="text-kliv-red hover:text-kliv-red-light transition-colors duration-200 hover:underline block text-xs"
                  >
                    +46 123 456 789
                  </Link>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-kliv-red font-bold text-xs">#</span>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-xs">Org.nummer</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">802509-8842</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 pt-3 border-t border-kliv-red/30 dark:border-kliv-red/30">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex space-x-8 text-sm">
              <Link href="/integritetspolicy" className="text-gray-600 dark:text-gray-400 hover:text-kliv-red transition-colors duration-200 hover:underline">
                Integritetspolicy
              </Link>
              <Link href="/villkor" className="text-gray-600 dark:text-gray-400 hover:text-kliv-red transition-colors duration-200 hover:underline">
                Villkor
              </Link>
            </div>
            <p className="text-gray-500 dark:text-gray-500 text-xs">
              © 2025 Kliv Idrottsförening. Alla rättigheter förbehållna.
            </p>
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}