"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetOverlay } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Menu, X } from "lucide-react";
import React from "react";

const navItems = [
  { name: "Hem", href: "/" },
  { name: "Våra Sporter", href: "/sporter" },
  { name: "Evenemang", href: "/evenemang" },
  { name: "Kontakta Oss", href: "/kontakta-oss" },
  { name: "Bli Medlem", href: "/bli-medlem" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const pathname = usePathname();
  const { theme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  React.useEffect(() => {
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

  const closeSheet = () => setIsOpen(false);

  const logoSrc = !mounted 
    ? "/logo/transparant-vit.svg" // Default to dark theme logo
    : theme === 'dark' 
    ? "/logo/transparant-vit.svg" 
    : "/logo/transparant-svart.svg";

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full",
        isOpen 
          ? "bg-transparent transition-all duration-300"
          : isScrolled 
          ? "bg-gray-100/95 dark:bg-gray-850/95 backdrop-blur-2xl shadow-lg transition-all duration-500" 
          : "bg-gray-100/60 dark:bg-gray-850/60 backdrop-blur-md transition-all duration-500",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* Animated gradient line */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-0.5",
        isOpen 
          ? "bg-transparent transition-all duration-300"
          : isScrolled 
          ? "bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0 transition-all duration-500" 
          : "bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 transition-all duration-500"
      )}></div>
      
      <div className="container mx-auto px-6">
        <div className="flex h-24 items-center justify-between">        
          <Link href="/" className={cn(
            "flex items-center group relative transition-all duration-300",
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          )} onClick={closeSheet}>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={logoSrc}
                alt="Kliv Idrottsförening"
                width={60}
                height={60}
                className="h-14 w-14 object-contain transition-all duration-500 group-hover:scale-110"
                priority
              />
              {/* Logo glow effect */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-lg"></div>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center">
            <nav className="flex items-center" aria-label="Main navigation">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-6 py-4 text-sm font-medium transition-all duration-300 group rounded-lg",
                    "before:absolute before:bottom-1 before:left-1/2 before:h-0.5 before:w-0 before:bg-primary before:transition-all before:duration-300 before:-translate-x-1/2",
                    "hover:before:w-3/4",
                    pathname === item.href 
                      ? "text-primary before:w-3/4 bg-primary/5" 
                      : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
            </nav>
            
            <div className="ml-6 pl-6 border-l border-gray-200 dark:border-gray-700">
              <ThemeToggle />
            </div>
          </div>
          
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button 
                  className="relative w-11 h-11 rounded-lg bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/30 transition-all duration-300 hover:bg-white/20 dark:hover:bg-gray-700/30 group flex items-center justify-center"
                  aria-label="Toggle menu"
                >
                  {/* Enhanced hamburger lines with cool staggered animation */}
                  <div className="flex flex-col space-y-1.5">
                    <span className={cn(
                      "block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-700 ease-out transform-gpu",
                      isOpen ? "rotate-45 translate-y-2 scale-110" : "rotate-0 translate-y-0 scale-100",
                      "transition-delay-[50ms]"
                    )}></span>
                    <span className={cn(
                      "block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-700 ease-out transform-gpu",
                      isOpen ? "opacity-0 scale-0 rotate-180" : "opacity-100 scale-100 rotate-0",
                      "transition-delay-[100ms]"
                    )}></span>
                    <span className={cn(
                      "block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-700 ease-out transform-gpu",
                      isOpen ? "-rotate-45 -translate-y-2 scale-110" : "rotate-0 translate-y-0 scale-100",
                      "transition-delay-[150ms]"
                    )}></span>
                  </div>
                </button>
              </SheetTrigger>
              <SheetOverlay className="bg-black/10 dark:bg-black/30" />
              <SheetContent 
              side="right" 
              className="w-full p-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl" 
              aria-label="Mobile navigation menu"
            >
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden>
                
                {/* Custom close button positioned like hamburger */}
                <div className="absolute top-6 right-6 z-10">
                  <button 
                    onClick={closeSheet}
                    className="relative w-11 h-11 rounded-lg bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/30 transition-all duration-300 hover:bg-white/20 dark:hover:bg-gray-700/30 group flex items-center justify-center"
                    aria-label="Close menu"
                  >
                    {/* Animated X that transforms back to hamburger on close */}
                    <div className="flex flex-col space-y-1.5">
                      <span className={cn(
                        "block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-700 ease-out transform-gpu",
                        "rotate-45 translate-y-2"
                      )}></span>
                      <span className={cn(
                        "block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-700 ease-out transform-gpu",
                        "opacity-0 scale-0"
                      )}></span>
                      <span className={cn(
                        "block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-700 ease-out transform-gpu",
                        "-rotate-45 -translate-y-2"
                      )}></span>
                    </div>
                  </button>
                </div>
                
                <div className="flex flex-col h-full">                  
                  {/* Header with logo */}
                  <div className="p-6 border-b border-gray-200/20 dark:border-gray-700/30">
                    <Link href="/" className="flex items-center" onClick={closeSheet}>
                      <Image
                        src={logoSrc}
                        alt="Kliv Idrottsförening"
                        width={48}
                        height={48}
                        className="h-12 w-12 transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex-1 p-6">
                    <nav className="space-y-2">
                      {navItems.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeSheet}
                          className={cn(
                            "block p-4 text-lg font-medium transition-all duration-300 rounded-lg group",
                            pathname === item.href
                              ? "text-primary bg-primary/10" 
                              : "text-gray-800 dark:text-gray-200 hover:text-primary hover:bg-gray-100/50 dark:hover:bg-gray-800/30"
                          )}
                        >
                          <span className="block">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                  
                  {/* Bottom section with theme toggle */}
                  <div className="p-6 border-t border-gray-200/20 dark:border-gray-700/30">
                    <div className="flex items-center justify-between p-4 bg-gray-100/50 dark:bg-gray-800/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Utseende</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Växla mellan ljust och mörkt</p>
                      </div>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}