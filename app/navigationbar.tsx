"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState, useEffect } from "react";

const navItems = [
  { 
    name: "Hem", 
    link: "/",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    color: "text-blue-500"
  },
  { 
    name: "Judo", 
    link: "/judo",
    gradient: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
    color: "text-purple-500"
  },
  { 
    name: "Lovaktiviteter", 
    link: "/lovaktiviteter",
    gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    color: "text-red-500"
  },
  { 
    name: "Kontakta Oss", 
    link: "/kontakta-oss",
    gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    color: "text-green-500"
  },
];

// Animation variants for the glowing effects
const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const,
    },
  },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 1.2,
    transition: {
      opacity: { duration: 0.5, ease: "easeInOut" as const },
      scale: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Check if we're on the contact page (no header image)
  const isContactPage = pathname === "/kontakta-oss";
  
  // For contact page in standby mode: use theme-aware colors
  // For other pages in standby mode: use white (overlay over header images)
  const shouldUseThemeColors = !visible && isContactPage;
  
  const logoSrc = !mounted 
    ? "/logo/transparant-vit.svg"
    : shouldUseThemeColors
    ? theme === 'dark' 
      ? "/logo/transparant-vit.svg" 
      : "/logo/transparant-svart.svg"
    : !visible 
    ? "/logo/transparant-vit.svg" 
    : theme === 'dark' 
    ? "/logo/transparant-vit.svg" 
    : "/logo/transparant-svart.svg";

  const closeMenu = () => setIsOpen(false);
  const isDarkTheme = theme === "dark";

  return (
    <motion.div
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 w-full"
    >
      {/* Desktop Navigation */}
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(10px)" : "none",
          boxShadow: visible
            ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
            : "none",
          width: visible ? "70%" : "100%",
          y: visible ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        style={{
          minWidth: "800px",
        }}
        className={cn(
          "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent overflow-hidden",
          visible && "bg-white/80 dark:bg-neutral-950/80",
        )}
        initial="initial"
        whileHover="hover"
      >
        {/* Nav-wide glow effect */}
        <motion.div
          className={`absolute -inset-2 bg-gradient-radial from-transparent ${
            mounted && isDarkTheme
              ? "via-kliv-red/30 via-30% via-kliv-red/20 via-60% via-kliv-red/10 via-90%"
              : "via-kliv-red/20 via-30% via-kliv-red/15 via-60% via-kliv-red/10 via-90%"
          } to-transparent rounded-full z-0 pointer-events-none`}
          variants={navGlowVariants}
        />

        {/* Logo */}
        <Link href="/" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1">
          <Image
            src={logoSrc}
            alt="Kliv Idrottsförening"
            width={40}
            height={40}
            className="h-10 w-10 object-contain transition-all duration-500 hover:scale-110"
            priority
          />
        </Link>

        {/* Desktop Navigation Items */}
        <DesktopNavItems 
          items={navItems} 
          pathname={pathname}
          onItemClick={closeMenu}
          visible={visible}
          shouldUseThemeColors={shouldUseThemeColors}
        />

        {/* Theme Toggle */}
        <div className="relative z-20">
          <ThemeToggle visible={visible} shouldUseThemeColors={shouldUseThemeColors} />
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(10px)" : "none",
          boxShadow: visible
            ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
            : "none",
          width: visible ? "90%" : "100%",
          paddingRight: visible ? "12px" : "0px",
          paddingLeft: visible ? "12px" : "0px",
          borderRadius: visible ? "1.5rem" : "2rem",
          y: visible ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        className={cn(
          "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
          visible && "bg-white/80 dark:bg-neutral-950/80",
        )}
      >
        {/* Mobile Header */}
        <div className="flex w-full flex-row items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="relative z-20 flex items-center space-x-2 px-2 py-1">
              <Image
                src={logoSrc}
                alt="Kliv Idrottsförening"
              width={40}
              height={40}
              className="h-10 w-10 object-contain transition-all duration-500 hover:scale-110"
                priority
              />
          </Link>
          
          {/* Mobile Menu Toggle and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeToggle visible={visible} shouldUseThemeColors={shouldUseThemeColors} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-20 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <IconX className={`h-6 w-6 ${
                  shouldUseThemeColors
                    ? "text-black dark:text-white"
                    : !visible 
                    ? "text-white" 
                    : "text-black dark:text-white"
                }`} />
              ) : (
                <IconMenu2 className={`h-6 w-6 ${
                  shouldUseThemeColors
                    ? "text-black dark:text-white"
                    : !visible 
                    ? "text-white" 
                    : "text-black dark:text-white"
                }`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950"
            >
              {navItems.map((item, idx) => (
                <Link
                  key={`mobile-${idx}`}
                  href={item.link}
                  onClick={closeMenu}
                  className={cn(
                    "block w-full p-4 text-lg font-medium transition-all duration-300 rounded-lg group",
                    pathname === item.link
                      ? "text-kliv-red bg-kliv-red/10" 
                      : "text-gray-800 dark:text-gray-200 hover:text-kliv-red hover:bg-gray-100/50 dark:hover:bg-gray-800/30"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

const DesktopNavItems = ({ 
  items, 
  pathname, 
  onItemClick,
  visible,
  shouldUseThemeColors,
}: { 
  items: { name: string; link: string; gradient: string; color: string }[];
  pathname: string;
  onItemClick: () => void;
  visible: boolean;
  shouldUseThemeColors: boolean;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2"
    >
      {items.map((item, idx) => {
        const isActive = pathname === item.link;
        
        return (
          <motion.div key={`desktop-${idx}`} className="relative">
            <Link
              href={item.link}
              onMouseEnter={() => setHovered(idx)}
              onClick={onItemClick}
              className="block w-full"
            >
              <motion.div
                className="block rounded-xl overflow-visible group relative"
                whileHover="hover"
                initial="initial"
              >
                {/* Individual glow effect */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none"
                  variants={glowVariants}
                  animate={isActive ? "hover" : "initial"}
                  style={{
                    background: item.gradient,
                    opacity: isActive ? 1 : 0,
                    borderRadius: "12px",
                  }}
                />
                
                {/* Link content */}
                <motion.div
                  className={cn(
                    "relative px-4 py-2 z-10 bg-transparent transition-colors rounded-xl",
                    isActive
                      ? shouldUseThemeColors
                        ? item.color
                        : !visible 
                        ? "text-white" 
                        : item.color
                      : shouldUseThemeColors
                        ? "text-neutral-600 dark:text-neutral-300"
                        : !visible 
                        ? "text-white/90" 
                        : "text-neutral-600 dark:text-neutral-300",
                    shouldUseThemeColors 
                      ? `group-hover:${item.color}` 
                      : !visible 
                      ? "hover:bg-white/10" 
                      : `group-hover:${item.color}`
                  )}
                >
                  <span className="relative z-20">{item.name}</span>
                </motion.div>
                
                {/* Hover background */}
                {hovered === idx && (
                  <motion.div
                    layoutId="hovered"
                    className={cn(
                      "absolute inset-0 h-full w-full rounded-xl z-0",
                      shouldUseThemeColors
                        ? "bg-gray-100 dark:bg-neutral-800"
                        : !visible 
                        ? "bg-black/30" 
                        : "bg-gray-100 dark:bg-neutral-800"
                    )}
                  />
                )}
                
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="active"
                    className={cn(
                      "absolute inset-0 h-full w-full rounded-xl z-0",
                      shouldUseThemeColors
                        ? "bg-gray-100/50 dark:bg-neutral-800/50"
                        : !visible 
                        ? "bg-black/30" 
                        : "bg-gray-100/50 dark:bg-neutral-800/50"
                    )}
                  />
                )}
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};