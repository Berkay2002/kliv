'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { X, ChevronDown, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LovaktivitetCard } from '@/types';

interface OptimizedExpandableCardsProps {
  cards: LovaktivitetCard[];
}



export function OptimizedExpandableCards({ cards }: OptimizedExpandableCardsProps) {
  const [active, setActive] = useState<LovaktivitetCard | null>(null);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    setActive(null);
    // Show navigation bar when closing
    const navBar = document.querySelector('[data-nav-bar]');
    if (navBar) {
      (navBar as HTMLElement).style.display = 'block';
    }
    // Show back to top button when closing
    const backToTopButton = document.querySelector('[data-back-to-top]');
    if (backToTopButton) {
      (backToTopButton as HTMLElement).style.display = 'block';
    }
  }, []);

  const handleCardClick = useCallback((card: LovaktivitetCard) => {
    setActive(card);
    // Hide navigation bar when expanding
    const navBar = document.querySelector('[data-nav-bar]');
    if (navBar) {
      (navBar as HTMLElement).style.display = 'none';
    }
    // Hide back to top button when expanding
    const backToTopButton = document.querySelector('[data-back-to-top]');
    if (backToTopButton) {
      (backToTopButton as HTMLElement).style.display = 'none';
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && active) {
        handleClose();
      }
    };

    const handleScroll = () => {
      if (active) {
        document.body.style.overflow = 'hidden';
        // Add high z-index backdrop to body to ensure it covers everything
        document.body.style.position = 'relative';
      } else {
        document.body.style.overflow = 'auto';
        document.body.style.position = '';
      }
    };

    handleScroll();
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      // Show navigation bar on cleanup
      const navBar = document.querySelector('[data-nav-bar]');
      if (navBar) {
        (navBar as HTMLElement).style.display = 'block';
      }
      // Show back to top button on cleanup
      const backToTopButton = document.querySelector('[data-back-to-top]');
      if (backToTopButton) {
        (backToTopButton as HTMLElement).style.display = 'block';
      }
    };
  }, [active, handleClose]);

  useOutsideClick(ref, handleClose);

  const modalContent = active && mounted ? (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9998]"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] p-4 pt-20">
        <div className="min-h-[calc(100%-80px)] flex items-start justify-center">
          <div
            ref={ref}
            className="w-full max-w-4xl bg-card border border-border rounded-2xl overflow-y-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] my-8 max-h-[calc(100vh-15rem)] relative"
          >
            {/* Header */}
            <div className="relative">
              <Image
                src={active.src}
                alt={active.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-80 object-cover"
                priority
                quality={90}
              />
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200 z-10 shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {active.title}
                  </h3>
                </div>
                
                <Link
                  href={`/aktivitet/${active.id}`}
                  className="px-6 py-3 bg-kliv-red hover:bg-kliv-red-dark text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 w-fit"
                >
                  Läs mer
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              {/* Metadata */}
              {active.metadata && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
                  {active.metadata.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-kliv-red" />
                      <div>
                        <p className="text-xs text-muted-foreground">Datum</p>
                        <p className="text-sm font-medium">{active.metadata.date}</p>
                      </div>
                    </div>
                  )}

                  {active.metadata.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-kliv-red" />
                      <div>
                        <p className="text-xs text-muted-foreground">Plats</p>
                        <p className="text-sm font-medium">{active.metadata.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Main content */}
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {active.content}
                </p>
              </div>

              {/* Google Maps iframe if location exists */}
              {active.metadata?.location && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-kliv-red" />
                    Plats
                  </h4>
                  <div className="rounded-lg overflow-hidden border border-border">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_EMBED_API_KEY}&q=${encodeURIComponent(active.metadata.location)}`}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;

  return (
    <>
      {/* Portal the modal content to document.body to escape any stacking contexts */}
      {mounted && modalContent && createPortal(modalContent, document.body)}

      {/* Cards Grid */}
      <div className={cn(
        "grid gap-6 justify-items-center",
        cards.length === 1 && "grid-cols-1 max-w-md mx-auto",
        cards.length === 2 && "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto",
        cards.length >= 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      )}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={cn(
              'group cursor-pointer bg-card border border-border rounded-xl overflow-hidden',
              'hover:shadow-xl hover:shadow-kliv-red/10 hover:border-kliv-red/30',
              'transition-all duration-200 hover:-translate-y-1'
            )}
          >
            <div className="relative overflow-hidden">
              <Image
                src={card.src}
                alt={card.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                quality={80}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>

            <div className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-kliv-red transition-colors duration-200">
                  {card.title}
                </h3>
              </div>

              {/* Quick info */}
              {card.metadata && (
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  {card.metadata.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-kliv-red" />
                      <span>{card.metadata.date}</span>
                    </div>
                  )}
                  {card.metadata.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-kliv-red" />
                      <span>{card.metadata.location}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Expand indicator */}
              <div className="mt-4 flex justify-center">
                <div className="w-8 h-8 rounded-full bg-kliv-red/10 group-hover:bg-kliv-red/20 flex items-center justify-center transition-colors duration-200">
                  <ChevronDown className="w-4 h-4 text-kliv-red group-hover:text-kliv-red-dark transition-colors duration-200" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}