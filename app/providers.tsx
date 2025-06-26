"use client";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
  // Optional theme props
  defaultTheme?: "system" | "light" | "dark";
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function Providers({
  children,
  defaultTheme = "dark",
  enableSystem = true,
  disableTransitionOnChange = true,
}: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      <TooltipProvider>
        {children}
        <Toaster position="top-center" richColors />
      </TooltipProvider>
    </ThemeProvider>
  );
}