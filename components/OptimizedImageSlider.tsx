'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageSliderProps {
  images: string[];
  mobileImages?: string[];
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  autoplay?: boolean;
  interval?: number;
}

export const OptimizedImageSlider: React.FC<OptimizedImageSliderProps> = ({
  images,
  mobileImages,
  children,
  className,
  overlayClassName,
  autoplay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentImages = isMobile && mobileImages ? mobileImages : images;
  const totalImages = currentImages.length;

  // Check if mobile
  const checkIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Handle next image
  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Directly update the current index after a short delay
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % totalImages);
      setIsTransitioning(false);
    }, 300);
  }, [currentIndex, totalImages, isTransitioning]);

  // Mobile detection
  useEffect(() => {
    checkIsMobile();
    const handleResize = () => checkIsMobile();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkIsMobile]);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setInterval(handleNext, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, handleNext]);

  // Preload next few images
  useEffect(() => {
    const preloadCount = 3;
    for (let i = 0; i < preloadCount; i++) {
      const index = (currentIndex + i) % totalImages;
      const img = new window.Image();
      img.src = currentImages[index];
    }
  }, [currentIndex, currentImages, totalImages]);

  return (
    <div
      className={cn(
        'relative w-full h-screen overflow-hidden',
        className
      )}
    >
      {/* Single Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={currentImages[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          className={cn(
            'object-cover transition-opacity duration-300 ease-in-out',
            isTransitioning ? 'opacity-0' : 'opacity-100'
          )}
          priority={currentIndex === 0}
          quality={85}
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-black/40 dark:bg-black/60 z-10',
          overlayClassName
        )}
      />

      {/* Content */}
      <div className="relative z-20 h-full">
        {children}
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {currentImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== currentIndex) {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsTransitioning(false);
                }, 300);
              }
            }}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};