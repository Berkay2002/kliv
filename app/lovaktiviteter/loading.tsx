import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header skeleton */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden -mt-24 pt-24">
        <div className="absolute inset-0 bg-muted animate-pulse" />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center max-w-4xl mx-auto h-full">
            <Skeleton className="h-16 w-96 mb-6" />
            <Skeleton className="h-8 w-3xl max-w-3xl" />
          </div>
        </div>
      </section>

      {/* Description skeleton */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-24 mx-auto mb-8" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
        </div>
      </section>

      {/* Safe & Free Section skeleton */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-24 mx-auto mb-8" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
        </div>
      </section>

      <div className="h-16 bg-linear-to-b from-muted to-background" />

      {/* Cards skeleton */}
      <section className="py-16 bg-background relative">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-24 mx-auto" />
          </div>
          
          {/* Skeleton cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-card border border-border rounded-xl overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <div className="text-center">
                    <Skeleton className="h-6 w-32 mx-auto mb-2" />
                    <Skeleton className="h-4 w-24 mx-auto mb-4" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="mt-4 flex justify-center">
                    <Skeleton className="w-8 h-8 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 