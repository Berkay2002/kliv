'use client';

import React, { useEffect, useId, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { X, ChevronDown, Calendar, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Card {
  id: string;
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactNode;
  metadata?: {
    date?: string;
    duration?: string;
    location?: string;
  };
}

const seasonalActivities: Card[] = [
  {
    id: 'sportlovskul',
    description: 'Februari',
    title: 'Sportlovskul',
    src: '/images/sportstruck-06-25-25/Landscape/DSC00446.webp',
    ctaText: 'Läs mer',
    ctaLink: '#',
    metadata: {
      date: 'Februari vecka 8',
      duration: '5 dagar',
      location: 'Norsborg centrum'
    },
    content: () => (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Under sportlovet erbjuder vi roliga och engagerande aktiviteter för barn och ungdomar. 
          Våra ledarledda program inkluderar olika idrotter och lekar som hjälper barn att hålla sig aktiva 
          under skollovet.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Aktiviteter inkluderar:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Fotboll och basket</li>
              <li>• Lekar och spel</li>
              <li>• Kampsport grundkurs</li>
              <li>• Teambuilding aktiviteter</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Vad som ingår:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Utbildade ledare</li>
              <li>• All utrustning</li>
              <li>• Mellanmål dagligen</li>
              <li>• Trygg miljö</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'pasklovskul',
    description: 'Mars-April',
    title: 'Påsklovskul',
    src: '/images/sportstruck-06-25-25/Landscape/DSC00585.webp',
    ctaText: 'Läs mer',
    ctaLink: '#',
    metadata: {
      date: 'Påskveckan',
      duration: '3 dagar',
      location: 'Lokala parker'
    },
    content: () => (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Påsklovet blir extra roligt med våra specialdesignade aktiviteter! Vi arrangerar äventyr och 
          idrottsaktiviteter som passar alla åldrar och färdighetsnivåer.
        </p>
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">Specialaktiviteter:</h4>
          <p className="text-sm text-muted-foreground">
            Från traditionella lekar till moderna idrotter - våra erfarna ledare ser till att alla känner 
            sig välkomna och får chansen att prova något nytt i en trygg miljö.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'sportstruck',
    description: 'Juni-Augusti',
    title: 'Sportstruck & Sportoteket',
    src: '/images/sportstruck-06-25-25/Landscape/DSC00669.webp',
    ctaText: 'Läs mer',
    ctaLink: '#',
    metadata: {
      date: 'Hela sommaren',
      duration: 'Dagligen',
      location: 'Mobil verksamhet'
    },
    content: () => (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Sommaren är höjdpunkten för vår verksamhet! Sportstruck är vår mobila idrottsverksamhet som 
          kommer direkt till er. Sportoteket låter barn och familjer låna sportutrustning kostnadsfritt.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card p-4 rounded-lg border">
            <h4 className="font-semibold text-kliv-red mb-2">Sportstruck</h4>
            <p className="text-sm text-muted-foreground">
              Mobil idrottsverksamhet som besöker parker, skolgårdar och andra mötesplatser.
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <h4 className="font-semibold text-kliv-red mb-2">Sportoteket</h4>
            <p className="text-sm text-muted-foreground">
              Låna sportutrustning kostnadsfritt för att fortsätta vara aktiv hemma.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'hostlovskul',
    description: 'Oktober',
    title: 'Höstlovskul',
    src: '/images/sportstruck-06-25-25/Landscape/DSC00490.webp',
    ctaText: 'Läs mer',
    ctaLink: '#',
    metadata: {
      date: 'Oktober vecka 44',
      duration: '4 dagar',
      location: 'Inomhus & utomhus'
    },
    content: () => (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Höstlovet bjuder på perfekta förhållanden för utomhusaktiviteter! Vi arrangerar aktiviteter som 
          passar årstiden och hjälper barn att hålla sig aktiva trots kortare dagar.
        </p>
        <div className="bg-gradient-to-r from-kliv-red/10 to-transparent p-4 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">Säsongsanpassade aktiviteter</h4>
          <p className="text-sm text-muted-foreground">
            Våra höstaktiviteter kombinerar fysisk aktivitet med säsongens naturliga skönhet, och ger barn 
            möjlighet att uppleva glädje i rörelse året runt.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'jullovskul',
    description: 'December',
    title: 'Jullovskul',
    src: '/images/sportstruck-06-25-25/Landscape/DSC00470.webp',
    ctaText: 'Läs mer',
    ctaLink: '#',
    metadata: {
      date: 'December vecka 52',
      duration: '3 dagar',
      location: 'Inomhusanläggning'
    },
    content: () => (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Avsluta året med festliga och roliga aktiviteter! Jullovet blir extra speciellt med våra 
          tematiska program som kombinerar julstämning med aktiv rörelse.
        </p>
        <div className="bg-card p-4 rounded-lg border border-kliv-red/20">
          <h4 className="font-semibold text-foreground mb-2">🎄 Julaktiviteter</h4>
          <p className="text-sm text-muted-foreground">
            Vi erbjuder både inomhus- och utomhusaktiviteter beroende på väder, och ser till att alla 
            barn får en positiv och aktiv start på det nya året. Gemenskap och glädje står i centrum.
          </p>
        </div>
      </div>
    ),
  },
];

export function OptimizedExpandableCards() {
  const [active, setActive] = useState<Card | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setActive(null);
      setIsClosing(false);
    }, 200);
  }, []);

  const handleCardClick = useCallback((card: Card) => {
    setActive(card);
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
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    handleScroll();
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [active, handleClose]);

  useOutsideClick(ref, handleClose);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-50 p-4">
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="relative">
                <motion.div layoutId={`image-${active.id}-${id}`}>
                  <Image
                    src={active.src}
                    alt={active.title}
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-80 object-cover"
                    priority
                    quality={90}
                  />
                </motion.div>
                
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.id}-${id}`}
                      className="text-kliv-red font-medium text-lg"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  
                  <button
                    onClick={() => window.open(active.ctaLink, '_blank')}
                    className="px-6 py-3 bg-kliv-red hover:bg-kliv-red-dark text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    {active.ctaText}
                    <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                  </button>
                </div>

                {/* Metadata */}
                {active.metadata && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
                    {active.metadata.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-kliv-red" />
                        <div>
                          <p className="text-xs text-muted-foreground">Datum</p>
                          <p className="text-sm font-medium">{active.metadata.date}</p>
                        </div>
                      </div>
                    )}
                    {active.metadata.duration && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-kliv-red" />
                        <div>
                          <p className="text-xs text-muted-foreground">Längd</p>
                          <p className="text-sm font-medium">{active.metadata.duration}</p>
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
                  {active.content()}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seasonalActivities.map((card) => (
          <motion.div
            key={card.id}
            layoutId={`card-${card.id}-${id}`}
            onClick={() => handleCardClick(card)}
            className={cn(
              'group cursor-pointer bg-card border border-border rounded-xl overflow-hidden',
              'hover:shadow-xl hover:shadow-kliv-red/10 hover:border-kliv-red/30',
              'transition-all duration-300 hover:-translate-y-1'
            )}
          >
            <div className="relative overflow-hidden">
              <motion.div layoutId={`image-${card.id}-${id}`}>
                <Image
                  src={card.src}
                  alt={card.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  quality={80}
                />
              </motion.div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
            </div>

            <div className="p-6">
              <div className="text-center">
                <motion.h3
                  layoutId={`title-${card.id}-${id}`}
                  className="text-xl font-bold text-foreground mb-2 group-hover:text-kliv-red transition-colors duration-300"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.id}-${id}`}
                  className="text-kliv-red font-medium text-sm mb-4"
                >
                  {card.description}
                </motion.p>
              </div>

              {/* Quick info */}
              {card.metadata && (
                <div className="space-y-2 text-sm text-muted-foreground">
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
                <div className="w-8 h-8 rounded-full bg-kliv-red/10 group-hover:bg-kliv-red/20 flex items-center justify-center transition-colors duration-300">
                  <ChevronDown className="w-4 h-4 text-kliv-red group-hover:text-kliv-red-dark transition-colors duration-300" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}