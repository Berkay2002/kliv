"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ResponsiveImageProps {
  landscapeUrl: string;
  portraitUrl: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function ResponsiveImage({
  landscapeUrl,
  portraitUrl,
  alt,
  className,
  priority = false,
  fill = false,
  width,
  height,
}: ResponsiveImageProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    // Check initial screen size
    checkIsMobile();

    // Add event listener for resize
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const imageUrl = isMobile ? portraitUrl : landscapeUrl;

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}

interface ResponsiveBackgroundImageProps {
  landscapeUrl: string;
  portraitUrl: string;
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveBackgroundImage({
  landscapeUrl,
  portraitUrl,
  children,
  className = "",
}: ResponsiveBackgroundImageProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Desktop/Landscape Image */}
      <div className="absolute inset-0 -top-24 z-0 hidden md:block">
        <Image
          src={landscapeUrl}
          alt="Background Landscape"
          fill
          className="object-cover"
          style={{ objectPosition: 'center center' }}
          sizes="100vw"
          priority
        />
      </div>
      
      {/* Mobile/Portrait Image */}
      <div className="absolute inset-0 -top-24 z-0 block md:hidden">
        <Image
          src={portraitUrl}
          alt="Background Portrait"
          fill
          className="object-cover"
          style={{ objectPosition: 'center center' }}
          sizes="100vw"
          priority
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 -top-24 bg-black/50 z-5" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
