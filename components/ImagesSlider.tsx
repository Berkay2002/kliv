"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState, useCallback } from "react";

export const ImagesSlider = ({
  images,
  mobileImages,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: {
  images: string[];
  mobileImages?: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [loadedMobileImages, setLoadedMobileImages] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const currentImages = isMobile && mobileImages ? mobileImages : images;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === currentImages.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? currentImages.length - 1 : prevIndex - 1
    );
  };

  const checkIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768); // md breakpoint
  }, []);

  const loadImages = useCallback(() => {
    const loadPromises: Promise<string>[] = images.map((image) => {
      return new Promise<string>((resolve, reject) => {
        const img = new window.Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages);
      })
      .catch((error) => console.error("Failed to load images", error));

    // Load mobile images if provided
    if (mobileImages) {
      const loadMobilePromises: Promise<string>[] = mobileImages.map((image) => {
        return new Promise<string>((resolve, reject) => {
          const img = new window.Image();
          img.src = image;
          img.onload = () => resolve(image);
          img.onerror = reject;
        });
      });

      Promise.all(loadMobilePromises)
        .then((loadedMobileImages) => {
          setLoadedMobileImages(loadedMobileImages);
        })
        .catch((error) => console.error("Failed to load mobile images", error));
    }
  }, [images, mobileImages]);

  useEffect(() => {
    loadImages();
    checkIsMobile();
    const handleResize = () => {
      checkIsMobile();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loadImages, checkIsMobile]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // autoplay
    let interval: ReturnType<typeof setInterval> | undefined;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [autoplay, handleNext, handlePrevious]);

  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: {
        duration: 1,
      },
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: {
        duration: 1,
      },
    },
  };

  const areImagesLoaded = loadedImages.length > 0 && (!mobileImages || loadedMobileImages.length > 0);
  const currentLoadedImages = isMobile && mobileImages ? loadedMobileImages : loadedImages;

  return (
    <div
      className={cn(
        "overflow-hidden h-screen w-full relative flex items-center justify-center",
        className
      )}
      style={{
        perspective: "1000px",
      }}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
        />
      )}

      {areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            key={`${currentIndex}-${isMobile}`}
            src={currentLoadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="image h-screen w-full absolute inset-0 object-cover object-center"
          />
        </AnimatePresence>
      )}
    </div>
  );
}; 