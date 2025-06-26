import { cn } from "@/lib/utils";
import React from "react";

interface SectionSeparatorProps {
  /**
   * The Tailwind color name for the gradient's starting point (e.g., 'background', 'gray-50').
   * This should match the background of the section ABOVE the separator.
   * @default 'background'
   */
  fromBg?: string;
  /**
   * The Tailwind color name for the gradient's ending point (e.g., 'background', 'gray-100').
   * This should match the background of the section BELOW the separator.
   * @default 'background'
   */
  toBg?: string;
  /**
   * The size (height) of the separator.
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";
  /**
   * The direction of the gradient fade.
   * @default 'to-b'
   */
  direction?: "to-t" | "to-b";
  /**
   * Optional additional class names.
   */
  className?: string;
}

/**
 * A reusable, theme-aware gradient separator that blends between two specified
 * background colors.
 */
export function SectionSeparator({
  fromBg = "background",
  toBg = "background",
  size = "md",
  direction = "to-b",
  className,
}: SectionSeparatorProps) {
  const sizeClasses = {
    sm: "h-12 md:h-16",
    md: "h-16 md:h-24",
    lg: "h-24 md:h-32",
  };

  // Dynamically construct the gradient classes from the props
  const fromClass = `from-${fromBg}`;
  const toClass = `to-${toBg}`;
  const directionClass = direction === "to-t" ? "bg-gradient-to-t" : "bg-gradient-to-b";

  return (
    <div
      className={cn(
        "w-full",
        directionClass,
        fromClass,
        "via-transparent", // A transparent midpoint creates the smoothest blend
        toClass,
        sizeClasses[size],
        className
      )}
      aria-hidden="true"
    />
  );
}