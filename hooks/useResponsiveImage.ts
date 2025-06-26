"use client";

import { useState, useEffect } from "react";

export function useResponsiveImageUrl(landscapeUrl: string, portraitUrl: string) {
  const [imageUrl, setImageUrl] = useState(landscapeUrl);

  useEffect(() => {
    const updateImageUrl = () => {
      setImageUrl(window.innerWidth < 768 ? portraitUrl : landscapeUrl);
    };

    // Set initial value
    updateImageUrl();

    // Add event listener
    window.addEventListener("resize", updateImageUrl);

    return () => window.removeEventListener("resize", updateImageUrl);
  }, [landscapeUrl, portraitUrl]);

  return imageUrl;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}
