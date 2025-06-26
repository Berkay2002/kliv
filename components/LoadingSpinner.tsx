"use client";

import { useState, useEffect } from 'react';

export default function LoadingSpinner() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-muted border-t-kliv-red rounded-full animate-spin"></div>
        <div className="mt-4 text-center">
          <p className="text-muted-foreground">Laddar...</p>
        </div>
      </div>
    </div>
  );
}